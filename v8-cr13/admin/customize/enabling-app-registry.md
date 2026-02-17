# Enabling the Connections app registry service for customization

To leverage custom config extensions, enable the app registry service. You need Component Pack installed to do so. If Component Pack is not available, you can inject customizations using window-scoped JavaScript objects. For more information, refer to [Customizing through window-scoped JavaScript objects](customization-using-window-scoped-javascript-objects.md).

By default, Connections applications do not attempt to make requests to the app registry service if the app registry service has not been deployed as part of a Component Pack installation.

!!! note
    When adding new entries to the App Registry, it is important to ensure that no other entries with the same namespace are enabled or active within the system. This is to prevent conflicts, maintain system integrity, and ensure seamless functionality across all applications.

## Procedure

To enable the app registry service:

1. Locate the file `WAS_HOME\profiles\WAS_Profile\config\cells\Host_name\LotusConnections-config\LotusConnections-config.xml`.

2. In the file, locate the `sloc:serviceReference` section. where `serviceName="extensionRegistry"`.

3. Check that both the `enabled` and `ssl_enabled` properties are set to `true`.

4. If they are not set to `true`, update the configuration file so the section looks as follows. Replace `admin\_replace` with the appropriate server domain:

    ```
    <sloc:serviceReference bootstrapHost="admin\_replace" bootstrapPort="admin\_replace" clusterName="" enabled="true" serviceName="extensionRegistry" ssl_enabled="true">
    <sloc:href>
        <sloc:hrefPathPrefix>/appregistry</sloc:hrefPathPrefix>
        <sloc:static href="admin\_replace" ssl_href="admin\_replace"/>
        <sloc:interService href="admin\_replace"/>
    </sloc:href>
    </sloc:serviceReference>
    ```

5. Sync your changes and restart the server.

## Sample customization using the Connections app registry

In this example, you can use custom style extensions to update the Connections colorway to green. Refer to the following procedure, which involves creating a custom config extension:

1. Log in to your HCL Connections environment as an administrative user and navigate to the URL `https://__CONNECTIONS_DOMAIN__/appreg/apps`.

    ![App Registry - Apps Overview](images/appreg-apps.png)

2. Click on the **New App +** button and select **Code Editor** in the side menu. 

    ![App Registry - App Editor](images/appreg-app-editor.png)

3. Copy the following template of an app registry configuration and paste it into the App Editor:

    ```
    {
        "name": "Connections Custom Config Extension",
        "title": "Connections Custom Config Extension",
        "description": "Connections Custom Config Extension - Description",
        "services": [
            "Connections"
        ],
        "state": "enabled",
        "extensions": [
            {
                "name": "connections-custom-config-extension",
                "type": "com.hcl.connections.custom.style",
                "payload": {
                    "style-customization": {
                        "generic": {
                            "--color-header": "#2c4433",
                            "--color-navigation": "#366032",
                            "--color-navigation-selected": "#609c5a"
                        }
                    },
                    "cacheExpiration": 20000
                },
                "path": "global",
                "state": "enabled"
            }
        ]
    }
    ```

4. Click **Save** to apply your changes.

    ![App Registry - Custom Config Sample](images/appreg-app-config-sample.png)

    ![App Registry - Custom Config Created](images/appreg-app-config-created.png)

5. Refresh your Connections UI to view the changes.

    ![Connections Green UI](images/connections-green-ui.png)

## Defining object properties in the app registry configuration

The most important properties in the app registry configuration are the `type` and `payload` properties within the `extensions` array:

-   `type` specifies to which component the extension relates. Currently, the following types are available:

    | Extension Type | Description | 
    |-----------------|------------|
    | com.hcl.connections.nav|Customization of the menu entries on the [side navigation bar](customizing-side-navigation.md)|
    | com.hcl.connections.custom.style|Customization of [header](customizing-header.md) elements and general theming via custom styles|
    | com.hcl.connections.banner|Configuration of the [administrative banner](../admin/admin_banner_appreg.md) and its content |
    | com.hcl.search.customization|Customization of the [search box](customizing-search.md) and the connected search application|
    | com.hcl.share.extension|Extension of the Connections [share actions](customizing-share.md) and targets|
    | com.ibm.itm.entry.person.default|Customization of the [Important To Me bar](customizing-itm.md)|
    | com.hcl.appreg.ext.templatedLink|Extension of communication options for the business card |
    | com.hcl.connections.tours |Extension of the Connections [welcome tour](customizing-welcome-tour.md)|

-   `payload` is specific to the individual component and the mandatory and optional properties that the component supports. For more information around the expected values for `payload`, refer to the customization topic for each component.

In addition to `type` and `payload`, extensions also expect `name` and `title` properties that provide context within the app registry overview page or are used to render labels on the UI, respectively.


**Parent topic**: [Creating custom configuration extensions](creating-custom-config-extensions.md)