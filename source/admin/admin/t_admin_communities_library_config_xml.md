# Configuring Library widget options and defaults {#configuringcustomlibraries .task}

Configure the behavior of community Library widgets by checking out library-config.xml and editing it directly.

1.  Check out the library-config.xml file, edit configuration properties, and then check the file back in.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Use the wsadmin client to access and check out the configuration file:

    1.  Enter the following command to access the HCL Connections configuration files: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to checkout the library-config.xml configuration file:

        `LCConfigService.checkOutLibraryConfig("working\_directory","cell\_name")`

        Where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you change them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

            AIX, and Linux only: The directory must grant write permissions or the command does not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell that hosts the IBM Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, type the following command while in the wsadmin command processor:print AdminControl.getCell\(\)
        For example:

        -   AIX or Linux:LCConfigService.checkOutLibraryConfig\("/opt/temp","foo01Cell01"\)
        -   Microsoft Windows:LCConfigService.checkOutLibraryConfig\("c:/temp","foo01Cell01"\)
4.  Open library-config.xml in an editor.

5.  Edit any of the following configuration properties:

    |Configuration property|Description|Possible values|Default value|Supported by|
    |----------------------|-----------|---------------|-------------|------------|
    |displayPersonCard|Specifies whether to display the person card for Enterprise Content Manager users. If HCL Connections and Enterprise Content Manager users do not have matching email addresses, set this property to false. **Note:** If exposeEmail is turned off, person card is no longer automatically disabled.

|true/false|true|Library and Linked Library|
    |roundTripEdit|Specifies whether to allow round-trip editing through the connectors. Disable this feature in environments where the connectors are not installed on desktop clients.**Note:** Round-trip editing is not available on any Library that has draft approvals enabled, regardless of the roundTripEdit setting.

|true/false|true|Library and Linked Library|
    |downloadThruProxy|Specifies whether to download files through the common proxy or directly from the Enterprise Content Manager server. Downloading through the proxy means more traffic through the proxy, but does not require users to reauthenticate to download in environments where SSO is not enabled.downloadThruProxy applies only if FileNet® Collaboration Services and HCL Connections use different host names. This scenario is uncommon, especially if you are using the new installation option for FileNet in Connections Content Manager. For more information on the AJAX proxy, see *Configuring the library widget proxy*.

|true/false|true|Library and Linked Library|
    |openInActionAsLink|Specifies whether to show the **Open in repository** as a link on the document summary page, or as an action button in the toolbar. Adding this action to the toolbar makes it more easily accessible. Add it to the toolbar if you think users frequently use the Enterprise Content Manager interface to access advanced features.|true/false|false|Library and Linked Library|
    |allowCheckForConnectors|Specifies whether to allow checks for the existence of the connectors on client workstations. This configuration option takes effect only when the roundTripEdit option is enabled \(set to true\). Disabling this feature makes round trip editing features available for users whether or not they have the connectors installed on their client workstation. This property might cause unexpected behavior on workstations where the clients are not installed. Disable this feature in environments where all client workstations have the connectors installed.**Note:** allowCheckForConnectors uses HTTP only to check for Connectors. If you use HTTPS and Microsoft Internet Explorer, the browser prompts you as follows:

    ```screen
Do you want to view only the webpages content that was delivered securely?
    ```

To remove these warnings, you must preinstall Connectors on User Workstations and set allowCheckForConnectors to false if roundTripEdit in Connectors is required.

|true/false|true|Library and Linked Library|
    |displayViews|Specifies whether to display the **Views** menu on the main document list. This menu shows all the Enterprise Content Manager views that can be shown.**Note:** These views might not be scoped to the library that the user is connected to.

 For a list of the views available from the **Views** menu, see *Library views*.

|true/false|false|Library and Linked Library|
    |uploadTimeout|Specifies the number of seconds to wait before a timeout occurs that ends a file upload attempt.**Note:** Think carefully about editing this property. It is used by both the Linked Library and Media Gallery widgets.

|Any integer|1200|Library, Linked Library and Media Gallery|
    |showLegacyLibraryMessage|Specifies whether to display a warning message for non-teamspace FileNet Libraries. Applicable to Linked Library only.|true/false|true|Linked Library|
    |useSSO|Specifies whether all Linked Libraries have SSO configured with FileNet. This forces the Library widget to always use the Connections login page to authenticate the user. Applicable to Linked Library only.|true/false|true|Linked Library|
    |allowChangeDocTypeDefault|Specifies the default value for whether users can select a non-default document type when you are working with files in a Library or Linked Library.|true/false|false|Library and Linked Library|
    |enableConnectionConnectors|Specifies whether to allow round-trip editing through the HCL Connections Desktop Plug-ins. Disable this feature in environments where the plug-ins are not installed on desktop clients.**Note:** roundTripEdit must also be enabled.

|true/false|None|Library only|
    |librarySharingPanel|Specifies whether sharing is supported at the library level.|true/false|false|Library and Linked Library|

    **Note:** If roundTripEdit in Connectors is not required in your environment, set roundTripEdit and allowCheckForConnectors to false.

6.  To check in the changed library-config.xml file, use the following command:

    ```
    LCConfigService.checkInLibraryConfig("working_directory", "cell_name")
    ```

7.  After you make updates, type the following command to deploy the changes:

    ```
    synchAllNodes()
    ```

8.  To exit the wsadmin client, type `exit` at the prompt.

9.  Stop and restart all of the HCL Connections application servers.


Check the configuration files back in after you change them. You must also check the files in during the same wsadmin session in which they were checked out for the changes to take effect. See *Applying property changes* for details.

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

[Changing Communities configuration property values](../admin/t_admin_communities_changing_config.md)

[Configuring the library widget proxy](../secure/t_admin_communities_library_proxy.md)

