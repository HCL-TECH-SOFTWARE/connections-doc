# What's new in HCL Connections 

Find out about features that are new or updated in this release of HCL Connections.

-   See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates Connections Server, including required critical updates.

-   **Download** Connections 8.0 from the [My HCLSoftware](https://my.hcltechsw.com/), and Component Pack 8 from [Harbor](https://hclcr.io/harbor/projects/15/repositories).

    Harbor is an open-source container and Helm registry hosted by HCL for the Component Pack build. It simplifies deployment compared to the approach in previous releases, which involves using a zip file and a local Docker registry.

    When you install or upgrade Component Pack, you will need to add the HCL Harbor repository to your Helm CLI so that you can pull container images and Helm charts for your deployment directly from Harbor. For more information on the steps you need to perform for installation or upgrade, see [Installation and upgrade](../install/cp_install_upgrade_container.md).
    
    Customers with credentials to access Connections in the [My HCLSoftware](https://my.hcltechsw.com/) may apply those credentials to access Harbor.

**Attention:** Connections customers are given a transition period to prepare for the new Connections 8.0 user experience. During the transition period, no defect fixes or enhancements will be made to the Connections 7.0 UI. Customers must plan to transition to the Connections 8.0 UI by HCL Connections 8.0 CR2. To switch to the 8.0 experience, see [Enabling the Connections 8.0 user experience](../migrate/enabling_cnx8_ux.md).

## What's New in HCL Connections 8.0 and Component Pack 8 {#section_hgz_3dy_clb .section}

**Technical optimization**

-   **System requirements**
    -   Refer to the [HCL Connections 8.0 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).
        -   Connections 8.0 requires Java 8, so you need to upgrade Security Directory Integrator 7.2. For more information, see [Deploying Security Directory Integrator into a new install of Connections](../install/t_prof_tdi_new_deploy.md).
        -   Connections 8.0 requires IBM Install Manager 1.9.x.
    -   For Component Pack 8, see [Prerequisites for Component Pack](../install/cp_prereqs.md).
-   **Connections and Component Pack - automating your install and sizing your deployment**
    -   HCL's open-source GitHub documents provide details on setting up end-to-end automation to install Connections and Component Pack. The respective Git locations are:
        -   [Quickstart for setting up HCL Connections and Component Pack using Ansible automation](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/documentation/QUICKSTART.md)
        -   [HCL Connections and Component Pack automation scripts](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/README.md)
    -   [HCL Connections 8.0 Sizing Guide](https://opensource.hcltechsw.com/connections-doc/guide_me/how_to_guides/connections8_sizing_guide.pdf): Provides sizing and deployment recommendations for both Connections and Component Pack, based on HCL performance tests and best practices learned and confirmed by multiple customers through time.
-   **Component Pack**
    -   For supported versions of components, for example Kubernetes and Helm, refer to the table in the [HCL Connections 8.0 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).
    -   Component Pack is now installed from the [HCL Harbor repository](https://hclcr.io/harbor/projects/15/repositories). 

-   **Roadmap to Connections and Component Pack**
    -   **Connections 8.0**: See [Installing Connections](../install/c_installing.md) or [Upgrading and updating](../migrate/c_upgrade_migrate_overview.md).
    -   **Component Pack 8**: Component Pack for HCL Connections introduces several offerings that enhance collaboration and boost productivity. Upgrading to Component Pack 8 requires the replacement of MongoDB 3 with 5, and Elasticsearch 7 with OpenSearch. Refer to [Installing and upgrading Component Pack for Connections](../install/cp_install_config_intro.md). 
    -   Check which new features are supported for a Component Pack and non-Component Pack deployment in [Deployment requirements for supporting 8.0 functionality](../plan/supported_features.md).

**HCL Connections 8.0 will fully support the following in a future CR:**

-   Bi-directional languages – refer to [Supported languages](i_ovr_c_supported_langs.md) for more information
-   HCL Connections Mail plug-in
-   The TinyMCE editor in the Connections 8.0 user interface

**Community surveys are no longer supported in Connections 8.0.**

To replace the Polls & Survey app, Connections 8.0 customers will now receive entitlement to HCL Leap to build apps integrated into Connections. For more information, see [What's new](../../user/eucommon/r_eucommon_whats_new.md) in the Connections end user documentation.

## Promote your message using a site-wide banner {#section_us1_5vs_v5b .section}

Share important news and announcements within Connections using the administrative banner – the banner displays your message at the top of every Connections page for high visibility. You can control the content and functionality of the banner, including how it looks on the page, by configuring its properties.

Depending on your deployment, you can set it up through the app registry or using Feature Foundation. For details, see [Administering the display of a site-wide banner](../admin/admin_banner_onprem.md).

![Screenshot of the admin banner on the Connections 8.0 interface](images/admin_banner.png)

## Search from anywhere in Connections {#section_nd4_w23_dvb .section}

An updated search experience from start-to-find:

-   **Simplified search box**
    -   Central and constant location so you can run a search from any page in Connections
    -   Context-sensitive focus means the scope of the search intuitively adjusts to the current app
    -   Access to commonly used resources: recent searches and recently viewed content
-   **Redesigned results page**
    -   Intuitive filtering effortlessly broadens or narrows the scope of your search for more relevant results
    -   Closing out the search results page takes you exactly where you left off

Refer to [Administering Search](../admin/c_admin_search.md) and [Searching Connections](../../user/eucommon/c_eucommon_search.md).

![](images/search.png)

## More usable and intuitive navigation {#section_qls_z23_dvb .section}

A clear and consistent design reduces the clicks and steps, saving time and effort.

Easier customization also allows you to:

-   Add your most-used applications to the side navigation bar so they're always in reach
-   Tailor the look of the top navigation – the logo, color, and environment name – to reflect your own branding

For more information, see [Customizing the navigation bar](../customize/customizing-navigation.md).

![](images/navbar.png)

## Increased collaboration with universal upload and share { .section}

New upload and share buttons on the top navigation makes content sharing easier.

**Share** lets you share the content you're viewing, such as a blog post, inside Connections or through integrated services like Microsoft Teams.

**Upload** lets you quickly share a specific file with someone from any page in Connections.

To learn more, see [Configuring Share Application](../install/c_install_share_application.md) and [Sharing in Connections](../../user/eucommon/c_eucommon_share.md).

## Quick access to important contacts {#section_omd_bf3_dvb .section}

Pinned contacts and communities are available everywhere in Connections for instant interaction:

-   Click an avatar to open a community's landing page.
-   Hover on a person's avatar for shortcuts to connect and to view their business card. For further information on using the filter icon, refer to [Top Updates: Keeping up with what's most relevant to you](../../user/homepage/Tile_homepage_using.md).

![](images/itm_bar.png)

See [Customizing the Important To Me (ITM) bar](../customize/customizing-itm.md).

## Connections Engagement Center in HCL Connections {#cec .section}

Expand the use of [Connections Engagement Center](../../connectors/icec/icec_welcome.md) throughout Connections by upgrading to a full version of the Engagement Center by purchasing an additional entitlement. Follow the [Installing Connections Engagement Center](../../connectors/icec/cec-install.md) after downloading the update and license package from the [My HCLSoftware](https://my.hcltechsw.com/).

**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.

**What's new for end users**

For more information about new end-user features and functions in HCL Connections 8.0, see [What's new in HCL Connections?](../../user/eucommon/r_eucommon_whats_new.md)

