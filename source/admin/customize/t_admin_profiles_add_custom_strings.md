# Adding custom strings for widgets and other specified scenarios {#t_admin_profiles_add_custom_strings .task}

You can add custom strings or modify existing strings when performing certain HCL Connections™ tasks.

When adding custom strings, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

HCL Connections provides a external resource bundle loader for adding and updating strings to Profiles, Communities, and the Home page. You can only use this process when performing the following tasks:

-   Adding custom extension attributes to profiles
-   Customizing the Profiles business card
-   Adding custom widgets to Communities, Profiles, and the Home page
-   Configuring the vCard export application
-   Renaming the tabs in the Home page
-   Adding custom themes to Communities

You can add custom strings for other tasks using the procedure outlined in [Customizing product strings](t_customize_strings_global.md).

To add custom strings for the listed tasks, create a bundle containing the custom strings and save it in the customization\_dir/strings directory that is created at installation time. You then register the file in the LotusConnections-config.xml file. For performance reasons, include all the resource strings in a single bundle.

For a complete example, see [Creating a simple profile data model and template customization](t_admin_profiles_custom_example.md).

1.  Create a properties file containing the strings that you want to add in the customization\_dir/strings directory.

    -   To specify the name of the default properties file, use the following syntax: resource\_bundle\_name.properties\_file\_name
    -   To specify custom strings in multiple languages, append an underscore followed by the appropriate language code to the resource bundle name using the following syntax: resource\_bundle\_name\_language\_code.properties\_file\_name
    For example, if your string bundle is named com.example.resources, you might create a file in the strings directory that looks like the following:customization\_dir/strings/com.example.resources.properties This file contains the strings used for the default locale. When there is no specific bundle for the user's locale, the labels in this default properties file are used.

    To include an English version of the strings, you might create the following file: <customization\_dir\>/strings/com.example.resources\_en.properties

    And to include a Slovakian version of the strings, you might include the following file:customization\_dir/strings/com.example.resources\_sk.properties

    The following sample string is contained in the properties file.

    ```
    label.vcard.encoding.cp943c=Japanese Encoding
    ```

2.  Register the resource bundle in the LotusConnections-config.xml file:

    1.  Open a command window and start the wsadmin command-line tool as described in the topic, [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md).

    2.  Enter the following command to access the Connections configuration file:

        execfile\("$WAS\_HOME/profiles/DMGR/config/bin\_lc\_admin/connectionsConfig.py"\)

    3.  Enter the following command to check out the Connections configuration file:

        LCConfigService.checkOutConfig\(working\_directory, cell\_name\) where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.
        -   cell\_name is the name of the IBM® WebSphere® Application Server cell hosting the Connections application. This argument is required. It is also case-sensitive, so type it with care.
        For example:

        ```
        LCConfigService.checkOutConfig("/temp", "foo01Cell01")
        ```

    4.  From the temporary directory to which you just checked out the Connections configuration files, open the LotusConnections-config.xml file in a text editor.

    5.  Add the following line of code into the <resources\> element block to register the resource bundle:

        ```
        <widgetBundle prefix=bundle\_prefix name=bundle\_name />
        ```

        where

        -   bundle\_prefix is a globally unique name that identifies the bundle. This is a string value. The bundle prefix is used to uniquely scope the keys in each bundle. The prefix must be unique across all registered widget bundles.

            This bundle prefix maps to the bundle ID reference that you specify when you define a custom resource attribute or widget. For more information about defining custom resource attributes, see [Enabling custom extension attributes for Profiles](t_admin_profiles_enable_custom_fields.md). For information about defining custom widgets, see [Enabling custom widgets for Communities](../install/in_deploy_custom_widgets_communities.md) or [Enabling custom widgets for Profiles](../admin/t_admin_profiles_develop_custom_widgets.md).

        -   bundle\_name is the Java™ package name. This parameter takes a string value. When you name the resource bundle, the elements in the bundle name must correspond to the file name of the properties file that you created in step 1.

            For example, if the strings customization directory contains the files com.example.resources.properties, com.example.resources\_en.properties, and com.example.resources\_sk.properties, the name of the bundle is com.example.resources.

        The following sample code is used to register the com.example.resources bundle:

        ```
        <resources>
        
          <!--  Example:  The attribute 'prefix' must be globally unique as it identifies the bundle when used in HCL Connections.  -->
        
          <widgetBundle prefix="example" name="com.example.resources"/>
        
        </resources>
        ```

    6.  Save your changes to the LotusConnections-config.xml file.

    7.  To check in the updated file, use the following command:

        LCConfigService.checkInConfig\(\)

    8.  To exit the wsadmin client, type exit at the prompt.


After completing this procedure, you can use the labels in other configuration settings or in your JavaScript™ code. For example, you can use the strings when customizing the business card in Profiles \(to add labels for custom extension attributes\) and adding widgets to Profiles, Communities, and the Home page \(to provide widget titles and descriptions\). You can also use the strings to rename the **Updates**, **Widgets**, and **Administration** tabs in the Home page.

Note that when you specify external labels for attributes, editable attributes, or custom extension attributes, the labels are only applied to the user interface element that the configuration object represents. For example, if you apply a custom label to a business card <attribute\> element, the label does not automatically apply to the same element in the advanced search page layout.

For information about how to apply the label configuration to each user interface element individually, see [Adding custom strings for widgets and other specified scenarios](t_admin_profiles_add_custom_strings.md).

**Parent topic:**[Customizing product strings](../customize/t_customize_strings_global.md)

**Related information**  


[Configuring the vCard export application for Profiles](../admin/t_admin_profiles_config_vcard_export.md)

[Specifying external labels for attributes](../customize/t_admin_profiles_set_attribute_labels.md)

[Creating a simple profile data model and template customization](../customize/t_admin_profiles_custom_example.md)

[Enabling custom extension attributes for Profiles](../customize/t_admin_profiles_enable_custom_fields.md)

[Enabling custom widgets for Communities](../admin/t_admin_communities_develop_custom_widgets.md)

[Enabling custom widgets for Profiles](../admin/t_admin_profiles_develop_custom_widgets.md)

[Customizing the Profiles business card](../customize/c_admin_profiles_customize_biz_card_links.md)

