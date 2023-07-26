# Completing activities that are not being used {#t_admin_act_auto_completing .task}

Activities are moved to the Completed view for two reasons, inactivity and the passing of a Due Date. The following help is about how to configure an inactive Activity.

**Before you begin**

When an activity is marked complete, it moves from the My Activities view to the Completed view. The default interval is 90 days. Configuration property settings can be edited to disable the removal of inactive activities from the My Activities view, to change the amount of time an activity must be inactive before it is marked complete by the server, or to disable the warning notification that is sent to activity owners before an activity is marked complete. Before starting this procedure, determine the amount of time that you want to allow an idle activity to remain in the active views before it is marked complete and moved to the Completed view.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

**About this task**

If email notifications are enabled, Activities warns the owner of an activity that has not been modified in the specified time frame that the activity will be marked complete. This allows the owner to modify the activity to keep it active and prevent it from being marked complete. You can enable and disable this email notification application. If you do not want to automatically move activities into the Completed view, you can also disable this job.

To remove an activity that is not being used, complete the following steps:

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

    From the returned list, look at the current values of the settings that begin with **jobs.AutoComplete** and determine which property values you want to change:

    **jobs.AutoComplete.autoCompletionPeriod**:   Defines the number of days of inactivity that must pass before an activity is automatically marked complete. Specify the value in days. The default value is 90.

    **jobs.AutoComplete.prenotification**:   Defines whether or not to send an email to the activity owners to warn them that the activity will be marked complete if no modifications are made to it. This property accepts the following values: true or false. The default value is true. This setting requires that email notifications are enabled.

3.  To change the property values, use the following command:

    ```
    ActivitiesConfigService.updateConfig(property, value)
    ```

    For example:

    ```
    ActivitiesConfigService.updateConfig("jobs.AutoComplete.autoCompletionPeriod","100")
    ActivitiesConfigService.updateConfig("jobs.AutoComplete.prenotification","false")
    
    ```

4.  If you decide to notify activity owners, you can change the number of days warning they are given by changing the interval at which the job runs. If the job is scheduled to run once a month, the owners get a month's notice that their activity will be marked complete. If it runs weekly, they get a week's notice.

    To change the interval of the job, edit the value of the jobs.AutoComplete.interval property. The default value is `0 0 23 ? * SAT`, which specifies that the job should run weekly at 11 PM on Saturday. For information about how to format this value, see *Scheduling tasks*.

    Use the following command to edit this property:

    ```
    ActivitiesConfigService.updateConfig("jobs.AutoComplete.interval", value)
    ```

    where value is a time interval. For example: `"0 30 4 ? * SAT"`

5.  If you want to prevent the auto completion job from running altogether, you can use the following command to disable the job:

    ```
    ActivitiesConfigService.updateConfig("jobs.AutoComplete.enabled", "false")
    
    ```

6.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.

**Example**

When making configuration changes to the ActivityAutoCompleteJob scheduled job, you are modifying settings in the oa-config.xml file. The following XML sample of oa-config.xml file content defines a job that runs weekly \(Saturdays at 11 PM\) and marks complete any activities on the server that have not been modified in 100 days. Because prenotification is set to false, the activity owners will not get an email notification that the activities will be marked complete. The ActivityAutoCompleteJob task sets the last **updated by** field in the Activities interface to Activities Administrator.

```
<scheduledTasks>
  <!-- cluster scoped jobs -->
  
  <!-- ActivityAutoCompleteJob - weekly on Sat at 11pm  -->
  <task 
   name="ActivityAutoCompleteJob" 
   description="Automatically mark unmodified activities as completed"
   interval="0 0 23 ? * SAT" 
   startby="" 
   enabled="false" 
   scope="cluster" 
   type="class"
   targetName="com.ibm.openactivities.jobs.AutoCompleteJobWS" 
   mbeanMethodName="" 
   serverName="unsupported" >
    <args>
      <property name="autoCompletionPeriod">100</property>
      <property name="prenotification">false</property>
    </args>
  </task>
  ...
</scheduledTasks>
```

**Parent topic:** [Changing Activities configuration property values](../admin/t_admin_act_changing_config.md)

**Related information**  


[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Checking out the Activities configuration files](../admin/t_admin_act_checkout_config_file.md)

[Applying property changes in Activities](../admin/t_admin_act_save_changes.md)

[Managing the scheduler](../admin/t_admin_act_manage_scheduler.md)

