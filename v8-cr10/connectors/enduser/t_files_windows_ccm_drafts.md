# Managing library file drafts {#t_files_windows_ccm_drafts .task}

Publish updates to your library files from the Drafts monitor.

When you download a library file and edit it, a notification message in the system tray informs you that a new local draft was created. You can view all of your library files in the draft state from the Library Drafts Monitor. From the monitor, you can open a draft, publish your file changes, or delete a draft.

You can have two kind of drafts: local drafts and remote drafts \(simply referred to as drafts.\)

Drafts are created as follows:

-   A draft is created when you check out a file from the server.
-   A local draft is created when you modify the draft so that the local draft now differs from the server file.

When you have a local draft, you can upload the changes to update the server copy and delete the local draft, or check it in as a new version, which also removes the local draft.

-   To view and manage library files in a draft state, click the HCL Connections icon in the system tray, choose **View Library Drafts**, navigate to the library, and do one of the following actions:
-   Double-click the file name to open the local copy.

-   Right-click a draft and choose **Upload** \> **Save as draft** to upload the updated file and update the draft on the server.

-   Right-click a draft and choose **Upload** \> **Check in as new version** to upload the updated file with a new name and make it available to library users.

    **Note:** If review workflow is enabled for this library, use the **Upload** \> **Check in as new version** option to submit a draft for review.

-   **Delete draft** permanently removes the draft and the corresponding local draft \(if one exists\) if you no longer want to update the file. Deleting a draft does not affect the published version of the library file but it will no longer be in a checked-out state.

-   **Delete local draft** permanently removes the local draft. Deleting a local draft does not affect the published version of the library file nor the draft version on the server \(if one exists\).


**Parent topic:**[Working with libraries](../../connectors/enduser/c_files_windows_ccm_overview.md)

