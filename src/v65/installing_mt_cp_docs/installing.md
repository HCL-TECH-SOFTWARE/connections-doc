<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">
# Installing HCL Connections 6.5 CR1a for a Multi-Tenant Environment

This topic contains general information, guidance on installing HCL
Connections CR1a for a Multi-Tenant environment, as well as updates
required to install and configure HCL Connections CR1a Multi-Tenant.

## MSP - Installing Connections 6.5 and the HC6.5_CR1a update

**1** [Install HCL Connections
6.5](https://help.hcltechsw.com/connections/v65/admin/install/c_installing.html)
(HCL_Connections_6.5_lin.tar), as noted in the HCL Connections
Product Documentation.

**Note:** Do NOT install HC6.5_CR1

**2.** Install Connections 6.5 CR1a (HC6.5_CR1a.zip), following this
procedure: [Install the HC6.5_CR1a
update](https://help.hcltechsw.com/connections/v65/admin/migrate/t_install_fixpack.html)

**3** Apply the security iFx - Day 0 fix:
6.5.0.0_CR1a-IC-Communities-IFLO100042.jar, following this procedure:
[Installing interim
fixes](https://help.hcltechsw.com/connections/v65/admin/migrate/c_installing_interim_fixes.html)

## Installing Component Pack_6.5.0.1a update for Multi-Tenant

This topic contains general information and guidance on installing the
HCL Connections Component Pack update: ComponentPack_6.5.0.1a
Multi-Tenant.

### MSP - Installing Component Pack_6.5.0.1a update for MT

**1.** Starting point is Connections Component Pack 6.5.0.0
(ComponentPack_6.5.0.0.zip)

**Note:** Do NOT install the Component Pack update for 6.5.0.1

**2.** Install Component Pack 6.5.0.1a (ComponentPack_6.5.0.1a.zip),
following this procedure: [Upgrading Component Pack to the latest
version](https://help.hcltechsw.com/connections/v65/admin/install/cp_install_upgrade_latest_versions.html)

To install kubernetes in HA - please follow official k8s documentation,
it seems that one of the helper scripts that we provide (as examples) is
not using the right api version.

Additional Links: links for reference, depending on what route you want
to go.

[Creating Highly Available clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)

[ kubernetes / kops (Git)](https://github.com/kubernetes/kops)

[kubernetes-sigs / kubespray (Git)](https://github.com/kubernetes-sigs/kubespray)


## Installing HCL Docs for the Multi-Tenant environment

This topic contains general information, guidance on installing and
configuring HCL Docs in a Connections Multi-Tenant environment

If you do not have HCL Docs installed or have a version earlier than
2.0, install or update to HCL Docs 2.0 (CN7ZLML.zip), refer to the
following for additional information - [Deploying HCL Connections Docs
2.0
CR3](https://help.hcltechsw.com/docs/onprem_2.0/2.0_CR3_install_guide/guide/text/welcome_deploying.html)

Once you are on HCL Docs 2.0 or greater, apply Docs iFix009
(HCLConnectionsDocs_CR3_iFix009.zip), refer to the Patch Guide for
additional information - [HCL Connections Docs 2.0 CR3 iFix009, Patch
Guide](https://help.hcltechsw.com/docs/docs_pdf/PatchGuide.pdf)

### Enabling MT for Docs

**1.** If installing Docs for the first time, set the multitenancy
install options in the installation configuration property files:

-   In the viewer install config properties file. For example,
    cfg.viewer.properties:

\#multitenancy enablement, false means installation to single tenant
environment. **multi_tenancy=true**

-   In the editor install config properties file. For example,
    cfg.editor.properties:

    \#multitenancy enablement, false means installation to single tenant
    environment. **mt=true**

**Note:** If Docs was previously installed WITHOUT this multitenancy
settings, then set them under the Docs configuration files,
**enablement=true**, as shown in the next step

**2** After installing, enable the multitenancy URL patterns in the Docs
configuration files located under the websphere configs cellsdir.

Example:
/opt/WebSphere/AppServer/profiles/*mgr*/config/cells/*cell
name*/IBMDocs-config files: ./concord-config.json and
./viewer-config.json):

> ""multitenancy":"

``` {.pre .codeblock}
{
"enablement": "true", 
"tenant_pattern":
"http://{org}.<your domain>", 
"secure_tenant_pattern":
"https://{org}.<your domain>"
},
```

After installing, please double check the following configuration
setting in **LotusConnections-config.xml** file, make sure that the URL
**sloc:pattern** for the **docs** and **viewer** services to include the
{org} example: Note the lines preceded with an asterisk (\*).

``` {.pre .codeblock}
<sloc:serviceReference bootstrapHost="admin_replace" bootstrapPort="admin_replace" 
clusterName="ICCluster" enabled="true" serviceName="docs" ssl_enabled="true">
<sloc:href>
<sloc:hrefPathPrefix/docs/sloc:hrefPathPrefix>
<sloc:static href="http://connmt.cnx.cwp.pnp-hcl.com" ssl_href="https://connmt.cnx.cwp.pnp- hcl.com"/>
*<sloc:pattern href="http://{org}.cnx.cwp.pnp-hcl.com" ssl_href="https://{org}.cnx.cwp.pnp- hcl.com"/>****
<sloc:interService href="https://connmt.cnx.cwp.pnp-hcl.com"/>
</sloc:href>
</sloc:serviceReference>
<sloc:serviceReference bootstrapHost="admin_replace" bootstrapPort="admin_replace" clusterName="ICCluster" 
enabled="true" serviceName="viewer" ssl_enabled="true">
<sloc:href>
<sloc:hrefPathPrefix/viewer/sloc:hrefPathPrefix> 
<sloc:static href="http://connmt.cnx.cwp.pnp-hcl.com" ssl_href="https://connmt.cnx.cwp.pnp- hcl.com"/> 
*<sloc:pattern href="http://{org}.cnx.cwp.pnp-hcl.com" ssl_href="https://{org}.cnx.cwp.pnp-hcl.com"/>****
<sloc:interService href="https://connmt.cnx.cwp.pnp-hcl.com"/>
</sloc:href> 
</sloc:serviceReference>
```

### Verifying your wasadmin account

Perform the following procedure when accessing Docs (create/view docs).

**1.** Locate the DIRECTORY_UUID for wasadmin

**a.** On WAS, locate the fileRegistry.xml

/opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/mtdemo1Cell01/fileRegistry.xml

**b.** Open the file, and find the following section:

> \<wim:identifier externalId="6cfb3b95-4f1c-4c7f-9f89-bb86d04e1006"
> externalName="uid=wasadmin,o=defaultWIMFileBasedRealm"
> uniqueId="6cfb3b95-4f1c-4c7f-9f89-bb86d04e1006"
> uniqueName="uid=wasadmin,o=defaultWIMFileBasedRealm/\>

**c.** Copy the externalId value, save it somewhere and use it in the
next step.

**2.** Run the following SQL to insert an entry to the USER table in
FILES database: Please make sure to put the DIRECTORY_UUID string
retrieved in Step1 as the second parameter in the SQL.

```
INSERT INTO FILES."USER" 
(ID,DIRECTORY_ID,EMAIL,NAME,ROLES,CREATE_DATE,LAST_VISIT,DIRECTORY_LAST_UPDATE,DIRECTORY_GROUP_LAST_UPDATE,COMMUNITY_GROUP_LAST_UPDATE,LIBRARY_ID
,STATE,PREFERRED_PAGE_SIZE,PREFERRED_VIEW,FORMATTING_LOCALE,TRANSLATION_LOCALE,LOWERCASE_EMAIL,LOWERCASE_NAME,PREFERRED_COLUMNS,FILESYNC_PREFEREN
CE,"TYPE",ORG_ID,COMMUNITY_ENABLED)
VALUES
(x'90E42B439A584765A2469ADE6330F8D8','REPLACE_WITH_WASADMIN_DIRECTORY_UUID','','wasadmin',1007,CURRENT TIMESTAMP,CURRENT TIMESTAMP,CURRENT
TIMESTAMP,CURRENT TIMESTAMP,CURRENT TIMESTAMP,NULL,0,1,1,'en','en','','system user',0,0,1,'a',1)
;
```

**Note:** The first parameter is a binary value. You can use it as how
it is in the sample SQL above. It is unlikely there is a conflict in the
existing entries. If so, just change it value to something else, e.g.,
change a character or two.

### Verifying CONNECTIONS_ENABLE_IMPERSONATION is turned on

If you have run the AutoDeploy script, this should have been done
automatically. You should verify that CONNECTIONS_ENABLE_IMPERSONATION is set to *True*:

**a.** From a browser, access the following URL:

> https://\<your\_connections\_host\_name\>/connections/config/highway.main.gatekeeper.tiles

Login as wasadmin, **Note:** The user account mapped to the
connectionsAdmin -- J2C alias.

**b.** Find the following Gatekeeper flag:
CONNECTIONS_ENABLE_IMPERSONATION

Clik **Edit** and select **True** from the dropdown. The click **Save**.

**c.** Restart the server where the Files app runs.

<?tm 1541016643182 1 HCL Connections ?>


