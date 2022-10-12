# Setting an LDAP group to be domain administrator in addition to, or instead of, a specific user {#t_inst_set_ldap_group_domain_admin .task}

Select or create a group in LDAP to act as IBM® FileNet® domain or Object Store administrators or both, and add any desired user for this administrator role into this group. You should consult your LDAP documentation for complete information about LDAP groups. If a group is not granted administrator access and the administrative user is later deleted, it might be difficult to recover administrative access to FileNet, and functions including library creation and search indexing might not function.

