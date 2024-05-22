# Upgrading OpenSearch 1.x to 2.x in HCL Connections

In HCL Connections 8.0 OpenSearch replaces Elasticsearch 7. OpenSearch regularly releases updates which includes enhancements and fixes, thus, it is important to upgrade OpenSearch to apply these changes. 

## Before you begin

Ensure to go through and review the [OpenSearch Official documentation](https://opensearch.org/docs/2.0/install-and-configure/upgrade-opensearch/index) before you start to upgrade OpenSearch.

!!! note

    If you are using ElasticSearch 7.x and want to upgrade to OpenSearch 2.x, perform the steps detailed in [Steps to install or upgrade to Component Pack 8](cp_install_services_tasks.md). 

## Backing up configuration files

To mitigate the risk of data loss, it is highly recommended to back up any important files before beginning an upgrade. Typically, these files will be located in the `opensearch/config` directory within the OpenSearch pod.

These files can include `opensearch.yml`, plugin configuration files, and TLS certificates, for example. Once you identify which files you want to back up, copy them to remote storage for safety.

## Creating a snapshot

We recommend that you back up your cluster state and indexes using snapshots. The snapshots you take before an upgrade can be used as restore points if you need to roll back the cluster to its original version.

To register the snapshot repository in OpenSearch 1.x:

1.  Connect to an OpenSearch 1.x client pod by running the following command:

    ```
    kubectl exec -ti -n connections $(kubectl get pods -n connections|grep opensearch-cluster-client |awk '{print $1}') -- bash
    ```

2.  Enter the following commands, which make use of the `sendRequest` utility to communicate with OpenSearch 1.x:.

    ```
    /usr/share/opensearch/probe/sendRequest.sh PUT /_snapshot/${REPONAME} \
    -H 'Content-Type: application/json' \
    -d '{"type": "fs","settings": {"compress" : true, "location": "${BACKUPPATH}"}}'
    ```

    Output: 

    ```    
    {"acknowledged":true}
    ```

    ```
    /usr/share/opensearch/probe/sendRequest.sh GET /_snapshot/_all?pretty
    ```

    Output:

    ```
    { “${REPONAME}” : { "type" : "fs", "settings" : { "compress" : "true", "location" : “${BACKUPPATH}” } } }
    ```

    where:
    -   `${REPONAME}` is the name of the snapshot repository, which will be used to register and manage the OpenSearch 1.x snapshot. When performing these steps for the first time, you must give the repository an appropriate name, for example, `connectionsbackup`.
    -   `${BACKUPPATH}` is the mount path of the shared OpenSearch 1.x backup persistent volume (esbackup). By default this path is `/backup`.

3.  Back up all OpenSearch 1.x indexes by running the following command:

    ```
    /usr/share/opensearch/probe/sendRequest.sh PUT /_snapshot/${REPONAME}/snapshot_migration?wait_for_completion=true
    ```

    where:
    -   `${REPONAME}` is the name of the snapshot repository, which was previously used to register and manage the OpenSearch 1.x snapshot, for example, `connectionsbackup`.

    Output

    ```
    {"snapshot":{"snapshot” **** ******* ****** **** :{"total":XX,"failed":0,"successful":XX}}}
    ```

## Deploying OpenSearch 2.0

Perform the steps detailed in [Set up OpenSearch](cp_install_services_tasks.md) to upgrade the existing OpenSearch version to the latest (2.x) version available on Harbor.

!!! note

    There is no need to migrate data as we are using same PV/PVCs for OpenSearch 2.x.
