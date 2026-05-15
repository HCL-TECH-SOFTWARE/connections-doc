# Editing the events-config.xml file {#editingevents-config.xml .task}

Edit the events-config.xml file to change how events are collected and managed

To edit the events configuration file, you must check it out first.

1.  Start the wsadmin client by completing the following steps:

    1.  Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin

        app\_server\_root/profiles/dm\_profile\_root/bin. Where app\_server\_root represents the IBM WebSphere Application Server installation directory, for example:

        ```
        Linux:
        /opt/IBM/WebSphere/AppServer
        
        ```

        ```
        Windows:
        drive:\Program Files\IBM\WebSphere\AppServer
        
        ```

        Where drive is the system drive on which the file directory is stored. For example: C: or D:.

        where dm\_profile\_root is the Deployment Manager profile directory; this directory is usually called dmgr01. For example, on Windows, the directory is C:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin.

        **Attention:** You must run the command to start the wsadmin client from this specific directory because the Jython files for the product are stored there. If you start the client from a different directory, the execfile\(\) command does not work correctly.

    2.  Enter the following command to start the wsadmin client:

        -   Linux: ./wsadmin.sh -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        -   Microsoft Windows: wsadmin -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        where:

        -   admin\_user\_id is the user name of the Administrator role on IBM WebSphere® Application Server. This administrator must be configured at the cell level, not at the cluster, node, or server level.
        -   admin\_password is the password of the WebSphere Application Server administrator.
        -   SOAP\_CONNECTOR\_ADDRESS\_PORT is the SOAP port for the WebSphere Application Server deployment manager server. The default value of the SOAP port is 8879. If you are using the default port value, you do not have to specify this parameter. If you are not using the default value and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, complete the following steps:
            1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.
            2.  In the Additional properties section expand **Ports**, and then look for the SOAP\_CONNECTOR\_ADDRESS port entry to find the port number.
        For example:

        -   Linux: ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
        -   Microsoft Windows: wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879
2.  Use the following command to access HCL Connections configuration files:

    execfile\("connectionsConfig.py"\)

3.  Check out the events-config.xml file:

    LCConfigService.checkOutEventsConfig\("working\_directory", "cell\_name"\)

    where:

    -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

        **Notes:**

        -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
        -   Linux only: The directory must grant write permissions or the command fails.
    -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

        **Note:** This input parameter is case-sensitive.

    For example:

    LCConfigService.checkOutEventsConfig\("C:/temp","foo01Cell01"\)

4.  Go to the working directory that you specified in Step 3, open the events-config.xml file, and edit the properties that you want to change.

5.  Check in the file:

    LCConfigService.checkInEventsConfig\("working\_directory", "cell\_name"\)

    **Note:** You must check in the file during the same wsadmin session in which you checked it out.

6.  Deploy the changes by synchronizing the nodes:

    synchAllNodes\(\)

7.  To exit the wsadmin client, type `exit` at the prompt.

8.  Stop and restart the servers that host the HCL Connections.


**Parent topic:**[Editing configuration files](../admin/t_admin_common_checkout_config_file.md)

