# Renaming the My Organization communities view {#administeringsearch .task}

You can update a property in the HCL Connections configuration file to change the organization name that displays for your communities.

To make community names more representative of your organization, use the organization.name property in the LotusConnections-config.xml configuration file to customize the organization name. The organization name appears in the My Organization Communities view and in search results. If you leave organization.name unchanged, then **My Organization Communities** is displayed in the communities view and in search results.

1.  To rename the My Organization Communities view, complete the following steps.
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
    LCConfigService.updateConfig("organization.name","Widgets International")
    
    ```

    Change "Widgets International" to reflect your organization.


Check the configuration files back in during the same wsadmin session in which you checked them out. For more information, see the *Applying common configuration property changes* topic.

**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

