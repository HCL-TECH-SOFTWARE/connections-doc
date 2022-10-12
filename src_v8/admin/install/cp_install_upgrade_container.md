# Installation and upgrade {#cp_install_upgrade_container .concept}

Experienced customers can download a package to do an automated installation or upgrade of Component Pack for HCL Connections. It is best for new customers to read this introduction and at least initially to do the manual steps in this section to gain a better understanding of Component Pack.

## Ansible automation option provided by HCL {#section_lly_2sn_tnb .section}

Starting with version 7, HCL Software is providing Ansible automation tested in house as a preferred way of setting up Component Pack and its dependencies. If you don't have any experience with managing Kubernetes and its dependencies, or you simply want to see what the automation experience looks like, you can use the Ansible package to create your first single-node or distributed Component Pack cluster. This automation will, from Component Pack point of view, set up Kubernetes, kubectl, Helm, and execute all the steps needed to provide an out-of-the-box set up of Component Pack.

For more specifics on how to use the automation, see HCL's open-source GitHub for the documents [Quickstart for setting up HCL Connections and Component Pack using Ansible automation](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/documentation/QUICKSTART.md) and [HCL Connections and Component Pack automation scripts](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/README.md).

## Replacing Component Pack {#section_g34_mfp_tnb .section}

Component Pack runs on top of the Kubernetes, and for important data uses persistent storage. That storage lives, in a supported way, on NFS or Amazon EFS, if you are running stuff on Amazon, so your data should be already safe.

It is possible to simply recreate Kubernetes cluster and reinstall Component Pack and simply continue using it with the data as where you left it before you did it. Removing Component Pack and/or Kubernetes doesn't affect your data at all. Just don't remove the data.

In theory, you can have multiple Kubernetes clusters with multiple installations of Component Pack, and on Connections side, by manipulating httpd.conf in your IHS, you can decide to which one to point to. Just don't try to have multiple clusters using same PVs at the same time for the sake of data consistency and reliability.

## Installation and upgrade general approach {#section_anp_tfp_tnb .section}

You will notice that we are going to use the same commands to install or upgrade Component Pack. For upgrade, the Connections 7 baseline we use includes Kubernetes-based components, like Elasticsearch 7-based Metrics.

## Order of installation {#order_cp_install .section}

Perform the following steps chronologically, in the order that they appear in the list, to get your Component Pack deployment up and running:

|Installing Component Pack 8|Upgrading Component Pack 7 to 8|
|---------------------------|-------------------------------|
|1.  Install or upgrade HCL Connections
2.  Set up NFS
3.  Create the Connections namespace
4.  Add Harbor Helm repository
5.  Set up Helm charts
6.  Set up pod security policy
7.  Set up persistent volumes and persistent volume claims on NFS
8.  Run bootstrap
9.  Set up connections-env chart
10. Build MongoDB 5 image
11. Install infrastructure charts
12. Set up Customizer
13. Install OpenSearch
14. Set up community ingress
15. Set up Orient Me for OpenSearch
16. Set up Metrics for OpenSearch
17. Set up Microsoft Teams integration
18. Install community creation wizard and templates \(Tailored Experience\) charts
19. Set up Activities Plus
20. Set up Connections add-in for Microsoft Outlook

|1.  Install or upgrade HCL Connections
2.  Ensure that you have:
    -   NFS up and running
    -   A proper set of NFS folders with specific permissions, which are exported and mountable from all Kubernetes nodes
3.  Back up MongoDB data
4.  Back up Elasticsearch 7 data
5.  Set up OpenSearch and MongoDB volumes on NFS
6.  Add Harbor Helm repository
7.  Set up Helm charts
8.  Set up pod security policy
9.  Set up persistent volumes and persistent volume claims on NFS
10. Run bootstrap
11. Set up connections-env chart
12. Delete ingresses
13. Build MongoDB 5 image
14. Install infrastructure charts
15. Migrate MongoDB data
16. Set up Customizer
17. Install OpenSearch
18. Migrate ElasticSearch 7 data
19. Reconfigure Orient Me for OpenSearch
20. Reconfigure Metrics for OpenSearch
21. Set up community ingress
22. Set up Microsoft Teams integration
23. Install community creation wizard and templates \(Tailored Experience\) charts
24. Set up Activities Plus
25. Set up Connections add-in for Microsoft Outlook

|

For more information on each step, see [Steps to install or upgrade to Component Pack 8](cp_install_services_tasks.md).

-   **[Upgrade considerations for Component Pack 8](../install/upgrade_considerations.md)**  

-   **[Upgrade considerations for side-by-side migration of data](../install/cp_upgrade_considerations_for_side_by_side_migration.md)**  
If your Connections upgrade strategy requires a side-by-side migration, understand how that process applies to Component Pack.
-   **[Steps to install or upgrade to Component Pack 8](../install/cp_install_services_tasks.md)**  
Use these steps to help you install Component Pack 8 or replace Component Pack 7 with 8.

**Parent topic:**[Installing or upgrading Component Pack for Connections](../install/cp_install_config_intro.md)

