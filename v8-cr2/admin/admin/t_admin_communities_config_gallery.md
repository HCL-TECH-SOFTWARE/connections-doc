# Configuring Galleries {#t_admin_communities_config_gallery .task}

Configure the behavior of Gallery widgets by checking out and editing gallery-config.xml. Galleries are community widgets that display thumbnails of files such as photos, videos, and office documents.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Check out gallery-config.xml, edit the gallery configuration properties, and then check the file back in.

1.  To edit the gallery configuration properties, complete the following steps.
2.  Start the wsadmin client.

3.  Use the wsadmin client to access and check out the HCL Connections configuration files:

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out the gallery-config.xml configuration file:

        `LCConfigService.checkOutGalleryConfig("working\_directory","cell\_name")`

        Where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you change them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft™ Windows™ operating system.

            **Note:** Linux™ only: The directory must grant write permissions or the command does not run successfully.

        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, type the following command while in the wsadmin command processor: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

        For example:

        -   Linux: LCConfigService.checkOutGalleryConfig\("/opt/temp","foo01Cell01"\)
        -   Microsoft Windows: LCConfigService.checkOutGalleryConfig\("c:/temp","foo01Cell01"\)
4.  Open gallery-config.xml in an editor and edit any of the configuration properties that are outlined in table 1.

    |Configuration property|Description|Possible values|Default|
    |----------------------|-----------|---------------|-------|
    |maxNumberOfEntries|The maximum number of thumbnails to show in the Gallery.|Any positive integer.|12|
    |maxNumberOfRows|The maximum number of rows of thumbnails to show in the Gallery.|Any positive integer.|2|
    |sources|The types of folders to show in the gallery. If sources is set to communityFolders, only folders that are created in this community can be displayed in the Gallery. If sources is set tocommunityFolders,personalFolders, personal folders that are shared with the community can also be displayed in the Gallery. **Note:** If personal folders can be displayed in the Gallery, then community folders must also be displayed in the Gallery

|communityFolders or communityFolders,personalFolders|communityFolders,personalFolders|

5.  Save gallery-config.xml and check it in using the following command: `LCConfigService.checkInGalleryConfig("working_directory", "cell_name")`

6.  Type the following command to deploy the changes: `synchAllNodes()`

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop and restart all of the HCL Connections application servers.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

