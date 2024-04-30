# Enabling custom widgets for Communities {#t_admin_communities_develop_custom_widgets .task}

To make custom widgets available for use in Communities, configure the widgets in the Communities section of the widget definition file, widgets-config.xml.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The widgets-config.xml file is used by the Communities and Profiles applications and contains settings for both applications. Make your changes in the Communities section of the file define by the `<resource type="community"...>` tag.

The widgets-config.xml file contains information about widget definitions, widget attributes, widget location, default widget templates, and page definitions. Custom widget attributes are defined by the widget developer. However, as administrator, you need to configure the widgets by adding a <widgetDef\> that contains the appropriate attributes for each widget in the widget configuration file.

You can integrate a custom widget as part of HCL Connections and you can also integrate the widget as an external application. To integrate the widget inside the IBM Connections application, your widget must provide a full page mode. To integrate the widget externally, you must use a navBarLink attribute to register a navigation link along with your widget configuration information. Also, include the community inline business card in the external application to allow community members to navigate back to the community. For more information, see *Integrating the Communities business card*.

**Attention:** After you finish adding the widget to the widget-config.xml file, you must register the widget in the Widget container by completing the steps in the *What to do next* section at the end of this topic.

1.  To configure a custom widget for use in Communities, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

3.  Start the Communities Jython script interpreter using the following command:

    ```
    execfile("communitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Check out the widgets-config.xml file using the following command:

    CommunitiesConfigService.checkOutWidgetsConfig\("working\_directory", "cell\_name"\)

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them. When specifying the path to a working directory or temporary directory where the checked out files are to be placed, use a forward slash as the path separator, even for Microsoft Windows systems.
    -   cell\_name is the name of the WebSphere Application Server cell hosting the Communities application. This argument is required. It is also case-sensitive, so type it with care.
    For example:

    ```
    CommunitiesConfigService.checkOutWidgetsConfig("C:/tmp2","MyServerNode01Cell")
    ```

5.  Open the widgets\_config.xml file and define the custom widget by specifying a resource type of community and adding a <widgetDef\> element by using the following attributes and parameters:

    **Note:** Do not use the following attributes, they are intended for IBM development only:

    -   showIfConfigSet
    -   showIfCookieSet
    -   showIfNothingSet
    |Attribute|Description|Required?|
    |---------|-----------|---------|
    |defId|The widget name. The defId attribute is also used as a title or a resource bundle key.|Yes|
    |primaryWidget|Specifies that the widget displays in the center column of the page. The default value is true.**Note:** The value of primaryWidget must be true for Library widgets in Communities.

|No|
    |description|Description of the widget that displays in the widget palette. This attribute uses the custom string framework. For information about how to add a string that contains the widget description, see *Adding custom strings for widgets and other specified scenarios*.|No|
    |category|The category in which the widget is placed in the widget palette. This attribute uses the custom string framework. For information about how to add a string that specifies the widget category, see *Adding custom strings for widgets and other specified scenarios*.|No|
    |requires|Specifies which HCL Connections applications are required for the widget to function. The XML attribute values must match the serviceReference values in the LotusConnections-config.xml file.|No|
    |url|Specifies the location of the widget descriptor. This XML attribute can be parameterized with substitution variables.|Yes|
    |modes|Specifies the modes that are supported by the custom widget. Possible modes include the following:    -   view. This mode enables the widget to display on the community overview page page.
    -   search. This mode integrates the widget into a community's search results page. Each widget displays as a separate tab on the page.
    -   fullpage. This mode integrates the widget into the navigation bar. When users click the widget link in the navigation bar, the widget displays in a full page view in the community.
    -   edit. This mode enables the **Edit** menu option in the widget's action menu, allowing community owners to edit the preferences of the widget inline, directly from the community's Overview page. The widget is also integrated in to the Edit Community page as a separate tab.
|No|
    |uniqueInstance|Specifies whether the widget supports multiple instances on the same page. The default value is false.|No|
    |resourceOwnerWidget|Specifies whether the widget is seen only by the community owners or profile owner. Set this attribute to true or false.|No|
    |navBarLink|Specifies the URL to an external application. A link to this URL is added to the community overview sidebar menu - the menu by the community logo. The URL can contain substitution variables, but cannot contain JavaScript.|No|
    |helpLink|Specifies the URL to an HTML file that contains help documentation for the widget. The help opens in a window. This parameter can contain subvariables. It can also be parameterized with substitution variables.|No|
    |showInPalette|Specifies whether the widget is displayed in the content palette.|No|
    |loginRequired|Specifies that the widget displays only when users are logged in.|No|
    |bundleRefId|The resource bundle reference ID that is defined in the LotusConnections-config.xml file. This ID is used to determine the bundle strings for the widget category, widget description, and widget title. For more information about adding custom strings for widgets, see *Adding custom strings for widgets and other specified scenarios*.|No|

    |**Note:** For bidi languages, the horizontal arrangement of columns is reversed.

Attribute|Description|
    |-------------------------------------------------------------------------------------------|-----------|
    |wpthemeThin|Indicates that the widget can be moved to the left column.|
    |wpthemeNarrow|Indicates that the widget can be moved to the right column.|
    |wpthemeWide|Indicates that the widget can be moved to the center column.|
    |wpthemeBanner|Indicates that the widget can be moved to the banner area, which typically spans the center and right columns.|

    |Attribute|Description|
    |---------|-----------|
    |uiLocation|Defines the location of the widget on the page. You can set this attribute to col1, col2, or col3.This attribute takes a string value.

|
    |defIdRef|Defines the widget definition to which the instance is bound.This attribute takes a string value.

|

    When you add custom strings with the resource bundle loader, the value of the category, description, and widgetDef attributes in the <widgetDef\> element are used as the resource key for your custom bundle. For more information about adding custom strings for widgets, see *Adding custom strings for widgets and other specified scenarios*.

    For example:

    ```
    <config id="widgets">
        <resource type="profile">
        .....
        </resource>
        <resource type="community">
            <widgets>
              <definitions>
                <widgetDef defId="HelloWorld" 
                    primaryWidget="false" modes="view fullpage edit search"  
                    url="{contextRoot}/comm.widgets/helloWorld/HelloWorld.xml?version={version}"/> 
                     <!-- XML attribute with substitution variables -->
              </definitions>
              <layout resourceSubType="default">
                  <page pageId="communityOverview"> 
                  <!-- page definitions and the mandated widgets assigned to them-->
                    <widgetInstance uiLocation="col3" defIdRef="Members"/> 
                    <!-- mandated widget UI location: possible values: col1, col2, col3 -->
                  </page>
                  <page pageId="allCommunities"/> 
                 <!-- All Communities Page: only col1 is supported-->
              </layout>
            </widgets> 
        </resource>
        .....
    </config>
    ```

    The url, navBarLink, and item or @value XML attributes can be parameterized with substitution variables. For more information about the substitution variables that you can use, see *Communities widget configuration substitution variables*.

6.  To specify that a widget is always on a page, add a <widgetInstance\> element to the appropriate <page\> elements under the <layout resourceSubType="default"\> element. Table 2 shows what you enter for the <widgetInstance\>.

7.  If you want to specify that a widget is opened by default, add it to the <template\> element.

    For example:

    ```
    <templates> <!-- default template will be used to display the default widgets --> 
     <template id="default">
      <widgetInstance instanceId="StatusUpdates1" defIdRef="StatusUpdates" uiLocation="col2statusposts"/>
      <widgetInstance instanceId="ForumInstance1" defIdRef="Forum" uiLocation="col2"/>
      <widgetInstance instanceId="BookmarksInstance1" defIdRef="Bookmarks" uiLocation="col2"/>
      <widgetInstance instanceId="FilesInstance1" defIdRef="Files" uiLocation="col2"/>
      </template>
    </templates>   
    ```

8.  Apply your changes by doing the following:

    1.  Check in the updated widgets-config.xml file using the following command:

        CommunitiesConfigService.checkInWidgetsConfig\("working\_directory", "cell\_name"\)

        For example:

        ```
        CommunitiesConfigService.checkInWidgetsConfig("C:/tmp2","MyServerNode01Cell")
        ```

    2.  To exit the wsadmin client, type exit at the prompt.
    3.  Restart the Communities application using the WebSphere Application Server Integrated Solutions Console.

After you finish adding the widget to the widget-config.xml file, you must register the widget in the Widget container by completing the following steps:

1.  Register the widget using one of the methods described in the following topics:

    -   [Gadget Registration Commands](r_admin_gadget_reg_ws_commands.md#) explains how to register gadgets and widgets from a command line.
    -   [Configuring Home page widgets](t_admin_homepage_add_widgets_homepage.md) explains how to register gadgets and widgets from the administration interface.
    **Note:** When you register a Communities widget, the `prereqs` setting should be set to "`communities`" as in the following example:

    ```
    NewsWidgetCatalogService.addWidget(title="helloworld", text="Hello World Widget.", url="https://serverName.ibm.com/helloworld/helloworld.xml", categoryName=WidgetCategories.NONE, isGadget=FALSE,appContexts=[WidgetContexts.EMBEDXP], policyFlags=[GadgetPolicyFlags.TRUSTED], prereqs=["communities"]) 
    
    ```

2.  Run the run the `widgetEnable` command.
3.  Run the `clearWidgetCaches` command.

If you are adding widgets that are hosted on third-party servers, then you might need to update your proxy configuration. For more information, see *Configuring the AJAX proxy for a specific application*.

**Parent topic:**[Adding custom widgets to Communities](../admin/c_admin_communities_add_custom_widgets.md)

**Related information**  


[Configuring the AJAX proxy for a specific application](../secure/t_admin_config_ajax_proxy_feature.md)

[Integrating the Communities business card](../admin/t_admin_communities_include_biz_card.md)

[Communities widget configuration substitution variables](../admin/r_admin_substitution_variables_communities.md)

