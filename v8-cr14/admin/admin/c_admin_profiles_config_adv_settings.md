# Configuring advanced settings in Profiles {#c_admin_profiles_config_adv_settings .concept}

Configure advanced settings in Profiles by adding information to the <properties\> element in the `profiles-config.xml` file.

For the most part, you can use the `ProfilesConfigService.updateConfig` command to update settings in the `profiles-config.xml` file. However, for some advanced settings, you must check out the configuration file and make changes to it manually. For example, if you want to change the display order of the information that displays on the Reporting Structure page or to expose information relating to the following feature, you must use the steps documented in the following topics.

!!! note 
    
    For a full list of the properties that you can update using the `ProfilesConfigService.updateConfig` command, see *Profiles configuration properties*.

-   **[Exposing information about following](../admin/t_admin_profiles_expose_following_info.md)**  
You can add a setting to the profiles-config.xml file to specify whether information relating to the following feature is made public.
-   **[Changing the display order of the Reporting Structure page](../admin/t_admin_profiles_change_display_of_full_reports_to.md)**  
You can add a setting to the `profiles-config.xml` file to change the order in which the full report-to chain is displayed on the Reporting Structure page.

**Parent topic:** [Administering Profiles](../admin/c_admin_profiles_intro.md)

**Related information**  


[Profiles configuration properties](../admin/r_admin_profiles_config_props.md)

