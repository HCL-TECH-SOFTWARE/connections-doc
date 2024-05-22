# Installing Connections Engagement Center

Configure installation properties and run the installation program to deploy the Connections Engagement Center (CEC).

1.  Populate the `install80.properties` file with values from your server.

    If installing in a single-node server, make sure to populate **serverName** and **nodeName**.

    If installing in a clustered environment, make sure to specify **clusterName**.

2. Make sure Deployment Manager is running and the SOAP port is correct. By default, the installer uses port **8879** to connect wsadmin to the Deployment Manager. This port may vary in some environments.

    If your environment uses a different SOAP port, the installer will fail with the following error:
    
    ```
    WASX7023E: Error creating "SOAP" connection to host "HOST"; exception information: com.ibm.websphere.management.exception.ConnectorNotAvailableException: [SOAPException: faultCode=SOAP-ENV:Client; msg=Unable to find a valid IP for host localhost]
    ```

    1.  Verify your SOAP port: Open the `wsadmin.properties` file located in `NODE_PROFILE_HOME/properties` then look for the port number specified for property **com.ibm.ws.scripting.port** and make a note of the port number.

    2.  If the port number is different from **8879**, update the installer script:

        1.  Identify the installer file you are running, which depends on your platform, as follows:

            -   If installing on Windows, edit `CECInstaller_Windows.bat`
            -    If installing on Linux, edit `CECInstaller_Linux.sh`

        2.  Look for **-port 8879** and edit the `-port` parameter with the one specified in your `wsadmin.properties file` and save the file.

3. Run the installer on the `8.0_installer` directory:

    -   On Windows, open the command prompt, navigate to the directory, and run `CECInstaller_Windows.bat`
    -   On Linux, open the terminal, navigate to the directory, and run `CECInstaller_Linux.sh`

    Once the installation completes, the CEC app is ready for use. There is no need to restart it.


