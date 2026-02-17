# Moderated content states for blogs {#c_blogs_admin_moderation_states .concept}

When blog content is moderated, it can be in a variety of states before and after being published.

The state that content is in dictates where it is in the pre-moderation or post-moderation workflow and controls whether the content is available to users or unavailable because it has not been approved or is in quarantine.

## Content states before publication { .section}

Blog content that requires review and approval before it is published can be in one of the following states:

-   Pending \(Require approval\): The moderator can approve or reject the content.
-   Active \(Published\)
-   Rejected

## Content states after publication { .section}

Content that has already been published but requires review, for example, if it was flagged as inappropriate, can be in one of the following states:

-   Awaiting decision: The content is in an active state but it may be flagged for review. The moderator can dismiss flags or quarantine the content.
-   Quarantined: The content is unavailable to end users. The moderator can restore the content or return the content to the author.
-   Returned to Author: \(Blog only\) Authors can edit and resubmit the content for review.
-   Approved: The content is published.

## Example { .example}

This is an example of how moderation might work for a site where moderation is required and you have assigned a user \(ModeratorA\) the global-moderator role.

-   ModeratorA logs into Blogs and navigates to the Moderation page.
-   She navigates to the "Require Approval" page where she sees a list of content submitted by users that need to be reviewed. She sees some spam comments which she selects and deletes.
-   ModeratorA sees a blog entry submission that is unrelated to the purpose of the blog. She suspects that the author may have accidentally posted to the wrong blog. She rejects the content and notifies the author that the submitted post is unrelated to the topic of the blog.
-   There are some new blog posts from regular members that she quickly scans and approves. The approved posts are now published and visible to other users.
-   She finds a blog entry that refers to several internal project code names used within her company. She returns the entry back to the author and asks for the code names to be replaced with the actual product names.
-   Finally, ModeratorA reviews the moderated comments. She finds several comments made by public users that contain inappropriate language, so she deletes them.

**Parent topic:** [Moderating blog content](../admin/c_blogs_admin_moderation_overview.md)

**Related information**  


[Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)

