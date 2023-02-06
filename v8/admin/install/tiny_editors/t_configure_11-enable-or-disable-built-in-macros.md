# Enable or Disable built-in macros {#setup-editors-configure-enable-or-disable-built-in-macros .task}

This section covers enabling or disabling the Tiny Editors built-in macros: useful text styling macros.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    **Note:** Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`macros`](r_config-js-sample.md#macros), and set the following sub-properties to `true` to enable and `false` to disable.

    |Macro|Effect|
    |-----|------|
    |**[`headings`](r_config-js-sample.md#macros_headings)**|This macro creates headings when a line is prefixed with one or more "\#".     ```
# heading 1
## heading 2
### heading 3
#### heading 4
##### heading 5
###### heading 6
    ```

|
    |**[`lists`](r_config-js-sample.md#macros_lists)**|This macro creates a list when a line is prefixed with a asterisk, or other combinations to create a list.     ```
* Unordered list
1. Ordered list using numbers
1) Ordered list using numbers
a. Ordered list using the alphabet
a) Ordered list using the alphabet
i. Ordered list using roman numerals
i) Ordered list using roman numerals
    ```

|
    |**[`semantics`](r_config-js-sample.md#macros_semantics)**|This macro sets the font styling to bold or italic using markdown syntax.     ```
*this text will be italic*
_this text will be italic_
**this text will be bold**
__this text will be bold__
    ```

|
    |**[`hr`](r_config-js-sample.md#macros_hr)**|This macro inserts a horizontal rule \(hr tag\) when a line starts with three consecutive dashes.     ```
---
    ```

|
    |**[`link`](r_config-js-sample.md#macros_link)**|This macro converts URL-like text strings into a hyperlink.|
    |**[`entities`](r_config-js-sample.md#macros_entities)**|This macro provides a shorthand for a few HTML entities.     -   "`(c)`" will become the copyright symbol \(©\)
    -   "`-`" or "`--`" will become a long dash \(—\)
|

3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:**[Configuring the Tiny Editors integration](../../install/tiny_editors/t_01-setup_03-editors_01-configure_00-summary.md)

