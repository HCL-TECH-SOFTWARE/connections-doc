# Updating Profiles when changing LDAP directory {#t_admin_profiles_change_ldaps .task}

When you change to a new LDAP directory with the same users, you must synchronize the user data in Profiles with the user data in your new LDAP directory. You can use the sync\_all\_dns command, provided that certain criteria are met.

You must ensure that the values of either the uid or the email address in the existing data source match those in the new deployment LDAP directory. If neither of these properties have matching values, you cannot use the scripts provided with HCL Connections to synchronize.

<!--**Note:** Changing a user's identifier in Connections Content Manager \(CCM\) results in the user record being viewed by the system as a completely new user, and access will be lost, which can be a particular concern when administrative access is lost.-->

1.  To use the scripts provided with HCL Connections to synchronize the IDs and update Profiles, complete the following steps:
2.  Open the profiles\_tdi.properties file from the IBM Tivoli® Directory Integrator solution directory on the system that hosts the Profiles application in a text editor, and edit the following properties to match the values of the corresponding properties in the LDAP system:

    -   source\_ldap\_url
    -   source\_ldap\_user\_login
    -   source\_ldap\_user\_password
    -   source\_ldap\_search\_base
    -   source\_ldap\_search\_filter
    -   source\_ldap\_use\_ssl
    For more information about these properties and how they are used, see *Tivoli Directory Integrator solution properties for Profiles*.

3.  Ensure that the guid property in the map\_dbrepos\_from\_source.properties file is set to the appropriate value for your LDAP:

    -   IBM Tivoli Directory Server:

        ```
        guid=ibm-entryUuid
        ```

    -   IBM Lotus® Domino® Directory:

        ```
        guid={function_map_from_dominoUNID}
        ```

    -   Microsoft™ Active Directory:

        ```
        guid={function_map_from_objectGUID}
        ```

    -   Sun Java™ System Directory Server:

        ```
        guid=nsuniqueid
        ```

    -   Novell \(NetIQ\) eDirectory:

        ```
        guid={function_map_from_GUID}
        ```

4.  Ensure that all other properties in the map\_dbrepos\_from\_source.properties are set to the correct LDAP attribute name.

5.  Identify a database attribute to synchronize with, either uid or email, with the same value per member in the old LDAP deployment as in the new, and then set the sync\_updates\_hash\_field property in the profiles\_tdi.properties file to this attribute.

    For example:

    ```
    sync_updates_hash_field=uid
    ```

6.  Complete only one of the following processes:

    -   If users are being moved to the new LDAP directory in stages while Connections is running, proceed to step 6 and complete all steps in this procedure.
    -   If all users are being moved at once when Connections is down, and Connections will remain down until the move is complete, skip to step 8. No further steps are needed.
7.  Disable all Search Indexing tasks by using the wsadmin command SearchService.disableAllTasks\(\).

    For more information, see [Enabling and disabling scheduled tasks](t_admin_search_enable_indexing_task.md)

8.  Disable the User Life Cycle event propagation. Add the EnableUserDataPropagation property to the profiles-config.xml file on the Deployment Manager, as follows:

    1.  In the properties section of the configuration file, set the property name to com.ibm.lconn.profiles.config.EnableUserDataPropagation.

    2.  Set the value of this property to false.

    3.  Synchronize the nodes and restart all servers to clear the WALTZ cache.

9.  Synchronize the data so that the values from the new LDAP deployment are updated in the Profiles database by running the following script:

    -   Linux:

        ```
        chmod +x sync_all_dns.sh
        ./sync_all_dns.sh
        ```

    -   Windows:

        ```
        sync_all_dns.bat
        ```

10. Update the application member profile tables for the Activities, Blogs, Bookmarks, Communities, Files, Forums, and News applications by using the wsadmin command application\_nameMemberService.syncBatchMemberExtIdsByEmail.

    For more information, see [Synchronizing user data by using administrative commands](c_admin_common_sync_via_admin_commands1.md)

11. For the profiles component only, rebuild the search index. See [Reindexing a component in an existing index](t_admin_search_reindex_component_index.md)

12. Re-enable the Search Indexing tasks by using the wsadmin command SearchService.enableAllTasks\(\).

    For more information, see [Enabling and disabling scheduled tasks](t_admin_search_enable_indexing_task.md)

13. Re-enable the User Life Cycle event propagation by undoing the change in step 7 and setting com.ibm.lconn.profiles.config.EnableUserDataPropagation to true.

14. If users are being moved to the new LDAP directory in stages while Connections is running, you need to carry out steps 6 to 12 for each "batch" of LDAP users that are moved.

    For example, if 100 LDAP users are being moved on January 1, you need to perform steps 6 to 12 thereafter. If the next batch of 100 LDAP users are moved on February 1, you need perform steps 6 to 12 again.


**Parent topic:**[Managing user data using Tivoli Directory Integrator Solution scripts](../admin/c_admin_profiles_updating_ldap.md)

**Related information**  


[Mapping fields manually](../install/t_prof_tdi_mapfields.md)

[Security Director Integrator solution properties for Profiles](../install/r_pers_tdi_props.md)

[Batch files for processing Profiles data](../install/r_TDI_batch_files.md)

[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

