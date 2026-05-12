# Backing up Activities data {#t_admin_act_backup .task}

Activities stores data in both a database and the file system. You should backup both sets of data on a regular basis.

1.  From the WebSphere® Application Server Integrated Solutions Console, stop the Activities application or cluster.

2.  Back up the OPNACT database according to the database documentation provided by your database vendor.

    **Note:** Backup the database before backing up the content store on the file system.

3.  Backup the directory on the file system that contains the Activities data according to the documentation provided by your file system vendor. To determine the location of the Activities directory, get the value of the ACTIVITIES\_CONTENT\_DIR WebSphere Application Server variable for the relevant server by completing the following steps:

    1.  Open the WebSphere Application Server Integrated Solutions Console.

    2.  Select **Environment** \> **WebSphere Variables**.

    3.  Click **Show filter function**.

    4.  Ensure that **WebSphere Variables** displays in the Filter dropdown menu.

    5.  Enter ACTIVITIES\_CONTENT\_DIR into the **Search term\(s\)** text box and click **Go**. A variable called ACTIVITIES\_CONTENT\_DIR displays in the search results. Take a note of the value of this variable as the index location for the relevant server.

4.  Restart the Activities application or cluster.


**Parent topic:**[Administering Activities](../admin/c_admin_act_overview.md)

**Related information**  


[Restoring Activities data](../admin/t_admin_act_restore_data.md)

[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

