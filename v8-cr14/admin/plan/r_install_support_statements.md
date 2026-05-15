# HCL Connections support statement {#r_install_support_statements .reference}

HCL Software relies on a range of other commercial and non-commercial Third Party Software to perform its function. This document describes the support that customers can expect for various configurations of HCL Connections, other HCL Programs, and Third Party Software.

While HCL cannot reasonably describe all possible configurations that a customer might choose to use, HCL tests HCL Connections with a prescribed list of other HCL Programs and Third Party Software during the development of a new release.  This document describes the level of support that Customers can expect for various configurations of HCL Connections, other HCL Programs, and Third Party Software.

HCL only provides Support for the configuration and problem determination of Third Party Software that is supplied with HCL’s Programs. In all other cases, it is your responsibility to obtain configuration assistance and support for Third Party Software yourself. In those cases, if HCL determines that a problem reported to HCL is caused by Third Party Software, we will ask you to engage directly with your service provider to obtain support or assistance.

!!! note
    
    The statements in this document reflect the general level of Support that can be expected for HCL Connections in accordance with [HCL’s Support Guide](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0010420). Nothing in this document shall be construed as supplementing, modifying, or superseding the terms of your HCL Master License Agreement, or other applicable agreement, for HCL Connections, nor shall it create any obligation for HCL to deliver a level of support other than that provided under a relevant HCL agreements.

## Categories of support

For support purposes, we define three categories of configuration:

#### **Supported Configurations**

A “Supported Configuration” is a combination of HCL Programs and other Third Party Software (usually at a specified version, release, fix, or specification level) that has been validated by HCL.

HCL provides full Support for HCL Programs configured within this category. Support is provided under the terms of the Support Guide, to ensure that the Program operates within its specifications.

#### **Unsupported Configurations**

An “Unsupported Configuration” is a combination of HCL Programs and Third Party Software (usually at a specified version, release, fix, or specification level) that is known to not work with HCL Connections and is therefore not supported.

HCL does not provide support for Unsupported Configurations. Resolutions to deficiencies or incompatibilities found in Unsupported Configurations are not generally available.

Customers can seek assistance on an additional fee basis from HCL services, from an authorized HCL Business Partner, or from another service provider provided such services fall within the terms and conditions of use under the license grant of the relevant HCL agreement.

#### **Other Configurations**

Many confurations of HCL Programs and other software exist that are not explicitly listed in “Supported Configurations” or “Unsupported Configurations”, but which can reasonably be expected to perform within the accepted bounds of reliability, function, and performance.

Configurations that fall into this category typically substitute HCL Programs or Third Party Software listed in the “Supported Configuration” for similar software. This may be a newer fix level of the HCL Program or Third Party Software or other Third Party Software product that adheres to a supported specification. For example, this could be a newer WebSphere® Application Server (WAS) fix pack, an LDAP server that adheres to that standard, or an external security manager that integrates via public APIs.

Customers may access HCL Support for “Other Configurations”. In these scenarios, HCL will provide Support at its discretion only.

During problem determination, HCL Support will determine if the problem exists in a Supported Configuration, if a resolution can be provided, or if this is an Unsupported Configuration. 

Resources for problem determination are applied until HCL either provides a solution to the issue, determines that a solution is not commercially reasonable, or determines that the issue is caused by the substituted HCL Program or Third Party Software and does not exist in a Supported Configuration. 

If HCL is not able to resolve the problem on the customer configuration in question, then customers may choose to explore alternative solutions on an additional fee basis from HCL services, from an HCL Business Partner, or from another service provider within the terms and conditions of use under the license grant of the relevant HCL agreement.

One possible outcome of a problem in this category is that HCL determines the configuration not to work, and will update the list of Unsupported Configurations accordingly.

## Support for LDAP Servers

LDAP support spans two (2) categories. These are "Fully tested and supported LDAP servers" and "Untested LDAP servers." The support statement for each category follows:

-   **Fully tested and supported LDAP servers**

    The list of fully tested LDAP servers for each release of Connections is documented in the detailed system requirements for each release. Support accepts problem reports for the appropriate Connections releases using the tested directory servers. These problem reports receive high-priority attention. Features that are tested with these directories include relatively simple search and retrieval functions for user and group objects. Connections Support encourages customers to work with their LDAP provider for additional support on these advanced features. 

-   **Untested LDAP servers and functions**

    In general, Connections Support makes a commercially reasonable effort to support directory servers that have not been tested with Connections. This includes version numbers that differ from what is listed as tested in the [HCL Connections and HCL Docs  System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654). Support accepts problem reports for the appropriate Connections releases using untested directory servers. If Support can recreate the reported problem using a tested LDAP server, staff will attempt to fix the problem. If Support is not able to recreate the problem on a tested LDAP server, customers are referred to the LDAP provider for further assistance. Functions outside this scope, such as dynamic groups, referrals, or the Active Directory Global Catalog feature, are considered advanced features and have not been tested with Connections.

## Restrictions

The following are restricted products where the HCL Connections team has a specific reason for supporting an exact match or for not supporting the product. This list may change and may be periodically updated as Restrictions are made known while our product and customer experiences continue to grow:

-   The Connections UI only supports browsers in their default zoom settings. Any UI issues found with non-default settings (zoom in/out) are not supported

**Parent topic:** [Planning](../plan/c_installation_overview.md)

