# Installing the HCL Connections Plug-ins for HCL Notes {#outlook_connector_install .concept}

Install the HCL Connections Plug-ins for HCL Notes to access Files, Activities, Status Updates and business card integration from your Notes client.

There are two ways to install the HCL Connections Plug-ins for HCL Notes. A user can install plug-ins for a Notes® client using the InstallShield wizard, or an administrator can perform a silent installation for all plug-in users.

## Installing the Plug-ins on a Windows™ client { .section}

Install the plug-ins so that the HCL Connections features are integrated with the Notes client

1.  Download the plug-in from the [My HCLSoftware](https://my.hcltechsw.com/) site [download package](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0074310)
2.  Extract ConnectionsAddonInstaller.zip and click Setup.exe.
3.  Make sure your Notes client is closed before beginning the installation.
4.  Accept installation prompts for installing the plug-ins.
5.  Click **Finish** to complete the installation.

## Silently installing the HCL Connections Plug-ins \(Windows\) { .section}

Administrators can silently install the Connections plug-ins from the command prompt. A silent installation uses the same installation program that the graphical user interface \(GUI\) version users. However, instead of displaying a wizard interface, the silent installation reads all your responses from parameters that you pass to the command line. In order for the installation to work successfully, you must run the silent installation from the directory where you extracted the plug-ins files.

1.  Make sure your Notes client is closed before beginning the installation.
2.  Open a command window. For example, choose **Run** from the Microsoft™ Windows Start menu and type cmd, then click **OK**.
3.  Specify the path for the downloaded and unzipped installation file for the plug-in. For example, c:\\<download\_folder\>.
4.  Enter setup.exe /s /v" /qn" to begin the installation.

## Installing the Plug-ins on a Mac client { .section}

Install the Mac version of the HCL Connections Plug-ins for Notes so that it is integrated with the Notes client.

Consider the following before you install:

-   If you run the unsigned installer on Mac 10.7.5 or newer, turn off the GateKeeper first before running the installer. To turn off the GateKeeper, got to **System Preferences** \> **Security & Privacy** and Click **Anywhere** as the value for **Allow applications downloaded from**.
-   If you are installing a subset of the plug-ins with the signed installer on Mac 10.7.5 or later, turn off GateKeeper, then delete the \_CodeSignature from xpd.addon-mac.pkg/Contents/\_CodeSignature.

1.  Download the HCL Connections Plug-ins for Notes from the Connections catalog at the following web site: [https://xspy.mybluemix.net](https://xspy.mybluemix.net)
2.  Extract ConnectionsAddonInstaller\_Mac.zip.
3.  Make sure your Notes client is closed before beginning the installation.
4.  Double-click xpd.mac-addon.pkg to launch the installation program.
5.  Accept installation prompts for installing the plug-ins.
6.  Click **Finish** to complete the installation.

## Silently installing the HCL Connections Plug-ins \(Mac\) { .section}

Administrators can silently install the Connections Files plug-in from the command prompt. A silent installation uses the same installation program that the graphical user interface \(GUI\) version users. However, instead of displaying a wizard interface, the silent installation reads all your responses from parameters that you pass to the command line. In order for the installation to work successfully, you must run the silent installation from the directory where you unzipped the plug-in files.

1.  Make sure your Notes client is closed before beginning the installation.
2.  Open a terminal window and specify the path for the downloaded and unzipped installation file for the plug-ins. For example, /ConnectionsAddonInstaller\_Mac.
3.  Enter sudo Installer -pkg package name -target destination volume to begin the installation. Where:

    -   package name is xpd.addon-mac.pkg, the name of the installer.
    -   destination volume is the disk where Notes was installed.
    For example: sudo Installer -pkg xpd.addon-mac.pkg -target Macintosh\_HD

4.  Enter your password at the prompt to begin the installation. When the installation completes, a terminal message displays The installation was successful.

## Viewing the log files { .section}

If you encounter any errors during the installation or configuration process, review the log files for troubleshooting information.

On Windows, the logs for the plug-in are stored in the default temp directory for users. For example, on Windows XP, the directory is: C:\\documents and settings\\<username\>\\Local Settings\\temp\\rcp\_addon\_install.txt\\

To view the logs on a Mac, follow these steps.

1.  Change to the directory where Notes is installed.
2.  Navigate to /Contents/MacOS/rcp/deploy/instalHistory.
3.  Find the zip file. It's name will be similar to this: Notes\_8.5.3FP4\_ADDON\_INSTALL\_1311563867253.zip or Notes\_8.5.3FP4\_ADDON\_UNINSTALL\_1311572948964.zip.
4.  Extract the file and navigate to /colutil/tmp to access the log.

There is a configuration which can prevent users from uploading, downloading, or sharing files. Users will be able to view files, but, when trying to upload, download, or share a file will see this error message: "A problem with the server was encountered". This is most likely because an encrypted connection \(SSL\) setting called "Forced confidential" is enabled in the LotusConnections-config.xml file on the Connections server and it creates a conflict on the Notes client. To correct this problem, set the following Files configuration setting in the plugin\_customization.ini file. This setting applies to all versions of Notes.

1.  Open the plugin\_customization.ini file for the Notes client in a text editor. The file is stored in the following directory: <Notes Install\>/framework/rcp/plugin\_customization.ini

    **Note:** On Mac, your path might be different depending on where you installed Notes. For example, your path might be:

    /Applications/Notes.app\(or or Lotus Notes.app, IBM Notes.app or HCL Notes.app\)/Contents/MacOS/rcp/eclipse/features/plugin\_customization.ini

2.  Add this line:

    ```
     com.ibm.documents.connector.service/ENABLE_SSL=true
    ```


For detailed information on managing security settings, see this article on [Creating a Connections server document](http://www-12.lotus.com/ldd/doc/domino_notes/9.0/help9_admin.nsf/855dc7fcfd5fec9a85256b870069c0ab/7ffcd4b5af76d83385257b19005b3d4c?OpenDocument&Highlight=0,activities) in the Notes/Domino wiki.

**Parent topic:**[HCL Connections Plug-ins for HCL Notes](../../connectors/admin/files_plugin_install_overview.md)

