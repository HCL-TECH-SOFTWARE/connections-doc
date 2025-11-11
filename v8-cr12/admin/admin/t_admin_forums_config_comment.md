# Allowing non-community members to comment in forums {#t_admin_forums_config_comment .task}

Allow users who are not community members to comment in forums in public or moderated communities.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

By editing settings in the forum-config.xml file, you can allow users who are not community members to comment in forums in public or moderated communities.

1.  To allow users who are not community members to comment in forums in public or moderated communities, complete the following steps:
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

4.  Open the forum-config.xml file with a text editor.

5.  Edit the enableNonMembercontributor element in the deployment section of the file. The default value is false.

    For example, to set the value to true, edit the file as follows:

    <deployment enableCategory="false" enableLotusLive="false" enableNonMemberContributor="true"/\>

6.  Save your changes and close the forum-config.xml file.

7.  Check in the configuration files during the same wsadmin session in which you checked them out. For information about how to save and apply your changes, see *Applying property changes in Forums*.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Applying property changes in Forums](../admin/t_admin_forums_save_changes.md)

