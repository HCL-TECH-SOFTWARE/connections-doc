# Moving communities {#c_com_move_community .concept}

Move communities around for better and more relevant organization.

## Limitations to moving communities { .section}

-   You must have Owner access both to the community that you intend to move and to the community you intend to move it into.
-   If a community has subcommunities, you cannot move it. However, you can move the subcommunities.
-   You can move a community or subcommunity to a new parent of the same type only \(that is, an internal or external community\). That means you can move an *internal* community or subcommunity only to a new parent that is also *internal*.

## What changes when I move a community? { .section}

When you move a community, the following changes may happen depending on the membership and access level of the moved community and the one moved into:

-   A subcommunity cannot be less restrictive than its parent. Therefore, when you move a community, the access level of the community that is being moved can be modified as shown in the following table. For more information, see [Creating subcommunities to reflect organizational change](c_com_create_subcommunity.md).

    |Community A \(parent\)|Community B \(before it is made a subcommunity of A\)|Community B \(after it is made a subcommunity of A\)|
    |----------------------|-----------------------------------------------------|----------------------------------------------------|
    |Public to My Organization|Public to My Organization|No change|
    |Public to My Organization|Moderated|No change|
    |Public to My Organization|Restricted \(unlisted\)|No change|
    |Public to My Organization|Restricted \(listed\)|No change|
    |Moderated|Public to My Organization|Changed to Moderated|
    |Moderated|Moderated|No change|
    |Moderated|Restricted \(unlisted\)|No change|
    |Moderated|Restricted \(listed\)|No change|
    |Restricted \(unlisted\)|Public to My Organization|Changed to Restricted \(unlisted\)|
    |Restricted \(unlisted\)|Moderated|Changed to Restricted \(unlisted\)|
    |Restricted \(unlisted\)|Restricted \(unlisted\)|No change|
    |Restricted \(unlisted\)|Restricted \(listed\)|Changed to Restricted \(unlisted\)|
    |Restricted \(listed\)|Public to My Organization|Changed to Restricted \(unlisted\)|
    |Restricted \(listed\)|Moderated|Changed to Restricted \(unlisted\)|
    |Restricted \(listed\)|Restricted \(unlisted\)|No change|
    |Restricted \(listed\)|Restricted \(listed\)|No change|

-   Members and owners in the moved community are added to the new parent, if they're not there already.
-   Owners in the new parent are added to the moved subcommunity.

## What happens to community invitees? { .section}

When you move a community, any users that are invited to join the community but have not yet joined are removed. It helps to record any invited users before you move the community:

1.  On the moved community's page, click **Members** in the community menu.
2.  Click the **Invitations** tab to see if there are any invited users and note them.
3.  Move the community.

When the move is complete, you can re-invite any users that were removed from the invitation list. For more information, see [Inviting people to join](c_com_invite_members.md).

-   **[Moving a community to become a subcommunity of another community](../communities/t_com_move_community_sub.md)**  
Integrate diverse communities by moving a community to become a subcommunity of another community.
-   **[Moving a subcommunity to become a top-level community](../communities/t_com_move_community_reparent.md)**  
Keep your communities relevant by moving a subcommunity to become a separate top-level community.

**Parent topic:**[Managing your community to keep it relevant](../communities/c_com_manage_communities.md)

**Related information**  


[Creating a community to encourage collaboration](../communities/t_com_create.md)

[Inviting people to join](../communities/c_com_invite_members.md)

