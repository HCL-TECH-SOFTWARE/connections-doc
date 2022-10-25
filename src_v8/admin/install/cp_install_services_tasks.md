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

**\[From v7\]** **Before we start with the sample steps, let's make a few assumptions about the environment.**

**We are installing an environment which will be available behind web1.cnx-dev.net. However, this is just a public domain, and entry point to the Connections \(and dynamicHost of Connections\).**

**All the nodes are available using their FQDNs and are in a different domain:**

-   **Connections, with WebSphere and IHS is on connections1.internal.cnx-dev.net**
-   **DB2 is on db1.internal.cnx-dev.net**
-   **Kubernetes cluster is just a single node, and it is on cp1.internal.cnx-dev.net**
-   **NFS master is collocated with cp1.internal.cnx-dev.net and its IP address is 172.27.1.48 and all our folders are created in 172.27.1.48:/pv-connections/**

Note the following configurations:

Network configuration
:   All machines in our scenario are configured to use DNS and all of them have internet access. The initial entry point is nginx.example.com, which, in our case, can be reached from the internet. Your NGINX might reside behind a load balancer instead. To let the machines interoperate properly, consider the following inbound ports to be opened on your firewall:

    -   connections.example.com:
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

Storage configuration
:   Starting with Connections 7, it is possible to use different types of storage. The recommended setup contains the configuration of a NFS v4 entry point to store both data from shared WebSphere-based Connections services, as well as claims and PVs from the Component Pack side.

## Installation vs. upgrade steps {#section_v5r_1dj_dvb .section}

**\[From v7\] This document uses the preceding assumptions to walk you through the following steps, in a logical order, to get your Component Pack deployment up and running.**

The complete steps to deploy Component Pack 8 below are in chronological order, but note that there are differences between the installation and upgrade procedures. Some of the following steps apply only to one scenario \(install *or* upgrade\), while others apply to both \(install *and* upgrade\). Refer to [Order of installation](cp_install_upgrade_container.md#order_cp_install) for the complete list of steps for each scenario.

## Set up NFS {#section_e4p_jrp_tnb .section}

**\[From v7\]** **We don't recommend or support any particular configuration of NFS – you can use whatever NFS implementation is available. For the sake of this example, however, let's assume that our NFS master is on connections1.internal.cnx-dev.net, you have root access there, you installed NFS, you know how to manage it, and you just need the stuff needed for Component Pack.**

Use the following guidelines to help you set up persistent volumes for Component Pack services for a high availability deployment.

Requirements for persistent volumes
:   These guidelines and sample files describe how to set up all of the persistent volumes required for a full installation of Component Pack. In a high availability configuration, the best practice is to maintain persistent storage away from the Kubernetes masters and worker nodes themselves, on a separate machine that all masters and workers can access.

    **Note:** The machine storing the persistent volumes in an HA configuration will not have Docker or Kubernetes installed.

Exporting the persistent volumes
:   1.  Perform these steps on NFS master:
    1.  Create /pv-connections folder on connections1.internal.cnx-dev.net with permissions 0700
    2.  Inside that folder, create this set of subfolders:
        -   /pv-connections/customizations with permissions 0005
        -   /pv-connections/opensearchbackup with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchmaster-0 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchmaster-1 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchmaster-2 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchdata-0 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchdata-1 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchdata-2 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchclient-0 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchclient-1 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/opensearchclient-2 with permissions 0700 \(Inside /pv-connections, create a subfolder for Component Pack upgrade\)
        -   /pv-connections/kudos-boards-minio with permissions 0700
        -   /pv-connections/mongo5-node-0/data/db with permissions 0700
        -   /pv-connections/mongo5-node-1/data/db with permissions 0700
        -   /pv-connections/mongo5-node-2/data/db with permissions 0700
    3.  Download [nfsSetup.sh](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/third_party/nfs-install/templates/nfsSetupScript) and volumes.txt to a directory of your choice \(for example, /tmp\) from the Git repository.
    4.  Check if firewalld is already installed using the following rpm command:

        ``` {#codeblock_onx_n2w_fvb}
        - $rpm -qa firewalld
        ```

        If the command does not return anything, install firewalld on your operating system. For example, on Linux/CentOS, run:

        ``` {#codeblock_pnx_n2w_fvb}
        $sudo yum install firewalld
        ```

        Then start the firewalld service:

        ``` {#codeblock_qnx_n2w_fvb}
        $sudo systemctl start firewalld
        ```

    5.  Provide execution permission to nfsSetup.sh and run it in order for NFS to be configured:

        ``` {#codeblock_uhg_42w_fvb}
        sudo chmod +x nfsSetup.sh
        sudo bash nfsSetup.sh
        ```

    6.  **\(Optional\)** Export file systems:

        ``` {#codeblock_ttw_42w_fvb}
        exportfs -ra
        ```

    7.  Enable and start nfs-server:

        ``` {#codeblock_nhg_p2w_fvb}
        systemctl restart nfs-server
        ```

2.  Configure NFS clients by enabling and starting the nfs-server on all Kubernetes master and worker nodes:

    ``` {#codeblock_gml_s2w_fvb}
    systemctl restart nfs-server
    ```


Ensure that all of the persistent volumes are exported and mountable from Kubernetes masters and workers nodes before you proceed to the next steps.

## Download and set up the package {#section_pvh_tgp_fvb .section}

**\[From v7\]** **On the server which has Helm v3 and kubectl configured for your non-root user, download and unpack the Component Pack archive to /opt/microservices\_connections.**

## Create the namespace {#section_ln3_qp3_dvb .section}

On the server which has Helm v3 and kubectl configured for your non-root user, create the Connections namespace in Kubernetes by running the following command:

``` {#codeblock_ajc_sp3_dvb}
kubectl create namespace connections
```

## Push the images to the Docker Registry or Amazon ECR {#section_mgn_g3p_fvb .section}

**\[From v7\]** **Inside your Component Pack package, you got basically a bunch of Docker prebuild images and Helm charts. We need to push those images now to some Docker Registry, which in this example lives on cp1.internal.cnx-dev.net on port 5000, has SSL enabled, and you can login to it using username admin and password password \(or whatever you set, hopefully not this\):**

-   **Go to component\_pack\_installation\_folder/hybridcloud/support**
-   **Run this command: `./setupImages.sh -dr cp1.internal.cnx-dev.net:5000 -u admin –p password`**

**Once this finishes, you should be good to go. The same script is compatible with Amazon ECR.**

**Note:** **For upgrades, just repeat this step. It will add only the new packages, and Helm charts know which version they need.**

## Create Docker Registry credentials {#section_jyn_43p_fvb .section}

**\[From v7\]** **In this step you need to map your credentials for Docker Registry or Amazon ECR with some secret inside the Kubernetes cluster, so that Kubernetes workers can use it to authenticate to your registry when pulling the images.**

**In all the Helm charts, hardcoded name for this is myregkey and you cannot change it if you don't manually edit each and every Helm chart to do it \(which we definitely don't advise\).**

**To create this credential, run:**

``` {#codeblock_htj_s3p_fvb}
**kubectl create secret docker-registry myregkey –n connections --docker-server=cp1.internal.cnx--
dev.net:5000 --docker-username=admin --docker-password=password**
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

**\[From v7\]****There is no change in pod security policy setup since Component Pack 6.5.0.1. To install, run this command:**

``` {#codeblock_y1k_jmv_fvb}
**helm upgrade k8s-psp component\_pack\_installation\_folder/hybridcloud/helmbuilds/k8s-psp-\*.tgz -i**
```

## Use –f instead of –set with Helm charts {#section_g5b_z3p_fvb .section}

**\[From v7\]** **Our examples folder is following the naming convention we are using throughout this topic. Feel free to check the examples for what we are rewriting for each chart.**

**This change makes it much cleaner, and is also the way our [HCL-provided Ansible automation](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/README.md) works. If you want to review or customize the examples, here's how:**

-   **Go to the [Component Pack installation files for Helm chart configuration](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0085591) Knowledge Article on the HCL Software Support site, and download and unzip the folder cnx7-CP-examples.zip.**
-   **Copy the files to component\_pack\_installation\_folder/hybridcloud/examples.**
-   **In the examples folder, open the subfolder that applies to your environment \(either single or multiple domains\).**
-   **Review the examples, or customize them by changing the values to the ones for your environment.**
-   **Continue with the steps that follow in this topic.**

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
    helm upgrade connections-volumes v-connections-helm/connections-persistent-storage-nfs -i --version 0.1.1-20220505-090030 --namespace connections -f connections-volumes.yml --wait
    ```

    **Note:** Use your destination **nfs.server** and **persistentVolumePath** as parameters in connections-volumes.yml.

4.  Verify that all PVCs are in "bound" state:

    ``` {#codeblock_sx1_vkr_bvb}
    kubectl get pvc -n connections
    ```


**\[From v7\]** **This command sets up both PVs and PVCs:**

``` {#codeblock_s5v_qmv_fvb}
**helm upgrade connections-volumes component\_pack\_installation\_folder/hybridcloud/helmbuilds/connections-persistent-storage-nfs-\*.tgz -i -f 
component\_pack\_installation\_folder/hybridcloud/examples/multi\_domain\_environment/connections-volumes.yml**
```

**For how to troubleshoot PV and PVC setup, see the [Troubleshooting Component Pack guide](https://opensource.hcltechsw.com/connections-doc/v8/guide_me/how_to_guides/troubleshooting_cnx_cp.pdf) on the HCL software product documentation site.**

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

**\[From v7\]****This chart by default installs connections-env configmap.**

**Note:** **If you will be deploying Microsoft Teams integration, you can choose to enable it during initial connections-env setup or modify connections-env later. The value integrations.msteams.enabled=true is used to indicate that an additional integrations-msteams-env configmap and ms-teams-secret secret should be created, which are necessary for Teams integration to work. If you choose to set integrations.msteams.enabled=true at this time, see [Set up Microsoft Teams integration](cp_install_services_tasks.md#teams_integ) before going further for an example upgrade command and list of additional values that must be provided to successfully complete the connections-env upgrade.**

**The configmap for connections-env contains all the variables needed for the Customizer and Orient Me to function properly. Note that Customizer always points to the IBM HTTP Server directly, whereas Orient Me requests point to the front door proxy.**

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

The infrastructure charts are installed during MongoDB 5 installation \(see previous step\).

**\[From v7\]****This will install the infrastructure for Orient Me and other apps, the most prominent being MongoDB and appreg services.**

**If this step fails, and if all pods don't come up, there is no point proceeding until this is fixed. To troubleshoot the Component Pack installation check out the [Troubleshooting Component Pack](https://opensource.hcltechsw.com/connections-doc/v8/guide_me/how_to_guides/troubleshooting_cnx_cp.pdf) document.**

Add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:

``` {#codeblock_jzt_5wk_gvb}
# jsonapi
ProxyPass "/jsonapi" "http://master_node_host_name:32080/jsonapi"
ProxyPassReverse "/jsonapi" "http://master_node_host_name:32080/jsonapi"
```

## Set up Customizer {#section_n3c_xhj_dvb .section}

Customizer needs to be installed, customizations copied into its PV \(living on your NFS:/pv-connections/customizations\), and then enabled on Nginx:

-   Mount NFS:/pv-connections/customizations to the server where you have your Component Pack unpacked and from which you are managing installations
-   Copy all the files from component\_pack\_installations\_folder/hybridcloud/support/customizations/\* to NFS:/pv-connections/customizations
-   Copy component\_pack\_installations\_folder/hybridcloud/support/ms-teams folder to NFS:/pv-connections/customizations

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

**\[From v7\]****To install or upgrade it, run:**

``` {#codeblock_awh_nkp_fvb}
**helm upgrade mw-proxy 
component\_pack\_installation\_folder/hybridcloud/helmbuilds/mw-proxy-\*.tgz -i -f 
component\_pack\_installation\_folder/hybridcloud/examples/multi\_domain\_environment/customizer.yml**
```

**Setup your reverse proxy to forward some traffic to the customizer by sending it to KUBERNETES:30301. For Nginx, it would look like this:**

``` {#codeblock_bwh_nkp_fvb}
**location ~      ^/\(files/customizer\|files/app\|communities/service/html\|forums/html\|search/web\|homepage/web\|social/home\|mycontacts\|wikis/home\|blogs\|news\|activities/service/html\|profiles/html\|viewer\)  \{ 

            proxy\_pass http://cp1.internal.cnx-dev.net:30301; 

\}**
```

**Customizer will not start serving any traffic until you start sending some, from whatever fronted reverse proxy you are using.**

Learn more about configuring Customizer in [Configuring the Customizer component](cp_config_customizer_intro.md).

## Migrate MongoDB data {#migrate_mongo3 .section}

Perform the steps in [Migrating data from MongoDB 3 to 5](migrating_data_mongodb_v3_v5.md).

## Set up OpenSearch {#os_chart .section}

With Connections 8, OpenSearch replaces Elasticsearch 7 as the default backend for Metrics, OrientMe, and Search.

**\[From v7\]****Solr and Zookeeper are not used anymore, so feel free to clean them up if you didn't already.**

Installing the OpenSearch chart creates an additional secret – use the default secret from the bootstrap installation instead. See [Set up bootstrap charts](#bootstrap).

**Note:** **\[From v7\]** **OpenSearch, because of the way it is set up starting with version 8, will not work if bootstrap didn't create its secrets and certificates beforehand.**

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

## Set up Orient Me for OpenSearch {#orientme_os .section}

With Connections 8, the only backend for Orient Me is OpenSearch, so you need to update orientme and switch from Elasticsearch 7 to OpenSearch.

**\[From v7\]** **The prerequisites to set up and run Orient Me are:**

-   **Infrastructure charts need to be already installed and all pods scheduled.**
-   **connections-env configmap needs to be already present.**
-   **OpenSearch needs to be installed and running.**
-   **After you install Orient Me, you need to run Profiles migration. In this step, we are migrating users from PeopleDB to MongoDB, which is used by Orient Me.**
-   **You need to set rewrite rules in httpd.conf on your IBM HTTP Server to enable sending requests to it from Connections.**
-   **Have the orientme.yml file ready.**

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


**\[From v7\]****To install or start the upgrade for Orient Me, run:**

``` {#codeblock_gbq_vmp_fvb}
**helm upgrade orientme 
component\_pack\_installation\_folder/hybridcloud/helmbuilds/orientme-\*.tgz -i -f 
component\_pack\_installation\_folder/hybridcloud/examples/multi\_domain\_environment/orientme.yml**
```

**To migrate profiles, run this:**

``` {#codeblock_hbq_vmp_fvb}
**kubectl exec -n connections -it $\(kubectl get pods -n connections \| grep people-migrate \| awk '\{print $1\}'\) -- sh -c "npm run start migrate"**
```

**If you followed examples and the order of installation, this should work out of the box. If you want to do some customizations, or if you are later changing the database, you can SSSH into people-migrate pod and see the configuration that was precreated for you during the installation/upgrade of Component Pack in /usr/src/app/migrationConfig.**

**And finally, add the rewrites to your httpd.conf on the IBM HTTP Server, and then restart the service:**

``` {#codeblock_ibq_vmp_fvb}
**\# OrientMe Config 
ProxyPreserveHost On 
ProxyPass "/social" "http://cp1.internal.cnx-dev.net:32080/social" 
ProxyPassReverse "/social" "http://cp1.internal.cnx-dev.net:32080/social" 
ProxyPass "/itm" "http://cp1.internal.cnx-dev.net:32080/itm" 
ProxyPassReverse "/itm" "http://cp1.internal.cnx-dev.net:32080/itm" 
ProxyPass "/community\_suggestions/api/recommend/communities" "http://cp1.internal.cnx-dev.net:32080/community\_suggestions/api/recommend/communities" 
ProxyPassReverse "/community\_suggestions/api/recommend/communities" "http://cp1.internal.cnx-dev.net:32080/community\_suggestions/api/recommend/communities" 
ProxyPass "/appreg" "http://cp1.internal.cnx-dev.net:32080/appreg/" 
ProxyPassReverse "/appreg" "http://cp1.internal.cnx-dev.net:32080/appreg/" 
ProxyPass "/appregistry" "http://cp1.internal.cnx-dev.net:32080/appregistry" 
ProxyPassReverse "/appregistry" "http://cp1.internal.cnx-dev.net:32080/appregistry"**
```

Learn more about configuring Orient Me in [Configuring the Orient Me component](cp_config_om_intro.dita).

## Set up Metrics for OpenSearch {#metrics_os .section}

With Connections 8, the only backend for Metrics is OpenSearch. So, if you are performing an upgrade, you need to update Metrics and switch from the Elasticsearch 7 service in your Component Pack 7 deployment, to OpenSearch for Component Pack 8.

Before configuring Metrics, make sure that your WebSphere Application servers are up and running.

1.  To ensure a secure connection, retrieve the PKCS12 and CA Signer certificates by running the following commands on the Component Pack master node:

    ``` {#codeblock_ljj_b3w_bvb}
    mkdir -p /tmp/es_certs
    ```

    ``` {#codeblock_uwr_c3w_bvb}
    kubectl get secret opensearch-secret -n connections -o=jsonpath="{.data['chain-ca\.pem']}" | base64 -d > "/tmp/es_certs"/chain-ca.pem
    ```

    ``` {#codeblock_kxg_f2g_fvb}
    kubectl get secret opensearch-secret -n connections -o=jsonpath="{.data['opensearch-metrics\.p12']}" | base64 -d > "/tmp/es_certs"/opensearch-metrics.p12
    ```

2.  Temporarily remove SSL settings that were configured for type-ahead search in your Connections deployment, so that you can successfully enable Metrics. When you configure Metrics, the SSL settings will be recreated and both features will share the certificate information.

    1.  Log in to the WebSphere Integrated Solutions Console for the type-ahead search cluster.
    2.  Click **Security** \> **SSL certificate and key management** \> ******Dynamic outbound endpoint SSL configurations** and, for each cluster member, delete any endpoints starting with **SSLToES and SearchToES**.
    3.  Click **Security** \> **SSL certificate and key management** \> **SSL configurations**, and delete the **ESCloudSSLSettings**and **ESSearchSSLSettings** configuration.
    4.  Click **Security** \> **SSL certificate and key management** \> **Key stores and certificates** and delete the **ESCloudKeyStore** and **ESSearchKeyStore** configuration.
3.  Copy the certificate files to the WebSphere Deployment Manager in a common location that is readable and writable by all WebSphere Application Server nodes.

    For example, copy the two certificate files created in step 1 \(that is, **/tmp/es\_certs/chain-ca.pem** and **/tmp/es\_certs/elasticsearch-metrics.p12**\) to the following directory: **/opt/IBM/es\_certs** on the WebSphere Deployment Manager.

    If this directory path does not yet exist, create it.

