# Uninstall the Tiny Editors Integration on Windows {#uninst-editors-uninstall-on-windows .task}

Running the uninstall program will remove the Tiny Editors integration on Windows.

1.  Stop the **Common** WebSphere enterprise application.

    1.  Log in to the web interface of the WebSphere Application Server Console.

        The default address is: https://host\_name:9043/ibm/console

    2.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

        ![Websphere enterprise applications link](resource/was/applications_applications.png)

    3.  Select the checkbox for **Common** from the list of applications and click **Stop**.

        ![Stop the Common application](resource/was/applications_common_stop.png)

        ![Message shown when the Common application is stopped](resource/was/applications_common_stopped.png "Dialog shown when Common application is stopped")

2.  Navigate to **Programs** \> **Uninstall a program** in Control Panel.

    ![Control Panel](resource/install/windows_uninstall_01.png)

3.  Select the Tiny Editors for HCL Connections entry and click **Uninstall**.

    ![Programs and Features listing](resource/install/windows_uninstall_02.png)

4.  If prompted for System Administrator privileges, click **Yes**.

    ![UAC prompt](resource/install/windows_uninstall_03.png)

5.  Click **Yes** at the prompt and allow the installer to complete the uninstall.

    ![Confirm uninstall](resource/install/windows_uninstall_04.png)

    ![Uninstalling](resource/install/windows_uninstall_05.png "Dialog shown while Tiny Editors for HCL Connections is uninstalling")

6.  Click **OK** to close the uninstaller.

    ![Message saying uninstall was successful](resource/install/windows_uninstall_06.png)

7.  Start the **Common** WebSphere enterprise application.

    1.  Log in to the web interface of the WebSphere Application Server Console.

        The default address is: https://host\_name:9043/ibm/console

    2.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

        ![Websphere enterprise applications link](resource/was/applications_applications.png)

    3.  Select the checkbox for **Common** from the list of applications and click **Start**.

        ![Start the Common application](resource/was/applications_common_start.png)

        ![Message shown when the Common application is started](resource/was/applications_common_started.png "Dialog shown when Common application is started")


**Parent topic:** [Uninstalling Tiny Editors Integration](t_03-uninst_01-editors_00-summary.md)

