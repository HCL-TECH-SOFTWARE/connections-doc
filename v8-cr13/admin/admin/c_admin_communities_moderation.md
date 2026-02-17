# Moderating the content in a community {#c_admin_communities_moderation .concept}

When moderation is enabled for the Blogs, Forums, and Files applications, global moderators or community moderators can review community blog, forum, and file content before it is posted to a community, and manage content after it is added to a community.

If premoderation is enabled for your deployment, when users contribute the following types of content to a community, that content does not display until it is approved by the global moderator or a community moderator.

-   Blog entries and comments
-   File content and comments
-   Forum posts

You can enable premoderation for one, two, or all three types of content.

When postmoderation is enabled, the global moderator or community moderator can review community content that has been flagged as inappropriate and the reason given for flagging it. They can then determine whether the content should be removed or the flag dismissed. You can enable postmoderation for one, two, or all three types of content.

As administrator, you can enable moderation for communities in the `contentreview-config.xml`. For more information about how to configure moderation settings, see *Managing content moderation and flagged content*.

When moderation is enabled, the following users can review and manage community content:

**Global moderators**
:   User assigned the global-moderator Java EE role can review and manage community content from the global moderation interface, which is accessed using the **Moderation** link in the application menu bar. The link is only visible to logged-in users who have been assigned the Java EE global-moderator role. For more information about assigning roles, see *Roles*.

**Community moderators**
:   When owner moderation is enabled, community owners can access moderation options for their community by logging into HCL Connections, opening the community, and then clicking **Moderation** in the community navigation. Community moderators can only manage the content of communities that they own, and they can only do so from the community moderation interface; they cannot access the global moderation interface.

    You can specify whether owner moderation is enabled by changing the value of the ownerModerate setting in the contentreview-config.xml file. For more information, see *Managing content moderation and flagged content*.

In addition to the global moderation interface and the communities moderation interface, public moderation APIs are available to allow third-party developers to moderate community forum content and community file content. For more information, refer to the Forums API section of the [HCL Connections API Documentation](http://www-10.lotus.com/ldd/appdevwiki.nsf/xpDocViewer.xsp?lookupName=IBM+Connections+4.5+API+Documentation#action=openDocument&content=catcontent&ct=prodDoc).

**Parent topic:** [Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Roles](../admin/r_admin_common_user_roles.md)

[Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)

[Moderating forums](../admin/c_admin_forums_moderation.md)

[Moderation overview](../admin/c_admin_common_moderation_over.md)

