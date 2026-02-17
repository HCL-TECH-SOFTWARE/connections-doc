# Working with Files policies {#workingwithpolicies .task}

Use the FilesPolicyService commands to add, edit, count, and return information about policies. You apply policies to libraries to set a maximum size on those libraries.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

3.  Run the following commands to work with policies:

    FilesPolicyService.add\(string title, long maximumSize\)
    :   Creates a policy with a specified title and maximum size. Policies set a maximum size limit on libraries.

        When a policy is created, an ID is created for it and returned to you. The ID is in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You must provide policy IDs as parameters when running other FilesPolicyService commands. Policies can be applied to libraries using the FilesLibraryService.assignPolicy or FilesLibraryService.assignPolicyBatch commands.

        A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

        Parameters:

        title
        :   The policy title. A required value.

        maximumSize
        :   The maximum size allowed, in bytes. Must be zero or greater. A value of zero means the size is unlimited.

            Numbers 2GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2GB must be `2147483648L`.

        For example:

        ```
        FilesPolicyService.add("My Policy", 2147483648L)
        ```

    FilesPolicyService.edit\(string policyId, string title, long maximumSize\)
    :   Edits the title and maximum size of a policy with a specified ID. If the ID is for a default policy, the title is not modified. Policies set a maximum size limit on libraries. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

        Parameters:

        policyID
        :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        title
        :   The policy title. A required value.

        maximumSize
        :   The maximum size allowed, in bytes. Must be zero or greater. A value of zero means the size is unlimited.

            Numbers 2GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2GB must be `2147483648L`.

        For example:

        ```
        FilesPolicyService.edit("2d93497d-065a-4022ae25-a4b52598d11a", "My Policy", 2147483648L)
        ```

    FilesPolicyService.getById\(string policyId\)
    :   Returns information for a single policy specified by an ID. Policies set a maximum size limit on libraries. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

        Parameters:

        policyId
        :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

            -   id: the ID
            -   title: the policy title
            -   maximumSize: the maximum size \(in bytes\) the library can be, or 0 for unlimited
        For example:

        ```
        FilesPolicyService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
        ```

    FilesPolicyService.browse\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
    :   Returns a list of policies with ID, title, and maximum size information, as described for the FilesPolicyService.getById\(id\) command. Policies set a maximum size limit on libraries. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

        Parameters:

        sortOption
        :   A string value that specifies how to sort the list. The default value is `title`, but you can also use `maximumSize`.

        sortAscending
        :   A string value that specifies whether the list sorts in ascending alphabetical order. This depends on sortOption. If sortOption is title, then this value is `true`; if sortOption any other value, then this value is `false`.

        pageNumber
        :   The number of the page to return. For example, if the itemsPerPage value is 40, and pageNumber value is 2, the command returns items 41 to 80 \(page 2\) instead of 1 to 40 \(page 1\).

        itemsPerPage
        :   The maximum number of policies to list per page. The default value is 20.

        For example:

        ```
        FilesPolicyService.browse("title", "true", 1, 25)
        ```

    FilesPolicyService.getCount\(\)
    :   Returns the total number of policies. Policies set a maximum size limit on libraries. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

    FilesPolicyService.editPersonalDefault\(long maximumSize\)
    :   Sets the maximum size, in bytes, for the personal library default policy. The default policy is applied to all personal libraries that do not otherwise have a policy. It allows you to control library size as a way of controlling the amount of storage space used.

        A personal library is a set of files owned by one person. It includes all versions of the files, but does not include metadata such as comments.

        Parameters:

        maximumSize
        :   A number representing the maximum size allowed, in bytes, for libraries that the default policy is assigned to.

            Numbers 2GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2GB must be `2147483648L`.

        For example:

        ```
        FilesPolicyService.editPersonalDefault(2147483648L)
        ```

    FilesPolicyService.editCommunityDefault\(long maximumSize\)
    :   Sets the maximum size, in bytes, for the community library default policy. The default policy is applied to all community libraries that do not otherwise have a policy. It allows you to control library size as a way of controlling the amount of storage space used.

        A community library is a set of files owned by a community. It includes all versions of the files, but does not include metadata such as comments.

        Parameters:

        maximumSize
        :   A number representing the maximum size allowed, in bytes, for community libraries that the default policy is assigned to.

            Numbers 2GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2GB must be `2147483648L`.

        For example:

        ```
        FilesPolicyService.editCommunityDefault(2147483648L)
        ```

    FilesPolicyService.delete\(string policyId\)
    :   Deletes the policy specified by the policy ID. You cannot delete default policies or policies in use by any libraries.

        policyId
        :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        For example:

        ```
        FilesPolicyService.delete("f0d01111-9b21-4dd8-b8be-8825631cb84b")
        ```


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

