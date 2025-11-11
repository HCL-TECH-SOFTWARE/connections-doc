# Configuring file uploads through IBM HTTP Server {#task_jkk_vs1_d5 .task}

Configure the IBM® HTTP Server to manage file uploads from Files. This approach is more efficient than using the IBM WebSphere® Application Server to receive files larger than 500 MB.

## Before you begin

All Files data must first be stored on a shared file system as described in [Deployment options](../plan/c_planning_the_installation.md). The IBM HTTP Servers in the deployment must also have READ and WRITE access to the files and folders, and the WebSphere Application Servers must have WRITE access.

!!! note 
    
    For shared and remote network file system requirements, review the footnotes for each supported operating system in the detailed system requirements.

## About this task

The default deployment for the IBM HTTP Server passes file upload requests from the IBM HTTP Server to the WebSphere Application Server. The WebSphere Application Server then saves the files in a data directory on the file system. When too many users upload large files this deployment becomes inefficient because the WebSphere Application Server has a limited thread pool that is tuned for short-lived transactions. Configuring the IBM HTTP Server to upload large files allows the WebSphere Application Server to run tasks such as security checking and quota validation. During the upload of a large file, the WebSphere Application Server can serve other requests while the HTTP server is receiving file content.

Installing an add-on module that directs the IBM HTTP Server to upload files is the first step in configuring the environment. When the module is installed, upload requests are intercepted by the IBM HTTP Server. The add-on module then communicates with the WebSphere Application Server and saves file content to the data directory. After the whole file content is saved, the add-on module tells the WebSphere Application Server to save the information to the database and complete the upload process.

!!! note 
    
    If you use the add-on module, you must use an IBM HTTP Server address for the HCL Connections inter-service URL. For information on setting an inter-service URL, see *Troubleshooting inter-server communication*.

## Procedure

1.  Install the HCL Connections Files applications to configure it for file uploads. This can only be configured for Files.

2.  On the server where HCL Connections is installed, go to the connections\_root/ihs/mod\_ibm\_upload/platform directory and locate the module file named **mod\_ibm\_upload.so**. Depending on your operating system, search for one of the following directories:

    ```
    /ihs.linux.s390
    /ihs.linux.ia32    
    /ihs.linux.ppc64    
    /ihs.linuxs.390_x64
    /ihs.linux.amd64    
    /ihs.linux.x86_64    
    /ihs.linux.ia32
    /win_ia32
    ```

    The path for a Linux System for example, would look like the following: /opt/IBM/Connections/ihs/mod\_ibm\_local\_upload/ihs.linux.ia32/mod\_ibm\_upload.so

3.  Copy the module to the appropriate directory on the system that hosts the IBM HTTP Server. By default, modules are stored in the ibm\_http\_server\_root/modules directory.

4.  Open the **httpd.conf** file in the ibm\_http\_server\_root/conf directory. Add the following statements to load `ibm_local_upload` and `mod_rewrite module`:

    ```
    LoadModule rewrite_module modules/mod_rewrite.so
    LoadModule ibm_upload_module modules/mod_ibm_upload.so
    ```

    !!! note
        
        By default the **mod\_rewrite** module is installed in the /modules directory. It might already be loaded, or it might be a commented-out line that you can edit.

5.  Grant access to the data directory root as follows:

    -   For Linux: Give the IBM HTTP Server user READ, WRITE, and EXECUTE access to the data directory root.
    -   For Microsoft Windows: Give the IBM HTTP Server user READ and WRITE access to the data directory root. For optimal security, do not grant WRITE access.
    
    !!! note 
    
        You can find the data\_directory\_root path by searching for storage rootDirectory in **files-config.xml**. This attribute contains either the path itself or a WebSphere Application Server variable whose value is the path. For example, if the value is `${FILES_CONTENT_DIR}`, then `FILES_CONTENT_DIR` is the path for the WebSphere Application Server console. Information about opening the **files-config.xml** can be found in *Changing configuration property values*. For more information about WebSphere variables, see *Changing WebSphere Application Server environment variables*.

        In some situations, granting access at the data directory root might not work for you. This failure might occur if the value of `FILES_CONTENT_DIR` is \\\\server\\Shared\\files\\upload. In this case, the user has no rights to share and cannot be given READ access. You must instead give the user READ access at the share point of \\\\server\\Shared.

