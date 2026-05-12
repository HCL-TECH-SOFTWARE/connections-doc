# Setting up and configuring a WAS proxy server for long poll testing 

HTTP long polling can be used to push updates to a web client. A connection is held open between the web client and the web server so that when the server has new information it can push it to the client. That connection is then closed. For Connections Social Cloud, a WebSphere® Application Server \(WAS\) proxy server must be used to test this function.

-   **[Setting up a WAS proxy server for long polling](../secure/t_admin_setting_up_WASProxy_t.md)**  
Long polling is a technique used to push updates to a web client. A connection is held open between the web client and the web server so that when the server has new information, it can push it to the client. That connection is then closed. A new connection is then established between the client and the server and the client then waits for another update from the server. A WebSphere Application Server \(WAS\) proxy server is needed for long polling for a target of between 15,000 and 20,000 users.
-   **[Setting up a new proxy core group](../secure/t_admin_setting_up_ProxyCoreGroup_t.md)**  
It is necessary to separate the WebSphere Application Server \(WAS\) proxy server and the PushNotificationClusters into different core groups to ensure that requests for the PushNotificationClusters do not get routed to the HTTP Server \(IHS\) simultaneously.
-   **[Tuning the WAS proxy server for long poll](../secure/t_admin_tuning_WASProxy_t.md)**  
The proxy server must be tuned to allow for the high number of connections in the long poll test scenario.

**Parent topic:** [Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

