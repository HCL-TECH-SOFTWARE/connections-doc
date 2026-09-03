# How to configure LDAP search settings in the Profiles Population Wizard

## Introduction
When you run the HCL Connections population wizard, you must configure the directory path scope and synchronization criteria. Specifying these settings correctly ensures that the integration engine successfully populates your user profiles database without encountering dimension limit or timeout failures. These wizard inputs write directly to the `source_ldap_user_search_base` and `source_ldap_user_search_filter` parameters inside your `profiles_tdi.properties` file.

## Instructions
During the deployment configuration step, you must input the directory-specific syntax into the **LDAP user search base** and **LDAP user search filter** fields based on your environment type:

1. HCL Domino
    * **LDAP user search base:** Enter the valid organizational Distinguished Name (DN) format (e.g., `o=xxx`).
    * **LDAP user search filter:** 
```text
(&(uid=*)(objectclass=inetOrgPerson))
```

2. Microsoft Active Directory
    * **LDAP user search base:** Enter the domain component DN format (e.g., `DC=xxx,DC=xxx`).
    * **LDAP user search filter:** 
```text
(&(sAMAccountName=*)(objectClass=organizationalPerson))
```

3. IBM Security Verify Directory
    * **LDAP user search base:** Enter the domain component DN format (e.g., `DC=xxx,DC=xxx`).
    * **LDAP user search filter:** 
```text
(&(uid=*)(objectclass=inetOrgPerson))
```

## Important Configuration Rules
* **Replace Placeholder Values:** You must replace `xxx` with your organization's actual directory domain components or organizational units.
* **Blank Base Restrictions:** You must not leave the search base field blank, as a fully qualified Distinguished Name is required to bind and iterate through user records successfully.
* **Special Characters:** If your organizational directory paths contain literal special characters (such as commas or backslashes), you may need to enable character escaping in your underlying properties file by setting `source_ldap_escape_dns=true`.