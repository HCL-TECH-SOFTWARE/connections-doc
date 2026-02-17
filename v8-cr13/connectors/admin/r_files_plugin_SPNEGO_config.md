# Configuring and troubleshooting SPNEGO for the Notes plug-in {#r_files_plugin_SPNEGO_config .reference}

If you are using SPNEGO for authentication, review this guide for configuring SPNEGO and resolving configuration issues.

## Considerations { .section}

When configuring the Connections plug-ins for Notes in a SPNEGO environment there are a few things to consider. This article is a reference and troubleshooting guide for this type of configuration. In order to configure the Connections plug-ins for Notes with SPNEGO, open the Notes Preferences page and navigate to the Connections section. On the Advanced Server settings dialog, chose **OS Credential**. By default the authentication url is empty. The username will automatically be retrieved from the operating system. In general we recommend that you try to access Connections from a browser to make sure that single-sign on works \(there might be some configuration steps required\). Working SSO from the browser is a requirement.

Check the following items if authentication fails.

## Windows registry settings { .section}

By default, Windows does not allow access to the TGT session key. This registry key is automatically set in the IBM Expeditor installation script. After the Notes installation completes, verify that the registry key is there. If the key is missing, create the key manually and reboot your machine. Furthermore, please report this issue to IBM.

-   Win XP
    -   HKEY\_LOCAL\_MACHINE\\System\\CurrentControlSet\\Control\\Lsa\\Kerberos
    -   Value Name: allowtgtsessionkey
    -   Value Type: REG\_DWORD
    -   Value: 0x01
-   Vista / Win7 / Win8
    -   HKEY\_LOCAL\_MACHINE\\System\\CurrentControlSet\\Control\\Lsa\\Kerberos\\Parameters
    -   Value Name: allowtgtsessionkey
    -   Value Type: REG\_DWORD
    -   Value: 0x01

## Win7 / Win8 SPNEGO limitation { .section}

There is a known issue that if an ActiveDirectory account is also added into a local administrator group on the client computer, Microsoft restricts such clients from getting the session key for tickets, even if you set the allowtgtsessionkey registry key to 1. For more detail, consult Microsoft support.

**Note:** If the user has administrator rights on that client they must start Notes as an administrator \(right-click on the Notes icon and choose **Run as administrator**.\) The only alternative is to revoke administrator rights for that user.

## Make sure initial url is protected by SPNEGO { .section}

URLs accessed from the Notes client need to be protected by SPNEGO. The server must include a specific header in the return code so that the client can trigger the appropriate authentication module. To verify the authentication header, make use of tools to capture the network traffic, such as Fiddler \(see Troubleshooting section\).

Notes looks for the negotiate header of the server response:`www-authenticate: Negotiate`. If this header does not show up as part of the initial server responses, SPNEGO will not work with Notes.

**Note:** By default, there is no authentication URL specified for the OS Credential authentication type, specified in the Connections section of the Notes Preferences page. Depending on the configuration, an authentication URL might be required to access a SPNEGO protected URL. To specify an authentication URL,

1.  Open the Notes Preferences page and navigate to the Connections section.
2.  On the Advanced Server settings dialog, chose **OS Credential**.
3.  Specify the authentication url like this: https://<hostname\>/activities/service/authredirect.jsp.

## Windows hosts file { .section}

In most cases you must manually add the Connections server and KDC server to the windows hosts file. For example:

-   9.162.127.31 <server.ibm.com\>
-   9.161.69.15 <server.ibm.com\>

If you don't know the KDC server, you can get it from the finer logs \(see Troubleshooting steps.\) Enter the server information and try again.

## 256-bit encryption issue { .section}

If your server is configured to use 256-bit encryption, follow these steps. The Notes Java Virtual Machine only supports 128-bit out of the box because of U.S. export regulations. If you have 256-bit encryption. authentication will fail and the log will show an encryption error: `java.security.InvalidKeyException: Illegal key size`. There are 2 potential solutions to fix or get around this issue:

