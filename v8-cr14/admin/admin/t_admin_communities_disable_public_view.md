# Disabling the My Organization Communities view in Communities {#t_admin_communities_disable_public_view .task}

You can control whether the My Organization Communities view is available in your organization's deployment of Communities by editing settings in the communities-config.xml file.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can disable the My Organization Communities view so that users can only see the restricted communities that they belong to.

1.  Use the wsadmin client to access and check out the Communities configuration files.

    1.  Use the following command to access the Communities configuration files:

        ```
        execfile("communitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Communities configuration files using the following command:

        CommunitiesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux™ only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        CommunitiesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

2.  Open communities-config.xml in a text editor.

3.  To disable the My Organization Communities view, add the following lines after the <comm:tagCloud\> element and before the <comm:communityHandle\> element:

    ```
    <!-- Community Page Configuration -->
    <comm:communityPages>
    <comm:item name="publicCommunities" value="disabled"/>
    </comm:communityPages> 
    ```

4.  Save your changes.

5.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for your configuration changes to take effect. You must also stop and restart the Communities server. See *Applying property changes in Communities* for information about how to save and apply your changes.


The disabled page no longer displays in the Communities user interface. If a user tries to navigate to the page by entering its URL directly into the address bar, a message indicating that the page has been disabled displays.

**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

