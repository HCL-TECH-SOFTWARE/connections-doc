# Specifying different system users for widget life-cycle events {#t_admin_communities_configure_j2c .task}

Specify a system user to manage widget life-cycle events that overrides the default authentication alias created at installation time.

To edit the widgets-config.xml file in step 2, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

When you install HCL Connections, the installation wizard automatically creates an authentication alias named connectionsAdmin alias that holds the user ID and password for the system user that is used for every event posting in HCL Connections. You can override this alias to specify different system users to manage widget life-cycle events for Communities.

Widget life-cycle events are used to notify widget content providers of changes in the community that contains the widget. For example, if a community owner adds the Blog widget to a community, whenever changes are made to the community, widget life-cycle events notify the Blogs application of those changes.

To specify a different system user for widget life-cycle POSTs, you must first create a J2C authentication alias and then update the widgets-config.xml file to use this new alias. After performing these tasks, you need to map the user in the aliases to the widget-admin role.

1.  To create an J2C authentication alias for Communities, complete the following steps:

    1.  From the IBM WebSphere Application Server Integrated Solutions Console, expand **Security**, and then select **Global security**.

    2.  In the **Authentication** area, expand **Java Authentication and Authorization Service**, and click **J2C authentication data**.

    3.  Click **New**.

    4.  Enter an alias name, user ID, and password.

        For clarity, use an alias name that follows the syntax `widgetservice nameAlias,` where service name is the name of the application for which you want to create the alias.

        For example, widgetBlogsAlias.

    5.  Click **OK**.

    6.  Repeat steps [1.c](#substepc)- [1.e](#substepe) for each application for which you want to define a new alias.

    7.  Click **Save**, and then click **Save** again.

2.  Update the widgets-config.xml file to use the new alias.

    1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
        ```

        where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

        You must start the client from this directory or subsequent commands that you enter do not execute correctly.

    2.  Start the Communities Jython script interpreter using the following command:

        ```
        execfile("communitiesAdmin.py")
        ```

        If you are asked to select a server, you can select any server.

    3.  Check out the widgets-config.xml file using the following command:

        CommunitiesConfigService.checkOutWidgetsConfig\(“working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.
        -   cell\_name is the name of the WebSphere Application Server cell hosting the Communities application. This argument is required. It is also case-sensitive, so type it with care.
        For example:

        ```
        CommunitiesConfigService.checkOutWidgetsConfig("C:\\tmp2","JRDESKTOP1Node01Cell")
        ```

    4.  Navigate to the temporary directory where you saved the widgets-config.xml file, and open the file in a text editor.

    5.  Change the remoteHandlerAuthenticationAlias attribute in the life-cycle element for the widgetDef \(widget definition\) corresponding to the application that is to be changed. Be sure to include the full name of the alias, which is likely to include a nodename prefix.

        For example:

        ```
        <widgetDef defId="Blog" requires="blogs" modes="view edit search" url="{contextRoot}/blogs/blogsWidget.jsp?version={version}"
                        navBarLink="{blogsSvcRef}/{resourceId}" description="blogsDescription" uniqueInstance="true"
                        helpLink="{contextRoot}/help/doc/{lang}/community_blog_frame.html">
                        <itemSet>
                         <item name="communitiesBaseUrl" value="{communitiesSvcRef}" />
                            <item name="blogsBaseUrl" value="{blogsSvcRef}" />
                            <item name="profilesBaseUrl" value="{profilesSvcRef}" />
                            <item name="atomFeedUrl" value="{blogsSvcRef}/atom/blogs?commUuid={resourceId}" />
             <item name="atomPubUrl" value="{blogsSvcRef}/api/blogs?commUuid={resourceId}" />
             <item name="searchUrl" value="{blogsSvcRef}/atom?search={searchTerm}&amp;commUuid={resourceId}&amp;ps=5&amp;page=0&amp;sortby=0&amp;order=desc&amp;lang=en" />
                        </itemSet>
                        
                        <lifecycle remoteHandlerURL="{blogsInterSvcRef}/roller-ui/BlogsWidgetEventHandler.do" 
                         remoteHandlerAuthenticationAlias="widgetBlogsAlias">
               <event>remote.app.added</event> 
               <event>remote.app.removed</event> 
               <event>community.visibility.changed</event> 
               <event>community.prepare.delete</event> 
               <event>remote.app.transfer</event>
              </lifecycle>                              
                      </widgetDef>
        ```

    6.  Repeat step [2.e](#substep2b) for each application that has a new alias.

    7.  Apply your changes by doing the following:

        1.  Check in the updated widgets-config.xml file using the following command:

            CommunitiesConfigService.checkInWidgetsConfig\(“working\_directory", "cell\_name"\)

            For example:

            ```
            CommunitiesConfigService.checkInWidgetsConfig("C:\\tmp2","JRDESKTOP1Node01Cell")
            ```

        2.  To exit the wsadmin client, type exit at the prompt.
        3.  Restart the Communities application using the WebSphere Application Server Integrated Solutions Console.
3.  Map the user in the alias to the widget-admin role.

    **Note:** Note that for Activities, the user mapped to the widget-admin role must also be mapped to the person role. For more information, see *Roles*.

    1.  From the WebSphere Application Server Integrated Solutions Console, select **Applications** \> **Application types**, select **WebSphere enterprise applications**, and then select the application that you want to configure.

    2.  Click **Security role to user/group mapping** in the **Detail Properties** area.

    3.  Locate the widget-admin role in the **Role** column, and then click **Look up users** to look up a user or **Look up groups** to look up a group.

    4.  In the **Search String** field, type the name of the person or group that you want to assign to this role and click **Search**. If the user or group exists in the LDAP directory, it is returned and displayed in the **Available** list.

    5.  Select the user or group name from the **Available** list, and then move it into the **Selected** column by clicking the arrow.

    6.  Repeat steps [3.d](#substep3d) and [3.e](#substep3e) to add additional people or groups.

    7.  Repeat steps [3.c](#substep3c) through [3.f](#substep3f) to define access levels and assign people to any other aliases that you created.

    8.  Click **OK**.

    9.  From the Enterprise Applications \> <application\> \> Security role to user/group mapping page, click **OK**, and then click **Save** to save the change

4.  Restart all of your WebSphere Application Server instances to make use of the new configuration.


**Parent topic:**[Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)

**Related information**  


[Switching to unique administrator IDs for system level communication](../admin/t_admin_common_add_j2c_auth.md)

[Roles](../admin/r_admin_common_user_roles.md)

