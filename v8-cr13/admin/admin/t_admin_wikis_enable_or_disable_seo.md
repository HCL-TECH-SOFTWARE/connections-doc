# Enabling or disabling SEO {#enable_or_disable_SEO .task}

Enable or disable search engine optimization \(SEO\) of your public wiki content.

By default, HCL Connections automatically runs a scheduled task to generate a sitemap for SEO. The task runs at midnight every Sunday but you can change or disable this schedule if necessary.

The SitemapGenerator task queries the WIKIS database periodically and generates sitemap files. This task consumes memory and database resources so IBM recommends that you allow the task to run at off-peak times.

To change the scheduled SEO task, complete the following steps:

1.  Open the wikis-config.xml file. The default location of the file is:

    -   Linux™: [connections\_root](../plan/i_ovr_r_directory_conventions.md)/config/wikis-config.xml
    -   Linux: [connections\_root](../plan/i_ovr_r_directory_conventions.md)/config/wikis-config.xml
    -   Windows: [connections\_root](../plan/i_ovr_r_directory_conventions.md)\\config\\wikis-config.xml
2.  Find the stanza for the **SitemapGenerator** task.

3.  Disable the scheduled task by changing the value of the **<task enabled\>** parameter to false.

4.  Change the schedule by editing the **Interval** parameter. The value is a CRON expression. For more information about setting CRON values, see the *Scheduling tasks* topic.

5.  Save and close the wikis-config.xml file.

6.  To edit the number of URLs per sitemap or the output path of the sitemap file, open the web.xml file. The default location of the file is:

    -   Linux: [connections\_root](../plan/i_ovr_r_directory_conventions.md)/Wikis.ear/wikis.web.war/WEB-INF/web.xml
    -   Linux: [connections\_root](../plan/i_ovr_r_directory_conventions.md)/Wikis.ear/wikis.web.war/WEB-INF/web.xml
    -   Windows: [connections\_root](../plan/i_ovr_r_directory_conventions.md)\\Wikis.ear\\wikis.web.war\\WEB-INF\\web.xml
7.  Change the output path by changing the value of the **WIKI\_SITEMAP\_STORAGE\_ROOT** parameter.

8.  Change the number of URLs per sitemap by changing the value of the **WIKI\_SITEMAP\_URLS\_PER\_SITEMAP** parameter.

    **Note:** You can provide multiple sitemap files but each file must have no more than 50,000 URLs and must be no larger than 10 MB. For more information, go to the [Sitemaps XML format](http://www.sitemaps.org/protocol.html) webpage.

9.  Save and close the web.xml file.


**Parent topic:** [Search Engine Optimization \(SEO\) for Wikis](../admin/c_admin_wikis_SEO.md)

**Related information**  


[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

