# Disabling the social analytics service {#t_admin_common_disable_sand .task}

The social analytics widgets help users to discover how they are connected to other users and content, and suggest network contacts and content that might interest them. The social analytics service is enabled by default.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Disabling the social analytics service automatically removes all the features provided by the service, including the social analytics widgets that are available in Profiles, Communities, and the Home page. The indexing process associated with the social analytics service is also disabled.

When you disable the social analytics service, the following widgets are removed from the user interface:

-   Do You Know \(Profiles\)
-   Recommendations \(Communities\)
-   Recommendations \(Home page\)
-   Who Connects Us? \(Profiles\)
-   Things in Common \(Profiles\)

You disable the social analytics service by using wsadmin commands to set the sand.enabled and sand.ssl.enabled properties in the LotusConnections-config.xml file to false. For more information about changing common configuration properties, see *Changing common configuration property values*.

```
<sloc:serviceReference serviceName="sand" 
        enabled="false"
        ssl_enabled="false">
        <sloc:href>
            <sloc:hrefPathPrefix>/news/common/sand</sloc:hrefPathPrefix>
        <sloc:static href="admin_replace" ssl_href="admin_replace"/>
        </sloc:href>
    </sloc:serviceReference>
```

1.  To disable the social analytics service, complete the following steps.
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

4.  To disable the social analytic service, enter the following commands:

    ```
    LCConfigService.updateConfig("sand.enabled","false")
    LCConfigService.updateConfig("sand.ssl.enabled","false")
    ```


Check the configuration files back in during the same wsadmin session in which you checked them out. For more information, see the *Applying common configuration property changes* topic.

**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

**Related information**  


[Excluding specific users from the social analytics service](../admin/t_admin_search_disable_sand_per_user.md)

