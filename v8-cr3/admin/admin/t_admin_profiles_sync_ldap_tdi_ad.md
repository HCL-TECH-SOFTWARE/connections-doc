# Synchronizing IBM Tivoli Security Directory Server and Microsoft Active Directory LDAP changes {#t_admin_profiles_sync_ldap .task}

To keep your profiles synchronized with your LDAP directory, use the generic sync\_all\_dns command. However, if your LDAP directory is Tivoli Security Directory Server or Microsoft® Active Directory, you can use the process\_tds\_changes or process\_ad\_changes commands. You must configure your LDAP server to save all updates to a change log, which places a considerable burden on the LDAP, and you must run the change log server.

The TSI scripts are stored in the tsisol\_dir/TSI/samples directory. You must copy any scripts that you intend to use to the main TSI solution directory, tsisol\_dir/TSI.

The process\_tss\_changes and process\_ad\_changes commands start a daemon process that regularly queries the change log server for updates. For Connections, this approach is more efficient than sync\_all\_dns because only updates are processed. However, this approach is more work for the LDAP. As a result, use of these commands must be carefully evaluated for LDAP performance impact. Also, if an error occurs, updates can be lost without any indication. Finally, a persistent index into the change log is maintained by the command. If the change log and the index get out of sync, you must use the reset\_changelog\_state command, which reinitializes the change log and the index.

Neither the process\_tss\_changes nor the process\_ad\_changes commands support synchronizing multiple LDAP directories or multi-branch LDAP directories with a single command. If you populated your profiles database with data from multiple locations, running either of these commands applies changes only from the current LDAP directory. Also, if source data is obtained from an additional source such as a database table, the commands cannot be used.

If you get all data from one or more LDAPs that are TSS and/or AD, you can create multiple copies of the TSI solution directories, and run several process\_xxx\_changes daemons at the same time. In this way, multiple index values will be maintained. What you cannot do is run sync\_all\_dns when you use this approach because the key column that sync\_all\_dns uses to keep track of multiple LDAPs, PROF\_SOURCE\_URL, is not maintained by the change log commands.

1.  To synchronize Tivoli Security Directory Server and Microsoft Active Directory LDAP directory changes with Profiles, complete the following steps.
2.  Update the change log properties in the profiles\_tsi.properties file so that the changes to the LDAP directory can be reflected back to the Profiles database. The change log properties are the set of properties that begin with <LDAP\_type\>\_changelog\_\*.

3.  Copy either the process\_tss\_changes\(.sh\|.bat\) or the process\_ad\_changes\(.sh\|.bat\) script from the samples directory to the TDI solution directory.

4.  Process changes by using one of the following options:

    -   For Tivoli Security Directory Server, use the following script to process changes made to the LDAP directory and propagate those changes to the corresponding records in your database:
        -   Linux®:

            chmod +x process\_tds\_changes.sh

            ./process\_tds\_changes.sh

        -   Microsoft Windows®:

            process\_tss\_changes.bat

    -   For Microsoft Active Directory, use the following script to process changes made after the initial population:
        -   Linux:

            chmod +x process\_ad\_changes.sh

            ./process\_ad\_changes.sh

        -   Microsoft Windows:

            process\_ad\_changes.bat

5.  The process\_tss\_changes task tracks the changelog number in a persistent field. If your LDAP directory is reset, you can select from the following options:

    -   Delete the changelog number value by using the following script:
        -   Linux:

            chmod +x reset\_changelog\_state.sh

            ./reset\_changelog\_state.sh

        -   Microsoft Windows:

            reset\_changelog\_state.bat

    -   Set a particular value by using the following script and passing it the count value to set:
        -   Linux:

            chmod +x set\_changelog\_count.sh

            ./set\_changelog\_count.sh

        -   Microsoft Windows:

            set\_changelog\_count.bat


**Parent topic:**[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

**Related information**  


[Batch files for processing Profiles data](../install/r_TDI_batch_files.md)

[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

