# Installing and enabling OAuth TAI {#t_inst_installingandenablingoauthtai .task}

You need to install and enable the OAuth TAI in HCL Connections.

## Install a supported version of IBM WebSphere Application Server
Before installing HCL Connections, ensure that you [install](../install/t_install_was.md) a [supported](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) version of IBM WebSphere Application Server.

## Export and import OAuth provider properties using AdminTask commands
Export customizable OAuth provider properties by using the `AdminTask.exportOAuthProps providerName fileName` and `AdminTask.importOAuthProps providerName fileName` commands.

   Additional properties can be configured, but they should not be customized unless required. The `authOnly` property is used to indicate whether a client request should fail if no OAuth token or authentication can be performed using other available authentication methods.

| Property | Default value | Description |
| --- | --- | --- |
| `oauthjdbc.CleanupInterval` | `3600` (1h) | Interval in seconds after which expired tokens are cleared from the database. This interval begins when the provider application starts. |
| `oauth20.max.authorization.grant.lifetime.seconds` | `15768000` (6mo) | Maximum lifetime of an authorization grant. This provides an upper limit for the lifetime of all tokens. |
| `oauth20.code.lifetime.seconds` | `60` (1m) | Lifetime of the authorization code. For security reasons, this value must not exceed a few minutes. |
| `oauth20.code.length` | `30` | Length of the authorization code (maximum value is `2048`). |
| `oauth20.token.lifetime.seconds` | `43200` (12h) | Lifetime of the access token. When it expires, the client must request a new access token by exchanging the refresh token. |
| `oauth20.access.token.length` | `40` | Length of the access token (maximum value is `2048`). |
| `oauth20.issue.refresh.token` | `true` | If set to `true`, clients receive a refresh token. If set to `false`, clients must request authorization when the access token expires. |
| `oauth20.refresh.token.length` | `50` | Length of the refresh token (maximum value is `2048`). |
| `oauth20.allow.public.clients` | `false` | *Future use.* If set to `true`, public clients are allowed. |
| `oauth20.authorization.form.template` | `{oauthSvcUrl}/authorize` | *Do not edit.* Authorization template URL. |
| `oauth20.authorization.error.template` | `{oauthSvcUrl}/error` | *Do not edit.* Error page template URL. |
| `oauth20.authorization.loginURL` | `{oauthSvcUrl}/authenticate` | *Do not edit.* Authentication URL. |

## Modify the TAI filter for Connections applications

The filter rules should be modified only when the context root for components is changed. The default rule is set by the Connections Installer.

1.  Using the WebSphere Application Server Integrated Solutions Console, navigate to **Security** > **Global Security** > **Web and SIP Security** > **Trust Association** > **Interceptors** > **com.ibm.ws.security.oauth20.tai.OAuthTAI**. The TAI filter property `provider_n.filter` is used to choose an OAuth service provider when a client invokes a protected web resource. The filter property specifies a set of conditions that are compared against the client's HTTP request. Each condition is defined by three elements:

    - **Input**: The input element typically specifies an HTTP header name, but `request-url`, `remote-address`, and `referer` can also be used as special elements.
    - **Operator**: The operator specifies one of the following values: `==`, `!=`, `%=`, `^=`, `<`, `>`. See [TAI Filter Operator Reference](#tai-filter-operator-reference) for details.

2. Add custom properties for the TAI filter for the `connectionsProvider`.

   Using `|` to separate multiple URL patterns, the following example uses the `^=` operator to match requests for one of the listed Connections applications:

```text
request-url^=activities/oauth|blogs/oauth|dogear/oauth|communities/calendar/oauth|communities/service/atom/oauth|communities/recomm/oauth|connections/opensocial/oauth|files/oauth|forums/oauth|homepage/oauth|metrics/oauth|moderation/oauth|news/oauth|news/follow/oauth|profiles/oauth|wikis/oauth|search/oauth|/connections/core/oauth/|/dm/atom/oauth
```
### TAI Filter Operator Reference

| Operator | Condition | Example |
|---|---|---|
| `==` | Specifies an exact match. The input element must be equal to the comparison value. | `From==jones@my.company.com` <br> `provider_1.filter=From==samluser@xyz.com` <br> `provider_3.filter=applicationNames==DefaultApplication` |
| `%=` | Specifies a partial match. The input contains the comparison value. | `user-agent%=IE 6` <br> `provider_2.filter=request-url%=ivtlanding.jsp` |
| `^=` | The input contains one of the comparison values. | `request-url^=urlApp1\|urlApp2\|urlApp3` |
| `!=` | The input does not contain the comparison value. | `request-url!=Snoop` |
| `>` | The input is greater than the comparison value. | `remote-address>192.168.255.130` |
| `<` | The input is less than the comparison value. | `remote-address<192.168.255.135` |

**Comparison value**: This element typically specifies a string, but IP address ranges are also allowed. Conditions are evaluated from left to right based on the comparison value. If all filter conditions specified by an OAuth provider are met in an HTTP request, that provider is selected for the request. The input element identifies an HTTP request header field, and its value is compared with the specified filter value according to the operator. If the header field is not present in the request, the condition is treated as not met. Any standard HTTP header fields can be used as input elements. Refer to the HTTP specification for valid headers.

  In addition to standard HTTP header fields, the following special input elements can be used in the filter property:

 - `request-url`: Compares the value against the URL used by the client application to make the request.
 - `remote-address`: Compares the value against the TCP/IP address of the client that sent the request.
 - `referer`: Compares the value against the HTTP referer header.


## Add OAuth protected API endpoints to the SPNEGO ignore list 

(SPNEGO) Add OAuth protected API endpoints to the ignore list. This SPNEGO criterion must be appended as one of the exclusive SPNEGO filters for a SPNEGO-related environment: `request-url!=/oauth`.

| Component | OAuth API Endpoint |
| --- | --- |
| Activities | `/activities/oauth` |
| Blogs | `/blogs/oauth` |
| Bookmarks | `/dogear/oauth` |
| Calendar | `/communities/calendar/oauth` |
| Communities | `/communities/oauth` <br> `/communities/service/atom/oauth` <br> `/communities/service/html/oauth` |
| Related Communities | `/communities/recomm/oauth` <br> `/communities/service/opensocial/oauth` |
| CRE | `/connections/opensocial/oauth` <br> `/connections/core/oauth/` |
| Files | `/files/oauth` |
| Forums | `/forums/oauth` |
| Homepage | `/homepage/oauth` |
| Libraries | `/dm/atom/oauth` |
| Microblogging | N/A (Located in News and Common EAR) |
| Metrics | `/metrics/service/oauth` |
| Mobile | `/mobile/oauth` <br> `/mobileAdmin/oauth` <br> `/connections/filesync/oauth` <br> `/connections/filediff/oauth` |
| Moderation | `/moderation/oauth` |
| News | `/news/oauth` <br> `/news/follow/oauth` |
| Profiles | `/profiles/oauth` |
| Wikis | `/wikis/oauth` |
| Surveys | `/surveys-oauth` |

Refer to *Configuring SPNEGO on WebSphere Application Server*.

**Parent topic:**[Allowing third-party applications access to data via the OAuth2 protocol](../admin/c_admin_common_oauth.md)

**Related information**  

[Configuring SPNEGO \(and Kerberos optionally\) on WebSphere Application Server](../secure/t_install_kerb_add_spnego_tai_to_was.md)
