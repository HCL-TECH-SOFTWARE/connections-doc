# Using administrative commands {#t_admin_dogear_administrative .task}

The commands described here manipulate managed Java™ beans \(MBeans\) to make changes to various operational data on a Bookmarks server.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

These commands are tools you can use to control various aspects of the Bookmarks environment and its users. These commands do not require a file check out or a server restart to take effect.

These commands are case-sensitive and take the following form:

```
DogearMemberService.<command_name>(<arguments>)
LinkService.<command_name>(<arguments>)
URLService.<command_name>(<arguments>)

```

**Note:** These commands apply to bookmarks created within the Bookmarks app; they do not apply to community bookmarks.

1.  **To update the Bookmarks database** - If there is an LDAP change that requires member IDs in the Bookmarks database to be updated, you must use the DogearMemberService command. For example, if users are migrated to a new LDAP or a user is removed and re-entered in the LDAP and their unique identifier changes, these users will not be able to login to Bookmarks until the user record is updated with the DogearMemberService MBean. The following methods are available to make these database changes:

    DogearMemberService.syncAllMembersByExtId\(boolean\)
    :   See *Synchronizing user data using administrative commands* for details.

    DogearMemberService.syncMemberByExtId\(newExternalID, oldExternalID\)
    :   See *Synchronizing user data using administrative commands* for details.

    DogearMemberService.syncAllMemberExtIds\(\)
    :   See *Synchronizing user data using administrative commands* for details.

    DogearMemberService.syncMemberExtIdByEmail\(emailAddr\)
    :   See *Synchronizing user data using administrative commands* for details.

    DogearMemberService.syncMemberExtIdByLogin\(loginName\)
    :   See *Synchronizing user data using administrative commands* for details.

    DogearMemberService.syncBatchMemberExtIdsByEmail\(emailFile\)
    :   See *Synchronizing user data using administrative commands* for details.

    DogearMemberService.syncBatchMemberExtIdsByLogin\(loginFile\)
    :   See *Synchronizing user data using administrative commands* for details.

2.  **To remove offensive content** - When you need to delete offensive or unwanted links from the database, you use the LinkService command. You can delete links in two ways - using the UID \(which can be obtained by right-clicking on the bookmark, click on "Copy link location" and pasting into a text editor, and then copying the 36 alphanumeric characters \(the UID\) that occur after "link="\) or, alternately, by using the email address of the person that created the link and URL of the link.

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

        \[fileName\] is the name of a text file containing the uids to be deleted. You must create this text file and save it in a local directory \(local to the server where you are running the wsadmin processor\).

        There should be no output in wsadmin console. Be sure to check logs as UIDs that were not successfully deleted will be logged.

        Example:

        ```
        LinkService.deleteLinkByUIDBatch("/opt/Bookmarks/badlinks.txt")
        ```

    LinkService.deleteLinkByPersonURL\('\[email\]', '\[href\]'\)
    :   Deletes a single bookmark matching the email and URL specified.

        \[email\] is the address of the person who created the bookmark.

        \[href\] is the URL of the bookmark you want to delete. It is important to input the exact href including the protocol.

        There should be no output in the wsadmin console if successful.

        Example:

        ```
        LinkService.deleteLinkByPersonURL("jane_doe@acme.com","http://bad.url.com)
        ```

    LinkService.deleteLinkByPersonURLBatch\('\[fileName\]'\)
    :   Deletes multiple bookmarks matching specified email addresses and URLs.

        \[fileName\] is the filename containing the addresses and URL to be deleted. You must create this text file and save it in a local directory \(local to the server where you are running the wsadmin processor\).

        This file must be formatted with \[email\] <space\> \[href\] on each line. For example, a single line would look as follows:

        email@ibm.com http://www.theurl.com

        Note the single whitespace character between the address and the URL.

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

