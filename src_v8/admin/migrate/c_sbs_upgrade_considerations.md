# Considerations for a side-by-side upgrade {#c_sbs_upgrade_considerations .concept}

Upgrading side-by-side from Connections 6.5 CR1 to 7 consists of installing Connections 7.0 and its supporting software on new systems, and then and migrating data and customizations to the new environment.

**Note:** This documentation provides these guidelines to aid successful upgrades using the side-by-side approach. While this approach was not the primary focus of upgrade testing, it is often used on customer sites in cooperation with HCL Digital Solutions Services, and has particular advantages when upgrading from Connections versions earlier than 6.5. For a tutorial on this approach by Digital Solutions technical advisor, see [Upgrading from Connections 6.5 to 7: Side by Side](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0093267).

## WebSphere security {#section_pwn_kbv_pqb .section}

In case you plan to make significant changes between your Connections 6.5 CR1 and Connections 7.0 security configuration, consider the following dependencies:

-   Single sign-on is a domain-based mechanism in WebSphere and Connections, so keep the domain if possible.
-   Changes in host name might have an impact on the data that gets migrated from 6.5 CR1. In case content like Wikis contains absolute URLs, you might need to adjust those pointers. Depending on the amount of data, you can do that either manually or use tools like the Connections Extensions Toolkit \(CXT\).
-   Changes in LDAP configuration impact both authentication and application access. While authentication is done based on the WebSphere configuration, the Profiles database is the entry point for the Connections-internal access management. As an example, if you change the LDAP and persisted the previous LDAP URL via SDI assembly line in Connections 6.5 CR1, this will most likely result in duplicate user entries in Connections. In that case, you will have to map and merge the old and new user entries afterwards, for example using wsadmin.
-   During installation of bootstrap with Component Pack, you will provide credentials for the Kubernetes-based services. Some of these settings will be also used to secure Connections applications. As an example, the SSL configuration and keystores for Metrics and Elasticsearch make use these secrets. Usually, this is not an issue, as you have to re-configure these parts anyway as part of the Connections 7 installation.
-   If you have deployed the Invite feature of Connections, modify the Invite configuration according to any LDAP configuration changes.

## Connections configuration changes {#section_e1t_kcv_pqb .section}

In the side-by-side approach, all the configurations for the newly installed v7 Connections are the default 7.0 settings. After testing this new system, you must manually apply any configuration changes that you made in 6.5 CR1 to the 7.0 platform. These are file-related settings such as round-trip editing, quotas, proxy configuration, and so on that are stored in XML and other data formats.

Again, there are no tools to assist in migrating the configuration files from your existing 6.5 CR1 configuration to the 7.0 platform. This transition requires you to handle configuration changes the same way as other customizations: ideally, by referring to the deployment's change records that documented your modifications.

The process is similar to that for the changes in IBM Security Directory Integrator assembly lines from release to release, or from Connections CFix to CFix. You either know what you modified and can apply this to the upgraded environment, or you use diff-based tooling to identify and make the changes.

## Other Connections customizations {#section_pdr_flt_qqb .section}

You must also redo your created widgets and customizations from 6.5 CR1 in the new system, most of which should run without modification in Connections 7. Regarding customizations, this statement is true for the 6.5 feature set, both for features modified by “legacy” customizations on JSPs and theme elements like CSS, and for those modified “on the fly” by Connections Customizer. With the side-by-side approach, you finish and test the Connections 7 installation without any customizations and apply these changes after validating that default system.

**Tip:** For a list of customizations \(including configurations\) that you must manually migrate to the new environment in a side-by-side upgrade, see [Saving your customizations](c_configuration_changes_after_update.md).

Connections 7 comes with additional capabilities and UI elements, like Community Templates \(if you also deploy Component Pack 7\). These modules need to get aligned with your customizations, so testing and enhancing the customizations according to the deployed Connections 7 feature set is highly recommended. New features can be enabled step by step, so there is usually no need for a full and time-critical redesign all at once.

## Related Information {#section_ztc_xyd_sqb .section}

To learn about other approaches to upgrading, see [Considerations for an in-place or hybrid upgrade](c_inplace_upgrade_considerations.md).

**Parent topic:**[Side-by-side upgrades](../migrate/c_sbs_upgrade_container.md)

