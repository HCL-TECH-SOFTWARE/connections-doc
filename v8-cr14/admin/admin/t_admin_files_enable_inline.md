# Displaying files inline {#enablinginlinedislplayinfiles .task}

Configure Files to display files inline instead of as attachments. This is useful when you use the Files API to download and display active content, such as Adobe® Flash \(.swf\) files, in your own HTML pages. Enable inline display by changing a configuration property in the `files-config.xml` file. Then set the inline parameter to true in your download requests.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

By default, the HCL Connections server passes Files application files to browsers with the header "Content-Disposition: attachment." This means files display as attachments; when users click the attachment they are prompted to open or download the file. It also prevents embedding files. If you want to embed files in your own HTML page using an <embed\> tag, the content disposition must be inline. This affects active content, such as Adobe Flash \(.swf\), and HTML pages referenced with <iframe\>.

Configure a property in `files-config.xml` to change the content disposition from attachment to inline. Then set the inline parameter to true in your Files API download requests.

Important: Files uses the attachment disposition for security reasons. Specifically, uploaded files could potentially contain malicious code that can exploit the cross-site scripting vulnerabilities of some browsers. If you switch to inline disposition, you should configure an alternate domain download for greater security. See *Mitigating a cross site scripting attack*.

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

3.  Change the content disposition to inline using the following command:

    ```
    FilesConfigService.updateConfig("security.inlineDownload.enabled", "true")
    ```

4.  You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See the topic *Applying Files property changes* for details.

5.  Set the inline parameter to true in your download requests, for example:

    ```
    http://<host>:<port>/files/form/anonymous/api/library/<library ID>/document/<file ID>/media/<FileName>.<ext>?inline=true
    ```

    See *Downloading a file*.


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Files configuration properties](../admin/r_admin_files_config_properties2.md)

[Applying Files property changes](../admin/t_admin_files_config_apply.md)

[Mitigating a cross site scripting attack](../secure/t_admin_common_secure_xss.md)

