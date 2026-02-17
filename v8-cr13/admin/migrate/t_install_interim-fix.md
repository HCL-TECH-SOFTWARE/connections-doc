# Installing fixes in interactive mode {#t_install_interim-fix .task}

Install fixes with the update wizard in interactive mode.

For information about prerequisites, see [Installing fixes](c_installing_interim_fixes.md).

**Note:** Ensure the node agent is running before installing fixes.

This topic describes the steps to install fixes; it does not include information about how to prepare the production environment before you install fixes.

By using the update wizard, you can interact with each step in the procedure.

You can install multiple fixes in this procedure, by copying all fixes to a single location.

To install a fix in interactive mode, complete the following steps:

**Note:** A WAS admin user and password with a word space is not supported. You need to use a WebSphere Application Server admin user and password without a word space to install fixes.

1.  Stop all the clusters that host HCL Connections™ applications.

2.  If you are running on the Windows™ operating system, skip this step.

    Linux: Change permissions by running chmod on the updateInstaller file.

    1.  Navigate to the following directory: [connections\_root](../plan/i_ovr_r_directory_conventions.md) /opt/IBM/Connections.
    2.  Change directory to the following directory: /opt/IBM/Connections/updateInstaller.
    3.  Run chmod ugo+x \*
3.  Start the installation wizard from the updateInstaller directory in the [connections\_root](../plan/i_ovr_r_directory_conventions.md) directory and run the following script:

    -   Linux: ./updateWizard.sh
    -   Microsoft Windows:updateWizard.bat
4.  On the Welcome page, click **Next** to continue.

5.  Enter the location of the fixes in the **Fix location** field, or click **Browse** to navigate to the location of the fixes and then click **Next**. The update wizard scans the location for fixes.

6.  Select the check boxes of the fixes that you want to install and then click **Next**.

7.  Confirm whether you backed up any customizations that you made to the Connections interface. This input does not validate any such backup; it is just a reminder to consider backing up any customizations because updates to your deployment might overwrite your customizations.

8.  Enter the WebSphere® Application Server Deployment Manager administrator ID and password for each application and then click **Next**.

9.  Review the information that you entered. To edit your input, click **Back**. To start the update, click **Next**. The installation process can take up to 10 minutes to complete.

10. Review the result of the update. Click **Finish** to exit the wizard.

11. Shut down the node agent, manually remove the temp directory and then restart the node agent to remove the contents of the WebSphere Application Server temp directory. An example of the temp directory is app\_server\_root/profiles/AppSrv01/temp.

12. Perform a full synchronization to push the update to all nodes.


The log files that are created by the wizard are located under the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/version/log directory.

**Note:** Check the <timestamp\>\_<fix name\>\_<feature name\>\_install.log to find the `Build Successful` message near the end of the file. If this message exists, you installed fixes successfully. Otherwise, uninstall the fix and then install again.

Your Connections deployment was updated. To check the logs, go to the [IM\_root](../plan/i_ovr_r_directory_conventions.md) directory and open the applicationUpdate.log file, where application is the name of an Connections application.

**Note:** If you receive an installation failed message for any of the components in the summary screen, check the installation logs. Next, resynchronize the nodes, and then rerun the updateInstaller wizard. The components that were previously marked as `failed` should be eligible for upgrade. Processing this upgrade for the components should succeed on the second attempt. If it fails a second time, contact your HCL vendor.

**Parent topic:**[Installing fixes](../migrate/c_installing_interim_fixes.md)

