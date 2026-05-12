# Migrating data from Elasticsearch 7 to OpenSearch

To preserve the Metrics, Orient Me, and Recent History data stored in Elasticsearch 7 for your Connections 7 deployment, you must migrate that data to the OpenSearch service provided with Component Pack for Connections 8.

## Before you begin

Before you begin migration, verify that the Elasticsearch 7 server is running and ensure that the user account used has the proper access rights to perform the steps in this task.

To avoid losing new data while migrating the existing data, run this task during a maintenance window.

**Important:**

- The following PV Storage components are needed to restore Component Pack data to OpenSearch:
    - Component Pack service: OpenSearch
    - Required storage component: OpenSearch
    - Directories: /pv-connections/opensearchbackup
- Ensure that the OpenSearch cluster with master, data, and client node or nodes is already set up. Check that the OpenSearch cluster health is green.

For information on setting up persistent volumes, see [Set up persistent volumes and persistent volume claims on NFS](cp_install_services_tasks.md#pv_pvc).

## Migrate data
1. Get the index list that will be migrated into the new OpenSearch instance.
    1. Run the following command:

        ``` {#codeblock_wqc_4hs_z5b}
        kubectl exec -ti -n connections $(kubectl get pods -n connections | grep es-client | awk '{print $1}') -- bash
        
        /opt/elasticsearch-7.10.1/probe/sendRequest.sh GET /_cat/indices
        ```

        **Note:** Any green or yellow index status is fine. Fix the Elasticsearch 7 cluster first if you find any red status.

        Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

    2. Record the index names for the applications that you want to migrate. These names will be used in the rest of the migration process.

        |Application|Index name|Number of indices|
        |-----------|----------|-----------------|
        |Metrics|icmetrics\_a\_YYYY\_\{1h \| 2h\} for example, icmetrics\_a\_2019\_2h|Two per calendar year of data collection|
        |Type-ahead recent history|quickresults|One|

2. Register the snapshot repository in new OpenSearch cluster.
    1. Run the following commands:

        ``` {#codeblock_pmp_vhs_z5b}
        kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) --bash
        ```

        ``` {#codeblock_xmz_pqx_z5b}
        /usr/share/opensearch/probe/sendRequest.sh POST /_snapshot/${REPONAME} -H 'Content-Type: application/json' -d '{"type": "fs","settings": {"compress": true, "location": "${BACKUPPATH}"}}'
        ```

        This command returns the following output:

        ``` {#codeblock_c2m_qbq_bvb}
        o/p: {"acknowledged":true}
        ```

        Where:

        - `${REPONAME}` is the name of the snapshot repository, which will be used to register and manage the OpenSearch snapshot. The first time that you perform these steps, you must give the repository an appropriate name, for example, connectionsbackup.
        - `${BACKUPPATH}` is the mount path of the shared OpenSearch backup path. By default, this path is /backup.
        Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

    2. Verify:

        ``` {#codeblock_rmp_vhs_z5b}
        kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) --bash
        ```

        ``` {#codeblock_czm_sqx_z5b}
        /usr/share/opensearch/probe/sendRequest.sh GET /_snapshot/_all?pretty
        ```

        This command returns the following output:

        ``` {#codeblock_r4c_jyp_bvb}
        o/p: { “${REPONAME}” : { "type" : "fs", "settings" : { "compress" : "true", "location" : “${BACKUPPATH}” } } }
        ```

        Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

3. Copy the snapshot from the old Elasticsearch 7 cluster to the new OpenSearch cluster.

    **Note:** The following steps do not include specific commands, as file systems might vary between users \(NFS, EFS, and the like\).

    1. Ensure that you have the necessary permissions to complete this step.

    2. Go to the location which was configured as the backup storage of your old Elasticsearch 7 cluster \(for example /mnt/pv-connections/esbackup-7 or the NFS master location / /pv-connections/example/esbackup-7\).

    3. Package all content in it by running the following command: `tar -cvf backup.tar *`

    4. Copy the package to the location that was configured as the backup storage for the new OpenSearch cluster (for example /mnt/pv-connections/opensearchbackup or the NFS master location / /pv-connections/example/opensearchbackup).

    5. Extract the package by running the following command: `tar -xvf backup.tar`.

4. Verify that the existing OpenSearch indexes are present in the new OpenSearch cluster.
    1. Run the following command:

        ``` {#codeblock_pbw_vjs_z5b}
        kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client |awk '{print $1}' | head -n 1) --bash
        ```

        ``` {#codeblock_nzl_1rx_z5b}
        /usr/share/opensearch/probe/sendRequest.sh GET /_cat/indices
        ```

        Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

        **Note:** If you don't want the default or automatically created indexes or the ones that are already created here because you are planning to migrate them from ElasticSearch 7, it is best to delete those here \(either delete all or choose the ones you want to delete\):

        ``` {#codeblock_rbw_vjs_z5b}
        kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) --bash
        ```

        To delete all indexes:

        ``` {#codeblock_sbw_vjs_z5b}
        /usr/share/opensearch/probe/sendRequest.sh DELETE /_all
        ```

        To delete specific indexes:

        ``` {#codeblock_tbw_vjs_z5b}
        /usr/share/opensearch/probe/sendRequest.sh DELETE /<< INDEX NAME >>
        ```

        Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

    2. Do one of the following:
        - If the output shows that there are no existing indexes \(ignore default index if any, for example, opendistro\_security\) that use the same name that you recorded in step 1:
            1. Restore the snapshot directly by running the following command:

                ``` {#codeblock_xbw_vjs_z5b}
                kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) --bash
                ```

                ``` {#codeblock_if5_frx_z5b}
                /usr/share/opensearch/probe/sendRequest.sh POST /_snapshot/${REPONAME}/snapshot_migration/_restore
                ```

                This command returns the following output:

                ``` {#codeblock_bkj_kyp_bvb}
                o/p: {"accepted":true}
                ```

                Where `${REPONAME}` is the name of the snapshot repository, which will be used to register and manage the OpenSearch snapshot. The first time that you perform these steps, you must give the repository an appropriate name, for example, `connectionsbackup`.

                Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

            2. Skip to the [Verify migrated data in the user interface](#section_bsd_22t_ztb) section.

        - If the output shows that there are existing indexes with the same names that you recorded in step 1, continue to the next steps to resolve the conflict.

5. Restore the index names that do not have any conflict:

    ``` {#codeblock_imy_yjs_z5b}
    kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) --bash
    ```

    ``` {#codeblock_wlh_hrx_z5b}
    /usr/share/opensearch/probe/sendRequest.sh POST /_snapshot/${REPONAME}
    /snapshot_migration/_restore \
         -H 'Content-Type: application/json' \
         -d'
         {
              "indices":
              "comma_separated_list_of_index_names_with_no_conflict",
              "ignore_unavailable": true,
          }
    ```

    Where `${REPONAME}` is the name of the snapshot repository, which will be used to register and manage the OpenSearch snapshot. The first time that you perform these steps, you must give the repository an appropriate name, for example, connectionsbackup.

    Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

6. Restore the index names that have conflicts, using temporary names.

    Run the following commands to restore the snapshot using a temporary name for each index that has a conflict. The Metrics application is used as an example in the following commands and steps:

    ``` {#codeblock_mvh_kks_z5b}
    kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) --bash
    ```

    ``` {#codeblock_twp_lks_z5b}
    /usr/share/opensearch/probe/sendRequest.sh POST /_snapshot/${REPONAME}
    /snapshot_migration/_restore \
            -H 'Content-Type: application/json' \
            -d'
            {
              "indices": "comma_separated_list_of_index_names_WITH_conflict",
              "ignore_unavailable": true,
              "rename_pattern": "icmetrics_a_(.+)",
              "rename_replacement": "migrated_icmetrics_a_$1"
            }
    ```

    Where `${REPONAME}` is the name of the snapshot repository, which will be used to register and manage the OpenSearch snapshot. The first time that you perform these steps, you must give the repository an appropriate name, for example, connectionsbackup.

    Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

7. Re-index data from the restored temporary indexes to the target indexes.
    1. For every temporary index restored and renamed in step 6, run the following commands to re-index the migrated data into a target index \(run these commands for one index at a time\):

        ``` {#codeblock_z3r_1ms_z5b}
        kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) --bash
        ```

        ``` {#codeblock_ajr_1ms_z5b}
        /usr/share/opensearch/probe/sendRequest.sh POST /_reindex \
                -H 'Content-Type: application/json' \
                -d'
                {
                          "source": {
                                    "index":
        "migrated_ONE_index_name_with_conflict"
                                    },
                            "dest": {
                                      "index": "Corresponding_EXISTING_index_name"
                                    }
                 }
        ```

        Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

    2. Delete each temporary index that you resolved in above step by running the following command:

        ``` {#codeblock_bjr_1ms_z5b}
        kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) --bash
        ```

        ``` {#codeblock_nfx_jrx_z5b}
        /usr/share/opensearch/probe/sendRequest.sh DELETE
        /index_name_with_conflict_from_step_8a
        ```

        Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).




## Verify migrated data in the user interface

Use the UI to verify that the Metrics and type-ahead search data was migrated successfully.

1. Verify Metrics data:
    1. Log in to Metrics as the organization admin, using the following address:

        `https://your\_Connections\_server\_host\_name/metrics/orgapp\#/`

    2. View a global report and verify that the migrated data displays.
    3. Verify that you can view reports by Group by in either Community Metrics or Global Metrics.

2. Verify type-ahead search data:
    1. Log in to Connections.
    2. Navigate to some content, such as a forum, wiki, or community. View a global report and verify that the migrated data displays.
    3. Open the type-ahead search sidebar by clicking the Search icon. Verify that you can see the content you viewed at the top of the list.

**Parent topic:** [Steps to install or upgrade to Component Pack 8](../install/cp_install_services_tasks.md)

