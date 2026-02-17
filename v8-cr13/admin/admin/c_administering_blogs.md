# Administering Blogs {#c_administering_blogs .concept}

Administer site-wide settings for Blogs from either the Blogs user interface or via the wsadmin client.

You can make site-wide changes to Blogs from the Administration link in the Blogs user interface, or via commands using the wsadmin client. Unlike other HCL Connections applications, Blogs does not use an XML file to store configuration settings. Blogs configuration information is stored in, and accessed from, the Blogs application database. As a result, a configuration change is reflected in real time, and does not require a restart of the Blogs server.

The following topics describe administering blogs from the UI or from the wsadmin client.

-   **[Administering Blogs from the user interface](../admin/c_admin_blogs_UI.md)**  
Make site-wide changes on your Blogs server from the Blogs user interface.
-   **[Administering Blogs using the wsadmin client](../admin/r_admin_blogs_wsadmin.md)**  
As an alternative to modifying the Blogs site settings from the Blogs user interface via the Administration tab, you can also modify settings using the wsadmin client.
-   **[Moderating blog content](../admin/c_blogs_admin_moderation_overview.md)**  
Monitor and control the content of blogs using the moderation tools.
-   **[Changing the location of the Blogs File Upload directory](../admin/t_admin_blogs_WAS_directories.md)**  
Change default directories for the File Upload directory from the IBM® websphere Application Server \(WAS\) administrator console.
-   **[Changing the Blogs referrer policy](../admin/t_change_blogs_referrer_policy.md)**  
Understand and change how Blogs handles the HTTP "referer" and "referrer-policy" headers.
-   **[Blogs field limits](../admin/r_admin_blogs_field_limits.md)**  
This topic lists character input limits for key Blogs fields.
-   **[Extending the list of allowable file types for blogs](../admin/t_admin_blogs_mime_file_types.md)**  
Extend the list of possible file types that users could upload to a blog.
-   **[Understanding and configuring blog hits and visits](../admin/c_admin_blogs_hits_and_visits.md)**  
Understand how blog hits and visits are calculated and how you can modify the way each count is done.
-   **[Understanding blog likes, comments, and visits](../admin/c_admin_blogs_visits_and_comments.md)**  
This topic describes how the Most Liked, Most Commented, and Most Visited statistics are calculated and why the counts may differ between those found in the widgets and those found in the main page.

**Parent topic:** [Administering](../admin/c_lc_admin_overview.md)

