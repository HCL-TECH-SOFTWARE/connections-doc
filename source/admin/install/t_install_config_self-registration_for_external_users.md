# Configuring self-registration for external users {#t_install_config_self-registration_for_external_usrs .task}



1.  For external collaboration self-registration to work, it is mandatory that each of the following properties in the selfregistration-config.xml file have a value entered. You can modify default values to fit your environment.

    **Note:** For this feature, you need to edit the configuration file directly.

    1.  Turn on the external collaboration service, and decide whether you want the option for authorized Connections users to invite external users to be displayed in the product UI. The default for the UI option is `false`.

        ```
        <pre-register enabled="true" ui-enabled="false">
        ```

    2.  Provide the URL that will be used in email invitations to generate a link to the registration page. Set the value to the base URL of Connections unless you have a reason to use a different URL.

        ```
        <pre-register>
                     <registration-base-url>your\_url</registration-base-url> 
        ```

    3.  Specify the URL and secure URL for LDAP:

        ```
        <ldap-connector>
                     <external-user-server>
                          <server href="ldap://localhost:389" ssl_href="ldaps://localhost:636" encryption="no" />
        ```

        where

        -   localhost is the domain name where LDAP can be found
        -   `389` and `636` are the default values for the LDAP ports
        -   `no` is the default encryption value; other possible values are `ssl`, and `starttsl | no`
    4.  Add the LDAP bind username for the user who has read and write access to the LDAP repository:

        ```
        <ldap-connector>
                     <external-user-server>
                          <authentication>
                               <user>LDAP\_bind\_user</user>
        ```

    5.  Add the password for the LDAP bind user:

        ```
        <ldap-connector>
                     <external-user-server>
                          <authentication>
                               <password>LDAP\_bind\_user\_password</password>
        ```

    6.  Add the base distinguished name for your organization:

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

    3.  Your values for object classes must match those of your search filters in your WebSphere Application Server LDAP configuration. Object classes are used to distinguish between different kinds of users, for example, which WebSphere users are allowed to log in to Connections. Sometimes it is necessary to have more than one object class. The following lines show the location of the object class LDAP properties in selfregistration-config.xml:

        ```
        <ldap-connector>
                     <external-user-server>
                          <entry>
                               <object-class></object-class>
                               <object-class></object-class>
                               <object-class></object-class>
        ```

        When self-registration creates a user entry, it adds the following kinds of data. You'll want to review the specific default object class settings in the configuration file to ensure that users are created appropriately in a Connections context.

        ```
        dn: CN=Given_name Surname,O=Organization_Group
        cn: Given_name Surname
        mail: given_name-surname@mail-desk.net
        objectclass: dominoPerson
        objectclass: inetOrgPerson
        objectclass: organizationalPerson
        objectclass: person
        objectclass: top
        sn: Surname
        userpassword: password
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

3.  \(Optional\) Specify other settings if you want to extend the self-registration feature, or if you have legal considerations like record keeping of successful registrations or providing a link to a privacy policy document.


