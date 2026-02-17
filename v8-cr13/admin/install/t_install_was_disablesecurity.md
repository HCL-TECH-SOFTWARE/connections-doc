# Disabling WebSphere Application security settings before installing HCL Connections {#t_install_was_disablesecurity.dita .task}

Confirm the disabling of some WebSphere® Application Server security settings before you install HCL Connections.

Confirm that the following security settings are disabled. They are disabled by default.

1.  Confirm that **Java 2 security** is disabled.

    1.  In the WebSphere Application Server Integrated Solutions Console, click **Security** \> **Global**.

    2.  In the **Java 2 security** section, ensure that the **Use Java 2 security to restrict application access to local resources** option is not selected.

2.  Confirm that **Logout on HTTP Session Expiration** is disabled.

    This WebSphere feature applies only to single web applications and HCL Connections is a set of tightly integrated web applications and not a single web application.

    1.  In the WebSphere Application Server Integrated Solutions Console click **Security** \> **Global**.

    2.  Under **Custom properties**, make sure that **com.ibm.ws.security.web.logoutOnHTTPSessionExpire** is either not listed or set to false.


**Parent topic:**[Setting up federated repositories](../install/t_inst_federated_repositories.md)

