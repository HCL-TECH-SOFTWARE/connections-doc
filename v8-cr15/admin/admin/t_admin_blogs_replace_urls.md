# Replacing URLs in Blogs {#t_admin_blogs_replace_URLs .task}

Run a command to replace URLs in your Blogs deployment to correct broken links.

.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

There are cases where a collection of URLs in a Blogs deployment will break. For example, if a user changes from one deployment to another and the host name changes from lc95.cn.ibm.com to lc96.cn.ibm.com, all the URLs that use the form http://lc95.cn.ibm.com/xxx will break. Use this command to update URLs in the following places:

-   Entry and comment content, including the URL for an image source, links to web pages, and video sources.
-   Trackback URLs in comments.
-   Links in the content of an autosaved entry or comment.

1.  Start the wsadmin client following the steps in *Administering Blogs using the wsadmin Client*.

2.  Start the Blogs Jython script interpreter by entering the following command:

    ```
    execfile("blogsAdmin.py")
    ```

3.  Run the following command to fix broken URLs in entries and comments:

    ```
    BlogsAdminService.fixBrokenUrls(<replacePattern>, <replaceValue>)
    ```

    where<replacePattern\> is the pattern of the part of the URLs that need to be replaced, and wherereplaceValue is the string to correct the URLs.

    For example:

    ```
     BlogsAdminService.fixBrokenUrls("http://example.com:9082/blogs" 
    "http://example.com:9080/blogs")
    ```

    changes URLs with the form http://example.com:9082/blogs/xxx to http://example.com:9080/blogs/xxx.

    **Note:** The <replacePattern\> URL can contain a wildcard character \(\*\). For example,

    ```
    BlogsAdminService.fixBrokenUrls
       ("https://<server\>/static/roller-ui/scripts/.*/ckeditor/plugins/
       sametimeemoticons/images/", "https://<server\>/connections/resources/
       web/com.ibm.oneui.ckeditor/editor/plugins/sametimeemoticons/images/")
    ```


A status message indicates the number of URLs replaced, but the number actually reflects the number of blog entries updated. For example, a blog entry that contains multiple URLS counts as one update.

Run this task twice: once for http URLs, and then again for https URLs.

**Parent topic:**[Administering Blogs using the wsadmin client](../admin/r_admin_blogs_wsadmin.md)

**Related information**  


[Changing application URLs](../admin/t_admin_common_change_context_root.md)

