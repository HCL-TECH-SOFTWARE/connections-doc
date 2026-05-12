# Synchronizing user data by using administrative commands {#c_admin_common_sync_via_admin_commands1 .concept}

Synchronize user data between the HCL Connections application membership tables and the configured directory for the deployment.

Each Connections application has its own database with membership tables that contain a users external ID and user data that is related to that application. These databases must be synchronized with the configured directory in the deployment. The configured directory is typically the Profiles database in deployments where Profiles is installed and Profiles integration is enabled. If Profiles is not installed or is installed but Profiles integration is not enabled, then the configured directory is the corporate LDAP directory.

The following administrative commands synchronize user data between the application databases and the configured directory in your environment. They also log entries in the application\_nameUlcSyncCmd.log file that reports updated data items.

!!! note 
    
    When Profiles is installed, do not generally use these commands. Profiles automatically synchronizes user data with the application databases. There is a set of Profiles administration commands for synchronizing user data. However, you can use the commands described here to resolve situations where an application database needs to be corrected. For example, if synchronization occurs for all but one application and you have a mismatch in that application's database.

Many of the synchronization commands have a matching preview command that shows you what the synchronization command does when you run it. For example, the FilesMemberService.previewSyncAllMembersByExtId command generates a log showing what the FilesMembersService.syncAllMemberByExtId command would do if you ran it.This preview can be useful when mismatches are suspected. The logs are in the standard logging directory for the server; for example, where the cluster'sSystemOut.log file is located. The log uses the following naming convention: application\_nameUlcSyncCmd.log. If the log file already exists, the new output is appended to the file.

You should run preview versions of commands before you run the actual commands. When you are sure that the command will do what you want, run the actual command.

The following commands, which are identified by the leading wsadmin\> parameter, update the Communities membership database.

1.  Initialize the Communities commands and then preview what the synchronize all command would do.

    ```bash
    wsadmin>execfile("communitiesAdmin.py")
    wsadmin>CommunitiesMemberService.previewSyncAllMembersByExtId({"updateOnEmailLoginMatch":
    "true", "verbose" : "true"})
    UpDt ExtId: f1a8d8c0-a59b-1030-85a9-c32c2f3a2ad1XX Name: Jane Doe has a superseded external ID,
    and would have been updated: New ExtId: f1a8d8c0-a59b-1030-85a9-c32c2f3a2ad1
    [2012-08-07 14:50:54] Additional application possibly-stale member data: Email:
    jane_doe@us.acme.com Logins: [Doe, jane_doe@us.acme.com, Jane Doe]
    [2012-08-07 14:50:54] Directory service basic user data: Display name: Jane Smith Update
    External id: f1a8d8c0-a59b-1030-85a9-c32c2f3a2ad1
    [2012-08-07 14:50:54] Directory service email and logins: Email: sTestuser5@janet.iris.com
    Logins: [Smith, Jane Smith, jane_doe@us.acme.com]
    ```

    The command reveals that the user's external ID in Communities is obsolete.

2.  Run the following command to update the user's external ID. Note that the preview sync all users command is replaced by the more specific sync by email command. You could use the syncAllMembersByExtId\(\) parameter that is associated with the preview but it is best to use the most specific command.

    ```bash
    wsadmin>CommunitiesMemberService.syncMemberExtIdByEmail("jane_doe@us.acme.com ")
    
    CLFWY0263I: The synchronize command found that active member Jane Smith [current external id:
    f1a8d8c0-a59b-1030-85a9-c32c2f3a2ad1XX, application id 6a716827-5fc8-438a-beb2-777f6f5d96df]
    could not be matched via external id, but could be matched via login or email to external id
    f1a8d8c0-a59b-1030-85a9-c32c2f3a2ad1. 
    The member was updated because this action was enabled by the command.
    ```


Use the commands to synchronize user data only in the following situations:

