# Setting up the Leap widgets

## Leap Form widget {#leap_form .section}

The Leap Form widget displays the Leap survey application. When typing the survey's name in the "Form" field of the configuration screen, the survey application will be displayed.

Community members can interact with the widget and submit their answers to survey questions. If you want to enable anonymous submissions for a Leap survey application, do the following:

1.  Add the following configuration to the [Leap properties file](https://help.hcltechsw.com/Leap/9.3/co_configuring_the_properties_file.html):

    ```
    ibm.nitro.NitroConfig.blockAnonAccess=disabled
    ```

2.  In Leap, configure the access settings of the Leap application to allow users to submit responses anonymously: Go to **Access > Assign Users > Initiator** and add  "Anonymous Users" to role members.

**Note**:

-   For anonymous submissions, the "Single submission per authenticated user" must be disabled.

    -   If "Anonymous" is selected in the Leap Form widget and the setting "Single submission per authenticated user" is enabled, the "Submit" button will not be displayed.

-   To limit one submission per authenticated user, enable "Single submission per authenticated user" in the form properties of the Leap survey application.

## Leap Results widget {#leap_results .section}

The Leap Results widget displays the Leap survey's response data. A community owner will view all the responses for a survey application, while a community member will only be able to view their own submission.

When typing the survey's name in the "Form" field of the configuration screen, the survey application will be displayed.

When setting up the Leap Results widget, you need to fill the following fields:

-   In the "Form" field, select the form that corresponds to the survey response data you want to be displayed.

-   In the "Content" field, select the display format for the survey submission data. You can choose from the following formats:
    -   All Charts: A chart for each of the survey questions.
    -   Survey: Will display the following two tabs:
        -   Responses: A table of the survey data. To add or remove columns in the table, click the **Customize** button.
        -   Summary: A chart and data table for each survey question.
    -   List of each of the questions: Lists each survey question individually.

All community owners should be added as administrators in the Leap survey application so they can view all of the submissions for a survey in the Leap Results widget.


**Parent topic:** [Installing Leap Surveys](../install/leap_surveys.md)