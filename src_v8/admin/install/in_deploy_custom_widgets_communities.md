# Enabling custom widgets for Communities {#enablingcustomwidgetsforcommunities .task}

To enable the custom widgets for Communities, you must copy files to the HCL Connections server and edit the configuration file.

1.  Copy the file ibm.nitro.integrations.connections.packaging.client-buildNumber.jar to the CONNECTIONS\_PROVISION\_PATH/webresources/ on the Connections server, where CONNECTIONS\_PROVISION\_PATH could be found from **Environment** \> **WebSphere variables** in WebSphere Application Server Integrated Solutions Console.

    For example, /opt/HCL/Connections/data/shared/provision/webresources/

2.  Restart the Common application with the WebSphere Application Server Integrated Solutions Console.

3.  Verify the resource is available for access by visiting the Connections resource URL: http://Connections\_hostname:Connections\_port/connections/resources/web/com.ibm.form.integrations.formiwidget/Surveys.xml

4.  Open a command prompt and start the wsadmin command-line tool.

    For example, use the command ./wsadmin.sh -lang jython -user your wasadmin -password your password -port SOAP\_CONNECTOR\_ADDRESS\_PORT

5.  Start the Communities Jython script interpreter with the following command: execfile\("communitiesAdmin.py"\). If you are prompted to specify a service, pick a node and choose the node where the file is stored.

6.  Enter the following command to check out the widgets-config.xml configuration file, CommunitiesConfigService.checkOutWidgetsConfig\(working\_directory, cell\_name\), where working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you edit them. And cell\_name is the name of the WebSphere Application Server cell that hosts the Communities application. This argument is required and case sensitive.

    For example, use the command, CommunitiesConfigService.checkOutWidgetsConfig\("/opt", "localhostCell01"\).

7.  Open the widgets-config.xml file in a text editor. Find the resource section that has a `type=“community”` and add the following code to the end of that section:

    ```
    <widgetDef defId="Surveys" description="Surveys.desc" themes="wpthemeNarrow wpthemeWide wpthemeBanner" bundleRefId="formiwidget" primaryWidget="true" showInPalette="true" modes="view edit fullpage" uniqueInstance="true" loginRequired="false" url="{webresourcesSvcRef}/web/com.ibm.form.integrations.formiwidget/Surveys.xml" helpLink="/topic/com.ibm.lotus.connections.communities.surveys.help/community_survey_frame.html" iconUrl="{webresourcesSvcRef}/web/com.ibm.form.integrations.formiwidget/images/survey_widget_icon.png">
              <itemSet>
                  <item name="formSeverBaseUrl" value="/surveys" readOnly="true"/>
                  <item name="surveyNumberInOverview" value="5" readOnly="true"/>
    
    <item name="communitiesSvcRef" value="{communitiesSvcRef}" readOnly="true"/>
    <item name="webresourcesSvcRef" value="{webresourcesSvcRef}" readOnly="true"/>
    <item name="opensocialSvcRef" value="{opensocialSvcRef}" readOnly="true"/>
    <item name="version" value="{version}" readOnly="true"/>
               </itemSet>
    
    <lifecycle remoteHandlerURL="http://SURVEYS\_SERVER\_HOST:PORT/surveys/secure/org/lifecycle" remoteHandlerAuthenticationAlias="connectionsAdmin">
    	  <event>community.members.added</event>
    	  <event>community.members.removed</event>
    	  <event>widget.added</event>
    	  <event>widget.removed</event>
    	  <event>community.updated</event>
    	  <event>community.visibility.changed</event>
    	  <event>community.prepare.delete</event>
    	  <event>community.members.modified</event>
    	  <event>community.org.changed</event>
    </lifecycle>
    </widgetDef>
    
    <widgetDef defId="FeaturedSurvey" description="FeaturedSurvey.desc" themes="wpthemeNarrow wpthemeWide wpthemeBanner" bundleRefId="formiwidget" primaryWidget="false" showInPalette="true" modes="view edit" loginRequired="false"  uniqueInstance="false" url="{webresourcesSvcRef}/web/com.ibm.form.integrations.formiwidget/SingleSurvey.xml" helpLink="/topic/com.ibm.lotus.connections.communities.surveys.help/community_survey_frame.html" iconUrl="{webresourcesSvcRef}/web/com.ibm.form.integrations.formiwidget/images/survey_widget_icon.png">
              <itemSet>
                  <item name="formSeverBaseUrl" value="/surveys" readOnly="true"/>
    
    <item name="communitiesSvcRef" value="{communitiesSvcRef}" readOnly="true"/>
    <item name="webresourcesSvcRef" value="{webresourcesSvcRef}" readOnly="true"/>
    <item name="opensocialSvcRef" value="{opensocialSvcRef}" readOnly="true"/>
    <item name="version" value="{version}" readOnly="true"/>
               </itemSet>
    </widgetDef>
    ```

8.  Modify the code that you added as follows:

    -   Replace the SURVEYS\_SERVER\_HOST:PORT in the <lifecycle\> element with your Community Surveys host and port.
    -   `formiwidget` is a globally unique name that identifies the bundle that you already defined in the previous topic.
    -   `/surveys` is the context root of Community Surveys server.
    -   In a clustered environment, both nodes must have the updated C:\\HCL\\Forms\\extensions directory.
9.  To check in the updated file, use the following command: CommunitiesConfigService.checkInWidgetsConfig\(working\_directory, cell\_name\)

    For example, use the following command, CommunitiesConfigService.checkInWidgetsConfig\("/opt", "localhostCell01"\)

10. To exit the wsadmin client, type exit at the prompt.

11. Restart the Communities application with the WebSphere Application Server Integrated Solutions Console.


To quickly check the setup, log in to Connections. Create a community, click **Community actions** \> **Add apps**. The Surveys widget and Featured Survey are deployed with the other tools. Add the Surveys and Featured Survey widgets to your community. Your users are ready to build a survey.

**Note:** A user with an admin role is not necessarily an active community member. You must be an owner of a community to work with communities. An admin cannot work as a community member during the integration.

