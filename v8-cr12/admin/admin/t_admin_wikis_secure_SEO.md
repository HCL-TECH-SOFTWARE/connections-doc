# Securing SEO {#secure_SEO .task}

Control access to the sitemap that is used for search engine optimization.

By default, search engine providers can access your sitemap. However, you can disable anonymous access to the sitemap if necessary.

When you disable anonymous access, only users who are mapped to the SEEDLIST\_ADMIN role can access the sitemap. For more information about mapping users to roles, see the *Assigning people to J2EE roles* topic.

To disable anonymous access to the sitemap, complete the following steps:

1.  Open the web.xmlfile in a text editor. The default location of the file is:

    -   Linux™: [connections\_root](../plan/i_ovr_r_directory_conventions.md)/Wikis.ear/wikis.web.war/WEB-INF/web.xml
    -   Linux: [connections\_root](../plan/i_ovr_r_directory_conventions.md)/Wikis.ear/wikis.web.war/WEB-INF/web.xml
    -   Windows: [connections\_root](../plan/i_ovr_r_directory_conventions.md)\\Wikis.ear\\wikis.web.war\\WEB-INF\\web.xml
2.  In the **servlet** stanza, change the value of the **allow.anonymous.access** parameter to false.

3.  Save and close the file.


**Parent topic:** [Search Engine Optimization \(SEO\) for Wikis](../admin/c_admin_wikis_SEO.md)

**Related information**  


[Assigning people to Java EE roles](../admin/t_admin_common_user_roles_assign.md)

