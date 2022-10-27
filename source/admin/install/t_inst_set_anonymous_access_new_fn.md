# Managing anonymous access for a FileNet deployment {#t_inst_set_anonymous_access .task}

HCL Connections requires anonymous access to be set in FileNet® for public communities unless external users are part of a community, in which case anonymous access needs to be disabled.

Configuring an anonymous user is required if you want users to access Connections Content Manager without authenticating. The installation process also prompts for an anonymous user, and if you entered an anonymous user account during the installation, anonymous access is already configured. These steps might be used to enable or disable anonymous access after the installation. In some cases, such as when desktop single-sign is enabled, or when roles in the communities application are restricted to limit access to authenticated users, setting up anonymous access for FileNet is optional. For more information, see [Roles](../admin/r_admin_common_user_roles.md).

For more information, see [Enabling anonymous access for a FileNet deployment](#enablinganonymousaccessforafilenetdeployment).

If you want to allow external users to participate in your Connections communities, then anonymous needs to be disabled for Connections Content Manager.

For more information, see [Disabling anonymous access](#disablinganonymousaccess).

