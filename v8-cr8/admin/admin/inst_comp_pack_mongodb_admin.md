# Administering MongoDB for Component Pack {#inst_comp_pack_mongodb_admin .reference}

MongoDB administration tasks include monitoring system health.

## Verifying the status of the MongoDB pods { .section}

Run the following command to retrieve information on the status of the MongoDB pods:

```
kubectl get pod -n connections -o wide | grep mongo5
```

The response includes the status of each pod:

```
NAME       READY     STATUS    RESTARTS   AGE       IP            NODE
mongo5-0   2/2       Running   0          5m        10.1.18.168   9.32.164.232
mongo5-1   2/2       Running   0          4m        10.1.18.171   9.32.164.232
mongo5-2   2/2       Running   0          4m        10.1.18.170   9.32.164.232
```

## Verifying the MongoDB database status { .section}

Run the following command to retrieve information on the health of the MongoDB database:

```
kubectl exec -it mongo5-0 -c mongo5 -n connections -- mongo --tls --tlsCertificateKeyFile /etc/mongodb/x509/user_admin.pem --tlsCAFile /etc/mongodb/x509/mongo-CA-cert.crt --host mongo5-0.mongo5.connections.svc.cluster.local --authenticationDatabase '$external' --authenticationMechanism MONGODB-X509 -u C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb --eval "rs.status().members" | grep "id\|name\|health\|stateStr\|ok"
```

The response includes the "health" of the database hosted on each pod; the value "1' indicates good health:

```

    "_id" : 0,
    "name" : "mongo5-0.mongo5.connections.svc.cluster.local:27017",
    "health" : 1,
    "stateStr" : "PRIMARY",
    "_id" : 1,
    "name" : "mongo5-1.mongo5.connections.svc.cluster.local:27017",
    "health" : 1,
    "stateStr" : "SECONDARY",
    "_id" : 2,
    "name" : "mongo5-2.mongo5.connections.svc.cluster.local:27017",
    "health" : 1,
    "stateStr" : "SECONDARY",
"ok": 1

```

**Parent topic:** [Administering Component Pack for Connections](../admin/c_admin_component_pack_intro.md)

