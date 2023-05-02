# Administering MongoDB for Component Pack {#inst_comp_pack_mongodb_admin .reference}

MongoDB administration tasks include monitoring system health.

## Verifying the status of the MongoDB pods { .section}

Run the following command to retrieve information on the status of the MongoDB pods:

```
kubectl get pod -n connections -o wide --selector app=mongo
```

The response includes the status of each pod:

```

NAME      READY     STATUS    RESTARTS   AGE       IP            NODE
mongo-0   2/2       Running   0          5m        10.1.18.168   9.32.164.232
mongo-1   2/2       Running   0          4m        10.1.18.171   9.32.164.232
mongo-2   2/2       Running   0          4m        10.1.18.170   9.32.164.232
```

## Verifying the MongoDB database status { .section}

The command to determine the MongoDB database status varies depending on whether x.509 authentication is enabled, which you can determine by running the following command:

```
helm get values infrastructure -a | grep x509Enabled
```

For example, if x.509 authentication is enabled, the response will be: x509Enabled: true

Then run the appropriate command to retrieve information on the health of the MongoDB database:

-   When x.509 authentication is enabled:

    ```
    kubectl exec -it mongo-0 -c mongo -n connections -- mongo --ssl --sslPEMKeyFile /etc/mongodb/x509/user_admin.pem --sslCAFile /etc/mongodb/x509/mongo-CA-cert.crt --host mongo-1.mongo.connections.svc.cluster.local --authenticationMechanism=MONGODB-X509 --authenticationDatabase '$external' -u C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb --eval "rs.status().members" | grep "id\|name\|health\|stateStr\|ok"
    ```

-   When x.509 authentication is disabled:

    ```
    kubectl exec -n connections -it mongo-0 -c mongo -- mongo mongo-0.mongo:27017 --eval "rs.status()" | grep "id\|name\|health\|stateStr\|ok"
    ```


The response includes the "health" of the database hosted on each pod; the value "1' indicates good health:

```

    "_id" : 0,
    "name" : "mongo-0.mongo.connections.svc.cluster.local:27017",
    "health" : 1,
    "stateStr" : "PRIMARY",
    "_id" : 1,
    "name" : "mongo-1.mongo.connections.svc.cluster.local:27017",
    "health" : 1,
    "stateStr" : "SECONDARY",
    "_id" : 2,
    "name" : "mongo-2.mongo.connections.svc.cluster.local:27017",
    "health" : 1,
    "stateStr" : "SECONDARY",
"ok" : 1

```

**Parent topic:**[Administering Component Pack for Connections](../admin/c_admin_component_pack_intro.md)

