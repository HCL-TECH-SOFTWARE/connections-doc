# Backing up and restoring data for OpenSearch indices {#cp_config_es_backup_restore_data .task}

Back up and restore OpenSearch data from the HCL Connections™ Component Pack system that contains the Kubernetes master server. Because you are connected to the OpenSearch container, by default you have root access to run commands inside the container.

This task applies to the metrics, type-ahead search, Orient Me, and Elastic stack features of Component Pack, depending on what features are configured.

1.  Do one of the following:.

    -   If this is the first time that you're doing a backup or restore, start with step 2.
    -   If you've done a backup or restore before, skip to step 3b as it's important to first delete the previous job and the pod.
2.  Register the snapshot repository in Elasticsearch:

    1.  Connect to an Elasticsearch client pod by running the following command:

        ```
        kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide -a |grep es-client |awk '{print $1}' |head -n 1) -- bash
        ```

    2.  Enter the following commands, which make use of the sendRequest utility to communicate with Elasticsearch:

        ```
        echo "----------------to create repo"
        cd /opt/elasticsearch-5.5.1/probe/
        ./sendRequest.sh PUT /_snapshot/<REPONAME> \
        -H 'Content-Type: application/json' \
        -d '{"type": "fs","settings": {"compress" :
        true, "location": "<BACKUPPATH>"}}'
        echo "----------------to check created repo"
        ./sendRequest.sh GET /_snapshot/_all?pretty
        ```

        where

        -   REPONAME is the name of the snapshot repository, which will be used to register and manage the Elasticsearch snapshot. The first time that you perform these steps, you must give the repository an appropriate name, for example,connectionsbackup.
        -   BACKUPPATH is the mount path of the shared Elasticsearch backup persistent volume \(esbackup\). By default this path is /backup.
        Once all commands have been run, you should see the following output:

        \{ "<REPONAME\>" : \{ "type" : "fs", "settings" : \{ "compress" : "true", "location" : "<BACKUPPATH\>" \} \} \}

    3.  Type `exit` to disconnect from the Elasticsearch client pod.

3.  Back up the snapshot by running a backup script in a pod:

    1.  Discover the image tag of the Elasticsearch docker image on the internal registry server by running the following command:

        ```
        estag=$(kubectl describe pod es-data-0 -n connections | grep "Image:" | grep "elasticsearch" | cut -f 3 | uniq | sed -e 's#.*elasticsearch:\(\)#\1#' | awk 'NR==1{print $1}')
        echo $estag
        ```

        You should see something similar to the following output:

        \[root@your\_host\_name/\]\# estag=$\(kubectl describe pod es-data-0 -n connections \| grep "Image:" \| grep "elasticsearch" \| cut -f 3 \| uniq \| sed -e 's\#.\*elasticsearch:\\\(\\\)\#\\1\#' \| awk 'NR==1\{print $1\}'\) echo $estag\}'

        \[root@your\_host\_name/\]\# echo $estag

        20180503-104412

        \[root@your\_host\_name/\]\#

    2.  Then enter the following command:

        ```
        helm del --purge esbackuprestore
        ```

        **Note:** If this is the first time that the esbackuprestore helm chart is deployed, you can expect to see the following message when running "helm del --purge esbackuprestore":

        ```
        Error: Unable to lock release esbackuprestore: release not found
        ```

        This is expected and it is okay for you to continue.

        ```
        
        cd  extractedFolder/microservices_connections/hybridcloud/helmbuilds/
        helm install --name=esbackuprestore esbackuprestore-0.1.0.tgz --set image.tag=$estag,elasticSearchBackup=true
        ```

        The resulting job creates a pod that runs the backup script.

    3.  Run the following command to check the backup pod status to ensure that it completed the backup process.

        ```
        kubectl get pods -n connections -a |grep job-backup
        job-backup-nwdqw             0/1       Completed   0          13h
        ```

        **Tip:** The pod remains in a completed/terminated state so that you can check the logs during backup. Use the following command to check the logs:

        ```
        kubectl logs -n connections $(kubectl get pods -n connections -o wide -a |grep job-backup |awk '{print $1}')
        ```

        Your log should include response text similar to the following output:

        \{"snapshot":\{"snapshot":"snapshot20171127072737","uuid":"TK9Xv6rCRIywIu5ExFeWww","version\_id":5050199,"version":"5.5.1","indices":

        \[".kibana","twitter","firstindex"\],"state":"SUCCESS","start\_time":"2017-11-27T07:27:37.970Z","start\_time\_in\_millis":1511767657970,"end\_time":"2017-11-27T07:27:40.287Z","end\_time\_in\_millis":1511767660287,"duration\_in\_millis":2317,"failures":\[\],"shards":

        \{"total":11,"failed":0,"successful":11\}\}\}

        Dload Upload Total Spent Left Speed

        100 89 100 89 0 0 89 0 0:00:01 --:--:-- 0:00:01 2870

        \{"connectionsbackup":\{"type":"fs","settings":\{"compress":"true","location":"/backup"\}\}\}

        **Note:** The default value for REPONAME is connectionsbackup. To override the default value, include REPONAME as a set value in the helm install command, for example:

        ```
        helm install --name=esbackuprestore esbackuprestore-0.1.0.tgz --set image.tag=$estag,elasticSearchBackup=true,REPONAME=your\_repo\_name
        
        ```

