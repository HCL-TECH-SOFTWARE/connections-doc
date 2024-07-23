# Add custom macros {#setup-editors-configure-add-custom-macros .task}

Creating simple macros to provide useful work shortcuts.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    **Note:** Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the [`postCreateTextboxio`](r_config-js-sample.md#postCreateTextboxio) function template.

    ```
    postCreateTextboxio: function(editor) {
    
    }
    ```

    This function is called for TinyMCE, and only accepts one parameter `editor`.

3.  Use the runtime API `editor.macros.addSimpleMacro` to add a macro.

    **Note:** The usage is as follows:

    ```
    editor.macros.addSimpleMacro(startString, endString, callback);
    ```

    where

    startString
    :   is a string to search for signifying the beginning of the macro replacement.

    endString
    :   is a string to search for signifying the end of the macro replacement.

    callback
    :   is a function that receives the text between the `startString` and `endString` markers and returns HTML which should replace it \(including `startString` and `endString`\).

    ...

    Macros could be used to implement a simplified bbcode like system.

    ```
    postCreateTextboxio: function(editor) {
      editor.macros.addSimpleMacro('[red]', '[/red]', function(match) {
          return '<span style="color: red">' + match + '</span>';
      });
    }
    ```

    Multiple macros can be created.

    ```
    postCreateTextboxio: function(editor) {
      editor.macros.addSimpleMacro('[red]', '[/red]', function(match) {
          return '<span style="color: red">' + match + '</span>';
      });
      editor.macros.addSimpleMacro('[blue]', '[/blue]', function(match) {
          return '<span style="color: blue">' + match + '</span>';
      });
    }
    ```

4.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:**[Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

