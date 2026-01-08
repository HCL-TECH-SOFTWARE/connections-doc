# What's new in HCL Connections 8.0 CR12

Find out about features that are new or updated in this release of HCL Connections..

- See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates Connections Server, including required critical updates.

- **Download** HCL Connections 8.0 CR12 from the [My HCLSoftware](https://my.hcltechsw.com/) (MHS) portal, and the latest Component Pack from [Harbor](https://hclcr.io/harbor/projects/15/repositories).

## What's New in HCL Connections 8.0 CR12 and Component Pack 8 CR12 {#section_hgz_3dy_clb .section}

**HCL Connections 8.0 CR12 Fix List**

- A number of fixes have been deployed for this release to address several issues. For more information on these fixes, see [Connections 8.0 Cumulative Release (CR) List](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0102882).

**System requirements**

!!! Attention

    The HCL Connections System Requirements and Kubernetes Runtime documentation have been updated to provide clearer guidance on supported packages. The System Requirements now focus solely on the Connections Server, while the Kubernetes Runtime documentation—now titled Kubernetes Runtime and Component Pack Middleware—covers all Kubernetes environment and Component Pack requirements.

- Refer to the [HCL Connections 8.0 CR12 Server System Requirements](system_requirements.md).
- For the Connections 8.0 CR12 Component Pack, refer to:
     - [Kubernetes Runtime and Component Pack Middleware](../../admin/install/cp_kubernetes_runtime.md).
    -  [Prerequisites for Component Pack](../../admin/install/cp_prereqs.md).

## Redis 7 support

HCL Connections 8.0 now supports Redis 7 for the Component Pack. To enhance the security of data in transit, administrators are encouraged to implement SSH tunnels to secure Redis traffic, as outlined in the documentation.

For details, see [Securing Redis traffic to the Component Pack](../install/cp_config_om_redis_secure_linux.md) and [Securing Redis traffic to the Component Pack (Windows)](../install/cp_config_om_redis_secure_windows.md).

## Help Center access from HCL Connections

The Help icon in the left navigation bar of HCL Connections applications can now be configured to open the HCL Connections Help Center.  This feature requires internet connectivity.

For details, see [Enable the Help icon to access HCL Connections Help Center](../install/t_install_enable_help_center.md).

## HCL API Gateway support for Component Pack

HCL API Gateway can now be configured to work with HCL Connections Component Pack, providing enhanced security and management for API traffic.

For details, see [Installing HCL API Gateway for Component Pack](../install/installing_hcl_api_gateway_for_component_pack.md).

## HCL API Gateway installation on OpenShift

HCL API Gateway can now be installed on OpenShift to work with HCL Connections Component Pack, allowing for scalable and flexible deployment options.

For details, see [Installing Component Pack on OpenShift](../install/cp_openshift.md).

## HCL API Modernization - Blogs and Moderation APIs

HCL Connections introduces new JSON-based APIs and the HCL API Gateway as part of the API Modernization Initiative to enhance developer support and integration capabilities. The first delivery includes the Blogs and Blog Moderation APIs, which are built atop the API Gateway and modernize how developers interact with blog-related data in Connections.

Future releases will include APIs for additional Connections components as part of this ongoing modernization effort. These APIs and the Gateway can be deployed as part of the Component Pack on both Kubernetes and OpenShift environments.

For details, see [API Modernization](../develop/dev_api_modern.md). Also see, [Installing HCL API Gateway for Component Pack](../install/installing_hcl_api_gateway_for_component_pack.md). 

## Enhanced Wiki Experience and Space Utilization

Space utilization in Wikis has been improved with the new Hide/More Options toggle and the ability to collapse the left sidebar, allowing users to make the most of their screen space.

**Sidebar and Options Expanded:**
![Screenshot of the expanded wiki page](images/wikis_expanded.png)
<br><br>

**Sidebar and Options Collapsed**
![Screenshot of the collapsed wiki page](images/wikis_collapsed.png)
<br><br>

In addition, when creating a Wiki page, the Tips section has been moved from the left sidebar to next to the rich text editor. Users can show or hide it using the Show/Hide Tips toggle to maximize the available screen space.

![Screenshot of wiki tips page](images/wikis_tips.png)


## Outlook Add-in Exchange Tokens in iFix
        
The Outlook Add-in Exchange Tokens iFix addresses issues related to the use of legacy Exchange tokens in the Outlook add-in. This fix replaces legacy tokens with Microsoft’s Nested App Authentication, improving security and compatibility.
        
Refer to [Installing Outlook Add-in Exchange Tokens iFix](../../admin/migrate/t_outlook_addin_exchange_tokens_ifix.md) for detailed installation instructions. 

Also see [Configure Microsoft Entra ID for Outlook Add-in](../../admin/install/cp_3p_outlook_addin_microsoft_entra.md) for guidance on setting up the necessary application registration in Microsoft Entra ID.


<br><br>

**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.


