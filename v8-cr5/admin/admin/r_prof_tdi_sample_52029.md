# Synchronizing a subset of Profiles data {#r_prof_tdi_sample_52029 .reference}

Use the sync\_dns\_from\_file command to synchronize a subset of Profiles user data.

## Synchronizing Profiles data { .section}

You can synchronize data for a subset of Profiles users by using sync\_dns\_from\_file. For example, you can use this command with a small user data subset as a diagnostic tool when troubleshooting the synchronization process. The smaller sample size makes it easier to analyze trace output.

In this example, you synchronize a list of users using the sync\_dns\_from\_file command. Functionally, this process works as though you had run the sync\_all\_dns command.

-   If the user is found in the Profiles database but not in the source repository \(for example LDAP\), the specified delete action occurs.
-   If the user is found in the source repository \(for example LDAP\) but not in the Profiles database, specified adds occur as they would in an sync\_all\_dns action.
-   If the user is found in the source repository \(for example LDAP\) and also in the Profiles database, specified updates occur as they would in an sync\_all\_dns action.

The sync\_dns\_from\_file script \(sync\_dns\_from\_file.bat or sync\_dns\_from\_file.sh\) is in the samples directory. You must copy the file to the main solution directory, which is typically one level above the samples directory, and run it from the main solution directory.

The sync\_dns\_from\_file script relies on an input data file. The default name for the file is sync\_dns.in. In the following example the name sync\_users\_subset.in is used, which means that profiles\_tdi.properties must be modified.

Use the following procedure:

1.  Create a source data file and give it the name sync\_users\_subset.in. Use the following format for the contents of the file:

    ```
    $dn:cn=Amy Jones3,cn=Users,l=WestfordFVT,st=Massachusetts,c=US,ou=Lotus,o=Software Group,dc=ibm,dc=com
    uid:Amy Jones3
    .
    $dn:cn=Amy Jones8,cn=Users,l=WestfordFVT,st=Massachusetts,c=US,ou=Lotus,o=Software Group,dc=ibm,dc=com
    uid:Amy Jones8
    . 
    ```

2.  Save the completed data input file.
3.  Open the profiles\_tdi.properties file and find the sync\_dns\_simple\_file property. Change the existing value to the name of your data input file. For example:

    ```
    sync_dns_simple_file=sync_users_subset.in
    ```

4.  Save the profiles\_tdi.properties file.
5.  Run the sync\_dns\_from\_file.bat or sync\_dns\_from\_file.sh command.

Summary output displays in the console, and errors are reported in the log file.

**Parent topic:**[Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md)

**Related information**  


[Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md)

