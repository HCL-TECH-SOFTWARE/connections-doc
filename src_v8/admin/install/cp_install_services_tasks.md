# Steps to install or upgrade to Component Pack 8 {#cp_install_services_tasks .concept}

Use these steps to help you install Component Pack 8 or replace Component Pack 7 with 8.

## Before you begin {#section_awd_rwp_tnb .section}

For background information and where to get the latest download, see [Installation and upgrade](cp_install_upgrade_container.md).

When preparing to install or upgrade to Component Pack 8, consider the recommendations in [Upgrade considerations for Component Pack 8](upgrade_considerations.md).

Before starting the steps, ensure you have the following:

-   A system running Connections \(if you are upgrading from Component Pack 7, a system running Connections 7 with Component Pack deployed\).
-   Kubernetes up and running.

    **Note:** This article does not contain the initial steps to get your Kubernetes platform up and running. The base setup depends on your environment which could be Kubernetes-only.

-   Access to the [Harbor repository](https://hclcr.io/harbor/projects/15/repositories).

Note the following configurations:

**Network configuration:** All machines in our scenario are configured to use DNS and all of them have internet access. The initial entry point is nginx.example.com, which, in our case, can be reached from the internet. Your NGINX might reside behind a load balancer instead. To let the machines interoperate properly, consider the following inbound ports to be opened on your firewall:

-   connections.example.com::
    -   443 from nginx.example.com
    -   443 from cpmaster.example.com
-   cpmaster.example.com:
    -   30301 from connections.example.com \(Customizer\)
    -   30301 from nginx.example.com \(Customizer\)
    -   30098 from connections.example.com \(Elasticsearch 7 – Connections 7 only\)
    -   30099 from connections.example.com \(OpenSearch – Connections 7 or 8, Elasticsearch 5 – Connections 6.5 only\)
    -   32080 from connections.example.com \(Ingress Controller\)
    -   31810 from connections.example.com \(Microsoft Outlook add-in – Connections 7 only\)
-   nginx.example.com:
    -   443 from everywhere
    -   80 from everywhere \(in case you plan to redirect to 443 and no load balancer does this job\)

**Storage configuration:** Starting with Connections 7, it is possible to use different types of storage. The recommended setup contains configuration of a NFSv4 entry point to store both data from shared WebSphere-based Connections services, as well as claims and PVs from the Component Pack side.

## Installation vs. upgrade steps {#section_v5r_1dj_dvb .section}

The complete steps to deploy Component Pack 8 below are in chronological order, but note that there are differences between the installation and upgrade procedures. Some of the following steps apply only to one scenario \(install *or* upgrade\), while others apply to both \(install *and* upgrade\). Refer to [Order of installation](cp_install_upgrade_container.md#order_cp_install) for the complete list of steps for each scenario.

## Set up NFS {#section_e4p_jrp_tnb .section}

We don't recommend or support any particular configuration of NFS – you can use whatever NFS implementation is available. For the sake of this example, however, let's assume that our NFS is on cp1.internal.cnx-dev.net, you have root access there, you installed NFS, you know how to manage it, and you just need the stuff needed for Component Pack.

-   Create /pv-connections folder on cp1.internal.cnx-dev.net
-   Inside that folder, create this set of subfolders:
    -   /pv-connections/customizations with permissions 0005
    -   /pv-connections/esbackup-7 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade \)
    -   /pv-connections/esdata-7-0 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade \)
    -   /pv-connections/esdata-7-1 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade \)
    -   /pv-connections/esdata-7-2 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade \)
    -   /pv-connections/esmaster-7-0 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade \)
    -   /pv-connections/esmaster-7-1 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade \)
    -   /pv-connections/esmaster-7-2 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade \)
    -   /pv-connections/kudos-boards-minio with permissions 0700
    -   /pv-connections/mongo-node-0 with permissions 0700
    -   /pv-connections/mongo-node-1 with permissions 0700
    -   /pv-connections/mongo-node-2 with permissions 0700

Ensure that all of the preceding folders are exported and mountable from your Kubernetes workers before you proceed.

## Create the namespace {#section_ln3_qp3_dvb .section}

On the server which has Helm v3 and kubectl configured for your non-root user, create the Connections namespace in Kubernetes by running the following command:

``` {#codeblock_ajc_sp3_dvb}
kubectl create namespace connections
```

## Back up MongoDB 3 data {#backup_mongo3 .section}

