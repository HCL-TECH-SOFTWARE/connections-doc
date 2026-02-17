# Informing users of an upgrade or update {#t_bring_down_4_maintenance .task}

Configure maintenance messages about upgrading or updating HCL Connections.

When you upgrade or update HCL Connections, inform your users that the environment is offline temporarily. Inform them directly through a broadcast or email.

During the maintenance period, you can choose either to stop HTTP Server or redirect all HTTP traffic to a server maintenance notification page.

To bring down Connections in preparation for upgrading or updating, complete the following steps:

1.  Inform users of the planned outage with details of when the maintenance work begins and how long it is scheduled to last. You can send email notifications to community members or post a message to an area of the product that is used to provide site status information.

2.  Perform one of the following steps:

    -   Stop the HTTP Server. Ensure that no other applications are using the HTTP Server.
    -   Keep the web server running but redirect users to a server maintenance notification page, following these steps to add `Location` and `ErrorDocument` stanzas to the httpd.conf configuration file for the HTTP Server:
        1.  Create an HTML document named upgrading.html. Add text to the page that informs users that Connections is temporarily unavailable because of scheduled maintenance work. Point to the maintenance page by using these ErrorDocument statements in the httpd.conf file:

            ErrorDocument 401 /upgrading.html

            ErrorDocument 403 /upgrading.html

        2.  Create a rewrite rule to redirect requests for Connections. Add the following element to the httpd.conf file to block all non-authorized IP addresses from reaching the server and to send the user to the upgrading.htm page:

            <Location / \>

            Order Deny,Allow

            Deny from all

            Allow from your.ip.address

            Allow from ip.address.of.each.machine.in.deployment

            </Location\>

            **Note:** You must have an Allow element for every instance of WebSphere® Application Server in your deployment.

    **Important:** When your deployment of Connections uses plug-ins, this approach returns a `403 HTTP` "Forbidden" response code. However, the Connections plug-ins cannot handle the 403 HTTP response code and display a userid/password prompt, but providing the user credentials fails. To avoid this situation, use the following approach, which returns a `500 HTTP` "Internal Server Error" response code. Add the following lines to the end of the httpd.conf file:

    ```
    LoadModule rewrite_module modules/mod_rewrite.so
    RewriteEngine on
    RewriteCond %{REMOTE_HOST} !^127.0.0.1
    RewriteCond %{REMOTE_HOST} !^192.168.157.139
    RewriteCond %{REMOTE_HOST} !^192.168.157.140
    RewriteRule !^/upgrading.htm$ /upgrading.htm [L,R=500]
    ErrorDocument 500 /upgrading.htm
    ```

    Again, exclude the IP addresses of servers and desktops, which still have access to the environment during maintenance. Using the `RewriteCond` lines in the example, exclude every instance of WebSphere Application Server in your deployment.


When the upgrade or update is complete, remove the Location and ErrorDocument stanzas from the httpd.conf file.

**Parent topic:**[Getting ready for upgrading or updating](../migrate/t_prepare_migrate_upgrade.md)

**Related information**  


[Backing up Connections](../migrate/t_back-up.md)

[Saving your customizations](../migrate/c_configuration_changes_after_update.md)

