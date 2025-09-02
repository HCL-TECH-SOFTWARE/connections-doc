# What's new in HCL Connections 8.0 CR5

Find out about features that are new or updated in this release of HCL Connections.

-   See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates Connections Server, including required critical updates.

-   **Download** Connections 8.0 CR5 from the [My HCLSoftware](https://my.hcltechsw.com/), and the latest Component Pack from [Harbor](https://hclcr.io/harbor/projects/15/repositories).


## What's New in HCL Connections 8.0 CR5 and Component Pack 8 CR5 {#section_hgz_3dy_clb .section}

**System requirements**

-   Refer to the [HCL Connections 8.0 CR5 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0105966).

-   For the Connections 8.0 CR5 Component Pack, see [Prerequisites for Component Pack](../../admin/install/cp_prereqs.md).

    -   For deployments using HCL Connections Component Pack 8.0 CR5 (new or upgraded), IBM WebSphere 8.5.5 Fix Pack 24 which has an updated Java version is required. Otherwise enabling SSL for Metrics will fail, as the Java version prior to Fix Pack 24 cannot open the keystore built by the newer Java.

## Harbor OCI support

To deploy Component Pack, you now install or upgrade Helm charts from OCI registry in Harbor. The procedure for installing or upgrading Component Pack has been updated accordingly, see [Steps to install or upgrade to Component Pack 8](../../admin/install/cp_install_services_tasks.md).

## Helm chart documentation

The helm-docs tool has been implemented for Component Pack, providing Markdown files that contain information about each chart. For more information, see [Helm chart documentation for Component Pack](../../admin/install/helm_docs.md).

## Tiny Editor update

A new version of Tiny Editor is available with Connections 8.0 CR5. 


**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.

