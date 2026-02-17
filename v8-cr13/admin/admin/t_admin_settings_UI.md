# Specifying site-wide setting for Blogs {#t_admin_settings_UI .task}

Specify site-wide setting for all blogs in your organization.

Settings you specify for the site control what users are allowed to do when they create or use blogs. You must be logged in as an administrator to change site-wide settings.

1.  From the Blogs home page, click the **Administration** tab.

    **Note:** You must be logged in as an administrator to see the Administration tab.

2.  Click the **Configuration** link.

3.  Modify any of the following settings for the site:

    |Setting|Description|Default values|
    |-------|-----------|--------------|
    |Site name \(for Blogs Homepage and feed\)|Specify the full name for the main page of the site. This name will also be used in feeds.|Blogs|
    |Blog title \(shown in site banner\)|The blog title is displayed in the site banner.|Blogs|
    |Site description \(for Blogs Homepage and feed\)|Enter a description that describes the purpose of the Blogs site.|<blank\>|
    |Handle of blog to serve as Blogs Homepage|The handle is a short name used in the URL for the Blogs site. The Homepage Blog is created automatically when Blogs is installed. The theme for this blog is Blogs Homepage Theme. You can customize the look of this theme from the Blogs Homepage Theme page.|homepage|
    |Enable active content filtering|When enabled, unsafe HTML is removed from Blog posts. Active content filtering does not scan attached files. Be sure to scan files before uploading. Disabling introduces vulnerability to malicious cross-site scripting \(XSS\) attacks.|Enabled|
    |Automatic save when editing \(minutes\)|This option is to allow automatically save unsaved entries to prevent data loss. For new entries and draft entries, Blogs will save the current content in the editor every \# minutes according to this setting. **Note:** Make sure the autosave interval is less than the interval set for user session timeout or you will get an error notification that autosave failed.

|15|
    |Number of entries to display in Blogs Homepage|This setting controls the maximum number of public blog entries that will be listed on the Blogs Homepage.|25|
    |Max number of entries to allow per page|The maximum number of blog entries that will be listed on the blog site. If there are more than the specified number of entries to display, **Previous** / **Next** links are provided on the list for navigation.|50|
    |Number of entries to provide in newsfeeds|The maximum number of feeds that will be available to a feed reader at any given time.|50|
    |Allow blog comments|Allows any authenticated user to post a comment in response to a blog entry.|Enabled|
    |Allow blog trackbacks \(Inbound\)|Allows entries from other blogs to be posted to a blog on this site.|Enabled|
    |Allow blog trackbacks \(Outbound\)|Allows blog entries to be posted as comments in other blogs.|Enabled|
    |Email notification of comments|Allows blog entry creators to receive notifications when a new comment has been posted to their entries. Rather than periodically checking their blog for new comments, the entry creator automatically receives an email. If comments for the blog are moderated, an email is sent to the blog entry creator when a new comment is posted. In addition to enabling this setting, mail must also be configured during installation. See the *Configuring Blogs* topic in the Installation section for details on configuring mail service. **Note:** If you enable this application, blog owners can still turn it off for their blogs, but if it is disabled, blog owners do not see an option for email notification of comments.

|Disabled|
    |Enable file uploads|Allow a blog owner to upload files to be used on their blog. By default, Active Content Filtering scans file attachments that have a HTML, HTM or JS file extension. Be sure to scan files with other file extensions before uploading them.|Enabled|
    |Allowed extensions|A comma-separated list of the file types that are allowed to be uploaded. If this field is blank, all file extensions are allowed. Separate extensions with commas.|jpg,jpeg,gif,png|
    |Forbidden extensions|A comma separated list of file types that are not allowed to be uploaded.|<blank\>|
    |Max file size \(MB\)|Maximum size of an uploaded file.|1.00 MB|
    |Max directory size \(MB\)|Maximum storage space allocated per blog for uploading files.|4.00 MB|

4.  After making your changes, click **Save** to save your settings.

    You do not need to restart Blogs to see the configuration changes.


**Parent topic:**[Administering Blogs from the user interface](../admin/c_admin_blogs_UI.md)

