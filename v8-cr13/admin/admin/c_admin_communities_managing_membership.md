# Managing membership in Communities {#c_admin_communities_managing_membership .concept}

Use administrative commands to add and remove community members. You can also disable the **Add Members** button if you do not want community owners to add people to communities without their consent, or disable the invitations feature if you do not want to allow people to invite others to join their community.

!!! note

    When users import people using the **Members** widget in Communities, user names in an email address cannot contain special characters. For example, user\_name in this email address cannot contain any special characters: user\_name@example.com.

    When the name of a group that is used in a community is renamed in LDAP, the old group name still appears on the **Members** page of the community. The new group name does not appear in the community, until a member of that group logs in and accesses Communities.

    When you delete a group from the LDAP Directory, and that group has been used by communities for membership, the deleted group still appears in the **Members** page of the community with member access. The group members no longer have member access to the community due to the group deletion, and the deleted group cannot be added to other communities.

An activity that is part of a community maintains a cache of Community users. That cache expires after 10 minutes. If the community membership of a user changes, and that user is also a member of a community activity, then membership change is only visible after the cache expires.

The following topics provide information about managing membership in Communities:

-   **[Adding owners and members to a community](../admin/t_admin_communities_add_members.md)**  
Use scripts that are accessed by using the wsadmin command line to add owners and members to existing communities. You can add individuals to a community only; you cannot add a group to a community. There is no limit on the number of members that you can add to a community.
-   **[Adding an alternate owner to Communities](../admin/t_admin_communities_add_alternate_owner.md)**  
Use scripts accessed using the wsadmin command-line tool to designate an alternate owner for the communities and subcommunities owned by a specific user.
-   **[Removing members from communities](../admin/t_admin_communities_remove_members.md)**  
Use administrative commands to remove specified users from the membership of their communities and subcommunities.
-   **[Disabling the ability to add members to a community](../admin/t_admin_communities_disable_add_members.md)**  
You can disable the functionality that allows community owners to add members to a community on a deployment-wide basis, so that instead new members must always be invited to join a community.
-   **[Limiting the membership size of communities](../admin/t_admin_communities_limit_members.md)**  
You can limit the maximum number of members that a community can contain.
-   **[Managing communities when all owners are inactive](../admin/t_admin_communities_inactive_owners.md)**  
Use scripts accessed using the wsadmin command-line tool to add more owners to communities when all of the existing owners are inactive. You can only add individual owners to a community; you cannot add an owner group to a community.
-   **[Managing default owner and member permissions](../admin/c_admin_communities_managing_default_permissions.md)**  
Use administrative commands to prevent owners from deleting a community and prevent community members from creating specific community types on a deployment-wide basis.

**Parent topic:** [Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Groups](../admin/c_admin_common_groups.md)

