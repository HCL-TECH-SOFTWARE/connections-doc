# Creating an iterator connector {#t_admin_profiles_create_iterator_connector .task}

Create an iterator connector to perform a sequential read of your entire user source repository.

If you are using a source other than an LDAP, you must provide an iterator that will return each entry to process in sequence. If you are combining data from multiple sources, you must join all the data that is relevant to the data population mapping for a particular user into the work entry of the iterator assembly line. The only output should be a work entry that contains all the attributes for that user. Joining all the data together in a single step allows you to provide just this hook component and rely on the remainder of the IBM Security Directory Integrator assembly lines to perform the majority of the processing.

1.  Create a source repository iterator connector by completing the following steps:
2.  To develop your iterator assembly line, connect to your source with an appropriate connector using its iterator mode. Retrieve the data to be used in the process into the work entry.

    You must populate the $dn attribute in the work entry. You can populate all the data from the source by mapping all attributes. You can use the mapping functionality to map fields from their names in your source into the fields expected by Profiles; you do not have to perform that mapping in your connector. The $dn attribute is the only required attribute name you must provide at this point in the process.

    **Note:** To help get started with Security Directory Integrator, go to the [Learning TDI](http://www.tdi-users.org/twiki/bin/view/Integrator/LearningTDI) site. You can also refer to the [Security Directory Integrator product documentation](https://www.ibm.com/docs/sdi/7.2.0) for more information.

3.  Export your iterator solution by completing the following steps:

    **Note:** You can package the iterator connector together with the lookup assembly line, which is best practice although not a required step.

    1.  Shift-click the assembly lines that comprise your iterator solution in the Security Directory Integrator Config Editor.

    2.  Right-click a member of the selected assembly line group and select **Publish**.

    3.  In the Publish window, enter a name for your solution in the **Package ID** field. For example, myIterateAdapter.

    4.  Enter additional information, such as a version number or a help URL for future administrators.

    5.  Assuming you followed the development environment set-up guide outlined in the topic, *Setting up your development environment*, select the packages directory located in your HCL Connections SDI solution from the **File Path** menu, and then click **Finish**.

4.  To make the adapter file visible to the Profiles SDI solution, restart the Security Directory Integrator Config Editor.

    If the Security Directory Integrator server is not recycled during testing, it might not detect the existence of the new adapter.xml file. Recycling the Config Editor stops and starts the embedded Security Directory Integrator server.

5.  Configure the Profiles SDI solution to use your adapter for data iteration by completing the following steps:

    1.  Open the profiles\_tdi.properties file in a text editor.

    2.  Add a property of the following format to the file:

        ```
        source_repository_iterator_assemblyline={name-of-your-adapter.xml}:/AssemblyLines/{name-of-your-ITERATOR-al}
        ```

        **Note:** This property may already be present and commented out in the file. If so, remove the comment character \(hash sign\) and make the edits.

    3.  Substitute `{name-of-your-adapter.xml}` with the package ID that you entered in step 2c.

    4.  Substitute `{name-of-your-ITERATOR-al}` with the name of your iterator assembly line.

        The line should now look similar to the following:

        ```
        source_repository_iterator_assemblyline=myIterateAdapter:/AssemblyLines/iterate_over_csv_file
        ```

    5.  Save your changes and then close the profiles\_tdi.properties file.

6.  Test your solution and verify that you are able to iterate and to ensure that you are selecting the users that you are expecting, run the ./collect\_dns.sh or collect\_dns.bat script located in the SDI solution directory. You can then review the resulting collect.dns script to ensure that you have the results that you are expecting.


**Parent topic:**[Using a custom source repository connector](../admin/c_admin_profiles_create_custom_source_repos_connector.md)

**Related information**  


[Setting up your development environment](../admin/t_admin_profiles_config_tdi_dev_environment.md)

[Creating a lookup connector](../admin/t_admin_profiles_create_lookup_connector.md)

