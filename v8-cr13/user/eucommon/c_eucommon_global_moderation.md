# Moderating content {#c_eucommon_global_moderation .concept}

Moderate content to ensure that only appropriate, relevant content is being shared on your site.

## What content can be moderated? { .section}

If your HCL Connections administrator assigns you the role of global moderator, you can moderate the following content:

-   Blog entries and comments
-   Files content and comments
-   Forum posts

You can review content before it is published and approve it to be published, or reject or delete it. You can also review and manage published content that users have flagged as inappropriate or otherwise problematic.

## Moderating content before it's published { .section}

If you're a moderator, you'll be notified when a user submits content. The notification includes information about the person submitting the content and a link to their submission.

To moderate the content:

1.  From the navigation bar, click **Moderation**.
2.  Click **Content Approval** in the navigation pane and then select the type of content that you want to work with.
3.  Review an item and choose one of these actions:
    -   **Approve**: Publish the content.
    -   **Reject**: Content is moved to the **Rejected** tab where you can later approve it or delete it. Rejected blog content can be revised by the author and resubmitted for approval.
    -   **Delete**: Permanently remove the content.

## Moderating content after it's published { .section}

If you're a moderator, you'll be notified when user flags content as inappropriate. The notification includes information about the person who flagged it, and a link to the flagged content.

To moderate the content:

1.  From the navigation bar, click **Moderation**.
2.  Click **Flagged Content** in the navigation pane and then select the type of content that you want to work with.
3.  Review a flagged entry and choose one of these actions:
    -   **Dismiss**: The content remains available.
    -   **Quarantine**: The content becomes a draft and is not available to readers. Quarantined content can be restored or deleted.
    -   **Delete**: Permanently remove the content.

## Changing moderation notifications { .section}

You can choose to have flagged content notifications sent to all moderators, or to a specific group of moderators. There is a setting in the contentreview-config.xml file which determines whether notification is sent to a moderator or content reviewer as follows:

-   If issueCategorization is disabled, the notification is sent to all the moderators.
-   If issueCategorization is enabled, the notification will only be sent to the reviewers defined under each issue category.

**Parent topic:**[Shared features](../eucommon/c_eucommon_shared_components.md)

