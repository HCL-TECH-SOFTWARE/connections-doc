# Changing the Blogs referrer policy {#t_change_blogs_referrer_policy .task}

Understand and change how Blogs handles the HTTP "referer" and "referrer-policy" headers.

By default, the Blogs application sets the Referrer Policy HTTP header to "no-referrer" by using an html meta-tag, thus forcing web browsers to not send a Referer HTTP Request Header to any website that has a link in the blog entry that the user clicks on.

Because some sites depend on the Referer HTTP Request Header for functionality, access checks, and so on, administrators have the option to change the default behavior in HCL Connections 6.0 CR1 and later versions.

1.  To change the default behavior, add the following generic property:

    ```
    <genericProperty name="blogs.noreferer.policy">false</genericProperty>
    to the LotusConnections-Config,xml -- for example:
    ...
        <properties>
            <genericProperty name="elasticsearch.eSmajorVersion">5</genericProperty>
    ...
            <genericProperty name="com.hcl.connections.rte.acceptIncomingOAuthTokensFromSubject">false</genericProperty>
            <genericProperty name="com.hcl.connections.rte.azureEnabled">false</genericProperty>
            <genericProperty name="blogs.noreferer.policy">false</genericProperty>
        </properties>
    </config>
    ```

    The Blogs application sets the Referrer Policy HTTP header to "origin" -- thereby sending the properly formatted origin of the request.

2.  After you apply the change to the LCC.xml file, sync and restart the Blog application.

    **Note:** For more information on the subject of the HTTP Referrer Policy Header, see [Referrer Policy, Latest published version](https://www.w3.org/TR/referrer-policy/) on the W3C website.


**Parent topic:**[Administering Blogs](../admin/c_administering_blogs.md)

