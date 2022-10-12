# Operations that update the communities time stamp {#r_admin_substitution_variables .reference}

The following tables list the community and remote app actions and events that update the community lastmod time stamp.

## Community actions { .section}

|Action|Description|
|------|-----------|
|community.create|Community owner creates a community.|
|community.update|Community member updates a community.|
|subcommunity.create|Community owner creates a subcommunity.|
|subcommunity.remove|Community owner deletes a subcommunity.|
|communities.widget.added|Community owner adds a widget to a community.|
|communities.widget.removed|Community owner removes a widget from a community.|
|member.add|Community owner adds a member to a community.|
|member.join|Community member joins a community.|
|member.remove|Community owner removes a member from a community.|
|member.leave|Community member leaves a community.|
|member.update|Community owner updates the membership level for a user. For example, changing the user from Member access to Owner.|
|bookmark.create|Community member creates a community bookmark.|
|bookmark.update|Community member updates a community bookmark.|
|bookmark.delete|Community member deletes a community bookmark.|
|feed.create|Community member creates a community feed.|
|feed.update|Community member updates a community feed.|
|feed.delete|Community member deletes a community feed.|

## Remote apps actions { .section}

Remote apps send events to News; if the event is marked as related to a community it is forwarded to the Communities app and the community lastmod time stamp is updated. For more information, see [Events Reference](http://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.0+API+Documentation#action=openDocument&res_title=Events_Reference_ic50&content=apicontent).

|Event/action|Description|
|------------|-----------|
|activity.created|Community member creates a community activity.|
|activity.updated|Community member updates a community activity.|
|activity.deleted|Community member deletes a community activity.|
|activity.undeleted|Community member restores a community activity from the Activities trash.|
|activity.membership.updated|Community member updates the membership page in the community activity.|
| | |
|activity.section.created|Community member creates a new section in the community activity.|
|activity.section.updated|Community member updates a section in the community activity.|
|activity.section.deleted|Community member deletes a section in the community activity.|
| | |
|activity.entry.created|Community member creates a new entry in the community activity.|
|activity.entry.updated|Community member updates an entry in the community activity.|
|activity.entry.deleted|Community member deletes an entry in the community activity.|
|activity.entry.undeleted|Community member restores an entry in the community activity from the Activities trash.|
| | |
|activity.reply.created|Community member creates a comment to an entry or to do item in the community activity.|
|activity.reply.updated|Community member edits a comment.|
|activity.reply.deleted|Community member deletes a comment.|
|activity.reply.undeleted|Community member restores a comment from the Activities trash.|
| | |
|activity.todo.created|Community member creates a new to do item in the community activity.|
|activity.todo.updated|Community member updates a to do item in the community activity.|
|activity.todo.completed|Community member marks a to do item as complete.|
|activity.todo.deleted|Community member deletes a to do item from the community activity.|
|activity.todo.undeleted|Community member restores a to do item from the Activities trash.|

|Event/action|Description|
|------------|-----------|
|blog.created|Community member creates a community blog. This event also occurs when a community owner adds the Blogs remote application to a community.|
|blog.entry.created|Community member creates a new entry in the community blog.|
|| |
|ideationblog.created|Community member creates a community ideation blog. This event also occurs when a community owner adds the Ideation Blog remote application to a community.|
|ideationblog.idea.created|Community member creates an idea in the community ideation blog.|
|ideationblog.idea.graduated|Community member graduates an idea in the community ideation blog.|

|Event/action|Description|
|------------|-----------|
|community.calendar.event.entry.created|Community member creates a new calendar \(single instance\) entry in the Community Events app.|
|community.calendar.event.entry.updated|Community member updates a calendar \(single instance\) entry.|
|community.calendar.event.entry.deleted|Community member deletes a calendar \(single instance\) entry.|
|community.calendar.event.instance.deleted|Calendar event \(single instance\) deleted using an API.|
|community.calendar.series.entry.created|Community member creates a new calendar \(repeating\) entry in the Community Events app.|
|community.calendar.series.entry.updated|Community member updates a repeating calendar \(**Edit entire series**\) entry.|
|community.calendar.series.entry.deleted|Community member deletes a repeating calendar \(**Edit entire series**\) entry.|
|community.calendar.series.instance.updated|Community member updates a single entry in a repeating calendar \("Edit this instance"\) event.|
|community.calendar.series.instance.deleted|Community member creates a repeating calendar event, selects one of the entries, then selects **More Actions** \> **Delete this instance**. The last date, time, and user are updated.|

|Event/action|Description|
|------------|-----------|
|files.file.shared|Community member shares a file with a community.|
|files.file.created|Community member adds a file \(by using **Add from My Computer**\) using the Files app in a community.|
|files.file.updated|Community member updates a file that is contained in the Files app of a community. The time stamp is updated if the user edits the properties of the file, or uploads a new version of the file.|
|files.file.deleted|Community member deletes a file that is contained in the Files app of a community. File is moved to the Trash folder of Files app.|
|files.file.undeleted|Community member restores a deleted file from the Trash folder of Files app. File is restored to the Files app in a community.|
|files.file.purged|A time stamp is generated when a file in the community Files app is permanently deleted from the Trash.|
| | |
|files.collection.created|Time stamp is updated when files are shared with a community for the first time, or the Files app is added to a community.|
|files.collection.updated|Time stamp is updated when the Files app in a community is updated, for example when a community is changed from **open** to **restricted**.|
|files.collection.added|Community member shares a file with the community by using the Files app.|
|files.collection.deleted|Time stamp is updated when a community is deleted and files are shared with that community. Also occurs if the Files app is removed from a community.|
| | |
|files.library.updated|Community member adds a folder to the Files app in a community.|
|files.library.deleted|Community member deletes a folder from the Files app in a community|
|files.library.file.added|Community member adds a file to a Folder in the community Files app.|

|Event/action|Description|
|------------|-----------|
|ecm\_files.add.file|Community member uploads or adds a file in the Community Library app.|
|ecm\_files.post.file|Community member adds a file to the Community Linked Library app.|
|ecm\_files.unshare.file|Community member removes a file from the Community Linked Library app.|

|Event/action|Description|
|------------|-----------|
|forum.topic.created|Community member creates a new topic in the community forum app.|
|forum.topic.updated|Community member updates a topic in the community forum.|
|forum.topic.deleted|Community member deletes a topic in the community forum.|
|forum.topic.undeleted|IBM® Connections Administrator restores a community forum topic by using a wsadmin command.|
|forum.topic.purged|IBM Connections Administrator purges a community forum topic by using a wsadmin command.|
| | |
|forum.topic.reply.created|Community member creates a new reply to a topic in the community forum.|
|forum.topic.reply.updated|Community member updates a reply to a topic.|
|forum.topic.reply.deleted|Community member deletes a reply to a topic.|
| | |
|forum.created|Community member creates a new forum in the Community forum app.|
|forum.updated|Community member updates a forum in the Community forum app.|

|Event/action|Description|
|------------|-----------|
|relatedCommunity.added|Community member adds a new related community in the Related Community app within a community.|
|relatedCommunity.updated|Community member updates a related community entry in the Related Community app.|
|relatedCommunity.deleted|Community member deletes a related community entry in the Related Community app.|

|Event/action|Description|
|------------|-----------|
|community.wallpost.created|Community member adds a status message in the Status Updates or Recent Updates apps in a community.|
|community.wallpost.removed|Community member deletes a status message from the Status Updates or Recent Updates apps.|
|community.wall.comment.added|Community member adds a comment to a status message in the Status Updates or Recent Updates app.|
|community.wall.comment.removed|Community member deletes a comment from the Status Updates or Recent Updates app.|
|community.wall.recommendation.added|Community member **Likes** a status message in the Status Updates or Recent Updates app.|
|community.wall.recommendation.removed|Community member **Unlikes** a status message in the Status Updates or Recent Updates app.|

|Event/action|Description|
|------------|-----------|
|wiki.page.created|Community member creates a wiki page in the Community Wiki app.|
|wiki.page.updated|Community member updates a wiki page in the Community Wiki app.|
|wiki.page.attachment.added|Community member adds a file attachment to a wiki page.|
|wiki.page.attachment.updated|Community member updates a file attachment to a wiki page.|
|wiki.page.attachment.deleted|Community member deletes a file attachment from a wiki page.|

**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

