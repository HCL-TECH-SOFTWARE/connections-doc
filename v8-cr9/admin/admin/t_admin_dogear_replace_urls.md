# Replacing URLs in bookmarks {#t_admin_dogear_replace_URLs .task}

Run a command to replace URLs in bookmarks to correct broken links.

.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

There may be times when you want to update the URLs for a collections of bookmarks. For example, when a web site changes its host name permanently, you will want to update all of the associated bookmarks with the new host name. For example, if http://site1.mycompany.com is changed to be http://site2.mycompany.com, run this replace URL command to update all bookmarks on http://site1.mycomapny.com.

The new URL may already be bookmarked by some users who also bookmarked the original URL. In those cases, you can not simply update the bookmark to the new URL as the Bookmarks application does not allow a user to have two or more valid bookmarks to the same URL. The IDs of those duplicated bookmarks will be saved to a file that you specify. You can either leave those duplicated bookmarks in the application or run LinkService.deleteLinkByURLBatch\('<file\>'\) to delete them from the application.

When you run this command you can replace URLs in the following ways:

-   Specify a single URL and a replacement URL and make an immediate update.
-   Use a pattern with wildcards to find and replace multiple URLs. The URLs that match the pattern are written to a file, along with the specified replacement URL. Once you verify the pairs, you run a second command to upload the file and perform the updates.
-   Upload a file containing URLs to find and the replacement URLs.

1.  See the topic *Running Bookmarks administrative commands* for information on using administrative commands.

2.  Use the following form for the UrlService command:

    ```
    UrlService.<command_name>(<parameters>)
    
    ```

3.  Run the following command to replace an existing URL with a new URL you specify:

    ```
    UrlService.replaceURLWithURL('original_URL_str', 'replace_URL_str', 'log_file')
    ```

    Parameters:

    original\_URL\_str
    :   A plain text string that specifies the URL to be replaced

    replace\_URL\_str
    :   A plain text string that specifies the replacement URL

    log\_file
    :   A local file path that is used to log any messages that result from running the command. The file will be created if it is not exist; otherwise, new log data is appended to the data in the existing file.

    The exact match command finds the bookmarks with the specified URL and updates them to the specified replacement URL. The command runs immediately.

    Example:

    ```
    wsadmin>UrlService.replaceURLWithURL('http://www.mysite.com', 'http://www.mycompany.com', 'c:\\log.txt') 
    ```

    This command searches for the URL ’http://www.mysite.com’ and replaces each instance with ’http://www.mycompany.com’. Log messages are printed to c:\\log.txt.

4.  To find URLs to replace and write them to a file, enter this command:

    ```
    UrlService.findURLsToReplace('<base>', '<URL_pattern>', '<replace_str>', '<output_file>', '<log_file>')
    ```

    Parameters:

    base
    :   Aplain text string that is used to limit the number of URLs to be scanned. Only those URLs containing <base\> string are scanned.

    URL\_pattern
    :   AJava-style regular expression that is used to match URLs

    replace\_str
    :   Plain text string that is used to replace the found pattern in the matched URL

    output\_file
    :   Local file path that is used to store the matched URLs and their replacement URLs. The file will be created if it does not exist and will be appended if it already exists.

    log\_file
    :   Local file path that is used to log any messages that result from running the command. The file will be created if it does not exist; otherwise, new log data is appended to the data in the existing file.

    This command scans the Bookmarks database to URLs with associated bookmarks that match the given <URL\_pattern\> and then calculates the replacement URLs based on the <replace\_str\>. The command does not update the matched URLs in the Bookmarks. Scan results are saved in <output\_file\> so you can check the matched URLs and their replacement URLs to verify that the pairs are what you want. If not, you can manually edit the file to add, remove, or update the URL pairs. The command runs as a backend task in the system

    Example:

    ```
    wsadmin>UrlService.findURLsToReplace('mycompany', 'w3\\.mycompany\\.com', 'www.mycompany.com', 'c:\\output.txt', 'c:\\log.txt') 
    ```

    This command scans all URLs containing the string 'mycompany' and matches them against the regular expression pattern "w3\\\\.mycompany\\\\.com". The "w3.mycompany.com" in the matching URLs will be replaced by "www.mycompany.com". The matched URLs and the replacement URLs are printed into c:\\output.txt file. Log messages are printed to c:\\log.txt.

5.  To replace the URLs based on the contents of a file, enter this command:

    ```
    UrlService.replaceURLs('<input_file>', '<log_file>')
    ```

    Parameters:

    input\_file
    :   A text file that specifies pairs of the URL to be replaced and the replacement URL.

    log\_file
    :   A local file path that is used to log any messages that result from running the command. The file will be created if it does not exist; otherwise, new log data is appended to the data in the existing file.

    Specify an input file which contains the original URLs and the replacement URLs. You can use the output file of the findURLsToReplace command as the input here. URLs are updated unless a bookmark for the replacement URL already exists. Those are skipped to avoid creating duplicate bookmarks. Log messages are printed to c:\\log.txt.

    Example:

    ```
    wsadmin>UrlService.replaceURLs('c:\\output.txt', 'c:\\log.txt')
    ```

    This command loads the URL pairs in the file c:\\output.txt and updates all the bookmarks on the specified original URLs to the replacement URLs. Log messages are printed to c:\\log.txt.


**Parent topic:**[Managing links](../admin/c_admin_dogear_manage_links.md)

