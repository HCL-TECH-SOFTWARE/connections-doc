# Gadget registration commands {#r_admin_gadget_reg_ws_commands .reference}

Administrators can register gadgets for the Home page, and register widgets for the Communities, and Profiles applications, using the NewsWidgetCatalogService commands or the Administration view on the Home page.

## Methods for registering new widgets { .section}

You must be logged in as an administrator to register a new gadget or widget. Connections provides two mechanisms for registration:

**Administration view**

The Administration view provides a form-based mechanism for registering gadgets and widgets. To use this method, you must have the Home page application installed. For information, see [Configuring Home page widgets](t_admin_homepage_add_widgets.md).

**NewsWidgetCatalogService commands**

The NewsWidgetCatalogService command allows you to register a gadget or widget from a command window. This method does not require you to install the Home page application. For more information, continue reading this topic.

## Flag constants used for widget policy settings { .section}

**GadgetFlags**

TRUSTED use to indicate that a gadget is 'trusted' and should be granted access to the non-base gadget features.

SSO indicates that a particular gadget is granted access to the SSO feature.

**WidgetContexts**

UPDATE indicates that this widget is applicable to the updates page of the Homepage.

WIDGET indicates that this widget is applicable to the widgets page of the Homepage.

SHAREDIALOG indicates that this gadget is applicable to the share dialog.

EMBEDXP indicates that this gadget is provides an embedded experience.

## Settings available for widgets { .section}

Before using any NewsWidgetCatalogService commands, be sure to run `newsAdmin.py` as described in the first two steps of the topic [Accessing the News configuration file](t_admin_homepage_access_news_config.md). The following table describes the settings available for widgets:

