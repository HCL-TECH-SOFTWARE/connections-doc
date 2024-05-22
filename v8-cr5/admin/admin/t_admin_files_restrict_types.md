# Restricting file types in Files {#restrictingfiletypesinfiles .task}

You can restrict the types of files that users can upload in Files.

To edit configuration files, use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin tool.

You can create a list of denied file extensions and prevent users from uploading files with those extensions. You can also create a list of allowed file extensions and only allow users to upload files with those extensions.

Restricting file types affects users uploading new files, or changing the extensions of existing files. Users cannot change existing files to a denied type. Existing documents with denied extensions are not affected. For example, if you deny the `.xls` extension, users cannot upload `.xls` files or change existing files to have the `.xls` extension. But existing `.xls` files are not affected, and users can still upload new versions of them.

This is not intended as a security application. Files are not analyzed to determine their type, only the file name is read to allow or deny \(with an error\) the upload. This is only to help you restrict the types of files you store in your environment.

Perform the following steps to restrict file types in Files:

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter.

    1.  Use the following command to access the Files configuration files:

        ```
        execfile("filesAdmin.py")
        ```

        If you are asked to select a server, you can select any server.

    2.  Check out the Files configuration files using the following command:

        FilesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux™ only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        FilesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

3.  Open `files-config.xml`.

4.  In the `<restrictions>` element in the `<file>` section, specify the `enabled` attribute as true.

5.  In the `<restrictions>` element in the `<file>` section, specify the `mode` attribute as one of the following values:

    -   A value of allow means the extensions in the list are the only ones allowed to be uploaded.
    -   A value of deny means the extensions in the list are the only ones not allowed to be uploaded.
6.  In the `<restrictions>` element, add an `<extensions>` element, and within the `<extensions>` element add one or more `<extension>` elements, each containing a file extension to allow or deny.

7.  You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See the topic *Applying Files property changes* for details.


```
<file>
 ....
 <restrictions enabled="true" mode="allow">
  <extensions>
	 <extension>odt</extension>
	 <extension>odp</extension>
	 <extension>ods</extension>
  </extensions>
 </restrictions>
</file>
```

In this example, files with .odt, .odp, or .ods extensions are the only file types that users can upload.

Use an empty `<extension>` element to allow or deny files without extensions, or with extensions that exceed the platform limit of 16 characters.

**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Files configuration properties](../admin/r_admin_files_config_properties2.md)

[Applying Files property changes](../admin/t_admin_files_config_apply.md)

