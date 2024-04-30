# Initializing the next tranche {#ts_t_initialize_tranche .task}

You can trigger email digests to be sent to the next available tranche of users in your deployment by accessing specific HCL Connections™ URLs and appending the initNextTranche parameter. This parameter should only be used in development or preproduction environments.

To access the URLs for triggering email digests, you must be assigned the admin role for the News application. For information about how to assign a person to a role, see [Roles](../admin/r_admin_common_user_roles.md).

In the News repository application, all users are distributed into tranches to load balance the work of the email digest mechanism. There are 20 tranches by default, and each hour the next tranche in the sequence is selected for processing. You can verify that this process is working correctly by appending the initNextTranche parameter to the URL for triggering email digests. By including this parameter, you can trigger email digests to be sent to the next available tranche of users. When you omit the initNextTranche parameter, the email digest is sent only to the current, logged-in user.

CAUTION:

Using the initNextTranche parameter in a production environment might impact the schedule of your users. Users might miss some events that occur on the day or week between when the tranche is kicked off and when the schedule is supposed to fire. These missing events are included in the next daily or weekly digest that is sent at the scheduled time. However, due to the potential disruption to your users’ scheduled digest, only use the initNextTranche parameter in a development or preproduction environment.

1.  Log in to HCL Connections.

2.  Trigger the email digests by accessing the following URLs:

    -   Daily email digest:

        http://server\_name.com:port/news/web/testEmailDigestSendMail.action?type=daily

    -   Weekly email digest:

        http://server\_name.com:port/news/web/testEmailDigestSendMail.action?type=weekly

3.  To initialize a tranche to be sent to the next set of users, append the following parameter to the URL:

    ```
    &initNextTranche=boolean
    ```

    This parameter takes a boolean value that determines whether the next tranche of email digests should be initialized. Set the value to true when you want email digests to be sent out to the next tranche of users. Omitting the parameter causes the email digest to be sent to the current, logged-in user.

    For example: http://connections.ibm.com:9444/news/web/testEmailDigestSendMail.action?type=weekly&initNextTranche=true


**Parent topic:**[Troubleshooting email digests](../troubleshoot/c_ts_email_digests.md)

**Related information**  


[Roles](../admin/r_admin_common_user_roles.md)

[Verifying email digests](../troubleshoot/ts_t_trigger_email_notifications.md)

