# Uninstall the Tiny Editors Integration on Linux or Unix {#uninst-editors-uninstall-on-linux-unix-or-aix .task}

Running the uninstaller script will automate the removal of the Tiny Editors Integration on Linux or Unix.

**Before you begin:**

-   Determine the host\_name of the server hosting HCL Connections™.
-   Get user access as the HCL Connections installer or higher administrative permissions, on both:
    -   The host server.
    -   The WebSphere Application Server Console.

1.  Determine the Connections paths \(customization\_path and provision\_path\).

    1.  Log in to the web interface of the WebSphere Application Server Console.

        The default address is: https://host\_name:9043/ibm/console

    2.  Expand **Environment** and click the **WebSphere variables** link.

        ![WebSphere Variables link](resource/was/environment_websphere_variables.png)

    3.  Find the **CONNECTIONS\_CUSTOMIZATION\_PATH** in the variables list and record the value which will be referred to as customization\_path from this point.

        ![Connections customization path variable](resource/was/environment_websphere_variables_customization_path.png)

    4.  Find the **CONNECTIONS\_PROVISION\_PATH** in the variables list and record the value which will be referred to as provision\_path from this point.

        ![Connections provision path variable](resource/was/environment_websphere_variables_provision_path.png)

    !!! attention
        
        We strongly recommend:

        -   Setting up SSH key access to the Connections host server.
        -   Using a local SSH agent to avoid password prompts when logging in via SSH.
        
        The following script makes numerous connections, and connection prompts for a password if SSH keys are not used.

2.  Run the uninstall script located in the root directory of the Tiny Editors for HCL Connections package as follows:

    ```
    ./uninstall.sh user@host\_name customization\_path provision\_path/webresources 
    ```

    !!! note 
        
        This command will automatically backup any existing configuration it finds in

        -   customization\_path/javascript/tiny/editors/connections
        -   customization\_path/javascript/ephox/editors/connections
        -   customization\_path/javascript/ephox/editlive/connections

    If you do not wish for a backup to be created run the uninstall script with the optional `--no-backup` parameter, for example:

    ```
    ./uninstall.sh --no-backup user@host\_name customization\_path provision\_path/webresources 
    ```

    ```
    ./uninstall.sh root@p-ce-conncr5-01 /shared_content/customization /shared_content/provision/webresources
    
    Removing Tiny Editors for HCL Connections from root@p-ce-conncr5-01
    
    Deleting integration code...
    
    Existing configuration detected. Backing up and removing:
      from: /shared_content/customization/javascript/tiny/editors/connections
       to:  /shared_content/customization/javascript/tiny/editors/tiny-editors-connections-backup-2019-08-21_14:17
    
    
    Uninstall complete
    
    For the changes to take effect, please perform the required post-customization step, as described in
      https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html
    ```

3.  Follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

4.  Verify the uninstall by browsing to the edit screen for a wiki or blog to verify that the Tiny editors are not being loaded and that it has reverted to the default editor.

    !!! note 
        
        If after performing this step Tiny Editors for HCL Connections is still available then [restarting the Common enterprise application](t_restart-common-app.md) may be necessary to force a cache update.


**Parent topic:** [Uninstalling Tiny Editors Integration](t_03-uninst_01-editors_00-summary.md)

