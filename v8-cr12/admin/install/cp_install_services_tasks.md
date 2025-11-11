# Steps to install or upgrade to Component Pack 8 {#cp_install_services_tasks .concept}

Use these steps to help you install the latest CR version of Component Pack 8 or replace Component Pack 7 or 8 with its latest CR version.

## Before you begin {#section_awd_rwp_tnb .section}

For background information and where to get the latest download, see [Installation and upgrade](cp_install_upgrade_container.md).

When preparing to install or upgrade to the latest CR version of Component Pack 8, consider the recommendations in [Upgrade considerations for Component Pack 8](upgrade_considerations.md).

Before starting the steps, note the following:

**Ensure you have these:**

- A system running Connections \(if you are upgrading from Component Pack 7, a system running Connections 7 with Component Pack and the latest CFix deployed\).

- Kubernetes up and running.

    !!! note
        
        This article does not contain the initial steps to get your Kubernetes platform up and running. The base setup depends on your environment, which could be Kubernetes-only.

- Access to the [Harbor repository](https://hclcr.io/harbor/projects/15/repositories).

**Let's make a few assumptions about the environment:** We are installing an environment which will be available behind nginx.example.com. However, this is just a public domain.

All the nodes are available using their FQDNs and are in a different domain:

- Connections, with WebSphere and IHS is on connections.internal.example.com
- DB2 is on db1.internal.example.com
- Kubernetes cluster is just a single node, and it is on cpmaster.internal.example.com
- NFS master is collocated with connections.internal.example.com and its IP address is 172.27.1.48 and all our folders are created in 172.27.1.48:/pv-connections/

**Network configuration**

All machines in our scenario are configured to use DNS and all of them have internet access. The initial entry point is nginx.example.com, which in our case can be reached from the internet. Your NGINX might reside behind a load balancer instead. To let the machines interoperate properly, consider the following inbound ports to be opened on your firewall:

   - **`connections.internal.example.com`**:
      - 443 from `nginx.example.com`
      - 443 from `cpmaster.internal.example.com`

   - **`cpmaster.internal.example.com`**:
      - 30301 from `connections.internal.example.com` (Customizer)
      - 30301 from `nginx.example.com` (Customizer)
      - 30098 from `connections.internal.example.com` (Elasticsearch 7 – Connections 7 only)
      - 30099 from `connections.internal.example.com` (OpenSearch – Connections 7 or 8, Elasticsearch 5 – Connections 6.5 only)
      - 30379 from `connections.internal.example.com` (HAProxy for Redis)
      - 32080 from `connections.internal.example.com` (Ingress Controller, 32443 if TLS is enabled)
      - 31810 from `connections.internal.example.com` (Microsoft Outlook add-in – Connections 7 only)
      - 31080 from `connections.internal.example.com` (API Gateway Service, 31443 if TLS is enabled)

   - **`nginx.example.com`**:
      - 443 from everywhere
      - 80 from everywhere (in case you plan to redirect to 443 and no load balancer does this job)

**Storage configuration**

Starting with Connections 7.0, it is possible to use different types of storage. The recommended setup contains the configuration of a NFS v4 entry point to store both data from shared WebSphere-based Connections services, as well as claims and PVs from the Component Pack side.

## Installation vs. upgrade steps {#section_v5r_1dj_dvb .section}

This document uses the preceding assumptions to walk you through the below steps to deploy the latest CR version of Component Pack 8. These steps generally appear in chronological order, but note that there are differences between the installation and upgrade procedures, including the upgrade from Component Pack 7 to 8, and Component Pack 8 to its latest CR version. Some of the following steps apply only to one scenario \(install *or* upgrade\), while others apply to both \(install *and* upgrade\). Refer to [Order of installation](cp_install_upgrade_container.md#order_cp_install) for the complete list of steps for each scenario.

## Set up NFS {#section_e4p_jrp_tnb .section}

As Connections supports various operating systems, each deployment environment must meet specific NFS requirements. The NFS prerequisites need to be determined by the system administrator for their deployment.

We don't recommend or support any particular configuration of NFS – you can use whatever NFS implementation is available. For the sake of this example, however, let's assume that our NFS master is on connections.internal.example.com, you have root access there, you installed NFS, you know how to manage it, and you just need the stuff needed for Component Pack.

Use the following guidelines to help you set up persistent volumes for Component Pack services for a high availability deployment.

### Requirements for persistent volumes

These guidelines and sample files describe how to set up all of the persistent volumes required for a full installation of Component Pack. In a high availability configuration, the best practice is to maintain persistent storage away from the Kubernetes masters and worker nodes themselves, on a separate machine that all masters and workers can access.

!!! note    
    
    The machine storing the persistent volumes in an HA configuration will not have Docker or Kubernetes installed.

### Exporting the persistent volumes

1. Perform these steps on NFS master:

   1. Create /pv-connections folder on connections.internal.example.com with permissions 0700.  You may set the ownership to your desired owner and group.
   2. Create a user with ID 1000 and another user with 1001, if not existing already, for OpenSearch and MongoDB to generate data.
   3. Inside the folder, create the following set of subfolders.  You may set the ownership to your desired group while user ownership should be set to the user ID creating data during runtime.

      - /pv-connections/customizations with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchbackup with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchmaster-0 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchmaster-1 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchmaster-2 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchdata-0 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchdata-1 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchdata-2 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchclient-0 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchclient-1 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/opensearchclient-2 with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/kudos-boards-minio with permissions 0700.  The folder should be owned by user ID 1000.
      - /pv-connections/mongo7-node-0/data/db with permissions 0700.  The folder should be owned by user ID 1001.
      - /pv-connections/mongo7-node-1/data/db with permissions 0700.  The folder should be owned by user ID 1001.
      - /pv-connections/mongo7-node-2/data/db with permissions 0700.  The folder should be owned by user ID 1001.

   4. Download `nfsSetup.sh` and `volumes.txt` from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/third_party/nfs-install/templates/nfsSetupScript) to a directory of your choice \(for example, /tmp\).

   5. Provide execution permission to `nfsSetup.sh` and run it, then complete the configuration for NSF by doing the following:

      1. Install the required NFS packages, if not already installed by default.
      2. Enable and start the required NFS services.
      3. Restart the NFS server and configure the firewall.

   6. **(Optional)** Export file systems:

      ```exportfs -ra```

2. Configure NFS clients by enabling and starting the nfs-server on all Kubernetes master and worker nodes:

   ```systemctl restart nfs-server```

Ensure that all of the persistent volumes are exported and mountable from Kubernetes masters and workers nodes before you proceed to the next steps.

## Create the namespace {#section_ln3_qp3_dvb .section}

On the server which has Helm v3 and kubectl configured for your non-root user, create the Connections namespace in Kubernetes by running the following command:

```
kubectl create namespace connections
```

## Back up Elasticsearch 7 data {#backup_es7 .section}

Register the snapshot repository in Elasticsearch 7:

1. Connect to an Elasticsearch 7 client pod by running the following command:

      ```kubectl exec -ti -n connections $(kubectl get pods -n connections | grep es-client | awk '{print $1}') -- bash```

2. Enter the following commands, which make use of the sendRequest utility to communicate with Elasticsearch 7:

      ```bash
      /opt/elasticsearch-7.10.1/probe/sendRequest.sh PUT /_snapshot/${REPONAME} \
      -H 'Content-Type: application/json' \
      -d '{"type": "fs","settings": {"compress" : true, "location": "${BACKUPPATH}"}}'
      ```

      ```o/p: {"acknowledged":true}```

      ```/opt/elasticsearch-7.10.1/probe/sendRequest.sh GET /_snapshot/_all?pretty```

      ```bash
      o/p: { “${REPONAME}” : { "type" : "fs", "settings" : { "compress" :
      "true", "location" : “${BACKUPPATH}” } } }
      ```

      Where:

      - `${REPONAME}` is the name of the snapshot repository, which will be used to register and manage the Elasticsearch 7 snapshot. The first time that you perform these steps, you must give the repository an appropriate name, for example, connectionsbackup.
      - `${BACKUPPATH}` is the mount path of the shared Elasticsearch 7 backup persistent volume (esbackup). By default this path is /backup.

      Disconnect from the pod (press Ctrl+D, or type `exit` and press Enter).

3. Connect to an Elasticsearch 7 client pod in the Elasticsearch 7 cluster by running the following command on a Kubernetes node:

      ```kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep es-client-7 | awk '{print $1}' | head -n 1) – bash```

4. Back up all Elasticsearch 7 indexes by running the following command:

      ```/opt/elasticsearch-7.10.1/probe/sendRequest.sh PUT /_snapshot/${REPONAME}/snapshot_migration?wait_for_completion=true```

      Where ${REPONAME} is the name of the snapshot repository, which was previously used to register and manage the Elasticsearch 7 snapshot, for example, connectionsbackup.

      Disconnect from the pod (press Ctrl+D, or type `exit` and press Enter).

## Set up OpenSearch and MongoDB volumes on NFS {#setup_nfs .section}

1. Validate that Helm works properly:

      ```helm list```

2. Create additional OpenSearch volumes on the NFS master node.  The folders should be owned by user ID 1000 while you may set the ownership to your desired group:

      ```
      mkdir -p /pv-connections/opensearchmaster-{0,1,2}
      mkdir -p /pv-connections/opensearchdata-{0,1,2}
      mkdir -p /pv-connections/opensearchclient-{0,1,2}
      mkdir -p /pv-connections/opensearchbackup
      ```

      HCL Connections 8.0 uses OpenSearch as the default backend for Metrics and Search. For previous versions, persistent volumes have been defined to hold data. However, with OpenSearch, you need PVs for OpenSearch masters, OpenSearch data, OpenSearch client, and OpenSearch backup. The main reason for this is stability: without a persistent state, pod recreation can interfere with outdated data, causing OpenSearch to not start properly. The resulting TCP readiness check might summarize and report the whole OpenSearch system to be down then.

3. Similarly with MongoDB 7, you need PVs for all the replicas of mongo7 pod. So, create additional MongoDB volumes on the NFS master node.  The folders should be owned by user ID 1001 while you may set the ownership to your desired group:

      ```
      mkdir -p /pv-connections/mongo7-node-0
      mkdir -p /pv-connections/mongo7-node-1
      mkdir -p /pv-connections/mongo7-node-2
      ```

4. Make the additional OpenSearch and MongoDB 7 volumes available via NFS.

   1. Download nfsSetup.sh and volumes.txt from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/third_party/nfs-install/templates/nfsSetupScript).

   2. Run nfsSetup.sh to set up NFS directories on the NFS master:

      ```sh nfsSetup.sh```

      If applicable, make sure that the firewall configuration does not block access to NFS. Adjustments might be needed for Component Pack 8 deployment compared to the Component Pack 7 setup.

   3. In /etc/exports, validate that the additional PVs are distributed properly.

