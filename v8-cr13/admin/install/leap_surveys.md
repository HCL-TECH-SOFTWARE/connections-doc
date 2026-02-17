# Installing Leap Surveys

You can choose between HCL Leap or HCL Domino Leap to build a survey application, and then access the survey and its submissions in your Connections community using the following widgets:

-   **Leap Form**: displays the Leap survey application
-   **Leap Results**: displays the results for the Leap survey application

For guidance on HCL Leap installation, check out [Installing Leap](leap_install.md).

!!! note
    
    Upgrading or migrating Community Surveys is only supported with HCL Leap.

## Leap surveys in a Connections community

With Leap, surveys are no longer limited to a single community, as was the case with Community Surveys. To gather survey responses for a community, that community must have its own Leap survey application, since the application can be accessed by multiple communities based on the access defined in its Roles. 

After installing Leap, [build a survey application](https://help.hcltechsw.com/Leap/9.3.1/tut_survey_application_OV.html) then add the app to the [Leap Form and Leap Results widgets](leap_widgets.md).

If the survey application is shared with other communities, then the Leap Results widget will display the submissions for all the communities.

The community owner must be listed as an administrator in the application. This will ensure the application appears in the typeahead for the Leap widgets in the 'Form' field.


**Parent topic:** [Configuring additional HCL Connections applications](../install/t_inst_config_addons.md)