# Configuring the following feature {#t_admin_profiles_configure_following .task}

Edit settings in the profiles-policy.xml file to configure the following feature.

To edit configuration files, use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin tool.

When the following feature is enabled, users can follow people and content that they are interested in to get the latest updates about them. In this release of HCL Connections, the following feature is enabled by default and you cannot disable it. However, you can configure access control settings for the feature according to profile type.

1.  These steps provide information about the properties that you can set and the access levels that you can configure.
2.  Use the wsadmin client to access the Profiles configuration files.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

3.  Use the following command to check out the profiles-policy.xml file:

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

4.  Open the profiles-policy.xml file using a text editor, from the temporary directory to which you checked it out.

5.  Edit the following properties for the following feature as needed.

    profile.following
    :   This property is always enabled in this release so that users are always able to see who they are following and who their followers are. You can use the profile.following.add access scope to control who can follow users of the specified profile type.

    profile.following.add
    :   Controls access to follow users with the specified profile type.

        Access levels for this property can be defined using one of the following scopes:

        -   none. No one can follow users with the specified profile type.
        -   self. Users with the specified profile type can follow themselves to subscribe to their own updates. Administrators can also follow users with the specified profile type.
        -   colleagues\_not\_self. Only people who belong to the network of the user with the specified profile type, and who have the person role, can follow the user. Users with the specified profile type cannot follow themselves.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   colleagues\_and\_self. People who belong to the network of the user with the specified profile type, and who have the person or self role, can follow the user. Users of the specified profile type can also follow themselves to subscribe to their own updates.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   person\_not\_self. Only users with the person J2EE role can post follow users with the specified profile type. Users with the specified profile type cannot follow themselves.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

        -   person\_and\_self. Users with the person J2EE role can follow users with the specified profile type. Users of the specified profile type can also follow themselves to subscribe to their own updates.

            **Note:** If resourceOwner is specified on the access check, the resource owner constraint must also be met, unless the user has the self role.

    For example:

    ```
    <feature name="profile.following">
      <profileType type="default" enabled="true">
       <acl name="profile.following.add" scope="person_not_self" /> 
      </profileType>
      <profileType type="contractor" enabled="true">
       <acl name="profile.following.add" scope="colleagues_not_self" /> 
      </profileType>
      <profileType type="visitor" enabled="false">
       <acl name="profile.following.add" scope="none" /> 
      </profileType>
    </feature>
    ```

    This code sample allows only users who have the person J2EE role to follow users with the specified profile type. For users with the contractor profile type, only the people who belong to the user's network can follow users of that profile type. Following is disabled for users with the visitor profile type.

6.  Save your changes and check the profiles-policy.xml file back in using the following command:

    ```
    ProfilesConfigService.checkInPolicyConfig()
    ```

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop and restart the Profiles server.


**Parent topic:**[Configuring profile features](../admin/c_admin_profiles_configurable_features.md)

**Related information**  


[Exposing information about following](../admin/t_admin_profiles_expose_following_info.md)

