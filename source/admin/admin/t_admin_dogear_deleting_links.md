# Deleting unnecessary links {#t_admin_dogear_deleting_links .task}

Use these commands to delete unnecessary links for your Bookmarks deployment – for example, to remove offensive content. These commands do not require a file check out or a server restart to take effect.

Use the LinkService command to remove links from a Bookmarks database. You can delete links in these ways:

-   Provide the link UID \(which you can obtain by right-clicking on the bookmark, clicking "Copy link location" and pasting into a text editor, and then copying the 36 alphanumeric characters \(the UID\) that occur after "link="\).
-   Provide the email address of the person that created the link and URL of the link.
-   Provide a single URL or a text file containing multiple URLs to delete all links associated with the specified URLs.

Before you delete links, you can send a notification email to bookmark owners to let them know when the link will be deleted.

1.  See the topic *Running Bookmarks administrative commands* for information on using administrative commands.

2.  Use the following form for the LinkService command:

    ```
    LinkService.<command_name>(<arguments>)
    
    ```

3.  You can delete links in two ways - using the UID \(which you can obtain by right-clicking on the bookmark, clicking "Copy link location" and pasting into a text editor, and then copying the 36 alphanumeric characters \(the UID\) that occur after "link="\) or, alternately, by using the email address of the person that created the link and URL of the link.

    LinkService.deleteLinkByUID\('\[UID\]'\)
    :   Deletes a single bookmark matching the UID specified.

        \[UID\] is the UID of the bookmark.

        When creating the text file, enter one UID per line.

        There should be no output in wsadmin console if successful.

        Example:

        ```
        LinkService.deleteLinkByUID("0A5G09219578A357F378C607680F7600000B")
        ```

    LinkService.deleteLinkByUIDBatch\('\[fileName\]'\)
    :   Deletes a list of bookmarks matching the UIDs specified.

        \[fileName\] is the name of a text file containing the UIDs to be deleted. You must create this text file and save it in a local directory \(local to the server where you are running the wsadmin processor\).

        There should be no output in wsadmin console. Be sure to check logs as UIDs that were not successfully deleted will be logged.

        Example:

        ```
        LinkService.deleteLinkByUIDBatch("/opt/Bookmarks/badlinks.txt")
        ```

        **Note:** If you are using DB2® as your database, you can create the batch file for deleting all of the bookmarks associated with a user this way:

        1.  Open the DB2 Control Center.
        2.  From the command editor, connect to the Bookmarks database.
        3.  Get the user's person ID from the person table: select person\_id from dogear.person where email='someEmail@company.com'
        4.  Get the user's bookmark link IDs: select link\_id from dogear.link where person='personId'
        5.  Based on the results returned, highlight a group of bookmark links. We suggest 100 to 200 links at a time.
        6.  Click on **Selected** and **Export**.
        7.  Make sure the option **No character delimiter** is selected and export to a text file on your file system
        8.  Run the **LinkService.deleteLinkByUIDBatch** command with the file created.
    LinkService.deleteLinkByPersonURL\('\[email\]', '\[href\]'\)
    :   Deletes a single bookmark matching the email and URL specified.

        \[email\] is the address of the person who created the bookmark.

        \[href\] is the URL of the bookmark you want to delete. It is important to input the exact href including the protocol.

        There should be no output in the wsadmin console if successful.

        Example:

        ```
        LinkService.deleteLinkByPersonURL("jane_doe@acme.com","http://bad.url.com")
        ```

    LinkService.deleteLinkByPersonURLBatch\('\[fileName\]'\)
    :   Deletes multiple bookmarks matching specified email addresses and URLs.

        \[fileName\] is the filename containing the addresses and URL to be deleted. You must create this text file and save it in a local directory \(local to the server where you are running the wsadmin processor\).

        This file must be formatted with \[email\] <space\> \[href\] on each line. For example, a single line would look as follows:

        email@ibm.com http://www.theurl.com Note the single whitespace character between the address and the URL.

        \[email\] is the email address of the person with the bookmark.

        \[href\] is the URL of the bookmark. It is important to input the exact href including the protocol.

        There should be no output in the wsadmin console. Be sure to check logs as addresses and URLs matching the bookmark that was not successfully deleted will be logged.

        Example:

        ```
        LinkService.deleteLinkByPersonURLBatch("c:/Bookmarks/delete.txt")
        ```

    LinkService.deleteLinksByURL\('\[href\]'\)
    :   Deletes all bookmarks \(public and private\) matching the URL specified. Those bookmarks will be marked as deleted in the database waiting for the search indexer to detect them and update the index.

        \[href\] is the URL of the bookmark you want to delete. It is important to input the exact href including the protocol.

        There should be no output in the wsadmin console if successful.

        Example:

        ```
        LinkService.deleteLinksByURL("http://bad.url.com")
        ```

    LinkService.deleteLinksByURLBatch\('\[fileName\]'\)
    :   Deletes multiple bookmarks matching specified URLs.

        \[fileName\] is the filename containing the URLs to be deleted. Separate URLS with line breaks. You must create this text file and save it in a local directory \(local to the server where you are running the wsadmin processor\).

        There should be no output in the wsadmin console. Be sure to check logs as bookmarks matching specified URLs that are not successfully deleted will be logged.

        Example:

        ```
        LinkService.deleteLinksByURLBatch("c:/Bookmarks/delete_links.txt")
        ```

    UrlService.notifyBrokenURLOwners\('<broken\_URL\>', '<replace\_URL\>'\)
    :   This command will find all owners of a single URL and send them an email notification. Optionally, you can supply a <replace\_URL\> as the suggested substitute URL for the broken URL.

        \[broken\_URL\] is a plain text string that represents the broken URL.

        \[replace\_URL\] is a plain text string that is the suggested substitute URL for the broken URL.

        Example:

        ```
        UrlService.notifyBrokenURLOwners('http://www.example.com','http://w3.example2.com') 
        ```

        This command will find all users who bookmarked http://www.example.com \(either public or private bookmarks\) and send them email notifications. In the notification, it will suggest that bookmark owners replace the old URL with the new one http://www.example2.com.

    UrlService.batchNotifyBrokenURLOwners\('<repository\_file\>'\)
    :   This command will iterate all the broken URL and substitute URL pairs in the given <repository\_file\> and send email notifications to all the bookmark owners of the broken URLs in the file. In the notification, you can provide the corresponding <replace\_URL\> as the suggested substitute URL for the broken URL.

        \[repository\_file\] is a local file path that contains the broken URLs and their suggested substitute URLs. Each pair of original URL and substitute URL should be placed in one line and separated by either white spaces or tabs.

        Example:

        ```
        UrlService.batchNotifyBrokenURLOwners('c:\\brokenurls.txt') 
        ```

        This command will load the URL pairs in c:\\brokenurls.txt and send email notifications to users who bookmarked those URLs. For each broken URL, Bookmarks will send an email notification.


**Related information**  


[Running Bookmarks administrative commands](../admin/t_admin_dogear_changing_admin.md)

[Managing links](../admin/c_admin_dogear_manage_links.md)

