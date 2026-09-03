# Enabling the use of pronunciation files in an HTTPS environment {#t_admin_profiles_enable_pronunciation .task}

Ensure that Profiles users can save and play pronunciation files in an HTTPS environment by defining a rule in the IBM® HTTP server’s configuration file.

This task needs to be performed in an HTTPS environment only.

Profiles users can add a recording of how their name is pronounced to enhance their profile. To ensure that users can save a pronunciation file to their own profile and listen to the recordings of other users, you must define a rule in the IBM HTTP Server's configuration file to explicitly set the caching headers of pronunciation files.

1.  Define a rule in the IBM HTTP Server by completing the following steps:
2.  Using a text editor, open the IBM HTTP Server configuration file, httpd.conf file. The file is stored in the following directory by default:

    -   Linux™: /opt/IBM/HTTPServer/conf
    -   Microsoft™ Windows™: C:\\IBM\\HTTPServer\\conf
3.  Add the following block of code to the httpd.conf file:

    ```
    <LocationMatch /*/profiles/audio.do>
       Header set Pragma ""
       Header set Cache-Control "private, max-age=0, must-revalidate"
    </LocationMatch>
    ```

4.  Save and close the configuration file.

5.  Restart the IBM HTTP Server.


**Parent topic:**[Administering Profiles](../admin/c_admin_profiles_intro.md)

**Related information**  


[Uploading pronunciation files](../admin/t_admin_profiles_import_pronunciation.md)