-   Profiles is not installed or Profiles integration is disabled.
-   You migrated from an earlier version of Connections.
-   You want to synchronize data for a specific application or a specific person in a specific application.
-   You want to determine whether any application member data is out of sync with the configured directory.

## Administrative commands { .section}

Use the following commands to update the identifying data and state \(active or inactive\) of the users who are listed in the application database, except for Profiles. For the Profiles application, use Tivoli® Directory Integrator \(TDI\) to synchronize users with a source LDAP database.

The use of square brackets indicates that the enclosed parameters are optional; the square brackets are not part of the command line.

The application\_name variable represents the name of the application. The following options are available:

-   Activities
-   Blogs
-   Dogear \(Bookmarks\)
-   Communities
-   Files
-   Forums
-   News

    !!! note 
        
        The Home page, News repository, and Search applications share the same database, so that running the synchronization command against News applies to all three applications.

-   Wikis
-   Metrics

### Command 1

```bash
application\_nameMemberService.syncAllMembersByExtId\( \{"updateOnEmailLoginMatch": \["true" \| "false"\] \} \)
```

This command checks to see whether the external ID found in the member database table is present in the configured directory:

-   If the external ID is present, then the command gets the display name, email address, and login names from the configured directory and updates the application database tables with the values from the directory, if they are different. This refresh update operation is not logged to the output file.
-   If a match for the user's external ID is not found in the directory, then the command uses the email address and login names that are contained in the application database tables to continue to search for the user. If none of the credentials match, the user is inactivated. How the command works when a match on the login names or email address is found differs depending on the parameter that you specified with the command:

    Parameter: `updateOnEmailLoginMatch: String`. Options are true or false. The default is false.

    **true**

    Specifies that when a match is found in the configured directory based on the login names or email address of the user, the external ID in the application database is automatically updated with the external ID in the configured directory.

    **false**
    
    Specifies that when a match is found in the configured directory based on the login names or email address of the user, the external ID in the application database is written to the `application_nameUIcSyncCmd.log` file. You can manually make the update after confirming that the change should be made.

-   If a match for the user's external ID is not found in the configured directory, nor is a match found for the user's email address and login names, then the state of the user is changed to inactive in the application database.

!!! note 
    
    When none of the credentials match, the Boolean \(true or false\) parameter is ignored; the user is always inactivated.

### Command 2

```bash
application\_nameMemberService.syncMemberByExtId\("currentExternalId"\[, \{"newExtId" : "id-string" \[, "allowExtIdSwap" : \["true" \| "false"\] \] \} \] \)
```

This determines whether the user identified by the first parameter, which is an eternal ID, should be is active or inactive by checking the configured directory for the external ID. The main purpose of this command is to reactivate a user.

!!! note 
    
    This is a complicated command that should be used carefully, particularly when swap is allowed.

You can perform the following tasks with this command:

-   When only `currentExternalId` parameter is provided, the intent is to correct the state information for that user in the application database.

    Parameters:

    **currentExternalId**
    
    String. Unique external ID that represents a user. The command looks for this external ID in the application member table. If it does not find the ID, an error is generated. If the member is found, but is currently defined as inactive, an attempt is made to activate the member. To do so, the command looks up whether the member exists in the configured directory, and if so, then the member is activated in the application member table and the associated display name, email and login values for that member are restored. When this action is taken, the update is logged in the `applicationUIcSyncCmd.log` file. If the member is found and is currently defined as "active" in the application database, the code first looks up currentExternalId in the configured directory. If currentExternalId is not found, the command attempts to find the member by email or login value. If this succeeds, the external ID is updated along with a refresh of display name, email, and logins, and the change is logged. If this does not succeed, then the user is inactivated and the change is logged.

    Example:

    ```bash
    CommunitiesMemberService.syncMemberByExtId("F8E59CA4-7FE1-4195-AA96-A49CE5F8E17F")
    ```

