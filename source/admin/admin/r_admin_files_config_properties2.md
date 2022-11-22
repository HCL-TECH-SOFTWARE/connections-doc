# Files configuration properties {#filesconfigurationproperties .reference}

Configuration properties control how and when various Files operations occur and help optimize performance.

## Modifying configuration properties { .section}

You can modify the following configuration properties in the files-config.xml file. After making changes to the file, restart the Files server to implement the changes.

Note the following restrictions on the values allowed in the file:

-   All configuration properties \(except those with multiple values\) are required.
-   `.enabled` properties must have boolean values of either `true` or `false`.
-   Number values must be integers.

activeContentFilter.enabled
:   Does not apply to this release.

api.indent.enabled
:   Specifies whether the Files service API output is indented. This is `false` by default. To enable indentation, specify `true`.

    Enable this property to help with development and debugging. It is disabled by default because it does affect performance.

api.simpleUploadAPI.maximumSizeInKb
:   Specifies the maximum file size that can be uploaded by the simple upload mechanism. One thread of the WebSphere® Application Server is blocked while data is received. Larger files can be uploaded via the IBM HTTP Server if upload.modIBMUpload.enabled is true.

cache.http.publicContentMaxAgeInSecs
:   Maximum age of the public content cache before it is refreshed, in seconds. The public content cache stores static web resources, such as JavaScript and images. Decrease this value to show resource changes more quickly.

    The value must be greater than or equal to 0.

    **Note:** You can force a resource update by opening the LotusConnections-config.xml common configuration properties file and setting the versionStamp property to any token. This token is included in most urls, so changing this token changes the url. Since urls are cached by path and cache header, the new url overrides the old url and refreshes the resources. For information, see *Common configuration properties*.

    **Note:** Some resources, such as some images, do not use version stamps. If you edit those frequently, you can decrease the cache.http.publicContentMaxAgeInSecs value to show changes more quickly. If not, you can leave the value high and update the version stamp when you make changes.

cache.http.publicFeedMaxAgeInSecs
:   Maximum age of the public feed cache before it is refreshed, in seconds. Public feeds pass information to the Public Files view. You may want to raise this value in very large deployments \(for example, over a million files\) to avoid performance issues. It could also be decreased to have very up-to-date information in the public view. A value of 0 means no feeds are cached.

    The value must be greater than or equal to 0.

cache.user.timeout
:   Number of milliseconds user objects stay in the user information cache. The user information cache stores metadata about users, such as names and email addresses. Use this property to control the frequency of requests to the Files database for user information.

    The value must be greater than or equal to 1.

    If the value of a user's data changes in the background \(when the update user task or commands for MemberSynch are executed\) the cache is invalidated.

db.dialect
:   Reflects the current database type, typically specified during installation. Accepts the values DB2, Oracle, or SQL Server.

directory.community.membershipCache.maximumAgeOnLoginInSeconds
:   Number of seconds after a user logs in that community membership cache is refreshed. Only applicable if Community Files and Community Integration are enabled.

    The value must be greater than or equal to 0.

    Refreshing the cache is required for a user to have the same access as the community, but it affects performance. A short time before refresh means Files is more up-to-date, but performance may be slower. A long time before refresh may affect performance less, but users do not have immediate access to what the community can access.

    You can decrease the value here and then tell users that logging out and then in again is the best way to refresh the cache. This would allow you to increase the number of seconds in directory.community.membershipCache.maximumAgeOnRequestInSeconds so that frequent requests would not affect performance.

directory.community.membershipCache.maximumAgeOnRequestInSeconds
:   Number of seconds after an application request that the community membership cache is refreshed. Only applicable if Community Files and Community Integration are enabled.

    The value must be greater than or equal to 0.

    Refreshing the cache is required for a user to have the same access as the community, but it affects performance. A short time before refresh means Files is more up-to-date, but performance may be slower. A long time before refresh may affect performance less, but users do not have immediate access to what the community can access.

    If you decrease the value of directory.community.membershipCache.maximumAgeOnLoginInSeconds and then tell users that logging out and then in again is the best way to refresh the cache, you can increase this value to 10 or even 20 minutes, so that frequent requests will not affect performance.

