# Managing versions for synced files {#ms_desktop_plugins_filesync_version .task}

Understand how versions are created. View and retrieve earlier versions of a file.

When you initially upload a file for syncing you create a first version. After that, versions are created following these rules:

-   When sync uploads a change and the file was previously changed by the same editor a new version is not created.
-   When sync uploads a change and the file was previously changed by a different editor a new version is created.
-   When sync uploads a change and it detects that the server file was already updated a new version is created and the version is marked as a conflict.

View versions by right-clicking a file and choosing **HCL Connections** \> **View previous versions**. You can see information including the version number, when it was updated, and the person who made the updates. You can restore a previous version to make it the latest version. A new version is generated if you restore a file from an older version, or click **Upload new version** to upload a new version of the file.

-   Do any of the following to work with file versions.
-   Right-click a version that is not the current version and choose **Delete** to permanently remove the version.

-   Right-click a version that is not the current version and choose **Restore** to make that version the current version.

-   Right-click a version that is not the current version and choose **Download this version** to open the version in an editor.

-   If you edit a previous version and save the file, you are prompted to overwrite the most recent version of the file, merge your changes, or rename the file and save it as a new file.


**Parent topic:**[Getting started with sync](../../connectors/enduser/ms_desktop_plugin_filesync_gs2.md)

