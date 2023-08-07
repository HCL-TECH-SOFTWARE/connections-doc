# Installing fixes as a non-root user {#t_non-root_install_fixes .task}

Grant permissions to a non-root user to install fixes.

This task applies only to HCL Connections™ deployments on Linux®.

By default, only root users have the necessary permissions to install fixes for an Connections deployment. You can permit non-root users to install fixes by changing their permissions to access certain data directories.

To grant the necessary permissions to a non-root user, complete the following steps:

1.  Create a non-root user.

2.  Create a home directory for the new non-root user.

3.  Open a command prompt and grant the appropriate permissions to the non-root user by running the commands shown in the following table:

    |Directory|Permissions|Command|
    |---------|-----------|-------|
    |[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)|RWX|chown -R non-root\_user app\_server\_root|
    |[connections\_root](../plan/i_ovr_r_directory_conventions.md)|RWX|chown -R non-root\_user connections\_root|
    |path/tmp/efixes|RWX|chown -R non-root\_user tmp/efixes|

    where non-root\_user is the account ID of the new non-root user and path is the path to the efixes directory.

    **Note:** Verify that the /tmp/efixes directory already exists before running the chown command.


When you have granted the necessary permissions, the non-root user can install fixes and fix packs.

**Note:** If different non-root users intend to install fixes, you must first delete any files that might remain in the download directories since you installed earlier fixes.

## Example { .example}

Grant permissions to a new non-root user who wants to install a fix pack for an Connections deployment on Linux:

1.  Create a non-root user account called fix\_installer.
2.  Create a home directory for the fix\_installer user account.
3.  Open a command prompt and run the following commands:
    1.  chown -R fix\_installer /opt/IBM

        **Note:** In this example, the opt/IBM directory contains both the app\_server\_root and connections\_root directories.

    2.  chown -R fix\_installer /usr/IBM

        **Note:** If the /usr/IBM directory does not exist, create it.

4.  Advise the new non-root user to log in and then download and install the latest fixes for Connections.

**Parent topic:** [Updating Connections 8.0 with the latest fixes](../migrate/c_updating_interim_fixes.md)

