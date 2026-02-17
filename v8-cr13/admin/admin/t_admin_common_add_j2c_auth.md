# Switching to unique administrator IDs for system level communication {#t_admin_common_add_j2c_auth .task}

Create extra J2C authentication aliases and remap the roles.

This task is optional. Complete this task only if you want to map a different user ID to the system-level roles for one or more HCL Connections applications.

When you install HCL Connections, you are prompted by the installation wizard to provide credentials for a user account for application-to-application communication. The installation wizard also creates a J2C authentication alias called connectionsAdmin. This alias is associated with the new user account and maps that account to a set of application roles. If you want to map these roles to different system user accounts, create extra J2C authentication aliases and remap the roles.

The connectionsAdmin is mapped to roles that carry out the following tasks:

|Role|Description|
|----|-----------|
|dsx-admin|Used by the Profiles and Communities applications to retrieve user or community data. When other applications need user or community data, they use the connectionsAdmin user to authenticate with Profiles and Communities and then request the data from Profiles and Communities.|
|search-admin|Used by all applications to control which user IDs can query seedlist information. The seedlist data is used to create the global index. The Search application uses the connectionsAdmin user ID to authenticate with the other applications and queries them on a scheduled basis to update the index.|
|widget-admin|Used by applications, such as Activities, Blogs, Files, and Wikis, that make widgets available within the Communities application. Users that are assigned to this role can run administrative commands on managed applications. The Communities application uses the connectionsAdmin user ID to authenticate with the other applications and then passes the requests to them.|

The connectionsAdmin user is also used by the Home page application to secure the messaging bus connection.

The connectionsAdmin does not represent the administrative user of an application; it represents a system-level user for application to application communication.

To map a different user ID to one of the default roles, complete the following steps:

1.  Complete either set of the following substeps:

    -   Specify a different system-level user ID for the dsx-admin, search-admin, or widget-admin roles:
        1.  From the IBM® WebSphere® Application Server Integrated Solutions Console, expand **Security**and then select **Global security**.
        2.  In the **Authentication** area, expand **Java Authentication and Authorization Service** and click **J2C authentication data**.
        3.  Click **New** and then enter an alias name, user ID, and password.

            **Notes:**

            -   dsx-admin: If you use single sign-on, specify a user ID that is present in the corporate directory and not only in WebSphere Identity Manager.
            -   search-admin: Specify an alias with the syntax: searchapplication\_nameAlias where application\_name is the name of the application for which you want to create the alias. For example: searchBlogsAlias.
            -   widget-admin: Specify an alias name with the syntax: widgetapplication\_nameAlias where application\_name is the name of the application for which you want to create the alias. For example: widgetActivitiesAlias.
        4.  Click **OK** and then click **Save**
        5.  Repeat steps c to d for each new role that you want to create.
        6.  Save your changes.
    -   Specify a different system-level user ID for the connectionsBus role:
        1.  From the WebSphere Application Server Integrated Solutions Console, select **Service integration** \> **Buses**.
        2.  Click the bus to which you want to map a different user ID.

            **Note:** All HCL Connections buses have names that begin with Connections.

        3.  Click **Security** \> **Users and groups in the bus connector role**.
        4.  Delete the existing user ID by selecting the check box next to the user ID and clicking **Delete**.
        5.  To add the new user ID, click **New**, select **User name**, and then type the name of the new user ID.
        6.  Click **OK**.
        7.  Repeat steps b to f for each bus.
        8.  Save the changes.
2.  Map the user in the alias to the role:

    **Attention:** For Activities, you must map the account that you are mapping to the widget-admin role to the person role as well.

    1.  From the WebSphere Application Server Integrated Solutions Console, expand **Applications** \> **Application Types** and then select **WebSphere enterprise applications**. Find and click the link to the application that you want to configure.

    2.  Click **Security role to user/group mapping**. Find the role that you created in the Role column and then click **Map users** or **Map groups**.

    3.  In the **Search String** box, type the name of the user or group you would like to assign to this role and then click **Search**. If the user or group exists in the directory, it is displayed in the **Available** list.

    4.  Select the user or group name from the **Available** box and then move it into the **Selected** column.

    5.  Repeat steps i and j to add extra users or groups.

    6.  Repeat steps f through k to define access levels and assign people to any other aliases that you created.

    7.  Click **OK**.

    8.  Click **OK** and then click **Save** to save the changes.

3.  \(widget-admin role only\) Edit the widget-config.xml file for each application that is affected:

    **Note:** Check out each file by using the wsadmin client and the Jython script interpreter. For more information about checking out files, see the *Starting the wsadmin client* and *Applying common configuration property changes* topics.

    1.  From the profile\_root\\config\\cells\\cellName\\LotusConnections-config directory, open the widget-config.xmlfile in a text editor.

    2.  Change the remoteHandlerAuthenticationAlias attribute in the lifecycle element for the widgetDef \(widget definition\) that corresponds to the application. Replace the current value with the name of the alias that you created. Include the full name of the alias, including the node name prefix, if it is present.

    3.  Repeat the previous step for each application for which you defined a new alias.

    4.  Save the widget-config.xml file.

4.  \(dsx-admin role only\) Update the value of the corresponding attributes in the LotusConnections-config.xml file. To do so, start the wsadmin client, and then complete the following steps:

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
            -   Linux® only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

    3.  Use the following command to update the alias information:

        LCConfigService.updateConfig\("profiles.directory.service.extension.enabled", "true"\)

    4.  Open the LotusConnectiosn-config.xml file in a text editor and add the following values to the <sloc:serviceReference serviceName="directory"\> element:

        <sloc:serviceReference serviceName="directory" communities\_directory\_service\_extension\_auth\_alias="<alias\_you\_created\>" communities\_directory\_service\_extension\_enabled="true" profiles\_directory\_service\_extension\_auth\_alias="<alias\_you\_created\>" /\>where alias\_you\_created is the alias you created in Step 1.

    5.  Check in the configuration files during the same wsadmin session in which you checked them out. For more information, see *Applying common configuration property changes*.

5.  Restart the application servers that host the applications for which you created user roles.


**Parent topic:**[Managing stored credentials](../admin/c_admin_common_change_passwords.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md)

