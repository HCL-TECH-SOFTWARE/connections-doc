# Enable or Disable built-in macros {#setup-editors-configure-enable-or-disable-built-in-macros .task}

This section covers enabling or disabling the Tiny Editors built-in macros: useful text styling macros.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`macros`](r_config-js-sample.md#macros), and set the following sub-properties to `true` to enable and `false` to disable.

    
    | Macro | Effect (short) |
    |-------|----------------|
    | [`headings`](r_config-js-sample.md#macros_headings) | Create headings from lines prefixed with `#` |
    | [`lists`](r_config-js-sample.md#macros_lists) | Create ordered and unordered lists from list prefixes |
    | [`semantics`](r_config-js-sample.md#macros_semantics) | Bold and italic styling using Markdown-like syntax |
    | [`hr`](r_config-js-sample.md#macros_hr) | Insert a horizontal rule when a line contains `---` |
    | [`link`](r_config-js-sample.md#macros_link) | Convert URL-like text into hyperlinks |
    | [`entities`](r_config-js-sample.md#macros_entities) | Replace shorthand sequences with HTML entities (for example `(c)` → ©, `--` → —) |

    ### Examples

    #### Headings
    ```markdown
    # heading 1
    ## heading 2
    ### heading 3
    #### heading 4
    ##### heading 5
    ###### heading 6
    ```

    #### Lists
    ```markdown
    * Unordered list
    1. Ordered list using numbers
    1) Ordered list using numbers
    a. Ordered list using the alphabet
    a) Ordered list using the alphabet
    i. Ordered list using roman numerals
    i) Ordered list using roman numerals
    ```

    #### Semantics (bold / italic)
    ```markdown
    *this text will be italic*
    _this text will be italic_
    **this text will be bold**
    __this text will be bold__
    ```

    #### Horizontal rule
    ```markdown
    ---
    ```

    #### Link conversion

    Example: plain text that looks like a URL becomes a clickable link.

    #### Entities

    Examples:
    - `(c)` → ©  
    - `-` or `--` → —  


3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

