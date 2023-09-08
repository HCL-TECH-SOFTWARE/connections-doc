# Enabling notification replies {#t_admin_homepage_sync_news_data .task}

An administrator must edit settings in the `news-config.xml` file to allow users to reply to email notifications. Users must specify two preferences.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

In the news-config.xml file you must enable support for the reply feature, and also provide a special ReplyTo address. If your deployment has a dedicated HCL Connections mail domain, you must provide that as well. If your deployment uses an existing domain, provide either a prefix or suffix to add to the HCL Connections domain.

For users to be able to reply to emails, certain of their HCL Connections settings must be selected. They must click **Settings**, and then the **Email Preferences** tab. They must make sure **Receive notifications from other people by email** and **Allow me to reply to notifications by email** \(this option is only available if mail-in is enabled in the news-config.xml file\) are selected. In the **Content that I am following** section, they must make sure **Forums** is set to **Individual Emails**.

**Note:** Users will not see **Allow me to reply to notifications by email** until you perform the steps in this topic to enable notification replies.

1.  To configure the data synchronization task, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the News Jython script interpreter.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the News cell-level configuration file using the following command:

        NewsCellConfig.checkOutConfig\("working\_dir", "cellName"\)

        where:

        -   working\_dir is the temporary directory to which you want to check out the cell-level configuration file. This directory must exist on the server where you are running wsadmin.

            **Note:** Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cellName is the name of the cell that the home page node belongs to. This argument is required. It is also case-sensitive, so type it with care. If you do not know the cell name, type the following command in the wsadmin command processor to determine it:

            print AdminControl.getCell\(\)

        For example:

        ```
        NewsCellConfig.checkOutConfig("d:/temp", "NewsServerNode01Cell")
        
        ```

        The command displays this message:

        ```
        News Cell Level configuration file successfully checked out.
        ```

4.  Open news-config.xml in a text editor.

5.  Locate the section containing the `mailin` element:

    ```
    	<!-- These settings control the Mail-In feature, which provides support
    for replying to certain notifications to add responses / comments. -->
    
    	<mailin enabled="true">
    	    <replyto enabled="true">
    	    
    	    	<!-- A special ReplyTo address is added to notifications where
    				 the user can reply to the notification to respond/comment.
    				 The domain may be a dedicated domain for connections bound
    				 mails. Or it could be existing domain, in which case a prefix
    				 of suffix should be provided also. -->
    
    	        <replytoAddressFormat>
    	            <domain>enterprise.com</domain>
    
    	            <!-- A prefix OR suffix (not both) may also be provided. 
    						This is necessary if an existing domain (with other 
    						email addresses) is being used.
    						There is a 28 character limit for the affix. -->
    
    	            <!--  
    	            	<affix type="suffix">\_lcreplyto</affix>
    					-->
    
    	        <affix type="prefix">lcreplyto\_</affix>
    	            
    	        </replytoAddressFormat>
    	    </replyto>
    	</mailin>
    ```

    -   Specify the `mailin.enabled` and `replyto.enabled` attributes as "true."
    -   Specify your email server domain in the `replytoAddressFormat.domain` element. The example shown is enterprise.com.
    -   If you use an existing, non-dedicated domain that contains other email addresses, specify either a suffix or prefix to be added to the domain in the address. The examples shown are \_lcreplyto and lcreplyto\_.
6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in the News repository* for information about how to save and apply your changes.


ReplyTo can be turned on or off by Connections users if the default setting <replyToEnabled\>true</replyToEnabled\> is specified in notification-config.xml. Refer to [Enabling email notifications](t_admin_common_enable_mail.md) for instructions on modifying notification-config.xml.

**Parent topic:**[Configuring Forums for email notification replies](../admin/c_admin_forums_notification_replies.md)

**Related information**  


[Configuring HCL Domino for email notification replies](../admin/t_admin_forums_notification_replies_domino.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Configuring Exchange for notification replies](../admin/c_admin_forums_notification_replies_exchange.md)

