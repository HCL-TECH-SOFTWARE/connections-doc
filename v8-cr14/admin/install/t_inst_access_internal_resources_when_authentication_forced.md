# Deploying URL preview in an environment where anonymous access is disabled {#t_inst_access_internal_resources_when_authentication_forced .task}

To deploy URL preview optionally in an environment where anonymous access is disabled within HCL Connections, you must define a system user as a proxy for the oEmbed/image proxy services so that it can perform HTTP requests.

HCL Connections can be configured to [force user authentication](../secure/t_admin_common_force_authentication.md) prior to accessing public information. When HCL Connections is configured to force authentication, the following steps must be performed in order to allow the oEmbed / image proxy services to perform HTTP requests to access the public information on the Connections platform:

1.  Define a new "system" user in your user repository that can log into Connections.

    In the following steps, the oEmbed / image proxy is configured to log in as this "system" user when performing HTTP request against Connections resources. To avoid leaking private resources from Connections, it is important to ensure that this user does not have access to any private resource on the Connections environment such as not being a member of a community, or a participant in an activity, and so on.

    -   This "system" user only should be used for the oEmbed / image proxy purposes \(as opposed to being also an actual end-user on the platform\).
    -   Do not use the default admin user, since administrative users have access to all Connections content \(including private content\).
2.  Create a JAAS authentication alias if it does not exist named urlpreviewJAASAuthS2S. Set the username and password of the user defined in step 1.

    **Note:** The name of the JAAS authentication alias used by the service can be configured in the og-config.xml file as described in [Configuring URL preview](../admin/t_admin_news_url_preview_config.md).

3.  In the og-config.xml file, set the **security.anonymousAccess** attribute to true.

4.  In the og-config.xml file, set the **jaasOembedAuthAlias** attribute to urlpreviewJAASAuthS2S.

5.  Synchronize the WebSphere® Application Server nodes and restart the URL Preview **oEmbed** application to apply the settings.


**Parent topic:**[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

