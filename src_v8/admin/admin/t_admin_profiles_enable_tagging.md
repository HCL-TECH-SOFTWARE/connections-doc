# Configuring the Tags widget {#t_admin_profiles_enable_tagging .task}

Use Profiles configuration settings to configure the Tags widget that displays in Profiles.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command line tool.

When tagging is enabled in Profiles, users can tag themselves and other users. To enable tagging, you set a configuration value in the widgets-config.xml file located in the was\_profile\_rootconfig/cells/cell\_name/nodes/node-name/LotusConnections-config directory. Enabling this setting displays the tagging widget in Profiles. Users can then assign tags, or keywords, to their own profile and other people's profiles to identify work activities, skills, and interests.

**Note:** Although changes to widgets-config.xml should generally be made using wsadmin client scripting, there is no wsadmin command to enable tagging, so you can make changes to the file using a text editor.

To configure the Tags widget, complete the following steps:

1.  Open a command window and start the wsadmin command-line tool.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

2.  Use the following command to check out the widget configuration file:

    ProfilesConfigService.checkOutWidgetConfig\("<working\_directory\>", "<cell\_name\>"\)

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files will be copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required.
    For example:

    ```
    ProfilesConfigService.checkOutWidgetConfig("/wsadminoutput", "jdoe30Node02Cell")
    ```

3.  Navigate to the temporary directory in which you saved the widgets\_config.xml file, and then open the file in a text editor.

4.  Specify values for the following attributes:

    |Attribute|Description|
    |---------|-----------|
    |defId|Used by the internal framework to identify the tag widget.This attribute takes a string value, which must be unique.

|
    |url|Specifies the location of the widget definition document. This URL can be relative to the host machine where profiles is served. The URL can also be absolute; the widget may be located on a different server from Profiles.This property takes a string value.

|
    |helpBodyResourceBundleId|Used as a resource bundle key.This attribute takes a string value.

|

    For example:

    ```
    <widgets xmlns:tns="http://www.ibm.com/profiles-config">
     <definitions>
      <widgetDef defId="reportStructure" url="/profiles/widget-catalog/report-chain.xml">
       <configData>
        <attr key="numberOfNameToDisplay" value="4" /> 
       </configData>
      </widgetDef>
      <widgetDef defId="multiFeedReader" url="/profiles/widget-catalog/multifeedreader.xml">
       <configData>
        <attr key="numberOfEntriesToDisplay" value="5" /> 
        <attr key="communityResourceId" value="communities" /> 
        <attr key="communityFeedUrl" value="{communitiesSvcRef}/service/atom/communities/all?email={email}&ps=5" /> 
        <attr key="dogearResourceId" value="dogear" /> 
        <attr key="dogearFeedUrl" value="{dogearSvcRef}/atom?email={email}&sort=date&sortOrder=desc&ps=10" /> 
        <attr key="blogsResourceId" value="blogs" /> 
        <attr key="blogsFeedUrl" value="{blogsSvcRef}/roller-ui/feed/{email}?order=asc&maxresults=5&sortby=0" /> 
        <attr key="activitiesResourceId" value="activities" /> 
        <attr key="activitiesFeedUrl" value="{activitiesSvcRef}/service/atom2/activities?public=only&email=
        {email}&authenticate=no" /> 
       </configData>
      </widgetDef>
      <widgetDef defId="friends" url="/profiles/widget-catalog/friends.xml" fullPageView="true" 
      showFullPageViewLinkInNavBar="true" navBarResourceBundleId="friendsFullPageTitle" />
      <widgetDef defId="linkRoll" url="/profiles/widget-catalog/linkroll.xml" /> 
      <widgetDef defId="socialTags" url="/profiles/widget-catalog/tags.xml" helpBodyResourceBundleId=
      "socialTagsHelpBody" />
     </definitions>
      <layout profileType="default">
       <page pageId="profilesView">
        <widgetInstance uiLocation="col3" defIdRef="reportStructure" /> 
        <widgetInstance uiLocation="col3" defIdRef="friends" /> 
        <widgetInstance uiLocation="col3" defIdRef="linkRoll" /> 
        <widgetInstance uiLocation="col1" defIdRef="socialTags" /> 
        <widgetInstance uiLocation="col2" defIdRef="multiFeedReader" /> 
      </page>
       <page pageId="reportingStructureView">
        <widgetInstance uiLocation="col3" defIdRef="reportStructure" /> 
        <widgetInstance uiLocation="col3" defIdRef="friends" /> 
        <widgetInstance uiLocation="col3" defIdRef="linkRoll" /> 
        <widgetInstance uiLocation="col1" defIdRef="socialTags" /> 
      </page>
       <page pageId="editProfileView" /> 
       <page pageId="searchResultView" /> 
       <page pageId="fullPageWidgetView" /> 
     </layout>
    </widgets>
    ```

5.  Save your changes and check the widgets-config.xml file back in using the following command:

    ProfilesConfigService.checkInWidgetConfig\(\)

6.  To exit the wsadmin client, type exit at the prompt.

7.  Stop and restart the Profiles server.


**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

