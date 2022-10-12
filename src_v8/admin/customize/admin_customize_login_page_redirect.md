# Customizing the login page redirect parameter {#admin_customize_login_page_redirect .task}

Optionally restrict the URLs that the HCL Connections™ login page can redirect to by whitelisting allowed domains.

This is not a required procedure. Perform this task only if you want to restrict the domains that the default login page redirects to.

To edit configuration files, you must use the wsadmin client; for information, see [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md).

HCL Connections provides the ability to restrict the redirect domains when using the default login page flow. Complete this task to configure the capability to whitelist the allowed domains for the login page's redirect parameter.

In this task, you will update the LotusConnections-config.xml file. See [Editing configuration files](../admin/t_admin_common_checkout_config_file.md) for general details on updating HCL Connections configuration files.

1.  Edit the LotusConnections-config.xml file.

    **Important:** Be sure to leave the wsadmin session open so you can check in the updated file.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
            -   AIX®, and Linux® only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

    3.  Open the LotusConnections-config.xml file in a text editor.

    4.  Find the `<loginRedirectWhitelist enabled="false">` element.

    5.  Update the`<domain>admin_replace.com</domain>` element to one of your whitelisted domains and add `<domain>` elements for each additional domain that you want to whitelist \(allow redirects to\).

        For example:

        ```
        <loginRedirectWhitelist enabled="true">
                  <domain>my_domain1.com</domain>
                  <domain>my_domain2.com</domain>
                  <domain>my_domain3.com</domain>
              </loginRedirectWhitelist>
        ```

    6.  Save and close the LotusConnections-config.xml file.

    7.  After making changes, you must check the configuration files back in during the same wsadmin session in which you checked them out. See [Applying common configuration property changes](../admin/t_admin_common_save_changes.md) for information about how to save and apply your changes.

2.  Synchronize the nodes using the Integrated Solutions Console for the network deployment system.

3.  Restart the WebSphere Application Server.


**Parent topic:**[Customizing the login page](../customize/t_admin_common_customize_login_screen.md)

