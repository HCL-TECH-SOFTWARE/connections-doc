# Uninstalling Cognos Business Intelligence server {#t_inst_uninstall_cognos_bi_server .task}

You uninstall Cognos® by uninstalling the Cognos Business Intelligence server and Cognos Transformer and removing the powercube refresh scheduler .

1.  Stop the Cognos server from the application server list on the IBM® WebSphere® Deployment Manager.

2.  Remove the Cognos server node from the Deployment Manager by navigating to **System Administration** \> **Nodes** and then select the node containing Cognos and click **Remove Node.**

    **Note:** Do not remove the node if other servers on this node should remain in the DMGR cell. If this node should remain in the cell, please use a new node for the Cognos server that will be used with Connections 5.0.

3.  Uninstall the Cognos application on the IBM WebSphere Deployment Manager if it still exists by navigating to **Applications** \> **Application Types** \> **Websphere enterprise applications** \> **Select Cognos** and then click **Uninstall**.

4.  On the machine where the Cognos application is installed, remove the Cognos server instance in WAS by using the following command:

    ```
    wsadmin -lang jython -conntype NONE -c "AdminServerManagement.deleteServer('NODE_NAME', 'cognos_server')"
    ```

    Where NODE\_NAME is the name of the node that the cognos\_server is in. Also, change cognos\_server to be the actual server name if that has been changed. This command is run from the $WAS\_HOME/bin folder.

5.  Make sure that the following Cognos processes have stopped before proceeding to the next step.

    -   IBM AIX® or Linux™: cgsServer.sh and CAM\_LPSvr processes
    -   Microsoft™ Windows™: cgsLauncher.exe and CAM\_LPSvr processes
    These processes should have stopped within a few minutes after the Cognos application stopped.

6.  From the operating system command line, change to the Cognos\_BI\_install\_path/uninstall directory.

    1.  At the command prompt, enter the following command:
        -   Windows: uninst -u
        -   UNIX™ or Linux with XWindows: ./uninst -u
        -   UNIX or Linux without XWindows: ./uninstnx -u -s
    2.  Then follow the prompts to complete the IBM Cognos Business Intelligence Server uninstallation.
7.  Delete the folder that Cognos Business Intelligence Server was installed.

8.  From the operating system command line, change to the Cognos\_Transformer\_install\_path/uninstall directory.

    1.  At the command prompt, enter the following command:
        -   Windows: uninst -u
        -   UNIX or Linux with XWindows: ./uninst -u
        -   UNIX or Linux without XWindows: ./uninstnx -u -s
    2.  Then follow the prompts to complete the IBM Cognos Business Intelligence Transformer uninstallation.
9.  Delete the folder where Cognos Business Intelligence Transformer was installed.

10. Delete all the files from the path where the powecube file was stored.

11. Remove the powercube refresh scheduler as follows:

    -   Windows:

        ```
        schtasks /delete /tn MetricsCubeDailyRefresh /f
        schtasks /delete /tn MetricsCubeWeeklyRebuild /f
        ```

    -   UNIX or Linux:

        ```
        crontab -e
        
        ```

        Edit the file opened to remove the lines that contain the following path, then save the change.

        ```
        Cognos_Transformer_install_path/metricsmodel/daily-refresh.sh
        ```

        Or

        ```
        Cognos_Transformer_install_path/metricsmodel/weekly-rebuild.sh
        ```


**Parent topic:**[Uninstalling](../install/t_uninstall_over.md)

