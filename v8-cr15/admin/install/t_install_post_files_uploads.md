# Configuring file uploads through IBM HTTP Server {#task_jkk_vs1_d5 .task}

Configure the IBM® HTTP Server to manage file uploads from Files. This approach is more efficient than using the IBM WebSphere® Application Server to receive files larger than 500 MB.

## Before you begin

All Files data must be stored on a shared file system, as described in [Deployment options](../plan/c_planning_the_installation.md).

The IBM HTTP Servers in the deployment must have **read and write** access to the files and folders, while the WebSphere Application Servers must have **write** access.

!!! note 
    
    For shared and remote network file system requirements, review the footnotes for each supported operating system in the detailed system requirements.

## About this task

The default deployment for the IBM HTTP Server passes file upload requests from the IBM HTTP Server to the WebSphere Application Server. The WebSphere Application Server then saves the files in a data directory on the file system. When too many users upload large files this deployment becomes inefficient because the WebSphere Application Server has a limited thread pool that is tuned for short-lived transactions. Configuring the IBM HTTP Server to upload large files allows the WebSphere Application Server to run tasks such as security checking and quota validation. During the upload of a large file, the WebSphere Application Server can serve other requests while the HTTP server is receiving file content.

Installing an add-on module that directs the IBM HTTP Server to upload files is the first step in configuring the environment. When the module is installed, upload requests are intercepted by the IBM HTTP Server. The add-on module then communicates with the WebSphere Application Server and saves file content to the data directory. After the whole file content is saved, the add-on module tells the WebSphere Application Server to save the information to the database and complete the upload process.

!!! note 
    
    If you use the add-on module, you must configure an IBM HTTP Server address for the HCL Connections inter-service URL. For more information about setting an inter-service URL, see *Troubleshooting inter-server communication*.

## Procedure
!!! note 
    Configuration steps for IHS 8 slightly differ from steps for IHS 9.

1.  Install the HCL Connections Files applications to configure it for file uploads. This can only be configured for Files.

2.  Locate and copy the upload module file:

    **For IHS 8:**

    1. On the server where HCL Connections is installed, navigate to the `connections_root/ihs/mod_ibm_upload/platform` directory and locate the module file **mod_ibm_upload.so**. Depending on your operating system, check one of the following directories:

        - `/ihs.linux.s390`
        - `/ihs.linux.ia32`
        - `/ihs.linux.ppc64`
        - `/ihs.linux.s390_x64`
        - `/ihs.linux.amd64`
        - `/ihs.linux.x86_64`
        - `/win_ia32`

     The path on a Linux system, for example, would look like this: `/opt/IBM/Connections/ihs/mod_ibm_local_upload/ihs.linux.ia32/mod_ibm_upload.so`

2. Copy the module to the appropriate directory on the system that hosts the IBM HTTP Server. By default, modules are stored in the `ibm_http_server_root/modules` directory.

    **For IHS 9:**

    1.  Verify that the IHS 9 plug-in installation kit is installed and includes the appropriate module file.

    2.  The module file **mod_ibm_upload.so** should be located in the IBM HTTP Server modules `extra` directory by default: `ibm_http_server_root/modules/extra`. If the file is not present in this location, copy it from the installation directory to the `extra` folder.
    
3.  Open the `httpd.conf` file in the `ibm_http_server_root/conf` directory. Add the following directives to load the `ibm_local_upload` and `mod_rewrite` modules:

    **For IHS 8:**

    ```apache
    LoadModule rewrite_module modules/mod_rewrite.so
    LoadModule ibm_upload_module modules/mod_ibm_upload.so
    ```

    **For IHS 9:**

    ```apache
    LoadModule rewrite_module modules/mod_rewrite.so
    LoadModule ibm_upload_module modules/extra/mod_ibm_upload.so
    ```
 
    By default, the **mod_rewrite** module is installed in the `modules` directory. It may already be enabled, or it may appear as a commented-out line that you can uncomment and edit if needed.
    
    **Optional (IHS 9 only): Increase Request Timeout for Large File Uploads**

    IBM HTTP Server 9 includes the `mod_reqtimeout` module, which sets a default request body timeout of 20 seconds. This can lead to intermittent failures when uploading large files.

    Locate the `RequestReadTimeout` directive (typically near the top of `httpd.conf`). If it does not exist, add it and increase the body timeout value as needed:
        
    ```sh
    <IfModule mod_reqtimeout.c>
    RequestReadTimeout header=20-40,MinRate=500 body=300,MinRate=500
    </IfModule>
    ```
        
    Change `body=20` to `body=300` (or higher) to allow up to 5 minutes for file upload requests. 

4.  Grant access to the data directory root as follows:

    - **For Linux:** Grant the IBM HTTP Server user **read, write, and execute** permissions on the data directory root.

    - **For Microsoft Windows:** Grant the IBM HTTP Server user **read and write** permissions on the data directory root. 
    
    For optimal security, avoid granting write permissions unless required. You can find the `data_directory_root` path by searching for `storage rootDirectory` in `files-config.xml`. This attribute may contain either the physical path or a WebSphere Application Server variable that resolves to the path. 
    
    For example, if the value is `${FILES_CONTENT_DIR}`, then `FILES_CONTENT_DIR` represents the actual directory defined in the WebSphere Application Server console. For information about opening `files-config.xml`, see *Changing configuration property values*. For more information about WebSphere variables, see *Changing WebSphere Application Server environment variables*. In some situations, granting access at the data directory root might not work. 
    
    For example, if the value of `FILES_CONTENT_DIR` is `\\server\Shared\files\upload`, the user might not have permission to access the share root and therefore cannot be granted read access to the full path.

    In this case, grant the user **read access** at the share level instead. For example:

    `\\server\Shared`

