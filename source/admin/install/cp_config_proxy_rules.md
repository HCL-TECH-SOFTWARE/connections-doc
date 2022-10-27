# Configuring the HTTP server {#proxy_rules .concept}

Set up proxy rules for Customizer, Orient Me, Microsoft Teams integration, Tailored Experience for Communities, Activities Plus, and the Microsoft Outlook add-in for Connections 8.

## Infrastructure {#section_ahf_j45_hvb .section}

Add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:

``` {#codeblock_jzt_5wk_gvb}
# jsonapi
ProxyPass "/jsonapi" "http://master_node_host_name:32080/jsonapi"
ProxyPassReverse "/jsonapi" "http://master_node_host_name:32080/jsonapi"
```

## Nginx {#section_w2v_j3j_gvb .section}

After setting up Customizer \(see [Set up Customizer](cp_install_services_tasks.md#section_n3c_xhj_dvb)\), set up your reverse proxy to forward some traffic to the customizer by sending it to KUBERNETES:30301. For Nginx, it would look like this:

``` {#codeblock_bbd_l3j_gvb}
location ~      ^/(files/customizer|files/app|communities/service/html|forums/html|search/web|homepage/web|social/home|mycontacts|wikis/home|blogs|news|activities/service/html|profiles/html|viewer)  { 

            proxy_pass http://cp1.internal.cnx-dev.net:30301; 

}
```

## Orient Me {#section_nhm_n3j_gvb .section}

After setting up Orient Me \(see [Set up Orient Me for OpenSearch](cp_install_services_tasks.md#orientme_os)\), you need to set rewrite rules in httpd.conf on your IBM HTTP Server to enable sending requests to it from Connections.

Add the rewrites to your httpd.conf on the IBM HTTP Server, and then restart the service:

``` {#codeblock_nvr_p3j_gvb}
# OrientMe Config 
ProxyPreserveHost On 
ProxyPass "/social" "http://cp1.internal.cnx-dev.net:32080/social" 
ProxyPassReverse "/social" "http://cp1.internal.cnx-dev.net:32080/social" 
ProxyPass "/itm" "http://cp1.internal.cnx-dev.net:32080/itm" 
ProxyPassReverse "/itm" "http://cp1.internal.cnx-dev.net:32080/itm" 
ProxyPass "/community_suggestions/api/recommend/communities" "http://cp1.internal.cnx-dev.net:32080/community_suggestions/api/recommend/communities" 
ProxyPassReverse "/community_suggestions/api/recommend/communities" "http://cp1.internal.cnx-dev.net:32080/community_suggestions/api/recommend/communities" 
ProxyPass "/appreg" "http://cp1.internal.cnx-dev.net:32080/appreg/" 
ProxyPassReverse "/appreg" "http://cp1.internal.cnx-dev.net:32080/appreg/" 
ProxyPass "/appregistry" "http://cp1.internal.cnx-dev.net:32080/appregistry" 
ProxyPassReverse "/appregistry" "http://cp1.internal.cnx-dev.net:32080/appregistry"
```

## Microsoft Teams integration {#section_b3p_r3j_gvb .section}

Once the microservices are installed and running for Microsoft Teams integration \(see [Set up Microsoft Teams integration](cp_install_services_tasks.md#teams_integ)\), add the following rules to your httpd.conf on your IBM HTTP Server and restart the server:

``` {#codeblock_ugh_53j_gvb}
# teams-tab-ui
ProxyPass "/teams-tab" "http://master_node_host_name:32080/teams-tab" 
ProxyPassReverse "/teams-tab" "http://master_node_host_name:32080/teams-tab"    
# teams-tab-api 
ProxyPass "/teams-tab/api" "http://master_node_host_name:32080/teams-tab/api" 
ProxyPassReverse "/teams-tab/api" "http://master_node_host_name:32080/teams-tab/api"
# teams-share-service 
ProxyPass "/teams-share-service" "http://master_node_host_name:32080/teams-share-service" 
ProxyPassReverse "/teams-share-service" "http://master_node_host_name:32080/teams-share-service"
# teams-share-ui 
ProxyPass "/teams-share-ui" "http://master_node_host_name:32080/teams-share-ui" 
ProxyPassReverse "/teams-share-ui" "http://master_node_host_name:32080/teams-share-ui"
```

``` {#codeblock_ufb_v3j_gvb}
# Teams SameSite Fix
# Add SameSite property to all server-side set-cookie response headers
Header edit Set-Cookie ^(.*)$ "$1; SameSite=None;Secure"
```

``` {#codeblock_bd4_v3j_gvb}
# Fix for Embedded Experiences content loading in Teams Tab iframe
Header unset Content-Security-Policy
Header always set Content-Security-Policy "frame-ancestors 'self' teams.microsoft.com *.teams.microsoft.com *.skype.com"
```

## Tailored Experience {#section_ad5_bjj_gvb .section}

After setting up Tailored Experience features \(see [Set up Tailored Experience features for communities](cp_install_services_tasks.md#comm_tailored)\), add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:

``` {#codeblock_ohb_djj_gvb}
# proxy rules for admin-portal
ProxyPass "/cnxadmin" "http://cp1.internal.cnx-dev.net:32080/cnxadmin"  
ProxyPassReverse "/cnxadmin" "http://cp1.internal.cnx-dev.net:32080/cnxadmin"
# proxy rules for community-template-service
ProxyPass "/comm-template" "http://cp1.internal.cnx-dev.net:32080/comm-template/templates" 
ProxyPassReverse "/comm-template" "http://cp1.internal.cnx-dev.net:32080/comm-template/templates"
# proxy rules for te-creation-wizard
ProxyPass "/te-creation-wizard/" "http://cp1.internal.cnx-dev.net:32080/te-creation-wizard/" 
ProxyPassReverse "/te-creation-wizard/" "http://cp1.internal.cnx-dev.net:32080/te-creation-wizard/"
```

## Activities Plus {#section_jz1_2jj_gvb .section}

After setting up Activities Plus \(see [Set up Activities Plus](cp_install_services_tasks.md#activities_plus)\), add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:

``` {#codeblock_q4b_fjj_gvb}
# proxy rules for activities plus 
RewriteRule ^/activities/service/html/(.*)$ /boards/activities/service/html/$1 [R] 
ProxyPass "/boards" "http://cp1.internal.cnx-dev.net:32080/boards" 
ProxyPassReverse "/boards" "http://cp1.internal.cnx-dev.net:32080/boards" 
ProxyPass "/api-boards" "http://cp1.internal.cnx-dev.net:32080/api-boards" 
ProxyPassReverse "/api-boards" http://cp1.internal.cnx-dev.net:32080/api-boards"
```

Starting with Connections 7, be sure that you have websockets enabled on your front proxy server.

## Microsoft Outlook add-in {#section_tcv_3jj_gvb .section}

After setting up the Connections add-in for Microsoft Outlook \(see [Set up Connections add-in for Microsoft Outlook](cp_install_services_tasks.md#ms_outlook_addin)\), add the following rules to httpd.conf for your IBM HTTP servers and restart the service:

``` {#codeblock_ryx_jjj_gvb}
# proxy rules for outlook add-in
Redirect "/outlook-addin" "/outlook-addin/" 
ProxyPass "/outlook-addin/" "http://cp1.internal.cnx-dev.net:32080/" 
ProxyPassReverse "/outlook-addin/" "http://cp1.internal.cnx-dev.net:32080/"
```

**Parent topic:**[Configuring the Component Pack](../install/cp_config_intro.md)

