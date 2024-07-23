# Notification types and events {#notification_types .reference}

Several notification types and events are supported.

## Notification types { .section}

The following notification types are supported:

Broadcast
:   Sent to recipients by email. Broadcast notifications are not shown on the Home page.

Directed
:   Sent from one user, or the system, to another user or set of users. Users can opt to not receive these notifications by email by changing their email preferences. Directed notifications are always visible to the recipients and the sender from the Home page.

Follow
:   Generated for users who follow a particular resource and who choose to have individual notifications for that type of resource.

Moderation
:   Used solely in the content moderation process.

Response
:   Used to inform a user when a comment or reply was left on their content. Response notifications go to the owner of the content only, not to followers. These notifications are sent if the user configured their email preferences to receive responses through individual emails.

@mentions
:   Sent when a user is @mentioned anywhere within HCL Connections. This type of notification is sent only when users configure their email preferences to receive @mentions notifications by email.

The following notification events are available for HCL Connections applications:

Activities
:   Notification events are enabled by default. Email event types are enabled only if you enabled email notifications during the installation of the product.

    |Notification name|Description|Notification type|
    |-----------------|-----------|-----------------|
    |addMemberMail|When an activity owner adds members to an activity, a notification is automatically sent to them to inform them about the activity.|Directed|
    |autoCompleteActivityMail|Activity owners receive an email to warn them that one of their inactive activities will be marked complete if it is not updated.|Directed|
    |createMail|When a standard activity is created, each member is sent a notification about the new activity. When a community activity is created, notifications are sent only if individual members are added. No notifications are sent when an entire community membership list is added.|Directed|
    |inviteMemberMail|When an activity owner invites members to an activity, a notification is automatically sent to them to inform them about the activity.|Directed|
    |notifyMail|Activity members can send other members notifications about entries.|Directed|

Blogs
:   |Notification name|Description|Notification type|
|-----------------|-----------|-----------------|
|approved|When an entry, idea, or comment is approved, a notification is sent to the author and the last editor.|Moderation|
|confirmflagged|When a flag on a post, idea, or comment is confirmed, a notification is sent to the flag creator.|Moderation|
|notify|Notifications that one user sends to other users to inform them about useful blog posts.|Directed|
|notifyassigned|When a blog owner assigns author, draft, or owner permission for a blog, a notification is sent to the member to inform them of the blog and their access level.|Directed|
|notifyflagged|When a post, idea, or comment is flagged as inappropriate, a notification is sent to content reviewers, including anyone in the global-moderator role.|Moderation|
|notifyreposted|When an entry or idea is modified and reposted, a notification is sent to content reviewers, including anyone in the global-moderator role, to inform them about it.|Moderation|
|notifyreview|When a new entry, idea, comment, or trackback comment is posted and put in pending status, a notification is sent to content reviewers to notify them that they must review it. Content reviewers include anyone in the global-moderator role.|Moderation|
|ownermsg|When a new comment is posted, a notification is sent to the entry or idea creator.|Response|
|quarantined|When an entry, idea, or comment is quarantined, a notification is sent to the authors, including the post creator, its last editor, and blog owners.|Moderation|
|rejected|When an entry, idea, or comment is rejected, a notification is sent to the author and last editor.|Moderation|
|restored|When an entry, idea, or comment is restored, a notification is sent to the author, last editor, and blog owners.|Moderation|
|returned|When an entry or idea is returned, a notification is sent to the post authors, including the post creator, its last editor, and blog owners.|Moderation|

Bookmarks
:   |Notification name|Description|Notification type|
|-----------------|-----------|-----------------|
|notifytemplate|Users can send notifications to other users to inform them about useful bookmarks.|Directed|
|replaceurltemplate|Administrator can send a notification to the bookmark owner to report the update of a link.|This notification is triggered by an MBean|

Communities
:   |Notification name|Description|Notification type|
|-----------------|-----------|-----------------|
|broadcastMail|Members can send notifications to other members to inform them about important events.|Broadcast|
|invitedToJoinMail|Owners can send a notification to a non-member to invite them to join the community.|Directed|
|memberAddedMail|Notifications are automatically generated and sent to members when they are added to a community.|Directed|
|memberRemovedMail|Notifications are automatically generated and sent to members when they are removed from a community.|Directed|
|notifyEvent|Community members can notify other members about specific events by opening the event and selecting **More Actions** \> **Notify Other People**. The event owner can also send this notification when the event is created.|Directed|
|requestToJoinMail|Users can request to join a Moderated community by sending a notification to the community's owner.|Directed|

