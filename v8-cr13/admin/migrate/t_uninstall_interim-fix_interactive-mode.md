# Uninstalling fixes in interactive mode {#t_update_uninstaller .task}

If the fix that you installed is not working, you can uninstall it using the update wizard in interactive mode.

Ensure that you have met the following prerequisites:

-   You have restored your databases
-   The WAS\_HOME environment variable has been set for Linux® and Windows®

To uninstall fixes with the update wizard in interactive mode, complete the following steps:

1.  From the updateInstaller directory under the [connections\_root](../plan/i_ovr_r_directory_conventions.md) directory, run the following script:

    -   Linux:

        ```
        ./updateWizard.sh
        ```

    -   Microsoft® Windows:

        ```
        updateWizard.bat
        ```

2.  On the Welcome panel, click **Next** to continue.

3.  Choose to uninstall fixes in this panel, click **Next** to continue.

4.  Select the check boxes of the fixes that you wish to uninstall, and then click **Next**.

5.  Enter the WebSphere® Application Server Deployment Manager administrator user ID and password and click **Next**.

6.  Review the information that you have entered. To make changes, click **Back**. To start uninstalling, click **Next**.

7.  Review the result of the update. Click **Finish** to exit the wizard.


At least two logs are created by the wizard under the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/version/log directory:

-   Date\_Time\_ifix name\_application name\_uninstall.log
-   Date\_Time\_ifix name\_uninstall.log

**Note:** Check the <timestamp\>\_<fix name\>\_<feature name\>\_uninstall.log to find "Build Successful" near the end of the file. If this exists, it means you have uninstalled the fixes successfully. Otherwise, uninstall the fix again.

