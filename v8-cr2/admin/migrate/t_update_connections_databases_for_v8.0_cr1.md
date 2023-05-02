# Updating databases for 6.5 CR1 {#t_update_connections_databases_for_v65_cr1 .task}

If you update 6.5 to apply CR1, you must also update databases to accommodate new and changed features.

Connections™ 6.5 CR1 requires the following database updates, which you perform on the Deployment Manager:

1.  On the database server, download and extract the CR1 database update package [Connections 6.5 CR1](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0077137) to a local directory.

2.  Update the Files and Wiki databases by completing the following steps:

    1.  Verify that you have the permissions needed for updating the database.

        The user who is running the schema update script must have read/write access to the directory that script exports data to. Make sure that the current user has permission to modify any existing ixf and msg files so that the script can overwrite them if necessary.

    2.  In the extracted directory, change to the \\from-65\\database\_type subdirectory.

    3.  Run the scripts to update the Files and Wiki databases.

        The package contains a readme file with the specific commands for running the update for each database product.

        Refer to the [Update strategy for Connections 6.5](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0077140) for more information.

    4.  Review the output from the scripts to verify that there are no errors.


