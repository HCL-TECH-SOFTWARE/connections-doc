# Forcing traffic to be sent over an encrypted connection 

You can configure HCL Connections™ to force all traffic that passes between a Connections server and a user's web browser to be sent over an encrypted connection.

Be sure that encrypted connections are enabled in your environment before you perform this procedure. See [Configuring the HTTP Server for encrypted connections](../install/t_configure_ihs.md) in the Installing section of the HCL Connections product documentation for more information.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

1.  Use the wsadmin client to access and check out the Connections configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   `working\_directory` is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            !!! note

                - When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
                -  Linux® only: The directory must grant write permissions or the command fails.

        -   `cell_name` is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            !!! note 
                
                This input parameter is case-sensitive.

2.  Enter the following command:

    ```bash
    LCConfigService.updateConfig("force.conf.comm.enabled", "true")
    ```

3.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See [Applying common configuration property changes](../admin/t_admin_common_save_changes.md) for information about how to save and apply your changes.

4.  **Optional**: To secure session cookies, complete the following steps:

    1.  Log in to the WebSphere Application Server Integrated Solutions Console of the server hosting your Connections applications as the administrator.

    2.  Expand **Servers** \> **Server Types**, and then select **WebSphere application servers**.

    3.  Click the server hosting Connections from the list of server names.

    4.  Click **Session Management**, and then click **Enable cookies**.

    5.  Select the **Restrict cookies to HTTPS sessions** check box.

    6.  Click **Apply**, and then click **OK**.

5.  **Optional**: To secure LTPA tokens, complete the following steps:

    1.  From the WebSphere Application Server Integrated Solutions Console, expand **Security**, and then click **Global security**.

    2.  Expand **Web and SIP security**, and then click **single sign-on \(SSO\)**.

    3.  Select the **Requires SSL** check box.

    4.  Click **Apply**, and then click **OK**.


**Parent topic:** [Security](../secure/c_sec_overview.md)
