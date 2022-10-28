# List of valid `application.conf` settings {#application-conf-settings-list .reference}

A list of valid settings for the Tiny Editors `application.conf`.

|Category|Setting|Description|
|--------|-------|-----------|
|CORS|`ephox.​allowed-origins.​origins`|A list of strings defining the domains allowed to communicate with the server-side editor features. **Attention:** This setting must be configured correctly or the editor will not be able to communicate with the services.

 ```
ephox {
  allowed-origins {
    origins = [
      "http://connections.example.com:9081",
      "https://connections.example.com:9444",
      "http://connections.example.com",
      "https://connections.example.com"
    ]
  }
}
```

|
|CORS|`ephox.​allowed-origins.​ignore-port`|This can be used to force port checking for CORS. By default any port is allowed. ```
ephox {
  allowed-origins {
    ignore-port = false
  }
}
```

|
|Link-checking|`ephox.​link-checking.​enabled`|This enables or disables the link checking service. ```
ephox {
  link-checking.enabled = false
}
```

|
|Link-checking|`ephox.​link-checking.​cache.​capacity`|The maximum number of links stored in the cache at any one time. ```
ephox {
  link-checking.cache {
    capacity = 500
  }
}
```

|
|Link-checking|`ephox.​link-checking.​cache.​timeToLiveInSeconds`|The maximum time in seconds that a link is allowed to remain in the cache. ```
ephox {
  link-checking.cache {
    timeToLiveInSeconds = 86400
  }
}
```

|
|Link-checking|`ephox.​link-checking.​cache.​timeToIdleInSeconds`|The maximum time in seconds that a link will remain in the cache since it was last requested. ```
ephox {
  link-checking.cache {
    timeToIdleInSeconds = 3600
  }
}
```

|
|Media-embed|`ephox.​embed.​enabled`|This enables or disables the Enhanced Media Embed Service. ```
ephox {
  embed.enabled = false
}
```

|
|Media-embed|`ephox.​embed.​custom`|A list of oEmbed providers. Each provider entry has the following:`endpoint`
:   A URL where oEmbed requests are sent.

`schemes`
:   A list of URL patterns which the oEmbed provider supports.

 ```
ephox {
  embed.custom =[
    {
      endpoint = "http://www.youtube.com/oembed"
      schemes = [
        "http://youtu.be/*",
        "https://youtu.be/*"
      ]
    },{
      endpoint = "http://www.hulu.com/api/oembed.json",
      schemes = [
        "http://www.hulu.com/watch/*",
        "https://www.hulu.com/watch/*"
      ]
    }
  ]
}
```

 View the [Sample application.conf](r_application-conf-samples.md) for a more complete example.|
|Spell-checking|`ephox.​spelling.​custom-dictionaries-path`|Specify the path to custom dictionaries. A custom dictionary file must be a simple text file: -   named with the language code in the filename like `en.txt` or `en_gb.txt`,
-   one word on each line,
-   either Windows-style or Linux-style line endings \(CR or CR+LF\)
-   no comments or blank lines, and
-   saved in UTF-8 encoding, with or without BOM \(byte-order mark\).

 ```
ephox {
  spelling {
    custom-dictionaries-path = "/opt/ephox/spelling/dictionary"
  }
}
```

