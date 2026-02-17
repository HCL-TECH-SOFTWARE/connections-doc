# CR4 notification template reference {#r_cr4_notification_template_reference .reference}

In Connections CR4 and later, the content of individual notifications is defined in templates that are processed by the FreeMarker engine. You can edit these templates directly in any text editor. The FreeMarker version currently used is 2.3.28.

This document serves as a companion reference to the resources and template structures that make up the CR4 notifications. It is intended to supplement a review of the template source files as well as the FreeMarker documentation.

## Before you begin { .section}

**Important:** Before making any customizations, first back up your original notifications folder. In addition, ensure that any customized files are backed up before performing a product upgrade or applying a cumulative refresh or fix pack, as you might need to merge your changes again manually after making updates.

## About this task { .section}

The notifications used in HCL Connections™ CR4 share common style and structure documents and are stored in the same location, allowing you to write your customizations once for all notifications, except for email digests. For information about customizing the daily and weekly email digests that are sent to users, see [Customizing email digests](t_customize_email_digests.md).

You can customize notifications in HCL Connections by updating the shared resources stored at this location:

app\_server\_root/profiles/dm\_profile\_root/config/cells/cell-name/LotusConnections-config/notifications\_v2/resources

|Resource|Description|
|--------|-----------|
|images|Folder containing all the shared images referenced in templates.|
|nls|Folder containing all localized strings shared between templates.|
|commonEEStructure.ftl|Template used for generating the Embedded Application MIME part.|
|commonHeader.ftl|Used in templates to import common .ftl files into scope. Uses acquisition look-up.|
|commonProperties.json|Configuration and basic style options; see [Customizing basic notification settings \(CR4 and later\)](t_customize_new_template.md).|
|commonStructure.ftl|Holds the main FreeMarker macros and functions that make up the individual notification components; for example, action, metadata, header, and footer.|
|commonStyle.ftl|Common inline CSS style definitions used in all individual notification templates.|
|commonStyleUtil.ftl|Style utility functions and common definitions.|
|commonUrlUtil.ftl|Specific utility functions for URL link handling. Contains the linkify function.|
|commonUtil.ftl|Provides a common set of utility functions.|

**Note on Freemarker acquisition:**

The template files that exist in the resources folder can also be stored in the notifications folders for specific applications. For example, if you want to customize Activities templates, you place commonStyle.ftl at the following location:

app\_server\_root/profiles/dm\_profile\_root/config/cells/cell-name/LotusConnections-config/notifications\_v2/activities/resources

Saving the style file in this location allows the Activities templates to pick up different styles that override the default shared ones. Acquisition look-up ensures that templates are imported to a directory that is local to the currently generated template. If the templates do not exist, the parent folders are scanned and the templates from the shared resources folder are loaded. Similarly, the images and nls resources can be stored in a directory that is local to an application folder. The notification framework ensures that local resources are checked and used first before checking the shared resources location.

## To customize a template { .section}

1.  Locate the FreeMarker template that corresponds to the notification that you want to customize. For more information about the notification types used in HCL Connections, see [Notification types and events](../admin/r_notification_types.md).

    Notification templates are stored in the following location:

    app\_server\_root/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications\_v2/

    where `app_server_root` is the WebSphere® Application Server installation directory and `dm_profile_root` is the Deployment Manager profile directory, typically dmgr01.

    You can find folders for each application in this location and a shared resources folder. Look for the FreeMarker template for the notification that you want to customize in the relevant application folder. When you find the template that you want to modify, open the .ftl file in a text editor.

