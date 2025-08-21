# Customizing strings sourced in JavaScript 

Replace a word or string in the product user interface that is hardcoded in JavaScript™ rather than sourced from a strings resource bundle.

Many strings in the HCL Connections™ user interface are represented by key and value pairs defined in the JavaScript files stored in the application JAR files. To customize these strings, locate the relevant JavaScript source file, copy it to the corresponding subdirectory in the customization directory, and overwrite the desired  key and value pair in the copied file with your custom text.

**Notes:**

-   You cannot use the customization debugging capability to test edited strings.
-   Follow the steps outlined here when you want to update the text in the JavaScript files in your deployment. <!--When you want to change the functionality of the JavaScript code, follow the procedure covered in the topic, [Overriding JavaScript in HCL Connections](t_customize_override_js.md).-->
<!---   To use the external resource bundle loader for adding and updating strings in the user interface, see [Adding custom strings for widgets and other specified scenarios](t_admin_profiles_add_custom_strings.md).-->

1.  Locate the JavaScript source file for the application that you want to customize, based on the information in the topic, [JavaScript resource strings](r_customize_js_files.md).

2.  Determine the base directory where your customizations should go.

    For more information, see [Determining where to save your customizations](t_customize_find_custom_directory.md).

3.  Copy the file you want to customize into the appropriate subdirectory of the customization root directory.

    For information about where to place your customizations, see [JavaScript resource strings](r_customize_js_files.md).

    For example, for Activities, save the customized JavaScript file in the following location: customizationDir/javascript/lconn/act/nls/strings.js

   For locale-specific strings, create a folder in the ``customizationDir/javascript/lconn/act/nls`` directory named after the appropriate language code, and save the JavaScript file in that folder. For example, to provide German strings for Activities, save the customized file at: ``customizationDir/javascript/lconn/act/nls/de/strings.js``.

    For a full list of the language codes supported by Connections, see [Language codes](r_customize_lang_codes.md).

4.  Open the copied JavaScript file for editing. Find the key and value pair that you want to overwrite, and replace the value with your custom text.

5.  Repeat the previous step until you have replaced all of the strings that you want to change.

6.  Remove any key and value pairs that you did not edit. Those will be read from the version of the JavaScript file in the application's product directory.

7.  Save and close the JavaScript file.

8.  Using the WebSphere® Application Server Integrated Solutions Console, restart the application associated with the file that you have changed.

9.  Test your changes by clearing your browser cache, and then refreshing the browser.

10. See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to apply your changes permanently.


-   **[JavaScript resource strings](../../admin/customize/r_customize_js_files.md)**  
Use the information in the tables to help you find the customizable strings that are sourced in JavaScript files and to determine where to save the customized JavaScript files.

**Parent topic:**[Customizing product strings](../../admin/customize/t_customize_strings_global.md)

**Related information**  


[Determining where to save your customizations](../../admin/customize/t_customize_find_custom_directory.md)

[Post-customization step](../../admin/customize/t_admin_common_customize_postreq.md)

<!-- [Overriding JavaScript in HCL Connections](../../admin/customize/t_customize_override_js.md)-->

<!-- [Adding custom strings for widgets and other specified scenarios](../../admin/customize/t_admin_profiles_add_custom_strings.md)-->

[Language codes](../../admin/customize/r_customize_lang_codes.md)

[Property file strings](../../admin/customize/r_customize_properties_files.md)
