# Enabling app registry extensions for Microsoft Teams integration {#task_xwz_b3y_5nb .task}

Extensions that can be loaded into app registry are available to enable chat with Microsoft Teams function as well as the Share with Microsoft Teams button on most every Connections page.

Some of the Microsoft Teams integration use cases rely on the app registry service to deliver extensions that enable and define how the integrations behave. To that end, a functional app registry client and service are necessary requirements to support all of the use cases that follow.

The app registry service is installed or updated with the required extensions when you **set up the infrastructure charts** during the [Connections Component Pack installation or upgrade](../../admin/install/cp_install_services_tasks.md) \(the final task in this section on Microsoft Teams\).

The JSON extension definitions and custom JS files required for this task are available in multiple places:

-   Because the 1-1 chat use cases \(from bizcard, profile and important to me bubble\) require only an app registry extension, they can be used without any additional component installation. In that case, simply download the extension JSON from [https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Chat%20Integration](https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Chat%20Integration).
-   If you already have Customizer deployed, the Share to Teams custom files and extension can be found at [https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Share%20to%20Teams%20for%20CNX%208.0](https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Share%20to%20Teams%20for%20CNX%208.0).
-   If you have downloaded the Component Pack zip package and are installing or upgrading the Component Pack services, the JSON extension definition and custom JS files can be located under the extracted location at microservices\_connections/hybridcloud/support/ms-teams/appregistry and microservices\_connections/hybridcloud/support/ms-teams/customizations/ms-teams respectively.

The following table identifies the purpose of each JSON file.

|File Name|Description|
|---------|-----------|
|ms-teams-profile-bizcard.json|Contains a single extension used by both bizcard \(chat link\) and profiles \(chat button\). Enabling or disabling this single extension affects both bizcard and profile page rendering of the chat link / button.|
|ms-teams-itm.json|Contains 3 custom actions, only one of which is enabled by default.<br />By default, clicking the ITM teams chat button will launch the https link and a user can choose to use either browser or Teams desktop client.<br />By default, clicking the ITM teams chat button will launch the https link and a user can choose to use either browser or Teams desktop client. There is an action that uses msteams: protocol handler which will invoke whichever app is installed and configured to handle that protocol. If all users prefer desktop app, then this may be preferable than using the https link. If so, enable this action and disable the https: link action.<br />The last action uses the sip: procotol handler, which can be used to render a call button, however, at time of writing the Teams desktop client does not support it and just launches the chat UI instead.|
|ms-teams-share.json|Customizer extension that injects the Share to Teams button on Connections content pages. See the samples README for further instructions [https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Share%20to%20Teams%20for%20CNX%208.0](https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Share%20to%20Teams%20for%20CNX%208.0)

**Note:**

Making updates to app registry extension definitions can only be done by someone with the administrator role. The extensionRegistry property must be set to true to allow Connections to check the app registry for relevant extensions. See [Enable Connections to use the app registry service](t_ms_teams_enable_reg_ext.md).

1.  Once logged into Connections as an administrator, navigate to https://yourConnectionsUrl.com/appreg/apps

2.  In the apps manager, click **New App**.

3.  On the Code Editor page, either clear the default outline json that is created by default and then paste in the json \(if already copied to clipboard from the appropriate json file\) or click **Import**, browse for the JSON file containing the application, and select the file.

    The code that you import is validated and error messages display in the editing pane, where you can make corrections if needed.

4.  Click **Save**to save the imported app.

5.  A new card should be displayed in the app list; enable or disable as necessary.

6.  Repeat steps 2-4 as necessary for each extension listed in Table 1 and depending on which use cases you wish to enable.

7.  Go to Connections and hover over a user name to see their bizcard and see the **Chat** link in the bottom left or open a user profile page to see **Chat** button. Go to the social homepage and hover over an ITM user bubble to see the **Teams chat** action.

8.  If setting up the **Share to Teams** extension, see the samples README for further instructions [https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Share%20to%20Teams%20for%20CNX%208.0](https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/microsoft-teams/Share%20to%20Teams%20for%20CNX%208.0)

9.  Go to any Connections page and verify that the round Teams button is displayed in the top right-hand corner of the page.


[Enable Connections to use the app registry service](t_ms_teams_enable_conn_use_appreg.md)

