# Managing Connections Customizer apps {#customize_manage_customizer_apps .concept}

Administrators can add, update, and remove Customizer apps in HCL Connections™ using the Apps Manager.

## Are you a Connections Administrator? { .section}

Deploying and managing Customizer apps requires Administration privileges in Connections. An existing Administrator can give you those privileges by adding you to the Admin role for the Common application. To check whether you have Admin access to Connections, complete the following steps:

1.  Log in to Connections.
2.  Open a browser and navigate to the following address:

    ```
    https://connections.your\_domain.com/connections/resources/web/user/roles?role=admin
    ```


The response indicates whether you have admin access to Connections: \{"admin":"true"\} or \{"admin":"false"\}.

## Preparing to register an app { .section}

To register a Customizer app, make sure that you have the following files available:

-   Include-files: the resource files used by the app to modify the interface.

    Copy the app's include-files to the pv-connections/customizations directory on the Storage node.

-   The .json file containing the app itself.

    You will import this file during the registration process.


## Open the Apps Manager page { .section}

1.  Sign in to Connections as an administrator.
2.  Navigate to http://yourConnectionsUrl.com/appreg/

    Be sure to include the trailing slash in the URL.


## Register an app { .section}

1.  In the Apps Manager, click **New App**.



2.  On the App Editor page, click **Import** \(in the editing panel\), browse for the JSON file containing the application, and select the file.

    The code that you import is validated and error messages display in the editing pane, where you can make corrections if needed.

3.  Click **Save** to save the imported app.

You can verify that the app is available by refreshing the page where you expect it to appear.

**Note:** Customizer uses a proxy server \(such as NGINX\); to use Customizer apps, users must access Connections through the proxy server's URL. You can configure the URL as explained in [Configuring the NGINX proxy server for Customizer](../install/cp_config_customizer_setup_nginx.md)

## Delete an app { .section}

You can delete a registered app by locating it in the Apps Manager and clicking **...** \> **Delete**.

**Parent topic:**[Injecting customizations into Connections pages](../customize/customize_inject_customizations.md)

