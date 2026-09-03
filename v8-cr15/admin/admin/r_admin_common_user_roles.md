# Roles

Roles that you can define for users and groups on IBM® WebSphere® Application Server.

## Overview of roles { .section}

Four roles are available across all HCL Connections applications: person, everyone, reader, and admin. Other roles are used by the applications for system administration.

**Note:** The allAuthenticated role is mapped by default to the All Authenticated in Application's Realm special subject in WebSphere Application Server while the everyone role is mapped to the Everyone special subject. Avoid remapping these roles.

The global content administrator access for Libraries is configured in the FileNet® domain and object store. For more information, see the *Setting an LDAP group to be domain administrator instead of specific user* topic.

For information about assigning roles, see the *Assigning people to Java™ EE roles* topic.

## Application roles { .section}

*Table 1. Activities roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|
|search-admin|Used by the Search application to read public and private data for creating search indexes. In cases where file attachments must be accessed, the user must also be added to the admin role.|
|widget-admin|Used by widget containers to alert widget applications about container changes. <br></br> The role is mapped to the user that is specified in the remoteHandlerAuthenticationAlias attribute. This attribute is defined in the widgets-config.xml file for each application. <br></br> The installation wizard sets this attribute to the connectionsAdmin alias and maps the widget-admin role to the user that is specified in that alias. The same user must also be mapped to the person role.|

*Table 2. Blogs roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|global-moderator|Users with this role can moderate content. They can read, edit, delete, reject, approve, quarantine, and close entries and comments, and flag inappropriate content.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|
|search-admin|Used by the Search application to read public and private data for creating search indexes. In cases where file attachments must be accessed, the user must also be added to the admin role.|
|widget-admin|Used by widget containers to alert widget applications about container changes. <br></br> The role is mapped to the user that is specified in the remoteHandlerAuthenticationAlias attribute. This attribute is defined in the widgets-config.xml file for each application. <br></br> The installation wizard sets this attribute to the connectionsAdmin alias and maps the widget-admin role to the user that is specified in that alias. The same user must also be mapped to the person role.|

*Table 3. Bookmarks roles*

|Java EE Role|Description|
|------------|-----------|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|
|search-admin|Used by the Search application to read public and private data for creating search indexes.|

*Table 4. Common roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|allAuthenticated|All authenticated users in the application server's security domain.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access.|
|global-moderator|To moderate content, users must be mapped to the global-moderator role in the Blogs, Forums, or Files applications. For example, a user who wants to moderate Blogs in a community must be mapped to the global-moderator role in Communities, Moderation, and Blogs.|
|invite-only|When the invite guest option is enabled in the product UI, users with this role can invite external users to join Connections through a self-registration mechanism. Also verify that the default value `invite-only` in selfregistration-config.xml has not been modified.|
|mail-user|User who are mapped to this role can view the mail and calendar applications.|
|metrics-report-run|Grants users the authority to view and interact with global metrics. Other than administrators, only the users that are assigned to the metrics-report-run role can access global metrics. Whenever a user with this authorization level views global metrics, the report information is updated automatically. For best results, limit access to a small set of users whose jobs require them to view the most recent metrics. Granting this level of access to many users might slow performance because update requests are processed in sequence|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application.|

*Table 5. Communities roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|communities-metrics-run|Other than administrators, only the community owners who are assigned to the community-metrics-run role can access community metrics. Users with this level of access see static reports of community metrics, which can be refreshed by clicking **Update** in the Metrics user interface. You can map this role to all users or to a subset of the user population. For example, you can gradually provide the community metrics feature to users by mapping this role to a small group and adding more users later. <br></br> **Attention:** This role and the community-metrics-run role for Metrics must be mapped to the same users.|
|community-creator|Users with this role can create communities. By default, this role is mapped to the Everyone group but can be changed to a more restricted group if necessary.A user must be mapped to this role to create a subcommunity. In addition, the user must be an owner of the parent community.|
|dsx-admin|Used by the Communities directory service extension to read both public and private data. Do not map real users to this role.|
|everyone|Not used.|
|global-moderator|Users with this role can see the moderation link on the navigation bar in communities. To access the moderation user interface, they must also be mapped to the Moderation global-moderator role. To moderate content, users must be mapped to the global-moderator role in the Blogs, Forums, or Files applications. For example, a user who wants to moderate Blogs in a community must be mapped to the global-moderator role in Communities, Moderation, and Blogs.|
|metrics-reader|Users with this role can view the general statistics for the Communities application by clicking the **Server Metrics** link in the standard footer.|
|person|Users with this role can create communities, join a public community, or request to join a moderated community. Only users with this role can create or update the Communities Atom API.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|
|search-admin|Used by the Search application to read public and private data for creating search indexes.|
|widget-admin|Used by widget containers to alert widget applications about container changes. <br></br> The role is mapped to the user that is specified in the remoteHandlerAuthenticationAlias attribute. This attribute is defined in the widgets-config.xml file for each application. <br></br> The installation wizard sets this attribute to the connectionsAdmin alias and maps the widget-admin role to the user that is specified in that alias. The same user must also be mapped to the person role.|

