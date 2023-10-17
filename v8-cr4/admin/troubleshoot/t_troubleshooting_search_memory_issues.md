# Troubleshooting Search-related memory issues {#t_troubleshooting_search_memory_issues .task}

You can configure settings in the LotusConnections-config.xml file to avoid out-of-memory issues or other problems caused by long response times from the Search application.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

In a heavily-loaded environment or when HCL Connections™ is deployed in an environment with inadequate hardware, the applications that use Search can get blocked while waiting for search results. They can also run out of memory if the Search application is overloaded with hanging threads or transactions that have not completed.

Connections provides two counters that ensure that the applications using Search do not get blocked, and that they can resume normal behavior without administrative intervention once the Search application is operating properly again. These two counters act as a mechanism to determine if the Search server is able to accept new connections.

Active transactions counter
:   Counts the number of active transactions that are waiting for a response from the Search server.

Queue counter
:   Counts the number of active transactions that are queuing to connect to the Search server.

**Note:** These counters only work when the Search application is installed on a different server from the Connections applications.

The active transactions counter allows a specified number of active transactions to wait for a response from the Search server. For example, if the limit is set to 20, when 20 active transactions are waiting for a response from the Search server, any subsequent attempts to connect to the server are placed in a queue. If the queue counter is not equal to the value defined in the LotusConnections-config.xml configuration file, the connection to the Search server is rejected. If the queue counter is equal to the value set in the configuration file, a connection to the server is allowed. If the Search server returns data without an timeout exception being returned to the application, the queue counter is reset to 0.

You can set the limits allowed by the active transactions counter and the queue counter by configuring settings in the LotusConnections-config.xml file.

1.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  Use the wsadmin client to access and check out the Connections configuration files:

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
            -   Linux only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

3.  Open the LotusConnections-config.xml in a text editor.

4.  Update the number of active transactions allowed by the active transactions counter by changing the value of the Transaction\_Max property.

    For example:

    ```
    <attribute key="Transaction_Max" value = 20>
    ```

5.  Update the number of active transactions allowed to queue by the queue counter by changing the value of the Queue\_Max property.

    For example:

    ```
    <attribute key="Queue_Max" value = 10>
    ```

6.  Save your changes and then check the configuration files back in using the following command:

    LCConfigService.checkInConfig\(\)

    **Note:** You must run the checkin during the same wsadmin session in which you ran the checkout command.

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop and restart all of the Connections application servers.


**Parent topic:**[Troubleshooting Search](../troubleshoot/c_ts_search.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

