# LDAP objectclass/attribute pairings for nested groups {#r_inst_ldap_object_class_attribute_pairings .reference}

The required Objectclass/Attribute pairings for nested groups are different for each LDAP directory type.

## Consider whether you need nested groups { .section}

Nested groups will not be enumerated unless you specifically configure WebSphere Application Server \(WAS\) to enumerate them. Do not take the choice to configure WAS to enumerate nested groups lightly because using nested groups in applications can cause those applications to exact heavy loads on the configured LDAP server in order to resolve nested group expansion. When deciding whether to configure WebSphere Application Server to use nested groups, consider the following factors:

-   You should have a basic understanding of the depth and breadth \(numbers and layers of nested groups\) existing in your LDAP directory so you can estimate the performance impact that queries that expand nested groups will have on your configured LDAP server.
-   Verify that the LDAP directory has been deployed using Nested groups.

    !!! note
        In some cases, such as IBM Security Directory Server, the LDAP administrator had to have created nested groups with specific Nested Group Objectclasses. Refer to the IBM Security Directory Server documentation for more information.

-   The attribute pairings listed in Table 1 are the standard defaults for particular LDAP Directories. As always, consult your LDAP documentation and LDAP administrator to ensure that your deployed LDAP uses those defaults before configuring WebSphere Application Server.

The group member attribute indicates the groups an entry belongs to. It can take multiple values and uses distinguished name syntax. Group membership is determined by enumerating through all member attributes for a particular group entry. In addition:

-   Attributes differ depending on each LDAP service provider
-   If nested groups are deployed in LDAP and enabled in WAS, those groups will be enumerated as well
-   Nested groups require an operational attribute to enable Connections to utilize the efficient manner that LDAP providers use to enumerate group membership.

The objectclass defines the collection of attributes that can be used to define an entry.

The operational attribute is needed to expand nested groups and has special meaning to a specific Directory server, is maintained by the server, and reflects information the server manages about an entry or those that affect server operation.

Here are the required Objectclass/Attribute pairings broken out by LDAP directory type:

|LDAP|Group member attribute/objectclass pairing|Group member operational attribute|
|----|------------------------------------------|----------------------------------|
|IBM® Directory Security Server 6.2|attribute: uniquemember<br>objectclass: groupOfUniqueNames<br>nested attribute: ibm-membershipGroup<br>nested objectclass: ibm-nestedGroup |ibm-allGroups |
|Active Directory 2008|attribute: member<br>objectclass: group<br>**Note:** Active Directory does not expand nested groups automatically. WAS requires special configuration for group expansion.  |memberOf |
|IBM Domino® 9.0.x|attribute: member<br>objectclass: dominoGroup<br>|DominoAccessGroups |
|Sun Directory Server 7|attribute:uniquemember<br>objectclass: groupOfUniqueNames|isMemberOf |
|Novell eDirectory 5.8.8|attribute: member<br>objectclass: groupOfNames |groupMembership |

!!! note
    To take advantage of nested groups for Active Directory, Connections 5.0 CR1 or higher must be deployed. Also, a specific JVM must be set on the system that runs WAS and Connections. Add the following JVM to the Generic JVM argument: `Dcom.ibm.connections.recursively.search.membership=true`.

**Parent topic:**[Preparing to configure the LDAP directory](../install/t_config_ldap.md)

