# Editing CR4 templates for email digests {#example__edits_to_cr4_templates_for_email_digests .reference}

HCL Connections™ CR4 offers new ways to customize the email message that is sent to users as part of the daily and weekly email digests.

## Before you begin { .section}

**Important:** Before making any customizations, first back up your original notifications folder. In addition, ensure that any customized files are backed up before performing a product upgrade or applying a cumulative refresh or fix pack, as you might need to merge your changes again manually after making updates.

## To customize a template {#section_tk4_h3j_qgb .section}

All customization illustrated in this document assumes that the templates are updated by the following procedure.

1.  Locate the FreeMarker template that corresponds to the notification that you want to customize. For more information about the notification types used in HCL Connections, see Notification types.

    Notification templates are stored in the following location:

    app\_server\_root/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications\_v2/

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You can find folders for each application in this location and a shared resources folder. Look for the FreeMarker template for the notification that you want to customize in the relevant application folder. When you find the template that you want to modify, open the .ftl file in a text editor.

2.  Make your customizations to the template as needed.

    **Note:**

    -   See [CR4 notification template reference](r_cr4_notification_template_reference.md).
    -   See [Customizing shared resources for notifications \(CR4 templates\)](t_cr4_customize_shared_resources_for_notifications.md).
    For information about editing the templates, refer to the FreeMarker documentation on the following web page:

    [http://freemarker.sourceforge.net/docs/index.html](http://freemarker.sourceforge.net/docs/index.html)

    The FreeMarker version currently used is 2.3.28.

3.  Save your changes and then close the file.
4.  Synchronize all the nodes using the Integrated Solutions Console.
5.  Stop and restart the News application.

## Changing the title of a notification {#section_yfj_fjj_qgb .section}

In both the daily and weekly digest templates, the title of the document is defined in the localized resource strings and passed to the document macro as a parameter along with the relevant substitution values.

```
<@comStructure.document comUtil.resource(TITLE_ENTRY, VALUES)>
```

The resource strings can be identified by the call to comUtil.resource\(\) requesting a formatted string from the news resources.

app\_server\_root/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications\_v2/news/resources/nls

For the daily digest \(dailyDigest.flt\), the title is defined by the 'NEWSLETTER\_TITLE\_DAILY' entry.

For the weekly digest \(weeklyDigest.flt\), the title is defined by the 'NEWSLETTER\_TITLE\_WEEKLY' entry.

**Note:** The value is sanitized by commonUtil \(comUtil\) convertHtmlStructuresToText function.

## Changing the headline message of a notification {#section_j4q_ljj_qgb .section}

Both the daily and weekly digest templates share a common resource string, 'INTRODUCTION', in the news resources.

app\_server\_root/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications\_v2/news/resources/nls

## Changing footer links in notification {#section_o1d_4jj_qgb .section}

Footer links are displayed as text links, like "Edit Notification Settings", at the bottom of a notification.

Other links can added to or replace the existing footer links by editing or adding the call to the commonStructure \(comStructure\) footer macro.

```
<@comStructure.footer [LIST]>
```

Each list element can be either a \(label, url\) collection entry or a string containing a pre-built anchor link.

-   Collection entries can be constructed using the commonUtil \(comUtil\) entry function.
-   Pre-built anchor links can be constructed using the commonUrlUtil \(comUrlUtil\) linkify functions.

The link labels are often defined in the localized resource strings.

The resource strings can be identified by the call to comUtil.resource\(\) requesting a formatted string from one of two locations:

-   the application property files, \{APPLICATION\} being the application name \(activities, blogs, etc.\)

    app\_server\_root/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications\_v2/\{APPLICATION\}/resources/nls

-   common resource property files

    app\_server\_root/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications\_v2/resources/nls


By default, any links passed to the footer macro will be appended to the "Edit Notification Settings" link. This default link can be disabled by setting the optional "append" parameter to false in the footer macro call.

```
<@comStructure.footer [LIST] false>
```

## Enable live profile links for @mentions {#section_ipf_dkj_qgb .section}

The active links for @mentions have been converted to text in the CR4 templates to facilitate a cleaner layout.

These links can be re-enabled by the profile link formatting parameters.

The parameters are defined in the LinkFormatArgs variable included in the following two files:

-   commonStyleUtil.ftl
-   newsUtl.ftl

The LinkFormatArgs variable is a hash containing formatting options for each of the six types of links. The 'profile' section controls how @mention links are formatted. The default method of text, shown below, causes @mention link to be converted to text, using the body of the link for content.

```
'profile': {
    'method': 'text'
}
```

To enable live @mention links to the users profile page in Connections, change the method to 'pass'. This will allow the live links.

```
'profile': {
    'method': 'pass'
}
```

This change can be enabled in either commonStyleUtil.flt, newsUtl.flt, or both to allow for independent control of @mention link formatting.

**Parent topic:**[Customizing email digests](../customize/t_customize_email_digests.md)

