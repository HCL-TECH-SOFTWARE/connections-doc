# Adding certificates to the WebSphere trust store {#t_exchange_keys_network .task}

Import a self-signed IBM® HTTP Server certificate into the default trust store of IBM WebSphere® Application Server.

Before you complete this procedure, ensure that IBM HTTP Server is configured to support encrypted connections as described in *Configuring IBM HTTP Server for an encrypted connection*.

This topic describes the procedure to configure certificates in a deployment with one web server.

If you select to configure the HTTP server during the HCL Connections installation, this task could be performed at that time instead of as a post-installation task. To establish trusted server-to-server communication for HCL Connections, import signer certificates from IBM HTTP Server into the WebSphere Application Server default trust store.

There are different types of certificates that you can use. This procedure describes how to import a self-signed certificate. You can also import a certificate that you purchased from a third-party Certificate Authority. To help decide a key file strategy for your environment, go the[IBM HTTP Server knowledge center](http://www-01.ibm.com/support/knowledgecenter/SSAW57_8.5.5/com.ibm.websphere.ihs.doc/ihs/welcome_ihs.dita).

To import a public certificate from IBM HTTP Server to the default trust store in IBM WebSphere Application Server, complete the following steps:

1.  Log into the IBM WebSphere Application Server Integrated Solutions Console and navigate to **Security** \> **SSL Certificate and key management** \> **Key stores and certificates**.

2.  Click **CellDefaultTrustStore**.

3.  Click **Signer Certificates**.

4.  Add a local certificate or retrieve a certificate from another server.

    1.  Add a local certificate by clicking **Add**.

    2.  Browse to the location where the file is stored and select the file.

    3.  Provide an **Alias** for the certificate.

    4.  Click **OK**.

    Retrieve a certificate from another server:

    1.  Retrieve a certificate from another server by clicking **Retrieve from port**.

    2.  Enter the **Host** name, **SSL Port**, and **Alias** of the web server.

    3.  Click **Retrieve Signer Information** and then click **OK**. The root certificate is added to the list of signer certificates.

    4.  Click **OK**.

    The root certificate is added to the list of signer certificates.

5.  If using Tivoli® Access Manager or other proxies, also repeat steps 4-6 for your Tivoli Access Manager or other proxy servers.


If your configuration changes aren't successful, ensure that you have applied the instructions to configure a default personal certificate.

Verify that users can create a private community and add other widgets, such as Activities, Blogs, Dogear, and so on, to it. Ensure that there are no errors when these widgets are added. If problems are reported, consult the Communities SystemOut.log file.

The proxy-config.tpl file allows a proxy to work with self-signed certificates. This is true for an out-of-the-box deployment but for improved security you should set the value of the unsigned\_ssl\_certificate\_support property to false when your deployment is ready for production.

Ensure that you are ready to renew your certificate before it expires. WebSphere Application Server provides a utility for monitoring certificates. For more information, refer to [Configuring certificate expiration monitoring](https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.multiplatform.doc/ae/tsec_sslconfcertexpmon.html) in the WebSphere Application Server information center.

**Parent topic:**[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

**Previous topic:**[Configuring IBM HTTP Server for an encrypted connection](../install/t_configure_ihs.md)

**Next topic:**[Determining which files to compress](../install/t_ihs_config_not_compressing_files.md)