directory.group.membershipCache.maximumAgeOnLoginInSeconds
:   Number of seconds after a user logs in that the group membership cache is refreshed. Only applicable if groups are enabled.

    The value must be greater than or equal to 0.

    Refreshing the cache is required for a user to have the same access as the group, but it affects performance. A short time before refresh means Files is more up-to-date, but performance may be slower. A long time before refresh may affect performance less, but users do not have immediate access to what the group can access.

    You can decrease the value here and then tell users that logging out and then in again is the best way to refresh the cache. This would allow you to increase the number of seconds in directory.group.membershipCache.maximumAgeOnRequestInSeconds so that frequent requests would not affect performance.

directory.group.membershipCache.maximumAgeOnRequestInSeconds
:   Number of seconds after an application request that the group membership cache is refreshed. Only applicable if groups are enabled.

    The value must be greater than or equal to 0.

    Refreshing the cache is required for a user to have the same access as the group, but it affects performance. A short time before refresh means Files is more up-to-date, but performance may be slower. A long time before refresh may affect performance less, but users do not have immediate access to what the group can access.

    If you decrease the value of directory.group.membershipCache.maximumAgeOnLoginInSeconds and then tell users that logging out and then in again is the best way to refresh the cache, you can increase this value to 10 or even 20 minutes, so that frequent requests will not affect performance.

directory.typeaheadSearch.maximumResults
:   Maximum number of names to display when a user searches for user or group names in a search field. Sets a maximum for both typeahead results and search results \(when they click the search icon\).

    The value must be greater than or equal to 1.

    If the value is very large, such as 1,000, and there are 1,000 or more matches, all names are returned and performance is greatly reduced. If the value is low, such as 10, users typing a generic name might not see all matches.

download.modIBMLocalRedirect.enabled
:   Specifies whether the IBM® HTTP Server serves downloaded files instead of the WebSphere® Application Server redirect servlet.

    You can configure HCL Connections to have the IBM HTTP Server download files. This is strongly recommended in production environments.

    If this property is set to true, you must also specify a URL in the download.modIBMLocalRedirect.hrefPathPrefix property. If the property is set to false, the WebSphere Application Server redirect servlet downloads files.

    To see information and steps for configuring the IBM HTTP Server to download files, see *Configuring file downloads through the HTTP Server*.

download.modIBMLocalRedirect.hrefPathPrefix
:   Path to the file system directory where Files data is stored. The file path should not include a trailing slash.

    This is only relevant if the download.modIBMLocalRedirect.enabled property is true.

    To see more information and steps for configuring the IBM HTTP Server to download files, see *Configuring file downloads through the HTTP Server*.

download.stats.logging.enabled
:   Level of detail to log about file downloads. If true, the Files application logs detailed download statistics, including the names of authenticated users who download files, and the version they most recently downloaded. If false, the applications only log the number of times a file is downloaded.

    Specify true for a better user experience and auditing.

emailNotification.addOnMediaDownload.enabled
:   Specifies whether to send email notification to users who download a file when the file is edited.

    The download.stats.logging.enabled property must be true for this to work.

file.attachment.maximumSizeInKb
:   Does not apply to Files. Files does not have attachments, the value in this property will not affect the application.

file.media.maximumSizeInKb
:   Maximum size allowed for media, in kilobytes. In Files, media are files.

    The recommended file maximum size should be less than 2 GB.

    The value must be greater than or equal to 1.

    This property is useful if you want a relatively large quota size for libraries, but you do not want users upload very large files, such as .iso files.

    After changing this value, the maximum size limit will not change for users until their browser cache is refreshed. You can force a refresh by running a command to update the product version stamp. see *Post-customization step* for more information on forcing a browser cache refresh.

file.page.maximumSizeInKb
:   Does not apply to Files. Files does not have pages, the value in this property will not affect the application.

file.restrictions.enabled
:   Enables or disables the ability to restrict the types of files that users can upload in Files. Accepts the values true or false.

    To see information and steps for restricting file types, see *Restricting file types in Files*.

