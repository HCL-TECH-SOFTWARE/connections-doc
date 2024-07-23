# Deleting persisted seedlist data {#t_admin_search_delete_persisted_data .task}

You can free up disk space by deleting persisted seedlists from your system using the SearchService.flushPersistedCrawlContent command.

See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Persisted seedlists can take up a large amount of space when your deployment has a lot of content. If you know that a particular set of crawled content is no longer needed, you can free up disk space by using the SearchService.flushPersistedCrawlContent command to delete the persisted data. This command only clears persisted seedlists in the default persistence location. If you want to delete seedlists crawled using the startBackgroundCrawl, startBackgroundFileContentExtraction, or startBackgroundIndex commands, you must delete them manually.

You might also want to use the SearchService.flushPersistedCrawlContent command to remove old data when you are about to recrawl the entire system with the persistence option enabled. Where previously persisted data still exists, you can use the command to purge old data from the system before generating a more up-to-date copy.

1.  To delete persisted seedlists, complete the following steps.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

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

4.  Run the following command:

    SearchService.flushPersistedCrawlContent\(\)
    :   Deletes current persisted seedlists.

        **Note:** This command only clears persisted seedlists in the default persistence location. Seedlists crawled using the startBackgroundCrawl, startBackgroundFileContentExtraction, or startBackgroundIndex commands must be deleted manually.

        This command does not take any input parameters.

        **Note:** Do not run this command while a crawl is in progress.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Configuring page persistence settings](../admin/t_admin_search_configure_persisted_data.md)

