# Troubleshooting tips {#ts_c_ts_tips_overview .concept}

Review the topics in this section to see if your issue is addressed. Or consult the error logs to find information about the error you are seeing.

-   **[HCL Connections log file](../troubleshoot/c_log_file.md)**  
HCL Connections™ writes messages to the SystemOut.log file. Refer to this file if you encounter errors after installing an Connections application or if you encounter unexpected behavior in an application.
-   **[Troubleshooting connection timeouts when running a wsadmin script](../troubleshoot/r_troubleshooting_timeouts.md)**  
Running a wsadmin administrative script that calls an MBean in a network deployment environment results in several connections between sever processes, such as the deployment manager, the node agent, and the cluster member using Java™ Management Extensions \(JMX\) connectors. Some HCL Connections™ administrative scripts can run for longer than the default connection timeout that is specified for the connector that is used.
-   **[Troubleshooting a database connection](../troubleshoot/t_validate_db.md)**  
A faulty JDBC driver or data source can prevent you from accessing an HCL Connections™ application. To troubleshoot and correct these problems, test the database connections.
-   **[Troubleshooting file download and page display issues](../troubleshoot/r_troubleshoot_file_download_and_page_display_issues.md)**  
Enabling ESI cache in IHS will have an adverse affect on HCL Connections™ 6.0 causing some features to fail. Therefore, Edge Side Include \(ESI\) cache in IHS should be disabled for Connections 6.0.
-   **[Troubleshooting display problems](../troubleshoot/t_troubleshooting_ie_high_security.md)**  
Microsoft™ Internet Explorer versions 7 and 8 browsers with security set to high do not display HCL Connections™ properly. You must either reduce the browser security level or change browser settings.
-   **[Troubleshooting email digests](../troubleshoot/c_ts_email_digests.md)**  
You can verify that email digests are working as expected by accessing specific HCL Connections™ URLs to trigger the email digests to be sent to the current user. You can also trigger email digests to be sent to the next available tranche of users.
-   **[Troubleshooting Help](../troubleshoot/t_troubleshooting_product_help.md)**  
Find out how to resolve problems accessing the product help.
-   **[Troubleshooting inter-server communication](../troubleshoot/t_troubleshooting_server_communication.md)**  
If you are having problems establishing communication between servers in your deployment, this might be because a server's URL is not configured correctly in the LotusConnections-config.xml file.
-   **[Troubleshooting Component Pack](../troubleshoot/admin_troubleshoot_comp_pack.md)**  
If you encounter issues when using the Component Pack, refer to these troubleshooting tips or consult the HCL Support database for recent tech notes or HCL Support for recent articles.®
-   **[Troubleshooting network shares on Windows 2003](../troubleshoot/ts_t_network-shares_WIN-2003.md)**  
Windows® 2003 returns network errors when accessing shared content.
-   **[Collecting communities catalog troubleshooting data](../troubleshoot/r_troubleshoot_collect_comm_cat.md)**  
Collect communities catalog data to help HCL Support diagnose catalog problems.
-   **[Troubleshooting Search](../troubleshoot/c_ts_search.md)**  
If you experience indexing issues, consider validating Search seedlists to help you identify the source of the problem. You can also configure settings to avoid out-of-memory issues or other problems caused by long response times from the Search application.
-   **[Troubleshooting OAuth errors](../troubleshoot/r_troubleshooting_oauth_errors.md)**  
 OAuth is used to manage the list of client applications that are allowed to prompt users for access to their HCL Connections™ data.
-   **[Troubleshooting SAML 2.0](../troubleshoot/r_ts_saml2.md)**  
Review the topics in this section to see if your issue is addressed.
-   **[Troubleshooting single sign-on problems with Domino](../troubleshoot/ts_t_SSO_Domino.md)**  
Troubleshoot problems when using single sign-on \(SSO\) with Domino® Directory.
-   **[Troubleshooting Security Directory Integrator](../troubleshoot/ts_t_check_tdi.md)**  
If you experience problems when using IBM Security Directory Integrator to work with Profiles data, explore the different trace areas available for Profiles to find information that might help to identify and resolve the problem.
-   **[Troubleshooting user data propagation](../troubleshoot/ts_c_troubleshoot_user_lifecycle.md)**  
If you experience problems related to user data propagation, enable traces in the IBM® WebSphere® Application Server so that you can access detailed information about the processes involved in propagating updates. You can use this information to help you verify if the processes are working as expected.
-   **[Troubleshooting virus scanning](../troubleshoot/r_troubleshooting_virus_scanning.md)**  
Find out some of the common causes for scanning-related error messages.
-   **[Troubleshooting media views and thumbnail generation](../troubleshoot/r_troubleshooting_media_thumb.md)**  
 The Files application provides a grid view to show thumbnails for files of various formats. When a user uploads, updates, or views a file, a thumbnail is generated \(provided a thumbnail is available for the file\). However, this solution does not work with existing files. You can use the global feature flag `<genericProperty name="filesMediaView">enabled</genericProperty>` to control whether the grid view is displayed when users upload, update, or open a file. Use the Files MBean FilesThumbnailService.generateForAllFiles\(\)command to modify `createThumbnail event` so that the thumbnail also displays existing files.

**Parent topic:**[Troubleshooting and support](../troubleshoot/ts_c_welcome.md)

