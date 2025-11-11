# Using the Profiles population wizard {#t_prof_populate .task}

Use the Profiles population wizard to populate the HCL Connections Profiles database with data from the LDAP directory.

You can populate the Profiles database with the help of the population wizard, as described here, or manually as described in the [Manually populating the Profiles database](t_prof_populate_manual.md) topic. You might choose to use the population wizard to simplify the properties mapping process from your source to the target Profiles database.

Ensure that you have created a Profiles database, and installed and configured Tivoli® Directory Integrator and an LDAP directory.

!!! note

    -   Run the population wizard on the system where IBM® Tivoli Directory Integrator is installed.

    -   On Linux, the user account that will run the wizard to populate the database must be a member of the group that owns the database instance \(db2inst1 for DB2\).

    -   If you need to configure multiple systems with Profiles data, you can run the wizard in silent mode. For more information, see [Using the Profiles population wizard in silent mode](t_silent_population_wizard.md).    

    -   The population wizard populates only those entries where the value for surname is not null.

    -   You can run the population wizard before, during, or after installing HCL Connections.

For additional and related information about configuration and mapping properties see [Manually populating the Profiles database](t_prof_populate_manual.md).

To populate the Profiles database, complete the following steps:

1.  Log into the system where Tivoli Directory Integrator is installed as the root user or system administrator.

2.  \(Linux™\): Grant display authority to all users by running the following commands under the root user or system administrator:

    ```
    xhost +
    ```

    !!! note 
        
        If granting display authority to all users is a security concern for you, change the command to grant display authority to a specific user or users. For more information about this command, consult with your Linux administrator guide.

    ```
    echo $DISPLAY
    ```

3.  Add the user account that will run the wizard to the group that owns the database instance \(for example, to the db2inst1 group for DB2\).

4.  \(RHEL 7.4 only\) Update the swt gtk jar file as explained in the KB Article, [The populationWizard does not start on RHEL 7.4 using TDI 7.1.1.6](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0021372).

5.  Copy the Wizards directory from the HCL Connections installation media to the system where Tivoli Directory Integrator is installed.

    !!! Important 
        
        Microsoft™ Windows™: If you are installing from disk or ISO, change the permissions for the Wizards folder from Read Only to Write or the population wizard will fail.

6.  Run the following script from the Wizards directory:

    -   Linux: `./populationWizard.sh`

        !!! note 
            
            If the wizard does not run correctly, you might need to edit the `populationWizard.sh` file and enter the correct JRE/JVM path for your system The `populationWizard.sh` file expects the path to be jvm/linux/jre/bin.

    -   Microsoft Windows: `populationWizard.bat`
7.  On the Welcome page of the wizard, click **Launch Information Center** to open the HCL Connections Information Center in a browser window. Click **Next** to continue.

8.  Select **Default settings**or, if you are resuming an earlier session, click **Last successful default settings** and click **Next**.

    !!! note
       
        This page is shown only if you have already used the wizard to populate the Profiles database.

9.  Enter the location of Tivoli Directory Integrator and then click **Next**.

    !!! note
        
        This page is shown only if the wizard cannot automatically detect your Tivoli Directory Integrator directory.

10. Select a database type and click **Next**.

