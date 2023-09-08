# Configuring the vCard export application for Profiles {#t_admin_profiles_config_vcard_export .task}

Configure settings in the profiles-config.xml file to specify the character set encoding options used to export vCards.

To use administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Profiles users can export vCards from people's profiles and then import the profiles into their email client as contacts. You can configure the profiles-config.xml file to specify the encoding options that are available when exporting vCards from Profiles and determine which options are most appropriate for your users.

1.  To configure the vCard export application, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

4.  Open the Profiles configuration file, profiles-config.xml, using a text editor and locate the following <vcardExport\> section:

    ```
    <vcardExport>
     <charset name="UTF-8">
      <label key="label.vcard.encoding.utf8"/>
     </charset>
     <charset name="ISO-8859-1">
      <label key="label.vcard.encoding.iso88591"/>
     </charset>
     <charset name="Cp943c">
      <label key="label.vcard.encoding.cp943c"/>
     </charset>
    </vcardExport>
    
    ```

5.  To provide an export encoding that is specific to your language, include the following lines of code within the <vcardExport\> tags:

    ```
    <charset name="character\_encoding">
      <label key="ui\_label"/>
    </charset>
    ```

    where:

    -   character\_encoding is the name of the character encoding to export.
    -   ui\_label is the label for the character encoding in the user interface.
    For example, to add an export setting for Arabic, include the following element:

    ```
    <vcardExport>
     ...
     <charset name="Windows-1256">
      <label key="label.vcard.encoding.windows.arabic"/>
     </charset>
    </vcardExport>
    
    ```

    The following character set encoding options work best:

    |Character encoding|Description|
    |------------------|-----------|
    |Windows-1250|Central European languages that use Latin script \(Polish, Czech, Slovak, Hungarian, Slovene, Serbian, Croatian, Romanian, and Albanian\)|
    |Windows-1251|Cyrillic alphabets|
    |Windows-1252|Western languages|
    |Windows-1253|Greek|
    |Windows-1254|Turkish|
    |Windows-1255|Hebrew|
    |Windows-1256|Arabic|
    |Windows-1257|Baltic languages|
    |Windows-1258|Vietnamese|
    |gb2312|Chinese|
    |gb18030|Chinese|

    Complete this step for every language for which you require encoding support. There is no limit to the number of character set encodings that you can specify.

6.  After making changes, check the configuration files back in during the same wsadmin session in which you checked them out. See *Applying property changes in Profiles* for information about how to save and apply your changes.


**Parent topic:**[Administering Profiles](../admin/c_admin_profiles_intro.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

