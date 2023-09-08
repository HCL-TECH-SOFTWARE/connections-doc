# Creating a response file {#t_silent_install_create_response .task}

Use a response file to install, modify, update, or uninstall HCL Connections without user interaction.

You can create a response file by using IBM® Installation Manager or by editing the file that is provided with the product. For more information about editing the file, see the [The default response file](r_installresponse_file.md) topic.

Ensure that IBM Installation Manager is installed. For more information, see the [Installing HCL Connections](c_installing_overview.md) topic.

To ensure that the response file captures the details of your SSL certificates, start IBM WebSphere® Application Server.

The default location of a response file that you generate is the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/silentResponseFile directory.

Instead of creating your own response file, you can edit the file that is provided with the product. The file is in the HCL\_Connections\_set-up/HCL\_Connections\_Install/HCLConnections directory. However, this default file is applicable only for installation. The response files for modifying, updating, rolling back, and uninstalling the product are based on the response file for installation. Before you create a response file for any of those procedures, you must first run the silent installation procedure.

For more information about creating response files with IBM Installation Manager, go to the [Recording a response file with Installation Manager](https://www.ibm.com/docs/installation-manager/1.8.5?topic=files-recording-response-file-installation-manager) in the IBM documentation.

This task describes the procedure to generate a response file for the following procedures:

-   Installing HCL Connections
-   Modifying an existing installation by adding or removing HCL Connections applications
-   Updating an existing installation by installing a fix pack
-   Rolling back an update
-   Uninstalling HCL Connections

For each procedure, run a simulated instance of the IBM Installation Manager and record your input to a response file. Later, you can run a silent command that uses this response file as an input parameter.

Default response files on Linux:

Install
:   LC.rsp

Modify - Add
:   LC\_modify\_add.rsp

Modify - Remove
:   LC\_modify\_remove.rsp

Update
:   LC\_update.rsp

Roll back
:   LC\_rollback.rsp

Uninstall
:   LC\_uninstall.rsp

To create a response file, complete the following steps:

1.  Open a command prompt and go to the [*IM\_root*](../plan/i_ovr_r_directory_conventions.md)/eclipse directory.

2.  Ensure that the HCL\_Connections\_set-up/HCL\_Connections\_Install/IM/OS/skip directory allows write access, whereHCL\_Connections\_set-up is the directory or media where the HCL Connections installation files are located, and OS represents your operating system.

3.  Run the command to record a response file. This command uses the -skipInstall agentDataLocation argument, which records the installation commands without installing HCL Connections. Substitute your own file name and path for the response file. Verify that the file paths that you enter exist because IBM Installation Manager does not create directories for the response file.

    -   Linux:./IBMIM -record /response\_files/install\_product.xml -skipInstall agentDataLocation
    -   Microsoft Windows:IBMIM.exe -record responseFile.rsp -skipInstall agentDataLocation
    where agentDataLocation is the file path to the skip directory, which stores IBM Installation Manager data files.

    **Note:**

    -   The -log option is not available when recording a response file.
    -   Use quotation marks around file paths that contain spaces.
    -   You can use the same agentDataLocation parameter in the next recording session to update, modify, roll back or uninstall HCL Connections. However, if you want to record a new installation, you must specify a new agentDataLocation parameter.
4.  Enter the required information in the IBM Installation Manager.

    -   To install a new deployment, open **Files** \> **Preferences**, and enter the path to the HCL Connections repository; for example: C:\\build\\\\HCL\_Connections\_Install\\HCLConnections\\repository.config. Click **Install** and enter the required information as if you were installing the product. For more information, see the [Installing HCL Connections](c_installing_overview.md) topic.

        **Note:**

        The default path that is displayed for the Shared Resource Directory, C:\\Program Files\\IBM\\IBMIMShared, is incorrect. Make sure that change it to the correct path.

    -   To modify an existing installation, click **Modify** and enter the required information.

        -   To add applications, select the applications that you want to add in the Application Selection pane.

            **Note:** Ensure that all the currently installed applications are also selected.

        -   To remove applications, clear the check boxes of the applications that you want to remove in the Application Selection pane.
        For more information, see the [Modifying the installation in interactive mode](t_modify_installation.md) topic.

    -   To update an existing installation, click **Update** and enter the required information.
    -   To roll back an update, click **Rollback** and enter the required information
    -   To uninstall HCL Connections, click **Uninstall** and enter the required information. For more information, see the [Uninstalling a deployment](t_uninstall_lotus_conxns_cluster.md) topic.
5.  Close the **IBM Installation Manager** window.

6.  Confirm that the new response file is present.


Use the response file to silently install, modify, update, roll back, or uninstall HCL Connections.

If you are running IBM Installation Manager as a non-administrator and plan to use the response file to install the product on another user's system, you must change the file paths in your response file from absolute paths to relative paths.

**Parent topic:**[The default response file](../install/r_installresponse_file.md)

