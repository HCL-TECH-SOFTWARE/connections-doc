# The installation process {#t_install_checklist .task}

Review the steps that are required to install HCL Connections.

Installing HCL Connections in a production environment involves several procedures to deploy the different components of the environment.

1.  Review the software and hardware requirements for the systems that hosts HCL Connections.

    For more information, see the [HCL Connections system requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) topic.

2.  Install the required software, choosing a supported product in each case:

    -   WebSphere® Application Server
    -   IBM® HTTP Server
    -   LDAP directory
    -   Database server \(DB2®, Microsoft™ SQL Server, Oracle Database\)
    -   IBM Security Directory Integrator
    **Notes:**

    If you want to use Connections Content Manager, you must configure Connections and FileNet® with the same WebSphere federated repositories. When HCL Connections is installed, the installer provides a user name and password for a system user account that is created by the installer to handle feature-to-feature communication. The Connections installer also creates a J2C authentication alias name connectionsAdmin. This alias is filled with the specified user and maps that user to a set of application roles.

    For many advanced security scenarios \(especially IBM Security Access Manager and Siteminder\) and in cases where an existing FileNet server is used with Connections Content Manager, the connectionsAdmin user should be in an LDAP directory or a common directory that is available to all services.

3.  If you plan to use mail notification, ensure that you have the SMTP and DNS details of your mail infrastructure available at installation time.

4.  Prepare the LDAP directory, install WebSphere Application Server, and create databases for the HCL Connections applications that you plan to use.

    For more information, see [Pre-installation tasks](c_preinstall_actions.md).

5.  Install HCL Connections and, optionally, HCL Connections Content Manager.

    You can rerun the installation program to add Connections Content Manager after an initial installation of HCL Connections only, or you can install both at the same time.

    For more information, see [Installing HCL Connections](c_installing_overview.md).

6.  Complete the postinstallation tasks that apply to your configuration.

    For example, map the installed applications to IBM HTTP Server. For more information, see [Post-installation tasks](r_post-installation_tasks.md).

7.  Update HCL Connections with the newest interim fixes or Cumulative Refresh.


**Parent topic:**[Installing Connections](../install/c_installing.md)

