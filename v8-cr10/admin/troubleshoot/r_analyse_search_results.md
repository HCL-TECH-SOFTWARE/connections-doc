# Reviewing the Server Status tab {#r_review_serverstatus_tab .reference}

The Server Status tab checks the Search log file, the crawling version file, and the index ready file from the node that the request is sent to.

## Example output { .section}

An example of the output that is seen on the tab is as follows:

```
Search 
Status of Search Service 
As of Wednesday, January 23, 2013 

Information for node: dubxpcvm084-0Node02 
Checking the installed services 

The following service is installed: profiles 
The following service is installed: dogear 
The following service is installed: files 
The following service is installed: communities 
The following service is installed: status_updates 
The following service is installed: activities 
The following service is installed: calendar 
The following service is installed: forums 
The following service is installed: blogs 
The following service is installed: wikis 

Checking the resume tokens 
The resume token for blogs Wed Jan 23 15:48:52 GMT 2013 
The resume token for forums Wed Jan 23 15:48:52 GMT 2013 
.....
```

## Checking the installed services { .section}

Returns all the installed services that are defined in LotusConnections-config.xml. The data is informative and can be used to verify that the expected applications are installed. By default, a single task crawls and indexes all the installed applications.

## Checking the resume tokens { .section}

Resume tokens are related to incremental indexing of content, which keeps changing as users interact with a live system. The search engine tracks the information about the last successful crawling time of updated content. This crawl information is referred to as "resume tokens".

Checking the resume tokens queries the database and returns resume tokens in a readable format. The next indexing task indexes all the content for the component from the date and time that is specified in resume tokens. If crawling and indexing uses the default configuration as configured, resume tokens is no more than 15 minutes old. If the crawling interval is modified, check that the value of resume tokens is no more than the newly configured crawling interval. For example, if the crawling and indexing interval is one hour then the resume token value should not be older than one hour.

## Checking that the schedule calendars are configured correctly { .section}

Verifies that the scheduler calendars are configured correctly. Correctly configured calendars are highlighted in a green text box. Any calendars that are not configured correctly are highlighted in a red text box; search tasks do not run on any calendars marked in red. If a problem is highlighted review SystemOut.log for errors that occurred during Search application startup. For more information, see [Reviewing the SystemOut Log Exceptions tab](../admin/c_admin_common_sync_via_admin_commands1.md)

## Checking that the WebSphere® variables are set { .section}

Verifies that the WebSphere variables used by the search service have a valid value. Correctly configured variables are highlighted in a green text box. If the variable is not set and the variable is optional, the variable details are shown in a yellow text box. If a mandatory variable is not set, the variable details are shown in a red text box. These variables must be set in the WebSphere Administration Console. For more information see *WebSphere Application Server environment variables*.

## Checking for enabled indexing tasks { .section}

Displays the default Search scheduled tasks that are enabled in a green text box. If there are no default Search tasks enabled, this section is empty. For more information, see [Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md). No information is provided on custom tasks. The data in this section is informational.

## Checking the index folder for required files { .section}

Determines whether the Search index folder on the node contains two mandatory files, INDEX.READY and CRAWLING\_VERSION. If INDEX.READY is not available, review the errors that are highlighted in [Reviewing the SystemOut Log Exceptions tab](../admin/c_admin_common_sync_via_admin_commands1.md). Fix any problems that are highlighted by the exceptions.

## Reviewing the configuration files { .section}

Determines whether the mandatory configuration files are in the configuration directory. If the files are present, the file name is returned in a green text box. If the file is missing, this is highlighted in a red text box. As the files are mandatory, any missing files must be created and placed in the default configuration directory. For information on the HCL Connections™ configuration files, see [HCL Connections configuration files](../admin/r_admin_common_config_files.md)

## Checking the number of dictionaries that have been enabled { .section}

Returns the number of dictionaries that are enabled. During installation, only the English language dictionary is enabled by default. When your organization spans multiple geographies and multiple languages, you must enable the relevant language dictionaries for your deployment to ensure that Search returns optimum results. To enable Search dictionaries, see [Enabling dictionaries](../admin/t_admin_search_configure_dictionary.md).

## Checking that the nodes are in sync { .section}

Indicates whether the indexes on the nodes of a multi-node system are replicated correctly. In a multi-node system the index on each node must be mirrors of each other. This section also verifies that the indexes were updated in the last 30 days. A message stating that the nodes are not blocked is displayed in a green text box, this is an informational message and no action is required.

If the indexes are in date, the message "All nodes are in date" is displayed in a green text box. An index is considered to be in date if it has been updated in the last 30 days. Connections applications maintain delete and access-control update information for a maximum of 30 days. If indexing is not performed on an index for 30 days, that index is considered to be out-of-date and reindexing is necessary. If the index is out of date on each node, you must delete and re-create the index to ensure data integrity. For more information, see [Recreating the search index](../admin/t_admin_search_create_index.md).

If the cluster contains nodes with an index that is in date and a node with an index that is out of date, then action is required. Back up the index from the node that is in date. For more information, see [Backing up the Search index](../admin/c_admin_search_backup_index.md). Copy the index to a location that can be accessed by all nodes. Restore the backed up index to the node that contains the index that is out of date. For more information, see [Restoring the search index](../admin/c_admin_search_restore_index.md).

When the indexes on each node have the same data, they are in sync and the message "All nodes are in sync" is displayed in a green text box. If the nodes are not in sync, there may be a problem. Review the errors that are highlighted in [Reviewing the SystemOut Log Exceptions tab](r_review_systemout_tab.md).

## Checking the database records { .section}

The value that is returned for the message: The number of documents in the database is shows how many crawled documents are in the database and are due to be indexed by one or more nodes. A value of 0 indicates that all the documents are processed since the last crawl.

The value that is returned for the message:The number of files converted is shows how many files that are marked as converted is the database.

The value that is returned for the message:

```
The total number of files in the database
```

is the total of converted and unconverted files in the database. A file is marked as converted when the content in the file is extracted on the file system and is ready to be indexed.

The data that is provided in this section is informational and no action is required.

**Parent topic:**[Analyzing results from the search serverStatus page](../troubleshoot/r_analyse_search_results_frame.md)

**Related information**  


[Backing up the Search index](../admin/c_admin_search_backup_index.md)

[Restoring the Search index](../admin/c_admin_search_restore_index.md)

[Validating seedlists using the browser](../troubleshoot/t_admin_search_check_seedlist.md)

[Enabling dictionaries](../admin/t_admin_search_configure_dictionary.md)

[Recreating the Search index](../admin/t_admin_search_create_index.md)

[Reviewing the SystemOut Log Exceptions tab](../troubleshoot/r_review_systemout_tab.md)

[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

[Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md)

[HCL Connections configuration files](../admin/r_admin_common_config_files.md)

