# Synchronizing News data with other applications {#t_admin_homepage_sync_news_data .task}

Edit settings in the news-config.xml file to define the interval at which data from the HCL Connections applications is synchronized with the News repository.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

To ensure that the information received by the News repository is analyzed correctly, News maintains a list of colleagues for each user. The list of colleagues is synchronized from the HCL Connections Profiles application. The interval at which data is synchronized is specified using the frequencyInHours setting. By default, the synchronization is set to take place every 24 hours.

1.  To configure the data synchronization task, complete the following steps.
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

5.  Locate the section containing the dataSynchronization task and make the necessary changes.

    For example, the following code specifies that data is synchronized between the News repository and the HCL Connections applications every 24 hours. The information is copied over only if it hasn't been copied already in the last 24 hours.

    ```
    <dataSynchronization>
      <frequencyInHours>24</frequencyInHours>
    </dataSynchronization>
    ```

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in the News repository* for information about how to save and apply your changes.


**Parent topic:**[Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[Applying property changes in the News repository](../admin/t_admin_news_apply_property_changes.md)

[Accessing the News configuration file](../admin/t_admin_homepage_access_news_config.md)

