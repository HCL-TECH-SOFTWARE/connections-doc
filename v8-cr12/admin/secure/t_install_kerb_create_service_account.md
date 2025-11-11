# Creating a service principal name and keytab file {#t_install_kerb_create_service_account .task}

A service account in Microsoft™ Active Directory needs to be created to support a service principal name \(SPN\) for HCL Connections™. A keytab file that the Kerberos authentication service can use to establish trust with the web browser also can be created if Kerberos authentication is desired.

Configure HCL Connections to use Active Directory as the user directory. For more information, see the [Setting up federated repositories](../install/t_inst_federated_repositories.md) topic.

Do not perform this procedure until after the Profiles database has been populated. For more information, see the [Populating the Profiles database](../install/t_prof_install_profiles_db.md) topic.

Active Directory and the domain controller must be hosted on Windows™ systems, but Connections may be installed on Linux™ or Windows systems.

If you want to use Kerberos, then you need to make sure the actual system hostname is in the keytab. For example, if you have two application server machines, host1.austin.ibm.com and host2.austin.ibm.com, the Kerberos keytab file must contain the <service\_name\>/host1.us.example.com and <service\_name\>/host2.us.example.com SPNs and their Kerberos keys. Refer to [Configuring Kerberos as the authentication mechanism using the administrative console](https://www.ibm.com/docs/was-nd/8.5.5?topic=sukaamwas-configuring-kerberos-as-authentication-mechanism-using-administrative-console) for more information.

A service principal name \(SPN\) account uniquely identifies an instance of a service. Before the Kerberos authentication service can use an SPN to authenticate a service, you must register the SPN on the account object that the service instance uses to log on. You must then create a keytab file. When a web browser tries to access the service, it must get a ticket from the Active Directory key distribution center to send with the access request. Active Directory uses the keytab file to decrypt the ticket sent from the web browser to establish that the application server can trust the browser.

These steps are performed by the Active Directory administrator, who provides the keytab files for the Connections Deployment Manager, Node1, and Node2.

In a network deployment of Connections, each node is granted a key inside a key table file. This task shows you how to merge the keys for all the nodes in your deployment into a single key table.

An SPN consists of the following information:

**Service type**
:   Specifies the protocol to use, such as HTTP.

**Instance**
:   Specifies the name of the server hosting the application. For example: finance1.us.example.com. Use the HTTP Server name or the virtual host name through which users access Connections applications. You do not need to specify a port number.

**Realm**
:   Specifies the domain name of the server hosting the application. For example: US.EXAMPLE.COM.

Specify an SPN using the following syntax: service\_type/instance@realm

For example: HTTP/finance1.us.example.com@US.EXAMPLE.COM

To create a service principal name and keytab file, complete the following steps:

1.  Synchronize the clocks of the systems hosting Connections.

    Where Kerberos is used, if the host clocks are not synchronized with the Kerberos server clock, authentication will fail.

    -   Linux:

        For information about synchronizing the system clocks in a Linux environment, refer to your operating system documentation.

    -   Windows:

        Using the domain controller as the time server, run the TimeSyn.bat file on each IBM WebSphere Application Server system hosting HCL Connections. Use the Windows Task Scheduler to run the batch file.

        For example, when finance.us.example.com is both the domain controller and the NTP time server, the TimeSyn.bat file contains the following commands:

        ```
        w32tm /config /manualpeerlist:finance.us.example.com,0x8 /syncfromflags:MANUAL
        net stop w32time
        net start w32time
        w32tm /resync
        ```

        For more information about how to use the domain controller as the time server, refer to the [How to configure an authoritative time server in Windows Server](http://support.microsoft.com/kb/816042) topic on the Microsoft Support website. For more information about running the Windows schedule task, refer to this [Time synchronization](http://support.microsoft.com/kb/307897) topic on the Microsoft Support website.

2.  Install Windows Support Tools on the systems hosting Active Directory. You must have access to these tools to run the ktpass command later in this procedure.

    For more information, refer to the [Install Windows Support Tools](http://technet.microsoft.com/library/cc755948.aspx) web page on the Microsoft Technet website.

3.  Log in to the Windows Domain Controller. You must know which server is the domain controller and you must have an administrative level user name and password.

4.  Create a new account for Connections by accessing the Active Directory Users and Computers settings.

5.  In the New Object - User window, enter a user name in the **User logon name** field and specify the domain in the corresponding field. For example, enter lcserver01 in the **User logon name** field, and enter @us.example.com in the domain field.

6.  Click **Next**.

7.  Type a password for the logon name in the **Password** field.

8.  On the Account page, select the **User cannot change password** and **Password never expires** check boxes. By preventing the password from expiring, you avoid having to recreate the keytab file after the password has changed. Click **OK** to save the new user information.

9.  Map the service principal name to the Connections user account that you created and generate a keytab file. Generate the keytab file using the HTTP Server name or the virtual host as the instance in the service principal name.

    Run the following ktpass command on the domain controller:

    ```bash
    ktpass -out path\_to\_keytab –princ SPN

    -mapuser account\_name -mapOp set –pass account\_password
    ```

    using the following variables:

    **path\_to\_keytab**
    :   File path where you want to store the generated keytab file.

    **SPN**
    :   The Kerberos service principal name.

    **account\_name**
    :   The service account name.

    **account\_password**
    :   Password associated with the service account.

    For example:

    ```bash
    ktpass -out c:\finance1.keytab -princ HTTP/finance1.us.example.com@US.EXAMPLE.COM -mapuser icserver01 -mapOp set -pass Passw0rd1
    ```

    !!! note 
        
        For extra security, you should consider creating a keytab file for each system, where each system has its own user account. If you use the same user account to generate the keytab file, use the -mapOp add parameter instead of the -mapOp set parameter.

    This example shows how to create unique keytab files for different systems:

    ```bash
    ktpass -out c:\finance1.keytab -princ HTTP/finance1.us.example.com@US.EXAMPLE.COM -mapuser icserver01 -mapOp set -pass Passw0rd1  
    ktpass -out c:\finance2.keytab -princ HTTP/finance2.us.example.com@US.EXAMPLE.COM -mapuser icserver02 -mapOp set -pass Passw0rd2  
    ktpass -out c:\finance3.keytab -princ HTTP/finance3.us.example.com@US.EXAMPLE.COM -mapuser icserver03 -mapOp set -pass Passw0rd3
    ```

10. Merge all the keytab files to make the Deployment Manager aware of the SPNs for each node.

    The following example demonstrates the procedure for merging keytab files.

    Assuming that you have created the following keytab files:

    -   krb5.keytab on the Deployment Manager
    -   krb5NodeA.keytabon Node A
    -   krb5NodeB.keytab on Node B
    
    Run the ktab command with the following switch:

    ```bash
    -m source\_keytab\_name destination\_keytab\_name
    ```

    where `source\_keytab\_name` is the name of the keytab file on the source system and `destination\_keytab\_name` is the name of the keytab file on the destination system.

    Step 1: merge the keytab file on Node A into the keytab file on the Deployment Manager:

    ```
    # ./ktab -m /etc/krb5NodeA.keytab /etc/krb5.keytab
    Merging keytab files:   source=krb5NodeA.keytab   destination=krb5.keytab
    Done! 
    ```

    Step 2: merge the keytab file on Node B into the keytab file on the Deployment Manager:

    ```
     # ./ktab -m /etc/krb5NodeB.keytab /etc/krb5.keytab
    Merging keytab files:   source=krb5NodeB.keytab   destination=krb5.keytab
    Done! 
    ```

    For more information, go to the [Using the ktab command to manage the Kerberos keytab file](http://www-01.ibm.com/support/knowledgecenter/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/rsec_SPNEGO_kerb.html) topic in the IBM WebSphere Application Server knowledge center.

11. Create a Kerberos configuration file named krb5.conf for each node. You do not need to create a configuration file for the deployment manager. To create a Kerberos configuration file, complete the following steps:

    1.  If Connections is not installed on the system that hosts the domain controller, copy the keytab file to the system where Connections is installed.

    2.  Open a command prompt on the system hosting the Deployment Manager and start the wsadmin client with the following parameters:

        -   Linux:

            ```
            ./wsadmin.sh -lang jacl -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS Port
            ```

        -   Windows:

            ```
            wsadmin -lang jacl -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS Port
            
            ```

        where:

        -   `admin\_user\_id` is the user account for the Administrator role for IBM WebSphere Application Server.
        -   `admin\_password` is the password of the WebSphere Application Server administrator.
        -   `SOAP\_CONNECTOR\_ADDRESS Port` is the SOAP port for the WebSphere Application Server Deployment Manager. The default value of the SOAP port is 8879. If you are using the default port value, you do not need to specify this parameter.
    3.  Enter the following command as one line in the wsadmin client:
        
        ```bash
        $AdminTask createKrbConfigFile

        \{

        -krbPath appserver\\java\\jre\\lib\\security\\krb5.conf

        -realm REALM

        -kdcHost kdc\_hostname

        -dns dns\_hostname

        -keytabPath path\_to\_keytab

        \}
        ```

        using the following variables:

        **appserver**
        :   The path to the WebSphere Application Server root directory. Do not specify the path to the Connections application. The krbPath parameter defines where the resulting krb5.conf configuration file is stored.

        **REALM**
        :   The Kerberos realm. Enter the name of the realm in uppercase letters.

        **kdc\_hostname**
        :   The name of the Active Directory key distribution center host. This name is typically the domain controller server.

        **dns\_hostname**
        :   The DNS server name of the domain controller server.

        **path\_to\_keytab**
        :   The file path to the directory in which the keytab file is stored.

        Use the following sample configuration file to format your entry:

        ```bash
        C:\IBM\WebSphere\AppServer\java\jre\lib\security\krb5.conf
        [libdefaults]
        	default_realm = EXAMPLE.COM
        	default_keytab_name = FILE:C:\finance1.keytab
        	default_tkt_enctypes = des-cbc-md5 rc4-hmac
        	default_tgs_enctypes = des-cbc-md5 rc4-hmac
        	kdc_default_options = 0x54800000
        #	forwardable  = true
        #	proxiable  = true
        #	noaddresses = true
        [realms]
        	EXAMPLE.COM = {
        		kdc = finance1.us.example.com:88
        		default_domain = finance1.us.example.com
        	}
        [domain_realm]
        	.finance1.us.example.com = EXAMPLE.COM
        ```

    4.  Copy the merged keytab file and the new krb5.conf file to the same location on each node.

    For more information, go to the *Creating a Kerberos configuration file* topic in the IBM WebSphere Application Server knowledge center.


**Parent topic:** [Enabling single sign-on for the Windows desktop](../secure/t_install_kerb_setup_spnego.md)

**Previous topic:** [Mapping an Active Directory account to administrative roles](../secure/t_kerb_configure_AD_account.md)

**Next topic:** [Creating a redirect page for users without SPNEGO support](../secure/t_install_kerb_create_redirect-page.md)
**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Setting up federated repositories](../install/t_inst_federated_repositories.md)

[Populating the Profiles database](../install/t_prof_install_profiles_db.md)

[How to configure an authoritative time server in Windows Server](http://support.microsoft.com/kb/816042)

[Time synchronization](http://support.microsoft.com/kb/875424)

[Install Windows Support Tools](http://technet.microsoft.com/en-gb/library/cc755948%28WS.10%29.aspx)

