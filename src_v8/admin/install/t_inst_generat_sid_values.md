# Generating Security identifiers to be used in configuration {#t_inst_generat_sid_values .task}

You need to generate Security Identifiers \(SID\) values for installing HCL Connections Content Manager with a new FileNet® deployment or an existing FileNet deployment.

A Security Identifier \(SID\) is an internal ID used within Connections Content Manager and FileNet. This internal ID is used to reference a user in some areas of configuration. Specifically, you will need SIDs when [setting up anonymous access](t_inst_set_anonymous_access_new_fn.md) and configuring indexing. Follow these instructions if you chose to install Connections Content Manager with a new FileNet deployment.

1.  Find the tool under <Connections\_HOME\>\\addons\\ccm\\ccmDomainTool.

    **Note:** You might find the tool under <Connections\_HOME\>\\Filenet\\ContentEngine\\ccmDomainTool

2.  Run the following command to generate the SID value for an associate username:

    -   Windows™: generateSID.bat
    -   Linux™, AIX®: generateSID.sh
    You will be asked for the following inputs:

    -   Domain admin user password
    -   Username you want to generate the SID for.
    Once these inputs have been collected the program will return the SID value.


If this script experiences a problem and your domain or object store is new, it might indicate a problem with the initial creation of the FileNet P8 Domain or Object Store. Review the [troubleshooting](../troubleshoot/c_troubleshoot_ccm.md) section to ensure that your domain and object store were created successfully using the scripts provided in [Configuring Libraries automatically](t_install_config_acce_for_libraries.md).

