# Styling rules \(whitelists\) {#sec_acf_whitelist_styling .concept}

Whitelist active content for HCL Connections™ based on style-sheet usage in the HTML source.

The styling rules specify whether CSS styles are allowed in the HTML source code of uploaded content. By default, CSS style sheets are not allowed; you must explicitly whitelist them using these rules. Styles that are not allowed will be stripped from the content before it is uploaded.

`allowStylingDefault`
:   Convert `style="<CSS>"` to sanitized CSS, which allows color, font-size, type-face, and other styling using the default schema.

    Usage:

    ```bash
    <allowStylingDefault enabled='true'/>
    ```

    You can specify additional style information, as in the following example:

    ```bash
    <allowStyling> <==
    <param value="position" />
    <param value="top" />
    <param value="z-index" />
    </allowStyling>
    ```

**Parent topic:** [Configuring active content filters \(whitelists\)](../secure/sec_acf_whitelist_config.md)