## Set up HCL API Gateway volumes on NFS {#setup_nfs_apigw .section}

1. Validate that Helm works properly:

      ```helm list```

2. You need PVs for all the replicas of APISIX etcd pod. So, create additional etcd volumes on the NFS master node.  The folders should be owned by user ID 1001 while you may set the ownership to your desired group with permissions 0700:
   
      `mkdir /pv-connections/<NAMESPACE>-apisix-etcd-<REPLICA_COUNT>`

      Replace <NAMESPACE> with the component pack namespace.
      Replace <REPLICA_COUNT> with the replica count needed for Core APISIX deployment, starting from 0 to (replica count-1).

      For example: 
      
      If component pack namespace is "connections" and replica count needed for Core APISIX deployment is 3 (which is default value), then create following set of subfolders

      ```
      mkdir -p /pv-connections/connections-apisix-etcd-0
      mkdir -p /pv-connections/connections-apisix-etcd-1
      mkdir -p /pv-connections/connections-apisix-etcd-2
      ```

3. Make the additional etcd volumes available via NFS.

4. Modify the file `/etc/exports` on your NFS Server to include these volumes
      ```
      /pv-connections/<NAMESPACE>-etcd-<REPLICA_COUNT> <IP_RANGE_OF_YOUR_SERVERS>/<SUBNET_MASK>(rw,root_squash)
      ```
      For example:
      ```
      /pv-connections/connections-apisix-etcd-0 192.0.2.1/255.255.0.0(rw,root_squash)
      /pv-connections/connections-apisix-etcd-1 192.0.2.1/255.255.0.0(rw,root_squash)
      /pv-connections/connections-apisix-etcd-2 192.0.2.1/255.255.0.0(rw,root_squash)
      ```

5. Apply new NFS storage to exports

      ```
      exportfs -ra
      ```

6. If applicable, make sure that the firewall configuration does not block access to NFS. Ensure your firewall configuration allows communication between the Kubernetes worker nodes and the NFS server.

7. Validate Additional PV Entries in `/etc/exports`

    **To Validate**

      1. **Verify New Entries:** On the NFS server, check the `/etc/exports` file to confirm that dedicated entries for the API Gateway Persistent Volumes (PVs) (particularly those for `apisix-etcd`) have been added.
      2. **Verify Export Options:** Ensure that the directory paths are correct and the export options (`rw`, `root_squash`, `network range`) are set to allow the Component Pack nodes to mount them.
   
      For example:

      The `/etc/exports` file on your NFS server should contain entries similar to the following, where 192.0.2.1/255.255.0.0 represents the network range of your Component Pack Kubernetes worker nodes:

      ```sh
      cat /etc/exports
      /pv-connections/connections-apisix-etcd-0 192.0.2.1/255.255.0.0(rw,root_squash)
      /pv-connections/connections-apisix-etcd-1 192.0.2.1/255.255.0.0(rw,root_squash)
      /pv-connections/connections-apisix-etcd-2 192.0.2.1/255.255.0.0(rw,root_squash)
      ```

## Uninstall charts before upgrading to Kubernetes v1.25 {#uninstall_charts_k8s125 .section}

As PodSecurityPolicy was deprecated in Kubernetes v1.21, and removed from Kubernetes in v1.25, the following charts should be uninstalled before upgrading to Kubernetes v1.25:

```
k8s-psp
infrastructure
opensearch-master
opensearch-data
opensearch-client
kudos-boards-cp
```

First, check if the chart is already deployed:

```helm ls --namespace connections | grep <chart name> | grep -i DEPLOYED```

If found, delete the chart using below command:

```helm uninstall <chart name> --namespace connections```

