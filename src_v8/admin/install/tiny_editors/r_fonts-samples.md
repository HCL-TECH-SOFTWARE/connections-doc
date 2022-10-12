# Sample fonts list configurations {#fonts-samples .reference}

Samples of font lists for the Tiny editors' font picker.

To customize the Fonts menu, list the fonts to be included in a fonts array. For example:

```
  fonts: [
    'Helvetica',
    'Arial',
    'Times New Roman',
    'Comic Sans MS'
  ],
```

To provide an alternate name for a font, use the `text` property. For example: The Helvetica font with a comment:

```
  fonts: [
    'Arial',
    {
      value: 'Tahoma'
    },
    {
      value: 'Helvetica',
      text: 'A nice font'
    }
  ],
```

**Parent topic:**[Common tasks, concepts and reference information](../../install/tiny_editors/r_appendix.md)

**Related information**  


[../../admin/install/tiny\_editors/t\_configure\_09-set-fontpicker-fonts-2.md](../../admin/install/tiny_editors/t_configure_09-set-fontpicker-fonts-2.md)

