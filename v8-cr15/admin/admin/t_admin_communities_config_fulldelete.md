# Configuring community trash settings {#t_admin_communities_config_fulldelete .task}

Configure the community trash settings: delete trash schedule, community delete trash interval and enable or disable the delete trash task.

To update configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Communities in the trash area are purged after 90 days by default. Also, the task to delete community trash is scheduled to run at 3AM daily. You can change both these configuration settings by modifying configuration settings in communities-config.xml. A community stop/start is required for any changes to take effect.

1.  To configure community trash settings, you must update the `scheduledTasks` section in communities-config.xml.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Communities Jython script interpreter.

    1.  Use the following command to access the Communities configuration files:

        ```
        execfile("communitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Communities configuration files using the following command:

        CommunitiesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        CommunitiesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

4.  Browse to the working directory that you specified in the previous step and open the communities-config.xml file using a text editor.

5.  Browse to the `scheduledTasks` section:

    ```
    <comm:scheduledTasks>
    ...
    <comm:task name="fullDelete" description="Fully delete Communities in trash"
                interval="0 0 3 ? * *" startby=""
                enabled="true" scope="cluster" type="internal"
                targetName="" mbeanMethodName="" serverName="unsupported" />
    ...
     <!--  Number of days after which a soft-deleted community will be fully deleted -->
        <comm:daysToDelete>90</comm:daysToDelete>
    
    ```

6.  The fullDeletetask to delete community trash is scheduled to run at 3am daily by default. To configure when the task runs change the `interval` property. For example, set `interval="0 0 8 ? * *"` to run the task at 8am daily.

7.  To prevent communities from being deleted from trash, disable the task by changing `enabled=true` to `enabled=false`.

8.  Communities in the trash area are purged after 90 days by default. To change number of days after which a community in trash is fully deleted, change the `<comm:daysToDelete>` property.

    **Note:** If you set `<comm:daysToDelete>0</comm:daysToDelete>`, communities are not deleted immediately and remain in the trash for at least one day. This is because the background task purges any communities in trash older than `comm:daysToDelete` days. At least 24 hours has to pass for a Community to be in the trash for one day \(which is \> 0\) days.

9.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Communities* for information about how to save and apply your changes.

10. Stop and restart Communities so that changes to configuration files take effect. For more information, see *Starting or stopping Connections applications*.


An entry is logged to `SystemOut.log` when the task runs. Check log entries to see when tasks start, how many communities were deleted, and when the next run will take place.

```
 [9/11/13 3:00:00:867 EDT] 0000006a NotificationS I CLFWY0297I: 
The task fullDelete for Communities has begun execution
...
[9/11/13 3:10:53:170 EDT] 0000006a FullDeleteTas I 
com.ibm.lconn.comm.internal.service.FullDeleteTask$1 run CLFRM0261I: Fully deleted 13 
communities that were soft-deleted more than 90 days ago. 
[9/11/13 3:10:53:173 EDT] 0000006a NotificationS I CLFWY0337I: The next run time 
for the task fullDelete for Communities is at 03:00:00. 
```

**Parent topic:**[Working with Community trash](../admin/c_admin_communities_trash.md)

**Related information**  


[Starting or stopping Connections applications](../admin/t_admin_common_startstop_apps.md)

[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

