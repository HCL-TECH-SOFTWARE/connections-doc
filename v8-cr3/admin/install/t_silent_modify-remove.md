# Removing applications in silent mode {#t_silent_modify_remove .task}

Silently remove applications from your deployment of HCL Connections.

Create a response file for this task by running a simulated modification. Response files are provided for silent installations on Linux™. For silent installations on Microsoft™ Windows™, refer to the topics [Installing in console mode](t_install_console-mode.md) and [Modifying the installation in console mode](t_modify_installation_console.md) .

Instead of generating a new response file, you can edit the default response file that is provided with the product. However, if you edit the default response file, you need to add encrypted passwords to the file. For more information, see the [Creating encrypted passwords for a response file](t_silent_create_encrypted_passwords.md) topic.

A silent modification uses a response file to automate the removal of applications from your deployment.

To perform a silent modification, complete the following steps:

1.  Open a command prompt and navigate to the [IM\_root](../plan/i_ovr_r_directory_conventions.md)/eclipse/tools directory.

2.  Enter the following command: ./imcl -input response\_file -log log\_file -acceptLicense

    **Note:** The [IM\_root](../plan/i_ovr_r_directory_conventions.md)/eclipse directory contains a similar file called IBMIM.exe but that file is not suitable for silent installation.

    where response\_file is the full path and name of the response file and log\_file is the full path and name of the log file. The default name of the response file is LC.rsp. By default, the response file is in [connections\_root](../plan/i_ovr_r_directory_conventions.md).

    Compare the following example to your environment: ./imcl -input <connections\_root\>/silentResponseFile/LC\_modify\_remove\_linux.rsp -log /mylog/silent\_install\_log.xml -acceptLicense.


**Parent topic:**[Modifying the installation in silent mode](../install/t_modify_installation_silent.md)

