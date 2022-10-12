# List of predefined Toolbar objects {#toolbar-predefined-identifiers .reference}

Lists all available toolbar groups, menus, placeholders, and commands for Tiny Editors for HCL Connections.

## Toolbar Groups { .section}

Toolbar groups list one or more menus or commands to be included in the toolbar separated from other options. They may be user defined or be one of the predefined options listed below.

|Group ID|Contained Items|Appearance in TinyMCE|Appearance in Textbox.io|Description|
|--------|---------------|---------------------|------------------------|-----------|
|`undo`|`undo`, `redo`|![](resource/tmce/group_undo.png)|![](resource/tbio/group_undo.png)|Undo mistakes.|
|`insert`|`insert`|![](resource/tmce/group_insert.png)|![](resource/tbio/group_insert.png)|Insert content.|
|`style`|`styles`|![](resource/tmce/group_style.png)|![](resource/tbio/group_style.png)|Choose from preset styles.|
|`emphasis`|`bold`, `italic`, `underline`, `permanentpen`, `casechange`|![](resource/tmce/group_emphasis.png)|![](resource/tbio/group_emphasis.png)|Apply emphasis to content.|
|`align`|`alignment`|![](resource/tmce/group_align.png)|![](resource/tbio/group_align.png)|Change block alignment.|
|`listindent`|`ul`, `ol`, `checklist`, `outdent`, `indent`, `blockquote`|![](resource/tmce/group_listindent.png)|![](resource/tbio/group_listindent.png)|Insert lists or change indentation.|
|`format`|`font-menu`, `formatpainter`, `removeformat`|![](resource/tmce/group_format.png)|![](resource/tbio/group_format.png)|Fine control of formatting.|
|`language`|`language`, `ltrdir`, `rtldir`|![](resource/tmce/group_language.png)|![](resource/tbio/group_language.png)|Mark sections of the document as in a language or set their text direction.|
|`tools`|`find`, `accessibility`, `fullscreen`, `usersettings`|![](resource/tmce/group_tools.png)|![](resource/tbio/group_tools.png)|Helpful tools.|

## Toolbar Menus { .section}

Menus group multiple commands into one button. Menus contain one or more groups of commands separated by a divider. Menus include the predefined options listed below or custom menus.

|Menu ID|Contained Items|Appearance in TinyMCE|Appearance in Textbox.io|Description|
|-------|---------------|---------------------|------------------------|-----------|
|`insert`|`link`, `bookmark`, `fileupload`, `table`, `media`, `pageembed`, `hr`, `specialchar`|![](resource/tmce/menu_insert.png)|![](resource/tbio/menu_insert.png)|Inserting content.|
|`font-menu`|`font-face`, `font-size`, `lineheight`, `font-color`, `superscript`, `subscript`, `strikethrough`|![](resource/tmce/menu_font-menu.png)|![](resource/tbio/menu_font-menu.png)|Special text styling.|
|`usersettings`|`wordcount`, `spellchecker`, `autocorrect`, `capitalization`, `help`|![](resource/tmce/menu_usersettings.png)|![](resource/tbio/menu_usersettings.png)|User preferences and help.|

## Placeholders for Connections specific toolbar items { .section}

Placeholders are specific to connections and expand into one or more command items conditionally based on the [location of the editor](r_plugins-locations.md).

|Placeholder ID|Appearance in TinyMCE|Appearance in Textbox.io|Description|
|--------------|---------------------|------------------------|-----------|
|`conn-emoticons`|![](resource/tmce/placeholder_conn-emoticons.png)|![](resource/tbio/placeholder_conn-emoticons.png)|The `conn-emoticons` placeholder provides `emoticons` in the default editor when available for a location.|
|`conn-insert`|![](resource/tmce/placeholder_conn-insert.png)|![](resource/tbio/placeholder_conn-insert.png)|The `conn-insert` placeholder provides a list of location specific insert options. For example: Within a community, the **Link to Connections Files** is shown. This placeholder is normally used as part of a custom insert menu. The example images show the `conn-insert` menu expanded on a Wiki.|
|`conn-macros`|![](resource/tmce/placeholder_conn-macros.png)|![](resource/tbio/placeholder_conn-macros.png)|The `conn-macros` placeholder provides a menu listing any macros provided to the default editor. The images show what `conn-macros` expands to in Wikis.|
|`conn-other`| | |The `conn-other` placeholder provides buttons that are not mapped to another placeholder. Normally nothing will be displayed for this placeholder.|

## Command Items { .section}

Commands items can be placed in toolbar groups or menus.

