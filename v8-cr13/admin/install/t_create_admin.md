# Configuring the Home page administrator {#t_blogs_create_admin .task}

Create an administrator for Home page so that you can make changes to the application such as adding and removing widgets.

HCL Connections administrators must be dedicated users. Their only purpose should be application administration.

Only a Home page administrator can add, remove, enable, or disable widgets on the Home page. For more information, see the *Administering the Home page from the user interface* topic.

**Note:** You can also create global administrators for any of the applications, for the purpose of managing content. For more information, see the *Administering application content* topic.

To configure administrative access to the Home page application, complete the following steps:

1.  Log in to the WebSphere® Application Server Integrated Solutions Console on the Deployment Manager.

2.  Select **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

3.  Click the link to the **Home page** application.

4.  Click the **Security role to user/group mapping** link.

5.  Select the check box for the admin role and then click **Map Users**.

6.  In the **Search String** box, type the name of the person whom you would like to set as an administrator, and then click **Search**. If the user name exists in the LDAP directory, it is found and displayed in the **Available** box.

7.  Select the name from the **Available** box and then move it into the **Selected** column by clicking the move arrow.

8.  Repeat Steps 4 and 5 to add more users to the administrative role.

9.  Click **OK**.

10. From the **Enterprise Applications** \> **<application\>** \> **Security role to user/group mapping** page, click **OK** and then click **Save**.

11. Synchronize and restart all your WebSphere Application Server instances.


**Parent topic:**[Post-installation tasks](../install/r_post-installation_tasks.md)

