# Steps to install or upgrade to Component Pack 8 {#cp_install_services_tasks .concept}

Use these steps to help you install Component Pack 8 or replace Component Pack 7 with 8.

## Before you begin {#section_awd_rwp_tnb .section}

For background information and where to get the latest download, see [Installation and upgrade](cp_install_upgrade_container.md).

When preparing to install or upgrade to Component Pack 8, consider the recommendations in [Upgrade considerations for Component Pack 8](upgrade_considerations.md).

Before starting the steps, note the following:

**Ensure you have these:**

-   A system running Connections \(if you are upgrading from Component Pack 7, a system running Connections 7 with Component Pack deployed\).
-   Kubernetes up and running.

    **Note:** This article does not contain the initial steps to get your Kubernetes platform up and running. The base setup depends on your environment which could be Kubernetes-only.

-   Access to the [Harbor repository](https://hclcr.io/harbor/projects/15/repositories).

**Let's make a few assumptions about the environment:** We are installing an environment which will be available behind web1.cnx-dev.net. However, this is just a public domain.

All the nodes are available using their FQDNs and are in a different domain:

-   Connections, with WebSphere and IHS is on connections1.internal.cnx-dev.net
-   DB2 is on db1.internal.cnx-dev.net
-   Kubernetes cluster is just a single node, and it is on cp1.internal.cnx-dev.net
-   NFS master is collocated with cp1.internal.cnx-dev.net and its IP address is 172.27.1.48 and all our folders are created in 172.27.1.48:/pv-connections/

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

This document uses the preceding assumptions to walk you through the below steps to deploy Component Pack 8. These steps generally appear in chronological order, but note that there are differences between the installation and upgrade procedures. Some of the following steps apply only to one scenario \(install *or* upgrade\), while others apply to both \(install *and* upgrade\). Refer to [Order of installation](cp_install_upgrade_container.md#order_cp_install) for the complete list of steps for each scenario.

## Set up NFS {#section_e4p_jrp_tnb .section}

We don't recommend or support any particular configuration of NFS – you can use whatever NFS implementation is available. For the sake of this example, however, let's assume that our NFS master is on connections1.internal.cnx-dev.net, you have root access there, you installed NFS, you know how to manage it, and you just need the stuff needed for Component Pack.

Use the following guidelines to help you set up persistent volumes for Component Pack services for a high availability deployment.

**Requirements for persistent volumes**

These guidelines and sample files describe how to set up all of the persistent volumes required for a full installation of Component Pack. In a high availability configuration, the best practice is to maintain persistent storage away from the Kubernetes masters and worker nodes themselves, on a separate machine that all masters and workers can access.

**Note:** The machine storing the persistent volumes in an HA configuration will not have Docker or Kubernetes installed.

**Exporting the persistent volumes**

1.  Perform these steps on NFS master:
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
    3.  Download nfsSetup.sh and volumes.txt from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/third_party/nfs-install/templates/nfsSetupScript) to a directory of your choice \(for example, /tmp\).
    4.  Check if firewalld is already installed using the following rpm command:

        ``` {#codeblock_lxc_p5t_hvb}
        - $rpm -qa firewalld
        ```

        If the command does not return anything, install firewalld on your operating system. For example, on Linux/CentOS, run:

        ``` {#codeblock_mxc_p5t_hvb}
        $sudo yum install firewalld
        ```

        Then start the firewalld service:

        ``` {#codeblock_nxc_p5t_hvb}
        $sudo systemctl start firewalld
        ```

    5.  Provide execution permission to nfsSetup.sh and run it in order for NFS to be configured:

        ``` {#codeblock_oxc_p5t_hvb}
        sudo chmod +x nfsSetup.sh
        sudo bash nfsSetup.sh
        ```

    6.  **\(Optional\)** Export file systems:

        ``` {#codeblock_pxc_p5t_hvb}
        exportfs -ra
        ```

    7.  Enable and start nfs-server:

        ``` {#codeblock_qxc_p5t_hvb}
        systemctl restart nfs-server
        ```

2.  Configure NFS clients by enabling and starting the nfs-server on all Kubernetes master and worker nodes:

    ``` {#codeblock_rxc_p5t_hvb}
    systemctl restart nfs-server
    ```


Ensure that all of the persistent volumes are exported and mountable from Kubernetes masters and workers nodes before you proceed to the next steps.

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

Register the snapshot repository in Elasticsearch 7:

1.  Connect to an Elasticsearch 7 client pod by running the following command:

    ``` {#codeblock_rgx_4yt_hvb}
    kubectl exec -ti -n connections $(kubectl get pods -n connections
    |grep **es-client** |awk '{print $1}') -- bash
    ```

2.  Enter the following commands, which make use of the sendRequest utility to communicate with Elasticsearch 7:

    ``` {#codeblock_x4z_ryt_hvb}
    /opt/elasticsearch-7.10.1/probe/sendRequest.sh PUT /_snapshot
    /**$\{REPONAME\}** \
    -H 'Content-Type: application/json' \
    -d '{"type": "fs","settings": {"compress" : true, "location":
    **"$\{BACKUPPATH\}"**}}'
    ```

    ``` {#codeblock_iq3_tyt_hvb}
    o/p: {"acknowledged":true}
    ```

    ``` {#codeblock_iny_tyt_hvb}
    /opt/elasticsearch-7.10.1/probe/sendRequest.sh GET /_snapshot
    /_all?pretty
    ```

    ``` {#codeblock_ebp_5yt_hvb}
    o/p: { “${REPONAME}” : { "type" : "fs", "settings" : { "compress" :
    "true", "location" : “${BACKUPPATH}” } } }
    ```

    Where:

    -   $\{REPONAME\} is the name of the snapshot repository, which will be used to register and manage the Elasticsearch 7 snapshot. The first time that you perform these steps, you must give the repository an appropriate name, for example, connectionsbackup.
    -   $\{BACKUPPATH\} is the mount path of the shared Elasticsearch 7 backup persistent volume \(esbackup\). By default this path is /backup.
    Disconnect from the pod \(press Ctrl+D, or type exit and press Enter\).

3.  Connect to an Elasticsearch 7 client pod in the Elasticsearch 7 cluster by running the following command on a Kubernetes node:

    ``` {#codeblock_cjp_bzt_hvb}
    kubectl exec -ti -n connections $(kubectl get pods -n connections -o
    wide |grep es-client-7 |awk '{print $1}' |head -n 1) – bash
    ```

4.  Back up all Elasticsearch 7 indexes by running the following command:

    ``` {#codeblock_gqp_czt_hvb}
    /opt/elasticsearch-7.10.1/probe/sendRequest.sh PUT /_snapshot
    /${REPONAME}/snapshot_migration?wait_for_completion=true
    ```

    Where $\{REPONAME\} is the name of the snapshot repository, which was previously used to register and manage the Elasticsearch 7 snapshot, for example, connectionsbackup.

    Disconnect from the pod \(press Ctrl+D, or type exit and press Enter\).


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

    1.  Download nfsSetup.sh and volumes.txt from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/third_party/nfs-install/templates/nfsSetupScript).

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

    -   << helm repo path \>\> is the Helm chart path in Harbor repository, that is `https://hclcr.io/chartrepo/cnx`
    -   << helm\_repo\_username \>\> is the Harbor username
    -   << helm\_repo\_password \>\> is the CLI secret \(to access, **log in to Harbor** \> **at the top-right corner, click on your name** \> **User Profile** \> **CLI Secretsecret**\)
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

