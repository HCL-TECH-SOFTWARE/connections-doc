# Sizing Kubernetes for a single-node environment {#concept_xv3_qh4_3mb .concept}

This topic offers best practices for sizing Kubernetes for the default installation of Component Pack for HCL Connections in a single-node environment.

If your decision is to go with a single-node environment \(so called all-in-one\) and default installation of the Component Pack \(installing all Component Pack offerings on a single machine running Kubernetes master and enabled to schedule non-system pods as well as a worker\), your system should have the following specifications:

-   At least 16 CPUs
-   At least 64G of RAM
-   At least 50G of disk space used for persistent volumes for OpenSearch, Customizer, and MongoDB.

If you are using AWS, we advise using the **m5a.4xlarge** type of instance.

**Parent topic:**[Sizing the Kubernetes cluster](../install/cp_sizing_kubernetes_container.md)

