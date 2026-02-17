# Configuring the Tiny Editors Selector editor priority {#setup-selector-configure .task}

Assigning the editor priority is performed by configuring the [Tiny Editors Selector service](t_01-setup_01-selector_00-summary.md). This step can also be done after the installation of Tiny Editors for HCL Connections is complete.

**Before you begin:** The Tiny Editors Selector service must be installed.

1.  Log in to the Web interface for your WebSphere Application Server Console.

    The default location for the WebSphere Application Server Console is: https://your-server-here:9043/ibm/console

2.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

    ![Websphere applications link](resource/was/applications_applications.png)

3.  Select the checkbox for **TinyEditorsSelector** from the list of applications and click **Stop**.

    ![Stop TinyEditorsSelector](resource/was/stop_connectsix.png)

4.  Find **TinyEditorsSelector** in the list of applications and click the **TinyEditorsSelector** link.

    ![TinyEditorsSelector link](resource/was/click_connectsix.png)

5.  On the **Configuration** tab, click the **Initialize parameters for servlets** link.

    !["Initialize parameters for servlets" link](resource/was/prioritize_connectsix_01.png)

6.  Set the **priority** value to  "TinyMCE" in any order separated by a comma then click **OK**.

    !["Initialize parameters for servlets" dialog](resource/was/prioritize_connectsix_02.png)

7.  Click **Save** to save the change.

    ![Save configuration changes](resource/was/prioritize_connectsix_03.png)

8.  Select the checkbox for **TinyEditorsSelector** from the list of applications and click **Start**.

    ![Start TinyEditorsSelector](resource/was/start_connectsix.png)


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

