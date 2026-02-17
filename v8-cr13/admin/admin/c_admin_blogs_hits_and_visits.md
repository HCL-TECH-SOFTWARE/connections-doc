# Understanding and configuring blog hits and visits {#c_admin_blogs_hits_and_visits .concept}

Understand how blog hits and visits are calculated and how you can modify the way each count is done.

If you are trying to gather data on how many times a blog entry is accessed, you can consider two metrics:

-   Visits count the total number of times a blog entry is accessed, including clicks from another page in the same blog.
-   Referrer hits also count how many times a blog entry is accessed, but provides more information about where the hits come from. To view referrer hits, choose **Settings** for a blog, then click **Referrers**.

Starting with HCL Connections 3.0, hits and visits are counted the same way. This is a change from the way hits were counted in previous releases. If you want to revert to the old behavior, where referrer hits are not counted if they come from another page in the same blog, modify the `roller.properties` file as follows:

1.  Edit the `roller.properties` file from this location: `IBM\\WebSphere\\AppServer\\profiles\\<profile_name>\\installedApps\\<cell_name>\\Blogs.ear\\blogs.war\\WEB-INF\\classes`
2.  Set referrer.ignoreSelfReferer to true.
3.  Save your changes and restart the Blogs server for changes to take effect.

!!! note 
    
    If you modify `roller.properties`, the counts for visits and hits will differ.

## Referrer hits { .section}

Referrer hits are divided into:

-   Direct hits with no referrer information available
-   URL hits with referrer information available

Direct hits increment the hit tally under these circumstances:

-   A blog entry is created
-   A blog or blog entry is accessed via a link from an e-mail message
-   The user enters the blog or blog entry URL directly into a browser
-   The blog or blog entry link is selected from a Web page, but the referring server does not send the referrer information
-   The blog or blog entry is accessed via a link in a feed reader
-   The blog or blog entry is accessed via a link embedded in a bookmark

URL hits increment the hit tally under these circumstances:

-   A blog or blog entry is selected from within Connections
-   A blog or blog entry is accessed via a link from a Web page that sends referrer information

## Visits { .section}

The count for visits counts the number of times a blog entry is accessed. The count is displayed in the blogs Web UI and is used to measure popularity and other metrics.

Starting with HCL Connections 3.0, anyone clicking a blog or entry will increase its visit count, even it is the blog author accessing the content. In prior releases, the count was not increased if the click came from the blog or entry author. If you want to revert to the previous behavior, where visits are not counted if they come from the author, modify the `roller.properties` file.

1.  Edit the `roller.properties` file from this location on the deployment manager node: `IBM\\WebSphere\\AppServer\\profiles\\<profile\_name\>\\installedApps\\<cell\_name\>\\Blogs.ear\\blogs.war\\WEB-INF\\classes`
2.  Set hitcount.ignoreSelfClick to true.
3.  Synchronize the changes from the deployment manager to the nodes.

## Caching { .section}

The way the blog pages are cached in the browser may contribute to a temporary inaccuracy in the visit count visible in the UI. The visit count is not refreshed until the web page cache expires and the page is reloaded from the application server. Under some circumstance this may require an update to some of the blog content that will cause page to reload.

## Behavior when cache proxy is enabled { .section}

If the user is using a cache proxy and has specified CacheMaxExpire with a specific time period, a page will be served via the cache proxy within this time period without checking the host server. Since the request is not processed by the application server there is no way to count it, so neither the referrer nor the visit count is incremented.

!!! note

    Prior to HCL Connections 3.0, the behavior when a cache proxy was in use was as follows: when a request was processed by the application server and the request header contained "If-Modified-Since", the server checked for updates. If there were no updates, a return code of 304/SC\_NOT\_MODIFIED was issued and the visit count remained the same. This is one case where the referrer count increased, but the visit count did not. This rule can be useful so that when a user keeps refreshing the page without clearing the cache, the visit count is not increased. The exception is the author's own hit where the server returns a 200 code even when there are no new entries. This is actually a flaw that authors can exploit by logging in and refreshing the page to increase the visit count to their own blog entry. In the current implementation, the referrer count and visit count will be increased even in the 304 response case.

If you want to revert to the previous behavior, modify the `roller.properties` file as follows:

1.  Edit the `roller.properties` file from this location: `IBM\\WebSphere\\AppServer\\profiles\\<profile_name>\\installedApps\\<cell_name>\\Blogs.ear\\blogs.war\\WEB-INF\\classes`
2.  If the user does not want the visit count to be increased if page is served from browser side cache \(304 not modified\), set hitcount.ignore304 to true. The default value of this configuration is false.
3.  If the user does not want referrer counts to be increased if page is served from browser side cache \(304 not modified\), set referrer.ignore304 to true. The default value of this configuration is false.
4.  Synchronize the changes from the deployment manager to the nodes.

## Behavior when cache proxy is not enabled { .section}

When cache proxy is not enabled and Ctrl-refresh is used, the request to the server will not include "If-Modified-Since" in the request header. As a result the user will see the visit count increase. This happens because the server will interpret the request as if there is no cache and will issue return code 200 with the latest data.

**Parent topic:** [Administering Blogs](../admin/c_administering_blogs.md)

