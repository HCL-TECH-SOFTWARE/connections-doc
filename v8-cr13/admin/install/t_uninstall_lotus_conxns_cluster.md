# Uninstalling a deployment {#t_uninstall_lotus_conxns_cluster .task}

Uninstall a deployment of HCL Connections™.

**Notes:**

-   Deleting Connections data files makes the original deployment unrecoverable. If you plan to reinstall Connections and use your old data, do not delete the data files.
-   You do not need to remove Installation Manager files. These files might be associated with other applications.

To uninstall Connections, complete the following steps:

1.  Start the WebSphere® Application Server Deployment Manager.

2.  Stop all instances of WebSphere Application Server, including node agents, in your deployment.

3.  To uninstall a deployment of Connections, start the Installation Manager and click **Uninstall**.

4.  Select **Connections** and click **Next**.

5.  Clear the check boxes of the applications that you want to remove.

6.  Enter the details of your WebSphere Application Server environment and then click **Next**.

7.  In the **Summary** page, verify that the details are correct.

8.  Click **Modify** to begin removing applications

9.  On the Deployment Manager system, delete the contents of the following \(or equivalent\) temp folder. For example, on Linux: /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/temp.

10. On each node system, delete the contents of the following \(or equivalent\) temp folder: For example, on Linux: /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/temp.

11. On each node, remove the log files for each of the Connections clusters. For example on Linux, delete the Connections clusters folders in the folder: /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs.

12. When the process is complete, restart the Deployment Manager.

13. Restart all instances of WebSphere Application Server, including node agents.

14. Synchronize the nodes.

15. To check the details of the procedure, open the log file named Uninstall.log in the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/logs directory.

16. If you plan to reinstall HCL Connections, remove the following files:

    **Notes:**

    -   Except where noted, remove these files from the system that hosts the Deployment Manager.
    -   Because some of these files might be used by other programs, it is possible that you are not allowed to remove all of the following files.
    1.  Connections installation files: [connections\_root](../plan/i_ovr_r_directory_conventions.md)

        **Note:** If you did not install Connections in the default directory, delete the directory where you installed the product.

    2.  Connections shared data: Delete the directories that you specified for shared data when you installed Connections.

    3.  Connections local data: On each node, delete the directories that you specified for local data when you installed Connections.

        **Note:** Deleting Connections data files makes the original deployment unrecoverable. If you plan to reinstall Connections and use your old data, do not delete the data files.

    4.  Connections configuration files: Delete the [profile\_root](../plan/i_ovr_r_directory_conventions.md)/config/cells/cell\_name/LotusConnections-config directory, where cell\_name is the name of your WebSphere Application Server cell.

    5.  If it is present, delete the registry.xml file from the [profile\_root](../plan/i_ovr_r_directory_conventions.md)/config/cells/cell\_namedirectory.

    6.  Delete all .py files from the /opt/IBM/WebSphere/AppServer/profiles/profile\_name/bin directory on the deployment manager server as follows:

        -   Linux: /opt/IBM/WebSphere/AppServer/profiles/profile\_name/bin
        -   Windows: drive:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\profile\_name\\bin
    7.  Clear the WebSphere Application Server profile's temp and wstemp folders. For example:

        -   Linux:

            /opt/IBM/WebSphere/AppServer/profiles/profile\_name/temp

        -   /opt/IBM/WebSphere/AppServer/profiles/profile\_name/wstemp

        -   Windows:

            drive:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\profile\_name\\temp

            drive:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\profile\_name\\wstemp


You uninstalled Connections.

If you plan to reinstall Connections, refer to [Migrating and upgrading](../migrate/c_upgrade_migrate_overview.md).

**Parent topic:**[Uninstalling](../install/t_uninstall_over.md)

