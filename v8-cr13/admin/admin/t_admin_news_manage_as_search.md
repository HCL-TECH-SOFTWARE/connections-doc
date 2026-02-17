# Administering activity stream search {#t_admin_news_manage_as_search .task}

Update information related to the activity stream search service and manage the collection of activity stream data.

To access the activity stream service administrative user interface, you must be assigned the IBM® WebSphere® Application Server search-admin role. For more information about this role, see the *Roles* topic.

You can access options for managing the activity stream search service from the Activity Stream Search Administration page. From this page, you can update the settings for the activity stream source, check the status of the activity stream search service, see when it was last updated, and when the next update is due.

The activity stream source publishes metadata about activity stream entries and collects that metadata in an index. The metadata is collected automatically on a schedule, but you can also collect data manually, delete data from the index, and disable the schedule using the options available from the administration page.

1.  Administer activity stream search by performing the following steps.
2.  To access the Activity Stream Search Administration page, enter the following URL in your browser and log in using your admin user credentials:

    ```
    http://server\_name/news/web/activityStreamSearchAdmin/activityStreamSearchAdmin.action
    ```

    There is no link provided from the HCL Connections user interface, you must access the page using the direct URL.

3.  To manage the activity stream search service, perform the following tasks:

    -   To view the number of documents in the index, see the **Number of items** column.
    -   To check whether the scheduler is enabled, view the **Status** column. When the scheduler is enabled, you can see the result of the last crawl; otherwise, the status displays as **Disabled**. When the scheduler is disabled, periodic crawling does not take place, but the search operation still works on existing indexed content.
    -   To edit the activity stream source, click **Edit Details**. Update the following fields as needed, and then click **OK**:
        -   **Name**. The name of the source. The source is the service that you are crawling.
        -   **Server URL**. The web address of the local HCL Connections server. The source and its server URL are automatically created when the News application starts up for the first time after the product is installed.
        -   **Seedlist URL**. The web address of the seedlist that will be crawled. By default, the URL points to localhost, which means that crawling is done programmatically instead of using HTTP.
        -   **Collect every**. The interval at which new data is collected from the activity stream. The default setting is 30 seconds.
    -   To manage source metadata collection, click **More actions** and select one of the following options:
        -   **Collect Data**. Crawls the activity stream content and collects new data. Select this option when you want to crawl for new data immediately, without waiting for the next scheduled crawl. When the crawler is disabled, you can still use this option to manually collect data from existing indexed content.
        -   **Clear Data**. Deletes activity stream metadata from the index. Select this option when you want to delete the indexed content and perform a full crawl. This option is useful when you want to investigate unexpected issues but should not be used frequently as it is resource intensive.
        -   **Disable Schedule**. Disables the crawler. Selecting this option disables the collection of metadata but it does not delete existing metadata from the index. When you install HCL Connections, the schedule is disabled by default.

**Parent topic:**[Activity stream search](../admin/c_admin_news_as_search.md)

**Related information**  


[Roles](../admin/r_admin_common_user_roles.md)

