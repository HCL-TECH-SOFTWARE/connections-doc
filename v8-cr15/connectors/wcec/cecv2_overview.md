# HCL Connections Engagement Center (WebEngine)

**HCL Connections Engagement Center (WebEngine)** is a next-generation platform built on a new WebEngine, enabling customers to create modern, rich, and highly customizable experiences within HCL Connections. Its core container runs on the OpenLiberty platform, originally developed as part of HCL Digital Experience (DX) Compose, and operates independently on certified Kubernetes platforms.

## Key capabilities

CEC (WebEngine) enables you to build two primary types of experiences:

### Modern intranet experiences

Create engaging intranet-style pages and portals, such as:

- **News Overview, Mega News, Featured Stories** powered by HCL Connections Community Blog Posts
- **Upcoming Events** powered by HCL Connections Community Events

### Community dashboards

Build content-rich dashboards for HCL Connections Communities that provide members with a clear overview of community activity, including:

- Blog post feeds
- Upcoming event feeds

## Key features

| Feature | Description |
|---------|-------------|
| **Component-Based Architecture** | Modular, reusable components for building pages |
| **Practitioner Studio** | Modern UI for content authors and site managers |
| **Single Sign-On (SSO)** | Seamless authentication with HCL Connections |
| **Responsive Design** | Mobile-friendly pages and components |
| **Accessibility** | WCAG-compliant user interface |
| **Theming** | Customizable themes and branding |

## Getting started

Refer to the following resources to get started with CEC (WebEngine):

- **[Deployment Guide](./deployment/cecv2_deploy_overview.md)** - Deploy CEC (WebEngine)
- **[CEC Administration (Practitioner Studio)](https://help.hcl-software.com/digital-experience/9.5/CF236/build_sites/practitioner_studio/)** - Learn how to create and manage content using the modern UI


## Architecture

CEC (WebEngine) is deployed as part of the HCL Connections on Kubernetes. It leverages the DX WebEngine container, which runs on Open Liberty and integrates with your existing Connections infrastructure including:

- **LDAP** for user authentication
- **IBM DB2** for content storage
- **LTPA** for single sign-on with Connections

For detailed system requirements and deployment instructions, see the [Deployment Guide](./deployment/cecv2_deploy_overview.md).
