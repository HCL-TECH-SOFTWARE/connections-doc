# Performing an in-place or hybrid upgrade {#t_upgrading_to_7 .task}

Upgrade to an HCL Connections 8.0 deployment by running the Installation Manager Update function on a Connections 7.0 deployment. This can be done either in-place \(in your existing production environment\) or using a hybrid approach of installing 7.0 in a new environment identical to production then running the upgrade to 7.0.

After upgrading to HCL Connections 8.0, the latest HCL Connections 8.0 CR needs to be applied.

Download Connections and Component Pack 8 CR3. Connections Server packages are as follows:

-   HCL\_Connections\_8.0 \(download package for Connections 8.0 including system requirements\)
-   Websphere Application Server 8.5.5 and Select Fix Packs \(download package for IBM WebSphere including FixPacks\)

**Attention:**

-   On the system where the Deployment Manager is installed, prepare the supporting software for the update:
    -   Download Connections 8.0 from [My HCLSoftware](https://my.hcltechsw.com/). Decompress the 8.0 package into a temp directory.
    -   Verify that you have upgraded to the latest WebSphere Application Server and supplemental software from [My HCLSoftware](https://my.hcltechsw.com/), and have updated HTTP Server 8.5 and Web Server Plug-ins for IBM® WebSphere® Application Server 8.5.
    -   Verify that you are running Installation Manager 1.9.1 654-bit.
    -   In the soap.client.props file, change the SOAP Request Timeout to com.ibm.SOAP.requestTimeout=0 to ensure that no requests time out during the installation. Restart the Deployment Manager and start the HTTP services: HTTP Administration for WebSphere Application Server V8.5 and HTTP Server V8.5.

**Important:** If you have previously installed ICXT, <!--deselect the **Feature Foundation** check box when upgrading to Connections 8.0 CR1 and--> contact HCL Support to acquire the new ICXT upgrade package. After downloading the ICXT package follow the [ICXT installation guidelines](https://help.hcltechsw.com/connections/api/icxt/install-guide-scripted.html).

<!--**Note:** In an in-place upgrade, previous configurations for IBM FileNet and Metrics deployments will be retained in Connections 8.0 CR2 going forward.-->

1.  Stop all clusters and node agents in your deployment but leave the Deployment Manager running.

2.  Start Installation Manager.

3.  From the Installation Manager menu, click **File** \> **Preferences**.

    **Note:** Be sure that the **Search service repositories during installation and updates** option is deselected.

4.  Click **Repositories** \> **Add Repository**.

5.  Enter the full path to the Connections 8.0 install package that you downloaded and then click **OK**.

    Verify that Installation Manager can connect to the repository. For example: ..\\HCL\_Connections\_Install\\HCLConnections\\repository.xml.

6.  Click **OK**.

7.  Click **Update**.

8.  Select **HCL Connections** and click **Next**.

9.  From the Update Packages screen select Version 8.0.0.0 and click **Next**.

10. Review and accept the license agreement by clicking **I accept terms in the license agreements** and then click **Next**.

11. Ensure that all the Connections applications are selected and click **Next**.

    **Note:** All of the installed applications are selected by default. All of the installed applications are typically selected by default. If you clear any of the selected applications, those applications will be uninstalled. If there are any non-selected applications, and you select those applications, they will be installed.

12. Enter the administrative ID and password of the Deployment Manager and click **Validate**.

    **Note:** This ID is set to the connectionsAdmin J2C authentication alias, which is mapped to the following Java™ EE roles: dsx-admin, widget-admin, and search-admin. It is also used by the service integration bus. If you plan to use security management software such as Tivoli® Access Manager or SiteMinder, the ID that you specify here must exist in the LDAP directory. For more information, see the *Switching to unique administrator IDs for system level communication* topic.

13. Click **OK** \> **Next** \> **Update** \> **Finish**.

14. Close Installation Manager.

15. When the installation is complete, start the node agent to deploy the updated Connections applications.

16. Generate a new plug-in <!--\(to include the new Highlights app and refresh all app endpoint definitions\)--> by completing the following steps:

    1.  Still in the Integrated Solutions Console, click **Servers** \> **Server Types** \> **Webservers**.

    2.  Select the Webserver, click **Generate Plug-in**, and wait for the plug-in to be generated.

    3.  Select the Webserver again and click **Propagate Plug-in**.

17. Stop the node agent so the temp directory can be cleaned out in the next step.

18. Delete the contents of the cache under the App Server.

19. Start the node agents, then perform a full synchronization to push the update to all nodes.

    Check the SystemOut.log of each node agent to ensure synchronization completed successfully.

22. Start the Connections server.


<!---   **Required database update to Profiles:** Deployments that upgrade from Connections 7.0 are required to manually run the Profiles database schema. See [Updating databases](t_update_databases-manual.md).-->
-   A Connections 8.0 upgrade deployment updates a number of web services and other artifacts that require an end user to clear the browser cache to get the updates.
-   Alternatively, you can allow user's browsers to load new web services and artifacts by updating the <versionStamp value="\#\#\#\#"/\> in the LotusConnections-config.xml so users will see the changes the next time they log in, without having to clear their web browser cache. See [Post-customization step](../customize/t_admin_common_customize_postreq.md) after a Connections 8.0 upgrade is deployed so users will receive changes the next time they log in without having to clear their web browser cache. If the browser cache is not updated problems such as the Community Catalog not displaying correctly may occur.

**Parent topic:** [In-place and hybrid upgrades](../migrate/c_inplace_upgrade.md)

<!--
    
    13. In the Topology panel, select the topology that matches the deployment

    **Note:** By default, the IC360 application will be selected to be deployed as a new application. In medium and large deployments, it will deploy to a new WebSphere cluster called IC360Cluster. If you prefer to deploy the application to an existing WebSphere cluster, use the topology panel to override this option and select an existing cluster for deployment.

    14. Validate the Feature Foundation database
