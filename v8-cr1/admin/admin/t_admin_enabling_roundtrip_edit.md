# Enabling round-trip editing for files {#t_admin_enabling_roundtrip_edit .task}

Enable round-trip editing for files so that users can check out a file and edit it locally with one click.

Round-trip editing is not available by default. Being able to perform round-trip editing is dependent on the desktop plug-ins being installed on users' clients.

**Note:** Round-trip editing should be configured before the desktop clients are configured. If round-trip editing is configured after the desktop client plug-ins, users will have to refresh their server configuration manually.

To ensure that round-trip editing is enabled, perform the following steps:

1.  Locate the `restrictions` section in the files-config.xml file, and verify that the following code is already present. If not, add the code after `</restrictions>`:

    ```
    <roundTripEditing>
    		<extensions>
           <extension>.ppt</extension>
           <extension>.doc</extension>
           <extension>.xls</extension>
           <extension>.docx</extension>
           <extension>.pptx</extension>
           <extension>.xlsx</extension>
           <extension>.odt</extension>
           <extension>.odp</extension>
           <extension>.ods</extension>
       </extensions>
    </roundTripEditing>
    ```

2.  In the files-config.xsd file, verify that the following code is already present. If not, add the code to the `<xsd:element name="file">` section after `xsd:element name="renditions" type="tns:renditions" minOccurs="1" maxOccurs="1"/>`:

    ```
    <xsd:element ref="tns:roundTripEditing" minOccurs="1" maxOccurs="1"/>
    ```

3.  Verify that the following code is already present. If not, add the code after the `autoVersioning` definition:

    ```
    <xsd:element name="roundTripEditing">
            <xsd:complexType>
                <xsd:all>
                    <xsd:element name="extensions" type="tns:extensions" minOccurs="1" maxOccurs="1" />
                </xsd:all>
            </xsd:complexType>
     </xsd:element>
    ```

4.  Restart Files.ear.

5. 
    1.  Identify the WebSphere® variable CONNECTIONS\_CONFIGURATION\_PATH.

    2.  Navigate to the directory found in the value of CONNECTIONS\_CONFIGURATION\_PATH and then navigate to the update subdirectory.

    3.  In the update subdirectory, create a file named 00000000-0000-0000-0000-000000000000.json.

    4.  Paste the following contents into 00000000-0000-0000-0000-000000000000.json:

        ```
        {
                    "organisation": "00000000-0000-0000-0000-000000000000",
                    "settings": [
                            {
                                    "id": "5a019ee0-eb0a-47b9-b812-6d09c2fd7611",
                                    "name": "files.roundTripEditingEnabled",
                                    "title": "Enable or disable round trip editing",
                                    "category": "general",
                                    "description": "If this policy is enabled, user can see 'Edit On Desktop' button on web UI. Clicking the button, a file can be opened by local application. This function requires desktop plugin to be installed.",
                                    "canModify": true,
                                    "allowRoles": true,
                                    "validation": {
                                            "type": "boolean",
                                            "details": ""
                                    },
                                    "values": {
                                            "___default_role___": {
                                                    "isFile": false,
                                                "content": true
                                            }
                                    }
                            }
                    ]
                }
        ```

6.  Ensure that the Connections server is started. Use **wsadmin** commands to update the settings in the database to match the filesystem.

    ```
    ./wsadmin.sh -lang jython -username wasadmin -password wasadmin
    execfile("highwayAdmin.py")
    HighwayService.updateSettingsFromFile()
    ```

7.  A new file is in the configuration directory /opt/IBM/Connections/data/configuration/update with the following naming structure: `<orgId>._[UPDATED]_.<dateTimeStamp>`. You can also view the updated settings in the **HOMEPAGE.MT\_CFG\_SETTINGS** table in the database.

8.  Restart the application servers and clear the browser cache in order to see the updated settings.


**Parent topic:** [Administering Files](../admin/c_admin_files_overview.md)

