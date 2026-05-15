# Administering Files {#administeringfiles .concept}

You administer Files using the wsadmin client to specify properties in a configuration file, or run administrative commands.

You edit the configuration file to control how and when various Files operations take place. You use the administrative commands to perform tasks that manipulate Files content. Changes to the configuration file require node synchronization and a restart of the Files server before they take effect. Changes made using administrative commands take effect immediately.

Refer to the following sections on topics in administering files:

-   **[Enabling sync for files and folders](../admin/t_admin_enabling_file_sync.md)**  
Enable sync for files and folders in the Files application. This feature enhances collaboration by allowing users to keep files and folders synchronized even when working offline.
-   **[Managing images and videos for thumbnails and preview](../admin/t_admin_managing_thumbnails_and_videos.md)**  
You can control the size of thumbnails for images and videos using the file-preview-config.xml.
-   **[Enabling round-trip editing for files](../admin/t_admin_enabling_roundtrip_edit.md)**  
Enable round-trip editing for files so that users can check out a file and edit it locally with one click.
-   **[Administering Push Notification](../admin/t_admin_push_notification.md)**  
With push technology the file sync feature scales to multiple clients and the clients can update their content faster when changes are made on the server.
-   **[Changing Files configuration property values](../admin/t_admin_files_changing_config_properties.md)**  
Configuration properties control how and when various Files operations take place. You can edit the properties to change the ways that Files operates.
-   **[Running Files administrative commands](../admin/t_admin_files_run_commands.md)**  
Use administrative commands to perform tasks that manipulate Files content.
-   **[Backing up Files data](../admin/t_admin_files_backup.md)**  
Files stores data in both the database and a file system. This adds some complication in keeping the application available to users while backing up data.
-   **[Displaying files inline](../admin/t_admin_files_enable_inline.md)**  
Configure Files to display files inline instead of as attachments. This is useful when you use the Files API to download and display active content, such as Adobe® Flash \(.swf\) files, in your own HTML pages. Enable inline display by changing a configuration property in the `files-config.xml` file. Then set the inline parameter to true in your download requests.
-   **[Restricting file types in Files](../admin/t_admin_files_restrict_types.md)**  
You can restrict the types of files that users can upload in Files.
-   **[Setting a maximum size on libraries](../admin/t_admin_files_library_maxsize.md)**  
Use FilesLibraryService commands to assign a policies to libraries. A library is a set of files owned by a person or community. A policy sets a maximum size for a library.
-   **[Working with Files policies](../admin/t_admin_files_policies.md)**  
Use the FilesPolicyService commands to add, edit, count, and return information about policies. You apply policies to libraries to set a maximum size on those libraries.
-   **[Seeing Files library information](../admin/t_admin_files_library_info.md)**  
Use FilesLibraryService commands to see information about libraries, such as its owner, type, and size. A library is a set of files owned by a person or community and stored in the database.
-   **[Filtering lists returned by commands](../admin/t_admin_files_filter_maps.md)**  
Use the FilesUtilService commands to filter lists of maps returned by browse commands.
-   **[Printing information returned by commands](../admin/t_admin_files_printing.md)**  
Use the FilesPrintService.saveToFile command to print information returned by other commands.
-   **[Disabling automatic email notification of file updates](../admin/t_admin_files_disable_notification.md)**  
When an user downloads a file for the first time, Files sets a preference so that the user receives an email notification when the file is edited or commented on. The assumption is that users want to receive email about updates to the file. You can disable this notification using the `files-config.xml` file.
-   **[Disabling file versioning](../admin/t_admin_files_disable_versioning.md)**  
By default, when a user uploads a new version of a file it becomes the latest version, and all previous versions are kept. Users can see all versions of a file in the user interface. You can disable file versioning in the files-config.xml properties file.
-   **[Transferring ownership of user files](../admin/t_transfer_ownership_of_user_files.md)**  
As an administrator, you can use a wsadmin command to transfer the ownership of multiple files belonging to an active or inactive user Connections Alternatively, you can use the Files app's user interface to transfer--one file at a time--an active user's files.
-   **[Disabling transfer of file ownership by users](../admin/files_t_disable_transfer_file_owner_by_users.md)**  

-   **[Deleting user files from the system](../admin/t_admin_files_delete_user_data.md)**  
Use the FilesLibraryService delete commands to delete user files.
-   **[Finding the location of a stored file](../admin/t_admin_files_find_file_location.md)**  
Use the FilesUtilService.getFileById command to locate a file stored in a directory on a file system.

**Parent topic:** [Administering](../admin/c_lc_admin_overview.md)

**Related information**  


[Files administrative commands](../admin/r_admin_files_commands.md)

[Groups](../admin/c_admin_common_groups.md)

