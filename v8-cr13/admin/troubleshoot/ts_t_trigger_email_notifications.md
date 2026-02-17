# Verifying email digests {#ts_t_trigger_email_notifications .task}

You can verify that your email digests are working correctly by logging into HCL Connections™ and accessing specific URLs to trigger the email digests to be sent to the current user.

To access the URLs for triggering email digests, you must be assigned the admin role for the News application. For information about how to assign a person to a role, see [*Roles*](../admin/r_admin_common_user_roles.md).

If you want to confirm that your daily and weekly email digests are working as expected, you can trigger the digests to be sent to you by logging into HCL Connections and accessing specific URLs. For example, you might want to trigger the digests if you have customized your notifications and want to verify that the changes you made are displaying correctly. The digests are sent immediately so you can avoid having to wait for the next scheduled digests to be sent. You can perform this action as many times as you want. Accessing the URLs does not affect the next digest that is scheduled to be sent to you.

1.  Log in to HCL Connections.

2.  Trigger the email digests by accessing the following URLs:

    -   Daily email digest:

        http://server\_name.com:port/news/web/testEmailDigestSendMail.action?type=daily

    -   Weekly email digest:

        http://server\_name.com:port/news/web/testEmailDigestSendMail.action?type=weekly

3.  To specify the start date from which you want to receive news stories in the weekly digest, append the following parameter to the URL:

    ```
    &begin=yyyy-mm-dd
    ```

    Set the value of this parameter to a date using the following format: `yyyy-mm-dd`.

    For example: http://connections.ibm.com:9444/news/web/testEmailDigestSendMail.action?type=weekly&begin=2011-11-10


A message displays to confirm that the email has been sent.

**Parent topic:**[Troubleshooting email digests](../troubleshoot/c_ts_email_digests.md)

**Related information**  


[Roles](../admin/r_admin_common_user_roles.md)

[Customizing email digests](../customize/t_customize_email_digests.md)

[Initializing the next tranche](../troubleshoot/ts_t_initialize_tranche.md)

