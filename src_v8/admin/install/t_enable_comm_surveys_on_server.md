# Enabling Community Surveys on the Community Surveys server {#t_enable_comm_surveys_on_server .task}

You enable the Community Surveys feature by copying the files provided to the extension directory on the Community Surveys server, and then editing the Connections configuration file.

Make sure you complete steps 1 through 3 in the following procedure before you do step 4.

1.  Unzip the file ibm.nitro.integrations.connections.packaging-buildNumber.zip, and copy all extracted files into the Community Surveys server extension directory. By default, the directory is as follows:

    -   Windows: C:\\HCL\\Forms\\extensions
    -   Linux and AIX: /opt/HCL/Forms/extensions
2.  Edit the Connections\_config.properties file in the extension directory, to add the following two entries:

    ibm.nitro.integrations.connections.Config.communityRoot = <Community root URL\>.

    ibm.nitro.integrations.connections.Config.authAlias = <connectionsAdmin\>

3.  Replace <Community root URL\> with the base URL for HCL Connections Communities, for example, http://connectionsserver/communities.

4.  Replace <connectionsAdmin\> with The J2C authentication alias that handles Connections application-to-application communication, for example, connectionsAdmin.

5.  Switch to theprofile\_root/installedApps/cellname/Community Surveys.ear/builder.war/WEB-INF/classes directory and edit the fsp.properties file and add the following entry where the path should match the actual install location \(default install value shown\).

    **Note:** The following double backslashes are needed for Windows to encode the slash.

    Windows:

    ```
    extensions = C:\\HCL\\Forms\\extensions
    ```

    Linux and AIX:

    ```
    extensions = /opt/HCL/Forms/extensions
    ```

6.  In a cluster topology, make sure all of the nodes are synchronized and restart the servers.


**Parent topic:**[Surveys in HCL Connections communities](../install/conn_work_connections.md)

