# Creating a Connections Customizer app {#custom_customizer_create_app .task}

Create a Customizer app by writing it in JSON and then importing the code into HCL Connections™.

1.  Follow these steps to create an app and extensions for Connections Customizer.
2.  Create an app.

    The app itself is a container that includes one or more extensions. Use a text editor and create a file that you can save with the .json extension, and provide information that describes the application. The application fields provide information such as a unique ID for the app, and the list of services where it applies \(in this case, the only allowed service is called Customizer\).

    When you write the app, you must include at least the fields that are listed in the table following the example:

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
            ]
          }
        }
      ]
    }
    ```

    |Include this field|To describe this aspect|Example|
    |------------------|-----------------------|-------|
    |Service|The Connections component where this app will be used. For Customizer apps, you must specify "Customizer" as the component.|```"services": [ "Customizer" ],```|
    |Name|A name for the application; the name can contain up to 100 characters. The name displays in the list of applications on the administration page, but users do not see it.|```"name": "Simple Customizer Sample",```|
    |Title|A text label that refers to this application. The title displays in the list of applications on the administration page, but users do not see it.|```"title": "My First Customizer App",```|
    |Description|A brief summary of the application's purpose. The description displays in the list of applications on the administration page, but users do not see it.|```"description": "Perform a modification to the Connections Homepage",```|
    |Extensions|The extensions must be included between the square brackets \[ \] in the extensions field. This example contains one extension.|```"extensions": [ <br><br> { <br><br> "name": "Hello World Extension", <br><br> "type": "com.ibm.customizer.ui", <br><br> "path": "homepage", <br><br> "payload": { <br><br> "include-files": [ <br><br> "helloWorld/helloWorld.user.js" <br><br> ] <br><br> } <br><br> } <br><br> ]```|

3.  Create an extension within the application.

    For Connections Customizer, each extension targets a specific component and uses its included resource files to modify the HTML page being returned by Connections. This sample extension \(from the app above\) displays the text "Hello World" on the user's Homepage.

    ```
    "extensions": [
      {
        "name": "Hello World Extension",
        "type": "com.ibm.customizer.ui",
        "path": "homepage",
        "payload": {
          "include-files": [
            "helloWorld/helloWorld.user.js"
          ]
        }
      }
    ]
    ```

    |Include this field|To describe this aspect|Example|
    |------------------|-----------------------|-------|
    |Name|A name for the extension; the name can contain up to 100 characters.|```"name": "Hello World Extension",```|
    |Extension type|The action being performed; for Customizer, the only allowed type is com.ibm.customizer.ui.|```"type": "com.ibm.customizer.ui",```|
    |Path|The Connections component whose UI is being modified through this Customizer app. You can create Customizer apps for the following standard Connections components: <br><br> - activities <br><br> - blogs <br><br> - communities <br><br> - files <br><br> - forums <br><br> - global <br><br> - homepage <br><br> - mycontacts <br><br> - news <br><br> - profiles <br><br> - search <br><br>- viewer <br><br> - wikis <br><br> **Note:** The global path allows you to apply the Customizer app across all of the Connections components. Unlike the other path values, global does not represent a real URL path element. It is a keyword meaning "match all URLs."|```"path": "homepage",```|
    |Match \(target users\)|A description of the users who will receive the modification to their UI. If you omit the match property, the modification affects all users. <br><br> You can specify the match using any of the following formats: <br><br> - match: url <br><br> - match: user-name <br><br> - match: user-id <br><br> - match: user-email <br><br> - match:profile-type <br><br> **Note:** When testing your app, you can provide a list of specific users who will see the customization and verify it. When you are ready to deploy the app to your organization, update or remove the match property. <br><br> For information on the match property, see [Using "match: url" to refine the "path" property](custom_customizer_props_match_url.md).| <br><br>```"match": { <br><br> "user-name":[ <br><br> "Samantha Darryn", <br><br> "Sam Curman" <br><br> ] <br><br> }```|
    |Payload|The information that you are providing to Connections so that it can perform your modification.For Connections Customizer, the payload consists of a list of resource files \(include-files\), which contain code \(JavaScript™, CSS, and so on\) that will be injected into the HTML page that is returned to the user. <br><br> In this example, there is a single JavaScript file, stored in the pv-connections/customizations persistent volume on the Storage node, that injects the text "Hello World" directly onto the Homepage that is displayed to the user. | <br><br> ```"payload": { <br><br> "include-files": ["helloWorld/helloWorld.user.js"] <br><br> }```|
    |Payload \(for iFrame\)|**Note:** The type parameter must be set to "type": "com.ibm.customizer.ui.container" to inject iFrames. <br><br> Supported iFrame parameters: <br><br> <br><br> - url: the url to be injected <br><br> - sandbox: takes the standard sandbox parameters <br><br> - width: specify the width of the iframe in % or px <br><br> - height: specify the height of the iframe in % or px <br><br> - locator: anchor point for the iframe takes class selectors. Defaults to '.lotusMain .lotusContent'| <br><br>```"type": <br><br> "com.ibm.customizer.ui.container", <br><br> "payload": { <br><br> "url": "https://some-url", <br><br> "sandbox": "allow-scripts allow-same-origin" <br><br> }```|

4.  Save the app and its extensions as a .json file.

5.  Test your app.

6.  Register the app with Connections.


-   **[Customizer-specific properties](../customize/custom_customizer_props.md)**  
The match and include-file properties are specific to Connections Customizer apps. Learn how you can use them to specify which users are affected by the app, and what modifications are made to the display.

**Parent topic:** [Injecting customizations into Connections pages](../customize/customize_inject_customizations.md)

