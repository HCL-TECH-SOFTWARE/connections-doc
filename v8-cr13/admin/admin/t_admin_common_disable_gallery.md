# Disabling the gallery and the grid view of files {#t_admin_common_disable_gallery .task}

Disable the Gallery widget and Files grid view to prevent users selecting the thumbnail view of files.

The Gallery and the Files grid view are two separate features, but the configuration procedure described here affects both of them.

Disabling the Gallery widget and Files grid view means that users can no longer select the thumbnail view of files. All thumbnail views are disabled, including those of personal files, community files, and gallery files.

By default, the Gallery widget in the Communities application and the grid view in the Files application are enabled. When the widget is enabled, your files can be displayed either in a grid of thumbnails or in a list that includes metadata about the files.

To disable the Gallery widget and the Files grid view, complete the following steps:

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Use the wsadmin client to access and check out the HCL Connections configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
            -   Linux only: The directory must grant write permissions or the command fails.
            
        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

3.  Navigate to the working directory that you specified in the previous step and open the LotusConnections-config.xml file in a text editor.

4.  Change the value of the **filesMediaView** property to disabled.

5.  Save and check in the LotusConnections-config.xml file.

6.  Stop and restart your WebSphere Application Server clusters.


**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