For more details, see [PodSecurityPolicy is removed](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.25.md#podsecuritypolicy-is-removed-pod-security-admission-graduates-to-stable) in the Kubernetes changelog.

## Log in to a Harbor OCI registry {#harbor_repo .section}

!!! note

    For security reasons, CLI tokens generated through Harbor's OIDC integration are configured to expire after 30 days. To continue using CLI functionality after token expiration, you need to log out and log back in to Harbor through your OIDC provider to obtain a new token. This ensures continued secure access to Harbor services.

1. Log in to a Harbor OCI registry using the following command:

      ```$ helm registry login -u <<helm_repo_username>> -p <<helm_repo_password>> <<helm_repo_path>>```

      Where:

      - `<<helm_repo_username>>` is the Harbor username
      - `<<helm_repo_password>>` is the CLI secret (to access, log in to Harbor, then click on your name > **User Profile** > CLI Secret)
      - `<<helm_repo_path>>` is the Harbor repository to log into, that is https://hclcr.io

2. Add Harbor credentials as Kubernetes secret.

      In addition to the helm repo created in the previous step, Component Pack expects a Kubernetes secret containing the HCL Harbor credentials (in earlier versions, these are Docker registry credentials) by the name of `myregkey`:

      1. If this is your first time switching the Docker registry to Harbor, you'll need to recreate the secret named `myregkey`.

         Start by deleting the credentials:

         ```kubectl delete secret myregkey -n connections```

      2. Add Harbor credentials as `myregkey` Kubernetes secret.

         The default for the `docker-server` parameter should be "hclcr.io", in order to point the installer to HCL Harbor for the containerd image downloads.

         ```kubectl create secret docker-registry myregkey -n connections --docker-server=hclcr.io/cnx --docker-username=<<helm_repo_username>> --docker-password <<helm_repo_password>>```

         Where:

         - `<<helm_repo_username>>` is the Harbor username
         - `<<helm_repo_password>>` is the CLI secret (to access, log in to Harbor, then click on your name > **User Profile** > CLI Secret)

## Apply Pod security restrictions at the namespace level {#psa_namespace .section}

**This step applies when installing on Kubernetes version 1.25.0 or higher:**

As PodSecurityPolicy was deprecated in Kubernetes v1.21, and removed from Kubernetes in v1.25, we are enforcing similar restrictions on Pods using Pod Security Admission. Kubernetes offers a built-in Pod Security admission controller to enforce the Pod Security Standards. We apply Pod security restrictions at the namespace level when pods are created using labels as below.

```bash
kubectl label --overwrite ns connections \
pod-security.kubernetes.io/enforce=baseline pod-security.kubernetes.io/enforce-version=latest \
pod-security.kubernetes.io/warn=baseline pod-security.kubernetes.io/warn-version=latest \
pod-security.kubernetes.io/audit=baseline pod-security.kubernetes.io/audit-version=latest
```

We are applying baseline Pod Security Standards, which prevents known privilege escalations. It allows the default (minimally specified) Pod configuration.

For more details, see [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/) and [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) in the Kubernetes documentation.

!!! important

      If installing on Kubernetes version 1.25 or above is not feasible, then install/upgrade the k8s-psp Helm chart. 

Perform the following steps to install or upgrade the k8s-psp Helm chart:

1. Start by finding out the k8s-psp chart version available on Harbor OCI:

      ```helm show all <<oci_registry_url>>/k8s-psp --devel | grep "^version:"```

    Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

      ```o/p version: 0.1.0-20210909-112534```

2. Then install or upgrade:

      ```helm upgrade k8s-psp <<oci_registry_url>>/k8s-psp -i --version 0.1.0-20210909-112534 --set namespace=connections --namespace connections --wait```

## Set up Helm charts {#setup_helm .section}

Install or upgrade to the latest CR version of Connections 8.0 Kubernetes by deploying the Helm charts delivered with the latest CR version of Component Pack 8.

The [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) includes a set of templates to override the default values to values that are appropriate to your environment. The resulting files are the ones used by the following Helm upgrade commands using the -f option.

For example, if you want the opensearch cluster name to be "opensearch-cluster", you need to change the following line from this:

```
clusterName:                {{ __opensearch_cluster_name }}
```

To this:

```
clusterName:                opensearch-cluster
```

For sample values of these variables, refer to the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/vars/main.yml).

!!! note

    - In your connections-env.yml, use "connections" for the `namespace` parameter (*__default_namespace*). In a high available Kubernetes environment, the `replicaCount` (*__replica_count*) is set to "3".

    - In your values .yml files, use `hclcr.io/cnx` as the value for `image.repository` (*__docker_registry_url*).

    - If you do not have all installation options from your Connections 7.0 environment at hand, you can run the following command to retrieve this information from the deployed charts:

         ```helm -n connections get values <chart_name>```

## Set up persistent volumes and persistent volume claims on NFS {#pv_pvc .section}

Make sure that the network configuration of your NFS environment is correct before configuring the Connections PVs.

1. Before installing the connections-volumes Helm chart to set up the persistence layer, delete the existing chart volumes:

      ```helm uninstall connections-volumes -n connections```

      It might take some time to delete the existing volumes.

2. If you have upgraded the existing Component Pack 7 charts instead of deleting them and starting with a fresh Component Pack 8 installation, perform this step. Otherwise, skip to the next step.

      This is because if you deleted all Component Pack 7 charts, the linked PVs and PVCs are properly removed and therefore do not need further action. However, if you upgraded the charts, you would need to manually touch those PVs and PVCs.

      First, check the status of PVCs:

      ```kubectl get pvc -n connections```

      If the Terminating status shows no progress, remove the persistent volume protection for all blocked elements to get them deleted:

      ```kubectl patch pvc -n connections -p '{"metadata":{"finalizers": []}}' --type=merge <NAME>```

      For example:

      ```kubectl patch pvc -n connections -p '{"metadata":{"finalizers": []}}' --type=merge es-pvc-es-data-7-0```

      If the `kubectl get pvc -n connections` command shows no more Terminating elements, proceed with installation below.

3. Install connections-volumes chart.

      Find out the connections-volumes chart version that is available on Harbor OCI:

      ```helm show all <<oci_registry_url>>/connections-persistent-storage-nfs --devel | grep "^version:"```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

      ```o/p version: 0.1.1-20220505-090030```
   
4. Download the j2 template for connections-volumes.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

    !!! note
    
        In connections-volumes.yml, use your destination **nfs.server** and **persistentVolumePath** as parameters, as defined in [Set up NFS](#section_e4p_jrp_tnb). 

5. Then, run installation:

    ``` helm upgrade connections-volumes <<oci_registry_url>>/connections-persistent-storage-nfs -i --version 0.1.1-20220505-090030 --namespace connections -f connections-volumes.yml --wait```

    !!! note
        
        In connections-volumes.yml, use your destination **nfs.server** and **persistentVolumePath** as parameters.

6. Verify that all PVCs are in "bound" state:

   ```kubectl get pvc -n connections```

For how to troubleshoot PV and PVC setup, see the [Troubleshooting Component Pack guide](https://opensource.hcltechsw.com/connections-doc/guide_me/how_to_guides/troubleshooting_cnx_cp.pdf) document.

## Set up storage class for HCL API Gateway {#setup_sc_apigw .section}

1. Download the j2 template for apisix-storage-class.yaml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/roles/hcl/apisix/volumes/templates/apisix-storage-class.yaml.j2) and update it to match your environment.

2. Rename the file to apisix-storage-class.yaml, then open it. Replace all variables in curly braces "{{ }}" with values that are appropriate to your cluster configuration.

3. For example:

      - Replace `__apisix_storage_class_name` with the `<<namespace>>-apisix-sc` or storage class name you want to use.
      - Replace `__apisix_storage_class_reclaim_policy` with `Retain` or [reclaim policy](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming) you want to use.
      - Sample Configuration:

      ```yaml
      apiVersion: storage.k8s.io/v1
      kind: StorageClass
      metadata:
      name: "connections-apisix-sc"
      provisioner: kubernetes.io/no-provisioner
      reclaimPolicy: "Retain"
      volumeBindingMode: Immediate
      ```

4. Run the following command to create the storage class:

      ```kubectl apply -f apisix-storage-class.yaml```

## Set up persistent volumes for HCL API Gateway {#setup_pv_apigw .section}

1. Download the j2 template for apisix-nfs-pvs.yaml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/roles/hcl/apisix/volumes/templates/apisix-nfs-pvs.yaml.j2) and update it to match your environment.

