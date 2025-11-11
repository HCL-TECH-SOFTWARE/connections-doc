# Install on Windows {#setup-editors-install-install-on-windows .task}

The Window installation uses a Windows installer program.

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

2.  Stop the **Common** WebSphere enterprise application.

    1.  Log in to the web interface of the WebSphere Application Server Console.

        The default address is: https://host\_name:9043/ibm/console

    2.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

        ![Websphere enterprise applications link](resource/was/applications_applications.png)

    3.  Select the checkbox for **Common** from the list of applications and click **Stop**.

        ![Stop the Common application](resource/was/applications_common_stop.png)

        ![Message shown when the Common application is stopped](resource/was/applications_common_stopped.png "Dialog shown when Common application is stopped")

3.  Run `install.exe`.

    The installer, `install.exe`, is located in the root directory of the Tiny Editors for HCL Connections package.

    !!! note 
        
        The installer may require System Administrator privileges. If prompted, click **Yes**.

    ![Windows User Access Control prompt requesting installation privileges](resource/install/windows_install_01.png "Accept UAC prompt")

4.  Click **Next** on the Welcome screen.

    ![Installer Welcome screen](resource/install/windows_install_02.png)

5.  Review the license agreement, select **I accept the agreement** and click **Next**.

    ![Installer license agreement screen](resource/install/windows_install_03.png)

6.  Add the customization\_path and provision\_path to the relevant input fields and continue.

    !!! note 
        
        Default paths are initially provided.

    1.  Input the provision\_path with \\webresources appended, into the **Web Resources Provisioning** field.

    2.  Input customization\_path into the **Customization** field.

    3.  Click **Next**.

    ![Installer paths screen](resource/install/windows_install_04.png)

7.  Review the installation details and click **Install**.

    ![Installer review screen](resource/install/windows_install_05.png)

8.  Once the installation process is completed, click **Finish**.

    ![Installer summary screen](resource/install/windows_install_06.png)

9.  Follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

10. Start the **Common** WebSphere enterprise application.

    1.  Log in to the web interface of the WebSphere Application Server Console.

        The default address is: https://host\_name:9043/ibm/console

    2.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

        ![Websphere enterprise applications link](resource/was/applications_applications.png)

    3.  Select the checkbox for **Common** from the list of applications and click **Start**.

        ![Start the Common application](resource/was/applications_common_start.png)

        ![Message shown when the Common application is started](resource/was/applications_common_started.png "Dialog shown when Common application is started")

11. Verify the install:

    1.  Browse to the following URL: http://host\_name\_and\_port/connections/resources/web/tiny.editors.connections/verify.html

        If the installation was successful, a confirmation message appears alongside the installed version numbers.

    2.  Browse to the edit screen for a wiki or blog.

        If the installation was successful, the Tiny editors will be loaded.

    !!! note 
        
        If Tiny Editors for HCL Connections is not available, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Installing Tiny Editors integration](t_01-setup_03-editors_02-install_00-summary.md)

