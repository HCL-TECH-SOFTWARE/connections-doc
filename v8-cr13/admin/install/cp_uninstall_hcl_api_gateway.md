# Uninstalling HCL API Gateway {#api_gateway_uninstall .task}

Follow these steps to completely remove the HCL API Gateway and its associated resources from your Kubernetes cluster.

This procedure removes all HCL API Gateway components, including the APISIX gateway, persistent volumes, storage classes, and data.

!!! note

    Replace `<<namespace>>` with the namespace where HCL API Gateway is installed (for example, `connections` or `apisix`).

1.  On your Kubernetes master node, verify the current API Gateway installations by executing the following command:

    ```bash
    helm -n <<namespace>> list
    ```

    Identify the HCL API Gateway related releases. Typical release names include `apisix` and `hcl-api-gateway`, but these may vary depending on your installation.

2.  Execute the following command to uninstall the HCL API Gateway Helm release:

    ```
    helm uninstall hcl-api-gateway -n <<namespace>>
    ```

3.  Execute the following command to uninstall the core APISIX Helm release:

    ```bash
    helm uninstall apisix -n <<namespace>>
    ```
    
4. Identify the persistent volumes used by APISIX by executing the following command:

    ```bash
    kubectl get pv | grep apisix
    ```

5. Delete the persistent volumes by executing the following command:

    ```bash
    kubectl delete pv <pv-name-1> <pv-name-2> <pv-name-3>
    ```

    !!! note

        Replace `<pv-name-1>`, `<pv-name-2>`, and `<pv-name-3>` with the actual persistent volume names identified in the previous step used by APISIX. 

6. Enter the following command to delete the storage class associated with APISIX:

    ```bash
    kubectl delete sc <storage-class-name>
    ```

    !!! note
        
        Replace `<storage-class-name>` with the actual storage class name (typically `apisix-storage-class`).

7.  Remove the persistent volume data from the file system:

    ```bash
    rm -rf <pv-path>/apisix-etcd*
    ```

    !!! note 
        
        Replace `<pv-path>` with the path where the persistent volumes are stored on your system (for example, `/pv-connections`).

    !!! warning

        This command permanently deletes all persistent volume data. Ensure you have backed up any necessary data before proceeding. This operation cannot be undone.

8.  Verify the uninstallation:

    ```bash
    helm -n <<namespace>> list
    kubectl get pv | grep apisix
    kubectl get sc | grep apisix
    ```

    These commands should return no results, confirming that all HCL API Gateway components have been removed

    ```bash
    rm -rf /pv-connections/apisix-etcd*
    ```

    !!! warning

        Ensure you have backed up any necessary data before running this command, as it permanently deletes the persistent volume data. This operation cannot be undone.

**Parent topic:** [Installing HCL API Gateway for Component Pack](../install/installing_hcl_api_gateway_for_component_pack.md)
