# Configuring MIME types for Wikis {#configuringmimetypes .task}

Configure Multipurpose Internet Mail Extensions \(MIME\) types to file extensions.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

You can configure Wikis to assign specific MIME types to files with specific extensions. A MIME type informs operating systems about what applications to use to open the file types, and what applications to display in dialog boxes. MIME types make it easier for users to know at a glance what type of data a file contains. Some applications do not download files that do not have a MIME type that they support.

This configuration procedure applies to files attached to Wikis pages through the web user interface. The configuration is ignored if a third-party application assigns MIME types to extensions by using the API. For information about assigning MIME types through the API, see the *Wikis API* topic.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter.

    1.  Use the following command to access the Wikis configuration files:

        ```
        execfile("wikisAdmin.py")
        ```

        If you are asked to select a server, you can select any server.

    2.  Check out the Wikis configuration files using the following command:

        WikisConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux™ only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        WikisConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

3.  Go to the working directory that is specified in Step 2b and open the `mime-wikis-config.xml` file. The content of the file is similar to the following excerpt:

    ```
    <mapping mimeType="..." mediaType="..."> 
    		<extension></extension> 
    		<extension></extension> 
    		.... 
    </mapping>
    ```

4.  In the mimeType attribute, specify a mime type in standard format, for example `text/plain`. Each value must be unique or an error is returned when you start the system. Go to the [Internet Assigned Numbers Authority \(IANA\)](http://www.iana.org/assignments/media-types/) website for a list of MIME types.

    **Note:** The mediaType attribute is not supported in this release.

5.  In each extension element, specify the extensions that you want to map to the MIME type. Each value must be unique or an error is returned when you start the system.

6.  Apply the changes. For more information, see *Applying Wikis property changes*.


```
<mapping mimeType="text/plain" mediaType=""> 
	<extension>.txt</extension> 
  .... 
</mapping>
```

**Parent topic:**[Changing Wikis configuration property values](../admin/t_admin_wikis_changing_config_properties.md)

**Related information**  


[Applying Wikis property changes](../admin/t_admin_wikis_config_apply.md)

