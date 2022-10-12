# Customizing the Application Access and Access Request interfaces {#t_admin_oauth_cust_app_access_rquest_ui .task}

You can customize the header, footer, login, and error pages that prompt HCL Connections users to grant/deny and revoke access to their Connections data for third-party applications protected by OAuth. Also, you can edit the text strings that display on the Application Access and Access Requestinterfaces.

With the OAuth runtime configured, HCL Connections users can allow applications access to their data without sharing credentials and revoke that access at any time. Also, they can report malicious applications to an administrator, who can remove them from the list of applications enabled for OAuth. Users are prompted to either grant or deny access to applications when an attempt is made to access their data.

1.  To customize the header and the footer of the Application Access page and to the login page presented to users trying to authorize third party applications requesting access to Connections data, place a custom header.jsp, footer.jsp, andlogin.jsp in the <CUSTOMIZATION\_DIR\>/oauth/ folder.

2.  To customize the strings for both the Application Accessand Access Request interfaces, you can edit the strings in the `com.ibm.lconn.oauth.strings.ui_en.properties` property file.

    For more information about customizing interface strings, refer to [Customizing property strings](../customize/t_customize_strings_global.md).


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

