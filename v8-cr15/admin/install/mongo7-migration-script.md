# MongoDB 5 to MongoDB 7 Migration Guide

This guide provides a detailed process for migrating MongoDB from version 5 to version 7. It is designed for large-scale data migrations and includes compatibility adjustments, setup instructions, and scripts to ensure a smooth transition.


## Prerequisites

1. **Backup**: Ensure a complete backup of MongoDB 5 data on the NFS master node.
2. **Kubernetes Cluster**: Confirm that MongoDB 7 is installed and configured on the Kubernetes cluster.
3. **Internet Access for Bitnami Docker Images**: Ensure internet access is available to download the required Bitnami Docker images (for example, `docker.io/bitnami/mongodb:5.0`, `docker.io/bitnami/mongodb:6.0`, and `docker.io/bitnami/mongodb:7.0`).
   - If the environment has limited internet access, ensure appropriate access is opened to download these images.
   - Alternatively, pre-download the images in an accessible environment and transfer them to the target system.
4. **Maintenance Window**: Schedule a maintenance window to avoid data loss during migration.

!!! note
    
    Any containerization platform can be used instead of Docker, but the migration script must be adjusted to ensure compatibility with the chosen platform.


##  Migration Process

1. Document community templates (pre-migration check)

      In your MongoDB 5 environment, note any community templates created. After migration, these templates should appear in MongoDB 7 to confirm data integrity. Taking screenshots or recording details will help with verification post-migration.

2. Check MongoDB 7 pod status in Kubernetes

    Ensure that the MongoDB 7 pod is already deployed on your Kubernetes cluster before starting migration.

    ```bash
    # Check MongoDB 7 pod status
    kubectl -n connections get pod | grep mongo7
    ```

    !!! note
        All MongoDB migration operations described in this document are performed within the **connections** namespace. Please replace the hardcoded **connections** namespace with your desired namespace.

3. Scale down the MongoDB 7 StatefulSet

      1. Scale down the MongoDB 7 StatefulSet to 0 to prevent conflicts during migration.

         ```bash
         # Scale down MongoDB 7 StatefulSet
         kubectl scale sts mongo7 -n connections --replicas 0
         ```

      2. Verify pod termination status using:
      
         ```bash
         kubectl get pods -n connections | grep mongo7
         ```

      3. Proceed only when the pods are in the **Terminated** state or no longer listed.

4. Back up MongoDB Data on the NFS master node

      Create a backup of your MongoDB 5 data on the NFS master node. Select a data backup method that suits the volume of data in your environment. For example, you can back up data using a TAR file. After backing up the data, transfer it to a temporary location.

      ```bash
      sudo cd /pv-connections
      sudo tar czf $(date +%Y%m%d)-backup.tar.gz mongo5*
      ```

5. Move the MongoDB data folders

      1. Create the folder movement script. Open a text editor and save the following code into a file named `move_mongo_folders.sh`.

         ```bash
         #!/usr/bin/env bash
         # Script to move MongoDB data folders

         # Define source and target prefixes
         SOURCE_PREFIX="mongo5-node"
         TARGET_PREFIX="mongo7-node"

         # Iterate over each source folder and move it to the target, renaming if needed
         for source_folder in ${SOURCE_PREFIX}-*; do
         [ -d "$source_folder" ] || continue  # Skip if no matching folders are found
         target_folder="${TARGET_PREFIX}-${source_folder##*-}"
         [ -d "$target_folder" ] && mv "$target_folder" "${target_folder}-old"
         mv "$source_folder" "$target_folder"
         done
         ```

      2. Make the script executabl:

         ```bash
         sudo chmod u+x move_mongo_folders.sh
         ```

      3. Run the script to move data folders:

         ```bash
         sudo ./move_mongo_folders.sh
         ```

         This script moves the data from `mongo5-node-*` folders to `mongo7-node-*` folders, renaming any existing `mongo7-node-*` folders by appending `-old` to avoid conflicts.


6. Set up the NFS on a separate machine

      To migrate data using Docker on a separate machine, follow these steps to ensure that the environments can communicate with each other and set up NFS properly.

      1. Install NFS Packages. 
      
         Ensure that NFS packages are installed on both the NFS master (NFS_MASTER) and the separate machine (for example, `server1`). For instance, on CentOS 7, install `nfs-utils` and `cifs-utils`:

         ```bash
         sudo yum install -y nfs-utils cifs-utils
         ```

      2. Start the NFS Server.
      
         Start the NFS server on both the NFS master and the separate machine:

         ```bash
         sudo systemctl start nfs-server
         sudo systemctl status nfs-server
         ```

      3. Ensure the connectivity. 
      
         Verify that the environments can communicate with each other. Ensure firewalls, security groups, and any network configurations allow NFS traffic between the NFS master and server1. 

      4. Configure NFS exports on NFS master:
      
         1. Edit the /etc/exports file on the NFS master to specify the directories you want to share with the machine (server1) that will be used for the data migration:

            ```bash
            nano /etc/exports
            ```

         2. Add entries for the MongoDB 7 folders, replacing placeholders with your actual values:

            ```bash
            /pv-connections/mongo7-node-0/data/db SERVER1_IP(root_squash,anonuid=1001,rw)
            /pv-connections/mongo7-node-1/data/db SERVER1_IP(root_squash,anonuid=1001,rw)
            /pv-connections/mongo7-node-2/data/db SERVER1_IP(root_squash,anonuid=1001,rw)
            ```

         3. Replace:
            - `/pv-connections/mongo7-node-*/data/db` with the actual paths of the shared folders.
            - `SERVER1_IP` with the IP address of the target server (`server1`).

      5. Apply NFS Export Change.
      
         After modifying `/etc/exports`, restart the NFS server and apply the changes:

         ```bash
         sudo systemctl restart nfs-server
         sudo exportfs -a
         ```

      6. Mount Shared Folders on Target Server**:
      
         1. On the target machine (for exmaple, `server1`), create directories to mount the shared folders:

            ```bash
            sudo mkdir -p /mnt/mongo7-node-0/data/db
            sudo mkdir -p /mnt/mongo7-node-1/data/db
            sudo mkdir -p /mnt/mongo7-node-2/data/db
            ```

         2. Mount the shared folders from the NFS master to these directories:

            ```bash
            sudo mount NFS_MASTER_IP:/pv-connections/mongo7-node-0/data/db /mnt/mongo7-node-0/data/db
            sudo mount NFS_MASTER_IP:/pv-connections/mongo7-node-1/data/db /mnt/mongo7-node-1/data/db
            sudo mount NFS_MASTER_IP:/pv-connections/mongo7-node-2/data/db /mnt/mongo7-node-2/data/db
            ```

         3. Replace `NFS_MASTER_IP` with the IP address of the NFS master.

      7. Verify NFS Mount. 

         Confirm that the shared folders are properly mounted by listing their contents:

         ```bash
         sudo ls /mnt/mongo7-node-0/data/db
         sudo ls /mnt/mongo7-node-1/data/db
         sudo ls /mnt/mongo7-node-2/data/db
         ```

