# Kubernetes Runtime {#cp_kubernetes_runtime}

View the latest Kubernetes versions and platforms tested and supported by specific HCL Connections Kubernetes deployments.

For best results, customers should remain up-to-date on the latest HCL Connections and Kubernetes releases and be aware that HCL Connections provides all fixes on the latest release. Customers might be asked to upgrade to the latest HCL Connections release to assist with problem determination.

## Kubernetes platform support policy

HCL Connections 8.0 CRs are designed to run on any [Certified Kubernetes platform](https://www.cncf.io/certification/software-conformance), provided that the following statements are true:

- The Kubernetes platform is hosted on x86-64 hardware.
- The Kubernetes platform is officially supported by [Helm](https://helm.sh/docs/topics/kubernetes_distros/).

HCL tests Connections against a range of Kubernetes platforms that are regularly reviewed and updated with the intent of staying as up-to-date as possible. HCL does not test with every platform vendor or with every Kubernetes version, but HCL aims to cover a representative sample of popular Kubernetes implementations. 

## Tested Kubernetes platforms on full container deployment

The following  lists the Kubernetes platforms that HCL tested and supports. This is provided for information only.

### Kubernetes platforms
- Amazon EKS
- Red Hat OpenShift on AWS / AWS EC2

### Kubernetes version support policy

The table **Tested and supported Kubernetes versions** lists the Kubernetes versions that HCL tested and supports in HCL Connections CR releases.

Platform providers might release previews of upcoming Kubernetes versions. However, HCL does not provide support for those versions.
If you encounter an issue on an unsupported or untested Kubernetes version, you might be asked to install a supported level product.

### Tested and supported Kubernetes versions

This table provides information about the Kubernetes versions that are tested and supported by HCL Connections CR releases. Review your chosen Kubernetes platform and ensure that it supports the following Kubernetes versions:


| **CR Level** | **Kubernetes Versions** |
|--------------|-------------------------|
| CR9          | Kubernetes 1.31         |
| CR8          | Kubernetes 1.30         |
| CR6/CR7      | Kubernetes 1.30         |

!!! note

    Connections strives to support the latest three versions of Kubernetes. However, please be aware that OpenShift and EKS may not always align with this support cadence and could lag behind the latest Kubernetes versions.


For additional information on the lifecycle of Kubernetes platforms, refer to the following resources:

- [Understand the Kubernetes version lifecycle on EKS](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html)

- [What version of the Kubernetes API is included with each OpenShift 4.x release?](https://access.redhat.com/solutions/4870701)



**Parent Topic**: [Installing or upgrading Component Pack for Connections](../install/cp_install_config_intro.md)
