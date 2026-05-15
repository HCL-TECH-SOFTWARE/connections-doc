# URL preview security {#c_admin_common_manage_ext_user .concept}

Restrict URLs accessible by the oEmbed and image proxy service and fine-tune the maximum number of HTTP Connections.

## Restricting URLs that are accessible by the oEmbed and image proxy service { .section}

By default, the oEmbed and image proxy services have access only to resources that can be accessed anonymously through an HTTP get request. No authentication tokens or cookies of any kind are forwarded when retrieving resources for preview.

The oEmbed and image proxy can be configured to retrieve resources through a standard forward proxy that supports HTTP, sock4, or sock5 protocols. Restricting the set of URLs that can be accessed by the oEmbed and image proxy can be done at forward proxy level. For more information, see *Configuring URL preview*.

## Fine-tuning the maximum number of HTTP Connections { .section}

The oEmbed and image proxy services use HTTPClient with a maximum number of connections that are specified in og-config.xml. For more information, see *Configuring URL preview*. If the number of threads in the web container pool is lower than the number of connections in the HTTPClient pool, more requests from client to the oEmbed and image proxy services are queued. These requests can be the source of a denial of service \(DOS\). Therefore, configure the number of connections in the HTTPClient pool to be lower than half of the number of threads in the web container thread pool on the cluster that hosts the oEmbed.ear \(URLPreview\) application.

**Parent topic:** [URL Preview](../admin/c_admin_news_url_preview.md)

**Related information**  


[Configuring URL preview](../admin/t_admin_news_url_preview_config.md)