-   When multiple parameters are provided, the intent is to activate the user identified by `currentExternalId` with the identity of the user defined by the `newExtId`. This command might be used when a user has application content, such as a Community, on the server but then leaves the company. The user is removed from the LDAP and the user's state is set to inactive in the application database tables. However, if that person is rehired by the company, the person is added back into LDAP and is assigned a new external ID. For this person to gain access to their old content, you can use the following command to swap their external IDs.

    Parameters:

    **currentExternalId**
    
    String. Unique ID that represents a user.

    **newExtId**
    
    **Optional.** String. If you provide this parameter:

        1.  The same person is being represented by two different external IDs: the currentExternalId is in the application database where the member is marked as inactive and the newExtId, is stored in the configured directory.

        2.  The `newExtId` updates that person's external ID in the application database and the person is marked active.
        **Important:** Only use this command when you are sure that the two IDs represent the same person.

    **allowExtIdSwap**
    
    **Optional.** String. Accepts the values true or false. The default value is false. Specifies whether to swap the new and current ID of the user in the two records that represent the same person. This parameter is only needed if the user was previously employed by the organization and existed in the application member tables with the current ID, departed the organization, and was given a new ID upon returning. After that person logs in to an application for the first time with their new ID, the new ID is added to the application member tables. If you want this new user to have access to the content that she created previously using the current ID, provide this parameter and set it to true. However, be sure to run this command soon after the person returns because once the IDs are swapped, the user is not able to access any new content that she created using the new ID, just her previous content. You cannot merge the data associated with the current and new IDs. If you provide this parameter and set it to false, an error message is displayed in the wsadmin client that indicates that the command could not complete because the newExtId already exists.

    Example:

    ```bash
    CommunitiesMemberService.syncMemberByExtId("7d71d8b2-7de511df-80b6c81b-5330ca0e", 
        {"newExtId": "7d71d8b3-7de511df-80b6c81b-5330ca0e", "allowExtIdSwap": "true"})
    ```
### Command 3

```bash
application\_nameMemberService.previewSyncAllMembersByExtId\( \{"updateOnEmailLoginMatch": \["true" \| "false" \]\[, "multiLine" : \["true" \| "false"\] \] \[, "verbose" : \["false" \| "true"\] \] \}\] \)
```

The preview command reports the action the corresponding `syncAllMembersByExtId` command would take \(or not take\) depending on the `updateOnEmailLoginMatch` parameter value. The results are placed in the `application_nameUlcSyncCmd.log` file.

There are two optional parameters, multiLine and verbose, both of which take a Boolean string value. The default value is true for multiLine and false for verbose. If multiLine is true, each action report is broken into multiple short lines to make it easier to read. If multiline is false, each action report is a single line for ease of searching the file programmatically, for example with a grep utility. If verbose is false, only out of sync results are reported independent of the value of `updateOnEmailLoginMatch`. This includes members that would simply be refreshed. A member is refreshed if the member is active and the external ID is a match, but the display name, email, or the logins don't match. If verbose is true, all members are reported, including active and inactive members.

The format of each reported action is timestamp, action code, action data and action message. The code is a four letter code, listed at the end of this section. At the end of the file five numbers are reported. These are also explained at the end of this section. At the very end of the file is a number that is the total actionable items found.

### Command 4

```bash
application\_nameMemberService.inactivateMemberByEmail\("email-address"\)
```

This marks the person identified by email-address as inactive in the application's membership database tables, for example it changes the state of the specified user to inactive. In addition, the email address and login names for this user are removed from the application's database tables. The user's external ID and Display Name are not modified. The command also writes a status message to the `application_nameUlcSyncCmd.log` file indicating that the user has been deactivated.

Parameter:

**email-address**

String. Email address of the user you want to mark as inactive in the application membership database tables.

### Command 5

```bash
application\_nameMemberService.inactivateMemberByExtId\("externalID"\)
```

This marks the person identified by external ID as inactive in the application's membership database tables. This command changes the state of the specified user to inactive. In addition, the email address and login names for this user are removed from the application's database tables. The user's external ID and Display Name are not modified. The command also writes a status message to the `application_nameUlcSyncCmd.log` file indicating that the user has been deactivated.

