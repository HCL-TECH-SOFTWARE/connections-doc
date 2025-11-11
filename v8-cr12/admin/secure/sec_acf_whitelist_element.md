# Element and attribute rules \(whitelists\) {#sec_acf_whitelist_element .concept}

Whitelist active content for HCL Connections™ based on elements and attributes used in the HTML source.

The common elements rules specify which elements and attributes are allowed in the HTML source code of uploaded content. By default, elements and attributes are not allowed; you must explicitly whitelist them using these rules. Elements and attributes that are not whitelisted will be stripped from the content before it is uploaded.

`allowCommonInlineFormattingElements`
:   Allows the following commonly used elements: `<b>, <i>, <font>, <s>, <u>, <o>, <sup>, <sub>, <ins>, <del>, <strong>, <strike>, <tt>, <code>, <big>, <small>, <br>, <span>, <em>`

    Usage:

    ```bash
    <allowCommonInlineFormattingElements enabled='true' />
    ```

`allowCommonBlockElements`
:   Allows the following common block-type elements: `<p>, <div>, <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, <ul>, <ol>, <li>, <blockquote>`

    !!! note 
        
        Although some of the elements allowed in this rule can take attributes, the attributes are not allowed by default; you must specify which attributes to allow using other rules, such as allowAttributesGlobally.

    Usage:

    ```bash
    <allowCommonBlockElements enabled='true' />
    ```

`allowElements`
:   Allows only the specified elements.

    !!! note 
        
        Although some elements can take attributes, attributes are not included in this rule and are not allowed by default; you must specify which attributes to allow using other rules, such as allowAttributesGlobally.

    Usage:

    ```bash
    <allowElements>
            <element name="div"/>
            <element name="ruby"/>
    </allowElements> 
    ```

`disallowElements`
:   Disallows the specified elements while retaining the content. Elements are disallowed by default, so there is no need to specifically disallow elements with this rule unless you are making an exception to another rule that allows them.

    Usage:

    ```bash
    <disallowElements>
            <element name="div"/>
            <element name="ruby"/>
    </disallowElements>  
    ```

`allowAttributesGlobally`
:   Allows the specified attributes combined with any allowed elements. Use this rule with caution -- if you whitelist a particular attribute, it is automatically accepted on every allowed element. In particular, you should be careful using this rule on sensitive attributes such as `href` or `src`. It's best to only use this rule to allow attributes that are 100% safe.

    Usage:

    ```bash
    <allowAttributesGlobally>
            <elementAttribute name="height" />
            <elementAttribute name="width" />
            <elementAttribute name="label" />
    </allowAttributesGlobally>
    ```

`allowAttributesOnElements`
:   Allows the specified elements with the specified attributes. All of the listed attributes can be applied to all of the listed elements; in the following example, the `cite` and `datetime` attributes will be allowed with both the `<del>` and the `<ins>` elements. Since you specify the allowed elements here, there is no need to specify them with another rule.

    Usage:

    ```bash
    <allowAttributesOnElements>
            <element name="del" />
            <element name="ins" />
            <elementAttribute name="cite" />
            <elementAttribute name="datetime" />
    </allowAttributesOnElements>
    ```

`allowSpecificAttributesOnElements`
:   Allows the specified attribute on the specified element, provided the attribute's value matches one of the specified values. This rule is more restrictive than allowAttributesOnElements because it additionally filters the attribute's value. In the following example, the `<iframe>` element is allowed with the `sandbox` attribute, but only when the attribute uses the value `allow-popups` or `allow-scripts`. If the attribute value is not one of those specified, the attribute is removed but the element is left in place.

    In the following example, the sandbox attribute is allowed on `<iframe>` elements, but only when its value is either `allow-popups` or `allow-scripts`.

    Usage:

    ```bash
    <allowSpecificAttributesOnElements>
            <element name="iframe" />
            <elementAttribute name="sandbox" />
            <attributeValue value="allow-popups" />
            <attributeValue value="allow-scripts" />
    </allowSpecificAttributesOnElements>
    ```

