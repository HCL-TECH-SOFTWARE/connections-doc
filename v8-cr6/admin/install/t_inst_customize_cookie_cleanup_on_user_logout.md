# Customizing browser cookie cleanup on user logout {#t_inst_customize_cookie_cleanup_on_user_logout .task}

You can manage and add to the list of browser cookies to be cleaned up on user logout.

The list of cookies to be cleaned up on user logout is managed in Lotusconnections-config.xml. If the existing session cookie is renamed from JSESSIONID, it also will need to be updated in the Lotusconnections-config.xml file.

1.  Check out the Lotusconnections-config.xml file as described in [Changing common configuration property values](../admin/t_admin_common_changing_config.md).

2.  Locate the `<sessionCookies>` section in Lotusconnections-config.xml.

    ```
    <sessionCookies>
     <cookieName key="JSESSIONID" />
     </sessionCookies>
    ```

3.  You can add cookies that require cleanup at user logout, for example:

    ```
    <sessionCookies>
     <cookieName key="JSESSIONID" />
     <cookieName key="**myCookie1**" />
     <cookieName key="**myCookie2**" />
     </sessionCookies>
    ```

4.  Be sure to save your updates to Lotusconnections-config.xml.


**Parent topic:**[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

