# Troubleshooting Component Pack {#admin_troubleshoot_comp_pack .concept}

If you encounter issues when using the Component Pack, refer to these troubleshooting tips or consult the HCL Support database for recent tech notes or HCL Support for recent articles.®

Known issues and resolutions are tracked as tech notes in the HCL Support database and as articles in the HCL Support Knowledge Base. Search for Component Pack to view the latest issues.

Checking the status of the running pods
:   Use SSH to connect to the master server and execute this command to get information on the running pods \(default namespace name is connections\):

    ```
    kubectl  get pods -o wide -n <namespace>
    ```

Solr pods regularly restarting
:   There is a known issue in kernel version 3.10.x that occurs when using Kubernetes 1.8 and higher, which causes the Solr pods to restart \(approximately once per day\). Since there are three Solr pods, and only one Solr pod seems to restart at a time, there is no impact to the end user here. You will simply see the restart number increase each day for the Solr pods. The fix for this issue requires a new kernel version, which at the time of releasing Component Pack, was not yet available. For more information, see the Red Hat ticket tracking the issue: https://bugzilla.redhat.com/show\_bug.cgi?id=1507149

Pods are in "Unknown" state after worker node goes down
:   This is expected behavior if a worker nodes has gone down. To verify that one of your worker nodes has gone down, run the command kubectl get nodes. In this scenario, the expected behavior of the pods depend on weather the pod is part of stateful set or stateless set:

    -   For stateful set pods \(Mongo, Redis, Solr, Zookeeper, and Elasticsearch\), the pod that was running on the node that is down will remain in an "Unknown" state. This is because the master does not know whether it was a deliberate shutdown or a network partition. Since the pod might still be running somewhere on the cluster, the master will not recreate the pod on an available worker \(to avoid violating the guarantee of stateful sets only having one pod\). You can bring back the node that is down and let the pod recover, or you can force-delete the pod and let it recreate on an available worker by running the following command:

        ```
        kubectl delete pod pod\_name -n connections --grace-period=0 --force
        ```

    -   For stateless set pods, the pod that was running on the worker node that is down will be recreated on an available worker node; however the old pod will still be displayed in an "Unknown" state. You can confirm this by counting the number of Running pods \(there should be 3 Running pods and 1 Unknown pod\). The unknown pod will clear from the list of pods when the worker node is back up again, or you can force-delete it by running the following command:

        ```
        kubectl delete pod pod\_name -n connections --grace-period=0 --force
        ```


Solr pod fails to connect to Zookeeper service when restarting
:   If a Solr pod was deleted manually or restarted by Kubernetes automatically, there is a possibility that Solr will not be able to re-connect to Zookeeper service during restart. See this [article](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0021363) for details.

Component Pack microservices fail to connect to Mongo
:   On startup, Component Pack microservices fail to connect to Mongo with error 'MongoError: no primary found in replicaset'. See this [article](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0021362) for details.

Other problems with the Mongo or Zookeeper pods
:   Review the steps you used to configure the persistent volumes for these components.

    To check whether MongoDB Replica Set is healthy, run the following command \(default namespace name is connections\):

    kubectl exec -it mongo-0 -c mongo -n connections -- mongo --ssl --sslPEMKeyFile /etc/mongodb/x509/user\_admin.pem --sslCAFile /etc/mongodb/x509/mongo-CA-cert.crt --host mongo-1.mongo.connections.svc.cluster.local --authenticationMechanism=MONGODB-X509 --authenticationDatabase '$external' -u C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb --eval "rs.status\(\)"

    The command should return as "ok" : 1

