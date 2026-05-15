# Configuring SAML for ADFS in WebSphere Application Server {#t_sec_config_saml_for_ADFS .task}

Configure SAML for Microsoft Active Directory Federation Services in IBM WebSphere Application Server by following the simplified steps in this topic.

1.  Create the SP metadata file and import it into the IdP as follows:

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

    2.  Copy `/tmp/spdata.xml` to the IdP server and then import it into the IdP.
    3.  Restart the IdP.
2.  On your AD FS server, open the AD FS Management Tool and start the Add Relying Party Trust Wizard.

3.  Use the following information to complete the Add Relying Party Trust wizard:

    -   In the Federation metadata file location, enter the location of the file that you received from HCL.
    -   For the display name, use Cloud.
    -   Do not configure multi-factor authentication.
    -   Allow all users to access this relying party.

4.  In the AD FS Management Tool, locate the list of relying party trusts and right-click Cloud. In the menu that opens, click Properties.

5.  In the properties dialog, click the **Advanced** tab and select **SHA-1** as the secure hash algorithm, then click **OK**.

    The properties dialog closes.

6.  In the list of relying party trusts, right-click **HCL** \> **Edit Claim Rules**.

7.  Add the first rule by clicking **Add** to open the Add Transform Claim Rule Wizard.

    Use the following information to complete the wizard:

    -   For the Claim rule template, select Send LDAP Attributes as Claims.
    -   For the Claim rule name, enter Email Name ID.
    -   For the Attribute store, select Active Directory.
    -   In the mapping table, select E-Mail-Addresses in the LDAP attribute column, and E-Mail Address in the Outgoing Claim Type column.

8.  Add the second rule by clicking **Add** to open the Add Transform Claim Rule Wizard.

    Use the following information to complete the wizard:

    -   For the Claim rule template, select Transform an Incoming Claim.
    -   For the Incoming claim type, select E-mail Address.
    -   For the Outgoing claim type, select Name ID.
    -   For the Outgoing name ID format, select Email.
    -   Select Pass through all claim values.

9.  On your AD FS server, open a PowerShell command window and issue the following command:

    ```powershell
    Set-AdfsClaimsProviderTrust -TargetIdentifier "AD AUTHORITY" -AlternateLoginID mail
        -LookupForests <forest domain\>
    ```

    where <forest domain\> is the list of forest DNS that your users belong to. For more information about this command, see [Set-AdfsClaimsProviderTrust](https://docs.microsoft.com/en-us/powershell/module/adfs/set-adfsclaimsprovidertrust?view=windowsserver2019-ps) in the Microsoft documentation.


**Parent topic:** [Configuring SAML redirection services for web SSO](../secure/t_inst_set_up_saml_2.md)

