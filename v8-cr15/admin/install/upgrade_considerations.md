# Upgrade considerations for Component Pack 8 {#upgrade_considerations .concept}

The upgrade path described in [Steps to install or upgrade to Component Pack 8](cp_install_services_tasks.md) is based on a given set of components, versions, and goals. Consider the following information when deciding how best to upgrade based on your deployment and needs.

## Side-by-side vs. in-place {#section_jch_yrx_bvb .section}

You can upgrade to the latest CR release for HCL Connections 8.0 by doing either a side-by-side or an in-place upgrade. The approach described in [Steps to install or upgrade to Component Pack 8](cp_install_services_tasks.md) focuses on upgrading Connections 7 to 8 on the same set of machines. This involves an in-place upgrade of an existing Kubernetes environment by touching file shares, and Helm release and charts.

If your upgrade strategy requires a side-by-side migration on a mirrored set of both WebSphere and Kubernetes machines, you can still use the installation document. The difference between the two approaches is the transfer of data from source to destination system.

For a side-by-side migration, these would be the steps:

- Set up a mirrored WebSphere system with the same version as the source system
- Migrate or switch file shares and databases
- Migrate Connections or Docs configuration between the two systems
- In-place upgrade of the mirrored WebSphere Application Server \(set\) by touching the database, WebSphere, HTTP Server components, and Connections
- Set up a mirrored Kubernetes system with the same version as the source system
- Migrate or switch file shares \(PVs\) between the two systems
- In-place upgrade of the mirrored Kubernetes environment by touching file shares, and Helm release and charts

For more information, see [Upgrade considerations for side-by-side migration of data](cp_upgrade_considerations_for_side_by_side_migration.md).

## Docker {#section_qcg_btx_bvb .section}

**Note:** This step applied only when upgrading from Connections 7 to 8. For current Connections 8 environments (CR → CR updates), no action is required.

To deploy Component Pack, we use the Harbor container registry. Modify the reference according to your environment. When provisioning Component Pack 8 to the latest CR version, you can empty your local Docker repository or manually delete all Connections 7 components before starting the upgrade to the latest Connections 8 CR.

## Switch container runtime {#section_sqh_ktx_bvb .section}

**Note:** The Docker → containerd migration applies only to upgrades from Connections 7 to 8 and older Kubernetes versions (around 1.24). For updates between Connections 8 CRs, containerd is already the default runtime, and the `--network-plugin` flag does not need to be removed. Since the container runtime switched from Docker to containerd, there is a possibility that all pods may show status as 'ImagePullBackOff'.

Ensure containerd is up and running on Kubernetes master and worker nodes. Follow the steps in [migrating from Docker to containerd](https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/change-runtime-containerd/).

Before upgrading from older Kubernetes versions (such as 1.24), remove the `--network-plugin` flag from `/var/lib/kubelet/kubeadm-flags.env`; otherwise, the kubelet may fail to start after the upgrade. For details, view the [GitHub issue](https://github.com/kubernetes/website/issues/33640).

## Kubernetes {#section_avm_v5x_bvb .section}

If your Component Pack services run on an unsupported Kubernetes version, upgrade to a supported version before moving to the latest CR version of Connections 8.0. Refer to [Kubernetes Runtime and Component Pack Middleware](https://help.hcl-software.com/connections/latest/admin/install/cp_kubernetes_runtime.html).

## Kubernetes-based services {#section_ay1_5vx_bvb .section}

During the installation scenario, we will upgrade our Kubernetes stack to the newest Connections Component Pack release. This will impact the cpmaster.example.com machine, which runs the containerized modules.

## Helm {#section_bqv_2vx_bvb .section}

See [Kubernetes Runtime and Component Pack Middleware](https://help.hcl-software.com/connections/latest/admin/install/cp_kubernetes_runtime.html).

## OpenSearch {#section_wsm_gvx_bvb .section}

**Note:** Switching from Elasticsearch 7 to OpenSearch was required when upgrading from Connections 7 to 8. For updates between Connections 8 CRs, OpenSearch is already the default backend, and no migration steps are needed.

Connections 8.0 CRs define OpenSearch as the default backend for Orient Me, search, and Metrics—this is what we will deploy and configure in our installation scenario. Previous Connections releases used Elasticsearch 7, which is no longer needed.

**Note:** If Metrics is already deployed and data has been collected, and you do not want to start Metrics from scratch, you will need to migrate the existing data into the new release. [Steps to install or upgrade to Component Pack 8](cp_install_services_tasks.md) covers both scenarios.

**Parent topic:** [Installation and upgrade](../install/cp_install_upgrade_container.md)