file.restrictions.mode
:   Sets the mode for file extension restrictions. Accepts the values allow or deny. If the value is allow, then users can only upload files with extensions on the list, or change the extension of existing files to those on the list. If the value is deny, then users can only upload files with extensions not the list, or change the extension of existing files to those not the list.

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

    To see information and steps for restricting file types, see *Restricting file types in Files*.

file.storage.rootDirectory
:   Path to the file system directory where Files data is stored. This can be set during installation and be different for each node in a cluster. If a directory is specified in during installation this value \(a variable by default\) is populated by the WebSphere Application Server. However, you can specify any directory.

    HCL Connections looks for a files and a temp directory in this directory. If they are not there they are created. The temp directory stores data while the data is uploaded or virus scanned \(if enabled\). The files directory contains the binary data that must be backed up.

    For more information on backing up data, see *Backing up Files data*.

file.versioning.enabled
:   Specifies whether file versioning is allowed. Specify true or false.

    If false, the versioning interface does not display and the first version is always current. If you disable this after multiple versions of a file are created the latest version becomes the current and only version.

    Note that new versions are created only when content changes, not title or tags or other metadata.

    Specify false to simplify and reduce data storage.

    For more information, see *Disabling file versioning*.

publicMedia.maximumResults
:   Maximum number of files displayed in public views. For example, the default setting of 1000 means public views can only have 1000 files. Adjust this property to improve performance.

    The value must be greater than or equal to 100.

renditions
:   Specifies whether Files can generate previews for files types that can be displayed inline in areas as the activity stream, embedded experience gadget, and media gallery widget. Only JPEG, JPG, GIF, and PNG file types are available for preview. The generated previews can be in JPG \(default\) or PNG format.

:   The following `renditions enabled` sample enables display of thumbnail images and specifies image format and size for each preview style:

    ```
    <renditions enabled="true">
                   <small format="JPG" width="100" height="100"/>
                   <medium format="JPG" width="250" height="250"/>
                  < large format="JPG" width="500" height="500"/>
               </renditions>
    ```

    For data existing before Connections 4.0, you can use the following scheduled task to enable and generate previews for supported file types.

    ```
    <task name="RenditionDailyGeneration" interval="0 0 0 * * ?" enabled="true" type="internal"></task> 
    ```

scheduledTasks.DirectoryGroupSynch.args.maximumDataAgeInHours
:   Specifies the number of hours that group information can remain in the Files database before the synchronization task can run on it. Does not run if groups are disabled.

    The value must be greater than or equal to 0.

    The synchronization task runs automatically in the background, synchronizing group names in the Files database with the HCL Connections user directory. It queries the user directory with the directory ID and when it finds a match it synchronizes the group name.

    The task runs on any group information older than the value specified in the scheduledTasks.DirectoryGroupSynch.args.maximumDataAgeInHours property. It runs at a frequency specified in the scheduledTasks.DirectoryGroupSynch.interval property. It pauses between groups for the amount of time specified in the scheduledTasks.DirectoryGroupSynch.args.pauseInMillis property.

scheduledTasks.DirectoryGroupSynch.args.pauseInMillis
:   Number of milliseconds that the synchronization task should wait before updating the next group's information. Use this to add a small amount of time between synchronizing items in the queue to avoid overloading your user directory as the task runs. Does not run if groups are disabled.

    The value must be greater than or equal to 0.

    The synchronization task runs automatically in the background, synchronizing group names in the Files database with the HCL Connections user directory. It queries the user directory with the directory ID and when it finds a match it synchronizes the group name.

    The task runs on any information older than the value specified in the scheduledTasks.DirectoryGroupSynch.args.maximumDataAgeInHours property. It runs at a frequency specified in the scheduledTasks.DirectoryGroupSynch.interval property. It pauses between groups for the amount of time specified in the scheduledTasks.DirectoryGroupSynch.args.pauseInMillis property.

    Zero is an acceptable value if the remote user directory can handle many simultaneous queries.

scheduledTasks.DirectoryGroupSynch.enabled
:   Enables or disables the synchronization task for groups. The default is true.

    The synchronization task runs automatically in the background, synchronizing group names in the Files database with the HCL Connections user directory. It queries the user directory with the directory ID and when it finds a match it synchronizes the group name. If the group name is not found in the user directory, it is removed from the database.

