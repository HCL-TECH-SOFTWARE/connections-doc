# Configuring {#id_name .reference}

Configure paths, themes, backups, and modes of access. Add a link to the navigation bar, include a birthday widget, and customize labels for languages. You can personalize widgets, edit the HCL Connections proxy configuration for the iFrame widget and Clipping, configure the landing page, rebuild the search index, import and export XML files, and configure for Internet Explorer compatibility mode.

-   **[General configuration](../../connectors/icec/cec-inst-gneral-configuration.md)**  
After installing Connections Engagement Center you will see a configuration page. Here you can set up Connections Engagement Center configurations in your browser. If you want to make changes later, you can open the configuration page manually **https://<your\_server\>/xcc/admin** and edit your settings.
-   **[Mode configuration](../../connectors/icec/cec-inst-configure-modes.md)**  
Configure Connections Engagement Center for On Premises, Flyout, Community, Anonymous, or Mobile modes.
-   **[Changing the name of the LTPA cookie](../../connectors/icec/cec-inst-update-lpta-cookie.md)**  
The default LTPA cookie name is **LTPAToken2**. However, if you changed the name of the cookie when you configured HCL Connections, you must update HCL Connections Engagement Center with the new LTPA cookie name.
-   **[Adding a link to the HCL Connections navigation bar](../../connectors/icec/cec-inst-adding-link-header-nav.md)**  

-   **[People Birthday widget](../../connectors/icec/cec-inst-birthday-widget.md)**  
For the people birthday widget it is necessary to modify your HCL Connections Profiles configuration.
-   **[Customize labels for languages](../../connectors/icec/cec-inst-customize-labels-for-languages.md)**  
You can customize Connections Engagement Center labels for all languages that are supported by HCL Connections.
-   **[Edit personalization attributes](../../connectors/icec/cec-inst-edit-personalization-attributes.md)**  
You can change the personalization attributes to increase the usability for the Page Editor. You can reduce the number of personalization attributes, change the display name in the widget edit mode, and change the order of the attributes.
-   **[HCL Connections proxy configuration](../../connectors/icec/cec-inst-ibm-conx-proxy-config.md)**  
For the Clipping, IFrame, and ATOM/RSS Feed widgets it is necessary to configure the Connections Ajax proxy. Start the wsadmin client by completing the following steps \(the following example is for a windows server, for other operating systems please refer to the IBM documentation\).
-   **[Landing page configuration](../../connectors/icec/cec-inst-landing-page-config.md)**  
If you want to redirect all requests for the server root \(**https://<your\_server\>/**\) to Connections Engagement Center, you may use the following template for addition / modification of your httpd.conf file. **Please adjust this template according to your specific needs.**
-   **[Rebuilding the search index of HCL Connections](../../connectors/icec/cec-inst-rebuilding-search.md)**  
Connections Engagement Center is using HCL Connections API's heavily for its operation. This requires the HCL Connections search index to be intact and operating well.
-   **[Import and export of XML files](../../connectors/icec/cec-inst-import-export-xml.md)**  
It is possible to import and export Connections Engagement Center page configurations to and from XML files. This feature allows you to switch between different databases or to make a backup of your Connections Engagement Center database.
-   **[Internet Explorer compatibility mode](../../connectors/icec/cec-inst-ie-compatibility-mode.md)**  
To activate the Internet Explorer compatibility mode, two custom properties can be set in the Admin Dashboard.

**Parent topic:**[Installing and configuring Connections Engagement Center](../../connectors/icec/cec-inst-install_top.md)

