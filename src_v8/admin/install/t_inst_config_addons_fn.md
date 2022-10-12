# Configuring collaborative features in FileNet {#t_inst_config_addons_fn .task}

You can set up and maintain FileNet® collaborative features using the Administration Console for Content Platform Engine \(ACCE\) on the FileNet system to create and administer an Object Store.

Some of these settings might already be set for you, but you should still check to see that they are set. In case some settings are not set, specify them as described in the table in step 9. The **Config 1** and **Config 2** properties are optional in case your FileNet deployment for some reason does not work correctly using the '`connectionsAdmin`' J2C alias contained in WebSphere® Application Server.

1.  Open the Administration Console for Content Platform Engine \(ACCE\) on the FileNet system with a web browser and log in using the administrator's user name and password by accessing the following URL:

    **Note:** Administration Console for Content Platform Engine \(ACCE\) supports a subset of the browsers supported by Connections. While some operations in Administration Console for Content Platform Engine might work with other browsers, if an error is encountered, make sure you are running a supported browser. See the system requirements for [supported software](http://www-01.ibm.com/support/docview.wss?uid=swg27013654) for FileNet Content Engine. Click **Administrative Console for Content Engine** in the **By component** column, view **Prerequisites** and check **Web Browser support**.

    ```
    http://server:port/acce
    
    ```

    where server is the host name that hosts the Content Platform Engine application, and port is the port number the server is listening on. For example:

    ```
    http://cpe.example.com:9080/acce
    ```

    **Note:** A port is not necessary if a web server is being used.

2.  On the **ICDomain** tab, expand the **Object Stores** node in the navigation tree and open the existing object store you want to configure.

    The name of the object store, if the createObjectStore.sh\|.bat command line tool was used to create it, is ICObjectStore.

3.  Once the object store has opened, click **Search** in the navigation tree to open the Search page.

4.  On the **Saved Searches** tab page, click **New Object Store Search**.

5.  On the **New Object Store Search** \> **Simple view** inner tab, select **Collaboration Configuration** from the **Class** dropdown, and then click **Run**.

6.  If the message FNRAC4002W A query without a WHERE clause can take a long time to finish. Do you want to continue? displays, click OK. A single row is then returned.

7.  Click the result link in the **ID** column to open it for viewing and editing:

8.  In the results view tab, click the **Properties** inner tab.

9.  Scroll down to set the following configuration properties:

    Set the following properties for the Content Platform Engine activity stream generation to function properly.

    |Property|Description|
    |--------|-----------|
    |Activity Stream Retrieval URL|URL for FileNet Collaboration Services.

\{ecm\_files\}

**Important:** You should enter this value exactly as shown: \{ecm\_files\} including the braces \{\}.

|
    |Activity Stream HTTP Endpoint URL|Base URL for Connections, for example:

https://connections.example.com

Or

https://connections.example.com:9443

**Important:** Must use HTTPS. Do not add an extra slash at the end of the URL. This should use the host and port of your HTTP server. If you want to test Activity Stream without the HTTP server, this must be the port of the application server hosting the Connections News application. [HTTP server configuration](c_add_ihs_over.md) is a mandatory post-installation step.

|
    |Activity Stream Gadget URL|Fully hard-coded Gadget URL: \{connections\}/resources/web/com.ibm.social.ee/ConnectionsEE.xml

**Note:** You should enter this url exactly as shown, including the text: `{connections}`.

|
    |Config 1|Holds password for the Connections user defined in the Config 2 property and will be encrypted after input.**Note:** Optional: This field may be left empty if Config 2 is also left blank.

|
    |Config 2|Holds the login name of a Connections user and will be encrypted after input. This user must be in the **trustedExternalApplication** role on the Widget Container application in HCL Connections. By default, the Connections administrator has these privileges and may be used here.**Note:** Optional: If this field is left blank, the connectionsAdmin J2C alias will be used when FileNet contacts the Connections Activity Stream. This user alias is used for inter-service communication in other parts of Connections and normally will have the necessary rights. If you want to use a dedicated user other than the login stored in connectionsAdmin, or if you have a standard FileNet deployment where this alias does not exist, you may override the user ID here. If this field is entered, also enter the password in Config 1.

|
    |Activity Stream Extended Settings|Activity Stream Extended Settings may be left empty. If you want to set Activity Stream Extended Settings, take the following steps.    1.  Click the action menu associated with the **Property Value** for this entry and select **Display or Edit Value**.
    2.  Sequentially enter the following five entries by placing each of the strings in the **Enter a string value** field and clicking **Add** for each entry. When finished, click **OK**.
        -   activityStreamRetrievalURL=\{0\}/atom/library/\{1\}%3B\{2\}/\{3\}/\{4\}/entry
        -   activityStreamAnonymousRetrievalURL=\{0\}/atom/anonymous/library/\{1\}%3B\{2\}/\{3\}/\{4\}/entry
        -   activityStreamOauthRetrievalURL=\{0\}/atom/oauth/library/\{1\}%3B\{2\}/\{3\}/\{4\}/entry
        -   activityStreamFileLinkURL=\{0\}/atom/library/\{1\}/document/\{2\}/media/\{3\}
        -   activityStreamNullifyActionableURL=\{0\}/connections/opensocial/basic/rest/activitystreams/@me/@all/@all/\{1\}
|
    |Download Count Ignored User Ids|A multi-value property \(MVP\) string that holds the SIDs of users whose content downloads will not be counted. This list must include the user used by Connections to index Connections Content Manager libraries into Connections search.

By default, for a new FileNet deployment, this user is the same as the Connections administrative user.

For an existing FileNet deployment, this is the administrative user you provided during the installation of Connections Content Manager. This user is referenced by the filenetAdmin J2C authentication alias as configured in **WebSphere Administration** \> **Security** \> **Global Security** \> **Java Authentication and Authorization Service** \> **J2C authentication data**.

Use the task [Generating SID Values](t_inst_generat_sid_values.md) to find the SID for the user and enter the value here.

|
    |Download Count Anonymous User Ids|An MVP string that holds the SIDs of users whose content downloads will be counted as anonymous.|
    |Activity Stream Ignored Users Ids|An MVP string that holds the SIDs of users whose activities will not be added to the feed.The Activity Stream Ignored User Ids may be left empty. Complete this value if there are users whose activities should not be posted to the activity stream. For instance, if you have a system user used for migrating content into FileNet, include the system user in this list so their activities do not overwhelm new events in the activity stream.

|

10. After editing properties, click **Save** and then **Close**.

11. Click the Object Store created in the previous steps.

12. Click **Object Store** \> **Data Design** \> **Property Template**.

13. Verify that the following properties have access grated to \#AUTHENTICATED-USERS. In the security panel, verify that **Allow**, **This Object**, **All Children**, and **View All Properties** are assigned to the authenticated users.

    1.  AssociatedPropertyID
    2.  Component Binding Label
    3.  Document Title
    4.  IsHiddenContainer
    5.  LookupIDList
    6.  LookupList
    7.  PropertyLookupName

