# Editing files with Collabora Online

Collabora Online is a web-based office editor integrated directly into HCL Connections. It enables teams to view, co-author, and manage office documents securely in real time, entirely within the web browser without downloading files locally. This capability applies to personal files and files shared within a community

## Opening and editing files

### Editing existing files
You can open the Collabora editor for an existing file in the following ways:

- **Option 1: Single Click**

    - In any file list, such as "Files and Folders," simply clicking a supported file will load it directly into the Collabora editor, using the flexible viewing options described below.

- **Option 2: Context Menu**

    - You can also launch the editor from the file's context menu.
    - Find the file you wish to edit in the list.
    - Open its action menu (often a small down arrow or three dots next to the file name).
    - Select **Edit in Collabora** at the top of the menu to open the editor directly.


### Viewing options
You can access and edit documents in two ways:

- **Inline Editing**
    
    By default, clicking a file loads the Collabora editor directly on the current page. The editor replaces the usual HCL Connections file view, allowing you to make quick edits without losing your context in HCL Connections.

- **Full-Screen Editing**

    For a distraction-free experience, you can choose to open the file in another browser tab, launching a dedicated, full-screen editing environment that takes up your entire browser window. This view provides a simplified interface focused solely on the document.


### More menu options in inline view

When editing inline, an action panel in the upper right of the browser window provides the following options:


- **Edit in Full Screen:** Click this option to transition your inline editing session into a separate browser tab for a full-screen experience.
- **Upload New Version:** Use this option to replace the current file with an updated file directly from your computer.


### Creating files

You can create new office documents in HCL Connections from your personal files or from a community file section.

1. Navigate to your **Files and Folders** section, or a **Community Files** section.
2. Click **New** or **Add** in the upper left.
3. From the dropdown menu, select the type of document you wish to create: **Document**, **Presentation**, or **Spreadsheet**.

The standard blank template will immediately open in the Collabora editor. The integration supports all major word processing documents, spreadsheets, presentations, and plain text files.

## Real-time collaboration

The integration is built for seamless teamwork, allowing multiple users to work on the same document simultaneously.

- **Co-Authoring:** If multiple users with edit permissions open the same document, they can edit it at the exact same time.
- **Live Updates:** All participating users will see document changes happen live and in real-time.
- **Read-Only Viewing:** If a user without edit permissions opens a file that others are currently editing, they will safely join the session in a read-only viewer mode.
- **Independent Sessions:** The system tracks each user's activity independently. If one user leaves the document or their browser crashes, it does not interrupt or kick out other users who are still actively working.


### Collaboration tools within the Editor

To assist with teamwork, the editor includes built-in collaboration tools:


- **Comments Panel:** When editing inline, a dedicated panel on the right side of the screen is available for adding and viewing comments, creating a seamless feedback loop. Click the comment icon or the comment bubble on a word to expand this panel.


## Permissions and access control

To ensure data security, editing access is protected by a strict permission model. This applies to both your personal files and files shared with a community. To modify a document using Collabora, you must meet both of these requirements:

1. **Platform Permissions:** You must be the file's owner or have been granted explicit "Edit" permissions for that specific file within HCL Connections.
2. **Application Access:** Your account must be granted specific Collabora editing privileges by a system administrator.


!!! note 
    
    Even if you are the owner of a file, if an administrator has not granted you the specific Collabora editing access, you will only be able to view the document in a read-only state.

**Parent Topic**: [Installing and Configuring Collabora Online](../admin/t_admin_inst_config_collabora.md)