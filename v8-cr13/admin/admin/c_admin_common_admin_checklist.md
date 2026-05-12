# Administrator checklist {#c_admin_common_admin_checklist .concept}

Consider tasks that you might want to complete after you install HCL Connections and before users start using it.

## Database and file system backup and maintenance { .section}

-   [Backing up and restoring data](c_admin_common_manage_backups.md)
-   [Gathering DB2 database statistics daily](t_admin_db_maintain_stats.md)

## Tasks to schedule { .section}

1.  No tasks can run while the search index is being built. You do not have to do anything to create the initial search index because it runs automatically during the installation process. Wait for one of the default indexing tasks to run. If you want to re-create the search index, you must stop all scheduled tasks first. You can re-create the index by using one of the following procedures:

    [Recreating the Search index](t_admin_search_create_index.md)
    :   When you use this method to re-create the index, users cannot use Search.

    [Creating a background index](t_admin_search_create_standalone_index.md)
    :   When you use this method to re-create the index, users can continue to use Search.

2.  Schedule the following tasks:
    -   For user directory maintenance:
        -   To keep the Profiles data in sync with the source from which you populated it, schedule the sync\_all\_dns script to run nightly. See [Synchronizing the Profiles database with your organization's user data](t_admin_profiles_sync_ldap.md) for more details.

            !!! note 
                
                If you made any customizations to the population process, schedule your custom synchronization script to run nightly instead.

        -   To keep information about managers up-to-date, run the mark\_managers program. For more information, see the [Configuring the Manager designation in user profiles](../install/r_report-to_chains_profiles.md) topic.

## Managing content { .section}

Consider enabling the following features:

-   Moderation. Content that is added to Blogs, Forums, or Files in Communities must be reviewed by a moderator before it can be made public. Alternatively, you can allow people to add content freely, but enable others to flag content as inappropriate. For more information, see the [Moderation overview](c_admin_common_moderation_over.md) topic .
-   If you want to enable administrators to perform advanced tasks in all applications, [Create a global administrator](r_admin_common_superusers.md).

## Integrating with other products { .section}

.Consider integrating the following features:

-   Add Sametime® awareness, through the Sametime [server](t_admin_common_add_st_awareness_via_proxy.md).
-   You can add third-party applications to a list [allowing them potential access to HCL Connections data](c_admin_common_oauth.md) using the OAuth protocol and the HCL Connections API. Users decide whether to give these applications access to their HCL Connections data.

## Security considerations { .section}

Consider configuring the following features:

-   HCL Connections uses single sign-on \(SSO\) to secure the transfer of user ID and password information that is used to authenticate with the system. With SSO, users can switch to different applications without needing to authenticate again [Configuring single sign-on](../secure/c_sec_config_sso.md).
-   By default, the IBM® Connections AJAX proxy is configured to allow cookies, headers or mime types, and all HTTP actions to be exchanged among the HCL Connections applications. If you want to change the traffic that is allowed from non-HCL Connections services, you must explicitly configure it [Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md).

## Customizing the product { .section}

Consider adding the following customizations:

-   Start HCL Connections and review the product user interface to determine which areas of the product you want to [Customizing the user interface](../customize/t_admin_common_customize_main.md).
-   You can also use an OAuth 2.0 consumer proxy to allow the Homepage component to surface gadgets in an OpenSocial container that can interact with an OAuth 2.0 protected service [Configuring OAuth for custom gadgets](../customize/r_admin_common_oauth_config_homepage_gadgets.md).

## Testing the environment for production readiness { .section}

-   If during product installation you specified directory paths to application data and resources that were different from the default paths, you must [change your environment variables](t_admin_common_change_was_env_variable.md) to reflect those changes. The application configuration files that define the behavior of the applications reference the directory paths using these environment variables.
-   Make sure [references to administrator IDs and passwords](c_admin_common_change_passwords.md) are correct.
-   If your IBM HTTP Server is hosting multiple web servers, you might want to [change the session cookie name of one of them](t_admin_common_change_jsessionid.md) to prevent the cookie from being lost when the user is redirected from one product to another.

**Parent topic:** [Administering common areas](../admin/c_admin_act_wsadmin.md)

