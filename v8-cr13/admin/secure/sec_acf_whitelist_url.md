# URL protocol rules \(whitelists\) {#sec_acf_whitelist_url .concept}

Whitelist active content for HCL Connections™ based on the protocol specified within URLs.

The URL protocol rules specify which protocols are allowed within the HTML source code of uploaded content. URL protocols appear within a variety elements, such as:

-   The `href` attribute in `<a>` and `<area>` tags
-   The `src` attribute in `<iframe>, <img>, <audio>`, and `<video>` tags
-   The `cite` atttribute in `<q>` tags

Some URL protocols are disallowed by default; for example, the irc:// and telnet:// protocols are not allowed. Any URLs that contain disallowed protocols are stripped from the content before it is uploaded.

The following protocols are allowed by default: `http`, `https`, `mailto`, `ftp`, and `tel`.

The following rules can be used to tailor the allowed protocols to your needs; these rules can be used in conjunction with one another.

`allowStandardUrlProtocols`
:   Allows URLs containing any of the following \(default\) protocols:

    -   `http`
    -   `https`
    -   `mailto`
    -   `ftp`
    -   `tel`

    Usage:

    ```bash
    <allowStandardUrlProtocols enabled="true" />
    ```

    To allow a different set of URL protocols, apply the `allowUrlProtocols` rule instead.

`allowUrlProtocols`
:   Allows URLs containing only protocols that you specify with this rule. Use this rule when you only want to whitelist a small set of URL protocols. This rule can be used in conjunction with AllowStandardUrlProtocols.

    Usage

    ```bash
    <allowUrlProtocols>
    <protocol name="ftp" />
    <protocol name="tel" />
    <protocol name="notes" />
    <protocol name="file" />
    </allowUrlProtocols>
    ```

`disallowUrlProtocols`
:   Allows you to reverse an earlier "allow" rule.

    Usage:

    ```bash
    <disallowUrlProtocols>
            <protocol name="javascript" />
            <protocol name="vbscript" />
    </disallowUrlProtocols>
    ```

**Parent topic:** [Configuring active content filters \(whitelists\)](../secure/sec_acf_whitelist_config.md)