Back up data with x509 Authentication activated.

1.  Connect to a Mongo pod by running the following command:

    ``` {#codeblock_ng3_xzp_bvb}
    `kubectl exec -ti -n connections $(kubectl get pods -n connections |grep mongo-0|awk '{print $1}') -- bash`
    ```

2.  Connect to a Mongo3 daemon:

    ``` {#codeblock_epm_yzp_bvb}
    mongo --ssl --sslPEMKeyFile /etc/mongodb/x509/user_admin.pem --sslCAFile /etc/mongodb/x509/mongo-CA-cert.crt --host $(hostname -f) --authenticationDatabase '$external' --authenticationMechanism MONGODB-X509
    ```

    ``` {#codeblock_fpm_yzp_bvb}
    o/p: MongoDB server version: 3.*.*
    Welcome to the MongoDB shell 
    ……………
    ……………
    ```

3.  Lock the data sync:

    ``` {#codeblock_ovx_zzp_bvb}
    use admin
    db.fsyncLock()
    ```

    ``` {#codeblock_pvx_zzp_bvb}
    o/p: "info" : "now locked against writes, use db.fsyncUnlock() to unlock",
    ……………
    ……………
    ```

    Disconnect from Mongo3 daemon \(press Ctrl+D, or type `exit` and press Enter\).

4.  Back up the database:

    ``` {#codeblock_mck_b1q_bvb}
    mongodump --ssl --sslPEMKeyFile /etc/mongodb/x509/user_admin.pem --sslCAFile /etc/mongodb/x509/mongo-CA-cert.crt --host $(hostname -f) --authenticationDatabase '$external' --authenticationMechanism MONGODB-X509 --username 'C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb' --out /data/db/backups/catalog-bkp1
    ```

    ``` {#codeblock_nck_b1q_bvb}
    o/p: 2022-08-19T05:22:09.909+0000	writing admin.system.users to 2022-08-19T05:22:09.914+0000	done dumping admin.system.users (27 documents)
    ……………
    ……………
    ```

5.  Reconnect to the daemon \(perform step 2\), and then unlock the data sync:

    ``` {#codeblock_hng_c1q_bvb}
    use admin
    db.fsyncUnlock ()
    ```

    ``` {#codeblock_ing_c1q_bvb}
    o/p: " info" : "fsyncUnlock completed",
    ……………
    ……………
    ```

6.  Verify that the data is backed up:

    ``` {#codeblock_rkq_vzp_bvb}
    ls /data/db/backups/catalog-bkp1
    ```

    ``` {#codeblock_skq_vzp_bvb}
    o/p: admin  boards-app  boards-licence ……………
    ```


## Back up Elasticsearch 7 data {#backup_es7 .section}

Change directory to - cd probe:

1.  Create a snapshot repository:

    ``` {#codeblock_u4y_hhs_z5b}
    ./sendRequest.sh PUT /_snapshot/${REPONAME} \
    -H 'Content-Type: application/json' \
    -d '{"type": "fs","settings": {"compress" : true, "location":
    "${BACKUPPATH}"}}'
    ```

    For example:

    ``` {#codeblock_wfz_xfh_dvb}
    ./sendRequest.sh PUT /_snapshot/hclcnx_es7 -H 'Content-Type: application/json' -d '{"type": "fs","settings": {"compress" : true, "location": "/backup"}}'
    ```

2.  Run backup script to take the current backup of Elasticsearch 7 indices:

    ``` {#codeblock_nq1_2gh_dvb}
    ./doBackup.sh <REPONAME>
    ```

    After completing the backup, you will get a successful result, along with the snapshot name, UUID, and details of indices. Take note of the snapshot name field value, as it is required during data restoration.

    For example:

    ``` {#codeblock_rpl_d5p_bvb}
    ./doBackup.sh hclcnx_es7
    ```

    Where the output would be:

    ``` {#codeblock_upl_d5p_bvb}
    ----------------to create a snapshot hclcnx_es7
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100   667  100   667    0     0     51      0  0:00:13  0:00:13 --:--:--   174
    {"snapshot":{"snapshot":"snapshot20221005174737","uuid":"zwAIj8ccRb2efCqANCYV9w","version_id":7060199,"version":"7.6.1","indices":["icmetricscommlist","quickresults",".signals_watches_state","orient-me-collection","icmetricsconfig","icmetrics_a_2021_2h",".signals_settings",".signals_watches","icmetrics_a_2022_2h","icmetrics_a_2021_1h",".signals_accounts","icmetrics_a_2022_1h"],"include_global_state":true,"state":"SUCCESS","start_time":"2022-10-05T17:47:37.917Z","start_time_in_millis":1664992057917,"end_time":"2022-10-05T17:47:50.146Z","end_time_in_millis":1664992070146,"duration_in_millis":12229,"failures":[],"shards":{"total":43,"failed":0,"successful":43}}}
    ```

