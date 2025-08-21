# MongoDB Replica Set Recovery Using Docker

## Introduction

If your MongoDB replica set nodes experience an abrupt shutdown, nodes may have `mongod.lock` files present. These files indicate the database was not cleanly shut down, and depending on the state of your replica set, corrective actions may or may not be necessary. This document outlines how to assess the situation and determine the appropriate recovery steps using Docker.

## Steps for Recovery and Status Check

### Step 1: Prerequisites

- Docker installed and functioning.
- Bitnami MongoDB image (`bitnami/mongodb:5.0`) available locally or accessible from a registry.

### Step 2: Configure NFS Exports on NFS Master

  1. Edit the `/etc/exports` file on the NFS master

    Specify the MongoDB 5 directories to share with the machine (server1) that will be used for the data migration:

    ```bash
    sudo nano /etc/exports
    ```

  2. Add entries for the MongoDB 5 folders, replacing placeholders with actual values:

    ```bash
    /pv-connections/mongo5-node-0/data/db SERVER1_IP(root_squash,anonuid=1001,rw) 
    ```

  3. Replace `SERVER1_IP` with the IP address of the target server (`server1`).

### Step 3: Mount Shared Folders on Target Server

  1. On the target machine (for example, server1), create directories to mount the shared folders:**

    ```bash
    sudo mkdir -p /mnt/mongo5-node-0/data/db
    ```

  2. Mount the shared folders from the NFS master to these directories:

    ```bash
    sudo mount NFS_MASTER_IP:/pv-connections/mongo5-node-0/data/db /mnt/mongo5-node-0/data/db
    ```

  3. Replace `NFS_MASTER_IP` with the IP address of the NFS master.

  4. Verify NFS Mount:

    Confirm that the shared folders are properly mounted by listing their contents:

    ```bash 
    sudo ls /mnt/mongo5-node-0/data/db
    ```

### Step 4: Checking if Repair is Required

  To check whether a MongoDB node requires repair, enter the following command:

      ```
      sudo docker run --rm -v /mnt/mongo5-node-0/data/db:/data/db --entrypoint bash bitnami/mongodb:5.0 -c \ 
      "mongod --dbpath /data/db --logpath /data/db/mongo.log --fork || tail -n 10 /data/db/mongo.log"
      ```

  **Expected Output:**

  - If the output shows **"corruption detected"**, repair is required.
  - If `mongod` starts successfully, no repair is needed.


### Step 5: Performing the Repair

  If repair is required, enter the following commands:

      ```
      sudo docker run --rm -v /mnt/mongo5-node-0/data/db:/data/db --entrypoint bash bitnami/mongodb:5.0 -c \
      "rm /data/db/mongod.lock && mongod --dbpath /data/db --repair"
      ```

!!! note

    - This command removes the `mongod.lock` file and repairs the database.
    - Ensure all other MongoDB processes accessing the directory are stopped before repair.




### Step 6: Starting MongoDB Node

  After repair (if required), start the MongoDB node by executing the following command:

      ```
      sudo docker run --rm -v /mnt/mongo5-node-0/data/db:/data/db --entrypoint bash bitnami/mongodb:5.0 -c \ 
      "mongod --dbpath /data/db --logpath /data/db/mongo.log --fork"
      ```

### Step 7: Verifying the Start

  If `mongod` starts successfully, check the last few lines of the `mongo.log`:

    ```
    sudo docker run --rm -v /mnt/mongo5-node-0/data/db:/data/db --entrypoint bash bitnami/mongodb:5.0 -c \ 
    "tail -n 10 /data/db/mongo.log"
    ```

### Step 8: Checking Replica Set Status

  Once the node is running, verify its replica set status by running the following command:

    ```
    sudo docker run --rm -v /mnt/mongo5-node-0/data/db:/data/db --entrypoint bash bitnami/mongodb:5.0 -c \ 
    "mongosh --eval 'rs.status()'" 
    ```

  **Expected Output:**

  - The status should indicate whether the node is **PRIMARY** or **SECONDARY**.
  - If all nodes in the replica set are healthy, no further action is needed.

### Step 9: Special Scenarios
 
1. If All Nodes Require Repair:

    - Repeat the above steps for each node.
    - Ensure that at least one node becomes the **PRIMARY** after repairs. This may involve initiating the replica set again.

2. If Resync is Preferred:

    For nodes beyond recovery, refer to MongoDB’s [resync documentation](https://www.mongodb.com/docs/manual/tutorial/resync-replica-set-member/). Use resync only when the node is secondary and you can ensure a reliable sync source.

### Step 10. Common Issues and Resolutions

1. Issue: Unable to Start `mongod`

  - Check the `mongo.log` for errors:
  
    ```bash
    sudo docker run --rm -v /mnt/mongo5-node-0/data/db:/data/db --entrypoint bash bitnami/mongodb:5.0 -c \
    "tail -n 20 /data/db/mongo.log"
    ```

2. Issue: Replica Set Inconsistent

  - If a node fails to join the replica set after repair, reconfigure the replica set:
  
    ```javascript
    rs.reconfig(rs.conf())
    ```

### Step 11: Cleanup After Tests / Repair

  Once tests and repairs are complete, remove temporary configurations and folders.

  1. On Target Machine (`server1`)

    Unmount the shared folders:
  
      ```bash
      sudo umount /mnt/mongo5-node-0/data/db
      ```

  2. On NFS Master Node

    1. Remove backup folders created by the migration script:
  
        ```bash
        sudo rm -rf /pv-connections/mongo5-node-0-old
        ```

    2. Remove the export entry from `/etc/exports`:
  
        ```bash
        sudo nano /etc/exports
        ```

    3. Delete the following line:
  
      ```bash
      /pv-connections/mongo5-node-0/data/db SERVER1_IP(root_squash,anonuid=1001,rw)
      ```

    4. Save and exit.

  3. Apply the changes:
  
    ```bash
    sudo exportfs -ra
    ```

