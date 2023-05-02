# Installing HCL Leap Surveys

Starting in HCL Connections 8.0 CR2, you can use HCL Leap to build a survey application then access the survey and its submissions in your Connections community using the following new widgets:

-   **Leap Form**: displays the HCL Leap survey application
-   **Leap Results**: displays the results for the HCL Leap survey application

For guidance on HCL Leap installation, check out [Installing HCL Leap](leap_install.md).

## Leap surveys in a Connections community

With Leap, surveys are no longer scoped to a single community as with the previous survey widget. To gather survey response data for a community, the community is required to have its own Leap survey application, since the application can be accessed by multiple communities depending on the access defined in the application's Roles.

After installing HCL Leap, [build a survey application](https://help.hcltechsw.com/Leap/9.3.1/tut_survey_application_OV.html) then add the app to the [Leap Form and Leap Results widgets](leap_widgets.md).

If the survey application is shared with other communities, then the Leap Results widget will display the submissions for all the communities.

The community owner must be listed as an administrator in the application. This would display the application in the typeahead for the Leap widgets that are in the "Form" field.


**Parent topic:** [Configuring additional HCL Connections applications](../install/t_inst_config_addons.md)