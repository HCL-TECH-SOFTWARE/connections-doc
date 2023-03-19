# Choosing login values {#c_install_choose_login .concept}

Determine which LDAP attribute or attributes you want to use to log in to HCL Connections™.

The following scenarios are supported:

**Single LDAP attribute with a single value**
!!! example
    `uid=jsmith` 

**Multiple LDAP attributes, each with a single value**
!!! example
    To specify multiple attributes, separate them with a semicolon when you enter them in the **Login properties** field \(while adding the repository to IBM® WebSphere® Application Server\). For example, where `uid=jsmith` and `mail=jsmith@example.com`, you would enter: `uid; mail`.

**Single LDAP attribute with multiple values**
!!! example
    Mail is the login attribute and it accepts two different email addresses: an intranet address and an extranet address.
    For example: `mail=jsmith@myCompany.com` or `mail=jsmith@example.com`.

**Multiple LDAP attributes, each with multiple values**
!!! example
    For example: `uid=jsmith` or `uid=john_smith` and `mail=jsmith@example.com` or `mail=john_smith@example.com` or `mail=jsmith@MyCompany.com`.

**Multiple LDAP directories**
!!! example
    One LDAP directory uses `uid` as the login attribute and the other uses `mail`. You must repeat the steps in *Setting up federated repositories* for each LDAP directory.

## Multi-valued attributes { .section}

You can map multiple values to common attributes such as uid or mail.

If, for example, you mapped the following attributes for a user called Sample User, all three values for the user are populated in the PROFILE\_LOGIN table in the Profiles database:

-   `mail=suser@example.com`
-   `mail=sample\_user@example.com`
-   `mail=user\_sample@example.com`

A similar example for the uid property would have the following attributes:

-   `uid=suser`
-   `uid=sampleuser`
-   `uid=user_sample`

By default, the population wizard only allows you to choose one attribute for logins, so you can't select `mail` and `uid`. You can, however, write a custom function to union multiple attributes.

## Custom attributes { .section}

The Profiles population wizard populates `uid` and `mail` during the population process but maps the loginID attribute to null. You can specify a custom attribute if your directory uses a unique login attribute other than, for example, `uid` or `mail`. The login value can be based on any attribute that you have defined in your repository. You can specify that attribute by setting loginID=attribute when you populate the Profiles database.

The following sample extract from the `profiles-config.xml` file shows the standard login attributes:

```
<loginAttributes> 
<loginAttribute>uid</loginAttribute> 
<loginAttribute>email</loginAttribute> 
<loginAttribute>loginId</loginAttribute> 
</loginAttributes> 
```

The value for the loginID attribute is stored in the `Prof_Login` column of the Employee table in the Profiles database. For more information, see the *Mapping fields manually* topic.

## Using Profiles or LDAP as the repository { .section}

If you change the default HCL Connections configuration to use the LDAP directory as the user repository, WebSphere Application Server maps `uid` as the login default.

**Parent topic:**[Setting up federated repositories](../install/t_inst_federated_repositories.md)

