# Registering the resource bundle to provide titles and descriptions for iWidget {#registeryourresourcebundletoprovidetitlesanddescriptionsforiwidget .task}

You must copy and register the resource bundle from Community Surveys to Connections.

1.  Extract the resource bundle ibm.nitro.integrations.connections.client-buildNumber.zip from the extracted software package.

2.  Copy the files that you extracted to the CONNECTIONS\_CUSTOMIZATION\_PATH/strings/ on the Connections server, where CONNECTIONS\_CUSTOMIZATION\_PATH could be found from **Environment** \> **WebSphere variables** in the WebSphere Application Server Integrated Solutions Console.

    For example, /opt/HCL/Connections/data/shared/customization/strings

    **Note:** Create the strings directory if it is not there.

3.  To register the resource bundle in the LotusConnections-config.xml file, open a command prompt and start the wsadmin command-line tool.

    For example, use the command ./wsadmin.sh -lang jython -user your wasadmin -password your password -port SOAP\_CONNECTOR\_ADDRESS\_PORT

4.  Enter the following command to access the Connections configuration file.

    ```
    execfile("$WAS\_HOME/profiles/DMGR/config/bin_lc_admin/connectionsConfig.py")
    ```

    Replace WAS\_HOME and DMGR with your WebSphere Application Server and deployment manager.

5.  Enter the following command to check out the Connections configuration file, LCConfigService.checkOutConfig\(working\_directory, cell\_name\), where working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you change them. Also cell\_name is the name of the WebSphere Application Server cell that hosts the Connections application. This argument is required and case-sensitive.

    For example, use the command, LCConfigService.checkOutConfig\("/opt", "localhostCell01"\).

6.  From the temporary directory to which you just checked out the configuration files, open the LotusConnections-config.xml file in a text editor.

7.  Add the following line of code into the `<resources>` element block to register the resource bundle.

    ```
    <widgetBundle prefix="formiwidget" name="ibm.nitro.integrations.connections.client.resources"/>
    ```

    `formiwidget` is a globally unique name that identifies the bundle. This is a string value. The bundle prefix is used to uniquely scope the keys in each bundle. The prefix must be unique across all registered widget bundles. This bundle prefix maps to the bundle ID reference that you specify when you define a custom resource attribute or widget. `ibm.nitro.integrations.connections.client` is the Java™ package name. This parameter takes a string value. The elements in the bundle name must correspond to the file name of the properties file for this resource bundle.

    For example, use the following code,

    ```
    <resources>
      	<!--  Example:  The attribute 'prefix' must be globally unique as it identifies the bundle when used in HCL Connections.  -->
    
    	<widgetBundle prefix="formiwidget" name="ibm.nitro.integrations.connections.client.resources"/>
    </resources>
    ```

8.  Save your changes to the LotusConnections-config.xml file.

9.  To check in the updated file, use the following command: LCConfigService.checkInConfig\(working\_directory, cell\_name\)

    For example, use the following command, LCConfigService.checkInConfig\("/opt", "localhostCell01"\)

10. To exit the wsadmin client, type exit at the prompt.

11. Restart the Common application by using the WebSphere Integrated Solutions Console.


**Parent topic:**[Surveys in HCL Connections communities](../install/conn_work_connections.md)

