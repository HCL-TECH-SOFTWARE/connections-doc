# Creating a lookup connector {#t_admin_profiles_create_lookup_connector .task}

Create a lookup connector to fetch data for a single user, including all the attributes necessary for mapping that user in your source repository.

The lookup assembly line is used in the populate\_from\_dns\_file script to populate users. Using the default mapping for secretary \($secretary\_uid\) and manager \($manager\_uid\), the script uses the assembly line to look up the manager and secretary uid values. If you can extract the manager and secretary uid values from the work entry without an additional lookup, it is advisable to do so for performance reasons.

After developing your lookup connector, export it and then restart the IBM® Tivoli® Directory Integrator configuration editor to make the adapter file visible to the Profiles TDI solution. To test the adapter, configure the Profiles TDI solution to use your adapter for data lookup. You can then test the adapter using the TEST\_source\_repository\_lookup script provided by the TDI solution.

A lookup connector is not usable in every situation. For example, if your source is a data file, you cannot retrieve the data using a lookup mode with the TDI file. However, you can provide an iterator connector and use the TDI assembly lines that do not use the lookup connector, such as sync\_all\_dns.

1.  Create a source repository lookup connector by completing the following steps:
2.  Develop your lookup assembly line by performing the following steps.

    1.  Add an attribute map to your assembly line flow section by mapping the following attributes:

        -   $dn – This attribute should be present in the attribute map with the value from the work entry.
        -   $lookup\_operation – This attribute should be present in the attribute map with the value from the work entry
        -   $lookup\_status – This attribute should be initialized to return the string error, for example map it to ret.value = "error";.
    2.  Connect to your source with an appropriate connector using its iterator mode. Retrieve the data to be used in the process into the work entry. Use the $dn attribute as the link criteria, or ensure that another value you wish to use is present in the work entry.

    3.  Add the following JavaScript entries to the following lookup connector hooks:

        -   On no Match hook:

            ```
            work.setAttribute("$lookup_status", "nomatch");
            system.skipEntry();
            ```

        -   Default Success hook:

            ```
            work.setAttribute("$lookup_status", "success");
            ```

        -   Lookup Error hook:

            ```
            work.setAttribute("$lookup_status", "nomatch");
            system.skipEntry();
            ```

    4.  Add the following entry to the assembly line On Failure hook:

        ```
        system.ignoreEntry();
        ```

    5.  Optionally add additional error checking code and tracing output.

    **Note:** To help get started with Tivoli Directory Integrator, go to the [Learning TDI](http://www.tdi-users.org/twiki/bin/view/Integrator/LearningTDI) site. You can also refer to the [Tivoli Directory Integrator product documentation](http://www-01.ibm.com/support/knowledgecenter/SSCQGF_7.1.0/com.ibm.IBMDI.doc_7.1/welcome.htm) for more information.

3.  Export your lookup solution by completing the following steps:

    **Note:** You can package the lookup connector together with the iterator assembly line, which is best practice suggestion but not a required step.

    1.  Shift-click the assembly lines that comprise your lookup solution in the Tivoli Directory Integrator configuration editor.

    2.  Right-click a member of the selected assembly line group and select **Publish**.

    3.  In the Publish window, enter a name for your solution in the **Package ID** field. For example, myLookupAdapter.

    4.  Enter additional information, such as a version number or a help URL for future administrators.

    5.  Assuming you followed the development environment procedure outlined in the topic, *Setting up your development environment*, select the packages directory located in your HCL Connections TDI solution from the **File Path** menu, and then click **Finish**.

4.  To make the adapter file visible to the Profiles TDI solution, restart the Tivoli Directory Integrator Config Editor.

    If the Tivoli Directory Integrator server is not recycled during testing, it might not detect the existence of the new adapter.xml file. Recycling the Config Editor stops and starts the embedded Tivoli Directory Integrator server.

5.  Configure the Profiles TDI solution to use your adapter for data lookup by completing the following steps:

    1.  Open the profiles\_tdi.properties file in a text editor.

    2.  Add a property of the following format to the file:

        ```
        source_repository_lookup_assemblyline={name-of-your-adapter.xml}
        :/AssemblyLines/{name-of-your-LOOKUP-al}
        ```

        **Note:** This expression should be entered as a single line; it is shown in two lines here to avoid page runoff.

        **Note:** This property may already be present and commented out in the file. If so, remove the comment character \(hash sign\) and make the edits.

    3.  Substitute `{name-of-your-adapter.xml}` with the package ID that you entered in step 2c.

    4.  Substitute `{name-of-your-ITERATOR-al}` with the name of your lookup assembly line.

        The line should now look similar to the following:

        ```
        source_repository_lookup_assemblyline=myLookupAdapter:/AssemblyLines/lookup_from_db
        ```

    5.  Save your changes and then close the profiles\_tdi.properties file.

6.  Test your lookup adapter using the TEST\_source\_repository\_lookup script in the Profiles TDI solution. To use this script:

    1.  Configure the assembly line as described in the previous steps.

    2.  Write the distinguished names of a number of users in a file named collect.dns and place this file at the root of the Profiles TDI solution directory. Separate each distinguished name with a carriage return.

    3.  Run the `runAl.sh TEST_source_repository_lookup` or `runAl.bat TEST_source_repository_lookup` command.

        This command iterates over the collect.dns file and attempts to look up each user that you specified. The resulting data returned by your adapter is generated in the ibmdi.log file in the \{TDI solution\}/logs/ibmdi.log directory. You can examine this file to confirm that it is returning all of the expected values correctly.

    4.  Repeat this procedure as needed until you are satisfied with the output of your adapter.


**Parent topic:**[Using a custom source repository connector](../admin/c_admin_profiles_create_custom_source_repos_connector.md)

**Related information**  


[Setting up your development environment](../admin/t_admin_profiles_config_tdi_dev_environment.md)

[Creating an iterator connector](../admin/t_admin_profiles_create_iterator_connector.md)

