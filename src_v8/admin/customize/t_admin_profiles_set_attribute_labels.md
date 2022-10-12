# Specifying external labels for attributes {#t_admin_profiles_set_attribute_labels .task}

In HCL Connections™, you can apply custom labels stored in an external resource bundle to any attribute, editable attribute, or custom extension attribute.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

When you specify external labels for attributes, editable attributes, or custom extension attributes, the labels are only applied to the user interface element that the configuration object represents. For example, if you apply a custom label to a business card <attribute\> element, the label does not automatically apply to the same element in the advanced search page layout. The label configuration must be applied to each user interface element individually. For information about how to add the custom strings for labels to HCL Connections, see [Adding custom strings for widgets and other specified scenarios](t_admin_profiles_add_custom_strings.md).

1.  To specify external labels for attributes, complete the following steps.
2.  Add an external resource bundle to HCL Connections by following the steps outlined in the topic, [Adding custom strings for widgets and other specified scenarios](t_admin_profiles_add_custom_strings.md).

3.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

4.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   AIX
            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   AIX or Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

5.  Open the profiles-config.xml file using a text editor.

6.  Locate the <attribute\>, <editableAttribute\>, or <extensionAttribute\> element that corresponds to the user interface control to which you want to apply the custom label.

7.  Add the following attributes to the element:

    -   labelkey. Specifies the label to display for the attribute.
    -   bundleIdRef. Specifies the external resource bundle id that contains the label.

        **Note:** The bundleIdRef maps to the bundle prefix that you defined when you registered the resource bundle in the LotusConnections-config.xml file. For more information, see [Adding custom strings for widgets and other specified scenarios](t_admin_profiles_add_custom_strings.md).

    For example:

    ```
    <attribute labelKey="labels.custom.officeName" bundleIdRef="example">officeName</attribute>
    ```

8.  **For <extensionAttibute\> elements only**: If you have defined the field to be a required field, specify an extensionIdRef attribute with a value that corresponds to the value of the field attribute defined in the validation.xml file. See [Specifying a required field](t_admin_profiles_specify_required_field.md) for more details.

9.  Save your changes.

10. After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See [Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md) for information about how to save and apply your changes.


**Related information**  


[Adding custom strings for widgets and other specified scenarios](../customize/t_admin_profiles_add_custom_strings.md)

[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Customizing product strings](../customize/t_customize_strings_global.md)

[Specifying a custom field as required and declaring maximum field length](../customize/t_admin_profiles_specify_required_field.md)

