# Enabling users to publish file attachments to Lotus Quickr {#t_admin_act_publish_to_quickr .task}

Edit the configuration property settings of Activities to allow users to publish file attachments from an activity to an IBM® Lotus® Quickr® library.

Before you can complete this procedure, you must have Lotus Quickr deployed in your environment and know the fully qualified domain names of all the Lotus Quickr servers that you want users to be able to publish to.

Decide which type of authentication to use between the Activities and Lotus Quickr servers, and perform any required prerequisite tasks to support the authentication type that you decide to use. You must choose between the following options:

Single sign-on
:   By default, the Activities application assumes that single sign-on \(SSO\) is configured between the Activities server and the Lotus Quickr servers. As a result, when Activities users select the Lotus Quickr servers that they want to publish file attachments to, they are not prompted for user names and passwords. To support this functionality, you must first enable SSO with Lotus Quickr. See *Enabling single sign-on with Lotus Quickr*.

Basic authentication
:   If for some reason you do not want to or cannot set up SSO between the Activities and Lotus Quickr servers, Activities users are prompted for a user name and password when they try to publish file attachment to Lotus Quickr. To ensure that those credentials are not sent unprotected over HTTP, you must take the following steps:

    -   Configure HCL Connections to force traffic on the Activities server to be sent over a secure channel. See *Forcing traffic to be sent over SSL*.
    -   Specify HTTPS as the protocol for the servers that you define in Step 4.
    -   Do not perform Step 5.
    -   Perform Step 6.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Use the wsadmin client to access and check out the Activities configuration files.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Activities configuration files using the following command:

        ```
        ActivitiesConfigService.checkOutConfig("working\_directory","cell\_name")
        
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft™ Windows™ operating system.

            **Note:** AIX®, and Linux™: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere® Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            ```
            print AdminControl.getCell()
            ```

        For example:

        -   AIX and Linux:

            ```
            ActivitiesConfigService.checkOutConfig("/opt/act/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ActivitiesConfigService.checkOutConfig("c:/act/temp","foo01Cell01")
            ```

2.  From the temporary directory to which you checked out the Activities configuration file, open the oa-config.xml file in a text editor.

3.  Set the enabled attribute of the `<PublishFile>` element to `true`.

4.  Create one `<server>` element for each Lotus Quickr server that you want to support. In the server element, specify the fully qualified domain name of the Lotus Quickr server that you want to allow your users to publish files to. Include the port number.

    For example:

    ```
    <PublishFile enabled="true" allowCustomServers="false" requireSSO="true">
          <server>http://quickr.example.com:8085</server>
          <server>http://quickr.southwest.example.com:8080</server>
    </PublishFile>
    ```

    If the Quickr serves are protected by ISAM, use the junction name in the URL. For example:

    ```
    <PublishFile enabled="true" allowCustomServers="false" requireSSO="true">
          <server>http://TAM.quickr.example.com:8085/Quickr_junction</server>
          <server>http://TAM.quickr.southwest.example.com:8080/Quickr_junction</server>
    </PublishFile>
    ```

    If you are not setting up single sign-on between the Activities and Lotus Quickr servers, specify the servers using the HTTPS protocol. For example:

    ```
    <PublishFile enabled="true" allowCustomServers="false" requireSSO="false">
          <server>https://quickr.example.com:8085</server>
          <server>https://quickr.southwest.example.com:8080</server>
    </PublishFile>
    ```

    The first server that you specify in the list becomes the default server that is displayed in the Server field in the dialog box from which the user selects the Lotus Quickr library to which to publish a file. If a user selects a different Lotus Quickr server from the Server field, that server becomes the default.

5.  If, instead of specifying a finite list of servers that users can save files to, you want users to be able to save files to any Lotus Quickr server hosted within a specific domain, set the allowCustomServers attribute to `true` .

    For example:

    ```
    <PublishFile enabled="true" allowCustomServers="true" requireSSO="true">
    </PublishFile>
    
    ```

    **Note:** Perform this step only if you are setting up SSO between the Activities and Lotus Quickr servers. Keeping the value of this attribute set to false prevents users from typing in server names that specify the HTTP protocol instead of HTTPS.

6.  If you decide to not set up SSO between the Activities and Lotus Quickr servers, change the value of the requireSSO attribute to false.

    For example:

    ```
    <PublishFile enabled="true" allowCustomServers="false" requireSSO="false">
    		<server>https://quickr.example.com:8085</server>
    		<server>https://quickr.southwest.example.com:8080</server>
    </PublishFile>
    
    ```

    When you make this change, you must perform the steps necessary to force the Activities server traffic to be sent over SSL. See *Forcing traffic to be sent over SSL*.

7.  Save and close the oa-config.xml file.

8.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.


**Related information**  


[Enabling single sign-on for Lotus Quickr](../secure/t_secure_sso_quickr.md)

[Forcing traffic to be sent over an encrypted connection](../secure/t_admin_common_forcing_ssl.md)