The [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) includes a set of templates to override the default values to values that are appropriate to your environment. The resulting files are the ones used by the following Helm upgrade commands using the -f option.

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

Install or upgrade the existing Kubernetes Helm chart to the new version.

1.  Start by finding out the k8s-psp chart version available on Harbor:

    ``` {#codeblock_t4g_f5t_hvb}
    helm search repo v-connections-helm --devel | grep k8s-psp | awk {'print $2'}
    ```

    ``` {#codeblock_ed5_f5t_hvb}
    o/p 0.1.0-20210909-112534
    ```

2.  Then upgrade:

    ``` {#codeblock_g2j_g5t_hvb}
    helm upgrade k8s-psp v-connections-helm/k8s-psp -i --version 0.1.0-20210909-112534 --set namespace=connections --namespace connections --wait
    ```


## Set up persistent volumes and persistent volume claims on NFS {#pv_pvc .section}

Make sure that the network configuration of your NFS environment is correct before configuring the Connections PVs.

1.  Before installing the connections-volumes Helm chart to set up the persistence layer, delete the existing chart volumes:

    ``` {#codeblock_hyz_1jr_bvb}
    helm uninstall connections-volumes -n connections
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

4.  Download the j2 template for connections-volumes.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

5.  Then, run installation:

    ``` {#codeblock_qx1_vkr_bvb}
    helm upgrade connections-volumes v-connections-helm/connections-persistent-storage-nfs -i --version 0.1.1-20220505-090030 --namespace connections -f connections-volumes.yml --wait
    ```

    **Note:** Use your destination **nfs.server** and **persistentVolumePath** as parameters in connections-volumes.yml.

6.  Verify that all PVCs are in "bound" state:

    ``` {#codeblock_sx1_vkr_bvb}
    kubectl get pvc -n connections
    ```


For how to troubleshoot PV and PVC setup, see the [Troubleshooting Component Pack guide](https://opensource.hcltechsw.com/connections-doc/v8/guide_me/how_to_guides/troubleshooting_cnx_cp.pdf) document.

## Set up bootstrap charts {#bootstrap .section}

The bootstrap chart not only defines the network interoperability parameters but also creates secrets and certificates for various components, including Redis and OpenSearch.

Be aware that bootstrap installation overwrites existing secrets, and therefore requires redoing some configuration steps, like SSL interoperability with OpenSearch.

1.  Start by deleting the existing chart:

    ``` {#codeblock_sk4_ytt_hvb}
    helm uninstall bootstrap -n connections
    ```

2.  Find out the bootstrap chart version available on Harbor:

    ``` {#codeblock_tk4_ytt_hvb}
    helm search repo v-connections-helm --devel  | grep bootstrap | awk {'print $2'}
    ```

    ``` {#codeblock_uk4_ytt_hvb}
    o/p 0.1.0-20220714-190047
    ```

3.  Download the j2 template for bootstrap.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
4.  Run the bootstrap installation:

    ``` {#codeblock_vk4_ytt_hvb}
    helm upgrade bootstrap v-connections-helm/bootstrap -i --version 0.1.0-20220411-104621 --namespace connections -f bootstrap.yml --wait
    ```


## Set up connections-env chart {#cnx_env .section}

The configmap for connections-env contains all the variables needed for the Customizer and Orient Me to function properly. Note that Customizer always points to the IBM HTTP Server directly, whereas Orient Me requests point to the front door proxy.

1.  Find out the connections-env version available on Harbor:

    ``` {#codeblock_kc1_cvt_hvb}
    helm search repo v-connections-helm --devel  | grep connections-env | awk {'print $2'}
    0.1.40-20220616-233100
    ```

2.  Download the j2 template for connections-env.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
3.  Run the connections-env installation:

    ``` {#codeblock_lc1_cvt_hvb}
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

If this step fails, and if all pods don't come up, there is no point proceeding until this is fixed. To troubleshoot the Component Pack installation check out the [Troubleshooting Component Pack](https://opensource.hcltechsw.com/connections-doc/v8/guide_me/how_to_guides/troubleshooting_cnx_cp.pdf) document.

Make sure to set up the rules to your httpd.conf on your IBM HTTP servers – see [Configuring the HTTP server](cp_config_proxy_rules.md).

## Set up Customizer {#section_n3c_xhj_dvb .section}

**Before you begin**

Customizer needs to be installed, customizations copied into its PV \(living on your NFS:/pv-connections/customizations\), and then enabled on Nginx:

-   Mount NFS:/pv-connections/customizations to the server where you have your Component Pack unpacked and from which you are managing installations
-   Copy all the files from component\_pack\_installations\_folder/hybridcloud/support/customizations/\* to NFS:/pv-connections/customizations
-   Copy component\_pack\_installations\_folder/hybridcloud/support/ms-teams folder to NFS:/pv-connections/customizations

**Procedure**

1.  Delete existing Customizer chart:

    ``` {#codeblock_zdf_sqt_hvb}
    helm uninstall mw-proxy -n connections
    ```

2.  Get chart and version:

    ``` {#codeblock_a2f_sqt_hvb}
    helm search repo v-connections-helm --devel | grep mw-proxy | awk {'print $2'}
    0.1.0-20220414-134118
    ```

3.  Download the j2 template for customizer.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
4.  Install chart:

    ``` {#codeblock_b2f_sqt_hvb}
    helm upgrade mw-proxy v-connections-helm/mw-proxy -i --version 0.1.0-20220414-134118 --namespace connections -f customizer.yml --wait
    ```

5.  Set up your reverse proxy to forward some traffic to the customizer – see [Configuring the HTTP server](cp_config_proxy_rules.md).

Learn more about configuring Customizer in [Configuring the Customizer component](cp_config_customizer_intro.md).

## Migrate MongoDB data {#migrate_mongo3 .section}

Perform the steps in [Migrating data from MongoDB 3 to 5](migrating_data_mongodb_v3_v5.md).

## Set up OpenSearch {#os_chart .section}

With Connections 8, OpenSearch replaces Elasticsearch 7 as the default backend for Metrics, OrientMe, and Search.

Installing the OpenSearch chart creates an additional secret – use the default secret from the bootstrap installation instead. See [Set up bootstrap charts](#bootstrap).

**Note:** OpenSearch, because of the way it is set up starting with version 8, will not work if bootstrap didn't create its secrets and certificates beforehand.

1.  Get chart and version:

    ``` {#codeblock_ixs_ltr_bvb}
    helm search repo v-connections-helm --devel | grep opensearch | awk {'print $2'}
    1.3.0-20220520-092636
    ```

2.  Download the j2 template for opensearch\_master.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
3.  Install OpenSearch master:

    ``` {#codeblock_jxs_ltr_bvb}
    helm upgrade opensearch-master v-connections-helm/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_master.yml --wait --timeout 10m
    ```

4.  Download the j2 template for opensearch\_data.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
5.  Install OpenSearch data:

    ``` {#codeblock_kxs_ltr_bvb}
    helm upgrade opensearch-data v-connections-helm/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_data.yml --wait --timeout 10m
    ```

6.  Download the j2 template for opensearch\_client.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
7.  Install OpenSearch client:

    ``` {#codeblock_mxs_ltr_bvb}
    helm upgrade opensearch-client v-connections-helm/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_client.yml --wait --timeout 10m
    ```

8.  Check if the OpenSearch master, data, and client pods are up and running:

    ``` {#codeblock_nxs_ltr_bvb}
    kubectl get pods -n connections | grep -i "opensearch-cluster-"
    ```

9.  Remove the OpenSearch master eligible nodes using voting configuration to support scaling down:

    ``` {#codeblock_oxs_ltr_bvb}
    kubectl exec opensearch-cluster-master-0 -n connections -- bash -c "/usr/share/opensearch/probe/sendRequest.sh POST /_cluster/voting_config_exclusions?node_names=opensearch-cluster-master-1,opensearch-cluster-master-2"
    ```


## Migrate ElasticSearch data { .section}

Perform the steps in [Migrating data from Elasticsearch 7 to OpenSearch](cp_migrate_data_from_es7_to_opensearch.md).

## Set up Orient Me for OpenSearch {#orientme_os .section}

With Connections 8, the only backend for Orient Me is OpenSearch, so you need to update orientme and switch from Elasticsearch 7 to OpenSearch.

**Prerequisites**

-   Infrastructure charts need to be already installed and all pods scheduled.
-   connections-env configmap needs to be already present.
-   OpenSearch needs to be installed and running.
-   After you install Orient Me, you need to run Profiles migration. In this step, we are migrating users from PeopleDB to MongoDB, which is used by Orient Me.
-   You need to set rewrite rules in httpd.conf on your IBM HTTP Server to enable sending requests to it from Connections.

**Procedure**

1.  Get chart and version:

    ``` {#codeblock_cdt_rr3_dvb}
    helm search repo v-connections-helm --devel | grep orientme | awk {'print $2'}
    0.1.0-20220617-050009
    ```

2.  Download the j2 template for orientme.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars), then update these settings:
    -   `orient-indexing-service.indexing.opensearch=true and orient-indexing-service.indexing.elasticsearch=false`
    -   `orient-retrieval-service.Retrieval.Opensearch=true and orient-retrieval-service.Retrieval.elasticsearch=false`
3.  Install chart:

    ``` {#codeblock_ccz_ztr_bvb}
    helm upgrade orientme v-connections-helm/orientme -i --version 0.1.0-20220617-050009 --namespace connections -f orientme.yml  --wait
    ```

4.  Wait for all these parts to become ready:

    ``` {#codeblock_ecz_ztr_bvb}
    kubectl get pods -n connections | grep -iE "orient|itm-services|community-suggestions|middleware-graphql|people-idmapping|people-migrate|people-relation|people-scoring|userprefs-service"
    ```

5.  If you are upgrading to Connections 8, perform these additional steps:

    1.  Check if the Home page works fine from your browser by navigating to the /homepage URL.

        If the page displays an error, delete the orient-web-client pods using the following command:

        ``` {#codeblock_a2g_wr3_dvb}
        kubectl -n connections delete pod $(kubectl get pods -n connections | grep orient-web | awk '{print $1}')
        ```

        After the pods have been recreated, check the Home page from your browser again.

    2.  Remove Elasticsearch 7 artifacts from your system:

        ``` {#codeblock_qm5_wr3_dvb}
        helm uninstall -n connections elasticsearch7
        ```

6.  To migrate profiles, run this:

    ``` {#codeblock_dhk_m1t_hvb}
    kubectl exec -n connections -it $(kubectl get pods -n connections | grep people-migrate | awk '{print $1}') -- sh -c "npm run start migrate"
    ```

    If you followed examples and the order of installation, this should work out of the box. If you want to do some customizations, or if you are later changing the database, you can SSSH into people-migrate pod and see the configuration that was precreated for you during the installation/upgrade of Component Pack in /usr/src/app/migrationConfig.

7.  Set the rewrite rules to the httpd.conf on your IBM HTTP Server – see [Configuring the HTTP server](cp_config_proxy_rules.md).

Learn more about configuring Orient Me in [Configuring the Orient Me component](cp_config_om_intro.md).

## Set up Metrics for OpenSearch {#metrics_os .section}

**Before you begin**

Component Pack for HCL Connections 8 comes with OpenSearch enabled by default – this is the only backend for Metrics in Connections 8. If you are upgrading from Connections 7.0, you need to update Metrics and switch from the Elasticsearch 7 service in your Component Pack 7 deployment, to OpenSearch for Component Pack 8.

If you are on HCL Connections 6.5.0.1 or earlier, and using ElasticSearch 5, there are two options:

-   If you don't need to migrate data, you can use the preceding links to configure the Metrics component to use the newly installed OpenSearch.
-   Migrate to Elasticsearch 7 first, then migrate to OpenSearch.

Before configuring Metrics, make sure that your WebSphere Application servers are up and running.

**Procedure**

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

        -   KEYSTORE\_FULL\_PATH: See the following example.
        -   SIGNER\_CA\_FULL\_PATH: See the following example.
        -   OpenSearch\_CA\_PASSWORD: The password that was set while [setting up bootstrap charts](#bootstrap).
        -   OpenSearch\_HTTPS\_PORT: Find the port by running following command on the Component Pack System:

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
7.  Download config\_blue\_metrics.py from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/files/config_blue_metrics.py). This script sets the OpenSearch server base URL in Metrics.

8.  Run the following script on the Connections Component Pack system. This will set highway settings that are needed for Metrics using OpenSearch.

    ``` {#codeblock_cmj_11p_fvb}
    /usr/bin/python3 config_blue_metrics.py --skipSslCertCheck true --pinkhost <<hostname>> --namespace connections
    ```

    Where you must:

    -   --skipSslCertCheck: Set to true. Use on systems that use self-signed SSL certificates.
    -   --pinkhost: Set to the fully qualified domain name \(FQDN\) of the Kubernetes master. This would be the fronting Kubernetes master load balancer or virtual IP in a HA environment.
    -   --namespace: Set to `connections`.

**Configuring Metrics**

For optional procedures to configure Metrics, see [Configuring the OpenSearch Metrics component](cp_config_os_intro.md).

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

5.  Install ingress-nginx:

    ``` {#codeblock_ech_hjx_bvb}
    helm upgrade cnx-ingress -i ingress-nginx/ingress-nginx --namespace connections --set controller.service.type=NodePort,controller.service.nodePorts.http=32080,controller.service.nodePorts.https=32443,defaultBackend.enabled=true,controller.healthStatus=true,controller.healthCheckPath="/healthz",controller.livenessProbe.timeoutSeconds=60,controller.readinessProbe.timeoutSeconds=60 --wait
    ```


## Set up Microsoft Teams integration {#teams_integ .section}

1.  Get chart and version:

    ``` {#codeblock_w25_1bt_hvb}
    helm search repo v-connections-helm --devel | grep teams | awk {'print $2'}
    1.0.0-20220818-170013
    ```

2.  Download the j2 template for teams.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
3.  Install the chart:

    ``` {#codeblock_cp2_bbt_hvb}
    helm upgrade teams v-connections-helm/teams -i --version 1.0.0-20220818-170013 --namespace connections -f teams.yml --wait
    ```


The Microsoft Teams integration microservices rely on a configmap \(integrations-msteams-env\) and secret \(ms-teams-secret\) that are part of the overall connections-env deployment. They are not installed by the connections-env chart by default; the expectation is that they are enabled as needed by customers who use Microsoft Teams and wish to enable the use cases that these micro-services support.

To upgrade the connections-env deployment to enable the correct settings for Microsoft Teams, three specific pieces of information are required which should have been created and noted while performing the steps in [Configuring an Azure app to support the Microsoft Teams app](../../connectors/admin/t_ms_teams_config_azure_app.md).

The items of information needed for this setup are:

-   Teams tenant ID
-   Bot \(app\) ID
-   Bot \(app\) password \(secret\)

With this information, to upgrade the connections-env and create the configmap and secret, run:

``` {#codeblock_uqj_hlp_fvb}
helm upgrade connections-env component\_pack\_installation\_folder/hybridcloud/helmbuilds/connections-env-*.tgz --reuse-values --set integrations.msteams.enabled=true,integrations.msteams.tenant.id="your\_tenant\_id",integrations.msteams.client.id="your\_bot\_id",integrations.msteams.client.secret="your\_bot\_secret",integrations.msteams.auth.schema="3",integrations.msgraph.client.id="not_used",integrations.msgraph.client.secret="not_used",integrations.msgraph.redirect.uri="not_used",integrations.msteams.share.ui.files.api="/files/basic/api",integrations.msteams.redirect.uri="not_used",integrations.msgraph.secret.name="not_used",integrations.msgraph.auth.endpoint="not_used",integrations.msgraph.meta.endpoint="not_used",integrations.msgraph.authorize.endpoint="not_used",integrations.msgraph.token.endpoint="not_used",integrations.msteams.share.service.endpoint="my.connections.server.com",imagePullSecretName="myregkey"
```

Once the configmap and secret are created, continue to install the microservices that rely on them for configuration.

Once the microservices are installed and running, set up rules in httpd.conf on the IBM HTTP Server – see [Configuring the HTTP server](cp_config_proxy_rules.md).

The proxy pass statements map URI to the ingress controller service to route requests to the appropriate Microsoft Teams-related micro-services. Given tightening security of more recent versions of browser, especially Chrome \(or Chromium-based browsers\) and the use of embedded iFrames by Microsoft Teams, passing cookies correctly between the environments requires the SameSite=None and Secure property.

For more information about the SameSite property, please see:

-   [Browser changes to SameSite cookie handling and WebSphere Application Server](https://www.ibm.com/support/pages/browser-changes-samesite-cookie-handling-and-websphere-application-server)
-   [Cookies: HTTP State Management Mechanism \(RFC6265-bis\)](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)

Lastly, and again for security reasons, you must change the x-frame-options header to support the way that Microsoft Teams uses an iFrame to embed application content in the tabbed pages. Since Connections also uses an iFrame to display embedded experiences content, this becomes an iFrame within an iFrame. The embedded experiences content cannot be displayed if SAMEORIGIN is used because the Teams UI and Embedded Experiences content do not share a common origin host.

To enable Microsoft Teams integration, see [Setting up the Connections app for the Microsoft Teams client](../../connectors/admin/t_ms_teams_set_up_conn_app_for_ms.md).

## Set up Tailored Experience features for communities {#comm_tailored .section}

1.  Get chart and version:

    ``` {#codeblock_pcf_fct_hvb}
    helm search repo v-connections-helm --devel | grep tailored-exp| awk {'print $2'}
    1.0.0-20220818-170013
    ```

2.  Download the j2 template for tailoredexperience.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
3.  Install the chart:

    ``` {#codeblock_anp_fct_hvb}
    helm upgrade tailored-exp v-connections-helm/tailored-exp -i --version 1.0.0-20220818-170013 --namespace connections -f tailoredexperience.yml --wait
    ```

4.  Once this is all set, set up rules in the httpd.conf on the IBM HTTP servers – see [Configuring the HTTP server](cp_config_proxy_rules.md).

For post-installation tasks required to deploy the community creation wizard and templates, see [Configuring the community creation wizard](t_configure_community_wizard.md) and [Assigning administrators to template management roles](../admin/t_admin_comm_templates_assign_admins.md).

## Configure the LotusConnections-config.xml {#section_i5b_1pt_hvb .section}

1.  Start the wsadmin command. Refer to [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md).
2.  Load the IBM Connections configuration file:

    ``` {#codeblock_mjx_spt_hvb}
    execfile("connectionsConfig.py")
    ```

    If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

3.  Check out the IBM Connections configuration files:

    ``` {#codeblock_lmw_tpt_hvb}
    LCConfigService.checkOutConfig("working_directory","cell_name")
    ```

    Where:

    -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.
    -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client:

        ``` {#codeblock_owg_zpt_hvb}
        print AdminControl.getCell()
        ```

    **Note:** When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example, "C:/temp". On AIX and Linux, the directory must grant write permissions or the command fails.

4.  Open the checked-out LotusConnectionsConfig.xml file in an XML editor of your choice and add the property componentPackInstalled to the <properties\> </properties\> tag as shown below:

    ``` {#codeblock_fvy_dqt_hvb}
    <properties>
        <genericProperty name="ignore.lang.param">true</genericProperty>
        <genericProperty name="elasticsearch.eSmajorVersion">7</genericProperty>
        <genericProperty name="people.typeahead">enabled</genericProperty>
        <genericProperty name="lconn.core.WidgetPlacement.communities.useCRE">true</genericProperty>
        <**genericProperty name="componentPackInstalled"\>true</genericProperty\>**
        <genericProperty name="lconn.core.WidgetPlacement.profiles.useCRE">true</genericProperty>
    </properties>
    ```

5.  Save and check in the LotusConnections-config.xml file:

    ``` {#codeblock_jnr_gqt_hvb}
    LCConfigService.checkInConfig()
    ```

    The file is validated, and you are notified if an error is found.

6.  To exit the wsadmin client, type exit at the prompt.
7.  Deploy the changes by doing a **Fully Resynchronize** of the nodes on WebSphere Admin Console \([https://<host\_name\>:9043/ibm/console](https://%3chost_name%3e:9043/ibm/console)\).
8.  Stop and restart the servers that host the IBM Connections applications.

## Set up Activities Plus {#activities_plus .section}

**Prerequisites**

-   Get a free license from store.huddo.com
-   Register it with Connections as described in [Registering an OAuth application with a provider](cp_3p_config_ap_oauth.md) in the Integrating Activities Plus section.

**Procedure**

For steps to set up Activities Plus, refer to [Installing Activities Plus services](cp_3p_install_ap_services.md). Afterwards, you can find out more about Activities Plus in [Integrating with Activities Plus](cp_3p_integrate_intro.md).

## Set up Connections add-in for Microsoft Outlook {#ms_outlook_addin .section}

**Prerequisites**

-   Verify that [Connections Outlook Add-in system requirements](../../connectors/admin/c_outlook_connector_addin_sys_req.md) are met.
-   [Register the Outlook Add-in OAuth application provider with Connections](cp_3p_outlook_addin_oauth.md).

**Procedure**

1.  Delete the existing connections-outlook-desktop chart:

    ``` {#codeblock_xwc_5ct_hvb}
    helm uninstall connections-outlook-desktop -n connections
    ```

2.  Get chart and version:

    ``` {#codeblock_gsn_5ct_hvb}
    helm search repo v-connections-helm --devel | grep connections-outlook-desktop | awk {'print $2'}
    0.1.0-20220707-082629
    ```

3.  Download the j2 template outlook-addin.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.
4.  Update the add-in Docker environment variables, which are located in the outlook-addin.yaml file. These are passed into the Outlook add-in Docker instance on startup:

    -   What must be overriden:
        -   CONNECTIONS\_URL - URL of your Connections environment without a trailing slash \(eg https://my.connections.server.com\). The same URL has to be used when generating secret in the first step.
        -   CONNECTIONS\_CLIENT\_SECRET - Client secret generated by Connections when registering OAuth provider in the first step.
        -   CONNECTIONS\_CLIENT\_ID - Client ID \(aka. app ID\) used when registering OAuth provider in Connections in the first step \(default: hcl-cnx-office-addin\)
    -   What may be overriden:
        -   CONTEXT\_ROOT - The path to where the Outlook add-in is being served, relative to the CONNECTIONS\_URL. Do NOT start or end with \`/. \(default: outlook-addin\)
        -   SUPPORT\_URL - URL that a user can go to for support \(help\). \(default: https://help.hcltechsw.com/connections/v7/connectors/enduser/c\_ms\_plugins\_add\_in\_outlook.html\)
        -   CONNECTIONS\_NAME – A custom name for the add-in..\(default: 'HCL Connections'\)
        -   EWS\_HOSTNAME – The hostname for Exchange Web Services. Default: 'outlook.office365.com'
    -   Take care about ingresses listed there. You should point to both frontend domain and internal domains, if both are used. Otherwise, only point to the one that is used in your case.
5.  Install chart:

    ``` {#codeblock_iwr_wct_hvb}
    helm upgrade connections-outlook-desktop v-connections-helm/connections-outlook-desktop -i --version 0.1.0-20220707-082629 --namespace connections -f outlook-addin.yml --wait
    ```

6.  Once this is all set, add rules to httpd.conf for your IBM HTTP servers – see [Configuring the HTTP server](cp_config_proxy_rules.md).

To enable the Connections add-in for Microsoft Outlook, see [Making the Connections Add-in for Outlook available to users](cp_3p_outlook_make_available_to_users.md).

-   **[Installing MongoDB 5 for Component Pack 8](../install/installing_mongodb_5_for_component_pack_8.md)**  
Install MongoDB 5 for Component Pack 8.
-   **[Migrating data from MongoDB 3 to 5](../install/migrating_data_mongodb_v3_v5.md)**  
Back up, copy, restore, and validate your MongoDB databases.
-   **[Migrating data from Elasticsearch 7 to OpenSearch](../install/cp_migrate_data_from_es7_to_opensearch.md)**  
To preserve the Metrics, Orient Me, and Recent History data stored in Elasticsearch 7 for your Connections 7 deployment, you must migrate that data to the OpenSearch service provided with Component Pack for Connections 8.

**Parent topic:**[Installation and upgrade](../install/cp_install_upgrade_container.md)

