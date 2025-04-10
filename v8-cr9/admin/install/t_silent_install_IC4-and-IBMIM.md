# Installing HCL Connections and IBM Installation Manager in silent mode {#t_silent_install_IC4_plus_IBMIM .task}

Use a silent installation to perform an identical installation of HCL Connections and IBM® Installation Manager on multiple systems.

This task assumes that IBM Installation Manager is not installed on your system.

Ensure that you complete all the prerequisite tasks that are relevant for your environment. For more information, see the [Before installing](r_before_installing.md) topic.

**Note:** However, do not complete the prerequisite tasks that relate to IBM Installation Manager.

Edit the default response file to suit your environment. For more information, refer to [Using the default response file](t_silent_install_edit_response.md).

Using a response file for your intended deployment, install HCL Connections on multiple systems without needing to interact with the installation wizard.

To perform a silent installation, complete the following steps:

1.  Open a command prompt and go to the location of the silent installation file. The file is stored in the HCL\_Connections\_set-up/HCL\_Connections\_Install/IM/OS directory, whereHCL\_Connections\_set-up is the directory or media where the HCL Connections installation files are located and OS represents your operating system

    **Note:** To change the paths to the response file and log file, edit the lc\_install.ini file. The file is located in the HCL\_Connections\_set-up/HCL\_Connections\_Install/IM/OS directory.

2.  Run the silent installation script:

    -   Linux™ \(root user\): ./installc -input response\_file -log log\_file -acceptLicense
    -   Linux \(non-root user\): ./userinstc -input response\_file -log log\_file -acceptLicense
    -   Windows™ \(administrator\): installc.exe -input response\_file -log log\_file -acceptLicense
    -   Windows \(non-administrator\): userinstc.exe -input response\_file -log log\_file -acceptLicense
    where response\_file is the full path and name of the response file and log\_file is the full path and name of the log file. The default name of the file is LC.rsp.

    By default, the response file is stored in the HCL\_Connections\_set-up\\HCL\_Connections\_Install\\IM directory on the installation media.


Complete any applicable post-installation tasks. For more information, see the [Post-installation tasks](r_post-installation_tasks.md) topic.

Refer to [Post-Installation tasks](r_post-installation_tasks.md) for more information.

**Parent topic:**[Installing silently](../install/c_install_silent.md)

