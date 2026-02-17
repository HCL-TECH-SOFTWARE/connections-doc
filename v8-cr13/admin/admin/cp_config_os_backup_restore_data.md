# Backing up and restoring data for OpenSearch indices {#backupopensearchindex .task}

1.  Register the snapshot repository in the Elasticsearch 7 cluster and back up the index.
    1.  Create the snapshot:
        1.  Get a shell to the running container (es-client):

            ```bash
            kubectl exec -ti -n connections $(kubectl get pods -n connections | grep es-client | awk '{print $1}') -- /bin/bash
            ```

            Locate the current directory:
         
            ```bash
            pwd
            ```
         
            This command shows the following output:
         
            ```bash
            /opt/elsticsearch-7.10.1
            ```
      
        2.  Go to the "probe" directory, that is `/opt/elsticsearch-7.10.1/probe`

        3.  Create a snapshot repository:

            ```bash
            ./sendRequest.sh PUT /_snapshot/<REPO> -H 'Content-Type: application/json' -d '{"type": "fs","settings": {"compress": true, "location":  "<BACKUPPATH>"}}'
            ```

            Where:

            -   `<REPO>` is the snapshot repository name, for example `hclcnx_es7`.
            -   `<BACKUPPATH>` is the mount path of the Elasticsearch 7 backup peristent volume (`/pv-connections/esbackup-7`). By default, this path is `/backup`.

            For example:

            ```bash
            ./sendRequest.sh PUT /_snapshot/hclcnx_es7 -H 'Content-Type: application/json' -d '{"type": "fs","settings": {"compress": true, "location": "/backup"}}'
            ```

    2.  Back up the Elasticsearch 7 indices.
        1.  Run the following command:
   
            ```bash
            ./doBackup.sh <REPO>
            ```

            Where `<REPO>` is the snapshot repository name, for example `hclcnx_es7`.

            The backup indices are created into a /backup directory, which you can view outside of the container at /pv-connections/esbackup-7.
  
        2.  The following are additional commands you can perfom:
            -   To check all snapshots, run:
      
                ```bash
                ./sendRequest.sh GET /_snapshot/<REPO>/_all?pretty
                ```
          
                Where `<REPO>` is the snapshot repository name for Elasticsearch 7, that is `hclcnx_es7`.

                For example:

                ```bash
                ./sendRequest.sh GET /_snapshot/hclcnx_es7/_all?pretty
                ```

                The output of this command provides the snapshot name (`<SNAPSHOT>`), UUID, and details of indices.
    
            -   To delete a snapshot, run:
    
                ```bash
                ./sendRequest.sh DELETE /_snapshot/<REPO>/<SNAPSHOT>?pretty
                ```
    
                Where:
                
                -   `<REPO>` is the snapshot repository name, for example `hclcnx_es7`.
                -   `<SNAPSHOT>` is the snapshot name.
                
                For example:
    
                ```bash
                ./sendRequest.sh DELETE /_snapshot/hclcnx_es7/ snapshot20221019232050?pretty
                ```

2.  Get the index list, which will be migrated into the new OpenSearch instance using the following commands:
    1.  Get a shell to the running container (es-client):

        ```bash
        kubectl exec -ti -n connections $(kubectl get pods -n connections | grep es-client | awk '{print $1}') -- /bin/bash
        ```

        Locate the current directory:
         
        ```
        pwd
        ```
         
        This command shows the following output:
         
        ```bash
        /opt/elsticsearch-7.10.1
        ```
    
    2.  Go to the "probe" directory, that is `/opt/elsticsearch-7.10.1/probe`

    3.  Run `./sendRequest.sh GET /_cat/indices`

        !!! note 
            
            If you get any green or yellow index statuses, that is fine. If you encounter any red status, fix the Elasticsearch 7 cluster first.

    4.  Record the index names for the applications that you intend to migrate. These names will be used for the rest of the migration process.

        |Application|Index name| Number of indices|
        |---|---|---|
        |Metrics|icmetrics_a_YYYY_{1h \| 2h}, for example icmetrics_a_2019_2h|Two per calendar year of data collection|
        |Type-ahead search|quickresults|One|

