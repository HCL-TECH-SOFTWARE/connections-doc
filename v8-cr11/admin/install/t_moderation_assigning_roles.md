# Designating global moderators {#t_moderation_assigning_roles .task}

Assign users to the role of global-moderator so they can moderate content for blogs, forums, and community files from a central interface.

In order for a user to moderate content, they must be assigned the global-moderator role for the Moderation, Communities and Common applications and for the applications you want moderated, which can be Blogs, Forums and Files.

1.  To map users to a global moderator role, complete the following steps:
2.  Map a user to a global-moderator role:

    1.  Expand **Applications** \> **Application Types**, and then select **WebSphere enterprise applications**. Find and click the link to the application that you want to configure.

    2.  Click **Security role to user/group mapping**.

    3.  Select the check box for the **global-moderator** role, and then click **Map users**.

    4.  In the **Search String** box, type the name of the user to assign to the role, and then click **Search**. If the user exists in the directory, it is displayed in the **Available** list.

    5.  Select the user or group name from the **Available** box, and then move it into the **Selected** column by clicking the move button.

    6.  Click **OK**.

    7.  Click **OK**, and then click **Save** to save the changes.

3.  Synchronize and restart all your WebSphere® Application Server instances.


**Parent topic:**[Moderation roles](../admin/c_admin_common_moderation_roles.md)

