# The default toolbar configuration 

The default toolbar used by the Tiny editors.

```
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

**Parent topic:**[Common tasks, concepts and reference information](../../install/tiny_editors/r_appendix.md)

**Related information**  


[Toolbar components and the toolbar definition](../../install/tiny_editors/c_toolbar.md)

