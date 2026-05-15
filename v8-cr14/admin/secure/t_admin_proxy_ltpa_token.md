# Enabling the AJAX proxy to forward user credentials {#t_admin_proxy_ltpa_token .task}

Edit the proxy configuration template file to instruct the HCL Connections™ server to accept LTPA tokens or the TAM or SiteMinder cookies in an SSO environment. This task is necessary if you want to configure single sign-on between Connections and the servers defined in the proxy configuration file to forward a specific list of cookies.

1.  Open a command line window, start the wsadmin tool, and then do one of the following things:

    -   If you want all of the applications to pass LTPA tokens, access the common AJAX proxy configuration template file.
        1.  Open a command prompt, and then change to the following directory of the system on which you installed the deployment manager:

            ```
            [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
            ```

            where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01. For example, on Windows:

            ```
            C:\Program Files\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
            ```

            !!! attention
                
                You must run the following command to start the wsadmin client from this specific directory because the Jython files for the product are stored here. If you try to start the client from a different directory, then the execfile\(\) command that you subsequently call to initialize the administration environment for an HCL Connections component does not work correctly.

        2.  Enter the following command to start the wsadmin client:

            -   Linux:

                ```
                ./wsadmin.sh -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS Port
                ```

            -   Microsoft Windows:

                ```
                wsadmin -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS Port
                
                ```

            where:

            -   `admin_user_id` is the user name of a person in the Administrator role on the IBM WebSphere® Application Server.
            -   `admin_password` is the password of the WebSphere Application Server administrator.
            -   `SOAP_CONNECTOR_ADDRESS Port` is the SOAP port for the WebSphere Application Server. The default value of the SOAP port is 8879. If you are using the default port value, you do not need to specify this parameter. If you are not using the default and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, perform the following steps:
                1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.
                2.  In the Additional properties section expand **Ports**, and then look for the `SOAP_CONNECTOR_ADDRESS` port entry to find the port number.
            For example:

            -   Linux:

                ```
                ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
                ```

            -   Microsoft Windows:

                ```
                wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879
                ```

    -   If you want only a single application to be able to pass LTPA tokens, access the custom proxy configuration template file that you created for that application. See [Configuring the AJAX proxy](t_admin_config_ajax_proxy.md) for information about how to create this file. To access the custom configuration template file, use the following command:

        ```
        execfile("$WAS_HOME/profiles/DMGR/bin/
         application\_nameConfig.py")
        ```

        where `application_name` is the name of the application for which you created a custom proxy configuration template file. For example:

        -   Activities: `activitiesAdmin.py`
        -   Communities: `communitiesAdmin.py`
        -   Home page: `homepageAdmin.py`
        -   Profiles: `profilesAdmin.py`
        
        If you are prompted to specify which server to connect to, type 1. This information is not used by the wsadmin client when you are making configuration changes.

2.  Check out the proxy configuration template file using one of the following commands:

    -   If you want all of the applications to be able to pass LTPA tokens, use the following command to check out the proxy-config.tpl file.

        ```
        LCConfigService.checkOutProxyConfig("temp\_directory","cell\_name")
        ```

    -   If you want only a single application to be able to pass LTPA tokens, use the following command:

        ```bash
        application\_nameConfigService.checkOutProxyConfig(
        "temp\_directory","cell\_name")
        ```

        where application\_name is the name of the application for which you created a custom proxy configuration template file. For example:

        -   Activities:

            ```bash
            ActivitiesConfigService.checkOutProxyConfig("temp\_directory",
             "cell\_name")
            ```

        -   Communities:

            ```bash
            CommunitiesConfigService.checkOutProxyConfig("temp\_directory",
             "cell\_name")
            ```

        -   Home page:

            ```bash
            HomepageCellConfig.checkOutProxyConfig("temp\_directory",
             "cell\_name")
            ```

        -   Profiles:

            ```bash
            ProfilesConfigService.checkOutProxyConfig("temp\_directory",
             "cell\_name")
            ```

3.  From the temporary directory to which you checked out the files, open the proxy configuration template file in a text editor.

4.  Include the following declarations in the proxy:policy block of the service to allow cookies for LTPA tokens to be passed to the applications:

    ```bash
    <proxy:cookies>
        <proxy:cookie>JSESSIONID</proxy:cookie>
        **<proxy:cookie\>LtpaToken</proxy:cookie\>**
        **<proxy:cookie\>LtpaToken2</proxy:cookie\>**
    </proxy:cookies>
    ```

    For a TAM or SiteMinder SSO environment, include the following declarations:

    ```bash
    <proxy:cookies>
        <proxy:cookie>DomAuthSessId</proxy:cookie>
        <proxy:cookie>LtpaToken</proxy:cookie>
        <proxy:cookie>LtpaToken2</proxy:cookie>
        <proxy:cookie>Shimmer</proxy:cookie>
        <proxy:cookie>ShimmerS</proxy:cookie>
        <proxy:cookie>iwaSSL</proxy:cookie>
        <proxy:cookie>iwaSSL2</proxy:cookie>
        <proxy:cookie>JSESSIONID</proxy:cookie>
        <proxy:cookie>has</proxy:cookie>
        <proxy:cookie>PD-H-SESSION-ID</proxy:cookie><!-- TAM -->
        <proxy:cookie>PD-S-SESSION-ID</proxy:cookie><!-- TAM -->
        <proxy:cookie>SMIDENTITY</proxy:cookie><!-- SiteMinder -->
        <proxy:cookie>SMSESSION</proxy:cookie><!-- SiteMinder -->
    </proxy:cookies>
    ```

5.  Save and close the file.

6.  Check in the proxy configuration template file during the same session in which you checked it out. To do so, complete the following steps:

    -   If you edited the proxy-config.tpl file, use the following command to check it back in:

        ```bash
        LCConfigService.checkInProxyConfig("temp\_directory",
         "cell\_name")
        ```

        where `temp_directory` is the temporary directory to which you checked out the configuration files, and `cell_name` is the name of the cell where the application that uses the common proxy-config.tpl file is located.

    -   If you made configuration changes for a specific application, check that custom template file back in using one of the following commands:

        -   Activities:

            ```bash
            ActivitiesConfigService.checkInProxyConfig("temp\_directory",
             "cell\_name")
            ```

        -   Communities:

            ```bash
            CommunitiesConfigService.checkInProxyConfig("temp\_directory",
             "cell\_name")
            ```

        -   Home page:

            ```bash
            HomepageCellConfig.checkInProxyConfig("temp\_directory",
             "cell\_name")
            ```

        -   Profiles:

            ```bash
            ProfilesConfigService.checkInProxyConfig("temp\_directory",
             "cell\_name")
            ```

        where temp\_directory is the temporary directory to which you checked out the configuration files, and cell\_name is the name of the cell where the application that uses the proxy template file is located.

7.  Restart the application server hosting Connections.


**Parent topic:** [Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md)

