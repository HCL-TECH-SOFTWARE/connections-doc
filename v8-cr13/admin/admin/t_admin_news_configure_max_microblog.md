# Specifying the maximum size for microblogs {#t_admin_news_configure_max_microblog .task}

Edit settings in the news-config.xml file to set the maximum size of microblogs in your deployment.

To edit configuration files, you must use the WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can control the size of microblog data in your deployment by specifying the maximum number of characters allowed for entries and comments in the news-config.xml file.

1.  To specify microblog settings, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the News Jython script interpreter.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the News cell-level configuration file using the following command:

        NewsCellConfig.checkOutConfig\("working\_dir", "cellName"\)

        where:

        -   working\_dir is the temporary directory to which you want to check out the cell-level configuration file. This directory must exist on the server where you are running wsadmin.

            **Note:** Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cellName is the name of the cell that the home page node belongs to. This argument is required. It is also case-sensitive, so type it with care. If you do not know the cell name, type the following command in the wsadmin command processor to determine it:

            print AdminControl.getCell\(\)

        For example:

        ```
        NewsCellConfig.checkOutConfig("d:/temp", "NewsServerNode01Cell")
        
        ```

        The command displays this message:

        ```
        News Cell Level configuration file successfully checked out.
        ```

4.  Open news-config.xml in a text editor.

5.  Locate the <microblogging settings\> section of the file and update the following lines as needed.

    -   ```
<microblogEntryMaxChars>1000</microblogEntryMaxChars>
```

        Specifies the maximum number of characters allowed for microblog entries. The default value is 1000.

    -   ```
<microblogCommentMaxChars>1000</microblogCommentMaxChars>
```

        Specifies the maximum number of characters allowed for microblog comments. The default value is 1000.

6.  Save your changes to the news-config.xml file.

7.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in the News repository* for information about how to save and apply your changes.


**Parent topic:**[Administering microblogs](../admin/c_admin_news_microblogs.md)

**Related information**  


[Applying property changes in the News repository](../admin/t_admin_news_apply_property_changes.md)

