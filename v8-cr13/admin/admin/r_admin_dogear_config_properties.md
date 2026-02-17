# Bookmarks configuration properties {#r_admin_dogear_config_properties .reference}

Configuration settings control various configurable applications within Bookmarks. They require a Bookmarks application or server restart to take effect.

## Configuration properties { .section}

The following table lists the configuration settings that you can check out and modify for the dogear-config-cell.xml file.

|Configuration property|Description|
|----------------------|-----------|
|activeContentFilter.enabled|Bookmarks provides a filter that prevents users from using rich text descriptions with malicious scripts that are executed when other users visit bookmarks. You can disable this filter to provide richer options for content in any Bookmarks text input field. **Note:** Disabling this filter introduces vulnerability to XSS and other types of malicious attack. See *Securing applications from malicious attack* for additional information.

The default value is "true" and can be set to "false" if you wish not to filter active content.|
|bookmark.openInNewWindow|Controls the window behavior when users click on a bookmark. When the value is True, clicking a bookmark will open the URL in a new window. When False, the bookmark opens in the same window.|
|brokenURL.notifyAllOwners|Turns on or off the display of an option on the broken URL form that allows users to notify all other users who bookmarked a broken link. If the option is enabled, the user is also notified about how many other users will be notified about the broken URL before the notification mail is sent. The default is "True" which means the option is displayed on the Broken URL form.|
|brokenURL.notifyAdmin|If set to True, the Bookmarks administrator \(defined as the dogear-admin in the notification-config.xml file\) receives a copy of each notification email for a broken link. Set this property to false to suppress the notification.|
|embedStyle.embed|If you want to limit the allowable fonts users can use when embedding bookmarks in a web page to a list you specify, create a white list. If a white list is enabled, only the fonts specified can be used to display a list of bookmarks in a web page. To create a white list, change the value from "False" to "True" and specify the font families and font colors you want to allow for the bookmark list. For example: ```
<!--The embed snippet CSS white list
   -->
	  <embedStyle enabled="true">
	    <!-- font family white list-->
	    <stringProperty name="font.familyList">Times,Arial,Times New Roman,Verdana,Helvetica,Geneva</stringProperty>
	    <!-- font color white list-->
	    <stringProperty name="font.colorList">red,blue,green,yellow,orange,black,white,gold,snow</stringProperty>
	  </embedStyle>
```

|
|favicon.ajaxproxy.intranet.enabled|If set to True, Bookmarks will load the intranet bookmark favicons via the AJAX proxy; if set to False it will load bookmark favicons via direct network access.|
|favIconService.favicon.directory|Determines where the favicon image caches will be stored on the file system. This will be located on the local file system of each node machine.**Note:** Although you can change this setting in the configuration file, the recommended approach is to set this location from the websphere Application Server administrator console. For more information, see the topic "Changing the location of the favicon cache or full-text index."

