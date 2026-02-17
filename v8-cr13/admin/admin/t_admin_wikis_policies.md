# Working with Wikis policies {#workingwithpolicies .task}

Use the WikisPolicyService commands to add, edit, count, and return information about policies. You apply policies to libraries to set a maximum size on those libraries. A library is a set of files that are owned by a person or community.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Many commands require an ID as an input parameter, including library IDs, user IDs, policy IDs, and file IDs. You can find an ID by using special commands. For example, when you run the WikisMemberService.getByEmail\(string email\) command, where you provide a user's email address as input, the output includes the user's ID. You can also find IDs by using feeds. For more information, see the IBM® Connections API documentation.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Run the following commands to work with policies:

    WikisPolicyService.add\(string title, long maximumSize\)
    :   Creates a policy with a specified title and maximum size. Policies set a maximum size limit on libraries. A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

        When a policy is created, an ID is created for it and returned to you. The ID is in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You must provide policy IDs as parameters when you run other WikisPolicyService commands.

        Policies can be applied to libraries by using the WikisLibraryService.assignPolicy or WikisLibraryService.assignPolicyBatch commands.

        Parameters:

        title
        :   The policy title. A required value.

        maximumSize
        :   The maximum size that is allowed, in bytes. Must be zero or greater. A value of zero means the size is unlimited.

            Numbers 2 GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2 GB must be `2147483648L`.

        For example:

        ```
        WikisPolicyService.add("My Policy", 2147483648L)
        ```

    WikisPolicyService.edit\(string policyId, string title, long maximumSize\)
    :   Edits the title and maximum size of a policy with a specified ID. If the ID is for a default policy, the title is not modified. Policies set a maximum size limit on libraries. A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

        Parameters:

        policyID
        :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        title
        :   The policy title. A required value.

        maximumSize
        :   The maximum size that is allowed, in bytes. Must be zero or greater. A value of zero means the size is unlimited.

            Numbers 2 GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2 GB must be `2147483648L`.

        For example:

        ```
        WikisPolicyService.edit("2d93497d-065a-4022ae25-a4b52598d11a", 
           "My Policy", 2147483648L)
        ```

    WikisPolicyService.getById\(string id\)
    :   Returns information for a single policy that is specified by an ID. Policies set a maximum size limit on libraries.

        A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

        Parameters:

        id
        :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

            -   id: the ID
            -   title: the policy title
            -   maximumSize: the maximum size \(in bytes\) the library can be, or 0 for unlimited
        For example:

        ```
        WikisPolicyService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
        ```

    WikisPolicyService.browse\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
    :   Returns a list of policies with ID, title, and maximum size information, as described for the WikisPolicyService.getById\(id\) command. Policies set a maximum size limit on libraries.

        A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments.

        Parameters:

        sortOption
        :   A string value that specifies how to sort the list. The default value is `title`, but you can also use `maximumSize`.

        sortAscending
        :   A string value that specifies whether the list sorts in ascending alphabetical order. This value depends on sortOption. If sortOption is title, then this value is `true`; if sortOption any other value, then this value is `false`.

        pageNumber
        :   The number of the page to return. For example, if the itemsPerPage value is 40, and pageNumber value is 2, the command returns items 41 - 80 \(page 2\) instead of 1 to 40 \(page 1\).

        itemsPerPage
        :   The maximum number of policies to list per page. The default value is 20.

        For example:

        ```
        WikisPolicyService.browse("title", "true", 1, 25)
        ```

    WikisPolicyService.getCount\(\)
    :   Returns the number of policies. Policies set a maximum size limit on libraries. A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments.

    WikisPolicyService.editDefault\(long maximumSize\)
    :   Sets the maximum size, in bytes, for the personal wiki library default policy. Personal wikis are owned by a person.

        Parameters:

        maximumSize
        :   A number that represents the maximum size that is allowed, in bytes, for wikis that the default policy is assigned to.

            Numbers 2 GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2 GB must be `2147483648L`.

        For example:

        ```
        WikisPolicyService.editDefault(2147483648L)
        ```

    WikisPolicyService.editCommunityDefault\(long maximumSize\)
    :   Sets the maximum size, in bytes, for the community wiki library default policy. Community wikis are owned by a community.

        Parameters:

        maximumSize
        :   A number that represents the maximum size that is allowed, in bytes, for wikis that the default policy is assigned to.

            Numbers 2 GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2 GB must be `2147483648L`.

        For example:

        ```
        WikisPolicyService.editCommunityDefault(2147483648L)
        ```

    WikisPolicyService.delete\(string id\)
    :   Deletes the policy that is specified by the ID. You cannot delete default policies or policies in use by any libraries.

        id
        :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        For example:

        ```
        WikisPolicyService.delete("f0d01111-9b21-4dd8-b8be-8825631cb84b")
        ```


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

