# Disabling the ability to add members to a community {#t_admin_communities_disable_add_members .task}

You can disable the functionality that allows community owners to add members to a community on a deployment-wide basis, so that instead new members must always be invited to join a community.

To update configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Disabling the ability to add members to a community means that community owners can no longer add people to a community without their consent. Instead, people must be invited to join a community, and they must accept the invitation to become a member. This functionality is useful when you want users in your organization to actively choose to become part of a community.

When you disable the functionality for adding members to a community, the **Add Members** button no longer displays on the Members page.

With this configuration, users can still join a public community. The **Join this community** link still appears in public communities, and if a users click it they get added to the community as a member. In Moderated communities, the **Request to Join This Community** link: still appears. If a community owner agrees to add the user, the user receives an email invitation to join the community. The requesting user must then accept the invitation and then becomes a member of the community. Under the default configuration, the owner can directly add that requesting user.

Under this configuration, groups cannot be added to a community. There is no support for inviting groups.

1.  To disable the functionality for adding members to a community, complete the following steps.
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

4.  Navigate to the working directory that you specified in the previous step and open the communities-policy.xml file using a text editor.

5.  Comment out or remove the add.others action for each community type from the following section of code:

    ```
    <comm:permission class="com.ibm.tango.auth.permission.CommunityMembershipPermission" 
      communityType="public" action="add.others, remove.others, define.roles" />
    <comm:permission class="com.ibm.tango.auth.permission.CommunityMembershipPermission" 
      communityType="publicInviteOnly" action="add.others, remove.others, define.roles" />
    <comm:permission class="com.ibm.tango.auth.permission.CommunityMembershipPermission" 
      communityType="private" action="add.others, remove.others, define.roles" />
    ```

    For example:

    ```
    <comm:permission class="com.ibm.tango.auth.permission.CommunityMembershipPermission" 
      communityType="public" action="remove.others, define.roles" />
    <comm:permission class="com.ibm.tango.auth.permission.CommunityMembershipPermission" 
      communityType="publicInviteOnly" action="remove.others, define.roles" />
    <comm:permission class="com.ibm.tango.auth.permission.CommunityMembershipPermission" 
      communityType="private" action="remove.others, define.roles" />
    ```

    **Tip:** You can find the section with these statements within the larger block of grant statements for the owner.

6.  Save your changes and then close the communities-policy.xml file.

7.  Check in the updated policy file using the following command:

    ```
    CommunitiesConfigurationService.checkInPolicyConfig("working-directory",
     "cell-name")
    ```

8.  Synchronize your changes across all nodes and then restart the Communities application.


**Parent topic:**[Managing membership in Communities](../admin/c_admin_communities_managing_membership.md)

