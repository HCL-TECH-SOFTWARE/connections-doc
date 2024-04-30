# Using the Profiles population wizard in silent mode {#t_silent_population_wizard .task}

You can run the Profiles population wizard in silent mode to populate the Profiles database.

When you run the Profiles population wizard in silent mode, it creates the map\_dbrepos\_from\_source.properties file, located in the Wizards\\TDIPopulation\\platform\\TDI directory, and updates this file with data from the mappings.properties file.

**Note:** When you use the Profiles population wizard in interactive mode, the wizard creates a response file called tdisettings.properties in the Wizards\\TDIPopulation directory. You can modify the existing response file or create a new one. It also creates a mappings.properties file, which contains properties very similar to those in map\_dbrepos\_from\_source.properties file.

If you need to configure multiple systems with Profiles data, you can run the wizard in silent mode.

You can also modify the mappings files manually. For more information, see the [Mapping fields manually](t_prof_tdi_mapfields.md) topic.


To run the Profiles population wizard in silent mode, complete the following steps:

1.  Log in to your database server as the root user or system administrator.

2.  \(Linux only\) Grant display authority to all users by running the following commands under the root user or system administrator:

    xhost +

    **Note:** If granting display authority to all users is a security concern for you, change the command to grant display authority to a specific user or users. For more information about this command, consult your Linux administrator guide.

    echo $DISPLAY

3.  Ensure that the Profiles population wizard has created the tdisettings.properties response file in the TDIPopulation directory.

4.  Open a command prompt, change to the TDIPopulation directory, and enter the following commands to launch the wizard in silent mode:

    -   Linux:
        -   ./populationWizard.sh -silent response\_file

            \[ -mappingFile mapping\_file\]

            \[ -dbPassword db\_password\]

            \[ -ldapPassword ldap\_password\]

            \[ -sslPassword ssl\_password\]

            \[ -help \| -? \| /help \| /? \| -usage\]

    -   Windows®:
        -   populationWizard.bat -silent response\_file

            \[ -mappingFile mapping\_file\]

            \[ -dbPassword db\_password\]

            \[ -ldapPassword ldap\_password\]

            \[ -sslPassword ssl\_password\]

            \[ -help \| -? \| /help \| /? \| -usage\]

    where response\_file is the full path to the tdisettings.propertiesresponse file, mapping\_file is the full path to the mappings.properties file, dbPassword is the password for the Profiles database, ldapPassword is the password for bind user in the LDAP directory, and sslPassword is the password for the SSL key store.

    **Note:**

    If you do not specify a mapping file, the default mapping file for your LDAP directory type is used. These mapping files are located in the Wizards/TDIPopulationdirectory, where you can edit the file for your LDAP directory type. For more information about editing the mapping file, see the [Mapping fields manually](t_prof_tdi_mapfields.md) topic. The following table lists the mappings files for applicable LDAP directory types:

    |Directory type|Mapping file|
    |--------------|------------|
    |HCL Domino®|defaultMapping\_domino.properties|
    |IBM Security Directory Integrator|defaultMapping\_tivoli.properties|
    |Microsoft® Active Directory Application Mode|defaultMapping\_adam.properties|
    |Microsoft Windows Server 2003 Active Directory|defaultMapping\_ad.properties|
    |Novell Directory Services|defaultMapping\_nds.properties|
    |Sun ONE|defaultMapping\_sun.properties|

    The parameters for running the population wizard in silent mode are described in the following table:

    |Parameter|Value|Description|
    |---------|-----|-----------|
    |responseFile \(required\)|full path to the tdisettings.properties response file|After running the population wizard successfully, the tdisettings.properties response file is stored in the Wizards\\TDIPopulation directory in the HCL Connections set-up directory.|
    |mappingFile \(optional\)|full path to the mappings.properties file|The mappings.properties file is stored in the Wizards\\TDIPopulation directory in the HCL Connections set-up directory. If you do not specify a different file with the -mappingFile parameter, the wizard uses this file to map properties to the LDAP directory.|
    |dbPassword \(optional\)|Database password|Overwrites the database password in the response file. If you do not specify the database password here, you must specify it in the response file.|
    |ldapPassword \(optional\)|LDAP password|Overwrites the LDAP password in the response file. If you do not specify the LDAP password here, you must specify it in the response file.|
    |sslPassword \(optional\)|SSL key store password|Overwrites the SSL key store password in the response file. If you do not specify the SSL password here, you must specify it in the response file.|


After the wizard has finished, check the log file in the <user home\>/lcwizard/log/tdi/directory for messages. The log file name uses the time as a suffix. For example: tdi\_20090912\_163536.log.

-   **[The tdisettings.properties file](../install/r_tdisettings.properties.md)**  
When you run the Profiles population wizard, you can record your selections in two response files: a tdisettings.properties file and a mapping file.

**Parent topic:**[Adding source data to the Profiles database](../install/t_populate_profiles_db.md)

