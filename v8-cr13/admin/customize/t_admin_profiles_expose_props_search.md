# Specifying properties to expose in the search index {#t_admin_profiles_expose_props_search .task}

You can manually configure which properties are made available in the search index in order to meet specific search requirements.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

You can control which fields are made available to the search index on a per profile-type basis. To do so, enable support for the variable full text index in the profiles-config.xml file and then specify the properties to omit from the search index in the profiles-types.xml file.

By default, all properties on the profile record are made available to the search index if the individual property itself supports inclusion in the index. For a list of fields that are included in the search index by default, see [Standard properties in the data model](r_admin_profiles_attributes_std.md).

You can manually configure the properties that are made available in the search index in order to meet your specific search requirements. For example, your organization may need to not index a particular property in order to protect sensitive personal information that should not be exposed in search, but that is maintained in the Profiles application.

For information about the underlying Profiles search logic, see the [How does search work in HCL Connections Profiles](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/How_does_search_work_in_IBM_Connections_Profiles) wiki article.

To specify which fields are indexed for search, complete the following steps:

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    	app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files: 

        ```
        execfile("profilesAdmin.py") 
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files: 

        ```
        ProfilesConfigService.checkOutConfig("working\_directory", "cell\_name")
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, even if you are using the Microsoft™ Windows™ operating system.

            **Note:** Linux™: The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required and is case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: 

            ```
            print AdminControl.getCell()
            ```

        For example:

        -   Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

3.  Navigate to the temporary working directory that you specified in the previous step, and then open the profiles-config.xml file in a text editor.

4.  Locate the `<properties>` element, and then add the following property elements to it if they are not already present, or edit the values of the properties as required, if they are present.

        |**Property**|Description|
    |**com.ibm.lconn.profiles.config.variableFullTextIndexEnabled**|If set to true, the search index is comprised of fields that are marked as searchable in the profiles-types.xml file.

If set to false, the search index is comprised of all fields that support search.

The default setting is false.

|

5.  Navigate to the temporary working directory that you specified in the previous step, and then open the profiles-types.xml file in a text editor.

6.  For each property that should not get included in the search index, add `<fullTextIndexed>false</fullTextIndexed>` to the property reference.

    For example, to remove description from the search index, do the following:

    ```
    		<property>
    			<ref>description</ref>
    			<updatability>readwrite</updatability>
    			<hidden>false</hidden>
    			<richText>true</richText>
    			<fullTextIndexed>false</fullTextIndexed>
    		</property>
    ```

7.  Check in the configuration files using the wsadmin command ProfilesConfigService.checkInConfig\(\).

8.  Restart the application.

9.  If the search index was previously built, you will need to delete the existing index. See [Managing the search index](../admin/c_admin_search_manage_index.md) for more details.


**Parent topic:** [Customizing Profiles](../customize/c_admin_profiles_customizing.md)

**Related information**  


[Standard properties in the data model](../customize/r_admin_profiles_attributes_std.md)

[Extension properties in the data model](../customize/r_admin_profiles_attributes_ext.md)

[Profile-types](../customize/r_admin_profiles_ovr_types.md)