3.  Register the snapshot repository in the OpenSearch cluster by running the following commands.
    1.  Create the snapshot.
        1.  Get a shell to the running container (opensearch-cluster-client):

            ```bash
            kubectl exec -ti -n connections $(kubectl get pods -n connections | grep opensearch-cluster-client | awk '{print $1}') -- /bin/bash
            ```

            ```bash
            /usr/share/opensearch
            ```

        2.  Go to the "probe" directory, that is `/usr/share/opensearch/probe`

        3.  Create a snapshot repository:

            ```bash
            ./sendRequest.sh PUT /_snapshot/<REPO> -H 'Content-Type: application/json' -d '{"type": "fs","settings": {"compress": true, "location":  "<BACKUPPATH>"}}'
            ```
    
            Where:

            - `<REPO>` is the snapshot repository name for OpenSearch, which is `os_snaps_repo`.
            - `<BACKUPPATH>` is the mount path of the OpenSearch backup peristent volume (`/pv-connections/opensearchbackup`). By default, this path is `/backup`.

            For example:

            ```bash
            ./sendRequest.sh PUT /_snapshot/os_snaps_repo -H 'Content-Type: application/json' -d '{"type": "fs","settings": {"compress": true, "location": "/backup"}}'
            ```

    2.  Verify the Snapshot repository.
    
        To check all snapshots, run:

        ```bash
        $./sendRequest.sh GET /_snapshot/<REPO>/_all?pretty
        ```

        Where `<REPO>` is the snapshot repository name for OpenSearch, which is `os_snaps_repo`.

        For example:

        ```bash
        ./sendRequest.sh GET /_snapshot/os_snaps_repo/_all?pretty
        ```

        This shows the following output:

        ```bash
        { “${REPONAME}” : { "type" : "fs", "settings" : { "compress" : "true", "location" : “${BACKUPPATH}” } } }
        ```
      
    3.  Verify that the existing default OpenSearch indexes are already in the OpenSearch cluster:

        ```bash
        ./sendRequest.sh GET /_cat/indices
        ```

        !!! note 
            
            If you do not want the default or automatically created indices or the ones that are created here, but you are planning to migrate the indices from Elasticsearch 7, then it's recommended that you delete those here (either delete all or cherry pick using the following commands).

        -   To delete all:
       
            ```bash
            ./sendRequest.sh DELETE /_all
            ```
      
        -   To cherry pick:

            ```bash
            ./sendRequest.sh DELETE /<< INDEX NAME >>
            ```
        !!! note 
            
            After deleting existing indices, the output shows that there are no indices. Ignore any default indices, if any, for example opendistro_security.
    
4.  Copy the snapshot from the old Elasticsearch 7 cluster to the OpenSearch cluster.

    !!! note 
        
        Commands for the following steps are not provided as different users can use different file systems, for example NFS, EFS, and so on.
    
    1.  Ensure that you have the necessary permissions to complete these steps.

    2.  Go to the Elasticsearch 7 backup persistent volume (`/pv-connections/esbackup-7`, if mounted, `/mnt/pv-connections/esbackup-7` or NFS `master:/ /pv-connections/esbackup-7`).

    3.  Package all content in it by running the following command:
      
        ```bash
        tar -cvf es7backup.tar *
        ```
    
    4.  Extract the package to the OpenSearch backup persistent volume (/pv-connections/opensearchbackup) location that was configured as the backup storage for the new OpenSearch cluster.

        To extract, run `tar -xvf es7backup.tar`
    
    5.  Restart the "opensearch-cluster-client" pod or pods, so the correct permissions and ownership are assigned to the snapshots and indices in the /backup directory.

5.  Restore the Elasticsearch 7 snapshot to OpenSearch.
    1.  Close the indices first:
      
        ```bash
        ./sendRequest.sh POST /_all/_close
        ```
        ./sendRequest.sh POST /_all/_close```
    
        To close only a given index, run:

        ```bash
        ./sendRequest.sh POST /${INDEX}/_close
        ```
        Closing a specific index means only that index can be restored. This is because an index needs to be closed before restoration.

    2.  After copying the snapshot to the OpenSearch cluster from step 4:
        1.  Check the snapshot:

            ```bash
            ./sendRequest.sh GET /_snapshot/<REPO>/_all?pretty
            ```

            Where `<REPO>` is the snapshot repository name for OpenSearch, which is `os_snaps_repo`.

            For example:

            ```bash
            ./sendRequest.sh GET /_snapshot/os_snaps_repo/_all?pretty
            ```

            The output of this command provides the snapshot name (`<SNAPSHOT>`), UUID, and details of indices.
      
        2.  To restore a snapshot in the repository, run:
          
            ```bash
            ./sendRequest.sh POST /_snapshot/${REPO}/<SNAPSHOT>/_restore?wait_for_completion=true
            ```

            For example:

            ```bash
            ./sendRequest.sh POST /_snapshot/os_snaps_repo/<SNAPSHOT>/_restore?wait_for_completion=true
            ```

        3.  When the restoration is complete, check the status of indices:

            ```bash
            ./sendRequest.sh GET /_cat/indices
            ```
            In the output of this command, any green or yellow index statuses is fine. If you encounter any red status, fix the OpenSearch cluster.


**Parent topic:** [Administering Component Pack for Connections](../admin/c_admin_component_pack_intro.md)

