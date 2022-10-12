# Standard Blogs theme components {#r_blogs_theme_templates .reference}

A Blogs theme is made up of a collection of templates, graphics, and macros that you can modify. This topics describes some of the basic theme components.

## Theme templates { .section}

Although the templates that make up a theme can vary, each theme contains some required templates \(you cannot change the template name or delete the template from the theme\) and some standard templates. Your theme may contain some or all of the following:

|Template|Description|
|--------|-----------|
|weblog|A required template that defines the main page of your blog. The weblog template specifies blog components such as a links to entries, feed links, a calendar, and paging controls,|
|\_day|A required template that defines how each day's worth of blog entries is displayed on the main page of your blog.|
|\_css|The cascading style sheet \(CSS\) used by the blog. The CSS controls the fonts and spacing that structure the blog pages.|
|\_header|Controls variables such as text and background color, and image placement.|
|\_footer|Controls items that display in the footer of a blog, such as links to other web pages.|
|\_options|Used to enable applications such as the inclusion of Bookmarks. This template should not be edited.|
|\_myfavorites|defines the look of the My Recommendations page.|
|allblogs|Defines the look of the Blogs Listing view.|
|mynotificationreceived|Defines the look of the Notifications Received list on the My Updates page.|
|mynotificationsent|Defines the look of the Notifications Sent list on the My Updates page.|
|myupdates|Defines the look of the My updates page.|

## Theme macros { .section}

Some theme content, for example the comment form and paging controls, is not customizable via the theme templates. This content is specified in a site-wide macro file: WAS HOME/profiles/profile\_name/installedApps/Cell Name/Blogs.ear/blogs.war/WEB-INF/velocity/weblog.vm. You can customize these macros, but be aware that changes made to the macros affect all Blogs themes.

## Theme graphics { .section}

Most image files are found in the common, core images directory: <WAS\_home\>/profiles/<profile\_name\>/installedApps/<cell\_name\>/Blogs.ear/blogs.war/nav/common/styles/images.

Connections Blogs include an images directory as well: WAS HOME/profiles/<profile\_name\>/installedApps/<Cell Name\>/Blogs.ear/blogs.war/roller-ui/images. Changes to these images will affect all Blog and Homepage themes, although additional images can be added and referenced without affecting other themes.

**Parent topic:**[Customizing a blog theme](../customize/c_blogs_custom_overview.md)

