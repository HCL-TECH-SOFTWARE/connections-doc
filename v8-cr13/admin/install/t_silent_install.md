# Installing HCL Connections in silent mode \(with an existing IBM Installation Manager\) {#t_silent_install .task}

Use a silent installation to perform an identical installation of HCL Connections on multiple systems.

Ensure that you complete all the prerequisite tasks that are relevant for your environment. For more information, see the [Before installing](r_before_installing.md) topic.

Ensure that IBM® Installation Manager version 1.8.5.1 or later is installed on your system. If you have an earlier version, update it by running the following command from the folder <Connections\_installer\>/IM/<your\_platform\> :

-   Linux™:./install --launcher.ini silent-install.ini -log log\_file -acceptLicense

    For example: ./install --launcher.ini silent-install.ini -log root/mylogs/mylogfile.xml -acceptLicense


where log\_file is the name and path of the log file.

To prevent errors caused by using the wrong version of IBM Installation Manager, remove the following line from the default response file:

```
<offering id='com.ibm.cic.agent' version='1.7.1000.20131119_2219' profile='IBM Installation Manager' features='agent_core,agent_jre' installFixes='none'/>
```

**Note:** Installation Manager might ask you to upgrade the Installation Manager. HCL Connections bundles only the 64-bit, version 1.8.5.1 of Installation Manager. If you have an earlier version of Installation Manager that is 32-bit, you must upgrade it to version 1.8.5.1. To download that version, see [Installation Manager 1.8.5.1](http://www-01.ibm.com/support/docview.wss?uid=swg24042905).

To create a customized version of the default response file, run the installation wizard in interactive mode. For more information, see the [The default response file](r_installresponse_file.md) topic. Response files are provided for silent installations on Linux. On Windows, refer to the topics [Installing in console mode](t_install_console-mode.md) and [Modifying the installation in console mode](t_modify_installation_console.md) mode.

Using a response file for your intended deployment, install HCL Connections on multiple systems without needing to interact with the installation wizard.

To perform a silent installation, complete the following steps:

1.  Open a command prompt and navigate to the [IM\_root](../plan/i_ovr_r_directory_conventions.md)/eclipse/tools directory.

2.  Enter the following command: ./imcl -input response\_file -log log\_file -acceptLicense

    **Note:** The [IM\_root](../plan/i_ovr_r_directory_conventions.md)/eclipse directory contains a similar file called IBMIM.exe but that file is not suitable for silent installation.

    where response\_file is the full path and name of the response file and log\_file is the full path and name of the log file. The default name of the response file is LC.rsp. By default, the response file is in [connections\_root](../plan/i_ovr_r_directory_conventions.md)

    Compare the following example to your environment: ./imcl -input <connections\_root\>/silentResponseFile/LC.rsp -log /mylog/silent\_install\_log.xml -acceptLicense


Complete any applicable post-installation tasks. For more information, see the [Post-installation tasks](r_post-installation_tasks.md) topic.

**Parent topic:**[Installing silently](../install/c_install_silent.md)

