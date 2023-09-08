# Setting limits on uploaded files {#t_admin_act_set_limits .task}

Edit configuration property settings to limit the types of files that can be uploaded into Activities. You can also set the maximum size of an uploaded file and the number of server threads concurrently dedicated to downloading files from Activities to clients.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The Activities content store is used to store files that users upload to their activities.

1.  Use the wsadmin client to access and check out the Activities configuration files.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Activities configuration files using the following command:

        ```
        ActivitiesConfigService.checkOutConfig("working\_directory","cell\_name")
        
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft™ Windows™ operating system.

            **Note:** Linux™: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere® Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            ```
            print AdminControl.getCell()
            ```

        For example:

        -   Linux:

            ```
            ActivitiesConfigService.checkOutConfig("/opt/act/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ActivitiesConfigService.checkOutConfig("c:/act/temp","foo01Cell01")
            ```

2.  From the temporary directory to which you just checked out the oa-config.xml file, open the file in a text editor.

3.  Edit the elements in the <objectStore\> section of the file to set limits on the files that can be uploaded.

    -   To prevent users from being able to upload files of a specific type to Activities, add a <sizeLimits\> element block to the <objectStore\> section. For each file type that you want to disable, create a <limit\> element. Set the mimeFilenameRegex attribute of the <limit\> element equal to the file extension of the file type that you want to prevent users from uploading. Set the value of the limit element to 0. For example, the following element prevents users from being able to upload executable files:

        ```
        <sizeLimits>
           <limit mimeFilenameRegex=".*\.exe">0</limit>
        </sizeLimits>
        ```

        **Tip:** When you specify a value for the mimeFilenameRegex attribute, you are specifying a regular expression. Regular expressions are normally case-sensitive, and in the 1.0.x releases were treated as such. With release 2.0, the filter was enhanced so it is not case-sensitive. For example, if you specify `<limit mimeFilenameRegex=".*\.exe">`, the tool filters any files with a .exe extension regardless of the case in which the letters EXE are specified.

    -   To limit the size of files that are uploaded to the content store, modify the value of the <limit\> element for the entry with the **.\*** extension. Specify the new maximum size value in bytes. For example, the following property setting specifies that all files must be smaller than 10 MB:

        ```
        <limit mimeFilenameRegex=".*">10485760</limit>
        ```

    -   To limit the number of threads that are allowed to concurrently respond to requests to download files from the content store, edit the value of <max-concurrent-downloads\>. For example, the following property setting enables the server to allow a maximum of 10 downloads at the same time:

        ```
        <max-concurrent-downloads>10</max-concurrent-downloads>
        
        ```

4.  To remove a file upload limitation, delete the <limit\> element that represents the file type that you want to allow users to upload.

5.  If you configured your system to upload an Activities file through the IBM HTTP Server as described in *Configuring file uploads through IBM HTTP Server*, you can edit the value for the `formFileUploadSizeLimit` parameter to change the maximum file upload size. For example, the following property enables the server to upload a file with a maximum size of 30 MB:

    ```
    <formFileUploadSizeLimit>31457280</formFileUploadSizeLimit>
    ```

6.  To enable unlimited simultaneous downloads, remove the <max-concurrent-downloads\> element.

7.  Save and close the oa-config.xml file.

8.  After you make changes, check in the configuration file. Check the file in during the same wsadmin session in which you checked it out for the changes to take effect. You must also restart the server. See *Applying property changes* for details.

9.  After you restart the Activities server, review the WebSphere Application Server SystemOut.log file to ensure that the Activities application was able to initialize with the modified configuration.


The following lines of XML provide an example of oa-config.xml file content that describes a <sizelimit\> configuration. In this example, files with .exe, .sh, .bat, and .oa extensions cannot be uploaded to Activities. Also, the maximum file size of an uploaded file is 10 MB and the number of concurrent downloads is limited to 5.

```
<sizeLimits>
       <limit mimeFilenameRegex=".*\.exe">0</limit>
       <limit mimeFilenameRegex=".*\.bat">0</limit>
       <limit mimeFilenameRegex=".*\.sh">0</limit>
       <limit mimeFilenameRegex=".*\.oa">0</limit>
       <limit mimeFilenameRegex=".*">10485760</limit>
</sizeLimits>

<max-concurrent-downloads>5</max-concurrent-downloads>

```

**Parent topic:**[Managing uploaded files](../admin/t_admin_act_manage_uploads.md)

**Related information**  


[Checking out the Activities configuration files](../admin/t_admin_act_checkout_config_file.md)

[Applying property changes in Activities](../admin/t_admin_act_save_changes.md)

