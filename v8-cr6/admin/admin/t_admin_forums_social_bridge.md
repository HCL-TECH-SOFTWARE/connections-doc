# Enabling topic posting in different deployments {#enablingforumtopicpostingindifferentdeployments .task}

Enable users to take forum topics in one HCL Connections deployment and post them to a different HCL Connections deployment.

Users can click **Bookmark or Discuss This** on any HCL Connections page to install a **Discuss This** button in their browser toolbar. When a user clicks the button, the content of the current page is added to a forum topic that the user selects.

Use the discussThis.enabled property to enable a similar **Discuss This** button on every forum topic page. Users can click the button to post the topic as a new topic in a forum in a different HCL Connections deployment. You can specify that deployment in the discussThis.internalHost property.

For example, if you have two HCL Connections deployments in your enterprise, A and B, you can allow forums users in Deployment A to post topics to Deployment B forums. To enable this feature, check out theforums-config.xml file in Deployment A and specify the address of the forums application in Deployment B. When users open a forum page in deployment A and clicks the **Discuss This** link, they can select the target forum on Deployment B from a pop-up dialog. If the users are not logged in to Deployment B, they are prompted to log in before they can post the new topic. Users must be members of the group that is mapped to the discussThis-user role on Deployment A \(the default is Everyone\).

1.  On the Forums server in HCL Connections deployment A, check out theforums-config.xml file. For more information, see *Changing Forums configuration property values*.

2.  To enable the feature, run the following command in the wsadmin client:

    ```
    ForumsConfigService.updateConfig("discussThis", "true")
    ```

3.  Specify the address of the forums application in deployment B:

    ```
    ForumsConfigService.updateConfig("discussThis.targetBookmarklet", "http://forums\_appserver.enterprise.com:9081/connections/bookmarklet")
    ```

4.  Check in theforums-config.xml file.

5.  Restart the Forums application.


**Parent topic:**[Administering Forums](../admin/c_admin_forums_overview.md)

**Related information**  


[Changing Forums configuration property values](../admin/t_admin_forums_changing_config.md)

