# Installing as a non-root user {#t_non-root_install .task}

Grant permissions to a non-root user to install HCL Connections

Ensure that you complete all the prerequisite tasks that are relevant for your environment. For more information, see the  
[Before installing](r_before_installing.md) topic.

This task applies to Linux™ operating systems only.

By default, only root users have the necessary permissions to install an HCL Connections deployment. On Linux operating systems, you can permit non-root users to install the product by changing their permissions to access certain data directories.

On Windows™ operating systems, the user must be a member of the Administrators group.

!!! note 
    The non-root user must be the same user who installed IBM® WebSphere® Application Server. 

To grant the necessary permissions to a non-root user, complete the following steps:

1.  Unless it already exists, create the non-root user account that you want to use to install HCL Connections.

2.  If it does not already exist, create a home directory for the user.

3. Edit the `install.ini` file:

    1.  Open the install.ini file for editing from the following location:

        - Linux: 
        ```sh
        HCL_Connections_install/IM/linux/install.ini
        ```  
        - Linux on System z®: 
        ```sh
        HCL_Connections_install/IM/zlinux/install.ini
        ```
    2.  In the second line of the file, change `admin` to `nonadmin`.

    3.  Save and close the file.

4.  Open a command prompt and grant the appropriate permissions to the user by entering the commands shown in the following table:

    -   Linux:

    Use either the `chmod` or `chown` commands, depending on your security environment. Use the `chown` commands to grant permissions to a user and group, but ensure that the group includes the user account that installed WebSphere Application Server.

    | Directory | Permissions | `chmod` / `chgrp` Commands | `chown` Command |
    |------------|:-----------:|----------------------------|-----------------|
    | **`app_server_root`** | RWX | `chgrp -R non-root_group app_server_root`<br>`chmod -R g+rwx app_server_root`<br><br>*Note: `non-root_group` must contain the non-root user account.* | `chown -R non-root_ID:group app_server_root` |
    | **`HCL_Connections_set-up_directory`** | RWX | `chgrp -R non-root_group HCL_Connections_set-up_dir`<br>`chmod -R g+rwx HCL_Connections_set-up_dir` | `chown -R non-root_ID:group HCL_Connections_set-up_dir` |
    | **`connections_root`** | RWX | `chgrp -R non-root_group connections_root`<br>`chmod -R g+rwx connections_root` | `chown -R non-root_ID:group connections_root` |
    | **`IM_root`** | RWX | `chgrp -R non-root_group IM_root`<br>`chmod -R g+rwx IM_root` | `chown -R non-root_ID:group IM_root` |
    | **`shared_resources_root`** | RWX | `chgrp -R non-root_group shared_resources_root`<br>`chmod -R g+rwx shared_resources_root` | `chown -R non-root_ID:group shared_resources_root` |
    | **`/var/ibm/InstallationManager`** | RWX | `chmod -R ugo+rwx /var/ibm/InstallationManager`<br><br>*Only grant these permissions if `root` originally installed IBM Installation Manager.* | `chown -R non-root_ID:group /var/ibm/InstallationManager` |

5.  Install HCL Connections using either the wizard, the console, or a silent installation method.


## Example { .example}

Grant permissions to a non-root user who wants to install an HCL Connections deployment on Linux.

Assumptions:

- The `app_server_root` directory is `/opt/IBM/Websphere/Appserver`.
- The `HCL_Connections_set-up_directory` directory is `/opt/ConnectionsSetup`.
- The `connections_root`, `IM_root`, and `shared_resources_root` directories are subdirectories of the `/opt/ConnectionsInstallation` directory.
- The non-root user account is a member of the `ConnectionsInstallers` group.

Procedure:

1. Create a non-root user account called `ConnectionsInstaller`.

2. Create a home directory for the new user account.

3. Add the new user account to the `ConnectionsInstallers` group.

4. Open a command prompt and enter the following commands:

   1.
      ```sh
      chgrp -R ConnectionsInstallers /opt/IBM/Websphere/Appserver
      chmod -R g+rwx /opt/IBM/Websphere/Appserver
      chown -R ConnectionInstaller:ConnectionsInstallers /opt/IBM/Websphere/Appserver
      ```

   2.
      ```bash
      chgrp -R ConnectionsInstallers /opt/ConnectionsSetup
      chmod -R g+rwx /opt/ConnectionsSetup
      chown -R ConnectionInstaller:ConnectionsInstallers /opt/ConnectionsSetup
      ```

   3.
      ```bash
      chgrp -R ConnectionsInstallers /opt/ConnectionsInstallation
      chmod -R g+rwx /opt/ConnectionsInstallation
      chown -R ConnectionInstaller:ConnectionsInstallers /opt/ConnectionsInstallation
      ```

**Parent topic:**[Installing HCL Connections](../install/c_installing_overview.md)
