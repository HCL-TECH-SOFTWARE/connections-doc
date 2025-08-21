# System requirements

This document provides the minimum system requirements for the 8.0 CR3 (and later) release of HCL Connections. Higher maintenance levels, such as fix packs and service packs, may be supported as they become available.

For detailed system requirements for other HCL Connections releases, refer to [HCL Connections and Connections Docs System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) in the support portal. Detailed system requirements provide complete lists of hardware requirements, supported operating systems, prerequisites and optional supported software, with component-level details and operating system restrictions.

## Definition of terms

There are three categories of support for integrated products to HCL Connections. They are "Supported Configuration", "Unsupported Configuration", and "Other Configuration". The definition and support statement for each category follow:

- **Product minimum** - The Connections cumulative release (CR) that the new release was certified.

- **Supported Configuration** - A combination of HCL Software and other Dependent Products (usually at a specified version, release, fix or specification level) that has been validated by HCL.

- **Unsupported Configuration** - A combination of HCL Software and other software packages (at a specified version, release and fix level) that is known to not work with HCL Connections and is therefore not supported.

- **Other Configuration** - Includes many configurations of HCL Products and other software exist that are not explicitly listed as "Supported Configurations" or "Unsupported Configurations", but which can reasonably be expected to perform within the accepted bounds of reliability, function, and performance.

