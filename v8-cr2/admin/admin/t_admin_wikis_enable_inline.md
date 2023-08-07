# Displaying file attachments inline {#enablinginlinedislplayinwikis .task}

Configure Wikis to display file attachments inline instead of as attachments. This is useful when you download and display active content, such as Adobe® Flash \(.swf\) files, in your own HTML pages. Enable inline display by changing a configuration property in the `wikis-config.xml` file. Then change the attachment URLs to use inline parameter.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

By default, the HCL Connections server passes Wikis application file attachments to browsers with the header "Content-Disposition: attachment." This means files display as attachments; when users click the attachment they are prompted to open or download the file. It also prevents embedding files. If you want to embed files in your own HTML page using an <embed\> tag, the content disposition must be inline. This affects active content, such as Adobe Flash \(.swf\), and HTML pages referenced with <iframe\>.

Configure a property in `wikis-config.xml` to change the content disposition from attachment to inline.

Important: Wikis uses the attachment disposition for security reasons. Specifically, uploaded files could potentially contain malicious code that can exploit the cross-site scripting vulnerabilities of some browsers. If you switch to inline disposition, you should configure an alternate domain download for greater security. See *Mitigating a cross site scripting attack*.

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

3.  Change the content disposition to inline using the following command:

    ```
    WikisConfigService.updateConfig("security.inlineDownload.enabled", "true")
    ```

4.  Check in the configuration file.

    **Note:** You must check in the file during the same wsadmin session in which you checked it out. For more information, see *Applying Wikis property changes*.

5.  Change your attachment URLs to use the inline parameter.


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

