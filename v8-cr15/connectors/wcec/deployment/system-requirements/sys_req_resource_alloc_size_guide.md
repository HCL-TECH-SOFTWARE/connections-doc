
# CEC (WebEngine) - resource allocation and sizing guide


This section provides a simplified resource allocation and capacity sizing guide for planning container deployments of HCL Connections Engagement Center (CEC) (WebEngine).

We will be deploying only CEC (WebEngine) pod. The deployment of CEC (WebEngine) happens as part of the broader Digital Experience (DX) deployment using Helm for Kubernetes.

The resource metrics and operational baselines in this document are derived directly from standard out-of-the-box performance testing runs. Because database/LDAP latency, network topology, and homepage layout complexity vary across organizations, this document serves as a basic operational planning baseline for enterprises.

## Kubernetes

CEC is designed to run on any [Certified Kubernetes platform](https://www.cncf.io/certification/software-conformance), provided that the following criteria are met:

- The Kubernetes platform must be hosted on x86-64 hardware.
- The Kubernetes platform must be officially supported by Helm. For more information, see [Kubernetes Distribution Guide](https://helm.sh/docs/topics/kubernetes_distros).

Please refer to the [HCL Connections Kubernetes Runtime](https://help.hcl-software.com/connections/latest/admin/install/cp_kubernetes_runtime.html?h=kubernete) documentation for additional Kubernetes requirements and supported configurations.

## Core sizing unit ratio & pod profile

CEC (WebEngine) capacity planning is built on a single modular unit ratio:

**Each Standard Pod Replica uses the following baseline container allocation:**

- **CPU:** 2 Cores Request / 4 Cores Limit
- **Memory (RAM):** 4 GiB Request / 4 GiB Limit
- **Ephemeral Storage:** 2 GiB Request / 5 GiB Limit

!!! note
    - Capacity is scaled modularly by adding identical pod replicas rather than resizing individual pods.

    - All the following CPU sizings relate to an environment with 2nd generation Intel Xeon scalable processors (Cascade Lake 8223CL) or 1st generation Intel Xeon Platinum 8000 series (Skylake 8124M) processors.

!!! warning
    You can increase these values to meet the requirements of your environment. For production deployments, adjust them as needed to support your expected workload and scale. The values shown here are the recommended default settings for starting CEC.

## Active Concurrent Users and calculation

Resource calculations are based on **Active Concurrent Users (CUs)** rather than total registered user accounts.

An **Active Concurrent User (CU)** represents a user who is actively browsing or interacting with engagement center homepages simultaneously at peak moments.

**To calculate the required pod replica count for your target peak load:**

```
Required Pods = ⌈Peak Active Concurrent Users ÷ 100⌉
```

(Divide your peak Active Concurrent Users by 100 and round up to the nearest whole integer).

## Multi-pod sizing quick reference

The table below illustrates aggregate cluster resource allocations scaled linearly from the single-pod baseline (100 CUs per pod):

| Active Concurrent Users (CUs) | Required Pod Replicas | Aggregate CPU Cores (Request / Limit) | Aggregate RAM |
| --- | --- | --- | --- |
| 100 CUs (Base Unit) | 1 Pod | 2 Cores / 4 Cores | 4 GiB |
| 200 CUs | 2 Pods | 4 Cores / 8 Cores | 8 GiB |
| 300 CUs | 3 Pods | 6 Cores / 12 Cores | 12 GiB |
| 500 CUs | 5 Pods | 10 Cores / 20 Cores | 20 GiB |
| 1,000 CUs | 10 Pods | 20 Cores / 40 Cores | 40 GiB |

## Databases

The only supported database for CEC deployments is **DB2 Standard and Advanced Edition v11.5*.

For information about supported LDAP servers, web browsers, and other platform prerequisites, refer to the HCL Connections 8.0 CR14 Server System Requirements.
