# Updating Connections 8.0 with the latest Cumulative Refresh 

Update to the latest Cumulative Refresh (CR) for HCL Connections 8.0.

## Before you begin

- On the system where the Deployment Manager is installed, prepare the supporting software for the update. Download and extract the latest Cumulative Refresh (CR) package. Refer to [Downloading the latest Cumulative Refresh (CR) and related updates](t_downloading_cr.md) for more information.

- Back up Connections and all customized files. For more information, see [Getting ready for upgrading or updating](t_prepare_migrate_upgrade.md).

## About this task

If you are updating a newly installed or migrated deployment, you only need to update with the newest Cumulative Refresh, because it contains all of the updates from previous refreshes.

## Procedure

1.  Stop all clusters and node agents in your deployment but leave the **Deployment Manager** running.

2.  Start the **Installation Manager**.

3.  From the Installation Manager menu, click on **File** \> **Preferences**.

    **Note:** Be sure that the **Search service repositories during installation and updates** option is deselected.

4.  Click on **Repositories** \> **Add Repository**.

5.  Enter the full path to the Cumulative Refresh package that you downloaded and then click **OK**.

    For example: C:\\HCL\\CONNECTIONS-CR\\HC8.0\_CR\\Updates\\repository.config.

    Verify that **Installation Manager** can connect to the repository.

6.  Click **OK**.

7.  Click **Update**.

8.  Select **Connections 8.0** and click **Next**.

9. Verify that the correct Cumulative Refresh version is displayed and click **Next**.

10. Review and accept the license agreement by clicking on **I accept terms in the license agreements** and then click **Next**.

11. Ensure that all the Connections applications are selected and click **Next**.

    **Note:** All of the installed applications are selected by default. If you add any of the non-selected applications, those applications will be installed. If you clear any of the selected applications, those applications will be uninstalled.

12. Enter the administrative ID and password of the Deployment Manager and click **Validate**.

    **Note:** This ID is set to the connectionsAdmin J2C authentication alias, which is mapped to the following Java™ EE roles: '''dsx-admin''', '''widget-admin''', and '''search-admin'''. It is also used by the service integration bus. If you plan to use security management software such as Tivoli® Access Manager or SiteMinder, the ID that you specify here must exist in the LDAP directory. For more information, see the *Switching to unique administrator IDs for system level communication* topic.

13. Click **OK** \> **Next** \> **Update** \> **Finish**.

14. Close the **Installation Manager**.

15. When the installation is complete, start the node agent to deploy the updated Connections applications.

16. Stop the node agent so the `temp` directory can be cleaned out in the next step.

17. Delete the contents of the cache under the App Server \(for example, `C:\\IBM\\WebSphere\\AppServer\\profiles\\AppSrv01\\temp\`).

18. Start the node agents, then perform a full synchronization to push the update to all nodes.

    Check the `systemOut.log` of each nodeagent to ensure synchronization completed successfully.

19. Generate a new plug-in by completing the following steps:
    -   Still in the **Integrated Solutions Console**, click on **Servers** \> **Server Types** \> **Webservers**.
    -   Select the **Webserver**, click **Generate Plug-in**, and wait for the plug-in to be generated.
    -   Select the **Webserver** again and click **Propagate Plug-in**.

20. **[Optional] Post Installation Task** -  Follow the instructions in the [Post-customization step](../customize/t_admin_common_customize_postreq.md) topic to automatically clear the browser cache for end users the next time they login into Connections.

21. Start the Connections server


!!! note 

    If your deployment includes Component Pack, complete the steps in [Upgrading Component Pack Services](../install/cp_install_upgrade_container.md).

**Parent topic:** [Updating HCL Connections 8.0 with the latest Cumulative Refresh (CR)](../migrate/c_installing_fix-packs.md)