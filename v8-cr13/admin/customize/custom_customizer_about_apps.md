# About Customizer apps {#custom_customizer_about_apps .concept}

HCL Connections™ Customizer is a proxy service that lets you modify the Connections user experience by injecting resources in the pages that are returned to users.

Connections Customizer performs modifications by injecting JavaScript™, CSS, or other web resources into the HTML pages returned by Connections in response to end-user requests. Requests are generated when the user navigates in standard Connections apps such as Communities, Profiles, Files, and Homepage. The customization details \(typically, which requests should be modified, and what code should be inserted\) are defined by apps stored in the Connections App Registry.

## Which Connections components support Customizer? { .section}

You can create Customizer apps for the following standard Connections components, which are accessed using the corresponding path in the URL:

-   activities
-   blogs
-   communities
-   downloads
-   files
-   forums
-   global
-   homepage
-   manage
-   meetings
-   metrics
-   mycontacts
-   news
-   profiles
-   search
-   social
-   viewer
-   wikis

**Note:**

The global path allows you to apply the Customizer app across all of the Connections components. Unlike the other path values, global does not represent a real URL path element. It is a keyword meaning "match all URLs."

The manage path does not cover all possible HCL Connections manage URL paths; but only includes the following paths:

-   /manage/subscribers/showInviteGuestDialog/input
-   /manage/account/user/input

## What web resources can you inject into Connections with the Customizer? { .section}

You can inject CSS and JavaScript resources into the HTML pages that are returned by Connections in response to end-user requests.

## What does a Customizer app look like? { .section}

A Customizer app is a JSON file, and it is formatted just like apps that contain extensions. If you have created UI extensions for Connections, then you are already familiar with the this format. The JSON file represents an app, and contains one or more extensions. The extensions contain properties describing the Connections component where the modifications are applied, and the code that should be injected into the HTML page to customize the display.

For example, the following Customizer app includes a single extension, which invokes a JavaScript file to display the message "Hello World" on the Connections HomePage.

```
{
  "services": [
    "Customizer"
  ],
  "name": "Simple Customizer Sample",
  "title": "My First Customizer App",
  "description": "Perform a modification to the Connections Homepage",
  "extensions": [
    {
      "name": "Hello World Extension",
      "type": "com.ibm.customizer.ui",
      "path": "homepage",
      "payload": {
        "include-files": [
          "helloWorld/helloWorld.user.js"
        ],
        "include-repo":{
               "name":"global-samples"
        }
      }
    }
  ]
}
```

## Testing your app { .section}

Before deploying your app publicly, you can test it using one of the following methods:

-   Locally with an application such as Greasemonkey or Tampermonkey, which run on the client.
-   In Connections by including a match property in your app that limits the users who will be affected by the modifications \(for example, just yourself\). Submit the app to your Connections Admin for deployment. Once your testing is complete, edit the app to remove the test match property, and submit the updated app for deployment.

## Registering your app in Connections { .section}

Registering an app requires a user with Connections Administration privileges to complete the process.

## Samples { .section}

There are a number of ready-made Customizer sample apps available for your use; you can deploy them as-is or experiment with them.

Samples are available from the samples folder of the [Customizer GitHub repository](https://github.com/hclcnx/customizer).

Each sample has its own subfolder, which contains the app's JSON file along with the resource files \(JavaScript, CSS\) to be injected into Connections as part of the customization.

## More information { .section}

For more information on Connections Customizer, refer to [HCL Connections Customizer: Online Customizer documentation from the developer community](https://github.com/hclcnx/customizer/blob/master/docs/HCLConnectionsCustomizer.md) on GitHub

**Parent topic:**[Injecting customizations into Connections pages](../customize/customize_inject_customizations.md)

