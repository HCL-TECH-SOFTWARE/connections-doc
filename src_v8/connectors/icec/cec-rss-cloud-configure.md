# Configuring a whitelist for the proxy server {#task_w5y_z2k_rdb .task}

For Connections organization administrators in the cloud, complete the following steps as a way to handle external images and configure the Clipping, RSS Feed, or iFrame widgets for first time use. You'll create a Customizer application that maintains a whitelist of URLs approved for use.

The Connections Customizer is a proxy service that enables you to modify the user experience. When a request is passed from a user to a standard Connections Cloud application, the Customizer intercepts the request and modifies it before passing it along.

Perform the following steps to create a Customizer application. The [RSS Feed widget](cec-rss-cloud.md) is used in the following example, which also applies to the [Clipping](cec-clipping.md) and [iFrame](cec-iframe_cloud.md) widgets.

1.  As an organizational administrator in your HCL Connections Cloud organization, go to **Admin \> Manage Organization \> Organization Extensions**.

2.  Click the **new Apps Manager** link.

    ![New Apps Manager link](images/new-apps-manager.png)

3.  In the App Registry workspace, click the **New App** button.

    ![New App button](images/new-app.png)

4.  Click **Basic Information** and give the app a name such as Approved Proxies.

    ![Type title in Basic Information](images/new-apps-basic-info.png)

5.  Click **Code Editor**.

    ![Code Editor to paste code](images/new-apps-code-editor.png)

6.  Copy and paste the following code:

    ```
    {
        "name": "Approved Proxies",
        "title": " Approved Proxies ",
        "description": "List of approved proxies for this organization",
        "services": [
            "Customizer"
        ],
        "state": "enabled",
        "extensions": [
            {
                "name": "com.ibm.customizer.proxy.list",
                "type": "com.ibm.customizer.proxy",
                "payload": {
                    "whitelist": [
                        {
                            **"url": "http://newsroom.ibm.com/announcements?pagetemplate=rss",
                            "domain": "ibm.com"**,
                            "method": [
                                "GET"
                            ]
                        }
                    ]
                },
                "application": "Approved Proxies"
            }
        ]
    }
    ```

7.  Modify the url and domain values as you need.

    -   Replace the sample URL \(http://newsroom.ibm.com/announcements?pagetemplate=rss\) with your own RSS feed URL. If you want all the URLs that end with .rss or .xml to be whitelisted, set "\*" as the url value: "url":"\*".
    -   The "domain" parameter is optional. If you want all URLs under the domain to be whitelisted, enter the domain name, for example, ibm.com. If you do not want to set the domain URLs, remove the line "domain": "ibm.com".
8.  Click **Save**.

    **Note:** The `com.ibm.customizer.proxy` property value is an extension point that Customizer uses to define a proxy configuration. When a request is made to Customizer to proxy a request, it will check with the App Registry for any defined instances of this extension point and, if found, will retrieve and return the content from the whitelisted URL. Currently only GET methods are supported but the list of operations will expand in future releases.


