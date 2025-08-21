# Installing and configuring the IBM WebSphere Application Server Deployment Manager and nodes {#t_install_config_was .task}

WebSphere® Application Server Network Deployment is provided with HCL Connections. Install IBM® WebSphere Application Server on the Deployment Manager and nodes to prepare for HCL Connections installation.

To install and configure WebSphere Application Server on the Deployment Manager and nodes, complete the following tasks:

1.  Important: If you plan to install Connections Content Manager as part of this deployment, make sure that you do NOT configure WebSphere Application Server to use Java 8 now. Switching to Java 8 must be done during post-installation.

2.  Install WebSphere Application Server Network Deployment.

    For more information, see [Installing WebSphere Application Server](http://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.installation.nd.doc/ae/tins_install.html) in the *WebSphere Application Server Network Deployment Knowledge Center*.

    !!! note
        Enable security when the installation wizard requests it. The administrative user ID that you create must be unique and must not exist in the LDAP repository that you plan to federate.

3.  Apply the available fix packs.

    See the *HCL Connections system requirements* topic for details.

4.  Configure WebSphere Application Server to communicate with the LDAP directory. For more information, see the *Setting up federated repositories* topic.

    !!! note
        Perform this step on the Deployment Manager Integrated Solutions Console.

5.  Configure Application Security after you have completely installed WebSphere Application Server Network Deployment. For more information, refer to [Securing your environment after installation](http://www-01.ibm.com/support/knowledgecenter/SSAW57_8.5.5/com.ibm.websphere.nd.multiplatform.doc/ae/tsec_postinstall.html) in the *WebSphere Application Server Network Deployment Knowledge Center*.

    !!! note
        Perform this step on the Deployment Manager Integrated Solutions Console.

6.  Add further nodes, if required, to the cell. Complete the following steps for each node that you want to add to the cell:

    1.  Open a command prompt and change to the [app\_server\_root/profiles/profile/bin](../plan/i_ovr_r_directory_conventions.md) directory, where profile is the name of the WebSphere Application Server installation on the node.

    2.  Enter the following command:

        `addNode.sh|bat DM_host DM_SoapPort -username AdminUserId -password AdminPwd`

        where:

        -   `DM_host` is the host name of the Deployment Manager
        -   `DM_SoapPort` is the SOAP port number of the Deployment Manager
        -   `AdminUserId` is the user ID for the Deployment Manager
        -   `AdminPwd` is the password for the Deployment Manager
    3.  Repeat this step for each additional node that your want to add to the cell.

    4.  Synchronize all the nodes.


You can add nodes after you have deployed HCL Connections. For more information, see *Adding a node to a cluster*.

You can set up single sign on after you have deployed Connections. For more information see *Configuring single sign-on*..

The heap size of the Deployment Manager might need to be increased beyond the default values if an out-of-memory condition is experienced while installing HCL Connections. See *Reviewing the JVM heap size* for more information.

**Parent topic:**[Installing IBM WebSphere Application Server](../install/t_install_was.md)

