# Migrating the data for the Orient Me home page {#cp_config_om_migrate_profiles .task}

Migrate data from Profiles and Communities to populate the Orient Me home page with content.

After preparing the migration tool, you are ready to run the migration service to populate the Orient Me page.

-   Connect to the container:

    ```
    kubectl exec -n connections -it $(kubectl get pods -n connections | grep people-migrate | awk '{print $1}') sh
    ```

-   To start the migration run either:

    ```
    npm run start migrate
    ```

    Or

    ```
    npm run start migrate config:[filePath]
    ```

    Choose the migration option that best fits your deployment scenario.

    **Note:** The term populate on this page refers to populating users profiles and the term migrate refers to the migration of user data such as network and community relationships.

    Run user population and migration
    :   Run the following command to populate all users from Connections Profiles and migrate their data to People relationship service. If the migration process was stopped, it resumes the migration from where it left off.

        `npm run start migrate`

        or

        `npm run start migrate config:[filePath]`

    Reset and re-run population and migration
    :   Run the following command to reset the population and migration progress. All population and migration status information are cleaned up then the population and migration restarts.

        `npm run start migrate:clean`

        or

        `npm run start migrate:clean config:[filePath]`

    Populate users without migrating
    :   Run the following command to populate all users from Connections Profiles without migrating. If the populate command was stopped, it resumes from where it left off.

        `npm run start populate`

        or

        `npm run start populate config:[filePath]`

    Reset and re-run population without migrating
    :   Run the following command to reset user population progress. All population and migration status information will be cleaned up then the population restarts.

        `npm run start populate:clean`

        or

        `npm run start populate:clean config:[filePath]`

    Migrate for all populated users
    :   Run the following command to migrate data for all populated users. If the users in the population database have already been migrated, it skips them and only migrate those users who have not been completed:

        `npm run start migrateuser`

        or

        `npm run start migrateuser config:[filePath]`

    Reset and re-run migration for all populated users
    :   Run the following command to reset population progress. All migration status information is cleaned up then migration against current populated users restarts.

        `npm run start migrateUser:clean`

        or

        `npm run start migrateUser:clean config:[filePath]`

    Generate migration report
    :   Run the following command to generate a migration report:

        `npm run start report`

    Generate migration report for specific users
    :   To check whether a user has already been migrated, run the following command and specify the user email address \($email\)

        `npm run start report $email`

        To check a group of user's migration status, run the following command and specify the file name containing the list of their email addresses separated by commas.

        `npm run start report $filePath`

    To migrate canary group \(high priority users\)
    :   Put all users email address in a text file with addresses separated by commas. Then, run the following command to start migration of those users with high priority.

        `npm run start canary $filepath $reset`

        resetflag can be true or false. If set to true, the tool will run the full migration for those users regardless if they were migrated before. Otherwise, it will only migrate those users who haven't been finished.

        **Note:** After adding the user group, run `npm run start migrateUser` to start migration. Users in the canary group will be migrated first.

    Specify user credentials in the command line
    :   By default, the migration tool reads the user password from the configuration file. It also supports specifying the user name and password in the command line and it will ignore the password in the configuration file.

        For example use below command line to run the full migration:

        ```
        npm run start migrate p-user:user1 p-pwd:password1 c-user:user2 
        c-pwd:password2 dsx-user:user3 dsx-pwd:password3 m-user:user4 m-pwd:password4
        ```

        Where:

        -   `p-pwd`: Password for Profiles admin user
        -   `c-pwd`: Password for Communities admin user
        -   `dsx-pwd`: Password for Communities DSX user
        -   `m-pwd`: Password for MongoDB database

If you encounter any problems with the migration, use the following commands to find and view the migration log files.

1.  Connect to the container using kubectl commands:

    ```
    kubectl exec -n connections -it $(kubectl get pods -n connections | grep people-migrate | awk '{print $1}') sh
    ```

2.  Enter one of these commands to navigate to the logs folder: `cd logs` or `cd /usr/src/app/logs`
3.  Review any of the migration log files:
    -   migrationXXXXXX.log - Data migration logs, data migration tool is reporting everything in those log files.
    -   populate.log - Saving data population logs
    -   report.html - Saving data migration report command output
    -   Rerun command for failed users:

        ```
        npm run start migrate
        ```


**Parent topic:**[Populating the Orient Me home page](../install/cp_config_om_populate_home_page.md)

**Previous topic:**[Preparing to migrate data](../install/cp_config_om_prepare_migrate_profiles.md)

