# Customizing the Hikari theme {#t_customize_communities_new_theme .task}

Customize the default Hikari theme in HCL Connections™.

1.  To customize the Hikari theme, place the files that are shown under these directories.
2.  To override the theme, place your styles into these files:

    ```
    <CONNECTIONS_CUSTOMIZATION_PATH>/themes/HikariTheme/defaultTheme.css 
    <CONNECTIONS_CUSTOMIZATION_PATH>/themes/HikariTheme/defaultThemeRTL.css
    ```

3.  To add new styles to the theme, place your styles into these files:

    ```
    <CONNECTIONS_CUSTOMIZATION_PATH>/themes/HikariTheme/custom.css
    <CONNECTIONS_CUSTOMIZATION_PATH>/themes/HikariTheme/customRTL.css
    ```

4.  To override the application styles, place your styles into these files:

    ```
    <CONNECTIONS_CUSTOMIZATION_PATH>/themes/HikariTheme/applications/activities.css
    <CONNECTIONS_CUSTOMIZATION_PATH>/themes/HikariTheme/applications/activitiesRTL.css
    .
    .
    .
    <CONNECTIONS_CUSTOMIZATION_PATH>/themes/HikariTheme/applications/wikis.css
    <CONNECTIONS_CUSTOMIZATION_PATH>/themes/HikariTheme/applications/wikisRTL.css
    ```

    **Note:** The Hikari theme does not support bidirectional \(bidi\) languages. However, you can add right-to-left \(RTL\) styles through customization.

5.  To customize image.png referenced in the following example rule:

    ```
    .lotusui30.lotusMain { 
                      background-image: url(path/to/image.png);
    }
    ```

    Place a custom copy in the folder:

    ```
    <CONNECTIONS_CUSTOMIZATION_PATH>/javascript/com/ibm/social/hikari/theme/css/
    defaultTheme/path/to/image.png
    ```

    **Note:** HCL Connections parses the stylesheet, and resolves URLs of resources that are linked using url\(\) CSS properties by rebasing them. In the example, Connections parses and rebases this as:

    ```
    .lotusui30 .lotusMain { 
                       background-image: url("/connections/resources/web/com.ibm.social.hikari.theme/css/
    defaultTheme/path/to/image.png?etag=<version_stamp>");
    }
    ```


The Hikari theme is customized.

If you want to link to resources external to Connections in your stylesheet, and not have Connections rebase the paths, see: [IFIX FOR APAR LO78594](http://www.ibm.com/support/docview.wss?uid=swg1LO78594) for details.

**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

