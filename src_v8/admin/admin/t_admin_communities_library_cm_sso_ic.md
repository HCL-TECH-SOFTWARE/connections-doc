# Configuring HCL Connections for SSO {#configureibmconnectionsforsso .task}

Configure HCL Connections for single sign-on.

To configure HCL Connections for SSO, see the topic *Configuring single sign-on* in this documentation. For example, if the IBM® Content Manager server is using a standalone LDAP, follow steps in *Enabling single sign-on for standalone LDAP* before performing the steps in this topic.

To complete the SSO configuration between HCL Connections and IBM FileNet® Collaboration Services, you must synchronize the LTPA tokens between the two servers.

1.  To synchronize the LTPA tokens between the HCL Connections and IBM Content Manager servers, perform the following steps:
2.  On the HCL Connections server, open the WebSphere® Application Server Integrated Console.

3.  Navigate to **Security** \> **Global security** \>**LTPA**.

4.  Type and confirm a password and make a note of it.

5.  Type the full path to a file on the application server where you want to store the keys, such as `/home/wasadmin/ltpa.keys`.

6.  Click **Export keys**. WebSphere exports the LTPA keys into the location you specified.

7.  Click **Apply** and save the changes.

8.  Copy the LTPA key file you just generated to the IBM FileNet Collaboration Services server and note the location.

9.  Open the WebSphere Application Server Integrated Console on the IBM FileNet Collaboration Services, and follow Step 2.

10. Navigate to the **Single sign-on** section and enter the password you entered in Step 3.

11. Type the full path to the LTPA key file from Step 7 on the IBM FileNet Collaboration Services server.

12. Click **Import Keys** and **Save**.

13. Restart the HCL Connections and IBM FileNet Collaboration Services WebSphere Application Servers for the changes to take effect.


**Related information**  


[Enabling single sign-on for standalone LDAP](../secure/t_setup_standalone_ldap.md)

[Configuring single sign-on](../secure/c_sec_config_sso.md)

