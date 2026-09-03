# Creating and populating communities {#t_admin_communities_create_communities .task}

Create and populate a community using scripts accessed using the wsadmin command-line tool. The administrative commands for creating communities do not require a server restart to take effect, and no file checkout is necessary.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can use wsadmin commands to create a community and populate it with a set of members based on user login name or email address.

The communities created using the following commands allow public access. However, community owners can edit the communities from the Communities user interface after they are created and change the access level to moderated or restricted as needed.

1.  To create and populate a new community, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Communities Jython script interpreter.

    1.  Use the following command to access the Communities configuration files:

        ```
        execfile("communitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands to create a community and populate it with a set of members:

    CommunitiesService.createCommunityWithEmail\(String community name, String ownerName, int memberRole, String dsmlFile\)
    :   Creates a public community whose membership list is initialized from a Directory Services Markup Language \(DSML\) file exported from the LDAP directory. The DSML file must be local to the system running the script. The script parses the DSML file and extracts the mail values. These values are used to populate the membership list of the community. For more information about how to create DSML files from your LDAP directory, see [http://www.dsmltools.org/](http://www.dsmltools.org/).

        A typical mail attribute in a DSML file looks like the following:

        ```
        <attr 
         name="mail">
         <value>john_doe@example.com</value>
        </attr>
        ```

        The command takes the following parameters:

        communityName
        :   A string value that specifies the name of the community that you are creating.

        ownerName
        :   A string value that specifies the name of the new community's owner. Enter the email address of the user who will be the owner of the community.

        memberRole
        :   An integer that specifies the role of the users added to the new community. This property can be set to 0 to specify the member role or 1 to specify the owner role. Do not enclose this setting in quotation marks.

        dsmlFile
        :   A string value that specifies that name of the DSML file containing the mail values used to populate the community membership.

        In the following example, a community named AJ's Community is created with Ann Jones as the community owner/creator. The command parses the file /opt/myDSML.xml, looks for each of the mail attributes, and then adds those email addresses to the new community with member access.

        ```
        CommunitiesService.createCommunityWithEmail("AJ's Community", "ann_jones@example.com", 0, "/opt/myDSML.xml")
        ```

        **Notes:**

        -   This command only creates parent communities; it cannot be used to create subcommunities.
        -   This command creates a public community by default. To change the visibility of the community, the community owner must edit the community from the user interface and change the access level to moderated or restricted as needed.
    CommunitiesService.createCommunityWithLoginName\(String communityName, String ownerName, int memberRole, String dsmlFile\)
    :   Creates a public community whose membership list is initialized from a DSML file exported from the LDAP directory. The DSML file must be local to the system running the script. The script parses the DSML XML file and extracts the login name values. These values are used to populate the membership list of the community. For more information about how to create DSML files from your LDAP directory, see [http://www.dsmltools.org/](http://www.dsmltools.org/).

        The command takes the following parameters:

        communityName
        :   A string value that specifies the name of the community that you are creating.

        ownerName
        :   A string value that specifies the name of the new community's owner. Enter the loginName of the user who will be the owner of the community.

        memberRole
        :   An integer that specifies the role of the users added to the new community. This property can be set to 0 to specify the member role or 1 to specify the owner role. Do not enclose this setting in quotation marks.

        dsmlFile
        :   A string value that specifies the name of the DSML file containing the loginName values used to populate the community membership.

        In the following example, a community named AJ's Community is created with Ann Jones as the community owner/creator. The command parses the file /opt/myDSML.xml and looks for each of the login attributes and adds those login names to the new community with member access.

        ```
        CommunitiesService.createCommunityWithLoginName("AJ's Community", "ann_jones", 0, "/opt/myDSML.xml")
        ```

        **Notes:**

        -   This command only creates parent communities; it cannot be used to create subcommunities.
        -   This command creates a public community by default. To change the visibility of the community, the community owner must edit the community from the user interface and change the access level to moderated or restricted as needed.

**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Adding owners and members to a community](../admin/t_admin_communities_add_members.md)

