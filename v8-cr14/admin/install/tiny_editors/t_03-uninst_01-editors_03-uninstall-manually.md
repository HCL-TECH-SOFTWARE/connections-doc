# Uninstall the Tiny Editors Integration manually {#uninst-editors-uninstall-manually .task}

Uninstalling the Tiny Editors integration manually.

**Before you begin:**

-   Determine the host\_name of the server hosting HCL Connections™.
-   Get user access as the HCL Connections installer or higher administrative permissions, on both:
    -   The host server.
    -   The WebSphere Application Server Console.

1.  Stop the **Common** WebSphere enterprise application.

    1.  Log in to the web interface of the WebSphere Application Server Console.

        The default address is: https://host\_name:9043/ibm/console

    2.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

        ![Websphere enterprise applications link](resource/was/applications_applications.png)

    3.  Select the checkbox for **Common** from the list of applications and click **Stop**.

        ![Stop the Common application](resource/was/applications_common_stop.png)

        ![Message shown when the Common application is stopped](resource/was/applications_common_stopped.png "Dialog shown when Common application is stopped")

2.  Determine the Connections paths \(customization\_path and provision\_path\).

    1.  Log in to the web interface of the WebSphere Application Server Console.

        The default address is: https://host\_name:9043/ibm/console

    2.  Expand **Environment** and click the **WebSphere variables** link.

        ![WebSphere Variables link](resource/was/environment_websphere_variables.png)

    3.  Find the **CONNECTIONS\_CUSTOMIZATION\_PATH** in the variables list and record the value which will be referred to as customization\_path from this point.

        ![Connections customization path variable](resource/was/environment_websphere_variables_customization_path.png)

    4.  Find the **CONNECTIONS\_PROVISION\_PATH** in the variables list and record the value which will be referred to as provision\_path from this point.

        ![Connections provision path variable](resource/was/environment_websphere_variables_provision_path.png)

3.  Remove the integration configuration directory and all contained files from customization\_path/javascript/tiny/editors/connections.

4.  Perform additional cleanup by:

    1.  Removing any backup folders under customization\_path/javascript/tiny/editors such as:

        -   tiny-editors-connections-backup-time
        -   ephox-editors-connections-backup-time
        -   ephox-editlive-connections-backup-time
    2.  Removing the editors folder if it is now empty.

    3.  Removing the tiny folder if it is now empty.

    4.  Removing configuration files for older versions of the integration by removing customization\_path/javascript/ephox.

5.  Delete the integration jar file from provision\_path/webresources/tiny.editors.connections\_version.jar where version is the integration version number.

    !!! attention 
        
        When manually uninstalling on Microsoft Windows, you will be unable to delete the jar file if the **Common** enterprise application is running.

    !!! tip 
        
        You can also remove any jar named ephox.editors.connections\_oldVersion.jar which was the integration jar name before the 4.0.0 release.

6.  Follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

7.  Start the **Common** WebSphere enterprise application.

    1.  Log in to the web interface of the WebSphere Application Server Console.

        The default address is: https://host\_name:9043/ibm/console

    2.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

        ![Websphere enterprise applications link](resource/was/applications_applications.png)

    3.  Select the checkbox for **Common** from the list of applications and click **Start**.

        ![Start the Common application](resource/was/applications_common_start.png)

        ![Message shown when the Common application is started](resource/was/applications_common_started.png "Dialog shown when Common application is started")

8.  Verify the uninstall by browsing to the edit screen for a wiki or blog to verify that the Tiny editors are not being loaded and that it has reverted to the default editor.

    !!! note
        
        If after performing this step Tiny Editors for HCL Connections is still available then [restarting the Common enterprise application](t_restart-common-app.md) may be necessary to force a cache update.


**Parent topic:** [Uninstalling Tiny Editors Integration](t_03-uninst_01-editors_00-summary.md)

