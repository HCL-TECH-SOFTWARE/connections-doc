# Enabling single sign-on for Domino 

If your organization uses HCL Connections™ in a Domino® environment, you can enable single sign-on \(SSO\) for easier user authentication.

Before you can enable SSO, verify that you can access the installed Connections applications from a web browser.

Start your Domino server.

Ensure that you have a user ID with administrative access to the Domino server.

Configure an LDAP server as the user directory.

!!! note

    -   This is an optional configuration.
    -   If you are using a reverse proxy, you must specify the reverse proxy address in the LotusConnections-Config.xml file.
    -   If you are enabling SSO between Connections and a product that is deployed on a pre-6.1 version of WebSphere® Application Server, you must first complete the steps described in the [Enabling single sign-on for stand-alone LDAP](t_setup_standalone_ldap.md) topic.

Single sign-on enables users to log into one HCL Connections application and switch to other applications without needing to authenticate again.

By default, applications deployed within the same WebSphere Application Server cell are enabled for single-sign-on. To support this, the application servers share the same set of LTPA keys and the same LDAP directory configuration. Use these instructions if you want to set up SSO where Connections and Domino use different LDAP directory configurations or are hosted in different WAS cells.

The [Configuring user name mapping in the SSO LTPA token](https://help.hcltechsw.com/domino/12.0.0/admin/conf_configuringusernamemappinginthessoltpatoken_t.html) topic in the Domino information center can help you choose the correct configuration parameters for your environment.

To enable SSO for Domino, complete the following steps:

1.  Configure the LDAP for Connections:

    1.  Log into the WebSphere Application Server Integrated Solutions Console on the Deployment Manager.

    1.  Click **Security** \> **Global security**.

    2.  Select **Federated Repositories** from the **Available realm definitions** field and then click **Configure**.

    3.  Enter the realm name of the LDAP server in the **Realm name** field. For example: enterprise.example.com:389.

    4.  Click **Apply** and then click **Save**.

    5.  Synchronize the nodes.

    6.  Restart your Connections deployment.

2.  Configure the domain name:

    1.  Log into the WebSphere Application Server Integrated Solutions Console on the Deployment Manager.

    2.  Click **Security** \> **Global security**.

    3.  In the **Authentication mechanisms and expiration** area, expand **Web and SIP security** and click **Single sign-on \(SSO\)**.

    4.  Enter your Connections domain name in the Domain name field, ensuring that you add a dot \(.\) before the domain name.

    5.  Select the check boxes for **Interoperability Mode** \(optional\) and **Web inbound security attribute propagation**.

        Make sure **Set security to HTTP Only** is not enabled.

    6.  Restart your Connections deployment.

3.  Export the LTPA key file:

    1.  Log into the WebSphere Application Server Integrated Solutions Console on the Deployment Manager.

    2.  Click **Security** \> **Global security**.

    3.  In **Authentication** \> **Authentication mechanism and expiration** click **LTPA**.

    4.  In the **Password** and **Confirm password** fields, enter the password that protects the exported key.

    5.  Enter the file name of the key file that you want to generate in the **Fully qualified key file name** field.

    6.  Click **Export** keys.

    7.  Click **Apply** and then click **Save**.

4.  Set up the SSO configuration document on the Domino server by completing the steps in the [Creating a Web SSO configuration document](https://help.hcltechsw.com/domino/10.0.1/conf_creatingawebssoconfigurationdocument_t.html) topic in the Domino information center.

5.  Verify that the Domino server maps correctly between the user IDs stored in the LDAP that is used by Connections and the Domino address book.

    -   If user names are present in both the LDAP directory and the Domino Directory:
        1.  In the user Person document, click **Administration**.
        2.  Under **Client Information**, enter the user name DN that is expected by WebSphere Application Server in the **LTPA user name** field.

            **Note:** Typically, this name is the user's LDAP distinguished name \(DN\). Separate the name components with slashes. For example, if the DN is uid=jdoe,cn=sales,dc=example, dc=com, enter the following value: uid=jdoe/cn=sales/dc=example/dc=com.

    -   If user names are present in the LDAP directory only:
        1.  Open the Directory Assistance document for the LDAP directory. Alternatively, create a directory assistance database and configure the Domino server to use this database.
        2.  In the **SSO Configuration** section, enter an LDAP attribute for the name in an SSO token.

            **Note:** This attribute is used in the LTPA token when the LTPA\_UserNm field is requested. Ensure that the selected field contains the user name that WebSphere Application Server expects. Options for this field include:

            -   To use the LDAP distinguished name, enter a value of $DN. This is the most common configuration; it indicates that the user's LDAP DN is the name expected by WebSphere Application Server, rather than a name in an arbitrary LDAP field.
            -   Use any appropriate LDAP attribute, provided it uniquely identifies the user.
            -   Leave the field blank to default to the Domino distinguished name, if known. Otherwise, the default is the LDAP distinguished name.

6.  Configure Domino Server to use the new Web SSO Configuration Document:

    1.  In Domino Administrator, click **Files** and then open the server’s Address Book \(the names.nsf file\).

    2.  Select the **Servers** view and open the server that you want to configure.

    3.  Navigate to **Internet Protocols** \> **Domino Web Engine**.

    4.  Click **Edit Server** to change to Edit mode.

    5.  Select the new Web SSO Configuration Document in the Web SSO Configuration box.

    6.  Save your changes.

    7.  Using the Domino console, stop and start the HTTP task by issuing the following commands:

        tell http quit

        load http

        !!! note 
            
            The tell http restart and restart task http commands cannot read the updated SSO configuration


Verify that you can switch between Connections applications without needing to authenticate more than once.

**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)
