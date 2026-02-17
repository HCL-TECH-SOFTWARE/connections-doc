# Deleting inactive users based on inactive period {#r_prof_tdi_sample_64435 .reference}

You can use the revoke\_users command to delete users in Profiles who have been in the inactive state for a specified length of time. You can also get a list of users who are in the inactive state.

## Deleting inactive users { .section}

If you plan to reuse UID values, or other unique Profiles fields, you must permanently delete inactive users to reuse those values.

When you inactivate a user, the email and login fields are cleared, but other fields such as uid, guid, and distinguished name are not cleared. After a specified length of time you might want to permanently delete the inactive user from Profiles so that you can, for example, reuse a uid. The revoke\_users command deletes the user from Profiles, but has no affect on other applications in Connections. For related information, see [User life cycle details](c_admin_common_user_life_cycle_goal.md).

**Note:** After flagging a user as inactive, but before deleting that user, you can retrieve that user and their Profiles data. However, after deleting a user, you cannot retrieve that user or that user’s Profiles data.

Usually the sync\_all\_dns command is used to synchronize the Profiles database with the member source, typically an LDAP. When a user leaves the organization and is removed from LDAP, the sync\_all\_dns command will either inactivate or delete the user, depending on the value of the sync\_delete\_or\_inactivate property in profiles\_tdi.properties. By default, the value is inactivate. When inactivated, the user is flagged as inactive in the Profiles database, and this information is propagated to the other Connections components.

For more information , see [Deleting or inactivating users in the Profiles database](t_admin_profiles_delete_users.md).

In the following example, you will use the revoke\_users command to permanently delete users who have been inactive for more than 30 days.

1.  Copy the revoke\_users.sh or revoke\_users.bat, revoke\_users.xml, and revoke\_users.properties files from the samples directory up one level to the Profiles TDI solution directory.
2.  Modify the keep\_for\_days property in the revoke\_users.properties file. Change the value to 30 from its default value of 21.
3.  Run the revoke\_users command with the parameter revoke. For example:

    ```
    ./revoke_users.sh revoke
    ```

    or

    ```
    revoke_users.bat revoke
    ```

    depending on your operating system.

    When the command completes, the following two files are created:

    -   revoke.ldif: A list of the inactive users who were deleted from the Profiles database. They were deleted because they were flagged as inactive 30 days or more ago.
    -   revoke\_skip.ldif: A list of the inactive users who were not deleted from the Profiles database. They were not deleted because they were flagged as inactive less than 30 days ago.

        **Note:** The logs/ibmdi.log file is updated after every 10K user names processed.


## Additional Options { .section}

1.  Run the revoke\_users command with the summary argument to get a list of the users that would be deleted with the revoke argument. For example:

    ```
    ./revoke_users.sh summary
    ```

    or

    ```
    revoke_users.bat summary
    ```

    depending on your operating system.

    When the command completes, the following two files are created:

    -   revoke.ldif: A list of the inactive users who would be deleted from the Profiles database when using the revoke argument to the revoke\_users command.
    -   revoke\_skip.ldif: A list of the inactive users who would not be deleted from the Profiles database when using the revoke argument to the revoke\_users command.
2.  You can inspect and edit the list of users who will be deleted before deleting them. In the revoke\_users.properties file, set for\_revoke\_command\_use\_existing\_revoke\_file to true. In this case, the revoke\_users command reads in the revoke.ldif file and uses it to delete the users. For example:
    1.  Run `revoke_users summary`.
    2.  Edit the file revoke.ldif.
    3.  Run `revoke_users revoke`.
3.  You can delete all users, both active and inactive. You might want to do this if you are switching LDAPs frequently for test purposes. To delete all users:
    1.  In the file revoke\_users.properties set revoke\_active\_instead\_of\_inactive to true and uncomment the line by removing the \# character.
    2.  In the file revoke\_users.properties set keep\_for\_days to 0.

        CAUTION:

        Setting keep\_for\_days to 0 will cause all users to be deleted, including active users. Do not set this to 0 unless you intend to delete all users.

    3.  Run `revoke_users revoke`.

**Parent topic:**[Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md)

**Related information**  


[Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md)

[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

