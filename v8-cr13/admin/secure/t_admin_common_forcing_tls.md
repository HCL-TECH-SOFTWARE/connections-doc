# Forcing traffic to use TLS 1.2 {#task_z3l_hld_gw .task}

You can configure HCL Connections™ to force all traffic that passes between a Connections server and a user's web browser to be sent over TLS 1.2 to avoid security vulnerabilities in TLS 1.1 and earlier versions of SSL.

When you enforce the use of TLS 1.2, it affects all traffic from browsers and applications, as well as communication between Connections JVMs and the IBM WebSphere Application Server.

1.  In the HTTP Server, disable SSL protocols and old TLS protocols, leaving only TLS 1.2 enabled.

    Open the httpd.conf file in the [ibm\_http\_server\_root](../plan/i_ovr_r_directory_conventions.md#ihs)/conf directory. Add the following code inside the `<VirtualHost *:443> ... </VirtualHost>` element:

    ```
    SSLProtocolDisable SSLv2 SSLv3 TLSv10 TLSv11
    ```

2.  Stop and start the HTTP Server.

3.  Modify the WebSphere SSL client properties file to force the use of TLS 1.2 :

    1.  On the deployment manager, open opt/IBM/WebSphere/AppServer/profiles/Dmgr01/properties/ssl.client.props.

        Set `com.ibm.ssl.protocol` to the following value:

        ```
        com.ibm.ssl.protocol=TLSv1.2
        ```

    2.  On every WebSphere node, open opt/IBM/WebSphere/AppServer/profiles/Dmgr01/properties/ssl.client.props.

        Set `com.ibm.ssl.protocol` to the following value:

        ```
        com.ibm.ssl.protocol=TLSv1.2
        ```

4.  On the deployment manager, update LotusConnections-config.xml by adding the following property to the Connections configuration file in the last section in the `properties` element.

    ```
    <genericProperty name="com.ibm.connections.SSLProtocol">TLSv1.2</genericProperty>
    ```

5.  In the WebSphere Application Server, update the SSL configurations to only allow TLS 1.2 for secure protocol.

    1.  Stop all WebSphere Application Server processes except for the Deployment Manager.

    2.  In the WebSphere Integrated Solutions Console, log in as the administrator and click **Security** \> **SSL certificate and key management** \> **SSL Configurations**.

    3.  For each of the configurations listed, select the configuration, such as **CellDefaultSSLSettings**, and then **Quality of protection \(QoP\) settings**.

    4.  Set the Protocol selector to **TLSv1.2** to only allow TLS 1.2. Repeat this step for every configuration.

    5.  Save your changes and leave the Integrated Solutions Console open for the next step.

6.  Enable the JVM to override the default TLS setting, to ensure that only TLS v1.2 is used:

    Complete this step on every WebSphere Application Server in the deployment.

    1.  In the Integrated Solutions Console, click **Server Types** \> **WebSphere Application Server**.

    2.  Expand **Java and Process Management** and then click **Process Definition** \> **Java Virtual Machine**.

    3.  In the **Generic JVM arguments** field, add the following definition:

        ```
        -Dcom.ibm.jsse2.overrideDefaultTLS=true
        ```

    4.  Click **OK**.

    5.  Save your changes to the master configuration by clicking **Save** in the "Messages" box.

    6.  Restart WebSphere Application Server to ensure your changes take effect.

7.  On each managed node, synchronize the deployment manager changes by running [profile\_root](../plan/i_ovr_r_directory_conventions.md#proflie)/bin/syncNode.sh.

    Ensure that the synchronization completes successfully on every node. If synchronization fails, you might need to manually replace the security.xml file in [profile\_root](../plan/i_ovr_r_directory_conventions.md#proflie)/config/cells/cell/ with the version from the deployment manager, and then synchronize the nodes again.


**Parent topic:** [Security](../secure/c_sec_overview.md)

