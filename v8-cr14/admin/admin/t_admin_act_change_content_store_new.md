# Defining multiple content stores for Activities {#t_admin_act_change_content_store_new .task}

The Activities content store stores the content, like files, that users add to their activities. The location of the content store can be defined during or after installation. You can configure Activities to use a content store that is different from the one defined during installation. Define more content stores if the current disk space on your system reaches capacity, or if you expand your infrastructure to add a drive. Adding a content store enables you to take advantage of the enhanced content store implementation that was introduced in version 4.

Use the wsadmin client to edit configuration files. For details, see *Starting the wsadmin client*.

The <store\> element that contains the default attribute set to true is the active content store for Activities. The active content store is where activity content that users upload is saved to. All older content stores are read-only. Updates to files in the read-only stores are written to the active store.

With release 4, the Java object that is used to define the content store changed. The new implementation provides the following enhancements:

-   Resources from one activity are distributed and stored across multiple directories. In previous releases, the resources were all stored in subdirectories of a single directory. The new method helps to prevent busy implementations from reaching the maximum number of allowed subdirectories. When the maximum number of subdirectories is reached, the administrator must add a content store to the deployment.
-   The new implementation uses a unique identifier to name the file, instead of using the file name that is given by the person who uploads the file. File metadata such as its mime type and user-defined name, is stored separately. As a result, someone with access to the disk cannot view the file without doing so through the product user interface.

1.  Use the wsadmin client to check out the Activities configuration files.

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

2.  Go to the temporary directory that contains the checked out oa-config.xml file. Open oa-config.xml in a text editor.

3.  Copy the existing <store\> to use as a template for the new content store.

4.  Paste a copy of the new <store\> after the current <store\>.

5.  Make the original content store inactive by changing the value of the default attribute to false.

    You must retain the original store to prevent data that was saved to the original store from becoming inaccessible. Removing the original content store can adversely affect existing activities.

6.  Make the new content store active by setting the value of the default attribute to true.

    **Note:** Only one <store\> can have a default attribute that is set to true. When you set the default attribute of a content store to true, new content is saved to that content store. Existing content remains in the old content store and is read-only.

7.  Modify the new <store\> to point to the new file system location.

    **<id\>**:   Activities relies on this element to map to the content store configuration. Do not change the value of the <id\> element after the system is in use. Specify a unique name for the file system. The maximum character limit for <id\> is 32 characters.

    **root.directory property**:   Specify the file path of the new file system location.

        -   Use the Universal Naming Convention \(UNC\) format to set the file path to a network share directory. For example:
            -   Full path configured in oa-config.xml

                ```
                \\\\server_name\share_name 
                or
                //server_name/share_name
                ```

            -   full path configured in WAS variable

                ```
                //server_name/share_name 
                or
                \\server_name/share_name 
                ```

        -   Use the WebSphere Application Server environment variable that defines the file store location. For example: `${ACTIVITIES_CONTENT_DIR}`. Using a variable to define the directory location makes it easier to change the value of the content store path information later.
        Specify the same value on each node to which you install Activities.

8.  Save and close the oa-config.xml file.

**Example**

The following sample shows two content stores. The second <store\> is the active store and is where new content or revisions of existing content are uploaded to. It uses the new implementation. The first content store uses the old implementation and is inactive. The two implementations can coexist, but should reside in a mapped disk location that is separate from each other.

```
<store 
  default="false" 
  class="com.ibm.openactivities.objectstore.filesystem.FileSystemObjectStore">
    <id>filesystem</id>
    <property name="use.historic">false</property>
    <property name="root.directory">
     \\enterprise.server\LotusConnections\Data\activities\content
    </property>

</store>
<store 
  default="true" 
  class="com.ibm.openactivities.objectstore.filesystem.ContentStore">
    <id>filesystem2</id>
    <property name="use.historic">false</property>
    <property name="root.directory">${ACTIVITIES_CONTENT_DIR}</property>
</store>
```

**What to do next**
Check in the updated configuration files. The check-in must be done during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details. Restart the Activities server and review the WebSphere Application Server SystemOut.log file to ensure that the Activities application was able to initialize with the modified configuration.

.

**Parent topic:** [Managing uploaded files](../admin/t_admin_act_manage_uploads.md)

**Related information**  


[Moving the content store](../admin/t_admin_act_move_content_store.md)

[Applying property changes in Activities](../admin/t_admin_act_save_changes.md)

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

