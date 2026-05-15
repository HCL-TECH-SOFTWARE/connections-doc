# Understanding blog likes, comments, and visits {#c_admin_blogs_visits_and_comments .concept}

This topic describes how the Most Liked, Most Commented, and Most Visited statistics are calculated and why the counts may differ between those found in the widgets and those found in the main page.

If you are viewing either the list of blogs or the list of blog entries from the **Public Blogs** page, you can view the lists of most liked, most commented, and most visited blogs or entries in sidebar widgets. You can also view these statistics for each blog or entry in the main page. There may be times when the information in the main page does not match the information in the sidebar widgets because of the way each count is calculated.

## Calculating liked, commented, and visited statistics for blog entries { .section}

The statistics for the Most Liked, Most Commented, and Most Visited widgets and the Likes/Votes, Comments, and Visits statistics that display in the main page are calculated in slightly different ways. For example, the Most Liked widget displays the most likes in the last 30 days, regardless of when the entry was published. The list of latest entries in the main page only displays entries published in the last 30 days, so the most liked entry in that list may not match the most liked entry in the widget.

-   The Likes/Votes, Comments, and Visits count for an individual entry is calculated as follows:
    -   Only those entries that were published within the past 30 days are displayed. You can configure the period for what entries to display by changing the value of the homepage.since property in the roller.properties file.
    -   The count displayed under each entry is for overall likes, comments, or visits.
    -   You can sort the list of entries by overall likes, comments, or visits.
-   The count for an entry in the Most Liked or Most Commented widget is calculated as follows:
    -   Entries display according to how many likes or comments they received in the last 30 days, regardless of when the entries were published. Likes or comments older than 30 days are disregarded.
    -   You can configure the period for calculating likes by changing the value of the homepage.mostRecommendedSince property in the roller.properties file.
    -   You can configure the period for calculating comments by changing the value of the homepage.mostCommentedSince property in the roller.properties file.
-   The count for an entry in the Most Visited widget is calculated as follows:
    -   The visit count is only listed for entries that have been published or updated in the last 30 days.
    -   The visit count is a cumulative count, not just visits in the last 30 days.
    -   You can configure the period for what entries display by changing the value of the homepage.mostVisitedSince property in the roller.properties file.

## Calculating liked, commented, and visited statistics for blogs { .section}

Just as with blog entries, the blog statistics for the Most Liked, Most Commented, and Most Visited widgets and the corresponding statistics that display in the main page are calculated in slightly different ways. For example, the Most Liked widget displays the most likes in the last 30 days, regardless of when the blog was created. The list of blogs in the main page only displays blogs published in the last 30 days, so the most liked blog in that list may not match the most liked blog in the widget.

-   The Liked, Commented, and Visited counts for an individual blog are calculated as follows:
    -   All blogs display in the main page, regardless of when they were published.
    -   The count displayed for each blog is for overall likes, comments, or visits.
-   The count for blogs in the Most Liked or Most Commented widget is calculated as follows:
    -   Blogs display according to how many likes or comments they received in the last 30 days, regardless of when the blogs were published. Likes or comments older than 30 days are disregarded.
    -   You can configure the period for calculating likes by changing the value of the homepage.mostRecommendedSince property in the roller.properties file.
    -   You can configure the period for calculating comments by changing the value of the homepage.mostCommentedSince property in the roller.properties file.
-   The count for a blog in the Most Visited widget is calculated as follows:
    -   The visit count is only listed for blogs that have been published or updated in the last 30 days.
    -   The visit count is a cumulative count, not just visits in the last 30 days.
    -   You can configure the period for what entries display by changing the value of the homepage.mostVisitedSince property in the roller.properties file.

## The effects of caching on statistics { .section}

The cache and refresh processes can also contribute to a difference in what displays in the Most Liked widget and the likes listed in the main page of blogs or entries. The widget cache is updated every 10 minutes. This interval is not configurable. If there are no new blog entries or new blogs, the **Public Blogs** page is cached and will not be updated, and the user will see that the counts do not match. This is due to a "if-not-modified" cache control on the **Public Blogs** page.

## Updating a property in the roller.properties file { .section}

Follow these steps to update a property in the roller.properties file:

1.  Edit the `roller.properties` file from this location: `IBM\\WebSphere\\AppServer\\profiles\\<profile_name>\\installedApps\\<cell_name>\\Blogs.ear\\blogs.war\\WEB-INF\\classes`
2.  Edit the values for the configuration properties you want to change.
3.  Synchronize the changes from the deployment manager to the nodes.

**Parent topic:** [Administering Blogs](../admin/c_administering_blogs.md)