Top Updates not working correctly on the Orient Me home page
:   If you are experiencing issues with Top Updates on the Orient Me home page, you might have problems with Solr. Run the commands in the following steps to debug Solr:

    1.  Ensure all Solr pod logs are in a "Running" state:

        ```
        kubectl get pods -n connections | grep solr
        ```

    2.  Check all Solr pod logs:

        ```
        kubectl logs solr-0 -n connections
        kubectl logs solr-1 -n connections
        kubectl logs solr-2 -n connections
        ```

    3.  If the Solr pods are being restarted, you can check the previous Solr pod logs:

        ```
        kubectl logs -n connections solr-0 --previous
        kubectl logs -n connections solr-1 --previous
        kubectl logs -n connections solr-2 --previous
        ```

    4.  Ensure there are no heapdumps or javacore files in the Solr persistent volumes:

        ```
        ls -la /pv-connections/solr-data-solr-0/server /pv-connections/solr-data-solr-1/server /pv-connections/solr-data-solr-2/server
        ```

        If there are any found, move them out of the persistent volume directory and send to HCL Support for analysis.

    5.  The deletion manager will remove all Solr documents that are older than 30 days. In the unlikely event that the deletion manager is failing, you can check and clean up older documents to get Top Updates working again.

        To avoid any slowing down your system, you should only delete approximately 5000 documents at a time. You can roughly figure this out by using the following formula:

        5000 / \(Num\_of\_docs\_older\_than\_30\_days / 30\)

        For example, if you had 30,000 documents older than 30 days, you should delete 5 days of data at a time. Below is a sample set of steps that can be used to delete documents older than 30th June 2018:

        1.  `SSH` to solr-0:

            ```
            kubectl -n connections exec -it solr-0 bash
            ```

        2.  Check the size of index files:

            ```
            du -h /home/solr/data/server/solr/orient-me-collection_shard*/data/index*
            ```

            Note down the size information.

        3.  Check the size of solr documents:

            ```
            date;hostname;curl -k $CURL_EXTRA_ARGS "https://127.0.0.1:8984/solr/orient-me-collection/select?indent=on&q=*:*" | grep numFound
            ```

            Note down the size information.

        4.  Check the size of solr documents older than 30-Jun-2018 to be deleted:

            ```
            curl -g -k $CURL_EXTRA_ARGS "https://127.0.0.1:8984/solr/orient-me-collection/select?fq=date:[*%20TO%202018-06-30T00:00:00Z]&indent=on&q=*:*&wt=json" | grep numFound
            
            ```

            Note down the size information.

        5.  Delete the documents older than 5-June-2018:

            ```
            curl -k $CURL_EXTRA_ARGS "https://127.0.0.1:8984/solr/orient-me-collection/update?commit=true" -H "Content-Type: text/xml" --data-binary "<delete><query>date:[* TO 2017-06-05T00\:09\:05.276Z]</query></delete>"
            
            ```

            You should only remove roughly 5000 documents at a time, so repeat this step \(changing the date range\) as needed to remove all documents older than 30 days. Remember to use the following formula to determine the date range to use in your environment:

            5000 / \(Num\_of\_docs\_older\_than\_30\_days / 30\)

        6.  Check the size of solr documents. The result should be smaller than it was in step c.

            ```
            date;hostname;curl -k $CURL_EXTRA_ARGS "https://127.0.0.1:8984/solr/orient-me-collection/select?indent=on&q=*:*" | grep numFound
            
            ```

        7.  Check the size of index files. This should be smaller than it was in step b.

            ```
            du -h /home/solr/data/server/solr/orient-me-collection_shard*/data/index.2*
            ```


Sanity pods regularly restarting \(Unknown code: -1226830854\)
:   There is a known issue \(https://github.com/alexguan/node-zookeeper-client/issues/70\) that causes the sanity pods to restart regularly. These restarts can be ignored as sanity restarts straight away and generally causes no problems accessing the sanity dashboard.

    You can confirm sanity is restarting due to this issue by verifying the following error is seen in the sanity pod logs:

    ```
    /home/ibm/app/node_modules/node-zookeeper-client/lib/Exception.js:51
            throw new Error('Unknown code: ' + code);
            ^
    Error: Unknown code: -1226830854
        at validateCode (/home/ibm/app/node_modules/node-zookeeper-client/lib/Exception.js:51:15)
        at Function.create (/home/ibm/app/node_modules/node-zookeeper-client/lib/Exception.js:140:5)
        at ConnectionManager.onSocketData (/home/ibm/app/node_modules/node-zookeeper-client/lib/ConnectionManager.js:570:35)
        at emitOne (events.js:116:13)
        at Socket.emit (events.js:211:7)
        at addChunk (_stream_readable.js:263:12)
        at readableAddChunk (_stream_readable.js:250:11)
        at Socket.Readable.push (_stream_readable.js:208:10)
        at TCP.onread (net.js:607:20)
    npm info lifecycle sanity@1.0.0~start: Failed to exec start script
    npm ERR! code ELIFECYCLE
    npm ERR! errno 1
    npm ERR! sanity@1.0.0 start: `node ./bin/www`
    npm ERR! Exit status 1
    npm ERR!
    npm ERR! Failed at the sanity@1.0.0 start script.
    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
    ```

**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

