# Uninstalling in silent mode {#t_inst_uninstall_in_silent_mode .task}

To run Installation Manager in silent mode, run the following command from the eclipse subdirectory in the directory where you installed Installation Manager:

-   Windows®: IBMIMc.exe --launcher.ini silent-install.ini -input <response file path and name\> -log <log file path and name\>
-   Linux® or UNIX®:./IBMIM --launcher.ini silent-install.ini -input <response file path and name\> -log <log file path and name\>

Windows™ does not support using IBMIM.exe for silent installation. Use IBMIMc.exe for silent installation.

For example:

-   Windows:IBMIMc.exe --launcher.ini silent-install.ini -input <LC\_HOME\>\\silentResponseFile\\LC\_uninstall.rsp -log .\\silent\_uninstall\_log.xml
-   Linux™ or UNIX™:./IBMIM --launcher.ini silent-install.ini -input <LC\_HOME\>/silentResponseFile/LC\_uninstall\_linux.rsp -log ./silent\_uninstall\_log.xml

The Installation Manager has an initialization or .ini file, silent-install.ini, that includes default values for the arguments. An example of a silent-install.inifile is as follows:

```
-accessRights
admin
-vm
C:\Program Files\IBM\Installation Manager\eclipse\jre_5.0.2.sr5_20070511\jre\bin\java.exe
-nosplash
--launcher.suppressErrors
-silent
-vmargs
-Xquickstart
-Xgcpolicy:gencon
```

When the installation is successful, check the<LC\_HOME\>/logs/<feature\>uninstall.log for a return status of "0". An unsuccessful operation returns a non-zero number. When the Installation Manager installer is run, it reads the response file and \(optionally\) writes to a log file to the directory specified. If you specified a log file and directory, the log file is empty when the operation is successful, for example:

```
<?xml version="1.0" encoding="UTF-8"?>
<result>
</result>
```

The log file contains an error element if the operation did not complete successfully. A log file for Installation Manager is also available. The default locations for the Installation Manager log file are as follows:

-   For Windows as an administrator: C:\\Documents and Settings\\All Users\\Application Data\\IBM\\Installation Manager\\logs
-   For Windows as a non-administrator: C:\\Documents and Settings\\<my id\>\\Application Data\\IBM\\Installation Manager\\logs
-   Linux or UNIX: /var/ibm/InstallationManager/logs

**Parent topic:**[Uninstalling](../install/t_uninstall_over.md)

