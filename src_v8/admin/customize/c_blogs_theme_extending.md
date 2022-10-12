# Extending a theme {#c_blogs_theme_extending .concept}

You can extend an existing theme to use a different color scheme or to display different content.

Templates can be reused in multiple themes and still maintain a different color scheme or content by using the \_options.vm file. The \_options.vm file stores variables that can be used in the other templates in order to include or ignore content or file imports. Include the \_options.vm file in the weblog.vm template in order to set values in the \_header.vm template.

## Example { .example}

The Khaki\_Standard theme reuses the **blog** theme templates, but contains an \_options.vm file with one line: `#set ($lookAndFeel = "khaki")`

The \_header.vm checks for the $lookAndFeel variable, and includes the appropriate .css file:

```
#if ($lookAndFeel)
	<link rel="stylesheet" type="text/css" href="$url.site/roller-ui/styles/${lookAndFeel}.css" />
#end
```

The result is two themes, with two different color schemes, based on the same set of templates.

**Parent topic:**[Customizing a blog theme](../customize/c_blogs_custom_overview.md)

