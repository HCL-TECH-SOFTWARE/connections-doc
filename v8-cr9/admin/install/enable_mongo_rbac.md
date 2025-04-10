# Enabling MongoDB Role-Based Access Control

MongoDB Role-Based Access Control (RBAC) is enabled as part of the MongoDB 7 deployment using the infrastructure chart. Enabling RBAC allows the utilization of access control using the pre-defined roles setup for the MongoDB users. These users are created during MongoDB initialization based on the x.509 certificate for each Component Pack client.  If RBAC was disabled and/or MongoDB data was deleted for any reason after the deployment, you can set it up again by redeploying the infrastructure chart or perform the steps detailed in this topic.

## Procedure

!!! Note

    This procedure uses "connections" as the namespace.  Substitute it with your corresponding namespace if necessary.

1. Verify that the Mongo pod is ready by running the following command:

    ```
    kubectl -n connections get pod mongo7-0
    ```
  You should see an output similar to this:

    ```
    mongo7-0   2/2     Running   0          5m
    ```


2. Run the following command to check the sidecar log for "success" messages to verify that the users have been created.  

    ```
    kubectl -n connections logs mongo7-0 -c mongo7-sidecar
    ```
  Look for the following messages in the output:
    ```
    ......
    updateUser command successfully!
    ......
    createUser command successfully!
    createUser command successfully!
    ```

3. Edit the Mongo statefulset to add security settings by running the following command:

    ```
    kubectl -n connections edit sts mongo7
    ```
  Add the environment variables `MONGO_security_authorization` and `MONGO_security_clusterAuthMode` under the `containers` section for the mongodb7 container:

    ```
    containers:
      - env:
        ......
        - name: MONGO_security_authorization
          value: enabled    
        - name: MONGO_security_clusterAuthMode
          value: x509
    ```

4.  Execute the following command to restart the Mongo pod:

    ```
    kubectl -n connections delete pod $(kubectl get pods -n connections| grep mongo7 | awk '{print $1}')
    ```
  You should see an output similar to this:

    ```
    pod "mongo7-0" deleted
    ```

5. When the pod is ready, run the following command to check the MongoDB configuration file to verify the security settings:

    ```
    kubectl -n connections exec -it mongo7-0 -c mongo7 -- cat /etc/mongodb/mongod.conf.yaml
    ```
  The new settings should be found:

    ```
    ......
    security.authorization: enabled
    security.clusterAuthMode: x509
    ......
    ```

## Disabling Role-Based Access Control

1. Edit the Mongo statefulset:

    ```
    kubectl -n connections edit sts mongo7
    ```
    
2. Remove the `MONGO_security_authorization` and `MONGO_security_clusterAuthMode` security settings under the containers section for the mongodb7 container. 

3. Execute the following command to restart the Mongo pod:

    ```
    kubectl -n connections delete pod $(kubectl get pods -n connections| grep mongo7 | awk '{print $1}')
    ```
    You should see an output similar to this:

    ```
    pod "mongo7-0" deleted
    ```

4. When the pod is ready, run the following command to check the MongoDB configuration file to verify the security settings are no longer present:
    ```
    kubectl -n connections exec -it mongo7-0 -c mongo7 -- cat /etc/mongodb/mongod.conf.yaml
    ```
