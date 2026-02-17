# Configuring self-registration for external users {#t_install_config_self-registration_for_external_usrs .task}

Set properties that make it possible for people outside of your company to self-register for a Connections account when invited to join.

!!! note
    
    Self-registration requires that users have anonymous access to be able to register and reset their guest password. If an access manager solution such as IBM Security Verify Access (formerly Security Access Manager) is in place, a junction for the following context route has to be created/whitelisted: **/selfservice/**

1.  For external collaboration self-registration to work, it is mandatory that each of the following properties in the selfregistration-config.xml file have a value entered. You can modify default values to fit your environment.

    !!! note
        
        For this feature, you need to edit the configuration file directly in the /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/Cell01/LotusConnections-config directory.

    1.  Turn on the external collaboration service, and decide whether you want the option for authorized Connections users to invite external users to be displayed in the product UI. The default for the UI option is `false`.

        ```
        <pre-register enabled="true" ui-enabled="false">
        ```

    2.  Provide the URL that will be used in email invitations to generate a link to the registration page. Set the value to the base URL of Connections unless you have a reason to use a different URL.

        ```
        <pre-register>
                     <registration-base-url>your\_url</registration-base-url> 
        ```

    3. Set the expiration time for the application invite link and the reset password link.

        ```
            <!-- number of hours before invitation url will expire-->
            <invitation-valid-duration>720</invitation-valid-duration>
            <!-- number of minutes before password reset url will expire -->
            <password-reset-duration>30</password-reset-duration>
        ```
        !!! note

            The default value for the invite link is 720 hours or 30 days before it times out while the default value for the reset password link is 30 minutes before it expires.


    4. Specify the URL and secure URL for LDAP:

        ```
        <ldap-connector>
                     <external-user-server>
                          <server href="ldap://localhost:389" ssl_href="ldaps://localhost:636" encryption="no" />
        ```

        where

        -   localhost is the domain name where LDAP can be found
        -   `389` and `636` are the default values for the LDAP ports
        -   `no` is the default encryption value; other possible values are `ssl`, and `starttsl | no`

    5.  Add the LDAP bind username for the user who has read and write access to the LDAP repository:

        ```
        <ldap-connector>
                     <external-user-server>
                          <authentication>
                               <user>LDAP\_bind\_user</user>
        ```

        !!! note
            
            If you use Domino LDAP and your setup does not allow write access, you can use a secondary directory by \(1\) creating a default configuration in the secondary directory, allowing write access in the LDAP settings, \(2\) adding the LDAP user in the secondary directory's ACL, as Editor with \[UserCreator\] and \[UserModifier\] Roles, and \(3\) restarting the LDAP task. For further details on this configuration, see the Knowledge Article [Populating Guest Profiles in a Secondary Domino Directory](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0081243)

    6.  Add the password for the LDAP bind user:

        ```
        <ldap-connector>
                     <external-user-server>
                          <authentication>
                               <password>LDAP\_bind\_user\_password</password>
        ```

        !!! note 
            
            If you prefer, the password for the LDAP BindDN can be XOR-encoded. You can use the set\_invite\_pass.py wsadmin script provided by the Connections installation to encode the given password and store it in this configuration file. For more information, see [\(Optional\) Encoding the LDAP password in self-registration-confg.xml](t_admin_encode_ldap_pwd_self-reg.md).

    7.  Add the base distinguished name for your organization:

        ```
        <ldap-connector>
                     <external-user-server>
                          <entry>
                               <parent-dn>o=external,o=your\_organization</parent-dn>
        ```

2.  While completing step 1 is all that's required to deploy the feature, it's a good idea to also review the following default values now and change any that aren't optimal for your environment.

    1.  The default value for the LDAP type is empty. Add a value of `Active Directory` or `DominoLDAP` only if you're using an Active Directory server or HCL Domino server.

        ```
        <ldap-connector>
                     <external-user-server>
                          <ldap-type></ldap-type>
        ```

    2.  If desired, you can specify a search filter that can be used to check the uniqueness of each user's email address. Make sure that the default value `(@key@=@value@)` is part of the filter that you specify.

        ```
        <ldap-connector>
                     <external-user-server>
                          <entry>
                               <search-filter>(@key@=@value@)</search-filter>
        ```

    3.  The object classes are LDAP properties that can be used to distinguish between different kinds of users. The values need to match the search filters in the WebSphere LDAP so that users are created appropriately in the Connections context, and therefore can log in to Connections. If necessary, you can add multiple object classes by using the <object-class\> tag multiple times.

        ```
        <ldap-connector>
                     <external-user-server>
                          <entry>
                               <object-class>Person</object-class>
                               <object-class>inetOrgPerson</object-class>
                               <object-class>organizationalPerson</object-class>
        ```

    4.  The following value includes the LDAP property used to map the user in LDAP to their Profiles GUID. In an Active Directory environment, for example, the default property is `objectGUID`. Other known defaults are `entryuuid` \(IBM Security Director Integrator, formerly TDI\), `dominoUNID` \(HCL Domino Directory\), and `entryUUID` \(Open LDAP\). If your organization uses a different property name, consult your TDI assembly and use the name that is stated there.

        ```
        <profiles-connector>
                     <entry>
                          <attributes>
                               <attribute>
                                    <value>${ldap:objectGUID}</value>
        ```

    5.  If your TDI population mechanism is not using the preceding default field mappings, you should also verify the rest of the attribute settings under `<profiles-connector>`.

    6.  If you enabled the UI option in step 1a, you must specify whether external users can be invited only by users assigned the appropriate role, or by any user. The default value is `invite-only`, which indicates only users who are assigned the role. To allow any user to send invitations, change the value to `person`. If you keep the `invite-only` value , you must also [map the appropriate individuals or groups to the "invite-only" role](t_admin_common_user_roles_assign.md) using the WebSphere Application Server console.

        ```
        <required-access-role>invite-user</required-access-role>
        ```

3.  \(Optional\) Specify other settings if you want to extend the feature, or if you have legal considerations like record keeping of successful registrations or providing a link to a privacy policy document.


-   **[\(Optional\) Encoding the LDAP password in self-registration-confg.xml](../admin/t_admin_encode_ldap_pwd_self-reg.md)**  

-   **[Customizing notifications for self-registering users](../admin/c_admin_customize_self-registration_notifications.md)**  
You can customize the content of the email notifications related to the self-registration feature by copying the relevant source files, saving them in the appropriate customization directory, and editing the files that correspond to notifications you want to change. As the source files are provided in different languages, you can also customize the notifications in those languages.




**Parent topic:** [Managing external user access](../admin/c_admin_common_manage_ext_user.md)

