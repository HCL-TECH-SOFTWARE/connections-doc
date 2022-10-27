# Running Library administrative queries and commands {#t_admin_communities_library_queries .task}

Run administrative commands from the Administration Console for Content Platform Engine \(ACCE\) to query for and modify objects in the FileNet Content Platform Engine

Running administrative commands requires you to start ACCE. ACCE supports a subset of the browsers that are supported by Connections. Although some operations in ACCE work with non-supported browsers, for best results, use ACCE with a supported browser. For a list of supported browsers, see [http://www-01.ibm.com/support/docview.wss?uid=swg27013654](http://www-01.ibm.com/support/docview.wss?uid=swg27013654), and in the By Component column for Content Manager, click **Administrative Console for Content Engine**.

This application is available from the following sources:

-   connections\_root/acce if FileNet server is installed with Connections Content Manager

    Where connections\_root is the base URL of Connections, for example:

    ```
    http://connections.example.com/acce
    ```

-   filenet\_root/acce if an existing FileNet server is used by Connections Content Manager

    Where filenet\_root is the base URL of FileNet, for example:

    ```
    http://filenet.example.com/acce
    ```


To access administration for library content, complete the following steps:

1.  Log on to the administrative console for Content Platform Engine

2.  From the administrative console, select **Domain** \> **Object Stores** \> **ICObjectstore** and click **Search**.

    ICObjectStore is the default name of the object store that is created when Connections Content Manager is installed.

3.  Choose **Select from table: Teamspace**.

4.  Choose **all columns** in the **Select Columns** section and click the arrow to move the columns from **Columns**to **Selected**

5.  Enter a query criterion.

    For example:

    ```
    WHERE ClbTeamspaceState=2
    ```

    **Note:** If you exclude the WHERE clause from this query, then all teamspaces \(Connections libraries\) are returned. Running such a query takes a long time and degrades performance.

6.  Click **Search** to run administrative queries on objects in the object store. You can then inspect or delete items in the object store.


In the example query, the search returns a list of Libraries that are marked for deletion by removing the Library widget from a Community. Community owners mark a library for deletion by removing a Library widget from a community.

**Note:** Deleting teamspace objects does not remove the corresponding widget from a Community. You can delete teamspace objects only after the corresponding library widget is removed from a community.

