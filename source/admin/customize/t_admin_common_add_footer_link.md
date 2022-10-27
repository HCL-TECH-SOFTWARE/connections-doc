# Customizing the footer {#t_admin_common_add_footer_link .task}

You can edit the files that control the content of the HCL Connections™ footer to improve the footer's functionality.

The footer.jsp file defines the content of the footer in HCL Connections. The style used by the footer is defined in the defaultTheme.css file. In addition to defining the style of HCL Connections, this file also sets the font color and background color of the navigation bar and footer.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  Make a copy of the footer.jsp file. You can access the file from the following directory:

    ```
    WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/
    application\_name.ear/application\_name.war/nav/templates
    ```

    Where:

    -   WAS\_HOME is the directory where IBM® WebSphere® Application Server is installed.
    -   profile\_name is the profile where you installed Connections.
    -   cell\_name is the cell where you installed the application.
    -   application\_name.ear is the name of the application EAR file. To customize interface styles that are common to all applications, use the Common.ear file.
    -   application\_name.war is the name of the application WAR file.

        **Tip:** For a list of the web application source directories that are packaged with Connections, see [Application WAR files and OSGi bundles](r_customize_war_osgi_file_locations.md).

    -   version is the version number of the Connections release plus the date and build number of the JAR file.
    The footer.jsp file is the same for each application. You only need to make a copy of one instance of the footer.jsp file.

3.  Paste the copy of the footer.jsp file into the appropriate subdirectory in the customization directory, which is most likely the common directory. See [Determining where to save your customizations](t_customize_find_custom_directory.md) for more details.

    For example, to change the look of the footer in all applications, copy the file into the following directory: customizationDir/common/nav/templates

4.  Open the copied footer.jsp file in an editor, and then determine the section of the footer to which you want to add your link.

    For example, if you want to add a link to your company's help page to the Help section of the footer, find the Help section of the footer by searching for the following HTML markup:

    ```
    The help links.  Points to the end-user help for the current application, and to the public HCL forums for HCL Connections  
    --%><lc-ui:templateLink key="help.help" appname="${appName}"&gt;<fmt:message key="label.footer.help.help" />
       </lc-ui:templateLink><%--
                    --%><li><%--
                       --><a href="<c:out value="http://www-10.lotus.com/ldd/lcforum.nsf" />"><%--
                          --%><fmt:message key="label.footer.help.forums" /><%--
                       --%></a><%--
                    --%></li>
    ```

    Add your company help link to the section by adding the link as an <li\> element to the <td\> block.

    ```
    The help links.  Points to the end-user help for the current application, and to the public IBM forums for HCL Connections
     --%><lc-ui:templateLink key="help.help" appname="${appName}"><fmt:message key="label.footer.help.help" />
       </lc-ui:templateLink><%--
                    --%><li><%--
                       --%><a href="<c:out value="http://www-10.lotus.com/ldd/lcforum.nsf" />"><%--
                          --%><fmt:message key="label.footer.help.forums" /><%--
                       --%></a><%--
                    --%></li>
                   <li>
                      <a href="http://www.mycompany.com/help">My Company Help</a>
                   </li><%-- 
    ```

    You do not need to add the <lc-ui:templateLink\> or <fmt:message\> elements. You can just add your link within a standard <li\> element.

5.  Save and close the `footer.jsp` file.

6.  Restart the applications, and then refresh your web browser to see your changes.

7.  If you enabled custom debugging, turn off the debugging capability when you are ready to publish your changes. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

8.  See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to apply your changes permanently.


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)

