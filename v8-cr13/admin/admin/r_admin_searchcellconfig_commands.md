# SearchCellConfig commands {#r_admin_searchcellconfig_commands .reference}

The SearchCellConfig commands are used to configure the location of the Search index and the IBM® LanguageWare® dictionaries used by Search, and to configure the file download and conversion service used when indexing file attachments.

## SearchCellConfig commands { .section}

Use the following MBean commands to perform administrative tasks for Search. The commands are listed in alphabetical order.

To run the commands, you first need to initialize the Search configuration environment. For more information about initializing the Search configuration environment, see *Accessing the Search configuration environment*.

**Note:** For the SearchCellConfig commands that create, update, or delete configuration data, you must also check out the search-config.xml file using the SearchCellConfig.checkOutConfig\(\) command. After making your edits, you need to check in your changes using the SearchCellConfig.checkInConfig\(\) command. When the server next restarts, your changes will take effect. Any of these changes require the indexes to be rebuilt.

SearchCellConfig.checkInConfig\(\)
:   Checks in the Search configuration file. This command must be used after changes are made to the Search configuration file in order for those changes to take effect. As part of this operation , the edited copy of the Search configuration file, search-config.xml, is validated against the XSD schema definition file, search-config.xsd.

    The checkInConfig command copies the updated configuration file from the temporary directory to the location of the active copy of these files and it overwrites the existing XML file.

    For example:

    ```
    SearchCellConfig.checkInConfig()
    ```

SearchCellConfig.checkOutConfig\(String working\_directory, String cell\_name\)
:   Checks out a copy of the Search configuration file to a working directory located on the file system. This command must be used before changes are made to the Search configuration file.

    This command takes two arguments:

    -   working\_directory. A file path to a temporary working directory to which the configuration XML and XSD files are copied by the checkOutConfig command. This argument is a string value.
    -   cell\_name. The name of the IBM WebSphere® Application Server cell hosting the HCL Connections Search application. This argument is a string value.

    For example:

    ```
    SearchCellConfig.checkOutConfig("/temp","foo01Cell01")
    ```

SearchCellConfig.disableAttachmentHandling\(\)
:   Disables the indexing of file content in the Files, Wikis, Library \(Enterprise Content Manager files\), Forums, and Activities applications.

    This command does not take any input parameters.

SearchCellConfig.disableDictionary\(String languageCode\)
:   Disables the specified LanguageWare dictionary.

    This command accepts one argument:

    -   languageCode. The language code for the dictionary that you want to delete. This argument is a string value.

        The language code typically comprises two letters conforming to the ISO standard 639-1:2002 that identifies the primary language of the dictionary. However, there are some codes that additionally define a country or variant, in which case these constituent parts are separated by an underscore. For example, Portuguese has two variants, one for Portugal \(pt\_PT\) and one for Brazil \(pt\_BR\).

        **Note:** When using a code that also specifies a country, ensure that you use an underscore to separate the language code and the country code rather than a hyphen; otherwise an error will be generated.


    For example:

    ```
    SearchCellConfig.disableDictionary("fr")
    ```

SearchCellConfig.disableEcmPostFiltering\(\)
:   Disables post-filtering for community libraries. Post-filtering is disabled by default.

    This command does not take any parameters.

SearchCellConfig.disableVerboseLogging\(\)
:   Disables verbose logging.

    This command does not take any parameters.

    Verbose logging fills the SystemOut.log file with detailed output that can occupy an increasing amount of disk space, unless you have configured your deployment to retain only a limited number of the most recent log files. A high turnover of logs might be a problem when you are trying to track down the cause of an issue if the log file that you are interested in has been deleted. For this reason, you might want to disable verbose logging. The performance impact of having verbose logging enabled is negligible.

SearchCellConfig.enableAttachmentHandling\(\)
:   Enables the indexing of file attachments in the Files and Wikis applications.

    **Note:** If you already disabled the attachment handling of files during the last indexing, you need to rebuild the index again you enable attachment handling. Otherwise, this command does not take effect.

    This command does not take any input parameters.

