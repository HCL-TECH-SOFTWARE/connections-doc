# updateSilent command {#r_updatelc_command .reference}

Use the updateSilent command to run the update wizard in silent mode.

## Purpose { .section}

The updateSilent command:

-   Installs fixes
-   Uninstalls fixes
-   Reports on the current state of applied fixes

**Note:** The updateSilent command was called the updateLC command in previous releases of HCL Connections™.

## Command { .refsyn}

updateSilent.\{sh\|bat\}

## Parameters { .section}

-?
:   Displays command usage information.

/?
:   Displays command usage information.

-fix
:   Identifies the update as fix update.

-fixDetails
:   Instructs the command to display fix detail information.

-fixDir<directory\>
:   Specifies the fully qualified directory to which you downloaded the fixes. The recommended directory is [connections\_root](../plan/i_ovr_r_directory_conventions.md)/update/fixes.

-fixes<fix1\><fix2\>
:   Specifies a list of space-delimited fixes to install or uninstall.

-help
:   Displays command usage information.

/help
:   Displays command usage information.

-install
:   Installs the update.

-installDir<directory\>
:   Specifies the fully qualified installation root of the Connections product. By default, this directory is [connections\_root](../plan/i_ovr_r_directory_conventions.md).

    **Note:** If you are applying fixes to an applications in a cluster, apply the fix to the first node and then do a full synchronization to push the fix to the other nodes.

-uninstall
:   Uninstalls the identified fix.

-uninstallAll
:   Uninstalls all applied fixes.

-usage
:   Displays command usage information.

-wasPassword<password\>
:   Required to install or uninstall. Identifies the succeeding text as a WebSphere® Application Server Deployment Manager administrative user password.

-wasUserId<AdminUserId\>
:   Required to install or uninstall. Specifies the user ID of the WebSphere Application Server administrative user.

-featureCustomizationBackedUp<backup\_status\>
:   Confirms whether you backed up any customizations that you made to the Connections interface. The possible values are yes\|no. This parameter does not validate any such backup; it is just a reminder to consider backing up any customizations because updates to your deployment could overwrite your customizations.

## Syntax { .refsyn}

Use the specified syntax to perform the following common tasks:

-   To display command usage information:

    ```
    updateSilent -help | -? | /help | /? | -usage
    ```

-   To process a fix:

    ```
    updateSilent -installDir <[connections\_root](../plan/i_ovr_r_directory_conventions.md)>
    -fix
    -fixDir <[connections\_root](../plan/i_ovr_r_directory_conventions.md)/update/fixes> 
    -install | -uninstall | uninstallAll
    -fixes <space-delimited list of fixes>
    -wasUserId <AdminUserId> -wasPassword <AdminPwd>
    [-configProperties "property file name and path"]
    [-fixDetails]
    -featureCustomizationBackedUp yes
    ```

-   To display a list of applied fixes:

    ```
    updateSilent -fix 
    -installDir <[connections\_root](../plan/i_ovr_r_directory_conventions.md)>
    ```

-   To display a list of available fixes:

    ```
    updateSilent -fix 
    -installDir <[connections\_root](../plan/i_ovr_r_directory_conventions.md)>
    -fixDir <[connections\_root](../plan/i_ovr_r_directory_conventions.md)/update/fixes> 
    
    ```


## Examples { .example}

The following examples demonstrate how to perform common tasks with the updateSilent command. They assume the following conditions:

-   The location of the update wizard is: C:\\IBM\\Connections\\update

-   The Connections installation root is:C:\\IBM\\Connections
-   The fix repository is: C:\\IBM\\Connections\\updateInstaller\\fixes

**Note:** The examples include carriage returns after each parameter to make the example easier to read. When using the command, do not add carriage returns after the parameters.

To install a collection of fixes:

```
	C:\IBM\Connections\updateInstaller 
	updateSilent -fix 
	-installDir "C:\IBM\Connections" 
	-fixDir "C:\IBM\Connections\updateInstaller\fixes" 
	-install -fixes Fix1 Fix2
	-wasUserId wsadmin -wasPassword wspwd
	-featureCustomizationBackedUp yes
```

To install a collection of fixes and display fix details:

```
	C:\IBM\Connections\updateInstaller 
	updateSilent -fix 
	-installDir "C:\IBM\Connections" 
	-fixDir "C:\IBM\Connections\updateInstaller\fixes" 
	-install -fixes Fix1 Fix2 -fixDetails
	-wasUserId wsadmin -wasPassword wspwd
	-featureCustomizationBackedUp yes
```

To uninstall a collection of fixes:

```
	C:\IBM\Connections\updateInstaller 
	updateSilent -fix 
	-installDir "C:\IBM\Connections" 
	-fixDir "C:\IBM\Connections\updateInstaller\fixes" 
	-uninstall -fixes Fix1 Fix2
	-wasUserId wsadmin -wasPassword wspwd
	-featureCustomizationBackedUp yes
```

To display a list of fixes:

```
	C:\IBM\Connections\updateInstaller
	updateSilent -fix
	-installDir "C:\IBM\Connections" 
```

To display a list of fixes available in the repository:

```
	C:\IBM\Connections\updateInstaller
	updateSilent -fix 
	-installDir "C:\IBM\Connections" 
	-fixDir "C:\IBM\Connections\updateInstaller\fixes"
```

**Parent topic:**[Installing fixes](../migrate/c_installing_interim_fixes.md)

