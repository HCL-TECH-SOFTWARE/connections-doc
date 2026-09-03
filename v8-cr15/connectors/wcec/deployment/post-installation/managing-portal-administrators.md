# Managing CEC portal administrators

This document provides detailed steps on how to add new administrators to the CEC runtime for HCL Connections Engagement Center (WebEngine).

## Prerequisites

- Your LDAP user repository must be correctly configured. Refer to [Configuring LDAP](../prepare-installation/ldap-configuration.md) for setup instructions.
- You should have access to the current administrator account (default: `wpsadmin`).

!!! note
    As a best practice, specify a separate user group for portal administrators instead of adding single users for easier maintenance.

After taking note of the prerequisites, follow these steps to add new administrators to CEC:

## Configuring administrator group in LDAP

Specify a separate portal administration group in your LDAP user repository (for example, `portaladmins`). Ensure this group contains the users you want to grant administrative access.

## Accessing the administration console

1. Log in to the CEC portal with the current administrator role (default: `wpsadmin`).
2. Click **Open applications menu** and then navigate to **Administration** > **Security** > **Users and Groups**.
3. Verify that the new portal administrator group is available and contains the expected users.

## Granting portal administrative access

1. Navigate to **Administration** > **Security** > **Resource Permissions** > **Virtual Resources**.
2. Locate the **PORTAL** resource, and then click the **Assign Access** icon.
3. Click the **Edit Role** icon for the **Administrator** role.
4. Click **Add**.
5. Select the checkbox for the new portal administration group you specified in your user repository, and then click **OK**. This grants the group administrative access to the Release domain.
6. Navigate to **Resources** and click **Apply** > **OK** to save the changes.

## Granting web content library access

1. Navigate to **Web Content** > **Web Content Libraries**.
2. Click **Set Access on Root**.
3. Click the **Edit Role** icon for the **Administrator** role.
4. Click **Add**.
5. Search and add the new portal administration group, then click **OK**. This grants administrative access to the Java Content Repository (JCR) domain.
6. Navigate to **Resources** and click **Apply** > **OK** to save the changes.

## Verifying the configuration

Log out of CEC (WebEngine), then log in as one of the new portal administrators to test the changes.