Files
:   |Notification name|Description|Notification type|
|-----------------|-----------|-----------------|
|collectionMediaAdded|Notification sent to users when a file is added to a folder or community that they are following.|Follow|
|collectionMemberUpdated|Notification sent to users when a folder is shared with them or when their access level changes. This notification applies to individual users, not groups.|Directed|
|commentAdded|Notification sent to users when a comment is created on a file that they are following. Users can follow files by opening the file page and clicking **Follow**.|Follow|
|communityVisibilityUpdated|Notification sent to owners of a community when the community changes from non-public to public and when private files that are shared with the community are removed from it.|Directed|
|mediaUpdated|Notification sent to users when a file that they are following is updated. Users can follow files by opening the file page and clicking **Follow**.|Follow|
|mediaShared|Notification sent to users when files are shared with them.|Directed|

Moderation
:   |Notification name|Description|Notification type|
|-----------------|-----------|-----------------|
|notifyapproved|When an entry is approved, a notification is sent to the entry authors, including the entry's creator and its last editor, and the entry owners.|Moderation|
|notifyautoquarantined|When an entry is flagged as inappropriate a specific number of times, a notification is sent to the Global Moderator and Reviewers. The number of inappropriate flags is specified in the autoQuarantine property in the contentreview-config.xml file. For example, if you enter a value of 5 in autoQuarantine, a notification is sent when an entry is flagged for the fifth time.|Moderation|
|notifydeleted|When an entry is deleted, a notification is sent to the entry authors, including the entry's creator, its last editor, and the entry owners.|Moderation|
|notifyflagged|When an entry is flagged as having inappropriate content and is put in pending status, a notification is sent to content reviewers, including anyone in the global-moderator role.|Moderation|
|notifypending|When an entry is added and needs approval, a notification is sent to the entry author. Reviewers and moderators are notified separately by a notifyReview email.|Moderation|
|notifyquarantined|When an entry is quarantined, a notification is sent to the entry authors, including the entry's creator, its last editor, and the entry owners.|Moderation|
|notifyrejected|When an entry is rejected, a notification is sent to the entry authors, including the entry's creator, its last editor, and the entry owners.|Moderation|
|notifyrestored|When an entry is restored, a notification is sent to the entry authors, including the entry's creator, its last editor, and the entry owners.|Moderation|
|notifyreview|When an entry is added and put in pending status, a notification is sent to content reviewers, including anyone in the global-moderator role.|Moderation|

News
:   |Notification name|Description|Notification type|
|-----------------|-----------|-----------------|
|dailyDigest|If email notifications are enabled on your system, your preferences are set to the Daily Newsletter option by default. Each option corresponds to a subview within the Updates News Feed view on the Home page. All options can be customized to your preferred frequency.|Follow|
|followIndividual|If email notifications are enabled, they are set to Individual E-mails by default. Each option corresponds to a subview within the Updates News Feed view. Options can be customized to any frequency. Any updates within the corresponding News Feed subview by a person other than yourself are sent to you in individual emails.|Follow|
|replyToError|When a user replies to a ReplyTo enabled notification and an error occurs at the server, a notification is generated and sent to the user.|Directed|
|weeklyDigest|If email notifications are enabled on your system, your preferences are set to the Weekly Newsletter option by default. Each option corresponds to a subview within the Updates News Feed view. Options can be customized to a desired frequency.|Follow|

Profiles
:   |Notification name|Description|Notification type|
|-----------------|-----------|-----------------|
|inviteColleagueMail|If a person designates someone else as a colleague, the colleague is sent an invitation to join that person's network.|Directed|
|notifyBoardOwnerForComment|Board owners are notified when someone comments on their message board.|Response|
|notifyBoardOwnerForEntry|Board owners are notified when someone posts a message in their message board.|Response|
|notifyEntryOwnerForComment|Board owners are notified when someone comments on a message board entry.|Response|

Wikis
:   |Notification name|Description|Notification type|
|-----------------|-----------|-----------------|
|commentAdded|Notification sent to users when a comment is created on a wiki page they are following, or on any page in a wiki they are following.

Users can follow wiki pages or wikis by opening a page and clicking **Follow**, and then **Follow this Page** or **Follow this Wiki**.

|Follow|
|mediaUpdated|Notification sent to users when an event occurs in a wiki page they are following. Events include title or description edits, new tags, and new or deleted pages, edits, or comments.

Users can follow wiki pages by opening a page and clicking **Follow**, and then **Follow this Page**.

|Follow|
|libraryMemberUpdated|Notification sent to users when they are made members of a wiki or when their wiki access level is changed. This notification applies to individual users, not groups.

|Directed|

**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

