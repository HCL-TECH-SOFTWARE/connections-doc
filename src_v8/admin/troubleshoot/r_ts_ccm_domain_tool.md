# Troubleshooting the ccmDomainTool {#r_ts_ccm_domain_tool .reference}

Review possible issues that might occur when you run the ccmDomain tool and ways to work around the problem. These errors can appear in the command prompt window or the log file for debugging problems. There is also a logging capability to the ccmDomainTool. If you have ongoing troubleshooting issues, send the ccmDomainTool.log to HCL support

|Problem|Solution|
|-------|--------|
|Cannot find JVM when running createGCD.sh/bat or createObjectStore.bat/sh

Problem: Error prompt on the command line "java is not recognized as an internal or external command."

|1.  Ensure that the tool is executed under <IC\_HOME\>/addons/ccm/ccmDomainTool.

**Note:** The tool might be executed under <IC\_HOME\>/FileNet/ContentEngine/ccmDomainTool

2.  Ensure the Connections Content Manager application was installed successfully and exists at the path <IC\_HOME\>/addons/ccm/ContentEngine/\_cejvm/jre where it should have been created during the Connections Content Manager application installation.

|
|./createGCD.sh: Permission denied

|Ensure you have been granted execution access to the file under <IC\_HOME\>/addons/ccm/ccmDomainTool for example, `chmod 755 *`

|
|`TransactionRolledbackException` occurs when executing createGCD.sh/bat or createObjectStore.bat/sh.

Problem:

In case you encounter the following error:

Creating Object Store ... Exception in thread "main" com.filenet.api.exception.EngineRuntimeException: FNRCE0075E: E\_TRANSACTION\_FAILURE: A transaction problem has occurred. Message was: ; nested exception is: javax.transaction.TransactionRolledbackException: Transaction is ended due to timeout errorStack=\{ at com.filenet.engine.ejb.EJBUtil.determineException\(EJBUtil.java:116\) at com.filenet.engine.ejb.EngineBean.executeChanges\(EngineBean.java:824\)

|You can modify the transaction timeout as follows:

1.  Navigate to the screen containing the Maximum transaction timeout parameter:
2.  Click **Servers** \> **Server Types** \> **WebSphere application servers** \> **server1** \> **\[Container Settings\] Container Services** \> **Transaction Service** where server1 stands for the server that running FileNetEngine application.
3.  Click the **Configuration** tab, and set the Maximum transaction timeout parameter value to at least 600 \(seconds\).
4.  Click **Apply** and then click **Save**. Restart the related server.
5.  After you have created the object store, change the value back.

|
|Fail to run createGCD.sh/bat.

|Refer to the following correct createGCD outprint.

If you fail on the step "Creating Domain and GCD ...", you can rerun the tool after fixing the error in the message.

If you fail on the step "Setting Server Cache ...", you can perform the configuration through manual steps, or run the DBWizard to drop the CCM database. The createGCD.sh/bat cannot be rerun directly in this situation, because the GCD has been created.

```
***********************************************************
Directory service provider name    : Virtual Member Manager
Domain name                        : ICDomain
Content Platform Engine webservice   : FileNetP8WSI
File Storage Area root path        : /opt/IBM/Connections/data/shared/ccm
Object store admin user            : wpsadmin
Object store display name          : ICObjectStore
Object store name                  : ICObjectStore
JNDI data source                   : FNOSDS
JNDI XA data source                : FNOSDSXA
Domain admin user                  : wpsadmin
Possible Content Platform Engine Connection URI:
    http://localhost:9081/wsi/FNCEWS40MTOM
***********************************************************


Geting connection to the Content Platform Engine URI : http://localhost:9081/wsi/FNCEWS40MTOM ...
log4j:WARN No appenders could be found for logger (filenet_error.api.com.filenet.apiimpl.util.ConfigValueLookup).
log4j:WARN Please initialize the log4j system properly.
http://localhost:9081/wsi/FNCEWS40MTOM
http://localhost:9081/wsi/FNCEWS40MTOM
... 

```

|
|Fail to run createObjectStore.sh/bat

|Refer to following correct createObjectStore outprint, if you fail on step "Creating Object Store ...", you can rerun the tool after fixing the error in the message.

If you fail on other steps in createObjectStore, you can perform the configuration through manual steps or run the DBWizard to drop CCM database. The createObjectStore.sh/bat cannot be rerun directly in this situation, because the Object Store has been created.

```
[root@localhost ccmDomainTool]# ./createObjectStore.sh
createOS
Loading the Connections Content Manager info ...
http://localhost:9081/wsi/FNCEWS40MTOM
***********************************************************
Directory service provider name    : Virtual Member Manager
Domain name                        : ICDomain
Content Platform Engine webservice   : FileNetP8WSI
File Storage Area root path        : /opt/IBM/Connections/data/shared/ccm
Object store admin user            : wpsadmin
Object store display name          : ICObjectStore
Object store name                  : ICObjectStore
JNDI data source                   : FNOSDS
JNDI XA data source                : FNOSDSXA
Domain admin user                  : wpsadmin
Please enter domain admin user password : wpsadmin
Possible Content Platform Engine Connection URI:
    http://localhost:9081/wsi/FNCEWS40MTOM
***********************************************************


Geting connection to the Content Platform Engine URI : http://localhost:9081/wsi/FNCEWS40MTOM ...
log4j:WARN No appenders could be found for logger (filenet_error.api.com.filenet.apiimpl.util.ConfigValueLookup).
log4j:WARN Please initialize the log4j system properly.
Creating Object Store ...
Set File Storage Area ...
{EABF468D-CB36-4CBF-AC50-332D92EFE0B8}
...

```

|
| | |

