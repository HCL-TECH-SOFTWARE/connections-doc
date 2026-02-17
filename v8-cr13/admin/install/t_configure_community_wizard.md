# Configuring the community creation wizard {#t_configure_community_wizard .task}

Starting with Connections 7.0, a community wizard is available to help users create communities. Replacement of the old Community creation process is managed by configuration, which provides you the flexibility to first deploy and test that capability and then switch the user experience.

This tailored experience feature for communities has the following prerequisites: 

-   Either the **Feature Foundation** module must be selected during Connections installation, or you must already have \(I\)CXT installed in your Connections environment. If you are upgrading and deployed ICXT in your 6.5 environment, upgrade to \(I\)CXT 7 before deploying the tailored experience feature.
-   Component Pack, making sure that you completed the sample task for **Tailored Experience** during [Component Pack installation](cp_install_services_tasks.md).

The tailored experience feature enables an authorized user or user group to create and distribute templates based on existing communities. A template can consist of both structure \(such as the definition of apps\) and data \(such as in Blogs or Wikis\), and can be used to create new communities that should inherit both kinds of information. A community creator can leverage existing templates to accelerate the distribution of information within communities and make use of information that was already created.

Templating is a capability within the community creation wizard--by doing the following procedure, both the wizard and templating are enabled.

1.  Identify the WebSphere CONNECTIONS\_CONFIGURATION\_PATH variable first. Navigate to the update subfolder of this directory.

2.  Update the 00000000-0000-0000-0000-000000000000.json file, adding the following content:

    ```
    
    { 
        "organisation": "00000000-0000-0000-0000-000000000000", 
         "settings": [ 
        { 
        "name": "gatekeeper.COMMUNITIES_TEMPLATE", 
        "title": "Enable or disable COMMUNITIES_TEMPLATE setting", 
        "category": "general", 
        "canModify": true, 
        "allowRoles": true, 
        "validation": { "type": "boolean", "details": "" }, 
     "values": { "___default_role___": { "isFile": false, "content": true }} 
             }, 
            { 
                 "name": "gatekeeper.COMMUNITIES_TE_CREATION_WIZARD", 
                  "title": "Enable or disable COMMUNITIES_TE_CREATION_WIZARD setting", 
                  "category": "general", 
                  "canModify": true, 
                 "allowRoles": true, 
                  "validation": { "type": "boolean", "details": "" }, 
     "values": { "___default_role___": { "isFile": false,  "content": true }} 
             } 
         ] 
    }
    ```

3.  Save the file.

4.  Open a command line and navigate to your Deployment Manager’s profile directory. From the bin subdirectory, open a wsadmin prompt and run the following command:

    ```
    highwayAdmin.py. 
    ./wsadmin.sh -lang jython -user <WebSphereAdmin> -password <password> 
    execfile('highwayAdmin.py') 
    HighwayService.updateSettingsFromFile()
    ```


**Parent topic:**[Post-installation tasks](../install/r_post-installation_tasks.md)

**Related information**  


[Administering community templates](../admin/t_admin_comm_templates_container.md)

