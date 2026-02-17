# Groups

Content owners can use LDAP groups to control access to resources in the Communities, Activities, Files, and Wikis applications. For this reason, it is important to consider the effect that updating LDAP groups has on the existing membership of these resources.

For example, if a user is given access to content in HCL Connections through group membership and is then removed from that group, they might still receive email notifications and activity stream updates relating to that content. However, when the user logs in again, the access controls are updated to reflect current group membership and any subscriptions to content that is no longer accessible are removed.

For more information about how group access works in different applications, refer to the product documentation for the Communities, Activities, Files, and Wikis applications.

!!! caution

    Some groups in your LDAP directory might contain external users. If a user adds this type of group to the membership of an internal community, external users will have access to the content of that community, and the community will not indicate that external users have access.

To avoid this risk, take one or more of the following steps:

-   Ensure that the LDAP directory that is used for external users does not contain groups.

-   If the LDAP directory that is used for external users already contains groups, configure the federated repositories settings in WebSphere Application Server so that it cannot find groups.

-   If the LDAP directory that is used for external users is the same one that is used for internal users, ensure that no external users are added to any groups in the directory. If external users are already present in groups in the directory, remove them.

-   If none of the preceding steps is possible, advise your users to add only those groups to communities that do not contain external users. For more information, see the *Managing external user access* topic.


**Parent topic:** [Managing access](../admin/c_admin_common_managing_access.md)
