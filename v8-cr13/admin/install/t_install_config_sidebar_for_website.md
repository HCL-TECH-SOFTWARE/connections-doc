# Integrating Connections Sidebar with a website {#t_install_config_sidebar_for_website .task}

Configure a web application on a company-managed server to be able to display the Connections Sidebar, so that your users can see their important updates without leaving the website.

Connections Sidebar is installed by the Connections installation program, so the Sidebar application is already running at the server location connections\_server/socialsidebar. To integrate the Sidebar application with a company web application, the Connections server and the server hosting the company application must have the same parent domain.

**Note:** This limitation is a function of the restrictions imposed by the cross-origin resource sharing \(CORS\) guidelines that web browsers must adhere to.

1.  To integrate Sidebar with your company web application, add the following JavaScript snippet to your application's HTML:

    ```
    <script id="social-sidebarbar-boot-script" src="https://connections.example.com/socialsidebar/hub/js/boot.js"></script>
    ```


**Parent topic:**[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

