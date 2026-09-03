---
title: Configuring LDAP
tags:
    - LDAP
    - CEC (WebEngine)
    - Helm
    - Configuration
    - WebEngine
    - values.yaml
    - Overrides
    - Open Liberty
---
# Configuring LDAP

This section explains how to configure a Lightweight Directory Access Protocol (LDAP) registry for CEC (WebEngine). It covers integrating an LDAP server with the WebEngine container using Helm.

## LDAP configuration in `values.yaml`

Use the following sample to configure the CEC (WebEngine) server to use an LDAP server:

!!! note

    - Provide either `customLdapSecret` **or** `bindUser` and `bindPassword`. If both are set, the values from `customLdapSecret` take precedence.    
    - Helm `values.yaml` LDAP configuration may not support complex scenarios. For advanced setups, see [LDAP configuration using overrides](#ldap-configuration-using-overrides).

```yaml
configuration:
  webEngine:
    ldap: 
      host: "ldap.example.com"
      port: 389
      suffix: "dc=example,dc=com"
      serverType: "Custom"
      id: "ldap"
      type: "other"
      bindUser: "admin"
      bindPassword: "password"
      customLdapSecret: "customLdapSecret"
```

## LDAP configuration using overrides

If the default Helm `values.yaml` LDAP configuration does not meet your requirements, you can use `configOverrideFiles` for more control. This allows you to provide a comprehensive LDAP configuration for Open Liberty.

The following snippet shows how to configure LDAP for CEC (WebEngine):

```yaml
configuration:
  webEngine:
    configOverrideFiles:
      ldap-config.xml: |
        <server description="CEC (WebEngine) server">
          <ldapRegistry id="<<ldap_id>>" realm="SampleLdapIDSRealm"
            host="<<ldap_server>>"
            port="<<ldap_server_port>>" ignoreCase="true"
            baseDN="<<ldap_realm>>"
            ldapType="Custom"
            sslEnabled="false"
            bindDN="<<ldap_bind_user>>"
            bindPassword="<<ldap_bind_pass>>">
            <customFilters
              userFilter="(&amp;(uid=%v)(objectclass=inetOrgPerson))"
              groupFilter="(&amp;(cn=%v)(objectclass=groupOfUniqueNames))"
              userIdMap="*:uid"
              groupIdMap="*:cn"
              groupMemberIdMap="groupOfUniqueNames:uniqueMember">
            </customFilters>
            <ldapCache>
              <attributesCache size="4000" sizeLimit="4000" timeout="2400s" />
              <searchResultsCache resultsSizeLimit="4000" size="4000" timeout="2400s" />
            </ldapCache>
            <contextPool preferredSize="20"/>
          </ldapRegistry>
          <federatedRepository>
            <primaryRealm name="<<ldap_realm_name>>" allowOpIfRepoDown="true">
              <participatingBaseEntry name="o=defaultWIMFileBasedRealm"/>
              <participatingBaseEntry name="<<ldap_suffix>>" />
            </primaryRealm>
          </federatedRepository>
        </server>
```

Where:

- `<<ldap_realm_name>>` is the realm name that **must exactly match** the realm name configured in Connections (WebSphere Application Server) for Single Sign-On (SSO) to function correctly.

- `<<ldap_id>>` A unique identifier for the LDAP registry configuration.

- `<<ldap_server>>` The hostname or IP address of your LDAP server.

- `<<ldap_server_port>>` The port number on which your LDAP server is running.

- `<<ldap_realm>>` The base distinguished name (DN) for your LDAP directory (e.g., `dc=example,dc=com`).

- `<<ldap_bind_user>>` The distinguished name (DN) of the user account used to bind (authenticate) to the LDAP server.

- `<<ldap_bind_pass>>` The password for the bind user.

- `<<ldap_suffix>>` The LDAP suffix or base DN used for searching users and groups (for example, `dc=example,dc=com`).
