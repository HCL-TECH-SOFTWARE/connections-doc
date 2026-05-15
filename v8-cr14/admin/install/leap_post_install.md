# Post-installation tasks

After installing Leap, perform the following configurations.

## Reinitialize the language files for Highlights

To ensure that the title of the Leap widgets display correctly, do the following:

1.  In `/xcc/admin`, go to **Language Files**.

2.  Press Ctrl + Shift (or Cmd + Shift on Mac) while clicking the ReInIt button to purge all language files.

## Configure the Leap URL for typeahead when searching for Leap applications

1.  In `/xcc/admin`, go to **Custom Properties**.

2.  Configure the following two properties:

    **Note**: The values are case-sensitive.

    -   Key: febUrl

        Value: The server where Leap is deployed (https://<serverName\>)

    -   Key: febContextRoot

        Value:
        **HCL Leap:** apps
        **HCL Domino Leap:** volt-apps


**Parent topic:** [Installing Leap Surveys](../install/leap_surveys.md)