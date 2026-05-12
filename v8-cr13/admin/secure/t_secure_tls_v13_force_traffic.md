# Forcing traffic to use TLS 1.3 {#t_secure_tls_v13_force_traffic .concept}

You can configure HCL Connections™ to force all traffic that passes between a Connections server and a user's web browser to be sent over TLS 1.3 to avoid security vulnerabilities in TLS 1.2 and earlier versions of SSL.

## About this task

When you enforce the use of TLS 1.3, it affects all traffic from browsers and applications, as well as the communication between the Connections JVMs and the IBM WebSphere Application Server.

## Procedure {#section_yyb_25x_bpb .section}

1.  In the HTTP Server, disable SSL protocols and old TLS protocols, leaving only TLS 1.3 enabled.

    1.  Open the ``httpd.conf`` file in the ``ibm_http_server_root/conf directory``. 
    2.  Add the following code inside the ``<VirtualHost *:443> ... </VirtualHost>`` element:

        ``SSLProtocolDisable SSLv2 SSLv3 TLSv10 TLSv11 TLSv12``

2.  Stop and start the HTTP Server.
3.  Modify the WebSphere SSL client properties file to force the use of TLS 1.3 :

    1.  On the deployment manager, open ``opt/IBM/WebSphere/AppServer/profiles/Dmgr01/properties/ssl.client.prop.`` and set ``com.ibm.ssl.protocol`` to the following value:

        ``com.ibm.ssl.protocol=TLSv1.3``

    2.  On every WebSphere node, open ``opt/IBM/WebSphere/AppServer/profiles/Dmgr01/properties/ssl.client.prop.`` and set ``com.ibm.ssl.protocol`` to the following value:

        ``com.ibm.ssl.protocol=TLSv1.3``

4.  On the deployment manager, update the ``LotusConnections-config.xml`` file  by adding or updating the following property to the Connections configuration file in the last section in the properties element.

    ``<genericProperty name="com.ibm.connections.SSLProtocol">TLSv1.3</genericProperty>``

5.  In the WebSphere Application Server, update the SSL configurations to only allow TLS 1.3 for secure protocol.

    1.  Stop all WebSphere Application Server processes except for the **Deployment Manager**.
    
    2.  In the **WebSphere Integrated Solutions Console**, log in as the administrator and click on **Security** > **SSL certificate and key management** > **SSL Configurations**.

    3.  For each of the configurations listed, select the configuration, such as **CellDefaultSSLSettings**, and then **Quality of protection (QoP)** settings
    4.  Set the **Protocol selector** to *TLSv1.3* to only allow TLS 1.3. Repeat this step for every configuration.

    5.  Save your changes and leave the Integrated Solutions Console open for the next step.

6.  In the WebSphere Integrated Solutions console, add the following property to the web server.

    1. Go to **Plug-in Properties** under **Additional Properties**
    2. In **Custom Property** add the custom property:

       ``PLG.Config.USETLS13`` with a value of *true*

    2. Generate and propagate the plug-in

    3. Restart the web server
   
7.  Enable the JVM to override the default TLS setting, to ensure that only TLS v1.3 is used:

    !!! note

        Complete this step on every WebSphere Application Server in the deployment.

    1.  In the Integrated Solutions Console, click on **Server Types** > **WebSphere Application Server**.

    2.  Expand the **Java and Process Management** and then click on **Process Definition** > **Java Virtual Machine**.

    3.  In the **Generic JVM arguments** field, add the following definition if it's not already defined:

        ``-Dcom.ibm.jsse2.overrideDefaultTLS=true``

    4.  Click **OK**.

    5.  Save your changes to the master configuration by clicking **Save** in the **Messages** box.

    6.  Restart WebSphere Application Server to ensure your changes take effect.

8.  On each managed node, synchronize the deployment manager changes by running ``profile_root/bin/syncNode.sh``.

    Ensure that the synchronization completes successfully on every node. If synchronization fails, you might need to manually replace the ``security.xml`` file in ``profile_root/config/cells/cell/`` with the version from the deployment manager, and then synchronize the nodes again.


**Parent topic:** [Configuring HCL Connection to Use TLS 1.3 ](../secure/t_secure_tls_v13_overview.md)

