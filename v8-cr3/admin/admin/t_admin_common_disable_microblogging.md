# Disabling microblogging {#t_admin_common_disable_microblogging .task}

You can remove microblogging functionality from your deployment by disabling the microblogging service reference in the LotusConnections-config.xml file. Microblogging is enabled by default in HCL Connections.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Disabling the microblogging service in the LotusConnections-config.xml file automatically removes all the features provided by the service. The options that enable users to post status updates are removed from the product user interface, and the indexing process associated with the microblogging service is also disabled.

When you disable microblogging:

-   Users cannot post status updates in HCL Connections
-   Users cannot post messages to other users' profiles or to communities
-   Status updates cannot be searched from the Search user interface

**Note:** Existing status updates are not removed from the user interface, and are still visible in the Home page, Profiles, and Communities applications.

1.  To disable microblogging in your deployment, complete the following steps.
2.  Use the wsadmin client to access and check out the HCL Connections configuration files:

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

3.  If you want to find out the current value of a property, you can list the current configuration settings and values by using the following command:

    LCConfigService.showConfig\(\)

4.  To disable microblogging capabilities across HCL Connections, enter the following command:

    ```
    LCConfigService.updateConfig("microblogging.enabled","false")
    ```


Check the configuration files back in during the same wsadmin session in which you checked them out. For more information, see the *Applying common configuration property changes* topic.

**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

**Related information**  


[Administering microblogs](../admin/c_admin_news_microblogs.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

