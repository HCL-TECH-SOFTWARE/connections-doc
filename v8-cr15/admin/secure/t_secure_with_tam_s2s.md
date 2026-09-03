# Using WebSEAL for server to server communication {#task_vcf_d3l_2v .task}

To send all traffic through your WebSeal server, including server to server traffic, update the LotusConnections-config.xml file.

1.  Update the values for the dynamicHosts and interService URL attributes in the LotusConnections-config.xml configuration file:

    1.  Use the following command to check out the LotusConnections-config.xml file:

        execfile\("app\_server\_root/profiles/DMGR/bin/connectionsConfig.py"\)LCConfigService.checkOutConfig\("working\_directory","cell\_name"\)

        !!! note 
            
            If you are prompted to specify which server to connect to, type 1.

        where:

        -   `working_directory` is the temporary working directory to which configuration files are stored while you edit them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft™ Windows™ operating system.
        -   `cell_name` is the name of the WebSphere® Application Server cell hosting the HCL Connections™ application. This argument is case sensitive. If you do not know the cell name, enter the following command in the wsadmin client to determine it:

            `print AdminControl.getCell\(\)`

        For example: LCConfigService.checkOutConfig\("c:/temp","foo01Cell01"\)

    2.  Update the dynamicHosts values by running the following commands:

        1.  Enable dynamicHosts:

            `LCConfigService.updateConfig("dynamicHosts.enabled","true")`

        2.  Enter the WebSEAL host name in the values for the dynamicHosts.href and dynamicHosts.ssl\_href attributes:

            `LCConfigService.updateConfig("dynamicHosts.href","http://WebSEAL_host")`
            `LCConfigService.updateConfig("dynamicHosts.ssl_href","https://WebSEAL_host")`

            where `WebSEAL_host` is the fully qualified host name of the WebSEAL server.

        !!! note

            -   Each href attribute in the LotusConnections-config.xml file is case-sensitive and must specify a fully-qualified domain name.

            -   The fully-qualified host name for the WebSEAL server and the dynamicHosts configuration must be identical.
    3.  \(Do not complete this step for Security Verify Access, or SVA, formerly Security Access Manager, with SPNEGO\) Update the interService URL values by running the following command:

        `LCConfigService.updateConfig("application_interService_key","https://WebSEAL_host")`

        where:

        -   `WebSEAL_host` is the fully qualified host name of the WebSEAL server
        -   `application_interService_key` is the href attribute for the application and includes the following applications. However, this is not a complete list and the href for all installed applications must be updated.
            -   `activities.interService.href`
            -   `blogs.interService.href`
            -   `communities.interService.href`
            -   `dogear.interService.href`
            -   `files.interService.href`
            -   `forums.interService.href`
            -   `help.interService.href`
            -   `homepage.interService.href`
            -   `mobile.interService.href`
            -   `moderation.interService.href`
            -   `news.interService.href`
            -   `personTag.interService.href`
            -   `profiles.interService.href`
            -   `quickr.interService.href`
            -   `sametimeLinks.interService.href`
            -   `sametimeProxy.interService.href`
            -   `search.interService.href`
            -   `wikis.interService.href`
    4.  Check the LotusConnections-config.xml file in by running the following command:

        `LCConfigService.checkInConfig\(\)`

    !!! note 
        
        You can also complete this step by running the connectionsConfig.py script in the wsadmin client.

2.  **IMPORTANT**: Do not complete this step for Security Verify Access with SPNEGO. Add a Security Verify Access authenticator property by editing the `LotusConnections-config.xml` file.

    1.  Configure the custom Authenticator to support server-to-server authentication for Security Verify Access:

        ```
        LCConfigService.updateConfig("customAuthenticator.name",

        "TAMAuthenticator")
        ```

    2.  Keep the file open until you have completed the next step.

3.  **IMPORTANT**: Do not complete this step for Security Verify Access with SPNEGO. Configure the cookie timeout value for Connections:

    1.  Locate the CookieTimeout attribute in the LotusConnections-config.xml file. If the attribute is not present, add it to the <customAuthenticator name="TAMAuthenticator"\> element.

    2.  Set the value, in minutes, of the **CookieTimeout** attribute to be equal to or less than the maximum timeout and idle timeout [values that you configured in Security Verify Access](t_secure_with_tam.md#TheValueOfTheCookieTimeoutAttribut).

        !!! note 
            
            If the parameter does not already exist in the LotusConnections-config.xml file, create it. Open the file in a text editor and add the parameter to the customAuthenticator element.

    3.  Save your changes.

    4.  Check the LotusConnections-config.xml file back in by running the following command:

        `LCConfigService.checkInConfig\(\)`

        !!! note 
            
            The connectionsAdmin J2C alias that you specified during installation must correspond to a valid account that can authenticate with ISVA. It may map to a back-end administrative user account but is not intended to be used as a user account for Connections. This account must be capable of authenticating for single sign-on against ISVA. If you need to update the userid or credentials for this alias, see the [Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md) topic.


**Parent topic:** [Enabling single sign-on for Security Verify Access](../secure/t_secure_with_tam.md)

