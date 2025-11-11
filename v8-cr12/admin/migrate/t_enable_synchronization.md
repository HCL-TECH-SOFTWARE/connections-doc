# Enabling and disabling synchronization {#t_synch_updates .task}

Enable or disable the synchronization of nodes in a deployment of HCL Connections™.

You can enable the following types of synchronization from the Deployment Manager:

-   Automatic synchronization – Updates occur on a schedule. This type of synchronization is enabled by default in network deployments
-   Startup synchronization – Updates occur each time the server is started

To enable or disable synchronization, complete the following steps:

1.  Open the WebSphere® Application Server Integrated Solutions Console on the system that hosts the Deployment Manager and click **System Administration** \> **Node agents**.

2.  Click the **nodeagent** link for the node for which you are enabling or disabling synchronization.

3.  In the Additional Properties section, click **File synchronization service**.

4.  Perform one of the following actions:

    -   To turn on synchronization, select the **Automatic synchronization** and **Startup synchronization** check boxes.
    -   To turn off synchronization, clear the **Automatic synchronization** and **Startup synchronization** check boxes.
5.  Click **Save**.

6.  Click **System Administration** \> **Node agents**.

7.  Select the check box of the node for which you are enabling or disabling synchronization, and click **Restart**.

    If you are turning synchronization on or off for more than one node, perform this step for each node.

8.  Restart the Deployment Manager.


To perform a full synchronization, see the *Synchronizing nodes* topic.

**Parent topic:**[Synchronizing nodes](../migrate/t_synch_updates.md)

