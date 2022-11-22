# Wikis configuration properties {#filesconfigurationproperties .reference}

Configuration properties in the wikis-config.xml file control how and when various Wikis operations occur.

## Modifying properties { .section}

When you modify a property, you must conform to the following guidelines:

-   Configuration values, except for properties with multiple values, are always required.
-   Enabled properties must have a Boolean value of either true or false.
-   Number values must be integers.

After you edit the wikis-config.xml file, apply your changes by restarting the application server that hosts the Wikis application.

You can modify the following configuration properties:

activeContentFilter.enabled
:   Specifies the mime types that are scanned and scripts that are removed from wiki pages when they are viewed.

    You can disable this filter by changing the value to false, but that might leave your environment open to cross-site scripting attacks unless you took other security precautions. For more information, see *Securing applications from malicious attack*.

api.indent.enabled
:   Specifies whether API output is indented. Indentation helps with development and debugging.

    This value is false by default because indentation affects performance. To enable indentation, change the value to true.

api.tagFilter
:   Specifies the maximum number of tags that are allowed for filtering Wikis by tags. The default value is 3. For performance reasons, a value greater than 10 is not recommended. To change the value, use the following format:

    ```
    <tagFilter maximumTags="n"/>
    
    ```

    where n is the maximum number of tags.

cache.http.publicContentMaxAgeInSecs
:   Specifies the maximum age, in seconds, of the public content cache before it is refreshed. The cache stores static web resources, such as JavaScript™ and images. To show resource changes more quickly, reduce the value of this property.

    The value must be greater than or equal to 0.

    **Note:** You can force a resource update by opening the `LotusConnections-config.xml` file and setting the versionStamp property to any value. For example: <versionStamp value="20130929.013427"\>. The token is included in most URLs and in URL caches. The new URL overrides the old version and refreshes the resources. For information about editing the `LotusConnections-config.xml` file, see *Common configuration properties*.

    Some resources, including some images, do not use version stamps. If you edit these resources frequently, you can reduce the cache.http.publicContentMaxAgeInSecs value to show changes more quickly. Otherwise, update the version stamp when you modify the wikis-config.xml file.

cache.http.publicFeedMaxAgeInSecs
:   Specifies the maximum age, in seconds, of the public feed cache before it is refreshed. Public feeds pass information to the **Public Wikis** view. To avoid performance issues in deployments with more than 200,000 wikis, increase this value. However, to maintain the latest information in the public view, decrease the value.

    The value must be greater than or equal to 0.

cache.user.timeout
:   Specifies the number of milliseconds that user objects stay in the user information cache. The user information cache stores metadata about users such as names and email addresses. Use this property to control the frequency of requests to the Wikis database for user information.

    The value must be greater than or equal to 1.

    If the value of user data changes while the update user task or commands for MemberSynch are running, the cache is invalidated.

db.dialect
:   Reflects the current database type, typically specified during installation. Accepts the values DB2, Oracle, or SQL Server.

directory.community.membershipCache.maximumAgeOnLoginInSeconds
:   Specifies the number of seconds after a user logs in that the community membership cache is refreshed. Only applicable if Communities wikis and Communities integration are enabled.

    The value must be greater than or equal to 0.

    Refreshing the cache is required so that a user has the same access to content as the community, but refreshing the cache affects performance. A short time interval between refreshes means that the Wikis application is more up-to-date, but performance might be slower. A long interval between refreshes has less effect on performance, but users might not have immediate access to updated content.

    If you reduce the value of this property, inform users that logging out and back in is the best way to refresh the cache. You can also increase the value of the directory.community.membershipCache.maximumAgeOnRequestInSeconds property so that frequent requests do not affect performance.

    C

