# Configuring library seedlists to generate library thumbnails {#t_admin_communities_library_seedlist_configure .task}

Configuration properties control how and when thumbnails are generated for library files. You can edit the configuration properties to change the way thumbnails are generated for CCM library files.

You must have access to library-config.xml.

You must change library-config.xml in Dmgr01 and AppSrv01.

1.  Use Secure Shell \(SSH\) to access the server that is running HCL Connections.

2.  Navigate to the directory that contains library-config.xml.

    For example:

    cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/cell01/LotusConnections-config/library-config.xml

3.  Edit library-config.xml and navigate to the **<platform\>** section.

    The **<platform\>** section has the following options.

    ```
    <allowedFailuresBeforeExit></allowedFailuresBeforeExit>
    <intervalBetweenEventsMillis></intervalBetweenEventsMillis>
    <minIntervalBetweenPagesMillis></minIntervalBetweenPagesMillis>
    <maxTotalEvents></maxTotalEvents>
    <queryNumPerPage></queryNumPerPage>
    <supportedExtensions></supportedExtensions>
    <httpClientTimeOutSeconds></httpClientTimeOutSeconds>
    <useInterServiceUrl></useInterServiceUrl>
    <useSSL></useSSL>
    <traceLevel></traceLevel>
    <inLibrary></inLibrary>
    <notInLibrary></notInLibrary>
    <minCreationDate></minCreationDate>
    <maxCreationDate></maxCreationDate>
    <minUpdatedDate></minUpdatedDate>
    <maxUpdatedDate></maxUpdatedDate>
    ```

    -   <allowedFailuresBeforeExit\>: Thumbnail generation can tolerate minor errors. This setting controls the number of minor errors that can occur before the overall process fails and exits.
    -   <intervalBetweenEventsMillis\>: Controls the number of milliseconds the process pauses between starting each thumbnail generation event. Increase <intervalBetweenEventsMillis\> if the process uses an unacceptably high portion of server resources.
    -   <minIntervalBetweenPagesMillis\>: Thumbnails are generated from the seedlist one page at a time. This setting controls the interval between thumbnail. Increasing <minIntervalBetweenPagesMillis\> to slow the thumbnail generation process and reduces resource consumption.
    -   <maxTotalEvents\>: Specifies the number of thumbnail events that are run by the command. Setting <maxTotalEvents\> to -1 indicates that the process triggers events for all files.
    -   <queryNumPerPage\>: Controls the size of the seedlist page requested.
    -   <supportedExtensions\>: Specifies the valid extensions for files to generate thumbnails for. **\*** indicates all file extensions.
    -   <httpClientTimeOutSeconds\>: Specifies the number of seconds the HTTP Client waits before it times out a seedlist page request. If the process fails because of HTTP Client timeouts, increase this setting to resolve the problem.
    -   <useInterServiceUrl\>: The **"ecm\_files"** service retrieves the seedlist. This parameter specifies whether the <sloc:interService\> definition is forced. <useInterServiceUrl\> can be either true or false
    -   <useSSL\>: If <useInterServiceUrl\> is false, this setting determines whether the **ecm\_files** **ssl\_href** is used.
    -   <traceLevel\>: Determines the quantity of trace information sent to filepath. Values can be "NONE", "NORMAL" or "VERBOSE". NONE produces no trace information; "VERBOSE" produces the most trace information.

