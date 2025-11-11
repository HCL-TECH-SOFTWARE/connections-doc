# Installing the WebSphere Default Application {#t_inst_install_was_default_application .task}

Install the WebSphere Default Application \(also known as Snoop\) to validate the SAML environment prior to the deployment of HCL Connections™ on WebSphere.

1.  Log into the WebSphere Application Server administrative console to navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

2.  Click **Install**.

3.  Click **Remote file system** and then **Browse**.

4.  Select <nameCellManager01\>.

5.  Navigate to the folder installableApps under/opt/IBM/WebSphere/AppServer/.

6.  Select DefaultApplication.ear and then click **OK**.

7.  Select **Fast Path** and then click then **Next** twice.

8.  On the **Map modules to servers** window, select both Modules.

9.  Map the DefaultApplication to a server and \(optionally\) to a web server.

10. At the Summary panel click **Finish**, and then click **Save Result**.

    The application DefaultApplication.ear should be installed.

11. Update the web server plug-in with the DefaultApplication map.

    1.  Navigate to **Servers** \> **Server Types** \> **Web server**.
    2.  Select the web server and then click **Generate Plugin**.
    3.  Select the web server and then click **Propagate Plug-in**.
    4.  Stop and then restart the web server for the setting to take effect.
    5.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications** and start the DefaultApplication.ear application.
12. To verify that Snoop is installed and running.

    1.  Enter this url into your browser: http://was-server.example.com/snoop. You are prompted to enter a valid username and password; once entered the page **Snoop Servlet - Request/Client Information** should appear.
    2.  Search for LtpaToken2 andLtpaToken. You should see cryptic values opposite them. These are the LTPA token values.

Uninstall Snoop before moving to a production environment.

**Parent topic:** [Configuring SAML redirection services for web SSO](../secure/t_inst_set_up_saml_2.md)

