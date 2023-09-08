# Installing fixes in silent mode {#t_install_interim-fix .task}

Install fixes with the update wizard in silent mode.

For information about prerequisites, see [Installing fixes](c_installing_interim_fixes.md).

**Note:** Ensure the node agent is running before installing fixes.

This topic describes the steps to install fixes; it does not include information about how to prepare the production environment before you install fixes. You can install multiple fixes at a time.

For information about command options, see the [updateSilent command](r_updatelc_command.md) topic.

To install fixes in silent mode, complete the following steps:

1.  Stop all the clusters that host HCL Connections™ applications.

2.  Open a command prompt from the updateInstaller directory under the [connections\_root](../plan/i_ovr_r_directory_conventions.md) directory and enter the following commands \(without the carriage returns\):

    -   Linux:

        ```
        chmod +x updateSilent.sh
        ./updateSilent.sh -fix -installDir [connections\_root](../plan/i_ovr_r_directory_conventions.md)
        -fixDir fix\_file\_location -install 
        -fixes APAR\_number\_of\_fix 
        -wasUserId AdminUserID 
        -wasPassword AdminPasswordAdminPassword 
        -featureCustomizationBackedUp backup\_status
        ```

    -   Windows:

        ```
        updateSilent.bat -fix 
        -installDir [connections\_root](../plan/i_ovr_r_directory_conventions.md)
        -fixDir fix\_file\_location -install 
        -fixes APAR\_number\_of\_fix 
        -wasUserId AdminUserID 
        -wasPassword AdminPasswordAdminPassword 
        -featureCustomizationBackedUp backup\_status
        ```

    where

    -   fix\_file\_location is the directory that contains the downloaded fixes
    -   APAR\_number\_of\_fix is the APAR number of the fix \(such as LO36338\)
    -   AdminUserId is the administrative user name for WebSphere® Application Server Deployment Manager. A space in the WAS admin user and password is not supported. You need to use a WAS admin user and password without space to install fixes.
    -   AdminPwd is the password for that user
    -   backup\_status confirms whether you backed up any customizations that you made to the Connections interface. The possible values are yes\|no. This parameter does not validate any such backup, it is just a reminder to consider backing up any customizations because updates to your deployment might overwrite your customizations.
    **Note:**

    If you do not know the APAR number of the fix, the fix JAR filename contains it. It is the string that starts with "LO" and followed by 5 digits. Example: For fix JAR 4.0.0.0-IC-News-IFLO12345.jar, the APAR is LO12345.

    For example:./updateSilent.sh -installDir /opt/IBM/Connections -fix -fixDir /opt/IBM/Connections/update/fixes -install -fixes LO36338 LO34499 LO34327 LO35077 LO34966 -wasUserId wasadmin -wasPassword wasadmin -featureCustomizationBackedUp yes

3.  Shut down the node agent, manually remove the temp directory and then restart the node agent to remove the contents of the WebSphere Application Server temp directory. An example of the temp directory is app\_server\_root/profiles/AppSrv01/temp.

4.  After you install the fixes, perform a full synchronization to push the updates to all nodes.


The log files that are created by the wizard are located under the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/version/log directory.

**Parent topic:**[Installing fixes](../migrate/c_installing_interim_fixes.md)

