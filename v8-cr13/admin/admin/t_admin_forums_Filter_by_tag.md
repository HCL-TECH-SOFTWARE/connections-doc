# Adding a feed for topics and replies {#t_admin_forums_filter_by_tag .task}

Add a property to the LotusConnections-config.xml file to add a feed that includes topics and the replies to the topics.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Configure Forums so that users can see topics and replies to the topics in a feed. You can edit configuration properties in LotusConnections-config.xml to add this capability.

1.  Create a directory \(referenced in this procedure as working\_directory\) to store the configuration files that you update. For example, on Windows create C:\\temp.

2.  Use the wsadmin client to access and check out the IBM® Connections configuration files:

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
            -   Linux® only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

3.  Open LotusConnections-config.xml in a text editor.

4.  Add the following property to LotusConnections-config.xml, before the closing tag for the file:

    ```
    
    <properties>
        <genericProperty name="forum.includeAllRepliesByTag">true</genericProperty> 
    </properties>
    
    ```

    **Note:** If the `<properties>` tag, is already present, add `genericProperty` to it.

5.  Save LotusConnections-config.xml.

6.  Stop the Forums Application in WebSphere Console.

7.  Update the version stamp in LotusConnectionsConfig.xml:

    ```
    LCConfigService.updateConfig("versionStamp","")
    ```

8.  Check in the configuration file during the same wsadmin session in which you checked it out for your configuration changes to take effect:

    ```
    LCConfigService.checkInConfig("working_directory","cell_name")
    ```

9.  Restart the Forums Application in WebSphere Console.


Forums will have an addition feed **Feed for these topics and their replies** that will also include replies to topics.

**Parent topic:**[Administering Forums](../admin/c_admin_forums_overview.md)

