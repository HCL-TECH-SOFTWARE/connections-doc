# Assigning administrators to template management roles {#t_admin_comm_templates_assign_admins .concept}

Assigning the function of community template administrator requires access to the system where the Connections applications are installed, and assigning that of template content owner requires the IBM WebSphere Application Server administrative console.

## Before you begin {#section_tl5_3hq_wnb .section}

Make sure your organization has completed [installing or upgrading Component Pack](../install/cp_install_services_tasks.md), including the setup for Tailored Experience features for communities.

## Assigning the CommunityTemplateAdmin role {#section_olj_g43_wnb .section}

Administrators with the CommunityTemplateAdmin role can perform all template administration tasks:

-   Create, update, and delete templates and template categories
-   Upload template logo and preview images
-   Import and export templates

Anyone with a valid Connections profile can hold this role, and multiple people can be assigned. Although not required, being a member of the source community allows the template admin to view it before they create a template from it.

To assign the role:

1.  Log in to the WebSphere Application Server administrative console.
2.  Navigate to **Resource environment entries** \> **ic360** \> **Custom properties**.
3.  Record the value for the property ic360.configpath to help you in step 5.

    **Note:** The ic360 location refers to certain Connections foundation features set to be included the Connections installation by default under the "Feature Foundation" option.

4.  Log in to the system where the Connections applications are installed. In a multi-node deployment, log in to any node.
5.  Find the folder similar to $\{ic360.configpath\}, for example /opt/IBM/SharedArea/icxt/config, where $\{ic360.configpath\} is typically on the same path as all other Connections configuration and data folders.
6.  Open the folder and edit the file acl.properties as follows:
    1.  For each person that you want to assign the role to, add a line with the following format:

        ```
        CommunityTemplateAdmin.<user_id>=true
        ```

    2.  Replace <user\_id\> with the person's UUID from their profile record by doing one of the following:
    -   Take the UUID from the Profiles database, in the PROF\_GUID column of the EMPLOYEE table
    -   Enter a URL like https://<connections\_hostname\>/profiles/json/profile.do?email=<user\_email\>, and find the value of 'X\_lconn\_userid'
7.  Restart all Connections servers.

## Assigning an ID as template content owner {#section_xln_cx3_wnb .section}

There is only one owner of community template content for the entire Connections deployment. This owner can be a real person or a functional ID, as long as the ID has a valid Connections profile and holds the "admin" role for all Connections applications. This function is distinct from the CommunityTemplateAdmin role.

What exactly do they own? When a template administrator creates a template from an existing community, this owner is recorded as the creator of any content that becomes part of the template, such as some files, a wiki, and so on.

To assign this ID:

1.  Log in to the WebSphere Application Server administrative console.
2.  Navigate to **Resource environment entries** \> **ic360** \> **Custom properties**.
3.  Add a new property named community.template.admin.user.
4.  Set the value of the property to the user ID of the person or ID you want to assign by doing one of the following:
    -   Taking the UUID from the Profiles database, in the PROF\_GUID column of the EMPLOYEE table
    -   Enter a URL like https://<connections\_hostname\>/profiles/json/profile.do?email=<user\_email\>, and find the value of 'X\_lconn\_userid'
5.  Restart the server that is running the ic360 applications.

## Checking http.hostname custom property for Connections links {#section_zzn_g5j_s5b .section}

When a community is created from a template, any link pointing to a Connections resource, such as a blog entry or wiki, will also be recreated. The custom property http.hostname is used as the hostname for the links. You need to set this property to the hostname by which users access Connections applications.

To check this custom property:

1.  Log in to the WebSphere Application Server administrative console.
2.  Navigate to **Resource environment entries** \> **ic360** \> **Custom properties**.
3.  Check the property http.hostname, and make sure that it is set to be the Connections host.

For general information about ic360 properties, see [Configuration parameters](https://help.hcltechsw.com/connections/api/icxt/configuration.html) in the Connections API documentation.

## What to do next {#section_krx_g3q_wnb .section}

[Manage community templates using the Connections Administration Console](t_admin_comm_templates_manage.md)

**Parent topic:**[Administering community templates](../admin/t_admin_comm_templates_container.md)

