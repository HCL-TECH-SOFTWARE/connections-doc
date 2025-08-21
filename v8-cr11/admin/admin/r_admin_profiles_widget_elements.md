# Profiles widget attributes {#r_admin_profiles_widget_elements .reference}

The following tables list the widget elements that you can configure when enabling, disabling, editing, or moving widgets in the Profiles application. These elements are configured in the widgets-config.xml file.

## Profiles widget elements { .section}

|Attribute|Description|Required|
|---------|-----------|--------|
|defId|The widget name, which must be unique. The defId attribute is also used as a title or a resource bundle key.This attribute takes a string value.

|Yes|
|primaryWidget|Specifies that the widget displays in the center column of the page. The default value is true.|No|
|description|Description of the widget that displays in the widget palette. This attribute uses the custom string framework. For more information about adding widget strings, see *Adding custom strings for widgets and other specified scenarios*.|No|
|category|The category in which the widget is placed in the widget palette. This attribute uses the custom string framework. For more information about adding widget strings, see *Adding custom strings for widgets and other specified scenarios*.|No|
|requires|Specifies which HCL Connections applications are required for the widget to function. The XML attribute values must match the serviceReference values in the LotusConnections-config.xml file.|No|
|url|Specifies the location of the widget descriptor. This XML attribute can be parameterized with substitution variables.This attribute takes a string value.

|Yes|
|modes|Specifies the modes that are supported by the custom widget. Possible modes include:-   view. This mode enables the widget to display on the profile overview page.
-   search. This mode integrates the widget into a community's search results page. Each widget displays as a separate tab on the page.
-   fullpage. This mode integrates the widget into the navigation bar. When users click the widget link in the navigation bar, the widget displays in a full page view in the community.
-   edit. This mode enables the **Edit** menu option in the widget's action menu, allowing community owners to edit the preferences of the widget inline, directly from the community's Overview page. The widget is also integrated in to the Edit Community page as a separate tab.

|No|
|uniqueInstance|Specifies whether the widget supports multiple instances on the same page. The default value is true.|No|
|navBarLink|Specifies the URL to an external application. A link to this URL is added to the navigation bar when the widget is part of the community. The URL can contain substitution variables.|No|
|helpLink|Specifies the URL to an HTML file containing help documentation for the widget. The help opens in a pop-up window. This parameter can contain subvariables. It can also be parameterized with substitution variables.|No|
|showInPalette|Specifies if the widget should be displayed in the content palette.|No|
|loginRequired|Specifies that the widget displays only when users are logged in.|No|
|bundleRefId|The resource bundle reference ID that is defined in the LotusConnections-config.xml file. This ID is used to determine the bundle strings for the widget category, widget description, and widget title. For more information about adding widget strings, see *Adding custom strings for widgets and other specified scenarios*.|No|

**Note:** The url, navBarLink, and item or @value XML attributes can be parameterized using substitution variables. For more information about the substitution variables that you can use, see *Profiles widget configuration variables*.

|Attribute|Description|
|---------|-----------|
|resourceSubType|Contains the name of the profile type that is used to render the widget layout. Multiple profile type layout configuration is allowed in Profiles. For more information, see *Adding profile types*.This attribute takes a string value.

|

|Attribute|Description|
|---------|-----------|
|pageId|Contains the page ID for the page that Profiles uses to render the widget layout. This attribute takes a string value.Possible values include:

-   profilesView
-   searchView
-   searchResultView
-   networkView
-   editProfileView

|

|Attribute|Description|
|---------|-----------|
|uiLocation|Specifies which column on the page contains the widget. This attribute takes a string value.Possible values include:

-   col1
-   col2
-   col3. Note that this option is not available for the networkView page.

|
|defIdRef|Defines the widget definition to which the instance is bound.This attribute takes a string value.

|

**Parent topic:**[Configuring widgets in Profiles](../admin/c_admin_profiles_configure_widgets.md)

**Related information**  


[Managing widgets in Profiles](../admin/t_admin_profiles_edit_widgets.md)

[Enabling custom widgets for Profiles](../admin/t_admin_profiles_develop_custom_widgets.md)