For more details, refer to [HCL Connections support statement](https://help.hcl-software.com/connections/latest/admin/plan/r_install_support_statements.html).

## System requirements

### Operating systems

!!! note

    All instances of "(1)" mean that the requirement includes future minor releases and fix packs.

#### Linux Family

|OS|OS minimum|Hardware|Bitness|Product minimum|Support level|
|--|----------|--------|-------|---------------|-------------|
|IBM Red Hat Enterprise Linux (RHEL) Server|7.9 (1)|x86-64|	64-Tolerate|8.0|Other Configuration|
|IBM Red Hat Enterprise Linux (RHEL) Server|8.6 (1)|x86-64|64-Tolerate|8.0|Supported Configuration|
|IBM Red Hat Enterprise Linux (RHEL) Server|9.2 (1)|x86-64|64-Tolerate|8.0 CR4|Supported Configuration|
|SUSE Linux Enterprise Server (SLES)|15 (1)|x86-64|64-Tolerate|8.0 CR7|Supported Configuration|
|AlmaLinux|9.3 (1)|x86-64|64-Tolerate|8.0 CR5|Other Configuration|

#### Microsoft Windows Family

|OS|OS minimum|Hardware|Bitness|Product minimum|Support level|
|--|----------|--------|-------|---------------|-------------|
|Windows Server Essentials Edition|2016 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Essentials Edition|2019 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Essentials Edition|2022 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Standard Edition|2016 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Standard Edition|2019 (1)|x86-64|64-Tolerate|8.0|Supported Configuration|
|Windows Server Standard Edition|2022 (1)|x86-64|64-Tolerate|8.0|Supported Configuration|
|Windows Server Datacenter Edition|2016 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Datacenter Edition|2019 (1)|x86-64|64-Tolerate|8.0|Other Configuration|
|Windows Server Datacenter Edition|2022 (1)|x86-64|64-Tolerate|8.0|Other Configuration|

#### Plugins

|OS|System requirements|
|--|----------|
|HCL Connections for Mac|See the [HCL Connections for Mac supports](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0074308) article|
|HCL Connections Desktop Plug-ins for Microsoft Windows|See the [HCL Connections Desktop Plug-ins for Microsoft Windows](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073986) article|

#### Application Servers

|Application Server|Version|Product minimum|Support level|
|------------------|-------|---------------|-------------|
|IBM WebSphere Application Server Network Deployment|8.5.5.23 (1,2)|8.0 CR2|Supported Configuration|
|IBM WebSphere Application Server Network Deployment|8.5.5.24 (1,2,3)|8.0 CR5|Supported Configuration|
|IBM WebSphere Application Server Network Deployment|8.5.5.25 (1,2)|8.0 CR5|Other Configuration|
|IBM WebSphere Application Server Network Deployment|8.5.5.26 (1,2)|8.0 CR8|Supported Configuration|
|IBM WebSphere Application Server Network Deployment|8.5.5.27 (1,2,4)|8.0 CR11|Supported Configuration|
|IBM WebSphere Application Server Network Deployment|9.x.x.x|N/A|**Unsupported Configuration**|

Additional details:

(2) Fix packs are available on the My HCLSoftware (MHS) portal in the [IBM WebSphere for Connections - 8.5](https://my.hcltechsw.com/downloads/connections/connections3rd/was?g=8.5l) tile.

<!--(3) There is a known issue in IBM WebSphere 8.5.5 Fix Pack 22 where retrieve from port using TLS v1.3 or v1.2 ciphers may not work. For details, refer to [PH49497: RETRIEVE FROM PORT NOT HONORING SSL PROTOCOL](https://www.ibm.com/support/pages/apar/PH49497) on the IBM support portal. Contact HCL Connections support or IBM WebSphere support for the iFix 8.5.5.22-WS-WAS-IFPH49497.zip. -->

(3) For deployments using HCL Connections Component Pack 8.0 CR5 or above (new or upgraded), IBM WebSphere 8.5.5 Fix Pack 24 or above, which has an updated Java version, is required. Otherwise enabling SSL for Metrics will fail, as the Java version prior to Fix Pack 24 cannot open the keystore built by the newer Java.

(4) Refer to the topic [Steps to install or upgrade to Component Pack 8](https://help.hcl-software.com/connections/latest/admin/install/cp_install_services_tasks.html) for important information on setting the Subject Alternative Name (SAN) required for IBM WebSphere 8.5.5.27.

#### Installation

|Installation|Version|Product minimum|Support level|
|------------|-------|---------------|-------------|
|IBM Installation Manager|1.8.5|N/A|**Unsupported Configuration**|
|IBM Installation Manager|1.9 (1)|8.0|Supported Configuration|


#### Collaboration

|Collaboration|Version|Product minimum|Support level|
|------------|-------|---------------|-------------|
|HCL Connections Docs|2.0.2 (1)|8.0|Supported Configuration|
|HCL Leap (PVU)|9.3.5 (1)|8.0 CR2|Supported Configuration|
|HCL Leap (PVU)|9.3.8 (1)|8.0 CR9|Supported Configuration|
|HCL Leap (PVU Container)|9.3.5 Container (1)|8.0 CR6|Supported Configuration|
|HCL Domino Leap |1.1.6 (1) |8.0 CR9|Supported Configuration|

Additional details:

HCL Leap 9.3.8 and Domino Leap 1.1.6 have introduced stricter security measures. Please refer to the following topics in the Leap product documentation “Configuration properties” and “Admin Configuration Page“ for information on the whitelist, attachment whitelist, embedding, image domain whitelist, and service whitelists

#### Databases

|Database|Version|Product minimum|Support level|
|--------|-------|---------------|-------------|
|IBM DB2 Enterprise Server Edition|11.5.6 (1)|8.0|Supported Configuration|
|IBM DB2 Enterprise Server Edition|11.5.9 (1)|8.0 CR8|Supported Configuration|
|IBM DB2 Enterprise Server Edition|12.1 (1)|8.0 CR11|Other Configuration|
|Microsoft SQL Server Enterprise Edition|2019 (1, 2)|8.0|Other Configuration|
|Microsoft SQL Server Enterprise Edition|2022 (1, 2)|8.0 CR2|Supported Configuration|
|Oracle Database 19c Standard Edition|19.0.0 (1)|8.0|Supported Configuration|
|Oracle Database 19c Enterprise Edition|19.0.0 (1)|8.0|Other Configuration|

Additional details:

(2) MS SQL 2019 & 2022 requires the "HCL Connections V8.0 Wizard for <operating system/> Refresh for MS SQL Server 2022" which can be downloaded from the [My HCLSoftware (MHS) portal ](https://my.hcltechsw.com/downloads/connections/connections/8.0) in the HCL Connections 8.0 tile.

#### E-mail applications

|E-mail application|Version|Product minimum|Support level|
|--|--|--|--|
|HCL Notes|11.0, 12.0, 14.0 (1)|8.0|Supported Configuration|
|Microsoft Outlook|365|8.0|Supported Configuration|

#### Identity management 

|Identity Management|Version|Product minimum|Support level|
|--|--|--|--|
|IBM Security Directory Integrator|7.2 Fix Pack 8 (2)|8.0|Supported Configuration|
|IBM Security Directory Integrator|7.2 Fix Pack 9 (2, 3)|8.0|Supported Configuration|
<!--|IBM Security Directory Integrator|7.2 Fix Pack 11 |8.0|Other Configuration|-->


Additional details:

(2) IBM Java 8 Runtime is required for the IBM Security Directory Integrator 7.2 Fix Pack 8 & 9.

(3) For important installation details, refer to [Upgrading to SDI 7.2.0 FP9 breaks SDI Solution for Connections Profiles (tdisol)](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0104118) in the support portal.

#### LDAP 

|LDAP Server|Version|Product minimum|Support level|
|--|--|--|--|
|HCL Domino|11.0, 12.0, 14 (1, 2)|8.0|Supported Configuration|
|IBM Security Verify Directory|10.0 (1, 2)|8.0 CR8|Supported Configuration|
|Microsoft Active Directory|2016 (1, 2)|8.0|Other Configuration|
|OpenLDAP|2.4 (1, 3)|8.0|Supported Configuration|

Additional details:

(2) The LDAP versions listed in the Version column of the table have undergone compatibility testing by HCL and are therefore recommended for usage with Connections. For further details on newer versions and releases of supported LDAP Servers, refer to the [Connections 8.0 support statement](https://help.hcl-software.com/connections/latest/admin/plan/r_install_support_statements.html).

(3) OpenLDAP is only supported when using command line interface. The Population Wizard graphical user interface is not supported.

!!! note

    LDAP servers that support the LDAP V3 specification are supported using command line interface. The Population Wizard graphical user interface is only supported for the LDAP servers that are listed as "Supported Configuration".

#### Mobile

|Mobile product|System requirements|
|--|--|
|HCL Connections for Android|See the Compatibility section in the [Play Store product entry](https://play.google.com/store/apps/details?id=com.hcl.lotus.connections.mobile&pcampaignid=web_share).|
|HCL Connections for iOS|See the Information section in the [App Store product entry](https://apps.apple.com/us/app/hcl-connections/id450533489).|

#### Security management

|Security management|Version|Product minimum|Support level|
|--|--|--|--|
|CA SiteMinder|12.5 (1)|8.0|Other Configurations|
|IBM Security Access Manager|9.0.1 (1)|8.0|Other Configurations|
|OpenID Connect (OIDC)|N/A|8.0|Supported Configuration|

#### Web browsers

|Web browser|Product minimum|Support level|
|--|--|--|
|Apple Safari|8.0|Supported Configuration|
|Google Chrome|8.0|Supported Configuration|
|Microsoft Edge|8.0|Supported Configuration|
|Mozilla Firefox|8.0|Supported Configuration|

!!! note

    The web browsers listed in the table have undergone compatibility testing by HCL and are therefore recommended for usage with Connections. For further details on newer versions and releases of supported web browsers, refer to the [Connections 8.0 Support Statement](https://opensource.hcltechsw.com/connections-doc/v8-cr4/admin/plan/r_install_support_statements.html).

#### Web servers

|Web server|Version|Product minimum|Support level|
|--|-|--|--|
|IBM HTTP Server|8.5.5.23 (1,2)|8.0 CR3|Supported Configuration|
|IBM HTTP Server|8.5.5.24 (1,2)|8.0 CR5|Supported Configuration|
|IBM HTTP Server|8.5.5.25 (1,2)|8.0 CR5|Other Configuration|
|IBM HTTP Server|8.5.5.26 (1,2)|8.0 CR8|Supported Configuration|
|IBM HTTP Server|8.5.5.27 (1,2,3)|8.0 CR8|Supported Configuration|
|IBM HTTP Server|9.0.5 FP11 (1,4,5)|8.0 CR3|Supported Configuration|

Additional details:

(2) Fix packs are available on the My HCLSoftware (MHS) portal in the [IBM WebSphere for Connections - 8.5](https://my.hcltechsw.com/downloads/connections/connections3rd/was?g=8.5l) tile.

(3) Refer to the topic [Steps to install or upgrade to Component Pack 8](https://help.hcl-software.com/connections/latest/admin/install/cp_install_services_tasks.html) for important information on setting the Subject Alternative Name (SAN) required for IBM WebSphere 8.5.5.27.

(4) Fix packs are available on the My HCLSoftware (MHS) portal in the [IBM WebSphere for Connections - 9.0](https://my.hcltechsw.com/downloads/connections/connections3rd/was?g=9.0) tile.

(5) IBM HTTP Server 9.0.5 FP11 or above is required to support TLS 1.3.

#### Editors

|Tiny Editors|Version|Product minimum|Support level|
|--|-|--|--|
|Tiny Editors for HCL Connections|4.9.2.17|8.0 CR1|Supported Configuration|
|Tiny Editors for HCL Connections|4.9.2.24|8.0 CR2|Supported Configuration|
|Tiny Editors for HCL Connections|4.9.2.37|8.0 CR4|Supported Configuration|
|Tiny Editors for HCL Connections|4.9.2.41|8.0 CR5|Supported Configuration|
|Tiny Editors for HCL Connections|4.9.2.45|8.0 CR8|Supported Configuration|

!!! note

    The CKEditor is no longer supported, has been deprecated, and is not recommended for use with HCL Connections going forward. The TinyMCE editor is now the supported rich-text editor as detailed in the [Connections 8.0 CR10 What's New](i_ovr_r_whats_new_cr10.md)

#### Screen resolution

|Screen resolution|Product minimum|Support level|
|---|---|---|
|Screen width of 1440 pixels|8.0|Supported Configuration|

#### Component Pack middleware

!!! note

    For deployments using HCL Connections Component Pack 8.0 CR5 or above (new or upgraded), IBM WebSphere 8.5.5 Fix Pack 24 or above, which has an updated Java version, is required. Otherwise enabling SSL for Metrics will fail, as the Java version prior to Fix Pack 24 cannot open the keystore built by the newer Java.

|Component|Version|Product minimum|Support level|
|--|--|--|--|
|Calico|3.30 <br> 3.28 <br> 3.25|8.0 CR11 <br> 8.0 CR8 <br>8.0 CR2 | Supported Configuration<br>Supported Configuration <br> Supported Configuration|
|HAProxy|3.1.3 <br> 3.0.3 <br> 2.6.6|8.0 CR10 <br> 8.0 CR8 <br> 8.0 CR2|Supported Configuration <br> Supported Configuration <br> Supported Configuration|
|Helm|3.15.3 <br> 3.11.3|8.0 CR8 <br> 8.0 CR3|Supported Configuration <br> Supported Configuration|
|MongoDB|7.0.12 | 8.0 CR9 | Supported Configuration <br>
|NGINX|1.26 <br> 1.24|8.0 CR8 <br> 8.0 CR2|Supported Configuration <br> Supported Configuration|
|OpenSearch|2.19.2 <br>2.19.0 <br> 2.15.0 <br> 2.12.0 <br> 2.9.0 <br>|8.0 CR11 <br> 8.0 CR10 <br> 8.0 CR8 <br> 8.0 CR6 <br> N/A <br>|Supported Configuration <br> Supported Configuration <br> Supported Configuration <br> Supported Configuration <br> **Unsupported Configuration**|

Additional details:

MongoDB 5 is no longer supported as of HCL Connections Component Pack v8.0 CR9 and must be upgraded to MongoDB 7.

#### Kubernetes Runtime and platform support policy

Refer to [Kubernetes Runtime](https://help.hcl-software.com/connections/latest/admin/install/cp_kubernetes_runtime.html) for details on the latest Kubernetes versions and platforms tested and supported by specific HCL Connections Kubernetes deployments.

#### End of support for system requirements

|Application|Version|
|--|--|
|CentOS Linux|7.0|
|ElasticSearch|7.6.1|
|IBM AIX|7.x|
|IBM DB2 Enterprise Server Edition|11.1.x.x|
|IBM HTTP Server|8.5.5.21|
|IBM HTTP Server|8.5.5.22|
|IBM Installation Manager|1.8.5|
|IBM Security Directory Integrator|7.2 in IBM Java 7 Runtime Environment|
|IBM Security Directory Server|6.4|
|IBM WebSphere Application Server Network Deployment|8.5.5.21|
|IBM WebSphere Application Server Network Deployment|8.5.5.22|
|Kubernetes|1.27|
|Microsoft Internet Explorer|11|
|Microsoft Outlook|2016|
|Microsoft Outlook|2019|
|Microsoft SQL Server Enterprise Edition|2016|
|Microsoft Windows Professional Client|10|
|MongoDB|5.0|
|MongoDB|3.0|
|Openshift|4.11|
|SUSE Linux Enterprise Server (SLES)|12|

#### Hardware

**Disk space**

|Components|Requirements|
|--|--|
|WebSphere Deployment Manager & Application Server Nodes|HCL recommends you have at least 100 GB free disk space on the WebSphere machines under the WebSphere home directory to allow the installation of WebSphere and Connections, and to maintain the retention of configuration files, log files, and diagnostic files. Production deployments will likely require significantly more space to retain log and diagnostic files. <br><br> Installation will require: <br><br> Temporary: <br> - 5 GB to download the installation zip file and extract the contents (that is, /tmp//HCL_Connections_8.0_lin.tar & extraction to a temporary directory) <br><br> Permanent: <br> - Approximately 3 GB to install WebSphere (/opt/IBM/WebSphere) <br> - 2 GB of content will be extracted to the Connections Home directory (/opt/HCL/Connections) during installation on the Deployment Manager <br> - 2 GB of application binaries and configuration files will be installed under WebSphere (opt/IBM/WebSphere/AppServer)
|Connections Home / Local file system|Allocate an additional minimum of 20 GB to the local Connections Home file system on each Application Server node for storage of temporary search indexes, cache files and other data (/opt/HCL/Connections).|
|Connections Shared Content Store|This network file storage is mounted on each Application Server and is used to store file content, favicons, SIB Message storage, search indexes and other files shared across all application servers. The size of this storage is greatly dependent on how Connections is utilized. The file system usage should be monitored and expanded as required. <br><br> HCL recommends a minimum of 1 TB for production deployments, but customers are encouraged to discuss their requirements with HCL Technical Sales and ensure they plan for future growth.|

**CPU/Memory**

|Hardware architecture|Requirements|
|--|--|
|X86 & POWER System|WebSphere Application Server node: <br> - At least 4 CPU and 16 GB of memory is recommended. <br><br> Database server: <br> - At least 4 CPU and 16 GB of memory is recommended. Also refer to the relational database product documentation for additional requirements.
 
