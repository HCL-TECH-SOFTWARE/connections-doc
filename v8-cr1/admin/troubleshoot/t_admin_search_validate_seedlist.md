# Validating seedlists using the wsadmin client {#t_admin_search_validate_seedlist .task}

If you experience issues when indexing, use the SearchService.validateSeedlist command to validate the seedlist and help you to isolate the problem.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The SearchService.validateSeedlist command allows you to validate a specified application, which can help you to identify problems when indexing. When you run this command, the Search application retrieves the seedlist for the specified application. If the command runs successfully, it then iterates through the full seedlist, parsing the XML of all the entries in the seedlist. If an error is encountered, the command returns a string indicating that the validation has failed. Otherwise, the command returns a string indicating that the validation has succeeded.

1.  To validate the seedlist for a specified application, complete the following steps:
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4.  Use the following command to validate the seedlist for a specified application:

    |Command|Description|
    |-------|-----------|
    |SearchService.validateSeedlist\(String component\)|Validates the seedlist for the specified application.This command takes a string value, which is the name of the application whose seedlist is to be validated. The following values are valid: activities, blogs, communities, dogear, files, forums, profiles, and wikis. <br> For example: <br> ```SearchService.validateSeedlist("communities")```|


When the seedlist for the specified application is working correctly, the following message is returned in the terminal window:

```
CLFRW0262I: Seedlist validation successful.
```

If the following message is returned, review the log file from the relevant application to determine the problem:

```
CLFRW0263I: Seedlist validation failed. Refer to the log for details.
```

For example, if you are verifying the seedlist for Profiles, you need to review the log file from the Profiles application.

**Parent topic:**[Validating Search seedlists](../troubleshoot/c_admin_search_validating_seedlists.md)

**Related information**  


[Validating seedlists using the browser](../troubleshoot/t_admin_search_check_seedlist.md)