6.  On all virtual hosts in the same domain as Files that include both HTTP and HTTPS, configure the rewrite rules to match as follows:

    For Files:

    ```
    <IfModule mod_rewrite.c>    
    RewriteEngine On    
    
    #Uncomment to create log messages.    
    #RewriteLog logs/rewrite.log    
    #RewriteLogLevel 9    
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]    
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]    
    RewriteRule ^/files/(basic|form|oauth)/api/myfilesync/feed(\?[^/]*)? /ihs/files/$1/api/myfilesync/feed$2 [PT,L]    
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]    
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]    
    RewriteRule ^/files/(basic|form|oauth)/api/userlibrary/([^/]+)/feed(\?[^/]*)? /ihs/files/$1/api/userlibrary/$2/feed$3 [PT,L]
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]    
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]     
    RewriteRule ^/files/(basic|form|oauth)/api/communitylibrary/([^/]+)/feed(\?[^/]*)? /ihs/files/$1/api/communitylibrary/$2/feed$3 [PT,L]    
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]     
    RewriteRule ^/files/(basic|form|oauth)/api/myfilesync/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/myfilesync/document/$2/entry$3 [PT,L]
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} ^phases$ [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} ^[0-9a-zA-Z-]+$ [NC]    
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]     
    RewriteRule ^/files/(basic|form|oauth)/api/library/([^/]+)/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/library/$2/document/$3/entry$4 [PT,L]    
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]     
    RewriteRule ^/files/(basic|form|oauth)/api/userlibrary/([^/]+)/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/userlibrary/$2/document/$3/entry$4 [PT,L]    
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]     
    RewriteRule ^/files/(basic|form|oauth)/api/myuserlibrary/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/myuserlibrary/document/$2/entry$3 [PT,L]
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]    
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]    
    RewriteRule ^/files/(basic|form|oauth)/api/myuserlibrary/feed(\?[^/]*)? /ihs/files/$1/api/myuserlibrary/feed$2 [PT,L]    
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]     
    RewriteRule ^/files/(basic|form|oauth)/api/communitylibrary/([^/]+)/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/communitylibrary/$2/document/$3/entry$4 [PT,L]    
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]    
    RewriteRule ^/files/(basic|form|oauth)/api/library/([^/]+)/feed(\?[^/]*)? /ihs/files/$1/api/library/$2/feed$3 [PT,L]
    
    RewriteCond %{ENV:ENV-SKIP-IBM-UPLOAD-HANDLER} !=true [NC]
    RewriteCond %{HTTP:X-IBM-UPLOAD-METHOD} phases [NC]    
    RewriteCond %{HTTP:X-IBM-UPLOAD-TOKEN} [0-9a-zA-Z-] [NC]    
    RewriteCond %{REQUEST_METHOD} !=GET [NC]    
    RewriteCond %{REQUEST_METHOD} !=OPTION [NC]    
    RewriteCond %{REQUEST_METHOD} !=HEAD [NC]    
    RewriteCond %{REQUEST_METHOD} !=DELETE [NC]    
    RewriteRule ^/files/(basic|form|oauth)/api/document/([^/]+)/entry(\?[^/]*)? /ihs/files/$1/api/document/$2/entry$3 [PT,L]
    
    </IfModule>
    ```

    !!! note 
        
        You can put rules for Files only between the `<IfModule>` and `</IfModule>` elements.

7.  Configure the upload module as follows:

    For Files:

    ```
    <Location "/ihs/files">    
    IBMUploadHandler On    
    SetHandler ibm_upload_handler    
    IBMUploadBaseStore "/opt/IBM/Connections/data/files/upload/files"    
    IBMUploadMethods POST,PUT
    IBMUploadURLPrefix /ihs
    </Location>
    ```

8.  Configure the Files application to work with the upload module as follows:

    For Files:

    Change the `modIBMUpload` property to be enabled in the **files-config.xml** file. For example:

    ```
    <upload>  
    <modIBMUpload enabled="true"/> 
    </upload>
    ```

    Then, limit the old API to allow only smaller file uploads as follows:

    Change the `maximumSizeInKb` property for the simpleUploadAPI file. For example:

    ```
    <api>   
    <simpleUploadAPI maximumSizeInKb="512000">
    </simpleUploadAPI> 
    </api>
    ```

    !!! note 
        
        The upload module can be used only when WebSphere Application Server is not run as user root. Otherwise, file permissions prevent the application server and the IBM HTTP Server from exchanging files. For security reasons, do not run the application server as root, but if that is not an option, then large files still can be uploaded. If WebSphere Application Server is run as root, consider making the following change to the `maximumSizeInKb` property for thesimpleUploadAPI file:

            ```
            <api>   
                <simpleUploadAPI maximumSizeInKb="2097152">
                </simpleUploadAPI> 
                </api>
            ```

9.  Restart the HTTP server and the Files application.


**Parent topic:** [Configuring IBM HTTP Server](../install/c_add_ihs_over.md)