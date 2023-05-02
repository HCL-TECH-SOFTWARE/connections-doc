# Configuring the Sharepoint app in Connections {#task_myw_fct_qnb .task}

Edit the widgets-config.xml file for Communities to update the SharePoint Library app definition and provide the app's client ID and the URL for the Microsoft Office 365 tenant that the app will connect to.

Make sure you've completed all the steps in [Configuring the Sharepoint app in Microsoft Azure AD](t_admin_sharepoint_app_enabling.md).

1.  Check out and open widgets-config.xml as described in [Using the widgets-config.xml file for Communities](../../admin/admin/t_admin_communities_use_widgets_config.md).

2.  Search for the app's definition with `defId="SharepointLibrary"` to see the following:

    ```
    <!--BEGIN SHAREPOINT ONLINE WIDGET DEF--> 
    <widgetDef defId="SharepointLibrary" modes="view edit fullpage" themes="wpthemeNarrow wpthemeWide wpthemeBanner wpthemeThin"  uniqueInstance="true"> 
        <itemSet> 
            <item name="clientId" value="XXXXXXXXXXXXXXXXXXXXXXXXXXXX"/> 
            <item name="tenant" value="your\_organization\_url.onmicrosoft.com"/>
        </itemSet> 
    </widgetDef>  
    <!--END SHAREPOINT ONLINE WIDGET DEF-->
    
    ```

3.  Set the `client ID` to the string that you copied for the application \(client\) ID in the [previous task](t_admin_sharepoint_app_enabling.md).

4.  Change the value for `tenant` to your\_organization\_url.onmicrosoft.com.

5.  Save and close the file according to the topic referenced in step 1.

6.  [Syncronize your nodes](../../admin/migrate/t_synch_updates.md).

7.  [Restart the Connections Communities application](../../admin/admin/t_admin_common_startstop_apps.md).


**Parent topic:**[The Connections community app for Microsoft Sharepoint](../../connectors/admin/c_admin_sharepoint_app_container.md)

