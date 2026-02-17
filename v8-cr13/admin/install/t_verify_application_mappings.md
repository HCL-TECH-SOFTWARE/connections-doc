# Verifying application mappings {#verify_application_mappings .task}

Complete this task only if you did not select to configure IBM® HTTP Server during the installation HCL Connections.

If you installed and configured IBM HTTP Server after you have installed HCL Connections, your HCL Connections applications are automatically mapped to the web server. However, if you installed and configured IBM HTTP Server before you installed HCL Connections, you must manually map the applications.

To verify whether the mappings exist, complete the following steps:

1.  From the WebSphere® Application Server Integrated Solutions Console, select **Servers** \> **Server Types** \> **Web servers** and then click the web server \(webserver1\).

2.  Click **Generate Plug-in**.

3.  Click your web server again and then click **Propagate Plug-in**.

    **Note:** If you have trouble propagating the plug-in on Linux™, restart IBM HTTP Server using the following commands:

    ```
     ./adminctl start
     ./apachectl -k stop
     ./apachectl -k start
    
    ```

4.  Wait until a confirmation message is displayed; for example:

    ```
    PLGC0062I: The plug-in configuration file is propagated from /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/servernameCell01/nodes/webserver1/servers/webserver1/plugin-cfg.xml to /opt/IBM/HTTPServer/Plugins/config/webserver1/plugin-cfg.xml.
    ```

    The message identifies where the plugin-cfg.xml file is on the system that hosts IBM HTTP Server. In this example, the file path is: /opt/IBM/HTTPServer/Plugins/config/webserver1/plugin-cfg.xml.

5.  Log on to the system that hosts IBM HTTP Server and open the plugin-cfg.xml file.

6.  Verify that the URIs for the installed HCL Connections applications are present. For example:

    ```
    <UriGroup Name="default_host_Cluster1_URIs">      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/activities/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/activities/quickrpicker/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/communities/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/communities/calendar/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/communities/recomm/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/forums/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/metrics/service/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/metrics/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/profiles/*"/>      
    <Uri AffinityCookie="JSESSIONID" AffinityURLIdentifier="jsessionid" Name="/profiles/seedlist/*"/>   
    </UriGroup>
    ```

    If the HCL Connections URIs are not present, complete the steps in the [Mapping applications to IBM HTTP Server](t_map_apps2ihs.md) topic.


**Parent topic:**[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

**Previous topic:**[Mapping applications to IBM HTTP Server](../install/t_map_apps2ihs.md)

**Next topic:**[Editing the XML configuration file](../install/t_editing_xml_config_file.md)

