# Editing the XML configuration file {#xmlconfigurationfile .task}

The XML configuration file, config.xml, is used to adjust settings once the editor is loaded. The config.xml file can be found as follows:

-   On the Windows operating system, you can find config.xml in C:\\IBM\\Connections\\data\\shared\\\\customization\\javascript\\ephox\\ephoxeditors\\connections\\config.xml
-   On Linux operating system, you can find config.xml in /opt/ibm/Connections/data/shared/customization/javascript/ephox/ephoxeditors/connections/config.xml

Consider making a backup copy of config.xml, before editing it.

**Note:** The toolbar contains a placeholder item for HCL Connections-specific toolbar buttons. These buttons as a group are represented by the entry `<toolbarButton name="connectionsDialogs" />` in the configuration file. This setting can be used as previously described to configure the position of these items within the toolbar.

To ensure that images in wiki drafts upload correctly, the following entry must not be removed from your configuration file:

```
<mediaSettings>
   <httpUpload uploadFileFieldName="file" />
   ...
</mediaSettings>
```

**Parent topic:**[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

**Previous topic:**[Verifying application mappings](../install/t_verify_application_mappings.md)

**Next topic:**[Configuring IBM HTTP Server for an encrypted connection](../install/t_configure_ihs.md)