3.  To get all snapshots:

    ``` {#codeblock_cbf_25p_bvb}
    ./sendRequest.sh GET /_snapshot/REPONAME/_all?pretty
    ```

4.  Disconnect from the pod \(press Ctrl+D, or type `exit` and press Enter\).

## Set up OpenSearch and MongoDB volumes on NFS {#setup_nfs .section}

1.  Validate that Helm works properly:

    ``` {#codeblock_pdh_pgr_bvb}
    helm list
    ```

2.  Create additional OpenSearch volumes on the NFS master node:

    ``` {#codeblock_jxd_ygr_bvb}
    mkdir -p /pv-connections/opensearchmaster-{0,1,2}
    mkdir -p /pv-connections/opensearchdata-{0,1,2}
    mkdir -p /pv-connections/opensearchclient-{0,1,2}
    mkdir -p /pv-connections/opensearchbackup
    ```

    Connections 8 uses OpenSearch 1.3.0 as the default backend for Metrics and Search. For previous versions, persistent volumes have been defined to hold data. However, with OpenSearch, you need PVs for OpenSearch masters, OpenSearch data, OpenSearch client, and OpenSearch backup. The main reason for this is stability: Without a persistent state, pod recreation can interfere with outdated data, causing OpenSearch to not start properly. The resulting TCP readiness check might summarize and report the whole OpenSearch system to be down then.

3.  Similarly with MongoDB 5, you need PVs for all the replicas of mongo5 pod. So, create additional MongoDB volumes on the NFS master node:

    ``` {#codeblock_x2b_1hr_bvb}
    mkdir -p /pv-connections/mongo5-node-0
    mkdir -p /pv-connections/mongo5-node-1
    mkdir -p /pv-connections/mongo5-node-2
    ```

4.  Make the additional OpenSearch and MongoDB 5 volumes available via NFS.

    1.  Download the nfsSetup.sh script from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/third_party/nfs-install/templates/nfsSetupScript).

    2.  Check if firewalld is already installed on the NFS master. If not, run the following command:

        ``` {#codeblock_ryy_jhr_bvb}
        sudo yum install firewalld
        ```

    3.  Run nfsSetup.sh to set up NFS directories on the NFS master:

        ``` {#codeblock_syy_jhr_bvb}
        sh nfsSetup.sh
        ```

        Make sure that the firewall configuration does not block access to NFS. Adjustments might be needed for Component Pack 8 deployment compared to the Component Pack 7 setup.

    4.  In /etc/exports, validate that the additional PVs are distributed properly.


## Add Harbor Helm repository {#harbor_repo .section}

1.  Check if Harbor repository is already added:

    ``` {#codeblock_eqf_5hr_bvb}
    helm repo list | grep v-connections-helm | grep << harbor repo path >>
    ```

    If not, add Harbor using the following command:

    ``` {#codeblock_fqf_5hr_bvb}
    helm repo add v-connections-helm << helm repo path >> --username << helm_repo_username >> --password << helm_repo_password >> --pass-credentials
    ```

    Where:

    -   `<< helm repo path >>` is the Helm chart path in Harbor repository, that is `https://hclcr.io/chartrepo/cnx`
    -   `<< helm_repo_username >>` is the Harbor username
    -   `<< helm_repo_password >>` is the CLI secret \(to access, **log in to Harbor** \> **at the top-right corner, click on your name** \> **User Profile** \> **CLI Secretsecret**\)
2.  Since you'll be switching the Docker registry to Harbor, you need to recreate the secret called `myregkey`:

    1.  First, delete the credentials:

        ``` {#codeblock_ug2_zhr_bvb}
        kubectl delete secret myregkey -n connections
        ```

    2.  Set up credentials for a private Docker registry:

        ``` {#codeblock_vg2_zhr_bvb}
        kubectl create secret docker-registry myregkey -n connections --docker-server=<< docker_registry_url >> --docker-username=<< docker_registry_username >> --docker-password << docker_registry_password >>
        ```


