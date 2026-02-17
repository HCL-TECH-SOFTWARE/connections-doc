# Setting up a new proxy core group 

It is necessary to separate the WebSphere® Application Server \(WAS\) proxy server and the PushNotificationClusters into different core groups to ensure that requests for the PushNotificationClusters do not get routed to the HTTP Server \(IHS\) simultaneously.

1.  Create a new proxy core group for the proxy server and the PushNotificationClusters.

    1.  On your Deployment Manager \(DM\) console, navigate to **Servers** \> **Core Groups** \> **Core group settings**.

    2.  Ensure that the PushNotificationClusters and the WAS proxy server are stopped before proceeding.

    3.  Ensure that the WAS proxy server nodeagent is stopped before proceeding.

    4.  Click **New...**. Specify a new core group name.

    5.  Accept the default values for the rest of the settings. Click **Apply** and save the configuration if prompted.

2.  Assign PushNotificationClusters and proxy server components to the proxy core group.

    1.  Click **DefaultCoreGroup** and then select **Core group servers**.

    2.  Select all elements relating to the PushNotificationClusters and the WAS proxy server. Include any nodeagents associated with the proxy server.

    3.  Click **Move...**.

    4.  The **To core group** option should already be selected to be the ProxyCoreGroup that you set up earlier. If not, or if you have multiple core groups, make sure that the **Proxy Core Group** option that you previously set up is selected.

    5.  Click **Apply** and save the configuration file if prompted.

3.  Set up the Core Bridge interfaces.

    1.  The core group bridge service enables the exchange of high availability information among core groups within the same cell, as well as among core groups in different cells. You must set up core bridge interfaces within the DefaultCoreGroup and the ProxyCoreGroup in order for them to communicate with each other at a high level. On your DM console, navigate to **Servers** \> **Core Groups** \> **Core group bridge settings**.

    2.  Expand **DefaultAccessPointGroup**. You should see your DefaultCoreGroup and your ProxyCoreGroup listed.

    3.  Select **DefaultAccessPointGroup**, and then select **Core group access points**.

    4.  Select **DefaultCoreGroup**, which might be displayed as `CGAP_1\DefaultCoreGroup` and click **Show Detail**.

    5.  Select **Bridge interfaces**.

    6.  Click **New...**. A list of the various elements of the associated servers and WebSphere server within the CoreGroup is displayed.

    7.  For **DefaultCoreGroup**, select each of the **Cluster and Servers** from the associated WAS application nodes. You can only select one option at a time, so select one option, click **Apply**, save the configuration file, and repeat this process by clicking **New**. Repeat this procedure until all Cluster\#\_server\# types are selected.

    8.  Follow the link breadcrumb trail on your DM and navigate to **Servers** \> **Core Groups** \> **Core group bridge settings** \> **DefaultAccessPointGroup** \> **Core group access points**. Select your proxy core group from the list and click **Show Detail**.

    9.  Select **Bridge interfaces**.

    10. Click **New...**. Select one option from the list, click **Apply**, save the configuration file, and repeat as needed.

4.  Verify the bridge interfaces.

    1.  On your DM console, navigate to **Servers** \> **Core Groups** \> **Core group bridge settings**.

    2.  Expand all **+** options for the listed Core Groups and their access points. You should now see your bridge interfaces set up accordingly.

    3.  Stop, synchronize, and restart your node agents. If you restart your deployment after assigning the bridge interfaces, and the initial loading of the bridge interfaces causes an error, restart the Java™ Virtual Machines \(JVMs\).


