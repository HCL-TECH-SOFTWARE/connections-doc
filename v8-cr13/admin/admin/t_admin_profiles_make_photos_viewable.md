# Making photos cachable in secure environments {#t_admin_profiles_make_photos_viewable .task}

If your Profiles deployment is configured to prevent profile data from being accessible to readers, you can opt to make just user photos cachable.

This is an optional task; it is only useful if Profiles is configured to lock profile data. For security reasons, when the reader role is set to something other than everyone, Profiles does not publicly cache photos. As a result, no profile photos are visible to readers. If you want to override this behavior and make photos visible, you must define a rule in the IBM® HTTP Server's configuration file to explicitly set the caching headers of photos.

1.  Define a rule in the IBM HTTP Server to explicitly set the caching headers of profile photos by completing the following steps:
2.  Using a text editor, open the httpd.conf file, which is the IBM HTTP Server configuration file. The file is stored in the following directory by default:

    -   Linux™: /opt/IBM/HTTPServer/conf
    -   Microsoft™ Windows™: C:\\IBM\\HTTPServer\\conf
3.  Add the following block of code to the httpd.conf file:

    ```
    <LocationMatch  /*/profiles/photo.do >
      <IfModule mod_headers.c>
        Header set Pragma ""
        Header set Cache-Control "max-age=21600,s-maxage=21600,public"
      </IfModule>
    </LocationMatch>
    ```

4.  Save and close the configuration file.

5.  Restart the IBM HTTP Server.


**Parent topic:**[Administering Profiles](../admin/c_admin_profiles_intro.md)

