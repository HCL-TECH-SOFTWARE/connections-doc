# Validating seedlists using the browser {#t_admin_search_check_seedlis .task}

Use your browser to verify that the Search seedlists for the applications in your deployment are working as expected. If you are seeing problems in the log file, accessing the seedlist in the browser can help to narrow down the root cause of the problems.

By viewing the seedlist using your browser, you can check that a specified HCL Connections™ application is running and that the seedlist generation is working correctly. You can also verify that the correct credentials in IBM® WebSphere® Application Server are set.

1.  To verify that the seedlist for a specific application is working correctly, complete the following steps.
2.  Open a browser window and enter a web address:

    -   CCM seedlist URL: http://<hostname\>:<web\_port\>/dm/atom/seedlist/myserver
    -   The other features use the context root from the LotusConnections\_config.xml and the following syntax: http://<hostname\>:<web\_port\>/featurename/myserver
    The seedlists are hosted on the same server as the relevant application.

    For example: https://filenet-server:9443/FileNet/AutomaticUpgradeStatus

3.  Enter the user name and password that is configured for the connectionsAdmin J2C alias, and then click **OK**.


When the seedlist for the specified application is working correctly and you have entered valid credentials, an XML page containing information about the seedlist is displayed. If an XML page is not returned, review the log file from the relevant application to determine the problem. For example, if you are verifying the seedlist for Profiles, you need to review the log file from the Profiles application.

**Parent topic:**[Validating Search seedlists](../troubleshoot/c_admin_search_validating_seedlists.md)

**Related information**  


[Validating seedlists using the wsadmin client](../troubleshoot/t_admin_search_validate_seedlist.md)

