# Backing up Connections 

Before you upgrade or update HCL Connections, back up your databases and applications.

Follow these steps to back up your Connections deployment. You can use this backup to restore your existing deployment if the upgrade or update fails. This procedure backs up your entire deployment, you cannot use it to back up individual applications within Connections.

**Note:** Pay attention to the version of Connections you are backing up. If you must restore the backup later, it can be restored only to the same version of Connections, as described in the following details:

-   Content can be restored only to the same major/minor release that it was backed up from. For example, Cumulative Refresh \(CR\) releases for Connections 6 CR6 are considered part of the Connections 6.5 release.
-   Content cannot be restored to a later release \(for example, Connections 5.5\) if it was backed up on an earlier release \(for example, Connections 5.0 \(CRx\)\).
-   The /provision subdirectory in the shared content folder can be restored only to the exact version that it was backed up on. It is not safe to restore the /provision subdirectory to a version with a CR or an interim fix different from the version the directory was backed up from.

***Procedure***

1.  Stop the IBM® WebSphere® Application Server instances that are hosting HCL Connections™.

2.  If you installed Connections Content Manager, back up the FileNet® Storage Area and the Engine-ws.ear file.

    By default the FileNet Storage Area is in the following directory:

    -   For Linux™ or Linux on System z®: [<shared\_data\_directory\_root\>](../plan/i_ovr_r_directory_conventions.md)/ccm
    -   For Windows: [<shared\_data\_directory\_root\>](../plan/i_ovr_r_directory_conventions.md)\\ccm
    **Note:** You need to back up FileNet Storage Area if it is reconfigured outside of <shared\_data\_directory\_root\> only.

    By default, the Engine-ws.ear is in the following directory:

    -   For Connections 6:
        -   For Linux or Linux on System z:

            ```
            <connections_root>/addons/ccm/ContentEngine/tools/configure/profiles/CCM/ear
            ```

        -   For Windows:

            ```
             <connections_root>\addons\ccm\ContentEngine\tools\configure\profiles\CCM\ear
            ```

    -   For Connections 6 CR6:
        -   For Linux or Linux on System z:

            ```
            <connections_root>/FileNet/ContentEngine/tools/configure/profiles/CCM/ear
            ```

        -   For Windows:

            ```
            <connections_root>\FileNet\ContentEngine\tools\configure\profiles\CCM\ear
            ```

3.  Determine whether the filenetAdmin user \(usually the same as the ConnectionsAdmin user\) is a local WIM user and, if so, back up the local fileRegistry.xml file to restore it after migration.

    1.  Find the user that is used by Connections to contact FileNet.

        From the WebSphere Application Server administrative console, navigate to **Security** \> **Global Security** \> **Java Authentication and Authorization Service** \> **J2C authentication data** and make note of the User ID of the `filenetAdmin`.

    2.  Determine whether this user is in a local file-based repository.

        1.  From the WebSphere Application Server administrative console, navigate to **Users and Groups** \> **Manage Users**.
        2.  In the search box, enter the User ID of your filenetAdmin from the J2C authentication data and click **Search**.

            If the unique name of the user ends with o=defaultWIMFileBasedRealm, then your FileNet administrator is from a local file-based repository and not LDAP. Therefore, continue to the next step to back up the fileRegistry.xml file.

    3.  Back up the existing fileRegistry.xml file.

        For example, on Linux:

        ```
        /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/ICCell/fileRegistry.xml
        
        ```

4.  Using native database tools, back up the databases. To back up Connections Content Manager databases, include both FileNet databases: Global Configuration Database \(FNGCD\) and Object Store \(FNOS\). If the update or migration fails, use this backup to restore the databases.

5.  Back up the WebSphere Application Server Deployment Manager profile directory: [profile\_root/Dmgr01](../plan/i_ovr_r_directory_conventions.md). For example: D:\\WebSphere\\AppServer\\profiles\\dmgr.

6.  Back up your Connections deployment.

    1.  Create a backup of the Connections installation directory: [connections\_root](../plan/i_ovr_r_directory_conventions.md).

    2.  Create a backup of the WebSphere Application Server profile directory: [profile\_root](../plan/i_ovr_r_directory_conventions.md)

        **Note:** If Connections applications are deployed on separate profiles, archive each profile.

    3.  Create a backup of the profileRegistry.xmlfile that is located under [app\_server\_root/properties](../plan/i_ovr_r_directory_conventions.md).

    4.  Back up the local and shared data directories:

        -   [local\_data\_directory\_root](../plan/i_ovr_r_directory_conventions.md)
        -   [shared\_data\_directory\_root](../plan/i_ovr_r_directory_conventions.md)
7.  Back up the Shared Resources directory:

    -   Linux: [shared\_resources\_root](../plan/i_ovr_r_directory_conventions.md)
    -   Windows: [shared\_resources\_root](../plan/i_ovr_r_directory_conventions.md)
    **Note:** For shared and remote network file system requirements, be sure to review the footnotes for each supported operating system in the detailed [system requirements](https://support.hcltechsw.com/csm?sys_kb_id=2010cc82db30acd0a45ad9fcd3961971&id=kb_article_view).

8.  Back up the HCL Installation Manager data directory:

    **Note:** This step is necessary only if you are planning an in-place migration of Connections. That is, where you use the same systems to host the new deployment.

    -   Linux: /var/ibm/InstallationManager
    -   Linux \(non-root user\): /home/user/var/ibm/Installation Manager

        Where user is the account name of the non-root user.

    -   Windows: C:\\ProgramData\\IBM\\Installation Manager
    CAUTION:

    The Installation Manager's shared data directory needs to be backed up as well. If you need to go back to the older Connections installation after an upgrade, a conflict might occur if the IIM shared folder is not backed up and restored in parallel. The IIM relies on the data inside the shared folder to work correctly. If the version of Connections that IIM thinks is installed differs from the version of Connections that was restored on the file system, then IIM does not function correctly.

    Back up the following folder as follows:

    -   Windows 2016:
        -   C:\\IBM\\Installation Manager
        -   C:\\IBM\\IMShared
        -   C:\\ProgramData\\IBM\\Installation Manager
    -   Linux:
        -   /opt/IBM/InstallationManager
        -   /var/ibm/InstallationManager
        -   /opt/IBM/IMShared

9.  Back up any customized configuration files. For more information, see [Saving your customizations](c_configuration_changes_after_update.md).

    **Note:**  Most of the backup steps are covered in [Saving your customizations](c_configuration_changes_after_update.md), however, this procedure does not cover backing up security role mapping for users and groups. So be sure to back up security role mapping for users and groups before the servers are stopped. Otherwise, you have to start server again to back up this information.


**Parent topic:** [Getting ready for upgrading or updating](../migrate/t_prepare_migrate_upgrade.md)

