# Deploying nested groups in WAS for Domino LDAP service provider {#t_inst_deploy_nested_in_was_for_domino .task}

Deploying nested LDAP groups for an Domino LDAP service provider involves specifying the group membership attribute in the WebSphere Application Server \(WAS\) Integrated Solutions Console \(ISC\).

Make sure you set the base element in the realm to root when you [set up federated repositories](t_inst_federated_repositories.md).

1.  Navigate to **Global Security** \> **Federated repositories** \> **repository\_name** \> **Group Attribute definition**.

2.  Under **General Properties**, enter dominoAccessGroups in the **Name of group membership attribute** field.

3.  Select **Nested** for the **Scope of group membership attribute** field.


**Parent topic:**[Configuring WAS for Groups](../install/t_inst_config_was_for_groups.md)

