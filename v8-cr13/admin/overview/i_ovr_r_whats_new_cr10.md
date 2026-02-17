# What's new in HCL Connections 8.0 CR10

Find out about features that are new or updated in this release of HCL Connections..

- See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates Connections Server, including required critical updates.

- **Download** HCL Connections 8.0 CR10 is now available and can be downloaded exclusively from the My HCLSoftware (MHS) portal.

    - Starting with Connections 8.0 CR10, all current and future Connections product releases and third-party application updates will be distributed solely through the [My HCLSoftware](https://my.hcltechsw.com/downloads/connections/connections) (MHS) portal.
    
        As part of this transition, previous HCL Connections offerings will remain available on the [HCL Software Download and License Management Portal](https://hclsoftware.flexnetoperations.com) until June 30, 2025. Customers are encouraged to begin using the MHS portal to access their entitled software moving forward.
    
        For more information, see [HCL Connections offerings are now exclusively available on the My HCLSoftware portal](https://support.hcl-software.com/csm?id=kb_article&sysparm_article=KB0120542).

        !!! note

            U.S. Federal customers will continue to obtain HCLSoftware products through the HCL Federal Support Center.
    
    - The latest Component Pack from [Harbor](https://hclcr.io/harbor/projects/15/repositories).


## What's New in HCL Connections 8.0 CR10 and Component Pack 8 CR10 {#section_hgz_3dy_clb .section}

**HCL Connections 8.0 CR10 Fix List**

- A number of fixes have been deployed for this release to address several issues. For more information on these fixes, see [Connections 8.0 Cumulative Release (CR) List](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0102882).

**System requirements**

- Refer to the [HCL Connections 8.0 CR10 System Requirements](system_requirements.md).

- For the Connections 8.0 CR10 Component Pack, see [Prerequisites for Component Pack](../../admin/install/cp_prereqs.md).

    !!! note
    
        For deployments using Connections Component Pack 8.0 CR5 or above (new or upgraded), IBM WebSphere 8.5.5 Fix Pack 24 or above, which has an updated Java version is required. Otherwise enabling SSL for Metrics will fail, as the Java version prior to Fix Pack 24 cannot open the keystore built by the newer Java.

## TinyMCE is now the supported rich-text editor in HCL Connections

The CKEditor has been deprecated and is no longer supported or recommended for use with HCL Connections. The TinyMCE editor is now the supported rich-text editor, offering enhanced features and extensive customization options for a more robust editing experience.

Customers are encouraged to adopt TinyMCE for their Connections deployments. While CKEditor remains available, it will no longer receive updates or support. For more details, refer to [Installing and configuring Tiny Editors for HCL Connections](../../admin/install/tiny_editors/c_tiny-editors.md)

## Communities Application Sync Renaming

When Communities are renamed, the associated applications (such as Blogs) are updated accordingly. This ensures widget mappings (for example, News widget) continue to function without errors. For more details, refer to [Changing a community name and linked application's name](../../user/communities/renaming_community.md)


## Recently Visited Typeahead Support

The "**Recently Visited**" list, accessible from the top search field, now supports type-ahead filtering when viewing the full history list.
        
  
## Mobile Highlights Widget Enablement

Mobile apps now support highlight widgets from Communities by dynamically using compatible ones. This ensures proper rendering of community highlights on mobile devices.



**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.

