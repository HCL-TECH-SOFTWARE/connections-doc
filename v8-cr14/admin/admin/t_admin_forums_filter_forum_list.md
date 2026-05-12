# Filtering lists of forums {#t_admin_forums_filter_forum_list .task}

Retrieve a subset of forums that you want to administer.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

When you retrieve a list of forums, you can filter the list to find a forum with a specific name or ID.

Use either the ForumsService.filterInput or ForumsTrashService.filterForumsByName command to retrieve a subset of forums.

1.  Use a variable to store the returned data when you use a fetch command.

    For example, the following code stores the objects that are returned from the fetchForumsTrash\(\) command in the alltrash variable:

    ```
    alltrash=ForumsTrashService.fetchForumsTrash()
    ```

    The objects are formatted as ajava.util.Vector of hash tables that represent deleted forums in the Trash view.

2.  Use the following commands to narrow down the list of results that you stored in the variable:

    ForumsService.filterInput\(VectorinputVector, java.lang.String toMatch, java.lang.String attrName\)
    :   Filters a source vector of forums to return a new vector that contains a map pair that matches the specified filter criteria.

        This command takes the following parameters:

        inputVector
        :   The source vector that contains the map collection.

        toMatch
        :   A Java regular expression pattern that represents matching criteria. This pattern is used to search the attrName of the forums or entries. The pattern must match the full name and is case-sensitive. You can use the following keys:

            -   Period \(.\) matches any character.
            -   Plus sign \(+\) matches one or more instances of the previous character. For example, .+ matches all sequences of one or more characters.
            -   Asterisk \(\*\) matches zero or more instances of the previous character. For example, \* matches all sequences of characters.
            -   \[chars\] matches any one character within the square brackets \(\[\]\). For example, \[Gg\] matches either an uppercase or lowercase G.
            -   \[A-Z\] matches a range of characters.
        attrName
        :   The key that you want to filter in the map. Possible values include name and forumID. The default value is name.

    ForumsTrashService.filterForumsByName\(VectorinputVector, java.lang.String toMatch\)
    :   Filters a source vector of forums to return a new vector that contains a map pair that matches the specified name filter criteria.

        This command takes the following parameters:

        inputVector
        :   The source vector that contains the map collection.

        toMatch
        :   Java regular expression pattern that represents matching criteria. This pattern is used to search the name of the forums. The pattern must match the full name and is case-sensitive. You can use the following keys:

            -   Period \(.\) matches any character.
            -   Plus sign \(+\) matches one or more instances of the previous character. For example, .+ matches all sequences of one or more characters.
            -   Asterisk \(\*\) matches zero or more instances of the previous character. For example, \* matches all sequences of characters.
            -   \[chars\] matches any one character within the square brackets \(\[\]\). For example, \[Gg\] matches either an uppercase or lowercase G.
            -   \[A-Z\] matches a range of characters.
    For example, the alltrash vector that is saved in step 1 has two maps as follows, each of which has one value pair, \(key = "name", value=""\):

    ```
    alltrash={name=forum-1, name=forum-2}
    ```

    The following command filters the alltrash vector to get only those maps for which the value of the name key is forum-1. The maps are stored in a vector named vii. The default value of the third parameter is name.

    ```
    vii=ForumsService.filterInput(alltrash, "forum-1")
    ```

    or

    ```
    vii=ForumsTrashService.filterForumsByName(alltrash,"forum-1")
    ```

    The command returns the following vector:

    ```
    vii={name=forum-1}
    ```

    In this example, you want to filter the results of the following source vector by forumID.

    ```
    inputVector=ForumsService.fetchForums()
    ```

    where the inputVector vector has two maps, each of which has one value pair, \(key = "forumID", value=""\):

    ```
    inputVector={forumID=00000-0001, forumID=00000-0002}
    ```

    The following command returns only the forum with the ID, 00000-0001:

    ```
    vii = ForumsService.filterInput(inputVector,"00000-0001","forumID")
    ```

    The command returns the following vector:

    ```
    vii={forumID=00000-0001}
    ```

3.  Pass the variable that contains the subset of resources that you want to operate on into the command that you are using.

    For example, to restore the collected subset of forums that are stored in the vii variable, you might use the following command:

    ```
    ForumsTrashService.undeleteForumsTrash(vii)
    ```


**Parent topic:**[Retrieving forum content](../admin/c_retrieving_forum_content.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Getting a list of forums](../admin/t_admin_forums_fetch_forum_list.md)

[Restoring deleted forum content](../admin/t_admin_forums_restore_trash.md)

[Purging specific forum content from the trash](../admin/t_admin_forums_purge_spec_content.md)

