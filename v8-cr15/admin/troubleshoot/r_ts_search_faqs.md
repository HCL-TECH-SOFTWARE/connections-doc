# Troubleshooting Search FAQs 

A list of the common troubleshooting issues and answers.

## Search FAQs 

-   What is the difference between foreground indexing and background indexing?
-   Will the initial indexing task resume if I restart the Search application several times before the index is built?
-   Do I need to rebuild the Search index after migrating from Connections 3.0.1 to Connections 4?
-   What is the state parameter?
-   How much free space should I allocate to the index and its backup?
-   I am seeing the following message in the logs, what does it mean? CLFRW0618I: Unable to resolve wikis
-   I see the following warning, what does it mean?

-   What is the difference between foreground indexing and background indexing?

    The following table explains the key differences between foreground indexing and background indexing:


| Foreground  | Indexing  | Background indexing   |
|---|---|---|
|Initial indexing|The initial index is built by using the default 15 min-search-indexing-task.Alternatively, it can be built by a custom indexing task that is created by the SearchService.addIndexingTask command or a command that is run once, such as SearchService.indexNow\(String applicationNames\). This index is used for searching and for further indexing. The database cache is not used.|An index is built by using the SearchService.startBackgroundIndex command.The background indexing command creates a one-off index in a specified location on disk.  This index is not used for searching. The database cache is not used.|
|Incremental indexing|The index is updated by using the default 15min-search-indexing-task.Alternatively, the index can be updated by a custom indexing task that is created by the SearchService.addIndexingTask command or a command that is run once, such as SearchService.indexNow.  This index is used for searching and for further indexing. The database cache is used.|A background index can be updated by using the SearchService.startBackgroundIndex command.This index is not used for searching. The database cache is not used.| 

You can replace the index at the default index location with an index created by using background indexing. This step is useful when you want to rebuild the Search index but want to avoid downtime. For more information, see [Creating a background index](../admin/t_admin_search_create_standalone_index.md). You can either stop the Search application, replace the index, and then restart Search, or you can use the SearchService.reloadIndex command to replace the index. For more information, see [Restoring a Search index without restarting individual nodes](../admin/t_admin_search_restore_index_wo_restarting.md).

-   Does the initial indexing task resume if I restart the Search application several times before the index is built?

    Initial indexing resumes if the system is restarted. There are three main stages to initial indexing: crawling, file content extraction, and indexing. Crawling and file content extraction automatically picks up from where they were interrupted. Indexing picks up from where it was interrupted if indexing resumption is enabled. For more information, see [Enabling indexing resumption](../admin/t_admin_search_resume_crawls.md). Otherwise, indexing starts again from scratch. Typically the delay is minimal because the crawling and file content extraction stages are already completed.

-   Do I need to rebuild the Search index after migrating from Connections 3.0.1 to Connections 4?

    You must re-create the Search index after moving to Connections 4 due to an upgrade to the third-party code used by the Search application. For more information about re-creating the index, see [Creating Search indexes](../admin/c_admin_search_create_indexes.md).

-   What is the state parameter?

    The indexer can now parse the seedlist state parameter. For informational purposes, the data from the state is printed in the logs in a human readable format.

    ```
    [01/07/11 17:27:16:430 BST] 0000003d SeedlistCrawl I 
    com.ibm.connections.search.seedlist.crawler.impl.SeedlistFetcher 
    logSeedlistState CLFRW0604I: Current {0} seedlist state: {1}. URL parameters: [{2}].
    ```

    where:

    -   \{0\} is the name of an Connections component.
    -   \{1\} is the state.
    -   \{2\} indicates the URL parameters.
-   How much free space should I allocate to the index and its backup?

    For an index, set aside at least four times the index size of free space on your disk for optimization and backups. For optimization and backup, between two and four times the index size of free space is required.

-   I am seeing the following message in the logs, what does it mean?

    ```
    CLFRW0618I: Unable to resolve wikis seedlist state. Next seedlist URL: 
    https://server.ibm.com/wikis/seedlist/myserver?Action=GetDocuments&Date=2011-10-29
    T21%3A49%3A21%2B0100&Range=500&Start=4271&Format=xml&Locale=en_US&
    ```

    This message is informational and does not point to an error or potential problem.

