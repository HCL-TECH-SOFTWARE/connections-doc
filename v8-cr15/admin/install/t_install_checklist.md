# The installation process {#t_install_checklist .task}

Review the steps that are required to install HCL Connections.

!!! note

    For HCL Connections 7.0 and above, the  Feature Foundation is not supported on AIX if the third party application does not support AIX.

Installing HCL Connections in a production environment involves several procedures to deploy the different components of the environment.

1.  Review the software and hardware requirements for the systems that hosts HCL Connections.

    For more information, refer to the [HCL Connections system requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) topic.

2.  Install the required software, choosing a supported product in each case:

    -   WebSphere® Application Server
    -   IBM® HTTP Server
    -   LDAP directory
    -   Database server \(DB2®, Microsoft™ SQL Server, Oracle Database\)
    -   IBM Security Directory Integrator
3.  If you plan to use mail notification, ensure that you have the SMTP and DNS details of your mail infrastructure available at installation time.

4.  Prepare the LDAP directory, install WebSphere Application Server, and create databases for the HCL Connections applications that you plan to use.

    For more information, see [Pre-installation tasks](c_preinstall_actions.md).

5.  Install HCL Connections..

    For more information, see [Installing HCL Connections](c_installing_overview.md).

6.  Complete the postinstallation tasks that apply to your configuration.

    For example, map the installed applications to IBM HTTP Server. For more information, see [Post-installation tasks](r_post-installation_tasks.md).

7.  Update HCL Connections with the newest interim fixes, cumulative fixes, or Cumulative Refresh.


**Parent topic:**[Installing Connections](../install/c_installing.md)

