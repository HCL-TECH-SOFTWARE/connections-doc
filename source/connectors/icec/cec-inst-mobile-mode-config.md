# Mobile mode configuration {#id_name .reference}

To integrate Connections Engagement Center in the Connections mobile app, configure the mobile-config.xml file on the Deployment Manager.

|Step|Instructions|
|----|------------|
|1

|Open a command prompt \(cmd.exe\) and then change to the following directory of the system on which you installed the deployment manager:

 `app\_server\_root/profiles/dm\_profile\_root/bin`|
|2

|Enter the following command to start the wsadmin client:

 `wsadmin -lang jython -user {admin_user_id} -password {admin_password} -port {SOAP_CONNECTIOR_ADRESS_PORT}`|
|3

|Enter the following command to access the HCL Connections configuration

 `execfile(mobileAdmin.py)`|
|4

|Check out the mobile config file to a directory of your choice and make a back-up of this file.

 `MobileConfigService.checkOutConfig ("<directory>", "<cell-name>")`|
|5

|Open the mobile-config.xml file, locate the `<Applications>` section, and add the following configuration to that section.

 If you have already integrated another application, add the Connections Engagement Center configuration at the end of the section.

 ```

<Applications>
	<Application name="icec-app" enabled="true"> 
		<ApplicationIcon> 
			<Android> 
				<XXXHdpi>/icec/xxxhdpi/home_icec.png</XXXHdpi> 
				<XXHdpi>/icec/xxhdpi/home_icec.png</XXHdpi> 
				<XHdpi>/icec/xhdpi/home_icec.png</XHdpi> 
				<Hdpi>/icec/hdpi/home_icec.png</Hdpi> 
				<Mdpi>/icec/mdpi/home_icec.png</Mdpi> 
				<Ldpi>/icec/ldpi/home_icec.png</Ldpi> 
			</Android> 
			<IOS> 
				<Reg>/icec/IOS/home_icec_normal.png</Reg> 
				<Retina>/icec/IOS/home_icec_normal@2x.png</Retina>
			</IOS> 
			<BB> 
				<HighDensity>/icec/hdpi/home_icec.png</HighDensity> 
				<MedDensity>/icec/mdpi/home_icec.png</MedDensity> 
				<LowDensity>/icec/ldpi/home_icec.png</LowDensity> 
			</BB> <DefaultLocation>/icec/xxhdpi/home_icec.png
			</DefaultLocation> 
		</ApplicationIcon> 
		<ApplicationLabel>{LABEL for Connections Engagement Center}</ApplicationLabel> 
		<ApplicationURL>{YOUR_DOMAIN}/xcc/mobile?page={MOBILE_PAGE}</ApplicationURL> 
	</Application>
</Applications>
```

|
|6

|Locate the `<ApplicationsList>` section, and add the Connections Engagement Center application to this list.

 `<ApplicationsList>icec-app,profiles,communities,files,filesync,wikis,activities,forums,blogs,bookmarks</ApplicationsList>`|
|7

|\(Optional\) To select the Connections Engagement Center as Default Application in the Connections Mobile App, locate the `<DefaultApplication>Updates</DefaultApplication>` section and replace it with the name you used for the `<Application enabled=true name=icec-app>` setting.

 ```
<!-- DefaultApplication: The application that the user is taken to after the login. --> 
<DefaultApplication>Updates</DefaultApplication>
```

|
|8|\(Optional\) To hide the navigation or address bar, locate the `<ApplicationURL>` section and add the following parameter: `ibmextintegrated=hideAddressBar` or `ibmextintegrated=hideNavigation`.

 `ibmextintegrated=hideAddressBar` hides just the address. The navigation buttons and action button will remain.

 `ibmextintegrated=hideNavigation` hides the whole navigation bar. The web page must have web-based controls for navigation to provide previous, next, and reload functionality.

 For example, to remove the address bar you would create the following URL:`<ApplicationURL>https://{YOUR_DOMAIN}/xcc/mobile?page={MOBILE_PAGE}&ibmextintegrated=hideAddressBar</ApplicationURL>`

|
|9

|Check in the configured file with the following command:

```
MobileConfigService.checkInConfig(<directory>, <cell-name>)
```

|
|10

|Open the <CUSTOMIZATION\_DIR\>/mobile directory, then copy the icec folder from of the Connections Engagement Center package's mobile folder to the <CUSTOMIZATION\_DIR\>/mobile folder.

|
|11

|Finally, fully synchronize the nodes first and restart the HCL Connections servers.

|
|12

|Now you can use the Connections Engagement Center in the HCL Connections Mobile App on iOS and Android devices.

|

**Parent topic:**[Mode configuration](../../connectors/icec/cec-inst-configure-modes.md)

