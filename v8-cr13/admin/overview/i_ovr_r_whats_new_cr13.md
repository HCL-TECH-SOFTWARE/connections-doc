# What's new in HCL Connections 8.0 CR13

Find out about features that are new or updated in this release of HCL Connections.

- See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates for Connections Server, including required critical updates.

- **Download** HCL Connections 8.0 CR13 from the [My HCLSoftware](https://my.hcltechsw.com/) (MHS) portal, and the latest Component Pack from [Harbor](https://hclcr.io/harbor/projects/15/repositories).

## What's New in HCL Connections 8.0 CR13 and Component Pack 8 CR13 {#section_hgz_3dy_clb .section}

**HCL Connections 8.0 CR13 Fix List**

- A number of fixes have been deployed for this release to address several issues. For more information on these fixes, see [Connections 8.0 Cumulative Release (CR) List](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0102882).

**System requirements**

!!! attention

    The HCL Connections System Requirements and Kubernetes Runtime documentation have been updated to provide clearer guidance on supported packages. The System Requirements now focus solely on the Connections Server, while the Kubernetes Runtime documentation—now titled Kubernetes Runtime and Component Pack Middleware—covers all Kubernetes environment and Component Pack requirements.

- Refer to the [HCL Connections 8.0 CR13 Server System Requirements](system_requirements.md).
- For the Connections 8.0 CR13 Component Pack, refer to:
    - [Kubernetes Runtime and Component Pack Middleware](../../admin/install/cp_kubernetes_runtime.md).
    - [Prerequisites for Component Pack](../../admin/install/cp_prereqs.md).


## Enhanced Blogs Experience and Space Utilization {#section_hgz_3dy_cld .section}

Space utilization in Blogs has been improved with the new Hide/More Options toggle and the ability to collapse the left sidebar, allowing users to make the most of their screen space.


## HCL API Modernization - Communities APIs {#section_hgz_3dy_clb .section}

HCL Connections introduces new JSON-based APIs and the HCL API Gateway as part of the API Modernization Initiative to enhance developer support and integration capabilities. HCL Connections 8.0 CR13 provides Communities with 75+ endpoints for modernization, covering everything from core community management to membership, calendars, and integrated widgets.

Future releases will include APIs for additional Connections components as part of this ongoing modernization effort. These APIs and the Gateway can be deployed as part of the Component Pack on both Kubernetes and OpenShift environments.

For details, see [API Modernization](../admin/api_modernization.md) and [Installing HCL API Gateway for Component Pack](../admin/install/cp_install_hcl_api_gateway.md).


## HCL Gateway Updates {#section_hgz_3dy_cld .section}

The HCL API Gateway has been decoupled from the core application to provide a more secure, scalable, and operationally mature architecture.

The uninstallation procedure for HCL API Gateway in the Component Pack has been updated to include additional steps for removing persistent volume data from the file system. This ensures a more thorough cleanup of all components associated with the HCL API Gateway.
   

For the updated uninstallation procedure, see [Uninstalling HCL API Gateway for Component Pack](../install/cp_uninstall_hcl_api_gateway.md).


## Updated TinyMCE Editor {#section_hgz_3dy_clf .section} 

An updated release of the TinyMCE Editor is available with Connections 8.0 CR13. To install, refer to [Installing and configuring Tiny Editors for HCL Connections](https://help.hcl-software.com/connections/latest/admin/install/tiny_editors/c_tiny-editors.html).


## TLS Support for Secure Traffic to Customizer {#section_hgz_3dy_clc .section}

The Component Pack now supports TLS (HTTPS) traffic for Customizer (`mw-proxy`), enhancing security by encrypting data transmitted between clients and the Customizer service. Administrators can enable or disable TLS for Customizer based on their security requirements.

- To enable TLS for Customizer, see [Enabling secure traffic for Customizer](../install/enable_customizer_tls.md).
- To disable TLS for Customizer, see [Disabling secure traffic for Customizer](../install/disable_customizer_tls.md).


## Valkey Cache Service Support {#section_hgz_3dy_cle .section}

The Component Pack now supports Valkey Cache Service, which provides a more robust and scalable caching solution for HCL Connections applications. 

For details, see [Enabling and securing Cache Service traffic to Homepage](../install/cp_config_om_cache_service_traffic.md) and [Manually configuring Cache Service traffic to Homepage](../install/cp_config_om_cache_service_enable.md).


## Optimized Deployments {#section_hgz_3dy_clg .section}

Validated Single-Node Kubernetes: Support for a streamlined "All-in-One" deployment model. This is a cost-effective alternative for environments supporting up to 1,000 users where High Availability (HA) is not required.

For details, see [Sizing Kubernetes for a single-node environment](../../admin/install/cp_install_sizing_for_single_node.md). 



**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.


