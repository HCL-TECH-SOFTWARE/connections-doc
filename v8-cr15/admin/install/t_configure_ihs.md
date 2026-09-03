# Configuring IBM HTTP Server for an encrypted connection {#t_configure_ihs .task}

Configure IBM® HTTP Server to use an encrypted connection.

To support an encrypted connection, create a self-signed certificate and then configure IBM HTTP Server for encrypted connection traffic. If you use this certificate in production, users might receiver warning messages from their browsers. In a typical production deployment, you would use a certificate from a trusted certificate authority.

If you select to configure the HTTP server during the HCL Connections installation, this task could be performed at that time instead of as a pre-installation task. If you configure HTTP during install time you will save the necessity to perform the steps to map the applications to the plugin.

To configure IBM HTTP Server for encrypted connections, complete the following steps:

1.  Create a key file.

    1.  Start the iKeyman user interface. For more information, see [Starting the Key Management utility user interface](https://www.ibm.com/docs/was-nd/8.5.5?topic=SSAW57_8.5.5/com.ibm.websphere.ihs.doc/ihs/tihs_keymangui.html) in the IBM HTTP Server information center.

    2.  Click **Key Database File** in the main user interface, then click **New**. Select **CMS** for the Key database type. IBM HTTP Server does not support database types other than CMS.

    3.  Enter a name for the new key file. For example, *hostname-key.kdb*. Click **OK**.

        **Note:** Do not overwrite the default Plugin-key.kdb file because that file might be accessed by other applications.

    4.  Enter a password in the Password Prompt dialog box, and confirm the password. Select **Stash the password to a file** and then click **OK**. The new key database should display in the iKeyman utility.

2.  Create a self-signed certificate.

    1.  Click **Personal Certificates** in the Key Database content frame, and then click **New Self-Signed**.

    2.  Enter the required information about the key file, your web server, and organization in the dialog box.

    3.  Click **OK**.

3.  Stop IBM HTTP Server.

4.  Log in to the WebSphere® Application Server Integrated Solutions Console for the Deployment Manager and select **Servers** \> **Server types** \> **Web servers**.

5.  From the list of web servers, click the web server that you defined for this profile.

6.  On the Configuration page for this web server, click the **Configuration file** link. This action opens the httpd.conf configuration file on the Deployment Manager.

7.  Add the following text to the end of the configuration file:

    LoadModule ibm\_ssl\_module modules/mod\_ibm\_ssl.so

    <IfModule mod\_ibm\_ssl.c\>

    Listen 0.0.0.0:443

    <VirtualHost \*:443\>

    ServerName server\_name

    SSLEnable

    </VirtualHost\>

    </IfModule\>

    SSLDisable

    Keyfile "path\_to\_key\_file"

    SSLStashFile "path\_to\_stash\_file"

    where

    -   server\_name is the host name of the IBM HTTP Server.
    -   path\_to\_key\_file is the path to the key file that you created with the iKeyman utility.
    -   path\_to\_stash\_file is the path to the associated stash file.
    For example:

    -   Linux™:
        -   Keyfile "/opt/IBM/keyfiles/key\_file.kdb"
        -   SSLStashFile "/opt/IBM/keyfiles/key\_file.sth"
    -   Microsoft™ Windows™:

        Use forward slashes in the httpd.conf file on Windows.

        -   Keyfile "C:/IBM/keyfiles/key\_file.kdb"
        -   SSLStashFile "C:/IBM/keyfiles/key\_file.sth"
    where key\_file is the name that you have given to your key file and stash file.

8.  Click **Apply** and then click **OK**.

9.  Restart IBM HTTP Server to apply the changes.

10. Test the new configuration: Open a web browser and ensure that you can successfully reach https://server\_name. You might be prompted to accept the self-signed certificate on your browser.


HCL Connections users can access applications through the encrypted connection protocol.

**Attention:** If you receive an error message about failing to load a GSK library \(libgsk7ssl.so\), install the libgsk7ssl.so GSK library. For more information, go to the following Support page: [Failure attempting to load GSK library when using SSL with IBM HTTP Server](https://www-304.ibm.com/support/docview.wss?uid=swg21451021).

For more information about securing web communications, go to the [Securing applications and their environment](https://www.ibm.com/docs/was-nd/8.5.5?topic=855-securing-applications-their-environment) in the IBM WebSphere Application Server Network Deployment documentation.

For more information about the key store and setting up the IBM HTTP Server, see the [Securing communications](https://www.ibm.com/docs/was-nd/8.5.5?topic=security-securing-communications) topic in the WebSphere Application Server Network Deployment documentation.

The key file can be shared between two web servers, thus providing failover capability.

**Parent topic:**[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

**Previous topic:**[Editing the XML configuration file](../install/t_editing_xml_config_file.md)

**Next topic:**[Adding certificates to the WebSphere trust store](../install/t_exchange_keys_network.md)

**Related information**  


[Forcing traffic to be sent over an encrypted connection](../secure/t_admin_common_forcing_ssl.md)

