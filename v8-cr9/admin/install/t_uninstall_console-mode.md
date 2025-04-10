# Uninstalling in console mode {#uninstall_console-mode .task}

Uninstall HCL Connections in console mode. This method is convenient if you cannot or do not want to use the graphical mode.

Use console mode to uninstall the product in a non-graphical environment. This mode is useful when you have to uninstall HCL Connections on a system that does not have a video card.

In steps where you enter custom information, such as server details, you can type P at any time to return to the previous input choice in that step. However, you cannot type P to return to a previous step.

Uninstalling HCL Connections uses IBM® Installation Manager to manage the installation process.

To uninstall HCL Connections in console mode, complete the following steps:

1.  Start the WebSphere® Application Server Deployment Manager.

2.  Stop all instances of WebSphere Application Server, including node agents, in your deployment.

3.  Open a command prompt and change to the [IM\_root](../plan/i_ovr_r_directory_conventions.md)/eclipse/tools directory.

4.  Start the installation wizard by opening the following file:

    -   Linux: ./imcl -c
    -   Windows: imcl.exe -c
5.  Select the applications that you want to remove and then type N to proceed.

6.  Type U to start removing applications.

7.  To check the details of the procedure, open the log file named Uninstall.log in the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/logs directory.

8.  If you plan to reinstall HCL Connections™, remove the following files:

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

**Parent topic:**[Uninstalling](../install/t_uninstall_over.md)

