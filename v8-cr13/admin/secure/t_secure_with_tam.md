# Enabling single sign-on for Security Verify Access {#t_secure_with_tam .concept}

Configure HCL Connections™ to use single sign-on with Security Verify Access (formerly Security Access Manager).

## Before you begin

Install the [supported version](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0085090#security) of IBM Security Verify Access (ISVA).

Ensure that you can access the installed Connections applications from a web browser.

Set the IBM® WebSphere® Application Server single sign-on domain to the same value as that of the Secure Access Manager server.

!!! note

    -   Connections supports the WebSphere cookie-based lightweight third-party authentication \(LTPA\) mechanism as an SSO solution for ISVA. Connections does not support other SSO solutions that WebSEAL supports such as WebSphere Trust Association Interceptor \(TAI\), Forms SSO, Cross-domain SSO, or E-community SSO.
    -   For more information, refer to [IBM Security Verify Access](https://www.ibm.com/docs/en/sva/9.0.1) on the IBM Documentation site.

## About this task

Single sign-on \(SSO\) enables users to log in to one application of Connections and switch to other applications and resources without having to authenticate again.

Connections supports the use of encrypted connections Transparent Path junctions with ISVA. Connections does not support TCP type junctions or Standard junctions. This procedure uses a WebSphere Application Server LTPA key and WebSEAL Transparent Junctions.

To set up SSO using Security Verify Access, complete the following steps:

## Procedure

1.  Use available authentication data when an unprotected URI is accessed: On the **Global security** page, expand **Web and SIP security**, and then click **General settings**. Click **Authenticate only when the URI is protected** and select **Use available authentication data when an unprotected URI is accessed**, if it is not already selected. Click **Apply** and then click **OK**.

2.  Import your HTTP Server certificate into the Security Verify Access keystore. To import the certificate, complete the following steps:
    1.  In Security Verify Access, click **Manage** \> **Secure Settings** \> **SSL Certificates** and select the **pdsrv database**.

    2.  With the **pdsrv database** selected, click on **Manage** and select **Edit SSL Certificate Database**.

    3.  In the **Signer Certificate**, select **Manage** and then select one of the following two options:

        -   If you select Import, you will be prompted to browse for the certificate file from your local drive.
        -   If you select Load, you can specify the HTTP hostname, port, and certificate label and import them remotely.
    
    4.  After you add the certificate to the database, it displays in the certificate list.

    5.  Click the link **Click here to review the changes or apply them to the system**; restart Security Verify Access components when prompted.

        !!! note 
            
            If you have already imported other HTTP Server certificates into the WebSEAL certificate file, you must delete them before you can add a certificate.

3.  To support SSO with the Lightweight Third-Party Authentication \(LTPA\) key, the same keys and passwords must be shared by Security Verify Access and WebSphere Application Server. To export the keys from WebSphere Application Server, complete the following steps:
    1.  Log in to the WebSphere Application Server Integrated Solutions Console as an administrator, expand **Security**, and then click **Global security**. In the **Authentication mechanisms and expiration** area, click **LTPA**.

    2.  In the Cross-cell single sign-on section, provide values for the following fields:

        -   **Password**: Enter a secure password and then confirm the password. You need to provide this password later.
        -   **Fully qualified key file name**: Specify a valid path and a file name for the file that holds the exported keys.
        
        For example:

        ```p\*ssw\*rd```

        ```C:\\WAS\_ltpa.keys```

    3.  Click **Export keys**.

    !!! note 
        
        If you have modified your federated repository properties, such as the realm name of the federated repository, re-export your LTPA keys and copy them to the Security Verify Access server, to the same location that you used to create the Security Verify Access junctions. See [Step 4](t_secure_with_tam.md#StepUseTheExportedLTPAKeyToCo...) for more details.

4.  Use the exported LTPA key to configure the transparent path junctions in Security Verify Access.
    1.  Copy the file containing the LTPA keys that you exported in [Step 3](t_secure_with_tam.md#StepToSupportSSOWithTheLightwe...) to the Security Verify Access server.

    2.  In Security Verify Access, click **Secure Web Settings** \> **Global Keys** \> **LTPA Keys**.

    3.  In the LTPA Key Files area, click **Manage** \> **Import**

    4.  Click **Browse** and select the exported LTPA key.

    5.  Click **Import**.

    6.  Click the link **Click here to review the changes or apply them to the system**; restart Security Verify Access components when prompted.

    7.  Open the pdadmin command line utility, which is installed as part of the Security Verify Access runtime package.

    8.  Configure a transparent path junction for each installed application. Enter the following command once for each junction:

        !!! note 
            
            Do not include the carriage returns in the command. They are added here for display purposes.

        ```server task WebSEAL-instance-name create -t ssl```

        ```-h backend-server-name -x -p backend-server-port -i -b ignore -f -A -2```

        ```-F ltpa-token -Z ltpa-password -k transparent-path-jct```

        Where:

        -   `WebSEAL-instance-name` is the name of the WebSEAL server. Use the following syntax:

            `WebSEAL\_instance-webseald-tam\_server`

            For example: `default-webseald-server.name.example.com`

        -   `backend-server-name` is the host name of the Connections server for which Security Verify Access is managing authentication. For example, HTTP Server configured for Connections.
        -   `backend-server-port` is the port used by the backend server.
        -   `ltpa-token` is the name of the file that you created to store the keys that you exported from WebSphere Application Server.
        -   `ltpa-password` is the password that you defined to encrypt the key file.
        -   `transparent-path-jct` is the transparent path junction for the application. This value must match the URL pattern and must be created once for each URL pattern:
            -   /acce
            -   /activities
            -   /appregistry
            -   /appreg
            -   /blogs
            -   /communities
            -   /community-suggestions
            -   /connections
            -   /dm
            -   /dogear
            -   /files
            -   /forums
            -   /help
            -   /homepage
            -   /itm
            -   /metrics
            -   /metricssc
            -   /mobile
            -   /mobileAdmin
            -   /moderation
            -   /news
            -   /oauth2
            -   /profiles
            -   /push
            -   /search
            -   /selfservice
            -   /social
            -   /socialsidebar
            -   /touchpoint
            -   /wikis
            -   /wsi
            -   /xcc
        
        For example:

        `server task default-webseald-server.name.example.com create -t ssl -h another.server.name.example.com -x -p 443 -i -b ignore -f -A -2 -F -k C:\\WAS7\_ltpa.keys -Z password /profiles`

        !!! note

            -   If an invalid certificate error occurs, import your backend-server-name certificate into the WebSEAL certificate store before you create the junctions. Verify that you completed [Step 2](#importihscertificate) correctly and the SSL certificate is being imported to the correct key file.
            -   The transparent path junctions include /help even though it is not an independent Connections application. It is a part of the News application but must be configured as a separate junction.
    
    For more information about using the pdadmin command line utility, refer to [Server task commands for junctions](https://www.ibm.com/docs/en/sva/9.0.1?topic=reference-pdadmin-commands) in the Security Verify Access knowledge center.

5.  Create a default Connections ACL to override the default WebSEAL ACL by running the following commands:
    ```
    acl create lc3-default-acl

    acl modify lc3-default-acl set user sec\_master TcmdbsvaBRlrx

    acl modify lc3-default-acl set any-other Tmdrx

    acl modify lc3-default-acl set unauthenticated T

    acl modify lc3-default-acl set group iv-admin TcmdbsvaBRrxl

    acl modify lc3-default-acl set group webseal-servers Tgmdbsrxl
    ```

6.  Attach default ACLs to resources that are protected by form-authentication.

    1.  Attach the default ACL to application root URLs:
        
        ```
        acl attach /WebSEAL/isam\_server-WebSEAL\_instance/app\_root lc3-default-acl
        ```

        where:

        -   `isam\_server` is the host name of the Security Verify Access server
        -   `WebSEAL\_instance` is the name of the instance of the WebSEAL server that is configured to manage Connections; for example: default
        -   `app\_root` is the root path to the Connections applications, including the following:
            -   /activities
            -   /blogs
            -   /communities
            -   /dogear
            -   /files
            -   /forums
            -   /homepage
            -   /news
            -   /metrics
            -   /metricssc
            -   /mobile
            -   /mobileAdmin
            -   /moderation
            -   /profiles
            -   /push
            -   /search
            -   /selfservice
            -   /socialsidebar
            -   /touchpoint
            -   /wikis
            -   /xcc
        -   `lc3-default-acl` is the access control list \(ACL\) that you defined in [Step 5](t_secure_with_tam.md#CreateADefaultLotusConnectionsACLT)
        For example: acl attach /WebSEAL/tam.example.com-default/activities example-default-acl

    2.  Attach the default ACL to other resources that are protected by form-authentication. Run the following commands:
    
        ```
        acl attach /WebSEAL/isam\_server-WebSEAL\_instance/object-path lc3-default-acl
        ```

        where:

        -   `isam\_server`   is the host name of the Security Verify Access server
        -   `WebSEAL\_instance` is the name of the instance of the WebSEAL server that is configured to manage Connections; for example: default
        -   `object-path` is the path to the resource on that domain
        -   `lc3-default-acl` is the access control list that you defined in [Step 5.](t_secure_with_tam.md#CreateADefaultLotusConnectionsACLT) Replace this variable with the name of your default ACL.
        For example: acl attach /WebSEAL/tam.example.com-default/activities/service/getnonce/forms example-default-acl

        See the [Resources that require form-authentication](t_secure_with_tam.md#ResourcesThatDoNotRequireA...) table for a list of URLs that are protected by form-authentication.

        |Application|Protected URL|
        |-----------|-------------|
        |Activities|/activities/seedlist/myserver|
        ||/activities/service/atom2/communityEvent|
        ||/activities/service/atom2/forms|
        ||/activities/service/download/forms|
        ||/activities/service/getnonce/forms|
        |Blogs|/blogs/seedlist/myserver|
        |Bookmarks|/dogear/seedlist/myserver|
        ||/dogear/api\_fba/app|
        |Common resources|/connections/config|
        ||/connections/settings/globalization/service|
        ||/connections/opensocial/rest|
        |Communities|/communities/calendar/seedlist/myserver|
        ||/communities/forum/service/atom/forms|
        ||/communities/recomm/ajax|
        ||/communities/recomm/atom\_form|
        |Engagement Center|/xcc|
        |Forums|/forums/atom/forms|
        ||/forums/seedlist/myserver|
        |Invite|/selfservice|
        |Profiles|/profiles/atom/forms|
        ||/profiles/atom2/forms|
        |URL Preview|/connections/opengraph/form/api/oembed|
        ||/connections/thumbnail/form/api/imageProxy|
        |Sidebar|/socialsidebar|
        |Touchpoint|/touchpoint|

7.  Define the unprotected access control list and then attach unprotected resources and resources where Connections requires basic authentication using the pdadmin command line utility, so that Security Verify Access passes HTTP requests for these resources through to WebSphere Application Server for authentication.

    1.  To define the unprotected access control list, enter the following commands:

        ```
        acl create ic-bypass-acl

        acl modify ic-bypass-acl set user sec\_master TcmdbsvaBRlrx

        acl modify ic-bypass-acl set any-other Tmdrx

        acl modify ic-bypass-acl set unauthenticated Tmdrx

        acl modify ic-bypass-acl set group iv-admin TcmdbsvaBRrxl

        acl modify ic-bypass-acl set group webseal-servers Tgmdbsrxl
        ```

        where `ic-bypass-acl` is the name of the unprotected access control list; for example, connections-acl-bypass.

        !!! note 
            
            The `any-other` parameter refers to authenticated users who are not defined by other parameters such as `sec_master` or `iv-admin`.

    2.  To attach the access control list to resources that do not require authentication, run the following command:
    
        ```
        acl attach /WebSEAL/isam\_server-WebSEAL\_instance/object-path ic-bypass-acl
        ```
        where:

        -   `isam\_server` is the host name of the Security Verify Access server
        -   `WebSEAL\_instance` is the name of the instance of the WebSEAL server that is configured to manage Connections; for example: default
        -   `object-path` is the path to the resource on that domain
        -   `ic-bypass-acl` is the access control list that you defined in [Step 7 a](t_secure_with_tam.md#ToDefineTheAccessControlListEnterT)
        See the [Resources that do not require authentication](t_secure_with_tam.md#ResourcesThatDoNotRequireA...) table for a list of unprotected URLs .

        |Application|Unprotected URL|
        |-----------|---------------|
        |Activities|/activities/auth|
        ||/activities/authverify|
        ||/activities\_content|
        ||/activities/images|
        ||/activities/service/html/mainpage|
        ||/activities/oauth|
        ||/activities/service/html/images|
        ||/activities/service/html/servermetrics|
        ||/activities/service/html/serverstats|
        ||/activities/static|
        ||/activities/service/html/styles|
        ||/activities/service/html/themes|
        ||/activities/serviceconfigs|
        |Blogs|/blogs/static|
        ||/blogs/oauth|
        ||/blogs/serviceconfigs|
        |Bookmarks|/dogear/bookmarklet/tagslike/proxy|
        ||/dogear/oauth|
        ||/dogear/peoplelike|
        ||/dogear/serviceconfigs|
        ||/dogear/static|
        ||/dogear/tagslike|
        ||/dogear/tagrecs|
        |Common resources|/connections/bookmarklet/tools/blet.js|
        ||/connections/bookmarklet/tools/discussThis.js|
        ||/connections/bookmarklet/tools/rlet.js|
        ||/connections/core/oauth|
        ||/connections/oauth|
        ||/connections/opensocial/oauth|
        ||/connections/resources/socmail-client|
        ||/connections/resources/ic|
        ||/connections/resources/web|
        ||/connections/resources/socpim|
        ||/connections/rte|
        ||/connections/serviceconfigs|
        ||/nav/common|
        |Communities|/communities/calendar/calendar.xml|
        ||/communities/calendar/oauth|
        ||/communities/images|
        ||/communities/recomm/oauth|
        ||/communities/recomm/recomm.xml|
        ||/communities/service/atom/oauth|
        ||/communities/service/html/communityview|
        ||/communities/service/json/oauth/|
        ||/communities/service/opensocial/oauth|
        ||/communities/serviceconfigs|
        ||/communities/service/html/community/autoCompleteMembers.do|
        ||/communities/service/html/singleas|
        ||/communities/static|
        ||/communities/stylesheet|
        ||/communities/tools/embedAS.html|
        |Content Manager|/wsi|
        ||/acce|
        ||/dm|
        |Engagement Center|/xcc/templates|
        ||/xcc/js|
        |Files|/files/app|
        ||/files/basic/anonymous/api|
        ||/files/basic/anonymous/cmis|
        ||/files/basic/anonymous/opensocial|
        ||/files\_content|
        ||/downloadfiles|
        ||/files/form/anonymous/api|
        ||/files/form/anonymous/cmis|
        ||/files/form/anonymous/opensocial|
        ||/files/oauth|
        ||/files/static|
        ||/files/serviceconfigs|
        |Forums|/forums/oauth|
        ||/forums/serviceconfigs|
        ||/forums/static|
        |Home page|/homepage/oauth|
        ||/homepage/search|
        ||/homepage/serviceconfigs|
        ||/homepage/static|
        |Libraries|/library\_content\_cache|
        |Moderation|/moderation/oauth|
        |Mobile|/mobile/homepage/SecurityConfiguration|
        ||/mobile\_content|
        |News|/help|
        ||/news/common/sand/static/|
        ||/news/follow/oauth|
        ||/news/microblogging/isPermitted.action|
        ||/news/oauth|
        ||/news/serviceconfigs|
        ||/news/sharebox/config.action|
        ||/news/static|
        |OAuth Provider|/oauth2|
        |Profiles|/profiles/images|
        ||/profiles/oauth|
        ||/profiles/serviceconfigs|
        ||/profiles/static|
        ||/profiles/widget-catalog|
        |Push|/push/basic/comet|
        ||/push/form/comet|
        |Search|/search/atom/search/\*|
        ||/search/oauth|
        ||/search/static|
        ||/search/serviceconfigs|
        |URL Preview|/connections/opengraph/form/anonymous/api/oembed|
        ||/connections/opengraph/basic/anonymous/api/oembed|
        ||/connections/opengraph/oauth/anonymous/api/oembed|
        ||/connections/thumbnail/api/imageProxy|
        |Widget container|/connections/opensocial/anonymous/rest|
        ||/connections/opensocial/common|
        ||/connections/opensocial/gadgets|
        ||/connections/opensocial/ic|
        ||/connections/opensocial/rpc|
        ||/connections/opensocial/social|
        ||/connections/opensocial/xrds|
        ||/connections/opensocial/xpc|
        |Wikis|/wikis/basic/anonymous/api|
        ||/wikis\_content|
        ||/wikis/form/anonymous/api|
        ||/wikis/oauth|
        ||/wikis/serviceconfigs|
        ||/wikis/static|

    3.  The Atom feeds on Connections servers use basic authentication because most feed readers are unable to authenticate with form-authentication. WebSphere Application Server and Connections applications authenticate these Atom HTTP requests through basic authentication as required. To attach the unprotected ACL to resources that Connections protects with basic authentication, run the following command:

        ```acl attach /WebSEAL/isam\_server-WebSEAL\_instance/object-pathic-bypass-acl```

        where:

        -   `isam\_server` is the host name of the Security Verify Access server
        -   `WebSEAL\_instance` is the name of the instance of the WebSEAL server that is configured to manage Connections; for example: default
        -   `object-path` is the path to the resource on that domain
        -   `ic-bypass-acl` is the access control list that you defined in [Step 7 a](t_secure_with_tam.md#ToDefineTheAccessControlListEnterT)
        
        For example: acl attach /WebSEAL/example.com-default/activities/service/atom example-bypass-acl

        See the [Resources that require basic authentication](t_secure_with_tam.md#ResourcesThatRequireBasicAu...) table for a list of protected URLs .

        | Application       | Protected URL                                                                 |
        |-------------------|--------------------------------------------------------------------------------|
        | Activities         | /activities/follow/atom<br>/activities/service/atom<br>/activities/service/atom2<br>/activities/service/download<br>/activities/service/getnonce<br>/activities/service/html/autocompleteactivityname<br>/activities/service/html/autocompleteentryname<br>/activities/service/html/autocompletemembers |
        | App Registry       | /appregistry                                                                   |
        | Blogs              | /blogs/api<br>/blogs/atom<br>/blogs/follow/atom<br>/blogs/issuecategories<br>/blogs/roller-ui/blog<br>/blogs/roller-ui/feed<br>/blogs/roller-ui/BlogsWidgetEventHandler.do<br>/blogs/roller-ui/rendering/api<br>/blogs/roller-ui/rendering/feed<br>/blogs/services/atom |
        | Bookmarks          | /dogear/api/app<br>/dogear/api/deleted<br>/dogear/api/notify<br>/dogear/atom<br>/dogear/people.do |
        | Common resources   | /connections/opensocial/basic/rest                                             |
        | Communities        | /communities/calendar/atom<br>/communities/calendar/handleevent<br>/communities/calendar/ical<br>/communities/community-suggestions<br>/communities/follow/atom<br>/communities/forum/service/atom<br>/communities/recomm/atom<br>/communities/recomm/handleevent<br>/communities/service/atom<br>/communities/service/atom/communities/my<br>/communities/service/json<br>/communities/service/opensocial |
        | Files              | /files/basic/api<br>/files/basic/api/myuserlibrary/feed<br>/files/basic/cmis<br>/files/basic/opensocial<br>/files/follow/atom |
        | Forums             | /forums/atom<br>/forums/follow/atom                                            |
        | Home page          | /homepage/atom/mysearch<br>/homepage/atom/search<br>/homepage/web/updates/     |
        | News               | /news/atom/service<br>/news/atom/stories/community<br>/news/atom/stories/newsfeed<br>/news/atom/stories/public<br>/news/atom/stories/save<br>/news/atom/stories/saved<br>/news/atom/stories/statusupdates<br>/news/atom/stories/top<br>/news/atom/watchlist<br>/news/atomfba/stories/public |
        | Orient Me          | /community-suggestions                                                          |
        | Profiles           | /profiles/atom<br>/profiles/atom2<br>/profiles/atom/forms/tagCloud.do<br>/profiles/follow/atom<br>/profiles/admin/atom<br>/profiles/photo.do<br>/profiles/json<br>/profiles/audio.do<br>/profiles/vcard |
        | URL Preview        | /connections/opengraph/basic/api/oembed<br>/connections/thumbnail/basic/api/imageProxy |
        | Wikis              | /wikis/basic/api<br>/wikis/follow/atom                                          |

        !!! note
            
            If you use case-insensitive junctions in your Security Verify Access configuration, specify `tagcloud.do` (lowercase 'c') instead of `tagCloud.do`.

        

        <!--
        <table>
        <tr>
        <th><b>Application</th>
        <th><b>Protected URL</th>
        </tr>
        <tr>
        <td>Activities</td>
        <td>/activities/follow/atom <br>
        /activities/service/atom <br> 
        /activities/service/atom2 <br> 
        /activities/service/download <br> 
        /activities/service/getnonce <br> 
        /activities/service/html/autocompleteactivityname <br> 
        /activities/service/html/autocompleteentryname <br> 
        /activities/service/html/autocompletemembers</td>
        </tr>
        <tr>
        <td>App Registry</td>
        <td>/appregistry</td>
        </tr>
        <tr>
        <td>Blogs</td>
        <td>/blogs/api <br> 
        /blogs/atom <br> 
        /blogs/follow/atom <br> 
        /blogs/issuecategories <br> 
        /blogs/roller-ui/blog <br> 
        /blogs/roller-ui/feed <br> 
        /blogs/roller-ui/BlogsWidgetEventHandler.do <br> 
        /blogs/roller-ui/rendering/api <br> 
        /blogs/roller-ui/rendering/feed <br> 
        /blogs/services/atom</td>
        </tr>
        <tr>
        <td>Bookmarks</td>
        <td>/dogear/api/app <br>
        /dogear/api/deleted <br>
        /dogear/api/notify <br>
        /dogear/atom <br>
        /dogear/people.do</td>
        </tr>
        <tr>
        <td>Common resources</td>
        <td>/connections/opensocial/basic/rest</td>
        </tr>
        <tr>
        <td>Communities</td>
        <td>/communities/calendar/atom <br>
        /communities/calendar/handleevent <br>
        /communities/calendar/ical <br>
        /communities/community-suggestions <br>
        /communities/follow/atom <br>
        /communities/forum/service/atom <br>
        /communities/recomm/atom <br>
        /communities/recomm/handleevent <br>
        /communities/service/atom <br>
        /communities/service/atom/communities/my <br>
        /communities/service/json <br>
        /communities/service/opensocial</td>
        </tr>
        <tr>
        <td>Files</td>
        <td>/files/basic/api <br>
        /files/basic/api/myuserlibrary/feed <br>
        /files/basic/cmis <br>
        /files/basic/opensocial <br>
        /files/follow/atom </td>
        </tr>
        <tr>
        <td>Forums</td>
        <td>/forums/atom <br>
        /forums/follow/atom </td>
        </tr>
        <tr>
        <td>Home page</td>
        <td>/homepage/atom/mysearch <br>
        /homepage/atom/search <br>
        /homepage/web/updates/ </td>
        </tr>
        <tr>
        <td>News</td>
        <td>/news/atom/service <br>
        /news/atom/stories/community <br>
        /news/atom/stories/newsfeed <br>
        /news/atom/stories/public <br>
        /news/atom/stories/save <br>
        /news/atom/stories/saved <br>
        /news/atom/stories/statusupdates <br>
        /news/atom/stories/top <br>
        /news/atom/watchlist <br>
        /news/atomfba/stories/public </td>
        </tr>
        <tr>
        <td>Orient Me</td>
        <td>/community-suggestions </td>
        </tr>
        <tr>
        <td>Profiles</td>
        <td>/profiles/atom <br>
        /profiles/atom2 <br>
        /profiles/atom/forms/tagCloud.do <br>
        <b>Note:</b>** If you use case-insensitive junctions in your Security Verify Access configuration, specify tagcloud.do instead of tagCloud.do. <br>
        /profiles/follow/atom <br>
        /profiles/admin/atom <br>
        /profiles/photo.do <br>
        /profiles/json <br>
        /profiles/audio.do <br>
        /profiles/vcard </td>
        </tr>
        <tr>
        <td>URL Preview</td>
        <td>/connections/opengraph/basic/api/oembed <br>
        /connections/thumbnail/basic/api/imageProxy </td>
        </tr>
        <tr>
        <td>Wikis</td>
        <td>/wikis/basic/api <br>
        /wikis/follow/atom </td>
        </tr>
        </table>-->

    4.  Include the following unprotected resources when you configure ISVA.

        -   /communities/seedlist/myserver
        -   /dogear/seedlist/myserver
        -   /profiles/seedlist/myserver
        -   /news/seedlist/myserver
        -   /activities/seedlist/myserver
        -   /communities/calendar/seedlist/myserver
        -   /blogs/seedlist/myserver
        -   /forums/seedlist/myserver
        -   /wikis/seedlist/myserver
        
8.  To get the activity stream on the Homepage to display, you must import an encrypted connection \(SSL\) certificate from the ISVA server to the nodes.

    1.  Navigate to **SSL certificate and key management** \> **Key stores and certificates** \> **CellDefaultTrustStore\> \\ signer certs**.
    2.  Restart the Homepage application.

    !!! note
        
        To get the ECM events to appear, the ISAM certs must be imported to the **NodeDefaultTrustStore**.

    If the ISVA server and the WebSEAL server are different, you need to import the cert from the WebSEAL server.

9.  Specify a dynamic URL pattern to support the Blogs application and mail notification:

    1.  Create a dynamic URL configuration file named dynurl.conf. The dynurl.conf file is a plain text file that contains mappings from objects to patterns. Using a text editor, add the following content to the file:

        /blogs/blogsfeed /blogs/\*/feed/\*

        /blogs/blogsapi /blogs/\*/api/\*

        Save the file and deploy the changes.

    2.  To attach the bypass ACL that you defined in [Step 7 a](t_secure_with_tam.md#ToDefineTheAccessControlListEnterT) to the dynurl ACL, open the pdadmin command line utility and enter the following commands:

        acl attach /WebSEAL/isam\_server-WebSEAL\_instance/blogs/blogsfeed ic-bypass-acl

        acl attach /WebSEAL/isam\_server-WebSEAL\_instance/blogs/blogsapi ic-bypass-acl\>

        where:

        -   isam\_server is the host name of the Security Verify Access server.
        -   WebSEAL\_instance is the name of the instance of the WebSEAL server that is configured to manage Connections; for example: default.
        -   ic-bypass-acl is the name of the access control list that you defined [earlier](t_secure_with_tam.md#ToDefineTheAccessControlListEnterT).
        For example:

        acl attach /WebSEAL/server.name.example.com -default/blogs/blogsfeed open

    3.  To allow large Blogs posts, open the webseald.conf file and add the following parameter:

        dynurl-allow-large-posts = yes

    4.  To enable the uploading of PDF files, add the following parameter to the webseald.conf file:

        suppress-dynurl-parsing-of-posts = yes

10. Configure Security Verify Access to use form-authentication over HTTPS by updating the webseald-server-name.conf file. Add the following line to the \[forms\] stanza:

    forms-auth = https

    !!! note 
        
        You cannot specify HTTP-only authentication. To specify both HTTP and HTTPS, add the following line: forms-auth = both.

11. \(Do not complete this step for Security Verify Access with SPNEGO\) Add HCL Allow access to the Embedded Experience gadget by adding the following line to the \[ba\] stanza in the webseald-server-name.conf file:

    ba-auth = none

12. Configure content filtering by adding the following lines to the `webseald-server-name.conf`file:

    ```
    \[filter-content-types\]

    type = text/xml

    type = application/atom+xml

    \[script-filtering\]

    script-filter = yes

    rewrite-absolute-with-absolute = yes
    ```

13. Configure recognition of double-byte character sets. Update the webseald-server-name.conf file:

    Add the following lines:

    `decode-query = yes`

    `utf8-qstring-support-enabled = yes`

14. Configure Security Verify Access as the reverse proxy for Connections. Update the webseald-server-name.conf file:

    Add the following line to the \[server\] stanza:

    `web-host-name = fully-qualified-host-name`

    Add the following line to the \[session\] stanza:

    `use-same-session = yes`
15. Configure Security Verify Access to include host information in the HTTP header. Update the webseald-server-name.conf file:

    In the `[header-names]` stanza, add the following line:

    httphdr\{host\} = X-Forwarded-Host

    Stop and restart your WebSEAL instance.

16. Determine how you want the system to behave when users log out of Connections. By default, when users click **Log out** in the SSO environment, they are not fully logged out of Connections. Edit the HTTP Server httpd.conf configuration file to implement the post-log out behavior. By default, the file is located in the following directory:

    -   Linux™: `/opt/IBM/HTTPServer/conf`
    -   Windows™: `C:\\IBM\\HTTPServer\\conf`
    To capture requests to /ibm\_security\_logout and redirect them to /pkmslogout, add the following rewrite rules to the httpd.conf file:

    RewriteEngine On

    RewriteCond %\{REQUEST\_URI\} /\(.\*\)/ibm\_security\_logout\(.\*\)

    RewriteRule ^/\(.\*\) /pkmslogout \[noescape,L,R\]

    !!! note 
        
        You must add these rules to both the HTTP and HTTPS entries.

    Ensure that the line that enables mod\_rewrite is not commented out by removing the preceding \# symbol. For example:

    LoadModule rewrite\_module modules/mod\_rewrite.so

    The following example illustrates a typical portion of the httpd.conf file after you have implemented the steps that are described in this step:

    ```
    RewriteEngine On

    RewriteCond %\{REQUEST\_URI\} /\(.\*\)/ibm\_security\_logout\(.\*\)

    RewriteRule ^/\(.\*\) /pkmslogout \[noescape,L,R\]

    LoadModule ibm\_ssl\_module modules/mod\_ibm\_ssl.so

    <IfModule mod\_ibm\_ssl.c\>

    Listen 0.0.0.0:443

    <VirtualHost \*:443\>

    ServerName connections.example.com

    SSLEnable

    RewriteEngine On

    RewriteCond %\{REQUEST\_URI\} /\(.\*\)/ibm\_security\_logout\(.\*\)

    RewriteRule ^/\(.\*\) /pkmslogout \[noescape,L,R\]

    </VirtualHost\>

    </IfModule\>

    SSLDisable
    ```

17. Add an ErrorDocument 500 statement to the `httpd.conf` file. This statement appears in the user's browser if a Connections application becomes unavailable.

18. Save and close the `httpd.conf` file.

19. Restart HTTP Server.

20. The value of the cookie timeout attribute in the LotusConnections-config.xml file must be smaller than the values of the timeout and inactive-timeout attributes in the `webseald-server-name.conf` file. Check these values in the `[session]` stanza of the `webseald-server-name.conf` file and edit them if necessary.

    !!! note

        The values of the timeout parameters in the Security Verify Access configuration file are given in seconds but the CookieTimeout value in the LotusConnections-config.xml file is given in minutes.

    Use the following example as a guide:

    \# Maximum lifetime \(in seconds\) for an entry in the credential cache

    \# Setting this to zero allows entries in the cache to fill without expiry until the

    \# cache contains the number of entries specified by max-entries. After that

    \# point, entries are expired according to a least recently used algorithm.

    timeout = 3600

    \# Lifetime \(in seconds\) of inactive entries in the credential cache.

    \# To disable, set to 0.

    inactive-timeout = 600

21. Restart your cluster: Stop all application servers and all nodes, and then restart the deployment manager, all the nodes, and all the application servers.


**[Using WebSEAL for server to server communication](../secure/t_secure_with_tam_s2s.md)**  
To send all traffic through your WebSeal server, including server to server traffic, update the LotusConnections-config.xml file.

**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)

**Related information**  


[Enabling single sign-on for standalone LDAP](../secure/t_setup_standalone_ldap.md)

[Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md)

[Adding certificates to the WebSphere trust store](../install/t_exchange_keys_network.md)

[Configuring external collaboration](../install/t_install_configure_external_collab.md)

