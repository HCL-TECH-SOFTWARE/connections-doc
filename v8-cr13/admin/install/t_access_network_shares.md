# Accessing Windows network shares {#accessnetworkshares .task}

Configure a user account to access network shares in an HCL Connections deployment on the Microsoft® Windows® operating system

This task applies only to deployments of HCL Connections environments where the data is located on network file shares, and where you have installed WebSphere® Application Server on Microsoft Windows and configured it to run as a service.

When WebSphere Application Server runs as a Windows service, it uses the local system account to log in with null credentials. When WebSphere Application Server tries to access an HCL Connections network share using Universal Naming Convention \(UNC\) mapping, the access request fails because the content share is accessible only to valid user IDs.

**Note:** When using a Windows service to start WebSphere Application Server, you must use UNC mapping; you cannot use drive letters to reference network shares.

To resolve this problem, configure the WebSphere Application Server service login attribute to log in with a user account that is authorized to access the content share.

To configure a user account for all WebSphere Application Server services, complete the following steps:

1.  Click **Start** \> **Control Panel** and select **Administrative Tools** \> **Services**.

2.  Click **WebSphere Application Server**.

3.  Click the **Log On** tab and select **This account**.

4.  Enter a user account name or click **Browse** to search for a user account.

5.  Enter the account password, and then confirm the password.

6.  Click **OK** to save your changes and click **OK** again to return to the Services window.

7.  Stop and restart the service.

8.  Repeat steps 2-6 for each node.


Your corporate password policy might require that you change this login attribute periodically. If so, remember to update this service configuration. Otherwise, your access to network shares might fail.

**Parent topic:**[Pre-installation tasks](../install/c_preinstall_actions.md)

