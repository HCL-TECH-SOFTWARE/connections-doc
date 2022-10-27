# Prerequisites for Component Pack {#cp_prereqs .concept}

On a very high level, to install and successfully run HCL Component Pack, you will need HCL Connections plus additional resources to satisfy the following requirements.

-   Fully functioning Kubernetes cluster or containerd as the container runtime, and support for persistent volumes.
-   Access to the HCL Harbor registry to pull images and Helm charts for your deployment.
-   One machine with kubectl, Helm installed and configured, and at least 50G of free space. This machine can be any machine in the cluster, but must be used exclusively for Component Pack installation, configuration, and upgrades.

For the supported versions of Kubernetes, Helm, and so on, see [HCL Connections 8.0 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654).

If you are new to Component Pack, and doing your first installation, you can choose to defer to the HCL-provided Ansible automation for setting up Component Pack and all its dependencies. For information on the automation, see HCL's open-source GitHub for the documents [Quickstart for setting up HCL Connections and Component Pack using Ansible automation](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/documentation/QUICKSTART.md) and [HCL Connections and Component Pack automation scripts](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/README.md).

## Supported Kubernetes platforms {#section_jtc_3z5_ylb .section}

How to install Kubernetes?
:   Official Kubernetes documentation and terminology distinguish between *learning* and *production* environments, and it is best if you follow their documentation on how to set up Kubernetes. Note that Component Pack needs to run in both learning and production environments.

:   You can also use the HCL-provided Ansible automation to install Kubernetes end to end.

Supported container runtimes
:   Component Pack for Connections was tested using containerd as the container runtime for Kubernetes. See the Kubernetes documentation for the [installation instructions for containerd](https://kubernetes.io/docs/setup/production-environment/container-runtimes/).

:   If you are setting up the cluster yourself, see [which containerd versions are supported by which version of Kubernetes](https://containerd.io/releases/#kubernetes-support) in the Kubernetes documentation.

Supported Kubernetes versions
:   See [HCL Connections 8.0 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654). Component Pack for Connections follows the same Kubernetes support pattern that Kubernetes itself is following.

    **Note:** Applications on which Component Pack relies, such as community ingress, have their own Kubernetes support pattern, and should be double-checked before beginning a Component Pack install or upgrade.

Supported Kubernetes flavors
:   Component Pack is designed to work with Kubernetes platforms that are using containerd as the container runtime. To ensure compatibility, all development and testing is done internally on the vanilla Kubernetes installations, without preference for any specific provider.

:   However, HCL is always working on optimizing the Component Pack experience, which includes lowering costs for our customers, and is therefore trying to ensure that some vendor-specific options are supported as well.

Supported Kubernetes network plugins
:   Component Pack is developed and tested using [Calico](https://docs.projectcalico.org/getting-started/kubernetes/) as the Kubernetes CNI, but you can use another CNI if it better suits your use case.

Support for persistent volumes
:   Component Pack uses [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) to store the data. Starting with version 7, HCL supports persistent volumes on NFS and on Amazon EFS using automatic volume claims.

Cluster layout considerations
:   Because Component Pack runs on Kubernetes, it can run on one or multiple servers, depending on how your Kubernetes cluster is set up.

    If you are considering a vanilla Kubernetes installation, for production it is best to have at least one master node and at least three workers. This layout can support up to 1000 concurrent users, and more if you scale Customizer properly. For more information on these requirements, see the section [Sizing the Kubernetes cluster](cp_sizing_kubernetes_container.md) and the [sizing guide for Connections and Component Pack](https://opensource.hcltechsw.com/connections-doc/v8/guide_me/how_to_guides/connections8_sizing_guide.pdf).

-   **[Sizing the Kubernetes cluster](../install/cp_sizing_kubernetes_container.md)**  
Before you start sizing Kubernetes, let's consider the needs of Component Pack, your operational specifics, master nodes versus worker nodes, and availability.

**Parent topic:**[Installing or upgrading Component Pack for Connections](../install/cp_install_config_intro.md)

