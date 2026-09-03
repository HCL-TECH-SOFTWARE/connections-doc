# Search index directory structure {#c_admin_search_folder_structure .concept}

Each HCL Connections application has its own index directory. The Search index directory is defined by the WebSphere® Application Server variable `SEARCH_INDEX_DIR`.

The application-specific index directories are named `index_application_name`.

|Application|Index directory|
|-----------|---------------|
|Activities|index\_activities|
|Blogs|index\_blogs|
|Bookmarks|index\_bookmarks|
|Calendar|index\_calendar|
|Communities|index\_communities|
|Community Libraries|index\_ecm\_files|
|Files|index\_files|
|Forums|index\_forums|
|People finder|index\_people\_finder|
|Profiles|index\_profiles|
|Social analytics|index\_sand|
|Status updates|index\_status\_updates|
|Wikis|index\_wikis|

Each index directory contains doctype, facets, filesTemp, and graph files. After the index is built, each directory also contains an INDEX.READY file and a `CRAWLING_VERSION` file.

The following directories are also used by the Search application:

- **index\_backup**

    When the `SearchService.backupIndexNow()` command is run, the index is backed up to the `index\_backup` directory. This directory is contained in the `data\local\search` folder. The folder location is specified by the WebSphere Application Server variable `SEARCH_INDEX_BACKUP_DIR`.

- **staging**
    
    After the initial index is built, it is copied to the staging directory before it is rolled out to all the nodes in the deployment. This directory is located on the network share. The directory location is specified by the WebSphere Application Server variable `SEARCH_INDEX_SHARED_COPY_LOCATION`. An index in this directory is deleted 30 days after it is created. If you want to disable the automatic roll-out behavior, you must delete the WebSphere variable `SEARCH_INDEX_SHARED_COPY_LOCATION`. If you delete this variable, you must also clear the existing contents of `SEARCH_INDEX_SHARED_COPY_LOCATION` manually.

- **persistence**

    The persistence directory contains the XML files that are created after an application is crawled. These files are used to build an index for the application. This directory is contained in the `data\local\search` folder. The directory location is specified by the WebSphere Application Server variable `CRAWLER_PAGE_PERSISTENCE_DIR`.

- **extracted**
    
    The extracted directory holds documents that contain the content extracted from files. This directory is located on the network share. The directory location is specified by the WebSphere Application Server variable `EXTRACTED_FILE_STORE`.

**Parent topic:** [The indexing process](../admin/c_admin_search_index_process.md)

**Related information**  


[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

