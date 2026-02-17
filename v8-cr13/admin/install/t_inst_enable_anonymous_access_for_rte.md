# Enabling anonymous access for the Rich Content Widget component {#t_inst_enable_anonymous_access_for_rte .task}

Define a system user to impersonate HTTP read-only requests to the File AppData API for the Rich Content Widget component.

To enable anonymous access for Rich Content Widget optionally in an environment within IBM Connections, you must define a system user to impersonate HTTP read-only requests to the File AppData API, and to be used by the Rich Content Widget component to retrieve content that is stored in File AppData for public Communities.

1.  Define a new system user in your user repository who can log in to Connections. Create a LDAP non-administrative account that is dedicated to the `rteJAASAuth` alias.

    **Note:** In the next steps, the Rich Content Widget component is configured to log in as this system user when performing HTTP request against Connections resources. To avoid leaking private resources from Connections, it is important to ensure that this user does not have access to any private resource on the Connections environment such as not being a member of a community, or a participant in an activity.

    -   This system user only should be used for accessing public information stored in File AppData by public communities instead of an actual user on the platform.
    -   Do not use the default admin user, since administrative users have access to all Connections content, including private content.
2.  Create a JAAS authentication alias, if it does not exist, named rteJAASAuth, and then set the user name and password of the user who is defined in step 1 as follows:

    1.  Log in to the WebSphere Application Server Integrated Solutions console.

    2.  In the WebSphere Application Server Integrated Solutions console, select **Security** \> **Global Security**.

    3.  Use the **+** icon to expand **Java Authentication and Authorization Service**.

    4.  Click **J2C authentication data**.

    5.  Find the rteJAASAuth alias.

        -   If the alias exists, click it to open it, add the user name and password of the user who is defined in step 1, and then click **Save**.
        -   If the alias doesn't exist, create it, set the user name and password of the user who is defined in step 1, and then click **Save**.
3.  Synchronize the WebSphere Application Server nodes, and then restart the Rich Content Widget application to apply the settings.


**Parent topic:**[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

