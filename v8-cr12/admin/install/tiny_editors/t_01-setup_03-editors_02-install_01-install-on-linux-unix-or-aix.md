# Install on Linux or Unix {#setup-editors-install-install-on-linux-unix-or-aix .task}

The installation of Tiny Editors for HCL Connections on Linux or Unix is automated using a shell script.

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

2.  Run the `install.sh` script located in the root directory of the Tiny Editors for HCL Connections package as follows:

    ```
    ./install.sh user@host\_name customization\_path provision\_path/webresources 
    ```

    !!! caution

        Remember to append /webresources to the provision\_path in the above command.

    !!! note 
    
        This command will automatically backup any existing configuration it finds in

            -   customization\_path/javascript/tiny/editors/connections
            -   customization\_path/javascript/ephox/editors/connections
            -   customization\_path/javascript/ephox/editlive/connections

    If a backup of configurations is not required, run the install script with the optional `--no-backup` parameter, for example:

    ```
    ./install.sh --no-backup user@host\_name customization\_path provision\_path/webresources
    ```

    ```
    ./install.sh root@p-ce-conncr5-01 /shared_content/customization /shared_content/provision/webresources
    Please read and accept the license agreement to continue.
    Use up and down arrow keys to scroll. For other commands please run 'man more' at your shell prompt.
    
    International Program License Agreement
    
    **\*\*LICENSE TEXT OMITTED FOR BREVITY\*\***
    
    Do you accept the terms and conditions outlined in the licence agreement? (Y/N): Y
    
    Installing Tiny Editors for HCL Connections to root@p-ce-conncr5-01
    
    Note: We recommend setting up ssh key access otherwise this process will prompt for the ssh password several times.
    
    Deploying editor to /shared_content/provision/webresources
    ---------------------
    sending incremental file list
    .d..t...... ./
    <f+++++++++ tiny.editors.connections_4.0.1.3.jar
              3.82M 100%  164.35MB/s    0:00:00 (xfr#1, to-chk=0/2)
    ---------------------
    Deploying configuration to /shared_content/customization/javascript/tiny/editors/connections
    ---------------------
    .d..t...... ./
    <f+++++++++ config.js
    <f+++++++++ tiny-editors-lite.css
    <f+++++++++ tiny-editors.css
    ---------------------
    
    Install complete.
    
    For the changes to take effect, please perform the required post-customization step, as described in
      https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html
    
    And then restart the Common.ear webapp.
    ```

3.  Follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

4.  Verify the install:

    1.  Browse to the following URL: http://host\_name\_and\_port/connections/resources/web/tiny.editors.connections/verify.html

        If the installation was successful, a confirmation message appears alongside the installed version numbers.

    2.  Browse to the edit screen for a wiki or blog.

        If the installation was successful, the Tiny editors will be loaded.

    !!! note
    
        If Tiny Editors for HCL Connections is not available, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Installing Tiny Editors integration](t_01-setup_03-editors_02-install_00-summary.md)

