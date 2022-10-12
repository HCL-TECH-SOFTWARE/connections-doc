# Making a custom theme available to your users {#t_blogs_theme_new .task}

You can create custom themes and make them available to your blog users. Customizing themes requires experience editing HTML and CSS files.

Follow these steps to make a custom theme available to your users from the Blogs theme field on the Create Blog form.

1.  To define a theme, complete the following steps.
2.  Create a copy of the existing default theme.

    For example, to create a new corporate theme:

    Copy the blog theme directory from WAS HOME/profiles/AppSrv Name/installedApps/Cell Name/Blogs.ear/blogs.war/themes/blog/ to the following directory: customization\_dir/blogs/themes/corporateBlogTheme/

    **Note:**

    The customization\_dir folder is the default directory in which customized files are stored. This location is defined during installation, and is saved as a WebSphere® Application Server variable named CONNECTIONS\_CUSTOMIZATION\_PATH. By default, the variable is set to Connections\_installdir\\data\\shared\\customization.

3.  Modify or add template files to create the desired look, layout, and content for your theme.

4.  Create an image to display as a preview thumbnail so that users can see what the theme looks like from the Create Blog form. The naming convention is sm-theme-blog\_directory\_name.png.

    For example, the preview image for the default blog theme is named sm-theme-blog.png.

5.  Edit the Blogs string resource file com.ibm.lconn.blogs.strings.ui\_xx.properties and add a new string for the name of your new theme, as follows:

    1.  Add the com.ibm.lconn.blogs.strings.ui\_xx.properties file to customization\_dir/strings.

    2.  Locate the \#themes section of the file and enter the theme directory name in the format ventura.theme.yourThemeDirectoryName. For example, ventura.theme.MyTheme=My Theme.

    **Note:** Adding the new theme directory name to the ui.properties file makes the new theme work in English. For international support, edit the ui\_language.properties file, where language is the ISO country code associated with the language in which you want to specify the custom label. For example, to support Chinese, you should also edit the ui\_zh.properties file.

6.  Copy the default style sheet, defaulttheme.css from its location in WAS HOME/profiles/AppSrv Name/installedApps/Cell Name/Blogs.ear\\blogs.war\\roller-ui\\styles. Make any changes you want to the theme, then save it to the same directory with the name of your new theme: <myNewThemeName\>.css.


**Parent topic:**[Customizing a blog theme](../customize/c_blogs_custom_overview.md)

