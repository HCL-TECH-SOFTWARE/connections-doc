# Customizing the error page {#t_customize_error_page .task}

Customize the text on the error page in HCL Connections™.

You can change the text that is displayed on the HCL Connections error page to more closely reflect what users should do when they run into a problem. For example, you might want to replace the phrase "Contact your administrator" with details about who to contact, including an email address or other contact information.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  Copy the error.jsp file from the WAR file of one of the applications. You can access the file from the following directory:

    WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/application\_name.ear/application\_name.war/nav/templates

    Where:

    -   WAS\_HOME is the directory where IBM® WebSphere® Application Server is installed.
    -   profile\_name is the profile where you installed Connections.
    -   cell\_name is the cell where you installed the application.
    -   application\_name.ear is the name of the application EAR file. To customize interface styles that are common to all applications, use the Common.ear file.
    -   application\_name.war is the name of the application WAR file.

        **Tip:** For a list of the web application source directories that are packaged with Connections, see [Application WAR files and OSGi bundles](r_customize_war_osgi_file_locations.md).

    -   version is the version number of the Connections release plus the date and build number of the JAR file.
    The error.jsp file is the same for each application. You only need to make a copy of one instance of the file.

3.  Paste the file into the appropriate subdirectory in the customization directory, which is most likely the common directory. See [Determining where to save your customizations](t_customize_find_custom_directory.md) for more details.

    For example, to use the same error page in all the applications, copy the file into the following directory:

    ```
    customizationDir/common/nav/templates
    ```

    If you want to create an application-specific error page, copy the file into the following directory:

    ```
    customizationDir/application\_name/nav/templates
    ```

4.  Open the copied error.jsp file in an editor and make your changes.

    For example, you might want to change the generic text in the message that says "Contact your administrator" to provide a more meaningful message for your organization, such as "Add a ticket in the Acme IT Support Database <link\>" or “Copy the following error information and email it to lcadmin@mycompany.com." To do so, look for the following block of HTML:

    ```
    <p id="lconnErrorDetails" style="display:none;" class="lconnErrorDetails">
      <label for="lconnErrorText">
       <fmt:message key="error.details.info" />
      </label>
      <textarea id="lconnErrorText" readonly="readonly" class="lotusText" wrap="off">
      </textarea>
    </p>
    ```

    Replace the <fmt:message\> element with the text that you want to have displayed in the message box. For example:

    ```
    <p id="lconnErrorDetails" style="display:none;" class="lconnErrorDetails">
      <label for="lconnErrorText">
       Copy the following error information and email it to 
        <a href="mailto:lcadmin@mycompany.com">lcadmin@mycompany.com</a>.
      </label>
      <textarea id="lconnErrorText" readonly="readonly" class="lotusText" wrap="off">
      </textarea>
    </p>
    ```

5.  Save and close the error.jsp file.

6.  To test your changes, refresh the web browser, and then perform an action that will generate an error message.

7.  If you enabled custom debugging, turn off the debugging capability when you are ready to publish your changes. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

8.  See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to apply your changes permanently.


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)

