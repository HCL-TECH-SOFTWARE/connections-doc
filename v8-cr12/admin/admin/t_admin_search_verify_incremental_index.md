# Verifying that the index is being built incrementally {#t_admin_search_verify_incremental_index .task}

You can verify that incremental indexing is taking place as expected by checking for specific log messages in the SystemOut.log file.

1.  To verify that Search is building the index incrementally, open the SystemOut.log file that corresponds to the application server instance on which Search is running and look for the following log messages:

    ```
    CLFRW0285I: Search is starting to build the index for {0}
    ```

    ```
    CLFRW1124I: Search has finished building the index for {0}
    ```

    where \{0\} is the name of an HCL Connections application.

    When the index is being built as expected, these messages display for each of the HCL Connections applications that you installed and configured as part of the scheduled crawling task. By default, this task is scheduled to run every 15 minutes and it includes all the HCL Connections applications that you installed.

    For example:

    ```
    [7/11/12 15:46:01:838 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for blogs.
    [7/11/12 15:46:01:948 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for blogs.
    [7/11/12 15:46:02:382 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for forums.
    [7/11/12 15:46:02:511 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for forums.
    [7/11/12 15:46:02:518 IST] 0000005a IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for wikis.
    [7/11/12 15:46:02:622 IST] 0000005a IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for wikis.
    [7/11/12 15:46:02:899 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for communities.
    [7/11/12 15:46:03:022 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for communities.
    [7/11/12 15:46:03:028 IST] 0000005a IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for files.
    [7/11/12 15:46:03:156 IST] 0000005a IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for files.
    [7/11/12 15:46:03:396 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for dogear.
    [7/11/12 15:46:03:578 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for dogear.
    [7/11/12 15:46:03:590 IST] 0000005a IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for profiles.
    [7/11/12 15:46:03:972 IST] 0000005a IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for profiles.
    [7/11/12 15:46:04:512 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for activities.
    [7/11/12 15:46:04:693 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for activities.
    [7/11/12 15:46:04:922 IST] 0000005a IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for calendar.
    [7/11/12 15:46:05:051 IST] 0000005a IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for calendar.
    [7/11/12 15:46:05:060 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW0285I: Search is starting to build the index for status_updates.
    [7/11/12 15:46:05:225 IST] 00000020 IndexBuilderQ 
    I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue build 
    CLFRW1124I: Search has finished building the index for status_updates.
    [7/11/12 15:46:05:229 IST] 00000020 IndexBuilder  
    I com.ibm.connections.search.process.incremental.IndexBuilder postProcess 
    CLFRW0591I: Search is starting BookmarksPostProcessor post-processing of the index.
    [7/11/12 15:46:05:265 IST] 00000020 BookmarkRollu 
    I com.ibm.lotus.connections.search.index.impl.BookmarkRollup logBookmarkRollupProgressMessage 
    CLFRW0871I: Bookmark rollup is in progress. 
    100 percent complete.Bookmark Rollup has completed rollup for 0 URLs.    
    [7/11/12 15:46:05:351 IST] 00000020 IndexBuilder  
    I com.ibm.connections.search.process.incremental.IndexBuilder postProcess 
    CLFRW0580I: Search has finished BookmarksPostProcessor post-processing of the index.
    [7/11/12 15:46:05:353 IST] 00000020 IndexBuilder  
    I com.ibm.connections.search.process.incremental.IndexBuilder postProcess 
    CLFRW0591I: Search is starting FilesPostProcessor post-processing of the index.
    [7/11/12 15:46:05:354 IST] 00000020 FilesPostProc 
    I com.ibm.lotus.connections.search.index.impl.FilesPostProcessor index 
    CLFRW0779I: There were no file documents that needed to be processed.
    [7/11/12 15:46:05:355 IST] 00000020 IndexBuilder  
    I com.ibm.connections.search.process.incremental.IndexBuilder postProcess 
    CLFRW0580I: Search has finished FilesPostProcessor post-processing of the index.
    [7/11/12 15:46:05:356 IST] 00000020 IndexBuilder  
    I com.ibm.connections.search.process.incremental.IndexBuilder postProcess 
    CLFRW0591I: Search is starting StatusUpdatesPostProcessor post-processing of the index.
    [7/11/12 15:46:05:356 IST] 00000020 IndexBuilder  
    I com.ibm.connections.search.process.incremental.IndexBuilder postProcess 
    CLFRW0580I: Search has finished StatusUpdatesPostProcessor post-processing of the index.
    ```

    After index building for a task has finished, post processing takes place, and each post processor is marked at start and end by the CLFRW0591I and CLFRW0580I messages respectively:

    ```
    CLFRW0591I: Search is starting {0} post-processing of the index.
    CLFRW0580I: Search has finished {0} post-processing of the index.
    ```

    **In a deployment where there is a single Search node only**: No further action is required.

    **In a deployment with multiple Search nodes**: Check that you can see the log messages listed on all the Search nodes in the cluster. No further action is required.


Verify that crawling is taking place for the new service. For more information, see *Verifying that Search is crawling regularly*.

**Parent topic:**[Verifying Search](../admin/c_admin_search_verify_search.md)

**Related information**  


[Verifying that Search is crawling regularly](../admin/t_admin_search_verify_index_crawling.md)

[Verifying that index building is not taking place](../admin/t_admin_search_verify_no_index_building.md)

[Configuring verbose logging](../admin/t_admin_search_enable_verbose_logging.md)

[Verifying Search index creation](../admin/t_admin_search_verify_index_creation.md)

