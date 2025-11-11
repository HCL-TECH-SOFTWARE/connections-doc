# Preparing to migrate data {#cp_config_om_prepare_migrate_profiles .task}

To use the Orient Me home page, HCL Connections™ Profiles will need to be migrated from Connections to Orient Me. To do this, there is a migration tool. To prepare the migration tool, first you must complete the steps listed in the Populating the Orient Me page of this document.

Follow these steps to prepare for the data migration.

1.  Connect to the container:

    ```
    kubectl exec -n connections -it $(kubectl get pods -n connections | grep people-migrate | awk '{print $1}') sh
    ```

2.  Now that you are logged into the people migration container, edit the migration configuration settings for the migration. The migration configuration file is called migrationConfig and it's available in the root directory inside the container, so no need to change location.

    For example, vi /usr/src/app/migrationConfig.

3.  Open the file migrationConfig and edit it to match the details of the Kubernetes master and Connections systems being setup. Consider the following to help you edit the file:

    -   Profiles and Communities admin user can be found in WebSphere Application security role mapping of Profiles and Communities 'admin' role.

    -   Communities dsx-admin user can be found in WebSphere Application security role mapping of Communities 'dsx-admin' role.

    -   By default, the migration tool will read the configuration file from default root directory. you can also put the configuration file at any location and use config:\[filePath\] to specify the configuration path.

    -   Tune the setting of MAX\_REQUEST\_NUMBER\_PER\_MINUTE and MAX\_CONCURRENT\_USER based on your system configuration and performance requirement, to make sure the migration does not cause the system to overload

        **Tip:** The recommended configuration for a 300,000 populated profiles database is MAX\_REQUEST\_NUMBER\_PER\_MINUTE: 20000 and MAX\_CONCURRENT\_USER: 50.

    For example, your result will look like the following code snippet:

    ```
    {
     //API format
     "API_FORMAT": "atom",
     //Connections Host apps URL
     "SERVER_HOST": "https://Your_Connections_env_URL",
     //MongoDB Host
     "MONGODB_HOST": "mongo7:27017",
     //MongoDB port
     "MONGODB_PORT": 27017,
     //MongoDB replicate set name
     "MONGODB_RS_NAME": "rs0",
     //Profiles admin user
     "PROFILES_USER_NAME": "ConnectionsAdminUser",
     //Profiles admin password
     "PROFILES_USER_PASSWORD": "ConnectionsAdminPassword",
     //Profiles admin API end point
     "PROFILES_ADMIN_API_PATH": "/profiles/admin/atom/profiles.do",
     //Profiles report chain API end point
     "PROFILES_REPORT_CHAIN_API_PATH": "/profiles/atom/reportingChain.do",
     //Profiles network API end point
     "PROFILES_NETWORK_API_PATH": "/profiles/atom/connections.do",
     //Profiles network pagesize
     "PROFILES_NETWORK_PAGESIZE": 100,
     //Profiles Following API end point
     "PROFILES_FOLLOW_API_PATH": "/profiles/follow/atom/resources",
     //Page size for Profiles Following API
     "PROFILES_FOLLOW_PAGESIZE": 100,
     //Communities admin user
     "COMMUNITIES_USER_NAME": "ConnectionsAdminUser",
     //Communities admin password
     "COMMUNITIES_USER_PASSWORD": "ConnectionsAdminPassword",
     //Communities Following API end point
     "COMMUNITIES_FOLLOW_API_PATH": "/communities/follow/atom/resources",
     //Communities dsx-admin user
     "COMMUNITIES_DSX_USER_NAME": "ConnectionsAdminUser",
     //Communities dsx-admin password
     "COMMUNITIES_DSX_USER_PASSWORD": "ConnectionsAdminPassword",
     //Communities membership API end point
     "COMMUNITIES_MEMBERSHIP_API_PATH": "/communities/service/atom/dsx/membership",
     //Page size for Communities Following API
     "COMMUNITIES_FOLLOW_PAGESIZE": 100,
     //Batch user size for user population
     "POPULATE_MIGRATION_PEOPLE_PAGESIZE": 500,
     //Maximum of HTTP/HTTPS request sending to Connections per minute during migration
     "MAX_REQUEST_NUMBER_PER_MINUTE": 20000,
     //Maximum of users migrated concurrently
     "MAX_CONCURRENT_USER": 50,
     //Step populate code
     "STEP_POPULATE_CODE": false,
     //Step migrate people info
     "STEP_MIGRATE_PEOPLE_INFO": false
    }
    ```


**Parent topic:**[Populating the Orient Me home page](../install/cp_config_om_populate_home_page.md)

**Next topic:**[Migrating the data for the Orient Me home page](../install/cp_config_om_migrate_profiles.md)