4.  Restore the snapshot by running a restore script in a pod.

    1.  Make sure that you completed Step 3a in the preceding section, and that you know the values for REPONAME and SNAPSHOTNAME for the snapshot that your want to restore from.

        **Note:** If you are restoring on a different system, or if the REPONAME doesn't exist, repeat step 1 using the REPONAME that was used in the backup; otherwise, the restore fails.

    2.  If you don't know the values for REPONAME and SNAPSHOTNAME, you can get them by completing the following steps:

        1.  Connect to the Elasticsearch pod by entering these commands:

            ```
            kubectl exec -ti -n connections $(kubectl get pods -n connections  -o wide -a |grep es-data-0 |awk '{print $1}' |head -n 1) -- bash
            
                    cd /opt/elasticsearch-5.5.1/probe/
                    ./sendRequest.sh GET /_snapshot
            ```

            You should see something similar to the following output:

            ```
            % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                                 Dload  Upload   Total   Spent    Left  Speed
                100    89  100    89    0     0     89      0  0:00:01 --:--:--  0:00:01  2870
                {"connectionsbackup":{"type":"fs","settings":{"compress":"true","location":"/backup"}}}
            ```

        2.  Type `exit`
        3.  Now, view the repository name details, including the snapshot name, by entering these commands:

            ```
            kubectl exec -ti -n connections $(kubectl get pods -n connections  -o wide -a |grep es-data-0 |awk '{print $1}' |head -n 1) -- bash
            
                cd /opt/elasticsearch-5.5.1/probe/
            
                ./sendRequest.sh GET /_snapshot/connectionsbackup/_all
            ```

            You should see something similar to the following output:

            ```
            % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                                 Dload  Upload   Total   Spent    Left  Speed
                100   814  100   814    0     0    814      0  0:00:01 --:--:--  0:00:01  6409
                {"snapshots":[{"snapshot":"snapshot20180115122426","uuid":"5GKdt0xyQmeqgRCWIf-13g","version_id":5050199,"version":"5.5.1","indices":["icmetrics_a_2018_1h"],"state":"SUCCESS","start_time":"2018-01-15T12:24:26.958Z","start_time_in_millis":1516019066958,"end_time":"2018-01-15T12:25:44.049Z","end_time_in_millis":1516019144049,"duration_in_millis":77091,"failures":[],"shards":{"total":5,"failed":0,"successful":5}},{"snapshot":"snapshot20180123135847","uuid":"-JtMlAL2TCyoq09syqVMhg","version_id":5050199,"version":"5.5.1","indices":["icmetrics_a_2018_1h"],"state":"SUCCESS","start_time":"2018-01-23T13:58:48.054Z","start_time_in_millis":1516715928054,"end_time":"2018-01-23T14:00:29.759Z","end_time_in_millis":1516716029759,"duration_in_millis":101705,"failures":[],"shards":{"total":5,"failed":0,"successful":5}}]}
                bash-4.3#
            ```

        4.  Make a note of the snapshot name in the output, for example, snapshot20180115122426
        5.  Type `exit` to disconnect from the Elasticsearch client pod.
    3.  To restore the backup, enter the following command:

        ```
        helm del --purge esbackuprestore
        cd extractedFolder/microservices_connections/hybridcloud/helmbuilds/
        helm install --name=esbackuprestore esbackuprestore-0.1.0.tgz --set image.tag=$estag,elasticSearchRestore=true,SNAPSHOTNAME=your\_snapshot\_name
        ```

        **Note:** The default value for REPONAME is connectionsbackup. You must specify a value for SNAPSHOTNAME that relates to the actual snapshot name created above. \(There is no default value for SNAPSHOTNAME.\)

        If the repository name is not connectionsbackup, override the default value by including REPONAME as a set value in the helm install command:

        ```
        helm install --name=esbackuprestore esbackuprestore-0.1.0.tgz --set image.tag=$estag,elasticSearchBackup=true,REPONAME=your\_repo\_name,SNAPSHOTNAME=your\_snapshot\_name
        ```

        The resulting job creates a pod that runs the restore script.

    4.  Run following command to check the restore pod status to ensure it completed the restore process:

        ```
        kubectl get pods -n connections -a |grep job-restore
        job-restore-6128f            0/1       Completed   0          12h
        ```

        **Tip:** The pod remains in a completed/terminated state so that you can check the logs during restore. Use the following command to check the logs:

        ```
        kubectl logs -n connections $(kubectl get pods -n connections -o wide -a |grep job-backup |awk '{print $1}')
        ```

        Your log should include response text similar to the following output:

        \{"snapshot":\{"snapshot":"snapshot20171127072737","indices":

        \["connections",".kibana"\],"shards":

        \{"total":11,"failed":0,"successful":11\}\}\}


If you need more information, see [Snapshot and Restore](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/modules-snapshots.html) in the Elasticsearch documentation.

