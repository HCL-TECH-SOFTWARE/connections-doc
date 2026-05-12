# Disabling SAML to validate fully functioning integration for third party servers {#disablingsamltovalidatefullyfunctioningintegrstionforthirdpartyservers .task}

HCL Connections™ can incorporate many services into Social Business Platform. It is necessary to isolate system-wide security features to validate whether third party servers, such as FileNet® servers, can be deployed properly as a fully functional integrated server with Connections prior to enabling the SAML protection.

Make a record of the exact configuration of custom properties for the SAML TAI com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor by accessing the WebSphere® Application Server Integrated Solutions Console **Global security** \> **Trust association** \> **Interceptors**. This setting also can be found in thesecurity.xml file, for which you should make a backed-up copy before making any changes.

1.  Select and delete the SAML TAI com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor.

2.  Disable SAML TAI, but leave OAuth TAI enabled as follows:

    1.  Set **InvokeTAIbeforeSSO** properties to com.ibm.ws.security.oauth20.tai.OAuthTAI only.

    2.  Remove **DeferTAItoSSO** properties.

3.  Run **Full Resynchronize** for all nodes, and then restart all application server instances.


**Parent topic:** [Configuring SAML redirection services for web SSO](../secure/t_inst_set_up_saml_2.md)

