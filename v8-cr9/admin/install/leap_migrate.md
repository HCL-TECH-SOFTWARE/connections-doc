# Migrating Community Surveys and response data to Leap Surveys

**Note:** Migrating from Community Surveys is only supported with HCL Leap

You can migrate surveys and response data from Community Surveys to Leap Surveys in the following three ways:

-   By exporting a Community Survey and its response data individually from a community.
-   By exporting a Community Survey (together with its response data, if desired) from the Community Surveys Application Manager.
-   By upgrading from Community Surveys to Leap Surveys using the existing database, as discussed in [Upgrading from Community Surveys to Leap Surveys](leap_upgrade.md).

With Leap, surveys are no longer scoped to a single community as with the previous survey widget. To gather survey response data for a community, the community is required to have its own Leap survey application, since the application can be accessed by multiple communities depending on the access defined in the application's Roles.

## Before upgrading to Connections 8.0

Ensure that you complete and note the following:

-  Export all surveys and response data that you wish to retain.

-  As a best practice, back up the Community Surveys database (usually named FEBDB).

-  Have an internal deployment where you can access surveys data.

## Exporting Community Surveys and response data from a Connections community

**Note**: When you import the response data to HCL Leap, all metadata will be overwritten.

1.  Access the community where the survey is deployed and where you are a community owner.

2.  To export a survey, go to **Surveys** and click **More** for the survey that you want to export. Then, select **Export**. The survey will be exported as a file named `<surveyName>.nitro_s`.

3.  To export the survey's response data:

    1.  Click **View results** from the survey.
    
    2.  Click the **Responses** tab then **Export Data**. From the three file formats available, select Excel.

## Importing a survey to Leap

After exporting a survey from your Connections community, you can import it to Leap by doing the following:

1.  In HCL Leap, click **Import an app**.

2.  Select the exported survey file (named `<surveyName>.nitro_s` by default) and make sure that "Remove previously defined users and groups from this application?" is checked.

    **Important**: If unchecked, there will be an invalid community membership entry for the community access, which will cause a failure.

3.  Edit the imported app:

    1.  In **Access > Define Roles**, remove the following roles:
    
        -   Reader
        -   LimitedReader
        -   Temporary Designer

    2.  Add the role of 'Record Owner'.

    3.  In **Access > Administrator**, confirm that there is no community ownership entry -- if there is, remove it. The entry would look like so: **afbea705-33f6-43e8-8e1e-9c8b2976c2ab_owner**

        **Note**: Check the other roles for the community ownership entry, and remove the entry if it exists.

    4.  In **Initiator**, add "All authenticated users".

    5.  In **Assign Users > Initiator**, add "All authenticated users" to role members. This setting allows the survey to be used across multiple communities and outside of Connections.

    6.  For **Record Owner**, add "Instance creator" to role members.

After completing these steps, the survey can be deployed for use in a Connections 8.0 community. For guidance on deployment, refer to [Deploying an application](https://help.hcltechsw.com/Leap/9.3.1/cr_deploying_an_application.html).

**Note**: The stage of the Leap app buttons might require additional configuration. For details, refer to [Adding workflow Stages to a form](https://help.hcltechsw.com/Leap/9.3.1/tut_roles_and_stages_module2.html?hl=stages).

## Importing survey response data to Leap

After exporting a survey's response data from your Connections community, you can import it to Leap by doing the following:

**Note**: The metadata for the response data will not be imported.

1.  Modify the exported response data file. For example, if you exported the data as an Excel file, open the file and remove metadata such as Stage, Stage Title, Creator Name, Creator Email, Creation Timestamp, and so on.

2.  In the Leap app, go to the Form and note the Form ID. Also, uncheck the "Single submission per authenticated user" setting.

3.  Return to the survey response data file and replace the exported value with the Form ID, then save your changes.

4.  In the Leap app, go to **View Data** and click **Import Data** in the **Response** tab.

If a matching column is found, a message will display to confirm.

## Exporting community surveys using the Community Surveys Application Manager

1.  Log into the Community Surveys 8.7.0 Application Manager (https://<serverName\>/surveys/).

2.  Select the community survey that you want to export, and click **Export**. A prompt will appear asking to also export the response data. If you would like to export both the survey and its response data, select the checkbox accordingly.

## Importing a survey that was exported using the Community Surveys Application Manager

After exporting a survey using the Community Surveys 8.7.0 Application Manager, you can import the survey (and its response data, if included during export) to Leap by doing the following:

1.  In HCL Leap, click **Import an app**.

2.  Select the exported survey file (named `<surveyName>.nitro_s` by default) and make sure that "Remove previously defined users and groups from this application?" is checked.

    **Important**: If unchecked, there will be an invalid community membership entry for the community access, which will cause a failure.

3.  To import the survey's response data, you must deploy the survey, so select the checkboxes for **Deploy Application** and **Import Data**.

4.  Click **View Data** to confirm that the survey's response data has been successfully imported.

    **Note**: All the metadata will be retained.

5.  Since some of the survey's configuration settings need to be updated, stop the deployment first by clicking **Deploy** then **Stop**.

6.  Edit the imported app:

    1.  In **Access > Define Roles**, remove the following roles:
    
        -   Reader        
        -   LimitedReader
        -   Temporary Designer

    2.  Add the role of 'Record Owner'.

    3.  In **Access > Administrator**, confirm that there is no community ownership entry. The entry would look like so: **afbea705-33f6-43e8-8e1e-9c8b2976c2ab_owner**

        If the entry exists, remove it.

        **Note**: Check the other roles for the community ownership entry, and remove the entry if it exists.

    4.  In **Initiator**, add "All authenticated users".

    5.  In **Assign Users > Initiator**, add "All authenticated users" to role members. This setting allows the survey to be used across multiple communities and outside of Connections.

    6.  For **Record Owner**, add "Instance creator" to role members.

After completing these steps, the survey can be redeployed for use in a Connections 8.0 community. For guidance on deployment, refer to [Deploying an application](https://help.hcltechsw.com/Leap/9.3.1/cr_deploying_an_application.html).

**Note**: The stage of the Leap app buttons might require additional configuration. For details, refer to [Adding workflow Stages to a form](https://help.hcltechsw.com/Leap/9.3.1/tut_roles_and_stages_module2.html?hl=stages).


**Parent topic:** [Installing Leap Surveys](../install/leap_surveys.md)