# Enabling and disabling automatic generation of Profiles statistics files {#t_admin_profiles_configure_stats_disable .task}

You can enable or disable automatic generation of Profiles statistics files. By default, automatic generation is enabled.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Usage statistics are stored in memory and saved to the file system during Profiles shutdown. The statistics are saved to the location configured in the statistics.filePath and statistics.fileName files. The statistics logged depend on the Profiles capabilities that are enabled. For example, if you disable the full report-to chain cache, you do not see statistics listed for that capability.

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

3.  In the working\_directory from Step 2, locate and open the profiles-config.xml file using a text editor. Scroll to task StatsCollectorTask in the <scheduledTasks\> section.

    -   To disable auto generation of the statistics file, specify enabled="false" in the StatsCollectorTask statement.
    -   To enable auto generation of the statistics file, specify enabled="true" in the StatsCollectorTask statement.
    Example:

    ```
    <task name="StatsCollectorTask" interval="0 0 1 * * ?" enabled="false" type="internal" scope="local">
    <args>
    <property name="filePath">${PROFILES_STATS_DIR}//LC_NODE_NAME//${WAS_SERVER_NAME}</property>
    <property name="fileName">profilesStats</property>
    </args>
    </task> 
    ```

4.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Profiles* for information about how to save and apply your changes.


**Parent topic:**[Monitoring statistics and metrics for Profiles](../admin/c_admin_profiles_stats.md)

