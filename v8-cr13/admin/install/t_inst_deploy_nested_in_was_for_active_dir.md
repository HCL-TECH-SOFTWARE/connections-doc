# Deploying nested groups in WAS for Active Directory {#t_inst_deploy_nested_in_was_for_active_dir .task}

Deploying nested LDAP groups for Active Directory involves specifying the group membership attribute in the WebSphere Application Server \(WAS\) Integrated Solutions Console \(ISC\).

1.  Navigate to **Global Security** \> **Federated repositories** \> **repository\_name** \> **Group Attribute definition**.

2.  Under **General Properties**, enter memberOf in the **Name of group membership attribute** field.

3.  Select **Direct** for the **Scope of group membership attribute** field.


**Parent topic:**[Configuring WAS for Groups](../install/t_inst_config_was_for_groups.md)