2.  Make your customizations to the template as needed.

    **Note:** For information about editing the templates, refer to the FreeMarker documentation on the following web page:

    [http://freemarker.sourceforge.net/docs/index.html](http://freemarker.sourceforge.net/docs/index.html)

    The FreeMarker version currently used is 2.3.28.

    For CR4 notification template customization examples, see [Editing CR4 templates for single emails](r_example_edits_to_cr4_templates_for_single_emails.md).

    For CR4 notification digest template customization examples, see [Editing CR4 templates for email digests](r_example_edits_to_cr4_templates_for_email_digests.md).

3.  Save your changes and then close the file.
4.  Synchronize all the nodes using the Integrated Solutions Console.
5.  Stop and restart the News application.

## To customize notifications for a specific application { .section}

1.  Move the resource that you want to customize from the locationapp\_server\_root/profiles/dm\_profile\_root/config/cells/cell-name/LotusConnections-config/notifications\_v2/resources to the resources folder contained in the application-specific notifications folder. For example, notifications\_v2/activities/resources.
2.  Save your changes and then close the files.
3.  Synchronize all the nodes using the Integrated Solutions Console.
4.  Stop and restart the News application.

## Common header { .section}

The commonHeader.ftl file under shared resources includes common templates and provides more convenient variable alias names.

**Note:** FreeMarker file acquisition rules apply.

Included resources, with alias, are as follows:

|comStructure|commonStructure.ftl|
|comUtil|commonUtil.ftl|
|comUrlUtil|commonUrlUtil.ftl|
|comStyleUtil|commonStyleUtil.ftl|

## Notification styles { .section}

The notification templates utilize inline CSS styling to ensure maximum client coverage.

The styles are primarily defined in two files. The shared styles are defined in shared resources and digest-specific styles are defined in the news application subdirectory.

-   app\_server\_root/profiles/dm\_profile\_root/config/cells/cell-name/LotusConnections-config/notifications\_v2/resources/commonStyle.ftl
-   app\_server\_root/profiles/dm\_profile\_root/config/cells/cell-name/LotusConnections-config/notifications\_v2/news/newsStyle.ftl

These two files serve as a simple key value store. Although true CSS is not employed, selector strings are utilized as keys for convenience. The value strings contain the style definitions.

The commonStyleUtil \(comStyleUtil\) template provides the function "get" for retrieving style definition strings by selector key. This function also allows alternate style overrides in the case of digest \(news\) templates.

## Common structure template macros \(commonStructure.ftl\) { .section}

The notification documents are constructed in HTML from a set of functional content blocks using nested tables to provide structural layout.

The content blocks are generated using a set of shared FreeMarker template macros in commonStructure.ftl and also in newsUtil.ftl for digest notifications.

The following list identifies the common structure macros and the content or functionality they provide.

**Note:** The @ symbol identifies a call to another macro.

\#nested content is provided to a macro between its tags. See [https://freemarker.apache.org/docs/ref\_directive\_macro.html](http://freemarker.sourceforge.net/docs/index.html).

-   document macro
    -   document title
    -   document container table
    -   @masthead
    -   \#nested content
-   masthead macro
    -   organization / company logo
    -   organization / company name
-   noteItem macro
    -   notification container table
    -   @sidebar
    -   \#nested content
    -   @actions
-   sidebar macro
    -   sidebar container table
    -   sidebar image \(profile photo or stock activity icon\)
-   subject macro
    -   subject container table row
    -   \#nested content \(subject line\)

        **Note:** \#nested content is converted to text and long words are broken with word separator hints.

        -   See commonUtil.ftl convertHtmlStructuresToText function in this topic.
        -   See commonUtil.ftl breakLongWords function in this topic.
-   message macro
    -   @contentDivider row if content is present
    -   message container table row
    -   \#nested content \(message body\)

        **Note:** \#nested content is processed to discover plain-text URL strings and formatted to sanitize HTML structure, and long words are broken with word separator hints.

        -   See commonUtil.ftl discoverUrls function in this topic.
        -   See commonUtil.ftl formatHtmlContent function in this topic.
        -   See commonUtil.ftl breakLongWords function in this topic.
        The exception to this is in the case of pre-formatted content, such as community broadcast emails, enclosed in a span as below. These are retained as-is.

        ```
        <span class="html">pre-formatted content</span>
        ```

-   metadata macro
    -   @contentDivider row if content is present
    -   metadata container row and nested table
    -   key:value metadata

        **Note:**

        -   Keys are displayed as-is.
        -   Values are converted to text and long words are broken with word separator hints.
            -   See commonUtil.ftl convertHtmlStructuresToText function in this topic.
            -   See commonUtil.ftl breakLongWords function in this topic.
-   actions macro

    -   actions container table
    -   list of notification actions, as buttons or text links
    The macro accepts a list of pre-built anchor link strings or key:value pairs to build new links.

    -   key = label
    -   value = url
    Mobile links are added from arguments or generated from primary action, if allowed.

    **Note:** Action links can be generated using commonUrlUtil.ftl linkify functions.

-   linklist macro
    -   @contentDivider row if content is present
    -   container table
    -   list of files, with open and open in mobile actions
-   footer macro

    -   container row and nested table
    -   list of footer links
    The macro accepts a list of pre-built anchor link strings or key:value pairs to build new links.

    -   key = label
    -   value = url
    Appends unsubscribe link by default.

    **Note:** Footer links can be generated using commonUrlUtil.ftl linkify functions.

-   contentDivider
    -   simple empty row divider with enforced height

## Common utility functions \(commonUtil.ftl\) {#section_nps_ljh_qgb .section}

-   transformHtmlToPlainText

    HTML conversion to text is used primarily for text mimetype output.

    Operations are performed as ordered.

    -   Remove all tab characters, template artifacts if trimming not utilized
    -   Remove all line breaks, template artifacts if trimming not utilized
    -   Replace all <br\>, <p\>, and </p\> tags with the system line.separator string
    -   Convert links to text representations, anchor text followed by URL
    -   Remove all </td\>, </li\>, and </dt\> tags
    -   Remove leading whitespace per line
    -   Unescape HTML entities
-   convertHtmlStructuresToText

    HTML conversion to text is used for text only fields in HTML mimetype output.

    Has special handling for bi-directional text settings.

    Operations are performed in the following order.

    -   Remove all tab characters, template artifacts if trimming not utilized
    -   Remove all line breaks, template artifacts if trimming not utilized
    -   Convert line breaking html tags into new line. Replace all <br\>, </br\>, <p\>, </p\>, <div\>, </div\> tags with the system line.separator string.
    -   Replace structure tags that require space so words do not get joined together. Replace all <td\>, </td\>, <li\>, </li\> tags with the system line.separator string.
    -   Remove remaining HTML tags, content preserved. Removes all tags except spans that are processed to retain bi-directional formatting.
    -   Removes span tags and escapes everything not related to bidi direction settings. Spans containing bi-directional settings as specified below are retained.

        ```
        <span dir='ltr' style='display: inline-block;'>
        ```

        Text is processed with HTML unescape twice prior to HTML escape to ensure upstream entities are properly encoded.

-   formatHtmlContent

    Ensure HTML structure will not break notification layout and style.

    Anchor links are classified by class and/or content into six groups.

    -   profile, links to user profile pages, usually as @mentions
    -   functional, links to system actions
    -   hashtag, generated from \#tags
    -   discovered, auto-discovered non-anchor URL string with valid protocol prefix; converted to live anchor link to maintain control over link formatting
    -   discovered-nolink, auto-discovered non-anchor URL-like string without valid protocol prefix; converted to anchor link without href to ensure proper handling of long words that might be URLs
    -   user, all other links entered by the user into input fields
    Link formatting argument
    :   The link formatting by class is specified as follows. See LinkFormatArgs in commonStyleUtil for example.

        CLASS is one of the six groups defined above.

        The 'method' determines if the link is retained or converted to text \(anchor text or href URL\).

        ```
        {
            CLASS: {
                'method': 'pass' | 'text' | 'url'
                'style': inline style definition obtained by call to commonStyleUtil.get
            }, ...
        }
        ```

    Operations are performed in the following order.

    -   Remove all tab characters, template artifacts if trimming not utilized
    -   Remove all line breaks, template artifacts if trimming not utilized
    -   Sanitize <p\> and <div\> structural elements by removing attributes \(id, class, style, and so on\)
    -   Replace tags that require space so words do not get joined together. Remove all </td\>, </li\>, and </dt\> tags.
    -   Remove all remaining un-sanitized HTML tags. Retain <p\>, </p\>, <div\>, </div\>, <a\>, </a\>, <br\>, and </br\>.
    -   Anchor links are formatted according to six defined classes. Each of the six defined classes of links can be styled independently, left as live links, or converted to a text representation of the URL or the anchor content.
-   discoverUrls

    Looks for URL-like strings that are not already contained in a live anchor link.

    URL-like strings are defined as any contiguous string containing two or more periods.

    Generated anchor links are classed as follows:

    -   discovered, string looks like a URL with valid protocol \(http://, https://, and so on\)
    -   discovered-nolink, string may be a URL but lacks protocol
    **Note:** This function was created to ensure that any strings that might be auto-discovered by an email client are already safely enclosed in a valid HTML anchor. This allows more complete control to be maintained over the styling of the notification.

-   truncateHtmlContent

    Safely truncate an HTML string based on visible \(rendered\) length.

    Break on nearest word boundary.

    Links are retained or omitted in whole.

    Suffix truncated text with horizontal ellipsis entity.

-   breakLongWords

    Add word break hints to long words to enable more predictable and safer line spanning.

    Any contiguous string of 21 characters or more that will not naturally span lines will be broken into chunks of 7 characters. The chunks will be joined with one of the following two word break hints.

    -   &shy; soft-hyphen for normal text
    -   &\#8203; zero-width space for non-href URL-like strings
    The discoverUrls function was implemented with this function in mind to ensure that all URL-like strings are properly enclosed in anchor tags prior to adding word break hints.


## Digest structure template macros \(newsUtil.ftl\) {#section_v3t_yqh_qgb .section}

The notification documents are constructed in HTML from a set of functional content blocks using nested tables to provide structural layout.

The content blocks are generated using a set of shared FreeMarker template macros in commonStructure.ftl and also in newsUtil.ftl for digest notifications.

The following list identifies the digest specific structure macros and the content or functionality they provide.

**Note:**

The @ symbol identifies a call to another macro. \#nested content is provided to a macro between its tags; see [https://freemarker.apache.org/docs/ref\_directive\_macro.html](https://freemarker.apache.org/docs/ref_directive_macro.html).

-   headline macro

    Display a headline message for digest notifications.

    -   headline container row and nested tables
    -   headline message as defined by the "INTRODUCTION" resource string. See "To edit the text strings used in the notifications" in [Customizing shared resources for notifications \(default templates\)](t_customize_notification_resources.md).
    -   @contentDivider row
-   digestActions macro

    -   @contentDivider row if content present
    -   actions container row
    -   @actions; see commonStructure actions macro
    Digest actions displayed as list of text links instead of styled buttons.

-   digestViewAllUpdates macro

    Generate a link to view all notification updates in the web client when the digest contains more items than the defined limit.

    **Note:** See "activityMax" in commonProperties.json.

    -   @contentDivider row
    -   container row and table
    -   link to view all notifications
-   digestByOrder macro

    Driver macro to iterate notifications \(by date\) and call @digestItem

-   digestItem macro
    -   content container row and table
    -   @sidebar, conditionally show profile image or stock activity icon
    -   \#nested content

**Parent topic:**[Editing notification templates](../customize/t_edit_notification_templates_container.md)

