# Setting maximum sizes on libraries {#settingmaximumsizesonlibraries .task}

Use WikisLibraryService commands to set maximum sizes on libraries by assigning them a policy. A library is the pages, attachments, and other data that make up a wiki. A policy sets a maximum size for a library.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Create a policy to specify the library size. For more information, see *Working with Wikis policies*.

4.  Run the following commands to set maximum sizes on libraries:

    WikisLibraryService.assignPolicy\(string libraryId, string policyId\)
    :   Assigns a policy to a library. A library includes the pages, attachments, and other data that make up a wiki. It includes all wiki page versions but does not include metadata such as comments. It also includes all wiki page versions but does not include metadata such as comments. A policy sets a maximum size for a wiki.

        If the task succeeds, no message is printed.

        Parameters:

        libraryId
        :   The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        policyId
        :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        For example:

        ```
        WikisLibraryService.assignPolicy("f0d01111-9b21-4dd8-b8be-8825631cb84b",
           "2d93497d-065a-4022ae25-a4b52598d11a")
        ```

    WikisLibraryService.assignPolicyBatch\(string filePath\)
    :   Assigns policies that are specified in a text file. You must create this text file and save it in on the server where you are running the wsadmin client. The file must contain a list of library-policy ID pairs, one pair per line, with values separated by a comma. For example: `libraryId, policyId`. Extra white space is ignored.

        A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

        Parameters:

        filePath
        :   The full path to the text file, as a string.

        For example:

        ```
        WikisLibraryService.assignPolicyBatch("C:/connections/assign_policies.txt")
        ```


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Setting maximum sizes on media, pages, and attachments](../admin/t_admin_wikis_setting_maxsize.md)

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Working with Wikis policies](../admin/t_admin_wikis_policies.md)

