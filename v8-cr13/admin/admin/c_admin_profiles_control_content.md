# Managing profile content {#c_admin_profiles_control_content .concept}

You can enable the active content filter to prevent users from embedding malicious content in text input fields in Profiles. You can also use administrative commands to update or remove inappropriate information in fields to which you do not have owner access.

The following topics provide more information about managing profile content:

-   **[Excluding nicknames from the Profiles database](../admin/t_admin_profiles_excluding_nicknames.md)**  
You can exclude nicknames when adding or updating user profiles by adding a property in the `tdi-profiles-config.xml` file.
-   **[Filtering active content in Profiles](../admin/t_admin_profiles_filter_active_content.md)**  
Profiles provides a filter that prevents users from creating rich text descriptions with malicious scripts that are executed when other users visit Profiles. You can enable or disable this component.
-   **[Removing inappropriate content](../admin/t_admin_profiles_remove_inapp_content.md)**  
Content management commands are used to update inappropriate information stored in the Profiles database, such as text displayed in the **About Me** and **Background** fields of the Profiles user interface. These administrative commands can also be used to delete inappropriate photos from the database. No file checkout or server restart is required when using the commands.

**Parent topic:** [Administering Profiles](../admin/c_admin_profiles_intro.md)

