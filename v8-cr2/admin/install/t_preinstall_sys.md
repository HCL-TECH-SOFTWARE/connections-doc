# Verifying disk space and open file limits before installing HCL Connections {#settingupthesystemfordiskspaceandopenfiles .task}

On all operating systems, ensure that you have 6 GB of temporary disk space. On Linux™, set the Open File Descriptor limit to at least 40000 before installing HCL Connections.

1.  Check that the `/tmp` folder on UNIX/Linux systems or the `%TEMP%` folder on Windows™ systems has at least 6 GB before installing Connections Content Manager. If there is not sufficient disk space, then set the environment variable `IATEMPDIR` to point to the location where there is at least 6 GB. To update the `IATEMPDIR` environment variable:

    -   On Windows:
        1.  Navigate to **Control Panel** \> **System and Security** \> **System** \> **Advanced System Properties** \> **Advanced tab** \> **Environment variables**.
        2.  Click **New** in the **System variables** section.
        3.  Enter `IATEMPDIR` for the variable name; and then enter the desired location in the variable value field.
        4.  Click **OK** twice.
    -   On Linux:
        1.  Edit the `/etc/profile` file and add in the following line to the end of the file:

            ```
            export IATEMPDIR=<new location> 
            ```

            where `<new location>` is a location on your machine that has enough free space \(at least 6 GB, preferably more\).

2.  \(Linux only\) The Open File Descriptor limit must be set to at least 40000 for the user ID that is installing HCL Connections.

    -   Open a command line to view the current Open File Descriptor limit:

        ```
        ulimit -n
        ```

    -   If the number is less than 40000, increase the number for the user.

        If you are installing as the root user, add the following line to the user's profile file and save the file:

        ```
        ulimit -n 40000
        ```

        If you are using a non-root user account to install HCL Connections, ask the administrator to add the following line to the `/etc/security/limits.conf` file:

        ```
        non-root_account hard nofile 40000
        ```

!!! note 
    On small deployments where the database server is on the same machine, the limit might need to be higher, as specified by the database's requirements.


**Parent topic:**[Pre-installation tasks](../install/c_preinstall_actions.md)

