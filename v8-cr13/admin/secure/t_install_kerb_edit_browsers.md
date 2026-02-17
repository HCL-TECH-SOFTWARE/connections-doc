# Configuring web browsers to support SPNEGO {#t_install_kerb_edit_browsers .task}

Configure your web browser to support SPNEGO authentication.

Add HCL Connections™ and HTTP Server to the list of sites that are permitted to engage in SPNEGO authentication with the browser.

To edit your web browser preferences, complete the following steps:

1.  Do one of the following:

    -   Microsoft™ Internet Explorer:
        1.  From the Internet Explorer menu, select **Tools** \> **Internet Options** and then click the **Security** tab.
        2.  Click the **Local intranet** icon and then click **Sites**.
        3.  Click **Advanced** and then add the web address of the host name of your Connections server into the **Add this website to the zone** field. For example: \*.enterprise.example.com. Click **Add**.
        4.  Enter the host name of your HTTP Server into the **Add this website to the zone** field and click **Add**. For example: http://<IHS\_host\>or https://IHS\_host\>".
        5.  Click **OK** to save the change and return to the main Security page.
        6.  Click **Custom level**, scroll to find **User Authentication** \> **Logon**, and select **Automatic logon only in Intranet zone**. Click **OK** to save the change and return to the main Security page.
        7.  If you are using Edge, you must set the trust settings in Microsoft Internet Explorer. Click the **Trusted sites** icon and then click **Sites**. Click **Add**.
        8.  Enter the SPNEGO URL into the **Add this website to the zone** field and click **Add**.
        9.  Click the **Advanced** tab, scroll to find Security, and then select the **Enable Integrated Windows Authentication** check box. Click **OK** to save the change.
        10. Restart the web browser to apply the configuration changes.
    -   Mozilla Firefox:
        1.  Open Firefox and type about:config into the location bar.
        2.  Type network.n into the **Filter** field and double-click **network.negotiate-auth.trusted-uris**.
        3.  Enter the address of the server that hosts Connections, for example, `enterprise.example.com`.
        4.  Click **OK** to save the change.
        5.  If the deployed SPNEGO solution is using the advanced Kerberos application of Credential Delegation, double-click **network.negotiate-auth.delegation-uris**. This preference defines the sites for which the browser can delegate user authorization to the server. Enter a comma-delimited list of trusted domains or URLs.
        6.  Restart Firefox to apply the configuration change.

**Parent topic:** [Enabling single sign-on for the Windows desktop](../secure/t_install_kerb_setup_spnego.md)

**Previous topic:** [Configuring SPNEGO \(and Kerberos optionally\) on WebSphere Application Server](../secure/t_install_kerb_add_spnego_tai_to_was.md)
