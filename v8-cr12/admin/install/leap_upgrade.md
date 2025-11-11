# Upgrading from Community Surveys to HCL Leap Surveys

**Note:** Upgrading from Community Surveys is only supported with HCL Leap

If your Connections deployment includes Communities Surveys (FEB 8.7), follow these instructions to upgrade to HCL Leap. This process involves uninstalling Community Surveys then installing HCL Leap.

## Before you begin

If you have an existing Leap deployment, back it up using the instructions found in [Upgrading Leap production environment](https://leap.hcldoc.com/help/topic/LEAPv9/LEAP/in_upgrading.html).

## Upgrade considerations and recommendations

**For a new HCL Leap database:**

1.  It is strongly recommended that you back up the Community Surveys (FEB 8.7) database (usually named FEBDB). If possible, have a test environment with the database, so you can still access the surveys.

2.  Export Community Surveys or Response data that you would like to migrate to Leap 9.3 for Connections 8.0. This must be done individually for each survey, either in each community or using the FEB Application Manager.

3.  Once Connections 8.0 with the latest CR and HCL Leap 9.3 is deployed, the Communities Surveys and/or Response data for each survey must be individually imported into Leap 9.3.

4.  Each individual survey must be fixed up before it can be added to a Leap Form widget.

5.  Each community with a Community Survey or Featured Survey widget needs to be updated to remove the old widgets and replace them with the new Leap Form and Results widgets.

**For an existing Community Surveys database:**

1.  All Community Surveys applications will be available.

2.  Any deployed or running applications must be stopped, since they must be fixed up before used with the new widgets. For instructions, refer to [Updating and stopping a deployment](https://help.hcltechsw.com/Leap/9.3.1/cr_updating_and_stopping_deployment.html?hl=deploy) in the HCL Leap documentation.

3.  Each individual survey needs to be fixed up before it can be added to a Leap Form widget.

4.  Each community with a Community Survey or Featured Survey widget needs to be updated to remove the old widgets and replace them with the new Leap Form or Results widgets.

## Upgrading to Leap surveys

Perform the following procedure to replace Community Surveys with Leap for your Connections 8.0 with the latest CR deployment.

1.  Uninstall Community Surveys:

    1.  Shut down the Connections server but leave the node running. In the Installation Manager (IIM), click **Uninstall** and select **CommunitySurveys**.

    2.  Enter your WebSphere Application Server credentials, then click **Validate**. If successful, there will be no message and the "Next" button will be enabled.
    
    3.  Verify that "CommunitySurveys" is selected as the package to be uninstalled, then click **Uninstall**.

    4.  Confirm that the Community Surveys application is removed. In the Enterprise Applications list, "Community Surveys" should no longer be present.

    5.  Check if there are any remaining FEB Mail sessions or JDBC providers or data sessions. If there are, remove them.

2.  Manually delete the following:

    1.  Delete the file `ibm.nitro.integrations.connections.packaging.client-8.7.0.52.jar` from `provision/webresources`.

    2.  Delete the folders `/HCL/Forms/extensions`.

3.  Sync the node and start the cluster to ensure that everything works as expected:

    1.  Confirm that the Survey and Featured Survey widgets were removed from both the community's Highlights page and the "Add Apps" palette.

    2.  Check that the widgets in the community are blank.

    3.  Confirm that there are no errors or references to FEB in the SystemOut.log.

4.  Upgrade to the latest Connections 8.0 CR, if you have yet to do so.

5.  Install Leap 9.3. For further information, refer to [Installing](https://leap.hcldoc.com/help/topic/LEAPv9/LEAP/in_overview.html) in the HCL Leap documentation.

    If you will be creating a new HCL Leap database, then you need to drop the previous database and create a new one.

    1.  Start the cluster and complete the Leap setup for the hostname and application dependencies.

    2.  Confirm that HCL Leap 9.3 is ready for use.

6.  In the Connections Engagement Center, log in as the xccadmin to set up typeahead and the widget titles (https://<hostname\>/xcc/admin):

    **Note**: This step is also required for a fresh installation of Leap 9.3.

    1.  To enable typeahead, click **Custom Properties** and add the following key-value pairs:

        -   Key: febUrl

            Value: https://<servername\>

            Replace this febUrl value with that of your system.

        -   Key: febContextRoot

            Value: apps

    2.  To fix the title display for the Leap widgets, go to **Language Files**, then, while clicking ReInIt button, press Ctrl + Shift (or Cmd + Shift on Mac) to purge all language files.

7. Test the deployment by creating a Leap Survey application and adding it to a Leap Form or Results widget.

## Post-upgrade tasks

-   If you created a new FEBDB, import the surveys and response data that you wish to retain and use in Leap 9.3 for Connections 8.0. For more information, refer to [Migrating Community Surveys and response data to Leap Surveys](leap_migrate.md).

-   If you kept an existing FEBDB, stop any deployed or running applications since they are incompatible. For instructions, refer to [Updating and stopping a deployment](https://help.hcltechsw.com/Leap/9.3.1/cr_updating_and_stopping_deployment.html?hl=deploy) in the HCL Leap documentation.


**Parent topic:** [Installing Leap Surveys](../install/leap_surveys.md)