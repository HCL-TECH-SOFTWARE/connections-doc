# Embedding Connections in an IFrame {#t_customize_connections_iframe .task}

You can customize HCL Connections to be embedded in an IFrame.

Connections includes a framekiller script in the header to prevent inclusion of the application into an IFrame hosted in another domain. The script resets the location of the top-level window to the URL of the embedded Connections application. The script is included by using a JSP tag.

1.  Complete the following steps to embed Connections in an IFrame.
2.  Obtain a copy of header.jsp and login.jsp from any of the Connections enterprise applications. For example:

    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/<cell\_name\>/<application\>.ear/<app\>.war/nav/templates

3.  Open the file to edit. Locate the following JSP tag and remove it or comment it out. For more information, see the JavaServer Pages tag syntax. Example:

    ```
    <%--     
    The following code is to avoid application vulnerable to UI redressing attacks.    
    It is not allowed to put the application into frame by default. Remove it if customer needs.
          --%<lc-ui:framekiller /<%-- 
    ```

4.  Save the changes.


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

