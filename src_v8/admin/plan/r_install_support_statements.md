# HCL Connections support statement {#r_install_support_statements .reference}

The statement proposes revisions to the definition of "supported" and "unsupported" with respect to the various products on which HCL Connections™ depends for proper operation.

## Introduction { .section}

HCL Connections requires the use of several collateral products for its normal operations. In particular, it requires IBM® WebSphere® Application Server, a database, a repository for user information \(typically an LDAP repository\), and other products depending on specific customer requirements.

During the testing of a new release, HCL generally tests HCL Connections with a prescribed list of these collateral products. These products are designated as "Supported Products" in the documented hardware and software requirements for that release. Because the list of "Supported Products" cannot reasonably describe all possible configurations that a customer may need to use, this document is intended to provide clarification of the level of support that can be generally expected for the current release with various combinations of dependent products.

**Note:** Although the statements in this document reflect the general level of support that can be expected for HCL Connections, the terms and conditions of any specific support offering, license or other Agreement you might have with HCL will determine the actual delivered support for the product. Nothing herein shall be construed as supplementing, modifying or superseding the terms of your HCL license agreement for HCL Connections or any other agreement you might have with HCL, nor shall it create any obligation for HCL to deliver a level of support other than might be set forth in such Agreements.

## Categories of Support {#section_r4y_5nb_glb .section}

**Supported Products**

1.  **Supported Products**

    A "Supported Product" is a product \(at a specified version, release and fix level\) that was tested by HCL and is known to work with HCL Connections. The list of HCL Connections 7.0 supported products can be found in the [HCL System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).

    Products in this category are supported as per the terms of your HCL Connections license agreement. Cases will be accepted by HCL Support \(“Support”\) in accordance with the conditions of the HCL Connections License Agreement.

2.  **Newer Versions and Releases of Supported Products**

    Many products outside the specific version\(s\), release\(s\) or fix pack\(s\) of the "Supported" version, \(referenced in the documented hardware and software requirements\) may not have been explicitly tested by HCL, yet can reasonably be expected to perform within the accepted bounds of reliability, function and performance by a customer, excluding those listed in the Restrictions section.

    Products that fall into this category are typically newer releases or fix levels of a product already in the "Supported Products" category or a product that adheres to a standard API that HCL Connections supports, such as an LDAP server. Some specific examples might include a newer operating system fix level, an IBM Java \(JVM\) fix pack, a new DB2 fix pack or an updated LDAP server.

    For products that fall into this category, support is as follows:

    -   *Conditional support for HCL Sametime versions 10 and 11: At this time, Connections supports Sametime version 9. HCL Connections Development believes Sametime versions 10 and 11 should work with Connections 7.0, however these versions have not been tested. If a customer would like to deploy and test, HCL Support will help troubleshoot any problems encountered on a case-by-case basis. If minor issues are identified, we will investigate creating a fix. However, if a major issue is identified, a roll back to Sametime version 9 may be required.*
    -   *For IBM products, such as IBM Directory Server or Domino LDAP, and IBM JDKs \(JVMs\), HCL Connections will fully support fix-pack, release and version updates that do not significantly change interfaces or other underlying support that HCL Connections depends on for its functionality. If and when a newer release of one of these products is shipped that HCL Connections cannot accommodate, that fact will be noted as described in the next section entitled "Unsupported Products." Note that in order for HCL Connections to support an update to a database or LDAP product, WebSphere Application Server must support that update as well.*
    -   **Note:** *HCL Connections has been tested extensively with the stated release version and fix pack release of WebSphere Application Server found in the HCL Connections Software requirements. The HCL Connections 7.0 System Requirements section will be updated when successfully completing testing of forward WebSphere Application Server fix packs as we continue to test. Upgrading to a new fix pack level of the WebSphere Application Server that is not listed in HCL Connections 7.0 System Requirements is not well tolerated and is treated as an **Unsupported Product** described below.*

    -   *If the Support organization for the untested product in question is unable to resolve the problem, Support will deem that version, release or fix pack level of the untested product in question to now be an "Unsupported Product."*
