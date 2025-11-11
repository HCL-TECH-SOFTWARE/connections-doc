# Add custom macros {#setup-editors-configure-add-custom-macros .task}

Creating simple macros to provide useful work shortcuts.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the [`postCreateTextboxio`](r_config-js-sample.md#postCreateTextboxio) function template.

    ```
    postCreateTextboxio: function(editor) {
    
    }
    ```

    This function is called for TinyMCE, and only accepts one parameter `editor`.

3.  Use the runtime API `editor.macros.addSimpleMacro` to add a macro.

    !!! note 
        
        The usage is as follows:

    ```
    editor.macros.addSimpleMacro(startString, endString, callback);
    ```

    where

        - `startString`
            :   is a string to search for signifying the beginning of the macro replacement.

        - `endString`
            :   is a string to search for signifying the end of the macro replacement.

        - `callback`
            :   is a function that receives the text between the `startString` and `endString` markers and returns HTML which should replace it \(including `startString` and `endString`\).

   
    **Example**
    Macros could be used to implement a simplified bbcode like system.

    ```sh
    postCreateTextboxio: function(editor) {
      editor.macros.addSimpleMacro('[red]', '[/red]', function(match) {
          return '<span style="color: red">' + match + '</span>';
      });
    }
    ```

    Multiple macros can be created.

    ```sh
    postCreateTextboxio: function(editor) {
      editor.macros.addSimpleMacro('[red]', '[/red]', function(match) {
          return '<span style="color: red">' + match + '</span>';
      });
      editor.macros.addSimpleMacro('[blue]', '[/blue]', function(match) {
          return '<span style="color: blue">' + match + '</span>';
      });
    }
    ```

4.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

