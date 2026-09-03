# Using the LDAP directory as the user directory {#t_admin_common_disabling_directory_services .task}

Edit configuration property settings to disable HCL Connections directory service extensions.

Be sure that you have configured the LDAP directory properly before you configure it to be the user directory. See *Setting up federated repositories* for more details.

HCL Connections directory service extensions are protocols that propagate Profiles data between the applications. When the directory service extension is enabled, you can use the Profiles database to store user information instead of having to access the LDAP directory for each request. If you install the Profiles application, the Profiles database is set up to be the user directory for HCL Connections by default. If you decide that you want to use the LDAP directory as the user directory instead, you can disable the Profiles directory service extension.

When you disable the Profiles directory service extension, LDAP services handle authentication, group membership search, and all user profiles queries except browser based searches requested within the Profiles application.

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Use the wsadmin client to access and check out the HCL Connections configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
            -    Linux only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

3.  Use the following command to disable the Profiles directory service extension:

    ```
    LCConfigService.updateConfig("profiles.directory.service.extension.enabled","false")
    ```

4.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying common configuration property changes* for information about how to save and apply your changes.


-   **[Using the Profiles database as the user directory](../admin/t_enabling_directory_services.md)**  
Edit configuration property settings to enable HCL Connections directory service extensions.

**Parent topic:**[Managing access](../admin/c_admin_common_managing_access.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

