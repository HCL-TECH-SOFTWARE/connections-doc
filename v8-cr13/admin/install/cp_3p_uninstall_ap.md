# Uninstalling Activities Plus {#cp_3p_uninstall_ap .task}

If necessary, you can remove the Activities Plus app from your Connections deployment.

1.  On your Kubernetes master node, determine what services are currently installed:

    ```
    helm list
    ```

2.  Uninstall Activities Plus using the following command:

    ```
    helm uninstall <release_name> --purge
    ```

    Where `<release_name>` is `kudos-boards-cp`, for example:

    ```
    helm uninstall kudos-boards-cp --purge
    ```


**Parent topic:**[Integrating with Activities Plus](../install/cp_3p_integrate_intro.md)

