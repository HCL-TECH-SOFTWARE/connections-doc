# Configure access for the Tiny Editors Services through a HTTP proxy {#setup-services-appconf-create-an-application-conf .task}

Configure access for the Tiny Editors Services through a HTTP proxy for outgoing HTTP/HTTPS requests from the Tiny Editors Services.

**Before you begin:** Ensure that you have [created an application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_01-create-an-application-conf.md) in the correct directory.

1.  Using a text editor, open the Tiny Editors Services configuration file application.conf.

2.  Add a `proxy` element.

    Under the `ephox` root element, add a `proxy` element defining the proxy settings using the following attributes:

    |Attribute|Required|Description|
    |---------|--------|-----------|
    |`http.proxyHost`|Yes|A string defining the host name of the proxy for HTTP \(unsecured\) connections.|
    |`http.proxyPort`|Yes|An integer defining the port number of the proxy for HTTP \(unsecured\) connections.|
    |`https.proxyHost`|No|A string defining the host name of the proxy for HTTPS connections.|
    |`https.proxyPort`|No|An integer defining the port number of the proxy for HTTPS connections.|
    |`http.nonProxyHosts`|No|A list of strings separated by vertical lines \("\|"\) listing hosts and domains to be excluded from proxying, for HTTP and HTTPS connections. The strings can contain asterisks \("\*"\) as wild cards. Defaults to "localhost\|127.\*\|\[::1\]" if not set.|
    |`http.proxyUser`|No|User name for authenticating to both the HTTP and HTTPS proxy.|
    |`http.proxyPassword`|No|Password for authenticating to both the HTTP and HTTPS proxy.|

    An example of proxy settings:

    ```sh
    ephox {
        proxy {
            http.proxyHost = someproxy.internal.corp
            http.proxyPort = 8080
            https.proxyHost = someproxy.internal.corp
            https.proxyPort = 8443
            http.nonProxyHosts = localhost|*.internal.corp
        }
    }
    ```

3.  Save your updates to `application.conf`.

4.  If the services have been deployed, stop and restart **TinyEditorsServices** to apply the configuration changes.


**Parent topic:** [Configuring the application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_00-summary.md)