*Table 6. ConnectionsProxy*

|Java EE Role|Description|
|------------|-----------|
|allAuthenticated|All authenticated users in the application server's security domain.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access.|
|person|Logical role for read/write access to the application. Mapped to allAuthenticated by default.|
|reader|Logical role for read-only access to the application. Mapped to everyone by default.|

*Table 7. FileNet® Collaboration Services (libraries)*

|Java EE Role|Description|
|------------|-----------|
|Anonymous|By default, this role is mapped to Everyone. For more information, see the *Setting up anonymous access for a new FileNet deployment*topic.|
|Authenticated|When you install and configure FileNet Collaboration Services, this role is set to Everyone in order to use the HCL Connections login page. Ensure that this role and the Anonymous role are mapped to the same users and groups.|

*Table 8. Files roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|everyone|By default, this role is mapped to the Everyone group. Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|everyone-authenticated|Mapped by default to the All Authenticated in Application's Realm group. Do not modify this mapping.|
|files-owner|Users with this role have the privileges as the person role. They also have a personal file stream when they log in to Files. If a user is removed from this role after they already logged in to files, they continue to have a personal file library. However, the library is hidden from the main personal files user interface for them. If you change this role, or change members of groups in the role, use administrative commands to browse and delete applicable personal libraries. This role does not affect who can upload files to community file libraries. It is mapped to the All Authenticated in Application's Realm group by default. You can apply this role to a subset of users in the group to limit who can upload files.|
|global-moderator|Users with this role can moderate content. They can read, edit, and delete community files and comments that are already approved. They can reject or approve community files and comments that are awaiting approval. They can also quarantine content, restore or delete quarantined content, and close flags on content.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group. <br></br> **Remember:** If the reader role is mapped to a group other than Everyone, the person role must have the same mappings.|
|search-admin|Used by the Search application to read public and private data for creating search indexes.|
|widget-admin|Used by widget containers to alert widget applications about container changes. <br></br> The role is mapped to the user that is specified in the remoteHandlerAuthenticationAlias attribute. This attribute is defined in the widgets-config.xml file for each application. <br></br> The installation wizard sets this attribute to the connectionsAdmin alias and maps the widget-admin role to the user that is specified in that alias. The same user must also be mapped to the person role.|

*Table 9. Forums roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|forum-creator|Users with this role can create forums. By default, this role is mapped to the Everyone group, but it can be changed to a more restricted group if necessary.|
|discussThis-user|If Discuss This is enabled on Forums, users can see the **Discuss This**link in a topic page if they are members of a group that includes the discussThis-user role. By default, the role is mapped to the Everyone group.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|global-moderator|Users with this role can moderate content. They can read, edit, delete, reject, approve, quarantine, and close entries and comments, and flag inappropriate content.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|
|search-admin|Used by the Search application to read public and private data for creating search indexes. In cases where file attachments must be accessed, the user must also be added to the admin role.|
|widget-admin|Used by widget containers to alert widget applications about container changes. <br></br> The role is mapped to the user that is specified in the remoteHandlerAuthenticationAlias attribute. This attribute is defined in the widgets-config.xml file for each application. <br></br> The installation wizard sets this attribute to the connectionsAdmin alias and maps the widget-admin role to the user that is specified in that alias. The same user must also be mapped to the person role.|

*Table 10. Home page roles*

|Java EE Role|Description|
|------------|-----------|
|admin|This role is used to protect the Home page administrative user interface, which allows administrators to register new widgets and to enable and disable widgets. Users with this role can see a **Server metrics** link in the Home page footer. By default, this role is not mapped to any users. You must map specific administrator user IDs to the role, but do not map the role to the Everyone or All Authenticated in Application's Realm groups.|
|everyone|This role applies to the Home page login page and the service configuration APIs only. The role allows users to access these resources without authentication. By default, the role is mapped to the Everyone group. Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|This role is used to secure the Home page user interface. By default, this role is mapped to the All Authenticated in Application's Realm group, which means that all authenticated users can access the Home page. Users must authenticate to access the Home page so, this role must not be mapped to the Everyone group. If you must restrict access to a smaller set of users, modify the mapping of this role as necessary.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group. <br></br> **Notes:** <br></br> -    The Home page application uses this role to access the Search APIs. <br></br> -   Modifying this role has no effect on the Home page.|

