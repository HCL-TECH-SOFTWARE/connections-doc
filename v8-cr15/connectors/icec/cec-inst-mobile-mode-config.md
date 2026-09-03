# Mobile mode configuration {#id_name .reference}

To integrate Connections Engagement Center in the Connections mobile app, configure the `mobile-config.xml` file on the Deployment Manager.

| Step | Instructions |
|------|-------------|
| 1 | Open a command prompt (`cmd.exe`) and change to the following directory on the Deployment Manager system:<br><br>`app_server_root/profiles/dm_profile_root/bin` |
| 2 | Start the `wsadmin` client:<br><br>`wsadmin -lang jython -user {admin_user_id} -password {admin_password} -port {SOAP_CONNECTOR_ADDRESS_PORT}` |
| 3 | Access the HCL Connections configuration:<br><br>`execfile(mobileAdmin.py)` |
| 4 | Check out the mobile configuration file and create a backup:<br><br>`MobileConfigService.checkOutConfig("<directory>", "<cell-name>")` |
| 5 | Open the `mobile-config.xml` file and add the Connections Engagement Center application to the `<Applications>` section. If other applications are already configured, add the new application at the end of the section. |
| 6 | Add the Connections Engagement Center application to the `<ApplicationsList>` section. |
| 7 | **Optional:** Configure Connections Engagement Center as the default application by updating the `<DefaultApplication>` setting. |
| 8 | **Optional:** Hide the address bar or navigation bar by adding the appropriate parameter to the `<ApplicationURL>` value. |
| 9 | Check in the updated configuration file:<br><br>`MobileConfigService.checkInConfig("<directory>", "<cell-name>")` |
| 10 | Copy the `icec` folder from the Connections Engagement Center package's `mobile` directory to `<CUSTOMIZATION_DIR>/mobile`. |
| 11 | Fully synchronize the nodes and restart the HCL Connections servers. |
| 12 | Verify that Connections Engagement Center is available in the HCL Connections Mobile App on iOS and Android devices. |

### Step 5: Add the application definition

```xml
<Applications>
  <Application name="icec-app" enabled="true">
    ...
  </Application>
</Applications>
```

### Step 6: Update the application list

```xml
<ApplicationsList>
  icec-app,profiles,communities,files,filesync,wikis,activities,forums,blogs,bookmarks
</ApplicationsList>
```

### Step 7: Configure the default application (optional)

```xml
<!-- DefaultApplication: The application that the user is taken to after login. -->
<DefaultApplication>Updates</DefaultApplication>
```

Replace `Updates` with the value specified in the `name` attribute of the application definition.

### Step 8: Hide the address bar or navigation bar (optional)

Use one of the following parameters:

- `ibmextintegrated=hideAddressBar`
- `ibmextintegrated=hideNavigation`

Example:

```xml
<ApplicationURL>
  https://{YOUR_DOMAIN}/xcc/mobile?page={MOBILE_PAGE}&ibmextintegrated=hideAddressBar
</ApplicationURL>
```

**Parent topic:** [Mode configuration](../../connectors/icec/cec-inst-configure-modes.md)

