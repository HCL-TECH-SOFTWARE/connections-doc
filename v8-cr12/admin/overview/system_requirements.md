# HCL Connections Server System Requirements

This document provides the minimum system requirements for the 8.0 CR releases of HCL Connections. Higher maintenance levels, such as fix packs and service packs, may be supported as they become available. For support information on a specific CR level, refer to the Product Minimum for the application.

For detailed system requirements for other HCL Connections releases, refer to [HCL Connections and Connections Docs System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) in the support portal. Detailed system requirements provide complete lists of hardware requirements, supported operating systems, prerequisites and optional supported software, with component-level details and operating system restrictions.

## Definition of Terms

There are three categories of support for integrated products to HCL Connections. They are "Supported Configuration", "Unsupported Configuration", and "Other Configuration". The definition and support statement for each category follow:

- **Product Minimum** - The Connections cumulative release (CR) that the new release was certified.

- **Supported Configuration** - A combination of HCL Software and other Dependent Products (usually at a specified version, release, fix or specification level) that has been validated by HCL.

- **Unsupported Configuration** - A combination of HCL Software and other software packages (at a specified version, release and fix level) that is known to not work with HCL Connections and is therefore not supported.

- **Other Configuration** - Includes many configurations of HCL Products and other software exist that are not explicitly listed as "Supported Configurations" or "Unsupported Configurations", but which can reasonably be expected to perform within the accepted bounds of reliability, function, and performance.

