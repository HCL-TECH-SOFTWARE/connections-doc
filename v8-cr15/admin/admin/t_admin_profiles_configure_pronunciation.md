# Configuring the pronunciation feature {#t_admin_profiles_configure_pronunciation .task}

Edit settings in the profiles-policy.xml file to configure the pronunciation feature.

To edit configuration files, use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin tool.

When the pronunciation feature is enabled, users can upload a recording of their name being pronounced correctly to their profile. You can enable or disable this feature for specific profile types. You can also configure access control settings for the pronunciation feature according to profile type.

1.  The following steps provide information about the properties that you can set for the pronunciation feature, and the access levels and scopes that you can configure.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following command to check out the profiles-policy.xml file:

    ```
    ProfilesConfigService.checkOutPolicyConfig("<working\_directory\>", "cell\_name")
    ```

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files will be copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name is the name of the IBM WebSphere Application Server cell hosting the Profiles application. This argument is required.
    For example:

    ```
    ProfilesConfigService.checkOutPolicyConfig("/wsadminoutput", "jdoe30Node02Cell")
    ```

5.  Open the profiles-policy.xml file using a text editor, from the temporary directory to which you checked it out.

6.  Edit the following properties for the pronunciation feature as needed.

    profile.pronunciation
    :   Enables or disables the profile pronunciation feature.

        This property takes a string value. Possible values include:

        -   true. Enables the pronunciation feature for users with the specified profile type. The user interface displays an icon for the user's pronunciation file and provides options for editing the file.
        -   false. Disables the pronunciation feature for users with the specified profile type. The feature does not display in the user interface.
    profile.pronunciation.update
    :   Controls user access to update the profile pronunciation file.

        Access levels for this property can be defined using one of the following scopes:

        -   none. No one can update the pronunciation file of users with the specified profile type.
        -   self. Users with the specified profile type can update their own pronunciation file. Administrators can also update the pronunciation file of users with the specified profile type.
    For example:

    ```
    <feature name="profile.pronunciation">
       <profileType type="default" enabled="true">
          <acl name="profile.pronunciation.update" scope="self" />
       </profileType>
    </feature>
    ```

    This code sample enables the pronunciation feature for users with the default profile type, but restricts the ability to update pronunciation files to profile owners and administrators.

7.  Save your changes and check the profiles-policy.xml file back in using the following command:

    ```
    ProfilesConfigService.checkInPolicyConfig()
    ```

8.  To exit the wsadmin client, type exit at the prompt.

9.  Stop and restart the Profiles server.


**Parent topic:**[Configuring profile features](../admin/c_admin_profiles_configurable_features.md)