3.  **To manage IP ranges** - UrlService commands are used when the internal IP ranges of a company change. These commands operate on the Bookmarks database and can recalculate whether an existing link is internal or not, based on the IP ranges that are updated using the DogearCellConfig.addIpRange or DogearCellConfig.removeIpRange commands.

    Also, it is a good idea to delete the contents of the Favicons subdirectory. The "favicons" that appear next to each Bookmarks link are cached in the favicon directory, and if you delete the contents of this directory, the icons that appear next to each link will be updated.

    After making IP range configuration updates you need to restart Bookmarks for changes to take effect. Then you must run these commands to process URL changes. UrlService commands include:

    UrlService.reprocessIntranetAddress\('\[href\]'\)
    :   \[href\] is exact URL whose intranet range is to be reprocessed .

        Example Usage: UrlService.reprocessIntranetAddress \('http://www.ibm.com'\)

        There should be no output in wsadmin console if successful.

    UrlService.reprocessIntranetAddressBatch\('\[fileName\]'\)
    :   \[fileName\] is the name of the file containing URLs to be recalculated.

        You must create this text file and save it in a local directory \(local to the server where you are running the wsadmin processor\).

        This command expects a file with URLs to be recalculated on each line. Enter a single URL on each line of the file.

        There should be no output in wsadmin console. Be sure to check logs as URLs that were not successfully updated will be logged.

        Example:

        ```
        UrlService.reprocessIntranetAddressBatch(/opt/test.txt")
        ```

    UrlService.reprocessIntranetAddresses\(\)
    :   This command should be used if there have been no major changes to the network topology and the only goal is to process an update to the configured intranet IP ranges.

        This command reprocesses the intranet status of all Bookmarks URLs by comparing a locally cached version of its IP address to the intranet IP ranges provided in the Bookmarks cell-level configuration document.

        This command is much quicker than UrlService.recalculateIPAddresses , which not only checks the current intranet settings but also regathers the IP address for every URL in the database.

        There should be no output in wsadmin console. Be sure to check logs as URLs that were not successfully updated will be logged.

        Example:

        ```
        UrlService.reprocessIntranetAddresses()
        ```

    UrlService.recalculateIPAddress\('\[href\]'\)
    :   \[href\] is exact URL whose intranet range is to be recalculated.

        Example Usage:

        ```
        UrlService.recalculateIPAddress('http://www.ibm.com') 
        ```

        Note: If you are only re-validating the intranet status of URLs because of a change to intranet IP tables, then UrlService.reprocessIntranetAddress\('\[href\]'\) should be invoked.

        There should be no output in wsadmin console if successful.

        Example:

        ```
        UrlService.recalculateIPAddress("http://www.ibm.com")
        ```

    UrlService.recalculateIPAddressesBatch\('\[fileName\]'\)
    :   \[fileName\] is the name of the file containing URLs to be recalculated.

        This command expects a file with the URLs to be recalculated on each line. Enter a single URL on each line of the file.

        Note: If you are only re-validating the intranet status of URLs because of a change to intranet IP tables, then UrlService.reprocessIntranetAddressesBatch\('\[fileName\]'\) should be invoked.

        There should be no output in wsadmin console. Be sure to check logs as URLs that were not successfully updated will be logged.

        Example:

        ```
        UrlService.recalculateIPAddressesBatch("c:/Bookmarks/recalc.txt")
        ```

    UrlService.recalculateIPAddresses\(\)
    :   This command recalculates the IP addresses of all the URLs in the database. It works by updating the locally cached copy of the IP address for each URL.

        Running this command can be time consuming for large sized databases. For each URL in the database, this command will connect to and validate the IP address from the DNS. It takes an average of 8 minutes per 500 URLs, depending on the speed of the network connection.

        If you are simply re-validating the intranet status of URLs because of a change to intranet IP tables, use the UrlService.reprocessIntranetAddresses\(\) command to speed the process.

        There should be no output in wsadmin console. Be sure to check logs as URLs that were not successfully updated will be logged.

        Example:

        ```
        UrlService.recalculateIPAddresses()
        ```

    UrlService.notifyBrokenURLOwners\('<broken\_URL\>', '<replace\_URL\>'\)
    :   This command will find all owners of a single URL and send them an email notification. Optionally, you can supply a <replace\_URL\> as the suggested substitute URL for the broken URL.

        \[broken\_URL\] is a plain text string that represents the broken URL.

        \[replace\_URL\] is a plain text string that is the suggested substitute URL for the broken URL.

        Example:

        ```
        wsadmin>UrlService.notifyBrokenURLOwners('http://www.example.com','http://w3.example2.com') 
        ```

        This command will find all users who bookmarked http://www.example.com \(either public or private bookmarks\) and send them email notifications. In the notification, it will suggest that bookmark owners replace the old URL with the new one http://www.example2.com.

    UrlService.batchNotifyBrokenURLOwners\('<repository\_file\>'\)
    :   This command will iterate all the broken URL and substitute URL pairs in the given <repository\_file\> and send email notifications to all the bookmark owners of the broken URLs in the file. In the notification, you can provide the corresponding <replace\_URL\> as the suggested substitute URL for the broken URL.

        \[repository\_file\] is a local file path that contains the broken URLs and their suggested substitute URLs. Each pair of original URL and substitute URL should be placed in one line and separated by either white spaces or tabs.

        Example:

        ```
        UrlService.batchNotifyBrokenURLOwners('c:/brokenurls.txt') 
        ```

        This command will load the URL pairs in c:\\brokenurls.txt and send email notifications to users who bookmarked those URLs. For each broken URL, Bookmarks will send an email notification.

    UrlService.replaceURLWithURL\('original\_URL\_str', 'replace\_URL\_str', 'log\_file'\)
    :   Specify a single URL and a replacement URL and make an immediate update. Specify the URL to be replaced and a string that specifies the replacement URL.

    :   Enter a local file path for the log file that is used to log any messages that result from running the command. The file will be created if it does not exist; otherwise, new log data is appended to the data in the existing file.

    :   The exact match command finds the bookmarks with the specified URL and updates them to the specified replacement URL. The command runs immediately. Example:

        ```
        UrlService.replaceURLWithURL('http://www.mysite.com', 'http://www.mycompany.com', 'c:\\log.txt')  
        ```

    UrlService.findURLsToReplace\('<base\>', '<URL\_pattern\>', '<replace\_str\>', '<output\_file\>', '<log\_file\>'\)
    :   Use a pattern with wildcards to find and replace multiple URLs. The URLs that match the pattern are written to a file, along with the specified replacement URL. Log messages are printed to c:\\log.txt. Once you verify the pairs, you run a second command to upload the file and perform the updates.

    :   This command scans the Bookmarks database to URLs with associated bookmarks that match the given <URL\_pattern\> and then calculates the replacement URLs based on the <replace\_str\>. The command does not update the matched URLs in the Bookmarks. Scan results are saved in <output\_file\> so you can check the matched URLs and their replacement URLs to verify that the pairs are what you want. If not, you can manually edit the file to add, remove, or update the URL pairs. The command runs as a backend task in the system

    :   Example:

        ```
        UrlService.findURLsToReplace('mycompany', 'w3/.mycompany/.com', 'www.mycompany.com', 'c:/output.txt', 'c:/log.txt') 
        ```

        This command scans all URLs containing the string 'mycompany' and matches them against the regular expression pattern "w3/.mycompany/.com". The "w3.mycompany.com" in the matching URLs will be replaced by "www.mycompany.com". The matched URLs and the replacement URLs are printed into c:\\output.txt file. Log messages are printed to c:\\log.txt.

    UrlService.replaceURLs\('<input\_file\>', '<log\_file\>'\)
    :   Upload a file containing URLs to find and the replacement URLs. Parameters: original\_URL\_str A plain text string that specifies the URL to be replaced. You can use the output file of the findURLsToReplace command as the input here. URLs are updated unless a bookmark for the replacement URL already exists. Those are skipped to avoid creating duplicate bookmarks. Log messages are printed to c:\\log.txt.

    :   For example:

        ```
        UrlService.replaceURLs('c:/output.txt','c:/log.txt')
        
        ```

    :   This command loads the URL pairs in the file c:\\output.txt and updates all the bookmarks on the specified original URLs to the replacement URLs. Log messages are printed to c:\\log.txt.


**Parent topic:**[Running Bookmarks administrative commands](../admin/t_admin_dogear_changing_admin.md)

**Related information**  


[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)

