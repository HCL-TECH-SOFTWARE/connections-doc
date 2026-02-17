# Deleting user files from the system {#deletinguserfilesfromthesystem .task}

Use the FilesLibraryService delete commands to delete user files.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

This topic focuses on deleting libraries \(sets of files\) belonging to inactive users. Inactive users are users who were removed from the corporate user directory. When that directory is synchronized with the HCL Connections application directories, the users are marked inactive and their libraries are marked as "orphans." For information on synchronizing directories and inactive users, see the section *Managing users*.

In the Files database context, a library is a set of files owned by a person or community. However, you should delete file libraries owned by communities by following steps in the topic *Deleting orphaned data*.

!!! important

    Connections 6 CR3 and higher: You must perform this task even when scheduled tasks are set to run on files marked for deletion, as the scheduled tasks only move the files from their original location, for example opt/ibm/connections/data/shared/files to the /files/trash directory. The following steps are needed to delete the files from the trash directory and free up disk space.

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

3.  Run this command to find out the total number of libraries whose owners were removed from LDAP:

    ```
    FilesLibraryService.getPersonalOrphanCount()
    ```

4.  Run this command to return a list of personal libraries whose owners were removed from the LDAP directory. Libraries belonging to inactive users are returned marked "orphaned":

    ```
    FilesLibraryService.browsePersonalOrphan(sortOption, sortAscending, pageNumber, itemsPerPage)
    ```

    where the sortOption parameter is a String value that specifies how to sort the list. The default value is title, but you can use lastUpdate, size, createDate, or quotaPercentage.

    The sortAscending parameter is a String value that specifies whether the list sorts in ascending alphabetical order. This depends on sortOption. If sortOption is title, then this value is true; if sortOption any other value, then this value is false.

    The pageNumber parameter is the number of the page to return. For example, if the itemsPerPage value is 40, and pageNumber value is 2, the command returns items 41 to 80 \(page 2\) instead of 1 to 40 \(page 1\).

    The itemsPerPage parameter is the maximum number of policies to list per page. The default value is 20.

    !!! note
        
        To print the results of this command to a text file, see the topic *Printing information returned by commands*.

5.  Run one of these commands to delete libraries:

    -   Run this command to delete a single library:

        ```
        FilesLibraryService.delete(String libraryId)
        ```

        where libraryId is the library id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The parameter is a String.

        Returns a message that the library with the id was deleted, or a failure message if it is not found.

    -   Run this command to delete multiple libraries:

        ```
        FilesLibraryService.deleteBatch(String filePath)
        ```

        where filePath is a String the full path to a text file containing a list with a single library id per line in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You must create the file and save it in a directory local to the server where you are running the wsadmin processor. The parameter is a String.

        Returns an exception and stops processing if any item is not found.

        !!! note

            If the files owned by an inactive user are needed by another user, consider changing the ownership of the files first before deleting the inactive user. For details on changing the file ownership, refer to [Transfering ownership of user files](../../admin/admin/t_transfer_ownership_of_user_files.md)


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Managing users](../admin/c_admin_common_user_life_cycle_over.md)

[Deleting orphaned data](../admin/t_admin_communities_delete_orphaned_data.md)

[Printing information returned by commands](../admin/t_admin_files_printing.md)

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

