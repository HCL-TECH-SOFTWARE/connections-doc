# Setting up the Connections app for the Microsoft Teams client {#t_ms_teams_set_up_conn_app_for_ms .task}

This task involves packaging and installing the Connections app inside Microsoft Teams.

Make sure you've [configured an Azure app to support the Microsoft Teams app](t_ms_teams_config_azure_app.md).

1.  Clone or download the https://github.com/hclcnx/global-samples repository and locate the microsoft-teams/App Manifests/sample/manifest.json file.

2.  Edit the manifest.json file as follows:

    1.  Replace %Connections\_Hostname%​​​​​​​​ with the hostname and domain of your Connections server.

    2.  Replace %Connections\_AzureApplicationId%​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ with the Azure Application ID \(Bot ID\) of your Connections Azure application.

3.  Package the microsoft teams app

    The files can be zipped up using your favorite archive utility. Just ensure that there are no folders contained within the zip files. All files should be at the root level of the archive.

    If you are using a terminal on a Mac or Linux, use something similar to the following:

    ```
    zip ConnectionsTeamsApp.zip *
    ```

4.  Install in Teams:

    1.  Open Teams and visit the app store. Depending on the version of Teams, you may see an **App Store** button in Teams, or you can find the app store by visiting **Apps** \> **More Apps** in the app rail.

    2.  Install the app by clicking the **Upload a custom app** link in the app store.

    3.  Upload the manifest zip file created in step 2.

5.  Add the app to a teams channel or chat.

    1.  Open the Teams app store. Click on the **Built for <your org name\>** section of the app store to view the installed apps.

    2.  Click on your Connections Azure application. Then click **Select** and select to add the app to either a team or chat.

    3.  Enter the team channel or chat that you want to add the app to and click **Set up** to enable both the Tab app and Messaging Extension app. You can also select either **Set up a tab** or **Set up a bot** from the **Set up** list to add each component individually.

        **Note:** The **Set up a bot** action is required for the messaging extension component to work in a team or chat.


[Install/update Component Pack services with Microsoft Teams integration](../../admin/install/cp_install_services_tasks.md)

