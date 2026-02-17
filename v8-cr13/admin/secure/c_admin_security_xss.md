# Securing applications from malicious attack

HCL Connections™ provides security measures, such as an active content filter and content upload limits, that you can use to mitigate the risk of malicious attacks. Because these security measures can also limit the flexibility of the applications, you, as the system administrator, must evaluate the security of your network and determine whether or not you need to implement them.

Any software that displays user authored content can be vulnerable to cross-site scripting \(XSS\) attacks. Attackers can introduce JavaScript™ into their content that can, among other things, steal a user's session. Session stealing in a single sign-on \(SSO\) environment poses particular challenges because any vulnerability to XSS attacks can render the entire single sign-on domain vulnerable.

One of the ways that HCL Connections provides a defense against this type of attack is by implementing an active content filter. The active content filter whitelists content by blocking all content except that which meets the conditions specified by the filter. The whitelist mechanism was introduced in Connections V6.0 CR1. You can still use the legacy active content filtering mechanism to blacklist content, which was available through V6.0. In addition \(although it is not generally recommended\) you can turn off the active content filter altogether if you determine that your network is safe from the threat of malicious attacks.

## Considerations 

While securing Connections against malicious attacks mitigates the vulnerability to XSS attacks, it also limits what trusted users can do. For example, it removes the ability to add dynamic JavaScript content to a blog. Some areas to consider when deciding which security measures to implement are:

**Text-based fields**

When active content filtering is enabled, users cannot add certain types of content to text-based fields. The product ships with a set of active content filter configuration files which specify which types of content are allowed and which are not. The configuration files used by the product by default allow users to edit styles and add rich content to entries in each of the applications. They also allow users of the Blogs and Wikis applications to add flash content to entries. You can use the default filter settings or you can choose to apply other settings.

**File uploads**

Activities, Blogs, Files, Forums, and Wikis enable users to upload files, including Javascript and HTML. There is no way to guarantee that these files will not contain malicious code for cross-site scripting attacks, and the Active Content Filter is not used when downloading this content. To mitigate the effects of malicious code, you should configure Connections to download files using a separate domain. This forces the downloaded content to be executed in isolation, and prevents it from accessing data associated with an authenticated session.

**Custom templates**

Blogs supports the use of custom templates, which provide the ability for the blog owner to change the look of the blog. A custom template page is not filtered by the active content filter. Allowing custom template use introduces a XSS attack vulnerability.

-   **[Active content filters \(whitelists\)](../secure/sec_acf_whitelist_intro.md)**  
Starting with V6.0 CR1, HCL Connections provides an alternative mechanism \(whitelisting\) for active content filtering, which helps to ensure that content uploaded by users is safe.
-   **[Configuring legacy active content filters \(legacy ACF\)](../secure/sec_acf_legacy_config.md)**  
HCL Connections legacy active content filtering \(legacy ACF\) uses rules that allow you to block specific content \(a blacklist mechanism\). Although the new mechanism to whitelist allowed active content \(introduced in V6.0 CR1\) is considered to be more secure, you can still use the legacy mechanism to blacklist content.
-   **[Mitigating a cross site scripting attack](../secure/t_admin_common_secure_xss.md)**  
If you deem that your network is secure enough to turn off the active content filter, consider using one of the configuration options described in this topic to mitigate an attack should one occur.
-   **[Turning off active content filtering](../secure/t_admin_common_turn_off_filter.md)**  
Only turn off active content filtering if you have secured your network against cross-site scripting attacks by other means.

**Parent topic:** [Security](../secure/c_sec_overview.md)


