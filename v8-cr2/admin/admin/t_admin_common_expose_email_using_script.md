# Exposing email addresses {#t_admin_common_expose_email_using_script .task}

Allow email addresses to be displayed in HCL Connections.

Complete this task only if you configured HCL Connections to prevent email addresses from being displayed. For more information, see *Hiding email addresses*.

If you configured HCL Connections to prevent email addresses from being displayed but now you want to allow email addresses to be displayed, complete this task.

1.  Open a command prompt and change to the following directory on the WebSphere® Application Server that hostsHCL Connections:

    -   Linux™: /opt/IBM/Connections/ConfigEngine
    -   Microsoft™ Windows™: C:\\IBM\\Connections\\ConfigEngine
2.  Enter the following command to run the script that configures HCL Connections to display email addresses on each WebSphere Application Server profile to which you installed an application:

    -   Linux:./ConfigEngine.sh action-expose-email \> /tmp/expose\_email.log 2\>&1
    -   Microsoft Windows:ConfigEngine.bat action-expose-email \> D:/expose\_email.log 2\>&1
    For example, on Windows, enter the following command:

    ConfigEngine.bat action-expose-email \> D:/expose\_email.log 2\>&1

3.  Add the email address references that were removed from user profiles.

4.  Restart the servers.


**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