-   Solution 1: Fix the encryption issue. Override the US\_export\_policy.jar and local\_policy.jar in C:\\Program Files \(x86\)\\IBM\\Lotus\\Notes\\jvm\\lib\\security with files you can download after you register at this [IBM site](https://www14.software.ibm.com/webapp/iwm/web/preLogin.do?source=jcesdk).
-   Solution 2: Disable the unsupported encryption type on the KDC. The following Kerberos trace shows that aes256 is selected as encryption type:

    ```
    [KRB_DBG_TGS] KrbTgsReq:main: >>>KrbTgsReq: using checksum type hmac-sha1-96-aes256 for session key type aes256-cts-hmac-sha1-96
    [KRB_DBG_CRYP] HMacSha196AES256CksumType:main: calculateKeyedChecksum: usage=6
    ```

    Refer to this document to disable an unsupported encryption type on the KDC: [Windows Configurations for Kerberos Supported Encryption Type](http://blogs.msdn.com/b/openspecification/archive/2011/05/31/windows-configurations-for-kerberos-supported-encryption-type.aspx).


## Check proxy settings { .section}

Incorrect proxy settings will also have an impact on connectivity. The Notes client picks up OS proxy settings which can be specified via Internet Explorer or Firefox. If proxies are specified, but you can't connect, try using the "No Proxies" setting for the browser.

## Prerequisites { .section}

The minimum requirements for this configuration are Notes 8.5.3 and HCL Connections for Notes plug-in 4.0. For best results, use the latest Connections plug-ins for Notes, available on the [HCL Connections catalog](https://xspy.mybluemix.net).

**Note:** You can deliver configuration settings via Domino managed settings, which is the preferred method. For information on delivering account configuration settings via Domino managed settings, see the article on [Using Notes.ini setting to configure Connections integration](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Using_NotesINI_settings_to_configure_Connections_integration).

## Configuration requires cross-realm authentication, but single-realm authentication is in use { .section}

If the SPNEGO authentication happens in a cross-realm environment, where the client machine is in one realm while the SPNEGO protected server is in another realm, the authentication can succeed only if a krb5.ini configuration file is used, which is not required for the single-realm case.

The easiest way to determine if cross-realm authentication is needed is to determine which domain the user logs into when logging into Windows and compare that to the domain of the server that requires SPNEGO authentication. The username is in the format of DOMAIN\\user. The domain of the server is indicated by the URL http://mydomain.mycompany.com/resource. If the domain of the username matches the full domain of the server, then single-realm authentication will work. If the domains do not match, you must create and deploy a krb5.ini file for cross-realm authentication.

To do so, create a krb5.ini file that corresponds with your Active Directory configuration. This file must be placed in the<Notes\_Install\_Dir\>\\framework\\rcp\\deploy\\extras directory. Alternatively, the file can be placed in the <Notes\_Install\_Dir\>\\deploy\\extras directory of the Notes install package for global deployment. Alternatively, this configuration file can be pushed to the Notes client from Domino server by policy. This requires the version of Domino template should be equal or later than 8.5.3.

**Note:** The krb5.ini file can be pushed down to all clients via Domino policy. The following shows a sample krb5.ini used in cross-realms, CLIENT.IBM.COM and SERVER.IBM.COM. Change sample names based on your actual environment:

```
[libdefaults]
default_realm = CLIENT.IBM.COM
default_tkt_enctypes = des-cbc-md5 rc4-hmac
default_tgs_enctypes = des-cbc-md5 rc4-hmac
[realms]
SERVER.IBM.COM = {
kdc = serverkdc.ibm.com:88
default_domain = server.ibm.com
}
CLIENT.IBM.COM = {
kdc = clientkdc.ibm.com:88
default_domain = client.ibm.com
}
[domain_realm]
.server.ibm.com = SERVER.IBM.COM
.client.ibm.com = CLIENT.IBM.COM
[capaths]
SERVER.IBM.COM = {
CLIENT.IBM.COM = .
}
CLIENT.IBM.COM = {
SERVER.IBM.COM = .
}

```

For more information, see this article on setting up [Kerberos security](http://docs.oracle.com/javase/6/docs/technotes/guides/security/jgss/tutorials/KerberosReq.html).

## Troubleshooting steps: { .section}

-   Fiddler is a tool that captures network traffic between client and server. It helps troubleshoot connectivity related issues by looking at the server response. To download and install Fiddler:
    1.  Download and install Fiddler 2 from this site: http://www.fiddlertool.com/Fiddler2/version.asp.
    2.  Start the Fiddler application.
    3.  Start Notes and try to connect to HCL Connections.
    4.  Click **File** \> **Save** \> **All sessions** to save the Fiddler trace as \*.saz when done.
-   Enable finer logging for the Notes client to more accurately diagnose problems.

    1.  Open the file C:\\Program Files\\IBM\\Lotus\\Notes\\Data\\workspace\\.config\\rcpinstall.properties
    2.  Add the following lines to the end of the file:

        ```
        com.ibm.rcp.accounts.level=FINEST
        com.ibm.rcp.net.http.level=FINEST
        com.ibm.rcp.security.spnego.level=FINEST
        -Dcom.ibm.security.jgss.debug=all 
        -Dcom.ibm.security.krb5.Krb5Debug=all
        ```

    3.  Save the file and restart the Notes client.
    This code enables both Notes client Java logs and JVM Kerberos logs. The logs can be found in: C:\\Program Files\\IBM\\Lotus\\Notes\\Data\\workspace\\logs.

-   If none of these troubleshooting steps help to get you connected, examine the logs and traces.

    **Note:** When you collect logs, only perform basic steps. For example, start Notes, try to connect Activities, and so on. Otherwise, the log files will get too big.

-   To share logs with IBM, zip up the logs folder and include the Fiddler trace.

**Parent topic:**[HCL Connections Plug-ins for HCL Notes](../../connectors/admin/files_plugin_install_overview.md)

