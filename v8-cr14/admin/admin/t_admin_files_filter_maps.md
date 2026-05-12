# Filtering lists returned by commands {#filteringlibrarylists .task}

Use the FilesUtilService commands to filter lists of maps returned by browse commands.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Many commands ask for IDs as input parameters, such as library IDs, user IDs, policy IDs, and file IDs. You can use commands that take parameters you do know to return data including the ID you are looking for. For example, run FilesMemberService.getByEmail\(string email\) providing a user's email address and among the data returned is the user's ID. You can also find IDs using feeds. See the Connections API documentation for information on getting ID information using feeds.

Browse commands, such as FilesLibraryService.browsePersonal and FilesPolicyService.browse, return `List<Map>` java objects. A `List<Map>` object is a list of `Map` java objects. Maps are lists of key/value pairs. For example the FilesLibraryService.browsePersonal command returns a list of personal libraries. Each library in the list is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values are information about the library, such as its title and creation date.

You filter a list by specifying that it should only return maps that have a specified key with a specified string value, date value, or number value.

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

3.  Run the following commands to filter a list of library maps:

    FilesUtilService.filterListByString\(List listOfMaps, string filterKey, string regexstringCriteria\)
    :   Returns maps from a specified list that have a specified key matching a specified regular expression. Use this command to filter `List<Map>` java objects that are returned by any of the browse commands, such as FilesLibraryService.browsePersonal and FilesPolicyService.browse.

        A map is a list of key/value pairs, for example the FilesLibraryService.browsePersonal command returns a list of personal libraries. Each library in the list is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

        Parameters:

        listOfMaps
        :   A list of maps, for example the result of a command, such as FilesLibraryService.browsePersonal\(parameters\).

        filterKey
        :   A key in each map in the list, whose value is compared against the filter criteria.

        regexstringCriteria
        :   A regular expression represented as a string to match against the filterKey value. For example, "\[0-9\]+" to match only \>= 1 numbers in a row.

        The command returns maps from the listOfMaps whose filterKey is the regexstringCriteria value. For example, this command shows only the returned maps whose title values match the expression "John\*":

        ```
        FilesUtilService.filterListByString(FilesLibraryService.browsePersonal("title", "true", 1, 25), "title", "John*")
        ```

    FilesUtilService.filterListByDate\(list listOfMaps, string filterKey, expression\)
    :   Returns maps from a specified list that have a specified key with a specified date. Use this command to filter `List<Map>` java objects that are returned by any of the browse commands, such as FilesLibraryService.browsePersonal and FilesPolicyService.browse.

        A map is a list of key/value pairs, for example the FilesLibraryService.browsePersonal command returns a list of personal libraries. Each library is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

        Parameters:

        listOfMaps
        :   A list of maps, for example the result of FilesLibraryService.browsePersonal\(parameters\).

        filterKey
        :   A key in each map in the list, whose value is compared against the filter criteria.

        expression
        :   A string of the form <operator\> <date\> where <date\> is in yyyy-MM-dd format and <operator\> is one of the following: \> \>= == <= <

        The command returns maps from the listOfMaps value whose filterKey value is the expression value. For example, this command shows only the returned maps whose creation date is on or later than January 1, 2012:

        ```
        FilesUtilService.filterListByDate(FilesLibraryService.browsePersonal("title", "true", 1, 25), "createDate", "=2010-01-01")
        ```

    FilesUtilService.filterListByNumber\(List listOfMaps, string filterKey, expression\)
    :   Returns maps from a specified list that have a specified key with a specified number. Use this command to filter `List<Map>` java objects that are returned by any of the browse commands, such as FilesLibraryService.browsePersonal and FilesPolicyService.browse.

        A map is a list of key/value pairs, for example the FilesLibraryService.browsePersonal command returns a list of personal libraries. Each library is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

        Parameters:

        listOfMaps
        :   A list of maps, for example the result of FilesLibraryService.browsePersonal\(parameters\).

        filterKey
        :   A key in each map in the list, whose value is compared against the filter criteria.

        expression
        :   A string of the form <operator\> <int\> where <int\> is an integer and <operator\> is one of the following: \> \>= == <= <

        The command returns maps from the listOfMaps value whose filterKey value is the expression value. For example, this command shows only the returned maps whose `percentUsed` value \(which reflects the percent of the library's available space that is currently used\) is 20:

        ```
        FilesUtilService.filterListByNumber(FilesLibraryService.browsePersonal("title", "true", 1, 25), "percentUsed", "==20")
        ```

    FilesUtilService.getFileById\(string fileID\)
    :   Returns the file path location of the file identified by a provided file ID. Returns a path even if the file is not in use.

        Use this command to find the location of any file stored in the shared file directory. This can be useful when restoring backup versions of data. See the topic [*Backing up Files data*](t_admin_files_backup.md) for more information.

        fileID
        :   The ID of a file in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        For example:

        ```
        FilesUtilService.getFileById("2d93497d-065a-4022ae25-a4b52598d11a")
        ```


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

