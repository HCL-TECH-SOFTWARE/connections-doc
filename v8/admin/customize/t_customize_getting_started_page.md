# Customizing the Getting Started view {#t_customize_getting_started_page .task}

Help your users get started with your implementation of HCL Connections™ by customizing the Getting Started view that is displayed in the Home page.

The Getting Started view is only available from the Home page. If you do not install the Home Page application, then the Getting Started view is not available in the product.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The gettingstarted-config.xml file defines the content of the Getting Started view in the Home page. By default, the view identifies the following steps in vertical tabs:

1.  **Welcome**
2.  **Share**
3.  **Explore**

You can edit the content that is displayed in each tab and you can add or remove tabs.

1.  Open a command window, and then start the wsadmin command line tool.

2.  Use the following command to access the configuration files for the Home page application:

    ```
    execfile("homepageAdmin.py")
    ```

3.  Check out the Getting Started view configuration files using the following command:

    ```
    HomepageCellConfig.checkOutGettingstartedConfig("working\_directory","cell\_name")
    
    ```

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft™ Windows™ operating system.

        **Note:** AIX® and Linux™ only: The directory must grant write permissions or the command will not run successfully.

    -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```

    For example:

    -   AIX/Linux:

        ```
        HomepageCellConfig.checkOutGettingstartedConfig("/opt/act/temp","foo01Cell01")
        ```

    -   Microsoft Windows:

        ```
        HomepageCellConfig.checkOutGettingstartedConfig("c:/act/temp","foo01Cell01")
        ```

4.  Find the gettingstarted-config.xml file in the following directory, and open it in a text editor.

    ```
    /opt/IBM/WebSphere/AppServer/profiles/<AppSrv>/config/cells/<nodeName>/LotusConnections-config
    ```

5.  From the temporary directory to which you checked out the gettingstarted-config.xml file, open it in a text editor.

6.  Make any of the following updates that you want:

    -   To remove one of the vertical tabs, find the <step\> element that represents the tab and change the value of its enabled attribute from true to false.
    -   To add another tab to the list, complete the following steps:
        1.  Copy one of the existing <step\> elements and paste it into the <steps\> block. The order of the vertical tabs reflects the order of the steps in the <steps\> element block, so copy it before and after the steps you want it to be displayed between on the page.
        2.  Change the content of the copied <step\> element:
            -   Change the tab title by adding your title text directly to the element in place of the jsp.start.step1.tab.title key or by specifying a key that you define in a corresponding resource bundle that you also define. For example, the title of the first tab is Welcome. It is defined by the jsp.start.step1.tab.title key that is stored in the com.ibm.lconn.homepage.resources.nls.jsp.jsp\_resources resource bundle. It is specified in the title element for that step in the configuration file. The bundle attribute identifies where the resource bundle is stored and the title element itself contains the key value for the title string.

                ```
                <title bundle="com.ibm.lconn.homepage.resources.nls.jsp.jsp_resources">
                  jsp.start.step1.tab.title
                </title>
                ```

            -   Define what should be displayed in the tab body using the <body-links\> element. The <body-links\> element must reference a web page that can be accessed over http and https. The page must be in the same domain as the Home page, for example an HTML page on the HTTP server of the HCL Connections deployment.
                -   To specify the page, provide its web address as the value of the secure and unsecure attributes. For example:

                    ```
                    <step enabled="true">
                      ...
                      <body-links
                       secure="https://w3.example.com/peoplepages/myProfile.wss"
                       unsecure="http://w3.example.com/peoplepages/myProfile.wss" />
                    </step>
                    ```

        3.  To change what is displayed in a tab, edit the title and content of the page. See the previous bullet for details.
7.  Save and close the gettingstarted-config.xml file.

8.  Run the following command to check the configuration files back in. You must check the files back in during the same wsadmin session in which you checked them out for the changes to take effect.

    ```
    HomepageCellConfig.checkInGettingstartedConfig("working\_directory",
     "cell\_name")
    ```

    where the working\_directory and cell\_name parameters contain the same values you specified for the checkout location.

9.  Update the version stamp property to force a refresh of your users' web browsers, so that they will see the changes you made to the Getting Started view the next time they access the product. See [Post-customization step](t_admin_common_customize_postreq.md).

    **Tip:** If your changes do not display after checking in LotusConnections-config.xml with the updated version stamp property, restart the Home page application.


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Administering the Home page using the wsadmin client](../admin/c_admin_homepage_wsadmin.md)

[Home page administrative commands](../admin/r_admin_homepage_admin_commands.md)

[Forcing the Getting Started view to be the default Home page view](../customize/t_customize_getstarted_tab_on.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Administering the Home page from the user interface](../admin/c_admin_homepage_ui.md)

