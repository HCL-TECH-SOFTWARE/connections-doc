# Upgrade considerations for side-by-side migration of data

If your Connections upgrade strategy requires a side-by-side migration, understand how that process applies to Component Pack.

Side-by-side migration differs from the approach in [Steps to install or upgrade to Component Pack 8](cp_install_services_tasks.md) in that, with two server clusters side by side, the data on the production cluster can be transferred to the new cluster before switching over, decreasing system downtime. Otherwise, the steps to upgrade Component Pack are similar to the sample steps for upgrading on one cluster.

Side-by-side migration makes particular sense in certain cases, such as upgrading the whole Kubernetes cluster from a very old version to the latest one, upgrading the underlying container runtime engine, or migrating from one CRI \(container runtime interface\) to another.

This page describes, at a high level, what makes a Component Pack setup successful, so that you can plan your side-by-side migration accordingly.

Recall that Component Pack for HCL Connections is a set of applications grouped together as pods which can be, but don't have to be, dependent on each other. However, the following things must happen for a setup to work:

- All components of Component Pack are installed in same namespace.
- Values in different config maps that Component Pack is using are properly configured and properly pointing to your Connections cluster.

On the Connections side, all communication with Component Pack is configured exclusively in httpd.conf on the IBM HTTP Server you are using.

## Credentials and certificates {#section_yrp_jzr_lpb .section}

To enable pods to authenticate to the Docker Registry, the credential with the name myregkey needs to exist inside the namespace in which you are going to install Component Pack. This credential will be used by all pods to authenticate to the Docker Registry \(or any alternative that you are using\) to download the images.

By installing the bootstrap pod, you are creating certificates for MongoDB and OpenSearch \(and a couple other things\). This ensures that each installation has a unique set of certificates, and eases the process of recreating certificates.

## Data Persistence {#section_pfr_lcs_lpb .section}

Component Pack uses persistent volumes for keeping important data. According to the Kubernetes documentation, persistent volumes are mapped to NFS, which means that, as long as the data exists in NFS, it is possible to recreate the cluster without losing anything. See [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) in the Kubernetes documentation.

Persistent volumes are created statically for all Component Pack versions.

## Component Pack configuration {#section_r2j_rcs_lpb .section}

Component Pack configuration lives in the config maps in the namespace where Component Pack is installed \(by default the name of the namespace is connections\).

Values of config maps are passed to pods during pod creation, which means that if you change the value in any of the config map manually, you need to restart all the pods which are depending on the values that you changed.

For more information, see [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) in the Kubernetes doc.

## Migrating Component Pack to a new Kubernetes cluster {#section_wxk_2ds_lpb .section}

Based on all of these considerations, the process to move Component Pack from one Kubernetes cluster to another is as follows:

- Create a separate Kubernetes cluster.
- Ensure that you have the network level access and DNS resolution properly set for the Connections cluster to which you will point your Component Pack.
- Prepare the NFS that you will use to set persistent volumes. Don't use the same NFS paths \(you can use the same NFS server of course\) that your production Component Pack installation uses.
- Create the namespace in your new Kubernetes cluster and add the myregkey credential.
- Create persistent volumes and persistent volume claims - PV\(C\)s - using the Helm charts provided for that.
- Run bootstrap – ensure that it passed, and that it connected successfully to your Connections cluster and imported certificates so it could set up Cache Service properly.
- Install all the charts as you installed them on the previous cluster.

Once the process is complete, you have a second Kubernetes cluster pointing to the Connections cluster, but the data still lives in the first Kubernetes cluster, which is still used by Connections for serving requests, as in this diagram:

![Two Component Pack clusters with second pointing to first Connections cluster](cp_install_side_by_side.jpg)

## Different approaches for migrating data {#section_hfp_vds_lpb .section}

The most important thing for migration is to understand how your PV\(C\)s are configured, and what happens when you delete Helm charts.

Understanding how PV\(C\)s are configured:
In brief, if you used HCL's stock Helm charts for creating PV\(C\)s, removing the charts, and hence removing PV\(C\)s, will not result in loss of physical data, which is still stored in NFS.

You can also have different PV\(C\)s stored in totally different NFSs. To understand why, see [Adding and removing NFS persistent volumes](https://help.hcltechsw.com/connections/v65/admin/admin/cp_admin_pv_mng_add_rmv.html).

Moving data between PVs:
There are two types of data that you eventually want to migrate: MongoDB and Elasticsearch.

You can approach the move in two different ways:

1. Migrate NFS data from one NFS server to another, or migrate the PVs from one server to another.
2. Migrate MongoDB and Elasticearch data from one cluster to another using data migration tool \(for example, use [mongodump](https://www.mongodb.com/docs/database-tools/mongodump/#std-label-mongodump) for MongoDB.  For Elasticsearch, the [snapshot API](cp_migrate_data_from_es7_to_opensearch.md).

## Completing the migration

The last two high-level steps to finalize migration are to do the following steps:

- Repoint your front-end proxy, for example Nginx, to the new cluster.
- Change your routes in httpd.conf on your IBM HTTP Server to point to the new cluster.

On the next restart/reload of your front-end proxy and IBM HTTP Server, you will be using the new cluster.

**Parent topic:** [Installation and upgrade](../install/cp_install_upgrade_container.md)