|Settings|Description|
|--------|-----------|
|widgetId|READONLY The id of the widget.|
|title|REQUIRED The title for the widget in the catalog.|
|text|REQUIRED Descriptive text for the widget in the catalog.|
|url|REQUIRED URL for the widget.|
|secureUrl|Alternate 'secure' \(HTTPS\) URL for the widget XML.|
|iconUrl|The URL for the widget icon. This icon is placed next to the widget in the widget catalog.|
|secureIconUrl|Alternate *secure* \(HTTPS\) URL for the widget icon. This icon is placed next to the widget in the widget catalog.|
|previewImage|Setting for a URL to an optional preview image.|
|categoryName|Sets the category for the widget to be displayed in if it is available in the Customize panel. Valid values for this are the name of an HCL Connections application \(for example: 'profile', 'wikis', 'files'\) in lowercase.|
|isSystem|READONLY: Indicates if this is a system-defined widget. These should not be altered as a rule.|
|isHomepageSpecific|Indicates if the widget is specific to Home page. This setting is used by Homepage iWidgets.|
|isDefaultOpened|Indicates if the particular widget should be placed on the widgets page \(if applicable\) for new users.|
|multipleInstanceAllowed|Indicates if the user may place multiple instances of a widget onto the widgets or updates page. This setting is only valid for iWidgets.|
|isGadget|Indicates whether this is a OpenSocial gadget \(true\) or iWidget \(false\).|
|policyFlags|Also see [GadgetFlags](#GadgetFlags). List of policy flags set for this widget. For the 4.0 release, this setting is only relevant for gadgets.|
|enabled|Indicates if this widget is enabled or disabled.|
|prereqs|Acomma-separated list of applications that are required for this widget to be enabled. The widget is implicitly disabled if the list of prerequisites is not met.|
|appContexts|Also see [WidgetContexts](#WidgetContexts). Indicates the contexts where this widget is intended to be used.|
|proxyPolicy|Specifies the proxy policy access for custom gadgets. Also see [ProxyPolicy constant](#ConstantsForProxyPolicy).|

## Constants for enablement { .section}

**Enablement**

ALL returns both enabled and disabled widgets

ENABLED returns only enabled widgets

DISABLED returns only disabled widgets

## Constants for True and False { .section}

**Constant for True**

TRUE=1

**Constant for False**

FALSE=0

## Unbounded page size constant { .section}

**PAGE\_SIZE\_UNBOUNDED = -1**
:   ## Constants for ProxyPolicy {#ConstantsForProxyPolicy .section}

## Constants for ProxyPolicy { .section}

**ProxyPolicy**

INTRANET\_ACCESS All server access.

EXTERNAL\_ONLY Only servers outside of the SSO domain.

`CUSTOM` No access. Access will be defined by the proxy-policy.dynamic file.

For more information about the proxy-policy.dynamic file, refer to [Configuring per-host proxy access rules for OpenSocial gadgets](t_admin_common_cre11_conn_security_proxy.md).

## NewsWidgetCatalogService { .section}

**NewsWidgetCatalogService.browseWidgets\(enablement = Enablement.ALL, pageSize = PAGE\_SIZE\_UNBOUNDED, pageNumber = 1\)**

Browse the widgets in the widget catalog.

Uses the parameter for enablement \(Refer to Enablement\).

Uses the parameter for pageSize.

Uses the parameter for pageNumber.

Returns a list of Widget objects.

```
wsadmin>NewsWidgetCatalogService.browseWidgets(Enablement.ALL, 1, 1)
```
**NewsWidgetCatalogService.clearWidgetCaches\(\)**

Clears cached widget.xml files from your server without needing to restart your system. If a gadget or iWidget.xml has been updated and you want to force it to be reread by the system, simply call this command.

**NewsWidgetCatalogService.countWidgets\(enablement = Enablement.ALL\)**

Count the widgets in the widget catalog.

* Uses the parameter for enablement \(Refer to Enablement\).

* Returns a count of the number of widgets in the catalog.

**NewsWidgetCatalogService.findWidgetById\(WidgetId\)**

Find a widget by id.

Uses the parameter for widgetId.

Returns the matching widget or null if no matching widget is found.

For example:

```
wsadmin>NewsWidgetCatalogService.findWidgetById("405a4f26-fa08-4cef-a995-7d90fbe2634f")

```

**NewsWidgetCatalogService.findWidgetByUrl\(widgetUrl\)**

Find a widget by Url.

Uses the parameter for url.

Returns the matching widget or null if no matching widget is found.

**NewsWidgetCatalogService.listShareGadgets\(enablement = Enablement.ALL\)**

List out the share gadgets. By design, paging is not supported.

Uses the parameter for enablement \(Refer to Enablement\).

Returns the share gadgets.

For example:

```
wsadmin>NewsWidgetCatalogService.listShareGadgets(Enablement.ALL)
```

**NewsWidgetCatalogService.updateWidgetShareOrder\(widgetId, orderAfterWidgetId\)**

Place the widget marked in a widgetId after a second widget in widget ordering.

widgetId: The id of the widget you wish to move.

orderAfterWidgetId: The id of the widget you want to place the gadget after. If this is null, the widget will be placed first in the ordering.

**NewsWidgetCatalogService.addWidget\(\*\*widget\)**

Add a widget to the widget catalog.

** widget indicates that this is a free form set of key=value properties. The keys/values map to the Settings available for widgets table previously described.

Returns the ID of the newly created widget.

The following example creates a sample EE gadget that has 'trusted' access policies. This gadget depends on the Profiles component.

```
NewsWidgetCatalogService.addWidget(title="Sample gadget title", text="Sample gadget description.", url="http://www.to.my.gadget.com/gadget.xml", categoryName='sample' isGadget=TRUE,appContexts=[WidgetContexts.EMBEDXP], policyFlags=[GadgetPolicyFlags.TRUSTED], prereqs=["profiles"])
```
**NewsWidgetCatalogService.updateWidget\(widgetId, \*\*widget\)**

Update an existing widget in the widget catalog.

Uses the parameter for widgetId.

** widget indicates that this is a free form set of key=value properties. The keys/values map to the Settings available for widgets table previously described.

```
wsadmin>NewsWidgetCatalogService.updateWidget("1bf9ad75-a634-4301-88c6-ce493eb03cc9", title="test", text="test")
```

**NewsWidgetCatalogService.removeWidget\(widgetId\)**

Remove a widget matching the widgetId entered.

For example:

```
wsadmin>NewsWidgetCatalogService.removeWidget("405a4f26-fa08-4cef-a995-7d90fbe2634f") 
```

**NewsWidgetCatalogService.enableWidget\(widgetId\)**

Returns the following output:

```
CLFRQXXXXI: Widget {0} is now enabled.
```

**NewsWidgetCatalogService.disableWidget\(widgetId\)**

Returns the following output:

```
CLFRQXXXXI: Widget {0} is now disabled.
```

**NewsWidgetCatalogService.ProxyPolicy**

Specify the server proxy policy.

INTRANET\_ACCESS May access intranet sites.

EXTERNAL\_ONLY May access external \(non-intranet\) sites only.

CUSTOM Uses rules in the rule manager configuration.

**Parent topic:** [Administering the Widget container](../admin/t_admin_common_widget_container.md)

**Related information**  


[News administrative commands](../admin/r_admin_news_admin_props.md)

