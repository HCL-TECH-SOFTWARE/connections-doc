# Installing or upgrading Component Pack for Connections {#cp_install_config_intro .concept}

Component Pack is now deployed through Harbor, an open-source container and Helm registry hosted by HCL for the Component Pack build. It simplifies deployment compared to the approach in previous releases, which involves using a zip file and a local Docker registry.

When you install or upgrade Component Pack, you will need to add the HCL Harbor repository to your Helm CLI so that you can pull container images and Helm charts for your deployment directly from Harbor. For more information on the steps you need to perform for installation or upgrade, see [Installation and upgrade](../install/cp_install_upgrade_container.md).
    
Customers with credentials to access Connections in the [My HCLSoftware](https://my.hcltechsw.com/) may apply those credentials to access Harbor.

Component Pack for HCL Connections introduces several offerings that enhance collaboration and boost productivity. Read on to understand the offerings, what resources Component Pack requires, some sizing considerations for Kubernetes, and information on automating installation or upgrade.

To see what's new in Component Pack 8 CR3, see [What's New in HCL Connections](../overview/i_ovr_r_whats_new_cr1.md).

-   **[Component Pack offerings](../install/cp_install_offerings.md)**  
The Component Pack for HCL Connections introduces new connectivity capabilities that enhance collaboration and boost productivity.
-   **[Overview of Component Pack architecture](../install/cp_over_intro.md)**  
Component Pack for HCL Connections™ is both designed and deployed upon a different software stack from Connections. Therefore, it requires a separate hardware infrastructure.
-   **[Prerequisites for Component Pack](../install/cp_prereqs.md)**  
On a very high level, to install and successfully run HCL Component Pack, you will need HCL Connections plus additional resources to satisfy the following requirements.
-   **[Installation and upgrade](../install/cp_install_upgrade_container.md)**  
Experienced customers can download a package to do an automated installation or upgrade of Component Pack for HCL Connections. It is best for new customers to read this introduction and at least initially to do the manual steps in this section to gain a better understanding of Component Pack.
-   **[Configuring the Component Pack](../install/cp_config_intro.md)**  
Configure the offerings and related components in the Component Pack for HCL Connections™.
-   **[Customizing email notifications using the app registry](../install/cp_t_customize_email_notifications.md)**  
If Component Pack for HCL Connections™ is installed in your deployment, you can use the app registry to change the look and content email notifications and newsletters, making them particular to your organization.
-   **[Integrating with other apps](../install/cp_3p_integrate_with_other_products.md)**  
With Component Pack for HCL Connections, you can deploy microservices for apps that create points of integration between Connections and other products.
-   **[Troubleshooting Component Pack installation or upgrade](../install/cp_install_troubleshoot_intro.md)**  
If you encounter issues when installing or deploying the Component Pack images, see the [Troubleshooting Component Pack guide](https://opensource.hcltechsw.com/connections-doc/guide_me/how_to_guides/troubleshooting_cnx_cp.pdf) on the HCL Software product documentation site, or consult [HCL Support Services](https://support.hcltechsw.com/) for recent tech articles on Component Pack.
-   **[Uninstalling Component Pack](../install/cp_install_uninstall.md)**  
Follow these steps to remove the Component Pack services from your Connections deployment.

**Parent topic:** [Administering Connections 8.0](../welcome/welcome_admin.md)

