# Customizing Files notification templates {#customizingemailtemplates .task}

You can customize Files notifications.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Notification templates are programmed in FreeMarker template language and make use of variables, such as \{notification.media.url\}, that are populated by the server, as well as property files for inserting internationalized strings. A core style template allows the generation of both text/plain and text/html notification and can be customized \(along with individual templates\) to change the style of the notification.

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

    If you are asked to select a server, you can select any server.

3.  Check out the Files configuration files using the following command:

    FilesConfigService.checkOutConfig\("working\_directory", "cell\_name", includeEmailTemplates = "true"\) where:

    -   working\_directory is the temporary working directory to which the configuration files are copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required even in stand-alone deployments. If you do not know the cell name, type the following command while in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```

    -   includeEmailTemplates must be set to "true" to check out the notification templates along with the configuration files. This is set to "false" by default.
    For example:

    ```
    FilesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell", includeEmailTemplates = "true")
    ```

4.  Edit any of the following templates:

    |Template|Description|
    |--------|-----------|
    |**commentAdded.ftl

**|Notification sent to users when a comment is created on a file they are following. Users can follow files by opening the file page and clicking **Follow**.

|
    |**mediaUpdated.ftl

**|Notification sent to users when a file they are following is edited. Users can follow files by opening the file page and clicking **Follow**.

|
    |**mediaShared.ftl

**|Notification sent to users when files are shared with them.

|
    |**collectionMediaAdded.ftl

**|Notification sent to users when a file is added to a folder or community they are following.

|
    |**collectionMemberUpdated.ftl

**|Notification sent to users when a folder is shared with them, or when their folder access level changes. This applies to individual users, not groups.

|
    |**communityVisibilityUpdated.ftl

**|Notification sent to owners of a community when the community was made public and non-public files shared with the community were removed from it.

|
    |**style.ftl

**|Style template that controls the output of all notification templates. Edit to customize the style of all notification templates.

|
    |**util.ftl

**|Helper script methods to be used in templates.

|

5.  Edit a `notification_<locale>.properties` file to edit notification strings in a particular language.

6.  You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See the topic *Applying Files property changes* for details.

    **Note:** Check in the templates using includeEmailTemplates="true" with the checkin command, for example:`FilesConfigService.checkInConfig(includeEmailTemplates = "true")`.


**Related information**  


[Customizing product strings](../customize/t_customize_strings_global.md)

