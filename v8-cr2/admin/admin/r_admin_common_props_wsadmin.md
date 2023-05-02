# Properties that you can edit by using the wsadmin client {#properties-edit-wsadmin .reference}

Common configuration properties for HCL Connections that you can change by using the wsadmin client.

## Updating configuration properties { .section}

The following list defines the configuration properties that can be edited by using the `updateConfig` command in the wsadmin client.

**activities.ejb.cluster**

Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**activities.ejb.port**

Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**activities.ejb.server**

Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**activities.enabled**

Specifies whether this application can be accessed over HTTP.

This property accepts a value of true or false.

**activities.href**

Web address from which to access this application over HTTP.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**activities.href.prefix**

Context root from which to access the application.

For example: /activities

**activities.interService.href**

Web address from which other HCL Connections applications access this application.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**activities.pcs.name.js.eval**

Label of the link from the business card to this application.

**activities.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**activities.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**activities.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**allowedContent.contentType.enabled**
Specifies whether the active content filter removes Flash animation files from entries in the Blogs and Wikis applications.

This property accepts a value of true or false.

Editing this value has no effect. For information about how to prevent Flash from being added to entries in those applications, see *Configuring the active content filter for Blogs and Wikis*

**blogs.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**blogs.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**blogs.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**blogs.enabled**
Specifies whether this application can be accessed over HTTP.

**blogs.href**
Web address from which to access this application over HTTP.

**blogs.href.prefix**
Context root from which to access the application. 

For example: /blogs

**blogs.interService.href**
Web address from which other HCL Connections applications access this application.

**blogs.pcs.name.js.eval**
Label of the link from the business card to this application.

**blogs.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**blogs.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**blogs.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**communities.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**communities.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**communities.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**communities.enabled**
Specifies whether this application can be accessed over HTTP.

**communities.href**
Web address from which to access this application over HTTP.

**communities.href.prefix**
Context root from which to access the application. 

For example: /communities

**communities.interService.href**
Web address from which other HCL Connections applications access this application.

**communities.pcs.name.js.eval**
Label of the link from the business card to this application.

**communities.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**communities.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**communities.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**connections.blogs.feed.return401\_fornopermission\_toviewblog**
If this setting is present and set to true, return a 401 error if the user does not have permission to view a blog entry. Otherwise, return a 403 error.

**connections.blogs.lastModifierDisabled**
Controls whether to display the last modifier information in blog entries.

**connections.blogs.onlymembercanvote**
Specify true if you want to limit voting in an Ideation blog to the community members.

**customAuthenticator.name**
Specifies the short name of the code to secure server to server communication. You can select from the following options:

-   DefaultAuthenticator: Uses the IBM® LTPA token to secure the connection. This option is the default.
-   SiteMinderAuthenticator: Uses a SiteMinder token to secure the connection.
-   ISAMAuthenticator: Uses the IBM Security Verify Access (formerly Security Access Manager) token to secure the connection.

**Note:** The customAuthenticator.ConnectionTimeout, customAuthenticator.CookieTimeout, customAuthenticator.DefaultMaxConnectionsPerHost, customAuthenticator.MaxTotalConnections, and customAuthenticator.SoTimeout properties were deprecated in version 3.

**deployment.id**
Unique identifier of the current deployment. When the address of a deployment changes, this ID is used by plug-ins and other API clients to determine whether the new address is the same deployment. The deployment ID is a unique value that is generated during installation.

You can manually assign an ID to a deployment. To assign the ID, complete the following steps:

1.  Use the reversed domain name of the HCL Connections installation. For example: `com.example.social-intranet`.
2.  If the deployment moves from one installation or host name to another, set the value of the new deployment ID to the same value as the original deployment.

The deployment.id value is exposed within the atom:id of the /serviceconfigs API feed, which is available from all HCL Connections applications.

**dogear.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**dogear.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**dogear.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**dogear.enabled**
Specifies whether this application can be accessed over HTTP.

**dogear.href**
Web address from which to access this application over HTTP.

**dogear.href.prefix**
Context root from which to access the application. 

For example: /dogear

**dogear.interService.href**
Web address from which other HCL Connections applications access this application.

**dogear.pcs.name.js.eval**
Label of the link from the business card to this application.

**dogear.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**dogear.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**dogear.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**dynamicHosts.enabled**
Specifies whether a reverse proxy is configured for HCL Connections.

This property accepts a value of true or false.

**dynamicHosts.href**
Web address from which to access HCL Connections through a reverse proxy over HTTP.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**dynamicHosts.ssl\_href**
Web address from which to access HCL Connections through a reverse proxy over HTTPS.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**email.expose.enabled**
Specifies whether to display user email addresses in the user interface, notifications, and URLs.

