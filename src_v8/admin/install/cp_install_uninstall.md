# Uninstalling Component Pack {#cp_install_uninstall .task}

Follow these steps to remove the Component Pack services from your Connections deployment.

Use these steps to remove the Component Pack from your Connections deployment.

1.  On your Kubernetes master node, run the following command to determine what services are currently installed:

    ```
    helm list
    ```

2.  To uninstall a Component Pack service, run the following command:

    ```
    helm delete release --purge
    ```

    where release corresponds to the release name displayed in the output of the `helm list` command.

    For example, to delete all Component Pack services:

    ```
    helm delete bootstrap connections-env elasticsearch elasticstack infrastructure mw-proxy orientme sanity sanity-watcher k8s-psp cnx-ingress --purge
    ```

    CAUTION:

    Deleting the connections-volumes helm chart will remove the persistent volumes and claims. Use this command with caution.


**Parent topic:**[Installing or upgrading Component Pack for Connections](../install/cp_install_config_intro.md)

