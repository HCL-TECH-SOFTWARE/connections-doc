# Kubernetes Runtime and Component Pack Middleware {#cp_kubernetes_runtime}

View the latest Kubernetes versions and platforms that are tested and supported for HCL Connections deployments using Component Pack.

For best results, customers should remain up-to-date on the latest HCL Connections and Kubernetes releases and be aware that HCL Connections provides all fixes on the latest release. Customers might be asked to upgrade to the latest HCL Connections release to assist with problem determination.

## Kubernetes platform support policy

HCL Connections 8.0 CRs are designed to run on any [Certified Kubernetes platform](https://www.cncf.io/certification/software-conformance), provided that the following statements are true:

- The Kubernetes platform is hosted on x86-64 hardware.
- The Kubernetes platform is officially supported by [Helm](https://helm.sh/docs/topics/kubernetes_distros/).

HCL tests Connections against a range of Kubernetes platforms that are regularly reviewed and updated with the intent of staying as up-to-date as possible. HCL does not test with every platform vendor or with every Kubernetes version, but HCL aims to cover a representative sample of popular Kubernetes implementations. 

## Supported Kubernetes platforms on full container deployment

The following lists the Kubernetes platforms that HCL tested and supports. This is provided for informational purposes to help guide deployment planning.

### Kubernetes platforms

- Kubernetes-native
- Amazon EKS
- Red Hat OpenShift on AWS / AWS EC2

!!! note

    Although all Kubernetes distributions should work with Connections because they are CNCF-compliant and the APIs are compatible, not all of them have been fully performance- or load-tested. As a result, some distributions may not meet expected performance standards in all scenarios

### Kubernetes version support policy

The table **Tested and supported Kubernetes versions** lists the Kubernetes versions that HCL tested and supports in HCL Connections CR releases.

Platform providers might release previews of upcoming Kubernetes versions. However, HCL does not provide support for those versions.
If you encounter an issue on an unsupported or untested Kubernetes version, you might be asked to install a supported level product.

!!! note

    The latest listed version of Kubernetes is based on containerd version 1.7.24. Other compatible middleware may function as expected. We recommend validating alternative configurations in your environment to ensure compatibility. If the configuration works, contact HCL Connections support to confirm whether it qualifies for ‘Other Configuration' support.

### Tested and supported Kubernetes versions

This table provides information about the Kubernetes versions that are tested and supported by HCL Connections CR releases. Review your chosen Kubernetes platform and ensure that it supports the following Kubernetes versions:

| **CR Level** | **Kubernetes Versions (1)** |**Support Level (2)** |
|--------------|-------------------------|-------------------------|
| CR13         | 1.34.3 <br> 1.34.1 <br> 1.33.1 <br>      | Supported Configuration <br> Other Configuration <br> Other Configuration|
| CR12         | 1.34.1 <br> 1.33.1 <br> 1.32.1 <br>      | Supported Configuration <br> Other Configuration <br> Other Configuration|
| CR11         | 1.33.1  <br> 1.32.1 <br> 1.31 <br>     | Supported Configuration <br> Other Configuration <br> Other Configuration <br>


### Containerd Versions
This table provides the containerd versions corresponding to the tested Kubernetes releases.

| **Containerd Version (1)** | **Kubernetes Versions (1)** |**Support Level (2)**|
|--------------|-------------------------|-------------------------|
| 1.7.29       | 1.34.3 <br> 1.34.1 <br> 1.33.1 <br>      | Supported Configuration <br> Supported Configuration <br> Supported Configuration <br> |
| 2.x          | n/a    | Unsupported Configuration | 

Additional details:

(1) Includes future minor releases

(2) For more details, refer to [HCL Connections Support Statement](https://help.hcl-software.com/connections/latest/admin/plan/r_install_support_statements.html).

!!! note

    - Connections strives to support the latest three versions of Kubernetes.
    - For Kubernetes versions classified as "Other Configuration," operation is expected to perform within the accepted bounds of reliability and function; however, if a problem arises, Support may request that the issue be reproduced on a supported configuration.
    - OpenShift and EKS may not always follow this support cadence and can lag behind the latest Kubernetes releases.

For additional information on the lifecycle of Kubernetes platforms, refer to the following resources:

- [Understand the Kubernetes version lifecycle on EKS](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html)

- [What version of the Kubernetes API is included with each OpenShift 4.x release?](https://access.redhat.com/solutions/4870701)

## Component Pack Middleware

This table provides information about the middleware components included and supported in the HCL Connections Component Pack.


!!! note

    For deployments using HCL Connections Component Pack 8.0 CR5 or above (new or upgraded), IBM WebSphere 8.5.5 Fix Pack 24 or above, which has an updated Java version, is required. Otherwise enabling SSL for Metrics will fail, as the Java version prior to Fix Pack 24 cannot open the keystore built by the newer Java.

|Component|Version|Product Minimum|Support Level|
|----------|-------|---------------|-------------|
|Calico|3.31.3 <br> 3.30 <br> 3.28|8.0 CR13 <br>8.0 CR11 <br> 8.0 CR8| Supported Configuration<br>Supported Configuration <br>Supported Configuration <br>
|HAProxy|3.1.3 <br> 3.0.3 <br> 2.6.6|8.0 CR10 <br> 8.0 CR8 <br> 8.0 CR2|Supported Configuration <br> Supported Configuration <br> Supported Configuration|
|Helm|3.19<br>3.15.3 <br> 3.11.3|8.0 CR12<br>8.0 CR8 <br> 8.0 CR3|Supported Configuration<br>Supported Configuration <br> Supported Configuration|
|MongoDB|7.0.28 <br> 7.0.12 | 8.0 CR12 <br>8.0 CR9 | Supported Configuration <br>Supported Configuration <br>
|NGINX|1.26|8.0 CR8| Supported Configuration|
|OpenSearch|2.19.2 <br>2.19.0 <br> 2.15.0 <br> 2.12.0 <br> 2.9.0 <br>|8.0 CR11 <br> 8.0 CR10 <br> 8.0 CR8 <br> 8.0 CR6 <br> N/A <br>|Supported Configuration <br> Supported Configuration <br> Supported Configuration <br> Supported Configuration <br> **Unsupported Configuration**|

!!! Important

    MongoDB 5 is no longer supported as of HCL Connections Component Pack v8.0 CR9 and must be upgraded to MongoDB 7.

**Parent Topic**: [Installing or upgrading Component Pack for Connections](../install/cp_install_config_intro.md)
