# Adding sources to the Communities catalog {#t_admin_communities_add_catalog_sources .task}

Add sources to make HCL Connections communities available to users in the Communities catalog.

To add sources, you must log in to HCL Connections as the catalog administrator. For more information, see *Configuring the Communities catalog administrator*.

Sources are connections to servers or clusters that contain IBM® Connections communities. The servers publish metadata about their communities and places, and sources collect that metadata in an index. Community metadata then displays in lists of communities in the **I'm an Owner**, **I’m a Member**, **I’m Following**, **I’m Invited**, **Trash**, and **My Organization Communities** views. By default, metadata is collected automatically on a schedule, but you can control collections for each source.

**Note:** Only places metadata is collected, not the actual community or place content.

1.  To add sources to the Communities catalog, complete the following steps.
2.  Click any option under Communities and then click the **Administration** tab.

3.  Click **Add Source**.

4.  Enter the name by which the source is identified in the **Name** field.

5.  In the **User** field, enter the name of the administrator that is used in authentication.

6.  In the **Password** field, enter the password that the administrator uses for authentication.

7.  Enter the address of the server that provides the seedlist in **Server URL** field.

8.  View the known seedlist postfixes portion of the seedlist URL in the **Type** field, and change it if necessary.

    **Note:** The seedlist URL is the URL composed automatically by concatenating the server URL and the known seedlist postfixes. In most HCL Connections installations, the composed URL is correct and there is no need to change it.

9.  Select how frequently this source is crawled for new data to collect in the **Collect every** field, and then click **OK**.


For information about managing Communities catalog sources, see *Managing Communities catalog sources*.

**Parent topic:**[Managing the Communities catalog](../admin/c_admin_communities_catalog.md)

