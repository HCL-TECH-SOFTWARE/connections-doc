# What's new in HCL Connections 8.0 CR9

Find out about features that are new or updated in this release of HCL Connections.

- See the article [Update Strategy for HCL Connections 8.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0101180) on the HCL Support site to obtain the latest updates Connections Server, including required critical updates.

- **Download** Connections 8.0 CR9 from:
    <!-- [HCL Software License & Download portal](https://hclsoftware.flexnetoperations.com)-->
    - [My HCLSoftware portal](https://my.hcltechsw.com/)
    - the latest Component Pack from [Harbor](https://hclcr.io/harbor/projects/15/repositories).


## What's New in HCL Connections 8.0 CR9 and Component Pack 8 CR9 {#section_hgz_3dy_clb .section}

**HCL Connections 8.0 CR9 Fix List**

- A number of fixes have been deployed for this release to address several issues. For more information on these fixes, see [Connections 8.0 Cumulative Release (CR) List](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0102882).

**System requirements**

- Refer to the [HCL Connections 8.0 CR9 System Requirements](system_requirements.md).

- For the Connections 8.0 CR9 Component Pack, see [Prerequisites for Component Pack](../../admin/install/cp_prereqs.md).

    !!! note
    
        For deployments using Connections Component Pack 8.0 CR5 or above (new or upgraded), IBM WebSphere 8.5.5 Fix Pack 24 or above, which has an updated Java version is required. Otherwise enabling SSL for Metrics will fail, as the Java version prior to Fix Pack 24 cannot open the keystore built by the newer Java.

## HCL Connections MongoDB 7 Support

Starting with HCL Connections Component Pack 8.0 CR9, HCL Connections now supports and requires MongoDB 7. Upgrading from MongoDB 5 and migrating data to MongoDB 7 is required. For detailed instructions on installation and migration, see the following sections:

- [Installing MongoDB 7 for Component Pack 8](../../admin/install/installing_mongodb_7_for_component_pack_8.md)
- [MongoDB 5 to MongoDB 7 Migration Guide](../../admin/install/mongo7-migration-script.md)

!!! note

    Any version of HCL Connections 7.0 or 8.0 CR upgrading to HCL Connections Component Pack 8.0 CR9 is required to upgrade from MongoDB 5 to MongoDB 7 and migrate data to MongoDB 7.

## Enhanced Leap widget support for HCL Domino Leap in Connections 8.0 CR9

Starting with Connections 8.0 CR9, the Leap Form and Results widgets now offer full support for HCL Domino Leap, in addition to HCL Leap. For details see [Installing Leap Survey](../../admin/install/leap_surveys.md).


**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.

