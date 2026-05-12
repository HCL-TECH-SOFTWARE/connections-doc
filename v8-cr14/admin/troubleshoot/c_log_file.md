# HCL Connections log file {#c_log_file .concept}

HCL Connections™ writes messages to the SystemOut.log file. Refer to this file if you encounter errors after installing an Connections application or if you encounter unexpected behavior in an application.

The **SystemOut.log** file is stored in the following directory:

-   Linux™:

    ```
    /opt/IBM/WebSphere/AppServer/profiles/<profile_name>/logs/<server_name>
    ```

-   Microsoft™ Windows™:

    ```
    C:\IBM\WebSphere\AppServer\profiles\<profile_name>\logs\<server_name>
    ```


Messages written to the log use the following syntax:

```
 <Application prefix><Error code><Message level code>
```

where:

-   **Application prefix**: Identifies the application that wrote the message. The following prefixes are used to identify Connections applications and components:

    |Connections application or component|Prefix|
    |------------------------------------|------|
    |Activities**Note:** The Quartz Scheduler, a component of Activities does not use the Activities prefix, but its messages do include the string org.quartz.

|CLFRA|
    |Blogs|CLFRS|
    |Bookmarks|CLFRL|
    |Common directory services integration service|CLFRK|
    |Communities|CLFRM|
    |Files|EJPVJ|
    |Forums|CLFRV|
    |Home page|CLFRQ|
    |Installer|CLFRP|
    |Connections Configuration|CLFRO|
    |Notifications|CLFRR|
    |Connections Multi-Service Portlet|CLFNF|
    |Federated Search|CLFRT|
    |News Service|CLFWX|
    |Event Service|CLFWY|
    |Widget Services|CLFWZ|
    |Profiles|CLFRN|
    |Search|CLFRW|
    |User life cycle|CLFWY|
    |WebSphere® Portal infrastructure|EJPIC|
    |Wikis|EJPVJ|

-   **Error code**: A 4-digit code assigned to the error message to identify it. Code numbers make it easier to search for information about the message. See [Error messages](c_error_codes.md) to see a list of the error codes and what they mean.
-   **Message level code**: Identifies the level of the message written to the log. The following levels are supported:

    |Message level code|Message level|
    |------------------|-------------|
    |I|INFO|
    |E|ERROR|
    |A|AUDIT|
    |W|WARN|


For example:

```
CLFRA0299I
```

CLFRA identifies the message as coming from the Activities application; 0299 is the error code; I indicates that the message is an Info level message.

**Parent topic:** [Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

