# Specifying attributes that can be edited {#t_admin_profiles_set_editable_attributes .task}

Specify which attributes in the Profiles user interface can be edited. Attributes that can be edited display on the **Edit My Profile** page.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  Follow these steps for modifying attributes that can be edited for a Profiles form.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   AIX
            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   AIX or Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

4.  Open the profiles-config.xml file in a text editor.

5.  Identify those attributes that can be edited by a profile owner based on the data that you can copy from your corporate directory into the Profiles application database, and the requirements for your organization. You specify a particular field as editable by enclosing it in an XML element named editableAttribute as follows:

    ```
    <editableAttribute showLabel="true" hideIfEmpty="true" hcard="true" email="secretaryEmail" uid="secretaryUid" 
    appendHtml="&lt;br/&gt;">secretaryName</editableAttribute>
    ```

6.  The order in which you specify profile attributes that can be edited dictates the order of the form controls for each profile attribute on the **Edit My Profile** page. You have some control over the form control shown for a particular attribute and how any values provided are stored in the Profiles application database.

    |Input type|Description|Example|
    |----------|-----------|-------|
    |Multi-line input|Displays an HTML text area form control.|    ```
<editableAttribute 
 multiline="true">
 description
</editableAttribute>
    ```

|
    |Rich multi-line input|Displays an HTML rich-text editor form control.|    ```
<editableAttribute 
 richtext="true">
 description
</editableAttribute> 
    ```

|
    |Editing disabled|Makes the field read-only.|    ```
<editableAttribute 
 disabled="true">
 displayName
</editableAttribute>
    ```

|


**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