directory.community.membershipCache.maximumAgeOnRequestInSeconds
:   Specifies the number of seconds after an application request that the community membership cache is refreshed. Only applicable if Communities wikis and Communities integration are enabled.

    The value must be greater than or equal to 0.

    Refreshing the cache is required so that a user has the same access to content as the community, but refreshing the cache affects performance. A short time interval between refreshes means that the Wikis application is more up-to-date, but performance might be slower. A long interval between refreshes has less effect on performance, but users might not have immediate access to updated content.

    If you reduce the value of this property, inform users that logging out and back in is the best way to refresh the cache. You can also increase the value of the directory.community.membershipCache.maximumAgeOnRequestInSeconds property so that frequent requests do not affect performance.

    To improve performance, increase this value to 10 minutes or more.

directory.group.membershipCache.maximumAgeOnLoginInSeconds
:   Number of seconds after a user logs in that group membership cache is refreshed after user login. Only applicable if groups are enabled.

    The value must be greater than or equal to 0.

    Refreshing the cache is required so that a user has the same access to content as the community, but refreshing the cache affects performance. A short time interval between refreshes means that the Wikis application is more up-to-date, but performance might be slower. A long interval between refreshes has less effect on performance, but users might not have immediate access to updated content.

    If you reduce the value of this property, inform users that logging out and back in is the best way to refresh the cache. You can also increase the value of the directory.community.membershipCache.maximumAgeOnRequestInSeconds property so that frequent requests do not affect performance.

    Use this property to increase the number of seconds in directory.group.membershipCache.maximumAgeOnRequestInSeconds so that frequent requests do not affect performance.

directory.group.membershipCache.maximumAgeOnRequestInSeconds
:   Number of seconds after an application request that the group membership cache is refreshed. Only applicable if groups are enabled.

    The value must be greater than or equal to 0.

    Refreshing the cache is required so that a user has the same access to content as the community, but refreshing the cache affects performance. A short time interval between refreshes means that the Wikis application is more up-to-date, but performance might be slower. A long interval between refreshes has less effect on performance, but users might not have immediate access to updated content.

    If you reduce the value of this property, inform users that logging out and back in is the best way to refresh the cache. You can also increase the value of the directory.community.membershipCache.maximumAgeOnRequestInSeconds property so that frequent requests do not affect performance.

    To improve performance, increase this value to 10 minutes or more.

directory.typeaheadSearch.maximumResults
:   Specifies the maximum number of names to display when a user searches for user or group names in a search field. Sets a maximum for both type-ahead results and search results when a user clicks **Search**.

    The value must be greater than or equal to 1.

    If the value is large, such as 1000, and there are 1000 or more matches, all names are returned and performance is greatly reduced. If the value is low, such as 10, a user who enters a generic name might not see all matches.

    **Note:** Type-ahead is available for public pages but not for filtered pages that might appear in Owner, Editor, or Reader views.

download.modIBMLocalRedirect.enabled
:   Specifies whether IBM® HTTP Server, and not WebSphere® Application Server, serves downloaded files. In a production environment, use IBM HTTP Server to serve downloaded files.

    If this property is set to true, you must also specify a file path in the download.modIBMLocalRedirect.hrefPathPrefix property.

    If this property is set to false, the WebSphere Application Server redirect servlet downloads files.

    For information about configuring IBM HTTP Server to download files, see *Configuring file downloads through the HTTP server*.

download.modIBMLocalRedirect.hrefPathPrefix
:   Specifies the full path to the file system directory where Wikis data is stored. The file path must not include a trailing slash.

    This property is relevant only if the download.modIBMLocalRedirect.enabled property is true. If the property is set to false, the WebSphere Application Server redirect servlet downloads files.

    For information about configuring IBM HTTP Server to download files, see *Configuring file downloads through the HTTP server*.

download.stats.logging.enabled
:   Specifies the level of detail to log about page views. If the value is set to false, Wikis logs the number of times a page is viewed. If true, Wikis logs the names of authenticated users who view pages.

    Specify true for auditing.

editor.wikitexttab.enabled
:   Specifies whether the Wiki Text tab is enabled. The default value is false. You can enable the Wiki Text tab by changing the value to true.

