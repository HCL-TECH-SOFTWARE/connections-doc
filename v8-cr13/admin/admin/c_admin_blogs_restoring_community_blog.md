# Restoring a Community Blog after a Communities database failure {#c_admin_blogs_restoring_community_blog .concept}

If the Communities database fails and is restored from a backup, you can restore the Blogs widget and delete any orphaned data.

When the Communities application experiences a database failure that involves restoring to a backup without replaying the transaction log to the point of failure, the remote data, such as the data associated with a community blog, needs to be restored as well. You can follow a number of steps to ensure a consistent data state for communities and their associated remote applications. You may need to run an admin command to restore community blogs. Restoring a blog will restore the content. If there is any orphaned data, you use another command to delete the orphaned data. The process for recovering remote application data such as a blog after a Communities database failure, is described in the topic *Recovering from a database failure*.

**Parent topic:** [Administering Blogs using the wsadmin client](../admin/r_admin_blogs_wsadmin.md)

**Related information**  


[Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)

[Maintaining application databases](../admin/t_admin_db_maintain.md)

