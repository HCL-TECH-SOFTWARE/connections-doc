# What's new in HCL Connections 8.0 CR3

Find out about features that are new or updated in this release of HCL Connections.

-   See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates Connections Server, including required critical updates.

-   **Download** Connections 8.0 CR3 from the [My HCLSoftware](https://my.hcltechsw.com/), and Component Pack 8 CR3 from [Harbor](https://hclcr.io/harbor/projects/15/repositories).


## What's New in HCL Connections 8.0 CR3 and Component Pack 8 CR3 {#section_hgz_3dy_clb .section}

**System requirements**

-   Refer to the [HCL Connections 8.0 CR3 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0105966).

-   For Component Pack 8 CR3, see [Prerequisites for Component Pack](https://pages.git.cwp.pnp-hcl.com/CWPdoc/Connections-MkDocs/v8-cr3/admin/install/cp_prereqs.html).

## Connections 7.0 user interface is no longer supported {#cnx7ui.section}

Connections customers were given a transition period to convert deployments from the Connections 7.0 UI to the new Connections 8.0 UI. The transition period ends this release, which means that as of Connections 8.0 CR3, the 7.0 UI is no longer supported. When upgrading to Connections 8.0 CR3, the default UI will now be the 8.0 UI (instead of 7.0), which offers improved search capabilities, a more usable and intuitive navigation, universal upload and share, and the Important to Me bar.

## Updated guidance for customizing the Connections 8.0 UI

Given the UI redesign, we've updated guidance on applying customizations starting in Connections 8.0. Legacy approaches in Connections 7.0 and earlier versions are now unsupported, though some of the methods might still work. For more information, refer to [Customizing the user interface](../customize/t_admin_common_customize_main.md).

## AIX support discontinued for HCL Connections 8.0 {#aixcp.section}

Starting with Connections 8.0, the AIX operating system is no longer supported due to limitations with Component Pack that result in failures for critical features.

## Enhanced presence awareness for Sametime integration

Starting with Connections 8.0 CR3, Sametime integration provides a better user experience through the following updates:

- Status bar has been moved to the Connections header for easy access to chat and status options, including setting a custom status message
- A user's custom status message is now visible on their profile and business card
- Sametime status indicator now shows for each person on the Important To Me (ITM) bar

For more information, refer to [Adding Sametime awareness through the Sametime server](../admin/t_admin_common_add_st_awareness_via_proxy.md). To enable the Sametime status in the ITM bar, complete the procedure in [Enabling Sametime status in the Important to Me Bar](../admin/t_admin_common_enable_st_status.md). 

## Improving security through enforced use of TLS 1.3

You can configure HCL Connections to force all traffic that passes between a Connections server and a user's web browser to be sent over TLS 1.3 to avoid security vulnerabilities in TLS 1.2 and earlier versions of SSL. For more information, refer to [Configuring HCL Connection to use TLS 1.3](../../admin/secure/t_secure_tls_v13_overview.md).


**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.

