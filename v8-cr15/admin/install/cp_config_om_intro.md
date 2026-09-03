# Configuring the Orient Me component {#cp_config_om_intro. .concept}

<!--Additional configuration is required for the Orient Me component to populate it with Connections data and to enable the notification center and a menu option for managing home pages.-->

The Orient Me component is responsible for populating the Top Updates tab on a Connections user's homepage.  Once populated, this page will display cards representing the user's top activity stream updates.

<!--!!! note

    Orient Me is only supported in the Connections 7.0 user interface.-->

Follow the steps detailed in the following sections to configure the Orient Me component to share content with HCL Connections™.

-   **[Configuring the HTTP server for Orient Me](../install/cp_config_om_http_server.md)**  
Configure the IBM® HTTP Server to redirect users from the HCL Connections home page to the Orient Me home page.
-   **[Enabling profiles events for Orient Me](../install/cp_config_om_enable_profiles_events.md)**  
To enable Component Pack to access user accounts in HCL Connections, you must enable profiles events on your Tivoli® Directory Integrator \(TDI\) server and WebSphere® Deployment Manager.
-   **[Configuring the Top Updates home page](../install/cp_config_om_enable_notifications.md)**  
Configure the Notification Center so it works in concert with the data that users prioritize on the Top Updates tab on the user's home page.
-   **[Creating WebSEAL junctions for Orient Me](../install/cp_config_om_create_webseal_junctions.md)**  
For environments that use IBM Security Verify Access (formerly Security Access Manager), configure WebSEAL junctions for Orient Me.
-   **[Enabling and securing Cache Service traffic to Homepage](../install/cp_config_om_cache_service_traffic.md)**  
HCL Connections requires some additional configuration to know how to securely communicate with the Homepage.
-   **[Populating the Top Updates home page](../install/cp_config_om_populate_home_page.md)**  
Use the data migration tool to transfer data from Connections Profiles and Communities to populate the Top Updates tab on the user's home page.

**Parent topic:** [Configuring the Component Pack](../install/cp_config_intro.md)

