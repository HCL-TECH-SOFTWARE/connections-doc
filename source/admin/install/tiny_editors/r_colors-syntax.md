# The colors customization syntax {#colors-syntax .reference}

The syntax for the colors customization option is written using [Extended Backus–Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).

**Note:** For simplicity: White space has been omitted, single quoted strings have been used, and object properties have been given a strict ordering. These restrictions can be relaxed according to normal JavaScript syntax.

```
color_description = ? JavaScript string to be displayed as a description ? ;

color_value = ? JavaScript string containing any color valid in HTML/CSS ? ;

button = color_value | "{" , "'value':" , color_value , [ "," , "'text':" , color_description ] , "}" ;

buttons = "[", [ button , { "," , button } ] , "]" ;

custom = "true" | "false" ;

colors = buttons | "{" , "'buttons':" , buttons , [ "," , "'custom':" , custom ] , "}" ;
```

**Parent topic:**[Common tasks, concepts and reference information](../../install/tiny_editors/r_appendix.md)

**Related information**  


[../../admin/install/tiny\_editors/t\_configure\_10-set-colorpicker-colors-2.md](../../admin/install/tiny_editors/t_configure_10-set-colorpicker-colors-2.md)

