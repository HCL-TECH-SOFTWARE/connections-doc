# Troubleshooting display problems {#configuringiebrowserswithhighsecuritytoworkwithibmconnections .task}

Microsoft™ Internet Explorer versions 7 and 8 browsers with security set to high do not display HCL Connections™ properly. You must either reduce the browser security level or change browser settings.

Issues include:

-   Data missing from dropdown menus
-   Missing icons
-   Community widgets not working
-   Files upload dialog displaying improperly

1.  Perform the following steps to resolve display issues and keep high security.
2.  Open the Internet Explorer browser.

3.  Click **Internet Options** \> **Security** \> **Internet** \> **Custom level**.

4.  In the **ActiveX Controls and plug-ins** area of **Binary and script behaviors**, select **Enable**.

5.  In the **ActiveX Controls and plug-ins** area of **Script ActiveX controls marked safe for scripting**, select **Enable**.

6.  In the **Scripting** area of **Active Scripting**, select **Enable**.


**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

