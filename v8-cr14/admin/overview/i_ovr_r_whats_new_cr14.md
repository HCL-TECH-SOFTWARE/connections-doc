# What's new in HCL Connections 8.0 CR14

Find out about features that are new or updated in this release of HCL Connections.

- See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates for Connections Server, including required critical updates.

- **Download** HCL Connections 8.0 CR14 from the [My HCLSoftware](https://my.hcltechsw.com/) (MHS) portal, and the latest Component Pack from [Harbor](https://hclcr.io/harbor/projects/15/repositories).

## What's New in HCL Connections 8.0 CR14 and Component Pack 8 CR14 {#section_hgz_3dy_clb .section}

### HCL Connections 8.0 CR14 fix list

- A number of fixes have been deployed for this release to address several issues. For more information on these fixes, see [Connections 8.0 Cumulative Release (CR) List](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0102882).

### System requirements

!!! attention

    The HCL Connections System Requirements and Kubernetes Runtime documentation have been updated to provide clearer guidance on supported packages. The System Requirements now focus solely on the Connections Server, while the Kubernetes Runtime documentation—now titled Kubernetes Runtime and Component Pack Middleware—covers all Kubernetes environment and Component Pack requirements.

- Refer to the [HCL Connections 8.0 CR14 Server System Requirements](system_requirements.md).
- For the Connections 8.0 CR14 Component Pack, refer to:
  - [Kubernetes Runtime and Component Pack Middleware](../../admin/install/cp_kubernetes_runtime.md).
  - [Prerequisites for Component Pack](../../admin/install/cp_prereqs.md).

## HCL API Modernization – Wikis and Forums APIs {#section_hgz_3dy_cle .section}

HCL Connections introduces new JSON-based APIs and the HCL API Gateway as part of its API modernization initiative, improving developer support and integration capabilities.

HCL Connections 8.0 CR14 includes new Wikis and Forums APIs, built on the API Gateway, that modernize how developers interact with application data in Connections.

Future releases will expand API coverage to additional Connections components as part of this ongoing effort. The APIs and API Gateway can be deployed through the Component Pack on both Kubernetes and OpenShift environments.

For details, see [API Modernization](../admin/api_modernization.md) and [Installing HCL API Gateway for Component Pack](../../admin/install/installing_hcl_api_gateway_for_component_pack.md).

## Enhanced Wiki experience

The **Save**, **Save and Close**, and **Cancel** buttons are now anchored to the top of the Wiki page for easier access.

## Updated TinyMCE editor {#section_hgz_3dy_clf .section}

A new version of TinyMCE Editor v7.9.1 is now available. The TinyMCE editor is the supported rich-text editor of HCL Connections, offering enhanced features and extensive customization options for a more robust editing experience.

To install, refer to [Installing and configuring Tiny Editors for HCL Connections](https://help.hcl-software.com/connections/latest/admin/install/tiny_editors/c_tiny-editors.html).

## Ingress-controller migration to Traefik {#section_hgz_3dy_cld .section}

Starting in CR14, the ingress-nginx controller is replaced by Traefik Proxy for Component Pack ingress traffic. This migration updates the ingress workflow for upgraded environments, including corresponding changes to ingress service and TLS configuration.

For details, see [Steps to install or upgrade to Component Pack 8](../../admin/install/cp_install_services_tasks.md) and [Enabling secure traffic to the ingress controller](../../admin/install/enable_ingress_tls.md).

<!--## Orient Me ingress updates in Component Pack {#section_hgz_3dy_clc .section}

As part of the CR14 ingress-controller migration to Traefik, legacy ingress resources are cleaned up, including `cnx-ingress-orient-me`. This update aligns ingress routing with the current Component Pack service architecture while Orient Me continues to support Top Updates on the HCL Connections homepage.

For details, see [Delete ingress-nginx controller](../../admin/install/cp_install_services_tasks.md#del_ingress).-->

## Flyout button configuration for Connections Engagement Center {#section_hgz_3dy_cle .section}

Administrators can now configure the appearance and behavior of the Connections Engagement Center flyout button. This includes options to customize the button's label, icon, and accessibility settings to better suit your organization's needs.

For details, see [Flyout button configuration](../../connectors/icec/cec-inst-flyout-button-config.md).

## Microsoft Teams domain changes application {#section_hgz_3dy_cle .section}

Microsoft is migrating Teams and other Microsoft 365 applications from `teams.microsoft.com` to the unified `cloud.microsoft` domain. This change affects HCL Connections integrations that embed content inside the Microsoft Teams interface, such as tab apps and messaging extensions. If you do not apply the updates described here, Connections content may fail to render in Teams when accessed from the `teams.cloud.microsoft` domain.

For details, see [Microsoft Teams domain change](../../connectors/admin/t_ms_teams_domain_change_ifix.md) and [Firewall rules for Microsoft Teams integration](../../admin/install/cp_install_services_tasks.md#teams_firewall).

**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.
