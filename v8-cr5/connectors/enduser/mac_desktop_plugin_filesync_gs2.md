# Using file sync for HCL Connections for Mac {#ms_desktop_plugin_filesync_GS .concept}

Use HCL Connections for Mac to keep local files in sync with copies of those files on the server.

**Note:** Sync capability must be enabled for your deployment in order for you to use this feature. When sync is enabled, adding a file to the My Drive folder from the Connection Files app or on your desktop allows you to keep your local copy of a file in sync with the server copy so you always have the latest changes available to you. This is especially helpful if others are updating the file. You can remove a file from a sync folder without deleting the file.

When installation of the plug-in is complete, a new folder named **Server-name My Drive** is created under Favorites in the Finder window. You can add files that you have created or stored locally as well as files that others have shared with you.

**Restriction:**

-   The Connections for Mac plugin will support no more than 10,000 files and/or folders in the sync folder tree. This includes all files and folders in the top level folder and in all subfolders.  Attempting to sync more than 10,000 will cause degraded performance and eventual sync failures. Additionally, there is a limit of 5,000 files and/or folders supported for each copy operation from the desktop into the local sync folder. HCL recommends adding your commonly accessed files to sync and accessing the remainder of your files through the browser.

The sync feature works as follows:

1.  After successfully connecting to a server, you are notified that a folder named <Server Name\> **My Drive** is added to your Finder Favorites folder.

    **Note:** If you connect to more than one server, you will have a **My Drive** folder for each server.

2.  Files that you add to the **My Drive** folder on your desktop are automatically copied to a corresponding My Drive folder on the server.
3.  Changes made to either the desktop or server copy of the file are automatically synced so that the files remain consistent.
4.  In the event that changes cannot be synced, for example if you modify a local file that is locked on the server, you are warned that your local copy might not match the server copy. You are advised to take steps to correct the problem.

After your **My Drive** folder is established, you can interact with the folder and its contents in these ways:

-   Drag and drop desktop files to/from your **My Drive** folder.
-   Save new files directly to your **My Drive** folder from a desktop application.
-   Add a file that someone has shared with you to My Drive so you will always have the latest version.

    **Note:** Others can sync files that you share with them so that all parties have automatic access to the latest version, making collaboration seamless.

-   Rename and delete files in your **My Drive** folder.
-   Right-click on a file in the **My Drive** folder, choose an action from the services dialog box. You can:
    -   View the sync status
    -   View issues if there are any
    -   Open the folder's property page in the browser
    -   Lock or unlock the file
    -   Share the file or view sharing details about who the file is already shared with
    -   View previous versions if any exist
    -   Remove the file from My Drive
-   View notifications about your sync files from the Mac Notification Center. Notifications are sent when new files have been added to your local My Drive folder from the server, when someone else has changed a file that you have in My Drive, and when a sync issue occurs. From a notification you can navigate to the file or open the sync dialog to resolve an issue.

**Note:** If your device is running OS X 10.10 or greater, icon badges will indicate the status of files \(that is, synched, not synched, or in conflict\) in the local sync folder. If you do not see these badges, you may need to enable them. To turn on badges, open **System Preferences** \> **Extensions** and check the **HCL Connections Mac** Finder extension to enable the badges.

-   **[Managing HCL Connections for Mac accounts](../../connectors/enduser/t_mac_plugins_connect.md)**  
You can add or remove HCL Connections or Connections Multi-tenant account information to or from your HCL Connections for Mac preferences to share files and information between OS X and HCL Connections or Connections Multi-tenant.
-   **[Setting preferences for the Mac plug-in](../../connectors/enduser/t_mac_plugins_adv_prefs.md)**  
You can view or edit preferences to customize HCL Connections for Mac for your needs.
-   **[Adding a file to HCL Connections for Mac](../../connectors/enduser/mac_desktop_plugin_filesync_add_file2.md)**  
Add a file from your desktop to HCL Connections for Mac.
-   **[Sharing a file or folder](../../connectors/enduser/mac_desktop_file_sharing.md)**  
View information about sharing a file or folder.
-   **[Managing file versions](../../connectors/enduser/mac_desktop_plugins_filesync_versions.md)**  
View and retrieve earlier versions of a file.
-   **[Suspending file sync](../../connectors/enduser/mac_desktop_plugins_filesync_suspend.md)**  
To suspend file sync temporarily, turn off syncing for a sync folder.
-   **[Viewing and resolving sync issues](../../connectors/enduser/mac_desktop_plugins_filesync_issues.md)**  
When sync issues arise between files in your local folder and files on the server, you can resolve the issues from the **Sync issues** dialog.

**Parent topic:**[HCL Connections for Mac](../../connectors/enduser/msdesktop_mac_over.md)

**Parent topic:**[Integrating with other products](../../connectors/admin/c_connectors_over.md)

