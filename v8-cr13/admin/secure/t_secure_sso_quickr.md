# Enabling single sign-on for Lotus Quickr {#t_secure_sso_quickr .task}

Before installing the HCL Connections™ Connector for Quickr®, enable single sign-on \(SSO\) between Connections and Lotus® Quickr.

-   This is an optional task.
-   This task applies to Quickr J. For information about enabling single sign-on \(SSO\) for Quickr D, see the [Enabling single sign-on for Domino®](t_secure_domino.md) topic.
-   If you are enabling SSO between Connections and a product that is deployed on a pre-6.1 version of WebSphere® Application Server, you must first complete the steps described in the [Enabling single sign-on for stand-alone LDAP](t_setup_standalone_ldap.md) topic.

When your Connections applications are deployed on servers in the same WebSphere Application Server cell, SSO is enabled by default. However, when they applications are hosted in different cells, they use different LTPA certificates and you must manually enable SSO between Connections and Quickr. To do this, you must exchange LTPA certificates between the cells.

If all the cells use Federated Repositories, set the realm name in each cell to the same value. For example, ensure that all cells use defaultWIMFileBasedRealm or a custom realm name such as exampleRealmName. Set the realm names before you export the LTPA token.

If any cell uses a stand-alone LDAP instead of Federated Repositories, set the realm names of all cells to the name of the LDAP server. For example, if you connect to an LDAP server at ldapserver.example.com over port 389, set all the realm names to ldapserver.example.com:389. Set the realm names before you export the LTPA token.

In either scenario, all cells must use the same realm name to facilitate SSO between the cells.

To allow SSO between Connections and Lotus Quickr, complete the following steps:

1.  On the Connections Deployment Manager:

    1.  Log into the WebSphere Application Server Integrated Solutions Console as an administrator and expand **Security** \> **Global security**.

    2.  Expand **Web and SIP security** and then click **Single sign-on \(SSO\)**.

    3.  Enter the domain name

        .

        !!! note 
            
            Ensure that the domain name that you enter is valid: On the node where Lotus Quickr is installed, log into the WebSphere Application Server Integrated Solutions Console as an administrator, click **Security** \> **Global security** \> **Web and SIP security** \> **Single sign-on \(SSO\)** and verify that the domain name is present.

2.  On the node where Lotus Quickr is installed, complete the following steps:

    1.  Log into the WebSphere Application Server Integrated Solutions Console as an administrator, and click **Security** \> **Secure administration, applications, and infrastructure**.

    2.  Click **LTPA** and provide values for the following fields:

        -   Password – Type a secure password that you will remember. You will need to provide this password later, when you configure to the keys you are exporting.

            !!! note 
                
                Confirm the password.

        -   Fully qualified key file name – Specify a valid path and name for the file that will hold the exported keys.
    3.  Click **Export keys**

3.  Complete the following steps on the system that hosts the Deployment Manager:

    1.  Log into the WebSphere Application Server Integrated Solutions Console as an administrator, and click **Security** \> **Global security** \> **LTPA**

    2.  In the **Cross-cell single sign-on** section, provide values for the following fields:

        -   Password – Type the password that you used for the Lotus Quickr key file that you exported.

            !!! note 
                
                Confirm the password.

        -   Fully qualified key file name – Specify the path and name of the Lotus Quickr key file that you exported.
    3.  Click **Import keys**.

4.  Restart the Deployment Manager.


**Related information**  


[Enabling single sign-on for Domino](../secure/t_secure_domino.md)

[Enabling single sign-on for standalone LDAP](../secure/t_setup_standalone_ldap.md)

[Enabling single sign-on for Domino](../secure/t_secure_domino.md)