file.attachment.maximumSizeInKb
:   Specifies the maximum size, in KB, that is allowed for file attachments.

    The value must be greater than or equal to 1.

    Attachments that are larger than this setting fail to upload and return an error to users. To improve performance, use this property to restrict users from uploading large files.

    After you change this value, the maximum size limit does not change for users until their browser cache is refreshed. You can force a refresh by running a command to update the product version stamp. For more information, see *Required post-customization steps*.

file.media.maximumSizeInKb
:   Specifies the maximum size, in KB, that is allowed for media. In Wikis, media are wiki pages.

    The value must be greater than or equal to 1.

    This property is useful if you want a relatively large quota size for libraries, but you do not want users to attach large files.

    After you change this value, the maximum size limit does not change for users until their browser cache is refreshed. You can force a refresh by running a command to update the product version stamp. For more information, see *Required post-customization steps*.

file.page.maximumSizeInKb
:   Specifies the maximum size, in KB, that is allowed for wiki pages. Since wiki pages are a type of media, this value must be less than or equal to the maximum size set in the file.media.maximumSizeInKb property. Use this property to restrict users from uploading files whose size might affect performance.

    The value must be greater than or equal to 1.

    Pages that are larger than the value of this property return an error.

    After you change this value, the maximum size limit does not change for users until their browser cache is refreshed. You can force a refresh by running a command to update the product version stamp. For more information, see *Required post-customization steps*.

file.restrictions.enabled
:   Enables or disables the ability to restrict the types of files that users can upload as attachments in Wikis. Accepts the values true or false.

    For more information about restricting file types, see *Restricting attachment file types in Wikis*.

file.restrictions.mode
:   Sets the mode for file extension restrictions. Accepts the values allow or deny. If the value is allow, the file extensions in the list are the only ones that users can upload as attachments. If the value is deny, the extensions are not allowed.

    For example:

    ```
    <file>
     ....
     <restrictions enabled="true" mode="allow">
      <extensions>
       <extension>odt</extension>
       <extension>odp</extension>
       <extension>ods</extension>
      </extensions>
     </restrictions>
    </file>
    ```

    For more information, see *Restricting attachment file types in Wikis*.

file.storage.rootDirectory
:   Specifies the path to the file system directory where Wikis data is stored. This value can be set during installation and can differ for each node in a cluster. If the directory is specified during installation, this value is populated by WebSphere Application Server. However, you can specify a different directory.

    HCL Connections looks for a files and a temp directory in the directory that is specified by this property. If the directories are not present, they are created. The temp directory stores data while the data is being uploaded or scanned for viruses. The files directory contains binary data files.

    For more information, see *Backing up data*.

file.versioning.enabled
:   Specifies whether wiki page versioning is allowed. Specify true or false. The default value is true.

    When this value is set to false, the versioning interface is not displayed and the first version is always current. If you disable this property after multiple versions of a page are created, the latest version becomes the current and only version.

    New versions are created only when content changes, not when title or tags or other metadata changes.

    To reduce data storage, specify false.

    For more information, see *Disabling wiki page versioning*.

wikimacros.enabled
:   Specifies whether macros are enabled in Wikis. You can use macros to automate common tasks, such as generating a table of contents in a wiki page.

    The default value of this parameter is false. To enable macros, set the value to true. When enabled, macros are available from the **Macros** menu in the editor toolbar.

scheduledTasks.DirectoryGroupSynch.args.maximumDataAgeInHours
:   Specifies the number of hours that group information can remain in the Wikis database before the synchronization task runs. If groups are disabled, the synchronization task does not run.

    The value must be greater than or equal to 0.

    The synchronization task runs automatically in the background, synchronizing group names in the Wikis database with the user directory. The task queries the user directory with the directory ID and when it finds a match it synchronizes the group name.

    The task runs on any group information that is older than the value specified in the scheduledTasks.DirectoryGroupSynch.args.maximumDataAgeInHours property. It runs at a frequency that is specified in the scheduledTasks.DirectoryGroupSynch.interval property. It pauses between groups for the amount of time that is specified in the scheduledTasks.DirectoryGroupSynch.args.pauseInMillis property.

