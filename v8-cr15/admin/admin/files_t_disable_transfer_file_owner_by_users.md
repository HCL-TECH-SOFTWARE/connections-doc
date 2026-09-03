# Disabling transfer of file ownership by users {#files_t_disable_transfer_file_owner_by_users .task}

By default, users who own files can transfer a file to a new owner by choosing the **Transfer Ownership** command from their file's preview page or from one of the list views in their Files app. Follow this procedure if you prefer to hide this option from users.

!!! note 
    
    The following steps disable the feature only in the user's Files application interface. Administrators and users can still transfer the ownership of files through the API.

1.  Modify `LotusConnections-config.xml` (in the DMGR folder) by editing the following generic property, changing true to false:

    ```xml
    <genericProperty name="files.ownership.transfer.enabled">false</genericProperty>
    ```

2.  Synchronize the nodes.

    !!! note 
        
        If, as the administrator, you want to transfer a user's files in bulk, see the topic [Transferring ownership of user files](t_transfer_ownership_of_user_files.md).


**Parent topic:** [Administering Files](../admin/c_admin_files_overview.md)

