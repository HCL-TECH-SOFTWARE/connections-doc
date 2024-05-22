# Troubleshooting OAuth errors {#r_troubleshooting_media_thumb .reference}

OAuth is used to manage the list of client applications that are allowed to prompt users for access to their HCL Connections™ data.

## Overview { .section}

The OAuth support feature consists of four parts:

-   The WebSphere® Application Server OAuth Application that exposes authorization and token endpoints, and a feed of authorizations.
-   The WebSphere Application Server OAuth TAI that intercepts requests to OAuth-protected API endpoints and sets the user principal in the request, handling error response codes.
-   The Connections OAuth Provider support module that exposes an Application Access page, Access Request screens, and a ProviderInitializer context listener that is used by all Connections applications.
-   The Connections OAuth Consumer Proxy that resides in the WidgetContainer application, which is responsible of the OpenSocial gadget container.

## Troubleshooting guidelines { .section}

Add the strings from table 1 to log level details. Then, restart Connections and inspect trace logs. The OAuth components are verbose and write a sizable quantity of diagnostic messages to the trace log.

|Component|Trace strings|
|---------|-------------|
|WebSphere Application Server OAuth TAI and endpoint servlets|`com.ibm.ws.security.oauth20.*=all`|
|Connections OAuth Provider initializer, platform, DAO, and MBeans|`com.ibm.lconn.oauth.*=all`|
|CRE OAuth Consumer Proxy|`org.apache.shindig.gadgets.oauth2.*=all com.ibm.mm.proxy.*=all (MuM proxy)`|
|Connections CRE integration layer|`com.ibm.lconn.core.services.cre.*=all` <br> `com.ibm.lconn.news.shindig.oauth.service.*=all` <br> `com.ibm.lconn.news.service.impl.oauth.*=all`|

## Troubleshooting { .section}

|Type|Error|URL|Reason|Solution|
|----|-----|---|------|--------|
|Response in the user interface|`Error 404: javax.servlet.ServletException: Filter [OAuth20ClientAuthnFilter]: filter is unavailable.`|http://server:port/oauth2/endpoint/connectionsProvider/authorize?client\_id=<client\_id\>&redirect\_uri=<redirect\_uri\>&response\_type=code&scope=Connections&state=<state\>|The authorization screen URL is invalid. This happens if the \{oauthSvcUrl\} placeholder in the authorization URL parameter was not replaced successfully.|Make sure the ProviderInitializer context listener completes initialization successfully. Check errors in the logs to find an appropriate solution for each case.|

**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

