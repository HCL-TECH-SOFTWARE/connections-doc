# Reallocating and load balancing users according to mail domain {#t_admin_news_load_balance_users .task}

Use the NewsEmailDigestService.loadBalanceEmailDigest\(\) command to manually reallocate and load balance users in the different email tranches \(or groups of email addresses\) used by the email digest.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

A scheduled task runs every month to load balance the users in the email address groups used by the email digest. This task ensures that users are spread across the groups in a uniform way according to their mail domain. The task is configured in the news-config.xml file and looks as follows. Note that the default settings should not be modified.

```
<task serverName="unsupported" 
   startby="" 
   mbeanMethodName="" 
   targetName="ScheduledTaskService" 
   type="internal" 
   scope="cluster" 
   enabled="true" 
   interval="0 0 22 1 * ?" 
   description="Job to spread users in tranche" 
   name="PersonSpreadTranche"  > 
</task>
```

By default, the task runs on the first day of every month at 10:00 p.m. If you do not want to wait for the next scheduled task, you can run the task manually using the NewsEmailDigestService.loadBalanceEmailDigest\(\) MBean command.

1.  To reallocate and load balance users in the existing email address groups used by the email digest, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Jython script interpreter for the News repository.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Enter the following command:

    NewsEmailDigestService.loadBalanceEmailDigest\(\)
    :   Reallocates and load balances the users in the email address groups used by the email digest according to mail domain. This command does not take any parameters.

        The command returns the number of users who have been reallocated to different email address groups for load balancing purposes.

        For example:

        ```
        wsadmin> NewsEmailDigestService.loadBalanceEmailDigest()
        1603
        ```


**Parent topic:**[Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[News administrative commands](../admin/r_admin_news_admin_props.md)

