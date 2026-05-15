# Sample config.js {#config-js-sample .reference}

A sample configuration file for the integration.

The following is the default `config.js` file.

```sh
/*
 * Tiny Editors for HCL Connections JavaScript Configuration module
 */
/* globals define, dojo, lconn */
define(
  [
  ],
  function() {
    /* eslint-disable no-unused-vars */
    dojo.require('dojo.cache');

    // URL all resources are relative to
    var resourceUrl =  lconn.core.url.getServiceUrl(
      lconn.core.config.services.webresources).toString();

    // subfolder for icons provided with textboxio
    var tbioIconsPath = '/web/tiny.editors.connections/images/textboxio/';
    /*
     * WARNING: The structure of this file is very specific.
     */
    return function() {
      return {
        // Content CSS used for both Tiny editors.
        cssUrl: dojo.moduleUrl('tiny.editors.connections', 'tiny-editors.css'),

        // Content CSS used for both Tiny editors in 'lite' edit mode
        cssLite: dojo.moduleUrl('tiny.editors.connections', 'tiny-editors-lite.css'),

        // Set to 'TinyMCE', 'CKEditor' or 'role-based'
        editor: 'TinyMCE',

        // URL for 'tiny-spelling' service which is used by in TinyMCE
        // If empty, the integration will try to determine the URL automatically.
        spellingServiceUrl: '',

        // Set to false to disable Tiny's spell checking service in TinyMCE.
        spellingServiceEnabled: true,

        // URL for 'tiny-hyperlinking' service which is used by TinyMCE.
        // If empty, the integration will try to determine the URL automatically.
        // This service is used to perform link validation and embedding.
        linkServiceUrl: '',

        // Set to false to disable Tiny's link validation service in TinyMCE
        linkValidationEnabled: true,

        // Set to false to disable Tiny's link embed service in TinyMCE
        linkEmbedEnabled: true,

        // See https://docs.ephox.com/display/tbio/toolbar for toolbar information.
        // Note that only the items array is configurable here.
        // HCL Connections specific placeholders:
        //   conn-emoticons: Emoticons dialog
        //   conn-insert:    Insert commands that depend on the application
        //   conn-macros:    Macros menu
        //   conn-other:     Other HCL Connections commands
        // TinyMCE specific items 
        //   codesample
        //   pageembed
        //
        // Any toolbar button or menu item prefixed with `tmce-` will be treated
        // as a tinymce button without the prefix. 
        //
        // Additionally an example of a custom button is given commented out below
        // which may be used as a starting point for your own custom functionality.
        toolbar: [
          'undo',
          {
            label: 'group.insert',
            items: [
              {
                id: 'insert',
                label: 'menu.insert',
                items: [
                  [
                    'link',
                    'conn-insert',
                    'bookmark',
                    'media',
                    'pageembed',
                    'table'
                  ],
                  [
                    // {
                    //   id: 'hello',
                    //   text: 'Insert greeting',
                    //   icon: resourceUrl + tbioIconsPath + 'macros-menu.svg',
                    //   action: function() {
                    //     var editor = textboxio.getActiveEditor();
                    //     editor.content.insertHtmlAtCursor('Hello');
                    //   }
                    // },
                    'codesample',
                    'specialchar',
                    'hr'
                  ]
                ]
              }
            ]
          },
          'style',
          'emphasis',
          'align',
          'listindent',
          'format',
          [
            'conn-other',
            'conn-emoticons',
            'conn-macros',
            // 'tmce-example' // an example of using a button from an external plugin
          ],
          'language',
          'tools'
        ],

        // See https://docs.ephox.com/display/tbio/fonts for information.
        //
        // An example of a custom font list is given commented out below.
        fonts: [
          // {
          //   value: '"Comic Sans MS", cursive, sans-serif',
          //   text: 'A silly font'
          // },
          // {
          //   value: 'Tahoma' // equivalent to providing just a string
          // },
          // 'Arial', // you can use a mixture of objects and strings
          // {
          //   value: 'Helvetica',
          //   text: 'A nicer font'
          // }
        ],

        // See https://docs.ephox.com/display/tbio/colors for information.
        colors: {
          buttons: [
            // { value: '#FFF', text: 'white' },
            // { value: '#000', text: 'black' },
            // { value: '#444', text: 'gray' },
            // { value: '#777', text: 'metal' },
            // { value: '#CCC', text: 'smoke' },
            // { value: '#FC1D00', text: 'red' },
            // { value: '#C81500', text: 'darkred' },
            // { value: '#FF8C00', text: 'darkorange' },
            // { value: '#FEBE00', text: 'orange' },
            // { value: '#FFFC00', text: 'yellow' },
            // { value: '#22AE50', text: 'green' },
            // { value: '#006400', text: 'darkgreen' },
            // { value: '#3CB371', text: 'mediumseagreen' },
            // { value: '#8FCD4E', text: 'lightgreen' },
            // { value: '#00FF00', text: 'lime' },
            // { value: '#0000CD', text: 'mediumblue' },
            // { value: '#002360', text: 'navy' },
            // { value: '#0173C1', text: 'blue' },
            // { value: '#14B2F2', text: 'lightblue' },
            // { value: '#ee82ee', text: 'violet' }
          ],
          // Whether to show a custom color picker option below the buttons
          custom: true
        },

        // enables or disables built-in macros
        macros: {

          // This macro allows creating headings by prefixing a line with one or more "#"
          // Example:
          // # heading 1
          // ## heading 2
          // ### heading 3
          // #### heading 4
          // ##### heading 5
          // ###### heading 6
          headings: true,

          // This macro allows prefixing a line with a asterisk or other combinations to create a list
          // Example:
          // * Unordered list
          // 1. Ordered list using numbers
          // 1) Ordered list using numbers
          // a. Ordered list using the alphabet
          // a) Ordered list using the alphabet
          // i. Ordered list using roman numerals
          // i) Ordered list using roman numerals
          lists: true,

          // This macro makes bold and italic avaliable using markdown style
          // Example:
          // *this text will be italic*
          // _this text will be italic_
          // **this text will be bold**
          // __this text will be bold__
          semantics: true,

          // This macro allows inserting a horizontal rule (hr tag) with three dashes
          // Example:
          // ---
          hr: true,

          // This macro converts URLs into links
          link: true,

          // This macro provides a shorthand for a few html entities
          // Currently it will convert "(c)" into the copyright symbol (&copy; in html)
          // and "-" or "--" into a long dash (&mdash; in html)
          entities: true,
        },

        // Add other TinyMCE settings.
        // If any settings can not be applied because they would override a 
        // integration setting a warning will be written to the console.
        // Note that `allowOverride` (Experimental options) will disable this
        // safety check.
        // Some suggested settings are shown commented out below.
        additionalSettings: {
          // fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
          // lineheight_formats: '1 1.1 1.2 1.3 1.4 1.5 2'
        },

        // Loads external Tinymce plugins
        // See https://www.tiny.cloud/docs/advanced/creating-a-plugin/
        // and https://www.tiny.cloud/docs/configure/integration-and-setup/#external_plugins
        // Each plugin has 2-5 properties:
        // - name: The name that the plugin uses to refer to itself internally
        // - url: The URL to find the plugin javascript
        // - settings: [Optional] The plugin settings (may not override internal settings)
        //             The plugin settings may be wrapped in a function call so
        //             it is only evaluated when needed and errors can be caught.
        // - supports: [Optional] The TinyMCE major versions that are supported
        //             by the plugin. Either a single number (ie `5` or `6`) or
        //             a list of numbers (ie `[5, 6]`). Default: `[5, 6]`.
        // - on/off: [Optional] The list of locations where the plugin is active/inactive
        // Note that the editor locations are:
        // - 'comments':            All editors used for comments
        // - 'editors':             All editors not used for comments
        // - 'activities':          Editors in the activities app excluding comments
        // - 'activities-comments': Comment editors in the activities app
        // - 'blogs':               Editors in the blogs app excluding comments
        // - 'blogs-comments':      Comment editors in the blogs app
        // - 'communities':         Editors for the community description
        // - 'forums':              Editors in the forums app excluding comments
        // - 'forums-comments':     Comment editors in the forums app
        // - 'profiles':            Editors in the profiles app
        // - 'wikis':               Editors in the wikis app excluding comments
        // - 'wikis-comments':      Comment editors in the wikis app
        // - 'richContent':         Editors for rich content fields
        // - 'highlights'           Editors in the highlights app
        // - 'unknown':             Editors in an unknown location excluding comments
        // - 'unknown-commments':   Comment editors in an unknown location
        // If the 'on' property is not specified it contains all locations.
        // If the 'off' property is not specified it contains no locations.
        // The plugin will be active in locations that are included in 'on'
        // but not included in 'off'.
        //
        // To use toolbar buttons from external plugins you must prefix them
        // with `tmce-` so they are passed through to TinyMCE.
        externalPlugins: [
          // {
          //   name: 'example',
          //   url: resourceUrl + '/web/tiny.editors.connections/example-plugin/plugin.js',
          //   off: ['comments', 'unknown'],
          //   supports: [5, 6],
          //   settings: function() { return { example_prefix: 'Hello ', example_suffix: '!' }; }
          // }
        ],

        // TinyMCE also calls this function with a wrapped version of the editor
        // mimicking the textbox.io API to be backwards compatible.
        postCreateTextboxio: function(editor) {
          // editor.macros.addSimpleMacro('[red]', '[/red]', function(match) {
          //   return '<span style="color: red">' + match + '</span>';
          // });
        },

        // Experimental options
        //
        // Use images instead of Unicode emojis
        // Known issues: 
        // - can't be supported in comment fields
        // - activity stream shows unstyled images
        imageEmojis: false,
        //
        // Allow svg elements in editor.
        // Note that connections must be configured to keep the svg elements 
        // as well, independently of this option.
        // WARNING: this also allows potential cross-site scripting attacks, 
        // only use in fully trusted environments.
        allowSvg: false,
        //
        // Allow overriding integration settings in the `additionalSettings` 
        // or in `externalPlugins.[x].settings`.
        // WARNING: overriding integration settings could break the integration.
        allowOverride: false,
      };
    };
  }
);

```

  
   

**Parent topic:** [Common tasks, concepts and reference information](r_appendix.md)

