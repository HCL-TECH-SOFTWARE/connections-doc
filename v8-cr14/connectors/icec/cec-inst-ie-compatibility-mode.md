# Internet Explorer compatibility mode {#id_name .reference}

To activate the Internet Explorer compatibility mode, two custom properties can be set in the Admin Dashboard.

-   **override-x-ua-meta:** This property is used to set the metatag **<meta http-equiv=X-UA-Compatible\>** on top of the page.
-   **override-x-ua-header:**This property is used to set the HTTP header \(X-UA-Compatible\).

In order to change settings for the IE compatibility mode:

1.  Open the Connections Engagement Center in your browser as an administrative user
2.  click on **Customize**
3.  Go to the Tab **Connections Engagement Center Settings**
4.  Now click on the **Global Settings** button

The Connections Engagement Center Admin Dashboard will open in a new browser tab. Now click on the **Custom Properties** tab and create the properties you want to use.

In order to maximize Connections Engagement Centers performance, property values are cached for a time span of 5 minutes. Changes to properties may lead to an effective delay of 5 minutes until they appear in the browser.

If the values are not set, no header or metatag will be created.

For more information see [https://msdn.microsoft.com/en-us/library/ff955275\(v=vs.85\).aspx](https://msdn.microsoft.com/en-us/library/ff955275(v=vs.85).aspx).

**Parent topic:**[Configuring](../../connectors/icec/cec-inst-configuring.md)

