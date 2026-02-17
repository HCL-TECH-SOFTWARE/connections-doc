# Configuring profile types for widget layout {#t_admin_profiles_add_profile_type .task}

To configure widget layout, you can add a profile type containing the widget layout configuration to Profiles in the widgets-config.xml file.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  To add a new profile type for widget layout, perform the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Use the wsadmin client to access and check out the Profiles configuration files.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following command to check out the widget configuration file:

    ProfilesConfigService.checkOutWidgetConfig\("<working\_directory\>", "<cell\_name\>"\)

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files will be copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required.
    For example:

    ```
    ProfilesConfigService.checkOutWidgetConfig("/wsadminoutput", "jdoe30Node02Cell")
    ```

5.  Save a copy of the widgets-config.xml file.

6.  Open the file in a text editor.

7.  Add a widget layout under the <widgets\> element, as in the following example:

    Although this example might not match the content of the widgets-config.xml included in your deployment, it does include the widgets supported for your deployment.

    **Important:** Do not delete widgets from the default resourceSubType layout used for default Profile Type. Connections uses widgets info specified for the default for rendering widgets in multiple profile types.

    ```
    <layoutConfiguration>
      <widgets xmlns:tns="http://www.ibm.com/profiles-config">
        <layout resourceSubType="debug">
          <page pageId="profilesView">
            <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget1"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="board"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="contactInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="backgroundInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="multiFeedReader"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="socialTags"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="sand_thingsInCommon"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="sand_socialPath"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="reportStructure"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="friends"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="linkRoll"/>
          </page>
        </layout>
          
        <layout resourceSubType="restricted">
          <page pageId="profilesView">
            <!-- <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="mw1"/> -->
            <widgetInstance uiLocation="col2" defIdRef="contactInfo" instanceId="ci1"/>
            <widgetInstance uiLocation="col1" defIdRef="reportStructure"/>
          </page>
        </layout>
    
        <layout resourceSubType="mobile">
          <page pageId="profilesView">
            <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget1"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="board"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="contactInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="backgroundInfo"/>
            <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget2"/>
            <widgetInstance uiLocation="tabsWidget2" defIdRef="multiFeedReader"/>
            <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
            <widgetInstance uiLocation="col1" defIdRef="sand_thingsInCommon"/>
            <widgetInstance uiLocation="col1" defIdRef="sand_socialPath"/>
            <widgetInstance uiLocation="col3" defIdRef="reportStructure"/>
            <widgetInstance uiLocation="col3" defIdRef="friends"/>
            <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
          </page>
        </layout>
    
        <layout resourceSubType="default">
          <page pageId="profilesView">
            <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget1"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="board"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="contactInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="backgroundInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="multiFeedReader"/>
            <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
            <widgetInstance uiLocation="col1" defIdRef="sand_thingsInCommon"/>
            <widgetInstance uiLocation="col3" defIdRef="sand_socialPath"/>
            <widgetInstance uiLocation="col3" defIdRef="reportStructure"/>
            <widgetInstance uiLocation="col3" defIdRef="friends"/>
            <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
          </page>
          <page pageId="searchResultView">
            <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
          </page>
          <page pageId="searchView">
            <widgetInstance uiLocation="col1" defIdRef="sand_DYK"/>
            <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
            <!-- 
              <widgetInstance uiLocation="col3" defIdRef="sand_recomItems"/>
            -->
          </page>
          <page pageId="networkView">
            <widgetInstance uiLocation="col1" defIdRef="sand_DYK"/>
          </page>
          <page pageId="editProfileView">
           ...
        </layout>
      </widgets>
    </layoutConfiguration>
    ```

    ```
    <layoutConfiguration>
      <widgets xmlns:tns="http://www.ibm.com/profiles-config">
        <layout resourceSubType="debug">
          <page pageId="profilesView">
            <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget1"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="board"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="contactInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="backgroundInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="multiFeedReader"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="socialTags"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="friends"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="linkRoll"/>
          </page>
        </layout>
          
        <layout resourceSubType="restricted">
          <page pageId="profilesView">
            <!-- <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="mw1"/> -->
            <widgetInstance uiLocation="col2" defIdRef="contactInfo" instanceId="ci1"/>
          </page>
        </layout>
    
        <layout resourceSubType="mobile">
          <page pageId="profilesView">
            <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget1"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="board"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="contactInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="backgroundInfo"/>
            <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget2"/>
            <widgetInstance uiLocation="tabsWidget2" defIdRef="multiFeedReader"/>
            <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
            <widgetInstance uiLocation="col3" defIdRef="friends"/>
            <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
          </page>
        </layout>
    
        <layout resourceSubType="default">
          <page pageId="profilesView">
            <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget1"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="board"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="contactInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="backgroundInfo"/>
            <widgetInstance uiLocation="tabsWidget1" defIdRef="multiFeedReader"/>
            <widgetInstance uiLocation="col1" defIdRef="socialTags"/>
            <widgetInstance uiLocation="col3" defIdRef="friends"/>
            <widgetInstance uiLocation="col3" defIdRef="linkRoll"/>
          </page>
          <page pageId="searchResultView">
            <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
          </page>
          <page pageId="searchView">
            <widgetInstance uiLocation="col1" defIdRef="commonTags"/>
          </page>
          <page pageId="networkView">
          </page>
          <page pageId="editProfileView">
           ...
        </layout>
      </widgets>
    </layoutConfiguration>
    ```

8.  Save your changes and check the widgets-config.xml file back in using the following command:

    ProfilesConfigService.checkInWidgetConfig\(\)

9.  To exit the wsadmin client, type exit at the prompt.

10. Stop and restart the Profiles server.


**Parent topic:** [Profile-types](../customize/r_admin_profiles_ovr_types.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Creating a simple profile data model and template customization](../customize/t_admin_profiles_custom_example.md)

