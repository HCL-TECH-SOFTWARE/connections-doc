# Scheduling tasks {#c_admin_common_was_scheduler .concept}

The Activities, Communities, Files, Forums, News, Search, and Wikis applications use the IBM® WebSphere® Application Server scheduling service for performing regular tasks. You can use wsadmin commands to change the schedule by which a task runs or to disable a scheduled task altogether.

The scheduling service allows you to reliably process workloads using parallel processing, and to schedule resource-intensive tasks during off-peak hours when there is low traffic. For more information about the WebSphere Application Server scheduling service, see [Developing and scheduling tasks](https://www.ibm.com/docs/was-nd/8.5.5?topic=service-developing-scheduling-tasks) in the WebSphere Application Server documentation.

The WebSphere Application Server scheduling service is based on the Cron calendar, which uses predefined date algorithms to determine when a task should run. HCL Connections tasks are configured by default to run on a certain schedule. You can change the time at which the scheduled tasks run using wsadmin commands to edit the configuration files for the associated application. Cron schedule values use the following syntax:

```sh
second minute hourOfDay dayOfMonth month dayOfWeek
```

Some tips when specifying the cron schedule values:

-   Specify an asterisk \(\*\) to indicate that you want to select all options. For example, if you specify \* as the value of the dayOfWeek parameter, the task runs every day of the week.
-   Always set seconds to 0, except for in the Profiles task, which runs every 20 seconds and is specified using the syntax \*/20.

    The \*/n syntax means take the first value in the range, and then every nth value. So, if you specified \*/3 in the month position, the task would run quarterly in January, April, July, and October.

-   dayOfMonth and dayOfWeek are mutually exclusive; always set one to ?.

    The ? indicates that no value is being provided.

-   You can indicate in a single cron expression that you want a task to run multiple times by using multiple values separated by commas or you can specify a range by separating the values with a dash.

    -   You can specify the value in dayOfWeek using SUN, MON or using numbers 1,2 where 1 represents Sunday.
    -   You can specify JAN, FEB for the value of month or by using numbers 1,2 where 1 represents January.
    -   To specify one or more seconds, use the values 0, 1, ... 59.
    -   To specify one or more hours, use the values 0, 1, ... 23.
    For example, specifying 1,4,7,10 in the month position specifies that you want the task to run quarterly. Specifying 2-6 in the dayOfWeek position indicates that you want the task to run Monday through Friday.

-   If it is easier for you to read and define the schedule by separating out the values into multiple cron expressions, you can do so and use a \| to concatenate the values into a composite schedule. For example, you could indicate that you want to schedule to run quarterly at 3:45 PM on the second day of the month using the following string: `0 45 15 2 1 ? | 0 45 15 2 4 ? | 0 45 15 2 7 ? | 0 45 15 2 10 ?`

To see examples of cron expressions and what they mean, see *Examples of scheduler values*. For more information on the Cron calendar, see [UserCalendar interface](https://www.ibm.com/docs/was/8.5.5) in the WebSphere Application server product documentation.

To disable a scheduled task, use wsadmin commands.

-   **[Examples of scheduler values](../admin/r_admin_common_scheduler_cron_examples.md)**  
Use the examples provided here to construct your own Cron calendar scheduler values or copy and paste these values into your wsadmin commands to reuse them.
-   **[Clearing all scheduled tasks](../admin/t_admin_common_clear_scheduler_after_ltpa_change.md)**  
Use administrative commands to clear the scheduler of all tasks.

**Parent topic:** [System maintenance](../admin/c_admin_common_maintaining.md)

**Related information**  


[Managing the Search index](../admin/c_admin_search_manage_index.md)