scheduledTasks.DirectoryGroupSynch.interval
:   Frequency with which the synchronization task runs.

    This property accepts a chronological expression.

    The synchronization task runs automatically in the background, synchronizing group names in the Files database with the HCL Connections user directory. It queries the user directory with the directory ID and when it finds a match it synchronizes the group name.

    The task runs on any group information older than the value specified in the scheduledTasks.DirectoryGroupSynch.args.maximumDataAgeInHours property. It runs at a frequency specified in the scheduledTasks.DirectoryGroupSynch.interval property. It pauses between groups for the amount of time specified in the scheduledTasks.DirectoryGroupSynch.args.pauseInMillis property.

    Adjust this property to speed up or slow down the process of synchronizing group information.

scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins
:   Number of minutes that files must be in the pending deletion queue before the delete files task will delete them. For example, the default value of 720 means they will be deleted if they have been in the pending deletion queue 720 or more minutes.

    The value must be greater than or equal to 0.

    More pending time allows users to finish downloads of files added to the pending deletion queue. It also allows looser online back up policies. For example, for online backups that take less than this number of minutes you do not need to pause the file deletion task. For more information about pausing the file deletion task during backups, see *Backing up Files data*.

scheduledTasks.FileActuallyDelete.enabled
:   Enables or disables the delete files task. The default is true.

    The task deletes files if they are marked as pending deletion, and they are older than the value specified in the scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins property.

scheduledTasks.FileActuallyDelete.interval
:   Frequency with which the delete files task runs.

    This property accepts a chronological expression.

    Files are deleted if they are marked as pending deletion, and they are older than the value specified in the scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins property.

scheduledTasks.MetricsDailyCollection.enabled
:   Specifies whether to collect metrics. Specify true or false.

    See *Files administrative commands* for MetricService commands you can use to access metrics.

    The collection task runs near midnight in the server timezone, so all of the date-based metrics include data from most of a given day. Metrics entries only require a few kilobytes per day, so there is little performance impact to enabling them.

scheduledTasks.MetricsDailyCollection.interval
:   Frequency with which daily metrics collection task runs. Only the default is supported: the task can only run at midnight in the server timezone. Do not edit this property.

scheduledTasks.TagUpdateFrequency.enabled
:   Specifies whether to run the tag frequency update task. This task finds the most frequently used tags in public files updates the public files tag cloud.

scheduledTasks.TagUpdateFrequency.interval
:   Frequency with which the tag frequency update task runs. This task finds the most frequently used tags in public files and updates public tag clouds and the autocomplete lists that display when users type a tag name in the tag filter field. For example, it measures how often the tag human-resources is used in public files and updates the cloud and lists accordingly.

    This property accepts a chronological expression.

    Updating tag frequency data is resource-intensive, so you may want to adjust this value as your deployment grows. In small deployments 60 minutes is appropriate. In large deployments, once per day is recommended. Only updating once per day in large deployments should not cause problems, since the 100 to 500 most-used tags do not change very often.

    This property only affects public tags. Tag clouds for one person's set of files are updated in real time and are not affected.

scheduledTasks.SearchClearDeletionHistory.enabled
:   Specifies whether to run the task. Specify true or false.

scheduledTasks.SearchClearDeletionHistory.interval
:   Frequency with which the task runs.

    This property accepts a chronological expression.

scheduledTasks.RenditionDailyGeneration.enabled
:   Specifies whether to run the rendition task. Specify true or false.

scheduledTasks.RenditionDailyGeneration.interval
:   Frequency with which the rendition task runs.

    This property accepts a chronological expression.

