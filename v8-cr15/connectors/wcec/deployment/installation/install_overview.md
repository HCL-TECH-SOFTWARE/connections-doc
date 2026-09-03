# Installing and configuring CEC (WebEngine)



This section guides you through the process of deploying and configuring the HCL Connections Engagement Center (WebEngine) component on your Kubernetes cluster using Helm.



This phase assumes that all **[prerequisites and preparatory tasks](../prepare-installation/preinstall_overview.md)**, including the detailed configuration of your NFS server, database schemas, LTPA secrets, LDAP settings, and other environment-specific parameters, have been successfully completed. The information gathered during these preparatory steps will be used to populate your Helm chart's `values.yaml` file during installation.



The installation process is primarily divided into these key areas:

- **[Database Configuration](./database-configuration.md)**

    Configure the external DB2 database connection for CEC (WebEngine) using Helm `values.yaml` settings.

- **[Networking Configuration](./networking-configuration.md)**

    Refer to this section for detailed guidance on configuring network access and ingress for your CEC deployment, including necessary `values.yaml` parameters.

- **[Single Sign-On Configuration](./sso-configuration.md)**

    Configure Single Sign-On (SSO) for your CEC deployment, including necessary `values.yaml` parameters.

- **[Enabling and Disabling Applications](./enabling-disabling-applications.md)**

    Consult this section for instructions on enabling or disabling specific CEC applications during or after deployment, typically via Helm chart customization.

- **[Installation using Helm](./installation-helm.md)**


    This section details how to execute the Helm commands to deploy WebEngine, including instructions on customizing the deployment via the `values.yaml` file to incorporate your specific environment configurations (for example, database, LDAP, SSO, networking).

