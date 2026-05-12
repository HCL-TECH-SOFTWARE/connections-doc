# Moderating forums {#c_admin_forums_moderation .concept}

Enable a moderator to review and manage forum posts.

When moderation is enabled for Forums, a designated moderator can review posts before they are published to a forum and manage posts after they are added to a forum. Forums moderation is supported for community forums and stand-alone forums.

If premoderation is enabled for your deployment, when users create or reply to forum posts, the content that they add is not displayed until it is approved by a moderator. If postmoderation is enabled, the moderator can review content that is flagged as inappropriate and determine whether the content must be removed.

As administrator, you can control who has permission to moderate forum content by using two scopes:

**Global moderation**
:   You can assign the global-moderator role for Forums to specified users. For more information about assigning roles, see *Roles*.

    Users who are assigned to the global-moderator role can see an additional **Moderation** link in the application menu bar when they are logged in to HCL Connections. This link is visible only to global moderators. Clicking the link provides access to a global moderation interface where moderators can review and manage posts from stand-alone forums and community forums.

    For more information about moderating forum content from the global moderation interface, see *Moderation overview*.

**Community forum moderation**
:   Community forums can be moderated by community owners if owner moderation for Communities is enabled in the contentreview-config.xml file. For more information about how to configure owner-moderation settings, see *Managing content moderation and flagged content*.

    When owner moderation is enabled for Communities, community owners can review and manage the content of their community forums directly from the community by logging in to HCL Connections and selecting **Moderate Community** from the **Community Actions** menu. Community owners can review content only in their own community forums.

    For more information about moderating content in community forums, see *Moderating community content*.

In addition to the global moderation interface and the community forum moderation interface, public moderation APIs are available to allow third-party developers to moderate community forum content and community file content. For more information, refer to the Forums API section of the [HCL Connections 4 API Documentation](http://www-10.lotus.com/ldd/appdevwiki.nsf/xpDocViewer.xsp?lookupName=IBM+Connections+4.0+API+Documentation#action=openDocument&content=catcontent&ct=prodDoc).

**Parent topic:** [Administering Forums](../admin/c_admin_forums_overview.md)

**Related information**  


[Roles](../admin/r_admin_common_user_roles.md)

[Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)

[Moderating content before it is published](../admin/t_admin_common_moderation_pre-modui.md)

[Moderating published content that is flagged](../admin/t_admin_common_moderation_post-modui.md)

[Moderation overview](../admin/c_admin_common_moderation_over.md)

[Moderating the content in a community](../admin/c_admin_communities_moderation.md)

