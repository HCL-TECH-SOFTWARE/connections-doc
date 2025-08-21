# Publishing the community configuration {#id_name .reference}

Publish the community mode configuration to all servers by executing a script to clear widget caches and synchronize nodes. Then restart all servers.

|Step|Instructions|
|----|------------|
|1

|**Open a Windows shell \(cmd.exe\) and execute following script**.

 **Note:** Alternatively, you may clear widget caches in Connections with an Connections administrative account and synchronize the nodes afterwards in the ISC. You will need to restart all Connections servers:

 ```

cd C:\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
wsadmin -lang jython -user <wasadmin> -password <password>

''' clear widgets cache '''
execfile("newsAdmin.py")
NewswidgetCatalogService.clearwidgetCaches()

''' synchronize active nodes '''
dmgr = AdminControl.queryNames(type=DeploymentManager,*)
if dmgr:
 print Please wait, until the nodes have been synchronized.
 nodes = AdminControl.invoke(dmgr, syncActiveNodes, true)
 print The following nodes have been sucessfully synchronized. -  + str(nodes)
else:
 print An error occured please check your server, whether there is an active node.

```

|
|2

|Restart all Connections servers to publish the configuration to the Connections applications.

|

Congratulations! You have configured HCL Connections to work with IBM Engagement Center's community mode.

**Parent topic:**[Community on-premises mode configuration](../../connectors/icec/cec-inst-community-on-prem-config.md)

**Previous topic:**[Registering the Engagement Center to the Widget Container on the Homepage](../../connectors/icec/cec-inst-registering-icec-homepage.md)

**Next topic:**[Flyout mode configuration](../../connectors/icec/cec-inst-flyout-mode-config.md)

