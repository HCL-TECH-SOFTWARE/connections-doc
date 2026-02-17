# Assigning community owners J2C aliases for moderating {#configuringthemoderationproxyserviceid .task}

Configure J2C Aliases so that community owners can moderate their community Blogs, Forums, and Files applications.

Moderation actions are performed by a moderation API. Community owners cannot access that API, so HCL Connections handles their moderation requests through a proxy service. The proxy service uses J2C Aliases to pass the requests. Proxy service alias users must be in the global-moderator roles of the appropriate applications, and they must be able to log in to HCL Connections.

By default the proxy service uses the connectionsAdmin J2C Alias provided during installation. That user is mapped to the global-moderator roles for Blogs, Forums, Files, Moderation, and Communities by the installation program, and can log in to HCL Connections. However, you can create different moderation aliases for each of the different supported applications. You can create the following aliases:

-   For Blogs create an alias called moderationBlogsAlias.
-   For Files create an alias called moderationFilesAlias.
-   For Forums create an alias called moderationForumAlias.

The different applications recognize these specific aliases. You can map any users to these aliases, but all users must be in the global-moderator roles of the appropriate application, and they must be able to log into HCL Connections. For example, the moderationBlogsAlias user must be in the global-moderator role for Blogs. See *Roles*.

The proxy service logs its actions, so if the users \(other than the connectionAdmin user\) are only used for this purpose, it will make reading the log more clear.

1.  To create moderation aliases and then map them to a global moderator role, complete the following steps:
2.  Create a moderation alias:

    1.  From the IBM® WebSphere® Application Server Integrated Solutions Console, expand **Security**, and then click **Global security**.

    2.  In the **Authentication** area, expand **Java Authentication and Authorization Service**, and click **J2C authentication data**.

    3.  Click **New**.

    4.  Name the alias, for example moderationFilesAlias.

    5.  Type the name and password of a user for the alias.

    6.  Click **OK**.

3.  Map an alias user to a global-moderator role:

    1.  Expand **Applications** \> **Application Types**, and then select **WebSphere enterprise applications**. Find and click the link to the application that you want to configure.

    2.  Click **Security role to user/group mapping**.

    3.  Select the check box for the **global-moderator** role, and then click **Map users**.

    4.  In the **Search String** box, type the name of the user to assign to the role, and then click **Search**. If the user exists in the directory, it is displayed in the **Available** list.

    5.  Select the user or group name from the **Available** box, and then move it into the **Selected** column.

    6.  Click **OK**.

    7.  Click **OK**, and then click **Save** to save the changes.

4.  Synchronize and restart all your WebSphere Application Server instances.


**Parent topic:**[Moderation roles](../admin/c_admin_common_moderation_roles.md)

**Related information**  


[Roles](../admin/r_admin_common_user_roles.md)

