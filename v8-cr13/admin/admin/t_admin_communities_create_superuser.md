# Administering community content {#t_admin_communities_add_admin_user_to_server .task}

You can create a dedicated administrator with access to all communities, public, or restricted. This administrator has granular control over communities content, including the ability to edit or remove inappropriate content. This administrator is also required for HCL Sametime® integration with HCL Connections.

Global communities administrators can access all communities with rights to view and update community settings, members, invitations, bookmarks, and feeds. However, within restricted communities the global administrator cannot view and manage remote widget applications, such as Activities or Wikis. To manage content in remote widget applications, you add the communities global administrator to the Java EE admin role for all of these applications. See *Assigning people to Java EE roles* for detailed information. Once logged in, the communities global administrator is in the admin role and can manage content in any of them, whether the applications are stand-alone or remote widgets in a community.

You can use search to find private communities, but you must add the global administrator to the search-admin role of the Search application. Use the **My Organization Communities** view to find public and moderated communities.

**Note:** The global administrator role is not supported on mobile devices. Global administrators must use a supported browser.

1.  Create a user who is dedicated to administering content, and add them to the Java EE **admin** role of Communities, Activities, Blogs, Files, Forums, and Wikis. Also, add them to the **search-admin** role of Search. See *Roles*.

    In the following steps, ensure that communities-policy.xml contains the "admin" block of grant statements and is not commented out.

2.  Start the wsadmin client by completing the following steps:

    1.  Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin

        app\_server\_root/profiles/dm\_profile\_root/bin. Where app\_server\_root represents the IBM WebSphere Application Server installation directory, for example:

        ```
        Linux:
        /opt/IBM/WebSphere/AppServer
        
        ```

        ```
        Windows:
        drive:\Program Files\IBM\WebSphere\AppServer
        
        ```

        Where drive is the system drive on which the file directory is stored. For example: C: or D:.

        where dm\_profile\_root is the Deployment Manager profile directory; this directory is usually called dmgr01. For example, on Windows, the directory is C:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin.

        **Attention:** You must run the command to start the wsadmin client from this specific directory because the Jython files for the product are stored there. If you start the client from a different directory, the execfile\(\) command does not work correctly.

    2.  Enter the following command to start the wsadmin client:

        -   Linux: ./wsadmin.sh -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        -   Microsoft Windows: wsadmin -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        where:

        -   admin\_user\_id is the user name of the Administrator role on IBM WebSphere® Application Server. This administrator must be configured at the cell level, not at the cluster, node, or server level.
        -   admin\_password is the password of the WebSphere Application Server administrator.
        -   SOAP\_CONNECTOR\_ADDRESS\_PORT is the SOAP port for the WebSphere Application Server deployment manager server. The default value of the SOAP port is 8879. If you are using the default port value, you do not have to specify this parameter. If you are not using the default value and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, complete the following steps:
            1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.
            2.  In the Additional properties section expand **Ports**, and then look for the SOAP\_CONNECTOR\_ADDRESS port entry to find the port number.
        For example:

        -   Linux: ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
        -   Microsoft Windows: wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879
3.  Access and check out the Communities configuration files:

    1.  Use the following command to access the Communities configuration files:

        ```
        execfile("communitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Communities configuration files using the following command:

        ```
        CommunitiesConfigService.checkOutPolicyConfig("working\_directory",
           "cell\_name")
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            ```
            print AdminControl.getCell()
            ```

        For example:

        ```
        CommunitiesConfigService.checkOutPolicyConfig("/opt/my_temp_dir",
        "CommServerNode01Cell")
        ```

4.  From the temporary directory to which you just checked out the HCL Connections configuration files, open the communities-policy.xml file in a text editor.

5.  Ensure that the file contains the following grant statement, and that it is not "commented out" \(disabled\).

    ```
    <comm:grant>
    	<comm:principal class="com.ibm.tango.auth.principal.Role" name="admin" />
    	<comm:permission class="com.ibm.tango.auth.permission.CommunityManagementPermission" communityType="*" action="*" />
    	<comm:permission class="com.ibm.tango.auth.permission.CommunityMembershipPermission" communityType="*" action="*" />
    	<comm:permission class="com.ibm.tango.auth.permission.CommunityAccessPermission" communityType="*" action="*" />
    	<comm:permission class="com.ibm.tango.auth.permission.CommunityReferencePermission" communityType="*" action="*" />
    	<comm:permission class="com.ibm.tango.auth.permission.CommunityBroadcastPermission" communityType="*" action="*" />
    	<comm:permission class="com.ibm.tango.auth.permission.CommunityInvitePermission" communityType="*" action="*" />
    </comm:grant>
    ```

    ```
    <comm:grant>
    	<comm:principal 
         class="com.ibm.tango.auth.principal.Role" name="admin" />
    	<comm:permission 
         class="com.ibm.tango.auth.permission.CommunityManagementPermission" 
         communityType="*" action="*" />
    	<comm:permission 
         class="com.ibm.tango.auth.permission.CommunityMembershipPermission" 
    	 communityType="*" action="*" />
    	<comm:permission 
         class="com.ibm.tango.auth.permission.CommunityAccessPermission" 
         communityType="*" action="*" />
    	<comm:permission 
         class="com.ibm.tango.auth.permission.CommunityReferencePermission" 
         communityType="*" action="*" />
    	<comm:permission 
         class="com.ibm.tango.auth.permission.CommunityBroadcastPermission" 
         communityType="*" action="*" />
    	<comm:permission 
         class="com.ibm.tango.auth.permission.CommunityInvitePermission" 
         communityType="*" action="*" />
    </comm:grant>
    ```

6.  Save your changes to the communities-policy.xml file.

7.  Check in the updated file by using the following wsadmin client command:

    ```
    CommunitiesConfigService.checkInPolicyConfig("<working\_directory\>", "<cell\_name\>")
    ```

8.  To exit the wsadmin client, type exit at the prompt.

9.  Stop and restart the server that is hosting the Communities application.


When logged in to Communities, the global administrator that is specified in the various Java EE roles should be able to view and edit all communities and community resources.

**Parent topic:**[Managing content](../admin/c_admin_common_managing_content.md)

**Related information**  


[Managing community content](../admin/c_admin_communities_control_content.md)

[Administering application content](../admin/r_admin_common_superusers.md)

[Adding owners and members to a community](../admin/t_admin_communities_add_members.md)

[Assigning people to Java EE roles](../admin/t_admin_common_user_roles_assign.md)

