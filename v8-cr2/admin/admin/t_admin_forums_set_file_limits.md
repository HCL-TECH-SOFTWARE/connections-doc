# Setting limits on uploaded Forums files {#t_admin_forums_set_file_limits .task}

Edit your Forums configuration settings to limit the types of files that can be uploaded to Forums.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The Forums content store is used to store files that users upload to their forums. By editing the forum-config.xml Forums configuration file, you can set the maximum size of an uploaded file, configure allowed file types, and restrict certain file types. You can also specify the number of server threads that are concurrently dedicated to downloading files from Forums to clients.

1.  Use the wsadmin client to check out the forum-config.xml file.

    1.  Use the following command to access the Forums configuration file:

        ```
        execfile("forumsAdmin.py")
        ```

        If you are prompted to specify a service to connect to, enter 1 to select the first node in the list. Most commands can run on any node. If the command specifies a file by using a local file path, select the node where the file is stored.

    2.  Check out the Forums configuration files by using the following command:

        ForumsConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the XML and XSD configuration files are copied. The files are kept in this working directory while you modify them.

            **Note:** Linux™ only: The directory must grant write permissions or the command fails.

        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections applications. This argument is required. It is also case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ForumsConfigService.checkOutConfig\("/opt/my\_temp\_dir", "ForumServerNode01Cell"\)

2.  Open the forum-config.xml file in a text editor.

3.  Edit the elements in the <objectStore\> section of the file:

    -   To prevent users from uploading files of a specific type to Forums, complete the following steps:

        1.  Add a <sizeLimits\> element to the <objectStore\> section.
        2.  For each file type that you want to disable, create a <limit\> element.
        3.  In the mimeFilenameRegex attribute of this element, specify the file extension of the file type that you want to disable.
        4.  Set the value of the limit element to 0.
        For example, the following element prevents users from uploading executable files:

        ```
        <sizeLimits>
           <limit mimeFilenameRegex=".*\.exe">0</limit>
        </sizeLimits>
        ```

        **Tip:** To remove an upload limitation, delete the <limit\> element for the file type that you want to allow.

    -   To limit the size of uploaded files, modify the value of the <limit\> element with the **.\*** extension. Specify the new maximum size value in bytes.

        For example, the following property setting specifies that uploaded files must be smaller than 10.5 MB:

        ```
        <limit mimeFilenameRegex=".*">10500000</limit>
        ```

    -   To limit the number of concurrent server threads, edit the value of <max-concurrent-downloads\>.

        For example, the following setting allows a maximum of 10 simultaneous downloads:

        ```
        <max-concurrent-downloads>10</max-concurrent-downloads>
        
        ```

        **Tip:** To enable unlimited simultaneous downloads, remove the <max-concurrent-downloads\> element.

4.  Save and close the forum-config.xml file.

5.  Check in the configuration file.

    **Note:** For your changes to take effect, you must check in the file during the same wsadmin session in which you checked it out.

6.  Restart the server that hosts the Forums application. For more information, see *Applying property changes in Forums*.

7.  After you restart the Forums server, review the WebSphere Application Server SystemOut.log file to ensure that the Forums application was initialized with the modified configuration.


The following lines of XML provide a <sizelimit\> example where .exe, .sh, .bat, and .oa extensions cannot be uploaded to Forums. The maximum size of an uploaded file is 10 MB and the number of concurrent downloads is limited to 5.

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

**Parent topic:**[Managing file attachments in Forums](../admin/c_admin_forums_manage_attachments.md)

