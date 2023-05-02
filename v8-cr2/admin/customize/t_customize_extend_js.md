# Extending JavaScript in HCL Connections {#t_customize_extend_js .task}

You can extend the JavaScript™ files used by HCL Connections™ when you want to add new functionality, widgets, or scripts to the product.

HCL Connections uses the shared resources WAR file, connections.web.resources.war, to aggregate and serve all JavaScript files. This WAR file is based on the OSGi extension model, which allows new capabilities to be added to a system via a plug-in mechanism. Connections leverages this mechanism to provide the following capabilities:

-   Expose custom JavaScript in a new Dojo module package
-   Ensure that custom JavaScript loads when another module is loaded

To extend the JavaScript used in Connections, first you must put your JavaScript files into an OSGi bundle \(a JAR file with a special MANIFEST.MF file and some directories\), and deploy the bundle into Connections. Then, you need to link your JavaScript to ensure that it is loaded at the same time as the rest of the JavaScript in Connections.

The easiest way to extend the JavaScript used in Connections is to start with a sample bundle, add files to it, and deploy it in your Connections environment.

If you want to change a file in the JAR file, stop the Common.ear file, update the JAR file, and then restart the EAR file. You can also unzip the JAR file into a new directory with the same name as the JAR file minus the .jar extension and make changes there, but you might have to restart the EAR file to see new versions of files appear.

1.  Complete the following steps to extend the JavaScript used in Connections using a sample bundle.
2.  Download the following sample bundle:

    http://public.dhe.ibm.com/software/dw/lotus/connections/4/reference/com.mycompany.example\_1.0.0.jar

    **Note:** The JAR version format must be "\_x.x.x" to be correctly recognized by Connections.

3.  Deploy the sample bundle.

    1.  Locate your web resources provisioning directory for Connections. The installer creates this directory at the following location: CONNECTIONS\_HOME/data/shared/provision/webresources

        This directory contains many different JAR files, including at least one for each application, and utility bundles.

    2.  Copy the sample bundle into the webresources directory.

    3.  Restart the Common.ear file.

    4.  Enter the following URL in your web browser:

        ```
        http://server/connections/resources/web/com.mycompany.example/readme.txt
        ```

        You should see the readme.txt file from the JAR in the resources/ folder display in the browser window.

4.  Add files to the sample bundle.

    You can update the JAR file by adding new files. Put the files in the resources/ directory and view the contents by entering the following URL in your web browser:

    ```
    http://server/connections/resources/web/com.mycompany.example/
    ```

    1.  Stop Common.ear.

    2.  Add your new JavaScript, HTML, image, or CSS files into the JAR file in the resources/ directory.

    3.  Restart Common.ear.

    4.  Clear your browser cache and access the new file directly by viewing it on your server.

        For example:

        ```
        http://server/connections/resources/web/com.mycompany.example/newfile
        ```

5.  Ensure that the JavaScript is loaded when an Connectionsmodule is loaded by updating the plugin.xml file to add a new <dojoModuleBinding\> element. Set the "to" attribute in the binding to the name of the class that you want to load your custom files after.

    Most customizations need to be loaded at a certain time, along with other Connections JavaScript. To ensure that your module is loaded, you must update plugin.xml to add a new <dojoModuleBinding\> element.

    In the example, "com.mycompany.example.demonstration" \(demonstration.js\) is bound to a file that all Connections applications load, bundle\_common.js. Whenever any application loads bundle\_common.js, demonstration.js will also be loaded. The demonstration module prints a line to the Firebug console, which you can see in Connections.

6.  Restart Common.ear to pick up the changes in the plugin.xml file.

7.  Change the name of the bundle.

    1.  In the META-INF/MANIFEST.MF file, change Bundle-SymbolicName and, optionally, Bundle-Name.

        **Note:** Do not remove the `;singleton:=true` text at the end of the line. This text is necessary for the plugin.xml file to get parsed and your JavaScript to be loaded.

    2.  Change each Dojo JavaScript module in the resources/ folder to have a different base package. Alternatively, you can change the <alias\> in plugin.xml to define an arbitrary base package.

        When Connections tries to look up your modules, it will first look for the base package \(the name of the bundle, or the <alias value="" /\> defined in plugin.xml\) and then look inside the resources/ folder. However, the `dojo.provide(...)` statement inside each JavaScript file must match the expected name or Connections cannot load your JavaScript.

    3.  Change the name of the JAR file to new-name\_version.jar.

        **Important:** When you rename the JAR file, ensure that the version that is described by Bundle-Version in MANIFEST.MF matches the version at the end of the JAR name. If they do not match, Connections will not be able to load your JAR file.

    4.  Remove the old JAR file from the webresources directory, and copy your new JAR file into the directory.

        **Optional:** You can also reference custom bundles that are saved to another location outside your customization directory by using a customresources.link file that is saved in your webresources directory. The customresources.link is a text file that specifies a list of additional directories to search. You can specify as many directories as you like in the file, for example:

        ```
        /local/opt/myCustomBundles
        C:\customBundles
        ```

    5.  Restart Common.ear.

    6.  Check your changes by accessing the following URL from your browser.

        You should see the same file that is in the JAR file.

        ```
        http://server/connections/resources/web/new name/readme.txt
        ```


**Parent topic:**[Overriding and extending JavaScript in HCL Connections](../customize/c_customize_javascript.md)

**Related information**  


[Overriding JavaScript in HCL Connections](../customize/t_customize_override_js.md)

