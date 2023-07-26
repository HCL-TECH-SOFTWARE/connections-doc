# Configuring a reverse caching proxy

Configure a reverse proxy that directs all traffic to your HCL Connections deployment to a single server.

This is an optional configuration. It is recommended for optimal performance, especially if users are accessing HCL Connections from a wide area network \(WAN\).

Ensure that you have installed IBM® WebSphere® Edge Components which is supplied with WebSphere Application Server Network Deployment. For more information, go to the [WebSphere Edge Components](https://www.ibm.com/docs/was-nd/8.5.5?topic=edge-components-version-855) on the IBM Documentation site.

You must also have completed the basic configuration of WebSphere Edge Components, set up a target backend server, and created an administrator account.

The IBM WebSphere Application Server Edge components provide a caching proxy that you can use to optimize your deployment. Edge components are provided with the WebSphere Application Server Network Deployment software.

A reverse proxy configuration intercepts browser requests, forwards them to the appropriate content host, caches the returned data, and delivers that data to the browser. The proxy delivers requests for the same content directly from the cache, which is much quicker than retrieving it again from the content host. Information can be cached depending on when it will expire, how large the cache should be, and when the information should be updated.

This topic describes how to configure the Edge components to optimize the performance of HCL Connections.

**Note:** Some network caching devices cause users to experience intermittent errors in the Files, Community Files, and Wikis apps. To prevent this behavior, exclude Files and Wikis content from the caching. \(The Files and Wikis apps use preconditions when requesting certain content. Caching devices can return status 412 when those preconditions aren't met.\)

1.  Open the ibmproxy.conf configuration file for the Edge components in a text editor. The file is stored in the following directory:

    -   Linux™:/etc/
    -   Microsoft™ Windows™: C:\\Program Files\\IBM\\edge\\cp\\etc\\en\_US\\
2.  Make the following edits to the file:

    1.  In the SendRevProxyName Directive section, add or enable the following rule:

        SendRevProxyName yes

    2.  In the PureProxy Directive section, add or enable the following rule:

        PureProxy off

    3.  In the SSL Directives section, add or enable the following rules:

        SSLEnable On

        SSLCaching On

    4.  In the Keyring Directive section, add or enable the following rules:

        KeyRing C:\\ProxyKey\\proxykey.kdb

        KeyRingStash C:\\ProxyKey\\proxykey.sth

    5.  In the URL Rewriting rules section, add the following reverse pass rules:

        ReversePass http://httpserver/\* http://proxyserver/\*

        ReversePass https://httpserver/\* https://proxyserver/\*

        where httpserver is the host name of the HTTP server. The HTTP server is usually IBM HTTP Server, but could be a load balancer or another proxy, depending on your deployment. proxyserver is the host name of the proxy server.

        **Note:** You can specify \* in the URL \(to indicate that all URLs for the server can be passed\) only if HCL Connections is the only application installed on the server. Alternatively, you can use a more specific URL such as http://httpserver/connections/\*. You can use more than one ReversePass rule if you need to specify different servers for each component.

    6.  Also in the Mapping Rules section, add the following proxy rules:

        Proxy /\* http://httpserver/\* :80

        Proxy /\* https://httpserver/\* :443

    7.  Set the CacheTimeMargin rule to zero seconds. When a document's expiry date is set to "soon" and soon is defined by the CacheTimeMargin rule, setting this rule to zero disables the calculation and forces all documents to be cached, regardless of their expiry date. This setting is required for Blogs caching to function properly; it does not negatively affect the other applications.

        CacheTimeMargin 0 seconds

    8.  Prevent the validation of a cache object from sending multiple requests for the same resource to the backend server by setting the KeepExpired rule to on. An expired or stale copy of the resource will be returned for the brief time that the resource is being updated on the proxy.

        KeepExpired On

    9.  In the Method Directives section, add the following methods:

        Enable CONNECT

        Enable PUT

        Enable DELETE

        **Note:** Also, be sure to enable SSL tunneling by resetting the **SSLTunneling** setting to On.

    10. Add the following rule to the CacheQueries Directives section:

        CacheQueries PUBLIC

    11. Configure the proxy to allow large file uploads by editing and uncommenting the LimitRequestBody directive:

        LimitRequestBody n M

        where n is the maximum file size in MB. For example: `LimitRequestBody 50 M` allows a file size of up to 50 MB.

    12. To get Embedded Experience working with the Proxy server, include the following two commands in the ibmproxy.conf file:

        ```
        TLSV1Enable ON 
        ```

        ```
        V3CipherSpecs 0A09060564620403
        ```

    13. If cached requests from Files or Wikis are causing issues such as 412 status, stop those requests from being cached. For example, if Files requests are the problem, add the following entry:

        NoCaching http://ConnectionsHostServer/files/form/api/documents/feed?page=1&pageSize=25&sK=modified&sO=dsc&search=&searchType=communityFiles&memberOnly=true

3.  Save and close the ibmproxy.conf file.

4.  Update the dynamicHosts attribute in the LotusConnections-config.xml file to reflect the URL of the proxy server:

    <dynamicHosts enabled="true"\>

    <host href="http://proxy.example.com"

    ssl\_href="https://proxy.example.com"/\>

    </dynamicHosts\>

    **Notes:**

    -   The dynamic hosts settings does not affect interservice URLs. Therefore, even when the proxy server is enabled, HCL Connections still routes internal communication between the applications through their own interservice URLs. You can force this internal traffic to be routed over the proxy server by updating the interservice URLs to use the proxy server.
    -   Add the `isExternal` attribute to the Sametime configuration in LotusConnections-config.xml if you configured Sametime awareness through the Sametime server as described in [Adding Sametime awareness through the Sametime server](../admin/t_admin_common_add_st_awareness_via_proxy.md).
    -   Each href attribute in the LotusConnections-config.xml file is case-sensitive and must specify a fully-qualified domain name.

6.  Using iKeyman, extract certificates from HCL Connections and add them to the proxy server key database:

    **Note:** Be sure to use iKeyman that comes with the HTTP server, since it does not come with the proxy.

    1.  Open the HCL Connections kdb file and extract the certificates.

    2.  Open the kdb file on the proxy server and add the certificates that you extracted from HCL Connections.

    For more information about iKeyman, go to the topic in the IBM HTTP Server information center.

7.  Restart the Edge server.


**Parent topic:** [Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

