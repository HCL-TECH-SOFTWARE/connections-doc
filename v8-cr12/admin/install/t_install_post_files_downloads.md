# Configuring file downloads through IBM HTTP Server {#configuringforlarge-scalefilesdownloads .task}

Configure IBM® HTTP Server to manage file downloads from Activities, Files, Mobile, and Wikis. This approach is more efficient than using IBM WebSphere® Application Server to serve file downloads.

## Before you begin

Activities, Files, Mobile, and Wikis data must be stored on a shared file system, as described in the [Deployment options](../plan/c_planning_the_installation.md) topic. The Connections Content Manager uses an optional file cache on the file system for serving files through the HTTP server.

All IBM HTTP Servers in the deployment must have READ access to the files, and all WebSphere Application Servers must have WRITE access. This task is required after installing Connections whether you configure an IBM HTTP Server as part of the install or not.

!!! note 
    
    For shared and remote network file system requirements, review the footnotes for each supported operating system in the detailed [system requirements](https://support.hcltechsw.com/csm?sys_kb_id=2010cc82db30acd0a45ad9fcd3961971&id=kb_article_view).

If you choose not to configure IBM HTTP Server to download files, you must configure WebSphere Application Server to transfer data synchronously instead of asynchronously. This configuration avoids errors that are related to using too much memory. For more information, see the [Excessive native memory use in IBM WebSphere Application Server](http://www.ibm.com/support/docview.wss?uid=swg21317658) technote.

## About this task

In a default deployment with IBM HTTP Server, file download requests are passed from IBM HTTP Server to WebSphere Application Server. WebSphere Application Server accesses the files in a data directory on the file system and returns them to IBM HTTP Server, which passes them to the browser.

When large numbers of users are downloading files, this deployment is inefficient, partly because WebSphere Application Server has a limited thread pool that is tuned for short-lived transactions. In addition, WebSphere Application Server is optimized for Java™ Platform, Enterprise Edition applications and not for file downloads. In this type of deployment, you might have to create a cluster to handle downloads, especially if you have slow transfer rates.

Configuring IBM HTTP Server to download files makes downloading much more efficient, because IBM HTTP Server is designed specifically for serving files. This configuration leaves WebSphere Application Server to carry out tasks such as security checking and cache validation.

To configure this environment, install an add-on module that directs IBM HTTP Server to download files. When the module is installed, download requests are passed from IBM HTTP Server to the WebSphere Application Server. But instead of responding by downloading the file, WebSphere Application Server adds a special header to its response. The add-on module recognizes the header and directs IBM HTTP Server to download the file.

This configuration requires making the Files, Mobile, and Wikis data directories available to IBM HTTP Server by using an alias. \(Optionally, you can also make available the content cache directory from Connections Content Manager.\) This configuration creates a security concern, so you must configure the access control at the IBM HTTP Server level. After you configure security, access to the data through IBM HTTP Server is denied unless a specific variable is set. Requests to the applications on WebSphere Application Server are then configured to set the variable. In other words, only requests that pass through WebSphere Application Server can access the data directory, with WebSphere Application Server acting as the authorizer.

If you use the add-on module, you must use an IBM HTTP Server address for the HCL Connections inter-service URL. For information on setting an inter-service URL, see the [Troubleshooting inter-server communication](../troubleshoot/t_troubleshooting_server_communication.md) topic.

To configure IBM HTTP Server to download files, complete the following steps:

## Procedure

1.  Install the HCL Connections applications you plan to configure for file downloads if you have not already done so: Activities, Files, Mobile, or Wikis.

2.  On the server where you installed HCL Connections \(on the deployment manager\), navigate to the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/plugins/ihs/mod\_ibm\_local\_redirect/platform directory to find the module file \(mod\_ibm\_local\_redirect.so\). On supported operating systems, search the following directories:

    -   /linux390-ap22
    -   /linux\_ia32-ap22
    -   /linux\_ppc64-ap22
    -   /linuxs390\_x64-ap22
    -   /linux\_amd64-ap22
    -   /win\_ia32-ap22
    
    For example, on Linux systems, go to the following directory:

    ```
    /IBM/Connections/plugins/ihs/mod_ibm_local_redirect/linux_ia32-ap22/mod_ibm_local_redirect.so
    ```

3.  Copy the module to the appropriate directory on the system that hosts IBM HTTP Server. By default, modules are stored in the [ibm\_http\_server\_root](../plan/i_ovr_r_directory_conventions.md)/modules directory.

4.  Open the `httpd.conf` file \(in the [ibm\_http\_server\_root](../plan/i_ovr_r_directory_conventions.md)/conf directory by default\) and add the following statements to load the `ibm_local_redirect_module`, and the `mod_env` environment variable module:

    LoadModule ibm\_local\_redirect\_module path\_to\_module/mod\_ibm\_local\_redirect.so

    For example: `LoadModule ibm_local_redirect_module modules/mod_ibm_local_redirect.so`

    LoadModule env\_module path\_to\_mod\_env/mod\_env.so

    For example: `LoadModule env_module modules/mod_env.so`

    !!! note
        
        By default, the `mod_env` module is installed in the /modules directory. It might already be loaded, or it might be a commented-out line that you can edit.

5.  Grant access to the data directory root:

    -   Linux: Give the IBM HTTP Server user READ and EXECUTE access to the data directory root.
    -   Microsoft Windows: Give the IBM HTTP Server user READ access to the data directory root. For optimal security, do not grant WRITE access.
    
    !!! note
        -   You can find the [data\_directory\_root](../plan/i_ovr_r_directory_conventions.md) path by searching for "storage rootDirectory" in the `files-config.xml` or `wikis-config.xml` file. This attribute contains either the path itself, or a WebSphere Application Server variable whose value is the path. For information about opening the `files-config.xml` or `wikis-config.xml` files, see the *Changing configuration property values* topic. If the attribute contains a variable, for example, if the value is `${FILES_CONTENT_DIR}`, examine the FILES\_CONTENT\_DIR variable in the WebSphere Application Server console to find the path. For more information about WebSphere variables, see the *Changing WebSphere Application Server environment variables* topic.
        
        -   If the Connections Mobile service is installed, you must also give IBM HTTP Server access to the FileDiff StoragePath. You can find the FileDiff StoragePath attribute in the FileDiff section of the mobile-config.xmlfile. For information about editing the mobile-config.xml file, see the *Changing configuration property values* topic. This attribute contains either the path itself, or a WebSphere variable whose value is the path. For example, if the value of the variable is $\{MOBILE\_CONTENT\_DIR\}, examine the MOBILE\_CONTENT\_DIR variable in the WebSphere Application Server console to find the path. For more information about WebSphere variables, see the *Changing WebSphere Application Server environment variables* topic.
        
        -   In some situations, granting access at the data directory root might not work for you. For example, where the value of FILES\_CONTENT\_DIR is \\\\server\\Shared\\files\\upload, giving READ access to the user is not useful because they do not have any rights to the share. Instead, give the user Read access at the share point of \\\\server\\Shared.
        
        -   You must give the HTTP server the appropriate level of access to each content store root defined in the oa-config.xml file. The content store roots are defined in the root.directory property of each `<store>` element.

        For example:

            ```
            <property name="root.directory">${ACTIVITIES_CONTENT_DIR}</ property>
            ```

6.  On all virtual hosts in the same domain as Activities, Files, Mobile, or Wikis, including both HTTP and HTTPS, expose the data directory root:

    1.  Open the httpd.conf file.

    2.  To create an alias for the data directory root, add the following line:

        ```
        alias /alias "[data\_directory\_root](../plan/i_ovr_r_directory_conventions.md)"
        ```

        For example, if the Files data directory root on a Linux system is /opt/IBM/Connections/Data/Files, the following line creates the files\_content alias for that directory:

        ```
        alias /files_content /opt/IBM/Connections/data/shared/files/upload
        ```

        A similar example for Mobile:

        ```
        alias /mobile_content /opt/IBM/Connections/data/shared/mobile
        ```

        A similar example for Wikis:

        ```
        alias /wikis_content /opt/IBM/Connections/data/shared/wikis/upload
        ```

        !!! note
            
            -   For Activities, you must define a separate alias for each content store root, for example:

                ```
                alias /activities_content /opt/IBM/Connections/activities/content
                ```
            -   You must create the directory that is used in this step.
        
            -   Do not use the application context root \(/connections/filediff, /dm, /files, /mobile, or /wikis\) as part of the alias. You can use any other value. For example, use /files\_content, but not /files/content. The application context root is the path part of the application URL. For example the application context root of a Files application with the URL www.my.example.com/files is /files. You can see the value in the `files.href.prefix` property in the `LotusConnections-config.xml file`. See the topic *Changing common configuration property values* for information on opening the configuration file.
        
            -   Include quotation marks around the file path on Windows systems, and always use forward slashes, for example: "C:/Program Files/IBM/Connections/Data/Files"
        
            -   The example assumes that the HTTP server is on the same system as HCL Connections. If the HTTP server is on a different system, specify the data directory by using the network share path appropriate to your environment. For example, use a UNC network share format such as: `alias /files_content "//server/sharename/Files"`.

7.  To make the alias more secure, add the following lines to the `httpd.conf` file, adding them after the lines that you added in Step 7:

    ```
    <Directory "[data\_directory\_root](../plan/i_ovr_r_directory_conventions.md)">
     Order Deny,Allow
     Deny from all
     Allow from env=REDIRECT\_FILES\_CONTENT or REDIRECT\_MOBILE\_CONTENT or REDIRECT\_WIKIS\_CONTENT</Directory>
    ```

    For example:

    ```
    <Directory "/opt/IBM/Connections/activities/content">
     Order Deny,Allow
     Deny from all
     Allow from env=REDIRECT_ACTIVITIES_CONTENT
    </directory>
    
    <Directory "/opt/IBM/Connections/data/shared/files">
     Order Deny,Allow
     Deny from all
     Allow from env=REDIRECT_FILES_CONTENT
     </Directory>
    
    <Directory "/opt/IBM/Connections/data/shared/mobile">
     Order Deny,Allow
     Deny from all
     Allow from env=REDIRECT_MOBILE_CONTENT
     </Directory>
    
    <Directory "/opt/IBM/Connections/data/shared/wikis">
     Order Deny,Allow
     Deny from all
     Allow from env=REDIRECT_WIKIS_CONTENT
     </Directory>
    
    ```

    !!! note
        
        -   This definition secures the data by allowing requests where REDIRECT\_FILES\_CONTENT or REDIRECT\_MOBILE\_CONTENT or REDIRECT\_WIKIS\_CONTENT only is specified. Use any environment variable that you want, provided it is not already in the IBM HTTP Server environment.
        
        -   The example assumes that IBM HTTP Server is on the same system as HCL Connections. If IBM HTTP Server is on a different system, specify the data directory by using the network share path appropriate to your environment. For example, use a UNC network share format such as the following example: : `<Directory "//server/sharename/Files">`
        
        -   For Activities, a separate Directory element must be defined for each content store root.

8.  To enable the modules for Activities, Files, Mobile, and Wikis, add the following lines to the httpd.conf file, adding them after the lines that you added in Step 8:

    ```
    <Location application\_context\_root>
     IBMLocalRedirect On
     IBMLocalRedirectKeepHeaders X-LConn-Auth,Cache-Control,Content-Type,Content-Disposition,
    Last-Modified,ETag,Content-Language,Set-Cookie,Title,X-UA-Compatible
     SetEnv FILES_CONTENT or MOBILE_CONTENT or WIKIS_CONTENTtrue
    </Location>
    ```

    For example:

    ```
    <Location /activities>
     IBMLocalRedirect On
     IBMLocalRedirectKeepHeaders X-LConn-Auth,Cache-Control,Content-Type,Content-Disposition,
    Last-Modified,ETag,Content-Language,Set-Cookie,Title,X-UA-Compatible
     SetEnv ACTIVITIES_CONTENT true
    </Location>
    
    <Location /connections/filediff>
     IBMLocalRedirect On
     IBMLocalRedirectKeepHeaders X-LConn-Auth,Cache-Control,Content-Type,Content-Disposition,
    Last-Modified,ETag,Content-Language,Set-Cookie,X-Content-Length
     SetEnv MOBILE_CONTENT true
    </Location>
    
    <Location /files>
     IBMLocalRedirect On
     IBMLocalRedirectKeepHeaders X-LConn-Auth,Cache-Control,Content-Type,Content-Disposition,
    Last-Modified,ETag,Content-Language,Set-Cookie,Title,X-UA-Compatible
     SetEnv FILES_CONTENT true
    </Location>
    
    <Location /wikis>
     IBMLocalRedirect On
     IBMLocalRedirectKeepHeaders X-LConn-Auth,Cache-Control,Content-Type,Content-Disposition,
    Last-Modified,ETag,Content-Language,Set-Cookie,Title,X-UA-Compatible
     SetEnv WIKIS_CONTENT true
    </Location>
    
    ```

    !!! note
        
        -   The application\_context\_root value is the last part of the application URL. For example, the application context root of a Files application with the URL `www.my.example.com/files` is /files. This root is /files, /wikis, or /dm by default, but can be changed during post-installation steps. You can see the value in the `files.href.prefix` property in the LotusConnections-config.xml file. See the topic *Changing common configuration property values* for information on opening the configuration file.
        
        -   For mobile, the application\_context\_root is the FileDiff context root; by default, this root is /connections/filediff.
        
        -   The location for /connections/filediff must include the X-Content-Length header.
        
        -   Specifying `IBMLocalRedirectKeepHeaders` instructs the plug-in to keep the specified headers from the application server, instead of recomputing them. This specification is critical because the applications set such directives as the content-type and content-disposition that the IBM HTTP Server would not know about.
        
        -   If your environment requires more headers \(for example for a proxy cache\), you can add them to the comma-delimited `IBMLocalRedirectKeepHeaders` list. This addition ensures that the module retains them during redirection.
        
        -   Header names must be comma-delimited with no space before or after commas. Also, all header names must be on one line regardless of how many there are.
        
        -   The SetEnv value sets the token that the data directory requires to be accessible. It must match the value after REDIRECT\_ that you set in `Allow from env=` in Step 8. For example, if you set REDIRECT\_FILES\_CONTENT in Step 7, this value must be SetEnv FILES\_CONTENT true.
        
        -   You can think of this setting as a lock and key mechanism: only requests that go through the Files, Library, Mobile, or Wikis applications get a key, and the applications ensure that only authorized users can unlock particular files.

9.  Test that IBM HTTP Server is configured properly and securely:

    1.  Restart IBM HTTP Server. Make sure that it loads properly and there are no log errors about loading modules or configuration. If there are problems, make sure that the load module and configuration directives do not contain typographical errors.

    2.  Try to access the alias directory directly at http/https:host/alias and make sure that you are denied permission. If you can access the directory, make sure that the `Order Deny, Allow; Deny from All; Allow from env` from Step 8 are all present.

    3.  Access the application and download a file to make sure that it functions. The module is not yet enabled.

10. Check out the `files-config.xml`, mobile-config.xml, `oa-config.xml`, or `wikis-config.xml` file by using the steps in the topic *Editing configuration files*, and specifying the following property attributes:

    ```
    <download>
    <modIBMLocalRedirect enabled="true" hrefPathPrefix="/alias" />
    </download>
    ```

    !!! note
        
        -   The alias must have a forward slash in front of it.
        
        -   The modBMLocalRedirect element is in the FileDiff section of the mobile-config.xml file.
        
        -   For Activities, you must add separate `<download>` elements to each `<store>` element in `oa-config.xml`. Each `<download>` element references an Alias defined in Step 7.

        For example:

        ```
        <store default="true" class="com.ibm.openactivities.objectstore.filesystem.ContentStore">
            <id>filesystem</id>
            <property name="use.historic">false</property>
            <property name="root.directory">${ACTIVITIES_CONTENT_DIR}</property>
            **<download\>
                    <modIBMLocalRedirect enabled="true" hrefPathPrefix="/activities\_content" /\>
            </download\>**
        </store>
        ```

11. Restart Activities, Files, Mobile, or Wikis, depending on which applications you are configuring.

12. Download a file to make sure that the new configuration works.

13. Test whether IBM HTTP Server is downloading files:

    1.  Open the httpd.conf file and add \# characters to comment out the last line in the <Directory\> element,

        For example:

        ```
        <Directory "[data\_directory\_root](../plan/i_ovr_r_directory_conventions.md)">
         Order Deny,Allow
         Deny from all
        #Allow from env=REDIRECT_FILES_CONTENT or REDIRECT_MOBILE_CONTENT or REDIRECT_WIKIS_CONTENT
        
        </Directory>
        ```

        For example:

        ```
        <Directory "/opt/IBM/Connections/data/shared/files">
        Order Deny,Allow
        Deny from all
        #Allow from env=REDIRECT_FILES_CONTENT
        </Directory> 
        
        <Directory "/opt/IBM/Connections/data/shared/mobile">
        Order Deny,Allow
        Deny from all
        #Allow from env=REDIRECT_MOBILE_CONTENT
        </Directory> 
        
        <Directory "/opt/IBM/Connections/data/shared/wikis">
        Order Deny,Allow
        Deny from all
        #Allow from env=REDIRECT_WIKIS_CONTENT
        </Directory>
        
        ```

    2.  Save the file.

    3.  Try to download a file from Files, the Mobile app, or Wikis. If the new configuration is correct, your download is denied. Test over HTTP and HTTPS protocols \(if HTTPS is enabled\).

    4.  Open the `httpd.conf` file and remove the \# characters from the last line that was specified in Step a.

    Check the standard IBM HTTP Server error and request logs for any problems.

14. Ensure that Activities is downloading files from the HTTP server:

    1.  Enable the following tracing: `com.ibm.openactivities.web.coreui.actions.superclass.*=all`

    2.  Download a file from Activities or click **More** in an Activity goal or an **Entry/ToDo** description.

    3.  You should see a line like the following in the trace.log file: `[2/5/13 16:16:18:134 EST] 00000090 OaDownloadAct 1 sun.reflect.GeneratedMethodAccessor86 invoke OaDownloadAction setting X-IBM-Local-Redirect header to : /activities_content/122/110/69aed142-0b89-4a7a-985a-cfd99cca1292`

    4.  Ensure that the extended description displays when you click **More** and that downloaded files are not 0 bytes.

        If you do not see extended descriptions and if downloaded files have 0 length, then the configuration was not completed correctly.

## What to do next

-   If you get a permission denied error when you try to download a file, IBM HTTP Server might not have access to the content. You can temporarily disable security on the directory, and ensure you can access it directly first, then re-enable security. You can determine whether WebSphere Application Server or IBM HTTP Server is encountering an issue by the error page that is displayed, and by the path. If IBM HTTP Server is having a problem with the module that started, the path includes `/<alias>`.

-   If you get log errors about loading the module, make sure that it is only loaded once. Also, check that you selected the correct binary, and that you are using a supported operating system.

-   If it works for HTTP but not HTTPS \(or vice versa\), make sure that the configuration lines are in a global context or in each virtual host, depending on your setup.

**Parent topic:** [Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

**Related information**  


[Files configuration properties](../admin/r_admin_files_config_properties2.md)

[Wikis configuration properties](../admin/r_admin_wikis_config_properties2.md)

[Specifying a separate file download domain](../secure/t_admin_act_minimize_xss_risk.md)

