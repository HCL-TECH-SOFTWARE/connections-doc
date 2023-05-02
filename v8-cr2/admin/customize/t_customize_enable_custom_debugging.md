# Enabling live user interface customization editing mode {#t_customize_enable_custom_debugging .task}

You can force applications to reload override files every time a browser request is made. This capability shows your customization changes in the product instantly.

**Important:** Do not leave the product in customization debugging mode when you are using it in a production environment. This capability is resource-intensive and has a major impact on product performance. Use debugging mode only when you are making and testing changes to the user interface during the testing phase. Ensure that you disable this feature after you validate your customizations. If you forget to disable customization debugging, an error is written to the log to remind you.

1.  To turn on the customization debugging capability, add a WebSphere® Application Server environment variable named CONNECTIONS\_CUSTOMIZATION\_DEBUG and set it to true.

    1.  Open the IBM® WebSphere Application Server Integrated Solutions Console, expand **Environment**, and then click **WebSphere variables**.

    2.  In the Scope section, select cell 1 from the list, and then click **New**.

    3.  Type the following values into the fields:

        Name
        :   CONNECTIONS\_CUSTOMIZATION\_DEBUG

        Value
        :   true

    4.  Click **Apply**, and then **OK** to return to the previous page.

2.  Enable a trace string to get customization debug information as follows:

    **Note:** Perform these steps for each server to which the trace string must be added.

    1.  Open the IBMWebSphere Application Server Integrated Solutions Console, browse to **Troubleshooting** \> **Logs and trace** and select the server to be customized.

    2.  Click **Diagnostic trace** \> **Configuration**.

    3.  In the Change log detail levels window, add `com.ibm.lconn.core.web.customization.*=all`

    4.  Click **OK** and save the changes.

    5.  Restart the servers that received the trace string change.

3.  When you have gathered the logging information, disable the trace string as follows:

    **Note:** Perform these steps for each server to which the trace string was added.

    1.  Open the IBMWebSphere Application Server Integrated Solutions Console, browse to **Troubleshooting** \> **Logs and trace** and select the server where trace was enabled.

    2.  Click **Diagnostic trace** \> **Configuration**.

    3.  In the Change log detail levels window, remove `com.ibm.lconn.core.web.customization.*=all`

    4.  Click **OK** and save the changes.

    5.  Restart the servers that received the trace string change.

4.  Disable customization debugging, set the CONNECTIONS\_CUSTOMIZATION\_DEBUG variable to false.

    1.  Open the Integrated Solutions Console, expand **Environment**, and then click **WebSphere variables**.

    2.  In the Scope section, select cell 1 from the list.

    3.  Select **CONNECTIONS\_CUSTOMIZATION\_DEBUG** and enter false in the **Value** field.

    4.  Click **Apply**, and then click **OK**.

    5.  Restart the server for your changes to take place.


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

