# Configuring the profile photo feature {#t_admin_profiles_configure_photo .task}

Edit settings in the profiles-policy.xml file to configure the profile photo feature.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

When the profile photo feature is enabled, users can enhance their profile page by adding a picture of themselves. As administrator, you can enable or disable this feature for specific profile types, depending on your organization's needs. You can also configure access control settings for the profile photo feature according to profile type.

1.  The following steps provide information about the properties that you can set for the profile photo feature, and the access levels and scopes that you can configure.
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

6.  Edit the following properties for the profile photo feature as needed.

    profile.photo
    :   Enables or disables the profile photo feature.

        This property takes a string value. Possible values include:

        -   true. Enables the photo feature for users with the specified profile type. The user interface displays the user's photo and provides options for editing the photo.
        -   false. Disables the photo feature for users with the specified profile type. The user interface does not display the user's photo or options for editing the photo. A generic photo image is displayed in place of the user's photo.
    profile.photo.update
    :   Control access to view the photo. In additional to the scope attribute for this access control, dissallowNonAdminIfInactive can be used to indicate whether photos for inactive users can be viewed. Administrative users can view photos regardless of the configuration.

        Access levels for this property can be defined using one of the following scopes:

        -   none. No one can update the profile photo of users with the specified profile type.
        -   self. Users with the specified profile type can update their own profile photo.
    profile.photo.view
    :   Controls access to view the photo.

        In additional to the scope attribute for this access control, dissallowNonAdminIfInactive can be used to indicate whether photos for inactive users can be viewed. Administrative users can view photos regardless of the configuration.

    In the following photo policy sample, users who have been assigned the reader role can view active user's photos with the default profile type, but photos for inactive users are only viewable by users who have been assigned theadmin role. When a user's photo is not viewable, the default gray photo image is displayed.

    ```
    <profileType type="default" enabled="true">
    <acl name="profile.photo.view" scope="reader" 
       dissallowNonAdminIfInactive="true"/>
    <acl name="profile.photo.update" scope="self" />
    </profileType>
    ```

    The following sample enables the profile photo feature for the default profile type, but restricts access to update profile photos to profile owners and administrators. For users with the contractor profile type, the profile photo is enabled, but no access is provided to update the profile photo for users of this profile type. The profile photo feature is disabled for users with the visitor profile type, and no one can update the profile photo for users of this profile type.

    ```
    <feature name="profile.photo">
       <profileType type="default" enabled="true">
          <acl name="profile.photo.update" scope="self" />
       </profileType>
       <profileType type="contractor" enabled="true">
          <acl name="profile.photo.update" scope="none" />
       </profileType>
       <profileType type="visitor" enabled="false">
          <acl name="profile.photo.update" scope="none" />
       </profileType>
    </feature>
    ```

7.  Save your changes and check the profiles-policy.xml file back in using the following command:

    ```
    ProfilesConfigService.checkInPolicyConfig()
    ```

8.  To exit the wsadmin client, type exit at the prompt.

9.  Stop and restart the Profiles server.


**Parent topic:**[Configuring profile features](../admin/c_admin_profiles_configurable_features.md)