CAUTION:

Some commands described below are not available in all editors or are only available as part of the `usersettings` menu.

|Toolbar Item ID|Appearance in TinyMCE|Appearance in Textbox.io|Description|
|---------------|---------------------|------------------------|-----------|
|`undo`|![](resource/tmce/item_undo.png)|![](resource/tbio/item_undo.png)|Reverse an action that changed the editor content.|
|`redo`|![](resource/tmce/item_redo.png)|![](resource/tbio/item_redo.png)|Reproduces an action that was reversed by undo.|
|`link`|![](resource/tmce/item_link.png)|![](resource/tbio/item_link.png)|Opens the link insertion dialog.|
|`bookmark`|![](resource/tmce/item_bookmark.png)|![](resource/tbio/item_bookmark.png)|Inserts a bookmark at the cursor position which can be linked to.|
|`fileupload`|![](resource/tmce/item_fileupload.png)|![](resource/tbio/item_fileupload.png)|Opens the file/image upload dialog.|
|`table`|![](resource/tmce/item_table.png)|![](resource/tbio/item_table.png)|Opens the table insertion menu.|
|`specialchar`|![](resource/tmce/item_specialchar.png)|![](resource/tbio/item_specialchar.png)|Opens the special character selector dialog.|
|`media`|![](resource/tmce/item_media.png)|![](resource/tbio/item_media.png)|Opens the media embed insertion dialog.|
|`hr`|![](resource/tmce/item_hr.png)|![](resource/tbio/item_hr.png)|Inserts a horizontal rule.|
|`styles`|![](resource/tmce/item_styles.png)|![](resource/tbio/item_styles.png)|Opens the style menu.|
|`bold`|![](resource/tmce/item_bold.png)|![](resource/tbio/item_bold.png)|Applies the bold style to the selection.|
|`italic`|![](resource/tmce/item_italic.png)|![](resource/tbio/item_italic.png)|Applies the italic style to the selection.|
|`underline`|![](resource/tmce/item_underline.png)|![](resource/tbio/item_underline.png)|Applies the underline style to the selection.|
|`strikethrough`|![](resource/tmce/item_strikethrough.png)|![](resource/tbio/item_strikethrough.png)|Applies the strikethrough style to the selection.|
|`superscript`|![](resource/tmce/item_superscript.png)|![](resource/tbio/item_superscript.png)|Applies the superscript style to the selection.|
|`subscript`|![](resource/tmce/item_subscript.png)|![](resource/tbio/item_subscript.png)|Applies the subscript style to the selection.|
|`alignment`|![](resource/tmce/item_alignment.png)|![](resource/tbio/item_alignment.png)|Opens the modify element alignment menu.|
|`ul`|![](resource/tmce/item_ul.png)|![](resource/tbio/item_ul.png)|Changes the selection to an unordered list.|
|`ol`|![](resource/tmce/item_ol.png)|![](resource/tbio/item_ol.png)|Changes the selection to an ordered list.|
|`checklist`|![](resource/tmce/item_checklist.png)|Not available.|Inserts a checklist. **Note:** This feature is unavailable in Textbox.io.

|
|`indent`|![](resource/tmce/item_indent.png)|![](resource/tbio/item_indent.png)|Adds an indent to the selection.|
|`outdent`|![](resource/tmce/item_outdent.png)|![](resource/tbio/item_outdent.png)|Removes an indent from the selection.|
|`blockquote`|![](resource/tmce/item_blockquote.png)|![](resource/tbio/item_blockquote.png)|Changes the selection to a blockquote.|
|`font-face`|![](resource/tmce/item_font-face.png)|![](resource/tbio/item_font-face.png)|Select the font-face value from a list.|
|`font-size`|![](resource/tmce/item_font-size.png)|![](resource/tbio/item_font-size.png)|Controls for changing the font size.|
|`font-color`|![](resource/tmce/item_font-color.png)|![](resource/tbio/item_font-color.png)|Shows the font color options. For TinyMCE this is displayed as two items, one for the text color and one for highlight color. For Textbox.io this is a single widget that allows setting both. Note that the color list is configurable.|
|`lineheight`|![](resource/tmce/item_lineheight.png)|Not available.|Select the line height value from a list. **Note:** This feature is unavailable in Textbox.io.

|
|`formatpainter`|![](resource/tmce/item_formatpainter.png)|Not available.|Copies the formatting from the cursor location and applies the formatting to the selection made afterwards. **Note:** This feature is unavailable in Textbox.io.

