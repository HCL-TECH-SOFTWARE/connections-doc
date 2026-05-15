# Managing flagged content for a blog {#t_blogs_admin_flagged_content .task}

Review published blog content that has been flagged as inappropriate and take action on flagged entries and comments.

When a blog entry or comment is flagged by a user, it is marked for review and it displays on the Flagged Entries or Flagged Comments page of the Moderation tab. The **Flagged Entries** and **Flagged Comments** pages let an authorized moderator view the history and state of flagged entries or comments, and take action on them.

The workflow described in this topic requires that valid email addresses are configured for the reviewers and that email notifications are enabled for your Blogs deployment.

When a user flags a blog entry or comment as inappropriate, it sets in motion a workflow for reviewing and resolving the issue. The workflow goes as follows:

1.  Notification is sent to the moderator that an entry or comment has been flagged. The notification includes information about the person flagging the content, a justification for the action, and a link to the entry. The entry or comment is posted to the Flagged Entries or Flagged Comments page in the Moderation interface for viewing and managing flagged content.

    **Note:** There is a setting in the contentreview-config.xml file which determines whether notification is sent to a moderator or content reviewer as following:

    -   If issueCategorization is disabled, then notification is sent to all the moderators.
    -   If issueCategorization is enabled, then the notification will only be sent to the reviewers defined under each issue category, but if reviewer information is not provided, the notification will still be sent to all the moderators.
2.  The moderator reviews the content and acts on it.
3.  If the reviewer does not think the content is inappropriate, the flag is dismissed and the content remains in the blog. The entry is moved from the **Awaiting Decision** panel to the **Dismissed** panel.
4.  If the content is considered inappropriate, the reviewer quarantines the posting, which means it is removed from the blog and placed in a quarantined state. In this case, the author is notified. The posting appears on the **Quarantined** panel.
5.  A moderator can send entries back to the author to update the content. Entries that have been returned display in the **Returned to Author** panel.
6.  If the author resubmits the content, it is listed in the **Reposted** area so the moderator can review the updated content. If the content is acceptable, the reviewer can dismiss the flag so that the content can be published to the blog.

**Note:** If Blogs is configured so that email notification is disabled, the automatic notifications used for this workflow are disabled. The following activities would require manual intervention:

-   When an entry is flagged as inappropriate, the reviewers will not receive email indicating there is a potentially offensive posting. Also, the person who flagged the message as inappropriate will not receive a confirmation email that the post they found offensive is being reviewed. Reviewers will have to periodically visit the Flagged Entries or Flagged Comments pages of the Moderation interface to see what entries need action and then manually send confirmation notification messages to the user who flagged the entry.
-   If the reviewer quarantines a blog entry, or returns the entry to the author to be edited, the blog owner will not receive email notifications. The reviewer will have to manually send a notification message to the blog owner.

**Note:** If your organization includes people with no email, the automatic notifications used for this workflow are disabled. The following activities would require manual intervention:

-   If a reviewer has no email, when an entry or comment is flagged as inappropriate, the reviewer will not receive email indicating there is a potentially offensive posting. Reviewers will have to periodically visit the Flagged Entries or Flagged Comments pages of the Moderation interface to see what entries need action and then manually send confirmation notification messages to the user who flagged the entry.
-   If the blog owner has no email, and the reviewer quarantines a blog entry, or returns the entry to the author to be edited, the blog owner will not receive email notifications. The reviewer will have to manually send a notification message to the blog owner.
-   If the person who flagged the message as inappropriate has no email, the person will not receive a confirmation email that the post they found offensive is being reviewed.

Follow these steps to review flagged content and take action.

1.  Click the **Moderation** tab from Blogs.

2.  Click **Flagged Entries** or **Flagged Comments** in the navigation pane.

    Content awaiting decisions are displayed along with information on who flagged the content and why.

3.  Review a flagged entry and choose one of these actions:

        |**Quarantine**|This option turns the post in question to a draft and removes it to a quarantine area so it is not available to blog readers. This option prompts you to send notification to the posting author explaining your reason for removing the post and providing a link so the author can revise the content. If the author revises the content and resubmits it to the blog, that entry appears in the Reposted panel so the reviewer can see it and make sure it is appropriate as revised.|
    |**Dismiss Flag**|Dismiss the flag. The post remains in the blog.|
    |**Delete**|Permanently remove the entry or comment.|

4.  View content that you have acted on by choosing one of the following tabs:

    -   Quarantined
    -   Returned to Author \(Entries only\)
    -   Reposted \(Entries only\)
    -   Dismissed
    You can review those posts or move them back into the Awaiting Decision category to take a different action.


**Parent topic:**[Moderating blog content](../admin/c_blogs_admin_moderation_overview.md)

**Related information**  


[Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)

[Flagging an entry as inappropriate](../../user/blogs/t_blog_entry_inappropriate.md)

