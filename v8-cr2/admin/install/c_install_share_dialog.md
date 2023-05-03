# Setting up share dialog {#c_install_share_dialog .concept}

Share Dialog is a new feature introduced in HCL Connections 8.0 CR1 which allows sharing content within the Connections environment.

## Share dialog {#section_i5l_dht_hvb .section}

Share Dialog is a new feature introduced in 8.0. It allows users to share links to Connections pages within the Connections environment as well as with other third-party applications like MS Teams, Slack, and others. It aims to improve cross connections share experience and provide a consolidated sharing mechanism to any Connections content.

It is possible to share a link and optional message with Connections users as well as with a community.

The Share Icon is included on every Connections page and integrated into the top navigation bar. Share Link is now also embedded in Connections content and allows you to share individual blog posts, wiki pages, and forum entries. The link is located next to the like button in this case.

The Share functionality is based on the OpenSocial API. It uses Activity Stream and its notification mechanism. This feature is installed by default, Component Pack is required only when you want to customize it

Which Share Dialog window that is displayed upon clicking the Share icon consists of three \(3\) elements: A member or Community name picker, an optional message which appears in the notification as well as a corresponding link either to the Connections page or to specific content.

!!! note
    Sharing a link to restricted connections content will not automatically enable users access to content and the access would need to be manually enabled.

Users are notified in corresponding Activity Streams like Top Updates and Latest Updates, on the Homepage and on the Community page and they are alerted in the Notification panel on the left side navigation.

## Consumed APIs {#section_dqd_gjt_hvb .section}

The Share Dialog does not contain any backend code, but it uses the existing connections search and open social APIs.

For the search, it uses two separate APIs to find a user or community, the results are then aggregated and provided as typeahead suggestions in the UI.

The key functionality is implemented using the OpenSocial API which provides the Activity Stream experience in Connections. A link to the connections page among the optional message and other required information is posted against the OpenSocial API which forwards the shared content to the user or community and is displayed in multiple places across the Connections UI.

## Impersonation proxy {#section_ckz_jkt_hvb .section}

The OpenSocial API , by default, only supports users posting against its own activity stream. So, to enable the dedicated Share functionality we uses the ICXT proxy API. This API impersonates the authenticated user and executes the XHR request against the OpenSocial API in the name of a pre-configured connections admin user. The Admin user is configured by default during the ICXT installation, so there is no additional step required on the Share functionality side.

To view or modify this user, you can go to Connections admin console **Resource environment entries** \> **ic360** \> **Custom properties** and configure ***“http.auth.admin.user”*** property.

Payload is calculated on the client side and passed through to the OpenSocial API by ICXT back-end code . This is the reason you will not see any requests against the OpenSocial API in browser network console. Client Side of Share Dialog code is only interacting with ICXT proxy API

.

## Extension Points {#section_wwy_gmt_hvb .section}

As mentioned earlier, it is possible to share link to connections content not only within Connections but also with other third-party applications. For example, you can share site with MS Teams or Slack. The configuration is done by the customer using App Registry, so pretty much any third-party application can be configured here. No need to restart after configuration changes, but the user would clear session storage due to caching mechanism we have in place

Once Sharepoint extension is configured you will be presented with the dropdown list of applications you can share connections content with. Refer to the Sample Repository for examples.

To configure a third-party application, you need to configure the following properties

-   **Extension type** - the action being performed
-   **Payload title**– the text that will be displayed in extended share dropdown
-   **Global path** - which allows you to apply the Customizer app across all the Connections components
-   **Payload include-files** - a custom Java Script that will be injected into the HTML page by customizer
-   **JS file implementation** - the `openShareExtension()` needs to be specified and will be triggered upon clicking on the extensions dropdown item

## Troubleshooting {#section_ndb_hnt_hvb .section}

The Browser Developer Tools Console logs and network need to be inspected for any exceptions logs or failing requests.

-   The following trace level can be configured on a WAS server containing `Common.ear` to troubleshoot posting against Activity Stream mechanism:

    ``` {#codeblock_hg5_mnt_hvb}
    com.ibm.lconn.core.social.opensocial.*=finest 
    ```

-   Set log trace level as follows on a server containing `IC360_core.ear`

    ``` {#codeblock_eks_pnt_hvb}
    com.ibm.ess.ic.ic360.ui.api.*=finest 
    ```

    ``` {#codeblock_dl5_qnt_hvb}
    com.ibm.ess.ic.ic360.rest.*=finest 
    ```

    ``` {#codeblock_yk3_rnt_hvb}
    com.ibm.ess.ic.ic360.rest.impl*=finest
    ```


**Parent topic:**[Configuring Share Application](../install/c_install_share_application.md)