## Set up Helm charts {#setup_helm .section}

Install or upgrade to the Connections 8 Kubernetes by deploying the Helm charts delivered with Component Pack 8.

The HCL Connections deployment automation Git repository includes a set of templates to override the default values to values that are appropriate to your environment. The resulting files are the ones used by the following Helm upgrade commands using the -f option.

For example, if you want the opensearch cluster name to be "opensearch-cluster", you need to change the following line from this:

``` {#codeblock_cpg_x2j_dvb}
clusterName:                {{ __opensearch_cluster_name }}
```

To this:

``` {#codeblock_dpg_x2j_dvb}
clusterName:                opensearch-cluster
```

For sample values of these variables, refer to the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/vars/main.yml).

**Note:** If you do not have all installation options from your Connections 7 environment at hand, you can run the following command to retrieve this information from the deployed charts:

``` {#codeblock_fpg_x2j_dvb}
helm -n connections get values <chart_name>
```

## Set up pod security policy {#pod_sec .section}

Install or upgrade the existing Kubernetes Helm chart to the new version. Start by finding out the k8s-psp chart version available on Harbor:

``` {#codeblock_ybc_mnq_bvb}
helm search repo v-connections-helm --devel | grep k8s-psp | awk {'print $2'}
```

``` {#codeblock_wfz_mnq_bvb}
o/p 0.1.0-20210909-112534
```

Then upgrade:

``` {#codeblock_olv_nnq_bvb}
helm upgrade k8s-psp v-connections-helm/k8s-psp -i --version 0.1.0-20210909-112534 --set namespace=connections --namespace connections --wait
```

## Set up persistent volumes and persistent volume claims on NFS {#pv_pvc .section}

Make sure that the network configuration of your NFS environment is correct before configuring the Connections PVs:

1.  Before installing the connections-volumes Helm chart to set up the persistence layer, delete the existing chart volumes:

    ``` {#codeblock_hyz_1jr_bvb}
    helm delete connections-volumes -n connections
    ```

    It might take some time to delete the existing volumes.

2.  If you have upgraded the existing Component Pack 7 charts instead of deleting them and starting with a fresh Component Pack 8 installation, perform this step. Otherwise, skip to the next step.

    This is because if you deleted all Component Pack 7 charts, the linked PVs and PVCs are properly removed and therefore do not need further action. However, if you upgraded the charts, you would need to manually touch those PVs and PVCs.

    First, check the status of PVCs:

    ``` {#codeblock_xc3_cjr_bvb}
    kubectl get pvc -n connections
    ```

    If the Terminating status shows no progress, remove the persistent volume protection for all blocked elements to get them deleted:

    ``` {#codeblock_yc3_cjr_bvb}
    kubectl patch pvc -n connections -p '{"metadata":{"finalizers": []}}' --type=merge <NAME>
    ```

    For example:

    ``` {#codeblock_zc3_cjr_bvb}
    kubectl patch pvc -n connections -p '{"metadata":{"finalizers": []}}' --type=merge es-pvc-es-data-7-0
    ```

    If the `kubectl get pvc -n connections` command shows no more Terminating elements, proceed with installation below.

3.  Install connections-volumes chart.

    Find out the connections-volumes chart version that is available on Harbor:

    ``` {#codeblock_ox1_vkr_bvb}
    helm search repo v-connections-helm --devel | grep connections-persistent-st | awk {'print $2'}
    ```

    ``` {#codeblock_px1_vkr_bvb}
    o/p 0.1.1-20220505-090030
    ```

    Then, run installation:

    ``` {#codeblock_qx1_vkr_bvb}
    helm upgrade connections-volumes v-connections-helm/connections-persistent-storage-nfs -i --version 0.1.1-20220505-090030 -f connections-volumes.yml --wait
    ```

    **Note:** Use your destination **nfs.server** and **persistentVolumePath** as parameters in connections-volumes.yml.

4.  Verify that all PVCs are in "bound" state:

    ``` {#codeblock_sx1_vkr_bvb}
    kubectl get pvc -n connections
    ```


## Set up bootstrap charts {#bootstrap .section}

The bootstrap chart not only defines the network interoperability parameters but also creates secrets and certificates for various components, including Redis and OpenSearch.

