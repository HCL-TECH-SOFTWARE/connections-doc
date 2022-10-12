# Manual steps required to complete the upgrade to HCL Community Surveys {#t_upgrading_to_hcl_surveys_manual .task}

The following procedure provides the manual steps necessary to complete the upgrade from an existing installation of Community Surveys to HCL Community Surveys 6.5.

The IBM Installation Manager is used to upgrade the Community Surveys application on the WebSphere Application Server environment. The following must be completed before continuing with this procedure: Refer to [Upgrading an existing Community Surveys installation to HCL Connections Community Surveys](t_upgrading_surveys_to_hcl_surveys.md).

This procedure requires manual replacement of the Communities specific widgets with a newer versions from the installation kit.

1.  Remove the newly created /opt/HCL/Forms \(Linux\) or C:\\HCL\\Forms \(Windows\) directory structure.

2.  Switch to the /opt/ibm/Forms/extensions \(Linux\) or C:\\HCL\\Forms\\extensions \(Windows\) directory.

3.  Make a backup copy of both Connections\_config.properties and Builder\_config.properties.

4.  Remove all of the existing .jar files from the extensions directory.

5.  Extract the updated files from <install\_kit/ibm.nitro.integrations.connections.packaging-8.7.x.x.zip into theextensions directory to replace those removed.

6.  Remove the new unconfigured Connections\_config.properties that came from the zip and rename or copy the backup copy to Connections\_config.properties.

7.  Switch to the /opt/ibm/Connections/data/shared/customization/strings \(Linux\) or C:\\IBM\\Connections\\data\\shared\\customizations\\strings \(Windows\) directory.

8.  Remove all of the existing .properties files from the strings directory.

9.  Extract the updated files from <install\_kit/ibm.nitro.integrations.connections.client-8.7.x.x.zip into thestrings directory to replace those removed.

10. Switch to the /opt/ibm/Connections/data/shared/provision/webresources \(Linux\) or C:\\IBM\\Connections\\data\\shared\\provision\\webresources \(Windows\) directory.

11. Remove the existing ibm.nitro.integrations.connections.packaging.client-8.6.x.x.jar file from the webresources directory.

12. Copy the new <install\_kit/ibm.nitro.integrations.connections.packaging.client-8.7.x.x.jar file into the webresources directory.

13. In the WebSphere Application Server, do a full synchronize of the nodes and then stop and restart the **Common** and **Communities** applications.

14. Log into Connections and verify the Surveys and Featured Surveys are functioning correctly.


**Parent topic:**[Upgrading an existing Community Surveys installation to HCL Connections Community Surveys](../install/t_upgrading_surveys_to_hcl_surveys.md)

