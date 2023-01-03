# The fonts customization syntax 

The syntax for the fonts customization option is written using [Extended Backus–Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).

**Note:** For simplicity: White space has been omitted, single quoted strings have been used, and object properties have been given a strict ordering. These restrictions can be relaxed according to normal JavaScript syntax.

```
font_description = ? JavaScript string to be displayed as a description ?

font_name = ? JavaScript string containing the name of a font ? ;

font = font_name | "{", "'value':" , font_name , [ "," , "'text':" , font_description ] , "}"

fonts = "[", [ font , { "," , font } ] , "]";
```

**Parent topic:**[Common tasks, concepts and reference information](../../install/tiny_editors/r_appendix.md)