Be aware that bootstrap installation overwrites existing secrets, and therefore requires redoing some configuration steps, like SSL interoperability with OpenSearch.

Start by deleting the existing chart:

``` {#codeblock_bnf_mrr_bvb}
helm delete bootstrap -n connections
```

Find out the bootstrap chart version available on Harbor:

``` {#codeblock_nww_2sy_bvb}
helm search repo v-connections-helm --devel  | grep bootstrap | awk {'print $2'}
```

``` {#codeblock_oww_2sy_bvb}
o/p 0.1.0-20220714-190047
```

Run the bootstrap installation:

``` {#codeblock_kmt_y2j_dvb}
helm upgrade bootstrap v-connections-helm/bootstrap -i --version 0.1.0-20220411-104621 --namespace connections -f bootstrap.yml --wait
```

## Set up connections-env chart {#cnx_env .section}

To install the connections-env chart, run:

``` {#codeblock_ftt_lrq_bvb}
helm search repo v-connections-helm --devel  | grep connections-env | awk {'print $2'}
0.1.40-20220616-233100
```

``` {#codeblock_m2c_nrq_bvb}
helm upgrade connections-env v-connections-helm/connections-env -i --version 0.1.40-20220616-233100 --namespace connections -f connections-env.yml --wait
```

## Delete ingresses {#del_ingress .section}

Remove ingresses before Component Pack deployment, otherwise the infrastructure will fail:

``` {#codeblock_w3v_trq_bvb}
kubectl delete ingress -n connections $(kubectl get ingress -n connections | awk '{print $1}' | grep -vE "NAME")
```

## Install MongoDB 5 {#inst_mongo5 .section}

Perform the steps in [Installing MongoDB 5 for Component Pack 8](installing_mongodb_5_for_component_pack_8.md).

## Set up infrastructure charts {#infra_chart .section}

1.  Make sure that the Mongo5 NFS folders on the NFS master node are empty:

    ``` {#codeblock_mjl_tsr_bvb}
    ls -la mongo5-node-0/data/db/
    ls -la mongo5-node-1/data/db/
    ls -la mongo5-node-2/data/db/
    ```

2.  Delete the infrastructure charts using the following commands:

    ``` {#codeblock_njl_tsr_bvb}
    helm delete infrastructure -n connections
    ```

    ``` {#codeblock_ojl_tsr_bvb}
    helm search repo v-connections-helm --devel | grep infrastructure | awk {'print $2'}
    ```

    ``` {#codeblock_pjl_tsr_bvb}
    o/p: 0.1.0-20220617-050009
    ```

3.  Install the infrastructure charts:

    ``` {#codeblock_qjl_tsr_bvb}
    helm upgrade infrastructure v-connections-helm/infrastructure -i --version 0.1.0-20220617-050009 --namespace connections -f infrastructure.yml --wait
    ```

    Then, run this command to wait for the infrastructure to show:

    ``` {#codeblock_rjl_tsr_bvb}
    kubectl wait --namespace connections --for=condition=ready pod --selector=app=mongo --timeout=300s
    ```

4.  Check if infrastructure pods are up and running:

    ``` {#codeblock_sjl_tsr_bvb}
    kubectl -n connections get po | grep -iE "mongo|appregistry-client|appregistry-service|haproxy|redis-sentinel|redis-server"
    ```


## Set up Customizer {#section_n3c_xhj_dvb .section}

Delete existing Customizer chart:

``` {#codeblock_o3c_xhj_dvb}
helm delete mw-proxy -n connections
```

Get chart and version:

``` {#codeblock_p3c_xhj_dvb}
helm search repo v-connections-helm --devel | grep mw-proxy | awk {'print $2'}
0.1.0-20220414-134118
```

Install chart:

``` {#codeblock_q3c_xhj_dvb}
helm upgrade mw-proxy v-connections-helm/mw-proxy -i --version 0.1.0-20220414-134118 --namespace connections -f customizer.yml --wait
```

## Migrate MongoDB data {#migrate_mongo3 .section}

Perform the steps in [Migrating data from MongoDB 3 to 5](migrating_data_mongodb_v3_v5.md).

## Set up OpenSearch {#os_chart .section}

With Connections 8, OpenSearch replaces Elasticsearch 7 as the default backend for Metrics, OrientMe, and Search.

