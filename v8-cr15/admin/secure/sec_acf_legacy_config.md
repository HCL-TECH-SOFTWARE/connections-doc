# Configuring legacy active content filters \(legacy ACF\) {#sec_acf_legacy_config .task}

HCL Connections™ legacy active content filtering \(legacy ACF\) uses rules that allow you to block specific content \(a blacklist mechanism\). Although the new mechanism to whitelist allowed active content \(introduced in V6.0 CR1\) is considered to be more secure, you can still use the legacy mechanism to blacklist content.

This is not a required procedure. Only perform this if you want to change the level of filtering performed by the active content filter.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

The active content filtering configuration files are shipped with Connections and are stored in the LotusConnections-config\\extern directory. To change the level of filtering that is performed by the active content filter, replace the default configuration file with one of the configuration files.

Default legacy ACF processing for Activities, Communities and Bookmarks

Blogs, Wikis, and Forums legacy ACF processing automatically filters active content in the following ways:

-   JavaScript coding is stripped from all posts and pages.
-   Content formatting is allowed within rich text fields, and HTML styles can be added.
-   Flash animations are permitted.

You can use the following configuration files to filter, or blacklist, content for Blogs, Wikis, and Forums:

`acf-config-nf.xml`
:   Allows style changes, but strips forms and Flash animations. The types of forms that are not allowed are form HTML elements. Form HTML elements are used to add things like buttons or fields to a web page.

`acf-config-nf-ns.xml`
:   Prevents style changes and strips forms and Flash animations.

`acf-config-nm.xml`
:   Prevents users from changing the margins on images. By default, these applications permit image margin changes.

`acf-config-ns.xml`
:   Allows forms, but strips style changes and Flash animations. Preventing style changes affects rich text fields. If you configure the active content filter to prevent style changes, then users will not be able to perform the common tasks associated with changing the style of rich text content, such as changing the font color, margins, and so on.

Default legacy ACF processing for Activities, Communities and Bookmarks

The Activities, Communities, and Bookmarks applications use the default acf-config.xml file to filter active content in the following ways:

-   Content formatting is allowed within rich text fields, but HTML styles cannot be added.
-   JavaScript coding is stripped from all entries.
-   Flash animations are not permitted.

You can use the following configuration files to filter, or blacklist, content for Activities, Communities, and Bookmarks:

`acf-config.xml`
:   Allows style changes, allows forms, but removes Flash animations.

`acf-config-nf.xml`
:   Allows style changes, but strips forms and removes Flash animations. The types of forms that are not allowed are form HTML elements. Form HTML elements are used to add things like buttons or fields to a web page.

`acf-config-ns.xml`
:   Allows forms, but strips style changes and removes Flash animations. Preventing style changes affects rich text fields. If you configure the active content filter to prevent style changes, then users will not be able to perform the common tasks associated with changing the style of rich text content, such as changing the font color, margins, and so on.

`acf-config-nf-ns.xml`
:   Prevents style changes and strips forms and removes Flash animations.

`acf-config-flash.xml`
:   Allows style changes, allows forms, and allows Flash animations.

`acf-config-nf-flash.xml`
:   Allows style changes and Flash animations, but strips forms. This file is the default file used by Blogs, Wikis, and Forums.

`acf-config-ns-flash.xml`
:   Allows forms and Flash animations, but strips style changes.

`acf-config-nf-ns-flash.xml`
:   Allows Flash animations, but strips style changes and forms.

`acf-config-nm.xml`
:   Prevents users from changing the margins on images and strips Flash animations.

`acf-config-nm-flash.xml`
:   Allows Flash animations, but prevents users from changing the margins on images.

!!! note 
    
    Allowing the script tag does not allow JavaScript to be run within the rich text editors. Because of the security implications of allowing users to run any JavaScript, the editors include configuration to strip in JavaScript content upon save.

1.  Edit the LotusConnections-config.xml file.

    !!! important 
        
        Leave the wsadmin session open so you can check in the updated file.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

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

    3.  Open the LotusConnections-config.xml file in a text editor.

    4.  Find the `<sloc:serviceReference>` element for the application to which you want to change filtering levels. The application name is specified in the `serviceName` attribute.

    5.  Add the following attribute to the `<sloc:serviceReference>` element for the application you want to change:

        For example:

        ```bash
        acf_config_file="file\_name"
        ```

        where `file\_name` is one of the configuration files described earlier.

        For example, to configure the Blogs application to allow style changes, but strip forms and Flash animations, add the `acf_config_file` element:

        ```bash
        <sloc:serviceReference 
         bootstrapHost="myServer.example.com" 
         bootstrapPort="2817" 
         clusterName="" 
         enabled="true" 
         **serviceName="blogs"** 
         ssl_enabled="true" 
         **acf\_config\_file="acf-config-nf.xml"\>**
          <sloc:href>
            <sloc:hrefPathPrefix>/blogs</sloc:hrefPathPrefix>
            <sloc:static 
             href="http://enterprise.example.com:9082" 
             ssl_href="https://enterprise.example.com:9447"/>
            <sloc:interService href="https://enterprise.example.com:9447"/>
          </sloc:href>
        </sloc:serviceReference>
        ```

    6.  Repeat substeps d and e to apply different filtering levels to different applications, and then save and close the configuration file.

    7.  After making changes, you must check the configuration files back in during the same wsadmin session in which you checked them out. See [Applying common configuration property changes](../admin/t_admin_common_save_changes.md) for information about how to save and apply your changes.

2.  Synchronize the nodes using the Integrated Solutions Console for the network deployment system.

3.  Restart the WebSphere Application Server.


**Parent topic:** [Securing applications from malicious attack](../secure/c_admin_security_xss.md)

