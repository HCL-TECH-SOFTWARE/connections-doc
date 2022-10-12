# Example: Adding a logo to a blog theme {#t_blogs_theme_ex_logo .task}

Customize a theme by adding a logo to the design.

You must be a blog owner or administrator to customize the theme for the blog and the setting to customize a theme must be enabled for the site.

These steps illustrate how to add a logo, or any image, to a blog theme.

1.  From the My Blogs tab, click **Settings** for the blog that you want to add a logo to.

2.  Click **Theme**.

3.  Choose the theme you want to customize and click the **Customize** button.

    The templates for that theme are now available for you to edit from the **Templates** page. Note that if custom themes are not enabled for the site, the **Customize** button will not display.

4.  Click **Templates**.

    The templates for the current blog display.

5.  Click the **Edit** icon next to the weblog template to open the template file for editing.

6.  Locate the string <!-- content --\> using the browser **Find** option and add your<img\> tag after the line that begins with <a id="mainContent" name="mainContent"\></a\>.

    For example:

    ```
    [
    <!-- content -->
    <!--<td valign="top">-->
    <a id="mainContent" name="mainContent"></a>
    <img src="http://www.mycompany.com/logo.gif"/>
    
    <div id="content"> 
    ]
    
    
    ```

7.  Save changes you make to the template.

    When you open your blog, you will see the logo displayed with the blog title.


**Parent topic:**[Customizing a blog theme](../customize/c_blogs_custom_overview.md)

