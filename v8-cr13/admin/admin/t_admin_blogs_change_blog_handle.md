# Changing the blog handle {#t_admin_blogs_change_blog_handle .task}

Run a command to change your blog handle. The blog handle displays in the URL for your blog.

.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Start the wsadmin client following the steps in *Administering Blogs using the wsadmin Client*.

2.  Start the Blogs Jython script interpreter by entering the following command:

    ```
    execfile("blogsAdmin.py")
    ```

3.  Run the following command to replace the blog handle:

    ```
    BlogsAdminService.renameWeblogHandle("<old_handle>", "<new_handle>")
    ```

    whereold\_handle is the blog handle that need to be replaced, and wherenew\_handle is the new handle for the blog.


**Parent topic:**[Administering Blogs using the wsadmin client](../admin/r_admin_blogs_wsadmin.md)

