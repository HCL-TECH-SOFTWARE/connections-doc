# Configuring the recent updates feature {#t_admin_profiles_configure_board .task}

Edit settings in the profiles-policy.xml file to configure the recent updates feature.

To edit configuration files, use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin tool.

The recent updates feature allows users to connect with people in their network by posting messages to their profile and commenting on their status messages. As administrator, you can enable or disable the feature for specific profile types, depending on your organization's needs. You can configure access control settings according to profile type. You can also configure visibility of targeted events in the Profiles activity stream.

**Note:** Profiles directory extensions must be enabled to support this capability. Extensions are enabled by default.

**Note:** Profiles policy contains two related settings that impact how a user is enabled to post a status update on their Profile page – profiles.board and profile.status.update. It is recommended to have identical settings for both of these policies. In case of conflict between the two settings, the most restrictive setting is used. See *Configuring the status update feature* for related information.

1.  The following steps provide information about the properties that you can set for the recent updates feature, and the access levels and scopes that you can configure.
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

6.  Edit the following properties for the recent updates feature as needed.

    profile.board
    :   Enables or disables the Profiles recent updates feature.

        **Note:** Configuring this property does not affect the ability to post status messages.

        This property takes a string value. Possible values include:

        -   true. Enables the recent updates feature for users with the specified profile type. When set to true, message posts display in the user interface.
        -   false. Disables the recent updates feature for users with the specified profile type. When set to false, message posts do not display in the user interface. The access control level settings are also ignored when the feature is disabled.
    profile.board.write.message
    :   Controls user access to post messages.

        Access levels for this property can be defined using one of the following scopes:

        -   none. No user can post messages to users with the specified profile type.
        -   self. Users with the specified profile type can view and post messages in their own recent updates area. Administrators can also view and post messages in the recent updates area of users with the specified profile type.
        -   colleagues\_not\_self. Only people who belong to the network of the user with the specified profile type, and who have the person role, can view and post messages to the user's recent updates area. Users with the specified profile type cannot post messages to their own recent updates area.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   colleagues\_and\_self. People who belong to the network of the user with the specified profile type, and who have the person role, can view and post messages to the user's recent updates area. Users with the specified profile type can also post messages to their own recent updates area.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   person\_not\_self. Users with the Person role in the News application can post messages to or view the recent updates area of users with the specified profile type. Users with the specified profile type cannot post messages to their own recent updates area.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   person\_and\_self. Users with the Person role in the News application, including self, can post messages to or view the recent updates area of users with the specified profile type. Users with the specified profile type can also post messages to their own recent updates area.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

    profile.board.write.comment
    :   Controls user access to post comments to the recent updates area.

        Access levels for this property can be defined using one of the following scopes:

        -   none. No one can post comments to the recent updates area of users with the specified profile type.
        -   self. Users with the specified profile type can view and post comments to their own recent updates area. Administrators can also view and post comments to the recent updates area of users with the specified profile type.
        -   colleagues\_not\_self. Only the people who belong to the network of the user with the specified profile type, and who have the person role, can view and post comments to the user's recent updates area. Users with the specified profile type cannot post comments to their own recent updates area.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   colleagues\_and\_self. People who belong to the network of the user with the specified profile type, and who have the person role, can view and post comments to the user's recent updates area. Users with the specified profile type can also post comments to their own recent updates area.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   person\_not\_self. Users with the Person role in the News application can post comments to and view the recent updates area of users with the specified profile type. Users with the specified profile type cannot post comments to their own recent updates area.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   person\_and\_self. Users with the Person role in the News application, including self, can post comments to and view the recent updates area of users with the specified profile type. Users with the specified profile type can also post comments to their own recent updates area.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

    For example:

    ```
    <feature name="profile.board">
     <profileType type="default" enabled="true">
      <acl name="profile.board.write.message" scope="colleagues_and_self" /> 
      <acl name="profile.board.write.comment" scope="colleagues_and_self" /> 
     </profileType>
     <profileType type="contractor" enabled="true">
      <acl name="profile.board.write.message" scope="person_and_self" /> 
      <acl name="profile.board.write.comment" scope="colleagues_and_self" /> 
     </profileType>
     <profileType type="visitor" enabled="false" /> 
    </feature>
    ```

    This code sample enables the recent updates feature for the default profile type, but restricts access to post messages and comments to people in the profile owner's network who have the person and the profile owner. The recent updates feature is also enabled for the contractor profile type, but access to post messages is restricted to users with the person role, including the profile owner. Access to post comments is restricted to the profile owner, and people in the profile owner's network who have the person role. The recent updates feature is disabled for the visitor profile type.

7.  To restrict or enable display of activity stream events for a given set of users, use the `profile.activitystream` feature as shown in the following example:

    ```
    <feature name="profile.activitystream">
          <profileType type="default" enabled="true">
        <!-- only surface public targetted events in the Profiles
           Activity Stream of people with the profile type
           "default" from colleagues -->
                <acl name="profile.activitystream.targetted.event"
           scope="colleagues_not_self" />
          </profileType>
    </feature>
    ```

    The supported scopes are:

    -   none – No targeted events are surfaced in the activity stream of people with the given profileType.
    -   colleagues\_not\_self – Only targeted events from colleagues are surfaced in the activity stream of people with the given profileType.
    -   self – Only the user’s own targeted events are surfaced in the activity stream of people with the given profileType.
    -   colleagues\_and\_self – Only the user’s own and targeted events from colleagues are surfaced in the activity stream of people with the given profileType.
    The profile policy only applies to new events, it does not impact the display of existing events that are already visible in the activity stream.

8.  Save your changes and check the profiles-policy.xml file back in using the following command:

    ```
    ProfilesConfigService.checkInPolicyConfig()
    ```

9.  To exit the wsadmin client, type exit at the prompt.

10. Stop and restart the Profiles server.


**Parent topic:**[Configuring profile features](../admin/c_admin_profiles_configurable_features.md)

