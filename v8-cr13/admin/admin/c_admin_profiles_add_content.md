# Adding supplemental content to Profiles {#c_admin_profiles_add_content .concept}

You can use IBM® Tivoli® Directory Integrator assembly-line commands to add photo files and pronunciation files for your users to the Profiles database.

!!! note 
    
    When xWindows is not installed on your system, the `load_pronunciation_from_files` and `load_photo_from_files` commands might not work. In this scenario, you must change the default value of the headless_tdi_scripts setting in the  `profile_tdi.properties` file from false to true as follows:

        ```
        headless_tdi_scripts=true
        ```

Related information is available in the [IBM Security Directory Integrator solutions for HCL Connections real-world scenarios](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/IBM_Tivoli_Directory_Integrator_solutions_for_IBM_Connections_real-world_scenarios) wiki article.

Refer to the following topics for more information:

-   **[Uploading pronunciation files](../admin/t_admin_profiles_import_pronunciation.md)**  
Profiles users can add a recording of how their name is pronounced to enhance their profile. As administrator, you can use IBM Tivoli Directory Integrator assembly-line commands to populate the profiles database repository with pronunciation files for your users.
-   **[Populating Profiles with photos from another Profiles database](../admin/t_admin_profiles_import_photos_export-import.md)**  
You can use IBM Tivoli Directory Integrator assembly-line commands to transfer photos of your users from one Profiles database to another.

**Parent topic:** [Administering Profiles](../admin/c_admin_profiles_intro.md)

**Related information**  


[Adding source data to the Profiles database](../install/t_populate_profiles_db.md)

