# Reverting Common, Connections-proxy, and WidgetContainer applications for Uninstallation {#t_install_revert_commonwidg_for_uninstall .task}

The HCL Connections Installation Manager program requires that you revert the Common and WidgetContainer applications the News cluster for uninstallation if you previously separated those applications to their own clusters.

**Note:** When reverting the Common application, the Connection-proxy ear will be reverted at the same time. The new cluster, node, and server name will be the same as those of the Common application.

1.  Stop all clusters in the Connections deployment.

2.  On the deployment manager, open a command prompt, and then change to the following directory on the WebSphere Application Server hosting the HCL Connections server:

    -   On Linux™:

        ```
        /opt/IBM/Connections/ConfigEngine
        ```

    -   On Microsoft™ Windows™:

        ```
        C:\IBM\Connections\ConfigEngine
        ```

3.  Enter the following command to run the script that reverts the Common application to the News cluster:

    -   On Linux:

        ```
        ./ConfigEngine.sh revert-common-ear -DWasUserid=<was_admin_username> -DWasPassword=<was_admin_password> > /tmp/revert-common-ear.log 2>&1
        ```

    -   On Microsoft Windows:

        ```
        ConfigEngine.bat revert-common-ear -DWasUserid=<was_admin_username> -DWasPassword=<was_admin_password> > C:\revert-common-ear.log 2>&1
        ```

    For example, on the Microsoft Windows operating system, you would enter the following command:

    ```
    ConfigEngine.bat revert-common-ear -DWasUserid=wasadmin -DWasPassword=yourpassword > C:\revert-common-ear.log 2>&1
    ```

4.  Enter the following command to run the script that reverts the WidgetContainer application to the News cluster:

    -   On Linux:

        ```
        ./ConfigEngine.sh revert-widgetcontainer-ear -DWasUserid=<was_admin_username> -DWasPassword=<was_admin_password> > /tmp/revert-widgetcontainer-ear.log 2>&1
        ```

    -   On Windows:

        ```
        ConfigEngine.bat revert-shindig-ear -DWasUserid=<was_admin_username> -DWasPassword=<was_admin_password> > C:\revert-shindig-ear.log 2>&1
        ```

    For example, on the Microsoft Windows operating system, you would enter the following command:

    ```
    ConfigEngine.bat revert-widgetcontainer-ear -DWasUserid=wasadmin -DWasPassword=yourpassword > C:\revert-widgetcontainer-ear.log 2>&1 
    ```

5.  Proceed with uninstallation.


**Parent topic:**[Uninstalling](../install/t_uninstall_over.md)

