# Moderating published content that is flagged {#t_admin_common_moderation_post-mod .task}

Review published content that has been flagged as inappropriate and take action on flagged entries and comments.

When content is flagged by a user, it is marked for review and it displays on the Flagged Content section of the Moderation tab. An authorized moderator can view the history and state of flagged content and take action on it. Flagged content can be:

-   Blog entries or comments
-   Community files content or comments
-   Forum posts

The workflow described in this topic requires that valid email addresses are configured for the reviewers and that email notifications are enabled for your Connections deployment.

When a user flags content as inappropriate, it sets in motion a workflow for reviewing and resolving the issue. The workflow goes as follows:

1.  Notification is sent to the moderator that content has been flagged. The notification includes information about the person flagging the content, and a link to the content in the Moderation interface. The entry or comment is posted to the Flagged Content section in the Moderation interface for viewing and managing flagged content.

    **Note:** There is a setting in the contentreview-config.xml file which determines whether notification is sent to a moderator or content reviewer as follows:

    -   If issueCategorization is disabled, then notification is sent to all the moderators.
    -   If issueCategorization is enabled, then the notification will only be sent to the reviewers defined under each issue category, but if reviewer information is not provided, the notification will still be sent to all the moderators.
2.  The moderator reviews the content and acts on it.
3.  If the reviewer does not think the content is inappropriate, the flag is dismissed and the content remains in the blog or community.
4.  If the content is considered inappropriate, the reviewer quarantines the posting, which means it is removed and placed in a quarantined state. In this case, the author is notified. The posting appears on the **Quarantined** panel.
5.  If the content is considered inappropriate, the reviewer can delete it from either the **Flagged for Review** or the **Quarantined** tabs.

Follow these steps to review flagged content and take action.

1.  Click the **Moderation** tab.

2.  Click **Flagged Content** in the navigation pane and then select the type of content that you want to work with - Blogs, Files, or Forums.

    Content awaiting decisions are displayed along with information on who flagged the content and why.

3.  Review a flagged entry and choose one of these actions:

    |Option|Description|
    |--|--|
    |**Dismiss**|Dismiss the flag. The content remains available.|
    |**Quarantine**|This option turns the post in question to a draft and removes it to a quarantine area so it is not available to readers. This option prompts you to send notification to the posting author explaining your reason for removing the post and providing a link so the author can revise the content. Quarantined content can be restored or deleted.|
    |**Delete**|Permanently remove the content.|

4.  View content that you have quarantined, select one or more items, and take one of the following actions:

    -   Click **Restore** to dismiss the flag and restore the content to a published state.
    -   Click **Delete** to permanently remove the content.

**Parent topic:** [Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)

**Related information**  


[Moderating forums](../admin/c_admin_forums_moderation.md)

