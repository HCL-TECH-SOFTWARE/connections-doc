# Restricting topic editing {#restrictforumtopiceditingtocreators .task}

You can restrict the editing of forum topics or replies to their creators. Only a user who created a topic or a reply can edit it.

To restrict the editing of forum topics to the users who created them, you must add some elements to the LotusConnections-config.xml file. Then, you must edit the forum-policy.xml file, deleting any rows that contain edit\_all\_post.

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
2.  Use the wsadmin client to access and check out the HCL Connections configuration files:

    1.  Enter the following command to access the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out the HCL Connections configuration files:

        LCConfigService.checkOutConfig\("working\_directory","cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you modify them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

            Linux only: The directory must grant write permissions or the command does not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections applications. This argument is case-sensitive, so type it with care. If you do not know the cell name, type the following command while in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        -   Linux:LCConfigService.checkOutConfig\("/opt/temp","foo01Cell01"\)
        -   Microsoft Windows:LCConfigService.checkOutConfig\("c:/temp","foo01Cell01"\)
3.  Open the `LotusConnections-config.xml` file in an editor, and then add the following content:

    <properties\> <genericProperty name="forceContentEditOnlyByCreator"\>true</genericProperty\> </properties\>

4.  Open the LotusConnections-config.xml file in a web browser to make sure that you did not introduce any errors. XML files that are well formed display in a web browser; if there are errors, the web browser reports that an error was encountered. Fix any errors before proceeding.

5.  Check in the configuration files during the same wsadmin session in which you checked them out.

    1.  Update the value of the version stamp configuration property to force users' browsers to pick up this change. Enter the following command to increment the value of the versionStamp property:

        **Note:** This command is required only when a change is made to the product user interface and the change is to a file checked out using LCConfigService.

        LCConfigService.updateConfig\("versionStamp","gmt\_timestamp"\) where gmt\_timestamp is the GMT time. You can specify an empty string for the time stamp or provide a GMT value string. When you specify an empty string, the client calculates the current GMT time and updates the version stamp with that value. If you choose to provide the time, specify it using the following format: `yyyyMMdd.HHmmss` and specify the time in GMT. It is best to provide an empty string and let the client format the time stamp. For example: LCConfigService.updateConfig\("versionStamp",""\).

        For more information, see *Required post-customization step*.

    2.  To check in the changed configuration property files, use the following command:

        LCConfigService.checkInConfig\(\)

    3.  Type the following command to deploy the changes:

        synchAllNodes\(\)

    4.  Do not exit the wsadmin client.

6.  In the wsadmin client, check out the forum-policy.xml file. For more information, see *Editing configuration files*.

7.  Open the forum-policy.xml file in an editor and delete any row that contains edit\_all\_post.

8.  Check in the forum-policy.xml file.

9.  Restart all of the HCL Connections application servers.


**Parent topic:**[Administering Forums](../admin/c_admin_forums_overview.md)

**Related information**  


[Editing configuration files](../admin/t_admin_common_checkout_config_file.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

