# Setting up the Connections app for the Microsoft Teams client {#t_ms_teams_set_up_conn_app_for_ms .task}

This task involves packaging and installing the Connections app inside Microsoft Teams.

Make sure you've [configured an Azure app to support the Microsoft Teams app](t_ms_teams_config_azure_app.md).

1.  Clone or download the connections-samples repo:[https://github.com/HCL-TECH-SOFTWARE/connections-samples/](https://github.com/HCL-TECH-SOFTWARE/connections-samples/).
2.  Open the App Manifests folder: [https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/App%20Manifests/](https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/App%20Manifests) and locate the file `manifest.json`.

3.  Edit the manifest.json file as follows (more details in the README in the App Manifests folder above):

    1.  Replace `%Connections\_Hostname%`​​​​​​​​ with the hostname and domain of your Connections server.

    2.  Replace `%Connections\_AzureApplicationId%​​​​​​​​​​​​​`​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ with the Azure Application ID \(Bot ID\) of your recently created Connections Azure application.

    3. Make any other desired changes to manifest.

4.  Package the Microsoft Teams app.

    The files can be zipped up using your favorite archive utility. Just ensure that there are no folders contained within the zip files. All files should be at the root level of the archive.

    If you are using a terminal on a Mac or Linux, use something similar to the following:

    ```
    zip ConnectionsTeamsApp.zip *
    ```

5.  Install in Teams:

    1.  Open the Microsoft Teams admin center and login as an admin user: [https://admin.teams.microsoft.com/](https://admin.teams.microsoft.com/) 
    2.  Open **Teams Apps** -> **Manage Apps** from the navigation sidebar pane.
    3.  Click **Upload an app** at the top of the page.

    4.  Upload the zip file containing the `manifest.json` from step 2.

    5.  Follow the link to manage your newly created app and verify the information on the **About** tab.

    6.  Open the **Permissions** tab. From here, an admin can choose to accept the application permissions for all users.

6.  Add the app to a Teams channel or chat:

    1.  From your Teams UI, open the Teams app store. You may be be able to click on the **Built for <your org name\>** section of the app store to view the installed apps.

    2.  Find your newly created Connections Azure application. If the application is not showing, type the app name into the search bar. 
    
    3.  Then click **Select** and select to add the app to either a team or chat.

    4.  Enter the team channel or chat that you want to add the app to and click **Set up** to enable both the Tab app and Messaging Extension app. You can also select either **Set up a tab** or **Set up a bot** from the **Set up** list to add each component individually.

        **Note:** The **Set up a bot** action is required for the messaging extension component to work in a team or chat.

    5.  If you're integrating a Teams tab application and using Teams in a browser with third-party cookies blocked, you may see a Microsoft warning when loading the tab. Click **Show the app anyway** to proceed. 
    
    To prevent this warning, enable third-party cookies in your browser settings. Note that third-party cookies are often blocked by default in incognito or private browsing modes.

## Related info
The following information may also be useful for reference when working with Microsoft Teams application manifests:

Teams App Overview and Prereqs: https://docs.microsoft.com/en-us/microsoftteams/platform/build-your-first-app/build-first-app-overview

Manifest Schema: https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema

Localization File JSON Schema: https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/localization-schema

Create an App Package for your Microsoft Teams App: https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/apps-package

Publish a Custom App by Uploading an App Package: https://docs.microsoft.com/en-us/MicrosoftTeams/upload-custom-apps
## What to do next {#section_w2g_3bg_vnb .section}

Deploy the microservices and configure IBM HTTP Server for Teams. See the "Set up Microsoft Teams integration" section in [Steps to install or upgrade to Component Pack 8](../../admin/install/cp_install_services_tasks.md#teams_integ).