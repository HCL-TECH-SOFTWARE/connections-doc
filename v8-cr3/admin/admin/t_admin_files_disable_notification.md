# Disabling automatic email notification of file updates {#disablingemailnotificationondownload .task}

When an user downloads a file for the first time, Files sets a preference so that the user receives an email notification when the file is edited or commented on. The assumption is that users want to receive email about updates to the file. You can disable this notification using the `files-config.xml` file.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command line tool.

Email notifications can also be enabled or disabled for all applications. See the topic *Enabling email notifications* for information.

1.  Start the wsadmin client.

2.  Access the Files configuration files using the following command:

    ```
    execfile("filesAdmin.py")
    ```

    Select a server if prompted.

3.  Check out the Files configuration files using the following command:

    FilesConfigService.checkOutConfig\("working\_directory", "cell\_name"\) where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. If you do not know the cell name, type the following command while in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```

    For example:

    -   Linux™:

        ```
        FilesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

    -   Microsoft™ Windows™:

        ```
        FilesConfigService.checkOutConfig("c:/temp","foo01Cell01")
        ```

    **Note:** To check out email templates with the configuration files you can add the includeEmailTemplates parameter, and set it to "true". For example:

    ```
    FilesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell", includeEmailTemplates = "true")
    ```

    You can edit the email that users receive by editing the templates. For information on email templates, see the topic *Customizing email templates*.

4.  To set the `emailNotification.addOnMediaDownload.enabled` property to false, use the following command:

    ```
    FilesConfigService.updateConfig("emailNotification.addOnMediaDownload.enabled", "false")
    ```

5.  You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See the topic *Applying Files property changes* for details.

    **Note:** If you checked out the email templates, use `FilesConfigService.checkInConfig(includeEmailTemplates = "true")` to check them back in as well.


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Enabling email notifications \(default templates\)](../admin/t_admin_common_enable_mail.md)

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying Files property changes](../admin/t_admin_files_config_apply.md)

