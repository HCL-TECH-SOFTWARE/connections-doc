# Configuring the active content filter for Activities, Communities, and Bookmarks {#t_sec_change_acf_config_ckeditor .task}

HCL Connections™ provides a set of active content filter \(ACF\) configuration files that you can apply to the Activities, Communities, or Bookmarks applications to limit or widen the types of content that users can add to their entries.

This is not a required procedure. Only perform this if you want to change the level of filtering performed by the active content filter.

All of the applications, except Blogs, Wikis, and Forums, use the default acf-config.xml file, which filters active content in the following ways:

-   You can change the formatting of content within rich text fields, but styles cannot be added to entries using HTML.
-   Javascript is stripped from all entries.
-   Flash animations are not permitted.

The following configuration files are shipped with Connections and stored in the LotusConnections-config\\extern directory. To change the level of filtering that is performed by the active content filter, you can replace the default configuration file with one of these files:

acf-config-nf.xml
:   Allows style changes, but strips forms and flash. The types of forms that are not allowed are form HTML elements. Form HTML elements are used to add things like buttons or fields to a web page.

acf-config-nf-ns.xml
:   Prevents style changes and strips forms and flash.

acf-config-nm.xml
:   Prevents users from changing the margins on images. By default, these applications permit image margin changes.

acf-config-ns.xml
:   Allows forms, but strips style changes and flash. Preventing style changes affects rich text fields. If you configure the active content filter to prevent style changes, then users will not be able to perform the common tasks associated with changing the style of rich text content, such as changing the font color, margins, and so on.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

1.  Edit the LotusConnections-config.xml file.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
            -   Linux® only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

    3.  Open the LotusConnections-config.xml file in a text editor.

    4.  Find the `<sloc:serviceReference>` element for the application to which you want to change filtering levels. The application name is specified in the serviceName attribute.

        Change the active content filter configuration for the applications with the following serviceName attributes:

        -   Activities
        -   Communities
        -   Bookmarks
    5.  Add the following attribute to the `<sloc:serviceReference>` element for the application you want to change:

        For example:

        ```
        acf_config_file="file\_name"
        ```

        where `file\_name` is one of the configuration files \(acf-config-nf.xml, acf-config-nf-ns.xml, acf-config-nm.xml, or acf-config-ns.xml\).

        For example, to configure the Activities application to prevent image margin changes, you could add the following `acf_config_file` element:

        ```
        <sloc:serviceReference 
         bootstrapHost="myServer.example.com" 
         bootstrapPort="2817" 
         clusterName="" 
         enabled="true" 
         **serviceName="activities"** 
         ssl_enabled="true" 
        ** acf\_config\_file="acf-config-nm.xml"\>**
          <sloc:href>
            <sloc:hrefPathPrefix>/blogs</sloc:hrefPathPrefix>
            <sloc:static 
             href="http://enterprise.example.com:9082" 
             ssl_href="https://enterprise.example.com:9447"/>
            <sloc:interService href="https://enterprise.example.com:9447"/>
          </sloc:href>
        </sloc:serviceReference>
        ```

    6.  Repeat Steps d and e to apply different filtering levels to different applications, and then save and close the configuration file.

    7.  After making changes, you must check the configuration file back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See [Applying common configuration property changes](../admin/t_admin_common_changing_config.md) for information about how to save and apply your changes.

2.  Synchronize the nodes using the Integrated Solutions Console for the network deployment system.

3.  Restart the WebSphere Application Server.


**Related information**  


[Administering Communities](../admin/c_admin_communities_intro.md)

[Administering Forums](../admin/c_admin_forums_overview.md)

[Common configuration properties](../admin/r_admin_common_props.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

