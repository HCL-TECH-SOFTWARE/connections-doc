# Enabling custom widgets for Profiles {#t_admin_profiles_develop_custom_widgets .task}

To make custom widgets available for use in Profiles, you need to configure the widgets in the widget definition file, widgets-config.xml.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The widgets-config.xml file contains information about widget definitions, widget attributes, widget location, default widget templates, and page definitions. Custom widget attributes are defined by the widget developer but, as administrator, you need to configure the widgets by adding a <widgetDef\> element containing the appropriate attributes for each widget in the widget configuration file. The file is stored in the following location:

WAS\_HOME\\profiles\\AppSrv01\\config\\cells\\CELL\_NAME\\LotusConnections-config\\widgets-config.xml

You can integrate a custom widget as part of HCL Connections and you can also integrate the widget as an external application. To integrate the widget inside the HCL Connections application, your widget must provide a full page mode. To integrate the widget as an external application, you must use a navBarLink attribute to register a navigation link along with your widget configuration information.

1.  To configure a custom widget for Profiles, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

    1.  Use the following command to access the Profiles configuration files:

        ```
        execfile("profilesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following command to check out the widget configuration file:

    ProfilesConfigService.checkOutWidgetConfig\("<working\_directory\>", "<cell\_name\>"\)

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files will be copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required.
    For example:

    ```
    ProfilesConfigService.checkOutWidgetConfig("/wsadminoutput", "jdoe30Node02Cell")
    ```

5.  Navigate to the temporary directory in which you saved the widgets\_config.xml file, and then open the file in a text editor.

6.  Define the custom widget by specifying a resource type of profile and adding a <widgetDef\> element using the attributes and parameters defined in *Profiles widget attributes*.

    When adding custom strings using the resource bundle loader, the value of the category, description, and widgetDef attributes in the <widgetDef\> element are used as the resource key for your custom bundle. For more information about adding widget strings, see *Adding custom strings for widgets and other specified scenarios*.

    For example:

    ```
    <config id="widgets">
        <resource type="profile">
            <widgets>
              <definitions>
                <widgetDef defId="HelloWorld" 
                   primaryWidget="false" modes="view fullpage edit search"  
                   url="{contextRoot}/comm.widgets/helloWorld/HelloWorld.xml?version={version}"/> 
                       <!-- XML attribute with substitution variables -->
              </definitions>
              <layout resourceSubType="default">
                <page pageId="profilesView">
                   <widgetInstance uiLocation="col3" defIdRef="reportStructure"/>
                   <widgetInstance uiLocation="col3" defIdRef="friends"/>
                   <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
                   <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
                   <widgetInstance uiLocation="col2" defIdRef="multiFeedReader"/>
                </page>
                <page pageId="searchResultView">
                   <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
                </page>
                <page pageId="searchView">
                   <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
                </page>
               </layout>
            </widgets>
        </resource>
        .....
    </config>
    ```

    ```
    <config id="widgets">
        <resource type="profile">
            <widgets>
              <definitions>
                <widgetDef defId="HelloWorld" 
                   primaryWidget="false" modes="view fullpage edit search"  
                   url="{contextRoot}/comm.widgets/helloWorld/HelloWorld.xml?version={version}"/> 
                      <!-- XML attribute with substitution variables -->
              </definitions>
              <layout resourceSubType="default">
                <page pageId="profilesView">
                   <widgetInstance uiLocation="col3" defIdRef="friends"/>
                   <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
                   <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
                   <widgetInstance uiLocation="col2" defIdRef="multiFeedReader"/>
                </page>
                <page pageId="searchResultView">
                   <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
                </page>
                <page pageId="searchView">
                   <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
                </page>
               </layout>
            </widgets>
        </resource>
        .....
    </config>
    ```

    The url, navBarLink, and item or @value XML attributes can be parameterized using substitution variables. For more information about the substitution variables that you can use, see *Profiles widget configuration variables*.

7.  Save your changes and check the widgets-config.xml file back in using the following command:

    ProfilesConfigService.checkInWidgetConfig\(\)

8.  To exit the wsadmin client, type exit at the prompt.

9.  Stop and restart the Profiles server.


If you are adding widgets that are hosted on third-party servers, then you might need to update your proxy configuration. For more information on configuring the Ajax proxy for Profiles, see *Configuring the AJAX proxy for a specific application*.

**Parent topic:**[Adding custom widgets to Profiles](../admin/c_admin_profiles_add_custom_widgets.md)

**Related information**  


[Configuring the AJAX proxy for a specific application](../secure/t_admin_config_ajax_proxy_feature.md)

[Profiles widget attributes](../admin/r_admin_profiles_widget_elements.md)

[Managing widgets in Profiles](../admin/t_admin_profiles_edit_widgets.md)

[Configuring profile types for widget layout](../customize/t_admin_profiles_add_profile_type.md)

[Profiles widget configuration variables](../admin/r_admin_substitution_variables.md)

