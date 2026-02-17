# Integrating with Activities Plus {#cp_3p_install_upgrade_intro .concept}

Huddo \(formerly Kudos\) Activities Plus is the team collaboration tool \(replacement of Connections Activities\) from Huddo Boards that makes work easier and more intuitive.

With Activities Plus, users can view an activity as a board, giving them the option to drag and drop their Tasks and Entries.They can also filter the content of their boards by person, by priority, by color, and more. Existing Connections activities can be converted and imported to boards, where users can continue to work in a more modern and effective way.

Activities Plus uses the existing Component Pack infrastructure \(Docker/Kubernetes cluster\), and is seamlessly integrated with Connections on-premises applications such as Communities, Files, Homepage \(Orient Me\), and the Connections mobile application. Activities Plus uses the Mongo database already deployed inside the Component Pack.

!!! note
    
    Activities Plus is not integrated with the Connections Ideation Blog app used in Connections Communities. The Ideation Blog feature that generates a community activity when members "graduate" ideas from an ideation blog does not work in Activities Plus.

    However, users must ensure that the Activities application remains active for Boards to function correctly. Even if Activities Plus is enabled, the original Activities application is still required. Disabling it may result in errors and cause some features to stop working properly.

- **[Installing Activities Plus services](../install/cp_3p_install_ap_services.md)**  
Activities Plus in Connections Component Pack uses the existing Component Pack infrastructure, assuming that you have a working Component Pack environment.
- **[Configuring Activities Plus services](../install/cp_3p_config_ap_intro.md)**  
Configure Activities Plus to support IBM HTTP Server as a reverse proxy, register an OAuth application, and add the Activities Plus mobile app to the HCL Connections Mobile application.
- **[Migrating Activities data](../install/cp_3p_migrate_activities_data.md)**  
If you want to move existing Activities data to Activities Plus, you must run the migration service.
- **[Customizing Activities Plus](../install/cp_3p_customize_ap.md)**  
Add Activities Plus to a community or the Connections home page. For the latest Customizer documentation, see [Configuring the Customizer component](cp_config_customizer_intro.md).
- **[Uninstalling Activities Plus](../install/cp_3p_uninstall_ap.md)**  
If necessary, you can remove the Activities Plus app from your Connections deployment.

**Parent topic:**[Integrating with other apps](../install/cp_3p_integrate_with_other_products.md)

