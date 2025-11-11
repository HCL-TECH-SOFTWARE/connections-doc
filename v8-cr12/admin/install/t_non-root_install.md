# Installing as a non-root user {#t_non-root_install .task}

Grant permissions to a non-root user to install HCL Connections.

Ensure that you complete all the prerequisite tasks that are relevant for your environment. For more information, see the [Before installing](r_before_installing.md) topic.

This task applies to the Linux™ operating systems only.

By default, only root users have the necessary permissions to install an HCL Connections deployment. On the Linux operating systems, you can permit non-root users to install the product by changing their permissions to access certain data directories. On the Windows™ operating system, the user must be a member of the administrator group.

**Note:** The non-root user must be the same user who installed IBM® WebSphere® Application Server.

To grant the necessary permissions to a non-root user, complete the following steps:

1.  Unless it already exists, create the non-root user account that you want to use to install HCL Connections.

2.  If it does not already exist, create a home directory for the user.

3.  Edit the install.ini file:

    1.  Open the install.ini file for editing from the following location:

        -   Linux: HCL\_Connections\_install/IM/linux/install.ini
        -   Linux on System z®: HCL\_Connections\_install/IM/zlinux/install.ini
    2.  In the second line of the file, change `admin` to nonadmin.

    3.  Save and close the file.

4.  Open a command prompt and grant the appropriate permissions to the user by entering the commands shown in the following table:

    -   Linux:

        **Note:** Use either the chmod or chown commands, depending on your security environment. Use the chown commands to grant permissions to a user and group but ensure that the group includes the user account that installed WebSphere Application Server.

        |Directory|Permissions|chmod command|chown command|
        |---------|-----------|-------------|-------------|
        |app\_server\_root|RWX|chgrp -R non-root\_user\_group app\_server\_root chmod -R g+wrx app\_server\_rootwhere non-root\_user\_group is a user group that contains the non-root user account.|chown -R non-root\_ID:group app\_server\_rootwhere non-root\_ID is the non-root user account and group is the user group that contains this account.|
        |HCL\_ Connections set-up directory|RWX|chgrp -R non-root\_user\_group HCL\_Connections\_set-up\_directory chmod -R g+wrx HCL\_Connections\_set-up\_directory|chown -R non-root\_ID:group HCL\_Connections\_set-up\_directory|
        |[connections\_root](../plan/i_ovr_r_directory_conventions.md)|RWX|chgrp -R non-root\_user\_group connections\_root chmod -R g+wrx connections\_root|chown -R non-root\_ID:group connections\_root|
        |[IM\_root](../plan/i_ovr_r_directory_conventions.md)|RWX|chgrp -R non-root\_user\_group IM\_root chmod -R g+wrx IM\_root|chown -R non-root\_ID:group IM\_root|
        |[shared\_resources\_root](../plan/i_ovr_r_directory_conventions.md)|RWX|chgrp -R non-root\_user\_group shared\_resources\_root chmod -R g+wrx shared\_resources\_root|chown -R non-root\_ID:group shared\_resources\_root|
        |var/ibm/InstallationManager|RWX|chmod -R ugo+rwx /var/ibm/InstallationManager <br><br> **Note:** Grant permissions to this folder only if the root user installed IBM Installation Manager.|chown -R non-root\_ID:group /var/ibm/InstallationManager|

5.  Install HCL Connections using either the wizard, the console, or a silent installation method.


## Example { .example}

Grant permissions to a non-root user who wants to install an HCL Connections deployment on Linux.

Assumptions:

-   The app\_server\_root directory is /opt/IBM/Websphere/Appserver.
-   The HCL\_Connections\_set-up\_directory directory is /opt/ConnectionsSetup.
-   The connections\_root, IM\_root, and shared\_resources\_root directories are subdirectories of the /opt/ConnectionsInstallation directory.
-   The non-root user account is a member of the ConnectionsInstallers group.

Procedure:

1.  Create a non-root user account called ConnectionsInstaller.
2.  Create a home directory for the new user account.
3.  Add the new user account to the ConnectionsInstallers group.
4.  Open a command prompt and enter the following commands:
    1.  chgrp -R ConnectionsInstallers /opt/IBM/Websphere/Appserver chmod -R g+wrx /opt/IBM/Websphere/Appserver chown -R ConnectionInstaller:ConnectionsInstallers /opt/IBM/Websphere/Appserver
    2.  chgrp -R ConnectionsInstallers /opt/ConnectionsSetup chmod -R g+wrx /opt/ConnectionsSetup chown -R ConnectionInstaller:ConnectionsInstallers /opt/IBM/Websphere/Appserver
    3.  chgrp -R ConnectionsInstallers /opt/ConnectionsInstallation chmod -R g+wrx /opt/ConnectionsInstallation chown -R ConnectionInstaller:ConnectionsInstallers /opt/IBM/Websphere/Appserver

**Parent topic:**[Installing HCL Connections](../install/c_installing_overview.md)

