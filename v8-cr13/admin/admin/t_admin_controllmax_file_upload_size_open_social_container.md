# Controlling the maximum file upload size for the Connections OpenSocial Container {#t_admin_controllmax_file_upload_size_open_social_container .task}

You can use the container file upload policy to manage the file upload size for the HCL Connections OpenSocial Container.

For features that utilize the OpenSocial container including the Files and Connections mail gadgets, the maximum file upload size is controlled via the container file upload policy. By default, this setting allows a max file upload of 10 MB. To modify this setting:

1.  Add the **<properties\>** element at the end of the LotusConnections-config.xml file if it is not already present.

2.  Within the **<properties\>** element add <genericProperty name="shindig.config.container.overrides"\> to specify the maximum upload size in bytes as follows:

    ```
    <properties>
    <genericProperty name="shindig.config.container.overrides">
    {
       // Max file upload in bytes
        "gadgets.jsonProxyUrl.maxPostSize" : 10485760
    }
    </genericProperty>
    <properties>
    ```


**Parent topic:**[Administering the Widget container](../admin/t_admin_common_widget_container.md)

