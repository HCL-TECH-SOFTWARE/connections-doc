# Administering Blogs using the wsadmin client {#r_admin_blogs_wsadmin .reference}

As an alternative to modifying the Blogs site settings from the Blogs user interface via the Administration tab, you can also modify settings using the wsadmin client.

## Site-wide configuration { .section}

Blogs site-wide configuration information is stored in the Blogs database, rather than in an XML file. Therefore, you do not need to check out \(or check in\) the Blogs site-wide configuration file because any configuration changes you make are written directly into the database.

You use the BlogConfigService.showConfig and BlogsConfigService.updateConfig commands to view and make site-wide configuration changes to Blogs configuration settings. Changing a Blogs site-wide configuration setting from the wsadmin command session requires the following procedures:

1.  Start the wsadmin client from the following directory of the system on which you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    For example, on Windows:

    ```
    C:\Program Files\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
    ```

    **Attention:** You must run the following command to start the wsadmin client from this specific directory because the Jython files for the product are stored here. If you try to start the client from a different directory, then the execfile\(\) command that you subsequently call to initialize the administration environment for an HCL Connections component does not work correctly. See the topic *Starting the wsadmin client*.

2.  Start the Blogs Jython script interpreter by entering the following command:

    ```
    execfile("blogsAdmin.py")
    
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

3.  To view the current values of the editable configuration property keys for Blogs, use the following command and note its output. The following output is a sample; your output may differ.

    ```
    BlogsConfigService.showConfig()
    
    Blogs configuration properties:
    	ACFEnabled = true
    	CustomThemeAllowed = false
    	EditingPollInterval = 15
    	InboundTrackBacksEnabled = True
    	OutboundTrackBacksEnabled = True
    	SiteDescription =
    	SiteFrontPageweblogHandle = home
    	SiteName = Blogs Home
    	SiteNewsFeedsDefaultEntries = 30
    	SitePagesMaxEntries = 30
    	SiteShortName = Blogs Home
    	UploadsDirMaxSize = 4.0
    	UploadsEnabled = true
    	UploadsFileMaxSize = 1.0
    	UploadsTypesAllowed = jpg,jpeg,gif,png,
    	UploadsTypesForbid =
    	UsersCommentsEmailNotify = true
    	UsersCommentsEnabled = true
    	UsersModerationRequired = false
    ```


The following tables list the commands available for changing Blogs configuration settings. To change a setting, enter the appropriate property and a new value into the following command:

```
BlogsConfigService.updateConfig("[property]", "[value]")

```

where:

-   \[property\] is a valid blogs configuration setting
-   \[value\] is the new value for the setting.

Example: `wsadmin>BlogsConfigService.updateConfig("EditingPollInterval", "20")`

**Note:** Configuration updates take effect immediately and do not require a server restart.

|Option|Type|Description|UI Field Equivalent|
|------|----|-----------|-------------------|
|SiteName|String|Updates the name of the site \(displayed on the front page\)|**Site Name**|
|SiteShortName|String|Updates the name used for the page tab in browsers|**Short name**|
|SiteDescription|String|Updates the site description \(used on the front page\)|**Site Description**|
|SiteFrontPageweblogHandle|String|Updates the handle of the blog home page|**Handle of blog to serve as frontpage blog**|
|ACFEnabled|String|Turns on / off the Active Content Filter \(The Active Content Filter removes unsafe HTML from Blog posts that could be used for a XSS attack.\) Valid values are: true or false.

|**Enable active content filtering**|
|EditingPollInterval|Integer|Automatically saves content in the editor when a user is creating an entry or a comment. Set this to the number of minutes between saves.

|**Automatic save when editing \(minutes\)**|

|Option|Type|Description|UI Field|
|------|----|-----------|--------|
|SitePagesMaxEntries|Integer|Maximum number of posts that a blog can have on its home page|**Max number of entries to allow per page**|
|SiteNewsFeedsDefaultEntries|Integer|Maximum number of posts that can be in a blogs feed|**Number of entries to provide in newsfeeds**|

|Option|Type|Description|UI Field|
|------|----|-----------|--------|
|UsersCommentsEnabled|String|Turns on and off the ability to add any comments in the site. Valid values are: true or false.|**Allow blog comments**|
|TrackBacksEnabled|String|Turns on and off the ability to add any trackbacks across the site. Valid values are: true or false.|**Allow blog trackbacks**|
|UsersCommentsEmailNotify|String|Whether users can get email notifications when comments are added to their blog. Valid values are: true or false.|**Email notification of comments**|
|UsersModerationRequired|String|Indicates whether comments always require moderation before being added to a blog. Valid values are: true or false.|**Require comment moderation for all blogs**|

|Option|Type|Description|UI Field|
|------|----|-----------|--------|
|UploadsEnabled|String|If enabled, file uploads are allowed for this site. Valid values are: true or false.|**Enable File Uploads**|
|UploadsTypesAllowed|String|Comma delimited list of allowed file type extensions. Only files with these extensions are allowed to be uploaded.|**Allowed Extensions**|
|UploadsTypesForbid|String|Comma delimited list of file type extensions that are not permitted. Files with these extensions are not allowed to be uploaded.|**Forbidden Extensions**|
|UploadsFileMaxSize|Double|Maximum file size that can be uploaded by any user|**Max File Size \(MB\)**|
|UploadsDirMaxSize|Double|Maximum size of total uploaded file directory for a given blog|**Max Directory Size \(MB\)**|

|Option|Type|Description|UI Field|
|------|----|-----------|--------|
|CustomThemeAllowed|String|Determines if custom themes are allowed. Valid values are: true or false.|**Allow Custom Themes**|

-   **[Specifying an administrator email address for Blogs notifications](../admin/t_admin_blogs_admin_email.md)**  
Edit configuration property settings to change the administrator email address for notifications. This is the address used to send system notifications, such as notifications sent to users who have posted inappropriate content.
-   **[Changing the blog handle](../admin/t_admin_blogs_change_blog_handle.md)**  
Run a command to change your blog handle. The blog handle displays in the URL for your blog.
-   **[Replacing URLs in Blogs](../admin/t_admin_blogs_replace_urls.md)**  
Run a command to replace URLs in your Blogs deployment to correct broken links.
-   **[Restoring a Community Blog after a Communities database failure](../admin/c_admin_blogs_restoring_community_blog.md)**  
If the Communities database fails and is restored from a backup, you can restore the Blogs widget and delete any orphaned data.

**Parent topic:**[Administering Blogs](../admin/c_administering_blogs.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

