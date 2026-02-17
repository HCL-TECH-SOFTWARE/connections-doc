# The Toolbar customization syntax {#toolbar-syntax .reference}

The syntax for the toolbar customization option is written using [Extended Backus–Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).

!!! note 
  
    For simplicity: White space has been omitted, single quoted strings have been used, and object properties have been given a strict ordering. These restrictions can be relaxed according to normal JavaScript syntax.

```sh
string = ? JavaScript string ? ;

icon = ? JavaScript string containing a path to an SVG icon ? ;

action = ? JavaScript function taking no arguments ? ;

tinymce_button_id = ? identifier of a TinyMCE button or menu-button ? ;

command_object = "{" ,
                    "'id':" , string , "," ,
                  [ "'text':" , string , "," ] ,
                    "'icon':" , icon , "," ,
                    "'action':" , action ,
                  "}" ;

escaped_tinymce_button_id = "'tmce-" , tinymce_button_id , "'" ;

command_id = "'accessibility'" | "'alignment'" | "'blockquote'" | "'bold'"
           | "'bookmark'" | "'capitalization'" | "'casechange'" | "'checklist'"
           | "'codesample'" | "'emoticons'" | "'fileupload'" | "'find'"
           | "'font-color'" | "'font-face'" | "'font-size'" | "'formatpainter'"
           | "'fullscreen'" | "'help'" | "'hr'" | "'indent'"
           | "'insertdatetime'" | "'italic'" | "'language'" | "'link'"
           | "'ltrdir'" | "'media'" | "'nonbreaking'" | "'ol'" | "'outdent'"
           | "'pageembed'" | "'permanentpen'" | "'preview'" | "'print'"
           | "'redo'" | "'removeformat'" | "'rtldir'" | "'specialchar'"
           | "'spellchecker'" | "'strikethrough'" | "'styles'" | "'subscript'"
           | "'superscript'" | "'table'" | "'ul'" | "'underline'" | "'undo'"
           | "'visualblocks'" | "'visualchars'" | "'wordcount'" ;

command = command_id | escaped_tinymce_button_id | command_object ;

placeholder_id = "'conn-emoticons'" | "'conn-insert'" | "'conn-macros'" | "'conn-other'" ;

menu_item = placeholder_id | command ;

menu_items = menu_item , { "," , menu_item } ;

menu_group = "[" , menu_item , { "," , menu_item } , "]" ;

menu_groups = menu_group | "[" , menu_group , { "," , menu_group } , "]" ;

menu_id = "'insert'" | "'font-menu'" | "'usersettings'" ;

menu_object_defaulted = "{",
                          "'id':", menu_id, "," ,
                        [ "'label':" , string , "," ] ,
                        [ "'icon':" , icon , "," ] ,
                          "'items':" , menu_groups ,
                        "}" ;

menu_object_full = "{",
                      "'id':", string, "," ,
                      "'label':" , string , "," ,
                      "'icon':" , icon , "," ,
                      "'items':" , menu_groups ,
                    "}" ;

menu = menu_id | menu_object_defaulted | menu_object_full ;

group_item = menu | placeholder_id | command ;

group_anon = "[" , group_item , { "," , group_item } , "]" ;

group_object = "{" ,
                  "'label':" , string , "," ,
                  "'items':" , group_anon ,
                "}" ;

group_id = "'undo'" | "'insert'" | "'style'" | "'emphasis'" | "'align'"
         | "'listindent'" | "'format'" | "'language'" | "'tools'" ;

group = group_id | group_object | group_anon ;

toolbar = "[", [ group , { "," , group } ] , "]";
```

**Parent topic:**[Common tasks, concepts and reference information](r_appendix.md)

**Related information**  


[Toolbar components and the toolbar definition](c_toolbar.md)

[Customize the Toolbar](t_configure_08-customize-toolbar-2.md)

