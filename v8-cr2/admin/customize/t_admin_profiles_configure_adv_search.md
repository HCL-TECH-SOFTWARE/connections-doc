# Configuring Profiles directory search options 

Configure directory search options to specify the fields that can be used when performing a search.

A directory search in Profiles allows the user to search using multiple fields. You can customize the **Search the Directory** form to include custom fields. You can also specify which predefined fields are available on the search form. For example, you might want to prevent an email address field from displaying on the form.

1.  To configure directory search options for Profiles, complete the following steps.
2.  Open the profiles-config.xml file in a text editor.

3.  Locate the `<searchLayout>` section and edit it to specify which fields display on the **Search the Directory** form.

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

        **Note:** For more information about adding custom extension attributes to Profiles, see [Adding custom extension attributes for Profiles](t_admin_profiles_enable_custom_fields.md). For information about how to add custom strings in Profiles, see [Adding custom strings for widgets and other specified scenarios](https://help.hcltechsw.com/connections/v7/admin/customize/t_admin_profiles_add_custom_strings.html) in the 7.0 documentation.

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

**Parent topic:** [Customizing Profiles](../customize/c_admin_profiles_customizing.md)
