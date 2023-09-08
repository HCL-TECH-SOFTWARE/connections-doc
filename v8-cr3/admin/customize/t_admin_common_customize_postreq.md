# Post-customization step {#t_admin_common_customize_postreq .task}

Edit a configuration property so users see your changes the next time they log in, without having to clear their web browser cache.

Perform this procedure if you made customization changes to the product user interface only.

**Note:** If you are changing a user interface feature that is not part of LCConfigService \(for example, enabling notification replies\), no action is needed because the changes are restricted to the server side.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

Each product web page downloads static script and style sheets that do not change often. To optimize performance, these pages are cached for extended periods of time so that users need to download them once per product upgrade. After you make customizations, you can instruct the server to ensure that all web browsers download new copies of these files. To force web browsers to refresh all cached content on the next visit, run the following command to update the product version stamp. The version stamp is automatically updated when you install any ifixes or major product version upgrades.

1.  Use the wsadmin client to access and check out the HCL Connections™ configuration files.

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

2.  Enter the following command to increment the value of the versionStamp property:

    **Note:** This command is required only when a change is made to the product user interface and the change is to a file checked out using LCConfigService.

    LCConfigService.updateConfig\("versionStamp","gmt\_timestamp"\) where gmt\_timestamp is the GMT time. You can specify an empty string for the time stamp or provide a GMT value string. When you specify an empty string, the client calculates the current GMT time and updates the version stamp with that value. If you choose to provide the time, specify it using the following format: `yyyyMMdd.HHmmss` and specify the time in GMT. It is best to provide an empty string and let the client format the time stamp. For example: LCConfigService.updateConfig\("versionStamp",""\).

3.  When you have made changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See [Applying common configuration property changes](../admin/t_admin_common_save_changes.md) for information about how to save and apply your changes.


**Parent topic:**[Customizing](../customize/c_customize_overview.md)

**Related information**  


[Files configuration properties](../admin/r_admin_files_config_properties2.md)

[Wikis configuration properties](../admin/r_admin_wikis_config_properties2.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

