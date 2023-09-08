# Determining which files to compress {#t_ihs_config_not_compressing_files .task}

If you are not compressing content with the IBM® WebSphere® Application Server Edge components or a similar device, configure the IBM HTTP Server to compress certain types of content to improve browser performance. 

This is an optional configuration. You do not need to perform this procedure if you are compressing content elsewhere in your network. Compression requires a significant amount of CPU; you must monitor resource availability if you choose to use this option. You can perform this task during or after Connections installation.

The directives discussed here do not compress images, but do compress JavaScript™.

To specify which types of files to compress, complete the following steps:

1.  Using a text editor, open the httpd.conf file. The file is stored in the following directory by default:

    -   Linux®: `/opt/IBM/HTTPServer/conf`
    -   Microsoft® Windows®: `C:\IBM\HTTPServer\conf`
2.  Find the following entry in the configuration file:

    ```
    LoadModule deflate_module modules/mod_deflate.so
    ```

    If this entry is not present, add it. If the entry is commented out with a \# character, remove the commenting from it.

3.  Add the following statements to compress multiple content types used by HCL Connections:

    ```
    #Only the specified MIME types will be compressed.
    
    AddOutputFilterByType DEFLATE application/atom+xml
    AddOutputFilterByType DEFLATE application/atomcat+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE application/octet-stream
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/xsl
    
    ```

4.  Add the following statement to specifically indicate that image files and binaries must not be compressed to prevent web browser hangs:

    ```
    # Ensures that images and executable binaries are not compressed
    SetEnvIfNoCase Request_URI \\.(?:gif|jpe?g|png|exe)$ no-gzip dont-vary
    ```

5.  Add the following statement to ensure that proxy servers do not modify the User Agent header needed by the previous statements:

    ```
    # Ensure that proxies do not deliver the wrong content
    Header append Vary User-Agent env=!dont-vary
    ```

    If the following line is commented out, remove the commenting from it:

    ```
    LoadModule headers_module modules/mod_headers.so
    ```

6.  In order to retain access to ACCE \(the web client administrative tool for FileNet\), add the following statement to exclude the entire /acce from compression:

    ```
    SetEnvIf Request_URI ^/acce(.*) no-gzip dont-vary
    ```

7.  Save and close the configuration file.

8.  Restart IBM HTTP Server.


**Parent topic:**[Defining IBM HTTP Server](../install/t_create_webserver1_node_b.md)

