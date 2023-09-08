# Purging the Activities log {#t_admin_act_purge_events .task}

By default, the Activities events log is purged daily at 2 AM. By modifying the EventLogPurgeJob task, you can specify the time that the log is purged and set the properties that define which entries can be deleted. Deleting old events helps maintain performance and keeps the log from becoming too large. Limiting the size of the event log table limits the database storage needed.

To edit configuration files, you must use the wsadmin client.

Customize how the log is purged by specifying the maxNumberOfDeletionPerCall and retentionInDays in the activities configuration file. Use maxNumberOfDeletionPerCall to set the maximum number of entries that are deleted at one time. Use retentionInDays to set how old an entry must be before it can be deleted.

1.  Use the wsadmin client to access and check out the Activities configuration file.

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

2.  Display the current Activities configuration settings.

    Use the command `ActivitiesConfigService.showConfig()` to display a list of properties. Find the following properties from the EventLogPurgeJob task:

    **maxNumberOfDeletionPerCall**:   The maximum number of log entries to delete per scheduled call. By default, 1000 entries are deleted each time that a purge runs. If invalid values are entered, the default value is used instead. If this value is blank, the default value is used.

    **retentionInDays**:   The minimum age of the entries to be deleted. By default, entries older than 365 days are deleted. The minimum value that is allowed for this property is 90 days. If a number less than 90 is entered, then the value that is used is the default of 90 days.

3.  Change the property values with the following command:

    ```
    ActivitiesConfigService.updateConfig(property, value)
    ```

    For example:

    ```
    ActivitiesConfigService.updateConfig("jobs.EventLogPurgeJob.maxNumberOfDeletionPerCall", "2000")
    ActivitiesConfigService.updateConfig("jobs.EventLogPurgeJob.retentionInDays", "365")
    ```

4.  Change the time that the task is run by editing the value of the interval attribute. Use the following command:

    ```
    ActivitiesConfigService.updateConfig(property, value)
    ```

    For example, the following example sets the interval to `0 0 11 * * ?`, which runs the purge at 11 AM.

    ```
    ActivitiesConfigService.updateConfig("jobs.EventLogPurgeJob.interval", "0 0 11 * * ?")
    ```

5.  Before the changes can take effect, you must check in the configuration file. The configuration file must be checked in during the same wsadmin session in which you checked it out. See *Applying property changes* for details.


When you are making these configuration changes, you are modifying settings in the oa-config.xml file. The following sample oa-config.xml file segment purges the Activities log

```
<scheduledTasks>
...

<!-- EventLogPurgeJob - every day @ 2 AM -->
        <task name="EventLogPurgeJob" description="Permanently removes Activities Event Log"
              interval="0 0 2 * * ?" startby=""
              enabled="true" scope="cluster" type="class"
              targetName="com.ibm.openactivities.jobs.EventLogPurgeJobWS"
              mbeanMethodName="" serverName="unsupported" >
              <args>
                   <!-- The maximum number of log entries to delete per scheduled call (default 1000). Adjust this as needed. -->
                   <property name="maxNumberOfDeletionPerCall">1000</property>
                   <!-- The number of days that event log entries are retained. For example, only delete entries older than 
                        now - X days. (default 365) 
                        Note: This value must be equal to or greater than 90. Values less than 90 it are ignored and 90 is used. -->
                   <property name="retentionInDays">365</property>
              </args>
        </task>
...        
<scheduledTasks>
```

To prevent the log from being purged, disable this task. If this task is disabled, the log file will keep increasing in size. This size increase might cause the database server to run out of disk space. To disable the log purge, set enabled to false using the following command.

```
ActivitiesConfigService.updateConfig("jobs.EventLogPurgeJob.enabled", "false")
```

**Parent topic:**[Changing Activities configuration property values](../admin/t_admin_act_changing_config.md)

**Previous topic:**[Monitoring statistics and metrics](../admin/t_admin_act_collecting_statistics.md)

**Next topic:**[Managing Activity filters](../admin/t_admin_act_const_filter.md)

