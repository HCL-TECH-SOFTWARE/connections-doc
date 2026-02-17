# Enabling Connections to use the app registry service {#t_ms_teams_enable_conn_use_appreg .task}

Personal chats in Microsoft Teams \(from the Connections business card, profile, and Important to Me bubble\) require that Connections is enabled to make requests to the app registry service to discover the extensions that enable those integrations.

Make sure that you have [enabled the app registry extensions for Microsoft Teams integration](#t_ms_teams_enable_conn_use_appreg).

By default, Connections applications do not try to make requests to the app registry service to avoid unnecessary requests if the app registry service has not been deployed as part of a Component Pack installation.

1.  Locate the WAS\_HOME\\profiles\\WAS\_Profile\\config\\cells\\Host\_name\\LotusConnections-config\\LotusConnections-config.xml file.

2.  Locate the `sloc:serviceReference` section where serviceName="extensionRegistry" in the file.

3.  Check that both the `enabled` and `ssl_enabled` properties are present and set to true.

4.  If they are not true, update the configuration file so the section looks as follows \(where httpserver.domain.com is the host name used to connect to Connections\):

    ```
    <sloc:serviceReference bootstrapHost="admin replace" bootstrapPort="admin replace" clusterName="" enabled="true" serviceName="extensionRegistry" ssl_enabled="true">
        <sloc:href>
          <sloc:hrefPathPrefix>/appregistry</sloc:hrefPathPrefix>
          <sloc:static href="admin replace" ssl_href="admin replace"/>
          <sloc:interService href="admin replace"/>
        </sloc:href>
      </sloc:serviceReference>
    ```

5.  If you made changes, restart the server.

[Updating WebSphere to support single sign-on with Connections for Microsoft Teams](t_ms_teams_update_websphere_for_sso.md)
