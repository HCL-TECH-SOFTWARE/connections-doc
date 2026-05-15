# Installing fixes {#c_installing_interim_fixes .concept}

Use the update wizard in interactive or silent mode to install fixes.

## Prerequisites { .section}

Ensure that you meet the following prerequisites:

-   You set the WAS\_HOME environment variable.
-   If the DMGR profiles on which Connections is installed is not configured as default profile, run the following commands before run update installer command:
    -   Open a command line.
    -   Run the following command for Windows:

        ```
        <DMGR_HOME>\bin\setupCmdLine.bat
        ```

    -   Run the following command for Linux™ or System z®:

        ```
        . <DMGR_HOME>/bin/setupCmdLine.sh
        ```

        Where <DMR\_HOME\> is, for example: /opt/IBM/WebSphere/AppServer/profiles/Dmgr01

-   You downloaded the fix package. For more information, see [Downloading fixes](t_downloading_fixes.md).
-   \(Linux\) You have **rwx** permissions for the Deployment Manager profile directory that hosts HCL Connections™ applications.

You can run the update wizard in one of two modes:

Interactive mode
:   Confirm each step of the process. This mode is useful when you use the wizard for the first time or if you are updating a single installation.

Silent mode
:   Use a series of commands and parameters to start and run the wizard. Silent mode is useful when you are updating multiple installations of Connections.

-   **[Installing fixes in interactive mode](../migrate/t_install_interim-fix.md)**  
Install fixes with the update wizard in interactive mode.
-   **[Installing fixes in silent mode](../migrate/t_install_interim-fix_silent-mode.md)**  
Install fixes with the update wizard in silent mode.
-   **[updateSilent command](../migrate/r_updatelc_command.md)**  
Use the updateSilent command to run the update wizard in silent mode.

**Parent topic:** [Updating Connections 8.0 with the latest fixes](../migrate/c_updating_interim_fixes.md)

