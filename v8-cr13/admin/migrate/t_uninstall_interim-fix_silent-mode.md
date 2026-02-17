# Uninstalling fixes in silent mode {#t_update_uninstall_manual .task}

If the fix that you installed is not working, you can uninstall it using the update wizard in silent mode.

Ensure that you verified the following prerequisites:

-   You restored your databases
-   The WAS\_HOME environment variable is set for Linux™ and Windows™

To uninstall fixes in silent mode, complete the following step:

-   Open a command prompt and enter the following command:

    updateSilent.sh\|exe -installDir fix\_file\_location -fix -uninstall -fixes fix1\_idfix2\_id -wasUserId AdminUserId -wasPassword AdminPwd -featureCustomizationBackedUp <yes\|no\>

    where:

    -   fix\_file\_location is the directory containing the downloaded fix.
    -   fix1\_id and fix2\_id are the label of the fixes that you want to remove. Repeat this parameter as often as required.
    -   AdminUserId is the user ID for WebSphere® Application Server Deployment Manager.
    -   AdminPwd is the password for WebSphere Application Server Deployment Manager.
    -   <yes\|no\> is the possible value of the **featureCustomizationBackedUp** parameter; this parameter indicates if you have backed up your customizations but does not validate any such backup.

The log files that are created by the wizard are located under the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/version/log directory.

**Note:** Check the <timestamp\>\_<fix name\>\_<feature name\>\_uninstall.log to find "Build Successful" near the end of the file. If this exists, it means you have uninstalled the fixes successfully. Otherwise, uninstall the fix again.

**Parent topic:**[Uninstalling fixes](../migrate/c_update_uninstall.md)

