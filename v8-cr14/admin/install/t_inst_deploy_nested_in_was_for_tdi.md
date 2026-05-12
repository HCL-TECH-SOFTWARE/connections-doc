# Deploying nested LDAP groups in WAS for IBM Security Directory Integrator server {#t_inst_deploy_nested_in_was_for_tdi .task}

If WebSphere Application Server has been configured with the IBM Security Directory Integrator server LDAP repository and WebSphere has been enabled for nested groups, you must configure the Membership and Member attributes in a special way to take advantage of nested groups.

The Security Directory Integrator LDAP directory must have been configured to contain nested group entries using the auxiliary **objectclass** ibm-nestedGroup. For top-level groups that contain nested groups, the **ibm-memberGroup** attribute for each member \(that is a group\) must be used to denote the nested group member inside its parent group. Groups must be deployed with both the LDAP operational attributes as well as the standard LDAP groups.

!!! note
    If WAS has been configured to use the Security Directory Integrator with nested groups, HCL Connections uses the most effective group membership operational attribute. Specific configuration in both WAS and the Security Directory Integrator LDAP directory must be in place that requires a specific set of Attribute/Objectclass pairings to be deployed in the LDAP directory Most other LDAP directories do not require special deployment for membership.

!!! note
    The Connections/WAS administrator might not be the same person as the LDAP administrator.

!!! note
    If an admin wants to use nested groups, verify that their LDAP Administrator has indeed deployed groups using the LDAP Operational attributes \(as this is not the default\). Connections relies on using the LDAP Operational attributes to ensure they do not Overload the LDAP server and cause performance issues when nested groups are deployed.

The following example of a nested group uses **bold** highlighting to indicate the member atrribute/objectclass pairing and *italic* highlighting to indicate the nested membership operational attribute and nested member/object class pairing:

``` ini hl_lines="3 4 5 6 9 10 11 15 16 17 18 19 22 23 24 25"
cn=NorthAmericanSalesMembership,cn=Groups,o=ibm,dc=com
objectClass=Top
objectClass=groupOfUniqueNames ;(1)!
objectClass=ibm-nestedGroup ;(2)!
ibm-memberGroup=cn=CanadianSales Membership,o=ibm,dc=com ;(2)!
ibm-memberGroup=cn=UnitedStatesSales Membership,o=ibm,dc=com ;(2)!
cn=NorthAmericanSales Membership
description=Top Level 3 Levels
uniquemember=cn=Jane Smith45,cn=Users,o=ibm,dc=com
uniquemember=cn=CanadianSales Membership,cn=Groups,o=ibm,dc=com ;(1)!
uniquemember=cn=UnitedStatesSales Membership,cn=Groups,o=ibm,dc=com

cn=CanadianSales Membership,cn=Groups,o=ibm,dc=com
objectClass=Top
** objectClass=groupOfUniqueNames**
*objectClass=ibm-nestedGroup
ibm-memberGroup=cn=AlbertaSales Membership,o=ibm,dc=com
ibm-memberGroup=cn=QuebecSales Membership,o=ibm,dc=com
ibm-memberGroup=cn=OntarioSales Membership,o=ibm,dc=com*
cn=CanadianSales Membership
description=second level in North America
uniquemember=cn=Jane Smith55,cn=Users,o=ibm,dc=com
**uniquemember=cn=AlbertaSales Membership,cn=Groups,o=ibm,dc=com**
uniquemember=cn=QuebecSales Membership,cn=Groups,o=ibm,dc=com
uniquemember=cn=OntarioSales Membership,cn=Groups,o=ibm,dc=com

cn=QuebecSales Membership,cn=Groups,o=ibm,dc=com
objectClass=Top
**objectClass=groupOfUniqueNames***
objectClass=ibm-nestedGroup
*cn=QuebecSales Membership*
description=3rd level in North America
** uniquemember=cn=Frank Ouelette,cn=Users,o=ibm,dc=com**
```

1.  member attribute/objectclass pairing
2.  indicate the nested membership operational atrribute and member/objectclass pairing


Where:

-   **ibm-nestedGroup** is an auxiliary class that allows the optional ibm-memberGroup attribute that can be used with a structural class such as groupOfNames to enable subgroups to be nested within the parent group.
-   **ibm-memberGroup** is an attribute taken by the auxiliary class ibm-nestedGroup that identifies subgroups of a parent group entry. Members of such subgroups are regarded as members of the parent group when processing ACLs or the ibm-allMembers and ibm-allGroups operational attributes.

Perform the following steps using the Integrated Solutions console:

1.  Specify the **Membership** attribute as follows:

    1.  Navigate to **Global Security** \> **Federated repositories** \> **ITDS** \> **Group Attribute definition**.
    2.  Under **General Properties**, select ibm-allGroups in the **Name of group membership attribute** field.
    3.  For best performance when using Security Directory Integrator, select All for the **Scope of group membership attribute** field.
    4.  Click **Apply** and then **OK**.
2.  Specify the **Member** attribute as follows:

    !!! note
        The Security Directory Integrator LDAP directory also should have groups deployed using the standard supported default attribute/objectclass pairings: uniquemember/groupOfUniqueNames as described in [LDAP objectclass/attribute pairings for nested groups](r_inst_ldap_object_class_attribute_pairings.md).

    1.  Navigate to **Global Security** \> **Federated repositories** \> **ITDS** \> **Group Attribute definition** \> **Member attributes**.
    2.  Under **General Properties**, add uniquemember in the **Name of members attribute** field.
    3.  Add groupOfUniqueNames for the **Object class** field.
    4.  Select Direct for the **Scope** field.

        !!! note
            Selecting Direct is appropriate in most cases. Refer to [Default LDAP configuration mapping based on LDAP server type](https://www.ibm.com/docs/was-nd/8.5.5?topic=ldap-default-configuration-mapping-based-server-type) in the WebSphere Application Server documentation to understand all scope options for your LDAP directory service provider.

    5.  Click **Apply** and then **OK**.

**Parent topic:**[Configuring WAS for Groups](../install/t_inst_config_was_for_groups.md)

