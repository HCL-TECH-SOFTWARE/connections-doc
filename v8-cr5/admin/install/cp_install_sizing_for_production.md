# Sizing Kubernetes for a production-grade cluster {#concept_z3z_cn4_3mb .concept}

This topic offers best practices for sizing Kubernetes for a production-grade, high-availabliliy cluster.

For production and high availability, you should have the following machines:

-   At least three master nodes
-   At least three non-infrastructure worker nodes

**Note:** This number of nodes ensures only "by the book" high availability of all services. As described in the preceding topic, one master node would still work fine, but you would not have high availability.

## Sizing the masters {#section_uzv_mt4_3mb .section}

**Important:** The following guidance is in line with best practices and the official Kubernetes recommendation. Note that master sizing is a function of the number of total nodes in the cluster and the number of users or requests that are going to come to the cluster. More active users mean more requests, and more requests mean more processing for a master.

For the optimal production scenario, we recommend at least three masters.

**Note:** Before you create your environment, be sure that you provision your cluster in a way that it can scale, so that you'll be able to add more nodes of any type later.

|Maximum Number of Nodes in Cluster|Resource Requirements|AWS Equivalent|
|----------------------------------|---------------------|--------------|
|[Up to 100 nodes](https://kubernetes.io/docs/setup/best-practices/cluster-large/) \(Kubernetes documentation\)|2 CPUs, 8G of RAM, 100G disk space|M5a.xlarge|

## Sizing the workers {#section_g45_mfw_3mb .section}

Sizing any type of workers is a function of what you are going to run there and the sum of the limits of all those containers.

To run all the services shipped with Component Pack, we suggest at least three workers \(each running one replica of each pod\) with at least 8 cores and 32G of RAM \(AWS equivalent would be the m5a.2xlarge type of instance\). Remember that we are sizing for the scenario when everything is running using 100% capacity, not for the scenario to simply start the services without any load.

## Sizing the storage {#section_ggh_zfw_3mb .section}

Persistent volumes are a firm requirement for Component Pack, but even without it, nodes need disk space for caching the images and maintaining normal system operation.

For normal system operation, it is best for each master to have at least 100G of dedicated disk space, and for each worker at least 150G of dedicated disk space.

For persistent volume storage \(used for OpenSearch, Customizer, and MongoDB\), at least 200G of storage is suggested.

**Parent topic:**[Sizing the Kubernetes cluster](../install/cp_sizing_kubernetes_container.md)

