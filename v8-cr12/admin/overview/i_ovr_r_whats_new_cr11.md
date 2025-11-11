# What's new in HCL Connections 8.0 CR11

Find out about features that are new or updated in this release of HCL Connections..

- See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates Connections Server, including required critical updates.

- **Download** HCL Connections 8.0 CR11 from the [My HCLSoftware](https://my.hcltechsw.com/) (MHS) portal, and the latest Component Pack from [Harbor](https://hclcr.io/harbor/projects/15/repositories).

## What's New in HCL Connections 8.0 CR11 and Component Pack 8 CR11 {#section_hgz_3dy_clb .section}

**HCL Connections 8.0 CR11 Fix List**

- A number of fixes have been deployed for this release to address several issues. For more information on these fixes, see [Connections 8.0 Cumulative Release (CR) List](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0102882).

**System requirements**

- Refer to the [HCL Connections 8.0 CR11 System Requirements](system_requirements.md).

- For the Connections 8.0 CR11 Component Pack, see [Prerequisites for Component Pack](../../admin/install/cp_prereqs.md).

    !!! note
    
        For deployments using Connections Component Pack 8.0 CR5 or above (new or upgraded), IBM WebSphere 8.5.5 Fix Pack 24 or above, which has an updated Java version is required. Otherwise enabling SSL for Metrics will fail, as the Java version prior to Fix Pack 24 cannot open the keystore built by the newer Java.


## Outlook Add-in Exchange Tokens in iFix
        
The Outlook Add-in Exchange Tokens iFix addresses issues related to the use of legacy Exchange tokens in the Outlook add-in. This fix replaces legacy tokens with Microsoft’s Nested App Authentication, improving security and compatibility.
        
Refer to [Installing Outlook Add-in Exchange Tokens iFix](../../admin/migrate/t_outlook_addin_exchange_tokens_ifix.md) for detailed installation instructions.

## Password Information Banner Support 

A new `passwordInformationBanner` element has been introduced in the `selfregistration-config.xml` file, allowing administrators to display localized password policy messages during user registration and password changes. 

Refer to [Displaying Password Rules in User Dialogs](../../admin/admin/t_install_config_self-registration_for_external_users.md)

## SAN Certificate Requirements for IBM WebSphere

IBM WebSphere 8.5.5 Fix Pack 27 introduces updated Subject Alternative Name (SAN) certificate requirements, ensuring secure communications and compatibility with modern browsers and security standards.

For more details, refer to the [HCL Connections 8.0 CR11 System Requirements](system_requirements.md) and to the [Steps to install or upgrade to Component Pack 8](../../admin/install/cp_install_services_tasks.md) for configuration.

## TLS Support for Ingress Controller

TLS (HTTPS) support for the ingress controller is now available, enabling secure encrypted traffic for Connections services and improving overall data protection.

For more details, refer to [Enabling secure traffic to the ingress controller](../../admin/install/enable_ingress_tls.md)
        

## IBM DB2 v12.1 support

HCL Connections now fully supports IBM DB2 version 12.1, providing entitlement to the latest database features, performance enhancements, and security updates. DB2 12.1 is officially included as a supported configuration in the system requirements and is available for customer use in production environments.

For more details and support confirmation, refer to the [HCL Connections 8.0 CR11 System Requirements](system_requirements.md)


**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.