2. Rename the file to apisix-nfs-pvs.yaml, then open it. Replace all variables in curly braces "{{ }}" with values that are appropriate to your cluster configuration.

3. For example, if you're configuring etcd volumes for 3 replicas, you'll need to replace the variables with your actual values:

      - `pv_name`: The persistent volume name (e.g., `<<namespace>>-apisix-etcd`)
      - `item`: The replica number (0, 1, 2 as the replica count is 3)
      - `__apisix_storage_class_name`: Your storage class name (e.g., `<<namespace>>-apisix-sc`)
      - `__apisix_volume_storage_capacity`: Storage size (e.g., "10Gi")
      - `__apisix_volume_access_mode`: Access mode (e.g., "ReadWriteOnce")
      - `__apisix_storage_class_reclaim_policy`: Reclaim policy (e.g., "Retain")
      - `__persistentVolumePath`: Path on NFS server (e.g., "pv-connections")
      - `__nfsMasterAddress`: IP address of NFS server

4. Run the following command to create the persistent volumes:

      ```kubectl apply -f apisix-nfs-pvs.yaml```

      Sample configuration: 
      ```yaml
      apiVersion: v1
      kind: PersistentVolume
      metadata:
      name: "connections-apisix-etcd-0"
      labels:
      attachTo: connections-apisix-etcd
      spec:
      storageClassName: connections-apisix-sc
      capacity:
      storage: 10Gi
      accessModes:
      - ReadWriteOnce
      persistentVolumeReclaimPolicy: Retain
      volumeMode: Filesystem
      nfs:
      path: /pv-connections/connections-apisix-etcd-0
      server: 192.0.2.1
      ```

    !!! note
        Run the command once for each etcd replica after updating the file variables for that specific replica (for example, updating the `item` from `0` to `1`, and the corresponding `pv_name` and `__persistentVolumePath`).

5. Verify that all PVs are in "available" state:

      ```kubectl get pv```       

## Set up bootstrap charts {#bootstrap .section}

The bootstrap chart not only defines the network interoperability parameters but also creates secrets and certificates for various components, including Redis, OpenSearch, MongoDB and Ingress Controller.

During the bootstrap installation, secrets will be created / overwritten under the following conditions:

- The force_regenerate_all flag is set to true. This will force the regeneration of all component secrets and certificates created by the bootstrap repository.
- The specific component has **not** yet been deployed on the Kubernetes cluster.
- One of the following targeted flags is set to `true`, which forces regeneration of secrets for the corresponding component only:
    - `force_regenerate_ingress`: Regenerates `ingress-nginx` secrets and certificates even if they already exist.
    - `force_regenerate_mongo`: Regenerates `mongo` secrets and certificates even if they already exist.
    - `force_regenerate_opensearch`: Regenerates `opensearch` secrets and certificates even if they already exist.

    !!! note
        Starting with v8 CR11, `force_regenerate` has been renamed to `force_regenerate_all`.
        
        When `force_regenerate_all` is enabled, it takes precedence and will overwrite **all** secrets, regardless of the individual component flags.

- Once bootstrap has been upgraded, remove or set the `force_regenerate_x` flags to false to prevent the certificates from being continuously regenerated which may lead to unexpected behavior.

