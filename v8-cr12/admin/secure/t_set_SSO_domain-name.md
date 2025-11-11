# Setting the single sign-on domain name {#settingthesinglesign-ondomainname .task}

Set the single sign-on \(SSO\) domain name for your IBM® WebSphere® Application Server environment.

Select the Single SSO Domain option to specify one domain name for all single sign-on hosts.

For example, if you administer a system named test4 that is registered as part of the example.com network domain, its fully qualified host name is test4.example.com. If SSO is enabled for the example.com domain, only cookies that originate in this domain are authenticated and can be stored on the test4.example.com system.

To set your SSO domain name, complete the following steps:

1.  Log in to the WebSphere Application Server Integrated Solutions Console on the Deployment Manager.

2.  Select **Security** \> **Global security** \> **Web and SIP security** \> **Single sign-on \(SSO\)**.

3.  Enter a value for the SSO **Domain name**.

4.  Click **Apply** and then click **Save**.

5.  Perform a full synchronization of all the nodes.


Ensure that you have enabled `Use available authentication data when an unprotected URI is accessed.` For more information, see the [Setting up federated repositories](../install/t_inst_federated_repositories.md) topic.

**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)

