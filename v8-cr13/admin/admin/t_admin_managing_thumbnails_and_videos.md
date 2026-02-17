# Managing images and videos for thumbnails and preview {#t_admin_managing_thumbnails_and_videos .task}

You can control the size of thumbnails for images and videos using the file-preview-config.xml.

The file-preview-config.xml file controls the size of thumbnails and supports the acceptable image and video types in grid view and preview dialog.

1.  Start the wsadmin client as explained in [Starting the wsadmin client](t_admin_wsadmin_starting.md).

2.  Use the wsadmin LCConfigService.checkOutConfig command to check out the file-preview-config.xml.

3.  Open the file-preview-config.xml in your preferred text editor.

4.  Review the default size values for previews in the thumbnail grid, gallery view, and detail view in the `<preview>` section and change them if needed:

    ```
    -<preview>
        <thumbnailView height="73" width="73"/>
        <galleryView height="132" width="200" textHeight="30"/>
        <detailView height="450" width="450"/>
    </preview>
    ```

    **Note:** The supported file formats are listed in this file and appear to be editable; however any changes to the formats specified here will be ignored and the standard set of formats will still be supported.

5.  Be sure to save your changes.


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

