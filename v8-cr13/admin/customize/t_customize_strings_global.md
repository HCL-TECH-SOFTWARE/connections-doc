# Customizing product strings {#t_customize_strings_global .task}

You can replace a word or phrase in the product user interface with terminology that better suits your environment.

!!! note
    
    - You cannot use this method to customize the default notification messages in emails that are sent from HCL Connections applications. See [Customizing notifications](c_customize_notifications.md) for information about how to customize notifications.
    - You cannot use the customization debugging capability to test edited strings.

Many of the product strings in the user interface are represented by key-value pairs defined in the properties files stored in the application JAR files. Before you can redefine the value of a string, you must find out which key is used to represent it. After you have identified the key-value pair that you want to customize, you can create a properties file that contains the key-value pairs corresponding to your custom strings, and copy it into the customizationDir/strings directory.

1.  Find the key that is used to represent the value of the string that you want to customize. For a list of the application properties files that contain strings you can customize, see [Property file strings](r_customize_properties_files.md).

2.  Create a properties file in which to store the key-value pair for the custom string. Give the properties file the same name as the properties file that is used to store that key by the application. For example, if you copy the templates.properties file, and paste it into the customizationDir/strings directory, name it as follows:

    ```
    com.ibm.lconn.core.strings.templates.properties
    ```

    !!! note
        
        You must create the file with the full file name; that is, it must not be a series of directories containing the templates.properties file, such as, ```com/ibm/lconn/core/strings/templates.properties```.
        
    Also, specify a language code for the properties file in the file name. If you do not provide a \_language\_code value at the end of the properties file name, the value you specify for the key in the properties file is used despite the locale of the web browser accessing the application.
        
    For example, if you change the key with the current value of "Help" to "Ayuda" and define it in a file named com.ibm.lconn.files.strings.ui.properties \(without the \_es suffix\), then anyone who accesses the product will see Aydua in place of the Help string even if their browser locale is not set to es. In some cases, you might want the same value applied to all languages. If you want to change the term "HCL Connections" to a company name, for example, then you might store the customized key in a properties file without the \_language\_code suffix and the company name shows as-is to all browsers.
        
    For a full list of the language codes supported by , see [Language codes](r_customize_lang_codes.md).

3.  Save the properties file that you created in the following directory:

    ```
    customizationDir/strings
    ```

    where customizationDir is the root directory for customization files. See [Determining where to save your customizations](t_customize_find_custom_directory.md) for more details. Unlike some of the other areas of the product, the strings directory in the customization root does not have a subdirectory for each application. Each application uses unique properties file names so all of the strings that you replace can be stored in this common strings directory.

4.  Using the IBM® WebSphere® Application Server Integrated Solutions Console, stop and restart each application EAR file.

5.  Test your changes by clearing your browser cache, and then refreshing the browser.

6.  To force all user web browsers to refresh all cached content and display your changes, run the command that updates the product version stamp.

    1.  Enter the following command to load the HCL Connections configuration file: ```execfile("connectionsConfig.py")```

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        ```LCConfigService.checkOutConfig("working_directory","cell_name")```

        where:

        - *working_directory* is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            !!! notes

                - When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
                - AIX®, and Linux® only: The directory must grant write permissions or the command fails.

        - *cell_name* is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: ```print AdminControl.getCell()```

            !!! note

                This input parameter is case-sensitive.

    3.  Enter the following command to increment the value of the versionStamp property:

        !!! note

            This command is required only when a change is made to the product user interface and the change is to a file checked out using ***LCConfigService***.

        ``LCConfigService.updateConfig("versionStamp","gmt_timestamp")`` where ``gmt_timestamp`` is the GMT time. You can specify an empty string for the time stamp or provide a GMT value string. When you specify an empty string, the client calculates the current GMT time and updates the version stamp with that value. If you choose to provide the time, specify it using the following format: yyyyMMdd.HHmmss and specify the time in GMT. It is best to provide an empty string and let the client format the time stamp. For example: ``LCConfigService.updateConfig("versionStamp","")``.

    4.  When you have made changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. 