scheduledTasks.DirectoryGroupSynch.args.pauseInMillis
:   Specifies the number of milliseconds that the synchronization task must wait before it updates information for the next group. Use this property to add an interval between synchronizing items in the queue. This interval avoids overloading your user directory when the task runs. Does not run if groups are disabled.

    The value must be greater than or equal to 0.

    The synchronization task runs automatically in the background, synchronizing group names in the Wikis database with the user directory. The task queries the user directory with the directory ID and when it finds a match it synchronizes the group name.

    The task runs on any group information that is older than the value specified in the scheduledTasks.DirectoryGroupSynch.args.maximumDataAgeInHours property. It runs at a frequency that is specified in the scheduledTasks.DirectoryGroupSynch.interval property. It pauses between groups for the amount of time that is specified in the scheduledTasks.DirectoryGroupSynch.args.pauseInMillis property.

    If the remote user directory can handle many simultaneous queries, you can enter 0 as the value.

scheduledTasks.DirectoryGroupSynch.enabled
:   Enables or disables the synchronization task for groups. The default is true.

    The synchronization task runs automatically in the background, synchronizing group names in the Wikis database with the user directory. The task queries the user directory with the directory ID and when it finds a match it synchronizes the group name.

scheduledTasks.DirectoryGroupSynch.interval
:   Specifies the frequency of the synchronization task.

    This property accepts a chronological expression. For information about formatting an interval attribute, see *Scheduling tasks*.

    The synchronization task runs automatically in the background, synchronizing group names in the Wikis database with the user directory. The task queries the user directory with the directory ID and when it finds a match it synchronizes the group name.

    The task runs on any group information that is older than the value specified in the scheduledTasks.DirectoryGroupSynch.args.maximumDataAgeInHours property. It runs at a frequency that is specified in the scheduledTasks.DirectoryGroupSynch.interval property. It pauses between groups for the amount of time that is specified in the scheduledTasks.DirectoryGroupSynch.args.pauseInMillis property.

    Adjust this property to speed up or slow down the process of synchronizing group information.

scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins
:   Specifies the number of minutes that files must be in the pending deletion queue before the delete files task deletes them. For example, the default value of 720 means that queued files are deleted when they are in the queue for 720 minutes or longer.

    The value must be greater than or equal to 0.

    A high value allows users to finish downloading large files. It also allows more lenient online backup policies. For example, for online backups that take fewer than this number of minutes, you do not have to pause the file deletion task. For more information about pausing the file deletion task during backups, see *Backing up data*.

scheduledTasks.FileActuallyDelete.enabled
:   Enables or disables the delete files task. The default is true.

    This task deletes files if they are marked as pending deletion, and they are older than the value specified in the scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins property.

scheduledTasks.FileActuallyDelete.interval
:   Specifies the frequency with which the delete files task runs.

    This property accepts a chronological expression. For information about formatting an interval attribute, see *Scheduling tasks*.

    Wikis are deleted if they are marked as pending deletion, and they are older than the value specified in the scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins property.

scheduledTasks.MetricsDailyCollection.enabled
:   Specifies whether to collect metrics. The values are true and false. The default value is true.

    The collection task runs near midnight in the server time zone so that all of the date-based metrics include data from that day. Metrics entries require only a few KB per day, therefore the performance impact is low.

    For information about MetricService commands that you can use to access metrics, see *Wikis administrative commands*.

scheduledTasks.MetricsDailyCollection.interval
:   Specifies the frequency with which the daily metrics collection task runs. Only the default value is supported: the task can run only at midnight in the server time zone. Do not edit this property.

scheduledTasks.TagUpdateFrequency.enabled
:   Specifies whether to run the tag frequency update task. This task finds the most frequently used tags in public wikis and updates the public wikis tag cloud.

