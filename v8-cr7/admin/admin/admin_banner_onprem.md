# Administering the display of a site-wide banner {#concept_pd2_rwd_vtb .concept}

Use a banner to promote your message on every page in Connections.

The banner is a great way to catch users' attention and inform them about important events, such as scheduled updates, planned outages, and company news. After configuration \(and if enabled\), the banner shows at the top of every page within Connections, thereby giving your message high visibility.

You can administer the banner in two ways: through the app registry or through Feature Foundation. The method best suited for you depends on whether or not Component Pack is installed in your Connections deployment. If Component Pack is available, you can apply either method, although the app registry is recommended as it offers functionalities such as app and user scoping, and translation. If Component Pack is not available, you can still set up the banner through Feature Foundation.

Administering the banner through the app registry involves creating an app registry extension and updating its configuration. Afterwards, you can control when and which message the banner displays. On the other hand, Feature Foundation involves the use of APIs. This way, you can enable or disable the banner and define how it displays in Connections. You cannot configure different messages for different user groups, but you can still enter a message that shows for all users.



-   **[Administering the banner using app registry](../admin/admin_banner_appreg.md)**  
Create an app registry extension and specify select properties in the configuration, such as the message you want displayed, to make the most out of the banner in Connections.
-   **[Administering the banner using Feature Foundation](../admin/admin_banner_icxt.md)**  
Use APIs on Feature Foundation to show, manage, and update the banner in Connections.

**Parent topic:** [Administering common areas](../admin/c_admin_act_wsadmin.md)

