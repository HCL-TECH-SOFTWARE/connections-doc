# Managing moderated blog entries and comments {#t_admin_blogs_comments_UI .task}

Centrally manage blog entries and comments for a moderated blog before the content is published to a blog, or when the published content is updated.

If moderation is enabled for Blogs, moderators can review and approve comments and entries from a central location. You can configure who can review and approve content through the Java EE global-moderator role in the WAS admin console. All users assigned the J2EE global-moderator role can manage entries and comments for all blogs on the site. You can also configure who can review and approve community blog content with a setting in the contentreview-config.xml file as follows:

-   If `ownerModerate=true` in contentreview-config.xml, all community owners can moderate the blogs in communities that they own.
-   If `ownerModerate=false` in contentreview-config.xml, only users assigned the Java EE global-moderator role can manage entries and comments for all blogs on the site.

1.  From the Blogs home page, click the **Moderation** tab.

2.  Click the **Entry Approval** or the **Comment Approval** link in the navigation pane to review entries or comments.

    The following tabbed views let you review and manage content:

    -   **All** displays all entries or comments for the site.
    -   **Require Approval** display entries or comments awaiting your action.
    -   **Published** displays all entries or comments published to a blog.
    -   **Rejected** displays all entries or comments not approved for publishing to a blog.
3.  To filter the list of entries or comments in any of the views, do one of the following and then press **Filter**.

    -   Enter a tag and click the search icon to search for contents associated with that tag.
    -   Enter a start and end date to display content entered in that range.
4.  From the **Require Approval** tab, select one or more item and choose an action:

    -   **Publish** makes the content available in the blog.
    -   **Reject** moves the content to the Rejected state. The blog owner or the author of the entry or comment can edit the content and resubmit for approval.
    -   **Delete** permanently removes the content from the blog.

**Parent topic:**[Moderating blog content](../admin/c_blogs_admin_moderation_overview.md)