|
|`permanentpen`|![](resource/tmce/item_permanentpen.png)|Not available.|Applies a preset format. **Note:** This feature is unavailable in Textbox.io.

|
|`pageembed`|![](resource/tmce/item_pageembed.png)|Not available.|Inserts a configurable iframe into the content. **Note:** This feature is unavailable in Textbox.io.

|
|`casechange`|![](resource/tmce/item_casechange.png)|Not available.|Sets the capitalization of the selected text to upper-case, lower-case, or title-case. **Note:** This feature is unavailable in Textbox.io.

|
|`removeformat`|![](resource/tmce/item_removeformat.png)|![](resource/tbio/item_removeformat.png)|Removes all formatting from the selection.|
|`find`|![](resource/tmce/item_find.png)|![](resource/tbio/item_find.png)|Opens the find and replace dialog.|
|`accessibility`|![](resource/tmce/item_accessibility.png)|![](resource/tbio/item_accessibility.png)|Opens the accessibility checker dialog.|
|`fullscreen`|![](resource/tmce/item_fullscreen.png)|![](resource/tbio/item_fullscreen.png)|Toggles full-screen mode.|
|`wordcount`|![](resource/tmce/item_wordcount.png)|![](resource/tbio/item_wordcount.png)|Opens the word count dialog.|
|`spellchecker`|![](resource/tmce/item_spellchecker.png)|See `usersettings` menu.|Select the language used by the spellchecker. **Note:** This feature requires the spelling service to be enabled.

 **Note:** In Textbox.io this is only available as a item in the `usersettings` menu.

|
|`autocorrect`|See `usersettings` menu.|See `usersettings` menu.|Toggles auto-correction of commonly misspelled words. **Note:** This feature requires the spelling service to be enabled.

 **Note:** This feature is only available as an item in the `usersettings` menu.

|
|`capitalization`|See `usersettings` menu.|See `usersettings` menu.|Toggles auto-capitalization. **Note:** This feature requires the spelling service to be enabled.

 **Note:** This feature is only available as an item in the `usersettings` menu.

|
|`help`|![](resource/tmce/item_help.png)|See `usersettings` menu.|Shows the help dialog. **Note:** In Textbox.io this is only available as a item in the `usersettings` menu.

|
|`language`|![](resource/tmce/item_language.png)|![](resource/tbio/item_language.png)|Marks the selected text as a specific language. This changes the language used to spell check the selected section of text.|
|`ltrdir`|![](resource/tmce/item_ltrdir.png)|![](resource/tbio/item_ltrdir.png)|Marks the text direction of the selected text as left to right.|
|`rtldir`|![](resource/tmce/item_rtldir.png)|![](resource/tbio/item_rtldir.png)|Marks the text direction of the selected text as right to left.|
|`emoticons`|![](resource/tmce/item_emoticons.png)|![](resource/tbio/item_emoticons.png)|Opens the emoticon character selector dialog. **Note:** This option is only available to Textbox.io where it is supported in the default editor.

|
|`insertdatetime`|![](resource/tmce/item_insertdatetime.png)|Not available.|Inserts the current date or time. **Note:** This feature is unavailable in Textbox.io.

|
|`nonbreaking`|![](resource/tmce/item_nonbreaking.png)|Not available.|Allows inserting non-breaking spaces. **Note:** This feature is unavailable in Textbox.io.

|
|`preview`|![](resource/tmce/item_preview.png)|Not available.|Shows a preview of the content in a popup. **Note:** This feature is unavailable in Textbox.io.

|
|`print`|![](resource/tmce/item_print.png)|Not available.|Opens the print dialog for the editor content. **Note:** This feature is unavailable in Textbox.io.

|
|`visualblocks`|![](resource/tmce/item_visualblocks.png)|Not available.|Draws boxes around all the block elements. **Note:** This feature is unavailable in Textbox.io.

|
|`visualchars`|![](resource/tmce/item_visualchars.png)|Not available.|Gives invisible characters a background. **Note:** This feature is unavailable in Textbox.io.

|
|`codesample`|![](resource/tmce/item_codesample.png)|Not available.|Inserts a codesample. **Note:** This feature is unavailable in Textbox.io.

|

**Parent topic:**[Common tasks, concepts and reference information](../../install/tiny_editors/r_appendix.md)

**Related information**  


[Toolbar components and the toolbar definition](../../install/tiny_editors/c_toolbar.md)

[../../admin/install/tiny\_editors/t\_configure\_08-customize-toolbar-2.md](../../admin/install/tiny_editors/t_configure_08-customize-toolbar-2.md)