11. Enter the following information about the database, and then click **Next**:

    - Host name
        :   The name of the system that hosts the database.

    - Port
        :   The communications port for connecting to the database. Add a new port number or choose one of the following default port numbers:

        - DB2®
        :   50000

        - Oracle
        :   1521

        - SQL Server
        :   1433

    - Database name
        :   The default name of the database is PEOPLEDB.

        !!! note 
        
            There is no default name for the Oracle database, Instead, enter the name of the database instance.

    - JDBC driver library path
        :   Enter the path to the JDBC driver on the host machine. For example: IBM/sqllib/java.

        - DB2
        :   You can find the db2jcc.jar and db2jcc\_license\_cu.jar files in the ibm/db2/v11.1/java directory.

        - Oracle
        :   Download the [Oracle JDBC driver ojdbc7.jar from the Oracle web site](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).

        - SQL Server
        :   Download the [SQL Server JDBC 4.2 driver](https://learn.microsoft.com/en-us/sql/connect/jdbc/release-notes-for-the-jdbc-driver?view=sql-server-ver16#42) from the Microsoft web site and follow the instructions to extract the driver files. HCL Connections uses the `sqljdbc42.jar` file.

    - User ID
        :   Enter your user ID. This must be a database user who has write access to the Profiles database. For DB2, the default value is LCUSER. For Oracle and SQL Server, default value is PROFUSER. These user names are automatically created when you create the database.

    - Password
        :   Enter your password.

12. Enter the following properties for the LDAP server, and then click **Next**:

    - LDAP server name
        :   The host name or IP address of the LDAP server.

    - LDAP server port
        :   The default port is 389. If SSL is selected, the default port is 636.

    -   Use SSL communication
        :   Select the check box to enable SSL.

13. \(Optional\) Create an empty truststore file where you can store trusted LDAP server certificates. \(Complete this step if you want to use SSL. If you already have a truststore file that contains your LDAP server certificates, you can skip this step.\) The Profiles population wizard downloads the LDAP server certificates from your LDAP directory for you.

    1.  Start the iKeyman utility by running the following file:

        -   Linux: `TDI_Install_directory/jvm/jre/bin/./ikeyman`
        -   Windows: `TDI_Install_directory\\jvm\\jre\\bin\\ikeyman.exe`
        where `TDI_Install_directory` is the directory where Tivoli Directory Integrator is installed.

        !!! note 
            
            On the Windows 2008 and Windows 2012 operating systems, right-click **ikeyman.exe** and select **Run as administrator**.

    2.  Click **Key Database File** from the menu bar and then click **New**.

    3.  Select **JKS** or **PKCS12** as the key database type.

    4.  Save the new file to an appropriate location and click **OK**.

    5.  Enter a password in the **Password Prompt** dialog box and then confirm the password. Click **OK**.

        !!! note 
            
            You need this password when you use the Profiles population wizard.

    6.  Exit the iKeyman utility.

    The Profiles population wizard can use the new truststore file to communicate with your LDAP server in SSL handshaking mode. It can also use the file when fetching data from your LDAP.

14. If you selected SSL when you entered the LDAP properties, you are asked to enter the following keystore properties:

    - Truststore file :   File where trusted server certificates are stored. Used when SSL handshaking is performed.

    - Keystore password :   Password to access the keystore.

    - Keystore type :   Format of the trusted server certificate. Currently only JKS and PKCS12 are supported in Java™.

    If the LDAP server certificate is not in the truststore, a message appears that asks you to permanently accept the certificate in the truststore file. If you do not accept it, the wizard cannot connect to the LDAP server with SSL and will not continue with the population task.
    
    !!! note

        Ensure that the global.properties file in Security Directory Integrator is configured with the file trust store name, password and type you just created. For further instructions, see [Client SSL configuration of IBM Security Directory Integrator components](https://www.ibm.com/docs/en/sdi/7.2.0?topic=SSCQGF_7.2.0/com.ibm.IBMDI.doc_7.2/adminguide69.htm#sslclientside) in the IBM documentation.

15. Enter the authentication details for the **Bind distinguished name \(DN\)** and **Bind password**, and then click **Next**.

    !!! note 
        
        The Profiles population wizard does not support anonymous binding for LDAP. To populate the Profiles database using anonymous binding, you must populate the database manually.

16. Enter the details of the **Base distinguished name \(LDAP user search base\)**and **LDAP user search filter**, and then click **Next**.

17. Map **LDAP attributes** or **JS Functions** to the Profiles **database fields**.

    For more information about each attribute and function, see [Table 2](t_prof_tdi_mapfields.md#DefaultValuesForPropertiesInTheMap) in [Mapping fields manually](t_prof_tdi_mapfields.md).

    !!! note

        -   For each user in the LDAP, Tivoli Directory Integrator will create a row in the database, mapping each LDAP attribute or JavaScript™ function to the corresponding column in the database. The wizard automatically validates each mapping. If you need to change the default mapping, select the required LDAP attributes or JavaScript functions and create or modify the field.

        -   The uid, guid, distinguishedName, surname, and displayName values in the Database Fields column must have mapped attributes in the LDAP Attributes or JS Functions column.

18. If you are prompted to supply a profile type value, see the [Profile-types](../customize/r_admin_profiles_ovr_types.md) topic for available options.

19. You can choose to run the following additional tasks:

    - Countries
        :   Add country data to each profile.

    - Departments
        :   Add department data to each profile.

    - Organizations
        :   Add organization data to each profile.

    - Employee types
        :   Add employee-type data to each profile.

    - Work locations
        :   Add location data to each profile.

    Select **Yes** if you want to mark the profiles of each manager.

    !!! note

        -   For all the entries in this list \(except *Mark managers*\), you need to prepare corresponding CSV files with the required information. An Employee Types CSV file might include regular=HCL Employee and manager=HCL Manager. You can edit the profiles-config.xml file to specify whether you want to display the code or the value, where *regular* or *manager* are the employee type codes stored in LDAP and *HCL Employee* or *HCL Manager* are the values.

        -   Examine the CSV files in the Wizards/TDIPopulation/TDISOL/OS/samples directory, where OS is your operating system, to see the input file format of the optional tasks:

            - Countries task
            :   `isocc\_sample.csv`

            - Departments task
            :   `deptinfo\_sample.csv`

            - Organizations task
            :   `orginfo\_sample.csv`

            - Employee types task
            :   `emptype\_sample.csv`

            - Work locations task
            :   `workloc\_sample.csv`

20. Review the Summary page to ensure that the information you entered in the previous panels is correct. Click **Configure** to begin populating the database.

21. Review the message on the Result page. If necessary, click **View log** to examine the log in detail. Click **Finish** to exit the wizard.


The Profiles population wizard has populated the Profiles database with data from your LDAP directory.

**Parent topic:**[Adding source data to the Profiles database](../install/t_populate_profiles_db.md)

**Related information**  


[Managing the Search index](../admin/c_admin_search_manage_index.md)

[Profile-types](../customize/r_admin_profiles_ovr_types.md)

