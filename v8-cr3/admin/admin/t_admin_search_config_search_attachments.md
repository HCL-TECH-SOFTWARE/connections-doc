# Configuring file attachment indexing settings {#t_admin_search_config_search_attachments .task}

Edit settings in the search-config.xml file to configure Search for file attachments.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Search provides a dedicated document conversion service. When a file indexing task is run, the document conversion service downloads files, converts them to plain text, and then indexes the content. During this process, content from different MIME types is indexed. For a list of the MIME types that are supported by Search, see *Supported MIME types*.

The behavior of the document conversion service can be altered by modifying various settings, allowing administrators to control the file content indexing process.

IBM Connections supports the indexing of file attachment content from the Files, Wikis, Library \(Enterprise Content Manager files\), Activities, and Forums applications. Content from file attachments in Blogs is not searched.

**Attention:** When file indexing is enabled, the content of files is not indexed the first time that the index is run. The first index starts the process of retrieving the file content, but the actual indexing of the content takes place only when the index is run for the second time.

1.  To configure file attachment indexing settings, complete the following steps.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4.  Check out the Search cell-level configuration file, search-config.xml, with the following command:

    SearchCellConfig.checkOutConfig\("working\_dir", "cellName"\)

    Where:

    -   working\_dir is the temporary directory to which you want to check out the cell level configuration file. This directory must exist on the server where you are running the wsadmin client. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

        **Note:** Linux only: The directory must grant write permissions or the command does not run successfully.

    -   cellName is the name of the cell that the Search node belongs to. The command is case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        print AdminControl.getCell\(\)

    For example:

    ```
    SearchCellConfig.checkOutConfig("c:/search_temp", "SearchServerNode01Cell")
    ```

5.  Use the following commands to control the file content indexing process.

    SearchCellConfig.enableAttachmentHandling\(\)
    :   Enables the indexing of file attachments in the Files and Wikis applications.

        **Note:** If you already disabled the attachment handling of files during the last indexing, you need to rebuild the index again you enable attachment handling. Otherwise, this command does not take effect.

        This command does not take any input parameters.

    SearchCellConfig.disableAttachmentHandling\(\)
    :   Disables the indexing of file content in the Files, Wikis, Library \(Enterprise Content Manager files\), Forums, and Activities applications.

        This command does not take any input parameters.

    SearchCellConfig.setMaximumAttachmentSize\(int maxAttachmentSize\)
    :   Sets the limit on the size of files that can be downloaded for indexing. Files that are greater than the configured maximum attachment size are not downloaded or processed for content indexing. By default, the limit is set to 50 MB, which means that files over 50 MB are not indexed.

        Files that are under the specified size are downloaded to a temporary directory in the index directory, where they go through the text extraction process. The extracted text is then indexed. The temporary directory size available must be greater than the maximum file size allowed for content indexing.

        This command accepts one argument:

        -   maxAttachmentSize. The maximum file size in bytes of any file attachment eligible for indexing. maxAttachmentSize is an integer value.
        For example:

        ```
        SearchCellConfig.setMaximumAttachmentSize("52428800")
        ```

    SearchCellConfig.setMaximumConcurrentDownloads\(int maxConcurrentDownloads\)
    :   Sets the maximum number of threads that download files on a Search server.

        This command takes a single argument that specifies the maximum number of threads. The argument must be an integer greater than zero. The default value is 3. The value of the maxConcurrentDownloads argument must not exceed the maximum number of threads set for the DefaultWorkManager Work Manager resources at the Search server scope.

        CAUTION:

        Increasing this value increases the load on the Files server.

        For example:

        ```
        SearchCellConfig.setMaximumConcurrentDownloads("10")
        ```

    SearchCellConfig.setMaximumTempDirSize\(int maxTempDirSize\)
    :   Sets the maximum size of a temporary directory that is used by a Search server for the files conversion process.

        This command takes a single argument that specifies the maximum size in bytes. The argument must be an integer greater than zero. The default value is 100 MB.

        Files are downloaded to a temporary directory, which is in the index directory. The temporary directory size available must be greater than the maximum file size allowed for content indexing.

        For example:

        ```
        SearchCellConfig.setMaximumTempDirSize("51200")
        ```

    SearchCellConfig.setDownloadThrottle\(long downloadThrottle\)
    :   Sets the duration of a rest period between successive files downloads in a single file-download thread.

        This command takes a single argument that specifies the download throttle size in milliseconds. The download throttle is set to 500 by default.

        CAUTION:

        Increasing this value increases the load on the Files server.

        For example:

        ```
        SearchCellConfig.setDownloadThrottle("500")
        ```

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    SearchCellConfig.checkInConfig\(\)

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop the server or servers hosting the Search application, and then restart the Search servers.

    The next time the scheduled task runs, persisted seedlists are retained after indexing finishes.


-   **[Supported MIME types](../admin/r_admin_search_mime_types.md)**  
Search supports the indexing of content from a number of MIME types.

**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Reloading the Search application](../admin/t_admin_search_reload_search.md)

[Verifying file content extraction](../admin/t_admin_search_verify_file_content_extraction.md)

