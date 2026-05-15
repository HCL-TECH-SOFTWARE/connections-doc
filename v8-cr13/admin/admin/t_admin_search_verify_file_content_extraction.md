# Verifying file content extraction {#t_admin_search_verify_file_content_extraction .task}

Verify that the Search application is extracting file content on a regular basis by checking entries in the SystemOut.log file.

During index building, files are extracted to the directory defined by the IBM® Application Server WebSphere® variable EXTRACTED\_FILE\_STORE. The files are not currently used after the index is built, although they are left in place for potential use by future features.

1.  To verify that Search is extracting file content on a regular basis, complete the following steps.
2.  Open the SystemOut.log file that corresponds to the application server instance on which Search is running and look for the following log messages:

    ```
    IndexBuilderQ > com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue 
      startDocumentIndexingService ENTRY
    IndexBuilderQ < com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue 
      startDocumentIndexingService RETURN
    DocumentIndex I com.ibm.lotus.connections.search.service.files.impl.DocumentIndexingServiceImpl 
      isEnvironmentValid - FILE_CONTENT_CONVERSION: 
      /opt/IBM/LotusConnections1/search/search/search/dcs/oiexport/exporter
    DocumentIndex I com.ibm.lotus.connections.search.service.files.impl.DocumentIndexingServiceImpl 
      isEnvironmentValid:  true
    ```

    By default, this task is scheduled to run every 20 minutes and it includes all the files in the Wikis and Files applications.

    You should also see the following log messages in the SystemOut.log file for the default 20 minute file content indexing task:

    ```
    IndexingNotif I   CLFRW0042I: HCL Connections scheduled task 
       20min-file-retrieval-task fired event TaskNotificationInfo.FIRING
    IndexingNotif I   CLFRW0042I: HCL Connections scheduled task 
       20min-file-retrieval-task fired event TaskNotificationInfo.FIRED
    IndexingNotif I   CLFRW0042I: HCL Connections scheduled task 
       20min-file-retrieval-task fired event TaskNotificationInfo.SCHEDULED
    ```


**Parent topic:**[Verifying Search](../admin/c_admin_search_verify_search.md)

**Related information**  


[Verifying Search index creation](../admin/t_admin_search_verify_index_creation.md)

[Retrieving file content](../admin/t_admin_search_retrieve_file_content.md)

[Configuring file attachment indexing settings](../admin/t_admin_search_config_search_attachments.md)

