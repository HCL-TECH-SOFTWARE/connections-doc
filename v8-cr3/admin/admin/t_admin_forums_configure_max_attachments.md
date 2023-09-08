# Setting the maximum number of attachments {#t_admin_forums_configure_max_attachments .task}

Edit configuration property settings to configure the maximum number of files that can be uploaded to a single forum post.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

You can control space on the server by editing settings in the forum-config.xml file to limit the number of attachments that users can upload to a forum post.

**Note:** You can also use the <sizelimits\> section of the forum-config.xml to set a file size limit per file extension type.

1.  To configure the maximum number of attachments that can be uploaded to a single post, complete the following steps.
2.  Start the wsadmin client from the following directory on the system where you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin
    ```

    where dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or else subsequent commands that you enter might fail.

3.  Start the Forums Jython script interpreter.

    1.  Use the following command to access the Forums configuration file:

        ```
        execfile("forumsAdmin.py")
        ```

        If you are prompted to specify a service to connect to, enter 1 to select the first node in the list. Most commands can run on any node. If the command specifies a file by using a local file path, select the node where the file is stored.

    2.  Check out the Forums configuration files by using the following command:

        ForumsConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the XML and XSD configuration files are copied. The files are kept in this working directory while you modify them.

            **Note:** Linux only: The directory must grant write permissions or the command fails.

        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections applications. This argument is required. It is also case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ForumsConfigService.checkOutConfig\("/opt/my\_temp\_dir", "ForumServerNode01Cell"\)

4.  Open the forum-config.xml file using a text editor.

5.  Edit the `<max-number-attachment-per-post>` element in the `<objectStore>` section of the file to set the maximum number of attachments that can be uploaded per post.

    For example, to set the maximum number of attachments per post to 6, you edit the file as follows:

    ```
    <objectStore>
    ...
       <max-number-attachment-per-post>6</max-number-attachment-per-post>
    ...
    </objectStore>
    
    ```

    You can also set the file size limits per mime type using the <sizeLimits\> setting.

6.  Save your changes and close the forum-config.xml file.

7.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Forums* for information about how to save and apply your changes.


**Parent topic:**[Managing file attachments in Forums](../admin/c_admin_forums_manage_attachments.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying property changes in Forums](../admin/t_admin_forums_save_changes.md)

