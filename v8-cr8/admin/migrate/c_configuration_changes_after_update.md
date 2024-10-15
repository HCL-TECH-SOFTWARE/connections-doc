# Saving your customizations 

Before upgrading HCL Connections, back up and make notes of your customizations.

Only some of the customizations that you made to Connections 7.0 application files and custom fields are preserved during an upgrade, and only if you are performing an in-place or hybrid upgrade using the Installation Manager's Update function. You'll still need to reapply some customizations after upgrading.

## Customized files and themes 

The update process changes several configuration files, including files that you customized. Customized files can include header and footer HTML files, CSS and JSP files, themes, and several other files that are listed in this topic.

You must manually migrate the files that are referenced in the **Migrate manually** column of the following table.

**Note:** If you are upgrading to version 8.0 using the side-by-side approach, you must manually migrate ALL of files in the table.


|Customization   |Automatically preserved by Update function   |Migrate manually   |
|---|---|---|
|User interface (customized CSS, JSP, and HTML; labels and strings).</br>  Customized string files are preserved in the customization directory but you might need to rename some string files to match new Java™ and Dojo package names in HCL Connections™ 7.0|Partially|Yes|
|Template configuration</br> Manual post-migration steps might be required, see the [Ways to upgrade to Connections](../migrate/c_3_ways_to_upgrade.md) topic.|Partially|See the post-migration steps.|
|Header, Footer, and other JSPs copied from the Common appAny customized artifacts are preserved in the customization directory, which is not migrated. You must update your customized artifacts to match the new layout and functionality of Connections 8.0 CR3.|No|Yes|
|Email notification templates</br> Email notification templates have been translated from JSP to FreeMarker. For more information, see the [Customizing notifications](../customize/c_customize_notifications.md) topic.   Merge your existing customizations with the new Notification templates in the [profile\_root/Dmgr01](../plan/i_ovr_r_directory_conventions.md)`/config/cells/cell\_name/LotusConnections-config/notifications` directory. </br>If a global customization exists for all emails, then you only need to customize the shared resources. If JSP templates were customized in the 7.0 customization folders, then you can remove them.|No|Yes|
|Blog themes|Partially|Yes|
|Community themes</br> The default Communities themes are migrated automatically. However, must redefine any custom theme.|Yes|Redefine any custom themes.|
|Business cards</br> The Links and Actions attributes of business cards are migrated when the `LotusConnections-config.xml and profiles-config.xml` are migrated.</br> Link definitions defined as attributes to each service in the</br> `LotusConnections-config.xml` file are migrated to the new</br> `LotusConnections-config.xml file`.</br> Manual steps may also be required to migrate profile customizations for business cards from 7.0 as described in the [Ways to upgrade to Connections](../migrate/c_3_ways_to_upgrade.md) topic.|Yes|Partially|
|Security role mappings</br> Redefine your security role mappings. For more information about security role mapping, see the [Security role to user or group mapping](https://www.ibm.com/support/knowledgecenter/SSEQTP_9.0.0/com.ibm.websphere.base.doc/ae/usec_tselugrad.html) topic in the WebSphere® Application Server Information Center.|No|Yes|
|service-location.xsd</br> Customized extended service names are not migrated. Copy any customized XSD elements to the 7.0 service-location.xsd file.|Partially|Yes|
|profiles-policy.xmlCopy the 7.0 version of the profiles-policy.xml file to the 8.0 deployment, overwriting the 8.0 version of the file. For more information, see the [Ways to upgrade to Connections](../migrate/c_3_ways_to_upgrade.md) topic.|No|Yes|
|validation.xmlRedefine</br> customized Profile field validation settings.|No|Yes|
|JavaScript™</br> The file path and contents of JavaScript string customizations have changed and require manual migration. </br> The ui-extensions framework is deprecated, so you must manually migrate your 8.0JavaScript customizations.|No|Yes|
|Touchpoint</br> If you modified parts of the Touchpoint application within the installedApps path in 7.0 \(like JSPs or language-related properties\), make sure you back up these modifications. After upgrading to Connections 8.0 CR3, modify the default product again based on your requirements.</br> **Note:** This kind of customization is not recommended.|No|Yes|
|Invite</br> If the Invite feature is configured, transfer the settings from the configuration file `(selfregistration-config.xml)` to the new environment.|No|Yes|
|Proxy configuration</br> If modified, `LC-config\\opensocial-proxy-rules`, which affects things like URL or protocol whitelisting in blogs and wikis, needs to be migrated and modifications reapplied.|No|Yes|
|*In a side-by-side upgrade, you need to reapply customizations to ALL migrated files.|

**Parent topic:** [Getting ready for upgrading or updating](../migrate/t_prepare_migrate_upgrade.md)



