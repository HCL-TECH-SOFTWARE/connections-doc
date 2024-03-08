# Enabling sync for files and folders {#t_admin_enabling_file_sync .task}

Enable sync for files and folders in the Files application. This feature enhances collaboration by allowing users to keep files and folders synchronized even when working offline.

Sync is available on the client by default, but is only visible when users connect to a site that also has sync enabled. Being able to synchronize files is dependent on the desktop plug-ins being installed on users' clients.

**Attention:** Sync should be configured before the desktop clients are configured. If sync is configured after the desktop client plug-ins, users will have to refresh their server configuration manually.

**Note:** Users can sync folders as well as files using My Drive. My Drive is available to users regardless of whether the file sync folder from a previous version of HCL Connections is available. When file sync is enabled, all files and folders in a user's My Drive will be synced to their My Drive folder on their desktop.

1.  To ensure that sync is enabled in Files, perform the following steps:
2.  Check out files-config.xml by following the first two steps described in [Changing Files configuration property values](t_admin_files_changing_config_properties.md).

3.  Locate the `fileSync` section in the files-config.xml file as follows:

    ```
    <fileSync enabled="true">
    <clientDownloadLink enabled="true" url="http://public.dhe.ibm.com/software/dw/ibm/connections/IBMConnectionsMSDesktop.zip">
    <clientPlatform enabled="true" id="win" url="http://public.dhe.ibm.com/software/dw/ibm/connections/IBMConnectionsMSDesktop.zip"/>
    <clientPlatform enabled="true" id="mac" url="http://public.dhe.ibm.com/software/dw/ibm/connections/IBMConnectionsMac.zip"/>
    </clientDownloadLink>
    <autoVersioning enabled="true"/>
    </fileSync>
    ```

    Where

    -   The `clientDownloadLink` URL must be the valid URL to download the file sync client.
    -   The `versioning` setting must be enabled.
    -   The `autoVersioning` setting must be enabled to avoid generating too many versions.
4.  Check in files-config.xml by following the first three steps described in [Applying Files property changes](t_admin_files_config_apply.md).

5.  Make sure the filesync-user alias is mapped to correct users as follows:

    1.  From the WebSphere Application Server administrative console, navigate to **Applications** \> **Application Types** \> **Websphere enterprise applications**. In this view, click **Files** to go to the **Configuration** tab, select **Security role to user/group mapping**.
    2.  Make sure filesync-user is mapped to the correct users. You can choose to map to specific users/groups, or simply map it to All Authenticated in Application's Realm.
6.  Configure throttling for sync.

    The default value is set to 50, the maximum number of concurrent requests that are allowed on one WebSphere node to handle file synchronization requests.

    1.  Open the LotusConnections-config.xml and add or change the value for this setting based on your needs

        ```
        <properties>
                 <genericProperty name="com.ibm.lconn.files.api.throttler.filesync">50</genericProperty>
             </properties>
        ```

        **Note:** You might consider starting with a value that is 1/3 of the total of Web Container thread to limit the maximum number of concurrent file sync requests. It also can be used to ensure that enough threads are available to service web application requests and typical file upload and download activity.

7.  By enabling Push Notification technology, the file sync feature scales to multiple clients and the clients can update their content faster when changes are made on the server. The clients detect the availability of the push service automatically. If you want to use push technology for file sync, the server configuration needs to be changed . The Push Notification service must be enabled in general and the specific configuration items for file sync must be enabled too.

    1.  To enable the Push Notification service, change in LotusConnections-Config.xml. For example:

        ```
         <sloc:serviceReference bootstrapHost="admin_replace" bootstrapPort="admin_replace"
              clusterName="" enabled="true" serviceName="pushnotification"
                ssl_enabled="true">         <sloc:href>
                          <sloc:hrefPathPrefix>/push</sloc:hrefPathPrefix>
                          <sloc:static href="admin_replace" ssl_href="admin_replace"/>
                          <sloc:interService href="admin_replace"/>        
              </sloc:href>     </sloc:serviceReference>
        ```

    2.  To enable Push Notification specific configuration, change in pushnotification-config.xml. For example:

        ```
        <config id="pushnotification"      
               xmlns="http://www.ibm.com/connections/pushnotification/pushnotification-config/1.0"
                  xmlns:tns="http://www.ibm.com/connections/pushnotification/files-config/1.0"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"      
               xsi:schemaLocation="http://www.ibm.com/connections/pushnotification/pushnotification-config/1.0
              pushnotification-config.xsd">    <cache>            <user timeout="3600000" />
                </cache>        <db dialect="DB2" />    <message>    
                <queue maximumAgeInHours="720"/>      
               </message>    <scheduledTasks>            <task name="MessagePrunning" interval="0 0
              0-23/3 * * ?|0 30 1-23/3 * * ?" enabled="false" type="internal"/>      
               </scheduledTasks>    <server>            <bayeuxServer logLevel="3"/>          
               <transports timeout="60000" interval="0" metaConnectDeliverOnly="true"
              maxQueue="-1"/>        </server>
        </config>
        ```

        **Note:** When the previous configuration items are changed, restart the Push Notifications and Files applications.

8.  If you changed the sync setting, restart the Files application.

## Limitations
The sync capability in the Connections Desktop Plug-ins is designed to allow for instant access to your most commonly used files. Access to the remainder of your files is available through the browser interface or the Windows explorer plugin. The sync support is not designed or architected to serve as a complete backup solution. As such, there are performance limitations to how many files can be reliably supported in sync.

The Connections for Mac plugin and Connections Desktop Plug-ins for Microsoft Windows will support no more than 10,000 files and/or folders in the sync folder tree. This includes all files and folders in the top level folder and in all subfolders.  Attempting to sync more than 10,000 will cause degraded performance and eventual sync failures; at a certain point, the initial sync from the server will be unable to complete, showing timeout errors.  Customers with sync failures using more than 10,000 files and/or folders will be asked to recreate the issue on a system with less than 10,000 in sync.
 
Additionally, there is a limit of 5,000 files and/or folders supported for each copy operation from the desktop into the local sync folder.  Copying more than 5,000 at one time may cause sync errors.  Folders containing more than 5,000 can either be moved into the sync folder (no limits) or broken into multiple copy operations.
 
Windows users have easy access to all their files using the windows explorer plugin.  The HCL Connections node provides a virtual view of all files available on the server.  Unlike the sync support, these files are not downloaded locally until opened. HCL recommends adding your commonly accessed files to sync and accessing the remainder of your files through the virtual interface provided by the Windows explorer plugin.

**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

