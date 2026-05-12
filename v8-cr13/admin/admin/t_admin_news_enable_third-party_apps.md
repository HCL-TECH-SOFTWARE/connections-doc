# Registering third-party applications {#t_admin_news_enable_third-party_apps .task}

Use the NewsActivityStreamService commands to register third-party applications. An application in this context is an OpenSocial gadget that is compatible with HCL Connections.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can extend the scope of the Home page activity stream to include updates from third-party applications using the JSON APIs provided with HCL Connections. If you want third-party applications to display in the filter list in the product user interface, you must register the applications.

**Note:** You can still post third-party events to the activity stream if the corresponding application is not registered, but you must register the application if you want it to be available from the filter list.

You can also update applications that have already been registered to enable them for email digest functionality. Enabled applications are included on the Email Preferences page, and email notifications are sent to the intended recipients of activities. Users can select the frequency with which they want to be notified about updates, as with the standard HCL Connections applications. Depending on the user's choice, an email notification is sent either immediately or grouped in a daily or weekly newsletter.

1.  To register third-party applications, update or retrieve existing registration information, or enable a third-party application for email digest functionality, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Jython script interpreter for the News repository.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands as needed:

    NewsActivityStreamService.registerApplication\(appId, displayName, url, secureUrl, imageUrl, secureImageUrl, summary, isEnabled\)
    :   Registers a new application.

        This command takes the following parameters:

        -   appId. The ID of the application that you want to register.
        -   displayName. The name of the application that you want to display in the product user interface.
        -   url. The web address for the application.
        -   secureUrl. The secure web address for the application.
        -   imageUrl. The web address for an image to associate with the application in the user interface.
        -   secureImageUrl. The secure web address for an image to display for the application.
        -   summary. A short description of the application.
        -   isEnabled. A Boolean string that specifies whether the registration is enabled or disabled.
        **Note:** You must include the appId and isEnabled parameters, but the remaining parameters are optional. After registering an application, you might also need to restart the Home page application for the application to display in the filter list.

        For example:

        ```
        NewsActivityStreamService.registerApplication
        ("testApp", "Test Application", "http://www.test.com/gadget.xml", 
        "https://www.test.com/gadget.xml", "http://www.test.com/image.jpg", 
        "https://www.test.com/image.jpg", "summary", "true")
        ```

    NewsActivityStreamService.updateApplicationRegistration\(appId, field, value\)
    :   Updates a particular field associated with an existing, registered application.

        This command takes the following parameters:

        -   appId. The ID of the application that you want to update.
        -   field. The registration field whose information you want to update. Set this parameter to one of the following values:
            -   displayName. The updated name of the application.
            -   url. The updated web address for the application.
            -   secureUrl. The updated secure web address for the application.
            -   imageUrl. The updated web address of the image to associate with the application in the user interface.
            -   secureImageUrl. The updated secure web address of the image to associate with the application in the user interface.
            -   summary. An updated short description of the application.
            -   isEnabled. A Boolean string that specifies whether the registration is enabled or disabled.
        -   value. The value of the field that you are updating. When you are updating the displayName field, summary, or one of the URL fields, specify the value as a string. When you are updating the isEnabled field, specify a Boolean string.
        For example, the following command disables the registration of the testApp application:

        ```
        NewsActivityStreamService.updateApplicationRegistration("testApp", "isEnabled", "false")
        ```

    NewsActivityStreamService.updateApplicationRegistrationForEmailDigest\(appId, isEnabled, defaultFollowFrequency, isLocked\)
    :   Updates a registered application so that it is enabled for email digest functionality. When you run this command, the updates occur immediately; you do not need to restart the system.

        Enabled applications are included on the Email Preferences page, and email notifications are sent to the intended recipients of activities. Users can select the frequency with which they want to be notified about updates, as with the standard HCL Connections applications. Depending on the user's choice, an email notification is sent either immediately or grouped in a daily or weekly newsletter.

        This command takes the following parameters:

        **Note:** You must run the command every time a parameter update is required.

        -   appId. The ID of the application that you want to update.
        -   isEnabled. A Boolean string that specifies whether the registration is enabled or disabled for email digest sending.
        -   defaultFollowFrequency. A value that specifies the default frequency with which application updates are notified. The following values are valid: NONE, INDIVIDUAL, DAILY, and WEEKLY.
        -   isLocked. A Boolean string that specifies whether email settings for the application are locked or unlocked.

            **Note:** Setting this parameter to true enforces the defaultFollowFrequency parameter for all users, and individual user settings for the application are overridden. When isLocked is set to true, a lock icon displays next to the application name on the Email Preferences page, and the radio buttons for selecting the notification frequency for the application are disabled. When isLocked is set to false, users can specify notification frequency settings for the application, and any settings that were previously specified are restored.

        For example:

        ```
        NewsActivityStreamService.updateApplicationRegistrationForEmailDigest("testApp", "true", "DAILY", "false")
        ```

    NewsActivityStreamService.removeApplicationRegistration\(appId\)
    :   Removes the specified application registration.

        This command takes a single parameter, which is the ID of the application that you want to remove.

        For example, the following command removes the registration of the testApp application.

        ```
        NewsActivityStreamService.removeApplicationRegistration("testApp")
        ```

    NewsActivityStreamService.listApplicationRegistrations\(\)
    :   Returns a list of the applications that are registered with the News service. The applications are separated by commas and formatted as follows:

        ```
        application ID=Display name or description
        ```

    NewsActivityStreamService.getApplicationRegistration\("applicationId"\)
    :   Returns a list of details about the specified application. This command takes a single argument, which is a string that specifies the application ID. Use the NewsActivityStreamService.listApplicationRegistrations\(\) command to retrieve this ID.

        Results are returned as key value pairs that are separated by commas.

        For example:

        ```
        wsadmin>NewsActivityStreamService.listApplicationRegistrations()
        {wikis=wikis, ecm_files=Libraries, communities=communities, profiles=profiles, 
        activities=activities, 3rd_party_id=A Third Party, homepage=homepage, 
        blogs=blogs, forums=forums, files=files, dogear=dogear}
        ```

        ```
        wsadmin>NewsActivityStreamService.getApplicationRegistration("communities")
        {imageUrl=http://example.com:9082/connections/resources/web/
           com.ibm.lconn.core.styles/images/iconCommunities16.png, summary=null, 
           isEnabled=true, secureUrl=https://example.com:9445/communities, 
           secureImageUrl=https://example.com:9445/connections/resources/web/
           com.ibm.lconn.core.styles/images/iconCommunities16.png, appId=communities,
           displayName=communities, url=http://example.com:9082/communities}
        ```


Restart the Home page application to pick up your changes. You might also need to restart the Profiles and Communities applications in order for the filter list to display in those applications.

**Parent topic:**[Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[News administrative commands](../admin/r_admin_news_admin_props.md)

