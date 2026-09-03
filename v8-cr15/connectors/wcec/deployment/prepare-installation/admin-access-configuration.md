---
title: Configuring Admin Access Using Helm
tags:
    - Admin Access
    - CEC (WebEngine)
    - Helm
    - Configuration
    - Access Control
    - LDAP
---
# Configuring admin access using Helm

This section details how to configure administrative access for the HCL Connections Engagement Center v2 (CEC) by overriding default access control properties in your Helm deployment. By customizing these settings, you can grant admin privileges to specific LDAP users or groups, ensuring your CEC environment is secure and properly managed.

You can configure administrative access in your `custom-values.yaml` file as below:

```yaml
configuration:
  webEngine:
    propertiesFilesOverrides:
      AccessControlDataManagementService.properties:
        accessControlDataManagement.domain.rel.adminuser: "uid=your_admin_user,o=defaultWIMFileBasedRealm"
        accessControlDataManagement.domain.rel.admingroup: "cn=your_admin_group,o=defaultWIMFileBasedRealm"
        accessControlDataManagement.domain.rel.virtualresource: "PORTAL"
```

## Updating the placeholder values:

- Replace `uid=your_admin_user,o=defaultWIMFileBasedRealm` with the full LDAP DN of a specific admin user.

- Replace `cn=your_admin_group,o=defaultWIMFileBasedRealm` with the full LDAP DN of an admin group.

## Validating the configuration

Login with the credentials of the user or a member of the group you configured as admin, verify that you have access to administrative features.
