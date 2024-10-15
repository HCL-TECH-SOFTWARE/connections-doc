# Deleting draft wiki pages {#delete_user_draft_wiki_page .task}

Delete unsaved changes to a user's wiki pages.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

To delete a user's draft pages, you need the user's ID in your LDAP directory.

If a user edits a wiki page without saving the changes, a draft version of the page is stored in the database. Each time the user, or a wiki owner or editor, visits the page, a reminder about the draft is displayed. If the user is no longer available to save or delete the draft version, you can delete it by using the deleteDraftsByOwnerId command. This command is useful when a user leaves your organization.

To delete a user's drafts, complete the following steps:

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  To delete draft wiki pages that are owned by a specific user, enter the following command:

    WikisMediaService.deleteDraftsByOwnerId\('extId'\)

    where extId is the unique ID of the user.

    All draft pages that are owned by the specified user are deleted.


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