3.  **Unsupported Products**

    An "Unsupported Product" is a product \(at a specified version, release and fix level\) that is known to not work with HCL Connections and is therefore not supported. A product can be included in this category as a result of an explicit test effort by HCL or as a result of discovery from a prior customer problem. The HCL Connections team maintains a list, by HCL Connections release, of all products that need special consideration for deployment. They are published within this document in the **Restrictions** section.


## Support for LDAP Servers {#section_xrm_5nb_glb .section}

LDAP support spans two \(2\) categories. These are "Fully tested and supported LDAP servers" and "Untested LDAP servers." The support statement for each category follows:

1.  **Fully tested and supported LDAP servers**

    The list of fully tested LDAP servers for each release of HCL Connections is documented in the detailed system requirements for each release. Support accepts problem reports for the appropriate HCL Connections releases using the tested directory servers. These problem reports receive high-priority attention. Features that are tested with these directories include relatively simple search and retrieval functions for user and group objects. HCL Connections Support encourages customers to work with their LDAP provider for additional support on these advanced features.

2.  **Untested LDAP servers**

    In general, HCL Connections Support makes a commercially reasonable effort to support directory servers that have not been tested with HCL Connections. This includes version numbers that differ from what is listed as tested in the [HCL System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654). Support accepts problem reports for the appropriate HCL Connections releases using untested directory servers. If Support can recreate the reported problem using a tested LDAP server, staff will attempt to fix the problem. If Support is not able to recreate the problem on a tested LDAP server, customers are referred to the LDAP provider for further assistance. Functions outside this scope, such as dynamic groups, referrals, or the Active Directory Global Catalog feature, are considered advanced features and have not been tested with HCL Connections.


## Support for Kubernetes {#section_dkt_gqb_glb .section}

HCL is committed to keeping the Kubernetes infrastructure that underlies Component Pack functionality on a supported release. Kubernetes fully supports their current release and the two previous releases. Starting with the HCL Connections 6.5 CR1 release, HCL Connections will update Kubernetes on a regular cadence to stay within the fully supported Kubernetes product lifecycle.

Docker and Kubernetes are third party products. HCL support is available to assist in configuration and support related issues as it pertains to the HCL Connections product. If you require assistance with a full Kubernetes or Docker deployment, contact HCL services or one of our HCL Business Partners to inquire about professional services.

## Support for Web Browsers {#section_swy_5vg_ynb .section}

Newer versions and releases of supported web browsers may not be explicitly tested by HCL for a given Connections release, but can generally be expected to perform as described in the "Newer Versions and Releases of Supported Products" section above. This same expectation also applies to completely new web browsers that adhere to accepted standards.

HCL Connections Support will accept cases for both newer versions and releases of supported web browsers as well as new web browser products, and will make reasonable efforts to evaluate and resolve issues.

Should HCL Connections Support be unable to reproduce an issue or find that an issue is not based in Connections code, customers will be referred to the respective web browser vendor for further assistance.

## Support for Virtualization Environments {#section_jvp_2rb_glb .section}

If you submit a standard usage or defect-related service request and HCL Connections is running in a Virtual Environment that is not officially tested, HCL Connections Support will make reasonable efforts to resolve the problem. We will assume the issue is common to both native and virtual operating environments. If we suspect that a problem is the result of the virtualization technology, it may be necessary to recreate the issue in a native environment before providing continued defect support. This will guide subsequent ownership of the problem for further troubleshooting. HCL Connections Support will not provide support or assistance with the set up and/or configuration of Virtual Environments. Customers looking for support setting up Virtual Environments should consult their respective vendors.

## Restrictions {#section_i2k_hrb_glb .section}

The following are restricted products where the HCL Connections team has a specific reason for supporting an exact match or for not supporting the product. This list may change, as our product and customer experiences continue to grow:

-   Connections API Support: Connections API is supported in a similar way to LotusScript support in that we do not debug customer code. HCL Support will validate that the API request, as documented, returns a valid response. If there is a defect in the Connections API, HCL will support that.
-   DB2 11.1 and 11.1 fix packs are supported, as specified in the [HCL System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).
-   Exact match for supporting: WebSphere Application Server fix pack\(s\) specified in the in the [HCL System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).

    **Note:** As forward fix pack\(s\) are verified supporting HCL Connections 7.0, the HCL Connections 7.0 System Requirements will be updated with the additional supported version\(s\).

