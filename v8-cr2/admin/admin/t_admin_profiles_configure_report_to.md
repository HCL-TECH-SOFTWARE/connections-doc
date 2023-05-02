# Configuring the reporting structure feature {#t_admin_profiles_configure_board .task}

Edit settings in the profiles-policy.xml file to configure the reporting structure feature. You can specify whether a user's manager information is available and whether a manager's direct reports are available.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

When the report-to feature is enabled, users can view the position of other users within the organization using the report-to chain information displayed on their profile page. When the people-managed feature is enabled, users can view the direct reports of a particular manager. As administrator, you can enable or disable these reporting structure features for specific profile types.

1.  The following steps provide information about the properties that you can set for the reporting structure feature.
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

6.  Edit the following properties for the reporting structure feature.

    profile.reportTo
    :   Enables or disables the display of the user's report-to information on their profile page.

        This property takes a string value. Possible values include:

        -   true. Report-to information is available for the users with this profile type. The user interface displays the report-to information, and the user's service document contains the reporting structure links.
        -   false. Report-to information is not available for the users with this profile type. The report-to information is hidden. If you are disabling this option, consider also disabling the widget for all users in the widgets-config.xml file. For more information, see *Managing widgets in Profiles*.
        For example, to enable the display of report-to information for users with the default profile type:

        ```
        <feature name="profile.reportTo">
           <profileType type="default" enabled="true">
           </profileType>
        </feature>
        ```

    profile.peopleManaged
    :   Enables or disables the display of direct reports for managers with the specified profile type.

        This property takes a string value. Possible values include:

        -   true. People-managed information is available for the users with this profile type, when they are managers. The user interface displays the report-to information, and the user's service document contains the reporting structure links.
        -   false. People-managed information is not available for managers with this profile type. The user interface still displays the Report-to Chain widget, but with only the current profile owner shown. The people-managed information is hidden, as if the user does not have any direct reports.
        For example, to enable the display of people-managed information for managers with the default profile type:

        ```
        <feature name="profile.peopleManaged">
           <profileType type="default" enabled="true">
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

**Related information**  


[Managing widgets in Profiles](../admin/t_admin_profiles_edit_widgets.md)

[Changing the display order of the Reporting Structure page](../admin/t_admin_profiles_change_display_of_full_reports_to.md)

