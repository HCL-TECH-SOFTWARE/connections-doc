# Configuring web resources and virus scan properties {#t_admin_communities_viruscan_props .task}

Web resources properties include for example, the Connections server and port for URLs. Virus scan properties include for example, the virus scanning server that is used to scan uploaded files for viruses. Create these configuration properties in the connections.xml file.

If FileNet® Collaboration Services \(FNCS\) and HCL Connections are in the same WebSphere® Application Server cell, follow the instructions in *Enabling virus scanning*. If FNCS and HCL Connections are on different cells, carry out these steps.

When FileNet is on a different WebSphere Application Server cell than HCL Connections, it cannot access the configuration values in LotusConnections-config.xml. Instead, you must create the configuration properties for HCL Connections web resources and virus scans in the connections.xml file.

**Note:** When FileNet is on the same WebSphere Application Server cell as HCL Connections, you do not have to create the connections.xml file. Therefore, you must set anti-virus settings in LotusConnections-config.xml. For more information, see *Changing common configuration property values*.

To configure web resources and virus scan settings, complete the following steps:

1.  Apply the anti-virus filter, download the filter auth\_filter\_patch.zip from:

    -   Linux™, AIX®: <connections\_root\>/xkit/filenetConfig
2.  Update FNCS. Browse to **Security** \> **Global security** \> **Web security** \> **General settings**.

3.  Enable use of authentication data on unprotected URLs. Select **Authenticate only when the URI is protected** and check **Use available authentication data when an unprotected URI is accessed**.

4.  Modify role mappings for FNCS, take the following steps on the administrative console:

    1.  Browse to **Applications** \> **WebSphere Enterprise Applications** \> **FNCS**

    2.  Click **Security role to user/group mapping** \> **Authenticated** \> **Map Special Subjects** \> **Everyone**.

5.  Install the authentication filter code, take the following steps on the administrative console:

    1.  Browse to **Applications** \> **WebSphere Enterprise Applications**.

    2.  Click **FNCS application** \> **Update**

    3.  Click **Application Update Options** \> **Replace, add, or delete multiple files** and select **auth\_filter\_patch.zip**.

    4.  Click **Next** and **OK** to update the application.

6.  On the cell that contains the FNCS application, create a file connections.xml under wasprofile/config/cells/cellname

7.  Add the following content to the file:

    ```
    <?xml version="1.0"?>
    <config>
        <webresources url="http://myurl.com/connections/resources"
                     ssl_url="https://myurl.com/connections/resources"/>
    
         <avFilter class="AVScannerICAP">
              <property>av.scanner.servers=myscanner.host.com</property>
              <property>exception.on.virus=yes</property>
              <property>av.scanner.service=myScannerService</property>
              <property>av.chunk.size=50000</property>
              <property>first.read.timeout=120000</property>
         </avFilter>
        
        <properties>
             <genericProperty name="ecmVirusScanTempDir">c:/ecmVirusScanTemp</genericProperty>
        </properties>
    </config>
    ```

    **Note:** avFilter settings are needed only if you are enabling virus scan.

    The following list defines the properties that can be included in the connections.xml file.

    webresources
    :   Specifies the Connections server and port for encrypted connection and non-encrypted connection URLs.

    av.scanner.servers
    :   Defines the virus scanning server to use to scan uploaded files for viruses. Replace my.virus.scanning.server.com with a list of one or more of the virus scanning servers that are used by your organization. Separate multiple servers with a comma. For example:

        `<property>av.scanner.servers=ssoc.acme.com</property>` or `<property>av.scanner.servers=ssoc1.acme.com,ssoc2.acme.com</property>`


    :       exception.on.virus
    :   Defines what to do when a virus is found. This property must always be set to yes.


    :       av.scanner.service
    :   Defines the service name that is used by the anti virus scanner. Set this property to AVSCAN for Symantec, and RESPMOD for McAfee.


    :       av.chunk.size
    :   Defines the data transfer rate in bytes. This property is not displayed in the configuration file by default. If you want to specify a value for it, you must add it.


    :       first.read.timeout
    :   Defines timeout length in milliseconds. This property is not displayed in the configuration file by default. If you want to specify a value for it, you must add it.

    ecmVirusScanTempDir
    :   Specifies a virus scan temporary directory. This property is used only if virus scan is enabled. If you do not specify ecmVirusScanTempDir, the temp directory of the Java™ virtual machine is used by default.

8.  Save connections.xml.

9.  Restart the FNCS application in WebSphere Application Server to apply the configuration changes.


When virus scanning is running on your environment, any scanning-related errors are written to SystemOut.log. If a user tries to upload a file that contains a virus, the upload stops and the following message is displayed on the upload dialog:

```
A virus was detected in the file you are trying to upload. Please run a local virus scan on this file before uploading it again.
```

**Related information**  


[Changing common configuration property values](../admin/t_admin_common_changing_config.md)

[Enabling virus scanning](../secure/t_admin_common_virus_scanning.md)

