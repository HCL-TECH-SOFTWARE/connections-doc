# Configuring an administrator for Blogs {#t_blogs_create_admin .task}

By default, no user is set to administer Blogs. If you have not already done so, use this procedure to designate a Blogs administrator.

HCL Connections administrators must be dedicated users. Their only purpose should be application administration.

Only a Blogs administrator can configure a Blogs Homepage blog, which is required for Blogs. See *Managing the Homepage blog*.

**Note:** You can also create administrators to managing application content. See the topic *Administering application content*.

Create administrators in the WebSphere® Application Server Integrated Solutions Console.

1.  To configure administrative access to an application, complete the following steps:
2.  From the WebSphere Application Server Integrated Solutions Console, select **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

3.  Find and click the link to the application that you want to configure. For example, click **Blogs**.

4.  Click the **Security role to user/group mapping** link.

5.  To map a user to the administrative role, select the check box for the admin role and then click **Map Users**.

6.  In the **Search String** box, type the name of the person whom you would like to set as an administrator, and then click **Search**. If the user exists in the LDAP directory, it is found and displayed in the **Available** list.

7.  Select the name from the **Available** box, and then move it into the **Selected** column.

8.  Repeat Steps 4 and 5 to add more users to the administrative role.

9.  Click **OK**.

10. From the **Enterprise Applications** \> **Blogs** \> **Security role to user/group mapping** page, click **OK**, and then click **Save** to save the changes.

11. Synchronize and restart all your WebSphere Application Server instances.


**Parent topic:**[Administering Blogs from the user interface](../admin/c_admin_blogs_UI.md)

**Related information**  


[Managing the Blogs Homepage blog](../admin/c_admin_blogs_homepage_blog.md)

[Administering application content](../admin/r_admin_common_superusers.md)

