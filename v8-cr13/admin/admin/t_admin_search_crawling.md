# Avoiding unnecessary full search crawls {#administeringsearch .task}

Use an administrative command to avoid performance hits by avoiding unnecessary full search crawls.

HCL Connections keeps records of deleted files. The seedlistSettings.maximumIncrementalQuerySpanInDays property in the LotusConnections-config.xml configuration file specifies the number of days for which these records are saved before they are deleted. The records can be deleted by the SearchClearDeletionHistory task after the number of days that are specified by the property.

You can avoid performance hits by making sure that deletion records are kept long enough to be read by the incremental search crawler. The incremental search crawler needs these deletion records to update the Search index. If the records are deleted before the incremental crawler reads them, updates will be incomplete. When the updates are incomplete, HCL Connections performs a full crawl instead of an incremental crawl. Full crawls delete the existing Search index and create a new one, which is more time-consuming than incremental crawls. To avoid frequent full crawls, make sure that the value of the seedlistSettings.maximumIncrementalQuerySpanInDays property is higher than the span of days between incremental crawls. For example, if incremental crawls happen every four days, ensure that the property value is higher than 4. This setting ensures that incremental crawls capture all deletion records. By default the Search crawling task runs every 15 minutes.

Incremental crawls must be left at the default schedule.

1.  To avoid unnecessary full-search crawls, complete the following steps.
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

4.  Enter the following command:

    ```
    LCConfigService.updateConfig("seedlistSettings.maximumIncrementalQuerySpanInDays",number\_days)
    ```

    Where number\_days is a number greater than or equal to 1 and less than or equal to 30.


Check the configuration files back in during the same wsadmin session in which you checked them out. For more information, see the *Applying common configuration property changes* topic.

**Parent topic:**[Managing the Search application](../admin/c_admin_manage_search.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

