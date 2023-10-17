# Configuring the networking feature {#t_admin_profiles_configure_networking .task}

Edit settings in the profiles-policy.xml file to configure the networking feature.

To edit configuration files, use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin tool.

When networking is enabled, users can invite other users to join their network. The networking feature is enabled by default and you cannot disable it. However, you can configure access control settings for the feature according to profile type.

1.  The following steps provide information about the properties for the networking feature, and the access levels and scopes that you can configure.
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

6.  Edit the following properties for the networking feature as needed.

    profile.colleague
    :   This property is always set to enabled to ensure that users are always able to see their possible colleagues. You cannot set the property to disabled. However, you can use the profile.colleague.connect access scope to control who can invite the user to be a colleague.

    profile.colleague.connect
    :   Controls user access to invite people to join their network.

        Access levels for this property can be defined using one of the following scopes:

        -   none. No one can invite a user with the specified profile type to join their network. If the user has an existing network of colleagues, it is not available.

            **Note:** Setting the scope to none does not make a user's network read-only. If you need to lock the state of a user, note that users can still remove contacts from their network when you set the scope to none.

        -   person\_not\_self. Only users with the person J2EE role can invite users with the specified profile type to join their network. The profile owner cannot invite themselves to join their own network.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the admin role.

    For example:

    ```
    <feature name="profile.colleague">
      <profileType type="default" enabled="true">
       <acl name="profile.colleague.connect" scope="person_not_self" /> 
      </profileType>
      <profileType type="contractor" enabled="true">
       <acl name="profile.colleague.connect" scope="none" /> 
      </profileType>
      <profileType type="visitor" enabled="false">
       <acl name="profile.colleague.connect" scope="none" /> 
      </profileType>
    </feature>
    ```

    This code sample enables the networking feature for users with the default profile type, and enables only users with the person J2EE role to invite the profile owner to join their network. Networking is also enabled for the contractor profile type, although no one can invite contractor users to join their network. Networking is disabled for users with the visitor profile type.

7.  Save your changes and check the profiles-policy.xml file back in using the following command:

    ```
    ProfilesConfigService.checkInPolicyConfig()
    ```

8.  To exit the wsadmin client, type exit at the prompt.

9.  Stop and restart the Profiles server.


**Parent topic:**[Configuring profile features](../admin/c_admin_profiles_configurable_features.md)

