# URL Preview {#c_admin_news_url_preview .concept}

URL preview allows users decide quickly whether to follow a link by displaying a thumbnail preview for URLs.

Thumbnails are renderings of rich metadata to point to accessible HTML resources in microblog messages in the Activity Stream.

URL preview supports the following OpenGraph metadata:

-   Title
-   Description
-   An image representation of the resource

Metadata is obtained from the following contexts:

-   User input focus \(as the user types the url in the microblog message\)
-   Activity Stream \(events about microblogs\)
-   Status Updates

The following services are used to generate URL previews:

-   **[Configuring URL preview](../admin/t_admin_news_url_preview_config.md)**  
Edit `og-config.xml` in the `<dmgr_profile_root>/config/cells/<cell>/LotusConnections-config` directory to configure both the oEmbed and thumbnail end-points. oEmbed returns the metadata that is associated with a URL passed in input.
-   **[URL preview security](../admin/c_admin_news_url_preview_security.md)**  
Restrict URLs accessible by the oEmbed and image proxy service and fine-tune the maximum number of HTTP Connections.

**Parent topic:** [Administering common areas](../admin/c_admin_act_wsadmin.md)
