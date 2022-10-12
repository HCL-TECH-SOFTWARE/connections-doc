# Uninstalling the current version {#uninstallingfeb .task}

The following instructions describe how to uninstall Community Surveys.

If your current deployment environment includes WebSphere Application Server or WebSphere Portal and uses DB2 as your data store, run the uninstall.

However, if you use the non-production Community Surveys with WebSphere Application Server Community Edition, you must take action to preserve your current Community Surveys applications and any existing data that was collected before you run the Community Surveys uninstall. To preserve your applications and data, use the **Export** option on the **Manage** tab for each application. When given the option, choose to include the data with your export. A .nitro\_s file is created. Save this .nitro file in a trusted location. Repeat the export operation for each application you created. If there are multiple users who designed applications on the server, each user must export the applications that they would like to preserve. These application files can be imported into Community Surveys after an upgrade is completed. After you export the data that you want to save, run the uninstall.

1.  To uninstall Community Surveys, open IBM Installation Manager.

2.  Click **Uninstall** in the Installation Manager window and select the IBM Community Surveys package.

    **Note:** When you uninstall the non-production Community Surveys with WebSphere Application Server Community Edition, you are prompted for the administrator user ID and password. If you do not enter a valid administrator user ID and password, the server is not stopped. You must stop and remove the server manually.


**Parent topic:**[Installing Community Surveys](../install/t_inst_installing_forms_experience_builder.md)

