# Specifying read-only attributes {#t_admin_profiles_set_readonly_attributes .task}

When you want to specify an attribute that cannot be edited by users, you enclose the attribute in an <attribute\> element.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  Follow these steps to specify the read-only attributes for the Profiles user interface.
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

5.  Identify those attributes that are read-only profile attributes that should display on the Profile page. This decision should be based on the data that you were able to copy from your corporate directory into the Profiles application database and the requirements for your deployment of Profiles. Identify a particular field by enclosing it in an XML element named attribute as shown in the following example:

    ```
    <attribute>organizationTitle</attribute>
    
    ```

6.  The profile attributes that can be edited display in the Profile page with the attributes identified in this step. The order in which you specify these profile attributes dictates the order in which they are displayed in the Profile page. The only limitation is that profile attributes that are labeled as associated information \(for example, description and experience\) show up within tabs, and you have no control over these particular attributes in the Profile page. However, you do have control over profile attributes in other sections \(for example, job information and contact information\) as described in the following table.

    |Display option|Description|Example|
    |--------------|-----------|-------|
    |email link|If the profile attribute is an email address which is resolvable by an email client, then you can have this attribute displayed as a link with a mailto URL. For users that are viewing a profile with this link and that have an email client installed on their systems, clicking this email link launches their email client and a new email with the email address in the recipient list is created automatically.|    ```
<attribute 
 email="true">email
</attribute> 
    ```

|
    |Hyperlink|Displays as a clickable link.|    ```
<attribute 
 link="true">
 blogUrl
</attribute>
    ```

|
    |Sametime® aware|If you choose to enable the HCL Sametime presence awareness feature in Profiles, you can have a profile attribute that is a person's name displayed as a Sametime link. Sametime links display a person's presence and allow you to chat with that person if they are available to chat. A person viewing a profile with Sametime links needs to be logged in to the Profiles application to see the presence awareness. If the user is not logged in, a link to the Profiles login page displays in place of a Sametime link.|    ```
<attribute 
 sametimeLink="true" 
 email="secretaryEmail">
 secretaryName
</attribute> 
    ```

|
    |Display Profile card|Displays the name as an hcard, which is a semantic tag that would be turned into a person tag. Hovering over this attribute in the Profile page displays another link that can be selected to see that person's profile card. The profile card displays basic profile information and includes links to the content which that person has created in other HCL Connections™ applications.|    ```
<attribute 
 hcard="true" 
 email="secretaryEmail" 
 uid="secretaryUid">
 secretaryName
</attribute>
    ```

|
    |Display no label|Hides the label for the attribute.|    ```
<attribute 
 showLabel="false">
 organizationTitle
</attribute> 
    ```

|
    |Display no label if value is empty|Hides the label if there is no value for the attribute.|    ```
<attribute 
 hideIfEmpty="true">
 secretaryName
</attribute> 
    ```

|


**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

