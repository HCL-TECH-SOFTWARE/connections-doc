# Adding Sametime awareness though the Sametime client {#t_admin_common_add_st_awareness .task}

If you have an Sametime® 8.5.2 client or later and the Profiles application deployed, you can enable Sametime awareness in HCL Connections.

**Note:** This is an optional configuration.

When you enable Sametime awareness in HCL Connections, a person's online status is indicated by a set of icons and an associated status message that is available from the person's profile and business card. Sametime awareness tells you whether the person is available to chat, busy in a meeting, or away from their computer.

You must have the following software enabled to be able to add Sametime awareness to HCL Connections:

-   Sametime 8.5.2 or later stand-alone client.

    **Note:** Alternatively, you can use Sametime embedded in Notes® if the Notes client version is Notes 8.5 or later.

-   When using Sametime 8.5 or later the following limitations apply:
    -   Users defined in the Sametime directory must have the same email address as the users defined in the Profiles directory.
-   The Profiles application of HCL Connections must be deployed.

**SSL support**: If you have configured the product to send traffic over SSL, Sametime awareness can be retrieved over SSL for the following Sametime clients:

-   IBM® Sametime 8.5 or later standalone client
-   Notes 8.5.1 or later embedded client

For more information about enabling SSL for Sametime, refer to the documentation provided with the Sametime SDK, which is available from the following web site: [http://www.ibm.com/developerworks/lotus/downloads/toolkits.html](http://www.ibm.com/developerworks/lotus/downloads/toolkits.html)

**Note:** After downloading the toolkit, the ConnectWebApiDevguide.pdf documentation can be found in the sdk/client/connectWebApi/doc directory.

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Edit the profiles-config.xml file to indicate that you want to enable awareness. Start the wsadmin client. Use the following commands to access and check out the Profiles configuration files:

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   AIX
            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere® Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   AIX or Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

3.  From the temporary directory to which you checked out the configuration files, open the profiles-config.xml file in a text editor.

4.  Find the <sametimeAwareness\> element, and then set the enabled attribute equal to true, specify web addresses for the href and ssl\_href attributes, and specify which input type should be used for identifying the person: an email address or a user ID. For example:

    ```
    <sametimeAwareness 
     enabled="true" 
     href="http://localhost:59449/stwebapi"  
     ssl_href="http://localhost:59449/stwebapi" 
     sametimeInputType="email" />
    ```

    If HCL Connections is configured to hide email addresses, define the user ID as the input type by setting the sametimeInputType attribute equal to uid. For example:

    ```
    <sametimeAwareness 
     enabled="true" 
     href="http://localhost:59449/stwebapi"  
     ssl_href="http://localhost:59449/stwebapi" 
     sametimeInputType="uid" />
    ```

5.  If you have configured the product to send traffic over SSL, edit the ssl\_href attribute to specify the web address with the HTTPS protocol. For example:

    ```
    <sametimeAwareness 
     enabled="true" 
     href="http://localhost:59449/stwebapi"  
     ssl_href="https://localhost:59669/stwebapi" 
     sametimeInputType="email" />
    ```

    Do not make this change for releases earlier than Sametime 8.5 or the Notes 8.5.1 embedded client or awareness will stop working properly.

6.  Save and close the profiles-config.xmlfile.

7.  Check in the changed configuration files using the following wsadmin client command:

    ```
    ProfilesConfigService.checkInConfig()
    ```

8.  To exit the wsadmin client, type exit at the prompt.

9.  If you are using a Sametime client that is embedded in a version of Notes later than 8.0.2 \(IFR1\), you must configure Notes to display awareness information because it is disabled by default. To do so, complete the following steps:

    1.  Exit the Notes client.

    2.  Open the plugin\_customization.ini file in a text editor.

        By default, the plugin\_customization.ini file is stored in the following directory:

        ```
        C:\notes\_install\_directory\framework\rcp
        ```

    3.  Search for the com.ibm.collaboration.realtime.webapi/startwebContainer property. If it is set to false, set it equal to true. If you do not find it, add the property using the follow syntax:

        ```
        com.ibm.collaboration.realtime.webapi/startwebContainer=true
        ```

    4.  Save and close the plugin\_customization.ini file.

10. Stop and restart the WebSphere Application Server hosting the Profiles application.

11. Start the stand-alone Sametime client or Notes client in which Sametime is embedded.

    It is not recommended that you run more than one Sametime client on a single machine at one time. If awareness does not seem to be enabled in HCL Connections, make sure you do not have an earlier version of the Sametime client running on your machine. If you do, stop the clients and be sure to restart the Sametime Connect 8.0.1 client or the Sametime client embedded in Notes 8.0.2 \(IFR1\) or later before restarting any other clients.

12. Confirm that this procedure worked by accessing one of the HCL Connections applications, and then opening a person's business card. It may take a few seconds for the person's awareness information to display the first time.


**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Common configuration properties](../admin/r_admin_common_props.md)

[Customizing the Profiles business card](../customize/c_admin_profiles_customize_biz_card_links.md)