For more details, refer to [HCL Connections Support Statement](https://help.hcl-software.com/connections/latest/admin/plan/r_install_support_statements.html).

!!! important

    It is recommended that both the Connections CR and the Component Pack be upgraded to prevent compatibility issues.

!!! note

    All instances of "(1)" mean that the requirement includes future minor releases and fix packs.

## Server System Requirements

### Operating Systems

#### Linux Family

|Operating System|Operating System Minimum|Hardware|Bitness|Product Minimum|Support Level|
|--|----------|--------|-------|---------------|-------------|
|IBM Red Hat Enterprise Linux (RHEL) Server|9.2 (1)|x86-64|64-Tolerate|8.0 CR4|Supported Configuration|
|IBM Red Hat Enterprise Linux (RHEL) Server|8.6 (1)|x86-64|64-Tolerate|8.0|Supported Configuration|
|SUSE Linux Enterprise Server (SLES)|15 (1)|x86-64|64-Tolerate|8.0 CR7|Supported Configuration|
|AlmaLinux|9.3 (1)|x86-64|64-Tolerate|8.0 CR5|Other Configuration|


#### Microsoft Windows Family

|Operating System|Operating System minimum|Hardware|Bitness|Product Minimum|Support Level|
|--|----------|--------|-------|---------------|-------------|
|Windows Server Essentials Edition|2016 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Essentials Edition|2019 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Essentials Edition|2022 (1)|x86-64|64-Tolerate|8.0 CR9|Other Configuration|
|Windows Server Standard Edition|2016 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Standard Edition|2019 (1)|x86-64|64-Tolerate|8.0|Supported Configuration|
|Windows Server Standard Edition|2022 (1)|x86-64|64-Tolerate|8.0 CR9|Supported Configuration|
|Windows Server Datacenter Edition|2016 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Datacenter Edition|2019 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Datacenter Edition|2022 (1)|x86-64|64-Tolerate|8.0 CR9|Other Configuration|

### Installation

|Installation|Version|Product Minimum|Support Level|
|------------|-------|---------------|-------------|
|IBM Installation Manager|1.8.5|N/A|**Unsupported Configuration**|
|IBM Installation Manager|1.9 (1)|8.0|Supported Configuration|

### Application Servers

|Application Server|Version|Product Minimum|Support Level|
|------------------|-------|---------------|-------------|
|IBM WebSphere Application Server Network Deployment|8.5.5.24 (1,2,3)|8.0 CR5|Supported Configuration|
|IBM WebSphere Application Server Network Deployment|8.5.5.25 (1,2)|8.0 CR5|Other Configuration|
|IBM WebSphere Application Server Network Deployment|8.5.5.26 (1,2)|8.0 CR8|Supported Configuration|
|IBM WebSphere Application Server Network Deployment|8.5.5.27 (1,2,4)|8.0 CR11|Supported Configuration|
|IBM WebSphere Application Server Network Deployment|8.5.5.28 (1,2,4)|8.0 CR12|Supported Configuration|
|IBM WebSphere Application Server Network Deployment|9.x.x.x|N/A|**Unsupported Configuration**|

Additional details:

(2) Fix packs are available on the My HCLSoftware (MHS) portal in the [IBM WebSphere for Connections - 8.5](https://my.hcltechsw.com/downloads/connections/connections3rd/was?g=8.5l) tile.

(3) For deployments using HCL Connections Component Pack 8.0 CR5 or above (new or upgraded), IBM WebSphere 8.5.5 Fix Pack 24 or above, which has an updated Java version, is required. Otherwise enabling SSL for Metrics will fail, as the Java version prior to Fix Pack 24 cannot open the keystore built by the newer Java.

(4) Refer to the topic [Steps to install or upgrade to Component Pack 8](https://help.hcl-software.com/connections/latest/admin/install/cp_install_services_tasks.html) for important information on setting the Subject Alternative Name (SAN) required when upgrading to IBM WebSphere 8.5.5.27 or above from IBM WebSphere 8.5.5.26 or below.

### Web Servers

|Web Server|Version|Product Minimum|Support Level|
|--|-|--|--|
|IBM HTTP Server|8.5.5.24 (1,2)|8.0 CR5|Supported Configuration|
|IBM HTTP Server|8.5.5.25 (1,2)|8.0 CR5|Other Configuration|
|IBM HTTP Server|8.5.5.26 (1,2)|8.0 CR8|Supported Configuration|
|IBM HTTP Server|8.5.5.27 (1,2,3)|8.0 CR11|Supported Configuration|
|IBM HTTP Server|8.5.5.28 (1,2,3)|8.0 CR12|Supported Configuration|
|IBM HTTP Server|9.0.5.25 (1,4,5)|8.0 CR12|Supported Configuration|

Additional details:

(2) Fix packs are available on the My HCLSoftware (MHS) portal in the [IBM WebSphere for Connections - 8.5](https://my.hcltechsw.com/downloads/connections/connections3rd/was?g=8.5l) tile.

(3) Refer to the topic [Steps to install or upgrade to Component Pack 8](https://help.hcl-software.com/connections/latest/admin/install/cp_install_services_tasks.html) for important information on setting the Subject Alternative Name (SAN) required when upgrading to IBM WebSphere 8.5.5.27 or above from IBM WebSphere 8.5.5.26 or below.

(4) Fix packs are available on the My HCLSoftware (MHS) portal in the [IBM WebSphere for Connections - 9.0](https://my.hcltechsw.com/downloads/connections/connections3rd/was?g=9.0) tile.

(5) IBM HTTP Server 9.0.5 FP11 or above is required to support TLS 1.3.

### Databases

|Database|Version|Product Minimum|Support Level|
|--------|-------|---------------|-------------|
|IBM DB2 Enterprise Server Edition|11.5.6 (1)|8.0|Supported Configuration|
|IBM DB2 Enterprise Server Edition|11.5.9 (1)|8.0 CR8|Supported Configuration|
|IBM DB2 Enterprise Server Edition|12.1 (1)|8.0 CR11|Supported Configuration|
|Microsoft SQL Server Enterprise Edition|2019 (1, 2)|8.0|Other Configuration|
|Microsoft SQL Server Enterprise Edition|2022 (1, 2)|8.0 CR2|Supported Configuration|
|Oracle Database 19c Standard Edition|19.0.0 (1)|8.0|Supported Configuration|
|Oracle Database 19c Enterprise Edition|19.0.0 (1)|8.0|Other Configuration|

Additional details:

(2) MS SQL 2019 & 2022 requires the "HCL Connections V8.0 Wizard for <operating system/> Refresh for MS SQL Server 2022" which can be downloaded from the [My HCLSoftware (MHS) portal ](https://my.hcltechsw.com/downloads/connections/connections/8.0) in the HCL Connections 8.0 tile.

### Identity management 

|Identity Management|Version|Product Minimum|Support Level|
|--|--|--|--|
|IBM Security Directory Integrator|7.2 Fix Pack 8 (2)|8.0|Supported Configuration|
|IBM Security Directory Integrator|7.2 Fix Pack 9 (2, 3)|8.0 CR3|Supported Configuration|
|IBM Security Directory Integrator|7.2 Fix Pack 14 (2, 3, 4) |8.0 CR12|Supported Configuration|

Additional details:

(2) IBM Java 8 Runtime is required for the IBM Security Directory Integrator 7.2 Fix Packs.

(3) For important installation details, refer to [Upgrading to SDI 7.2.0 FP9 & FP14 breaks SDI Solution for Connections Profiles (tdisol)](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0104118) in the support portal.

(4) Service Refresh 8 Fix Pack 45 for IBM Java Runtime Technology Version 8.0 for Microsoft Windows is not available on the My HCLSoftware (MHS) portal. Please contact IBM Support to obtain the package.

### LDAP Servers 

|LDAP Server|Version|Product Minimum|Support Level|
|--|--|--|--|
|HCL Domino|12.0, 14.0, 14.5 (1, 2)|8.0|Supported Configuration|
|IBM Security Verify Directory|10.0 (1, 2)|8.0 CR8|Supported Configuration|
|Microsoft Active Directory|2016 (1, 2)|8.0|Other Configuration|
|OpenLDAP|2.6.8 (1, 3)|8.0|Supported Configuration|

Additional details:

(2) The LDAP versions listed in the Version column of the table have undergone compatibility testing by HCL and are therefore recommended for usage with Connections. For further details on newer versions and releases of supported LDAP Servers, refer to the [Connections 8.0 support statement](https://help.hcl-software.com/connections/latest/admin/plan/r_install_support_statements.html).

(3) OpenLDAP is only supported when using command line interface. The Population Wizard graphical user interface is not supported.

!!! note

    LDAP servers that support the LDAP V3 specification are supported using command line interface. The Population Wizard graphical user interface is only supported for the LDAP servers that are listed as "Supported Configuration".

### Editors

|Tiny Editors|Version|Product Minimum|Support Level|
|--|-|--|--|
|Tiny Editors for HCL Connections|4.9.2.17|8.0 CR1|Supported Configuration|
|Tiny Editors for HCL Connections|4.9.2.24|8.0 CR2|Supported Configuration|
|Tiny Editors for HCL Connections|4.9.2.37|8.0 CR4|Supported Configuration|
|Tiny Editors for HCL Connections|4.9.2.41|8.0 CR5|Supported Configuration|
|Tiny Editors for HCL Connections|4.9.2.45|8.0 CR8|Supported Configuration|

!!! note

    TinyMCE is the supported rich-text editor for Connections, and customers are encouraged to use it for their Connections deployments. CKEditor will remain available but will no longer receive updates or support.

### Security Management

|Security Management|Version|Product Minimum|Support Level|
|--|--|--|--|
|CA SiteMinder|12.5 (1)|8.0|Other Configurations|
|IBM Security Access Manager|9.0.1 (1)|8.0|Other Configurations|
|OpenID Connect (OIDC)|N/A|8.0|Supported Configuration|

## Collaboration and Communication Service Requirements

### Collaboration

|Collaboration|Version|Product Minimum|Support Level|
|------------|-------|---------------|-------------|
|HCL Connections Docs|2.0.2 (1)|8.0|Supported Configuration|
|HCL Leap (PVU)|9.3.5 (1)|8.0 CR2|Supported Configuration|
|HCL Leap (PVU)|9.3.8 (1)|8.0 CR9|Supported Configuration|
|HCL Leap (PVU)|9.3.10.25 (1)|8.0 CR12|Supported Configuration|
|HCL Leap (PVU Container)|9.3.5 Container (1)|8.0 CR6|Supported Configuration|
|HCL Domino Leap |1.1.6 (1) |8.0 CR9|Supported Configuration|
|HCL Domino Leap |1.1.9 (1) |8.0 CR12|Supported Configuration|

Additional details:

HCL Leap 9.3.8 (and above) and Domino Leap 1.1.6 (and above) have introduced stricter security measures. Please refer to the following topics in the Leap product documentation “Configuration properties” and “Admin Configuration Page“ for information on the whitelist, attachment whitelist, embedding, image domain whitelist, and service whitelists

### E-mail Applications

|E-mail Application|Version|Product Minimum|Support Level|
|--|--|--|--|
|HCL Notes|12.0, 14.0, 14.5 (1)|8.0|Supported Configuration|
|Microsoft Outlook|365|8.0|Supported Configuration|

### Plugins

|Operating System|System Requirements|
|--|----------|
|HCL Connections for Mac|See the [HCL Connections for Mac](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0074308) article|
|HCL Connections Desktop Plug-ins for Microsoft Windows|See the [HCL Connections Desktop Plug-ins for Microsoft Windows](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073986) article|

### Mobile

|Mobile Product|System Requirements|
|--|--|
|HCL Connections for Android|See the Compatibility section in the [Play Store product entry](https://play.google.com/store/apps/details?id=com.hcl.lotus.connections.mobile&pcampaignid=web_share).|
|HCL Connections for iOS|See the Information section in the [App Store product entry](https://apps.apple.com/us/app/hcl-connections/id450533489).|

## Browser and Display System Requirements

### Web Browsers

|Web Browser|Product Minimum|Support Level|
|--|--|--|
|Apple Safari|8.0|Supported Configuration|
|Google Chrome|8.0|Supported Configuration|
|Microsoft Edge|8.0|Supported Configuration|
|Mozilla Firefox|8.0|Supported Configuration|

Additional details:

The web browsers listed in the table have undergone compatibility testing by HCL and are therefore recommended for usage with Connections. For further details on newer versions and releases of supported web browsers, refer to the [Connections 8.0 Support Statement](https://opensource.hcltechsw.com/connections-doc/v8-cr4/admin/plan/r_install_support_statements.html).


### Screen Resolution

|Screen Resolution|Product Minimum|Support Level|
|---|---|---|
|Screen width of 1440 pixels|8.0|Supported Configuration|

## Deprecated System Requirements

|Application|Version|
|--|--|
|Calico|3.25|
|CentOS Linux|7.x|
|ElasticSearch|7.6.1|
|HCL Domino| 11|
|IBM AIX|7.x|
|IBM DB2 Enterprise Server Edition|11.1.x.x|
|IBM HTTP Server|8.5.5.23 and below|
|IBM Installation Manager|1.8.5|
|IBM Red Hat Enterprise Linux (RHEL) Server|7.x|
|IBM Security Directory Integrator|7.2 in IBM Java 7 Runtime Environment|
|IBM Security Directory Server|6.4|
|IBM WebSphere Application Server Network Deployment|8.5.5.23 and below|
|Kubernetes|1.27|
|Microsoft Internet Explorer|11|
|Microsoft Outlook|2016|
|Microsoft Outlook|2019|
|Microsoft SQL Server Enterprise Edition|2016|
|Microsoft Windows Professional Client|10|
|MongoDB|5.0|
|MongoDB|3.0|
|NGINX|1.24|
|Openshift|4.11|
|SUSE Linux Enterprise Server (SLES)|12|

## Hardware

### Server Hardware Requirements

#### Disk Space

|Components|Requirements|
|--|--|
|WebSphere Deployment Manager & Application Server Nodes|HCL recommends you have at least 100 GB free disk space on the WebSphere machines under the WebSphere home directory to allow the installation of WebSphere and Connections, and to maintain the retention of configuration files, log files, and diagnostic files. Production deployments will likely require significantly more space to retain log and diagnostic files. <br><br> Installation will require: <br><br> Temporary: <br> - 5 GB to download the installation zip file and extract the contents (that is, /tmp//HCL_Connections_8.0_lin.tar & extraction to a temporary directory) <br><br> Permanent: <br> - Approximately 3 GB to install WebSphere (/opt/IBM/WebSphere) <br> - 2 GB of content will be extracted to the Connections Home directory (/opt/HCL/Connections) during installation on the Deployment Manager <br> - 2 GB of application binaries and configuration files will be installed under WebSphere (opt/IBM/WebSphere/AppServer)
|Connections Home / Local file system|Allocate an additional minimum of 20 GB to the local Connections Home file system on each Application Server node for storage of temporary search indexes, cache files and other data (/opt/HCL/Connections).|
|Connections Shared Content Store|This network file storage is mounted on each Application Server and is used to store file content, favicons, SIB Message storage, search indexes and other files shared across all application servers. The size of this storage is greatly dependent on how Connections is utilized. The file system usage should be monitored and expanded as required. <br><br> HCL recommends a minimum of 1 TB for production deployments, but customers are encouraged to discuss their requirements with HCL Technical Sales and ensure they plan for future growth.|

#### CPU/Memory

|Hardware architecture|Requirements|
|--|--|
|X86 & POWER System|WebSphere Application Server node: <br> - At least 4 CPU and 16 GB of memory is recommended. <br><br> Database server: <br> - At least 4 CPU and 16 GB of memory is recommended. Also refer to the relational database product documentation for additional requirements.

### HCL Connections 8.0 Sizing Guide
The 
 [HCL Connections 8.0 Sizing Guide](https://opensource.hcltechsw.com/connections-doc/v8/guide_me/how_to_guides/connections8_sizing_guide.pdf) provides guidance based on performance testing and proven best practices from HCL and customer deployments. Administrators can use these values as an initial reference before performing a formal sizing and tuning exercise tailored to the customer’s specific environment.
