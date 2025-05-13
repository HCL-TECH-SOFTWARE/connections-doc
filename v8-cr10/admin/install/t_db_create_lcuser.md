# Creating a dedicated DB2 user {#t_db_create_lcuser .task}

Create a dedicated IBM® DB2® database user named lcuser with restricted privileges.

Perform this task to create a DB2 database user, called lcuser, with a limited set of privileges. The scripts that are provided with HCL Connections grant the appropriate rights to lcuser and are written with the assumption that the user name is lcuser. Always use lowercase characters for this user name.

To create a dedicated DB2 database user named lcuser, complete the following steps:

-   Choose your operating system:

    -   Linux™
        -   Log into the DB2 server as the root user, and then type the following command to create a new user:

            ```
            useradd -g db2iadm1 lcuser
            echo "lcuser:password" | chpasswd
            ```

            where password is new password for the new user. You can specify a home directory other than the default by entering useradd -g db2iadm1 -m -d /db2home/lcuser lcuser.

    -   Windows 2016
        1.  Click **Start** \> **Control Panel** \> **User Accounts** \> **Manage another account** \> **Add a user account**.
        2.  Create the user account:
            1.  Enter lcuser for the name of the new account.
            2.  Enter a password for the account.
            3.  Enter the password again to confirm it.
            4.  Add a hint for the password \(required\).
            5.  Click **OK**.
        3.  Set the new account's type as administrator:
            1.  Click the newly created account to select it.
            2.  Click **Change the account type**.
            3.  Select **Administrator**.
            4.  Click the **Change the account type** button.
        4.  Right-click **Computer**, select **Manage** in the menu.
        5.  Select **System Tools** \> **Local Users and Groups** \> **Users**, right-click **lcuser**, and then select **Properties**.
        6.  In the pop-up window select **Member Of** tab, click **Add** and enter DB2USERS in the **Enter the object name to select** field.
        7.  Click**Check Names** and then click **OK**.
        8.  Click **OK** again to save your changes.

            **Note:** If the DB2USERS group is not found, extended security for DB2 on Windows™ might not be enabled. See the DB2 documentation for information about Extended Windows security using DB2ADMNS and DB2USERS groups.

    -   Windows 2012
        1.  Click **Start** \> **Control Panel** and select **User Account** \> **Add or Remove User Accounts** \> **Create a New Account**.
        2.  Enter lcuser for the name of the new account. The account type should be **administrator**.
        3.  Click the newly created account, click **Create a Password** to give a password to the new account.
        4.  Right-click **Computer**, select **Manage** in the menu.
        5.  Select **System Tools** \> **Local Users and Groups** \> **Users**, right-click **lcuser**, and then select **Properties**.
        6.  In the pop-up window select **Member Of** tab, click **Add** and enter DB2USERS in the **Enter the object name to select** field.
        7.  Click**Check Names** and then click **OK**.
        8.  Click **OK** again to save your changes.

            **Note:** If the DB2USERS group is not found, extended security for DB2 on Windows might not be enabled. See the DB2 documentation for information about Extended Windows security using DB2ADMNS and DB2USERS groups.


For more information about granting privileges to users, see the [Database administration section](https://www.ibm.com/docs/db2/11.1?topic=database-administration) in the IBM DB2 documentation.

**Parent topic:**[Creating DB2 databases](../install/c_inst_create_database_db2.md)

