# Deploying Security Directory Integrator into a new install of Connections {#t_prof_tdi_upgrade .task}

To deploy IBM Security Directory Integrator \(formerly Tivoli Directory Integrator\) into a new install of HCL Connections \(not for upgrading from previous versions of Connections & TDI\) perform this procedure.

|Option|SDI Deployment Steps|
|------|--------------------|
|If you are installing a new deployment of Connections 7|SDI version 7.2 should be installed and used in conjunction with Connections 7. Perform the following:1.  You can download Security Directory Integrator \(SDI\) v7.2 from the [HCL Software License and Download Portal](https://id.hcltechsw.com/login/login.htm?fromURI=%2Fapp%2Fhclcust_licensedownloadportal_1%2Fexk8jshjulHatp2g8357%2Fsso%2Fsaml%3FSAMLRequest%3DhZJPj9MwEMW%252FSuR786%252FabWq1lZJmEZUWtOoCBy6V5UyIF8c2nvG2fHucVMByKSdLz%252B955vfkDYpRO14HGswRfgRASi6jNsjniy0L3nArUCE3YgTkJPlz%252FeGRl2nOnbdkpdXsTeR2QiCCJ2UNSw7tlp2qom6betk2Tbve7%252B9Xy4eHqqmK5apYre%252BasmTJF%252FAY%252FVsW4zGEGOBgkIShKOVlscirRb78VFQ8X%252FP8%252FitL2sigjKA5NRA55FmmunSQmkAOeE6lHTPhXBYVGZBOWkkwCJ09G21F56wnoU9FBpfv1QsOL0G%252FF%252BTKb9XybpUh2mwCZcnextC0xy1ieTVxGbyP50KNLo5TxJJ31kuYi9%252ByXmiECe8pNqRe4Y9S%252Fy5sGhZG8M%252FgX%252BO6n4%252BPf%252BEiB9qezsJD2mu4GCDrwM8V4Ew7gtbWZM4iHQHdtBPbbSYMPlfqd%252F99Y5O9tW%252Bu%252F%252BZj5D20TzYi%252FZyARnGjjiItZkV1i3628mDQgVS9gi6ixhXPew%252BCIj75ACzbXYf%252B%252Bz93vwA%253D%26RelayState%3D%252Fflexnet%252Foperationsportal%252Flogon.do%253Fauthtype%253Dexternal%26SigAlg%3Dhttp%253A%252F%252Fwww.w3.org%252F2001%252F04%252Fxmldsig-more%2523rsa-sha256%26Signature%3DbcwVm81mUebS6wvStlm80sRIkTzTsWpt4MQG4Cr%252B9jTp9UMeRzsqXR%252FvLK6aQ%252FJsbuPous6UDrjBchVvnyGgA0xCgCeM0vfqkwb19y8apczlRrapl5y8mPViWcANrsWanXYlt4ANdDaFlSuFUlMe5R2z%252BOTivwPVSGVwg3Fyv29%252FvwBKNe5zyyGDbSkW7Cw%252FWHgoww5R7KRnjTIoxc0v8Exut9J4MbGP5knox8xRCnESFkpEv9sMFXt%252FRpNJoaKuml3s4hDzSufcvApveF%252BHZM8hzyIIFH3%252FvN5Kn6Frb8eqkkesAd9TJl40OtDxA%252FR3h64JMW3c%252BTXSsyAHaEj%252FjA%253D%253D), in the "WebSphere Application Server 8.5.5 and Select Fix Packs" package.
2.  Upgrade SDI to Fixpack 6 by replacing the UpdateInstaller.jar with the Fixpack 6 file from your TDI/V7.2/maintenance directory. You can install Fixpack 6 from the TDI/V7.2/bin directory by running the following command:

    ```
./applyUpdates.sh -update /install/TDI72/7.2.0-ISS-SDI-FP0006/SDI-7.2-FP0006.zip
    ```

3.  Oracle: Upgrade the JDBC Database Driver to version 7. Refer to [Oracle site to download the ojdbc7.jar driver](https://www.oracle.com/database/technologies/jdbc-drivers-12c-downloads.html).
4.  Microsoft SQL: Download the [SQL Server JDBC 4.2 driver](https://www.microsoft.com/en-us/download/details.aspx?id=54671) from the Microsoft™ web site and follow the instructions to extract the driver files. HCL Connections uses the sqljdbc41.jar file.
5.  DB2: For DB2 there is no change required.
6.  If you need to populate the Profiles database with people from your company's LDAP, then you must use the Population Wizard that is packaged with Connections. Refer to [Populating the Profiles database](t_prof_install_profiles_db.md), [Using the Profiles population wizard](t_prof_populate.md), and [Using the Profiles population wizard in silent mode](t_silent_population_wizard.md) for additional information.
7.  To keep the users in LDAP and the Profiles database in sync you must manually download and install the SDI solution directory tdisol that is packaged with Connections.

Refer to [Manually populating the Profiles database](t_prof_populate_manual.md) for additional information.


|

**Parent topic:**[Configuring IBM Security Directory Integrator](../install/t_prof_install_tdi.md)

