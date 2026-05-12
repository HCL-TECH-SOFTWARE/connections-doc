# Allowing third-party applications access to data via the OAuth2 protocol {#allowingthird-partyapplicationsaccesstoconnectionsdata .concept}

Allow third-party applications to ask your HCL Connections users for access to their data.

HCL Connections now supports the OAuth 2.0 standard authorization protocol. Third-party applications \("consumer" applications\) can use a combination of OAuth and the HCL Connections API to access HCL Connections data.

Before a consumer application can access a user's HCL Connections data, an HCL Connections administrator must register the application. Then the user must give the application permission. Once a consumer application is registered and has permission it can employ the user's data, and push its own data to a user's status updates. "HCL Connections data" here means all of the user's data, including photographs, personal profile information, and any content they have added anywhere. For example, a social networking application could display a user's profile picture and personal information. It could also push status updates the user makes in the consumer application to the HCL Connections activity stream and status updates.

As an HCL Connections administrator you create and manage a list of registered consumer applications. List membership might depend upon agreements with the consumer application companies. You can use commands to add, edit, view information on, count, and delete consumer applications from the list.

When users open the consumer application they are prompted to give or deny the application permission to access the user's HCL Connections data. Permission is granted by a token which expires in six months if not renewed by the user. When a permission expires users must visit the consumer application again and go through the authorization process. Users also can remove an application's permission at any time in Connections by clicking **Settings** \> **Application Access**. This authorization management interface is customizable.

!!! note 
    
    If you wish to add gadgets deployed externally, such as iGoogle gadgets, you must configure locked domains. Locking domains isolates semi-trusted gadgets and prevents them from accessing SSO tokens or via DOM access to the parent page of the gadget iFrame that can be used to forward sensitive data to external sites. For more information on locked domains, refer to [Enabling locked domains](../install/t_post_install_cre11_conn_security_locked.md).

To connect an OAuth 2 client with HCL Connections using HCL Connections APIs with the Open Authentication 2 protocol the supported flow is as follows:

Authorization code grant flow.

Authorization endpoint URL:

`https://www.connections.example.com/oauth2/endpoint/connectionsProvider/authorize`

Token endpoint URL:

`https://www.connections.example.com/oauth2/endpoint/connectionsProvider/token`

!!! note 
    
    The /oauth2 context root is configurable as is any other Connections application via the IBM console. The change should be applied to the LotusConnections-config.xml in the `"oauthprovider"` service as follows:

```sh
<sloc:serviceReference serviceName="oauthprovider"
enabled="true" 
ssl_enabled="true" 
bootstrapHost="admin_replace"
bootstrapPort="admin_replace"
clusterName="">
<sloc:href>
<sloc:hrefPathPrefix>/oauth2</sloc:hrefPathPrefix>
<sloc:static href="http://www.connections.example.com" ssl_href="https://www.connections.example.com"/>
<sloc:interService href="https://www.connections.example.com"/>
</sloc:href>
</sloc:serviceReference> 
```

The following additional topics provide information about administering OAuth in HCL Connections:

-   **[Managing the client application list](../admin/r_admin_common_oauth_manage_list.md)**  
Use commands to manage the list of client applications that are allowed to prompt users for access to their HCL Connections data, using the OAuth authentication protocol.
-   **[Installing and enabling OAuth TAI](../admin/t_inst_installingandenablingoauthtai.md)**  
You need to install and enable the OAuth TAI in HCL Connections.
-   **[Registering an OAuth client with a provider](../admin/t_admin_registeroauthclientwprovider.md)**  
You need to register any OAuth clients with an OAuth provider.
-   **[CRE Proxy Configuration](../customize/r_cremashupsproxyconfiguration.md)**  
For communication, the Common Rendering Engine \(CRE\) proxy leverages two proxy configuration files: the external proxy configuration proxy-opensocial-config.pl file and the internal proxy configuration proxy-opensocial-internal-config.tpl file.
-   **[Configuring OAuth for custom gadgets](../customize/r_admin_common_oauth_config_homepage_gadgets-N.md)**  
The HCL Connections™ supports an OAuth 2.0 consumer proxy that allows the Homepage component to surface gadgets in an OpenSocial container that can interact with an OAuth 2.0 protected service. In order for this proxy to function, there are a series of new administration commands that are exposed in the News service to define OAuth 2.0 providers, clients, and the associated gadget that will interact with the protected service.

**Parent topic:** [Security](../secure/c_sec_overview.md)

