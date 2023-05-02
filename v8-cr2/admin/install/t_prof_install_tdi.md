# Configuring IBM Security Directory Integrator {#t_prof_install_tdi .task}

Configure IBM Security Directory Integrator to synchronize and exchange information between the Profiles database and your LDAP directory.

Before you attempt to configure Security Directory Integrator, complete the following prerequisite steps:

1.  Ensure that you have installed all the required [System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654), including Security Directory Integrator, a database server, and an LDAP directory.

    **Attention:**

    1.  If you are installing Connections with Security Directory Integrator 7.2 on Windows Server 2016. See the IBM technote [TDI 7.1.1 and SDI 7.2.0 limited support for Windows Server 2016](http://www-01.ibm.com/support/docview.wss?uid=swg22016815) for information on installing SDI 7.2 on Windows 2016.
    2.  Install Java for SDI, Refer to [Deploying Security Directory Integrator into a new install of Connections](t_prof_tdi_new_deploy.md) for additional information.
2.  Create the Profiles database.

    **Note:** The internal name of the Profiles database is PEOPLEDB.

3.  If your database uses a database driver that requires Java 8, or you otherwise require Java 8 when running the IBM Security Directory Integrator, see this article for instructions: [Using IBM Security Directory Integrator with Java 8 and HCL Connections 6.5 or 7.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0094191). Perform the following task, and then complete the rest of the tasks in [Populating the Profiles database](t_prof_install_profiles_db.md). Note that you must use the manual population method when using Java 8, not the population wizard.

Use Security Directory Integrator to populate the Profiles database repository from an LDAP directory. It is assumed you are using the profiles population wizard, as some of the following information pertains specifically to that method.

You can manually run various Profiles tasks by using the appropriate scripts in the Solution Directory. For more information about these tasks, see the [Batch files for processing Profiles data](r_TDI_batch_files.md) topic.

To configure Security Directory Integrator, complete the following steps:

1.  Install Security Directory Integrator 7.2 and Java as explained earlier in this topic.

    When prompted for the location of the Solution Directory, select **Do not specify. Use the current working directory at startup time.** At the end of the installation process, clear the **Start the Configuration editor** check box.

    After you have configured Security Directory Integrator, update it with the recommended fix packs.

2.  Make the database available to Security Directory Integrator by doing one of the following, depending on the database software provider:

    **Note:** The following information assumes that the database server is on a separate system.

    If the database is hosted on a separate system, copy the database JAR file to the system hosting Security Directory Integrator.

    **Note:**

    Download or otherwise obtain a Java 8 certified JDBC database client driver for your relational database that can be used by SDI.

    -   DB2®: Copy the db2jcc4.jar and db2jcc4\_license\_cu.jar files from the java subdirectory of the directory where you installed DB2. [Download the DB2 files](https://www.ibm.com/support/pages/db2-jdbc-driver-versions-and-downloads) and paste the files into a temporary location on the system where SDI is installed. The wizard will prompt for this location and copy the files into the jvm/jre/lib/ext subdirectory of Security Directory Integrator.

        For example, if you installed Security Directory Integrator on a Linux™ system in /opt/IBM/TDI/V7.2, the path would be /opt/IBM/TDI/V7.2/jvm/jre/lib/ext. This is the case regardless of the database provider.

        **Note:**

        -   If you only run the SDI Population scripts in manual mode, you must copy the files.
        -   The db2jcc4.jar file is certified for Java 8 and is also available from the HCL Software License & Download Portal
    -   Oracle: Copy the ojdbc8.jar file from the jdbc/lib subdirectory of the directory where you installed Oracle. If needed download the Oracle JDBC driver ojdbc8.jar from the Oracle web site for [Oracle 18c](https://www.oracle.com/database/technologies/appdev/jdbc-ucp-183-downloads.html) or for [Oracle 19c](https://www.oracle.com/database/technologies/appdev/jdbc-ucp-19-6-c-downloads.html). Paste the files into a temporary location on the system where SDI is installed. The wizard will prompt for this location and copy the files into the jvm/jre/lib/ext subdirectory of Security Directory Integrator.
    -   Microsoft SQL: Download the [SQL Server JDBC 4.2 driver](https://www.microsoft.com/en-us/download/details.aspx?id=54671) from the Microsoft™ web site and follow the instructions to extract the driver files. SDI uses the sqljdbc42.jar file.

        Paste the files into a temporary location on the system where Security Directory Integrator is installed. The wizard will prompt for this location and copy the files into the jvm/jre/lib/ext subdirectory of Security Directory Integrator.

    **Note:** As a result of this step, the database files are placed in the jvm/jre/lib/ext SDI directory. This directory is on the SDI classpath, but in rare circumstances may not be close enough to the beginning of the path. If SDI throws an exception that seems to be Java related, try putting the database JAR files in the jars\\3rdparty\\others SDI directory.

3.  Edit the ibmdisrv file to increase runtime memory. To increase the runtime memory, add the two -Xms1024M -Xmx2048M space-separated arguments to the Java™ invocation command.

    **Note:** On Linux systems the file name is ibmdisrv. On Windows systems the file name is ibmdisrv.bat. On both systems the file is located in the main SDI directory.

    -   AIX® or Linux:ibmdisrv

        After you add the new arguments to increase runtime memory, the Java invocation command might look like the following example:

        ```
        "$TDI_JAVA_PROGRAM" -Xms1024M -Xmx2048M $TDI_MIXEDMODE_FLAG -cp 
        "$TDI_HOME_DIR/IDILoader.jar" "$LOG_4J" com.ibm.di.loader.ServerLauncher "$@" &
        ```

        **Note:** Do not copy and paste the example into your ibmdisrv file. Add the two arguments without changing any of the other arguments.

    -   Windows™: ibmdisrv.bat

        After you add the new arguments, the Java invocation command might look like the following example:

        ```
        "%TDI_JAVA_PROGRAM%" -Xms1024M -Xmx2048M -classpath "%TDI_HOME_DIR%\IDILoader.jar" 
        %ENV_VARIABLES% com.ibm.di.loader.ServerLauncher %*
        
        ```

        **Note:** Do not copy and paste the example into your ibmdisrv.bat file. Add the two arguments without changing any of the other arguments.

        **Note:** Check the path in ibmdisrv.bat for where SDI is installed - note the following properties:

        path

        Specifies the PATH environment variable used for running the IBM Security Directory Integrator process \(this property is usually the same as the PATH variable from ibmdisrv.bat, but you can change it\). This is an optional property.

        ibmdiroot

        Specifies the root folder of the IBM Security Directory Integrator \(for example, C:\\Program Files\\IBM\\TDI\\V7.2\). This is a required property.

4.  \(AIX or Linux only.\) In the Solution Directory, execute the `chmod +x *.sh` command to ensure that the script files are executable.

5.  \(AIX or Linux only.\) Ensure that there is a `localhost` entry in the /etc/hosts file.

    For example:

    ```
    127.0.0.1    localhost
    ```


-   **[Deploying Security Directory Integrator into a new install of Connections](../install/t_prof_tdi_new_deploy.md)**  
To deploy IBM Security Directory Integrator \(formerly Tivoli Directory Integrator\) into a new install of HCL Connections \(not for upgrading from previous versions of Connections & TDI\) perform this procedure.
-   **[Introduction to IBM Tivoli Directory Integrator](../install/c_tdi_about.md)**  
HCL Connections uses IBM® Tivoli® Directory Integrator to transform, move, and synchronize data from your LDAP directories to the Profiles database.

**Parent topic:**[Populating the Profiles database](../install/t_prof_install_profiles_db.md)

**Related information**  


[Deleting or inactivating users in the Profiles database](../admin/t_admin_profiles_delete_users.md)

