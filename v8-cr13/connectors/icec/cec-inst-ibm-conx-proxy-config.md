# HCL Connections proxy configuration {#id_name .reference}

For the Clipping, IFrame, and ATOM/RSS Feed widgets it is necessary to configure the Connections Ajax proxy. Start the wsadmin client by completing the following steps \(the following example is for a windows server, for other operating systems please refer to the IBM documentation\).

|Step|Instructions|
|----|------------|
|1

|Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

 `<app_server_root>/profiles/dm_profile_root/bin`|
|2

|Enter the following command to start the wsadmin client:

 `wsadmin -lang jython -user {admin_user_id} -password {admin_password} -port {SOAP_CONNECTIOR_ADRESS_PORT}`|
|3

|Enter the following command to access the HCL Connections configuration

 `execfile("connectionsConfig.py")`|
|4

|Check out the Proxy Config File to a directory of your choice and make a backup of this file.

 `LCConfigService.checkOutProxyConfig("<directory>", "<cell-name>")`|
|5

|Open the proxy-config.tpl file and search for <!-- BEGIN CUSTOMIZATIONS HERE --\>.

 Now you need to comment in this section:

 ```

<proxy:policy url="{URL}" acf="none" basic-auth-support="true">
	<proxy:actions>
		<proxy:method>GET</proxy:method>
	</proxy:actions>
	<proxy:headers/>
	<proxy:cookies/>
</proxy:policy>

```

|
|6

|Then you have to check in the configured file.

 `LCConfigService.checkInProxyConfig("<directory>", "<cell-name>")` After the configuration you have to full synchronize the nodes first and restart the Application server\(s\) then.

|
|7

|After successful configuration of the Ajax Proxy, you will be able to use this URLs for example:

 `https://<YOUR_SERVER>/communities/ajaxProxy/http/google.de`|

**Parent topic:**[Configuring](../../connectors/icec/cec-inst-configuring.md)

