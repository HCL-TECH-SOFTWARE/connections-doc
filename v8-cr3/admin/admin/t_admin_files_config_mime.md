# Configuring MIME types for Files {#configuringmimetypes .task}

You can assign Multipurpose Internet Mail Extensions \(MIME\) types to file extensions.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

You can configure Files to assign a specific MIME type to files with specific extensions. Files with MIME types tell operating systems what applications to open them with, and what applications to display in file open windows. MIME types make it easier for users at a glance to know what type of data a file contains. Also, some applications do not download files that do not have a MIME type that they support.

This configuration applies to files uploaded through the web user interface. The configuration is ignored if a third party application assigns MIME types to extensions using the API.

You can also map extensions to icons. See the topic *Customizing file type icons*.

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

3.  Navigate to the working directory specified in Step 2b and open the `mime-files-config.xml` file. The contents look like this:

    ```
    <mapping mimeType="..." mediaType="..."> 
    		<extension></extension> 
    		<extension></extension> 
    		.... 
    </mapping>
    ```

4.  In the mimeType attribute specify a mime type in standard format, for example `text/plain`. Each value must be unique compared with other mimeType values in other mapping elements, or an error is returned when you start the system. See the [Internet Assigned Numbers Authority \(IANA\)](http://www.iana.org/assignments/media-types/) web site for a list of MIME types.

    For example, using the `<extension openFromWeb="true">jpg</extension>` entry displays an **Open this file** button in the Files user interface for files that have the .jpg file extension. This allows users to directly open this file type in their in browser, provided that their browser supports this action.

    ```
      <mapping mediaType="image" mimeType="image/jpeg">
        <extension>jpe</extension>
        <extension openFromWeb="true">jpeg</extension>
        <extension openFromWeb="true">jpg</extension>
      </mapping>
    ```

    In this example, files with an extension of .jpg will have mime-type of image/jpeg. The openFromWeb setting indicates whether this file can be opened directly in browser. This attribute only takes effect when security.inlineDownload.enabled is true.

5.  In each extension element specify the extensions that you want to map to the MIME type. Each value must be unique compared with other extension elements in the configuration file, or an error is returned when you start the system.

6.  Apply the changes following steps in the *Applying Files property changes*.


```
<mapping mimeType="text/plain" mediaType=""> 
	<extension>txt</extension> 
  .... 
</mapping>
```

**Parent topic:**[Changing Files configuration property values](../admin/t_admin_files_changing_config_properties.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying Files property changes](../admin/t_admin_files_config_apply.md)

