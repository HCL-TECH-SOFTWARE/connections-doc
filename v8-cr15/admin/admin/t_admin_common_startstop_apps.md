# Starting or stopping Connections applications {#startingorstoppingconnectionsapplications .task}

HCL Connections applications, such as Files, are WebSphere® Enterprise Applications. Start or stop them in the WebSphere Integrated Solutions console as you would any other WebSphere application.

For complete information about starting and stopping WebSphere applications, see the [Starting or stopping enterprise applications](https://www.ibm.com/docs/was-nd/8.5.5?topic=applications-starting-stopping-enterprise) topic in the IBM® WebSphere Application Server documentation.

1.  Log in to the WebSphere Integrated Solutions console.

2.  Click **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

3.  Select the check box for the application that you want to start or stop.

4.  Click **Start** or **Stop**:

    |Option|Description|
    |--|--|
    |**Start**|Runs the application and changes the state of the application to **Started**. If not all servers on which the application is deployed are running, the status is changed to partially started .|
    |**Stop**|Stops the processing of the application and changes the state of the application to **Stopped**.|

    To restart a running application, select the application that you want to restart, click **Stop**, and then click **Start**.


**Parent topic:** [Administration tools](../admin/c_admin_common_tools.md)

