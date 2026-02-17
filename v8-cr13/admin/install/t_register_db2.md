# Registering the IBM DB2 product license key {#t_register_db2 .task}

Register the IBM DB2® product license key for DB2 11.5.6, provided by HCL in the DB2 Universal Fix Pack.

Install IBM DB2 before beginning this task but do not create any application databases until after you have completed this task.

For supported versions of DB2, see the [HCL Connections system requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).

1.  Navigate to [My HCLSoftware](https://my.hcltechsw.com/) and log in.

2.  Find the `DB2_ESE_AUSI_Activation_11.5.zip` file \(IBM DB2 Enterprise Server Edition - Authorized User Single Install Option - Activation 11.5 for Linux, UNIX and Windows Multilingual\).

3.  Download and unpack the file, making a note of the location you unpacked to.

4.  Log in to IBM DB2 using an ID with SYSADM authority \(usually db2admin or db2inst1\).

5.  Update the IBM DB2 license.

    The `db2ese_u.lic` file is the license file for the Authorized User Single Install option. For other license options, see the [IBM Db2 Version 11.5 Knowledge Center](https://www.ibm.com/docs/db2/11.5).

    1.  Open a command prompt and change to the following directory: `db2_install_dir/bin`

        where `db2_install_dir/bin` is the directory to which you installed IBM DB2.

    2.  Run the following command to update the license:

        ```
        db2licm -a path_to_lic_file/db2ese_u.lic
        ```

        !!! note
            For more information about using the license management tool command, see [db2licm](https://www.ibm.com/docs/db2/11.1?topic=licenses-db2licm-license-management-tool-command) in the IBM Db2 documentation.

6.  Verify that the license is registered by running the following command:

    ```
    db2_install_dir/bin/db2licm -l
    ```

    If the license is correctly registered, the details of your IBM DB2 installation are displayed similar to those in the following table.
 
    ```
    Product name:                                “DB2 Enterprise Server Edition” 
    License type:                                “Authorized User Single Install”
    Expiry date:                                 “Permanent”                     
    Product identifier:                          “db2ese”                        
    Version information:                         “11.5”                          
    Enforcement policy:                          “Soft Stop”                     
    Number of licensed authorized users:         “25”                            
    Features                                                                     
    IBM DB2 Performance Management Offering:      Not licensed                    
    ```

7.  Restart IBM DB2.


[Create a dedicated DB2 user](t_db_create_lcuser.md)

**Parent topic:**[Creating DB2 databases](../install/c_inst_create_database_db2.md)

