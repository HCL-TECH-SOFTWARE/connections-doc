# Disabling continuous scrolling in Files {#files_disable_continuous_scrolling .task}

By default, the Files application uses continuous scrolling in list views. In CR14, this behavior is controlled by a generic property in `LotusConnections-config.xml` rather than by a Files admin UI setting.

!!! important

    This setting is managed only in `LotusConnections-config.xml`. Do not add it to `files-config.xml` or `files-config.xsd`.

1.  Modify `LotusConnections-config.xml` (in the DMGR folder) by adding or updating the following generic property:

    ```xml
    <genericProperty name="files.view.continuous.scrolling.enabled">false</genericProperty>
    ```

2.  Synchronize the nodes.

    !!! note
        If you omit this property, or if you set it to `true`, Files will continue to use continuous scrolling.

See also [Properties that you can change only by editing the XML file](r_admin_common_props_edit-xml.md) for general `LotusConnections-config.xml` generic-property guidance.

**Parent topic:** [Administering Files](../admin/c_admin_files_overview.md)