Parameter:

**externalID**

String. Unique ID that represents the user you want to mark as inactive in the application membership database tables.

### Command 6

```bash
application\_nameMemberService.getMemberExtIdByEmail\("email"\)
```

This retrieves the external ID of the person identified in the email parameter and returns it to the wsadmin console. The external ID returned from this command can be used as input to some of the other wsadmin commands that require the user's external ID as an input parameter.

Parameter:

**email**

String. Email address of the user whose external ID you want to retrieve.

Example:

-   Command:

    ```bash
    wsadmin>CommunitiesMemberService.getMemberExtIdByEmail("userB@example.com")
    
    ```

-   Result:

    ```bash
    510b99c0-0101-102e-8923-f78755f7e0ed
    ```

### Command 7

```bash
application\_nameMemberService.getMemberExtIdByLogin\("login"\)
```

This retrieves the external ID of the person identified in the login parameter and returns it to the wsadmin console. The external ID returned from this command can be used as input to some of the other wsadmin commands that require the user's external ID as an input parameter.

Parameter:

**login**

String. Login name of the user whose external ID you want to retrieve.

Example:

-   Command:

    ```bash
    wsadmin>CommunitiesMemberService.getMemberExtIdByLogin("User A")
    
    ```

-   Result:

    ```bash
    806edb40-e8ba-102e-91cd-d74ea1c96b51
    ```


## Additional administrative commands { .section}

The following commands were available in previous releases. Some have been updated to enable you to change the user state of a person from active to inactive or inactive to active. You might want to use these commands in the following cases:

-   To synchronize a batch of users from a file based on their login names and emails instead of external IDs.
-   To synchronize a particular user by login name or email, instead of by external ID.

The `application_name` variable represents the name of the application. The following options are available:

-   Activities
-   Blogs
-   Dogear \(Bookmarks\)
-   Communities
-   Files
-   Forums
-   News

    !!! note 
        
        The Home page, News repository, and Search applications share the same database, so running the synchronization command against News applies to all three areas.

-   Wikis

!!! note 
    
    The `application_nameMemberService.syncAllMemberExtIds()` command was deprecated in version 3.

### Command 1

```bash
application\_nameMemberService.syncBatchMemberExtIdsByLogin\("loginFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \] \)
```

The command `application_nameMemberService.syncBatchMemberExtIds(filename)` was deprecated in version 2.5. Use this command or the `application_nameMemberService.syncBatchMemberExtIdsByEmail(emailFile)` command instead.

This synchronizes a list of users contained in the specified text file. The text file must define one login name per line. For each login name, if a match is found the command checks the external ID in the application member table against the value in the configured directory to see if it matches. If the external ID matches, then the user's email address and display name and any additional login names are refreshed if needed so that they match those in the configured directory. The refresh operation is not logged.

If the external ID is not found in the configured directory, then a synchronize operation is performed based on the email and login values and the user's external ID in the member table in the application database is updated with the external ID in the configured directory. Also, the user's email, display name, and any additional login names are refreshed. Each user that is synchronized by this operation is logged in the log file. If the user cannot be found in the configured directory by any means \(external ID, login names, or email\) then the user may be inactive. The command can do one of two things in this situation, depending on whether the allowInactivate input parameter is set to true or false \(see the following explanation of the two flags\).

Parameters:

**loginFile**

String. Path and name of a text file that contains one user login name entry per line.

**allowInactivate**

String. Options are true or false. Specify one of these values to allow changes to the state of the user.

If true, the user is inactivated in the member table of the application database if there is no match. The user's email and login names are deleted from the table and the state flag is set to inactive.

If false or null, the user is not made inactive. Instead, a log message is written to the log file.

This command does not return anything.

For example:

```bash
ActivitiesMemberService.syncBatchMemberExtIdsByLogin("c:/apps/activities/login_sync_file.txt", 
    { "allowInactivate":"false"})
```

