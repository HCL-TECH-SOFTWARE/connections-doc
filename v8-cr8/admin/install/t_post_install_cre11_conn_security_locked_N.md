# Enabling locked domains {#bestpractices .reference}

Assuming that you have completed the server setup previously described, to enable locked domains in HCL Connections, specify an additional attribute in the LotusConnections-config.xml to ensure that only ConnectionsOpensocial application is mapped to the locked domain host.

## Enabling locked domains for additional security { .section}

For added security, only the ConnectionsCommon.ear should be mapped to the locked host. Although no SSO tokens will be flowing from the host, this extra precaution limits exposure of your Connections infrastructure to potentially malicious gadgets. For more information about locked domains refer to [Understanding and configuring locked domains](https://ds_infolib.hcltechsw.com/ldd/lcwiki.nsf) in the HCL Connections wiki.

1.  Add the new attribute to the LotusConnections-config.xml file by completing the following steps:
    1.  Start the wsadmin tool.
    2.  Use the following command to access the Connections configuration file:

        ```
        execfile("<$WAS_HOME>/profiles/<DMGR>/config/bin_lc_admin/ connectionsConfig.py")
        ```

        If you are prompted to specify which server to connect to, enter 1. This information is not used by the wsadmin client when you are making configuration changes.

    3.  Check out the Connections configuration files using the following command:

        ```
        LCConfigService.checkOutConfig("/working_directory", "cell_name")
        ```

        where:

        -   working\_directory is the temporary working directory where the configuration XML and XSD files are copied to. The files are kept in this working directory while you change them.
        -   cell\_name is the name of the WebSphere® Application Server cell hosting the Connections application. This argument is case sensitive. If you do not know the cell name, you can determine it by entering the following command in the wsadmin command processor: print AdminControl.getCell\(\), for example:

            ```
            LCConfigService.checkOutConfig("/temp","foo01Cell01")
            ```

    4.  From the temporary directory where you checked out the Connections configuration files to, open the LotusConnections-config.xml file in a text editor.
    5.  Search for opensocialLocked and update all admin\_replace attribute values in the <sloc:serviceReference\> tag with your own:

        ```
        <sloc:serviceReference bootstrapHost="admin_replace" bootstrapPort="admin_replace" clusterName="" enabled="false" serviceName="opensocialLocked" ssl_enabled="false">
         <sloc:href>
         <sloc:hrefPathPrefix>/connections/opensocial</sloc:hrefPathPrefix>
         <sloc:static href="**admin\_replace**" ssl_href="**admin\_replace**"/>
         <sloc:interService href="**admin\_replace**"/>
         </sloc:href>
         </sloc:serviceReference>
        
        ```

        For example:

        ```
        <sloc:serviceReference bootstrapHost="{locked.host.name}" bootstrapPort="2809" clusterName="" enabled="true" serviceName="opensocialLocked" ssl_enabled="true">
                <sloc:href>
                    <sloc:hrefPathPrefix>/connections/opensocial</sloc:hrefPathPrefix>
                    <sloc:static href=**"http://\{locked.host.name.authority/http\}**" ssl_href="**https://\{locked.host.name.authority/https\}**"/>
                    <sloc:interService href="**https://\{locked.host.name.authority/https\}**"/>
                </sloc:href>
            </sloc:serviceReference>
        
        ```

    6.  Save the LotusConnections-config.xml file.
    7.  Check in the changed configuration property files using the following command: LCConfigService.checkInConfig\(\)
    8.  After making updates, enter the following command to deploy the changes: synchAllNodes\(\)
2.  Restart your Connections server.

## Example { .section}

This configuration could look like the following sample:

```
<sloc:serviceReference bootstrapHost="hern120w.dyn.webahead.renovations.com" bootstrapPort="2809" clusterName="" enabled="true" serviceName="opensocialLocked" ssl_enabled="true">
        <sloc:href>
            <sloc:hrefPathPrefix>/connections/opensocial</sloc:hrefPathPrefix>
            <sloc:static href="http://hern120w.locked.com:9080" ssl_href="https://hernw120.locked.com:9443"/>
            <sloc:interService href="https://hern120w.dyn.webahead.renovations.com:9443"/>
        </sloc:href>
    </sloc:serviceReference>
```

**Parent topic:**[Security](../secure/c_sec_overview.md)

