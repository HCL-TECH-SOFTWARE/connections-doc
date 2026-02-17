# Configuring template custom resource bundles for processing {#t_admin_profiles_template_crbundles .task}

Edit the profiles-config.xml file to configure template custom resource bundles.

To take advantage of custom resource bundles in your templates, register the bundles with the application to specify that they be included during template processing. The specified bundles will be provided as input to all the templates that are processed.

1.  Open the profiles-config.xml file using a text editor.

2.  Locate the `<templateNlsBundles/>` element

3.  Edit the value with a space-delimited set of bundle identifiers for the custom resource bundles to make available in your FreeMarker Template Language \(FTL\) templates. The bundle identifier maps to the bundle prefix that you defined when you registered the resource bundle in the LotusConnections-config.xml file.

4.  Save your changes.

5.  Check in the configuration update.

6.  Restart the application.


**Parent topic:**[Template configuration options](../customize/c_admin_template_config.md)

**Related information**  


[Creating a simple profile data model and template customization](../customize/t_admin_profiles_custom_example.md)

