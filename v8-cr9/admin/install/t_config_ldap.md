# Preparing to configure the LDAP directory {#t_config_ldap .task}

Determine which Lightweight Directory Access Protocol \(LDAP\) attributes you want to use as the identifiers for HCL Connections users.

Ensure that you have installed a supported LDAP directory. For more information about supported LDAP directories, see [Detailed System Requirements for HCL Connections](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).

To ensure that the Profiles population wizard can return the maximum number of records from your LDAP directory, set the Size Limit parameter in your LDAP configuration to match the number of users in the directory. For example, if your directory has 100,000 users, set this parameter to 100000. For more information, see the documentation for your LDAP directory. If you cannot set the Size Limit parameter, you could run the wizard multiple times. Alternatively, you could write a JavaScript™ function to split the original LDAP search filter, then run the `collect_dns_iterate.bat` file, and finally run the `populate_from_dns_files.bat` file.

To prepare to configure your LDAP directory with IBM® WebSphere® Application Server, complete the following steps:

1.  Identify LDAP attributes to use for the following roles. If no corresponding attribute exists, create one. You can use an attribute for multiple purposes. For example, you can use the mail attribute to perform the login and messaging tasks.

    Display name
    :   The cn LDAP attribute is used to display a person's name in the product user interface. Ensure that the value you use in the cn attribute is suitable for use as a display name.

    Log in
    :   Determine which attribute or attributes you want people to be able to use to log in to HCL Connections. For example: uid. See *Choosing login values* for important considerations when deciding which attributes to use.

    !!! note
        The values of the login name attribute must be unique in the LDAP directory.

    Messaging
    :   \(Optional.\) Determine which attribute to use to define the email address of a person. The email address must be unique in the LDAP directory. If a person does not have an email address and does not have an LDAP attribute that represents the email address, that person cannot receive notifications.

    Global unique identifier \(GUID\)
    :   Determine which attribute to use as the unique identifier of each person and group in the organization. This value must be unique across the organization. For more information, see the *Specifying the global ID attribute for users and groups* topic.

2.  Collect the following information about your LDAP directory before configuring it for WebSphere Application Server:

    -   Directory Type. Identifies and selects a directory service from the available vendors and versions.
    -   Primary host name
    -   Port
    -   Bind distinguished name
    -   Bind password
    -   Certificate mapping
    -   Certificate filter, if applicable.
    -   LDAP entity types or classes. Identifies and selects LDAP object classes. For example, select the LDAP inetOrgPerson object class for the Person Account entity, or the LDAP groupOfUniqueNames object class for the Group entity.
    -   Search base. Identifies and selects the distinguished name \(DN\) of the LDAP subtree as the search scope. For example, select o=ibm.com to allow all directory objects underneath this subtree node to be searched. For example: Group, OrgContainer, PersonAccount, or inetOrgPerson.

-   **[LDAP objectclass/attribute pairings for nested groups](../install/r_inst_ldap_object_class_attribute_pairings.md)**  
The required Objectclass/Attribute pairings for nested groups are different for each LDAP directory type.

**Parent topic:**[Pre-installation tasks](../install/c_preinstall_actions.md)

