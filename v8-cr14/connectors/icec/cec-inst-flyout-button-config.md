# Flyout button configuration {#id_name .reference}

The flyout button is an interface element injected into the actions-wrapper element. It provides a configurable toggle for additional UI features. You can control its visual presentation, accessibility attributes, and behavior through the configuration settings below.

## Enabling the Flyout

The flyout is disabled by default in the system configuration. To enable the creation of the flyout button, modify the `LotusConnections-config.xml` file by following these steps:

1. Access and open the `LotusConnections-config.xml` file.
2. Locate the xccflyout property.
3. Change the property value to true:

    ```bash
    <genericProperty name="xccflyout">true</genericProperty>
    ```

4. Save and close the file.

## Flyout Property Reference

The options object defines all configurable aspects of the flyout button. Use the following properties to customize the button's appearance and accessibility.

|Property|Type|Default|Guidance|
|--------|----|-------|--------|
|ENABLED|boolean|true|Enables or disables the creation of the flyout button element.|
|BUTTON_TEXT|string \| null|'FLYOUT'|Visible text label for the button. This is ignored if a sprite is used.|
|ARIA_LABEL|string|'Open Flyout'|Screen-reader descriptive label applied to the button for accessibility.|
|USE_SPRITE|boolean|true|Overrides all text and image settings to use a CSS sprite background.|
|BUTTON_IMAGE_SRC|string \| null|null|Image URL rendered inside the button when sprites are not enabled.|
|BUTTON_IMAGE_ALT|string|""|Accessibility-friendly alt text for the button image.|
|BUTTON_ID|string|'lotusBannerFlyoutLink'|HTML ID assigned to the anchor element representing the button.|

## Sprite Rendering Settings

If USE_SPRITE is enabled, the following settings define how the CSS sprite is rendered:

|Property|Type|Default|Guidance|
|--------|----|-------|--------|
|SPRITE.url|string|null|Path to the sprite image file.|
|SPRITE.position|string|null|CSS background-position for sprite alignment.|
|SPRITE.width|number|null|Button width when rendering the sprite.|
|SPRITE.height|number|null|Button height when rendering the sprite.|

**Parent topic:** [Mode configuration](../../connectors/icec/cec-inst-configure-modes.md)
