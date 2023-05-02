# Overriding JavaScript in HCL Connections {#t_customize_override_js .task}

Override the JavaScript™ files that are used by HCL Connections™ when you want to change the behavior of a Dojo module. You must also override the the JavaScript files when you want the change to take effect as soon as the module is loaded.

To override JavaScript files, you must set up an HCL Connections deployment with the customization directory configured. For information about locating the customization directory, see [Customizing the user interface](t_admin_common_customize_main.md). After you locate your customization directory, create the following subdirectory: customizationDir/javascript

Files that are placed in this directory override the JavaScript that is loaded for the main Connections applications. This directory is loaded first and takes precedence over the content that is deployed as part of each application. Changes to this directory take effect immediately except when the JavaScript is loaded and cached statically.

**Important:** Files in the customization directory are not updated when interim fixes are installed. If you add an override file and deploy an interim fix that also affects the file, you must copy that new change into your override file to maintain your customization.

1.  To override JavaScript files, complete the following steps.
2.  Identify the JavaScript file that you want to override.

    Most of the JavaScript used by Connections is located inside one of the web resources JAR files inside the provisioning directory \(typically CONNECTIONS\_HOME/data/shared/provision/webresources\), or inside the Common.ear file. Each JAR file corresponds to a base package in Dojo. For example, com.ibm.lconn.core.web.resources corresponds to the Dojo package lconn.core. Open the JAR file and locate the JavaScript file that you want to override.

    For example:

    1.  Find com.ibm.lconn.core.web.resources\_\*.jar inside the deployed Common.ear file.
    2.  Open the JAR file with a .zip program.
    3.  Extract the resources/SearchBar.js file to a location on your hard disk drive.
3.  Copy the source file to the customization directory or create an empty file in the correct location.

    For Connections to detect an override JavaScript file, the path of the file in the customization directory must match the name of the Dojo JavaScript module. The name of a module is determined by its path and vice versa. You can convert the name of a module to a path by replacing all the periods in the module name with slashes.

    For example:

    1.  Using a text editor, open the SearchBar.js file from the example in step 1.
    2.  Look for a line similar to the following one at the start of the file:

        ```
        dojo.provide("lconn.core.SearchBar");
        ```

        This line indicates that the name of the module is lconn.core.SearchBar.

    3.  Copy SearchBar.js to the following directory: customizationDir/javascript/lconn/core/

        **Note:** Ensure that you use the correct case in case-sensitive file systems.

4.  Change the file.

    Changes saved to the file take effect immediately. Never directly edit the files in your JavaScript customization directory on a production system. Instead, copy them in with an automated task. For example:

    1.  Edit SearchBar.js to put an alert statement at the start of the file:

        ```
        alert("This file has been customized.");
        ```

5.  Clear your browser's cache and refresh your Connections web application.

    The SearchBar.js file in the example is used by most of the applications. When you refresh the page after you clear your browser cache, the alert added in the previous step appears immediately.


To remove a JavaScript customization, delete the file from the customization directory and refresh your browser cache. Most applications have a short cache \(20 seconds\) before they check again for new JavaScript customizations. For regular users who are not clearing their browser cache, your changes are only active after you update the version stamp in LotusConnections-config.xml and restart each affected application, including Common.ear. For more information, see [Post-customization step](t_admin_common_customize_postreq.md).

**Parent topic:**[Overriding and extending JavaScript in HCL Connections](../customize/c_customize_javascript.md)

**Related information**  


[Customizing the user interface](../customize/t_admin_common_customize_main.md)

[Extending JavaScript in HCL Connections](../customize/t_customize_extend_js.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Customizing strings sourced in JavaScript](../customize/t_customize_strings_via_javascript.md)

