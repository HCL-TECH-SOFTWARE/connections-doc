
# Pre-installation tasks

This section outlines tasks that need to be done before installation of HCL Connections Engagement Center (WebEngine) (CEC) using Helm.


!!! note
    
    The provided documentation implies that CEC is deployed in the same namespace as Component Pack.

This includes preparing your cluster to have proper access to application container images, storage classes, persistent volumes (PVs), creating database schemas, Lightweight Directory Access Protocol (LDAP) and Single Sign-On (SSO) for CEC deployment to work seamlessly.

- [Accessing container images and Helm chart](./access-images-chart.md)
- [Persistent volumes](./persistent-volumes.md)
- [Configuring IBM DB2](./configure-db2-database.md)
- [Configuring LDAP](./ldap-configuration.md)
- [Configuring Single Sign-On using LTPA](./sso-ltpa-configuration.md)
- [Configuring admin access](./admin-access-configuration.md)
