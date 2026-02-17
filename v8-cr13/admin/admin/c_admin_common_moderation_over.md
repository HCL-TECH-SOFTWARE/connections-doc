# Moderation overview {#c_admin_common_moderation_over .concept}

If the moderation application is installed and enabled, you can define a person or set of people who will review and approve the content that users add to certain applications before it is published or review and act on content that has been flagged as problematic.

Moderation can be configured to make moderation available for global moderators, community owners or blog owners, as follows:

**Global moderators**
:   User assigned the global-moderator Java EE role for the Moderation component can review and manage content for blogs, forums, and community files from the global moderation interface, which is accessed using the **Moderation** link in the application menu bar. The link is only visible to users who have been assigned the Java EE global-moderator role. For more information about assigning roles, see *Roles*.

**Community moderators**
:   When owner moderation is enabled for communities, community owners can access moderation options for their community by opening the community and selecting **Community Actions** \> **Moderate Community**. Community moderators can only manage the content of communities that they own, and they can only do so from the community moderation interface; they cannot access the global moderation interface.

    You can specify whether owner moderation is enabled by changing the value of the ownerModerate setting in the contentreview-config.xml file. For more information, see *Managing content moderation and flagged content*.

**Blogs moderators**
:   If the Moderation service is enabled, you can moderate Blogs from the central moderation interface. If the Moderation service is not enabled, you can moderate Blogs from a moderation interface available from the Blogs application. When owner moderation is enabled for Blogs, blog owners can access moderation options for a blog they own by opening the blog and choosing the **Moderation** tab. If moderation is enabled for a blog, the blog owner can review content before it is posted to a blog. In addition, users of the Blogs application have the options to flag content as inappropriate. When content is flagged, the moderator is informed and can take action from the moderation interface.

In addition to the user interfaces available for moderation, there is a public moderation API that can be leveraged by third-party developers to extend the capabilities of content moderation.

-   **[Moderation roles](../admin/c_admin_common_moderation_roles.md)**  
Monitor and control the content of blogs, community files, and forums using the moderation tools.

**Parent topic:** [Administering Moderation](../install/c_config_moderation_app.md)

**Related information**  


[Moderating forums](../admin/c_admin_forums_moderation.md)

[Moderating the content in a community](../admin/c_admin_communities_moderation.md)

