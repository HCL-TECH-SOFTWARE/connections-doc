# Deploying Security Directory Integrator into a new install of Connections {#t_prof_tdi_upgrade .task}

To deploy IBM Security Directory Integrator \(formerly Tivoli Directory Integrator\) into a new install of HCL Connections \(not for upgrading from previous versions of Connections & TDI\) perform this procedure.

|Option|SDI Deployment Steps|
|------|--------------------|
|If you are installing a new deployment of Connections 7|SDI version 7.2 should be installed and used in conjunction with Connections 7. Perform the following:1.  You can download Security Directory Integrator \(SDI\) v7.2 from the [HCL Software License and Download Portal](https://id.hcltechsw.com/login/login.htm?fromURI=%2Fapp%2Fhclcust_licensedownloadportal_1%2Fexk8jshjulHatp2g8357%2Fsso%2Fsaml%3FSAMLRequest%3DhZJPj9MwEMW%252FSuR786%252FabWq1lZJmEZUWtOoCBy6V5UyIF8c2nvG2fHucVMByKSdLz%252B955vfkDYpRO14HGswRfgRASi6jNsjniy0L3nArUCE3YgTkJPlz%252FeGRl2nOnbdkpdXsTeR2QiCCJ2UNSw7tlp2qom6betk2Tbve7%252B9Xy4eHqqmK5apYre%252BasmTJF%252FAY%252FVsW4zGEGOBgkIShKOVlscirRb78VFQ8X%252FP8%252FitL2sigjKA5NRA55FmmunSQmkAOeE6lHTPhXBYVGZBOWkkwCJ09G21F56wnoU9FBpfv1QsOL0G%252FF%252BTKb9XybpUh2mwCZcnextC0xy1ieTVxGbyP50KNLo5TxJJ31kuYi9%252ByXmiECe8pNqRe4Y9S%252Fy5sGhZG8M%252FgX%252BO6n4%252BPf%252BEiB9qezsJD2mu4GCDrwM8V4Ew7gtbWZM4iHQHdtBPbbSYMPlfqd%252F99Y5O9tW%252Bu%252F%252BZj5D20TzYi%252FZyARnGjjiItZkV1i3628mDQgVS9gi6ixhXPew%252BCIj75ACzbXYf%252B%252Bz93vwA%253D%26RelayState%3D%252Fflexnet%252Foperationsportal%252Flogon.do%253Fauthtype%253Dexternal%26SigAlg%3Dhttp%253A%252F%252Fwww.w3.org%252F2001%252F04%252Fxmldsig-more%2523rsa-sha256%26Signature%3DbcwVm81mUebS6wvStlm80sRIkTzTsWpt4MQG4Cr%252B9jTp9UMeRzsqXR%252FvLK6aQ%252FJsbuPous6UDrjBchVvnyGgA0xCgCeM0vfqkwb19y8apczlRrapl5y8mPViWcANrsWanXYlt4ANdDaFlSuFUlMe5R2z%252BOTivwPVSGVwg3Fyv29%252FvwBKNe5zyyGDbSkW7Cw%252FWHgoww5R7KRnjTIoxc0v8Exut9J4MbGP5knox8xRCnESFkpEv9sMFXt%252FRpNJoaKuml3s4hDzSufcvApveF%252BHZM8hzyIIFH3%252FvN5Kn6Frb8eqkkesAd9TJl40OtDxA%252FR3h64JMW3c%252BTXSsyAHaEj%252FjA%253D%253D), in the "WebSphere Application Server 8.5.5 and Select Fix Packs" package.
2.  Upgrade SDI to Fixpack 6 by replacing the UpdateInstaller.jar with the Fixpack 6 file from your TDI/V7.2/maintenance directory. You can install Fixpack 6 from the TDI/V7.2/bin directory by running the following command:

    ```
./applyUpdates.sh -update /install/TDI72/7.2.0-ISS-SDI-FP0006/SDI-7.2-FP0006.zip
    ```

3.  Oracle: Upgrade the JDBC Database Drivers. Choose and download either [Oracle 18c](https://www.oracle.com/database/technologies/appdev/jdbc-ucp-183-downloads.html) and [Oracle 19c](https://www.oracle.com/database/technologies/appdev/jdbc-ucp-19-6-c-downloads.htm) .
4.  Microsoft SQL: Download the [SQL Server JDBC 4.2 driver](https://www.microsoft.com/en-us/download/details.aspx?id=54671) from the Microsoft™ web site and follow the instructions to extract the driver files. HCL Connections uses the sqljdbc41.jar file.
5.  DB2: Download the db2jcc4.jar from [IBM DB2](https://www.ibm.com/support/pages/db2-jdbc-driver-versions-and-downloads)site.
6.  If you need to populate the Profiles database with people from your company's LDAP, then you must use the Population Wizard that is packaged with Connections. Refer to [Populating the Profiles database](t_prof_install_profiles_db.md), [Using the Profiles population wizard](t_prof_populate.md), and [Using the Profiles population wizard in silent mode](t_silent_population_wizard.md) for additional information.
7.  To keep the users in LDAP and the Profiles database in sync you must manually download and install the SDI solution directory tdisol that is packaged with Connections.

Refer to [Manually populating the Profiles database](t_prof_populate_manual.md) for additional information.


|
|If you are installing IBM Java 8.0 JRE for SDI|SDI needs to run with Java 8. the following steps updates the SDI with Java 8 and the IBM Java 8 JRE for SDI 7.2 runtime \(ibm-java-jre-8.0.6.25\) can be download from the HCL Software and Licensing Portal in the Connections 8.0 download package.1.  Install the Java 8 runtime for SDI 7.2. Refer to[https://www.ibm.com/support/pages/node/315385](https://www.ibm.com/support/pages/node/315385) for instructions on upgrading the JRE.
2.  Install SDI 7.2 Fixpack 8. Refer to [Recommended fixes for IBM Security Directory Integrator \(SDI\)](https://www.ibm.com/support/pages/recommended-fixes-ibm-tivoli-directory-integrator-tdi-ibm-security-directory-integrator-sdi#ver72) for additional information.

**Attention:** Consult the readme file 7.2.0-ISS-SDI FP0008\_README.html for complete instructions and information.

3.  Remove these jar files from the SDI product, as they will conflict with the newer Spring implementations used by Connections. These jars are not required for the HCL Connections TDI pipelines.

    ``` {#codeblock_s5d_dbg_fvb}
SDI_HOME_DIR/jars/3rdparty/others/ActiveMQ/spring-beans.jar
SDI_HOME_DIR/jars/3rdparty/others/ActiveMQ/spring-context.jar
SDI_HOME_DIR/jars/3rdparty/others/ActiveMQ/spring-core.jar
SDI_HOME_DIR/lwi/runtime/messaging/eclipse/plugins/org.apache.activemq_5.2.0/lib/spring-beans-2.5.6.jar
SDI_HOME_DIR/lwi/runtime/messaging/eclipse/plugins/org.apache.activemq_5.2.0/lib/spring-core-2.5.6.jar
SDI_HOME_DIR/lwi/runtime/messaging/eclipse/plugins/org.apache.activemq_5.2.0/lib/spring-context-2.5.6.jar
    ```

4.  Download and update the DBC driver names

|

**Parent topic:**[Configuring IBM Security Directory Integrator](../install/t_prof_install_tdi.md)

