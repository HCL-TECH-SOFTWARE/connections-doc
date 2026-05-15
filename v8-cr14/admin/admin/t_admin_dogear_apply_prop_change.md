# Applying property changes {#t_admin_dogear_apply_prop_change .task}

After you have edited the Bookmarks configuration properties, check the changed configuration file in, and restart the servers to apply the changes.

You must perform the check in during the same wsadmin session in which you checked out the files for the changes that you made to take effect.

1.  Check in the changed configuration property keys using the following wsadmin client command:

    ```
    DogearCellConfig.checkInConfig( "<working\_directory\>", "<cell\_name\>")
    
    ```

2.  Update the value of the version stamp configuration property in the LotusConnections-config.xml file to force users' browsers to pick up this change. See *Required post-customization step* for more details.

3.  To exit the wsadmin client, type exit at the prompt.

4.  Stop and restart the server hosting the Bookmarks application.


**Parent topic:**[Accessing the Bookmarks configuration file](../admin/t_admin_dogear_accessing_config.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

