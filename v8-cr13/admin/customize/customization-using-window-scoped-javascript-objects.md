# Customizing using window-scoped JavaScript objects

If Component Pack is not included in your Connections deployment, you can define the payload of most extension types available for the app registry method using window-scoped JavaScript objects.

For this approach, all supporting extensions expect the property `window.connectionsExtension`, along with a defined type within the object. Currently, the following types are available:

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

For example, the app registry extension used to change the Connections colorway in [Sample customization using the Connections app registry](enabling-app-registry.md#sample-customization-using-the-connections-app-registry) can be applied via JavaScript as follows:

``` 
window.connectionsExtension = {
  "com.hcl.connections.custom.style": {
    "style-customization": {
      "generic": {
        "--color-header": "#2c4433",
        "--color-navigation": "#366032",
        "--color-navigation-selected": "#609c5a"
      },
    }
  },
  "com.hcl.connections.banner": {
    ...
  }
}
```

This means that the `window.connectionsExtension` property must be applied to the HCL Connections pages prior to the extensions becoming available. A common approach for this would be to add the JavaScript, either inline or referencing a static resource, via the existing JSP customization methods. Note that these methods may be subject to change due to the Connections 8.0 UI redesign. For more information, refer to the [Impact on legacy customizations](t_admin_common_customize_main.md#impact-on-legacy-customizations).

As in the provided example, this JavaScript object is expected to contain all config extensions that should be available. It can also serve as a baseline but can be oversteered through existing app registry extensions. For this, you can leverage the property `preferAppReg: true`.

## Examples using JSP customization

To provide a clear path on how to implement window-scoped JavaScript customization, review the following examples.

To add the previous `window.connectionsExtension` sample for an existing JSP customization file, complete the following steps:

1.  Make a copy of the `header.jsp` file, which defines the content of the main navigation bar. You can access the file from the following directory: `<Application root>/installedApps/<cell name>/Profiles.ear/lc.profiles.app.war/nav/templates`

    Note that the `header.jsp` file is the same for each application, so you only need to make a copy of one of the `header.jsp` files.

2.  Paste the copy of the `header.jsp` file into the following directory: `customizationDir/common/nav/templates`

3.  Open the copy of the `header.jsp` file in a text editor and look for the following section:

    ```
    <%@ include file="/nav/templates/cnx8-react.jspf" %>
    ```

4.  Add the following Javascript code just before that line:

    ```
    <script type="text/javascript">
    window.connectionsExtension = {
      "com.hcl.connections.custom.style": {
        "style-customization": {
          "generic": {
            "--color-header": "#2c4433",
            "--color-navigation": "#366032",
            "--color-navigation-selected": "#609c5a"
          },
        }
      }
    }
    </script>
    ```

5.  After making your updates, save and close the copy of the `header.jsp file`, then restart your application server.

The following is another example, based on recent and existing `header.jsp` customizations and will employ the `header.jsp`.

Before anything, it's important to note that the `header.jsp` or `footer.jsp` are still loaded, but might just be hidden or invisible. So, one way of adding a menu point would be to add the following snippet to the `header.jsp` customization (this JSP file is just one possibility, but any other commonly loaded JSP files will work).

```
<script>
    window.connectionsExtension = {
        "com.hcl.connections.nav": {
            "customEntries": [
                {
                    "id": "intranet",
                    "name": "Intranet",
                    "action": "add",
                    "link": "https://example.com/",
                    "icon": "https://example.com/images/logo.png",
                    "order": 7000,
                    "new_window": true,
                    "submenu": [],
                    "location": "main"
                }
            ]
        }
    }
</script>
```


**Parent topic**: [Creating custom configuration extensions](creating-custom-config-extensions.md)