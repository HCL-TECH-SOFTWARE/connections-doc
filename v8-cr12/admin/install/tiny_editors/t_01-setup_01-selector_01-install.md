# Installing the Tiny Editors Selector {#setup-selector-install .task}

Installing the Tiny Editors Selector to allow Administrators to select the editor deployed for each user or role.

1.  Log in to the Web interface for your WebSphere Application Server Console.

    The default location for the WebSphere Application Server Console is: https://your-server-here:9043/ibm/console

2.  Click on the **New Application** link.

    ![WebSphere New Application link](resource/was/applications_new_application.png)

3.  Click on the **New Enterprise Application** link.

    ![New Enterprise Application link](resource/was/applications_new_enterprise_application.png)

4.  Specify the TinyEditorsSelector.ear file included in the root directory of the Tiny Editors for HCL Connections package and click **Next**.

    ![Select TinyEditorsSelector.ear](resource/was/select_connectsix.png)

5.  Select the **Fast Path** installation option and click **Next**.

    ![Choose "Fast Path"](resource/was/applications_fast_path.png)

6.  Click **Next** to accept the default installation settings.

    ![Select install options](resource/was/install_connectsix_01.png)

7.  Map the Tiny Editor Selector to the server running HCL Connections™.

    1.  Select the checkbox for the **TinyEditorsSelector** module.

    2.  Select the server/cluster/node combinations from the list.

    3.  Click **Apply**.

    4.  Click **Next**.

    ![Map modules to servers](resource/was/install_connectsix_02.png)

8.  Click **Next** to accept the default Virtual host mapping.

    ![Map virtual hosts for Web modules](resource/was/install_connectsix_03.png)

9.  Click **Finish** to complete the application installation.

    ![Installation Summary](resource/was/install_connectsix_04.png)

10. Once the application has been installed, click the **Save** link.

    ![Save changes](resource/was/install_connectsix_05.png)


**Parent topic:** [Optional: Installing Tiny Editors Selector](t_01-setup_01-selector_00-summary.md)

**Next topic:** [Starting the Tiny Editors Selector application](t_01-setup_01-selector_02-start.md)

