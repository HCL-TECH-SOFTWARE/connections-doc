# Scheduling Activities statistics collection {#t_admin_act_schedule_stat_jobs .task}

Edit configuration property settings to change the frequency and duration of the jobs that collect server statistics.

To edit configuration files, you must use the wsadmin client.

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

2.  Display the current configuration settings using the following command:

    ```
    ActivitiesConfigService.showConfig() 
    
    ```

    From the returned list, look at the current values of the settings that begin with **jobs.30MinStats**, **jobs.DailyStats**, and **jobs.DatabaseRuntimeStats** to determine which property values, if any, you want to change:

3.  You can change the property values using the following command:

    ```
    ActivitiesConfigService.updateConfig(property, value)
    ```

    For example:

    -   To change the frequency with which the 30MinStats job runs from every 30 minutes to every 10 minutes, edit the value of the interval attribute using the following command. The default value is 0 0/30 \* \* \* ? which specifies that the job should run every 30 minutes.

        ```
        ActivitiesConfigService.updateConfig("jobs.30MinStats.interval", "0 0/10 * * * ?")
        ```

        If you change the frequency to something other than 30 minutes, keep in mind that the job name will still be 30MinStats and could lead to some confusion.

    -   To change the start time of the DailyStats job from 11 AM to 1 AM, edit the value the interval attribute using the following command. The default value is 0 0 11 \* \* ? which specifies that the job should run daily at 11 AM.

        ```
        ActivitiesConfigService.updateConfig("jobs.DailyStats.interval", "0 0 1 * * ?")
        ```

    -   To change the frequency with which the DatabaseRuntimeStats job runs from once every hour to once every 45 minutes, edit the value of the interval attribute using the following command. The default value is 0 0 \* \* \* ?, which specifies that the job should run once every hour, on the hour.

        ```
        ActivitiesConfigService.updateConfig("jobs.DatabaseRuntimeStats.interval", "0 0/45 * * * ?")
        ```

    For information about how to format the value of the interval attribute, see *Scheduling tasks*.

4.  If you want to prevent the statistics collection job from running altogether, you can use the following commands to disable the jobs:

    ```
    ActivitiesConfigService.updateConfig("jobs.30MinStats.enabled", "false")
    ActivitiesConfigService.updateConfig("jobs.DailyStats.enabled", "false")
    ActivitiesConfigService.updateConfig("jobs.DatabaseRuntimeStats.enabled", "false")
    ```

5.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.


```
<scheduledTasks>
        <!-- DatabaseRuntimeStats - every hour  -->
        <task 
         name="DatabaseRuntimeStats" 
         description="Actvities Database Statistics Collector Service"
         interval="0 0 * * * ?" 
         startby="" 
         enabled="true" 
         scope="cluster" 
         type="class"
         targetName="com.ibm.openactivities.jobs.DatabaseStatisticsCollectorJobWS" 
         mbeanMethodName="" 
         serverName="unsupported" >
        </task>

        <!-- local scoped jobs -->
         
        <!-- DailyStats - every day @ 11 am -->
        <task 
         name="DailyStats" 
         description="Activities Daily Statistic Collector Service"
         interval="0 0 11 * * ?" 
         startby="" 
         enabled="true" 
         scope="local" 
         type="class" 
         targetName="com.ibm.openactivities.jobs.StatsPersistJobWS" 
         mbeanMethodName="" 
         serverName="unsupported" >
        </task>
                   
        <!-- 30MinStats - every 30 min  -->
        <task 
         name="30MinStats" 
         description="Activities 30 Minute Statistic Collector Service"
         interval="0 0/30 * * * ?" 
         startby="" 
         enabled="true" 
         scope="local"  
         type="class"
         targetName="com.ibm.openactivities.jobs.StatsPersistJobWS" 
         mbeanMethodName="" 
         serverName="unsupported" >
        </task>
</scheduledTasks>

```

**Parent topic:**[Monitoring statistics and metrics](../admin/t_admin_act_collecting_statistics.md)

**Related information**  


[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Checking out the Activities configuration files](../admin/t_admin_act_checkout_config_file.md)

[Applying property changes in Activities](../admin/t_admin_act_save_changes.md)

[Managing the scheduler](../admin/t_admin_act_manage_scheduler.md)

[Starting the wsadmin client](t_admin_wsadmin_starting.md)

