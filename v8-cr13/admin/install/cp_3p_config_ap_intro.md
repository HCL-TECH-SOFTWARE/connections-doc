# Configuring Activities Plus services {#cp_3p_config_ap_intro .concept}

Configure Activities Plus to support IBM HTTP Server as a reverse proxy, register an OAuth application, and add the Activities Plus mobile app to the HCL Connections Mobile application.

## Configuring IBM HTTP Server as reverse proxy {#section_kxk_sj1_w5b .section}

Configure the Activities Plus service to support IBM HTTP Server as a reverse proxy. For more information, see [Configure Reverse Proxy](https://docs.huddo.com/boards/cp/httpd/#configure-reverse-proxy) on the Huddo Docs help.

## Registering an OAuth application with a provider {#section_wkp_5j1_w5b .section}

In order for Activities Plus to authenticate with your Connections environment, you must define a new OAuth widget. For more information, see [Authentication](https://docs.huddo.com/boards/connections/auth-on-prem/) on the Huddo Docs help.

## Configuring Connections Mobile for Activities Plus {#section_q1w_xj1_w5b .section}

Add the Activities Plus mobile app to the HCL Connections Mobile application.

1.  Download the Activities Plus icon and save it under the Connections Mobile customization directory as follows:
    1.  On the Connections server, create the directory \[CONNECTIONS\_CUSTOMIZATIONS\_PATH\]/mobile/img if it does not already exist. You can find the value of `CONNECTIONS_CUSTOMIZATION_PATH` from the WebSphere administration console using **Environment** \> **WebSphere** variables.
    2.  Using a browser, load the image URL https://\[BOARDS\_URL\]/img/logo-small.png
    3.  Save this file `logo-small.png` to the mobile customization directory `CONNECTIONS_CUSTOMIZATIONS_PATH/mobile/img`.
2.  Complete the procedure in [Mobile App Setup](https://docs.huddo.com/boards/connections/mobile-app-on-prem/) on the Huddo Docs help.

    **Results:**Activities Plus displays in the HCL Connections mobile app’s application menu, allowing the mobile user to access Activities Plus standalone data or data that is associated with a community.


**Parent topic:**[Integrating with Activities Plus](../install/cp_3p_integrate_intro.md)

