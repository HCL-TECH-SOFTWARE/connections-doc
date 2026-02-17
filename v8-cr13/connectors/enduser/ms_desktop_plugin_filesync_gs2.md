# Getting started with sync {#ms_desktop_plugin_filesync_GS .concept}

Use file sync to keep local files in your My Drive folder in sync with copies of those files on the server.

Drag or paste files and folders into My Drive to create your own collection. For example, you can create a project file that includes files you created as well as files that were shared with you. From My Drive you can share content just as you would from your My Files list.

When installation of the plug-in is complete, a new folder named **My Drive on server-name** is created under Favorites. Content in My Drive is automatically synced when changes are made.

Syncing is a way to automatically replicate changes to your content, whether you created it or whether it was shared with you, even when multiple people are acting on the content. You can access the files from your local desktop, from the Connections Files app, or from another device, and feel confident that you always have the latest version.

**Restrictions:**

-   We do not recommend adding Microsoft Access files to your sync folder.
-   The Connections Desktop Plug-ins for Microsoft Windows will support no more than 10,000 files and/or folders in the sync folder tree. This includes all files and folders in the top level folder and in all subfolders.  Attempting to sync more than 10,000 will cause degraded performance and eventual sync failures. Additionally, there is a limit of 5,000 files and/or folders supported for each copy operation from the desktop into the local sync folder. The HCL Connections node in windows explorer provides a virtual view of all files available on the server.  Unlike the sync support, these files are not downloaded locally until opened. HCL recommends adding your commonly accessed files to sync and accessing the remainder of your files through the virtual view provided by the Windows explorer plugin.


Sync works as follows:

1.  After successfully connecting to a server, you are notified that a folder named **My Drive on server-name** is added to your Windows Explorer Favorites folder.

    **Note:** If you connect to more than one server, you will have a **My Drive** folder for each server.

2.  Files and folders that you add to the **My Drive** folder on your desktop are automatically copied to a corresponding My Drive folder on the server.

    **Note:** Files and folders you add from the Connections Files app also appear in your local My Drive folder.

3.  Changes made to either the desktop or server copy of the file are automatically synced so that the files remain consistent.
4.  In the event that changes cannot be synced, for example if you modify a local file that is locked on the server, you are warned that your local copy might not match the server copy. You are advised to take steps to correct the problem.

After your **My Drive** folder is established, you can interact with the folder and its contents in these ways:

-   Drag and drop desktop files to/from your **My Drive** folder.
-   Save new files directly to your **My Drive** folder from a desktop application.
-   Rename and delete files in your **My Drive** folder.
-   Right-click the **My Drive** folder, choose **IBM Connections** and choose an action from the context menu. You can:
    -   View the sync status
    -   View issues if there are any
    -   Open the file's property page in the browser
    -   Suspend synchronization with the server
    -   Turn off synchronization with the server
    -   View or change sync preferences
-   Right-click a file in the **My Drive** folder, choose **IBM Connections** and choose an action from the context menu. You can:
    -   View the sync status
    -   View issues if there are any
    -   Open the folder's property page in the browser
    -   Lock or unlock the file
    -   Share the file or view sharing details about who the file is already shared with
    -   View previous versions if any exist
    -   Delete the file from server

        **Note:** Files can be added to more than one location in My Drive. For example, you can add a single file to My Drive and then later add a folder containing the same file. That does not affect the file, but if you later want to remove it entirely from My Drive, you must remove it from both locations.


-   **[Scenario: Collaborating on a document using automatic sync](../../connectors/enduser/scenario_file_sync.md)**  
Nancy Smith is a project manager for Greenwell, a fast-growing corporate event planning service. She creates a customer proposal that multiple people, including people outside of Greenwell, must access and edit. Some people are working from a laptop, others are working on the same file locally from their desktop system. Sync is used by the people who work offline. The automated file sync eliminates the stress of having to download the latest version of the file.
-   **[Adding a file or folder to My Drive](../../connectors/enduser/ms_desktop_plugin_filesync_add_file2.md)**  
Add a file or folder from your desktop to your My Drive folder so updates made to the content are applied automatically.
-   **[Suspending or stopping sync](../../connectors/enduser/ms_desktop_plugins_filesync_suspend.md)**  
You can suspend sync temporarily, turn off syncing for My Drive, or disconnect from a site altogether.
-   **[Viewing and resolving sync issues](../../connectors/enduser/ms_desktop_plugins_filesync_issues.md)**  
When sync issues arise between files in your local folder and files on the server, you can resolve the issues from the **Sync issues** dialog.
-   **[Managing versions for synced files](../../connectors/enduser/ms_desktop_plugins_filesync_versions.md)**  
Understand how versions are created. View and retrieve earlier versions of a file.
-   **[Managing synced files from the Files application](../../connectors/enduser/ms_desktop_plugins_SC_UI.md)**  
When file sync is enabled for your Connections deployment, you can view and manage files that you added locally to your My Drive folder from the My Drive folder in the Files application. Or, you can add files from the Files application to My Drive and be able to access them from your local My Drive folder.

**Parent topic:**[Using the HCL Connections desktop plug-ins for Microsoft Windows](../../connectors/enduser/c_ms_plugins_win_explorer.md)

