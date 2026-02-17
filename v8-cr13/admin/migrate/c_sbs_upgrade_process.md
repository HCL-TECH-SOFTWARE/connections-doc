# Sample roadmap for a side-by-side upgrade

The following roadmap is a guide to upgrading to HCL Connections 8.0 and to the latest CR by installing it in a new environment and then migrating data from your existing environment. In this example, the existing environment is Connections 7.0.

This approach can also be applied to upgrading to Connections 8.0 and to the latest CR from versions earlier than 7.0, in which case additional database schema updates would be required.

## Pre-installation tasks 

These are some key tasks before installing version 8.0 of Connections in the new environment. For more detail on these tasks, plus some that are optional, see the whitepaper.

To review all tasks that typically precede a Connections installation, see the [Pre-installation tasks](../install/c_preinstall_actions.md) section in this product documentation.

1.  Prepare to install software:
    -   Review the [software and hardware requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) for the system that will host Connections 8.0.
    -   Download Connections 8 and WebSphere Application Server v8.5.5 and the latest fixpack from the **[My HCLSoftware](https://my.hcltechsw.com/)**.
    -   Make sure that your servers contain enough free disk space for unpacking the installation files as well as keeping the platform operational.
2.  [Install IBM Security Directory Integrator](../install/t_prof_tdi_new_deploy.md), which is used to synchronize your LDAP information with Connections profiles.
3.  If you need to populate the Profiles database with people from your company's LDAP, you will use the Connections 8.0 wizards package and merge its default assembly line with your existing Connections 7.0 configuration. In this case take care to follow the steps in the *Populate the Profiles database* section of the whitepaper.
4.  [Create databases for Connections, XCC, and ESSAPPS \(IC360\)](../install/c_install_db_over.md).
5.  [Install IBM WebSphere Application Server](../install/t_install_was.md).
6.  Configure WebSphere security by choosing the LDAP and SSO settings that you used for Connections 7.0 as you follow the steps in [Setting up federated repositories](../install/t_inst_federated_repositories.md).

    **Note:** If you are making significant changes between your Connections 7.0 and Connections 8.0 security configuration, consider the dependencies described in [Considerations for a side-by-side upgrade](../migrate/c_sbs_upgrade_considerations.md).

7.  [Install and configure IBM HTTP Server](../install/t_create_webserver1_node.md).

## Installing Connections 8.0

See [Installing HCL Connections 8.0](../install/t_install_cluster.md), taking care to read the suggestions under *About this task*.

## Post-installation tasks 

1.  [Migrate 7.0 databases and update the database schema](t_sbs_migrate_data.md) (**if needed**).
2.  Use the sample steps in the whitepaper to guide you as you complete the remaining post-installation tasks that apply to your organization. These include the following tasks:
    -   Export and import Connections customizations and content shares
    -   Re-run synchronization of the Profiles database
    -   Migrate Connections configurations
    -   Clear scheduled tasks
3.  If you installed the Feature Foundation module during the Connections 8.0 installation, see the post-installation task [Post-installation tasks for PDF Export](../install/install-guide-preparations.md).
4.  If both Feature Foundation and Component Pack are part of your new deployment, and you want to deploy the Tailored Experience for communities, do the following:
    1.  Set up Tailored Experience for communities. See [Steps to install or upgrade to Component Pack 8 CR3](../install/cp_install_services_tasks.md).
    2.  [Configure the community creation wizard](../install/t_configure_community_wizard.md).
    3.  If Component Pack is included in your existing deployment, see [Upgrade considerations for side-by-side migration of data](../install/cp_upgrade_considerations_for_side_by_side_migration.md) in the Component Pack section of the Connections documentation.

**Parent topic:** [Side-by-side upgrades](../migrate/c_sbs_upgrade_container.md)