*Table 11. Metrics roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|community-metrics-run|Other than administrators, only the community owners who are assigned to the community-metrics-run role can access community metrics. Users with this level of access see static reports of community metrics, which can be refreshed by clicking **Update** in the Metrics user interface. You can map this role to all users or to a subset of the user population. For example, you can gradually provide the community metrics feature to users by mapping this role to a small group and adding more users later. <br></br> **Attention:** This role and the community-metrics-run role for Communities must be mapped to the same users.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|everyone-authenticated|Mapped by default to the All Authenticated in Application's Realm group. Do not modify this mapping.|
|metrics-report-run|Grants users the authority to view and interact with global metrics. Other than administrators, only the users that are assigned to the metrics-report-run role can access global metrics. Whenever a user with this authorization level views global metrics, the report information is updated automatically. For best results, limit access to a small set of users whose jobs require them to view the most recent metrics. Granting this level of access to many users might slow performance because update requests are processed in sequence|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|

*Table 12. Mobile roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Assign this role to users who administer mobile security management.|
|everyone|Applies to the Mobile page login page API. This role allows users to access these resources without any authentication. By default, the role is mapped to the Everyone group.Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|person|Used to secure all Mobile pages other than the login page. By default, this role is mapped to the All Authenticated in Application's Realm group so that all authenticated users can access the Mobile pages. If you want to restrict access to a smaller set of users, modify the mapping of this role. However, do not map this role to the Everyone group because the Mobile application must not be available to unauthenticated users.|
|reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|

*Table 13. Moderation roles*

|Java EE Role|Description|
|------------|-----------|
|everyone-authenticated|Mapped by default to the All Authenticated in Application's Realm group. Do not modify this mapping.|
|global-moderator|Users with this role can moderate content. They can read, edit, delete, reject, approve, quarantine, and close entries and comments, and flag inappropriate content. <br></br> To moderate content, users must be mapped to the global-moderator role in the Blogs, Forums, or Files applications. For example, a user who wants to moderate Blogs in a community must be mapped to the global-moderator role in Communities, Moderation, and Blogs.|
|person|Used to secure the Atom APIs for "top stories" or "saved stories" and to secure the Email preferences page. Users must authenticate to access the New APIs and preferences page. By default, this role is mapped to the All Authenticated in Application's Realm group. If you want to restrict access to a smaller set of users, modify the mapping of this role. Do not map this role to the Everyone group because the email preferences page must not be available to unauthenticated users.|
|reader|Applies to public Atom APIs. Modifying this role limits access to the public APIs. <br></br> Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|

*Table 14. News roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Defined in the news repository but, by default, this role is not mapped to any users. Changing the mapping of this role has no effect on the news repository. <br></br> To delete items posted by the microblogging APIs, a user must be mapped to this role. These items include status updates such as comments, recommendations, and third-party OpenSocial APIs. A user in this role can view any Community feed.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Used to secure the Atom APIs for "top stories" or "saved stories" and to secure the Email preferences page. Users must authenticate to access the New APIs and preferences page. By default, this role is mapped to the All Authenticated in Application's Realm group. If you want to restrict access to a smaller set of users, modify the mapping of this role. Do not map this role to the Everyone group because the email preferences page must not be available to unauthenticated users.|
|reader|Applies to public Atom APIs. Modifying this role limits access to the public APIs. <br></br> Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|
|search-admin|Used by the Search application to read public and private data for creating search indexes. In cases where file attachments must be accessed, the user must also be added to the admin role.|
|sharebox-reader|Allows read/write access to sharebox resources. By default, this role is mapped to the Everyone group.|
|widget-admin|Used by widget containers to alert widget applications about container changes. <br></br> The role is mapped to the user that is specified in the remoteHandlerAuthenticationAlias attribute. This attribute is defined in the widgets-config.xml file for each application. <br></br> The installation wizard sets this attribute to the connectionsAdmin alias and maps the widget-admin role to the user that is specified in that alias. The same user must also be mapped to the person role.|

*Table 15. Profiles roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|allAuthenticated|This role is used to secure the login-redirect page. The role is needed to correctly redirect users back to the page that they were attempting to access before the login procedure began. <br></br> The role is mapped to the All Authenticated in Application's Realm group by default. Do not change the default mappings for this role because it is used internally by HCL Connections. Changing the role might affect the ability to log in to the application.|
|dsx-admin|Used by the Profiles directory service extension to read both public and private data. This role secures the directory service communication when email addresses are hidden.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|
|search-admin|Used by the Search application to read public and private data for creating search indexes.|

