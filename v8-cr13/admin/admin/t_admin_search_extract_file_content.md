# Extracting file content {#t_admin_search_extract_file_content .task}

To speed up the indexing process, you can use a SearchService command that extracts file content in a process that is separate from indexing.

To use SearchService administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The SearchService.startBackgroundFileContentExtraction command extracts file content outside of the indexing process. This command iterates over the persisted files seedlists and, for each file it extracts the file content according to the specified configuration settings. This process is multithreaded, and is the same file content extraction process that occurs when you run the startBackgroundIndex command.

1. To extract file content outside of the indexing process, complete the following steps.
2. Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3. After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4. Use the following command:

    ```SearchService.startBackgroundFileContentExtraction (persistence dir, components, extracted text dir, thread limit)```
    
    Extracts file content for all files that are referenced in the persisted seedlists in a process that is independent of the indexing task.

    This command takes the following parameters:

    - persistence dir
    
        A string that specifies the location of the persisted files seedlists.

    - components
        
        A string that specifies the application or applications for which you want to extract file content. The following values are valid:

        - files - extracts file content from the Files app.
        - wikis - extracts file content from the Wikis app.
        - activities - extracts file content from the Activities app.
        - forums - extracts file content from the Forums app.
        - ecm\_files - extracts file content from community library files that are stored in Enterprise Content Management systems.
        
    - extracted text dir
        
        A string that specifies the target location for the extracted text. The same directory structure and naming scheme is used for this directory as for the extracted text directory on the deployment: connections shared data/ExtractedText. For example, ``ExtractedText/121/31/36cdb7a0-92b2-4cf9-91f3-c4e7e527a5e1``.

    - thread limit
    
        The maximum number of seedlist threads.

        For example:

        ```
        SearchService.startBackgroundFileContentExtraction("/bg_index/seedlists", "files", "/bg_index/extractedText", 10)
        ```

        You typically run this command after you run a startBackgroundCrawl command to act on up-to-date seedlists. If there are no persisted seedlists available, the behavior is the same as when you run the startBackgroundCrawl command, that is, the seedlists are crawled and persisted first.

5. Verify that the target extracted text directory is populated with the extracted files content.

    Open some of the extracted text files in a text editor. You can expect to see the typical format, for example, some header information followed by the extracted content.


6. Copy the extracted file content to the directory specified by the WebSphere Application Server environmental variable EXTRACTED\_FILE\_STORE. Storing the extracted file content in this directory means that when the Search application next detects a file update during indexing. If the update is a metadata change only, Search can avoid converting the file again unnecessarily. For more information about the EXTRACTED\_FILE\_STORE variable, see *WebSphere Application Server environment variables*.

7. Complete the steps that are outlined in, *Creating a background index* to create a background index by using the extracted file content.

**Parent topic:**[Creating background indexes](../admin/c_admin_search_create_bgd_index.md)

**Related information**  


[Creating a background index](../admin/t_admin_search_create_standalone_index.md)

[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

[Performing a background crawl](../admin/t_admin_search_perform_bgd_crawl.md)

