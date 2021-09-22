<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Connections

1. Install HCL Connections v7 on the new system following this procedure: [Installing Connections](https://help.hcltechsw.com/connections/v7/admin/install/c_installing.html) 
2. Apply the HCL Connections v7.0 Multi Tenant Update following this procedure:  [Updating HCL Connections 7.0 with the latest interim fix](https://help.hcltechsw.com/connections/v7/admin/migrate/c_updating_interim_fixes.html) 

   **Note:** The HCL Connections V7.0 Update Wizard (2104) is required to install the MT Update  

3. ![attention.jpg](attention.jpg)Remove wasadmin from all org-admin roles in all services
    
    The WebSphere Administrator is a non-org user and should never be defined as the org-admin for HCL Connection components in a multi-tenant deployment. The Connections install program currently sets the WebSphere Administrator as the org-admin in: Applications > Application Types > Enterprise Applications > [component name] > Security role to user/group mapping

    The WebSphere Admin needs to be manually removed from all HCL Connections components otherwise there will be instability within the components. 

    After installing Connections v7.0, remove wasadmin from all org-admin roles in all services, or if you are enabling MT configuration changes then remove all wasadmin type user from orgadmin roles.

4. Backup 6.5 databases and then restore on new server.
5. Upgrade the Homepage database to V7.0 schema by running the following script

   ```
   \Wizards\connections.sql\homepage\DB2\upgrade-60CR4-70.sql.
   ```

6. Copy the content on file system of 6.5 to new server on 7.0 at same location. Refer to the documentation. Note that organizational separation is maintained in the database tables, but all files are mixed when on the file system. Below are content locations for copying each of the files for each application to appropriate locations.
    - ACTIVITIES\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/activities/content
    - BLOGS\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/blogs/upload/content
    - FILES\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/files/upload/files
    - FORUMS\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/forums/content
    - WIKIS\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/wikis/upload/files
7. If LDAP server is same, then just copy the 6.5&#39;s directory-services.xml [\&lt;WAS\_DMGR\_PROFILE\&gt;/config/cells/\&lt;cell\_name\&gt;/LotusConnections-Config/directory-services.xml] to 7.0 system at same location.
8. Ensure that you regenerate the IBM HTTP Server WebSphere plugin.  Refer to the step to Configure the HTTP Server plugin with Connections within this topic [Installing HCL Connections 7.0](https://help.hcltechsw.com/connections/v7/admin/install/t_install_cluster.html). 
9. Full Sync nodes and restart the WebSphere application servers.

<?tm 1541016643182 1 HCL Connections ?>