search.seedlist.maximumIncrementalQuerySpanInDays
:   Number of days that deletion records are saved before they are eligible to be deleted by the SearchClearDeletionHistory task.

    The value must be greater than or equal to 1.

    Files keeps records of deleted files. These records are eligible to be deleted by the SearchClearDeletionHistory task after the number of days specified in this property. The incremental search crawler needs these deletion records to update the search index. If the records are deleted before the incremental crawler reads them, updates will be incomplete. This is not allowed, so Files performs a full crawl instead of an incremental crawl. Full crawls delete the existing search index and create a new one, which is more time consuming than incremental crawls.

    To avoid frequent full crawls, set this value higher than the span of days between incremental crawls. For example, if incremental crawls happen every four days, set this value higher than 4. This ensures that incremental crawls capture all deletion records.

search.seedlist.maximumPageSize
:   Maximum number of items on search return page. The value must be greater than or equal to 100.

security.inlineDownload.enabled
:   Enables inline display of files. This is useful when you use the Files API to download and display active content, such as Adobe® Flash \(.swf\) files, in your own HTML pages.

    By default, the HCL Connections server passes Files application files to browsers with the header Content-Disposition: attachment. This means files display as attachments; when users click the attachment they are prompted to open or download the file. It also prevents embedding files. If you want to embed files in your own HTML page using an <embed\> tag, the content disposition must be inline. This affects active content, such as Adobe Flash \(.swf\), and HTML pages referenced with <iframe\>.

    Configure a property in `files-config.xml` to change the content disposition from attachment to inline. Then set the inline parameter to true in your Files API download requests. See *Displaying files inline*.

    **Note:** Files uses the attachment disposition for security reasons. Uploaded files could potentially contain malicious code that can exploit the cross-site scripting vulnerabilities of some browsers. If you switch to inline disposition, you should configure an alternate domain download for greater security. See *Securing applications from malicious attack*.

    Accepted values are `true` and `false`.

security.logout.href
:   Logout URL for single-sign on solutions that require their own logout page.

    If you are configuring HCL Connections to work with Tivoli® Access Manager, specify the following value:

    ```
    /files/ibm_security_logout?logoutExitPage=<url>
    ```

    where `<url>` is the Tivoli Access Manager junction URL \(this is usually the host name of the server\).

    For more information, see *Enabling single-sign on with IBM Tivoli Access Manager*.

    **Note:** You must use fully-qualified domain names in this configuration file. If you use an abbreviated name, secure communications between servers will fail.

    If you customize the contextroot for Files in WebSphere Application Server \(WAS\) and LotusConnections-config.xml, you must also change the contextroot in the security.logout.href value. Otherwise, users will be unable to log out.

tagFilter
:   Specifies the maximum number of tags to filter Files search results. The default is 3. A value greater than 10 is not recommended for performance reasons. Format is as follows:

    ```
    <tagFilter maximumTags="5"/>
    
    ```

upload.modIBMUpload.enabled
:   Specifies whether the IBM® HTTP Server receives uploaded files instead of the WebSphere® Application Server.

    This is an optimization that moves potentially long running tasks off of the WebSphere® Application Server, which is tuned for short running operations. If this property is set to true, increase the file.media.maximumSizeInKb property to allow large files to be uploaded. If this property is set to false, the WebSphere Application Server handles the complete upload process. For more information and steps for configuring the IBM HTTP Server to upload files, see [Configuring file uploads through the HTTP Server](../install/t_install_post_files_uploads.md).

    **Note:** Files sizes up to the value of api.simpleUploadAPI.maximumSizeInKb are still uploaded by the WebSphere® Application Server.

For information on how to format the value of an interval attribute, see *Scheduling tasks*.

**Parent topic:**[Changing Files configuration property values](../admin/t_admin_files_changing_config_properties.md)

**Related information**  


[Disabling file versioning](../admin/t_admin_files_disable_versioning.md)

[Enabling single sign-on for Security Verify Access](../secure/t_secure_with_tam.md)

[Securing applications from malicious attack](../secure/c_admin_security_xss.md)

[Backing up Files data](../admin/t_admin_files_backup.md)

[Configuring file downloads through IBM HTTP Server](../install/t_install_post_files_downloads.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Displaying files inline](../admin/t_admin_files_enable_inline.md)

[Restricting file types in Files](../admin/t_admin_files_restrict_types.md)

[Files administrative commands](../admin/r_admin_files_commands.md)

[Common configuration properties](../admin/r_admin_common_props.md)

