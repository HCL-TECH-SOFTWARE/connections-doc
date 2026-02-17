# Configuring the tagging feature {#t_admin_profiles_configure_tagging .task}

Edit settings in the profiles-policy.xml file to configure the tagging feature.

To edit configuration files, use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin tool.

The tagging feature allows users to assign meaningful keywords to their own profile and other user's profiles, making it easier to find people with a particular interest or expertise. You can control whether users can tag themselves and others by enabling or disabling the tagging feature for specific profile types. You can also configure access control settings for this feature according to profile type.

-   When tagging is disabled, the tags widget is not automatically hidden in the user interface. To hide the widget for a specific user type, use the policy settings in profiles-policy.xml. To hide the widget for all users, delete or comment out the relevant widget entry in the widget-config.xml file. For more information, see *Managing widgets in Profiles*.
-   When tagging is disabled for a given user type, the user's existing tags are still searchable; there is no mechanism available for controlling access to the tags from a reading and viewing perspective. If you choose to display the tags widget but you disable tagging for a particular user type, it might cause confusion for your users when search results include tags for a particular profile, but the tags do not display in that profile.

1.  To enable or disable tagging by profile type, complete the following steps:
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

    Edit the following properties for the tagging feature as needed.

    profile.tag
    :   Controls user access to add tags to their profile.

        Access levels for this property can be defined using one of the following scopes:

        -   none. No one can tag the profile of users with the specified profile type.
        -   self. Users with the specified profile type can tag their own profiles. Administrators can also tag the profiles of users with the specified profile type.
        -   colleagues\_not\_self. Only people who belong to the network of the user with the specified profile type, and who have the person role, can tag the user's profile. Users with the specified profile type cannot tag their own profiles.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   colleagues\_and\_self. People who belong to the network of the user with the specified profile type, and who have the person role, can tag the user's profile. Users with the specified profile type can tag their own profiles.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   person\_not\_self. Users with the person J2EE role can tag the profile of users with the specified profile type. Users with the specified profile type cannot tag their own profiles.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   person\_and\_self. Users with the person J2EE role can tag the profile of users with the specified profile type. Users with the specified profile type can also tag their own profiles.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

    For example:

    ```
    <feature name="profile.tag">
      <profileType type="default" enabled="true">
       <acl name="profile.tag.add" scope="person_and_self" /> 
      </profileType>
      <profileType type="contractor" enabled="true">
       <acl name="profile.tag.add" scope="colleagues_and_self" /> 
      </profileType>
      <profileType type="visitor" enabled="false">
       <acl name="profile.tag.add" scope="none" /> 
      </profileType>
    </feature>
    ```

    This code sample enables tagging for users with the default profile type. Users with the person J2EE role can tag users of the default profile type, and default users can tag their own profiles. Tagging is also enabled for users with the contractor profile type. People in the profile owner's network who have the person role can add tags to profiles of the contractor type, and contractor users can tag their own profiles. Tagging is disabled for users with the visitor profile type.

6.  Save your changes and check the profiles-policy.xml file back in using the following command:

    ```
    ProfilesConfigService.checkInPolicyConfig()
    ```

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop and restart the Profiles server.


**Parent topic:**[Configuring profile features](../admin/c_admin_profiles_configurable_features.md)

**Related information**  


[Managing widgets in Profiles](../admin/t_admin_profiles_edit_widgets.md)

