# Adding Sametime awareness through the Sametime server {#t_admin_common_add_st_awareness_via_proxy .task}

If an Sametime® Proxy server is configured in your enterprise and the Profiles application is deployed, you can enable presence awareness and simple chats in HCL Connections.

The following software must be enabled before you add presence awareness to HCL Connections:

-   Domino® Server 8.5 or later

    Refer to [Installing and setting up Domino servers](https://help.hcltechsw.com/domino/11.0.0/inst_dominoserverinstallation_c.html).

-   Sametime 8.5.2 Interim Feature Release 1 or later, with the Sametime System Console, Sametime Community Server, and Sametime Proxy Server components.

Complete the following procedures before enabling awareness.

-   Enable single sign-on between the Domino environment and the HCL Connections server. For more information, see [Enabling single sign-on for Domino](../secure/t_secure_domino.md).

When you enable presence awareness by using the Sametime Proxy server, a person's online status is indicated by a set of icons and an associated status message that is available from the person's profile and business card. Presence awareness tells you whether the person is available to chat, busy in a meeting, or away from their computer. In addition to seeing a person's availability, you can carry on a chat with that person even when no Sametime client is installed.

**Encrypted connection support**: If you configure the product to send encrypted traffic, presence awareness can be retrieved as an encrypted connection. For more information about enabling encrypted connections for Sametime, refer to the documentation provided with the Sametime SDK, which is available from the following web site: [http://www.ibm.com/developerworks/lotus/downloads/toolkits.html](http://www.ibm.com/developerworks/lotus/downloads/toolkits.html)

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Use the wsadmin client to access and check out the HCL Connections extension configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out the LotusConnections-config.xml file:

        ```
        LCConfigService.checkOutConfig("working\_directory","cell\_name")
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you change them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

            AIX and Linux: The directory must grant write permissions or the command does not run successfully.

        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the IBM Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, type the following command while in the wsadmin command processor:print AdminControl.getCell\(\)
        For example:

        -   AIX or Linux:LCConfigService.checkOutConfig\("/opt/temp","foo01Cell01"\)
        -   Microsoft Windows:LCConfigService.checkOutConfig\("c:/temp","foo01Cell01"\)
3.  From the directory you specified as the working directory in the previous step, open the LotusConnections-config.xml file in a text editor, and then find the `sametimeProxy service` section:

    ```
    <sloc:serviceReference enabled="false" isConnectClient="false" serviceName="sametimeProxy" ssl_enabled="false">
    <sloc:href><sloc:hrefPathPrefix/>
    <sloc:static href="admin_replace" ssl_href="admin_replace"/>
    <sloc:interService href="admin_replace"/>
    </sloc:href>
    </sloc:serviceReference>
    ```

4.  Specify the attributes according to the following example:

    ```
    <sloc:serviceReference enabled="true" isConnectClient="false" serviceName="sametimeProxy" ssl_enabled="true">
    <sloc:href><sloc:hrefPathPrefix/>
    <sloc:static href="http://sametimeProxyServer.enterprise.example.com" 
    ssl_href="https://sametimeProxyServer.enterprise.example.com:9444"/>
    <sloc:interService href="https://sametimeProxyServer.enterprise.example.com:9444"/>
    </sloc:href>
    </sloc:serviceReference>
    ```

    Where:

    -   `sloc:serviceReference enabled="true"` displays the Sametime action bar in Connections and connects to Sametime using the specified Sametime Proxy server.
    -   `ssl_enabled="true"` connects to the Sametime proxy server on the secure port.
    -   `isConnectClient="false"` automatically connects to the Sametime Proxy Server rather than using the UIM client.
5.  If your Connections environment is configured to a reverse proxy but the Sametime server is not, or if `dynamicHosts` is enabled in the LotusConnections-config.xml, add the isExternal attribute to the configuration as shown in following example. The isExternal attribute is set so that the Sametime proxy server URLs are not overwritten by the dynamic host URLs.

    ```
    <sloc:serviceReference enabled="true" isConnectClient="false" serviceName="sametimeProxy" ssl_enabled="true">
    <sloc:href> <sloc:hrefPathPrefix/> 
    <sloc:static href="http://sametimeProxyServer.enterprise.example.com" 
    ssl_href="https://sametimeProxyServer.enterprise.example.com:9444" **isExternal="true"**/> 
    <sloc:interService href="https://sametimeProxyServer.enterprise.example.com:9444"/> 
    </sloc:href>
    </sloc:serviceReference>
    ```

6.  Save and close the LotusConnections-config.xml file.

7.  To check in the changed configuration files, use the following command:

    ```
    LCConfigService.checkInConfig(working\_directory,cell\_name)
    ```

8.  Type the following command to deploy the changes:

    ```
    synchAllNodes()
    ```

9.  To exit the wsadmin client, type `exit` at the prompt.

10. Stop and restart all of the HCL Connections application servers.

11. Confirm that this procedure worked by accessing one of the Connections applications, and then opening a person's business card. It might take a few seconds for the person's presence information to display the first time. If you can start a chat with the person, then enabling awareness through the proxy server was successfully completed.


**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