5.  On all virtual hosts in the same domain as Files that support both HTTP and HTTPS, configure the rewrite rules to include the following entries.
    Additional rewrite rules may also be present.

    **For Files:**
    ```sh
    <IfModule mod_rewrite.c>
    RewriteEngine On

    # Uncomment to enable rewrite logging.
    # RewriteLog logs/rewrite.log
    # RewriteLogLevel 9

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/myfilesync/feed(\?[^/]*)? /ihs/files/$1/api/myfilesync/feed$2 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/userlibrary/([^/]+)/feed(\?[^/]*)? /ihs/files/$1/api/userlibrary/$2/feed$3 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/communitylibrary/([^/]+)/feed(\?[^/]*)? /ihs/files/$1/api/communitylibrary/$2/feed$3 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/myfilesync/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/myfilesync/document/$2/entry$3 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/library/([^/]+)/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/library/$2/document/$3/entry$4 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/userlibrary/([^/]+)/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/userlibrary/$2/document/$3/entry$4 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/myuserlibrary/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/myuserlibrary/document/$2/entry$3 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/myuserlibrary/feed(\?[^/]*)? /ihs/files/$1/api/myuserlibrary/feed$2 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/communitylibrary/([^/]+)/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/communitylibrary/$2/document/$3/entry$4 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/library/([^/]+)/feed(\?[^/]*)? /ihs/files/$1/api/library/$2/feed$3 [PT,L]

    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]
    RewriteCond %{REQUEST_METHOD} !=OPTIONS [NC]
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]
    RewriteRule ^/files/(basic|form|oauth)/api/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/document/$2/entry$3 [PT,L]
    </IfModule>
    ```

    !!! note 
        You can put rules for Files only between the `<IfModule>` and `</IfModule>` elements.
        
        **Important:** These rewrite rules must be configured in **each virtual host** that serves Files requests (both HTTP and HTTPS virtual hosts). You can either:
        
        - Include the rules directly within each `<VirtualHost>` block, or
        - Save the rules to a separate file (e.g., `conf/ihs-upload-rewrite.conf`) and use `Include conf/ihs-upload-rewrite.conf` within each virtual host        

6.  Configure the Files upload module as follows:
   
    **For IHS 8:**

    ```
    <IfModule mod_ibm_upload.c>
        <Location /ihs/files>
            IBMUploadHandler On
            SetHandler ibm_upload_handler
            IBMUploadBaseStore /data/Connections/files/upload/files
            IBMUploadMethods POST,PUT
            IBMUploadURLPrefix /ihs
            IBMUploadActivateResumable On
        </Location>
    </IfModule>   
    ```
    
    **For IHS 9:**
    
    ```
    <IfModule mod_ibm_upload.c>
        <Location /ihs/files>
            IBMUploadHandler On
            SetHandler ibm_upload_handler
            IBMUploadBaseStore /data/Connections/files/upload/files
            IBMUploadMethods POST,PUT
            IBMUploadURLPrefix /ihs
        </Location>
    </IfModule>   
    ```
    !!! note
        
        Replace `/data/Connections/files/upload` with your actual Files data directory path (the `FILES_CONTENT_DIR` variable). The `IBMUploadBaseStore` should be set to this path plus `/files` subdirectory. For example, if `FILES_CONTENT_DIR` is `/data/Connections/files/upload`, then `IBMUploadBaseStore` should be `/data/Connections/files/upload/files`.

7.  Configure the Files application to work with the upload module as follows:

    For Files:

    Change the `modIBMUpload` property to be enabled in the **files-config.xml** file. For example:

    ```sh
    <upload>  
        <modIBMUpload enabled="true"/> 
    </upload>
    ```

    Then, limit the old API to allow only smaller file uploads as follows:

    Change the `maximumSizeInKb` property for the `simpleUploadAPI` file; this will force the legacy upload API to reject files larger than the specified size. For example:

    ```
    <api>   
        <simpleUploadAPI maximumSizeInKb="512000">
        </simpleUploadAPI> 
    </api>
    ```

    !!! note 
        
        The upload module can be used only when WebSphere Application Server is not run as user root. Otherwise, file permissions prevent the application server and the IBM HTTP Server from exchanging files. For security reasons, do not run the application server as root, but if that is not an option, then large files still can be uploaded. If WebSphere Application Server is run as root, consider making the following change to the `maximumSizeInKb` property for the `simpleUploadAPI` file:

        ```sh
        <api>   
        <simpleUploadAPI maximumSizeInKb="2097152">
        </simpleUploadAPI> 
        </api>
        ```
        
8. You may also have to increase the user file quota limits in the Files application to accommodate the larger files being uploaded, and increase the maximum file size limit in the Files application settings.  See [How to Increase the Connections Files Application total Library Size and Individual File Attachment Upload Size](https://support.hcl-software.com/csm?id=kb_article&sysparm_article=KB0020708) for more information.
        
9. Restart the HTTP server and the Files application.


**Parent topic:** [Configuring IBM HTTP Server](../install/c_add_ihs_over.md)