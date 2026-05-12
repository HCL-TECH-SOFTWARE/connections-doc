# CRE Proxy Configuration {#r_cremashupsproxyconfiguration .reference}

For communication, the Common Rendering Engine \(CRE\) proxy leverages two proxy configuration files: the external proxy configuration proxy-opensocial-config.pl file and the internal proxy configuration proxy-opensocial-internal-config.tpl file.

## Purpose { .section}

-   The external proxy configuration, which is used to communicate between gadgets and external servers, is the proxy-opensocial-config.tpl file located in the LotusConnections-config directory. It is hidden by default and can be overridden by creating a proxy-opensocial-config.tpl file . The file can be customized to meet your needs. Also, by default this proxy sends all cookies passed to it via the browser, so if you want to limit that, you must create the proxy config file. For more information about the external proxy, refer to [Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md).
-   The internal proxy configuration is leveraged for internal server-to-server communication by Shindig/CRE. This file is *hidden* by default but can overridden by placing a `proxy-opensocial-internal-config.xml` file into the LotusConnections-config directory. Rarely, if ever, would you have to modify this file, but if setting changes are found to be needed during performance testing, these changes should be included into the default file.

## The external Proxy configuration: proxy-opensocial-config.tpl { .refsyn}

For the external proxy configuration, CRE has been extended to read the proxy-opensocial-config.tpl file. This file works with the extension of gadget-specific proxy constructs. These gadget specific constructs are ignored by the standard Connections proxy, but utilized by the CRE proxy. The companion file `proxy-config.dynamic` controls which of those endpoints the gadget is permitted to make outbound requests to, while the proxy-opensocial-config.tpl file controls the characteristics \(headers/cookies/and so on\) of your gadget's communication to that endpoint.

## Gadget-specific proxy constructs { .section}

managed-headers
:   Purpose: Provides a set of headers that will be specially rewritten and passed to the gadget. The proxy helps to ensure that these headers are as follows:

    Placement is as a peer of //policy/headers

    Content contains <managed-header\> element.  This element contains a text node that specifies the 'header' that is to be managed.

    For example:

    ```
     <proxy:actions>
     ...
     </proxy:actions>
     <proxy:headers />
     **<proxy:managed-headers\>
      <proxy:managed-header\>X-LConn-Auth</proxy:managed-header\>
     <proxy:managed-headers\>**
     ...
    <proxy:policy>
    ```

managed-cookies
:   Purpose: Provides a set of headers that will be specially rewritten and passed to the specific gadget. The cookie rewriting ensures that multiple gadgets loaded in the same domain do not overwrite cookie values for each other. The proxy then handles rewriting the cookie back to its original form.

:   Placement is as a peer of //policy/cookies

:   Content contains <managed-cookie\> element. This element contains a text node that specifies the 'cookie' that is to be managed.

:   For example:

    ```
    <proxy:policy ..>
     <proxy:actions>
     ...
     </proxy:actions>
     <proxy:headers />
     <proxy:managed-headers />
     <proxy:mime-types />
     <proxy:cookies />
    **<proxy:managed-cookies\>
      <proxy:managed-cookie\>DomAuthSessId</proxy:managed-cookie\>
     </proxy:managed-cookies\>**
     ...
    <proxy:policy>
    ```

## The Internal Proxy Config: proxy-opensocial-internal-config.tpl file { .section}

Typically you should not have to modify this file. For performance testing however, the ability to modify the file can be extremely useful if modifications need to be made. In order to override the default configuration, paste the following sample into a file called `proxy-opensocial-internal-config.tpl` in the LotusConnections-config directory. The following is a sample `proxy-opensocial-internal-config.tpl` file:

```
<?xml version="1.0" encoding="UTF-8"?>
<proxy:config id="proxy-opensocial-internal-config" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:proxy="http://www.ibm.com/xmlns/prod/sw/ajax/proxy-config/1.0">
        <proxy:proxy-rules>
          <proxy:mapping contextpath="/*" />
        
          <proxy:policy url="*" acf="none" basic-auth-support="true" auth-support="true">
            <proxy:actions>
              <proxy:method>GET</proxy:method>
              <proxy:method>POST</proxy:method>
              <proxy:method>PUT</proxy:method>
              <proxy:method>DELETE</proxy:method>
            </proxy:actions>
            <proxy:headers>
              <proxy:header>*</proxy:header>
              <proxy:header>Authorization</proxy:header>      
            </proxy:headers>
            <proxy:cookies>
              <proxy:cookie>DomAuthSessId</proxy:cookie>
              <proxy:cookie>LtpaToken</proxy:cookie>
              <proxy:cookie>LtpaToken2</proxy:cookie>
              <proxy:cookie>Shimmer</proxy:cookie>
              <proxy:cookie>ShimmerS</proxy:cookie>
              <proxy:cookie>JSESSIONID</proxy:cookie>
            </proxy:cookies>
          </proxy:policy>
          <proxy:meta-data>
            <proxy:name>socket-timeout</proxy:name>
            <proxy:value>30000</proxy:value>
          </proxy:meta-data>
          <proxy:meta-data>
            <proxy:name>connection-timeout</proxy:name>
            <proxy:value>30000</proxy:value>
          </proxy:meta-data>
          <proxy:meta-data>
            <proxy:name>retries</proxy:name>
            <proxy:value>2</proxy:value>
          </proxy:meta-data>
          <proxy:meta-data>
            <proxy:name>max-connections-per-host</proxy:name>
            <proxy:value>100</proxy:value>
          </proxy:meta-data>
          <proxy:meta-data>
            <proxy:name>max-total-connections</proxy:name>
            <proxy:value>200</proxy:value>
          </proxy:meta-data>
          <proxy:meta-data>
            <proxy:name>unsigned_ssl_certificate_support</proxy:name>
            <proxy:value>true</proxy:value>
          </proxy:meta-data>
        </proxy:proxy-rules>
</proxy:config
```

**Parent topic:**[Allowing third-party applications access to data via the OAuth2 protocol](../admin/c_admin_common_oauth.md)

**Related information**  


[Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md)

