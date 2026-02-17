# Active content filters \(whitelists\) {#sec_acf_whitelist_intro .concept}

Starting with V6.0 CR1, HCL Connections™ provides an alternative mechanism \(whitelisting\) for active content filtering, which helps to ensure that content uploaded by users is safe.

By default, the active content filter for most applications will use the new whitelist mechanism, which employs a detailed set of rules that specify what active content users can contribute when creating or editing Connections content; for example, when editing a wiki page, a community description or a forum topic. Unlike blacklisting, which uses a ruleset that specifies what active content is not allowed, whitelisting uses rules to specify explicitly what active content is allowed. The whitelist active content filter removes only the offending content, leaving the rest of the document intact.

!!! note 
    
    Connections continues to support the earlier version of active content filtering that blacklisted content. You can switch back to blacklisting on a per-component basis by specifying a different configuration as described in [Configuring legacy active content filters \(blacklists\)](sec_acf_legacy_config.md).

-   **[Configuring active content filters \(whitelists\)](../secure/sec_acf_whitelist_config.md)**  
HCL Connections provides a set of active content filter \(ACF\) configuration files that you can apply to component applications to allow users to contribute only accepted types of content.

**Parent topic:** [Securing applications from malicious attack](../secure/c_admin_security_xss.md)

