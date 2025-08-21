# Troubleshooting inter-server communication {#t_troubleshooting_server_communication .task}

If you are having problems establishing communication between servers in your deployment, this might be because a server's URL is not configured correctly in the LotusConnections-config.xml file.

To edit configuration files, you must use the HCL WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)\# for details.

You must ensure that the LotusConnections-config.xml file contains the fully qualified DNS name of the host server for each of the HCL Connections™ applications, and that it matches the domain name in the self-signed certificate used by the host server. This information is particularly important for inter-service processing tasks. For example, if a server's domain name is not configured correctly, problems might occur when a Search indexing task is executing and it attempts to crawl the specified target application's' secured seedlists. For more information, see the following web page: [Troubleshooting security configurations](https://www.ibm.com/docs/was-nd/8.5.5?topic=environment-troubleshooting-security-configurations) in the IBM WebSphere Application Server Network Deployment documentation.

1.  To configure an inter-service URL for one of the Connections application servers:
2.  Use the wsadmin client to access and check out the Connections configuration files:

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
            -   Linux® only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

3.  If you want to find out the current value of a property, you can list the current configuration settings and values by using the following command:

    LCConfigService.showConfig\(\)

4.  Use the following command to replace the IP address for the specified host server with the fully-qualified DNS name or short DNS name for the server.

    ```
    LCConfigService.updateConfig("property","value")
    ```

    where property is one of the following:

    -   application\_name.href
    -   application\_name.ssl.href
    -   application\_name.interService.href
    and value is the full DNS name for the specified host server.

    For example:

    ```
    LCConfigService.updateConfig("dogear.ssl.href", "https://connwin1.dyn.example.com:9443")
    ```

    See [Common configuration properties](../admin/r_admin_common_props.md) for a complete list of editable properties.

5.  Save your changes and then check the configuration files back in using the following command:

    LCConfigService.checkInConfig\(\)

    **Note:** You must run the checkin during the same wsadmin session in which you ran the checkout command.

6.  To exit the wsadmin client, type exit at the prompt.

7.  Stop and restart all of the Connections application servers.


**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

**Related information**  


[Common configuration properties](../admin/r_admin_common_props.md)

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

