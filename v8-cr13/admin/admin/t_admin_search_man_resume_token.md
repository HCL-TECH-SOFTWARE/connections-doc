# Manipulating the resume tokens for HCL Connections services {#t_admin_search_man_resume_token .task}

Use administrative commands to manipulate the resume tokens in the Search index.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin client.

!!! note
    
    1.  You must have an index in place because the commands manipulate the resume tokens in a valid index.
    2.  Do not run this command against a foreground index.

Use the Search application to update the resume tokens for components in an index. When this index is then used as the foreground index, crawling of the components resumes from the time and date that is specified in the updated resume tokens.

1.  To manipulate resume tokens, complete the following steps.
2.  Use the following command to run one-off indexing tasks.

    ```SearchService.updateResumeTokens(String components, String date, String indexLocation)```
    
    Updates the resume tokens in the index.

    !!! note 
            
        You can run this command on background indexes only.

    This command takes the following arguments:

    - components
        
        The applications whose resume tokens are to be manipulated. The following values are valid:

        - activities
        - all\_configured
        - blogs
        - calendar
        - communities
        - dogear
        - ecm\_files
        - files
        - forums
        - people\_finder
        - profiles
        - status\_updates
        - wikis
        
        Use all\_configured instead of listing all indexable services when you want to manipulate the resume tokens.

    - date
            
        The date the resume tokens are changed to; date is in the format `MM-dd-yyyy HH:mm:ss:SSSZ`.

        For example: `08-01-2013 14:00:00:000-0000`

    - indexLocation
            
        The location that contains the index that has its resume tokens updated.

        For example: `/opt/IBM/Connections/data/search/index_backup`

        If the command works correctly and the resume tokens are updated, the value "1" is returned on the command line. If the resume tokens are not updated the value "0" is returned on the command line.

        Examples:

        ```
        SearchService.updateResumeTokens("all_configured","08-01-2013 14:00:00:000-0000", 
        "/opt/IBM/Connections/data/search/index_backup") 
        SearchService.updateResumeTokens("profiles, 
        activities,blogs,communities,forums,files,dogear","08-01-2013 14:00:00:000-0000", 
        "/opt/IBM/Connections/data/search/index_backup")
        ```


Restore the updated index to all nodes in the cluster. For more information, see *Restoring the Search index*.

**Parent topic:**[The indexing process](../admin/c_admin_search_index_process.md)

**Related information**  


[Restoring the Search index](../admin/c_admin_search_restore_index.md)

