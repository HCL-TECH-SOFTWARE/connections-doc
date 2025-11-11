# What's new in HCL Connections 8.0 CR1

Find out about features that are new or updated in this release of HCL Connections.

-   See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates Connections Server, including required critical updates.

-   **Download** Connections 8.0 CR1 from the [My HCLSoftware](https://my.hcltechsw.com/), and Component Pack 8 CR1 from [Harbor](https://hclcr.io/harbor/projects/15/repositories).

**Attention:** Connections customers are given a transition period to prepare for the new Connections 8.0 user experience. During the transition period, no defect fixes or enhancements will be made to the Connections 7.0 UI. Customers must plan to transition to the Connections 8.0 UI by HCL Connections 8.0 CR2. To switch to the 8.0 experience, see [Enabling the Connections 8.0 user experience](../migrate/enabling_cnx8_ux.md).

## What's New in HCL Connections 8.0 CR1 and Component Pack 8 CR1 {#section_hgz_3dy_clb .section}

**Technical optimization**

-   **System requirements**
    -   Refer to the [HCL Connections 8.0 CR1 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).
    -   For Component Pack 8 CR1, see [Prerequisites for Component Pack](../install/cp_prereqs.md).
-   **Component Pack**
    -   For supported versions of components, for example Kubernetes and Helm, refer to the table in the [HCL Connections 8.0 CR1 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).
        -   Support for Kubernetes 1.25: PodSecurityPolicy was removed, as this has been deprecated in Kubernetes 1.25.
    -   Customizer Lite is available for Connections 8.0 CR1. Customers can choose to pull images from the Harbor repository, rather than import from .tar file archives. To install, check out [Installing Customizer Lite](../install/cp_install_customizer_lite.md).
    -   Miscellaneous bug fixes, as follows:
        -   For OpenSearch, removed runAsUser as root in initContainers
        -   Resource management improvements for OpenSearch pods
        -   For MongoDB, removed initContainers
        -   In NFS configuration script, set root_squash as default to allow non-root ownership of export folders
        -   Allowed non-default namespace

-   **Roadmap to Connections and Component Pack**
    -   **Connections 8.0 CR1**: See [Installing Connections](../install/c_installing.md) or [Upgrading and updating](../migrate/c_installing_fix-packs.md).
    -   **Component Pack 8 CR1**: Upgrading from Component Pack 8 to CR1 requires upgrading Kubernetes to 1.25. Refer to [Installing and upgrading Component Pack for Connections](../install/cp_install_upgrade_container.md). 

-   **Security**
    - Keycloak single sign-on (SSO) authentication is now supported in HCL Connections. Refer to [Enabling Keycloak as an OIDC provider for Connections](../secure/c_keycloak_oidc.md) for in-depth information.

## A powerful editing experience in HCL Connections {#tinymce_edit .section}

The TinyMCE Editor is an alternative, rich-text editor that provides extra features and extensive customization options to users. To install, refer to [Optional: Installing and configuring Tiny Editors for HCL Connections](../install/tiny_editors/c_tiny-editors.md).

## The user interface now supports bi-directional languages {#bidirect_langs .section}

The Connections 8.0 CR1 UI supports Arabic and Hebrew. Refer to [Supported languages](i_ovr_c_supported_langs.md) for additional information.

## Onboarding tour of the new Connections {#tours .section}

Users visiting Connections for the first time, in general or since upgrading to 8.0, can quickly get acquainted with the latest offerings through the welcome tour. The tour provides a succinct introduction to the new UI and its features, for example the supercharged search, new navigation, and universal share and upload.

**Note:** You can configure the tour in many ways, including enabling or disabling it and defining when it should appear to users. For more information on configuring the welcome tour, see [Customizing the welcome tour](../customize/customizing-welcome-tour.md).

**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.

**What's new for end users** 

For more information about new end-user features and functions in HCL Connections 8.0 CR1, see [What's new in HCL Connections?](../../user/eucommon/r_eucommon_whats_new.md)

