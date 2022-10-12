# Setting allowed ECM servers {#settingallowedecmservers .task}

Set a list of specific Enterprise Content Management \(ECM\) servers that Linked Library widgets can connect with.

Without a set list of servers, users must type the URL of the ECM server to connect to when they create a Linked Library widget. After setting a list of allowed servers, users can select from a dropdown list of servers.

1.  Perform the following steps to create a list of allowed ECM servers:
2.  Check out widgets-config.xml. See *Using the widgets-config.xml file for Communities*.

3.  In the CustomLibrary widget definition add the following tags to the <itemSet\>:

    ```
    <item name="allowCustomServers" value="false"/>
    <item name="allowedHosts" value=" http://ecm.server.com:9080, http://ecm.server2.com:9080"/>
    ```

    Where allowCustomServers must be set to false and allowedHosts is a comma separated list of Filenet or Content Manager ECM servers.

4.  Check in widgets-config.xml. For more information, see *Using the widgets-config.xml file for Communities*.

5.  Restart the Communities application.

6.  Add each ECM server to the library widget proxy. For more information, see *Configuring the library widget proxy*


**Related information**  


[Using the widgets-config.xml file for Communities](../admin/t_admin_communities_use_widgets_config.md)

[Configuring the library widget proxy](../secure/t_admin_communities_library_proxy.md)

