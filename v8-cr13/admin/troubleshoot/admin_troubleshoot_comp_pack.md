# Troubleshooting Component Pack {#admin_troubleshoot_comp_pack .concept}

If you encounter issues when using the Component Pack, refer to these troubleshooting tips or consult the HCL Support database for recent tech notes or HCL Support for recent articles.

Known issues and resolutions are tracked as tech notes in the HCL Support database and as articles in the HCL Support Knowledge Base. Search for Component Pack to view the latest issues.

## Checking the status of the running pods

Use SSH to connect to the master server and execute this command to get information on the running pods \(default namespace name is connections\):

```kubectl get pods -o wide -n <namespace>```

## Pods are in "Unknown" state after worker node goes down

This is the expected behavior if a worker nodes has gone down. To verify that one of your worker nodes has gone down, run the command `kubectl get nodes`. In this scenario, the expected behavior of the pods depend on whether the pod is part of stateful set or stateless set:

For stateful set pods (Mongo, Valkey, and OpenSearch), the pod that was running on the node that is down will remain in an ***"Unknown"*** state. This is because the master does not know whether it was a deliberate shutdown or a network partition. Since the pod might still be running somewhere on the cluster, the master will not recreate the pod on an available worker (to avoid violating the guarantee of stateful sets only having one pod). You can bring back the node that is down and let the pod recover, or you can force-delete the pod and let it recreate on an available worker by running the following command:

```kubectl delete pod <pod_name> -n connections --grace-period=0 --force```

For stateless set pods, the pod that was running on the worker node that is down will be recreated on an available worker node; however the old pod will still be displayed in an ***"Unknown"*** state. You can confirm this by counting the number of Running pods \(for example, 3 Running pods and 1 Unknown pod\). The unknown pod will clear from the list of pods when the worker node is back up again, or you can force-delete it by running the following command:

```kubectl delete pod <pod_name> -n connections --grace-period=0 --force```


## Component Pack microservices fail to connect to Mongo

On startup, if the Component Pack microservices fail to connect to Mongo with error `MongoError: no primary found in replicaset`, see this [article](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0021362) for details.

Run the following command to check whether the MongoDB Replica Set is healthy \(default namespace name is connections, adjust the `--host` based on the number of replicas):

```kubectl exec -it mongo7-0 -c mongo7 -n connections -- mongosh --tls --tlsCertificateKeyFile /etc/mongodb/x509/user_admin.pem --tlsCAFile /etc/mongodb/x509/mongo-CA-cert.crt --host mongo7-1.mongo7.connections.svc.cluster.local --authenticationMechanism=MONGODB-X509 --authenticationDatabase '$external' -u C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb --eval "rs.status()"```

The command should return the replica set status.  Member with `health: 1` indicates the member is up.

## Top Updates not working correctly on the home page

If you are experiencing issues with the Top Updates on the home page, you might have problems with OpenSearch. Run the commands in the following steps to debug OpenSearch:

1.  Ensure all OpenSearch pods are in "Running" state:

    ```kubectl get pods -n connections | grep opensearch```

2.  If some of the pods are not running, fetch details about the pod:

    ```kubectl -n connections describe pod <pod>```

    For example, if the opensearch-cluster-client-0 pod is not running, run:

    ```kubectl -n connections describe pod opensearch-cluster-client-0```

3.  If the issue relates to an unhealthy cluster, restart the opensearch-cluster-master pods:

    ```kubectl -n connections delete pod $(kubectl get pods -n connections | grep opensearch-cluster-master | awk '{print $1}')```

4. If restarting did not resolve the issue, check logs for the `opensearch-cluster-master` pod for error messages that might result in an unhealthy cluster:

    ```kubectl -n connections logs -f opensearch-cluster-master-0```

    For example, it might be running out of disk space:

    ```[2022-10-18T16:35:58,457][WARN ][o.o.c.r.a.DiskThresholdMonitor] [opensearch-cluster-master-0] high disk watermark [90%] exceeded on [E1Sp8R0bQHGN9YYCplz_BQ][opensearch-cluster-data-0][/usr/share/opensearch/data/nodes/0] free: 9.9gb[9.9%], shards will be relocated away from this node; currently relocating away shards totalling [0] bytes; the node is expected to continue to exceed the high disk watermark when these relocations are complete```

5. You can also check the status of the cluster via the /\_cluster/health API:

    1.  Run the cluster health API:

    ```kubectl -n connections exec -it opensearch-cluster-master-0 -- bash -c "/usr/share/opensearch/probe/sendRequest.sh GET '/_cluster/health?pretty'"```

6.  If the master pods have been running for a while (say, 10 minutes) and the health check still indicates that the status is red and there are unassigned replica shards, you may consider deleting those shards through the following API.  

    !!! note

        If this is not a fresh install, ensure that data stored in the unassigned shards is backed up or that the primary shard (if the unassigned shard is a replica) is healthy.

    1.  Retrieve details for why the shard is unassigned:

        ```kubectl -n connections exec opensearch-cluster-master-0 -- bash -c "/usr/share/opensearch/probe/sendRequest.sh GET '/_cluster/allocation/explain?pretty'" | python -mjson.tool```

        If the explanation is ***"a copy of this shard is already allocated to this node"*** it usually means that the cluster has detected a duplicate shard copy on the same node.  In this case, it's generally safe to delete the unassigned shard copies.

    2.  Delete the unassigned shard:

        ```kubectl -n connections exec -it opensearch-cluster-master-0 -- bash -c "/usr/share/opensearch/probe/sendRequest.sh DELETE '/<index name>'"```

    3.  Repeat the process as necessary to delete all the unassigned shards.

7. Check the cluster status again to confirm that all unassigned shards have been deleted and the status is no longer red:

    1.  Run the cluster health API:

        ```kubectl -n connections exec -it opensearch-cluster-master-0 -- bash -c "/usr/share/opensearch/probe/sendRequest.sh GET '/_cluster/health?pretty'"```

    2. Check the status of all OpenSearch pods again:

        ```kubectl get pods -n connections | grep opensearch```

    3. When all the OpenSearch pods are in "Running" state, restart the indexingservice pod:

        ```kubectl -n connections delete pod $(kubectl get pods -n connections | grep indexingservice | awk '{print $1}')```

    4. Also, restart the retrievalservice pod:

        ```kubectl -n connections delete pod $(kubectl get pods -n connections | grep retrievalservice | awk '{print $1}')```



**Parent topic:** [Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)
