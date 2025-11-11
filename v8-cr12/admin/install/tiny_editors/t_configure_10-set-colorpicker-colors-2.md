# Set Colorpicker colors {#setup-editors-configure-set-colorpicker-colors .task}

Customize the colors shown in the Tiny Editors colorpicker, and to keep or remove the custom color picker.

1.  Locate the property [`colors`](r_config-js-sample.md#colors) which contains the properties `buttons` and `custom`.

2.  Locate the sub-property [`buttons`](r_config-js-sample.md#colors_buttons) and modify the array to customize the color list configuration using the following resources:

    -   [Default colors list](r_colors-default.md).
    -   [Sample colors values](r_colors-samples.md).
    -   [The colors customization syntax](r_colors-syntax.md).
    
    !!! tip 
        
        If the `buttons` array is empty \(`buttons: [],`\), [the default list](r_colors-default.md) will be used.

3.  Locate the sub-property [`custom`](r_config-js-sample.md#colors_custom) and set it to:

    -   `true` to keep the custom color picker.
    -   `false` to remove the custom color picker.

    !!! tip
       
        If the `custom` property is missing the custom color picker will be kept.


**Related information**  


[Default colors list](r_colors-default.md)

[Sample colors values](r_colors-samples.md)

[The colors customization syntax](r_colors-syntax.md)

