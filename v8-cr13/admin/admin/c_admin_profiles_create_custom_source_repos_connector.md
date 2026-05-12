# Using a custom source repository connector {#c_admin_profiles_create_custom_source_repos_connector .concept}

By creating custom source repository connectors, you can integrate data from non-LDAP sources when you are populating Profiles with user data.

To integrate a custom source repository, create custom versions of the following two assembly lines and package them as IBM Security Director Integrator adapters:

**Iterator connector**
:   This adapter iterates sequentially through all the users in your user directory. It is used by a number of iterative Security Director Integrator scripts. For example, it is used to retrieve the full information for initial data population using the collect\_dns script and during data synchronization using the sync\_all\_dns script.

**Lookup connector**
:   This adapter looks up individual users in your user directory. It is used by the `populate_from_dns_file` script.

For more information about using adapters, see the [IBM Security Directory Integrator product documentation](https://www.ibm.com/docs/sdi/7.2.0#wq1797).

After packaging your assembly lines, you can use them in your TDI solution by copying the file you published, such as the `adapter.xml` file, into the packages Profiles TDI solution directory.

Add a reference to the profiles property store to your adapter files by running the `fixup_tdi_adapters.sh` or `fixup_tdi_adapters.bat` command. This reference is required to use the Profiles Security Directory Integrator adapter. Even if you do not believe that your adapter file requires access to the profiles property store, there is no penalty for adding the reference so it is strongly advised that you run this command regardless.

The following topics provide more information about creating custom source repository connectors:

-   **[Creating an iterator connector](../admin/t_admin_profiles_create_iterator_connector.md)**  
Create an iterator connector to perform a sequential read of your entire user source repository.
-   **[Creating a lookup connector](../admin/t_admin_profiles_create_lookup_connector.md)**  
Create a lookup connector to fetch data for a single user, including all the attributes necessary for mapping that user in your source repository.

**Parent topic:** [Developing custom Tivoli Security Integrator assembly lines for Profiles](../admin/c_admin_profiles_develop_custom_tdi_scripts.md)

**Related information**  


[Setting up your development environment](../admin/t_admin_profiles_config_tdi_dev_environment.md)

