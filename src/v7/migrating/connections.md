<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Connections

1. Backup 6.5 databases and then restore on new server.
2. Upgrade the Homepage database to V7.0 schema by running the following script

   ```
   \Wizards\connections.sql\homepage\DB2\upgrade-60CR4-70.sql.
   ```

3. Copy the content on file system of 6.5 to new server on 7.0 at same location. Refer to the documentation. Note that organizational separation is maintained in the database tables, but all files are mixed when on the file system. Below are content locations for copying each of the files for each application to appropriate locations.
    - ACTIVITIES\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/activities/content
    - BLOGS\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/blogs/upload/content
    - FILES\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/files/upload/files
    - FORUMS\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/forums/content
    - WIKIS\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/wikis/upload/files
4. If LDAP server is same, then just copy the 6.5&#39;s directory-services.xml [\&lt;WAS\_DMGR\_PROFILE\&gt;/config/cells/\&lt;cell\_name\&gt;/LotusConnections-Config/directory-services.xml] to 7.0 system at same location.
5. Full Sync nodes and restart the WebSphere application servers.

<?tm 1541016643182 1 HCL Connections ?>


