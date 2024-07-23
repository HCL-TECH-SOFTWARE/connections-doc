# Extending the list of allowable file types for blogs {#t_admin_blogs_mime_file_types .task}

Extend the list of possible file types that users could upload to a blog.

When a file is uploaded to a blog, the mime type specified in the content type in the http request header must match a mime type available for the Java™ Virtual Machine \(JVM\) so that the correct file extension is applied. By default, the Java Virtual Machine \(JVM\) supports a default set of mime types that map the most common types of content to the correct file extensions. You can extend the list so that users can upload files of types that are not specified in the default list. After you extend the list you must specify that the file type is allowable as an upload. Follow these steps to extend the list and make a new file type allowable for uploads:

1.  Using a text editor, open the file mime.types in the directory .

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\installedApps\<cell\_name\>\Blogs.ear\blogs.war\META-INF
    ```

    The file only includes comments:

    ```
    # Copyright IBM Corp.  2009  All Rights Reserved.    #
    
    # comments begin with a '#'
    # the format is <mime type> <space separated file extensions>
    # for example: (without the # comment mark)
    # text/plain txt text TXT
    # this would map file.txt, file.text, and file.TXT to
    # the mime type "text/plain"
    ```

2.  Add the mime types you want users to be able to upload.

    For example, to support the upload of Microsoft Excel files, add the mime type application/vnd.ms-excel xls XLS. Blogs would then be able to recognize that file type and assign the XLS file extension.

3.  Save the file and restart the Blogs server.

4.  From the Blogs interface, choose the **Administration** tab.

5.  On the Configuration page, make sure that **Enable File Uploads** is enabled.

6.  Add the new file extension to the **Allowed Extensions** field.

7.  Synchronize the changes from the deployment manager to the nodes.


Your users will now be able to upload files of the type you specified.

**Parent topic:**[Administering Blogs](../admin/c_administering_blogs.md)

