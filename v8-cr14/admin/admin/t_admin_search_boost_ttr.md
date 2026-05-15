# Boosting search results by tag, title, or recency {#t_admin_search_boost_ttr .task}

Influence the quality and ranking of search results by configuring a boost to the relevance score associated with specified fields in the index.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You must initialize the Search configuration environment to be able to run the SearchCellConfig command. Carry out the steps in *Accessing the Search configuration environment*.

Influence the ranking of search results by configuring a boost to the relevance score associated with specified fields in the index. For example, you can give a higher score to documents that include the searched term or terms in their title or tags. You can also use the last update time for boosting so that more recently edited documents are ranked higher in the search results. This mechanism does not require reindexing.

1.  Check out the search-config.xml file by using the SearchCellConfig.checkOutConfig command. For more information, see *SearchCellConfig commands*.

2.  Use any of the following commands to configure boosting applied on different fields in search queries.

    **Note:** Except for the deleteBoostSettings, the boostname parameter in all commands is "content" when you are referring to global search boosting.

    SearchCellConfig.addFieldBoost\(string boostName, string fieldName, float boost\)
    :   Adds a field with a specific boost to be taken into account in query time.

        This command takes the following arguments:

        -   boostName. The name of the boost element to apply changes to.
        -   fieldName. The name of the indexing field to which the boost is to be applied.
        -   boost. The relevance score that is associated with the specified fields in the index. The default values are 2.0 and 3.0 for tag and title.
        Example:

        ```
        SearchCellConfig.addFieldBoost("content", "author", "2.0")
        ```

    SearchCellConfig.addRecencyBoost\(string boostName, float rboost\)
    :   Adds a tag element that enables boosting results by their recency so that more recently created or edited documents are given a higher score. Recency boost values are 0 - 1. The smaller the recency value is, the higher the score new or edited documents get.

        This command takes the following arguments:

        -   boostName. The name of the boost element to apply changes to.
        -   rboost. The recency boost value to apply \(0 - 1\).
        Example:

        ```
        SearchCellConfig.addRecencyBoost("content", "0.2")
        ```

    SearchCellConfig.updateFieldBoost\(string boostName, string fieldName, float boost\)
    :   Updates the value of an existing field tag.

        This command takes the following arguments:

        -   boostName. The name of the boost element to apply changes to.
        -   fieldName. The name of the indexing field to which the boost is to be applied.
        -   boost. The relevance score that is associated with the specified fields in the index. The default values are 2.0 and 3.0 for tag and title
        Example:

        ```
        SearchCellConfig.updateFieldBoost("content", "author", "3.2")
        ```

    SearchCellConfig.updateRecencyBoost\(string boostName, float rboost\)
    :   Updates an existing recency boost value.

        This command takes the following arguments:

        -   boostName. The recency boost value to apply \(0 - 1\).
        -   rboost. The recency score associated with the specified fields in the index.
        Example:

        ```
        SearchCellConfig.updateRecencyBoost("content", "0.2")
        ```

    SearchCellConfig.deleteRecencyBoost\(string boostName\)
    :   Deletes a recency boost tag.

        This command takes the following arguments:

        -   boostName. The name of the boost element to apply changes to.
        Example:

        ```
        SearchCellConfig.deleteRecencyBoost("content")
        ```

    SearchCellConfig.deleteFieldBoost\(string boostName, string fieldName\)
    :   Deletes a field boost tag.

        This command takes the following arguments:

        -   boostName. The name of the boost element to apply changes to.
        -   fieldName. The name of the indexing field from which the relevant tag is deleted from the configuration.
        Example:

        ```
        SearchCellConfig.deleteFieldBoost("content", "author")
        ```

    SearchCellConfig.deleteBoosts\(string boostName\)
    :   Deletes the boost element that refers to the "content" boostName.

        This command takes the following arguments:

        -   boostName. The name of the boost element to apply changes to.
        Example:

        ```
        SearchCellConfig.deleteBoosts("content")
        ```

    SearchCellConfig.deleteBoostSettings\(\)
    :   Deletes all the boosting parameters from the configuration file.

        Example:

        ```
        SearchCellConfig.deleteBoostSettings()
        ```

3.  When you make all the configuration changes, check in the search-config.xml file by using the SearchCellConfig.checkInConfig command. For more information, see *SearchCellConfig commands*.


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Accessing the Search configuration environment](../admin/t_admin_search_access_config.md)

[SearchCellConfig commands](../admin/r_admin_searchcellconfig_commands.md)

