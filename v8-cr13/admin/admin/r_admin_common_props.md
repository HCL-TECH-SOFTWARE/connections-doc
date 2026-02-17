# Common configuration properties {#r_admin_common_props .reference}

Common configuration properties for HCL Connections are stored in the LotusConnections-config.xml file. The properties are represented as XML elements.

## Changing property values { .section}

You can change the values of the properties in either one of the following ways:

-   Use the updateConfig command in the wsadmin client. When you use the wsadmin client to edit a property value, the changes are validated. Any errors are notified so that you can correct them before you save the file. For more information, see the *Properties that you can edit by using the wsadmin client* topic.

    !!! rememeber 
        
        Not all properties can be edited with the wsadmin client. The values of such properties must be changed by editing the configuration file directly. To display all the properties that can be edited with the wsadmin client, use the showConfig wsadmin command.

-   Edit the configuration file by using a text editor. You still must use the checkOutConfig wsadmin command to check out the configuration file and the checkInConfig wsadmin command to check the file back in. When you check in the file, validation runs on the edited file and you are informed if you introduced any errors. Fix any errors, save the file, and try to check it in again.

    !!! note
    
        This method of editing properties is more error-prone than using the wsadmin client because you might inadvertently edit other content in the file.



-   **[Properties that you can edit by using the wsadmin client](../admin/r_admin_common_props_wsadmin.md)**  
Common configuration properties for HCL Connections that you can change by using the wsadmin client.
-   **[Properties that you can change only by editing the XML file](../admin/r_admin_common_props_edit-xml.md)**  
Common configuration properties for HCL Connections that you can change only by manually editing the LotusConnections-config.xml file.

**Parent topic:**[Changing common configuration property values](../admin/t_admin_common_changing_config.md)

**Related information**  


[Using Profiles and Communities business cards](../customize/c_admin_profiles_biz_cards.md)

[Troubleshooting inter-server communication](../troubleshoot/t_troubleshooting_server_communication.md)

