# Deleting the index {#t_admin_search_delete_index .task}

Delete the index by deleting the contents of the directory specified by the IBM WebSphere® Application Server variable, SEARCH\_INDEX\_DIR.

From time to time, you might need to delete and rebuild the Search index. For example, if you change the context root of one of the HCL Connections applications, you then need to rebuild the index by deleting the current index. The index is automatically rebuilt the next time the indexing task runs.

When you delete the index, you might also want to delete the content of the extracted file store used by the Search index. However, the existing extracted file content can be reused when generating a new index so, if the files were previously indexed successfully, it is generally preferable to keep the extracted content to reduce index recreation time.

1.  To delete the Search index, complete the following steps.
2.  Check the value of the SEARCH\_INDEX\_DIR WebSphere Application Server variable for the relevant server:

    1.  Launch the WebSphere Application Server Integrated Solutions Console.

    2.  Expand **Environment** and select **WebSphere variables**.

    3.  Click the **Show filter function** icon.

    4.  Ensure that **Name** displays in the **Filter** dropdown menu.

    5.  Enter SEARCH\_INDEX\_DIR into the **Search terms** field and click **Go**.

        A variable called SEARCH\_INDEX\_DIR displays in the search results. Take a note of the value of this variable as the index location for the relevant server.

3.  If you want to delete the contents of the extracted file store, check the value of the EXTRACTED\_FILE\_STORE WebSphere Application Server variable for the server:

    1.  Repeat steps 1a to 1d from the previous step.

    2.  Enter EXTRACTED\_FILE\_STORE into the **Search terms** field and click **Go**.

        A variable called EXTRACTED\_FILE\_STORE displays in the search results. Take a note of the value of this variable as the extracted file content location for the server.

4.  Shut down the Search server or cluster.

5.  Delete the contents of the index folder that you noted in step 1e.

6.  Delete the contents of the extracted file content folder that you noted in step 2b.

7.  Rebuild the index by following the steps described in *Recreating the Search index*.


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Creating Search indexes](../admin/c_admin_search_create_indexes.md)

[Recreating the Search index](../admin/t_admin_search_create_index.md)

[Creating a background index](../admin/t_admin_search_create_standalone_index.md)

