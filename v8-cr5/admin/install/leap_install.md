# Installing HCL Leap

The Leap Form and Leap Results widgets require HCL Leap. For details on installation, refer to the [HCL Leap documentation](https://help.hcltechsw.com/Leap/9.3/index.html).

Before installing HCL Leap, you need to create a DB2 database:

1.  **Optional**: If you have created different users for each database, create a FEBUSER similar to LCUSER in the operating system.

2.  Assign rights to the user. You can assign rights to the FEBUSER you created or use the LCUSER:

    ```
    db2 "GRANT DBADM ON DATABASE TO USER LCUSER"
    ```

You can download HCL Leap from the HCL Software and Licenses portal in the HCL Connections download package.

## What to do next

After installing HCL Leap, prepare it for use by [setting up title display and typeahead](leap_post_install.md).


**Parent topic:** [Installing HCL Leap Surveys](../install/leap_surveys.md)