-   I see the following warning, what does it mean?

    ```
    [11/14/11 11:57:44:384 GMT] 00000003 ThreadMonitor W   WSVR0605W: Thread 
    "WorkManager.DefaultWorkManager : 0" (00000025) has been active for 692282 milliseconds and may be hung.  
    There is/are 1 thread(s) in total in the server that may be hung.at com.ibm.dltj.
    UniLexAnalyzerEu$BOFADecomposer.lookup(Unknown Source)at com.ibm.dltj.ConstraintDecomposer.decompose
    (Unknown Source)at com.ibm.dltj.ConstraintDecomposer.decompose(Unknown Source)at 
    com.ibm.dltj.UniLexAnalyzerEu$BOFADecomposer.decompose(Unknown Source)at 
    com.ibm.dltj.UniLexAnalyzerEu.decompose(Unknown Source)at com.ibm.dltj.UniLexAnalyzerEu.doProcessText
    (Unknown Source)at com.ibm.dltj.UniLexAnalyzer.doTextProcessing(Unknown Source)at 
    com.ibm.dltj.UniLexAnalyzer.processText(Unknown Source)at com.ibm.dltj.Session.processText(Unknown Source)at 
    com.ibm.idf.rsl.jfrost.JFrostTokenizer.processStream(JFrostTokenizer.java:116)at 
    com.ibm.idf.rsl.jfrost.JFrostTokenizer.<init&gt;(JFrostTokenizer.java:91)at com.ibm.idf.rsl.jfrost.JFrostTokenizer.
    <init&gt;(JFrostTokenizer.java:68)at com.ibm.idf.rsl.jfrost.JFrostAnalyzer.fireJFrostTokenizer
    (JFrostAnalyzer.java:258)at com.ibm.idf.rsl.jfrost.JFrostAnalyzer.tokenStream(JFrostAnalyzer.java:131)at 
    org.apache.lucene.analysis.Analyzer.reusableTokenStream(Analyzer.java:52)at 
    org.apache.lucene.index.DocInverterPerField.processFields(DocInverterPerField.java:64)at 
    org.apache.lucene.index.DocFieldProcessorPerThread.processDocument(DocFieldProcessorPerThread.java:246)at 
    org.apache.lucene.index.DocumentsWriter.updateDocument(DocumentsWriter.java:826)at 
    org.apache.lucene.index.DocumentsWriter.addDocument(DocumentsWriter.java:802)at 
    org.apache.lucene.index.IndexWriter.addDocument(IndexWriter.java:1998)at 
    org.apache.lucene.index.IndexWriter.addDocument(IndexWriter.java:1972)at 
    com.ibm.lotus.connections.search.indexhandler.impl.LuceneManipulator.addDocument(LuceneManipulator.java:117)at 
    com.ibm.lotus.connections.search.indexhandler.impl.MultiLuceneManipulator.addDocument(MultiLuceneManipulator.java:88)at 
    com.ibm.connections.search.process.initial.LuceneIndexCacheWriter.addFacetedDocument(LuceneIndexCacheWriter.java:139)at 
    com.ibm.lotus.connections.search.index.impl.ContentIndexer.write(ContentIndexer.java:274)at 
    com.ibm.lotus.connections.search.index.impl.ContentIndexer.write(ContentIndexer.java:248)at 
    com.ibm.lotus.connections.search.index.impl.ProfilesIndexer.index(ProfilesIndexer.java:305)at 
    com.ibm.connections.search.process.work.IndexingWork.index(IndexingWork.java:269)at 
    com.ibm.connections.search.process.work.IndexingWork.run(IndexingWork.java:176)at 
    com.ibm.connections.search.process.initial.InitialProcess.index(InitialProcess.java:395)at 
    com.ibm.connections.search.process.initial.InitialProcess.index(InitialProcess.java:342)at 
    com.ibm.connections.search.process.initial.InitialProcess.run(InitialProcess.java:262)at 
    com.ibm.ws.asynchbeans.J2EEContext$RunProxy.run(J2EEContext.java:264)at 
    java.security.AccessController.doPrivileged(AccessController.java:202)at 
    com.ibm.ws.asynchbeans.J2EEContext.run(J2EEContext.java:1137)at 
    com.ibm.ws.asynchbeans.WorkWithExecutionContextImpl.go(WorkWithExecutionContextImpl.java:199)at 
    com.ibm.ws.asynchbeans.CJWorkItemImpl.run(CJWorkItemImpl.java:188)at 
    com.ibm.ws.util.ThreadPool$Worker.run(ThreadPool.java:1604)
    ```

    Search indexing is a long running task and this warning might be seen during the indexing process. The warning highlights that a thread is running and it might be hung. When indexing is completed successfully, you see a message that indicates that the thread is complete.

    Example:

    ```
    [9/4/14 11:03:20:998 CEST] 0000006e ThreadMonitor W   WSVR0606W: Thread 
    "WorkManager.DefaultWorkManager : 0" (0000006e) was previously reported to be hung but has completed.  
    It was active for approximately 3926511 milliseconds.  
    There is/are 0 thread(s) in total in the server that still may be hung.
    ```


-   **[How search works in HCL Connections profiles](../troubleshoot/r_search_profiles.md)**  
There are different ways to search for content in HCL Connections™ profiles.



