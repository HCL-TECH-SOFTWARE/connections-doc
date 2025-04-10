# Setting maximum sizes on media, pages, and attachments {#settingmaximumsizes .task}

You can set maximum sizes for media, pages, and attachments in the `wikis-config.xml` properties file.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Many commands require an ID as an input parameter, including library IDs, user IDs, policy IDs, and file IDs. You can find an ID by using special commands. For example, when you run the WikisMemberService.getByEmail\(string email\) command, where you provide a user's email address as input, the output includes the user's ID. You can also find IDs by using feeds. For more information, see the IBM® Connections API documentation.

You can set maximum sizes on media, pages, and attachments to control the size of these individual objects. For more information, see *Setting maximum sizes on libraries*.

Pages are a type of media so the maximum setting for pages cannot be larger than the maximum setting for media. Attachments have no relationship to media or pages, and can be any maximum size. However, if you allow users to attach large files you must make sure that network and browser timeout settings give users enough time to download the files.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter.

    1.  Use the following command to access the Wikis configuration files:

        ```
        execfile("wikisAdmin.py")
        ```

        If you are asked to select a server, you can select any server.

    2.  Check out the Wikis configuration files using the following command:

        WikisConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux™ only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        WikisConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

3.  To view the current configuration settings, use the following command:

    ```
    WikisConfigService.showConfig()
    ```

4.  To set a maximum size \(in KB\) for media, pages, and attachments, use the following commands:

    ```
    WikisConfigService.updateConfig("file.media.maximumSizeInKb", "<number_of_kilobytes>")
    ```

    ```
    WikisConfigService.updateConfig("file.page.maximumSizeInKb", "<number_of_kilobytes>")
    ```

    ```
    WikisConfigService.updateConfig("file.attachment.maximumSizeInKb", "<number_of_kilobytes>")
    ```

    **Note:** For better performance, set the maximum size of attachments to 2 GB. Files that are larger than that are likely to reach browser or server limitations. The following limits show the default maximum size for different types of files:

    -   Media: 512 MB
    -   Pages: 1 MB
    -   Attachments: 75 MB
5.  Check in the configuration file.

    **Note:** You must check in the file during the same wsadmin session in which you checked it out. For more information, see *Applying Wikis property changes*.


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Setting maximum sizes on libraries](../admin/t_admin_wikis_library_maxsize.md)

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying Wikis property changes](../admin/t_admin_wikis_config_apply.md)

