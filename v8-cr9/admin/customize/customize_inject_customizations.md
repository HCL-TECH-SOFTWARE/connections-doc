# Injecting customizations into Connections pages {#customize_inject_customizations .concept}

HCL Connections™ Customizer is a proxy service that lets you modify the HCL Connections user experience. Customizer intercepts and modifies requests from clients and responses from servers, so it can customize anything that flows through it, such as the behavior of APIs or the look-and-feel of the user interface.

## How does Customizer modify the user experience? { .section}

Customizer modifies responses to user requests before the final page is returned to the user.

1.  All requests from the user devices pass through the Customizer proxy service.
2.  For each Connections URL that Customizer processes, it queries the App Registry to determine whether one or more customization apps have been registered for that URL.
3.  If the App Registry returns an app definition for the URL, Customizer uses the metadata stored in that app's JSON payload to decide whether a customization should be applied.
4.  If a customization should be applied, Customizer uses the resources in the payload to inject the appropriate information into the response before it is returned to the user.

For example, suppose you register a Customizer app to display the message "Hello World" on the HomePage screen. If you do not create a matching scheme that determines which users see the message, then it displays for all users, and is processed through the previous steps as follows:

1.  When a user navigates to the Connections HomePage, a request is sent to Connections, but is first passed to the Customizer proxy service.



2.  Customizer checks the App Registry and finds the "Hello World" app, which was registered for the HomePage URL.

    This indicates that users who access the HomePage component should receive a response that includes the modification described in the "Hello World" app.

3.  In the app's payload, Customizer locates a reference to a JavaScript™ file that causes the message to be injected into the HTML code for the HomePage display.

    The file is stored in a location where it can be accessed by Customizer.

4.  Customizer then returns the modified version of the HomePage in the response to the user, who now sees "Hello World" displayed on that page.

## Setting up Customizer { .section}

Before your organization can use Customizer, you must install it as part of the Connections Component Pack, and then configure it. For more information, see [Configuring the Customizer component](../install/cp_config_customizer_intro.md).

## Creating a Customizer app { .section}

Create an app that injects resources in a Connections page. For information, see [Creating a Connections Customizer app](custom_customizer_create_app.md)

## Registering a Customizer app in Connections { .section}

Registering an app requires a user with Connections Administration privileges to complete the process. For information, see [Managing Connections Customizer apps](customize_manage_customizer_apps.md)

## More information { .section}

For more information on Customizer, see the webinar [Getting Started with HCL Connections Customizer and Component Pack](https://www.youtube.com/watch?v=CvlpjIE-3TQ&list=PLEjl4yzB6ckE0Tu9NUQdbNLLGLf_zZ4O6&index=30&t=188s) on the HCL Digital Solutions YouTube channel.

-   **[About Customizer apps](../customize/custom_customizer_about_apps.md)**  
HCL Connections Customizer is a proxy service that lets you modify the Connections user experience by injecting resources in the pages that are returned to users.
-   **[Managing Connections Customizer apps](../customize/customize_manage_customizer_apps.md)**  
Administrators can add, update, and remove Customizer apps in HCL Connections using the Apps Manager.
-   **[Creating a Connections Customizer app](../customize/custom_customizer_create_app.md)**  
Create a Customizer app by writing it in JSON and then importing the code into HCL Connections.

**Parent topic:**[Customizing](../customize/c_customize_overview.md)