7. Create and run the `mongo_migration.sh` script

      This step needs to be executed on the system where the Docker environment is configured and the MongoDB data is accessible via NFS. If a dedicated migration server (e.g., server1) is being used, ensure Docker is properly installed and set up on that machine.

      1. Save the `mongo_migration.sh` script.
      
         Open a text editor and save the provided [mongo_migration.sh](https://github.com/HCL-TECH-SOFTWARE/connections-mongo7/blob/main/mongo_migration.sh) script into a file named `mongo_migration.sh`.  

      2. Make the script executable:

         ```bash
         sudo chmod u+x mongo_migration.sh
         ```

      3. Run the migration script:

         ```bash
         sudo ./mongo_migration.sh
         ```

         The script will start a temporary MongoDB container to retrieve replica set information, incrementally upgrade MongoDB versions, update the Feature Compatibility Version (FCV), and perform necessary configuration changes for MongoDB 7.

8. Scale up the MongoDB 7 StatefulSet

      1. Once migration is complete, scale up the MongoDB 7 StatefulSet to the desired replica count. For example:

         ```bash
         # Scale up MongoDB 7 StatefulSet
         kubectl scale sts mongo7 -n connections --replicas 1
         ```

      2. Connect to MongoDB Pod to Check Replica Set Status.
      
         1. To inspect the replica set status, connect to the MongoDB pod and execute the following command (adjust the hostname and pod name to match your deployment):
      
            ```sh
            kubectl exec -it mongo7-0 -c mongo7 -n connections -- mongosh --tls --tlsCertificateKeyFile /etc/mongodb/x509/user_admin.pem --tlsCAFile /etc/mongodb/x509/mongo-CA-cert.crt --host mongo7-0.mongo7.connections.svc.cluster.local --authenticationDatabase '$external' --authenticationMechanism MONGODB-X509 -u C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb --eval "rs.status()"
            ```
            This command will display the current state of all members in the replica set, helping diagnose any issues.

         2. If a member of the replica set remains in the `"stateStr": "RECOVERING"` state for an extended period and does not transition back to "SECONDARY" or "PRIMARY", you may need to restart the affected pod to help it rejoin the replica set.

            To do this, delete the affected pod using the following command. For example, if mongo7-0 is affected, run:

            ```sh
            kubectl delete pod mongo7-0 -n connections
            ```

9. Restart the MongoDB-related services

      After completing the migration steps, restart any services that depend on MongoDB to ensure they properly connect to MongoDB 7.

      ```bash
      kubectl -n connections delete pod $(kubectl get pods -n connections | awk '/^appregistry-service|^community-template-service|^itm-services|^people-idmapping|^people-migrate|^people-relation|^people-scoring/ {print $1}')
      ```

10. Verify the migration

      1. Check Pod Status. Ensure the MongoDB 7 pod is running:
      
         ```bash
         kubectl -n connections get pod | grep mongo7
         ```
      2. Validate Community Templates.

         Confirm that previously created community templates appear correctly in MongoDB 7.

11. Post Installation and Data Migration Cleanup

      After the installation of MongoDB 7 and data migration have been completed and verified, the following configuration settings and folders are no longer needed and can be safely removed:

      1. Remove the mounts on that were created on the target machine (i.e. server1)
      2. Remove the following folders created by the move_mongo_folders.sh on the NFS master node 

         ```sh
         rm -rf /pv-connections/mongo7-node-0-old
         rm -rf /pv-connections/mongo7-node-1-old
         rm -rf /pv-connections/mongo7-node-2-old
         ```

      3. Remove the following in the /etc/exports on the NFS master node
      
         ```sh
         /pv-connections/mongo7-node-0/data/db SERVER1_IP(root_squash,anonuid=1001,rw)
         /pv-connections/mongo7-node-1/data/db SERVER1_IP(root_squash,anonuid=1001,rw)
         /pv-connections/mongo7-node-2/data/db SERVER1_IP(root_squash,anonuid=1001,rw)
         ```
