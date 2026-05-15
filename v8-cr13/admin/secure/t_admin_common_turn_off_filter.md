# Turning off active content filtering {#t_admin_common_turn_off_filter .task}

Only turn off active content filtering if you have secured your network against cross-site scripting attacks by other means.

The active content filter removes potentially harmful text content, such as JavaScript™, from user input added to a post or entry before saving the post or entry to an application; it does not filter file attachments. Before you disable active content filtering, be sure you have considered the security implications of this decision. See [Securing applications from malicious attack](c_admin_security_xss.md) for more information.

1.  Start the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

2.  Use the wsadmin client to access and check out the HCL Connections configuration files.

3.  Run the following commands for the Connections component where you want to disable ACF:

    In the commands, replace `/opt/ictemp` with the temp location on your deployment manager where you store checked out files, and replace `cprice6lCell01` with the cell name of your environment. To determine the cell name, run the following command from the wsadmin\> prompt: `print AdminControl.getCell()`.

    -   Activities:

        ```bash
        execfile('activitiesAdmin.py')
        ActivitiesConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        ActivitiesConfigService.updateConfig("activeContentFilter.enabled", "false")
        ActivitiesConfigService.checkInConfig("/opt/ictemp","cprice6lCell01")
        ```

    -   Blogs:

        ```bash
        execfile('blogsAdmin.py')
        BlogsConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        BlogsConfigService.updateConfig("ACFEnabled", "false")
        BlogsConfigService.checkInConfig("/opt/ictemp","cprice6lCell01")
        ```

    -   Bookmarks:

        ```
        execfile('dogearAdmin.py')
        DogearConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        DogearCellConfig.updateConfig("activeContentFilter.enabled", "false")
        DogearConfigService.checkInConfig("/opt/ictemp","cprice6lCell01")
        ```

    -   Communities:

        ```bash
        execfile('communitiesAdmin.py')
        CommunitiesConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        CommunitiesConfigService.updateConfig("activeContentFilter.enabled", "false")
        CommunitiesConfigService.checkInConfig("/opt/ictemp","cprice6lCell011")
        ```

    -   Files:

        ```bash
        execfile('filesAdmin.py')
        FilesConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        FilesConfigService.updateConfig("activeContentFilter.enabled","false")
        FilesConfigService.checkInConfig("/opt/ictemp","cprice6lCell01")
        ```

    -   Forums:

        ```bash
        execfile('forumsAdmin.py')
        
        ForumsConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        ForumsConfigService.updateConfig("activeContentFilter.enabled","false")
        ForumsConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        ForumsConfigService.checkInConfig("/opt/ictemp,"cprice6lCell01")
        ```

    -   Profiles:

        ```bash
        execfile('profilesAdmin.py')
        ProfilesConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        ProfilesConfigService.updateConfig("activeContentFilter.enabled","false")
        ProfilesConfigService.checkInConfig("/opt/ictemp","cprice6lCell01")
        ```

    -   Wikis:

        ```bash
        execfile('wikisAdmin.py')
        WikisConfigService.checkOutConfig("/opt/ictemp","cprice6lCell01")
        WikisConfigService.updateConfig("activeContentFilter.enabled","false")
        WikisConfigService.checkInConfig("/opt/ictemp","cprice6lCell01")
        ```

4.  Verify on the Application server nodes that each config.xml file has been updated.

    These files will be located in the following directory: `/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/cprice6lCell01/LotusConnections-config`

    -   Activities: `oa-config.xml`
    -   Blogs: `blogs-config.xml`
    -   Bookmarks: `dogear-config.xml`
    -   Communities: `communities-config.xml`
    -   Files: `files-config.xml`
    -   Forums: `forums-config.xml`
    -   Profiles: `profiles-config.xml`
    -   Wikis: `wikis-config.xml`

**Parent topic:** [Securing applications from malicious attack](../secure/c_admin_security_xss.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Editing configuration files](../admin/t_admin_common_checkout_config_file.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

