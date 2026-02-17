# Managing widgets in Profiles {#t_admin_profiles_edit_widgets .task}

Configure settings in the widget definition file, widgets-config.xml, when you want to modify the widgets that display in the Profiles application.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The widgets-config.xml file contains information about widget definitions, widget attributes, widget location, default widget templates, and page definitions. Each widget has a corresponding <widgetDef\> element that contains the attributes for the widget. When you want to edit the widget, enable or disable it, or move it to a different location, you need to update the corresponding <widgetDef\> element in the widgets-config.xml file.

The widgets-config.xml file is stored in the following location:

WAS\_HOME\\profiles\\AppSrv01\\config\\cells\\CELL\_NAME\\LotusConnections-config\\widgets-config.xml

**Attention:** After you finish adding the widget to the widget-config.xml file, you must register the widget in the Widget container by completing the steps in the *What to do next* section at the end of this topic.

1.  To edit the widgets that display in Profiles, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly. For more information, see *Starting the wsadmin client*.

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

6.  Do one of the following:

    -   To edit a widget's properties, look for the corresponding <widgetDef\> element, and then modify the widget attributes and parameters as needed. For information about the attributes and parameters, see *Profiles widget attributes*.
    -   To associate a widget with a different profile type, look for the relevant <widgetDef\> element, and then modify the value of the resourceSubType attribute. For information about the resourceSubType attribute, see *Profiles widget attributes*.
    -   To move a widget to a different location, look for the relevant <widgetDef\> element, and then modify the value of the pageId and uiLocation attributes. For information about these attributes, see *Profiles widget attributes*.
    -   To disable a widget, look for the relevant <widgetDef\> element and either delete the element or comment it out of the code.
7.  Save your changes and check the widgets-config.xml file back in using the following command:

    ProfilesConfigService.checkInWidgetConfig\(\)

8.  To exit the wsadmin client, type exit at the prompt.

9.  Stop and restart the Profiles server.


Although this example might not match the content of the widgets-config.xml included in your deployment, it does include the widgets supported for your deployment.

```
<layout resourceSubType="default">
   <page pageId="searchView">
           <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
           <widgetInstance uiLocation="col3" defIdRef="sand_DYK"/>
           <widgetInstance uiLocation="col3" defIdRef="sand_recomItems"/>
   </page >
   <page pageId="profilesView">
           <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
           <widgetInstance uiLocation="col1" defIdRef="sand_thingsInCommon"/>
           <widgetInstance uiLocation="col2" defIdRef="multiWidget"/>
           <widgetInstance uiLocation="multiWidget" defIdRef="board"/>
           <widgetInstance uiLocation="multiWidget" defIdRef="contactInfo"/>
           <widgetInstance uiLocation="multiWidget" defIdRef="backgroundInfo"/>
           <widgetInstance uiLocation="multiWidget" defIdRef="multiFeedReader"/>
           <widgetInstance uiLocation="col3" defIdRef="sand_socialPath"/>
           <widgetInstance uiLocation="col3" defIdRef="reportStructure"/>
           <widgetInstance uiLocation="col3" defIdRef="friends"/>
           <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
    </page >
    <page pageId="searchView">
           <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
    </page >
    <page pageId="networkView">
           <widgetInstance uiLocation="col1" defIdRef="sand_DYK"/>
    </page >
    <page pageId="editProfileView">
           <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
           <widgetInstance uiLocation="col1" defIdRef="sand_thingsInCommon"/>
           <widgetInstance uiLocation="col3" defIdRef="sand_socialPath"/>
           <widgetInstance uiLocation="col3" defIdRef="reportStructure"/>
           <widgetInstance uiLocation="col3" defIdRef="friends"/>
           <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
    </page >
</layout>
```

```
<layout resourceSubType="default">
    <page pageId="searchView">
            <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
    </page >
    <page pageId="profilesView">
            <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
            <widgetInstance uiLocation="col2" defIdRef="multiWidget"/>
            <widgetInstance uiLocation="multiWidget" defIdRef="board"/>
            <widgetInstance uiLocation="multiWidget" defIdRef="contactInfo"/>
            <widgetInstance uiLocation="multiWidget" defIdRef="backgroundInfo"/>
            <widgetInstance uiLocation="multiWidget" defIdRef="multiFeedReader"/>
            <widgetInstance uiLocation="col3" defIdRef="friends"/>
            <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
    </page >
    <page pageId="searchView">
            <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
    </page >
    <page pageId="networkView"></page >
    <page pageId="editProfileView">
            <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
            <widgetInstance uiLocation="col3" defIdRef="friends"/>
            <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
    </page >
</layout>
```

After you finish adding the widget to the widget-config.xml file, you must register the widget in the Widget container by completing the following steps:

1.  Register the widget using one of the methods described in the following topics:

    -   [Gadget Registration Commands](r_admin_gadget_reg_ws_commands.md#) explains how to register gadgets and widgets from a command line.
    -   [Configuring Home page widgets](t_admin_homepage_add_widgets_homepage.md) explains how to register gadgets and widgets from the administration interface.
    **Note:** When you register a Profiles widget, the `prereqs` setting should be set to "`profiles`" as in the following example:

    ```
    NewsWidgetCatalogService.addWidget(title="helloworld", text="Hello World Widget.", url="https://serverName.ibm.com/helloworld/helloworld.xml", categoryName=WidgetCategories.NONE, isGadget=FALSE,appContexts=[WidgetContexts.EMBEDXP], policyFlags=[GadgetPolicyFlags.TRUSTED], prereqs=["profiles"])
    
    ```

2.  Run the run the `widgetEnable` command.
3.  Run the `clearWidgetCaches` command.

-   **[Profiles widgets](../admin/r_admin_profiles_widgets.md)**  
There are several widgets available for the Profiles application.

**Parent topic:**[Configuring widgets in Profiles](../admin/c_admin_profiles_configure_widgets.md)

**Related information**  


[Profiles widget attributes](../admin/r_admin_profiles_widget_elements.md)

[Adding custom widgets to Profiles](../admin/c_admin_profiles_add_custom_widgets.md)

