# Installing and Configuring Collabora Online

HCL Connections introduces support for Collabora Online, bringing an enterprise-grade, high-fidelity document editing experience to the Files application. Serving as a modern alternative to HCL Docs, Collabora Online enables real-time viewing and co-authoring of office documents directly in your browser.

!!! important
    Collabora Online requires a new, separate entitlement for viewing and editing not included with standard HCL Connections licenses. Ensure your organization has acquired the required Collabora entitlement before proceeding with the setup.

Once your entitlement is active, refer to the following topics for information on installing and configuring Collabora Online:

- **[Collabora Online resource allocation and sizing guide](../install/t_collabora_online_resource_requirements.md)**

    Provides guidance on sizing and allocating resources for Collabora Online deployments. The topic covers recommended CPU, memory, and storage requirements based on the number of concurrent users, document types, and expected workloads. It also includes best practices for optimizing performance and ensuring a smooth user experience.    

- **[Installing Collabora Online](../install/t_inst_collabora_online.md)**

    Provides step-by-step instructions for installing HCL Enterprise Edition Collabora Online with HCL Connections 8.0 CR15 or later. The topic covers the prerequisites, Kubernetes namespace and secret preparation, Helm installation, HTTP server and WebSocket proxy configuration, Files integration, and deployment validation.

- **[Configuring Collabora Online](../install/c_config_collabora_online.md)**

    Explains how to configure Collabora Online in HCL Connections by using one of the supported setup options: configuring Collabora and Docs provider, configuring OAuth-based authentication, or central OIDC configuration.

- **[Editing files with Collabora Online](../install/t_edit_collabora_files.md)**

    Describes how users open, create, view, and edit supported office files in the browser. The topic covers inline and full-screen editing, real-time co-authoring, comments, file permissions, Collabora access requirements, authentication modes, and automatic session cleanup.

**Parent topic:** [Optional post-installation tasks](../install/c_optional_post-install_tasks.md)
