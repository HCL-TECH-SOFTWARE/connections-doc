# Adding custom extension attributes for Profiles {#c_admin_profiles_add_custom_field .concept}

You can customize the Profiles application by adding custom extension attributes.

The Profiles application provides a set of default attributes. Because every organization's directory structure is unique, the Profiles application also provides the ability to add additional custom extension attributes. For example, you might want to add an extra attribute for your organization that allows employees to specify their mentor. You can extend the application with an unlimited number of custom extension attributes.

You can also add simple string extension attributes by including additional lines in the profiles-config.xml file, as illustrated in the [Specifying a custom field as required and declaring maximum field length](t_admin_profiles_specify_required_field.md) topic.

**Note:** It is not necessary to populate the values of the newly-added custom extension attributes using the Profiles IBM® Tivoli® Directory Integrator \(TDI\) Solution scripts that are provided. The values can be manually entered into the database using the **Edit My Profile** page in the user interface. Storing these values in the LDAP directory and populating the values using Tivoli Directory Integrator Solution scripts is optional.

**Related information**  


[Customizing display using templates](../customize/t_admin_profiles_customize_biz_card_main.md)

[Configuring Profiles directory search options](../customize/t_admin_profiles_configure_adv_search.md)

[Customizing search results information](../customize/t_admin_profiles_tbl_search.md)

