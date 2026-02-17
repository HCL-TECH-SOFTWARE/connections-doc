# Things to know before creating a community template {#c_things_to_know_before_create_community_template .concept}

As a community template administrator, learn what results to expect when you use the [HCL Connections Administration Console](t_admin_comm_templates_manage.md) to create a template.

A community template is a copy of certain aspects of an existing community \(such as the layout and some apps, including some of their content\). To create a template you'll need the URL of the source community. You can associate the new template with categories that you can filter on later to choose an appropriate template on which to base a new community.

A community template exists independently from its parent community, but records the community ID. A community created from the template has the template ID.

Later, when a community is created from the template, the creation dates of the contents are what they were in the the template, but the "last modified" dates are updated with the time that the community is created.

Not all of the elements in a community are included when it is copied as a template. The following list gives the breakdown:

What is included in a template
:   Community title

:   Community description

:   Tags

:   Access type \(Public to the Organization, Moderated, or Restricted\)

:   Settings

:   Layout

:   Logo

:   Related communities

:   Bookmarks

:   Apps plus content

:   External apps

:   External access \(whether community owners can invite external members\)

What is NOT included in a template
:   Subcommunities

:   Who follows the community

:   Who subscribes to the community

:   Who are members

:   Pending invitations

:   File versions

:   Social information such as status updates, likes, download history, and so on

!!! note 

    The community template will copy the External Access flag from the original community. This flag limits the ability of a community to invite external members or not invite them, and it cannot be changed in communities created from the template. If you require external access, make sure to create a template from a community that allows external member access.

**Parent topic:** [Administering community templates](../admin/t_admin_comm_templates_container.md)