SearchCellConfig.enableDictionary\(String languageCode, String dictionaryPath\)
:   Enables support for the specified LanguageWare dictionary.

    This command accepts two arguments.

    -   languageCode. The language code for the dictionary that you want to add. This argument is a string value.

        The language code typically comprises two letters conforming to the ISO standard 639-1:2002 that identifies the primary language of the dictionary. However, there are some codes that additionally define a country or variant, in which case these constituent parts are separated by an underscore. For example, Portuguese has two variants, one for Portugal \(pt\_PT\) and one for Brazil \(pt\_BR\).

        **Note:** When using a code that also specifies a country, ensure that you use an underscore to separate the language code and the country code rather than a hyphen; otherwise an error will be generated.

    -   dictionaryPath. The path to the directory containing the dictionary file. This argument is a string value.

    For example:

    ```
    SearchCellConfig.enableDictionary("fr","/opt/IBM/Connections/data/shared/search/dictionary")
    ```

    You can also specify the path using a WebSphere environment variable. In the following example, the "$\{SEARCH\_DICTIONARY\_DIR\}" value is used to point to the shared Search dictionary directory.

    ```
    SearchCellConfig.enableDictionary("fr","${SEARCH_DICTIONARY_DIR}")
    ```

SearchCellConfig.enableEcmPostFiltering\(\)
:   Enables post-filtering for community libraries. Post-filtering is disabled by default.

    This command does not take any parameters.

SearchCellConfig.enableVerboseLogging\(\)
:   Enables more detailed status reporting during crawling and indexing in the form of more verbose logging to the SystemOut.log file. Verbose logging is automatically enabled when HCL Connections is installed.

    This command does not take any parameters.

    You can use the following commands to tune the frequency with which status information is logged to the SystemOut.log file during different stages of the crawling and indexing process:

    -   SearchCellConfig.setVerboseInitialLoggingInterval\(int interval\)
    -   SearchCellConfig.setVerboseSeedlistRequestLoggingInterval\(int interval\)
    -   SearchCellConfig.setVerboseIncrementalCrawlingLoggingInterval\(int interval\)
    -   SearchCellConfig.setVerboseIncrementalBuildingLoggingInterval\(int interval\)

    For more information about each of these commands, refer to the command descriptions that follow.

SearchCellConfig.excludeInactiveProfilesSearchResults\(\)
:   Specifies that the documents corresponding to inactive user profiles are excluded from search results. In a default installation of HCL Connections, inactive user profiles are automatically excluded from search results.

    This command updates the checked out search-config.xml file by setting: <profilesSearch includeInactiveUsers="false"/\> as a child element of <config\>.

SearchCellConfig.includeInactiveProfilesSearchResults\(\)
:   Specifies that the documents corresponding to inactive user profiles are included in search results. In a default installation of HCL Connections, inactive user profiles are automatically excluded from search results.

    This command updates the checked out search-config.xml file by setting: <profilesSearch includeInactiveUsers="true"/\> as a child element of <config\>.

SearchCellConfig.listDictionaries\(\)
:   Lists the LanguageWare dictionaries that are configured for Search. These dictionaries are used by common Search to support indexing multilingual content and searching in multiple languages.

    This command does not take any input parameters.

SearchCellConfig.setBackupType\(String type\)
:   Specifies the type of backup that you want to create.

    This command takes a single argument that specifies the backup type. This can be one of the following:

    -   new. Creates a new index backup every time.
    -   dual. Creates dual copies and overwrites the oldest existing backup.
    -   overwrite. Overwrites the existing index backup.

    For example:

    ```
    SearchCellConfig.setBackupType("new")
    ```

