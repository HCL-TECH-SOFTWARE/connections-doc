# Removing inappropriate content {#t_admin_profiles_remove_inapp_content .task}

Content management commands are used to update inappropriate information stored in the Profiles database, such as text displayed in the **About Me** and **Background** fields of the Profiles user interface. These administrative commands can also be used to delete inappropriate photos from the database. No file checkout or server restart is required when using the commands.

To access configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Profiles provides a number of administrative commands that allow you to remove offensive or unwanted content from the database.

1.  To update or delete content in the Profiles database, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly. For more information, see *Starting the wsadmin client*.

3.  Start the Profiles Jython script interpreter.

    1.  Use the following command to access the Profiles configuration files:

        ```
        execfile("profilesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands to remove or replace inappropriate or unwanted content from the Profiles database.

    ProfilesService.updateExperience\(String user\_email\_addr, String new\_content\_for\_experience\_field\)
    ProfilesService.updateExperience\(String user\_email\_addr, String new\_content\_for\_experience\_field, String orgId\)
    :   Replaces the existing experience text that is associated with a user's email address with alternative text enclosed by double quotation marks.

        Experience is the information that is contained in the **Background** area of a user's profile.

        For example:

        ```
        ProfilesService.updateExperience("ann_jones@example.com",
        "Text to display in Background field for Ann")
        ```

        ```
        ProfilesService.updateExperience("ann_jones@example.com",
        "Text to display in Background field for Ann",orgId="0000000045")
        ```

        **Note:** Rich text cannot be entered with this command.

    ProfilesService.updateDescription\(String user\_email\_addr, String new\_content\_for\_description\_field\)
    ProfilesService.updateDescription\(String user\_email\_addr, String new\_content\_for\_description\_field, String orgId\)
    :   Replaces the existing description text that is associated with a user's email address with an alternate description text enclosed by double quotation marks.

        Description text is information that is contained on the **About Me** tab of a user's profile.

        For example:

        ```
        ProfilesService.updateDescription("ann_jones@example.com",
        "Text to display in About Me tab for Ann")
        ```

        ```
        ProfilesService.updateDescription("ann_jones@example.com",
        "Text to display in About Me tab for Ann",orgId="0000000045")
        ```

        **Note:** Rich text cannot be entered with this command.

    ProfilesService.deletePhoto\(String user\_email\_addr\)
    ProfilesService.deletePhoto\(String user\_email\_addr, String orgId\)
    :   Deletes image files that are associated with a user's email address. This command can be used only if the user uploaded a photo to their profile. This command removes the photo.

        For example:

        ```
        ProfilesService.deletePhoto("john_doe@example.com")
        ```

        ```
        ProfilesService.deletePhoto("john_doe@example.com",orgId="0000000045")
        ```


**Parent topic:**[Managing profile content](../admin/c_admin_profiles_control_content.md)

