# Enabling MS Teams within Share {#c_install_enable_ms_teams_share .task}

HCL Connections Share feature allows users to share link to connections content not only within Connections but also with other third-party applications, such as Microsoft Teams

The following steps allow you to enable MS Teams to be used with the Share feature of Connections 8.0 CR1.

The appregistry extension enables sharing connections pages to Microsoft Teams through Share iconThe json from ms-teams-share-extension.json can either be imported from file or copied / pasted into the code editor of the appregistry client to create the extension.

When MS Teams is enabled within Share, users are given the option **MS Teams Share** upon clicking on the **Share** icon ![](images/c_install_share.png)

On clicking the MS Teams Share,users are able to share the current Connections page link or respective links for blogs, wikis, or forums link to any Team/Channel in Microsoft Teams.

To enable MS Teams to work within the Connectios Share feature, perform the following:

1.  Register the extensions

    1.  For the Customizer to insert this customization, place all the files present in this [folder](https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Share%20to%20Teams%20for%20CNX%208.0) in the Connections environment in `/pv-connections/customizations/share-extensions/ms-teams` directory

2.  Setup the Appregistry Extension

    1.  Launch the appregistry UI at `/appreg/apps` URL \(requires admin access\) or navigate to your Connections URL. Example: https://yourConnectionsUrl.com/appreg/apps.

    2.  In the **Apps manager**, click **New App**.

    3.  On the **Code Editor** page, either clear the default outline json that is created by default and then paste in the json \(if already copied to clipboard from the appropriate json file\) or click **Import**, browse for the JSON file containing the application, and select the file. The code that you import is validated and error messages display in the editing pane, where you can make corrections if needed.

    4.  Copy/Import the content of the JSON file in the appreg.

    5.  Click **Save** to save the imported app.

    6.  A new card should be displayed in the app list; enable or disable, as necessary.

    7.  After enabling the extension, on clicking ‘Share’ icon, the option ‘MS Teams Share’ will appear in the dropdown. On clicking ‘MS Teams Share’, a pop up will appear and one will be able to share current connection’s page link or respective blog’s/wiki’s/forum’s link to any Team/Channel in MS Teams.


**Parent topic:**[Configuring Share Application](../install/c_install_share_application.md)

