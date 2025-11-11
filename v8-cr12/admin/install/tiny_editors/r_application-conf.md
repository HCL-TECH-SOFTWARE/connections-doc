# List of valid `application.conf` settings {#application-conf-settings-list .reference}

The table below lists the valid settings for the Tiny Editors `application.conf`.

| Category         | Setting                                      | Description (see examples below)                               |
|------------------|----------------------------------------------|----------------------------------------------------------------|
| CORS             | `ephox.allowed-origins.origins`              | Domains allowed to communicate with server-side editor services. See example A. |
| CORS             | `ephox.allowed-origins.ignore-port`          | Control port checking for CORS (true/false). See example B.     |
| Link-checking    | `ephox.link-checking.enabled`                | Enable/disable the link checking service. See example C.        |
| Link-checking    | `ephox.link-checking.cache.capacity`         | Max cached links. See example D.                                |
| Link-checking    | `ephox.link-checking.cache.timeToLiveInSeconds` | Max time (seconds) a link may remain in cache. See example D. |
| Link-checking    | `ephox.link-checking.cache.timeToIdleInSeconds` | Max idle time (seconds) since last request. See example D.   |
| Media-embed      | `ephox.embed.enabled`                        | Enable/disable Enhanced Media Embed. See example E.             |
| Media-embed      | `ephox.embed.custom`                         | Custom oEmbed providers list. See example F.                    |
| Spell-checking   | `ephox.spelling.custom-dictionaries-path`    | Path to custom dictionary files. See example G.                 |
| Spell-checking   | `ephox.spelling.hunspell-dictionaries-path`  | Path to Hunspell dictionaries. See example H.                   |
| Spell-checking   | `ephox.spelling.dynamic-custom-dictionaries` | Allow live updates of custom dictionaries (true/false). See example I. |
| HTTP             | `ephox.http.max-redirects`                   | Max number of redirects for link checks. See example J.         |
| HTTP             | `ephox.http.request-timeout-seconds`         | HTTP request timeout in seconds. See example J.                 |
| Proxy            | `ephox.proxy.http.proxyHost`                 | HTTP proxy host. See example K.                                 |
| Proxy            | `ephox.proxy.http.proxyPort`                 | HTTP proxy port. See example K.                                 |
| Proxy            | `ephox.proxy.https.proxyHost`                | HTTPS proxy host. See example K.                                |
| Proxy            | `ephox.proxy.https.proxyPort`                | HTTPS proxy port. See example K.                                |
| Proxy            | `ephox.proxy.http.nonProxyHosts`             | Hosts excluded from proxying (pipe-separated). See example K.   |
| Proxy            | `ephox.proxy.http.proxyUser`                 | Proxy authentication user. See example K.                       |
| Proxy            | `ephox.proxy.http.proxyPassword`             | Proxy authentication password. See example K.                   |
| Security         | `ephox.http.websphere.use-ssl-config`        | Use WebSphere SSL config (true/false). See example L.           |
| Security         | `ephox.http.websphere.ssl-config-name`       | WebSphere SSL config name. See example L.                       |
| Security         | `ephox.http.trust-all-cert`                  | Bypass SSL cert validation (CAUTION). See example L.            |


### Examples and sample snippets

#### Example A — Allowed origins

```hcl
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

#### Example B — Ignore port for CORS
```hcl
ephox {
  allowed-origins {
    ignore-port = false
  }
}
```

#### Example C — Link checking enabled
```hcl
ephox {
  link-checking.enabled = false
}
```

#### Example D — Link checking cache
```hcl
ephox {
  link-checking.cache {
    capacity = 500
    timeToLiveInSeconds = 86400
    timeToIdleInSeconds = 3600
  }
}
```

#### Example E — Media embed enabled
```hcl
ephox {
  embed.enabled = false
}
```

#### Example F — Custom oEmbed providers
```hcl
ephox {
  embed.custom = [
    {
      endpoint = "http://www.youtube.com/oembed"
      schemes = [
        "http://youtu.be/*",
        "https://youtu.be/*"
      ]
    },
    {
      endpoint = "http://www.hulu.com/api/oembed.json",
      schemes = [
        "http://www.hulu.com/watch/*",
        "https://www.hulu.com/watch/*"
      ]
    }
  ]
}
```

#### Example G — Custom dictionaries path
```hcl
ephox {
  spelling {
    custom-dictionaries-path = "/opt/ephox/spelling/dictionary"
  }
}
```

#### Example H — Hunspell dictionaries path
```hcl
ephox {
  spelling {
    hunspell-dictionaries-path = "/opt/ephox/spelling/hunspell"
  }
}
```

#### Example I — Dynamic custom dictionaries
```hcl
ephox {
  spelling {
    dynamic-custom-dictionaries = true
  }
}
```

#### Example J — HTTP settings
```hcl
ephox {
  http {
    max-redirects = 2
    request-timeout-seconds = 5
  }
}
```

#### Example K — Proxy settings
```hcl
ephox {
  proxy {
    http.proxyHost = "someproxy.example.com"
    http.proxyPort = 8080
    https.proxyHost = "someproxy.example.com"
    https.proxyPort = 8443
    http.nonProxyHosts = "localhost|*.example.com"
    http.proxyUser = "admin"
    http.proxyPassword = "hunter2"
  }
}
```

#### Example L — WebSphere SSL and trust
```hcl
ephox {
  http {
    websphere {
      use-ssl-config = true
      ssl-config-name = "TinyServicesSSLSettings"
    }
    trust-all-cert = true   # CAUTION: allows MITM attacks
  }
}
```

**Parent topic:** [Common tasks, concepts and reference information](r_appendix.md)

**Related information**  


[Tiny Editor Services configuration](c_application-conf.md)

[Configuring the application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_00-summary.md)

[Create an application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_01-create-an-application-conf.md)

[Disable SSL certificate validation for testing](t_disable-certificate-validation-for-testing.md)

