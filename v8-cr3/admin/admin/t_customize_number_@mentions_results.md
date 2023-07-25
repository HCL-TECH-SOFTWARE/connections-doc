# Customizing the number of @mentions suggestions {#t_customize_number_mentions_results .task}

Specify a custom number of suggestions that appear when you use @mentions.

When a user enters the @ character and the first letters of a user's name, HCL Connections displays up to 15 suggestions that match the entry. You can change the default number of suggestions by editing the LotusConnections-config.xmlfile.

To customize the number of @mentions suggestions, complete the following steps:

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Use the wsadmin client to access and check out the LotusConnections-config.xml file.

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

4.  Edit \(or, if necessary, create\) the <genericProperty name="people.typeahead.pageSize"\>number</genericProperty\> attribute, where number is an integer value that specifies the number of @mentions results that are displayed by IBM Connections.

5.  Save your changes to the LotusConnections-config.xml file.

6.  Check the file back in during the same wsadmin session in which you checked it out. For more information, see the *Applying common configuration property changes* topic.

7.  Restart WebSphere Application Server.


**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