|
|favIconService.favicon.maxAge|Small \(fav\) icons are displayed to end users next to each bookmark. Bookmarks downloads and caches these icons from the hosts servers for each URL. This setting determines length of time \(in days\) an icon remains cached locally before an updated copy is retrieved.|
|favIconService.favicon.maxSize|Small \(fav\) icons are displayed to end users next to each bookmark. Bookmarks downloads and caches these icons from the hosts servers for each URL. This setting provides a cap \(in KB\) on the size of the cached icon to control image file size. The default is 36 KB.|
|favIconService.favicon.queuesize|Starting from Connections 2.5, the request to update the favicon of a specific webpage will be handled by a scheduled task running at the server. Such requests will be put in the task queue and be consumed when the favicon is updated. This setting defines the maximum size of the requests the task queue can contain. When the queue is full, new requests will be discarded until the requests in queue are consumed. The default is 100.|
|favIconService.favicon.start|Provides the time \(in minutes\) the favicon task will start after Bookmarks service starts. The default is 5 minutes.|
|linkPurgingTask.lpTask.interval|Provides the interval \(in minutes\) of 2 purging task rounds. The default is 60 minutes.|
|linkPurgingTask.lpTask.purgeDeleted|When a user deletes a bookmark \(a link\), it will be marked as deleted bookmark. The bookmark record will be kept for a specific period in order to let search indexer to update the index. This setting provides the number of days a deleted bookmark will be kept in Bookmarks database before being purged out. The default is 30 days.|
|linkPurgingTask.lpTask.start|Provides the time \(in minutes\) the bookmark purging task will start after Bookmarks service starts. The default is 15 minutes.|
|linkThresholds.countInterval.useCountCache|When the cache is enabled, it will be updated after being used for specific times. The default is 10.|
|linkThresholds.maxInclude.popularLinks|Provides a maximum number of links that will get included in the popular link algorithm. If there are more links that are eligible to be included based on the other settings, the algorithm will take the most recent links that fall within this cap. This is to ensure consistent performance over peak times. The default value is 2000 links.|
|linkThresholds.minLinkCount.useCountCache|The total number of bookmarks showed on the UI will be cached after the total number of bookmarks exceeds a specific number. The default is 100,000.|
|linkThresholds.minURLCount.useCountCache|The total number of URLs showed on the UI will be cached after the total number of URLs exceeds a specific number. The default is 10,000.|
|linkThresholds.sinceWhen.inboxLinks|Determines age \(in days\) a link may be to get included in a user's watchlist. Smaller values will result in better performance. The default is 20 days.|
|linkThresholds.sinceWhen.mostVisitedLinks|Determines age \(in days\) a link may be to get included in the Most Visited section. The default is 30 days.|
|linkThresholds.sinceWhen.popularLinks|Determines the age \(in days\) a link may be to get included in the popular link algorithm. This value is used in conjunction with the other popular link settings to determine what bookmarks are included on the "Popular" bookmarks tab. Smaller values result in better performance. The default is 30 days.|
|personThresholds.maxInclude.activePerson|Provides a maximum number of bookmarks \(and the associated people\) that are included in the active person list algorithm. If more entries are eligible to be included in this calculation based on the other settings, the algorithm will take the people associated with the most recent links that fall within this cap. This is to ensure consistent performance over peak times. The default value is 1500 bookmarks.|
|personThresholds.minCount.activePerson|Provides a minimum number of bookmarks a user must have within the active time window to be considered for the active person list. People that have less bookmarks than this threshold will not be included in the list on the All and Popular bookmark views. This value is used in conjunction with the other active person threshold settings to determine who is included in the active person list. The default is 5 bookmarks.|
|personThresholds.sinceWhen.activePerson|Determines age \(in days\) a bookmark may be to have the associated person included in the active person list on the All and Popular bookmark views. This value is used in conjunction with the other active person threshold settings to determine who is included in the active person list. Smaller values will result in better performance. The default is 30 days.|
|tagThresholds.maxInclude.activeTags|Provides a maximum number of tags that will get included in the active tag algorithm. If there are more tags that are eligible to be included in this calculation based on the other settings, the algorithm will take the most recent tags that fall within this cap. This is to ensure consistent performance over peak times. The default value is 4000 tags.|
|tagThresholds.minCount.activeTags|Provides a minimum number of occurrences for a tag within the active time window for it to show in the Active Tag cloud. Tags that occur less than this threshold within the active time window will not show in the Active Tag cloud on the All and Popular bookmark views. This value is used in conjunction with the other active tag threshold settings to determine what is included in the tag cloud. The default is 1 tag.|
|tagThresholds.sinceWhen.activeTags|Determines age \(in days\) a link may be to have its tags included in the Active Tag cloud shown on the All and Popular bookmark views. This value is used in conjunction with the other active tag threshold settings to determine what is included in the tag cloud. Smaller values will result in better performance. The default is 30 days.|

**Parent topic:**[Accessing the Bookmarks configuration file](../admin/t_admin_dogear_accessing_config.md)

