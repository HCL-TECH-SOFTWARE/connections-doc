# Managing user requests to erase PI {#t_common_manage_user_requests_to_erase_pd.dita .reference}

Here are four scenarios that you might encounter if a user requests that their personal information \(PI\) be erased from Connections content. In all, the user's "right to erasure" is accomplished by changing the user's name and email address to ones that can no longer identify them, a process known as "pseudonymisation."

## Pseudonymising PI on a user about to leave the organization { .section}

The user requesting to be erased is still listed as active in Connections and still has a user profile.

1.  The LDAP Administrator must change the user’s name and email address in the LDAP directory to some type of pseudonym and email address which doesn't identify the user, for example, a name of "User124." They then run the TDI synchronization script so that the changes are reflected throughout Connections.
2.  Use wsadmin commands to pseudonymise the user's name and email address in the databases for the Home app and Search and News app, as follows:

    1.  See [Running administrative commands](https://help.hcltechsw.com/connections/v7/admin/admin/t_admin_common_edit_admin_props.html) to start the wsadmin client and initiate the Search service.
    2.  Depending on whether you know the user's original email address or their user ID, run one of the following commands to change their name to a pseudonym:

        -   ```
            SearchService.updatePersonNameInDatabase("org\_id","email","pseudonym")
            ```

        -   ```
            SearchService.updatePersonNameInDatabaseById("org\_id","userID","pseudonym")
            ```

    3.  Run this command to change the user's email address to a pseudonymised email address:

        ```
        SearchService.updatePersonEmailInDatabase("org\_id","email","pseudo\_email")
        ```

    **Note:** org\_id is blank except in multitenant environments. For example, in a standard environment, when you know the user's ID, a command would look like `SearchService.updatePersonNameInDatabaseById("","87326487243726384","Former Empl71")`

3.  Check whether any PI remains in Connections by following the steps in [Deleting or correcting user PI](t_common_erase_or_correct_data_in_body_text.md).

## Pseudonymising PI on a former user with an inactive profile but who is still in LDAP { .section}

The user asking to be erased was marked inactive in LDAP, and TDI synchronization has inactivated them in Connections \("inactive" is displayed beside the user's name wherever it is displayed \).

1.  The Administrator User can use the [update profile Admin UI](https://ds-infolib.hcltechsw.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+6.0+API+Documentation#action=openDocument&res_title=Updating_a_profile_using_the_Administration_API_ic60&content=apicontent) to complete the following steps:
    1.  Reactivate the user.
    2.  Change the name of the user to a pseudonym, for example "User124." Running the API propagates the name change throughout all components.
    3.  Deactivate the user.

2.  Use wsadmin commands to pseudonymise the user's name and email address in the databases for the Home app and Search and News app, as follows:

    1.  See [Running administrative commands](https://help.hcltechsw.com/connections/v7/admin/admin/t_admin_common_edit_admin_props.html) to start the wsadmin client and initiate the Search service.
    2.  Depending on whether you know the user's original email address or their user ID, run one of the following commands to change their name to a pseudonym:

        -   ```
            SearchService.updatePersonNameInDatabase("org\_id","email","pseudonym")
            ```

        -   ```
            SearchService.updatePersonNameInDatabaseById("org\_id","userID","pseudonym")
            ```

    3.  Run this command to change the user's email address to a pseudonymised email address:

        ```
        SearchService.updatePersonEmailInDatabase(org\_id,email,pseudo\_email)
        ```

    **Note:** org\_id is blank except in multitenant environments. For example, in a standard environment, when you know the user's ID, a command would look like `SearchService.updatePersonNameInDatabaseById("","87326487243726384","Former Empl71")`

3.  Check whether any PI remains in Connections by following the steps in [Deleting or correcting user PI](t_common_erase_or_correct_data_in_body_text.md).

## Pseudonymising PI on a former user with an inactive profile and who was deleted from LDAP { .section}

If the user was removed from LDAP and TDI synchronization has inactivated them in Connections, the Administrative User must do the following to pseudonymise the user:

1.  Change the name of the user to a pseudonym by running the [update profile Admin API](https://ds-infolib.hcltechsw.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+6.0+API+Documentation#action=openDocument&res_title=Updating_a_profile_using_the_Administration_API_ic60&content=apicontent), which propagates the name change throughout all components.
2.  Use wsadmin commands to pseudonymise the user's name and email address in the databases for the Home app and Search and News app, as follows:

    1.  See [Running administrative commands](https://help.hcltechsw.com/connections/v7/admin/admin/t_admin_common_edit_admin_props.html) to start the wsadmin client and initiate the Search service.
    2.  Depending on whether you know the user's original email address or their user ID, run one of the following commands to change their name to a pseudonym:

        -   ```
            SearchService.updatePersonNameInDatabase("org\_id","email","pseudonym")
            ```

        -   ```
            SearchService.updatePersonNameInDatabaseById("org\_id","userID","pseudonym")
            ```

    3.  Run this command to change the user's email address to a pseudonymised email address:

        ```
        SearchService.updatePersonEmailInDatabase(org\_id,email,pseudo\_email)
        ```

    **Note:** org\_id is blank except in multitenant environments. For example, in a standard environment, when you know the user's ID, a command would look like `SearchService.updatePersonNameInDatabaseById("","87326487243726384","Former Empl71")`

3.  Check whether any PI remains in Connections by following the steps in [Deleting or correcting user PI](t_common_erase_or_correct_data_in_body_text.md).

## Pseudonymising PI on a former user with a deleted profile and who was deleted from LDAP { .section}

If the LDAP Administrator has removed the user from LDAP, and TDI synchronization has deleted the user in Connections Profiles, the Administrator User must take the following steps to pseudonymise the user:

1.  Reinstate the user's profile by running the [create profile Admin API](https://ds-infolib.hcltechsw.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+6.0+API+Documentation#action=openDocument&res_title=Adding_a_profile_using_the_Administration_API_ic60&content=apicontent).
2.  Change the name and email address of the user by running the [update profile Admin API](https://ds-infolib.hcltechsw.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+6.0+API+Documentation#action=openDocument&res_title=Updating_a_profile_using_the_Administration_API_ic60&content=apicontent).
3.  Delete the user’s profile by running the [delete profile Admin API](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+6.0+API+Documentation#action=openDocument&res_title=Deleting_a_profile_using_the_Administration_API_ic60&content=apicontent).
4.  Use wsadmin commands to pseudonymise the user's name and email address in the databases for the Home app and Search and News app, as follows:

    1.  See [Running administrative commands](https://help.hcltechsw.com/connections/v7/admin/admin/t_admin_common_edit_admin_props.html) to start the wsadmin client and initiate the Search service.
    2.  Depending on whether you know the user's original email address or their user ID, run one of the following commands to change their name to a pseudonym:

        -   ```
            SearchService.updatePersonNameInDatabase("org\_id","email","pseudonym")
            ```

        -   ```
            SearchService.updatePersonNameInDatabaseById("org\_id","userID","pseudonym")
            ```

    3.  Run this command to change the user's email address to a pseudonymised email address:

        ```
        SearchService.updatePersonEmailInDatabase(org\_id,email,pseudo\_email)
        ```

    **Note:** org\_id is blank except in multitenant environments. For example, in a standard environment, when you know the user's ID, a command would look like `SearchService.updatePersonNameInDatabaseById("","87326487243726384","Former Empl71")`

5.  Check whether any PI remains in Connections by following the steps in [Deleting or correcting user PI](t_common_erase_or_correct_data_in_body_text.md).

## Other considerations for the Administrator User { .section}

If the Orient Me home page is available in your organization, and APIs were used to customize its "Important to Me" bar, make sure that a person asking to be erased was not someone who was added to the bar.

## Assisting a current user who wants to search for their own PI { .section}

When a user has an active profile in Connections and wants to have specific data erased, they can update or delete the specific entries by signing into the system to make the changes on their own. To find all content across Connections that they have created or contributed to, the user can do a search for their own name, and then use the "My Content" filter on the results page. From there they can go to each content item and change or delete it. For more information, see *Searching Connections* in the IBM Knowledge Center.

What the user's searching their own content in Connections does not find:

-   Content that the user liked, so they have to know what they want to unlike
-   Content in FileNet Library \(older implementation only, content in newer implementation is found\), so users must search within that application on their own
-   Content in Box, SharePoint, and Google Drive integrations must also be searched on their own
-   @mentions in someone else's Connections content
-   What they are following
-   What files they have downloaded
-   Comments on files
-   Prior versions of a wiki or file \(finds only the most recent version\)
-   For a user entitled to HCL Connections Docs, inline comments and @mentions when a document is in draft mode. Once the document is published, the user can use Connections Search to find such content and IBM Docs to delete it.

What the user cannot change on their own:

-   @mentions in Connections by another user, or personal data in body text added by another user. The user can ask the Administrator to change the content. Note that the Administrator cannot find @mentions unless the user requesting erasure provides the names of current subscribers who mentioned them, or some other means such as the name of a file containing the @mention. See [Deleting or correcting user PI](t_common_erase_or_correct_data_in_body_text.md) for information on how the Administrator can delete PI that cannot be pseudonymised.
-   Download history

**Parent topic:** [Managing personal information in accordance with PI laws](../admin/c_common_manage_personal_data_for_gdpr.md)

