# The customAuthenticator element for back-end inter-service communication {#thecustomauthenticatorelement .reference}

The customAuthenticator element in the LotusConnections-config.xml file defines some key parameters in your single sign-on \(SSO\) solution.

## Attributes { .section}

The configuration settings that you can specify in this XML element only affect back-end inter-service communication in an SSO environment.

The attributes for the customAuthenticator element can differ, depending on the SSO solution that you have implemented. Most attributes are optional, but some might be mandatory in the context of your SSO solution. For more information, see the relevant topics for your authentication solution.

## Default attributes { .section}

The following default attributes for the `customAuthenticator`element are available when the `customAuthenticator` attribute is set to `DefaultAuthenticator`, `ISAMAuthenticator`, or `SiteMinderAuthenticator`.

`customAuthenticator`
:   The `customAuthenticator` primary element has two attributes, name and classname. Either or both attributes must be set to an authenticator such as Default, ISAM, or SiteMinder. This attribute is mandatory.

`AllowSelfSignedCerts`
:   Optional. Should be set to false in the production environment. For security and legal reasons, self-signed certificates should only be used in test environments. The default value is true.

`CookieTimeout`
:   This value should match the value in your security proxy or the **LTPA timeout** value for forwarded credentials between servers specified in WebSphere® Application Server. When the ISVA authenticator is in use, this value should also match the ISVA inactive-timeout setting. The default value is 60 minutes.

`ConnectionTimeout`
:   This value determines the time period after which a connection is dropped. The default value is 30 seconds.

`SoTimeout`
:   This default socket value defines the length of time to wait for data. The default value is 60 seconds.

`MaxTotalConnections`
:   The value defines the maximum number of connections allowed overall. The default value is 256 connections.

`DefaultMaxConnectionsPerHost`
:   This value defines the maximum number of connections allowed per host. The default value is 128 connections.

## Additional attributes for Security Verify Access (formerly Security Access Manager) and SiteMinder { .section}

There are additional attributes available when the `customAuthenticator` attribute is set to `ISAMAuthenticator` or `SiteMinderAuthenticator`.

`CustomLoginUsernameField`
:   This attribute key should be implicitly set to user. If you customize the username field in the login form, this setting allows a new field name to be configured for entering the username.

`CustomLoginPasswordField`
:   This attribute key should be implicitly set to PASSWORD. If you customize the password field in the login form, this setting allows a new field name to be configured for entering the user password.

`CustomLoginFormField`
:   This attribute key should be implicitly set to Form. If you customize the login form field in the login form, this setting allows a new field name to be configured for posting login information to this customized form.

`CustomLoginFormValue`
:   This attribute key should be implicitly set to Login. If you customize the login value field in the login form, this setting allows a new value for login form to be configured for posting login information to this customized form.

`FormBasedAuthLoginURL`
:   This is a dedicated login URL for form based authentication.

This extract from the LotusConnections-config.xml file shows attributes with sample values:

```bash
<customAuthenticator name="TAMAuthenticator" >
   <attribute key="AllowSelfSignedCerts" value="true" />
   <attribute key="CookieTimeout" value="60" />
   <attribute key="ConnectionTimeout" value="30" />
   <attribute key="SoTimeout" value="60" />
   <attribute key="MaxTotalConnections" value="256" />
   <attribute key="DefaultMaxConnectionsPerHost" value="128" />
   <attribute key="CustomLoginUsernameField" value="username" />
   <attribute key="CustomLoginPasswordField" value="PASSWORD" />
   <attribute key="CustomLoginFormField" value="login-form-type" />
   <attribute key="CustomLoginFormValue" value="pwd" />
   <attribute key="FormBasedAuthLoginURL" value =
    "https://myHost.example.com:myPort/mypkmslogin.form/" />
</customAuthenticator>
```

**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)

