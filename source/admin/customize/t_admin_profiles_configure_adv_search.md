# Configuring Profiles directory search options {#t_admin_profiles_configure_adv_search .task}

Configure directory search options to specify the fields that can be used when performing a search.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

A directory search in Profiles allows the user to search using multiple fields. You can customize the **Search the Directory** form to include custom fields. You can also specify which predefined fields are available on the search form. For example, you might want to prevent an email address field from displaying on the form.

1.  To configure directory search options for Profiles, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

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

4.  Open the profiles-config.xml file in a text editor.

5.  Locate the `<searchLayout>` section and edit it to specify which fields display on the **Search the Directory** form.

    -   To enable a predefined attribute for search, include the following line for each attribute that you want to include:

        ```
        <attribute showLabel="true">attribute\_name</attribute>
        ```

        For a complete list of the predefined attributes that can be included in the **Search the Directory** form, see [Profiles directory search attributes](r_admin_profiles_attributes_ext.md).

    -   To enable a custom extension attribute for search, include the following line for each custom attribute that you want to include:

        ```
        <extensionAttribute showLabel="true" labelKey="label.custom.attribute\_id" bundleIdRef="bundle\_name" extensionIdRef="attribute\_id"/>
        ```

        Use the optional hideOnSearchUIForm attribute to control whether the custom field displays in the **Search the Directory** form. When this property is set to true, the custom field does not display in the user interface. For example:

        ```
        <extensionAttribute showLabel="false" hideOnSearchUIForm="true" extensionIdRef="schoolName" />
        ```

        In the preceding example, the `schoolName` custom extension attribute is hidden in the directory search user interface, but because the attribute is enabled for search, the following URL can be used to find the result:

        ```
        http://yourco.com/profiles/html/advancedSearch.do?keyword=&displayName=&preferredFirstName=Joseph&preferredLastName=&profileTags=&jobResp=&experience=&background=&organizationTitle=&workLocation%24city=&workLocation%24state=&countryDisplayValue=&email=&telephoneNumber=&extattr%24schoolName=yourschool&lang=en_us
        ```

        **Note:** For more information about adding custom extension attributes to Profiles, see [Adding custom extension attributes for Profiles](t_admin_profiles_enable_custom_fields.md). For information about how to add custom strings in Profiles, see [Adding custom strings for widgets and other specified scenarios](t_admin_profiles_add_custom_strings.md).

    For example:

    ```
    <searchLayout>
       <attribute showLabel="true">displayName</attribute>
       <attribute showLabel="false">preferredFirstName</attribute>
       <attribute showLabel="false">preferredLastName</attribute>
       <attribute showLabel="true">profileTags</attribute>
       <attribute showLabel="true">jobResp</attribute>
       <attribute showLabel="false">departmentTitle</attribute>
       <attribute showLabel="false">experience</attribute>
       <attribute showLabel="false">background</attribute>
       <attribute showLabel="true">organizationTitle</attribute>
       <attribute showLabel="false">workLocation.city</attribute>
       <attribute showLabel="false">workLocation.state</attribute>
       <attribute showLabel="false">countryDisplayValue</attribute>
       <attribute showLabel="false">email</attribute>
       <attribute showLabel="false">telephoneNumber</attribute>
       <extensionAttribute showLabel="true" labelKey="label.custom.schoolName" bundleIdRef="education" extensionIdRef="schoolName"/>
    </searchLayout>
    ```


**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Adding custom extension attributes for Profiles](../customize/c_admin_profiles_add_custom_field.md)

