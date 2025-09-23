# Preventing members from creating specific community types {#t_admin_communities_prevent_user_deletion .task}

You can prevent community members from creating specific community types on a deployment-wide basis.

To update configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Disabling the ability to create specific community types means that community members can no longer create certain types of community. Instead, only community owners or administrators can create those types of community.

To prevent community members from creating a community, complete the following steps:

1.  Start the wsadmin client by completing the following steps:

    1.  Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin

        app\_server\_root/profiles/dm\_profile\_root/bin. Where app\_server\_root represents the IBM WebSphere Application Server installation directory, for example:

        ```
        Linux:
        /opt/IBM/WebSphere/AppServer
        
        ```

        ```
        Windows:
        drive:\Program Files\IBM\WebSphere\AppServer
        
        ```

        Where drive is the system drive on which the file directory is stored. For example: C: or D:.

        where dm\_profile\_root is the Deployment Manager profile directory; this directory is usually called dmgr01. For example, on Windows, the directory is C:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin.

        !!! attention 
            
            You must run the command to start the wsadmin client from this specific directory because the Jython files for the product are stored there. If you start the client from a different directory, the execfile\(\) command does not work correctly.

    2.  Enter the following command to start the wsadmin client:

        -   Linux: ./wsadmin.sh -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        -   Microsoft Windows: wsadmin -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        where:

        -   admin\_user\_id is the user name of the Administrator role on IBM WebSphere® Application Server. This administrator must be configured at the cell level, not at the cluster, node, or server level.
        -   admin\_password is the password of the WebSphere Application Server administrator.
        -   SOAP\_CONNECTOR\_ADDRESS\_PORT is the SOAP port for the WebSphere Application Server deployment manager server. The default value of the SOAP port is 8879. If you are using the default port value, you do not have to specify this parameter. If you are not using the default value and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, complete the following steps:
            1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.
            2.  In the Additional properties section expand **Ports**, and then look for the SOAP\_CONNECTOR\_ADDRESS port entry to find the port number.
        For example:

        -   Linux: ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
        -   Microsoft Windows: wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879
2.  Access and check out the Communities configuration files:

    1.  Use the following command to access the Communities configuration files:

        ```
        execfile("communitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Communities configuration files using the following command:

        ```
        CommunitiesConfigService.checkOutPolicyConfig("working\_directory",
           "cell\_name")
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            !!! note
                
                Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            ```
            print AdminControl.getCell()
            ```

        For example:

        ```
        CommunitiesConfigService.checkOutPolicyConfig("/opt/my_temp_dir",
        "CommServerNode01Cell")
        ```

3.  From the temporary directory to which you just checked out the HCL Connections configuration files, open the communities-policy.xml file in a text editor.

4.  **(Optional)** Enable or disable one or more of the following permissions that corresponds to the community type that a user is allowed to create by setting the value for each community type to either ***True*** or ***False***
 
    If enabled, the admin 
    The sample configuration below shows that a user can only create Public to My Organization and Moderated community types.

5. Comment out one or more of the following permissions corresponding to the community types that users cannot create.

    ```
    <comm:permission 
        class="com.ibm.tango.auth.permission.CommunityManagementPermission"
        communityType="public" action="create" />
    <comm:permission 
        class="com.ibm.tango.auth.permission.CommunityManagementPermission"
        communityType="publicInviteOnly" action="create" />
    <comm:permission 
        class="com.ibm.tango.auth.permission.CommunityManagementPermission"
        communityType="private" action="create" />
    ```

6.  Save your changes to the communities-policy.xml file.

7.  Check in the updated file, enter the following wsadmin client command:

    ```
    CommunitiesConfigService.checkInPolicyConfig("<working\_directory\>",
    "<cell\_name\>")
    ```

8.  To exit the wsadmin client, type exit at the prompt.

9.  Stop and restart the server that hosts the Communities application.

Users are now prevented from creating specific community types

## Using AppReg for TE-enabled environments

Alternatively, if Tailor Experience (TE) is enabled, use AppReg to configure community creation restrictions:

1. Log in as a Connections Administrator and go to `https://<server_name>/appreg`
2. Add or update the following JSON configuration for `CommunityType`:

    ```json
    {
     "name": "te-creation-wizard",
     "title": "te-creation-wizard",
     "description": "Configuration for Community Creation Wizard",
     "services": ["Connections"],
     "extensions": [{
       "name": "te-creation-wizard",
       "type": "com.hcl.social.apps.tecw.config",
       "payload": {
         "communityType": {
           "public": true,
           "publicInviteOnly": true,
           "private": false
         }
       }
     }]
    }
    ```

3. Save your changes.

!!! note

    Use lowercase `true`/`false` in JSON.


**Parent topic:** [Managing default owner and member permissions](../admin/c_admin_communities_managing_default_permissions.md)

