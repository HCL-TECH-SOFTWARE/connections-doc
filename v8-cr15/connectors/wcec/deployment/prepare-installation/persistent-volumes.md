---
title: Persistent Volumes
tags:
    - Kubernetes
    - Persistent Volumes
    - NFS
    - StorageClass
    - CEC (WebEngine)
    - Helm
    - NFS configuration
    - PersistentVolumeClaims
---
# Persistent volumes

To run HCL Connections Engagement Center (WebEngine) deployments in your Kubernetes cluster, you need to provide `PersistentVolumes` (PVs) that can be claimed by the WebEngine pods. `PersistentVolumeClaims` (PVCs) created by the Helm Chart will bind to these available PVs.

!!! warning
    For HCL Connections environments, it is recommended to use **NFS-based Persistent Volumes**. These must be created **statically** (pre-provisioned) as Kubernetes dynamic provisioning for NFS is not typically used in this setup.
    
## Configure NFS server

This section details the steps to set up the NFS server to export the required directories for WebEngine's persistent storage.

### Creating directories and set permissions

Create the necessary directories on your NFS server. These will serve as mount points for the WebEngine customization and logs Persistent Volumes. Ensure correct permissions and ownership.

```sh
# Create directory for WebEngine customization data
mkdir -p /pv-connections/rwovol-web-engine-customization-0
chmod 0700 /pv-connections/rwovol-web-engine-customization-0
chown 1000:1000 /pv-connections/rwovol-web-engine-customization-0

# Create directory for WebEngine logs
mkdir -p /pv-connections/rwovol-web-engine-log-0
chmod 0700 /pv-connections/rwovol-web-engine-log-0
chown 1000:1000 /pv-connections/rwovol-web-engine-log-0
```

### Exporting file systems

1. Edit the `/etc/exports` file on your NFS server to define the directories that will be shared via NFS.

    ```sh
    sudo nano /etc/exports
    ```

2. Add entries for the `customization` and `logs` directories. Replace `<KUBERNETES_NODE_SUBNET_OR_IPS>` with the IP address(es) or subnet CIDR of your Kubernetes worker nodes (for example, 192.168.1.0/24 or specific node IPs).

    ```sh
    /pv-connections/rwovol-web-engine-customization-0       <KUBERNETES_NODE_SUBNET_OR_IPS>(rw,sync,no_subtree_check,root_squash)
    /pv-connections/rwovol-web-engine-log-0                 <KUBERNETES_NODE_SUBNET_OR_IPS>(rw,sync,no_subtree_check,root_squash)
    ```

3. Export the file systems to apply the changes:

    ```sh
    sudo exportfs -ra
    ```

4. Ensure the NFS server service is running and configured:

    ```sh
    sudo systemctl enable nfs-server
    sudo systemctl restart nfs-server
    ```

## Create storageclass and persistent volumes

After configuring your NFS server, you must create the necessary Kubernetes `StorageClass` and `PersistentVolume` resources.

### Creating storageclass

Create a `StorageClass` for NFS-based static provisioning. Save the following YAML to a file (for example, `cnx-cec-v2-storageclass.yaml`):

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: cnx-cec-v2-nfs-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Retain
```

Apply the StorageClass:

```sh
kubectl apply -f cnx-cec-v2-storageclass.yaml
```

### Creating persistent volumes

Create the required `PersistentVolume` resources for WebEngine customization and logs. Replace `<NFS_SERVER_IP>` with your NFS server's IP address.

Save the following YAML to a file (for example, `cnx-cec-v2-pvs.yaml`):

```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: rwovol-web-engine-customization-0
  labels:
    app: web-engine
    type: customization
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: cnx-cec-v2-nfs-storage
  nfs:
    server: <NFS_SERVER_IP>
    path: /pv-connections/rwovol-web-engine-customization-0
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: rwovol-web-engine-log-0
  labels:
    app: web-engine
    type: log
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: cnx-cec-v2-nfs-storage
  nfs:
    server: <NFS_SERVER_IP>
    path: /pv-connections/rwovol-web-engine-log-0
```

Apply the Persistent Volumes:

```sh
kubectl apply -f cnx-cec-v2-pvs.yaml
```

### Verifying persistent volumes

Ensure all Persistent Volumes are created and in an `Available` state before proceeding with the Helm deployment:

```sh
kubectl get pv
```

Expected output should show both PVs with status `Available`:

```
NAME                                 CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS             REASON   AGE
rwovol-web-engine-customization-0    10Gi       RWO            Retain           Available           cnx-cec-v2-nfs-storage                 10s
rwovol-web-engine-log-0              10Gi       RWO            Retain           Available           cnx-cec-v2-nfs-storage                 10s
```
