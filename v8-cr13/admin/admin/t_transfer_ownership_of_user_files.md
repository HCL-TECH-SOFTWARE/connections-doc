# Transferring ownership of user files {#t_transfer_ownership_of_user_files .task}

As an administrator, you can use a wsadmin command to transfer the ownership of multiple files belonging to an active or inactive user Connections Alternatively, you can use the Files app's user interface to transfer--one file at a time--an active user's files.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The wsadmin command to transfer user files must include the future owner's email address. The command can be used to transfer only the personal files of the original user , not community files.

In this procedure, let's say that a user asks you to transfer six of their files to a new owner. The requesting user provides you with the file names of the files to transfer and the email address of the new user, for example, ajones@renovations.com.

1.  Run this command to get the future owner's internal ID:

    ```
    FilesMemberService.getByEmail("ajones@renovations.com")
    ```

    **Note:** If you prefer, you can use the future owner's directory ID to find their internal ID. In this case, run `FilesMemberService.getByExtId` instead of the preceding command.

    The following example shows the properties that are returned by using getByEmail, including the ID for the new owner \(9b1683e7-ca4f-4ac1-85a1-c780fa1340b5\) that you will need in step 3.

    ```
    {
       directoryLastUpdate=Sun May 05 22:09:51 EDT 2019, 
       directoryGroupLastUpdate=Mon May 06 03:33:59 EDT 2019, 
       name=Amy Jones, 
       isOprhan=false, 
       lastVisit=Mon May 06 03:33:59 EDT 2019, 
       id=9b1683e7-ca4f-4ac1-85a1-c780fa1340b5, 
       email=ajones1@janet.iris.com, 
       createDate=Sun May 05 22:09:51 EDT 2019, 
       communityLastUpdate=Mon May 06 03:33:59 EDT 2019
    }
    ```

2.  In the file directory for the original user, prepare a text file that contains a list of IDs for one or more files to be transferred. \(To find a file's unique ID, look at the library feed of the user's files and correlate the file name to its ID.\) Place only one ID on each line as in the following example. Record the full directory path to use in step 3.

    ```
    c4bf0d78-fc95-4bba-9ad9-1f561829fadc
    6b605596-fdf1-4624-873e-b24219a0a685
    67b4e2a9-8cec-445d-a3fa-7ecab88c1320
    11ec4963-5905-48df-be40-a8e97ae7c8ac
    ffa1cd14-13d3-46f8-98cd-3728b8d0c805
    012c5942-fbc9-4d33-ba63-81746064923d
    ```

3.  Now, run the following command, which transfers the preceding files to the My Files directory of the new owner and assigns a tag to each file so that they all can be identified later:

    ```
    FilesLibraryService.transferPersonalFiles("filepath", "ownerUserId", "tag")
    ```

    where

    -   filepath is the full path to the text file that you created to identify the files to be transferred, for example, /home/user1/fileids.txt
    -   ownerUserId is future owner's ID that you found in step 1. This ID is an internal UUID assigned by the Files app in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000
    -   tag is a tag that you assign to the target file, for example, from-user1-to-user2.
4.  \(Optional\) Run the TagUpdateFrequency task to capture new tags in the tag cloud:

    ```
    FilesScheduler.forceTaskExecution("TagUpdateFrequency", "true")
    ```

    **Note:** If you skip this step, the new tag will be captured in the tag cloud after 1 day.

    **Alternative Option:** If the current owner is active, as administrator you can also use the user interface in the Files app to transfer files, *but only one file at a time*. Only the file owner can use the user interface to transfer multiple files at a time.

    To transfer an active owner's files one at a time:
    :   Log in as Connections administrator and navigate to the owner's profile. In the server URL you see the owner's internal user ID in Universally Unique Identifier \(UUID\) format, for example 8c266840-f6df-1032-9a85-d02a14283ea9.

    :   Go to the owner's My Files page and append /files/app\#/person/<owner uuid\> to that URL, for example https://www.example.com/files/app\#/person/8c266840-f6df-1032-9a85-d02a14283ea9

    :   From any Files view \(thumbnails, list, customized\), select a file to transfer, click **Transfer Ownership** in the action bar, and fill in the fields in the window that opens.

    :   Repeat the preceding step for each file.


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Disabling transfer of file ownership by users](files_t_disable_transfer_file_owner_by_users.md)