-   Not currently supported: Integrating SPNEGO or IWA with the HCL Connections Activities sidebar and Business Card in the HCL Notes 9.0.x Client.
-   The Connections UI only supports browsers in their default zoom settings. Any UI issues found with non-default settings \(zoom in/out\) are not supported.

    This document may be periodically updated as Restrictions are made known.


## HCL Connections Support Statement Addendum - Custom Code {#section_fdb_2sb_glb .section}

**Product Documentation** This document describes the limits of HCL remote technical support available to you when implementing custom interface artifacts or applications in your HCL Connections environment.

**Content** When designing your own custom content for Connections, you write custom code and plug it into Connections. There may be occasions in which you require assistance with the coding of these customizations.

Samples of coding customizations can be:

-   *User interface \(UI\)* - themes, skins, javascript modules, and other artifacts that affect the user experience of your clients.
-   *Applications* - opensocial gadgets, iwidgets, and other modules that provide some function to your HCL Connections users.
-   *Other implementations of public plugpoints* - such as writing a custom API client, or a self-signup servlet provisioning the user in the Profiles database, or third-party implementations of other industry specifications.

    HCL Technical Support provides remote software support for documented customizations in Connections as referenced in the version's Help Center as well as other technical support materials available via the HCL Customer Support portal. This support might be limited to assisting with suspected or confirmed defects in the documentation and code as delivered, and would be subject to the same resolution criteria as a problem reported in the software as provided out of the box.

    In some cases, however, HCL Support may place limitations on the extent to which we will assist in troubleshooting a reported problem. These two conditions apply:

    1.  HCL considers open source code and application frameworks installed by customers, either bundled as part of the application or as shared libraries, to be part of their application code.
    2.  If a problem is caused by the framework or the customer code relying on an unofficial interface or undocumented behavior, it is the responsibility of the customer or the framework owner to address the issue.
    Examples of when HCL does not provide support:

    -   Products or configurations referenced in section 3 *\(Unsupported Product\)* in the [HCL System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).
    -   Customized themes, skins, screens and other UI artifacts beyond the samples and examples provided in the product itself, its documentation, or in materials made available from the product support page \(unless otherwise specified in the documentation for such materials\).
    -   Decompiled, rewritten or altered variations of HCL-provided code such as JSPs, opensocial gadgets or iwidgets that are customized beyond the intended, regularly available, and documented means available to configure the application as delivered.
    -   Questions and issues outside of the documented public API in the custom code, such as questions on APIs defined in the Java Standard or Enterprise Edition.
    -   Questions and issues regarding implementing third-party specifications in your Connections environment, for example [Apache MyFaces](http://myfaces.apache.org/), [Java Spring Application Framework](https://spring.io/), or [Hibernate](http://hibernate.org/).
    -   Any code or module that violates the terms and conditions of the contractual agreements made when purchasing or downloading the software.
    HCL remote technical support will aid in the event your customization exposes what might be a defect in the product as provided. This may include unexpected results as follows:

    -   Making use of a documented API or configuration component \(for opensocial gadgets, iwidgets or themes being customized\).
    -   Installing or deploying your custom content.
    -   Using Connections administrative interfaces and utilities to implement your customization.
    Administrators and users are encouraged to use the self-assistance information available on the [HCL Customer Support: Connections Resource site](https://support.hcltechsw.com/csm?id=connections_support). Many times, the problems encountered have already been reported and documented for your convenience.

    HCL remote technical support is not a replacement for education or experience in the technologies used in HCL Connections. HCL remote technical support is not the appropriate vehicle for making product enhancement requests. Each of these cases should be first brought to your HCL account representative who will have more information available on such topics. Additionally the [HCL Software Customer Idea Portal](https://connections-ideas.hcltechsw.com/?sort=recent) may be used to submit product ideas and enhancement requests.


**Parent topic:**[Planning](../plan/c_installation_overview.md)

