# Moderating Blog comments {#t_admin_blogs_moderating_comments .task}

Configure content moderation to enforce it at the site level, or leave it as an option for blog owners.

There are three ways to enable comment moderation.

-   Comment moderation can be forced at the site level so that all comments posted require the blog owner's review and approval before they are posted. When enforced at the site level, the option to enable it is not available to the blog owner.
-   Comment moderation can also be optional by choosing not to force at the site level, and instead allowing each blog owner to select the option to moderate comments posted to their blog. Blog owners can specify comment moderation for the their blog from the **My Blogs** page by clicking **Settings** and checking **Moderate comments** on the page for general settings.
-   You can configure content moderation in the contentreview-config.xml file. If you enable pre-moderation, that is, moderation for content that has not yet been published in the blog, the setting will override both the site-wide and the individual blog settings. To disable comment moderation in this case, you would have to disable the pre-moderation \(contentApproval\) setting in the contentreview-config.xml file and disable the site-wide setting for comment moderation. For details, see the topic *Managing content moderation and flagged content*.

If you are enforcing comment moderation, follow the steps in the topic *Specifying an administrator email address for Blogs notification* to edit configuration property settings to change the administrator email address. Moderated comment notifications will be addressed from this email address. By default, notifications are sent from a generic email address, such as blogs-admin@example.com. Edit the property to change this to a legitimate administrator email address that has access rights to send mail.

Follow these steps to enforce comment moderation at the site level.

1.  Login as Site Administrator and go to the **Administration** tab.

2.  In the **Comment and Trackback Settings** section of the Configuration page, check **Require comment moderation for all blogs**.

3.  Click **Save**.

    No restart is required.


**Parent topic:**[Moderating blog content](../admin/c_blogs_admin_moderation_overview.md)

**Related information**  


[Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)

[Specifying an administrator email address for Blogs notifications](../admin/t_admin_blogs_admin_email.md)

