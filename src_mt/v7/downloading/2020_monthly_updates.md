<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">
# 2020 Monthly Updates
## May 2020 Update

Download the following HCL Connections 6.5 MT May Monthly Update package from the HCL License &amp; Delivery Portal.

| **File ID** | **File Name** | **File Description** |
| --- | --- | --- |
| HCL_Connections_MT_May_20_Update | LO100046-IC6.5.0.0_CR1a-Common-Fix.jar | HCL Connections 6.5 MT May 2020 Monthly Update |
|
The following table contains the Fix List for the Connections 6.5 MT May Monthly Update

| **Problem Description** |
| --- |
| Fixed an issue where incorrect errors were displayed when trying to add an External User to an internal Activity. |
| Users from one org can no longer be imported into a Community in a different org. |
| Addresses an issue where RTE code was setting the incorrect host header when using OIDC. |
| Suppressed the message that was displayed by the Personal Calendar link for Homepage Events. |
| Fixed an issue where an external user was removed but would still would appear in search results. |
|

## June 2020 Update

Download the following HCL Connections 6.5 MT June Monthly Update package from the HCL License &amp; Delivery Portal.

| **File ID** | **File Name** | **File Description** |
| --- | --- | --- |
| HCL_Connections_MT_June_20_Update | LO100059-IC6.5.0.0_CR1a-Common-Fix.jar | HCL Connections 6.5 MT June 2020 Monthly Update |
|

The following table contains the Fix List for the Connections 6.5 MT June Monthly Update

| **Problem Description** |
| --- |
| Address issue with External users who can not View or Edit files that are shared with them. |
| Address issue with selecting wikis/home does not redirect to communities correctly. |
| Allows the usage of Keycloak Identiity Providers with Mobile and Plugins |
|

Follow these steps after the June Update is installed to allow the usage of Keycloak Identity Providers with Mobile and Plugins.

1. Replace mobile-config.xsd on the DMgr path with the version from/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/\&lt;serverName\&gt;/Mobile.ear/properties/mobile-config.xsd.
2. Review the topic,[Using Keycloak Identity Providers with Mobile and Plugins](https://help.hcltechsw.com/connectionscloud/HCL+MT+CH-MSP+Product+Documentation/Configuring+the+Multi-Tenant+environment.pdf)to determine if you require the new \&lt;OAuthAuthorizationURL\_Parameters\&gt; parameter. If so, edit mobile-config.xmlfrom /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/mtdemo1Cell01/LotusConnections-config/ and add the new XML tag \&lt;OAuthAuthorizationURL\_Parameters\&gt;.
3. Restart the mobile application using the WebSphere administrationconsole

**Note:** The MT monthly updates are not cumulative and the previous monthly updates should be installed before installing the latest update.

## July 2020 Update

Download the following HCL Connections 6.5 MT July Monthly Update package from the HCL License &amp; Delivery Portal.

| **File ID** | **File Name** | **File Description** |
| --- | --- | --- |
| HCL_Connections_MT_July_20_Update | LO100064-IC6.5.0.0_CR1a-Common-Fix.jar | HCL Connections 6.5 MT July 2020 Monthly Update |
|

The following table contains the Fix List for the Connections 6.5 MT July Monthly Update

| **Problem Description** |
| --- |
| Fix an issue where the webcals dialog box would not be displayed after selecting &#39;Add to Personal Calendar&#39; link from the Community&#39;s &#39;Events&#39; widget. |
| Fixed the blank screen that would be displayed when working with an extension in the mobile |
| Under certain circumstances the Rich Content Widget could not retrieve a token and failed to load. This was fixed by implementing the following generic property in the LotusConnectionsConfig.xml:\&lt;genericProperty name=&quot;com.hcl.connections.rte.acceptIncomingOAuthTokensFromSubject&quot;\&gt;true\&lt;/genericProperty\&gt; |
| Corrected an issue where the Blogs provisioning API would return a 302 response |
| Activities API will now retrieve the &#39;full&#39; description (ActivitiesExtendedDescription) |
|

**Note:** The MT monthly updates are not cumulative and the previous monthly updates should be installed before installing the latest update.

## August 2020 Update

Download the following HCL Connections 6.5 MT August Monthly Update package from the HCL License &amp; Delivery Portal.

| **File ID** | **File Name** | **File Description** |
| --- | --- | --- |
| HCL_Connections_MT_August_20_Update | LO100068-IC6.5.0.0_CR1a-Common-Fix.jar | HCL Connections 6.5 MT August 2020 Monthly Update |
|

The following table contains the Fix List for the Connections 6.5 MT August Monthly Update

| **Problem Description** |
| --- |
| Corrected a problem where an Empty &quot;To&quot; field in the Notification Email Header would cause the notification to be rejected by anti-spam policies. |
|

**Note:** The MT monthly updates are not cumulative and the previous monthly updates should be installed before installing the latest update.

## September 2020 Update

Download the following HCL Connections 6.5 MT September Monthly Update package from the HCL License &amp; Delivery Portal.

| **File ID** | **File Name** | **File Description** |
| --- | --- | --- |
| HCL_Connections_MT_September_20_Update | LO100073-IC6.5.0.0_CR1a-Common-Fix.jar | HCL Connections 6.5 MT September 2020 Monthly Update |
|

The following table contains the Fix List for the Connections 6.5 MT September Monthly Update

| **Problem Description** |
| --- |
| Update Mobile PushNotificationService to support HTTP/2 based protocol APIs for Connections iOS |
| Fixed the problem where @Mentions in Blogs would point to the wrong tenant |
|

**Note:** The MT monthly updates are not cumulative, and the previous monthly updates are required be installed before installing the latest update.

## October 2020 Update

Download the following HCL Connections 6.5 MT October Monthly Update package from the HCL License &amp; Delivery Portal.

| **File ID** | **File Name** | **File Description** |
| --- | --- | --- |
| HCL_Connections_MT_October_20_Update | LO100075-IC6.5.0.0_CR1a-Common-Fix.jar | HCL Connections 6.5 MT October 2020 Monthly Update |
|
The following table contains the Fix List for the Connections 6.5 MT October Monthly Update

| **Problem Description** |
| --- |
| Fixed an issue where the Search app was not making the correct request to load the MT ConfigEngine. |
| General improvements to the Rich Content Widget |
| [October, 2020 MT fixpack, all MT customers should update their mobile-config.xml under the DMgr path](https://help.hcltechsw.com/connectionscloud/HCL+MT+CH-MSP+Product+Documentation/Configuring+Mobile+for+the+Multi-Tenant+environment.pdf) |
|

**Note:** The MT monthly updates are not cumulative, and the previous monthly updates are required to be installed before installing the latest update.

## November 2020 Update

Download the following HCL Connections 6.5 MT November Monthly Update package from the HCL License &amp; Delivery Portal.

| **File ID** | **File Name** | **File Description** |
| --- | --- | --- |
| HCL_Connections_MT_November_20_Update | LO100076-IC6.5.0.0_CR1a-Common-Fix.jar | HCL Connections 6.5 MT November 2020 Monthly Update |
|
The following table contains the Fix List for the Connections 6.5 MT November Monthly Update

| **Problem Description** |
| --- |
| Fixed an issue where the Search app was not making the correct request to load the MT ConfigEngine. |
| Corrected the Wikis API where there was a difference in what the server returned depending on the authentication type - basic vs. oauth |
|

**Note:** The MT monthly updates are not cumulative, and the previous monthly updates are required to be installed before installing the latest update.
<?tm 1541016643182 1 HCL Connections ?>

