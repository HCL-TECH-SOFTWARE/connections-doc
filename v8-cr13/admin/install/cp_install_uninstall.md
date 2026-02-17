# Uninstalling Component Pack {#cp_install_uninstall .task}

Follow these steps to remove the Component Pack services from your Connections deployment.

Use these steps to remove the Component Pack from your Connections deployment.

1.  On your Kubernetes master node, run the following command to determine what services are currently installed:

    ```
    helm -n connections list
    ```

2.  To uninstall a Component Pack service, run the following command:

    ``` {#pre_nz5_1wn_fvb}
    helm -n connections uninstall *release*
    ```

    where release corresponds to the release name displayed in the output of the `helm list` command.

    For example, to uninstall the Tailored Experience:

    ``` {#codeblock_cyd_fwn_fvb}
    helm -n connections uninstall tailored-exp  
    ```

    CAUTION:

    Deleting the connections-volumes helm chart will remove the persistent volumes and claims. Use this command with caution.


**Parent topic:**[Installing or upgrading Component Pack for Connections](../install/cp_install_config_intro.md)

