<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Setting up KeyCloak for Connections Mobile 

The Connection mobile app requires that the SSL certificate used by all endpoints is valid and trusted. Self-signed certificates or expired certificates will cause the app to fail and there is no suitable workaround. Ensure that all public endpoints for the Connections server and for the Keycloak token provider are secured using certificate authorities that have trusted root certificates shipping with the Apple iOS and Android mobile operating systems.

**Create client for Connections Mobile client**

Using the Keycloak admin console, you must create an entry for a new client ID named connections_social_mobile in the realm that is being used by Connections.

Navigate to Clients and select Create to create a new client. Fill out the following fields, the rest can remain blank or unset.


| **Key** | **Value** | 
| --- | --- |
| Client ID | connections_social_mobile |
| Enabled | ON |
| Consent Required | OFF |
| Client Protocol | openid-connect |
| Access Type | public| |
| Standard Flow Enabled | ON |
| Implicit Flow Enabled | OFF |
| Direct Access Grants Enabled | OFF |
| Valid Redirect URIs | com.ibm.ibmscp://com.ibm.mobile.connections/token |
|

**Special considerations for Keycloak based identity providers**

If you are configuring customer specific Identity Providers via Keycloak, and looking to have mobile and plugin users automatically login with their customer specific IDP, refer to the topic **Using Keycloak Identity Providers with Mobile and Plugins**.



<?tm 1541016643182 1 HCL Connections ?>

