# Configuring WAS for Groups {#t_inst_config_was_for_groups .task}

HCL Connections applications can use group features if they have configured correctly in WebSphere Application Server.

Connections requires that Group membership be configured in IBM WebSphere Application Server \(WAS\).

IBM WebSphere Application Server configuration is necessary to take advantage of the group features and functionality in HCL Connections. Configuration depends on which LDAP repository is configured in WAS and in a specifc LDAP service provider, such as Active Directory, ITDS, Domino, Sun, or Novell. Group expansion and group membership are two different concepts and LDAP servers treat them differently.

Think of Group expansion as performing the action For a particular group, return a list of all its members. Group expansion can occur for direct group membership, for example give me all members for this group, or for a nested level give me all the members of this group, and continue on to expand all the members of groups that are groups and so on, which can be a resource-intensive feature. Users can exploit these features in HCL Connections using type-ahead or the Group Browse feature, searching for groups using type-ahead to enter exact group names, or partial names. In the search results of each application users are presented with a single group, nested groups, or nothing. This capability requires a specific configuration in WAS.

Conversely, Group membership performs the action Return all the groups that a given user or group is a member of, Group membership can discover a person's group and community membership across Connections applications such as Activities, Communities, Files and Wikis. Each application uses it to grant access to content, adding or modifying membership, and so on. LDAP directories can be deployed to use nested groups \(groups that contain group members\). Determining group membership can affect the performance of Connections applications and directory providers \(LDAP\).

You must configure two attributes in WAS to take advantage of group membership and group expansion features:

-   Membership
-   Member

Configure the Membership and Member attributes as follows:

1.  From the Integrated Solutions Console, navigate to **Global Security** \> **Federated Repositories** \> **Manage repositories**.

2.  Select your LDAP and then select**Group attribute definition** from the **Additional Properties** section.

3.  Add the Membership attribute.

    If you utilize nested groups, you'll need to be aware of the operational attribute for nested and add that value.

4.  Choose the Name of the group Membership operational attribute:

    This value depends on the LDAP repository configured in WAS. Refer to [LDAP objectclass/attribute pairings for nested groups](r_inst_ldap_object_class_attribute_pairings.md) to determine the appropriate operational attribute for your LDAP service provider.

5.  Choose the scope of the group membership attribute.

6.  Click **Apply** and then **OK**.

7.  While still on the Manage repositories tab, select your LDAP type, for example AD2008, and then select **Federated repositories entity types to LDAP object classes mapping** in the **Additional Properties** section.

8.  Enter the Member attribute/Objectclass pairing that is the default for your particular LDAP service provider. This value depends on the LDAP repository configured in WAS. Refer to [LDAP objectclass/attribute pairings for nested groups](r_inst_ldap_object_class_attribute_pairings.md) to determine the appropriate operational attribute for your LDAP service provider.

9.  Click **Apply** and then **OK**.


-   **[Deploying nested groups in WAS for Domino LDAP service provider](../install/t_inst_deploy_nested_in_was_for_domino.md)**  
Deploying nested LDAP groups for an Domino LDAP service provider involves specifying the group membership attribute in the WebSphere Application Server \(WAS\) Integrated Solutions Console \(ISC\).
-   **[Deploying nested groups in WAS for Active Directory](../install/t_inst_deploy_nested_in_was_for_active_dir.md)**  
Deploying nested LDAP groups for Active Directory involves specifying the group membership attribute in the WebSphere Application Server \(WAS\) Integrated Solutions Console \(ISC\).
-   **[Deploying nested LDAP groups in WAS for IBM Security Directory Integrator server](../install/t_inst_deploy_nested_in_was_for_tdi.md)**  
If WebSphere Application Server has been configured with the IBM Security Directory Integrator server LDAP repository and WebSphere has been enabled for nested groups, you must configure the Membership and Member attributes in a special way to take advantage of nested groups.

**Parent topic:**[Setting up federated repositories](../install/t_inst_federated_repositories.md)

