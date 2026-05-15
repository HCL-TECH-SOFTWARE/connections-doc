# Hiding email addresses {#t_admin_common_hide_email_using_script .task}

Configure HCL Connections to prevent email addresses from being displayed in the product to protect the privacy of your users.

Test notifications to ensure that your mail servers are set up correctly. Edit the notification-config.xml file to define a valid email address for the global administrator and alternative addresses for the different types of notifications that are sent by each application. For more information, see *Defining valid administrator email address*.

**Attention:** Do not configure HCL Connections to hide email addresses if you are using any of the HCL Connections extensions. Extensions such as the HCL Connections Plug-in for Notes® or HCL Connections Plug-in for Sametime®, require addresses to be exposed because they rely on email addresses to identify users. For more information, see the *Extending* section of the product documentation for a list of available HCL Connections extensions.

When you prevent emails from displaying, email addresses are hidden in the following places:

-   Members fields. When you begin to type a name into a name field, a list of options is displayed. By default, this list is composed of email addresses. If you configure HCL Connections to hide email addresses, the list is composed of display names instead.
-   URLs. Email addresses are often sent as parameters in URLs. This setting prevents the email address from being used in URLs. A customer ID is used instead.
-   Notifications. HCL Connections sends email notifications in response to various user actions. For example, when you add members to an activity, they receive email notifications rthat inform them about the activity. Other notifications are generated automatically by the server. For example, automatic notifications are sent to activity owners to warn them that an activity will be marked complete because of lack of use. When you indicate that you do not want to expose email addresses, notifications appear to originate from the administrator email address. In addition, the email addresses of the recipients are added to the BCC field of the notification.
-   Profiles business card. The email address that usually is displayed in business cards is not displayed nor.

Note to programmers: If you configure HCL Connections to keep email addresses private, you cannot use the email parameter to represent a person in GET requests for Atom feeds. Instead, you must use the userid parameter.

To hide email addresses, complete the following steps:

1.  Edit the LotusConnections-Config.xml file.

    1.  Start the wsadmin tool.

    2.  Use the following command to access the HCL Connections configuration file:

        execfile\("<$WAS\_HOME\>/profiles/<DMGR\>/config/bin\_lc\_admin/ connectionsConfig.py"\)

        If you are prompted to specify which server to connect to, enter 1. This information is not used by the wsadmin client when you are making configuration changes.

    3.  Check out the HCL Connections configuration files using the following command: LCConfigService.checkOutConfig\("/working\_directory", "cell\_name"\)

        where

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you change them.
        -   cell\_name is the name of the IBM® WebSphere® Application Server cell hosting the HCL Connections application. This argument is case sensitive. If you do not know the cell name, you can determine it by entering the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        LCConfigService.checkOutConfig\("/temp","foo01Cell01"\)

    4.  From the temporary directory to which you checked out the IBM Connections configuration files, open the LotusConnections-config.xml file in a text editor.

2.  Set `<exposeEmail enabled="false">`.

3.  Save the file and check it back in using the following command:LCConfigService.checkInConfig\(\).

4.  Sync all nodes with the following command: synchAllNodes\(\).

5.  Restart Connections.


**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

**Related information**  


[Defining valid administrator email addresses](../admin/t_admin_act_managing_notifications.md)

