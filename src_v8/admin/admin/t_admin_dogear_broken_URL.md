# Managing notification for broken links {#ic_admin_dogear_broken_URL .task}

Configure what behavior is available from the Broken URL form. You configure Bookmarks settings using scripts accessed using the wsadmin client. These scripts use the AdminConfig object available in WebSphere® Application Server Admin \(wsadmin\) to interact with the Bookmarks configuration file. Changes to Bookmarks configuration settings require node synchronization and a restart of the Bookmarks server before they take effect.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

When a user takes action to remove or correct a broken link, they can remove the link from their own bookmarks. You can configure whether the user can notify all other users about the broken link so they can also take action. The default is to enable the option, but, if you are administering a large deployment, you may want to turn this option off to stop notification mail from going to large groups. You can also turn on or off an option that notifies you each time a broken URL notification is sent, giving you the opportunity to correct or remove the link. Again, you may want to disable this option if the mail volume is excessive.

**Note:** Disabling this filter introduces vulnerability to XSS and other types of malicious attack. See *Securing applications from malicious attack* for additional information.

1.  Open a command window and start the wsadmin command line tool as described in the topic, *Starting the wsadmin client*.

2.  Access the Bookmarks configuration file as described in the topic *Accessing the Bookmarks configuration file*.

3.  To edit a property using the wsadmin client, use the following command: `DogearCellService .updateConfig("property", "value")` where property is one of the following properties and value is the new value with which you want to set that property.

    brokenURLService.brokenURL.notifyAllOwners
    :   Boolean. true/false.

        Enables/disables an option on the Broken URL form to **Send notification to all users who bookmarked this** so that other users can also take action on a broken URL.

        Note: If the notification option is enabled \(True\) then, after a user selects the notification option, this notification message displays: Notification will be sent to \{x\} people. If this option is disabled \(False\), the option to notify all bookmark owners is not visible and only the current owner of the bookmark is notified.

    brokenURLService.brokenURL.notifyAdmin
    :   Boolean. true/false.

        Enables/disables an option to notify the Bookmarks administrator each time a Broken URL notification is sent to one or more users.

        Note: If the notification option is disabled, the Bookmarks administrator is not notified of broken links.

4.  See *Applying property changes* for information about how to save and apply your changes.


**Related information**  


[Managing links](../admin/c_admin_dogear_manage_links.md)

[Securing applications from malicious attack](../secure/c_admin_security_xss.md)

