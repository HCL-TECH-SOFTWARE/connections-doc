# Upgrading Highlights to Engagement Center {#cec-inst-upgrade602 .task}

If you want to expand the use of Connections Engagement Center throughout Connections by upgrading to a full version of the Engagement Center, follow these steps. This upgrade installs a license and adjusts a setting to provide the necessary configuration.

**Note:** You must first purchase a license for the full version of HCL Connections Engagement Center.

1.  Download and extract the **HCL Connections Engagement Center Update Package** from [My HCLSoftware](https://my.hcltechsw.com/).

2.  Populate the install650.properties file with the values from your server.

    -   If you are installing in a single node server, make sure you populate serverName and nodeName.
    -   If installing in a clustered environment please make sure you specify clusterName.
3.  Verify that Deployment Manager is running and that the SOAP port that connects it to wasadmin is correct.

    1.  Open the wasadmin.properties file located in the NODE\_PROFILE\_HOME/properties directory.

    2.  Find the port number specified for the com.ibm.ws.scripting.port property. By default the port number is 8879.

4.  Verify that Deployment Manager is running and that the SOAP port that connects it to wasadmin is correct. By default the installer uses port 8879 to connect wsadmin to the deployment manager. This port may vary in some environments.

    **Note:** If your environment uses a different SOAP port, the installer will fail with the following error: **WASX7023E**: Error creating "SOAP" connection to host "HOST"; exception information: com.ibm.websphere.management.exception.ConnectorNotAvailableException: \[SOAPException: faultCode=SOAP-ENV:Client; msg=Unable to find a valid IP for host localhost\]

    .

    To verify the SOAP port,

    1.  Open the wasadmin.properties file located in the NODE\_PROFILE\_HOME/properties directory.

    2.  Find the port number specified for the com.ibm.ws.scripting.port property. By default the port number is 8879.

5.  If the port number specified is different than 8879, make a note of the number. Then edit the upgrade program file for your operating system, replacing "-port 8879" with the port number that you found and save the file:

    -   On Windows, edit the CECInstaller\_Windows.bat file.
    -   On Linux, edit the CECInstaller\_Linux.sh file.

6.  Run the upgrade program:

    -   On Windows, open the command prompt, navigate to this directory, and run CECInstaller\_Windows.bat.
    -   On Linux, open the terminal, navigate to this directory, and run CECInstaller\_Linux.sh.

7.  Once the installation completes, the Connections Engagement Center app is ready for use. There is no need to restart it.


**Parent topic:**[Upgrading](../../connectors/icec/cec-inst-upgrade.md)

