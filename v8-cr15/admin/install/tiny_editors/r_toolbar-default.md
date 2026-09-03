# The default toolbar configuration {#toolbar-default .reference}

The default toolbar used by the Tiny editors.

```sh
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
                'table'
              ],
              [
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
        'conn-macros'
      ],
      'language',
      'tools'
    ],
```

**Parent topic:** [Common tasks, concepts and reference information](r_appendix.md)

**Related information**  


[Toolbar components and the toolbar definition](c_toolbar.md)

[Customize the Toolbar](t_configure_08-customize-toolbar-2.md)

