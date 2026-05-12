# Installing and enabling OAuth TAI {#t_inst_installingandenablingoauthtai .task}

You need to install and enable the OAuth TAI in HCL Connections.

1.  Before installing HCL Connections, be sure to [install](../install/t_install_was.md) the [supported]https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) version of IBM WebSphere Application Server.

2.  Export customizable OAuth provider properties using the import/export commands `AdminTask.exportOAuthProps providerName fileName` and `AdminTask.importOAuthProps providerName fileName`.

    Additional properties can be configured but properties should not be customized unless required: authOnly is used to indicate whether a client request should fail if no Oauth token or authentication could be performed with other available authentication methods.

    |Property|Default value|Description|
    |--------|-------------|-----------|
    |oauthjdbc.CleanupInterval|3600 \(1h\)|Interval in seconds after which expired tokens are cleared from the database. This time elapses from the startup of the provider application.|
    |oauth20.max.authorization.grant.lifetime.seconds|15768000 \(6mo\)|Max lifetime of authorization grant. Provides a maximum limit to the lifetime of all tokens.|
    |oauth20.code.lifetime.seconds|60 \(1m\)|Lifetime of authorization code. For security reasons, this value must not exceed a few minutes.|
    |oauth20.code.length|30|Length of authorization code \(max is 2048\).|
    |oauth20.token.lifetime.seconds|43200 \(12h\)|Lifetime of access token. When an access token expires, a client must request a new access token by exchanging the refresh token.|
    |oauth20.access.token.length|40|Length of access token \(max is 2048\).|
    |oauth20.issue.refresh.token|true|If set to true, clients will receive a refresh token. If set to false, clients must request authorization when the access token expires.|
    |oauth20.refresh.token.length|50|Length of refresh token \(max is 2048\).|
    |oauth20.allow.public.clients|false|\*FUTURE USE\* If set to true, public clients are allowed.|
    |oauth20.authorization.form.template|\{oauthSvcUrl\}/authorize|\*DO NOT EDIT\* Authorization template URL|
    |oauth20.authorization.error.template|\{oauthSvcUrl\}/error|\*DO NOT EDIT\* Error page template URL|
    |oauth20.authorization.loginURL|\{oauthSvcUrl\}/authenticate|\*DO NOT EDIT\* Authentication URL|

3.  You can modify the TAI filter for Connections applications by enabling WebSphere global security, including Application security, as follows:

    **Note:** TAI filter rules should be modified only when the context root for components is changed. The default rule is set by the Connections Installer.

    1.  Using the WebSphere Application Server Integrated Solutions Console, navigate to **Security** \> **Global Security** \> **Web and SIP Security** \> **Trust Association** \> **Interceptors** \> **com.ibm.ws.security.oauth20.tai.OAuthTAI**.

        The TAI filter property provider\_n.filter is used to choose an Oauth service provider when a client invokes a protected web resource. The filter property specifies a set of conditions that are compared against the client's HTTP request. Each condition is specified by three elements:

        -   input required: The input element typically specifies an HTTP header name, but request-url, remote-address, and refereer can also be used as special elements.
        -   operator: The operator element specifies one of the following values: ==, !=, %=, ^=, <, \>.

            |Operator|Condition|Example|
            |--------|---------|-------|
            |= =|This operator specifies an exact match. The input element must be equal to the comparison value.|From==jones@my.company.com or

provider\_1.filter=From==samluser@xyz.com

provider\_3.filter=applicationNames==DefaultApplication

|
            |%=|This operator specifies a partial match. The input contains the comparison value.|user-agent%=IE 6or

provider\_2.filter=request-url%=ivtlanding.jsp

|
            |^=|The input contains one of the comparison values.|request-url^=urlApp1\|urlApp2\|urlApp3|
            |!=|The input does not contain the comparison value.|request-url!=Snoop|
            |\>|The input is greater than the comparison value.|remote-address\>192.168.255.130|
            |<|The input is less than the comparison value.|remote-address<192.168.255.135|

        -   comparison value: This element typically specifies a string, but IP address ranges are also allowed.
        Conditions are evaluated from left to right, as specified by the comparison value. If all the filter conditions specified by an OAuth provider are met in an HTTP request, the OAuth provider is selected for the HTTP request. The input element identifies an HTTP request header field to extract from the request and its value is compared with the value specified in the filter property according to the operator specification. If the header field identified by the input element is not present in the HTTP request, the condition is treated as not being met. Any standard HTTP request header fields can be used as the input element in the filter condition. Refer to the HTTP specification for the list of valid headers.

        In addition to the standard HTTP header fields, the following special input elements can be used in the filter property:

        -   request-url: The comparison value of this input is compared against the URL address that is used by the client application to make the request.
        -   remote-address: The comparison value of this input is compared against the TCP/IP address of the client application that sent the HTTP request.
        -   referer: The comparison value of this input is compared against the referer in the request.
    2.  Add custom properties for the TAI filter for the connectionsProvider.

        Using \| to separate URLs, the following example uses the ^= operator to request urls for one of listed Connections applications:

        ```
        the request-url^=activities/oauth|blogs/oauth|dogear/oauth|communities/calendar/oauth|communities/service/atom/oauth|communities/recomm/oauth|connections/opensocial/oauth|files/oauth|forums/oauth|homepage/oauth|metrics/oauth|moderation/oauth|news/oauth|news/follow/oauth|profiles/oauth|wikis/oauth|search/oauth|/connections/core/oauth/|/dm/atom/oauth
        ```

    3.  After updating the TAI properties provider\_1.name and provider\_1.filter, restart the WebSphere Application Server.

4.  \(SPNEGO\) Add OAuth Protected API Endpoints to the ignore list.

    This SPNEGO criterion must be appended as one of the exclusive SPNEGO filters for a SPNEGO -related environment: request-url!=/oauth.

    |Component|OAuth API Endpoint|
    |---------|------------------|
    |Activities|/activities/oauth|
    |Blogs|/blogs/oauth|
    |Bookmarks|/dogear/oauth|
    |Calendar|/communities/calendar/oauth

|
    |Communities|/communities/oauth /communities/service/atom/oauth

/communities/service/html/oauth

|
    |Related Communities|/communities/recomm/oauth /communities/service/opensocial/oauth

|
    |CRE|/connections/opensocial/oauth /connections/core/oauth/

|
    |Files|/files/oauth|
    |Forums|/forums/oauth|
    |Homepage|/homepage/oauth|
    |Libraries|/dm/atom/oauth|
    |Microblogging|N/A \(Located in News and Common ear\)|
    |Metrics|/metrics/service/oauth|
    |Mobile|/mobile/oauth

 /mobileAdmin/oauth

 /connections/filesync/oauth

 /connections/filediff/oauth

|
    |Moderation|/moderation/oauth|
    |News|/news/oauth /news/follow/oauth

|
    |Profiles|/profiles/oauth|
    |Wikis|/wikis/oauth|
    |Surveys|/surveys-oauth|

    Refer to*Configuring SPNEGO on WebSphere Application Server*.


**Parent topic:**[Allowing third-party applications access to data via the OAuth2 protocol](../admin/c_admin_common_oauth.md)

**Related information**  


[Configuring SPNEGO \(and Kerberos optionally\) on WebSphere Application Server](../secure/t_install_kerb_add_spnego_tai_to_was.md)

