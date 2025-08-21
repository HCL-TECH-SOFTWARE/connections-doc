# Using "match: url" to refine the "path" property {#custom_customizer_props_match_url. .concept}

You can refine the extension's path property to target a specific portion of a component's display for customization.

The path property value typically represents a path element in the Connections request URL, which in most use cases corresponds to one of the following standard HCL Connections components. The following list of supports paths includes all core HCL Connections components except Administration URLs \(BSS\), Meetings, and Verse.

-   activities
-   blogs
-   communities
-   files
-   forums
-   global
-   homepage
-   mycontacts
-   news
-   profiles
-   search
-   viewer
-   wikis

When you specify a Connections component with the path property, your modifications by default are applied to all pages of the specified component. You can further limit the modification so that it only applies to a specific subset of pages using the `match: url` property.

For example, if the specified path is "communities" then the app would normally be applied to everything in the communities pages. Adding the match property with the value `"url": "followedcommunities"` restricts the modification to only the page that includes "followedcommunities" in its URL; other pages in the Communities component will not be modified.

**Parent topic:**[Customizer-specific properties](../customize/custom_customizer_props.md)

