# Enabling custom extension attributes for Profiles {#t_admin_profiles_enable_custom_fields .task}

Extend the Profiles application by adding custom extension attributes.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

In addition to different attribute layouts, Profiles supports extension attributes for every profile type. Because all profiles share one schema, an extension attribute, such as customers, has the same semantic meaning for all profile types. However, you can choose to associate a particular attribute with a profile based on profile type. The attributes are declared in the profiles-config.xml file located in the was\_profile\_root/config/cells/cell\_name/nodes/node-name/LotusConnections-config directory. Although changes to profiles-config.xml should generally be made using wsadmin client scripting, there are no wsadmin commands to modify the profilesDataModel, so you can make changes to the profilesDataModel using a text editor.

1.  To add a custom extension attribute to the **My Profile** page, perform the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

4.  Save a copy of the profiles-config.xml file.

5.  Open the file in a text editor.

6.  To define the extension attribute, add it to the <profileExtensionAttributes\> element under <profileDataModels\> as shown in the following sample:

    ```
    <profileDataModels>	
      <profileExtensionAttributes>
        <simpleAttribute extensionId="property1" length="64"/>
        <simpleAttribute extensionId="property2" length="64"/>
        <simpleAttribute extensionId="property3" length="64"/>
      </profileExtensionAttributes>
    
      <profileDataModel>
    ...
      </profileDataModel>
    ...
    </profileDataModels>
    
    ```

    For example:

    ```
    <profileDataModels>
      <profileExtensionAttributes>
       ...
        <simpleAttribute extensionId="spokenLang" length="64" />
        <simpleAttribute extensionId="TechExperience" length="64" />
        <simpleAttribute extensionId="officeAddress" length="64" />
        <simpleAttribute extensionId="homeAddress" length="64" />
    
      </profileExtensionAttributes>
    </profileDataModels>
    ```

7.  Check the configuration files back in during the same wsadmin session in which you checked them out for the changes to take effect.


**Parent topic:**[Extension properties in the data model](../customize/r_admin_profiles_attributes_ext.md)

**Related information**  


[Specifying a custom field as required and declaring maximum field length](../customize/t_admin_profiles_specify_required_field.md)

[Creating a simple profile data model and template customization](../customize/t_admin_profiles_custom_example.md)

