# Upgrading OpenSearch 1.x to 2.x in HCL Connections

In HCL Connections 8.0 OpenSearch replaces Elasticsearch 7. OpenSearch regularly releases updates which includes enhancements and fixes, thus, it is important to upgrade OpenSearch to apply these changes. 

## Before you begin

Ensure to go through and review the [OpenSearch Official documentation](https://opensearch.org/docs/2.0/install-and-configure/upgrade-opensearch/index) before you start to upgrade OpenSearch.

!!! note

    If you are using Elasticsearch 7.x and want to upgrade to OpenSearch 2.x, perform the steps detailed in  
[Steps to install or upgrade to Component Pack 8](cp_install_services_tasks.md). 

## Backing up configuration files

If you are using Elasticsearch 7.x and want to upgrade to OpenSearch 2.x, perform the steps detailed in  
[Steps to install or upgrade to Component Pack 8](cp_install_services_tasks.md).

These files can include `opensearch.yml`, plugin configuration files, and TLS certificates. Once you identify which files you want to back up, copy them to remote storage for safekeeping.

## Creating a snapshot

We recommend that you back up your cluster state and indexes using snapshots. The snapshots you take before an upgrade can be used as restore points if you need to roll back the cluster to its original version.

To register the snapshot repository in OpenSearch 1.x:

1. Connect to an OpenSearch 1.x client pod by running the following command:

    ```sh
    kubectl exec -ti -n connections $(kubectl get pods -n connections|grep opensearch-cluster-client |awk '{print $1}') -- bash
    ```

2.  Enter the following commands, which make use of the `sendRequest` utility to communicate with OpenSearch 1.x:.

    ```sh
    /usr/share/opensearch/probe/sendRequest.sh PUT /_snapshot/${REPONAME} \
    -H 'Content-Type: application/json' \
    -d '{"type": "fs","settings": {"compress" : true, "location": "${BACKUPPATH}"}}'
    ```sh
    Output: 
    ```sh    
    {"acknowledged":true}
    /usr/share/opensearch/probe/sendRequest.sh GET /_snapshot/_all?pretty
    ```

    Output:

    ```sh
    { “${REPONAME}” : { "type" : "fs", "settings" : { "compress" : "true", "location" : “${BACKUPPATH}” } } }
    ```

    Where:

    - `${REPONAME}` is the name of the snapshot repository, which is used to register and manage the OpenSearch 1.x snapshot. When performing these steps for the first time, you must provide a meaningful repository name, for example, `connectionsbackup`.

    - `${BACKUPPATH}` is the mount path of the shared OpenSearch 1.x backup persistent volume (`esbackup`). By default, this path is `/backup`.

3.  Back up all OpenSearch 1.x indexes by running the following command:

    ```sh
    /usr/share/opensearch/probe/sendRequest.sh PUT /_snapshot/${REPONAME}/snapshot_migration?wait_for_completion=true
    ```

    Where:

- `${REPONAME}` is the name of the snapshot repository that was previously used to register and manage the OpenSearch 1.x snapshot. 
    For example, `connectionsbackup`.

    Output

    ```sh
    {"snapshot":{"snapshot” **** ******* ****** **** :{"total":XX,"failed":0,"successful":XX}}}
    ```

## Deploying OpenSearch 2.0

Perform the steps detailed in [Set up OpenSearch](cp_install_services_tasks.md) to upgrade the existing OpenSearch version to the latest (2.x) version available on Harbor.

!!! note

    There is no need to migrate data as the same PV/PVCs are used for OpenSearch 2.x.