*Table 16. Search roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Administrative role. No default mappings are defined for this role. The installation wizard maps the person that is defined as the system administrator to this role.|
|everyone|Not used. There are no default mappings that are defined for this role. By default, this role is mapped to the Everyone group. Changing the mapping has no effect.|
|everyone-authenticated|Mapped by default to the All Authenticated in Application's Realm group. Do not modify this mapping.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Restricts access to the user interface for the Search application and personal Atom API searches \(/atom/mysearch\). By default, this role is mapped to the Everyone group but this mapping can be changed to a more restricted group if needed.|
|reader|Used to protect the Atom APIs, except for /atom/mysearch. Modifying this role limits access to the public APIs. Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group.|
|search-admin|This role is used for two purposes: <br></br> -   For auditing content in the entire Connections deployment by allowing this user to bypass internal access control in the search index and to search private content across all applications. This capability allows the user to search for a term across all indexed content, but does not allow access to the content itself, but only. The role is typically used to ensure that content does not violate organizational content policies. <br></br> -   For validating the configuration of the Search application by granting access to the Search status page. <br><br> **Note:** Granting the search-admin role exclusively for auditing tasks to a user may inadvertently expose restricted content. Consequently, the role is intended to have limitations. |

<!--Note for Table 16 search roles. Users with this role may experience certain limitations with UI-based search functionality.-->

*Table 17. WidgetContainer roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Controls access to the WidgetCatalogServlet and the WidgetCatalog Feed \(SmartCloud only.\) Users with this role can delete and update Activity Stream entries.|
|allAuthenticated|All authenticated users in the application server's security domain.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|global-moderator|Users with this role can moderate content. They can read, edit, delete, reject, approve, quarantine, and close entries and comments, and flag inappropriate content.|
|mail-user|User who are mapped to this role can view the mail and calendar applications.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application.|
|trustedExternalApplication|Used to distribute third-party events on behalf of other users. This role supports targeting to individual users and Communities and the impersonation of existing users for OpenSocial POST APIs. Connections Content Manager uses this role to publish events to the Connections activity stream.|

*Table 18. Wikis roles*

|Java EE Role|Description|
|------------|-----------|
|admin|Used by an administrator to manage application content. For more information, see the *Administering application content* topic.|
|everyone|Users with this role can access public pages without signing in to the application. The login page is an example of a page that allows such access. <br></br> Do not change the default mapping for this role because it is used internally by HCL Connections. Changing the mapping might affect the ability to log in to the application.|
|everyone-authenticated|Mapped by default to the All Authenticated in Application's Realm group. Do not modify this mapping.|
|metrics-reader|Logical role for metrics read-only access to the application. By default, this role is mapped to the Everyone group.|
|person|Users with this role can read and write to the application. Mapped to the All Authenticated in Application's Realm group by default. <br></br> **Remember:** The default mapping for this role is All Authenticated in Application's Realm.|
|reader|Users with this role have read-only access to the application. By default, the role is mapped to the Everyone group. If you map the role to the All Authenticated in Application's Realm group, users must log in before they can use the application. <br></br> This role is also used to restrict access to the Ajax proxy. In a production environment, map this role to the All Authenticated in Application's Realm group. <br></br> **Remember:** If this role is mapped to a group other than Everyone, the person role must have the same mappings.|
|search-admin|Used by the Search application to read public and private data for creating search indexes. In cases where file attachments must be accessed, the user must also be added to the admin role.|
|widget-admin|Used by widget containers to alert widget applications about container changes. <br></br> The role is mapped to the user that is specified in the remoteHandlerAuthenticationAlias attribute. This attribute is defined in the widgets-config.xml file for each application. <br></br> The installation wizard sets this attribute to the connectionsAdmin alias and maps the widget-admin role to the user that is specified in that alias. The same user must also be mapped to the person role.|
|wiki-creator|Users with this role can create wikis outside of communities. By default, the role is mapped to the All Authenticated in Application's Realm group. This role does not determine whether users can create wikis in communities.|

- **[Assigning people to Java EE roles](../admin/t_admin_common_user_roles_assign.md)**  
Assign roles for HCL Connections users on WebSphere Application Server.

**Parent topic:** [Managing access](../admin/c_admin_common_managing_access.md)

**Related information**  

[Administering application content](../admin/r_admin_common_superusers.md)
