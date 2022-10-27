# Setting up persistent volumes on a high availability deployment \(NFS\) {#r_Orient_Me_setup_pers_vols_HA .reference}

Use these guidelines to help you set up persistent volumes for middleware infrastructure such as Zookeeper, MongoDB, Customizer, and OpenSearch for a high availability deployment.

## Requirements for persistent volumes { .section}

These guidelines and sample yml files describe how to set up all of the persistence volumes required for a full install of Component Pack. If you are using Starter Stack to install only some of the components, then you may not need all of the persistence volumes. See the [Starter Stack](c_OM_install_starter_stacks.md) page for more information on what persistent storage is required by individual components.

In an high availability configuration, best practice is to maintain persistent storage away from the ICp Masters themselves, on a separate machine that all ICp Masters can access.  

**Note:** The machine storing the persistent volumes in an HA configuration will not have Docker or Kubectl installed. 

This procedure uses two nodes:

-   Boot Node – to execute Kubectl commands
-   Storage Node – to store the persistent data \(NFS\)

**Note:**  Worker Nodes must be on the same subnet as the Storage machine.

## Configuring the persistent volumes { .section}

On the storage node, run the following commands to create all necessary folders required for persistent volumes:

1.  The following commands create all necessary folders required for persistent volumes:

    ```
    sudo mkdir -p /pv-connections/mongo-node-{0,1,2}/data/db
    sudo mkdir -p /pv-connections/solr-data-solr-{0,1,2}
    sudo mkdir -p /pv-connections/zookeeper-data-zookeeper-{0,1,2}
    sudo mkdir -p /pv-connections/esdata-{0,1,2}
    sudo mkdir -p /pv-connections/esbackup
    sudo mkdir -p /pv-connections/customizations
    sudo chmod -R 777 /pv-connections 
    ```

2.  To create a Kubernetes persistent volume on NFS, first discover the IP address of the storage node: `hostname -i`
3.  Perform the following steps on the storage node:
    1.  Copy the NFS setup script and fullPVs\_NFS.yml file to the storage node from the extracted zip location. On the storage node, run the following commands:

        ```
        sudo mkdir -p $HOME/nfsSetup 
        cd $HOME/nfsSetup 
        sudo scp root@<IP Address of Boot Node>:/<extractedFolder>/microservices/hybridcloud/doc/samples/nfsSetup.sh . 
        sudo scp root@<IP Address of Boot Node>:/<extractedFolder>/microservices/hybridcloud/doc/samples/fullPVs_NFS.yml .
        ```

    2.  Replace the string \_\_\_NFS\_SERVER\_IP\_\_\_ in the fullPVs\_NFS.yml file with the IP address of the NFS server by running the following command, replacing <shareServerIpAddress\> with the IP address of your storage node:

        ```
        sudo sed -i "s/___NFS_SERVER_IP___/<shareServerIpAddress>/g" $HOME/nfsSetup/fullPVs_NFS.yml
        
        ```

        For example:

        ```
        sudo sed -i "s/___NFS_SERVER_IP___/1.2.3.4/g" $HOME/nfsSetup/fullPVs_NFS.yml
        ```

    3.  The yml file sets up the NFS shares for the different folders created in step 1. The script uses the path /pv-connections/mongo-node-0, /pv-connections/mongo-node-1 and so on. If you used something other than /pv-connections/ for your share location, for example, /nfs/IBM/iccontainers/mongo-node-0, you must update the paths from /pv-connections/ to/nfs/IBM/iccontainers/. To do that, run the following command:

        ```
        sudo sed -i "s/\/pv-connections\//\/nfs\/IBM\/iccontainers\//g" $HOME/nfsSetup/fullPVs_NFS.yml
        ```

        **Note:** Use `\/` everywhere you want to look for or write in a /.For example, /nfs/IBM/iccontainers\\/ becomes \\/nfs\\/IBM\\/iccontainers\\/

    4.  Provide execution permission to nfsSetup.sh and run it in order to get NFS installed and configured:

        ```
        sudo chmod +x nfsSetup.sh
        sudo bash nfsSetup.sh
        ```


Perform the following steps on the boot node.

1.  Change directory:

    ```
    cd <extractedFolder>/microservices/hybridcloud/doc/samples
    ```

2.  Replace the string \_\_\_NFS\_SERVER\_IP\_\_\_ in the fullPVs\_NFS.yml file with the IP address of the NFS server by running the following command \(replacing <shareServerIpAddress\> with the IP address of your storage node\):

    ```
    sudo sed -i "s/___NFS_SERVER_IP___/<shareServerIpAddress>/g" fullPVs_NFS.yml
    ```

3.  If you performed step 3c in the previous section on the storage node, then you must complete that step on the boot node as well:

    The yml file sets up the NFS shares for the different folders created in step 1 of the previous section. The script uses the path /pv-connections/mongo-node-0, /pv-connections/mongo-node-1 and so on. If you used something other than /pv-connections/ for your share location, for example, /nfs/IBM/iccontainers/mongo-node-0, you must update the paths from /pv-connections/ to /nfs/IBM/iccontainers/. To do that, run the following command:

    ```
    sudo sed -i "s/\/pv-connections\//\/nfs\/IBM\/iccontainers\//g" $HOME/nfsSetup/fullPVs_NFS.yml
    ```

    **Note:** Use `\/` everywhere you want to look for or write in a / \(forward slash\). For example, /nfs/IBM/iccontainers\\/ becomes \\/nfs\\/IBM\\/iccontainers\\/

4.  Validate the NFS mount and write permissions as follows:
    1.  Test the NFS mount and write permissions by running the following script:

        ```
        sudo bash validatePV_NFS_YAML.sh fullPVs_NFS.yml
        ```

    2.  Copy the validation script and the yml file to an existing directory on all of the nodes in your deployment \(master/boot, proxy, and all workers\):

        ```
        sudo scp validatePV_NFS_YAML.sh root@IP\_Address\_of\_Node:/some/remote/directory
        sudo scp fullPVs_NFS.yml root@IP\_Address\_of\_Node:/some/remote/directory
        
        ```

    3.  Log in it each of the nodes in your deployment, and run the validation script:

        ```
        sudo cd /some/remote/directory
        sudo bash validatePV_NFS_YAML.sh fullPVs_NFS.yml
        
        ```

        ```

        ```

        Only continue to the next step when you see the message "NFS mount and write permissions tests passed".

5.  Create the persistent volumes on Kubernetes with the following command:

    ```
    sudo /usr/local/bin/kubectl create -f fullPVs_NFS.yml
    ```

6.  Create Kubernetes persistent volume claims:

    ```
    sudo /usr/local/bin/kubectl create -f fullPVCs.yml
    ```

    **Note:** You can find a sample fullPVCs.yml in the install ZIP file at the following extracted location: <extractedFolder\>/microservices/hybridcloud/doc/samples/

7.  Verify that both the persistent volumes and persistent volume claims are created successfully.
    1.  Ensure the status bound is listed after running the following command on the boot node :

        ```
        sudo /usr/local/bin/kubectl get pv,pvc -n connections
        ```

    2.  Open a browser to the IBM Cloud Private dashboard; for example: https://master\_HA\_vip:8443/\#/dashboard.

        The **Shared Storage** shows 102 GB.

    3.  Click **Infrastructure** \> **Storage**. You should see the list of NFS shares you created, with a status of Bound

