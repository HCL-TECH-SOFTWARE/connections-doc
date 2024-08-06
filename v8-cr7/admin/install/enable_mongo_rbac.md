# Enabling MongoDB Role-Based Access Control

By default, the MongoDB Role-Based Access Control (RBAC) is disabled in MongoDB.  Enabling RBAC allows the utilization of access control using the pre-defined roles setup for the MongoDB users.  These users are created during MongoDB initialization based on the x.509 certificate for each Component Pack client. Perform the steps detailed in this section to enable RBAC.

## Procedure

!!! Note
   
    This procedure uses "connections" as the namespace.  Substitute it with your corresponding namespace if necessary.

1. Verify that the Mongo pod is ready by running the following command:
  
    ```
    kubectl -n connections get pod mongo5-0
    ``` 
  You should see an output similar to this:
  
    ```
    mongo5-0   2/2     Running   0          5m
    ```


2. Run the following command to check the sidecar log for "success" messages to verify that the users have been created.  
  
    ``` 
    kubectl -n connections logs mongo5-0 -c mongo5-sidecar
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
    kubectl -n connections edit sts mongo5
    ```
  Add the environment variables `MONGO_security_authorization` and `MONGO_security_clusterAuthMode` under the `containers` section for the mongodb5 container:

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
    kubectl -n connections delete pod $(kubectl get pods -n connections| grep mongo5 | awk '{print $1}')
    ```
  You should see an output similar to this:
    
    ```
    pod "mongo5-0" deleted
    ```

5. When the pod is ready, run the following command to check the MongoDB configuration file to verify the security settings:
  
    ```
    kubectl -n connections exec -it mongo5-0 -c mongo5 -- cat /etc/mongodb/mongod.conf.yaml
    ```
  The new settings should be found:
  
    ```
    ......
    security.authorization: enabled
    security.clusterAuthMode: x509
    ......
    ```
