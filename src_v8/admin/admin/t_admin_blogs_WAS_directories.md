# Changing the location of the Blogs File Upload directory {#t_admin_dogear_WAS_directories .task}

Change default directories for the File Upload directory from the IBM® websphere Application Server \(WAS\) administrator console.

By default, the File Upload directory is stored in the HCL Connections data directory under Blogs. This variable is stored in the WebSphere® Application Server variables. You can change the location of the file upload directory by updating the WebSphere Application Server variable.

To change the location, complete the following steps:

1.  Launch the WebSphere Application Server Integrated Solutions Console.

2.  Select **Environment** \> **WebSphere variables**.

3.  Select BLOGS\_CONTENT\_DIR from the list of WebSphere variables.

4.  Specify the directory on the server used for file uploads in the **Value** field and click **Apply**.

    This should be a shared drive when deployed in a cluster. For example, BLOGS\_CONTENT\_DIR = C:/IBM/Connections/Data/blogs/upload.

5.  Click **OK**.

6.  Restart the Blogs server for your changes to take effect.


If you change the location of the File Upload directory, make sure you copy any content from the default directory to the new location.

**Parent topic:**[Administering Blogs](../admin/c_administering_blogs.md)

