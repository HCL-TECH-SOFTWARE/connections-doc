# Reindexing content on a clustered HCL Connections deployment {#t_admin_search_reindex_cluster .task}

When you reindex from scratch on a clustered HCL Connections deployment, reindexing takes place in the background while the system continues to service requests of the existing index. When reindexing completes, you then switch to the new index. The update process includes ripple restart of Search nodes.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin client.

This procedure uses the following three-node cluster as an example:

-   Deployment manager node, host name: connections.swg
-   Search node1, host name: icappnode1.swg

    Index location:/local/IBM/LotusConnections/data/local/search/index

-   Search node2, host name: icappnode2.swg

    Index location: /local/IBM/LotusConnections/data/local/search/index


1.  Verify that you have root permissions for all three servers.

2.  Use the following commands to verify that both search nodes have enough free disk space for seedlist files and a new index. You need at least three times the size of the current index:

    ```
    :df -kh
    du -ksh /local/IBM/LotusConnections/data/local/search/index
    ```

3.  Create a placeholder for the new index on node1, complete the following steps:

    1.  SSH to search node1 and switch to root user.

    2.  Create empty directories for the background crawling and indexing functions:

        ```
        mkdir --parents /local/tmp/index.2014.Apr.06
        cd /local/tmp/index.2014.Apr.06
        mkdir ./backgroundCrawl ./backgroundFileExtraction ./backgroundIndex
        
        ```

4.  Start to index on node1, complete the following steps:

    1.  SSH to the deployment manager node and switch to root user.

    2.  Start wsadmin, enter the following commands:

        ```
        cd /local/IBM/WebSphere8/AppServer/profiles/Dmgr01/bin 
        ./wsadmin.sh -lang jython 
        execfile("searchAdmin.py")
        ```

    3.  Start background indexing and crawling of all configured services, enter the following command:

        ```
        SearchService.startBackgroundIndex("/local/tmp/index.2014.Apr.06/ backgroundCrawl ", 
        "/local/tmp/index.2014.Apr.06/ backgroundFileExtraction ", "/local/tmp/index.2014.Apr.06/ 
        backgroundIndex ", "all_configured")
        ```

5.  Monitor and verify that indexing completes on node1, complete the following steps:

    1.  SSH to search node1 and switch to root user.

    2.  Monitor progress on node1's SystemOut.log for any warning or error messages.

        Example:

        ```
        .CLFRW0577I: Search has started background crawling and indexing. 
        Index will be built in /local/tmp/index.2014.Apr.06/backgroundIndex.
        ```

    3.  When the process completes correctly, the following marker file is created: /local/tmp/index.2014.Apr.06/ backgroundIndex/INDEX.READY

6.  Copy the new index to node2, complete the following steps:

    1.  SSH to search node2 and switch to root user.

    2.  Enter the following commands:

        ```
        mkdir /local/tmp/index.2014.Apr.06
        scp -r root@icappnode1:/local/tmp/index.2014.Apr.06/backgroundIndex /local/tmp/index.2014.Apr.06/
        ```

        **Note:** This step does not replace the active index.

7.  Prepare to replace the active index, complete the following steps on the deployment manager node:

    1.  Record all enabled indexing tasks, enter the following command:

        ```
        SearchService.listTasks()
        ```

    2.  Disable all enabled indexing tasks, enter the following command for each enabled task:

        ```
        SearchService.disableTask("taskname")
        ```

    3.  Verify that no tasks are still running. You should get an empty output from the following command:

        ```
        SearchService.listRunningTasks()
        ```

8.  Replace the active index on node1, complete the following steps:

    1.  Stop WebSphere® Application Server on Search node1.

    2.  Move the original index out of active position, enter the following command:

        ```
        mv /local/IBM/LotusConnections/data/local/search/index/* 
        /local/IBM/LotusConnections/data/local/search/index.previous
        ```

    3.  Move the new index into active position, enter the following command:

        ```
        mv /local/tmp/index.2014.Apr.06/backgroundIndex/*
        /local/IBM/LotusConnections/data/local/search/index 
        ```

    4.  Start WebSphere Application Server on Search node1.

9.  Replace the active index on node2, complete the following steps:

    1.  Stop WebSphere Application Server on Search node2.

    2.  Move the original index out of active position, enter the following command:

        ```
        mv /local/IBM/LotusConnections/data/local/search/index/*
        /local/IBM/LotusConnections/data/local/search/index.previous
        ```

    3.  Move the new index into active position, enter the following command:

        ```
        mv /local/tmp/index.2014.Apr.06/backgroundIndex/*
        /local/IBM/LotusConnections/data/local/search/index  
        ```

    4.  Start WebSphere Application Server on Search node2.

10. Resume indexing over the new index, take the following steps:

    1.  On the deployment manager node, close and reopen wsadmin. Enter the following commands:

        ```
        cd /local/IBM/WebSphere8/AppServer/profiles/Dmgr01/bin
        ./wsadmin.sh -lang jython   
        execfile("searchAdmin.py")
        ```

    2.  Purge all traces of the previous index from the database, enter the following command:

        ```
        SearchService.notifyRestore("true")
        ```

    3.  Enable all tasks, for each task you previously disabled, enter the following command:

        ```
        SearchService.enableTask("taskname");
        ```


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

