# Configuring active content filters \(whitelists\) {#sec_acf_whitelist_config .task}

HCL Connections™ provides a set of active content filter \(ACF\) configuration files that you can apply to component applications to allow users to contribute only accepted types of content.

This is not a required procedure. Only perform this if you want to change the level of filtering performed by the active content filter.

By default, all of the Connections applications that use whitelisting allow content with a wide range of HTML tagging to be uploaded. Exceptions include scripts \(for example, JavaScript\), Flash animations, and certain types of styling. You can refine the whitelist by applying predefined rule sets in a copy of the ojhs-whitelist-default.xml file.

1.  Copy the `ojhs-whitelist-default.xml` file and modify it for your update.

    1.  Locate the `ojhs-whitelist-default.xml` file and make a copy of it with a slightly different name.

        For example, add a brief description of the update to the new file's name, as in: `ojhs-whitelist-update\_description.xml`

    2.  Edit the new file and modify it using the rules described in the topics within this section.

    3.  Save and close the file.

2.  Now modify the `acp-configkey__default.xml` file to reference the new whitelist XML \(the `ojhs-whitelist-update_description.xml` file\).

    1.  Locate the `acp-configkey__default.xml` file and make a copy of it with a slightly different name.

        For example, add a brief description that matches the updated rules file name: `acp-configkey__update_description.xml`.

    2.  In the file, update the `defaultKey` setting to reference the update\_description part of the ojhs-whitelist-update\_description.xml file name.

        For example, if you renamed the file to ojhs-whitelist-pilot.xml in step 1, use "pilot" as the `defaultKey` value:

        ```bash
         <param value="defaultKey=pilot"/>
        ```

    3.  Save and close the file.

3.  Modify the LotusConnectionsConfig.xml file so that its `sloc` entry `acf_config_file` points to the new acp-configkey\_\_update\_description.xml file.

    To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

    !!! important
        
        Be sure to leave the wsadmin session open so you can check in the updated file.

    1.  Enter the following command to load the HCL Connections configuration file: `execfile("connectionsConfig.py")`

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   `working_directory` is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            !!! note

                -  When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
                -  Linux® only: The directory must grant write permissions or the command fails.

        -   `cell_name` is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            !!! note
                
                This input parameter is case-sensitive.

    3.  Open the `LotusConnections-config.xml` file in a text editor.

    4.  Find the `<sloc:serviceReference>` element for the application for which you want to change filtering levels. The application name is specified in the `serviceName` attribute.

    5.  Add the `acp-configkey__default-update_description.xml` file name to the `acf_config_file=` element as shown in the following example.

        ```bash
        <sloc:serviceReference 
         bootstrapHost="myServer.example.com" 
         bootstrapPort="2817" 
         clusterName="" 
         enabled="true" 
         serviceName="blogs" 
         ssl_enabled="true" 
         **acf\_config\_file="acp-configkey\_\_pilot.xml"\>**
          <sloc:href>
            <sloc:hrefPathPrefix>/blogs</sloc:hrefPathPrefix>
            <sloc:static 
             href="http://enterprise.example.com:9082" 
             ssl_href="https://enterprise.example.com:9447"/>
            <sloc:interService href="https://enterprise.example.com:9447"/>
          </sloc:href>
        </sloc:serviceReference>
        ```

    6.  Save and close the `LotusConnections-config.xml`file.

    7.  After making changes, you must check the configuration files back in during the same wsadmin session in which you checked them out. See [Applying common configuration property changes](../admin/t_admin_common_save_changes.md) for information about how to save and apply your changes.

4.  Synchronize the nodes using the Integrated Solutions Console for the network deployment system.

5.  Restart the WebSphere Application Server.


-   **[URL protocol rules \(whitelists\)](../secure/sec_acf_whitelist_url.md)**  
Whitelist active content for HCL Connections based on the protocol specified within URLs.
-   **[Element and attribute rules \(whitelists\)](../secure/sec_acf_whitelist_element.md)**  
Whitelist active content for HCL Connections based on elements and attributes used in the HTML source.
-   **[Styling rules \(whitelists\)](../secure/sec_acf_whitelist_styling.md)**  
Whitelist active content for HCL Connections based on style-sheet usage in the HTML source.

**Parent topic:**[Active content filters \(whitelists\)](../secure/sec_acf_whitelist_intro.md)

