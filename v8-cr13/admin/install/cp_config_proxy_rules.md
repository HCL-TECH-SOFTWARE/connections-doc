# Configuring the HTTP server {#proxy_rules .concept}

Set up proxy rules for Customizer, Orient Me, Microsoft Teams integration, Tailored Experience for Communities, Activities Plus, and the Microsoft Outlook add-in for Connections 8.0 CR3.

Using the sample deployment described in [Steps to install or upgrade to Component Pack](cp_install_services_tasks.md#section_awd_rwp_tnb), the Kubernetes master node is used in the proxy rules in this document. In an HA environment, the load balancer DNS of the HA cluster should be used (must be FQHN).

## Infrastructure {#section_ahf_j45_hvb .section}

Add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:

``` {#codeblock_jzt_5wk_gvb}
# jsonapi
ProxyPass "/jsonapi" "http://cpmaster.internal.example.com:32080/jsonapi"
ProxyPassReverse "/jsonapi" "http://cpmaster.internal.example.com:32080/jsonapi"
```

## Nginx {#section_w2v_j3j_gvb .section}

After setting up Customizer \(see [Set up Customizer](cp_install_services_tasks.md#section_n3c_xhj_dvb)\), set up your reverse proxy to forward some traffic to the customizer by sending it to KUBERNETES:30301. For Nginx, it would look like this:

``` {#codeblock_bbd_l3j_gvb}
location ~      ^/(files/customizer|files/app|communities/service/html|forums/html|search/web|homepage/web|social/home|mycontacts|wikis/home|blogs|news|activities/service/html|profiles/html|viewer)  { 

            proxy_pass http://cpmaster.internal.example.com:30301; 

}
```

## Orient Me {#section_nhm_n3j_gvb .section}

After setting up Orient Me, refer to [Set up Orient Me for OpenSearch](cp_install_services_tasks.md#orientme_os). You need to set rewrite rules in httpd.conf on your IBM HTTP Server to enable sending requests to it from Connections.

Add the rewrites to your httpd.conf on the IBM HTTP Server, and then restart the service:

``` {#codeblock_nvr_p3j_gvb}
# OrientMe Config 
ProxyPreserveHost On 
ProxyPass "/social" "http://cpmaster.internal.example.com:32080/social" 
ProxyPassReverse "/social" "http://cpmaster.internal.example.com:32080/social" 
ProxyPass "/itm" "http://cpmaster.internal.example.com:32080/itm" 
ProxyPassReverse "/itm" "http://cpmaster.internal.example.com:32080/itm" 
ProxyPass "/community_suggestions/api/recommend/communities" "http://cpmaster.internal.example.com:32080/community_suggestions/api/recommend/communities" 
ProxyPassReverse "/community_suggestions/api/recommend/communities" "http://cpmaster.internal.example.com:32080/community_suggestions/api/recommend/communities" 
ProxyPass "/appreg" "http://cpmaster.internal.example.com:32080/appreg/" 
ProxyPassReverse "/appreg" "http://cpmaster.internal.example.com:32080/appreg/" 
ProxyPass "/appregistry" "http://cpmaster.internal.example.com:32080/appregistry" 
ProxyPassReverse "/appregistry" "http://cpmaster.internal.example.com:32080/appregistry"
```

## Microsoft Teams integration {#section_b3p_r3j_gvb .section}

Once the microservices are installed and running for Microsoft Teams integration, see [Set up Microsoft Teams integration](cp_install_services_tasks.md#teams_integ) and add the following rules to your httpd.conf on your IBM HTTP Server and restart the server:

``` {#codeblock_ugh_53j_gvb}
# teams-tab-ui
ProxyPass "/teams-tab" "http://cpmaster.internal.example.com:32080/teams-tab" 
ProxyPassReverse "/teams-tab" "http://cpmaster.internal.example.com:32080/teams-tab"    
# teams-share-service 
ProxyPass "/teams-share-service" "http://cpmaster.internal.example.com:32080/teams-share-service" 
ProxyPassReverse "/teams-share-service" "http://cpmaster.internal.example.com:32080/teams-share-service"
# teams-share-ui 
ProxyPass "/teams-share-ui" "http://cpmaster.internal.example.com:32080/teams-share-ui" 
ProxyPassReverse "/teams-share-ui" "http://cpmaster.internal.example.com:32080/teams-share-ui"
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

After setting up Tailored Experience features see [Set up Tailored Experience features for communities](cp_install_services_tasks.md#comm_tailored), and add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:

``` {#codeblock_ohb_djj_gvb}
# proxy rules for admin-portal
ProxyPass "/cnxadmin" "http://cpmaster.internal.example.com:32080/cnxadmin"  
ProxyPassReverse "/cnxadmin" "http://cpmaster.internal.example.com:32080/cnxadmin"
# proxy rules for community-template-service
ProxyPass "/comm-template" "http://cpmaster.internal.example.com:32080/comm-template/templates" 
ProxyPassReverse "/comm-template" "http://cpmaster.internal.example.com:32080/comm-template/templates"
# proxy rules for te-creation-wizard
ProxyPass "/te-creation-wizard/" "http://cpmaster.internal.example.com:32080/te-creation-wizard/" 
ProxyPassReverse "/te-creation-wizard/" "http://cpmaster.internal.example.com:32080/te-creation-wizard/"
```

## Activities Plus {#section_jz1_2jj_gvb .section}

After setting up Activities Plus see [Set up Activities Plus](cp_install_services_tasks.md#activities_plus) and add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:

``` {#codeblock_q4b_fjj_gvb}
# proxy rules for activities plus 
RewriteRule ^/activities/service/html/(.*)$ /boards/activities/service/html/$1 [R] 
ProxyPass "/boards" "http://cpmaster.internal.example.com:32080/boards" 
ProxyPassReverse "/boards" "http://cpmaster.internal.example.com:32080/boards" 
ProxyPass "/api-boards" "http://cpmaster.internal.example.com:32080/api-boards" 
ProxyPassReverse "/api-boards" http://cpmaster.internal.example.com:32080/api-boards"
```

Starting with Connections 7, be sure that you have websockets enabled on your front proxy server.

## Microsoft Outlook add-in {#section_tcv_3jj_gvb .section}

After setting up the Connections add-in for Microsoft Outlook see [Set up Connections add-in for Microsoft Outlook](cp_install_services_tasks.md#ms_outlook_addin) and add the following rules to httpd.conf for your IBM HTTP servers and restart the service:

``` {#codeblock_ryx_jjj_gvb}
# proxy rules for outlook add-in
Redirect "/outlook-addin" "/outlook-addin/" 
ProxyPass "/outlook-addin/" "http://cpmaster.internal.example.com:32080/" 
ProxyPassReverse "/outlook-addin/" "http://cpmaster.internal.example.com:32080/"
```

``` {#codeblock_bd4_v3j_gvb}
# Fix for connections content loading in Outlook iframe tab. Note: combine these settings with Teams ones above if using both
Header unset Content-Security-Policy
Header always set Content-Security-Policy "frame-ancestors 'self' *.office365.com"
```

## HCL API Gateway {#hcl_api_gw_https .section}

After installing HCL API Gateway \(see [Install HCL API Gateway](cp_install_services_tasks.md#hcl_api_gateway)\), add the following rules to your httpd.conf on your IBM HTTP servers and restart the service:

``` {#codeblock_q5b_fjj_gvb}
# proxy rules for hcl-api-gateway 
ProxyPass "/connections/api/v2/explorer" "https://cpmaster.internal.example.com:31443/connections/api/v2/explorer"
ProxyPassReverse "/connections/api/v2/explorer" "https://cpmaster.internal.example.com:31443/connections/api/v2/explorer"
ProxyPass "/connections/api/v2" "https://cpmaster.internal.example.com:31443/connections/api/v2"
ProxyPassReverse "/connections/api/v2" "https://cpmaster.internal.example.com:31443/connections/api/v2"
ProxyPass "/ui" "https://cpmaster.internal.example.com:31443/ui"
ProxyPassReverse "/ui" "https://cpmaster.internal.example.com:31443/ui"
ProxyPass "/apisix" "https://cpmaster.internal.example.com:31443/apisix"
ProxyPassReverse "/apisix" "https://cpmaster.internal.example.com:31443/apisix"
```


**Parent topic:**  [Configuring the Component Pack](../install/cp_config_intro.md)

