# Setting up federated repositories {#t_inst_federated_repositories .task}

Use federated repositories with IBM® WebSphere® Application Server to manage and secure user and group identities.

Ensure that you have completed the steps described in [Preparing to configure the LDAP directory](t_config_ldap.md).

You can configure the user directory for HCL Connections to be populated with users from more than one LDAP directory.

**Important:** Ensure that you meet the following guidelines for entity-object class mapping:

-   If you are using IBM Tivoli® Directory Security Server, decide whether your deployment will rely on the LDAP **groupOfNames** or **groupOfUniqueNames** object class for group entities. WebSphere Application Server uses **groupOfNames** by default. In most cases, you need to delete this default mapping and create a new mapping for group entities using the LDAP **groupOfUniqueNames** object class.
-   If you are using the **groupOfUniqueNames** object class for group entities, use the **uniqueMember** attribute for the group member attribute.
-   If you are using the **groupOfNames** object class group entities, use the member attribute for the group member attribute.

To set up federated repositories in WebSphere Application Server, complete the following steps:

1.  Start WebSphere Application Server and log in to the Integrated Solutions Console on the Deployment Manager by going to the following web address: http://websphere\_Application\_Server\_host\_name:9060/ibm/console

2.  Click **Log in** and enter the credentials of the administrative user ID that you specified during the installation of WebSphere Application Server.

3.  Click **Security** \> **Global Security**.

4.  Select **Federated Repositories** from the **Available realm definitions** field, and then click **Configure**.

5.  If installing HCL Connections Content Manager, set the realm name to defaultWIMFileBasedRealm.

    !!! note
        After installation has completed, you can change the realm name as you prefer. When changing realms names, the logs might show LTPA errors, and as such the scheduled tasks list should be cleared to avoid errors in the logs.

6.  Click **Add repositories** and then, on the Repository reference page, click **New Repository** \> **LDAP repository**.

7.  On the New page, type a repository identifier, such as myFavoriteRepository into the **Repository identifier** field.

8.  Specify the LDAP directory that you are using in the **Directory type** field.

    For more information about supported directory products, see [Detailed system requirements for HCL Connections](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).

9.  Type the host name of the primary LDAP directory server in the **Primary host name** field. The host name is either an IP address or a domain name service \(DNS\) name.

10. If your directory does not allow LDAP attributes to be searched anonymously, provide values for the **Bind distinguished name** and **Bind password** fields. For example, the Domino® LDAP directory does not allow anonymous access, so if you are using a Domino directory, you must specify the user name and password with administrative level access in these fields.

11. Specify the login attribute or attributes that you want to use for authentication in the **Login properties** field. Separate multiple attributes with a semicolon. For example: uid;mail.

    See [Choosing login values](c_install_choose_login.md) for information about the types of login values that can be used.

    !!! note
        If you are using Active Directory and you use an email address as the login, specify **mail** as the value for this property. If you use the **samAccountName** attribute as the login, specify uid as the value for this property.

12. Click **Apply** and then click **Save**.

13. On the Repository reference page, the following fields represent the LDAP attribute type and value pairs for the base element in the realm and the LDAP repository. \(The type and value pair are separated by an equal sign \(=\), for example: o=example. These can be the same value when a single LDAP repository is configured for the realm or can be different in a multiple LDAP repository configuration.\)

    **Distinguished name of a base entry that uniquely identifies this set of entries in the realm**
    :   Identifies entries in the realm. For example, on an IBM Directory Server or Active Directory, the base entry is `dc=example, dc=com`.

    !!! tip
        If you are using Domino LDAP, set this field to `root`. By using `root`, you ensure that WebSphere does not use a base entry when searching this repository. The reason that you do this has to do with how groups work in Domino LDAP: by default Domino uses flat groups, and therefore they do not belong to a base certifier. If you set the **Distinguished name of a base entry that uniquely identifies this set of entries in the realm** field to root, no base is used when searching this directory, and all users and groups from the directory are found.

    **Distinguished name of a base entry in this repository**
    : Identifies entries in the LDAP directory. Leave this field blank.

    : This value defines the location in the LDAP directory information tree from which the LDAP search begins. The entries beneath it in the tree can also be accessed by the LDAP search. In other words, the search base entry is the top node of a subtree which consists of many possible entries beneath it.

14. Click **Apply** and then click **Save**.

15. Click **OK** to return the Federated Repositories page.

16. In the Repository Identifier column, click the link for the repository or repositories that you just added.

