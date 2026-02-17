# Customizing the logic used for the delete operation {#t_admin_profiles_customize_delete_logic .task}

You can customize the delete logic to use when deleting users from the Profiles database.

HCL Connections provides a plug-in point for defining and using custom IBM Security Directory Integrator assembly lines that contain their own delete logic as part of the sync\_all\_dns task. This delete logic is used to identify when a user needs to be deleted from the Profiles database. An assembly line named sync\_all\_dns\_check\_if\_remove, which checks whether a user should be deleted, is provided by default. You can add custom delete logic without making changes to the existing profiles\_tdi.xml file.

1.  Configure your development environment for creating a delete logic script by following the steps in the topic [Setting up your development environment](t_admin_profiles_config_tdi_dev_environment.md#).

2.  Define an assembly line that contains your delete logic in the file.

    Your assembly line must return one of the following values:

    -   remove. Specifies that the current entry should be added to the delete list.
    -   updated. Specifies that the current entry should be updated, not deleted.
    These values are case-sensitive.

    Return the value as follows:

    1.  Retrieve the checkResult attribute field from the work object into your assembly line. The attribute name is case-sensitive.
    2.  Set your checking result to the value of the checkResult attribute.
    For example:

    ```
    checkingResult = work.getAttribute("checkResult");
    checkingResult.setValue("updated");
    ```

    For more information about how to create an assembly line, see the [Creating your first assembly line](https://www.ibm.com/docs/sdi/7.2.0?topic=integrator-creating-your-first-assemblyline) topic in the Security Directory Integrator product documentation.

3.  Use the publish feature to export the assembly line as a Tivoli Directory Integrator adapter.

    1.  Right-click the assembly line in the Navigator and select **Publish**.

    2.  Enter the name of the adapter in the **Package ID** field.

    3.  Specify the following directory in the **File Path** field, and then click **Finish**.

        profiles\_tdisoln/packages

4.  Add a reference to the profiles property store to your adapter files by running the fixup\_tdi\_adapters.sh or fixup\_tdi\_adapters.bat command.

    **Note:** This reference is required to use the Profiles Tivoli Directory Integrator adapter. Even if you do not believe that your adapter file requires access to the profiles property store, there is no penalty for adding the reference so it is strongly advised that you run this command regardless.

5.  Open the profiles\_tdi.properties file from the following location:

    tdisol.tar\|zip/tdisol/TDI

6.  Set the following properties in the file:

    **sync\_updates\_double\_check**

    Specifies whether your checking assembly line is used. When set to true, your deletion-checking assembly line is used. When set to false, the checking operation is not performed. The default value is false.

    For example:

    ```
    sync_updates_double_check=true
    ```

    **sync\_check\_if\_remove**

    Specifies the name of your checking assembly line:

    ```
    sync_check_if_remove=name\_of\_your\_adapter\_xml\_file:/AssemblyLines/name\_of\_your\_assemblyline
    ```

    By default, the assembly line's name is set tosync\_all\_dns\_check\_if\_remove.

    For example, if you publish the assembly line with the file name deleteCheckRoutines and the assembly line is example\_check\_if\_user\_really\_deleted, use the following statement to set this property:

    ```
    sync_check_if_remove=deleteCheckRoutines:/AssemblyLines/example_check_if_user_really_deleted
    ```

    **sync\_delete\_or\_inactivate**
    Controls what happens to a user record when the delete action is performed. This property can be set to one of the following values:

    -   delete. Specifies that the user record is deleted.
    -   inactivate. Specifies that the user record is inactivated.

        The inactive status is propagated to the member and login tables for all the applications. An event is generated for each of the following: Activities, Blogs, Bookmarks, Communities, Files, Forums, Profiles, Wikis, and News \(which includes both Home page and Search\). These events inactivate the user in every application by removing the user from the login tables and setting the user's status to 1 in all member tables.

    These values are case-sensitive so type them with care. The default value is inactivate.

    For example:

    ```
    sync_delete_or_inactivate=inactivate
    ```

7.  Save your changes to the `profiles\_tdi.properties` file.


**Parent topic:** [Managing user data using Tivoli Directory Integrator Solution scripts](../admin/c_admin_profiles_updating_ldap.md)

**Related information**  


[Understanding how the sync\_all\_dns process works](../admin/c_admin_profiles_sync_ldap_understanding.md)

[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

