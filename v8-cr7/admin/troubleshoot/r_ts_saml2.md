# Troubleshooting SAML 2.0 {#r_ts_saml .concept}

Review the topics in this section to see if your issue is addressed.

Perform the following steps so that your SAML 2.0 Web SSO support for HCL Connections™ deployment can collect pertinent trace data.

1.  Test SAML with Snoop. Be sure not to configure Connections until you have done so.
2.  Enable the Security trace as follows:

    ```
    com.ibm.ws.security.*=all:com.ibm.ws.security.policy.*=off
    ```

3.  Enable the directory services trace as follows:

    ```
    com.ibm.connections.directory.services.*=all
    
    ```

4.  Enable the http client trace as follows:

    ```
    com.ibm.connections.httpClient.*=all
    
    ```

5.  Enable the redirection services trace as follows:

    ```
    com.ibm.connections.concerto.services.*=all
    ```


**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

# Disabling SAML to validate fully functioning integration for third party servers {#disablingsamltovalidatefullyfunctioningintegrstionforthirdpartyservers .task}

Connections can incorporate many services into Social Business Platform. It is necessary to isolate system-wide security features to validate whether third party servers, such as FileNet® servers, can be deployed properly as a fully functional integrated server with Connections prior to enabling the SAML protection.

Make a record of the exact configuration of custom properties for the SAML TAI com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor by accessing the WebSphere® Application Server Integrated Solutions Console **Global security** \> **Trust association** \> **Interceptors**. This setting also can be found in thesecurity.xml file, for which you should make a backed-up copy before making any changes.

1.  Select and delete the SAML TAI com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor.

2.  Disable SAML TAI, but leave OAuth TAI enabled as follows:

    1.  Set **InvokeTAIbeforeSSO** properties to com.ibm.ws.security.oauth20.tai.OAuthTAI only.
    2.  Remove **DeferTAItoSSO** properties.
3.  Configure custom authenticator services to use the DefaultAuthenticator as follows:

    1.  Check out the LotusConnections-config.xml.
    2.  Verify that the XML element <customAuthenticator name="DefaultAuthenticator" /\> is specified. If the value is not "DefaultAuthenticator", edit it to be so and then save the file.
    3.  Check the file back in.
4.  Run **Full Resynchronize** for all nodes, and then restart all application server instances.


