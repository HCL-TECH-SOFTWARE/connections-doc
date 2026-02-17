# Configuring the Status Updates widget {#t_admin_profiles_configure_recent_post_widget .task}

Configure the Status Updates widget to display multiple feeds for a user profile. The widget can be extended to display additional feeds from HCL Connections applications and external services as required.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The Status Updates widget provides an aggregated summary of a user's recent activity in the different HCL Connections applications. It is visible from a user’s Home page. The widget also displays the latest updates from content that the profile owner is a member of, such as communities and wikis.

The Status Updates widget is automatically configured to provide feeds from all the HCL Connections applications, but you can configure it to display information for only those applications that are included in your deployment.

1.  To configure the Status Updates widget, complete the following steps.
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

5.  Open widgets-config.xml in a text editor, and specify the widget attributes using the information in the following tables. You can find the configuration section for this component under `config > widgets > definitions > widgetDef > defId = multiFeedReader > configData`.

    |Attribute|Description|
    |---------|-----------|
    |serviceNameResourceId|The resource string that specifies the name of the given feed that is displayed in the tab.|
    |serviceNameFeedUrl|The feed URL for the specified HCL Connections application. A standard URL can be used, or a serviceNameSvcRef parameter can be used if the serviceName has been defined in the lotusConnections-config.xml file.|

    Specify the following URL parameters:

    |Parameter|Description|
    |---------|-----------|
    |email|A substitution variable for the user email displayed. This is used as a placeholder in the URL; it is replaced at runtime.|
    |serviceNameSvcRef|A substitution variable for the URL value that is replaced at runtime. This parameter is retrieved from the lotusConnections-config.xml file for the given HCL Connections application.|

    For example:

    ```
    <widgetDef defId="multiFeedReader" 
     url="{contextRoot}/widget-catalog/multifeedreader.xml?version={version}">
      <itemSet>
        <item name="numberOfEntriesToDisplay" value="5" />
        <item name="communityResourceId" value="communityResourceId"/>
        <item name="communityFeedUrl" 
           value="{communitiesSvcRef}/service/atom/communities/all?userid={userid}&amp;ps=5"/>
        <item name="dogearResourceId" value="dogearResourceId"/>
        <item name="dogearFeedUrl" 
           value="{dogearSvcRef}/atom?userid={userid}&amp;access=any&amp;sort=date&amp;sortOrder=desc&amp;ps=5&amp;showFavIcon=true{appLangParam}"/>
        <item name="blogsResourceId" value="blogsResourceId"/>
        <item name="blogsFeedUrl" 
           value="{blogsSvcRef}/roller-ui/feed/{userid}?order=asc&amp;maxresults=5&amp;sortby=0"/>
        <item name="activitiesResourceId" value="activitiesResourceId"/>
        <item name="activitiesFeedUrl" 
           value="{activitiesSvcRef}/service/atom2/activities?public=only&amp;userid={userid}&amp;authenticate=no&amp;ps=5"/>
        <item name="filesResourceId" value="filesResourceId"/>
        <item name="filesFeedUrl" 
           value="{filesSvcRef}/basic/anonymous/api/userlibrary/{userid}/feed?pagesize=5"/>
      </itemSet>
    </widgetDef>
    ```

6.  To remove an application feed, comment out or delete the <serviceNameResourceId\> and <serviceFeedUrl\> attributes.

    **Note:** To comment out the attributes, use the `<!--` XML notation to open the comment and `-->` to close the comment.

    In the following example, feeds from the Activities and Files applications are removed from the widget:

    ```
    <!--  <item name="activitiesResourceId" value="activitiesResourceId"/>
          <item name="activitiesFeedUrl" 
            value="{activitiesSvcRef}/service/atom2/activities?public=only&amp;userid={userid}&amp;authenticate=no&amp;ps=5"/>                    
          <item name="filesResourceId" value="filesResourceId"/>
          <item name="filesFeedUrl" 
            value="{filesSvcRef}/basic/anonymous/api/userlibrary/{userid}/feed?pagesize=5"/>  -->
      </itemSet>
    </widgetDef>
    ```

7.  Save your changes and check the widgets-config.xml file back in using the following command:

    ProfilesConfigService.checkInWidgetConfig\(\)

8.  To exit the wsadmin client, type exit at the prompt.

9.  Stop and restart the Profiles server.


**Parent topic:**[Configuring widgets in Profiles](../admin/c_admin_profiles_configure_widgets.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Configuring widgets in Profiles](../admin/c_admin_profiles_configure_widgets.md)

[Checking out the widgets-config.xml file for Profiles](../admin/t_admin_profiles_use_widgets_config.md)

[Managing widgets in Profiles](../admin/t_admin_profiles_edit_widgets.md)

