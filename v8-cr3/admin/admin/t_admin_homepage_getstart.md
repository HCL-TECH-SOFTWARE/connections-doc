# Managing the default view of the home page {#t_admin_homepage_getstart .task}

Edit configuration property settings to allow users to go straight to **ActivityStream** instead of **Getting Started**.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Configure **ActivityStream** to be the default view instead of **Getting Started**. This configuration implements the following changes:

-   Update the initial redirect
-   Remove the check box option for **Getting Started** page

You can edit configuration properties in LotusConnections-config.xml to redirect to **ActivityStream**.

1.  To redirect to **Activity Stream** complete the following steps.
2.  Create a directory \(referenced in this procedure as working\_directory\) to store the configuration files that you update. For example, on Windows create C:\\temp.

3.  Use the wsadmin client to access and check out the IBM® Connections configuration files:

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
            -   Linux® only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

4.  Open LotusConnections-config.xml in a text editor.

5.  To enable **Activity Stream** as the default view add the following property to LotusConnections-config.xml, before the closing tag for the file:

    ```
    
    <properties>
        <genericProperty name="homepage.gettingstarted.bypass">true</genericProperty>  
    </properties>
    
    ```

    **Note:** If the `<properties>` tag, is already present, add `genericProperty` to it.

    **Note:** If both `homepage.default.widgets` and `homepage.gettingstarted.bypass` are set to true, then users go directly to /homepage/web/widgets/when they log in \(bypassing **Getting Started**\).

6.  Save LotusConnections-config.xml.

7.  Stop the Home Page Application in WebSphere Console.

8.  Update the version stamp in LotusConnectionsConfig.xml:

    ```
    LCConfigService.updateConfig("versionStamp","")
    ```

9.  Check in the configuration file during the same wsadmin session in which you checked it out for your configuration changes to take effect:

    ```
    LCConfigService.checkInConfig("working_directory","cell_name")
    ```

10. Restart the Home Page Application in WebSphere Console.


The **Getting Started** page is bypassed, instead users to go straight to **ActivityStream**.

**Parent topic:**[Administering the Home page using the wsadmin client](../admin/c_admin_homepage_wsadmin.md)

