# Enabling round-trip editing for files

Enable round-trip editing for files so that users can check out a file and edit it locally with one click.

## Before you begin
Round-trip editing is not available by default. Being able to perform round-trip editing is dependent on the desktop plug-ins being installed on users' clients.

## About this task
To ensure that round-trip editing is enabled, perform the following steps:

## Procedure

1. Locate the restrictions section in the *files-config.xml* file, and either confirm the following code is present after the `</restrictions>` tag or add it if it is missing:
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
2. Locate the *files-config.xsd* file and the section `<xsd:element name="file">`.  After the entry called `<xsd:element name="renditions" type="tns:renditions" minOccurs="0" maxOccurs="1"/>*`, confirm the following code exists and add it if it does not exist:

   ```
   <xsd:element ref="tns:roundTripEditing" minOccurs="0" maxOccurs="1"/>
   ```
   
3. Add the following code after the **autoVersioning** definition (or confirm it exists)
   ```
    <xsd:element name="roundTripEditing">
            <xsd:complexType>
                <xsd:all>
                    <xsd:element name="extensions" type="tns:extensions" minOccurs="0" maxOccurs="1" />
                </xsd:all>
            </xsd:complexType>
     </xsd:element>
   ```
4. Perform the following
   
   a. Identify the *WebSphere®* variable **CONNECTIONS_CONFIGURATION_PATH.Item**
   
   b. Navigate to the directory found in the value of **CONNECTIONS_CONFIGURATION_PATH** and then navigate to the *update* subdirectory.
   
   c. In the update subdirectory, create a file named `<org id>.json`.  If you want to enable the *routeTripEditingPolicy* for all **orgs**, then use the default **org id** of
       
       ```
       00000000-0000-0000-0000-000000000000.json
       ```
       
   -- **Note:** If you want to enable for individual tenants, then create individual files for each org.  For example, **4000000001.json**.
    
    d. Paste the following contents into *<org id>.json*.  Make sure to replace the *"organisation"* value with your *tentant's org id*, or leave it as *00000000-0000-0000-0000-000000000000* for the default org.
  
       ```
       {
         "organisation": "40000000001",
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

5. Ensure that the Connections server is started. Use **wsadmin** commands to update the settings in the database to match the filesystem.
 
   ```
   ./wsadmin.sh -lang jython -username wasadmin -password wasadmin
      execfile("highwayAdmin.py")
      HighwayService.updateSettingsFromFile()
   ```

6. A new file is in the configuration directory */opt/HCL/Connections/data/configuration/update* with the following naming structure: 
   `<orgId>._[UPDATED]_.<dateTimeStamp>`.
   
   **Note:** You can also view the updated settings in the **HOMEPAGE.MT_CFG_SETTINGS** table in the database. 
7. Restart the application servers and clear the browser cache in order to see the updated settings.
 
 




    
    