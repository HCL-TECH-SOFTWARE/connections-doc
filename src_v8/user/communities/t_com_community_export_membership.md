# Exporting community membership 

Exporting community membership to a comma-separated value \(CSV\) file \(called membership.csv\) is useful when you want to create a community with the same owners or members as another community. Instead of adding the members manually to the new community, you can import them easily.

1.  From the navigation bar, click **Communities** and select the community whose membership you want to export.
2.  In the community menu, click Members then **Export Members**.
3.  Select the role of the members that you want to export. You can export the community owners, members, or both.
4.  Click **Export** and save or open the CSV file.

## Good to know 

-   If your community's membership list contains groups, they are ignored by the export function.
-   If your community has members who are suspended or inactive, these users do not have email addresses. In this case, the CSV file is called membership-contains-errors.csv. Suspended or inactive users are listed in a section of membership-contains-errors.csv called `"Warning: the following people..."`. Each user's name also has a subscriber ID \(directoryUUID\). Use the subscriber ID to help you distinguish between users with the same or similar names.

    An example of membership-contains-errors.csv is as follows:

    ``` 
    Warning: the following people do not have email addresses
    John Lee : 20007622
    
    anna.smith99@mycompany.com
    davidjones@mycompany.com
    amy_grant@mycompany.com
    ```

-   If your Connections deployment is configured to allow external users and your community is an external restricted community with members who are guests or users who are external to your organization, the email addresses for those users are not exported. In this case, the CSV file is called membership-contains-errors.csv. At the beginning of the file, a section marked `"Warning: The email addresses..."` lists the external users.

    An example of membership-contains-errors.csv with the various types of users is as follows:

    ``` 
    Warning: The email addresses for the following users could not be exported because the users are 
    external to your organization:
    Janet User5
    Janet User6
    
    anna.smith99@mycompany.com
    davidjones@mycompany.com
    amy_grant@mycompany.com
    ```


You can add the members to another community using the CSV file. For more information, see [Importing multiple members into a community](t_com_import_members.md).

**Parent topic:**[Adding members to grow your community](../../user/communities/c_com_add_members.md)

**Related information**  


[Importing multiple members](../../user/communities/t_com_import_members.md)

