# Customizing action links on the business card {#t_admin_profiles_customize_biz_card_actions .task}

Customize the action links that display on the Profiles business card by editing settings in the Profiles configuration file.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin tool.

The Profiles business card displays links that allow you to perform different actions directly from the card. For example, you can configure the card to display a link that allows users to send mail to the profile owner or a link that allows users to add the profile owner to their network.

Use the following procedure to customize the action links that display on the business card:

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  Use the wsadmin client to access and check out the Profiles configuration files.

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

3.  Open the profiles-config.xml file using a text editor.

4.  Locate the <businessCardLayout\> element, and specify the actions that you want to include in the <actions\> element.

    Each <action\> element must contain the following attributes:

    -   labelkey. Specifies the label to display for the action.
    -   href. This attribute supports the same substitutions as the business card URL patterns, that is, email, userid, displayName, and uid. It also supports '$\{\[service=name\]SvrRef\}' url patterns using what is defined in the LotusConnections-config.xml file.
    The <action\> element can, optionally, include an <icon\> subelement. In addition, the <label\> and <alt\> elements can have an optional bundleIdRef attribute, which references an external resource bundle.

    For example:

    ```
    <businessCardLayout profileType="default">
     ...
        <actions>
     ...
           <action urlPattern="mailto:{email}" emailEnabledRequired="true" liClass="lotusSendMail">
           <label labelKey="personCardSendMail"/>
           <icon href="{profilesSvcRef}/nav/common/styles/images/iconSendMail.gif">
           <alt labelKey="personCardSendMail"/>
           </icon>
           </action>
     ...
        </actions>
    </businessCardLayout>
    ```

5.  Save your changes.

6.  After making changes, check the configuration files in during the same wsadmin session in which you checked them out. See [Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md) for information about how to save and apply your changes.


**Parent topic:**[Customizing the Profiles business card](../customize/c_admin_profiles_customize_biz_card_links.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

