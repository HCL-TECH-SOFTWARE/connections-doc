# Performing a silent installation {#t_files_windows_silent_install .task}

Administrators can silently upgrade or install the HCL Connections Desktop Plug-ins for Microsoft™ Windows™ from the command prompt. User notification is disabled during the silent installation, except in error cases such as notification of failed prerequisites.

A silent installation uses the same installation program that the graphical user interface \(GUI\) version uses. However, instead of displaying a wizard interface, the silent installation reads all of your responses from parameters that you pass to the command line. In order for the installation to work successfully, you must run the silent installation from the directory where you extracted the plug-in files.

1.  Download the plug-in from the [My HCLSoftware](https://my.hcltechsw.com/) site download package, the link for which is found in [HCL Article KB0073986](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073986).

2.  Extract the file.

3.  Open a command prompt and navigate to the directory where you saved IBMConnectionsMSDeskTop.exe.

4.  Type `IBMConnectionsMSDeskTop.exe /Options(s) [PROPERTY=Value]` The optional parameters and public property settings are listed in the following tables:

    |Optional parameters|Description|
    |-------------------|-----------|
    |/install|Install the plug-in.|
    |/uninstall|Uninstalls the plug-in.|
    |/quiet|Establishes Silent mode, which requires no user interaction.|
    |/norestart|Prevents restart after the installation is complete.|
    |/promptrestart|Prompts the user for restart if necessary.|
    |/forcerestart|Always restarts the computer after installation.|

    |Public property|Description|
    |---------------|-----------|
    |INSTALLDIR|Directory where plug-ins are installed. For example,    ```
INSTALLDIR=C:\Progra~1\IBM\Connections Desktop Plugins
    ```

|
    |ADDLOCAL|Optionally install components. If nothing is specified, all components are installed. The Windows Explorer feature is required and is always installed. Examples:    -   To silently install just the Microsoft Windows Explorer feature:

        ```
IBMConnectionsMSDeskTop.exe /install /quiet ADDLOCAL=WindowsExplorer

        ```

    -   To silently install the Microsoft Office feature:

        ```
IBMConnectionsMSDeskTop.exe /install /quiet ADDLOCAL=WindowsExplorer,MicrosoftOffice
        ```

    -   To silently install the Microsoft Outlook feature:

        ```
IBMConnectionsMSDeskTop.exe /install /quiet ADDLOCAL=WindowsExplorer,MicrosoftOutlook

        ```

    -   To disable Connections 3.0 or 3.01 features on Microsoft Window Explorers desktop:

        ```
IBMConnectionsMSDeskTop.exe /install /quiet DSB_MS30X_EXPLORER

        ```

    -   To disable Connections 3.0 or 3.01 features on Microsoft Window Explorers and install the Connections 4.5 plug-ins features for Windows Explorer:

        ```
IBMConnectionsMSDeskTop.exe /install /quiet ADDLOCAL=WindowsExplorer DSB_MS30X_EXPLORER
        ```

|
    |DSB\_MS30X\_EXPLORER|If you previously installed an earlier version of the HCL Connections Desktop Plug-ins for Microsoft Windows, this option disables rather than uninstalls plug-in features. If this option is not specified, the earlier features are uninstalled silently.     -   To disable Windows Explorer features of the IBM Connections Desktop Plug-ins for Microsoft Windows and install all components of the Connections 5.0 plug-in:

        ```
IBMConnectionsMSDeskTop.exe /install /quiet DSB_MS30X_EXPLORER

        ```

    -   To disable Windows Explorer features of the HCL Connections 3.0 or 3.0.1 plug-in and install the Windows Explorer feature of Connections 5.0 plug-in:

        ```
IBMConnectionsMSDeskTop.exe /install /quiet ADDLOCAL=WindowsExplorer DSB_MS30X_EXPLORER
        ```

|

    |Description|Example|
    |-----------|-------|
    |Silent installation with restart and INSTALLDIR property|    ```
IBMConnectionsMSDesktop.exe /install /quiet /forcerestart
INSTALLDIR=C:\Progra~1\IBM\Sample

    ```

|
    |Silent uninstall with no restart|    ```
IBMConnectionsMSDesktop.exe /uninstall /quiet /norestart 
    ```

|

5.  Reboot the computer.


**Parent topic:**[HCL Connections Desktop Plug-ins for Microsoft Windows](../../connectors/enduser/c_files_window_install_ovr.md)