This property accepts a value of true or false.

**files.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**files.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**files.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**files.enabled**
Specifies whether this application can be accessed over HTTP.

**files.href**
Web address from which to access this application over HTTP.

**files.href.prefix**
Context root from which to access the application. 

For example:/files

**files.interService.href**
Web address from which other HCL Connections applications access this application.

**files.pcs.name.js.eval**
Label of the link from the business card to this application.

**files.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**files.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**files.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**force.conf.comm.enabled**
Specifies whether access to HCL Connections applications can be reached only over \(HTTPS.

This property accepts a value of true or false.

If you set the value of this property to true, the value of the profiles.directory.service.extension.href property must be specified as an HTTPS address. If Profiles or Communities directory service integration is enabled, the communities.directory.service.extension.href property must also be specified as an HTTPS address.

**forums.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**forums.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**forums.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**forums.enabled**
Specifies whether this application can be accessed over HTTP.

**forums.href**
Web address from which to access this application over HTTP.

**forums.href.prefix**
Context root from which to access the application.

For example: /forums

**forums.interService.href**
Web address from which other HCL Connections applications access this application.

**forums.pcs.name.js.eval**
Label of the link from the business card to this application.

**forums.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**forums.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**forums.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**help.enabled**
Specifies whether the help system can be accessed over HTTP.

This property accepts a value of true or false.

**help.href**
Web address from which to access this application over HTTP.

**help.href.prefix**
Context root from which to access the application.

For example: /help

**help.interService.href**
Web address from which other HCL Connections applications access this application.

**help.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**help.ssl.href**
Web address from which to access the help system over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**homepage.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**homepage.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**homepage.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**homepage.enabled**
Specifies whether this application can be accessed over HTTP.

**homepage.href**
Web address from which to access this application over HTTP.

**homepage.href.prefix**
Context root from which to access the application.

For example: /homepage

**homepage.interService.href**
Web address from which other HCL Connections applications access this application.

**homepage.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**homepage.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**metrics.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**metrics.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**metrics.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**metrics.enabled**
Specifies whether this application can be accessed over HTTP.

**metrics.href**
Web address from which to access this application over HTTP.

**metrics.href.prefix**
Context root from which to access the application.

For example: /metrics

**metrics.interService.href**
Web address from which other HCL Connections applications access this application.

**metrics.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**metrics.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**mobile.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**mobile.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**mobile.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**mobile.enabled**
Specifies whether HCL Connections can be accessed from a mobile device over HTTP.

This property accepts a value of true or false.

**mobile.href**
Web address from which to access HCL Connections over HTTP from a mobile device.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**mobile.href.prefix**
Context root from which to access the application.

For example: /mobile

**mobile.interService.href**
Web address from which HCL Connections applications can access each another through a mobile device.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**mobile.ssl.enabled**
Specifies whether HCL Connections applications can be accessed from a mobile device over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**mobile.ssl.href**
Web address from which to access HCL Connections over HTTPS from a mobile device.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**news.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**news.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**news.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**news.enabled**
Specifies whether Home page updates can be accessed over HTTP.

This property accepts a value of true or false.

**news.href**
Web address from which to access this application over HTTP.

**news.href.prefix**
Context root from which to access the application.

For example: /news

**news.interService.href**
Web address from which other HCL Connections applications access Home page updates.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**news.ssl.enabled**
Specifies whether Home page updates can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**news.ssl.href**
Web address from which to access Home page updates over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**oneToTwoMapping.enabled**
Specifies whether to perform one-to-two mapping on search terms. Enter a value of true or false. When this value set to true, HCL Connections™ performs a one-to-two mapping on search terms. For example, for an occurrence of the term Müller, the terms Müller and Mueller are stored in the index. This configuration results in a larger index. If you want to change this option, complete the steps in the *Deleting the index* topic.

**organization.name**
The name of your organization or company. Applies only to Communities. Appears in the Communities navigation panel, the Communities menu, the Communities search box, and the title in the browser tab. The default value is My Organization.

**personTag.href**
Web address from which to access the business card service over HTTP.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**personTag.href.prefix**
Context root from which to access the business card.

**personTag.interService.href**
Web address from which other HCL Connections applications access the business card.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**personTag.enabled**
Specifies whether a business card can be accessed over HTTP.

This property accepts a value of true or false.

**personTag.ssl.enabled**
Specifies whether the business card can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**personTag.ssl.href**
Web address from which to access the business card service over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**profiles.directory.service.extension.enabled**
Identifies whether the Profiles directory service integration is enabled. When this integration is enabled, HCL Connections retrieves user information from the Profiles database instead of from the LDAP server.

This property accepts a value of true or false.

The property is set to false by default. During the installation, if you specify the Profiles database as the user directory, this value is set to true.

**Note:** Group information can be retrieved from the LDAP directory only.

**Tip:** The profiles.directory.service.extension.auth, profiles.directory.service.extension.auth.alias, communities.directory.service.extension.auth, communities.directory.service.extension.auth.alias, and communities.directory.service.extension.enabled properties cannot be edited by using wsadmin commands.

**profiles.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**profiles.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**profiles.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**profiles.enabled**
Specifies whether this application can be accessed over HTTP.

**profiles.href**
Web address from which to access this application over HTTP.

**profiles.href.prefix**
Context root from which to access the application.

For example: /profiles

**profiles.interService.href**
Web address from which other HCL Connections applications access this application.

**profiles.pcs.name.js.eval**
Label of the link from the business card to this application.

**profiles.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**profiles.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**profiles.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**quickr.enabled**
Specifies whether a link from the business card to a Lotus® Quickr®™ place can be accessed over HTTP.

This property accepts a value of true or false.

For more information about Lotus Quickr properties, see *Using business cards* in the *Administering Profiles* section of the product documentation.

**quickr.href**
Web address from which to access a Lotus Quickr place over HTTP.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**quickr.href.prefix**
Context root from which to access Sametime® awareness services. For example: /quickr

**quickr.interService.href**
Web address from which other HCL Connections applications access this application.

**quickr.pcs.name.js.eval**
Label of the link from the business card to this application.

**quickr.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**quickr.ssl.enabled**
Specifies whether a link from the business card to a Lotus Quickr place can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**quickr.ssl.href**
Web address from which to access a Lotus Quickr place over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**sametimeLinks.anonymousLogin.enabled**
Specifies whether Sametime Links resources can be accessed anonymously.

This property accepts a value of true or false.

**Note:** Do not edit this property. For information about how to add Sametime awareness to HCL Connections, see the *Adding Sametime awareness to HCL Connections* topic.

**sametimeLinks.enabled**
Specifies whether the ability to connect to the Sametime Links resources over HTTP is enabled.

This property accepts a value of true or false.

**Note:** Do not edit this property. For information about how to add Sametime awareness to HCL Connections, see the *Adding Sametime awareness to HCL Connections* topic.

**sametimeLinks.href**
Web address from which Sametime Links resources can be accessed over HTTP.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Note:** Do not edit this property. For information about how to add Sametime awareness to HCL Connections, see the *Adding Sametime awareness to HCL Connections* topic.

**sametimeLinks.href.prefix**
Context root from which to access the application. For example: `/sametime`.

**sametimeLinks.interService.href**
Web address from which Sametime Links resources can be accessed from other HCL Connections applications.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**sametimeLinks.ssl.enabled**
Specifies whether Sametime Links resources can be accessed over HTTPS.

**Note:** Do not edit this property. For information about how to add Sametime awareness to HCL Connections, see the *Adding Sametime awareness to HCL Connections* topic.

**sametimeLinks.ssl.href**
Web address from which Sametime Links resources can be accessed over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Note:** Do not edit this property. For information about how to add Sametime awareness to HCL Connections, see the *Adding Sametime awareness to HCL Connections* topic.

**sametimeProxy.enabled**
Specifies whether Sametime proxy resources can be accessed over HTTP.

This property accepts a value of true or false.

**sametimeProxy.href**
Web address from which Sametime proxy resources can be accessed over HTTP.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**sametimeProxy.interService.href**
Web address from which Sametime proxy resources can be accessed from other HCL Connections applications.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**sametimeProxy.ssl.enabled**
Specifies whether Sametime proxy resources can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**sametimeProxy.ssl.href**
Web address from which Sametime proxy resources can be accessed over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**sand.enabled**
Specifies whether Social Networking and Discovery resources can be accessed over HTTP.

This property accepts a value of true or false.

**sand.href**
Web address from which Social Networking and Discovery resources can be accessed over HTTP.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**sand.href.prefix**
Context root from which to access the application.

For example: /sand

**sand.ssl.enabled**
Specifies whether Social Networking and Discovery resources can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**sand.ssl.href**
Web address from which Social Networking and Discovery resources can be accessed over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**search.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**Note:** This property has no default value and must not be modified.

**search.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**search.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**Note:** This property has no default value.

**search.enabled**
Specifies whether Advanced Search can be accessed over HTTP.

This property accepts a value of true or false.

**search.href**
Web address from which to access Advanced Search over HTTP.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**search.href.prefix**
Context root from which to access the application.

For example: /search

**search.ignore.punctuation.enabled**
Specifies whether to ignore punctuation in search terms.

This property accepts a value of true or false.

When the property is set to true, punctuation in search terms is ignored. For example, for an occurrence of the term I.B.M, the terms I.B.M. and IBM are stored in the index.

**Note:** This configuration results in a larger index. To change this option, complete the steps in the *Deleting the index* topic.

**search.interService.href**
Web address from which other HCL Connections applications access Advanced Search.

Specify the protocol \(HTTP\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**search.language.sensitivity.enabled**
Specifies whether to enable language sensitivity in searches.

This property accepts a value of true or false.

When the property is set to true, the product supports accent-insensitive searches. For example, for an occurrence of ált, the product stores ált and alt.

**Note:** This configuration results in a larger index. To change this option, complete the steps in the *Deleting the index* topic.

**search.Queue\_Max**
If the server that hosts the Search application stops responding, a queue of requests is created. The length of the queue is defined by the value of this property. Only the last search request in the queue is sent to the Search server. When the server starts responding, the queue is no longer used. The default value is 10.

This property specifies the number of connections that are refused before a subsequent transaction is allowed.

**Note:** The property is used only when Search is installed on a different server from the server where a search is run.

**search.seedlist.maximumPageSize**
Maximum number of items on the search return page. The value must be greater than or equal to 100.

**search.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**search.ssl.href**
Web address from which to access Advanced Search over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**search.Transaction\_Max**
Maximum number of transactions allowed. This setting prevents the server that is running the search from running out of memory because the server is not responding. The default value is 20.

**Note:** The property is used only when Search is installed on a different server from the server where a search is run.

**seedlistSettings.maximumIncrementalQuerySpanInDays**
Number of days that deletion records are preserved before they can be deleted by the SearchClearDeletionHistory task. The value must be greater than or equal to 1.

HCL Connections keeps records of deleted files. These records are eligible to be deleted by the SearchClearDeletionHistory task after the number of days that are specified in this property.

The incremental search crawler needs these deletion records to update the search index. If the records are deleted before the incremental crawler reads them, updates become incomplete. Therefore, HCL Connections performs a full crawl instead of an incremental crawl.

Full crawls delete the existing search index and create a new one, which is more time-consuming than incremental crawls. To avoid frequent full crawls, ensure that this value is higher than the span of days between incremental crawls. For example, if incremental crawls happen every 4 days, ensure that this value is higher than 4 so that incremental crawls capture all deletion records.

**use.richTextEditor.inBookmarklet.enabled**
Specifies whether the description field on the Edit Bookmark form is a rich text or plain text field. The form is displayed when you create a bookmark by clicking **Add Bookmark**. The form loads more quickly with a plain text description field. The field is plain text by default.

This property accepts a value of true or false.

**versionStamp**
Defines a version number as an internal URL reference for static content on the product's webpages. After you customize HCL Connections or install an interim fix, the administrator increments the value of this property. The new value prevents users having to clear their web browser cache to see the latest changes. When you update the value of this property, pass a null value to make the server assign a time stamp value to it. If you choose to specify your own time stamp, use the following syntax: `yyyyMMdd.HHmmss`. For example: `20090720.034448`.

**wikis.ejb.cluster**
Name of the cluster on which the application is running in a network deployment. This property is used for JNDI lookups in cluster environments to ensure failover and load balancing on lookups.

**wikis.ejb.port**
Port number of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups. This value is usually 2809 but might be different if port 2809 is already in use.

**wikis.ejb.server**
Fully qualified domain name of the application server instance on the first node of the cluster that hosts this application. This information is used during JNDI lookups.

**wikis.enabled**
Specifies whether this application can be accessed over HTTP.

**wikis.href**
Web address from which to access this application over HTTP.

**wikis.href.prefix**
Context root from which to access the application.

For example: /wikis

**wikis.interService.href**
Web address from which other HCL Connections applications access this application.

**wikis.pcs.name.js.eval**
Label of the link from the business card to this application.

**wikis.pcs.url.pattern**
Web pattern of the link from the business card to this application.

**wikis.ssl.href**
Web address from which to access this application over HTTPS.

Specify the protocol \(HTTPS\), server name, and, optionally, the port number.

**Notes:**

-   Provide a fully qualified domain name.
-   This parameter is case-sensitive.

**wikis.ssl.enabled**
Specifies whether this application can be accessed over HTTPS.

This property is set to true by default.

**Note:** Disabling SSL is not supported.

**Parent topic:** [Common configuration properties](../admin/r_admin_common_props.md)

