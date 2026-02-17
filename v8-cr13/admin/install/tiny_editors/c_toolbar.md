# Toolbar components and the toolbar definition {#toolbar .concept}

The toolbar is the main interface of the editor. This section covers how the components of the toolbar relate to the toolbar definition in the config.js.

The items listed in the `toolbar` array will be displayed in order, in the direction defined by the user-interface language. For example: English will display with the toolbar items left aligned, ordered left-to-right and Arabic will display with the items right-aligned, right-to-left.

The toolbar is constructed from 4 parts.

- **Group**
:   A mechanism for combining one or more toolbar items so that they are displayed together and visually separated from other items. When using keyboard navigation, tabbing jumps between groups and the arrow keys move between the group items.

- **Menu**
:   A toolbar item that, when clicked, expands to show a list of menu items.

- **Command**
:   A toolbar button, menu item, or special widget that performs an action, typically when clicked.

- **Placeholder**
:   A placeholder that becomes zero or more application specific commands or menu items at run time.

Groups are the highest level of the toolbar array provided to the Tiny Editors `toolbar` configuration property. Any strings in the top-most array are assumed to be predefined group IDs.

Custom groups can be named or anonymous. Any object in the top most array must be a named group. Any array in the top most array must be an anonymous group. Named groups have a label and a list of items, anonymous groups are just the list of items.

The group item list is an array which can contain strings which refer to predefined menus, commands or placeholders, or it could be an object which depending on the properties is treated as a custom command or menu.

Custom menus always have `id` and `items` properties. If the id does not match a predefined menu then the `label` and `icon` properties should be specified as well.

Custom commands have an `id`, `text`, `icon` and `action` properties.

**Parent topic:** [Common tasks, concepts and reference information](r_appendix.md)

**Related information**  


[Customize the Toolbar](t_configure_08-customize-toolbar-2.md)

[The default toolbar configuration](r_toolbar-default.md)

[The Toolbar customization syntax](r_toolbar-syntax.md)

[List of predefined Toolbar objects](r_toolbar-predefined-identifiers.md)

