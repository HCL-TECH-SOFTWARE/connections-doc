# Emptying the Activities trash on a schedule {#t_admin_act_trash_removal .task}

Edit configuration property settings to set up a schedule on which to permanently delete the activities and entries that have been moved to the Trash view.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Activities that are deleted are moved to the Trash view and can be restored from the Trash view. You can schedule the permanent deletion of activities and entries after a time interval that you specify. When the scheduled job runs, the activities and entries in the Trash view are permanently deleted from the system. Items that are purged from the Trash view are not recoverable.

To schedule the permanent removal of activities or entries from the Trash view, complete the following steps:

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

2.  Display the current Activities configuration settings using the following command:

    ```
    ActivitiesConfigService.showConfig() 
    ```

    From the returned list, look for the settings that begin with **jobs.TrashAutoPurge**; these control trash deletion. Determine which property values you want to change:

    **jobs.TrashAutoPurge.daysRetention**:   Number of days after which you would like activities and their entries removed from the Trash view. Specify the value in days. The default value is 90.

        **Note:** Do not set this value to 0. When it is set to 0, activities and their entries are not removed from the Trash view.

    **jobs.TrashAutoPurge.interval**:   Frequency with which the job to check for expired content runs. See *Scheduling tasks* for information about the format to use to specify the interval. The default value is `0 0 2 ? * SUN`, which specifies that the job should run weekly at 2 AM on Sunday.

3.  To change the property values, use the following command:

    ```
    ActivitiesConfigService.updateConfig(property, value)
    ```

    For example:

    ```
    ActivitiesConfigService.updateConfig("jobs.TrashAutoPurge.daysRetention", "100")
    ActivitiesConfigService.updateConfig("jobs.TrashAutoPurge.interval", "0 15 10 L * ?")
    ```

    **Note:** The `0 15 10 L * ?` value schedules the job to run at 10:15 AM on the last day of every month.

4.  If you want to prevent the trash purge job from running altogether, you can use the following commands to disable the jobs:

    ```
    ActivitiesConfigService.updateConfig("jobs.TrashAutoPurge.enabled", "false")
    
    ```

5.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.


When making configuration changes to the TrashAutoPurge scheduled job you are modifying settings in the oa-config.xml file. The following sample oa-config.xml file segment removes content from the Trash view after 100 days and runs the job to check for expired content at 10:15 AM on the last day of every month.

```
<scheduledTasks>
        <!-- cluster scoped jobs -->
         
        <task 
						name="TrashAutoPurgeJob" 
 						description="Permanently removes Activities Trash"
						interval="0 15 10 L * ?" 
						startby="" 
						enabled="true" 
						scope="cluster" 
						type="class"
						targetName="com.ibm.openactivities.jobs.TrashAutoPurgeJobWS" 
						mbeanMethodName="" 
 						serverName="unsupported" >
             <args>
                   <property name="trashRetentionInDays">100</property>
             </args>
        </task> 
        ...
<scheduledTasks>
```

**Parent topic:**[Changing Activities configuration property values](../admin/t_admin_act_changing_config.md)

**Previous topic:**[Completing activities that are not being used](../admin/t_admin_act_auto_completing.md)

**Next topic:**[Monitoring statistics and metrics](../admin/t_admin_act_collecting_statistics.md)

**Related information**  


[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Checking out the Activities configuration files](../admin/t_admin_act_checkout_config_file.md)

[Applying property changes in Activities](../admin/t_admin_act_save_changes.md)

[Managing the scheduler](../admin/t_admin_act_manage_scheduler.md)

