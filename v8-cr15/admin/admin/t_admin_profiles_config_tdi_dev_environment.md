# Setting up your development environment {#t_admin_profiles_config_tdi_dev_environment .task}

Use the IBM® Tivoli® Directory Integrator Configuration Editor to create custom Tivoli Directory Integrator scripts. Set up the development environment so that the editor can access a separate set of the HCL Connections Profiles Tivoli Directory Integrator connector source files than those used by the installed product.

When you install HCL Connections, a set of Tivoli Directory Integrator components are installed on your system. These components are used by the population wizard and other Tivoli Directory Integrator tasks, such as the synchronization tasks, to populate and update the HCL Connections user directory. They are stored in a compressed file referred to as the TDI solution directory \(tdisol.zip or tdisol.tar\).

The solution directory includes a set of connectors, which are standard Tivoli Directory Integrator components that you can use to build your own Tivoli Directory Integrator assembly lines when the assembly lines in the solution directory do not suit your needs. Your custom assembly lines can:

-   Use an available plug point, such as an alternate source for profiles data or custom delete processing
-   Create a stand-alone program to interact with the profiles, photos, pronunciation, or code sections of profiles through the available connectors.

This section describes how to set up a development environment in which you can write your own assembly lines using the Profiles Tivoli Directory Integrator connectors provided in the HCL Connections installation package.

1.  To set up your development environment, complete the following steps.
2.  Create a directory in which to store the Tivoli Directory Integrator connector source files.

    Since you might create multiple iterations of the code you are developing, use a directory naming system that will help you keep track of each iteration. For example, you could add a subdirectory named version, where version is the version number and date of the copy of the tdisol.zip file that you will extract into the directory. Alternatively, you could name the directory after the assembly line you will be creating, such as custdel if you are working on custom delete processing logic. For example: `C:\TDIProject\20120530` or `c:\tdiprojects\40\custdel`.

3.  Extract the files from the TDI solution directory \(tdisol.zip or tdisol.tar\) into the directory you created in the previous step. You can find the solution directory in the following location:

    `C:\IBM\IBMConnections\TDISOL`

    This action adds a tdi subdirectory to the directory path. For example: `C:\TDIProject\20120530\TDI` or `c:\tdiprojects\40\custdel\tdi`.

4.  When you start the Configuration Editor, specify the location of the Profiles TDI solution directory using the `-s` command-line option as follows:

    ```
    tdi\_install\_dir/ibmditk -s your\_TDI\_directory
    ```

    where:

    -   tdi\_install\_dir is the name of the directory where you installed Tivoli Directory Integrator.
    -   your\_TDI\_directory is the subdirectory that you created in the previous step.
    For example:

    ```
    C:\Program Files\IBM\TDI\V7.0/ibmditk -s C:\TDIProject\20120530\TDI
    ```

    **Note:** The workspace used for development must reference a TDI solution directory that contains all the Profiles TDI artifacts. It is not sufficient to create a new TDI solution directory or use one that does not contain these artifacts. If you attempt to use a Profiles TDI component, such as one of the connectors, and they do not appear in the connector list, then you do not have your workspace and solution configured correctly.

5.  When you start the Tivoli Directory Integrator Configuration Editor, you are asked to specify a workspace. This is a working directory in which to store things related to your development project. When prompted, specify the same file path that you are using for the connector files, but replace TDI with workspace.

    For example: C:\\TDIProject\\20120530\\workspace or `c:\tdiprojects\40\custdel\workspace`

    The editor creates the workspace subdirectory if it does not already exist.


You now have a TDI solution environment that you can use to edit the Profiles Tivoli Directory Integrator connectors.

Refer to connector-specific documentation for details about each connector. Scripts created in this environment can be executed from the Configuration Editor in the same way that you would execute standard Tivoli Directory Integrator assembly lines.

**Parent topic:**[Developing custom Tivoli Security Integrator assembly lines for Profiles](../admin/c_admin_profiles_develop_custom_tdi_scripts.md)

**Related information**  


[Using a custom source repository connector](../admin/c_admin_profiles_create_custom_source_repos_connector.md)

[Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md)

[Using the PhotoConnector](../admin/t_admin_profiles_using_photo_connector.md)

[Using the PronunciationConnector](../admin/t_admin_profiles_using_pronunciation_connector.md)

[Using the CodesConnector](../admin/t_admin_profiles_using_codes_connector.md)

[Creating an iterator connector](../admin/t_admin_profiles_create_iterator_connector.md)

[Creating a lookup connector](../admin/t_admin_profiles_create_lookup_connector.md)

