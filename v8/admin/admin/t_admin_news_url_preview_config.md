# Configuring URL preview {#t_admin_news_url_preview .task}

Edit og-config.xml in the <dmgr\_profile\_root\>/config/cells/<cell\>/LotusConnections-config directory to configure both the oEmbed and thumbnail end-points. oEmbed returns the metadata that is associated with a URL passed in input.

1.  Edit og-config.xml in the <dmgr\_profile\_root\>/config/cells/<cell\>/LotusConnections-config directory on the Deployment Manager.

2.  Using the parameters that are outlined in table 1, edit the file that is located in the working\_dir.

    Table 1. Configuration file sections

    |Section|Parameter|Description|Default|
    |-------|---------|-----------|-------|
    |retriever.httpclient|totalConnections|Maximum number of simultaneous open connections while fetching resources.<br>**Note:** Ensure that the value of this setting does not exceed the number of threads in the web container thread pool on the cluster where the URL Preview \(oembed.ear\) application is located \(Common by default\).<br>For more information, see *URL preview security*.|20|
    | |redirects| |true|
    | |userAgent|User-agent header string for HTTP get requests.|IC OpenGraph Crawler 4.5 \(proprietary\)|
    | |timeout|Timeout in milliseconds on waiting for any server response.|5000|
    | |cookiesCollector|Indicates whether cookies need to be preserved.|true|
    | |fetchAttempts|Number of attempts to fetch particular resources in case of exception.|2|
    |retriever.proxy|enabled|Indicates whether proxy configuration must be in place. For more information, see *Deploying URL preview*.|false|
    | |type|Type of proxy: http, socks4, or socks5|http|
    | |host|DNS name/alias for proxy server.|localhost|
    | |port|Proxy server port number.|1080|
    | |password|Proxy server password.|pa88word|
    |retriever.parser|provider|Internal html snippets parser engine: jsoup or jtidy is supporte.d|jsoup|
    |service|rewriteImageUrl|Format string that is used to rewrite image URL to point it to proxy image service; this must be an absolute URl with placeholder to keep service deployment details.<br>**Note:** Do not change rewriteImageUrl unless instructed by IBM® support.|/api/imageProxy?url=\{0\}|
    |security|htmlPageMaxSize|Maximum acceptable size for parsing html header \(everything between`<head> </head>`\) in bytes.|1048576|
    | |imageMaxSize|Maximum size of proxied images in bytes.|3145728|
    | |anonymousAccess|If caching IC resources requires explicit server login. For more information, see *Deploying URL preview*.|false|
    | |jaasOembedAuthAlias|WebSphere® security alias with appropriate credentials that is used to perform server login. Works with the anonymousAccess parameter. Authentication and authorization mechanisms are based on Sonata IC library. For more information, see *Deploying URL preview*.|oembedJAASAuth|
    |persistence.thumbnails|maxDiskSpace|Maximum Disk space \(in MB\). A negative value disables purging.0: sets no disk limit and allows running the purging task.|0|
    | |maxUsagePercent|Maximum disk usage allowed \(in percent\).|70|
    | |purgingPercent|Volume of thumbnails \(in Percentage\) to discard when maxUsagePercent is reached.|20|

3.  Do a full sync of all the nodes.

4.  Verify that the file has been updated on all the nodes.

5.  Restart HCL Connections.


**Parent topic:** [URL Preview](../admin/c_admin_news_url_preview.md)

**Related information**  


[URL preview security](../admin/c_admin_news_url_preview_security.md)