### Command 2

```bash
application\_nameMemberService.syncBatchMemberExtIdsByEmail\("emailFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \] \)
```

The command `application_nameMemberService.syncBatchMemberExtIds(filename)` was deprecated in version 2.5. Use this command or the `application_nameMemberService.syncBatchMemberExtIdsByLogin(loginFile)` command instead.

This synchronizes a list of users contained in the specified text file. The text file must define one email address per line. If a match is found, for example the email address identifies a member, the command retrieves the external ID in the application member table and looks it up in the configured directory. If the external ID is found, then the user's display name and any additional login names are refreshed if needed, so that they match those in the configured directory. The refresh operation is not logged.

If the external ID is not found in the configured directory, then a synchronize operation is performed based on the email and login values and the user's external ID in the member table is updated with the external ID in the configured directory. Also, the user's display name, and any additional login names are refreshed. Each user that is synchronized by this operation is logged in the log file. If the user cannot be found in the configured directory by any means \(external ID, login names, or email\) then the user may be inactive. The command can do one of two things in this situation, depending on whether the following allowInactivate input parameter is set to true or false.

Parameters:

**emailFile**

String. Path and name of text file that contains one entry per line of user email addresses \(jdoe@example.com\).

**allowInactivate**

String. Options are true or false. Specify one of these values to allow changes to the state of the user.

If true, the user is inactivated in the member table of the application database if there is no match. The user's email and login names are deleted from the table and the state flag is set to inactive.

If false or null, the user is not made inactive. Instead, a log message is written to the log file.

For example:

```bash
ActivitiesMemberService.syncBatchMemberExtIdsByEmail("c:/apps/activities/my_sync_file.txt", 
    { "allowInactivate":"true"})
```

### Command 3

```bash
application\_nameMemberService.previewSyncBatchMemberExtIdsByEmail\("emailFile"\[, \{ "allowInactivate" : \["true" \| "false"\] \[, "multiLine" : \["true" \| "false"\] \] \[, "verbose" : \["true" \| " false"\] \] \} \] \)
```

See the description of preview commands under the `previewSyncAllMembersByExtId()` command at the beginning of this section. Note that the default value for the verbose parameter is true.

### Command 4

```bash
application\_nameMemberService.previewSyncBatchMemberExtIdsByLogin\("loginFile" \[, \{ "allowInactivate" : \["true" \| "false"\] \[, "multiLine" : \["true" \| "false"\] \] \[, "verbose" : \["true" \| " false"\] \] \} \] \)
```

See the description of preview commands under the `previewSyncAllMembersByExtId()` command at the beginning of this section. Note that the default value for the verbose parameter is true.

### Command 5

```bash
application\_nameMemberService.syncMemberExtIdByEmail\("email" \[, \{ "allowInactivate": \["true" \| "false"\] \} \]\)
```

The command `application_nameMemberService.syncMemberExtId(java.lang.String key)` was deprecated in version 2.5. Use this command or the `application_nameMemberService.syncMemberExtIdByLogin(java.lang.String loginName)` command instead.

This synchronizes the member record in the application member table identified by the member's email address parameter. If a match is found, for example the email address identifies a member, the command retrieves the external ID in the application member table and looks it up in the configured directory. If the external ID is found, then the user's email address and display name and any additional login names are refreshed as needed so that they match those in the configured directory. The refresh operation is not logged.

If the external ID is not found in the configured directory, then a synchronize operation is performed based on the email and login values and the user's external ID in the member table is updated with the external ID in the configured directory. Also, the user's email, display name, and any additional login names are refreshed. Each user that is synchronized by this operation is logged in the log file. If the user cannot be found in the configured directory by any means \(external ID, login names, or email\) then the user may be inactive. The command can do one of two things in this situation, depending on whether the allowInactivate input parameter is set to true or false \(see the following explanation of the two flags\).

Parameters:

**email**

String. A user's email address.

**allowInactivate**

