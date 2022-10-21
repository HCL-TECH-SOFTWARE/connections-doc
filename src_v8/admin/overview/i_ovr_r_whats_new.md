# What's new in HCL Connections {#i_ovr_r_whats_new .reference}

Find out about features that are new or updated in this release of HCL Connections.

See the article [Update Strategy for HCL Connections v7.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0086997) **\(TBD\)** on the HCL Support site to obtain the latest updates for both Connections Server and Component Pack, including required critical updates.

Refer to the following for additional information:

-   **Download** Connections 8.0 from the HCL Software License & Download portal, and Component Pack 8 from Harbor.

**Attention:** Connections customers are given a transition period to upgrade their customization for the Connections 7.0 UI to the new Connections 8.0 UI. During the transition period, no defect fixes or enhancements will be made to the CNX 7.0 UI. Customers must plan to transition to the CNX 8.0 UI by HCL Connections 8.0 CR2. To switch to the 8.0 experience, see [Enabling the Connections 8.0 user experience](../migrate/enabling_cnx8_ux.md).

## What's New in HCL Connections 8.0 and Component Pack 8 {#section_hgz_3dy_clb .section}

**Technical optimization**

-   **System requirements**
    -   Refer to the [HCL Connections 8.0 System Requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654). Connections 8 requires Java 8, so you need to upgrade Security Directory Integrator 7.2 and Install Manager from 1.8.x to 1.9.x. For more information, see Upgrading Security Directory Integrator \(TBD\) and Upgrading Install Manager \(TBD\), respectively.
    -   For Component Pack 8, see [Prerequisites for Component Pack](../install/cp_prereqs.dita).
-   **Connections and Component Pack - automating your install and sizing your deployment**
    -   HCL's open-source GitHub documents provide details on setting up end-to-end automation to install Connections and Component Pack. The respective Git locations are:
        -   [Quickstart for setting up HCL Connections and Component Pack using Ansible automation](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/documentation/QUICKSTART.md)
        -   [HCL Connections and Component Pack automation scripts](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/README.md)
    -   [HCL Connections 7.0 Sizing Guide](https://help.hcltechsw.com/connections/v7/pdfs/connections7_sizing_guide.pdf): Provides sizing and deployment recommendations for both Connections and Component Pack, based on HCL performance tests and best practices learned and confirmed by multiple customers through time.
-   **Component Pack now supports \(TBD\):**
    -   Kubernetes 1.24
    -   Official support for Helm v3
    -   Amazon EFS for your automatic volume claims
    -   Amazon EKS for Component Pack deployments. Use native Amazon ECR as your image registry, Amazon EKS as your Kubernetes cluster, Amazon EFS for your automatic volume claims, seamlessly integrate with Amazon ELB by using native Nginx ingress controller, and much more.
    -   Using provided automation, Component Pack was never easier to deploy, upgrade, and monitor using Prometheus and Grafana, end to end, either in cloud or on your own server or servers.
    -   Easy integration of Prometheus JMX exporter with your Connections 7 stack and monitoring by Prometheus and Grafana running on your Kubernetes platform.
-   **Roadmap to Connections 8.0**
    -   For installation, see [Installing Connections](../install/c_installing.md).
    -   Component Pack for HCL Connections introduces several offerings that enhance collaboration and boost productivity. Refer to [Installing and upgrading Component Pack for Connections](../install/cp_install_config_intro.md).
        -   Upgrading to Component Pack 8 requires the replacement of MongoDB 3 with MongoDB 5, and Elasticsearch 7 with OpenSearch.

**Community surveys are no longer supported in Connections 8.0.**
:   Surveys will be replaced by Leap in an upcoming release.

## Promote your message using a site-wide banner {#section_us1_5vs_v5b .section}

Share important news and announcements within Connections using the administrative banner – the banner displays your message at the top of every Connections page for high visibility. Depending on your deployment, you can set it up through the app registry or using Feature Foundation. Refer to [Administering the display of a site-wide banner](../admin/admin_banner_onprem.md).

## Search from anywhere in Connections {#section_nd4_w23_dvb .section}

Looking for something? With the ever-present search box, you can search for people, communities, and content from any page within Connections.

-   **Saved history.** With just a click in the search box, you can rerun a recent search or quickly return to a page that you recently visited.
-   **Clear results.** With the new search results page, you can search wide or dig deep with a specific app, date, and other simplified filters, thus ensuring relevant results.
-   **Streamlined search.** When you're done with your search, close out the search results page so you're exactly where you left off before.

## More usable and intuitive {#section_qls_z23_dvb .section}

With the redesigned navigation bar, you can effortlessly find your way around Connections and accomplish your tasks more efficiently. Add in your own, most-used applications so they're always in reach.

Easier customization also lets you give your site an in-house feel! Tailor the look by replacing the default name "HCL Connections" and the logo with your own company branding.

## Increased collaboration with universal upload and share {#section_rtg_1f3_dvb .section}

Easily share the content that you're viewing, such as a blog post, inside Connections or through integrated services like Microsoft Teams. If you want to quickly share a specific file with someone, just click the upload button.

To learn more, see [Sharing in Connections](../../user/eucommon/c_eucommon_share.md).

## Quick access to important contacts {#section_omd_bf3_dvb .section}

Essential people and communities are never more than a click away with the Important To Me bar, available wherever you are in Connections. Clicking an avatar takes you straight to the community's landing page. Hovering on a person's avatar shows you shortcuts to connect and view the person's content, including their redesigned business card.

**Cloud Native Initiative**

Continuing on the path to drive down the total cost of ownership of Connections, specifically for the Component pack, HCL Connections now supports Amazon AWS, EC2, ECS, EKS, and Fargate, and Red Hat Open Shift.

**Interested in Connections Mobile?**

Check out the App Store for iOS or Google Play for Android for the latest information and release. Refer to [HCL Connections Mobile](https://help.hcltechsw.com/connectionsmobile/index.html) product documentation for additional information.

**What's new for end users**

For more information about new end-user features and functions in HCL Connections 8.0, see [What's new in HCL Connections?](../../user/eucommon/r_eucommon_whats_new.md)

