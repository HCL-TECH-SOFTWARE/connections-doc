# Denoting sites as intranets {#t_admin_dogear_intranet_site .task}

You can make changes to configuration settings to denote a Bookmarks site as an intranet. Changes to Bookmarks configuration settings require node synchronization and a restart of the Bookmarks server before they take effect.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Follow these steps to denote a site as an intranet.

1.  Access the Bookmarks configuration file as described in the topic *Accessing the Bookmarks configuration file*.

2.  IP ranges are used to identify bookmarks located on your corporate intranet. As you expand or change your intranet topology, use these settings to incorporate changes into Bookmarks.

    If you had previously configured a value for IntranetAllocation.ipRange, when you run the DogearCellConfig.showConfig\(\) command, one or more IntranetAllocation.ipRange settings will appear. For example:

    ```
    privateIntranetAllocationTable from 0.0.00.00 to 0.00.00.1
    privateIntranetAllocationTable from 1.1.11.11 to 1.101.0.1
    privateIntranetAllocationTable from 2.2.22.20 to 2.202.0.2
    privateIntranetAllocationTable from 3.3.33.30 to 3.303.0.3
    privateIntranetAllocationTable from 4.4.44.40 to 4.404.0.4
    ```

    This represents the various IP ranges of web sites in the corporate intranet. This setting is used to determine if a site is internal or external. Internal sites are represented by an intranet favicon.

    You might need to update this value after initially installing Bookmarks with no IP ranges or if you want to add a range after installation. This might be the case due to a corporate merger or acquisitions that result in added or deleted IP ranges.

    **Note:** Any change to IP ranges will require an update to the intranet settings of bookmarks in the database.

    See the topic *Assigning URLs to intranet sites* for more information.

    The following commands allow the administrator to either add or remove ipRanges.

    DogearCellConfig.addIpRange\('intranetAllocation.ipRange', \['from\_range'\], \['to\_range'\]\)
    :   Strings. This command will add an additional IP Range.

        \[from\_range\] = the starting IP address of this range

        \[to\_range\] = the ending IP address of this range

        Example:

        ```
        DogearCellConfig.addIpRange('intranetAllocation.ipRange','2.2.22.20','2.202.0.2')
        ```

    DogearCellConfig.removeIpRange\('intranetAllocation.ipRange', \['from\_range'\], \['to\_range\]'\)
    :   Strings. This command will delete an existing IP Range.

        \[from\_range\] = the starting IP address of this range

        \[to\_range\] = the ending IP address of this range

        Example:

        ```
        DogearCellConfig.removeIpRange( 'intranetAllocation.ipRange','2.2.22.20','2.202.0.2')
        ```

    DogearCellConfig.clearIpRanges\('intranetAllocation.ipRange'\)
    :   String.

        Clears all IP ranges recorded in the configuration settings

        Example:

        ```
        DogearCellConfig.clearIpRanges('intranetAllocation.ipRange')
        ```

3.  See *Applying property changes* for information about how to save and apply your changes.


**Parent topic:**[Administering Bookmarks](../admin/c_admin_dogerar_intro.md)

