# Configuring single sign-on between Microsoft Teams and Connections {#t_ms_teams_configure_teams_sso .task}

Authentication between Connections for the Microsoft Teams app and the Connections server is handled using single sign-on \(SSO\). This way, as long as the user's email address in Microsoft Teams matches the email address of the Connections user, the user won't be prompted to log in to Connections.

## Before you begin

Make sure you've completed [Enabling Connections to use the app registry service](t_ms_teams_enable_conn_use_appreg.md).

## Procedure

There are two authentication schemas available for configuring the SSO relationship. The schema is specified when configuring the Teams microservices configmap in [Set up Microsoft Teams integration](../../admin/install/cp_install_services_tasks.md#teams_integ). 

- [Updating WebSphere to support single sign-on with Connections for Microsoft Teams](t_ms_teams_update_websphere_for_sso.md) with schema value '3'. 

- [Configuring custom token URL single sign-on for Connections with Microsoft Teams](t_ms_teams_sso_configure_customer_token_url.md) with the schema value '4'. 

**Important:** Like the chat integration for Teams, the SSO setup requires that the email address for the user's Teams identity matches the email address in Connections.

## What to do next

[Configure an Azure app to support the Microsoft Teams app](t_ms_teams_config_azure_app.md)