SearchCellConfig.setDefaultDictionary\(String languageCode\)
:   Configures the default LanguageWare dictionary used by the Search application. The default dictionary must be one of the enabled dictionaries.

    This command takes a single argument:

    -   languageCode is the language code for the dictionary that you want to set as the default.

        This language code typically comprises two letters conforming to the ISO standard 639-1:2002 that identifies the primary language of the dictionary. However, there are some codes that additionally define a country or variant, in which case these constituent parts are separated by an underscore. For example, Portuguese has two variants, one for Portugal \(pt\_PT\) and one for Brazil \(pt\_BR\). When using a code that also specifies a country, ensure that you use an underscore to separate the language code and the country code rather than a hyphen; otherwise an error will be generated.

        **Note:** A matching dictionary must exist in the list of configured dictionaries for the language that you specify as a parameter.


    For example:

    ```
    SearchCellConfig.setDefaultDictionary("fr")
    ```

SearchCellConfig.setDeletePersistedPages\(String enabled\)
:   Specifies whether to delete the persisted pages after a successful incremental index. By default, the value is set to true.

    This command takes a single argument:

    enabled
    :   A string that determines whether persisted pages are to be deleted after a successful incremental index. This string represents a boolean, that is, it should be set to true or false.

    When this functionality is enabled, persisted pages from the initial index creation are also deleted after a successful incremental index.

    For example:

    ```
    SearchCellConfig.setDeletePersistedPages("false")
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

SearchCellConfig.setEcmPostFilteringConnectionTimeOut\(connectionTimeOutInMillis\)
:   Sets the connection timeout value for post-filtering.

    If the timeout occurs, community library documents are removed from the search results. Results for community documents that have no access control are still shown.

    This command takes a single parameter:

    -   connectionTimeOutInMillis. A positive integer that specifies the connection timeout for post-filtering in milliseconds.

    For example:

    ```
    SearchCellConfig.setEcmPostFilteringConnectionTimeOut(1000)
    ```

SearchCellConfig.setEcmPostFilteringMaxGapSize\(maxGapSize\)
:   Sets the maximum gap size that is allowed for post-filtering.

    If a user uses the pagination controls in the Search user interface, post-filtering calculation is performed when jumping from page 1 of the search results to, for example, page 4. However, you might not want to allow post-filtering calculation when jumping to page 100 for performance reasons. This command specifies the maximum gap that is allowed for post-filtering calculations between the current page and the requested page.

    This command takes a single parameter:

    -   maxGapSize. A positive integer that specifies the maximum gap that is allowed between the current page \(for which the accurate index is known\) and the requested page for post-filtering calculations.

    For example:

    ```
    SearchCellConfig.setEcmPostFilteringMaxGapSize(250)
    ```

SearchCellConfig.setEcmPostFilteringMultiplier\(multiplier\)
:   Sets the multiplier for post filtering.

    When a user requests a certain page size for search results, the Search application attempts to populate the page with the specified number of results.  For example, if the user requests a page size of 10, the Search application checks more than 10 documents. However, a limit is required to avoid performance issues. A multiplier of 3 specifies that up to 30 documents are loaded to identify 10 documents to which the user has access. In most cases, statistically, this should be enough to fill the page. If the page cannot be fully populated after checking all 30 documents, a page with fewer search results is returned to the user.

    If you frequently receive partially filled search result pages in Connections, change this parameter.

    This command takes a single parameter:

    -   Multiplier. A positive integer that specifies how many documents are checked in the attempt to populate the search results page.

    For example:

    ```
    SearchCellConfig.setEcmPostFilteringMultiplier(20)
    ```

SearchCellConfig.setEcmPostFiltering\(multiplier,maxGapSize,connectionTimeOutInMillis,socketDataTimeOutInMillis\)
:   Enables post-filtering settings for community libraries with the values that you specify.

    This command takes the following parameters:

    -   Multiplier. A positive integer that specifies how many documents are checked in the attempt to populate the search results page.
    -   maxGapSize. A positive integer that specifies the maximum gap that is allowed between the current page \(for which the accurate index is known\) and the requested page for post-filtering calculations.
    -   connectionTimeOutInMillis. A positive integer that specifies the connection timeout for post-filtering in milliseconds.
    -   socketDataTimeOutInMillis. A positive integer that specifies the socket data timeout for post-filtering in milliseconds.

    For example:

    ```
    SearchCellConfig.setEcmPostFiltering(100,5100,30000,60000)
    ```

    **Note:** This example would be suitable for a community library with approximately 500,000 ECM files. You may need to experiment with the parameters to find the optimum settings values that give the best search results.

SearchCellConfig.setEcmPostFilteringSocketDataTimeOut\(socketDataTimeOutInMillis\)
:   Sets the socket data timeout value for post-filtering.

    If the timeout occurs, community library documents are removed from the search results. Results for community documents that have no access control are still shown.

    This command takes a single parameter:

    -   socketDataTimeOutInMillis. A positive integer that specifies the socket data timeout for post-filtering in milliseconds.

    For example:

    ```
    SearchCellConfig.setEcmPostFilteringSocketDataTimeOut(3000)
    ```

SearchCellConfig.setIndexingResumptionAllowed\(boolean allowed\)
:   Enables or disables the resumption of interrupted or failed indexing tasks that have not reached a resume point.

    This command takes a single argument:

    -   allowed. A boolean value.

    For example, to enable indexing resumption:

    ```
    SearchCellConfig.setIndexingResumptionAllowed("true")
    ```

SearchCellConfig.setMaxCrawlerThreads\(String maxThreadNumber\)
:   Specifies the maximum number of seedlist threads that can be used when crawling. By default, the value is set to 2.

    This command takes a single argument that specifies the number of threads allowed.

    For example:

    ```
    SearchCellConfig.setMaxCrawlerThreads("3")
    ```

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

SearchCellConfig.setMaxIndexerThreads\(String maxThreadNumber\)
:   Specifies the maximum number of indexer threads that can be used when indexing. By default, the value is set to 1.

    This command takes a single argument that specifies the number of threads allowed.

    For example:

    ```
    SearchCellConfig.setMaxIndexerThreads("3")
    ```

SearchCellConfig.setMaximumTempDirSize\(int maxTempDirSize\)
:   Sets the maximum size of a temporary directory that is used by a Search server for the files conversion process.

    This command takes a single argument that specifies the maximum size in bytes. The argument must be an integer greater than zero. The default value is 100 MB.

    Files are downloaded to a temporary directory, which is in the index directory. The temporary directory size available must be greater than the maximum file size allowed for content indexing.

    For example:

    ```
    SearchCellConfig.setMaximumTempDirSize("51200")
    ```

SearchCellConfig.setMaxPagePersistenceAge\(String maxAgeInHours\)
:   Specifies the maximum age for persisted pages in a seedlist persistence directory. By default, the value is set to 720 hours \(30 days\).

    If the pages are older than the maximum age, they are ignored when building an index or resuming a crawl.

    This command takes a single argument:

    maxAgeInHours
    :   A string representing an integer that specifies the maximum age in hours of the persisted pages.

    For example:

    ```
    SearchCellConfig.setMaxPagePersistenceAge("42")
    ```

SearchCellConfig.setPostBackupScript\(String script\)
:   Specifies which shell script or third-party application runs on completion of the backup task.

    This command takes a single argument that specifies the name of the shell script or application file.

    For example:

    ```
    SearchCellConfig.setPostBackupScript("backup.sh")
    ```

    To disable the script, run the command again with an empty string as the argument. For example:

    ```
    SearchCellConfig.setPostBackupScript("")
    ```

SearchCellConfig.setSandIndexerTuning\(String indexer, Int iterations\)
:   Sets the number of iterations used by a specified social analytics job.

    This command takes the following arguments:

    -   indexer. A string that specifies the name of the social analytics indexing job. The following values are valid: evidence, graph, manageremployees, and tags.
    -   iterations. An integer that specifies the number of iterations for the specified social analytics indexing job.

    For example:

    ```
    SearchCellConfig.setSandIndexerTuning("manageremployees",200)
    SearchCellConfig.setSandIndexerTuning("graph",400)
    ```

SearchCellConfig.setVerboseIncrementalBuildingLoggingInterval\(int incrementalBuildingInterval\)
:   Controls the frequency with which update indexing progress is logged to the SystemOut.log file. Update indexing of an HCL Connections application or set of applications, is an indexing job that updates an index that already has content from all applications that are to be indexed as part of the current indexing job.

    This command takes a single parameter:

    incrementalBuildingInterval
    :   A positive integer that corresponds to a number of documents. For example, if an interval of 20 is specified, then for every 20 documents that have been indexed, the number of documents indexed when indexing a particular application during the current indexing job is logged. The incrementalBuildingInterval parameter is set to 100 by default.

    You can find additional logging information about update indexing progress in the SystemOut.log file by searching for occurrences of the CLFRW0600I logging message. For example:

    ```
    CLFRW0600I: Search is continuing to build the index for blogs: 40 documents indexed.
    ```

    For example:

    ```
    SearchCellConfig.setVerboseIncrementalBuildingLoggingInterval(100)
    ```

SearchCellConfig.setVerboseIncrementalCrawlingLoggingInterval\(int incrementalCrawlingInterval\)
:   Controls the frequency with which seedlist update crawling progress is logged to the SystemOut.log file. An update crawl of an application fetches data that was created, updated, or deleted since the previous crawl of that application began.

    This command takes a single parameter:

    incrementalCrawlingInterval
    :   A positive integer that corresponds to a number of seedlist entries. For example, if an interval of 100 is specified, then, for every 100 entries that have been crawled, the number of entries that have been crawled for a particular application during the current indexing job is logged. The incrementalCrawlingInterval parameter is set to 100 by default.

    You can find additional logging information about initial index creation in the SystemOut.log file by searching for occurrences of the CLFRW0589I logging message. For example:

    ```
    CLFRW0589I: Search is continuing to build the index for 
    profiles: 1,600 seedlist entries indexed.
    ```

    For example:

    ```
    SearchCellConfig.setVerboseIncrementalCrawlingLoggingInterval(100)
    ```

SearchCellConfig.setVerboseInitialLoggingInterval\(int initialInterval\)
:   Controls the frequency with which initial index creation progress is logged to the SystemOut.log file.

    This command takes a single parameter:

    initialInterval
    :   A positive integer that corresponds to a number of seedlist entries. A seedlist entry is an indexing instruction that specifies an action, such as the creation, deletion, or update of a specified document in the Search index. For example, if an interval of 500 is specified, then for every 500 entries processed, the number of seedlist entries indexed so far for an application by the current indexing job is logged. The initialInterval parameter is set to 250 by default.

    You can find additional logging information about initial index creation in the SystemOut.log file by searching for occurrences of the CLFRW0581I logging message. For example:

    ```
    CLFRW0581I: Search is continuing to build the index 
    for activities: 3500 seedlist entries indexed.
    ```

    For example:

    ```
    SearchCellConfig.setVerboseInitialLoggingInterval(500)
    ```

SearchCellConfig.setVerboseLogging\(int initialInterval, int seedlistRequestInterval, int incrementalCrawlingInterval, int incrementalBuildingInterval\)
:   Enables verbose logging with the specified initial interval, seedlist request interval, crawling interval, and incremental building interval.

    Running this command has the same net effect as calling the following commands in sequence:

    -   SearchCellConfig.enableVerboseLogging\(\)
    -   SearchCellConfig.setVerboseInitialLoggingInterval \(initialInterval\)
    -   SearchCellConfig.setVerboseSeedlistRequestLoggingInterval \(seedlistRequestInterval\)
    -   SearchCellConfig.setVerboseIncrementalCrawlingLoggingInterval \(incrementalCrawlingInterval\)
    -   SearchCellConfig.setVerboseIncrementalBuildingLoggingInterval \(incrementalBuildingInterval\)

SearchCellConfig.setVerboseSeedlistRequestLoggingInterval\(int seedlistRequestInterval\)
:   Controls the frequency with which seedlist crawling progress is logged to the SystemOut.log file.

    This command takes a single parameter:

    seedlistRequestInterval
    :   A positive integer that corresponds to a number of seedlist page requests. A seedlist crawl is a sequence of seedlist page requests, which are HTTP GET operations that fetch seedlist pages. A seedlist page can contain zero or more seedlist entries up to a specified maximum. For example, if an interval of 1 is specified, then after every seedlist request, the crawling progress of the application being currently crawled is logged. The seedlistRequestInterval parameter is set to 1 by default.

    You can find additional logging information about seedlist crawling in the SystemOut.log file by searching for occurrences of the CLFRW0604 logging message. For example:

    ```
    CLFRW0604 : Current seedlist state: Finish Date: Thu May 12 10:14:58 
    IST 2011; Start Date: Thu Jan 01 01:00:00 GMT 1970; Type: 1; 
    Last Modified: Thu Jan 01 01:00:00 GMT 1970; Finished: false; 
    Started: true; ACL Start: 0; Offset: 0;  
    ```

    For example:

    ```
    SearchCellConfig.setVerboseSeedlistRequestLoggingInterval(1)
    ```

SearchCellConfig.addFieldBoost\(string boostName, string fieldName, float boost\)
:   Adds a field with a specific boost to be taken into account in query time.

    This command takes the following arguments:

    -   boostName. The name of the boost element to apply changes to.
    -   fieldName. The name of the indexing field to which the boost is to be applied.
    -   boost. The relevance score that is associated with the specified fields in the index. The default values are 2.0 and 3.0 for tag and title.

    Example:

    ```
    SearchCellConfig.addFieldBoost("content", "author", "2.0")
    ```

SearchCellConfig.addRecencyBoost\(string boostName, float rboost\)
:   Adds a tag element that enables boosting results by their recency so that more recently created or edited documents are given a higher score. Recency boost values are 0 - 1. The smaller the recency value is, the higher the score new or edited documents get.

    This command takes the following arguments:

    -   boostName. The name of the boost element to apply changes to.
    -   rboost. The recency boost value to apply \(0 - 1\).

    Example:

    ```
    SearchCellConfig.addRecencyBoost("content", "0.2")
    ```

SearchCellConfig.updateFieldBoost\(string boostName, string fieldName, float boost\)
:   Updates the value of an existing field tag.

    This command takes the following arguments:

    -   boostName. The name of the boost element to apply changes to.
    -   fieldName. The name of the indexing field to which the boost is to be applied.
    -   boost. The relevance score that is associated with the specified fields in the index. The default values are 2.0 and 3.0 for tag and title

    Example:

    ```
    SearchCellConfig.updateFieldBoost("content", "author", "3.2")
    ```

SearchCellConfig.updateRecencyBoost\(string boostName, float rboost\)
:   Updates an existing recency boost value.

    This command takes the following arguments:

    -   boostName. The recency boost value to apply \(0 - 1\).
    -   rboost. The recency score associated with the specified fields in the index.

    Example:

    ```
    SearchCellConfig.updateRecencyBoost("content", "0.2")
    ```

SearchCellConfig.deleteRecencyBoost\(string boostName\)
:   Deletes a recency boost tag.

    This command takes the following arguments:

    -   boostName. The name of the boost element to apply changes to.

    Example:

    ```
    SearchCellConfig.deleteRecencyBoost("content")
    ```

SearchCellConfig.deleteFieldBoost\(string boostName, string fieldName\)
:   Deletes a field boost tag.

    This command takes the following arguments:

    -   boostName. The name of the boost element to apply changes to.
    -   fieldName. The name of the indexing field from which the relevant tag is deleted from the configuration.

    Example:

    ```
    SearchCellConfig.deleteFieldBoost("content", "author")
    ```

SearchCellConfig.deleteBoosts\(string boostName\)
:   Deletes the boost element that refers to the "content" boostName.

    This command takes the following arguments:

    -   boostName. The name of the boost element to apply changes to.

    Example:

    ```
    SearchCellConfig.deleteBoosts("content")
    ```

SearchCellConfig.deleteBoostSettings\(\)
:   Deletes all the boosting parameters from the configuration file.

    Example:

    ```
    SearchCellConfig.deleteBoostSettings()
    ```


:   **Parent topic:**[Administering Search](../admin/c_admin_search.md)

**Related information**  


[Accessing the Search configuration environment](../admin/t_admin_search_access_config.md)

