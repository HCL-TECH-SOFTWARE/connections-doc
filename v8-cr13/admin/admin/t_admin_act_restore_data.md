# Restoring Activities data {#t_admin_act_restore_data .task}

You can restore Activities data to a previously backed up version.

This procedure assumes that you have been backing up the Activities database and content store on a regular basis.

1.  From the WebSphere® Application Server Integrated Solutions Console, stop the Activities application or cluster.

2.  Stop the Search service or cluster.

3.  Restore the OPNACT database from the latest backed up version according to the database documentation provided by your database vendor.

    **Note:** Restore the database before restoring the content store on the file system.

4.  Restore the data in the directory on the file system that contains the Activities data according to the documentation provided by your file system vendor.

5.  Delete the HCL Connections index. Refer to the instructions in the *Deleting the index* topic.

6.  Restart the Search application or cluster.

7.  Restart the Activities application or cluster.

8.  If you have any community activities, you must perform some additional step to make sure that the Activities database and Communities database are synchronized with the same activities data. To do so, complete the steps described in the *Comparing remote application data with the Communities database* topic.


**Parent topic:**[Administering Activities](../admin/c_admin_act_overview.md)

**Related information**  


[Maintaining application databases](../admin/t_admin_db_maintain.md)

[Deleting the index](../admin/t_admin_search_delete_index.md)

[Backing up Activities data](../admin/t_admin_act_backup.md)

[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

