# Forcing users to log in before they can access an application {#t_admin_common_restricting_access .task}

Change the access levels of members or groups to require them to provide credentials before they can access an HCL Connections™ application.

There are several considerations to be aware of before you enable forced authentication:

!!! warning 
    
    - Do not perform this task if you plan to deploy the self-registration feature for external users who are invited to join Connections. When resources involving self-registration are configured to force authentication, external users don't have the anonymous access needed to register or reset their password. For more information, see [Configuring external collaboration](../install/t_install_configure_external_collab.md).
    
    - Do not perform this task if you plan to use the Connections Multi-Service Portlet plug-in. This extension does not function as expected when Connections is configured to force authentication.

-   If you have configured single sign-on between the applications, requiring authentication for each application does not prompt the same users for credentials as they move from one application to another within a single session. It only prompts for credentials when users log in to the first application. See [Enabling single sign-on between all applications](t_secure_domino.md) for more information.
-   Activities, Home page, Rich Text Editor, and Search require users to authenticate by default so there is no need to perform this procedure for those applications. However, if you do decide to change the reader role in Search to be mapped to "All Authenticated in Application's Realm," then you must map the reader role for all applications to at least the same level of security as the Search reader role. The reason for this is that the public Atom feeds in Search are secured by the reader role which is mapped to "Everyone" in Search by default and all of the other applications use these atom feeds. Their reader roles must have at least the same level of security as the Search reader role.
-   The reader role of the Communities application is set to Everyone by default. If you perform this procedure to change the reader role access level for any of the applications that have widgets that are displayed within the Communities application, you must also make the same change to the Communities reader role or the widget will no longer work in Communities.

To invite people to join the social networking community, many of the Connections applications allow users to read public information, such as public blogs or user profiles without requiring users to log in to the application first. In many cases, it is not until you want to edit your own profile or blog that credentials are required. If you do not want people or a subset of people to be able to freely browse through public information, you can force them to log in to each application before they can view any content. If you force authentication for an application, you should consider enabling it for all applications.

To force users to log in before they can access an application, complete the following steps.

1.  Open the Integrated Solutions Console of the WebSphere® Application Server hosting the application for which you want to restrict access.

2.  Expand **Applications** \> **Application Types**, and then select **WebSphere enterprise applications**.

3.  Select the application.

4.  Click **Security role to user/group mapping**.

5.  Select the check box in the Select column next to the **reader** role.

6.  Click **Map Special Subjects** \> **All Authenticated in Application's Realm**.

7.  Repeat the previous steps for each application that you want to force users to authenticate with before using.

8.  Click **OK**. Click **Apply**, and then click **OK**.


**Parent topic:** [Security](../secure/c_sec_overview.md)

**Related information**  


[Using the Profiles database as the user directory](../admin/t_enabling_directory_services.md)

[Enabling single sign-on for standalone LDAP](../secure/t_setup_standalone_ldap.md)

[Customizing login attributes](../customize/t_admin_profiles_customize_login_attbs.md)

