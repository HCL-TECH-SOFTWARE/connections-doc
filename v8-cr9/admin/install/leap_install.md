# Installing HCL Leap

The Leap Form and Leap Results widgets require HCL Leap or HCL Domino Leap.

**Note:** HCL Leap 9.3.8 and Domino Leap 1.1.6 have introduced stricter security measures. Please refer to the following topics “Configuration properties” and “Admin Configuration Page“ in the Leap product documentation for information on the whitelist, attachment whitelist, embedding, image domain whitelist, and service whitelists.
For guidance on installation, refer to: 

- [Installing HCL Leap](https://opensource.hcltechsw.com/leap-doc/9.3.8/in_overview.html)
- [Installing HCL Domino Leap](https://opensource.hcltechsw.com/leap-doc/dleap/1.1.6/dleap_install_overview.html)

!!! note
    
    Customers with the appropriate entitlement can download HCL Leap from the [My HCLSoftware portal](https://my.hcltechsw.com/). For more information about HCL Domino Leap and licensing, refer to the [Domino Leap Showroom](https://www.hcl-software.com/domino/offerings/domino-leap/showroom). 

Before installing HCL Leap, you need to create a DB2 database:

1.  **Optional**: If you have created different users for each database, create a FEBUSER similar to LCUSER in the operating system.

2.  Assign rights to the user. You can assign rights to the FEBUSER you created or use the LCUSER:

    ```
    db2 "GRANT DBADM ON DATABASE TO USER LCUSER"
    ```


## What to do next

After installing HCL Leap, prepare it for use by [setting up title display and typeahead](leap_post_install.md).


**Parent topic:** [Installing HCL Leap Surveys](../install/leap_surveys.md)