String. Options are true or false. Specify one of these values to allow changes to the state of the user.

If true, the user is inactivated in the member table of the application database if there is not match. The user's email and login names are deleted from the table and the state flag is set to inactive.

If false or null, the user is not made inactive. Instead, a log message is written to the log file.

For example:

```bash
ActivitiesMemberService.syncMemberExtIdByEmail("jdoe@example.com", 
    {"allowInactivate":"false"})
```
### Command 6

```bash
application\_nameMemberService.previewSyncMemberExtIdByEmail\("emailAddr" \[, \{ "allowInactivate" : \["true" \| "false"\] \[, "multiLine" : \["true" \| "false"\] \] \[, "verbose" : \["true" \| " false"\] \] \} \] \)
```

See the description of preview commands under the `previewSyncAllMembersByExtId()` command at the beginning of this section. Note that the default value for the verbose parameter is true.

### Command 7

```bash
application\_nameMemberService.syncMemberExtIdByLogin\("name" \[, \{"allowInactivate": \["true" \| "false"\] \} \]\)
```

The command `application_nameMemberService.syncMemberExtId(java.lang.String key)` was deprecated in version 2.5. Use this command or the `application_nameMemberService.syncMemberExtIdByEmail(java.lang.String emailAddress)` command instead.

This synchronizes the member record in the application member table identified by the user login name parameter. If a match is found, for example the email address identifies a member, the command retrieves the external ID in the application member table and looks it up in the configured directory. If the external ID is found, then the user's email address and display name and any additional login names are updated so that they match those in the configured directory. The refresh operation is not logged.

If the external ID is not found n the configured directory, then a synchronize operation is performed and the user's external ID in the member table is updated with that of the external ID in the configured directory. Also, the user's email, display name, and any additional login names are refreshed. Each user that is synchronized by this operation is logged in the log file. If the user cannot be found in the configured directory by any means \(external ID, login names, or email\) then the user may be inactive. The command can do one of two things in this situation, depending on whether the allowInactivate input parameter is set to true or false.

Parameters:

**name**

String. User login name.

**allowInactivate**

String. Options are true or false. Specify one of these values to allow changes to the state of the user.

If true, the user is inactivated in the member table of the application database if there is not match. The user's email and login names are deleted from the table and the state flag is set to inactive.

If false or null, the user is not made inactive. Instead, a log message is written to the log file.

For example:

```bash
ActivitiesMemberService.syncMemberExtIdByLogin("jdoe", {"allowInactivate":"true"})
```

To understand the 'preview' version of the command see the explanation of preview under the `previewSyncAllMembersByExtId()` command at the beginning of this section. Note that the default value for the verbose parameter is true.

### Command 8

```bash
application\_nameMemberService.previewSyncMemberExtIdByLogin\("name"\[, \{ "allowInactivate" : \["true" \| "false"\] \[, "multiLine" : \["true" \| "false"\] \] \[, "verbose" : \["true" \| " false"\] \] \} \]\)
```

See the description of preview commands under the previewSyncAllMembersByExtId\(\) command at the beginning of this section. Note that the default value for the verbose parameter is true.

**Parent topic:** [Managing users when the Profiles application is not installed](../admin/c_admin_common_user_life_cycle_without_profiles.md)

**Related information**  


[Synchronizing remote application data with the Communities database](../admin/t_admin_communities_synch_remote_app.md)

[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

[Communities administrative commands](../admin/r_admin_communities_admin_props.md)

[Using administrative commands](../admin/t_admin_dogear_administrative.md)

[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)

[Home page administrative commands](../admin/r_admin_homepage_admin_commands.md)

[Setting user roles for external collaboration](../admin/t_admin_profiles_set_roles.md)

[Changing WebSphere Application Server environment variables](../admin/t_admin_common_change_was_env_variable.md)

[News repository error messages](../troubleshoot/r_error_codes_news.md)

[Troubleshooting user data synchronization](../troubleshoot/c_troubleshoot_sync_user_data.md)

