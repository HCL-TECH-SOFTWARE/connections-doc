# Customizing the navigation bar {#t_admin_navbar_create_files .task}

You can edit the files that control the content of the HCL Connections™ navigation bar to add to the bar's functionality. For example, you can add extra links to the navigation bar, remove the **Log Out** link, or insert extra drop-down menus.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  To add a link to the list of links in the navigation bar, for example, a link called HCL software that links to that website, complete the following steps:

    1.  Make a copy of the `header.jsp` file, which defines the content of the main navigation bar. You can access the file from the following directory:

        application\_name.war/nav/templates

        For information about how to find the web application source directories that are packaged with Connections, see [Application WAR files and OSGi bundles](r_customize_war_osgi_file_locations.md).

        The header.jsp file is the same for each application so you only need to make a copy of one of the header.jsp files.

        **Note:** You might want to copy your header changes to the login.jsp and error.jsp files for consistency across your deployment. See [Customizing the login page](t_admin_common_customize_login_screen.md) and [Customizing error page](t_customize_error_page.md) for more information.

    2.  Paste the copy of the `header.jsp` file into the appropriate subdirectory in the customization directory, most likely the common directory. See [Determining where to save your customizations](t_customize_find_custom_directory.md) for more details about customization subdirectories.

        For example, to change the look of the navigation bar in all the applications, copy the file into the following directory: customizationDir/common/nav/templates

    3.  Open the copy of the `header.jsp` file in a text editor and look for the following section:

        ```
        Links to each installed application are displayed here. To add a link to another website, add the following markup: 
           <li>
              <a href="http://mycompany.com/link">My Company Site</a>
           </li>
        to the end of the following <UL>. This section replaces the macro "{{application links: li }}" in the previous version of the header.
        ```

    4.  Add the following HTML code before the closing </ul\> tag:

        ```
        <li><a href="http://www.ibm.com" title="IBM website">IBM website/a></li>
        ```

    5.  After making your updates, save and close the copy of the header.jsp file.

        You do not need to restart the applications to see the links display.

3.  If you want to remove the **Log Out** link from the drop-down menu, for example, when single sign-on is enabled, you can prevent the link from being displayed by editing the logoutContainer element in the user.jsp file:

    1.  Copy the user.jsp file from application\_name.war/nav/templates/menu/ to the following location:

        customizationDir/common/nav/templates/menu/user.jsp

    2.  Modify the following line in the copied file to add a lotusHidden style:

        ```
        --%><td class="lotusNowrap **lotusHidden**" id="logoutContainer"</><%--
        ```

    3.  Save and close the customized user.jsp file.

4.  To add a new drop-down menu, complete the following steps:

    1.  Copy the user.jsp file from application\_name.war/nav/templates/menu/ to the following location:

        customizationDir/common/nav/templates/menu/user.jsp

    2.  Copy one of the existing menu sections and change the "src" attribute to point to an servlet, JSP, or static HTML page containing the markup that you want to use. Be sure to change the ID of the new element to avoid having duplicate IDs on the page.

        For example:

        ```
        <tr role="menuitem">
           <td class="lotusNowrap" id="logoutContainer">
               <a href="http://www.ibm.com">IBM Homepage</a>
           </td>
        </tr>
        ```

    3.  Save and close the customized user.jsp file.

5.  To make changes to **Communities**, **Profiles**, and **Apps** menus, copy or remove code sections to render links in the respective JSP files:

    1.  Copy one of the menu files from the following locations:

        -   **Profiles** menu: application\_name.war/nav/templates/menu/people.jsp
        -   **Communities** menu: application\_name.war/nav/templates/menu/communities.jsp
        -   **Apps** menu: application\_name.war/nav/templates/menu/apps.jsp
    2.  Paste the copied file into the following directory:

        customizationDir/common/nav/templates/menu/

    3.  Open the copied file in a text editor and make your changes.

    4.  Save and close the customized file.

    **Note:** The **Apps** menu is always visible by default. If you remove all the applications that are listed by this menu, you also need to comment out this section in the header.jsp file:

    ```
    <li id="lotusBannerApps" class="<c:if test="${first}">lotusFirst</c:if> <c:if test="${'communities' != appName && 'profiles' != appName && 'homepage' != appName}">lotusSelected</c:if>"><%-- 
                --%><a onmouseover="dojo.require('lconn.core.header');lconn.core.header.menuMouseover(this);" 
                       onclick="dojo.require('lconn.core.header');lconn.core.header.menuClick(this);" 
                       onfocus="dojo.require('lconn.core.header');lconn.core.header.menuFocus(this);" 
                       role="button" 
                       _lconn_menuid="lconnheadermenu-apps"
                       aria-label="<fmt:message key="label.menu.apps.name" />" 
                       src="<lc-cache:uri template="{staticLanguageRoot}/nav/templates/menu/apps.jsp" />"
                       href="javascript:;"
                       errormessage="<fmt:message key="${appName}.error.unavailable.title" />"><%-- 
                    
                    --%><fmt:message key="label.menu.apps.name" /><%-- 
                    --%> <img role="presentation" alt="" src="<lc-ui:blankGif />" class="lotusArrow lotusDropDownSprite"><span class="lotusAltText">&#9660;</span><%--
                    
                 --%></a><%-- 
             --%>
    </li>
    ```

6.  If you enabled customization debugging in step 1, turn off this capability when you are ready to publish your changes. Test whether your changes were added successfully by restarting the applications, and then refreshing the web browser.

    A browser refresh only shows you your changes if you turned on debugging. See [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md) for more details.

7.  See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to update the product version stamp and ensure that your users see the changes the next time that they log in to Connections.


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Customizing the login page](../customize/t_admin_common_customize_login_screen.md)

[Customizing the error page](../customize/t_customize_error_page.md)

[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)