Installing the OpenSearch chart creates an additional secret – use the default secret from the bootstrap installation instead. See [Set up bootstrap charts](#bootstrap).

1.  Get chart and version:

    ``` {#codeblock_ixs_ltr_bvb}
    helm search repo v-connections-helm --devel | grep opensearch | awk {'print $2'}
    1.3.0-20220520-092636
    ```

2.  Install OpenSearch master:

    ``` {#codeblock_jxs_ltr_bvb}
    helm upgrade opensearch-master v-connections-helm/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_master.yml --wait --timeout 10m
    ```

3.  Install OpenSearch data:

    ``` {#codeblock_kxs_ltr_bvb}
    helm upgrade opensearch-data v-connections-helm/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_data.yml --wait --timeout 10m
    ```

4.  Install OpenSearch client:

    ``` {#codeblock_mxs_ltr_bvb}
    helm upgrade opensearch-client v-connections-helm/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_client.yml --wait --timeout 10m
    ```

5.  Check if the OpenSearch master, data, and client pods are up and running:

    ``` {#codeblock_nxs_ltr_bvb}
    kubectl get pods -n connections | grep -i "opensearch-cluster-"
    ```

6.  Remove the OpenSearch master eligible nodes using voting configuration to support scaling down:

    ``` {#codeblock_oxs_ltr_bvb}
    kubectl exec opensearch-cluster-master-0 -n connections -- bash -c "/usr/share/opensearch/probe/sendRequest.sh POST /_cluster/voting_config_exclusions?node_names=opensearch-cluster-master-1,opensearch-cluster-master-2"
    ```


## Migrate ElasticSearch data { .section}

Perform the steps in [Migrating data from Elasticsearch 7 to OpenSearch](cp_migrate_data_from_es7_to_opensearch.md).

## Set up Orient Me for Opensearch {#orientme_os .section}

With Connections 8, the only backend for Orient Me is OpenSearch, so you need to update orientme and switch from Elasticsearch 7 to OpenSearch.

The orientme.yml file is a prerequisite for configuring Orient Me to use OpenSearch.

1.  In the orientme.yml file, update these settings:
    -   `orient-indexing-service.indexing.opensearch=true and orient-indexing-service.indexing.elasticsearch=false`
    -   `orient-retrieval-service.Retrieval.Opensearch=true and orient-retrieval-service.Retrieval.elasticsearch=false`
2.  Get chart and version:

    ``` {#codeblock_cdt_rr3_dvb}
    helm search repo v-connections-helm --devel | grep orientme | awk {'print $2'}
    0.1.0-20220617-050009
    ```

3.  Install chart:

    ``` {#codeblock_ccz_ztr_bvb}
    helm upgrade orientme v-connections-helm/orientme -i --version 0.1.0-20220617-050009 --namespace connections -f orientme.yml  --wait
    ```

4.  Wait for people-migrate pod to become ready:

    ``` {#codeblock_dcz_ztr_bvb}
    kubectl wait --namespace connections --for=condition=ready pod --selector=app=people-migrate --timeout=300s
    ```

5.  Check if everything is running properly:

    ``` {#codeblock_ecz_ztr_bvb}
    kubectl get pods -n connections | grep -iE "orient|itm-services|community-suggestions|middleware-graphql|people-idmapping|people-migrate|people-relation|people-scoring|userprefs-service"
    ```

6.  If you are upgrading to Connections 8, perform these additional steps:

    1.  Check if the Home page works fine from your browser by navigating to the /homepage URL.

        If the page displays an error, delete the orient-web-client pods using the following command:

        ``` {#codeblock_a2g_wr3_dvb}
        kubectl -n connections delete pod $(kubectl get pods -n connections | grep orient-web | awk '{print $1}')
        ```

        After the pods have been recreated, check the Home page from your browser again.

    2.  Remove Elasticsearch 7 artifacts from your system:

        ``` {#codeblock_qm5_wr3_dvb}
        helm delete -n connections elasticsearch7
        ```


Learn more about configuring Orient Me in [Configuring the Orient Me component](cp_config_om_intro.dita).

## Set up Metrics for Opensearch {#metrics_os .section}

With Connections 8, the only backend for Metrics is OpenSearch. So, if you are performing an upgrade, you need to update Metrics and switch from the Elasticsearch 7 service in your Component Pack 7 deployment, to OpenSearch for Component Pack 8.

Before configuring Metrics, make sure that your WebSphere Application servers are up and running.

1.  Download the [config\_blue\_metrics.py file](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/files/config_blue_metrics.py). This script sets the OpenSearch server base URL in Metrics.

2.  Run this script on connections.example.com. We need to update it because the service name and port changed from Elasticsearch 7 to OpenSearch:

    ``` {#codeblock_bjv_xhw_bvb}
    /usr/bin/python3 config_blue_metrics.py --skipSslCertCheck true --pinkhost cpmaster.example.com --namespace {{ __default_namespace }}
    ```

    ``` {#codeblock_isl_yhw_bvb}
    o/p- Updating Metrics settings on: https://web.example.com/metrics/configsetter
    b'{"c2.export.elasticsearch.baseurl7" : "https://pinkhost cpmaster.example.com:30099"}'
    ```

3.  Now, you need to reconfigure Metrics to accept the updated SSL certificate from OpenSearch. First, export the new Elasticsearch7 keys from your Component Pack 7 installation:

    ``` {#codeblock_ljj_b3w_bvb}
    kubectl get secret opensearch-secret -n connections -o=jsonpath="{.data['chain-ca\.pem']}" | base64 -d > opensearch-chain-ca.pem
    ```

    ``` {#codeblock_uwr_c3w_bvb}
    kubectl get secret opensearch-secret -n connections -o=jsonpath="{.data['opensearch-metrics\.p12']}" | base64 -d > opensearch-metrics.p12
    ```

4.  Remove previous SSL settings from Elasticsearch Metrics.

    1.  From WebSphere Integrated Solutions Console, navigate to **Security** \> **SSL certificate and key management** and click on the **Dynamic outbound endpoint SSL configurations**link.
    2.  Select and delete any endpoints starting with **SSLToES and SearchToES**.
    3.  Navigate to **Security** \> **SSL configurations**, and delete the **ESCloudSSLSettings**and **ESSearchSSLSettings** configuration.
    4.  Navigate to **Security** \> **Key stores and certificates** and note down the **Path** definition for that keystore, for example, in this scenario, it is /opt/IBM/certs/es\_certs/elasticsearch-metrics.p12
    5.  Delete **ESCloudKeyStore**and **ESSearchKeyStore**.
5.  Copy the certificate files to the Deployment Manager to the location in step 4d.
6.  On **connections.example.com**, find the OpenSearch secrets you copied from the Component Pack machine \(cpmaster.example.com\). Recall the **Path** definition from the keystore in step 5d.

7.  Back up the following existing files from /opt/IBM/certs/es\_certs:

    -   Elasticsearch7-metrics.p12
    -   chain-ca.pem
    Then replace them with the two newly created opensearch keystore files.

8.  Copy the updated Elasticsearch-metrics.p12 file from the Deployment Manager to the same location on the WebSphere Application Server nodes.

9.  On connections.example.com, download the [merge-opensearch-certificates-to-keystore.j2 file](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/merge-opensearch-certificates-to-keystore.j2) and rename it to **merge-opensearch-certificates-to-keystore**. This file is needed to run wsadmin.sh in the next steps. It also updates the type-ahead search.

    Replace variables in curly brackets with the appropriate values, for example:

    ``` {#codeblock_nqt_rzw_bvb}
    enableSslForMetrics('/opt/IBM/certs/es_certs/opensearch-metrics.p12', 'password', '/opt/IBM/certs/es_certs/opensearch-chain-ca.pem', '30099')
    ```

10. Open a command line and navigate to your Deployment Manager’s profile directory \(in our case it’s /opt/IBM/WebSphere/AppServer/profiles/Dmgr01\).

    From the **bin**subdirectory, open a **wsadmin** prompt and run:

    ``` {#codeblock_ash_yzw_bvb}
    ./wsadmin.sh -lang jython -port <dmgr_soap_port> -username <WebSphereAdmin> -password <password> -f merge-opensearch-certificates-to-keystore
    ```

11. Copy the updated [enable-es-for-metrics.j2 file](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/enable-es-for-metrics.j2) from the Deployment Manager to the same location on the WebSphere Application Server nodes.

12. Open a command line and navigate to your Deployment Manager’s profile directory \(in our case it’s /opt/IBM/WebSphere/AppServer/profiles/Dmgr01\).

    From the **bin**subdirectory, open a **wsadmin** prompt and run:

    ``` {#codeblock_hlf_d1x_bvb}
    ./wsadmin.sh -lang jython -port <dmgr_soap_port> -username <WebSphereAdmin> -password <password> -f enable_es_for_metrics
    ```

    Disconnect from the wsadmin environment with **quit**.

13. Run a full sync and restart the whole WebSphere cell including servers, node agent or agents and Deployment Manager.
14. To validate your OpenSearch and Metrics integration after system is up and running again, open a browser window and authenticate with a user account that has appropriate rights for Metrics. Navigate to the **/metrics** URL.

## Set up community ingress {#comm_ingress .section}

1.  If not already added, add the community Helm repository:

    ``` {#codeblock_ach_hjx_bvb}
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    ```

2.  Check if cnx-ingress is already deployed:

    ``` {#codeblock_bch_hjx_bvb}
    helm ls --all-namespaces | grep cnx-ingress | grep -i DEPLOYED
    ```

3.  If cnx-ingress already exists, delete it:

    ``` {#codeblock_cch_hjx_bvb}
    helm uninstall cnx-ingress --namespace connections
    ```

4.  Delete configmaps:

    ``` {#codeblock_dch_hjx_bvb}
    kubectl delete configmaps ingress-controller-leader ingress-controller-leader-nginx -n connections
    ```

5.  Download the [cnx-ingress values .yml file](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/files/cnx-ingress-values.yml) – you will use this to install the cnx-ingress chart. Modify the file according to your environment.

6.  Install ingress-nginx:

    ``` {#codeblock_ech_hjx_bvb}
    helm upgrade cnx-ingress -i ingress-nginx/ingress-nginx --namespace connections -f **cnx-ingress-values.ym**l --wait
    ```


## Set up Microsoft Teams integration {#teams_integ .section}

Get chart and version:

``` {#codeblock_r2m_swq_bvb}
helm search repo v-connections-helm --devel | grep teams | awk {'print $2'}
1.0.0-20220818-170013
```

Then, install chart:

``` {#codeblock_lhq_twq_bvb}
helm upgrade teams v-connections-helm/teams -i --version 1.0.0-20220818-170013 --namespace connections -f teams.yml --wait
```

## Set up Tailored Experience features for communities {#comm_tailored .section}

Get chart and version:

``` {#codeblock_bx2_vwq_bvb}
helm search repo v-connections-helm --devel | grep tailored-exp| awk {'print $2'}
1.0.0-20220818-170013
```

Then, install chart:

``` {#codeblock_x31_wwq_bvb}
helm upgrade tailored-exp v-connections-helm/tailored-exp -i --version 1.0.0-20220818-170013 --namespace connections -f tailoredexperience.yml --wait
```

For post-installation tasks required to deploy the community creation wizard and templates, see [Configuring the community creation wizard](t_configure_community_wizard.md) and [Assigning administrators to template management roles](../admin/t_admin_comm_templates_assign_admins.md).

## Set up Activities Plus {#activities_plus .section}

See [Installing Activities Plus services](cp_3p_install_ap_services.md) for details.

## Set up Connections add-in for Microsoft Outlook {#ms_outlook_addin .section}

Delete the existing connections-outlook-desktop chart:

``` {#codeblock_lz3_41r_bvb}
helm delete connections-outlook-desktop -n connections
```

Get chart and version:

``` {#codeblock_agq_41r_bvb}
helm search repo v-connections-helm --devel | grep connections-outlook-desktop | awk {'print $2'}
0.1.0-20220707-082629
```

Install chart:

``` {#codeblock_pp3_p1r_bvb}
helm upgrade connections-outlook-desktop v-connections-helm/connections-outlook-desktop -i --version 0.1.0-20220707-082629 --namespace connections -f outlook-addin.yml --wait
```

-   **[Installing MongoDB 5 for Component Pack 8](../install/installing_mongodb_5_for_component_pack_8.md)**  
Install MongoDB 5 for Component Pack 8.
-   **[Migrating data from MongoDB 3 to 5](../install/migrating_data_mongodb_v3_v5.md)**  
Back up, copy, restore, and validate your MongoDB databases.
-   **[Migrating data from Elasticsearch 7 to OpenSearch](../install/cp_migrate_data_from_es7_to_opensearch.md)**  
To preserve the Metrics, Orient Me, and Recent History data stored in Elasticsearch 7 for your Connections 7 deployment, you must migrate that data to the OpenSearch service provided with Component Pack for Connections 8.

**Parent topic:**[Installation and upgrade](../install/cp_install_upgrade_container.md)

