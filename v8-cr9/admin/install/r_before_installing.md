# Before installing 

Verify that all necessary prerequisite conditions are complete before installing HCL Connections.

## Prerequisites 

**Important:** If Feature Foundation is included in your HCL Connections 8.0 CR3 installation then both Rollback and Uninstall will fail in the IBM Installation Manager. Make sure you have a full backup of the Connections server before upgrading. Refer to [Backing up HCL Connections](../migrate/t_back-up.md) for details. You can use this backup to restore your existing deployment if the migration or update fails.

1.  Refer to the [What's New in HCL Connections](../overview/i_ovr_r_whats_new_cr3.md) to review the latest new features in a release, gather download links, look over the latest fix list and update strategy information.
2.  Install all the required fixes for WebSphere® Application Server that are listed in the [HCL Connections Software Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) web page. If you are migrating from an earlier release or updating a release, verify that you have upgraded to the supported versions of all required software and all required fixes. Requirements have changed since the previous release.
3.  Upgrade to the 64-bit, version 1.9.x of IBM Install Manager. Connections 8.0 will not install with IIM 1.8.x. To upgrade the IBM Install Manager 1.8.x to 1.9.x, perform the steps below:

    1.  Ensure that the install manager is not running.
    2.  Open the terminal or the command prompt and go to where the Connections 8.0 package was extracted. Go to the folder `HCL_Connections_Install/IM/<OperatingSystem>/tools`.
    3.  Execute the following command:
       
        ``./imcl install com.ibm.cic.agent -repositories <extracted_Connections_dir>/IM/<operatingSystem>/repository.config -preferences offering.service.repositories.areUsed=false -acceptLicense``
    
    4.  Start the install manger and check version.

    **Note:** Use the same user account to install IBM® Installation Manager and HCL Connections.

4.  Plan which of three deployment options makes the most sense for your HCL Connections implementation. For more information about these options, Refer to the *Deployment options* topic.

    **Note:** The HCL Connections installation process supports the creation of new server instances and clusters. Do not use existing clusters to deploy HCL Connections.

5.  Complete the Pre-installation tasks.
6.  Install IBM WebSphere Application Server Network Deployment \(Application Server option\) on each node. HCL Connections is installed on the system where WebSphere Application Server Deployment Manager is installed. For more information, see the *Installing IBM WebSphere Application Server*topic.
7.  Back up the [profile\_root/Dmgr01](../plan/i_ovr_r_directory_conventions.md) directory.
8.  Configure WebSphere Application Server to communicate with the LDAP directory. For more information, see the *Setting up federated repositories* topic.
9.  Prepare directories to use as content stores. You need to provide shared content stores on network share devices and local content stores on each node. Both shared and local content stores must be accessible using the same path from all nodes and from the Deployment Manager.
10. Set the system clocks on the Deployment Manager and the nodes to within 1 minute of each other. If these system clocks are further than 1 minute apart, you might experience synchronization errors.
11. Copy the JDBC files for your database type to the Deployment Manager \(DM\) and then from the DM to each node. Place the copied files in the same location on each node as their locations on the DM. If, for example, you copied the db2jcc4.jar file from the C:\\IBM\\SQLLIB directory on the DM, place the copy in the C:\\IBM\\SQLLIB directory on each node.
12. If HCL Docs clusters are running, shut them down.

-   If you are going to use a trusted SSL certificate, ensure it is available before you begin the installation.
-   You can still install the Metrics application along with the other HCL Connections applications. This enables Connections to begin collecting event data immediately and store it in the Metrics database for migration to Elasticsearch later, when it is available to provide reports..
-   \(Microsoft Windows\) You must use an administrator account to install HCL Connections on Windows. If you are installing on Windows Server 2008, you must use a local administrator account. If you use a domain administrator account, the installation might fail.

**Tips:**

-   Establish naming conventions for nodes, servers, clusters, and web servers.
-   Use a worksheet to record the user IDs, passwords, server names, and other information that you need during and after installation. For more information, see the *Worksheet for installing HCL Connections* topic.
-   Installing and configuring HCL Connections is a complex process; not only should you read the instructions but you must also pay attention to the *Before you begin* prerequisites in each topic.

## Linux considerations 

-   If you receive an error message after attempting to start IBM Installation Manager, you might need to install additional 32-bit libraries. For more information about required Linux libraries, see the *Linux libraries* topic. For more information about IBM Installation Manager errors, go to the [Unable to install Installation Manager on RHEL 6.0/6.1 \(64-bit\)](https://www-304.ibm.com/support/docview.wss?uid=swg21459143) web page.
-   Ensure that the directory paths that you enter contain no spaces.
-   \(IBMi,and Linux\) Ensure that the Open File Descriptor limit is 8192. For information about setting the file limit, go to the [Installation error messages](../troubleshoot/r_error_codes_install.md) topic and search for error code CLFRP0042E.

-   You can install HCL Connections with either root or non-root accounts on Linux. For more information, see the *Installing as a non-root user* topic.

-   **[Linux libraries](../install/r_linux_libraries.md)**  
Linux libraries that are required for deploying HCL Connections.


**Parent topic:** [Pre-installation tasks](../install/c_preinstall_actions.md)

