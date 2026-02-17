# Assigning people to Java EE roles {#assigningpeopletoj2eeroles .task}

Assign roles for HCL Connections users on WebSphere® Application Server.

You can add groups as well as individual users to roles. The advantage of assigning a group to a role is that you can add and remove members of the group without having to edit your WebSphere Application Server configuration. Editing the group at the directory level makes administration easier when you have to add, modify, or remove administrators. You can still add and remove individual users in your WebSphere Application Server configuration if necessary.

For definitions of the different roles, see the *Roles* topic.

1.  To assign a person or group to a role, complete the following steps:
2.  From the WebSphere Application Server Integrated Solutions Console, expand **Applications** \> **Application Types** and then select **WebSphere enterprise applications**. Find and click the link to the application that you want to configure.

3.  Click **Security role to user/group mapping**. Find the role that you want to add users to.

4.  Select the role that you want to assign and click **Map users** or **Map groups**.

5.  In the **Search String** box, type the name of the person or group that you would like to assign to this role, and then click **Search**. If the user or group exists in the directory, it is displayed in the **Available** list.

6.  Select the user or group name from the **Available** box and move it into the **Selected** box by clicking **Add**.

7.  To add more users to the role, repeat Steps 4 and 5.

8.  Click **OK**.

9.  To map a user or group to a different role for another application, repeat steps 1–7.

10. Click **OK** and then click **Save** to save them.

11. Synchronize and restart all instances of WebSphere Application Server.


**Parent topic:**[Roles](../admin/r_admin_common_user_roles.md)