4.  Configure OpenSearch metrics within Connections:
    1.  On the WebSphere Deployment Manager, open wsadmin, making sure that you use the `-lang jython` option. For example, on Linux, run the following commands to open wsadmin:

        ``` {#codeblock_pyp_xkg_fvb}
        cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
        sudo sh wsadmin.sh -lang jython -user wasadmin_user -password wasadmin_password
        ```

    2.  Merge the Signer certificate into the opensearch-metrics.p12 keystore:

        ``` {#codeblock_hp4_xlg_fvb}
        execfile('esSecurityAdmin.py')    
        enableSslForMetrics('KEYSTORE_FULL_PATH', 'OpenSearch_CA_PASSWORD', 'SIGNER_CA_FULL_PATH', 'OpenSearch_HTTPS_PORT')
        ```

        Where:

        -   `KEYSTORE_FULL_PATH`: See the following example.
        -   `SIGNER_CA_FULL_PATH`: See the following example.
        -   `OpenSearch_CA_PASSWORD`: The password that was set while [setting up bootstrap charts](#bootstrap).
        -   `OpenSearch_HTTPS_PORT`: Find the port by running following command on the Component Pack System:

            ``` {#codeblock_jp4_xlg_fvb}
            kubectl get svc opensearch-cluster-master --namespace=connections -o jsonpath={.spec.ports[*].nodePort}
            ```

        For example:

        ``` {#codeblock_kp4_xlg_fvb}
        execfile('esSecurityAdmin.py')
        enableSslForMetrics('/opt/IBM/es_certs/opensearch-metrics.p12', 'password', '/opt/IBM/es_certs/chain-ca.pem', '30099')
        ```

        Disconnect from the wsadmin environment with **quit**.

    3.  Copy the updated opensearch-metrics.p12 file from the Deployment Manager to the same location on the WebSphere Application Server nodes.
    4.  Synchronize the nodes and then restart the servers or clusters that are running the Search and common applications \(including the Deployment Manager and nodes\).
    5.  Enable or switch to OpenSearch Metrics. The following script causes the RDBMS-based app to stop capturing data, and the OpenSearch component to start capturing it.
        1.  On the WebSphere Deployment Manager, open wsadmin, making sure that you use the `-lang jython` option. For example, on Linux, run the following commands to open wsadmin:

            ``` {#codeblock_jhv_b1p_fvb}
            cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
            sudo sh wsadmin.sh -lang jython -user wasadmin_user -password wasadmin_password
            ```

        2.  Switch users to the OpenSearch Metrics component:

            ``` {#codeblock_khv_b1p_fvb}
            execfile('metricsEventCapture.py')
            switchMetricsToElasticSearch()
            ```

5.  Manage the Elasticsearch index for Connections type-ahead search. The type-ahead search feature uses an index named “quickresults” within the OpenSearch search engine.

    1.  On the WebSphere Deployment Manager, open wsadmin, making sure that you use the `-lang jython` option. For example, on Linux, run the following commands to open wsadmin:

        ``` {#codeblock_nlm_lmg_fvb}
        cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
        sudo sh wsadmin.sh -lang jython -user wasadmin_user -password wasadmin_password
        ```

    2.  Merge the Signer certificate into the opensearch-metrics.p12 keystore:

        ``` {#codeblock_krg_nmg_fvb}
        execfile('esSecurityAdmin.py')    
        enableSslForESSearch('KEYSTORE_FULL_PATH', 'OpenSearch_CA_PASSWORD', 'SIGNER_CA_FULL_PATH', 'OpenSearch_HTTPS_PORT')
        ```

        Where:

        -   `KEYSTORE_FULL_PATH`: See the following example.
        -   `SIGNER_CA_FULL_PATH`: See the following example.
        -   `OpenSearch_CA_PASSWORD`: The password that was set while [setting up bootstrap charts](#bootstrap).
        -   `OpenSearch_HTTPS_PORT`: Find the port by running following command on the Component Pack System:

            ``` {#codeblock_mrg_nmg_fvb}
            kubectl get svc opensearch-cluster-master --namespace=connections -o jsonpath={.spec.ports[*].nodePort}
            ```

        For example:

        ``` {#codeblock_nrg_nmg_fvb}
        execfile('esSearchAdmin.py')
        enableSslForESSearch('/opt/IBM/es_certs/opensearch-metrics.p12', 'password', '/opt/IBM/es_certs/chain-ca.pem', '30099')
        ```

        Disconnect from the wsadmin environment with **quit**.

    3.  Copy the updated opensearch-metrics.p12 file from the Deployment Manager to the same location on the WebSphere Application Server nodes.
    4.  Connect to wsadmin and initialize Search Administration before running the actual wsadmin command.

        Open wsadmin and start the Search service by running the following commands. On Linux, for example, run:

        ``` {#codeblock_d3h_fvw_fvb}
        cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
        ./wsadmin.sh -lang jython -user User_name -password Password
        execfile('searchAdmin.py')
        ```

        ``` {#codeblock_a1b_gvw_fvb}
        SearchService.createES7QuickResultsIndex()
        ```

        For information on running SearchService commands, see [SearchService commands](../admin/r_admin_searchservice_commands.md).

    5.  Update the LotusConnections-config.xml file in the Deployment Manager profile configuration folder:

        Add the following statement to the `<properties>` section of the file:

        ``` {#pre_mtz_ydp_fvb}
        `<genericProperty name="quickResultsEnabled">true</genericProperty>`
        ```

    6.  Update the search-config.xml file in the Deployment Manager profile configuration folder.

        Add the following statements to the `<propertySettings>`:

        ``` {#codeblock_apx_g2p_fvb}
        <property name="quickResults">
             <propertyField name="quick.results.elasticsearch.indexing.enabled" value="true"/>
             <propertyField name="quick.results.solr.indexing.enabled" value="false"/>
             <propertyField name="quick.results.use.solr.for.queries'\" value="false"/>
             <propertyField name="quick.results.elasticsearch7.writing.enabled" value="true"/>
             <propertyField name="quick.results.elasticsearch7.reading.enabled" value="true"/>
        </property>
        ```

    7.  Synchronize the nodes and then restart the servers or clusters that are running the Search and common applications \(including the Deployment Manager and nodes\).
6.  To validate your OpenSearch and Metrics integration after system is up and running again, open a browser window and authenticate with a user account that has appropriate rights for Metrics. Navigate to the **/metrics** URL.
7.  Download the [config\_blue\_metrics.py file](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/files/config_blue_metrics.py). This script sets the OpenSearch server base URL in Metrics.

8.  Run the following script on the Connections Component Pack system. This will set highway settings that are needed for Metrics using OpenSearch.

    ``` {#codeblock_cmj_11p_fvb}
    /usr/bin/python3 config_blue_metrics.py --skipSslCertCheck true --pinkhost <<hostname>> --namespace connections
    ```

    Where you must:

    -   `--skipSslCertCheck` \(set to true\): Use on systems that use self-signed SSL certificates.
    -   `--pinkhost`: Set to the fully qualified domain name \(FQDN\) of the Kubernetes master. This would be the fronting Kubernetes master load balancer or virtual IP in a HA environment.
    -   `--namespace`: Set to `connections`.

For optional procedures to configure Metrics, see [Configuring the OpenSearch Metrics component](cp_config_os_intro.md).

**\[From v7\]****Component Pack for HCL Connections 8 comes with OpenSearch enabled by default.**

**If you are doing clean install, do all the tasks under [Configuring the OpenSearch Metrics component](cp_config_os_intro.md).**

**If you are on HCL Connections 6.5.0.1 or earlier, and using ElasticSearch 5, there are two options:**

-   **If you don't need to migrate data, you can use the preceding links to configure the Metrics component to use the newly installed OpenSearch.**
-   **To continue using ElasticSearch 5 until you've migrated your data to OpenSearch, see [Sample steps to upgrade and migrate data from Component Pack 6.5 to 7](https://help.hcltechsw.com/connections/v7/admin/install/cp_install_services_tasks_helm2.html) in the 7.0 documentation.**

## Set up community ingress {#comm_ingress .section}

**\[From v7\]****Starting with Connections 7, only the [community Nginx Ingress controller](https://github.com/kubernetes/ingress-nginx/tree/master/charts/ingress-nginx) is supported.**

**With community ingress, besides its being more flexibility with AWS and OpenShift, you also get out-of-the-box Prometheus exporters, which can come in handy if you decide to also set up monitoring.**

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

5.  Install ingress-nginx:

    ``` {#codeblock_ech_hjx_bvb}
    helm upgrade cnx-ingress -i ingress-nginx/ingress-nginx --namespace connections --set controller.service.type=NodePort,controller.service.nodePorts.http=32080,controller.service.nodePorts.https=32443,defaultBackend.enabled=true,controller.healthStatus=true,controller.healthCheckPath="/healthz",controller.livenessProbe.timeoutSeconds=60,controller.readinessProbe.timeoutSeconds=60 --wait
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

**\[From v7\]****The Microsoft Teams integration microservices rely on a configmap \(integrations-msteams-env\) and secret \(ms-teams-secret\) that are part of the overall connections-env deployment. They are not installed by the connections-env chart by default; the expectation is that they are enabled as needed by customers who use Microsoft Teams and wish to enable the use cases that these micro-services support.**

**To upgrade the connections-env deployment to enable the correct settings for Microsoft Teams, three specific pieces of information are required which should have been created and noted while performing the steps in [Configuring an Azure app to support the Microsoft Teams app](../../connectors/admin/t_ms_teams_config_azure_app.md).**

**The items of information needed for this setup are:**

-   **Teams tenant ID**
-   **Bot \(app\) ID**
-   **Bot \(app\) password \(secret\)**

**With this information, to upgrade the connections-env and create the configmap and secret, run:**

``` {#codeblock_uqj_hlp_fvb}
**helm upgrade connections-env component\_pack\_installation\_folder/hybridcloud/helmbuilds/connections-env-\*.tgz --reuse-values --set integrations.msteams.enabled=true,integrations.msteams.tenant.id="your\_tenant\_id",integrations.msteams.client.id="your\_bot\_id",integrations.msteams.client.secret="your\_bot\_secret",integrations.msteams.auth.schema="3",integrations.msgraph.client.id="not\_used",integrations.msgraph.client.secret="not\_used",integrations.msgraph.redirect.uri="not\_used",integrations.msteams.share.ui.files.api="/files/basic/api",integrations.msteams.redirect.uri="not\_used",integrations.msgraph.secret.name="not\_used",integrations.msgraph.auth.endpoint="not\_used",integrations.msgraph.meta.endpoint="not\_used",integrations.msgraph.authorize.endpoint="not\_used",integrations.msgraph.token.endpoint="not\_used",integrations.msteams.share.service.endpoint="my.connections.server.com",imagePullSecretName="myregkey"**
```

**Once the configmap and secret are created, continue to install the microservices that rely on them for configuration.**

**Run the following command:**

``` {#codeblock_vqj_hlp_fvb}
**helm upgrade teams 
component\_pack\_installation\_folder/hybridcloud/helmbuilds/teams-\*.tgz -i -f 
component\_pack\_installation\_folder/hybridcloud/examples/multi\_domain\_environment/teams.yml**
```

**Once the microservices are installed and running, add the following rules to your httpd.conf on your IBM HTTP Server and restart the server.**

``` {#codeblock_wqj_hlp_fvb}
**\# teams-tab-ui
ProxyPass "/teams-tab" "http://master\_node\_host\_name:32080/teams-tab" 
ProxyPassReverse "/teams-tab" "http://master\_node\_host\_name:32080/teams-tab"    
\# teams-tab-api 
ProxyPass "/teams-tab/api" "http://master\_node\_host\_name:32080/teams-tab/api" 
ProxyPassReverse "/teams-tab/api" "http://master\_node\_host\_name:32080/teams-tab/api"
\# teams-share-service 
ProxyPass "/teams-share-service" "http://master\_node\_host\_name:32080/teams-share-service" 
ProxyPassReverse "/teams-share-service" "http://master\_node\_host\_name:32080/teams-share-service"
\# teams-share-ui 
ProxyPass "/teams-share-ui" "http://master\_node\_host\_name:32080/teams-share-ui" 
ProxyPassReverse "/teams-share-ui" "http://master\_node\_host\_name:32080/teams-share-ui"**
```

``` {#codeblock_xqj_hlp_fvb}
**\# Teams SameSite Fix
\# Add SameSite property to all server-side set-cookie response headers
Header edit Set-Cookie ^\(.\*\)$ "$1; SameSite=None;Secure"**
```

``` {#codeblock_yqj_hlp_fvb}
**\# Fix for Embedded Experiences content loading in Teams Tab iframe
<Location /connections/opensocial/gadgets/ifr\>
Header unset Content-Security-Policy
Header always set Content-Security-Policy "frame-ancestors 'self' teams.microsoft.com \*.teams.microsoft.com"
</Location\>**
```

**The proxy pass statements map URI to the ingress controller service to route requests to the appropriate Microsoft Teams-related micro-services. Given tightening security of more recent versions of browser, especially Chrome \(or Chromium-based browsers\) and the use of embedded iFrames by Microsoft Teams, passing cookies correctly between the environments requires the SameSite=None and Secure property.**

**For more information about the SameSite property, please see:**

-   **[Browser changes to SameSite cookie handling and WebSphere Application Server](https://www.ibm.com/support/pages/browser-changes-samesite-cookie-handling-and-websphere-application-server)**
-   **[Cookies: HTTP State Management Mechanism \(RFC6265-bis\)](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)**

**Lastly, and again for security reasons, you must change the x-frame-options header to support the way that Microsoft Teams uses an iFrame to embed application content in the tabbed pages. Since Connections also uses an iFrame to display embedded experiences content, this becomes an iFrame within an iFrame. The embedded experiences content cannot be displayed if SAMEORIGIN is used because the Teams UI and Embedded Experiences content do not share a common origin host. Using ALLOW-FROM permits the header to tell the browser that it is allowed to render content in the iFrame when processing the /connections/opensocial/gadgets/ifr request from an alternative host.**

**To enable Microsoft Teams integration, see [Setting up the Connections app for the Microsoft Teams client](../../connectors/admin/t_ms_teams_set_up_conn_app_for_ms.md) in the Integrating with Other Products section of this documentation.**

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

**\[From v7\]** **A [replacement strategy](cp_install_upgrade_container.md) is being used to install or upgrade the [Tailored Experience features](cp_install_offerings.md); therefore it's important to note that you must add `--force` to the end of the command.**

**To install or upgrade Tailored Experience, run:**

``` {#codeblock_xtd_xlp_fvb}
**helm upgrade tailored-exp 
component\_pack\_installation\_folder/hybridcloud/helmbuilds/tailored-exp-\*.tgz -i -f 
component\_pack\_installation\_folder/hybridcloud/examples/multi\_domain\_environment/tailoredexperience.yml --force**
```

**Once this is all set, add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:**

``` {#codeblock_ytd_xlp_fvb}
**\# proxy rules for admin-portal
ProxyPass "/cnxadmin" "http://cp1.internal.cnx-dev.net:32080/cnxadmin"  
ProxyPassReverse "/cnxadmin" "http://cp1.internal.cnx-dev.net:32080/cnxadmin"
\# proxy rules for community-template-service
ProxyPass "/comm-template" "http://cp1.internal.cnx-dev.net:32080/comm-template/templates" 
ProxyPassReverse "/comm-template" "http://cp1.internal.cnx-dev.net:32080/comm-template/templates"
\# proxy rules for te-creation-wizard
ProxyPass "/te-creation-wizard/" "http://cp1.internal.cnx-dev.net:32080/te-creation-wizard/" 
ProxyPassReverse "/te-creation-wizard/" "http://cp1.internal.cnx-dev.net:32080/te-creation-wizard/"**
```

For post-installation tasks required to deploy the community creation wizard and templates, see [Configuring the community creation wizard](t_configure_community_wizard.md) and [Assigning administrators to template management roles](../admin/t_admin_comm_templates_assign_admins.md).

## Set up Activities Plus {#activities_plus .section}

See [Installing Activities Plus services](cp_3p_install_ap_services.md) for details.

**\[From v7\]** **Prerequisites for installing Activities Plus are:**

-   **Get a free license from store.huddo.com**
-   **Register it with Connections as described in [Registering an OAuth application with a provider](cp_3p_config_ap_oauth.md) in the Integrating Activities Plus section.**

**To install or upgrade it, run:**

``` {#codeblock_rbn_1np_fvb}
**helm upgrade kudos-boards-cp 
component\_pack\_installation\_folder/hybridcloud/helmbuilds/kudos-boards-cp-2.\*.tgz -i -f 
component\_pack\_installation\_folder/hybridcloud/examples/multi\_domain\_environment/kudosboards.yml**
```

**Once this is all set, add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:**

``` {#codeblock_sbn_1np_fvb}
**\# proxy rules for activities plus 
RewriteRule ^/activities/service/html/\(.\*\)$ /boards/activities/service/html/$1 \[R\] 
ProxyPass "/boards" "http://cp1.internal.cnx-dev.net:32080/boards" 
ProxyPassReverse "/boards" "http://cp1.internal.cnx-dev.net:32080/boards" 
ProxyPass "/api-boards" "http://cp1.internal.cnx-dev.net:32080/api-boards" 
ProxyPassReverse "/api-boards" http://cp1.internal.cnx-dev.net:32080/api-boards"**
```

**Starting with version 7, be sure that you have websockets enabled on your front proxy server.**

**If you are using Nginx, the configuration would look like this:**

``` {#codeblock_tbn_1np_fvb}
**location /api-boards/ \{ 

                    proxy\_pass https://connections1.internal.cnx-dev.net; 

                    proxy\_http\_version 1.1; 

                    proxy\_set\_header Upgrade $http\_upgrade; 

                    proxy\_set\_header Connection "upgrade"; 

                \}**
```

Find more about Activities Plus in [Integrating with Activities Plus](cp_3p_integrate_intro.md).

## Set up Connections add-in for Microsoft Outlook {#ms_outlook_addin .section}

**\[From v7\]****Prerequisites for installing HCL Connections add-in for Microsoft Outlook are:**

-   **Verify that [Connections Outlook Add-in system requirements](../../connectors/admin/c_outlook_connector_addin_sys_req.md) are met.**
-   **[Register the Outlook Add-in OAuth application provider with Connections](cp_3p_outlook_addin_oauth.md).**

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

**\[From v7\]****To install or upgrade the Connections Outlook add-in, run:**

``` {#codeblock_l5k_nnp_fvb}
**helm upgrade connections-outlook-desktop 
component\_pack\_installation\_folder/hybridcloud/helmbuilds/connections-outlook-desktop-\*.tgz -i -f 
component\_pack\_installation\_folder/hybridcloud/examples/multi\_domain\_environment/outlook-addin.yml**
```

**Once this is all set, add the following rules to httpd.conf for your IBM HTTP servers and restart the service:**

``` {#codeblock_m5k_nnp_fvb}
**\# proxy rules for outlook add-in
Redirect "/outlook-addin" "/outlook-addin/" 
ProxyPass "/outlook-addin/" "http://cp1.internal.cnx-dev.net:31810/" 
ProxyPassReverse "/outlook-addin/" "http://cp1.internal.cnx-dev.net:31810/"**
```

**Finally, update the add-in docker environment variables.**

**These are located in the outlook-addin.yaml file. These are passed into the Outlook add-in docker instance on startup:**

-   **What must be overriden:**
    -   **CONNECTIONS\_URL - URL of your Connections environment without a trailing slash \(eg https://my.connections.server.com\). The same URL has to be used when generating secret in the first step.**
    -   **CONNECTIONS\_CLIENT\_SECRET - Client secret generated by Connections when registering OAuth provider in the first step.**
    -   **CONNECTIONS\_CLIENT\_ID - Client ID \(aka. app ID\) used when registering OAuth provider in Connections in the first step \(default: hcl-cnx-office-addin\)**
-   **What may be overriden:**
    -   **CONTEXT\_ROOT - The path to where the Outlook add-in is being served, relative to the CONNECTIONS\_URL. Do NOT start or end with \`/. \(default: outlook-addin\)**
    -   **SUPPORT\_URL - URL that a user can go to for support \(help\). \(default: https://help.hcltechsw.com/connections/v7/connectors/enduser/c\_ms\_plugins\_add\_in\_outlook.html\)**
    -   **CONNECTIONS\_NAME – A custom name for the add-in..\(default: 'HCL Connections'\)**
    -   **EWS\_HOSTNAME – The hostname for Exchange Web Services. Default: 'outlook.office365.com'**
-   **Take care about ingresses listed there. You should point to both frontend domain and internal domains, if both are used. Otherwise, only point to the one that is used in your case.**

**To enable the Connections add-in for Microsoft Outlook, see [Making the Connections Add-in for Outlook available to users](cp_3p_outlook_make_available_to_users.md).**

-   **[Installing MongoDB 5 for Component Pack 8](../install/installing_mongodb_5_for_component_pack_8.md)**  
Install MongoDB 5 for Component Pack 8.
-   **[Migrating data from MongoDB 3 to 5](../install/migrating_data_mongodb_v3_v5.md)**  
Back up, copy, restore, and validate your MongoDB databases.
-   **[Migrating data from Elasticsearch 7 to OpenSearch](../install/cp_migrate_data_from_es7_to_opensearch.md)**  
To preserve the Metrics, Orient Me, and Recent History data stored in Elasticsearch 7 for your Connections 7 deployment, you must migrate that data to the OpenSearch service provided with Component Pack for Connections 8.

**Parent topic:**[Installation and upgrade](../install/cp_install_upgrade_container.md)

