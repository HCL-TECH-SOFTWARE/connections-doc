# Defining which statistics to collect {#t_admin_act_defining_stats .task}

Edit configuration property settings to define the statistics that are collected by the server.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The Activities server collects a specific set of statistics by default. You can change what is collected to better suit the needs of your environment. For example, Activities collects statistics on SMTP server performance. If you are not using an SMTP server, you can prevent its performance from being monitored. For a complete list of the statistics that are collected by Activities by default, see *Activities statistics*.

To define which statistics are collected by the server, complete the following steps:

1.  Use the wsadmin client to access and check out the Activities configuration files.

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

2.  From the temporary directory to which you checked out the Activities configuration file, open the oa-config.xml file in a text editor, and look for the <stat\> element block.

3.  Make any of the following edits:

    -   To stop collecting data on a specific field, remove the <field\> element that represents the value that you are not interested in collecting.
    -   To change the name of the text file that is created to store the statistical data, edit the attribute of the <file\> element.
    -   To change the number of versions of results that are maintained from the default value of the 144, edit the <samples\> element.
4.  After making your edits, save and close the oa-config.xml file.

5.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.


**Parent topic:**[Monitoring statistics and metrics](../admin/t_admin_act_collecting_statistics.md)

**Related information**  


[Checking out the Activities configuration files](../admin/t_admin_act_checkout_config_file.md)

[Applying property changes in Activities](../admin/t_admin_act_save_changes.md)

