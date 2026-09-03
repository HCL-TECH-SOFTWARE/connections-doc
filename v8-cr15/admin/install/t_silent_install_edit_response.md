# Using the default response file {#editingthedefaultresponsefile .task}

Use the default response file to specify silent installation parameters for your environment.

Encrypt your administrator passwords. For more information about encrypting passwords, see the [Creating encrypted passwords for a response file](t_silent_create_encrypted_passwords.md) topic.

Silent installation uses the parameters in a response file to install the same HCL Connections profile on multiple computers.

If you are silently installing HCL Connections as a non-root user in an Linux™ environment, you must specify that parameter in the silent-install.ini file.

1.  Navigate to the [*connections\_root*](../plan/i_ovr_r_directory_conventions.md) directory and open the LC.rsp response file.

2.  Specify your installation parameters. For more information, see the [The default response file](r_installresponse_file.md) topic.

3.  Add the encrypted passwords to the relevant elements of the response file. The following example shows the elements for the Activities passwords:

    ```
    <data key='user.activities.adminuser.password' value='encrypted\_password'/>
    ```

    ```
    <data key='user.activities.dbUserPassword value='encrypted\_password'/>
    ```

    where encrypted\_password is the password after you encrypted it.

4.  Change the default WebSphere® Application Server administrator name from wasadmin if your administrator name is different.

5.  Save your changes.

6.  If you are performing the silent installation as a non-root user on Linux systems, complete the following steps:

    1.  Open the silent-install.ini file for editing from the following location:

        -   Linux: HCL\_Connections\_set-up/HCL\_Connections\_Install/IM/linux/silent-install.ini
        -   Linux on System z®: HCL\_Connections\_set-up/HCL\_Connections\_Install\_s390/IM/zlinux/silent-install.ini
        where HCL\_Connections\_set-up is the HCL Connections set-up directory or installation media.

    2.  In the second line of the file, change admin to nonadmin.

    3.  Save and close the file.


**Parent topic:**[The default response file](../install/r_installresponse_file.md)

