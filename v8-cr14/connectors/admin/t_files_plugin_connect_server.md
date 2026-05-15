# Connecting to a Connections or a Connections Cloud server {#t_files_plugin_connect_server .task}

Log into HCL Connections servers to access Connections content from the sidebar applications.

**Note:** The HCL Connections plug-in for IBM Notes now allows you to connect to an IBM Connections Cloud server to access Files and Activities and view business cards from the Notes sidebar.

The support for connecting to an HCL Connections Cloud server depends on whether you are using Notes 8.5.3 or Notes 9.0.1. The table shows the different Cloud support for the different versions.

|            | Notes 8.5.3 | Notes 9.0.1 |
| ----------- | --------- | --------- |
| Managed "LotusLive" account for Activities | Supported. You can switch between Connections and Connections Cloud Activities from within the Activities sidebar | Not supported. There is no option to switch within the Activities sidebar, even if such a managed account is in place. |
| HCL Connections Cloud SAML support | Not supported. Notes 8.5.3 does not support SAML. | Supported. The Connections preference page has an option to switch between a Connections server and a Connections Cloud server.|

Notes 9.01 offers a single-click Connect-to-Cloud experience, with these considerations.

-   If you choose **HCL Connections Cloud** on the Connections preference page, you will be connected to the HCL Connections Cloud deployment \(apps.na.collabserv.com\) using SAML authentication. Based on your user ID, the related data center will be determined. If you have access to more than one data center, you will be prompted to choose one. You can go back to the preference page later and easily switch to another data center.
-   Authentication is supported for federated and non-federated users. For federated users a basic auth protected endpoint will be used for SAML authentication. Former 'LotusLive' Notes users with a managed account for Activities won't be able to connect to HCL Connections Cloud with that managed account. For manual configuration go to the Connections preference page, select **IBM Connections Cloud** and enter your credentials. Alternatively, the new settings can be pushed out via plugin\_customization.ini or managed settings.

You need the following information to connect to the Connections server:

-   The Web address of the Connections server or the Connections Cloud server \(not just the server name, but the full Web address, likehttps://activities.example.com\)
-   The username and password you use to log into HCL Connections or HCL Connections cloud.

When you first open a Connections panel in the sidebar, if a connection to the server is not available, you are prompted to verify connection information. The following steps describe how to log in from the Activities panel of the sidebar:

1.  In the Activities panel of the sidebar, click **Show Connections preferences** to open the Connections preferences window.

2.  Choose whether to connect to an HCL Connections or HCL Connections Cloud server.

3.  If you are connecting to an HCL Connections server, fill in the following fields in the Connections Server Settings section:

    |Field|Description|
    |-----|-----------|
    |**Server URL**|Type the Web address of the HCL Connections server, beginning with either `https://` or `http://`. <br><br> For example: `https://enterprise.example.com` <br><br> If you know that the server requires a secure, encrypted connection, begin the address with `https://` <br><br> <!--Some administrators change the context roots that are used to access HCL Connections features--> If the web address that you normally use to access the Activities feature has a value other than <server\_name\>/activities, specify the server URL using a syntax similar to this: `http://enterprise.example.com/activities` <br><br> **Note:** Your administrator might have already provided a value for this field using an administrative policy. If so, do not change the value. |
    |**User name**|Type your user name for logging in to the IBM® Connections server.|
    |**User password**|Type the associated password.|

4.  **Only required if you are instructed to perform this step by your administrator**: If SPNEGO, Tivoli® Access Manager or Computer Associates eTrust SiteMinder are configured in your environment, click **Advanced**, and then select the appropriate option.


The Activities sidebar should now display a list of your activities. Connecting to the Activities server also creates the necessary connection for the Files application on a Cloud server and the Files and Status Update applications on a Connections server.

The next time you log in to Notes®, you are logged in to the Connections or Connections Cloud server automatically.

These steps describe how a user can connect to a Connections server or a Connections cloud server. To provision this for a group of servers, use a policy. For more information, see the configuration article in the IBM Domino wiki: [Using INI settings to configure the HCL Connections features that are available in the IBM Lotus Notes client](https://ds-infolib.hcltechsw.com/ldd/lcwiki.nsf/dx/Using_NotesINI_settings_to_configure_Connections_integration) in the HCL Connections wiki.

For HCL Connections Cloud you need these settings:

-   `com.ibm.lconn.client.base/authtype=SmartCloud`
-   `com.ibm.lconn.client.base/server=https\://apps.na.collabserv.com/activities`
-   `com.ibm.lconn.client.base/authserver=`
-   `com.ibm.lconn.client.base/policy-mode=OVERWRITE`

**Note:** The Cloud URL also works if the user is enabled for a different data center.

**Attention:** Because the OVERWRITE flag resets the existing settings, it can create conflicts and generate additional log-in requests if users switch between different data centers. Do not preconfigure these settings if your users access more than one cloud data center.

For federated users, basic authentication against the IDP is used by default. You can specify form-based or Kerberos authentication instead if the customer's IDP server is configured to support this method of authentication. In addition, this setting must be specified via plugin\_customization.ini or managed settings:

```
com.ibm.lconn.client.base/usebasicauth=false
```

If you need to troubleshoot the plug-in, consult this wiki article on [data collection](https://ds-infolib.hcltechsw.com/ldd/lcwiki.nsf/dx/Notes_Integration#Data+Collection).

Enable client logging by adding the following lines to ...\\notes\\data\\workspace\\.config\\rcpinstall.properties:

```
com.ibm.lconn.client.base.level=FINEST 
com.ibm.lconn.client.smartcloud.level=FINEST 
com.ibm.rcp.accounts.level=FINEST 
com.ibm.rcp.security.level=FINEST
```

**Parent topic:**[HCL Connections Plug-ins for HCL Notes](../../connectors/admin/files_plugin_install_overview.md)

