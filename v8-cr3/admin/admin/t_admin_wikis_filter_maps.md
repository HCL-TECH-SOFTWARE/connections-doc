# Filtering library lists {#filteringlibrarylists .task}

Use the WikisUtilService commands to filter lists of library maps that are returned by the WikisLibraryService.browseWiki command. You can filter a list of library maps by string value, date value, or number value.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Many commands require an ID as an input parameter, including library IDs, user IDs, policy IDs, and file IDs. You can find an ID by using special commands. For example, when you run the WikisMemberService.getByEmail\(string email\) command, where you provide a user's email address as input, the output includes the user's ID. You can also find IDs by using feeds. For more information, see the IBM® Connections API documentation.

Commands such as WikisLibraryService.browseWiki return `List<Map>` Java objects. A `List<Map>` object is a list of `Map` Java objects. Maps are lists of key/value pairs. For example, the WikisLibraryService.browseWiki command returns a list of libraries. Each library in the list is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values, such as a title and creation date.

You can filter a list by specifying that it must return maps that have a specific key with a specific string value, date value, or number value.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Run the following commands to filter a list of library maps:

    WikisUtilService.filterListByString\(List listOfMaps, string filterKey, string regexstringCriteria\)
    :   Returns maps from a specified list that have a specified key that matches a specified regular expression. Use this command to filter `List<Map>` Java objects that are returned by any of the browse commands, such as WikisLibraryService.browseWiki.

        A map is a list of key/value pairs, for example the WikisLibraryService.browseWiki command returns a list of libraries. Each library in the list is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

        Parameters:

        listOfMaps
        :   A list of maps, for example the result of WikisLibraryService.browseWiki\(parameters\).

        filterKey
        :   A key in each map in the list, whose value is compared against the filter criteria.

        regexstringCriteria
        :   A regular expression that is represented as a string to match against the filterKey value. For example, "\[0-9\]+" to match only \>= 1 numbers in a row.

        The command returns maps from the listOfMaps whose filterKey is the regexstringCriteria value. For example, this command shows only the returned maps whose title values match the expression "Development\*":

        ```
        WikisUtilService.filterListByString(WikisLibraryService.browseWiki("title",
        "true", 1, 25), "title", "Development*")
        ```

    WikisUtilService.filterListByDate\(List listOfMaps, string filterKey, expression\)
    :   Returns maps from a specified list that have a specified key with a specified date. Use this command to filter `List<Map>` Java objects that are returned by any of the browse commands, such as WikisLibraryService.browseWiki.

        A map is a list of key/value pairs, for example the WikisLibraryService.browseWiki command returns a list of libraries. Each library is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

        Parameters:

        listOfMaps
        :   A list of maps, for example the result of WikisLibraryService.browseWiki\(parameters\).

        filterKey
        :   A key in each map in the list, whose value is compared against the filter criteria.

        expression
        :   A string of the form <operator\> <date\> where <date\> is in yyyy-MM-dd format and <operator\> is one of the following characters: \> \>= == <= <

        The command returns maps from the listOfMaps value whose filterKey value is the expression value. For example, this command shows only the returned maps whose creation date is on or later than January 1, 2010:

        ```
        WikisUtilService.filterListByDate(WikisLibraryService.browseWiki("title",
           "true", 1, 25), "createDate", ">=2010-01-01")
        ```

    WikisUtilService.filterListByNumber\(List listOfMaps, string filterKey, expression\)
    :   Returns maps from a specified list that have a specified key with a specified number. Use this command to filter `List<Map>` Java objects that are returned by any of the browse commands, such as WikisLibraryService.browseWiki.

        A map is a list of key/value pairs, for example the WikisLibraryService.browseWiki command returns a list of libraries. Each library is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

        Parameters:

        listOfMaps
        :   A list of maps, for example the result of WikisLibraryService.browseWiki\(parameters\).

        filterKey
        :   A key in each map in the list, whose value is compared against the filter criteria.

        expression
        :   A string of the form <operator\> <int\> where <int\> is an integer and <operator\> is one of the following characters: \> \>= == <= <

        The command returns maps from the listOfMaps value whose filterKey value is the expression value. For example, this command shows only the returned maps whose `percentUsed` value \(which reflects the percent of the library's available space that is used\) is 20:

        ```
        WikisUtilService.filterListByNumber(WikisLibraryService.browseWiki("title",
           "true", 1, 25), "percentUsed", "==20")
        ```

    WikisUtilService.getFileById\(string fileID\)
    :   Returns the file path location of the wiki page file attachment that is identified by a provided file ID. Returns a path even if the file is not in use.

        Use this command to find the location of any file attachment that is stored in the shared file directory. This command can be useful when you want to restore backup versions of data. For more information, see [*Backing up Files data*](t_admin_files_backup.md).

        fileID
        :   The ID of a file in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        For example:

        ```
        WikisUtilService.getFileById("2d93497d-065a-4022ae25-a4b52598d11a")
        ```


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