`allowSpecificAttributeListOnElements`
:   Allows the specified element with the specified attribute, but only when the list of values for the attribute includes only the items specified by this rule, delimited using the character specified by this rule. Use this rule for attributes that accept lists instead of single values. If the list of values provided by the user includes extra items, the extra values will be stripped so that the list only includes allowed values. If none of the values in the list are allowed, the attribute will be stripped but the element will still be allowed. In the following example, the `<iframe>` element is allowed with the `sandbox` attribute, but the attribute can only use the following list of values: `allow-popups allow-scripts allow-same-origin` \(using a space as the delimiter\).

    Usage:

    ```bash
    <allowSpecificAttributeListOnElements>
            <element name="iframe" />
            <elementAttribute name="sandbox" />
            <attributeValue value="allow-popups" />
            <attributeValue value="allow-scripts" />
            <attributeValue value="allow-same-origin" />
            <delimiter value=" " />
    </allowSpecificAttributeListOnElements>
    ```

`allowSpecificAttributeListOnElements`
:   This rule is similar to allowSpecificAttributesOnElements except that it is used for attributes that can take lists of values, delimited by what's specified by the delimiter in the rule. If the user enters a list where some of the values have been allowed and others have not, the disallowed values in the list will be stripped. If the list consists entirely of disallowed values, then the attribute will be stripped, but the element will still be allowed.

    In the example below, you can use the attribute `rel` on the element `<link>` when it matches the following regular expression: `^((?!stylesheet).)*$` \(this expression will match any value that is not `stylesheet`\).

    The following example allows only the values `allow-popups`, `allow-scripts`, and `allow-same-origin` in a space-delimited list when the list is provided as the value of the `sandbox` attribute on the `<iframe>` element.

    Usage:

    ```bash
    <allowSpecificAttributeListOnElements>
            <element name="iframe" />
            <elementAttribute name="sandbox" />
            <attributeValue value="allow-popups" />
            <attributeValue value="allow-scripts" />
            <attributeValue value="allow-same-origin" />
            <delimiter value=" " /> 
    </allowSpecificAttributeListOnElements>
    ```

`allowSpecificAttributesOnElements_regex`
:   Allows the specified element with the specified attribute, but only when the value for the attribute can be matched by the specified regular expression. Using a regular expression with this rule enables you to whitelist a range of acceptable values without actually specifying a predefined list.

    In the example below, you can use the attribute `rel` on the element `<link>` when it matches the following regular expression: `^((?!stylesheet).)*$` \(this expression will match any value that is not `stylesheet`\).

    Usage:

    ```bash
    <allowSpecificAttributesOnElements_regex>
            <element name="link"/>
            <elementAttribute name="rel"/>
            <regexRule regex="^((?!stylesheet).)*$"/>
    </allowSpecificAttributesOnElements_regex>
    ```

`disallowWithoutAttributes`
:   Elements specified with this rule are allowed only if they include attributes. Elements are disallowed by default, so there is no need to specifically disallow elements with this rule unless you are making an exception to another rule that allows them. Use this rule to require an element to include an attribute even though it typically is accepted without one.

    Usage:

    ```bash
    <disallowWithoutAttributes>
            <element name="iframe"/>
    </disallowWithoutAttributes>  
    ```

`allowWithoutAttributes`
:   Elements specified with this rule are allowed even if they omit attributes. Use this rule to specifically allow an element that typically requires an attribute; for example, the `<a>` element \(which is normally accompanied by the `href=` attribute\).

    Usage:

    ```bash
    <allowWithoutAttributes>
            <element name="a"/>
    </allowWithoutAttributes> 
    ```

`disallowTextIn`
:   Elements specified with this rule will not be stripped; however, if a specified element contains text, that text will be stripped. This is because some elements contain text that is not intended for display to the user. Typically, elements with non-displaying text are styled using `display:none` in the browser's default style sheet, or they reference text that is stored as a separate file.

    Usage:

    ```bash
    <disallowTextIn>
            <element name="div"/>
    </disallowTextIn>
    ```

`allowTextIn`
:   Elements specified with this rule will be allowed if they contain text. Use this rule when you want to allow text within an element that does not typically include text as data. The HTML5 specification allows text content in any element that can contain character data, but text data is not allowed by default in elements that contain other types of content \(such as JavaScript in `<script>` elements\).

    Usage:

    ```bash
    <allowTextIn>
            <element name="script"/>
    </allowTextIn>
    ```

**Parent topic:** [Configuring active content filters \(whitelists\)](../secure/sec_acf_whitelist_config.md)