17. In the Additional Properties area, click the **Federated repositories entity types to LDAP object classes mapping** link.

18. Click the **Group** entity type and modify the object classes mapping. You can also edit the **Search bases** and **Search filters** fields, if necessary. Enter LDAP parameters that are suitable for your LDAP directory.

    !!! note
        You can accept the default object classes value for Group. However, if you are using Domino, change the value to dominoGroup.

19. Click **Apply** and then click **Save**.

20. Click the **PersonAccount** entity type and modify the default object classes mapping. You can also edit the **Search bases** and **Search filters** fields, if necessary. Enter LDAP parameters that are suitable for your LDAP directory. Click **Apply**, and then click **Save** to save this setting.

    !!! note
        If you are using a Domino LDAP, replace the default mapping with dominoPerson object classes for person accounts.

21. In the navigation links at the beginning of the page, click the name of the repository that you have just modified to return to the Repository page.

22. If your applications rely on group membership from LDAP, complete the following steps:

    1.  Click the **Group attribute definition** link in the Additional Properties area, and then click the **Member attributes** link.

    2.  Click **New** to create a group attribute definition.

    3.  Enter group membership values in the **Name of member attribute** and **Object class** fields.

    4.  Click **Apply** and then click **Save**.

    !!! note

        -   If you have already accepted the default **groupOfNames** value for Group, then you can also accept the default value for **Member**.
        -   If you changed objectclass for Group to dominoGroup [earlier](t_inst_federated_repositories.md#ClickTheGroupEntityTypeAndModifyThe-53A9C6FC), you must add dominoGroup to the definition of **Member**.
        -   If you do not configure the group membership attribute, then the group member attribute is used when you search group membership. If you need to enable searches of nested group membership, then you must configure the group membership attribute.
        -   Consider an example of group membership attribute for using Activities: the Member attribute type is used by the **groupOfNames** object class, and the **uniqueMember**attribute type is used by **groupOfUniqueNames.**
        -   Here are the required Objectclass/Attribute pairings broken out by LDAP directory type:

        |LDAP|Group member attribute/objectclass pairing|Group member operational attribute|
        |----|------------------------------------------|----------------------------------|
        |IBM Tivoli Directory Security Server 6.4|attribute: uniquemember<br>objectclass: groupOfUniqueNames<br> nested attribute: ibm-membershipGroup<br>nested objectclass: ibm-nestedGroup<br> |ibm-allGroups |
        |Active Directory 2012 R2 and 2016|attribute: member<br>objectclass: group |memberOf |
        |IBM Domino 8.5.3, 9.0.1|attribute: member<br>objectclass: dominoGroup |DominoAccessGroups |
        |Oracle Directory Server Enterprise 11.1.2|attribute:uniquemember<br> objectclass: groupOfUniqueNames |isMemberOf |
        |Novell eDirectory 8.8 SP8|attribute: member<br>objectclass: groupOfNames |groupMembership |

    !!! note
        Select a **Scope** option based on LDAP type.

        -   Select Nested for IBM Tivoli Directory Security Server and IBM Domino directories. Nested contains only immediate members of the group without members of subgroups.
        -   Select Direct for Active Directory. Direct contains direct members and members nested within subgroups of this group.

    For more information about making nested group memberships available, refer to [Locating user group memberships in a Lightweight Directory Access Protocol registry](http://www-01.ibm.com/support/knowledgecenter/SSEQTP_8.5.5/com.ibm.websphere.base.doc/ae/tsec_directindirectldap.html?cp=SSEQTP_8.5.5%2F1-8-2-31-2-1-1-2) for IBM Directory Server and Domino and to[Authentication using Microsoft™ Active Directory](http://www-01.ibm.com/support/knowledgecenter/SSEQTP_8.5.5/com.ibm.websphere.base.doc/ae/csec_was_ad.html?cp=SSEQTP_8.5.5%2F1-8-2-31-2-19-0) for Active Directory.

23. You will generally achieve best LDAP performance by enabling Context Pooling. To enable Context Pooling, follow these steps:

    1.  Under **Additional Properties**, click the **Performance** link.
    2.  Ensure that the setting **Use connection pooling** is not checked
    3.  Select the **Enable context pooling** option. The default settings of**Initial size** specified as 1, **Preferred size** as 3, and **Maximum size** as 0 work well.
24. If you want to support more than one LDAP directory, repeat steps 6-23 for each additional LDAP directory.

25. Set the new repository as the current repository:

    1.  Click **Global Security** in the navigation links at the beginning of the page.

    2.  Select **Federated Repositories** from the **Available realm definitions** field, and then click **Set as current**.

    3.  Click **Apply** and then click **Save**.

26. Enable login security on WebSphere Application Server:

    1.  Select the **Administrative Security** and **Application Security** check boxes. For better performance, clear the **Java 2 security** check box.

    2.  Click **Apply** and then click **Save**.

    The administrative user name and password are now required because you set up security on WebSphere Application Server.

27. From the WebSphere Application Server Integrated Solutions Console, navigate to **Security** \> **Global security** \> **web and SIP security** \> **Single sign-on \(SSO\)**. In the Domain name field, enter the domain name for the Connections environment, for example .example.ibm.com

    Refer to [Setting the single sign-on domain name](../secure/t_set_SSO_domain-name.md) for more information.

28. To enable single sign-on \(SSO\) for HCL Connections, prepare the WebSphere Application Server environment by completing the following steps:

    1.  From the WebSphere Application Server Integrated Solutions Console, select **Security** \> **Global security** \> **web and SIP security** \> **Single sign-on \(SSO\)**.

    2.  Select **Enabled**, **Interoperability Mode** \(optional\) and **web inbound security attribute propagation**.

        !!! note
            You must click Apply before continuing to the next step.

    3.  Return to the Global security page and click **web and SIP security** \> **General settings**.

    4.  Select **Use available authentication data when an unprotected URI is accessed**.

    5.  Click **Apply** and then click **Save**.

    !!! note
        For more information about SSO security, see [Configuring single sign-on](../secure/c_sec_config_sso.md).

29. Create an administrator for WebSphere Application Server:

    1.  Restart the DM and then log into the DM again.

    2.  Click **Users and Groups** \> **Administrative user roles** and then click **Add**.

    3.  Select **Adminstrator** from the Roles box and then search for a user.

    4.  Select the target user and click the arrow to move the user name to the Mapped to role box.

    5.  Click **OK** and then click **Save**.

    6.  Log out of the DM.

    7.  Restart the DM and the nodes.

    8.  Log into the DM using the new administrator credentials.

    !!! note
        Ensure that this user ID does not have spaces in the name.

30. Set a primary administrative user:

    1.  Click **Security** \> **Global Security**.

    2.  Select **Federated Repositories** from the **Available realm definitions** field, and then click **Configure**.

    3.  Enter the user name that you mapped in the previous step in the **Primary administrative user name** box.

    4.  Click **Apply** and then click **Save**.

31. Log out of the DM and restart WebSphere Application Server.

32. When WebSphere Application Server is running again, log in to the Integrated Solutions Console using the primary administrative user name and password.

33. Test the new configuration by adding some LDAP users to the WebSphere Application Server with administrative roles.

34. If you are using SSL for LDAP, add a signer certificate to your trust store by completing the following steps:

    1.  From the WebSphere Application Server Integrated Solutions Console, select **SSL Certificate and key management** \> **Key Stores and certificates** \> **CellDefaultTrustStore** \> **Signer Certificates** \> **Retrieve from port**.

    2.  Type the DNS name of the LDAP directory in the **Host** field.

    3.  Type the secure LDAP port in the **Port** field \(typically 636\).

    4.  Type an alias name, such as LDAPSSLCertificate, in the **Alias** field.

    5.  Click **Apply** and then click **Save**.

35. Verify that users in the LDAP directory have been successfully added to the repository:

    1.  From the WebSphere Application Server Integrated Solutions Console, select **Users and Groups** \> **Manage Users**.

    2.  In the **Search by** field, enter a user name that you know to be in the LDAP directory and click **Search**. If the search succeeds, you have partial verification that the repository is configured correctly. However, this check cannot check for the groups that a user belongs to.

        If you leave the default **Search by** field of User ID, then you need to specify a known UID within the LDAP in the search input field.


You have configured WebSphere Application Server to use a federated repository.

-   **[Choosing login values](../install/c_install_choose_login.md)**  
Determine which LDAP attribute or attributes you want to use to log in to HCL Connections.
-   **[Disabling WebSphere Application security settings before installing HCL Connections](../install/t_install_was_disablesecurity.md)**  
Confirm the disabling of some WebSphere Application Server security settings before you install HCL Connections.
-   **[Configuring WAS for Groups](../install/t_inst_config_was_for_groups.md)**  
HCL Connections applications can use group features if they have configured correctly in WebSphere Application Server.

**Parent topic:**[Pre-installation tasks](../install/c_preinstall_actions.md)

