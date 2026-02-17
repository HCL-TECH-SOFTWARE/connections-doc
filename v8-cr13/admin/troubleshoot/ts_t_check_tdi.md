# Troubleshooting Security Directory Integrator {#ts_t_check_tdi .task}

If you experience problems when using IBM Security Directory Integrator to work with Profiles data, explore the different trace areas available for Profiles to find information that might help to identify and resolve the problem.

The IBM Security Directory Integrator solution that is used to perform actions on your Profiles deployment is made up of several interconnected components. When you are trying to determine the cause of an error, you might first need to determine which architectural layer is likely to be involved in the error, before you enable tracing for a specific component to resolve the problem.

Profiles-specific output can come from the Security Directory Integrator configuration \(profiles\_tdi.xml\) or from the component JAR files that are part of the solution. The JAR files contain business-layer functionality that is shared by the Profiles web application as well as the Profiles SDI solution. Adjusting trace levels for these backend components is very similar to the process used for the web application, and the same class hierarchical subsets can be used to view different tracing level outputs.

For more detailed information about determining the cause of problems with Security Directory Integrator, refer to its [Problem Determination Guide](https://www.ibm.com/docs/en/sdi/7.2.0?topic=troubleshooting-pdf) on the IBM documentation site.

## Procedure

Here are some general tips for troubleshooting issues that you might encounter when using Security Directory Integrator to work with profile data.

-   If you are using an earlier version of IBM Security Directory Integrator Version 7.2.0 Fix Pack 8, in the \tdisol\TDI\etc\log4j.properties file, look for
`log4j.rootCategory=INFO, Default`.

    Change it to `log4j.rootCategory=DEBUG, Default`.

    If you are using IBM Security Directory Integrator Version 7.2.0 Fix Pack 8 or later, in the \tdisol\TDI\etc\log4j2.xml file look for `<Configuration status="info">`.

    Change it to `<Configuration status="debug">`.

-   Enable trace logging for Security Directory Integrator to help you determine whether processes are running correctly.

    Tracing for the Security Directory Integrator processes is similar to tracing for WebSphere® Application Server. The trace output is recorded in the ibmdi.log file in the tdi\_installation\_directory\\logs directory.

    Trace settings are configured in the etc\\log4j Java™ logging component. The following tracing levels are available, in order of lowest to highest severity:

    -   ALL
    -   TRACE
    -   DEBUG
    -   INFO
    -   WARN
    -   ERROR
    -   FATAL
    -   OFF

    When a given level is enabled, all levels that are lower in severity are automatically enabled. For more information about how to configure tracing, see [Logging and debugging](https://www.ibm.com/docs/en/sdi/7.2.0?topic=SSCQGF_7.2.0/com.ibm.IBMDI.doc_7.2/adminguide172.htm#logging) in the IBM Security Directory Integrator documentation.

    !!! note
    
        Depending on the tracing level enabled, the output can be very lengthy, so try to perform small operations only when tracing is enabled.

    *Profiles service layer logging*

    If you are troubleshooting a Profiles or IBM Security Directory Integrator problem and are unsure about the cause of the problem, the best strategy is to start with a general trace setting at the lowest severity level. If you run a targeted task at a low severity setting, then you might get more information about the problem to help narrow down the trace configuration. The most general trace setting to use to encompass the set of Profiles service classes is:

    ```
    log4j.logger.com.ibm.lconn.profiles=ALL
    ```

    To confine tracing to just the Security Directory Integrator operations, include the following line in the etc\\log4j.properties file. The classes in this place in the hierarchy are primarily used as the interface between the assembly lines and connectors and the service layer. This level of tracing might also help identify issues in the calling Security Directory Integrator constructs.

    ```
    log4j.logger.com.ibm.lconn.profiles.api.tdi=ALL
    ```

    You might also want to enable event log tracing. Whenever database operations are performed, they are recorded in the event log. By enabling tracing at this level, you can see indirectly what was done via the service level API to the database. To enable event log tracing, include the following line in the etc\\log4j.properties file:

    ```
    log4j.logger.com.ibm.lconn.profiles.internal.service=ALL
    ```

    !!! note
    
        This setting is very verbose, so be sure to enable it for targeted operations.

    *Database layer logging*

    It is often useful to enable tracing at the database layer to troubleshoot problems. To enable database tracing, include the following line in the etc\\log4j.properties file:

    ```
    log4j.logger.java.sql=ALL
    ```

-   Examine the information in the different log files in the logs directory.

    The log files produced by running Profiles Security Directory Integrator assembly lines are all stored in the logs subdirectory of the solution. Most assembly lines create a log file that is specific to the assembly line, for example, PopulateDBFromDNFile.log or SyncUpdates.log.

    When a task is run at a subsequent time, based on the logging implementation of the assembly line, the logs are either renamed with an incremented trailing digit or named with a date suffix to ensure that previous logs are preserved.

    All other output, in addition to some assembly-line output, is recorded in the logs\\ibmdi.log file. Standard output and error information is recorded in this file by default, but you can modify this configuration in the etc\\log4j.properties file. For more information, refer to th e[Log4J.properties](https://www.ibm.com/docs/sdi/7.2.0?topic=SSCQGF_7.2.0/com.ibm.IBMDI.doc_7.2/adminguide259.htm#log4j.properties) topic in the IBM Security Directory Integrator product documentation.

-   Use the debug settings in the Log4J.properties file. For more information about the debug settings in the file, refer to [Logging using the default Log4J class](https://www.ibm.com/docs/sdi/7.2.0?topic=SSCQGF_7.2.0/com.ibm.IBMDI.doc_7.2/adminguide174.htm#loggingconfig) in the IBM Security Directory Integrator product documentation.

-   Set the value of the source\_ldap\_debug property in the profiles\_tdi.properties file to true as follows.

    ```
    source_ldap_debug=true
    ```

    When set to true, this property prints additional debug information to the ibmdi.log file. You can use this property to track issues and capture more detailed information related to mapping and data validation in the log file.

    Setting this property to true provides two types of information:

    -   Mapping details relating to the LDAP and Profiles databases.

        By checking this information, you can find out if you have any incorrect attribute mappings.

    -   The validation result of each attribute.

        By checking this information, you can find out which field did not pass the validation and verify the value of this field.

-   Examine any error messages that you see.

    The prefix of the error message indicates which component the error message is associated with. For example, the CLFRN prefix is used to identify error messages from all Profiles components. The CTGDIS prefix is used to identify error messages associated with Security Directory Integrator. You might also see error messages from other components in the log files. To find out more about these error messages, refer to the [Error codes](c_error_codes.md) section of the product documentation.

    In addition to the prefix identifier, the last letter of the error message code indicates the severity of the message. For example, a code ending with an I is an informational message. Error and warning codes are designated by E and W respectively.

-   Security Directory Integrator Configuration Editor port issue: If you see the message `Invalid value specified for 'api.remote.naming.port'` when working with the Security Directory Integrator Configuration Editor, you can resolve the issue by manually setting the api.remote.naming.port in the solution.properties file located in the TDI\_solution \_directory.

-   Linux® 32-bit issue: Note that the Linux 32-bit system is not officially supported by HCL Connections. If you are using a Security Directory Integrator solution without any specified setting on a Linux 32-bit platform, you will experience issues with your processor becoming unresponsive. In addition, you will not be able to populate the Profiles database using the Population Wizard or the solution script provided by IBM Security Directory Integrator. As a workaround, you need to edit the ibmdisvr shell script located in the TDI\_installation\_directory as follows:

    ```
    "$TDI_JAVA_PROGRAM" $TDI_MIXEDMODE_FLAG -Xms256M -Xmx1024M -Xnojit -cp "$TDI_HOME_DIR/IDILoader.jar" "$LOG_4J" com.ibm.di.loader.IDILoader com.ibm.di.server.RS "$@"
    ```

**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

**Related information**  


[Managing user data using Tivoli Directory Integrator Solution scripts](../admin/c_admin_profiles_updating_ldap.md)

[Error message reference](../troubleshoot/c_error_codes.md)

[Enabling traces in WebSphere Application Server](../troubleshoot/ts_t_enable_was_traces.md)