|
|Spell-checking|`ephox.​spelling.​hunspell-dictionaries-path`|Specify the path to hunspell dictionaries. Tiny provides two bundles of dictionaries that can be downloaded: -   [Dictionaries with permissive licences \(excluding GPL or LGPL\)](https://download.tiny.cloud/hunspell/latest/hunspell-dictionaries-approved.zip)
-   [All dictionaries \(including GPL or LGPL\)](https://download.tiny.cloud/hunspell/latest/hunspell-dictionaries-all.zip)

 These bundles should be extracted into the folder specified by the `hunspell-dictionaries-path`. **Tip:** When a hunspell dictionary is provided for a language it will be used instead of the built-in Wintertree dictionary.

 ```
ephox {
  spelling {
    hunspell-dictionaries-path = "/opt/ephox/spelling/hunspell"
  }
}
```

|
|Spell-checking|`ephox.​spelling.​dynamic-custom-dictionaries`|When enabled custom dictionaries can be updated live. ```
ephox {
  spelling {
    dynamic-custom-dictionaries = true
  }
}
```

|
|HTTP|`ephox.​http.​max-redirects`|The maximum number of redirects that will be followed to check a link or retrieve details from that resource. ```
ephox {
  http {
    max-redirects = 2
  }
}
```

|
|HTTP|`ephox.​http.​request-timeout-seconds`|The number of seconds to allow HTTP requests to take. ```
ephox {
  http {
    request-timeout-seconds = 5
  }
}
```

|
|Proxy|`ephox.​proxy.​http.​proxyHost`|A string defining the host name of the proxy for HTTP \(unsecured\) connections. ```
ephox {
  proxy {
    http.proxyHost = "someproxy.example.com"
  }
}
```

|
|Proxy|`ephox.​proxy.​http.​proxyPort`|An integer defining the port number of the proxy for HTTP \(unsecured\) connections. ```
ephox {
  proxy {
    http.proxyPort = 8080
  }
}
```

|
|Proxy|`ephox.​proxy.​https.​proxyHost`|A string defining the host name of the proxy for HTTPS connections. ```
ephox {
  proxy {
    https.proxyHost = "someproxy.example.com"
  }
}
```

|
|Proxy|`ephox.​proxy.​https.​proxyPort`|An integer defining the port number of the proxy for HTTPS connections. ```
ephox {
  proxy {
    https.proxyPort = 8443
  }
}
```

|
|Proxy|`ephox.​proxy.​http.​nonProxyHosts`|A list of strings separated by vertical lines \("\|"\) listing hosts and domains to be excluded from proxying, for both plain HTTP and HTTPS connections. The strings can contain asterisks \("\*"\) as wild cards. Defaults to "localhost\|127.\*\|\[::1\]" if not set. ```
ephox {
  proxy {
    http.nonProxyHosts = "localhost|*.example.com"
  }
}
```

|
|Proxy|`ephox.​proxy.​http.​proxyUser`|User name for authenticating to both the HTTP and HTTPS proxy. ```
ephox {
  proxy {
    http.proxyUser = "admin"
  }
}
```

|
|Proxy|`ephox.​proxy.​http.​proxyPassword`|Password for authenticating to both the HTTP and HTTPS proxy. ```
ephox {
  proxy {
    http.proxyPassword = "hunter2"
  }
}
```

|
|Security|`ephox.​http.​websphere.​use-ssl-config`|Use a SSL configuration provided by WebSphere instead of the default JVM configuration. ```
ephox {
  http {
    websphere {
      use-ssl-config = true
    }
  }
}
```

|
|Security|`ephox.​http.​websphere.​ssl-config-name`|Choose which SSL configuration on WebSphere should be used. ```
ephox {
  http {
    websphere {
      ssl-config-name = "TinyServicesSSLSettings"
    }
  }
}
```

|
|Security|`ephox.​http.​trust-all-cert`|Bypass SSL security and indiscriminately trust all SSL certificates. CAUTION:

Bypassing SSL security allows [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

 ```
ephox {
  http {
    trust-all-cert = true
  }
}
```

|

**Parent topic:**[Common tasks, concepts and reference information](../../install/tiny_editors/r_appendix.md)

**Related information**  


[Tiny Editor Services configuration](../../install/tiny_editors/c_application-conf.md)

[Configuring the application.conf for the Tiny Editors Services](../../install/tiny_editors/t_01-setup_02-services_01-appconf_00-summary.md)

[../../install/tiny\_editors/t\_01-setup\_02-services\_01-appconf\_01-create-an-application-conf-1.md](../../install/tiny_editors/t_01-setup_02-services_01-appconf_01-create-an-application-conf-1.md)

[Disable SSL certificate validation for testing](../../install/tiny_editors/t_disable-certificate-validation-for-testing.md)

