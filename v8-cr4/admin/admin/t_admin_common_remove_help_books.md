# Adding or removing sections from the help system's table of contents {#t_admin_common_remove_help_books .task}

If you installed a subset of the HCL Connections applications, remove the help files associated with the applications that you did not install from the help table of contents. If you add an application, or install HCL Connections Mail, you can add that product's help to the table of contents.

This procedure is not required.

The help system enables users to navigate from the help for one application to another application by providing a table of contents that lists each application as a separate section and includes help topics within the section. However, if you choose to install only a subset of the available applications, you must manually remove the other help sections from the help system table of contents after installing the product or users see help for applications to which they do not have access. You can also add help if you add an application.

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm_profile_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. See *Starting the wsadmin client* for more details.

2.  Enter the following command to access the HCL Connections configuration files:

    ```
    execfile("connectionsConfig.py")
    ```

3.  Enter the following command to specify which applications you want to include in the help system's table of contents:

    **Important:** If you want to add an extra application to the existing help, you still need to list all the applications for which you are already providing help. Only the help files for applications that you list as parameters in the LCConfifigHelp.setHelp command will appear in the table of contents.

    ```
    LCConfigHelp.setHelp("temp\_directory","application\_name","application\_name")
    ```

    where:

    -   temp\_directory is the name of a temporary directory on your system. The directory you specify can be any directory, but it must exist before you enter the command. When you enter the command, an XML file called helpData.xml is added to this directory and is used by the command.

        Linux: The directory must grant write permissions or the command does not complete successfully.

    -   application\_name is the name of the application whose help section you want to include in the table of contents. List each application name separated by commas. The options are:
        -   activities
        -   blogs
        -   bookmarks
        -   communities
        -   files
        -   forums
        -   homepage
        -   profiles
        -   wikis
        -   icmail
        -   ibmdocs
        
    For example, if you installed all the applications except Wikis and Connections Mail, you can run the following command to include all sections but Wikis and Connections Mail in the help system:

    ```
    LCConfigHelp.setHelp("c:/temp","activities","blogs","bookmarks","communities","files","forums","homepage","profiles")
    ```

4.  To force the table of contents in the help system to reflect the change, stop the help application, and delete the temporary help directory on each node where help runs.

    For example, delete the following directory: C:\\IBM\\WebSphere\\AppServer\\profiles\\AppSrv01\\temp\\node-name\\cluster-name\\Help.

    This directory is recreated when the application restarts.


When a user opens the product help system, the table of contents lists only those sections that you wanted it to include.

**Attention:** If a help topic links to a topic in a section that you have removed from the help system, the link text continues to be displayed, but returns an error when clicked.

**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

