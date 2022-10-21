# Setting up persistent volumes for a standard installation \(non-HA\) {#r_Orient_Me_setup_pers_vols .reference}

Use these guidelines to help you set up persistent volumes for middleware infrastructure such as Zookeeper, MongoDB, Customizer, and OpenSearch.

## Using persistent volumes { .section}

These guidelines and sample yml files describe how to set up all of the persistence volumes required for a full install of Component Pack. If you are using Starter Stack to install only some of the components, then you may not need all of the persistent volumes. See the [Starter Stack](c_OM_install_starter_stacks.md) page for more information on what persistent storage is required by individual components.

IBM Cloud Private supports NFS, GlusterFS, and HostPath. HostPath can only be used on a single server and for evaluation purposes only; therefore local storage is not supported in any way and will not work in a multi-node cluster. NFS persistent storage is recommended for Component Pack and this topic provides instructions on setting it up.

On the master node \(refer to the [Component Pack overview](c_Orient_Me_architecture_diagrams.md)\), run the following commands from the parent directory where IC-ComponentPack-6.0.0.x.zip was extracted:

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

2.  Change directory:

    ```
    cd <extractedFolder>/microservices/hybridcloud/doc/samples
    ```

3.  Create a Kubernetes persistent volume using option a \(HostPath\) or b \(NFS\):
    1.  Create a persistent volume on HostPath:

        **Note:** Use for evaluation purpose only. HostPath must be used only for test in a ICp single-node installation. It will not work if you have a cluster.

        ```
        sudo /usr/local/bin/kubectl create -f fullPVs_HostPath.yml
        ```

        **Note:** You can find a sample fullPVs\_HostPath.yml in the install ZIP file at the following extracted location: <extractedFolder\>/microservices/hybridcloud/doc/samples/

    2.  Create a persistent volume on NFS: The following steps assume that you are in a IPv4 environment, and that all persistent volumes will be created on the Master node.
        1.  Replace the string \_\_\_NFS\_SERVER\_IP\_\_\_ in the fullPVs\_NFS.yml file with the IP address of the NFS server, by running the following command:

            ```
            sudo sed -i "s/___NFS_SERVER_IP___/$(hostname -i)/g" fullPVs_NFS.yml
            
            ```

        2.  The yml file sets up the NFS shares for the different folders created in step 1. The script uses the path /pv-connections/mongo-node-0, /pv-connections/mongo-node-1 and so on. If you used something other than /pv-connections/ for your share location, for example, /nfs/IBM/iccontainers/mongo-node-0, you must update the paths from /pv-connections/ to/nfs/IBM/iccontainers/. To do that, run the following command:

            ```
            sudo sed -i "s/\/pv-connections\//\/nfs\/IBM\/iccontainers\//g" fullPVs_NFS.yml
            ```

            **Note:** Use `\/` everywhere you want to look for or write in a `/`. For example, For example, /nfs/IBM/iccontainers/ becomes \\/nfs\\/IBM\\/iccontainers\\/.

        3.  Provide execution permission to the nfsSetup.sh script and run it in order to get NFS installed and configured:

            ```
            
            sudo chmod +x nfsSetup.sh
            sudo bash nfsSetup.sh
            ```

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

4.  Create Kubernetes persistent volume claims:

    ```
    sudo /usr/local/bin/kubectl create -f fullPVCs.yml
    
    ```

5.  Verify that both the persistent volumes and persistent volume claims are created successfully.
    1.  Ensure the status bound is listed after running the following command:

        ```
        sudo /usr/local/bin/kubectl get pv,pvc -n connections
        ```

    2.  Open a browser to the IBM Cloud Private dashboard. For example: https://master\_ip:8443/\#/dashboard. You will now see the **Shared Storage** shows 102 GiB.
    3.  Click **Infrastructure** \> **Storage**. You should see the list of NFS shares you created, with a status of Bound

