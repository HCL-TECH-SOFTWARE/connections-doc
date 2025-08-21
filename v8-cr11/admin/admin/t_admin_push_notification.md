# Administering Push Notification {#t_admin_enabling_file_sync .task}

With push technology the file sync feature scales to multiple clients and the clients can update their content faster when changes are made on the server.

Some features of HCL Connections such as filesync can be enhanced by using push technology for communicating with the server. File sync clients such as the desktop plug-in can work with or without Push Notifications. Once Push Notification is configured, the clients detect the availability of the push service automatically.

The push service is configured with the file LCC/pushnotification-config.xml

1.  **Change the message expiration time:**

    -   The push notification service is backed by a DB2 database that requires notifications expire after 720 hours \(30 days\).
2.  **Change the default long-poll duration:**

    -   The default duration of long polls is 100 seconds \(100,000ms\). This long-poll duration should be as long as possible, but it must stay below the timeout imposed by the network \(such as proxies and switches\).

        See also [Enabling Files for Sync](t_admin_enabling_file_sync.md#)


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

