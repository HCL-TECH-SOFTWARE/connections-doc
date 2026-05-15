# Sizing the Kubernetes cluster {#concept_stw_v24_3mb .concept}

Before you start sizing Kubernetes, let's consider the needs of Component Pack, your operational specifics, master nodes versus worker nodes, and availability.

## Component Pack requirements {#section_w1x_kfc_jmb .section}

With Component Pack 8, it is possible that at some point you'll have both Elasticsearch 7 and OpenSearch installed while or until you are done with migration. If you are installing a fresh cluster, you will install only OpenSearch.

The rule of thumb for the full-blown production Kubernetes cluster is determined by whether or not you need high availability. If not, up to 1000 concurrent users, or one single node with **m5a.large** as master and three **m5a.2xlarge** nodes would do the job. For more than 1000 concurrent users, you must look into scaling specific pods, starting with Customizer, and rather than into scaling your environment.

## Operational considerations {#section_fv2_gg4_3mb .section}

You will be installing and upgrading different Component Pack \(and non-Component Pack\) services, which means that there will be points in time when instead of three pods there will be six up and running for the same service, while Kubernetes is, for example, upgrading it or reinstalling it.

It is also important to decide how different Kubernetes versions are going to be managed in the future. If you are managing your own Kubernetes cluster, you need to decide now if you will ever upgrade it yourself, or you will have to spin up a new cluster with a new version of Kubernetes, move your traffic there, and tear down the old one.

The first approach \(upgrading the Kubernetes cluster yourself\) requires more masters and workers since you need to have enough resources once one of the nodes goes down for upgrade.

The second approach \(migrating from one cluster to another and destroying the old one\) is more industry standard, and requires more resources only when you are migrating to the new version of Kubernetes. This approach is also much easier for operations, and in the majority of cases much faster.

## Masters versus workers {#section_j3g_qg4_3mb .section}

Master nodes, in general, never schedule any non-system pods \(they are exclusively used for scheduling anything running in kube-system namespace\). However, the number of pods scheduled on masters depends on the number of masters and number of workers. For example, each new master and worker in the cluster will be represented by multiple pods on each master. This means that the sizing of a master that will have one worker attached can be different from the sizing of a master that will be part of a cluster with 3 masters and 10 workers.

Worker nodes, in general, can be any type of node, depending on what workload you want to run on it. Workers don't have to be all the same – they can be sized differently, as Kubernetes will ensure that each worker is utilized based on own resources \(which is a function of the number of CPUs and the amount of memory versus the requirements for each pod's CPU and memory\).

## With or without high availability {#section_e4t_tg4_3mb .section}

If you can afford downtime for Component Pack, you can still run everything on one big machine \(single node cluster\).

!!! note 
    
    One machine is not advised for production environments, as the official recommendation is not to run more then 100 pods on a single node.

Perfect high availability would be at least three master nodes \(to ensure quorum\) and at least three infrastructure worker nodes \(three because of the default of three replicas for each pod\).

To understand what your cluster is really doing and how it is utilized, it is best to set up Prometheus and Grafana. \(If you are setting up the cluster using the [HCL-provided Ansible automation](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/README.md), you can get Prometheus and Grafana out of the box\). As previously mentioned, scaling specific pods helps a great deal more than adding one or more new servers: starving Customizer is still starving Customizer, even if you have 100 nodes.

## Guide to suggested topologies {#section_dpf_ftl_tnb .section}

To plan your Connections with Component Pack deployment, you can find detailed information in the [HCL Connections Sizing Guide](../../guide_me/how_to_guides/connections8_sizing_guide.pdf) on the HCL Software product documentation site.

Meanwhile, the following topics here provide some general information on single-node versus production-grade options.

-   **[Sizing Kubernetes for a single-node environment](../install/cp_install_sizing_for_single_node.md)**  
This topic offers best practices for sizing Kubernetes for the default installation of Component Pack for HCL Connections in a single-node environment.
-   **[Sizing Kubernetes for a production-grade cluster](../install/cp_install_sizing_for_production.md)**  
This topic offers best practices for sizing Kubernetes for a production-grade, high-availabliliy cluster.

**Parent topic:**[Prerequisites for Component Pack](../install/cp_prereqs.md)

