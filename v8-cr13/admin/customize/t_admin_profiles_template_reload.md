# Configuring template reloading {#t_admin_profiles_template_reload .task}

Edit the profiles-config.xml file to configure template reloading.

When developing your presentation templates, it is useful to see your changes immediately reflected in the user interface without stopping and starting the application. This enables you to make updates to any of the template files, and see the changes immediately in the application without requiring restarts.

**Note:** In a production environment, set this value to 0 so templates are compiled once and performance is optimal.

1.  Open the profiles-config.xml file using a text editor.

2.  Locate the `<templateReloading/>` element

3.  Edit the value to define how frequently \(in seconds\) the template processor should look for updates to the templates on disk.

4.  Save your changes.

5.  Check in the configuration update.

6.  Restart the application.


**Parent topic:**[Template configuration options](../customize/c_admin_template_config.md)

