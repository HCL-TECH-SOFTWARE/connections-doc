# Sample colors values {#colors-samples .reference}

Example colors using different formats.

Colors are be specified as:

-   The color value as a string.
-   The color value in an object.
-   The color value with text to be displayed.

Any valid HTML color value formats can be used, including [HTML Predefined color names](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords).

The text property provides tooltip text for the color. If the color value or text property matches one of Tiny Editor default colors, the display name used on the Tiny Editors will be applied and localized where applicable. If the text property is not provided and the color value is not one of the default colors, the color value will be used as the display name.

In the following example:

1.  A default red color for Tiny Editors is listed, which will provide a localized name.
2.  Uses a HTML color name which is not provided as a Tiny Editors default. Without a text property: A dark green color \(\#2E8B57\) swatch will be shown, 'SeaGreen' will be used for the name, and the name will not be localized.
3.  Uses the HSL color representation of the default blue for the Tiny Editors. Because it uses a default Tiny Editors color: A blue swatch will be shown, 'Blue' will be displayed in the tooltip, and the tooltip will be localized where applicable.
4.  Uses a color with an alpha component. The color will be painted onto a white background to remove the alpha component, and the text property provided is not a Tiny Editors default, so the tooltip 'Sunshine' will be used.

```sh
  colors: {
    buttons: [
      '#FC1D00',
      { value: 'SeaGreen' },
      { value: 'hsl(204, 99.0%, 38.0%)', text: 'blue' },
      { value: 'rgba(255, 215, 0, 0.4)', text: 'Sunshine' }
    ],
    custom: true
  },
```

**Parent topic:** [Common tasks, concepts and reference information](r_appendix.md)

**Related information**  


[Set Colorpicker colors](t_configure_10-set-colorpicker-colors-2.md)

