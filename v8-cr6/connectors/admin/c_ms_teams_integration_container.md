# Integrating Connections and Microsoft Teams {#c_ms_teams_integration_container .concept}

Enabling support for Microsoft Teams integration with Connections is an optional task. Enable this support only if your organization is using Microsoft Teams.

The Microsoft Teams integration supports a number of use cases, some of which require the deployment and configuration of accompanying microservices and some of which are enabled via app registry extensions.

## Integrations available within the Microsoft Teams interface {#section_grx_3hx_5nb .section}

From Microsoft Teams, users can:

-   Select and display Connections content in the tabbed UI of a channel \(commonly referred to as a tab app integration\). See Table 1 for microservice dependencies.
-   Select and post links to Connections content in the message conversation of a channel or personal chat \(commonly referred to as the messaging extension integration\). See Table 1 for microservice dependencies.

## Integrations available within the Connections interface {#section_st1_bjx_5nb .section}

From Connections, users can:

-   Share a link to content while viewing a Connections content page using the Teams button shown on the Connections page \(this feature is commonly referred to as Sharing to Teams\). This integration is delivered through Component Pack's Customizer app and relies on a Customizer extension in the app registry that references a custom Javascript file in the /pv-connections/customizations directory structure. See Table 1 for microservice dependencies.
-   Start a one-to-one chat from the Connections business card, user profile page, or Important to Me bubble on the social home page \(this feature is commonly referred to as chat integration\). These integrations rely on extensions defined in the app registry but have no dependencies on microservices or custom files.

## Microservices for integrations {#section_rj4_wjx_5nb .section}

The Microsoft Teams integration includes the following microservices which are provided in the Connections Component Pack installation package. See the topic on [installing/updating Component Pack services with Microsoft Teams integration](../../admin/install/cp_install_services_tasks.md) for details of installing and configuring these services.

|Service Name|Description|App Requiring Service|
|------------|-----------|---------------------|
|teams-tab-ui|Responsible for providing the UI where the user chooses which content should be shown in a new channel tab. Responsible for providing the content to the Teams iframe, which is used to render the content in a channel tab.|tab app integration|
|teams-tab-api|Responsible for authentication process and fetching the Connections content to be rendered in the Teams tab iframe.|tab app integration|
|teams-share-ui|Responsible for rendering the UI where the user chooses the recent history or file content to which they want to share a link in the conversation.|messaging extension integration|
|teams-share-service|Responsible for authentication process and handling bot interactions with MS Teams and posting a card, with a link to the Connections content, in the conversation stream.|messaging extension integration|

## Microsoft Teams integration roadmap {#section_zrg_klx_5nb .section}

The following tasks are required to enable all of the Microsoft Teams integration features. It is best to complete them in the order provided.

1.  [Enable the app registry extensions for Microsoft Teams integration](t_ms_teams_enable_reg_ext.md)
2.  [Enable Connections to use the app registry service](t_ms_teams_enable_conn_use_appreg.md)
3.  [Configure SSO between Microsoft Teams and Connections](t_ms_teams_configure_sso.md)
4.  [Configure an Azure app to support the Microsoft Teams app](t_ms_teams_config_azure_app.md)
5.  Deploy the microservices and configure IBM HTTP Server for Teams. See the *Set up Microsoft Teams integration* section in [Sample steps to install or upgrade to Component Pack 7](../../admin/install/cp_install_services_tasks.md).
6.  [Set up the Connections app for the Microsoft Teams client](t_ms_teams_set_up_conn_app_for_ms.md).

