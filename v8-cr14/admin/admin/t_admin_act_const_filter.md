# Managing Activity filters {#t_admin_act_const_filter .task}

Edit configuration property settings to filter out Community activities from **My activities** in the main navigation panel of the Overview page.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Activities can be filtered as follows on the Overview page:

-   My activities \(all activities I own and does not include any community activities\).
-   Community activities \(only community activities\).

Activity filtering is disabled by default.

To enable activity filtering, complete the following steps:

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

2.  To change the property value, edit oa-config.xml and set feature.communityActivitiesView.enabled, set to "true" at the end of oa-config.xml as follows:

    ```
    
    <properties>
              <property name="feature.communityActivitiesView.enabled">true</property>   
    </properties>
    ```

    **Note:**

    If the `<properties>...</properties>` tagging is already present, do not add it again. Instead, include the property name string in the example shown in the existing properties tags.

3.  After you make changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.


**Parent topic:**[Changing Activities configuration property values](../admin/t_admin_act_changing_config.md)

**Previous topic:**[Purging the Activities log](../admin/t_admin_act_purge_events.md)

