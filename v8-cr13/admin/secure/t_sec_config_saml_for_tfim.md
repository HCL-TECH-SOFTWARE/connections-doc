# Configuring SAML for TFIM in WebSphere Application Server {#t_sec_config_saml_for_TFIM .task}

Configure SAML for IBM Tivoli Federated Identity Manager in IBM WebSphere Application Server by following the simplified steps in this topic.

-   This deployment scenario uses the version of IBM Tivoli Federated Identity Manager \(TFIM\) that is [supported](http://www-01.ibm.com/support/docview.wss?rs=899&uid=swg27012786) for HCL Connections™. For more information, see [the Tivoli information center](http://publib.boulder.ibm.com/infocenter/tivihelp/v2r1/index.jsp?topic=%2Fcom.ibm.tivoli.fim.doc_6.2.2%2Fic%2Fic-homepage.html) for additional information about TFIM.
-   If you are using MS-ADFS - Microsoft ADFS 2.0, refer to the WebSphere documentation for configuring your TAI.

1.  Using the WebSphere Application Server administrative console, install the SAML ACS application into your WebSphere Application Server Dmgr. Install the [app\_server\_root](../plan/i_ovr_r_directory_conventions.md#app)/installableApps/WebSphereSamlSP.ear file to your application server or cluster.

    For more information, see [Enabling your system to use the SAML web single sign-on \(SSO\) feature](https://www.ibm.com/docs/en/was-nd/8.5.5?topic=swss-enabling-your-system-use-saml-web-single-sign-sso-feature) in the WebSphere Application Server information center.

2.  Enable SAML TAI using the administrative console as follows:

    1.  Log on to the WebSphere Application Server administrative console.
    2.  Click **Security** \> **Global security**.
    3.  Expand **Web and SIP security** and click **Trust association**.
    4.  Under the **General Properties** heading, select the **Enable trust association** option, and then click **Interceptors**.
    5.  Click **New** and enter com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor in the**Interceptor class name** field.
    6.  Under **Custom properties**, complete the following custom property information: **Name:** sso\_1.sp.acsUrl and **Value:**

        ```
        https://hostname:sslport/samlsps/<any URI pattern string>
        ```

        where hostname is the host name of the system where WebSphere Application Server is installed and sslport is the web server SSL port number **WC\_defaulthost\_secure**, for example:

        ```
        https://websphere.company.com:9443/samlsps/acs
        ```

    7.  Click **New** and enter the following custom property information:
        -   **Name:**sso\_1.sp.idMap
        -   **Value:** "localRealm" or "idAssertion". Typically, "localRealm" is used.
3.  Navigate to **Global security**, and then click **Custom properties** \> **General properties** to create, or modify, the following custom properties and assign them the specified values:

    Name: `com.ibm.websphere.security.DeferTAItoSSO`

    Value: `com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor`

    Name: `com.ibm.websphere.security.InvokeTAIbeforeSSO`

    Value: `com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor,com.ibm.ws.security.oauth20.tai.OAuthTAI`

    Name: `com.ibm.websphere.security.performTAIForUnprotectedURI`

        Assign this property the value `true`.

    !!! note 
        
        Be sure to include a comma separating the two values.

4.  Configure single sign-on \(SSO\) partners as follows:

    For more information, see [Configuring single sign-on partners](https://www.ibm.com/docs/en/was-nd/8.5.5?topic=sign-configuring-single-sso-partners) in the WebSphere Application Server information center.

    1.  From the SAML IdP, export the following items:
        -   metadata file
        -   SAML token signer certificate
    2.  Import the IdP metadata file into WebSphere Application Server as follows:
        1.  Start the WebSphere Application Server.
        2.  Start the wsadmin command-line utility from the app\_server\_root/bin directory by entering the command: wsadmin -lang jython

            ```bash
            cd /opt/IBM/WebSphere/DeploymentManager/bin
            ./wsadmin.sh -lang jython -username administrator -password password
            WASX7209I: Connected to process "dmgr" on node dubxpcvm603CellManager01 using SOAP connector;  The type of process is: DeploymentManager
            WASX7031I: For help, enter: "print Help.help()"
            
            wsadmin>AdminTask.importSAMLIdpMetadata('-idpMetadataFileName /opt/saml/ICIDP_IBM_metadata.xml -idpId 1 -ssoId 1 -signingCertAlias idpsamlcert')
            'true'
            
            wsadmin>AdminConfig.save()
            wsadmin>quit
            ```

            .

        3.  Restart the WebSphere Application Server.
    3.  Import the IdP SAML token signer certificate into WebSphere Application Server as follows:
        1.  Log on to the WebSphere Application Server administrative console.
        2.  Click **Security** \> **SSL certificate and key management** \> **Key stores and certificates** \> **NodeDefaultTrustStore** \> **Signer certificates**. Use CellDefaultTrustStore instead of NodeDefaultTrustStore for a deployment manager.
        3.  Click **Add** and complete the certificate information, for example, /opt/saml/idp-cert.pem.
        4.  Click **Apply**.
    4.  In the WebSphere Application Server administrative console, add inbound trust as follows:
        1.  Click **Global security**.
        2.  Under **User account repository**, click **Configure**.
        3.  Click **Trusted authentication realms - inbound**.
        4.  Click **Add External Realm**.
        5.  Enter the External realm name and save.
        6.  Click **OK** and then **Save** to preserve your changes to the master configuration.
5.  Create the SP metadata file and import it into the IdP as follows:

    1.  Export the SP metadata file from the WebSphere Application Server system as follows:

        ```bash
        cd /opt/IBM/WebSphere/DeploymentManager/bin
        ./wsadmin.sh -lang jython -username administrator -password password
        WASX7209I: Connected to process "dmgr" on node dubxpcvm603CellManager01 using SOAP connector;  The type of process is: DeploymentManager
        WASX7031I: For help, enter: "print Help.help()"
        
        wsadmin>AdminTask.exportSAMLSpMetadata('-spMetadataFileName /tmp/spdata.xml -ssoId 1')
        ```

        !!! note 
            
            This command creates the /tmp/spdata.xml SP metadata file.

    2.  Copy /tmp/spdata.xml to the IdP server and then import it into the IdP.
    3.  Restart the IdP.
6.  Remove any TAI \(Trust Association Interceptors\) that are not needed to avoid conflict with the SAML TAI as follows:

    1.  Log on to the WebSphere Application Server administrative console.
    2.  Click **Security** \> **Global security**.
    3.  Expand **Web and SIP security** and then click **Trust association**.
    4.  Click **Interceptors**.
    5.  Delete any TAIs that are not needed and save the changes.
7.  Navigate to **Global security** \> **Trust association** \> **Interceptors** \> **com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor** to verify that the following, case-sensitive properties in the SAML TAI have the exact spelling of uppercase and lowercase as shown:

    1.  -   sso\_1.idp\_1.EntityID Be sure the letters that are shown in uppercase are in fact uppercase.
-   sso\_1.idp\_1.SingleSignOnUrl Be sure the letters that are shown in uppercase are in fact uppercase.
8.  Navigate to **Global security** \> **Trust association** \> **Interceptors** \> **com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor** to add the following properties in the SAML TAI:

    ```
    Name: sso_1.sp.trustAnySigner
    Value: true
    Name: sso_1.sp.charEncoding
    Value: UTF-8
    Name: sso_1.sp.disableDecodeURL
    Value: true
    ```

9.  Set up SAML support as follows:

    1.  From the WebSphere® Application Server Integrated Solutions Console, navigate to **Global security** \> **Trust association** \> **Interceptors** \> **com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor** to set the Custom property **sso\_1.sp.login.error.page** to com.ibm.connections.concerto.services.ADFSIdPMapping if Microsoft™ Active Directory Federation Services \(ADFS\) is used. Otherwise, use com.ibm.connections.concerto.services.TFIMIdPMapping.
        -   TFIMIdPMapping is used for TFIM 6.2.2, SAML 2.0 IdP only.

            !!! note 
                
                When TFIM is in place, it can rely on either WebSphere or WebSEAL as a single point of contact for the SAML IdP implementation.

        -   ADFSIdPMapping is used for MS ADFS 2.0, SAML 2.0 IdP only.
    2.  Obtain the com.ibm.connections.concerto.services.jar from the [connections\_root](http://www-10.lotus.com/ldd/lcwiki.nsf/xpDocViewer.xsp?lookupName=IBM+Connections+4.5+Documentation#action=openDocument&res_title=Directory_path_conventions_ic45&content=pdcontent)/Concerto directory and copy this file into the WebSphere Application Server’s library extension folder. For example, copy `com.ibm.connections.concerto.services.jar` to:
        -   Windows™: `C:\\IBM\\WebSphere\\AppServer\\lib\\ext`
        -   Linux™: `/opt/IBM/WebSphere/AppServer/lib/ext`

        !!! note 
            
            For a multi-node ND deployment, all the nodes must have this redirection service JAR available for the SAML TAI to pick up.

10. Restart the deployment as follows:

    1.  Stop all clusters, servers, and applications.
    2.  Stop the Dmgr.
    3.  Restart the Dmgr and then restart the Node agents.
    4.  Verify that all nodes are synchronized.
    5.  Start the appropriate clusters, servers, and applications.

**Parent topic:** [Configuring SAML redirection services for web SSO](../secure/t_inst_set_up_saml_2.md)