scheduledTasks.TagUpdateFrequency.interval
:   Specifies the frequency with which the tag frequency update task runs. This task finds the most frequently used tags in public wikis and updates the public wikis tag cloud and the autocomplete lists.

    This property accepts a chronological expression. For information about formatting an interval attribute, see *Scheduling tasks*.

    Updating tag frequency data is resource-intensive, so you might want to adjust this value as your deployment grows. In small deployments, 60 minutes is appropriate. In large deployments, once per day is sufficient.

    This property affects public tags only. Tag clouds for individual wikis are updated in real time and are not affected.

search.seedlist.maximumIncrementalQuerySpanInDays
:   Specifies the number of days that deletion records are saved before they are eligible to be deleted by the SearchClearDeletionHistory task.

    The value must be greater than or equal to 1.

    Wikis keeps records of deleted files. These records are eligible to be deleted by the SearchClearDeletionHistory task after the number of days that are specified in this property. The incremental search crawler needs these deletion records to update the search index. If the records are deleted before the incremental crawler reads them, the updates are incomplete. For this reason, Wikis runs a full crawl instead of an incremental crawl. Full crawls delete the existing search index and add a new one. This process takes more time than incremental crawls.

    To avoid frequent full crawls, make sure that incremental crawls occur sooner than the time it takes for a deletion record to be created and deleted. For example, if deletion records are eligible for deletion after five days, specify that incremental crawls occur every four days.

search.seedlist.maximumPageSize
:   Specifies the maximum number of items on the seedlist return page. The value must be greater than or equal to 100.

security.inlineDownload.enabled
:   Enables the inline display of file attachments. Setting this property is useful when you use the Wikis API to download and display active content, such as Adobe® Flash \(.swf\) files, in your own HTML pages.

    By default, HCL Connections passes file attachments to browsers with the `Content-Disposition: attachment` header. This specification means that files are displayed as attachments. When users click the attachment, they are prompted to open or download the file. Enabling this property also prevents the embedding of files. If you want to embed files in your own HTML page by using an `embed` tag, the content disposition must be inline. This property affects active content such as Adobe Flash \(.swf\), and HTML pages that are referenced within an iFrame.

    Configure a property in the `wikis-config.xml` file to change the content disposition from attachment to inline. Then, set the inline parameter to true in your Wikis API download requests. See *Displaying file attachments inline*.

    Important: Wikis uses the attachment disposition for security reasons. Specifically, uploaded files can potentially contain malicious code that can exploit the cross-site scripting vulnerabilities of some browsers. If you switch to inline disposition, configure an alternative download domain for greater security. For more information, see *Mitigating a cross site scripting attack*.

    The allowed values are true and false.

security.logout.href
:   Specifies the logout URL for single-sign on solutions that require their own logout page.

    If you are configuring HCL Connections to work with Tivoli® Access Manager, specify the following value:

    ```
    /wikis/ibm_security_logout?logoutExitPage=<url>
    ```

    where `<url>` is the Tivoli Access Manager junction URL. This URL is usually the host name of the server.

    For more information, see *Enabling single sign-on for Tivoli Access Manager*.

    **Note:** You must use fully qualified domain names in the configuration file. If you use an abbreviated name, secure communication between the servers fails.

**Parent topic:**[Changing Wikis configuration property values](../admin/t_admin_wikis_changing_config_properties.md)

**Related information**  


[Specifying a separate file download domain](../secure/t_admin_act_minimize_xss_risk.md)

[Disabling wiki page versioning](../admin/t_admin_wikis_disable_versioning.md)

[Enabling single sign-on for Security Verify Access](../secure/t_secure_with_tam.md)

[Configuring file downloads through IBM HTTP Server](../install/t_install_post_files_downloads.md)

[Securing applications from malicious attack](../secure/c_admin_security_xss.md)

[Configuring file downloads through IBM HTTP Server](../install/t_install_post_files_downloads.md)

[Backing up Wikis data](../admin/t_admin_wikis_backup.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Restricting attachment file types in Wikis](../admin/t_admin_wikis_restrict_types.md)

[Common configuration properties](../admin/r_admin_common_props.md)

[Wikis administrative commands](../admin/r_admin_wikis_commands.md)

