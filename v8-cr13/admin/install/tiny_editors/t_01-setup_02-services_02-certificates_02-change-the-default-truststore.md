# Change the default trust store to the Tiny Editors Services trust store {#setup-services-certificates-change-the-default-truststore .task}

This task outlines the process for changing the default SSL trust store to the web-aware trust store for the Tiny Editors Services.

**Before you begin:** A suitable trust store is required. See [Create a web-aware trust store for the Tiny Editors Services](t_01-setup_02-services_02-certificates_01-create-a-web-aware-truststore.md) for details.

1.  Log in to the web interface of the WebSphere Application Server Console.

    The default address is: `https://host_name:9043/ibm/console`

2.  Expand **Security** and click the **SSL certificate and key management** link.

    ![SSL certificate and key management link](resource/was/security_ssl.png)

3.  Click the **SSL Configurations** link.

    ![Showing SSL certificate and key management options. The SSL Configurations is highlighted.](resource/was/ssl_config_01.png)

4.  Click the **CellDefaultSSLSettings** link.

    ![Showing SSL Configurations. The CellDefaultSSLSettings link is highlighted.](resource/was/ssl_config_02.png)

5.  Enter the Tiny Editors Services **Trust store name** and click **OK**.

    ![Details of cell default trust store.](resource/was/ssl_config_03.png)

6.  Click the **Save** link.

    ![Small dialog to confirm saving configuration changes.](resource/was/ssl_config_04.png)


**Parent topic:** [Configuring the SSL certificates for the Tiny Editors Services](t_01-setup_02-services_02-certificates_00-summary.md)
