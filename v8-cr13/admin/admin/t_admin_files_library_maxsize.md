# Setting a maximum size on libraries {#settingmaximumsizesonlibraries .task}

Use FilesLibraryService commands to assign a policies to libraries. A library is a set of files owned by a person or community. A policy sets a maximum size for a library.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

3.  Create a policy to specify the library size, using steps in the topic *Working with policies*.

4.  Run the following commands to set maximum sizes on libraries:

    FilesLibraryService.assignPolicy\(string libraryId, string policyId\)
    :   Assigns a policy to a library. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments. A policy sets a maximum size for a library.

        No message is printed if the task succeeds.

        Parameters:

        libraryId
        :   The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        policyId
        :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        For example:

        ```
        FilesLibraryService.assignPolicy("f0d01111-9b21-4dd8-b8be-8825631cb84b",
           "2d93497d-065a-4022ae25-a4b52598d11a")
        ```

    FilesLibraryService.assignPolicyBatch\(string filePath\)
    :   Assigns policies to libraries as specified in a text file. The file must contain a list of library-policy ID pairs, one pair per line, values separated by a comma. For example: `libraryId, policyId`. Extra whitespace is ignored. You must create this text file and save it in a directory local to the server where you are running the wsadmin processor.

        A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments. A policy sets a maximum size for a library.

        Parameters:

        filePath
        :   The full path to the text file, as a string.

        For example:

        ```
        FilesLibraryService.assignPolicyBatch("C:/connections/assign_policies.txt")
        ```


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Working with Files policies](../admin/t_admin_files_policies.md)