Depending on which certificates are regenerated, you may need to repeat specific configuration steps—for example, re-establishing SSL interoperability with OpenSearch as described in [Set up Metrics for OpenSearch](#metrics_os) and restarting the affected services.

1. Start by deleting the existing chart:

      ```helm uninstall bootstrap -n connections```

2. Find out the bootstrap chart version available on Harbor OCI:

      ```helm show all <<oci_registry_url>>/bootstrap --devel | grep "^version:"```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

      ```o/p version: 0.1.0-20220714-190047```

3. Download the j2 template for bootstrap.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

    !!! note
        Starting with v8 CR11, `user_provided_cert_SANs` must be specified in bootstrap.yml to set the Subject Alternative Name (SAN) in TLS certificates.  This should be a comma-separated string (eg. `'*.example.com,*.sub.example.com'`).

        If the environment is running WebSphere Application Server FP27 or later, ensure that the SAN entries meet the [certificates hostname verification requirements](https://www.ibm.com/support/pages/hostname-verification-websphere-application-server-traditional).  The list typically includes the `set_master_ip` hostname specified in bootstrap.yml and, if applicable, the load balancer hostname (e.g., HAProxy).  Alternatively, wildcard entries can be used.

        To comply with WebSphere certificate hostname verification, if the environment is upgraded from v8 CR10 or lower, the OpenSearch certificate must be regenerated.  Setting `force_regenerate_opensearch: true` in bootstrap.yml before upgrading will regenerate the certificates.  Be sure to re-establish SSL interoperability with OpenSearch and restart the related services afterwards.

    !!! note
        If the environment is upgraded from v8 CR10 or lower, set `force_regenerate_ingress: true` in bootstrap.yml upon the initial upgrade to generate the ingress controller certificate.  It can be disabled to prevent the certificates from being continuously regenerated which may lead to unexpected behavior.        


4. Run the bootstrap installation:

      ```helm upgrade bootstrap <<oci_registry_url>>/bootstrap -i --version 0.1.0-20220714-190047 --namespace connections -f bootstrap.yml --wait```

## Set up connections-env chart {#cnx_env .section}

The configmap for connections-env contains all the variables needed for the Customizer and Orient Me to function properly. Note that Customizer always points to the IBM HTTP Server directly, whereas Orient Me requests point to the front door proxy.

1. Find out the connections-env chart version that is available on Harbor OCI:

      ```
      helm show all <<oci_registry_url>>/connections-env --devel | grep "^version:"
      0.1.40-20220616-233100
      ```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

2. Download the j2 template for connections-env.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

    !!! note
        
        Use "true" as the value for `onPrem` (***___on_prem***).
        
3. Run the connections-env installation:

      ```helm upgrade connections-env <<oci_registry_url>>/connections-env -i --version 0.1.40-20220616-233100 --namespace connections -f connections-env.yml --wait```

## Delete ingresses {#del_ingress .section}

Remove ingresses before Component Pack deployment, otherwise the infrastructure will fail:

```kubectl delete ingress -n connections $(kubectl get ingress -n connections | awk '{print $1}' | grep -vE "NAME")```

## Delete legacy Mongo security check job and Redis resources {#del_legacy_redis .section}

If you are upgrading from v8 CR11 or below, delete the `check-and-update-mongo7-security` Kubernetes job before upgrading the infrastructure chart to avoid image conflicts.

```bash
kubectl delete job --namespace connections check-and-update-mongo7-security
```

It is also recommended to remove existing Redis resources before upgrading the infrastructure chart with Redis 7.  While the infrastructure chart is designed to clean up old resources, running the following `kubectl delete` commands beforehand helps ensure a smooth upgrade process.

```bash
kubectl delete sts,pdb,svc -n connections redis-server
kubectl delete deploy,pdb,svc -n connections redis-sentinel

(confirm the resources are deleted, it should return "<resource> not found"):
kubectl get sts,pdb,svc -n connections redis-server
kubectl get deploy,pdb,svc -n connections redis-sentinel
```

## Install MongoDB 7 {#inst_mongo7 .section}

!!! note 

    If you are upgrading from v8 CR11 or below, please see the [Delete legacy Mongo security check job and Redis resources](#del_legacy_redis) step before upgrading the infrastructure chart.
    

Perform the steps in [Installing MongoDB 7 for Component Pack 8](installing_mongodb_7_for_component_pack_8.md).

## Set up infrastructure charts {#infra_chart .section}

The infrastructure charts are installed during MongoDB 7 installation \(see previous step\).

If this step fails, and if all pods don't come up, there is no point proceeding until this is fixed. To troubleshoot the Component Pack installation, check out the [Troubleshooting Component Pack](https://opensource.hcltechsw.com/connections-doc/guide_me/how_to_guides/troubleshooting_cnx_cp.pdf) document.

Make sure to set up the rules to your httpd.conf on your IBM HTTP servers – see [Configuring the HTTP server](cp_config_proxy_rules.md).

## Set up Customizer {#section_n3c_xhj_dvb .section}

1. Delete existing Customizer chart:

      ```
      helm uninstall mw-proxy -n connections
      ```

2. Get the mw-proxy chart version that is available on Harbor OCI:

      ```bash
      helm show all <<oci_registry_url>>/mw-proxy --devel | grep "^version:"
      o/p version: 0.1.0-20220414-134118
      ```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

3. Download the j2 template for customizer.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

4. Install chart:

      ```bash
      helm upgrade mw-proxy <<oci_registry_url>>/mw-proxy -i --version 0.1.0-20220414-134118 --namespace connections -f customizer.yml --wait
      ```

5. Set up your reverse proxy to forward some traffic to the customizer – see [Configuring the HTTP server](cp_config_proxy_rules.md).

Learn more about configuring Customizer in [Configuring the Customizer component](cp_config_customizer_intro.md).

## Migrate MongoDB data {#migrate_mongo5 .section}

Perform the steps in [Migrating data from MongoDB 5 to 7](migrating_data_mongodb_v5_v7.md), then start the Connections server back up to continue the upgrade.

## Set up OpenSearch {#os_chart .section}

With Connections 8, OpenSearch replaces Elasticsearch 7 as the default backend for Metrics, OrientMe, and Search.

Installing the OpenSearch chart creates an additional secret – use the default secret from the bootstrap installation instead. See [Set up bootstrap charts](#bootstrap).

!!! note
    
    OpenSearch, because of the way it is set up starting with version 8, will not work if bootstrap didn't create its secrets and certificates beforehand.

### Prerequisites

1. For production workloads, refer to [important settings](https://opensearch.org/docs/1.3/opensearch/install/important-settings/) in the OpenSearch official documentation. Make sure Linux setting vm.max_map_count is set accordingly.

      OpenSearch uses a lot of file descriptors or file handles. Running out of file descriptors can be disastrous and will most probably lead to data loss. Make sure to increase the limit on the number of open file descriptors for the user running OpenSearch to 65,536 or higher.

      OpenSearch also needs a larger virtual address space to work properly. More then is usually configured on Linux distributions.

      To increase these values to working levels, add the following lines to `/etc/sysctl.d/opensearch.conf`, creating the file on all Kubernetes hosts, if necessary:

      ```vm.max_map_count=262144```

      Then run `sudo sysctl -p` to reload configurations. If possible, restart the host machines.

2. Review the official Elasticsearch documentation on [quorum-based election protocol](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-discovery-quorums.html) and [master-eligible nodes](https://www.elastic.co/guide/en/elasticsearch/reference/current/add-elasticsearch-nodes.html#add-elasticsearch-nodes-master-eligible) before determining the number of master-eligible nodes for your cluster.

### Procedure

1. Get the OpenSearch chart version that is available on Harbor OCI:

      ```bash
      helm show all <<oci_registry_url>>/opensearch --devel | grep "^version:"
      o/p version: 1.3.0-20220520-092636
      ```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

2. Download the j2 templates for opensearch\_master.yml, opensearch\_data.yml, and opensearch\_client.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

3. Before you start deploying opensearch chart, we recommend that you override the default password provided in the script. You can provide this user-defined password by adding or updating the following variable in the opensearch\_master.yml, opensearch\_data.yml, and opensearch\_client.yml files:

      `pemkeyPass: PROVIDE-ANY-USER-DEFINED-PASSWORD`

4. Install OpenSearch master:

      ```bash
      helm upgrade opensearch-master <<oci_registry_url>>/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_master.yml --wait --timeout 10m
      ```

5. Install OpenSearch data:

      ```bash
      helm upgrade opensearch-data <<oci_registry_url>>/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_data.yml --wait --timeout 10m
      ```
6. Install OpenSearch client:

      ```bash
      helm upgrade opensearch-client <<oci_registry_url>>/opensearch -i --version 1.3.0-20220520-092636 --namespace connections -f opensearch_client.yml --wait --timeout 10m
      ```

7. Check if the OpenSearch master, data, and client pods are up and running:

      ```kubectl get pods -n connections | grep -i "opensearch-cluster-"```

8. This step is optional. Refer to the [Voting configuration exclusions API](https://www.elastic.co/guide/en/elasticsearch/reference/current/voting-config-exclusions.html).

      The default setting for this chart is to install three master nodes. If you wish to reduce this to just one master node during deployment, you can achieve that by utilizing the "voting_config_exclusions" API. This API reduces the voting configuration to include fewer than three nodes or remove more than half of the master-eligible nodes in the cluster at once by manually removing departing nodes from the voting configuration. For each specified node, the API will add an entry to the cluster's voting configuration exclusions list. It then waits until the cluster has reconfigured its voting configuration to exclude the specified nodes. For example, add nodes 'opensearch-cluster-master-1','opensearch-cluster-master-2' to the voting configuration exclusions list:

      ```bash
      kubectl exec opensearch-cluster-master-0 -n connections -- bash -c "/usr/share/opensearch/probe/sendRequest.sh POST /_cluster/voting_config_exclusions?node_names=opensearch-cluster-master-1,opensearch-cluster-master-2"
      ```

      If your cluster needs to reverse the voting configuration exclusions for nodes that you no longer needed, you can do so by using the DELETE voting_config_exclusions API as below:

      ```bash
      kubectl exec opensearch-cluster-master-0 -n connections -- bash -c "/usr/share/opensearch/probe/sendRequest.sh DELETE /_cluster/voting_config_exclusions?wait_for_removal=false"
      ```

9. This step is optional. To prevent potential resource exhaustion from a growing volume of security audit logs, it is recommended to implement an Index State Management (ISM) retention policy to manage the lifecycle of audit log indices by deleting old data after a specified period, ensuring the cluster maintains optimal performance and avoids shard exhaustion.  For instructions on how to set it up, refer to the [OpenSearch ISM API](https://docs.opensearch.org/2.19/im-plugin/ism/api/) and [Policy](https://docs.opensearch.org/2.19/im-plugin/ism/policies) documentation.

## Migrate ElasticSearch data {#migrate_es .section}

Perform the steps in [Migrating data from Elasticsearch 7 to OpenSearch](cp_migrate_data_from_es7_to_opensearch.md).

## Set up Orient Me for OpenSearch {#orientme_os .section}

Starting with Connections 8.0, the only backend for Orient Me is OpenSearch, so you need to update orientme and switch from Elasticsearch 7 to OpenSearch.

### Prerequisites

- Infrastructure charts need to be already installed and all pods scheduled.
- connections-env configmap needs to be already present.
- OpenSearch needs to be installed and running.
- After you install Orient Me, you need to run Profiles migration. In this step, we are migrating users from PeopleDB to MongoDB, which is used by Orient Me.
- You need to set rewrite rules in httpd.conf on your IBM HTTP Server to enable sending requests to it from Connections.

### Procedure

1. Get the orientme chart version that is available on Harbor OCI:

      ```bash
      helm show all <<oci_registry_url>>/orientme --devel | grep "^version:"
      o/p version: 0.1.0-20220617-050009
      ```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

2. Download the j2 template for orientme.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars), then update these settings:

      - `orient-indexing-service.indexing.opensearch=true` and `orient-indexing-service.indexing.elasticsearch=false`
      - `orient-retrieval-service.Retrieval.Opensearch=true` and `orient-retrieval-service.Retrieval.elasticsearch=false`

3. Install chart:

      ```bash
      helm upgrade orientme <<oci_registry_url>>/orientme -i --version 0.1.0-20220617-050009 --namespace connections -f orientme.yml  --wait
      ```

4. Wait for all these parts to become ready:

      ```bash
      kubectl get pods -n connections | grep -iE "orient|itm-services|community-suggestions|middleware-graphql|people-idmapping|people-migrate|people-relation|people-scoring|userprefs-service"
      ```

5. If you are upgrading to the latest CR version of Connections 8.0, perform these additional steps:

      1. Check if the Home page works fine from your browser by navigating to the /homepage URL.

         If the page displays an error, delete the orient-web-client pods using the following command:

         ```bash
         kubectl -n connections delete pod $(kubectl get pods -n connections | grep orient-web | awk '{print $1}')
         ```

         After the pods have been recreated, check the Home page from your browser again.

      2. Remove Elasticsearch 7 artifacts from your system:

         ``helm uninstall -n connections elasticsearch7``

6. To migrate profiles, run this:

      ```bash
      kubectl exec -n connections -it $(kubectl get pods -n connections | grep people-migrate | awk '{print $1}') -- sh -c "npm run start migrate"
      ```

      If you followed examples and the order of installation, this should work out of the box. If you want to do some customizations, or if you are later changing the database, you can open an interactive terminal session inside the people-migrate pod to see the configuration that was precreated for you during the installation/upgrade of Component Pack in /usr/src/app/migrationConfig.

7. Set the rewrite rules to the httpd.conf on your IBM HTTP Server – see [Configuring the HTTP server](cp_config_proxy_rules.md).

Learn more about configuring Orient Me in [Configuring the Orient Me component](cp_config_om_intro.md).

## Set up Metrics for OpenSearch {#metrics_os .section}

### Prerequisites

Component Pack for the latest CR version of HCL Connections 8.0 comes with OpenSearch enabled by default – this is the only backend for Metrics starting from Connections 8.0. If you are upgrading from Connections 7.0, you need to update Metrics and switch from the Elasticsearch 7 service in your Component Pack 7 deployment, to OpenSearch for the latest CR version of Component Pack 8.

If you are on HCL Connections 6.5.0.1 or earlier, and using ElasticSearch 5, there are two options:

- If you don't need to migrate data, you can use the preceding links to configure the Metrics component to use the newly installed OpenSearch.
- Migrate to Elasticsearch 7 first, then migrate to OpenSearch.

Before configuring Metrics, make sure that your WebSphere Application servers are up and running.

### Procedure

1. To ensure a secure connection, retrieve the PKCS12 and CA Signer certificates by running the following commands on the Component Pack master node:

      ```mkdir -p /tmp/es_certs```

      ```bash
      kubectl get secret opensearch-secret -n connections -o=jsonpath="{.data['chain-ca\.pem']}" | base64 -d > "/tmp/es_certs"/chain-ca.pem
      ```

      ```bash
      kubectl get secret opensearch-secret -n connections -o=jsonpath="{.data['opensearch-metrics\.p12']}" | base64 -d > "/tmp/es_certs"/opensearch-metrics.p12
      ```

2. Temporarily remove SSL settings that were configured for type-ahead search in your Connections deployment, so that you can successfully enable Metrics. When you configure Metrics, the SSL settings will be recreated and both features will share the certificate information.

      1. Log in to the WebSphere Integrated Solutions Console for the type-ahead search cluster.

      2. Click **Security** \> **SSL certificate and key management** \> **Dynamic outbound endpoint SSL configurations** and, for each cluster member, delete any endpoints starting with **SSLToES and SearchToES**.

      3. Click **Security** \> **SSL certificate and key management** \> **SSL configurations**, and delete the **ESCloudSSLSettings**and **ESSearchSSLSettings** configuration.

      4. Click **Security** \> **SSL certificate and key management** \> **Key stores and certificates** and delete the **ESCloudKeyStore** and **ESSearchKeyStore** configuration.

3. Copy the certificate files to the WebSphere Deployment Manager in a common location that is readable and writable by all WebSphere Application Server nodes.

      For example, copy the two certificate files created in step 1 \(that is, **/tmp/es\_certs/chain-ca.pem** and **/tmp/es\_certs/elasticsearch-metrics.p12**\) to the following directory: **/opt/IBM/es\_certs** on the WebSphere Deployment Manager.

      If this directory path does not yet exist, create it.

4. Configure OpenSearch metrics within Connections:

      1. On the WebSphere Deployment Manager, open wsadmin, making sure that you use the `-lang jython` option. For example, on Linux, run the following commands to open wsadmin:
      
           ``cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin sudo sh wsadmin.sh -lang jython -user wasadmin_user -password wasadmin_password``

      2. Merge the Signer certificate into the opensearch-metrics.p12 keystore:
      
        ```execfile('esSecurityAdmin.py') enableSslForMetrics('KEYSTORE_FULL_PATH', 'OpenSearch_CA_PASSWORD', 'SIGNER_CA_FULL_PATH', 'OpenSearch_HTTPS_PORT')```
            
         Where:

         - `KEYSTORE\_FULL\_PATH`: See the following example.
         - `SIGNER\_CA\_FULL\_PATH`: See the following example.
         - `OpenSearch\_CA\_PASSWORD`: The password that was set while [setting up bootstrap charts](#bootstrap).
         - `OpenSearch\_HTTPS\_PORT`: Find the port by running following command on the Component Pack System:

         ``kubectl get svc opensearch-cluster-master --namespace=connections -o jsonpath={.spec.ports[*].nodePort}``

         For example:

          ``execfile('esSecurityAdmin.py') enableSslForMetrics('/opt/IBM/es_certs/opensearch-metrics.p12', 'password', '/opt/IBM/es_certs/chain-ca.pem', '30099')``
            
         Disconnect from the wsadmin environment with **quit**.

      3. Copy the updated opensearch-metrics.p12 file from the Deployment Manager to the same location on the WebSphere Application Server nodes.

      4. Synchronize the nodes and then restart the servers or clusters that are running the Search and common applications \(including the Deployment Manager and nodes\).

      5. Enable or switch to OpenSearch Metrics. The following script causes the RDBMS-based app to stop capturing data, and the OpenSearch component to start capturing it.

         1. On the WebSphere Deployment Manager, open wsadmin, making sure that you use the `-lang jython` option. For example, on Linux, run the following commands to open wsadmin:

            ```bash
            cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
            sudo sh wsadmin.sh -lang jython -user wasadmin_user -password wasadmin_password
            ```

         2. Switch users to the OpenSearch Metrics component:

            ```bash
            execfile('metricsEventCapture.py')
            switchMetricsToElasticSearch()
            ```

5. Manage the Elasticsearch index for Connections type-ahead search. The type-ahead search feature uses an index named “quickresults” within the OpenSearch search engine.

      1. On the WebSphere Deployment Manager, open wsadmin, making sure that you use the `-lang jython` option. For example, on Linux, run the following commands to open wsadmin:

          ``cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin sudo sh wsadmin.sh -lang jython -user wasadmin_user -password wasadmin_password``
            

      2. Merge the Signer certificate into the opensearch-metrics.p12 keystore:
      
        ```execfile('esSearchAdmin.py') enableSslForESSearc('KEYSTORE_FULL_PATH', 'OpenSearch_CA_PASSWORD', 'SIGNER_CA_FULL_PATH', 'OpenSearch_HTTPS_PORT')```
         
         Where:

         - `KEYSTORE_FULL_PATH`: See the following example.
         - `SIGNER_CA_FULL_PATH`: See the following example.
         - `OpenSearch_CA_PASSWORD`: The password that was set while [setting up bootstrap charts](#bootstrap).
         - `OpenSearch_HTTPS_PORT`: Find the port by running following command on the Component Pack System:

            ```bash
            kubectl get svc opensearch-cluster-master --namespace=connections -o jsonpath={.spec.ports[*].nodePort}
            ```

         For example:
         
         ``execfile('esSearchAdmin.py') enableSslForESSearch('/opt/IBM/es_certs/opensearch-metrics.p12','password', '/opt/IBM/es_certs/chain-ca.pem', '30099')``

         Disconnect from the wsadmin environment with **quit**.

      3. Copy the updated opensearch-metrics.p12 file from the Deployment Manager to the same location on the WebSphere Application Server nodes.
   
      4. Download config\_blue\_metrics.py from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/files/config_blue_metrics.py). This script sets the OpenSearch server base URL in Metrics.

      5. Run the following script on the Connections Component Pack system. This will set highway settings for Connections to connect to OpenSearch:
      
        ```/usr/bin/python3 config_blue_metrics.py --skipSslCertCheck true --pinkhost <<hostname>> --namespace connections```

         Where:

         - `--skipSslCertCheck`: Set to true. Use on systems that use self-signed SSL certificates.
         - `--pinkhost`: Set to the fully qualified domain name \(FQDN\) of the Kubernetes master. This would be the fronting Kubernetes master load balancer or virtual IP in a HA environment.
         - `--namespace`: Set to `connections`
      
            !!! note
                
                If Connections is configured to force traffic to use TLS 1.3, Python 3.7 or later is required to be the default for Python3

      6. Connect to wsadmin and initialize Search Administration before running the actual wsadmin command.

         Open wsadmin and start the Search service by running the following commands. On Linux, for example, run:
         
         ``cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin./wsadmin.sh -lang jython -user User_name -password Password execfile('searchAdmin.py')``
         
         ``SearchService.createES7QuickResultsIndex()``


         For information on running SearchService commands, see [SearchService commands](../admin/r_admin_searchservice_commands.md).

      7. Update the LotusConnections-config.xml file in the Deployment Manager profile configuration folder. Add the following statement to the `<properties>` section of the file:

         ``<genericProperty name="quickResultsEnabled">true</genericProperty>``

      8. Update the search-config.xml file in the Deployment Manager profile configuration folder. Add the following statements to the `<propertySettings>`:

         ```bash
         <property name="quickResults">
            <propertyField name="quick.results.elasticsearch.indexing.enabled" value="true"/>
            <propertyField name="quick.results.solr.indexing.enabled" value="false"/>
            <propertyField name="quick.results.use.solr.for.queries'\" value="false"/>
            <propertyField name="quick.results.elasticsearch7.writing.enabled" value="true"/>
            <propertyField name="quick.results.elasticsearch7.reading.enabled" value="true"/>
         </property>
         ```

      9. Synchronize the nodes and then restart the servers or clusters that are running the Search and common applications \(including the Deployment Manager and nodes\).

6. To validate your OpenSearch and Metrics integration after system is up and running again, open a browser window and authenticate with a user account that has appropriate rights for Metrics. Navigate to the **/metrics** URL.

**Configuring Metrics**

For optional procedures to configure Metrics, see [Configuring the OpenSearch Metrics component](cp_config_os_intro.md).

## Set up community ingress {#comm_ingress .section}

1. If not already added, add the community Helm repository:

      ```
      helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
      ```

2. Update the ingress-nginx Helm repository:
      ```helm repo update ingress-nginx```

3. Install ingress-nginx:

      ```bash
      helm upgrade cnx-ingress -i ingress-nginx/ingress-nginx --namespace connections --set controller.service.type=NodePort,controller.service.nodePorts.http=32080,controller.service.nodePorts.https=32443,defaultBackend.enabled=true,controller.healthStatus=true,controller.healthCheckPath="/healthz",controller.livenessProbe.timeoutSeconds=60,controller.readinessProbe.timeoutSeconds=60 --set controller.extraArgs.default-ssl-certificate=connections/ingress-nginx-tls-secret --wait
      ```

      Where `default-ssl-certificate` is `<namespace>/<TLS secret name>`.  By default it is `connections/ingress-nginx-tls-secret`.
            
!!! note
      Starting with v8 CR11, bootstrap automatically generates a self-signed certificate for ingress-nginx in secret `ingress-nginx-tls-secret`.

## Set up Microsoft Teams integration {#teams_integ .section}

The Microsoft Teams integration microservices rely on a configmap \(integrations-msteams-env\) and secret \(ms-teams-secret\) that are part of the overall connections-env deployment. Three specific pieces of information are required which should have been created and noted while performing the steps in [Configuring an Azure app to support the Microsoft Teams app](../../connectors/admin/t_ms_teams_config_azure_app.md).

The items of information needed for this setup are:

- Teams tenant ID
- Bot \(app\) ID
- Bot \(app\) password \(secret\)

With this information, if the values were not provided when installing the [connections-env](cp_install_services_tasks.md#cnx_env) chart, update the connections-env.yml configuration override file and reinstall the chart.

Once the configmap and secret are configured, continue to install the microservices that rely on them for configuration.

1. Get the Teams chart version that is available on Harbor OCI:

      ```bash
      helm show all <<oci_registry_url>>/teams --devel | grep "^version:"
      o/p version: 1.0.0-20220818-170013
      ```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

2. Download the j2 template for teams.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

3. Install the chart:

      ```bash
      helm upgrade teams <<oci_registry_url>>/teams -i --version 1.0.0-20220818-170013 --namespace connections -f teams.yml --wait
      ```

Once the microservices are installed and running, set up rules in httpd.conf on the IBM HTTP Server – see [Configuring the HTTP server](cp_config_proxy_rules.md).

The proxy pass statements map URI to the ingress controller service to route requests to the appropriate Microsoft Teams-related micro-services. Given tightening security of more recent versions of browser, especially Chrome \(or Chromium-based browsers\) and the use of embedded iFrames by Microsoft Teams, passing cookies correctly between the environments requires the SameSite=None and Secure property.

For more information about the SameSite property,  see:

- [Browser changes to SameSite cookie handling and WebSphere Application Server](https://www.ibm.com/support/pages/browser-changes-samesite-cookie-handling-and-websphere-application-server)
- [Cookies: HTTP State Management Mechanism \(RFC6265-bis\)](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)

Lastly, and again for security reasons, you must change the x-frame-options header to support the way that Microsoft Teams uses an iFrame to embed application content in the tabbed pages. Since Connections also uses an iFrame to display embedded experiences content, this becomes an iFrame within an iFrame. The embedded experiences content cannot be displayed if SAMEORIGIN is used because the Teams UI and Embedded Experiences content do not share a common origin host.

To enable Microsoft Teams integration, see [Setting up the Connections app for the Microsoft Teams client](../../connectors/admin/t_ms_teams_set_up_conn_app_for_ms.md).

## Set up Tailored Experience features for communities {#comm_tailored .section}

1. Get the Tailored Experience chart version that is available on Harbor OCI:

      ```bash
      helm show all <<oci_registry_url>>/tailored-exp  --devel | grep "^version:" 
      o/p version: 1.0.0-20220818-170013
      ```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

2. Download the j2 template for tailoredexperience.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

3. Install the chart:

      ```bash
      helm upgrade tailored-exp <<oci_registry_url>>/tailored-exp -i --version 1.0.0-20220818-170013 --namespace connections -f tailoredexperience.yml --wait
      ```

4. Once this is all set, set up rules in the httpd.conf on the IBM HTTP servers – see [Configuring the HTTP server](cp_config_proxy_rules.md).

For post-installation tasks required to deploy the community creation wizard and templates, see [Configuring the community creation wizard](t_configure_community_wizard.md) and [Assigning administrators to template management roles](../admin/t_admin_comm_templates_assign_admins.md).

## Configure the LotusConnections-config.xml {#lotusxml .section}

1. Start the wsadmin command. Refer to [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md).
2. Load the IBM Connections configuration file:

      ```execfile("connectionsConfig.py")```

      If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

3. Check out the IBM Connections configuration files:

      ```LCConfigService.checkOutConfig("working_directory","cell_name")```

      Where:

      - `working_directory` is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.
      - `cell_name` is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client:

            `print AdminControl.getCell()`
      


        !!! note
          
            When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example, `C:/temp`. On Linux, the directory must grant write 

        
4. Open the checked-out LotusConnectionsConfig.xml file in an XML editor of your choice and add the property componentPackInstalled to the <properties\> </properties\> tag as shown below:

      ```bash
      <properties>
         <genericProperty name="ignore.lang.param">true</genericProperty>
         <genericProperty name="elasticsearch.eSmajorVersion">7</genericProperty>
         <genericProperty name="people.typeahead">enabled</genericProperty>
         <genericProperty name="lconn.core.WidgetPlacement.communities.useCRE">true</genericProperty>
         <genericProperty name="componentPackInstalled"\>true</genericProperty\>
         <genericProperty name="lconn.core.WidgetPlacement.profiles.useCRE">true</genericProperty>
      </properties>
      ```

5. Save and check in the LotusConnections-config.xml file:

      ```LCConfigService.checkInConfig()```

      The file is validated, and you are notified if an error is found.

6. To exit the wsadmin client, type `exit` at the prompt.

7. Deploy the changes by doing a **Fully Resynchronize** of the nodes on WebSphere Admin Console ([https://](https://%3chost_name%3e:9043/ibm/console)\).

8. Stop and restart the servers that host the IBM Connections applications.

## Set up Activities Plus {#activities_plus .section}

### Prerequisites

- Get a free license from the store.huddo.com
- Register it with Connections as described in [Registering an OAuth application with a provider](cp_3p_config_ap_oauth.md) in the Integrating Activities Plus section.

### Procedure

For steps to set up Activities Plus, refer to [Installing Activities Plus services](cp_3p_install_ap_services.md).

To move existing activities to Activities Plus, see [Migrating Activities data](cp_3p_migrate_activities_data.md)

You can find out more about Activities Plus in [Integrating with Activities Plus](cp_3p_integrate_intro.md).

## Set up Connections add-in for Microsoft Outlook {#ms_outlook_addin .section}

### Prerequisites

- Verify that [Connections Outlook Add-in system requirements](../../connectors/admin/c_outlook_connector_addin_sys_req.md) are met.
- [Register the Outlook Add-in OAuth application provider with Connections](cp_3p_outlook_addin_oauth.md).

### Procedure

1. Delete the existing connections-outlook-desktop chart:

      ```helm uninstall connections-outlook-desktop -n connections```

2. Get the connections-outlook-desktop chart version that is available on Harbor OCI:

      ```bash
      helm show all <<oci_registry_url>>/connections-outlook-desktop --devel | grep "^version:" 
      o/p version: 0.1.0-20220707-082629
      ```

      Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the following steps.

3. Download the j2 template outlook-addin.yml from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

4. Update the add-in Docker environment variables, which are located in the outlook-addin.yaml file. These are passed into the Outlook add-in Docker instance on startup:

      - What must be overriden:
         - `CONNECTIONS_URL` - URL of your Connections environment without a trailing slash \(for example [https://my.connections.server.com\](https://my.connections.server.com%5C)). The same URL has to be used when generating secret in the first step.
         - `CONNECTIONS_CLIENT_SECRET` - Client secret generated by Connections when registering OAuth provider in the first step.
         - `CONNECTIONS_CLIENT_ID` - Client ID \(aka. app ID\) used when registering OAuth provider in Connections in the first step \(default: hcl-cnx-office-addin\)

      - What may be overriden:
         - `CONTEXT_ROOT` - The path to where the Outlook add-in is being served, relative to the `CONNECTIONS_URL`. Do NOT start or end with `/.` (default: outlook-addin)
         - `SUPPORT_URL` - URL that a user can go to for support \(help\). \(default: [https://opensource.hcltechsw.com/connections-doc/connectors/enduser/c_ms_plugins_add_in_outlook.html\](https://opensource.hcltechsw.com/connections-doc/connectors/enduser/c_ms_plugins_add_in_outlook.html%5C))
         - `CONNECTIONS_NAME` – A custom name for the add-in. \(default: 'HCL Connections'\)
         - `EWS_HOSTNAME` – The hostname for Exchange Web Services. (default: 'outlook.office365.com')

      - Take care about ingresses listed there. You should point to both frontend domain and internal domains, if both are used. Otherwise, only point to the one that is used in your case.

5. Install chart:

      ```bash
      helm upgrade connections-outlook-desktop <<oci_registry_url>>/connections-outlook-desktop -i --version 0.1.0-20220707-082629 --namespace connections -f outlook-addin.yml --wait
      ```

6. Once this is all set, add rules to httpd.conf for your IBM HTTP servers – see [Configuring the HTTP server](cp_config_proxy_rules.md).

To enable the Connections add-in for Microsoft Outlook, see [Making the Connections Add-in for Outlook available to users](cp_3p_outlook_make_available_to_users.md).

- **[Installing MongoDB 7 for Component Pack 8](../install/installing_mongodb_7_for_component_pack_8.md)**
  Install MongoDB 7 for the latest CR version of Component Pack 8.
- **[Migrating data from MongoDB 5 to 7](../install/migrating_data_mongodb_v5_v7.md)**
  Back up, migrate and validate your MongoDB databases.
- **[Migrating data from Elasticsearch 7 to OpenSearch](../install/cp_migrate_data_from_es7_to_opensearch.md)**
  To preserve the Metrics, Orient Me, and Recent History data stored in Elasticsearch 7 for your Connections 7 deployment, you must migrate that data to the OpenSearch service provided with Component Pack for the latest CR version of Connections 8.0.

## Install HCL API Gateway on Component Pack {#hcl_api_gateway .section}

Perform the steps in [Installing HCL API Gateway on Component Pack](installing_hcl_api_gateway_for_component_pack.md).


**Parent topic:** [Installation and upgrade](../install/cp_install_upgrade_container.md)
