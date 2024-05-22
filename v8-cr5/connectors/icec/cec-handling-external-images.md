# Handling external images 

Use the Admin Dashboard to control how HTTP images pulled from the web can be displayed in Connections Engagement Center.

From **Global Settings** in the Admin Dashboard, you can select how to handle external images in your Engagement Center:

-   With the **Enforce HTTPS** option \(default\), images originating in HTTP are pulled by Engagement Center using its security context \(HTTPS\). This option prevents the browser from warning users about insecure content.

    **Note:** With this option, sometimes HTTP images fail to load.

-   With **Use Proxy**, if your environment has a proxy server, the proxy loads the images, maintaining the browser's security context.

    For information on setting up a proxy server, see [HCL Connections proxy configuration](https://help.hcltechsw.com/connections/v7/connectors/icec/cec-inst-ibm-conx-proxy-config.html).

    You must also configure the proxy with a whitelist. 

-   With **Allow HTTP**, images sourced from HTTP are directly loaded inside Engagement Center \(HTTPS\) pages, causing some browsers to warn users of the insecure content.

    **Tip:** Use this option when a proxy server is not available and images sourced in HTTP cannot be loaded with HTTPS.


**Parent topic:** [Admin dashboard](../../connectors/icec/cec-admin_dashboard.md)

