# Moving the content store {#t_admin_act_move_content_store .task}

You can change the location of the content store used by the Activities application from the location defined at installation time. You might want to change the location of the content store if you augment your infrastructure and there is a new drive with more disk space available, for example.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The Activities content store is used to store files and other content that users add to their activities. If you want to change the location of the content store after installing Activities, you can do so by performing the steps in this procedure. If you want to maintain the existing content store, you can create a new content store in addition to the existing one. See *Defining multiple content stores* for more information.

**Note:** Do not copy the network path shared\_content\_store/provision directory. This folder contains program binary files only. It does not contain user content.

To move the content store, complete the following steps:

1.  The location of the content store is defined in the oa-config.xml file using one of the following formats:

    -   File path to a network share directory in Universal Naming Convention \(UNC\) format. For example: `\\server_name\share_name`. Specify the same directory on each node to which Activities is installed.
    -   WebSphere Application Server environment variable which contains the file path information. For example: `${ACTIVITIES_CONTENT_DIR}`

2.  **If the file path is defined in UNC format only**: You must edit the oa-config.xml configuration file. Use the wsadmin client to access and check out the configuration files.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Activities configuration files using the following command:

        ```
        ActivitiesConfigService.checkOutConfig("working\_directory","cell\_name")
        
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft™ Windows™ operating system.

            **Note:** Linux™: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere® Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            ```
            print AdminControl.getCell()
            ```

        For example:

        -   Linux:

            ```
            ActivitiesConfigService.checkOutConfig("/opt/act/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ActivitiesConfigService.checkOutConfig("c:/act/temp","foo01Cell01")
            ```

    3.  From the temporary directory to which you just checked out the oa-config.xml file, open the file in a text editor.

    4.  Find the existing <store\> element, which defines the current content store location. Edit the following property of the <store\> element to point to the new directory location:

        **root.directory property**:   Edit the value of the property to reflect the file path of the new file system location.

        **Note:** Do not change the value of the <id\> element. Activities relies on the <id\> element to map to the content store configuration.

    5.  Save and close the oa-config.xml file.

    6.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.

3.  **If the file path is defined using a WebSphere Application Server environment variable**: Edit the value of the variable by completing the following steps:

    1.  Using an administrator ID, log into the WebSphere Application Server Integrated Console associated with the profile to which you installed Activities.

    2.  Expand **Environment**, and then click **WebSphere Variables**.

    3.  Find the ACTIVITIES\_CONTENT\_DIR environment variable from the list, and then edit its value.

    4.  Save, and then apply your changes

4.  Copy the content store data from the old content store location to the new location.

5.  Restart the Activities application.

6.  After restarting the Activities server, review the WebSphere Application Server SystemOut.log file to ensure that the Activities application was able to initialize with the modified configuration.

7.  After the content store is successfully copied to the new location, you can remove the original content store.


**Parent topic:** [Managing uploaded files](../admin/t_admin_act_manage_uploads.md)

**Related information**  


[Defining multiple content stores for Activities](../admin/t_admin_act_change_content_store_new.md)

