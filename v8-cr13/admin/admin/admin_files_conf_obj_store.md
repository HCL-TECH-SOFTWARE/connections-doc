# Configuring Files to use an object store

Configure HCL Connections Files to seamlessly work with an external object store, providing scalability and data recovery for your deployment, while enabling faster access to files for users.

Before you can configure Files to work with an object store, you must the install Java™ 8 JRE on the Files server.

Connections Files uses an intermediary application called storageProxy to function as a proxy so it can isolate details of the object store from Connections. After you set up your object store, you can configure its settings in the StorageProxy.ear file. Then configure the Files application to use the storageProxy service to access data in the object store.

!!! note 

    This task is optional.

1.  Set up your external object store.

2.  Configure the storageProxy service to connect to the object store.

    1.  Use the WebSphere® Integrated Solutions Console to configure a J2C alias for the storageProxy service.

        When the Files application connects to the proxy service, it will provide the alias's credentials for authentication. Typically, IBM® WebSphere Application Server installs with a J2C authentication alias called `storageProxyAliasS2S` already defined. If the alias does not exist, you can create it now using the instructions in [Configuring J2C Aliases for the moderation proxy service](t_admin_common_moderation_config_proxy_id.md).

        !!! note 
            
            If you create a new J2C alias, make sure that the **Prefix new alias names with the node name of the cell (for compatibility with earlier releases)** option is unchecked.

    2.  Configure a J2C alias for the external object store using the same process.

        The proxy service will use this alias to connect to the object store. Again, make sure that the **Prefix new alias names with the node name of the cell (for compatibility with earlier releases)** option is unchecked.

    3.  Edit the `WAS_PROFILE_HOME/config/cells/cellname/LotusConnections-Config/storageproxy-config.xml` file and add the J2C alias after the `xsi:schemaLocation=` statement.

        ```sh
        <j2cAlias storageProxy="storageProxyAliasS2S" objectStorage="cleverSafeAlias"/>
        ```

        !!! note 
            
            If you use a file system to mimic object storage, you can set the object store to `objectStorage=storageProxyAliasS2S`.

    4.  Enable the storageProxy service in the LCC.xml file as shown in the following example.

        ```sh
        <sloc:serviceReference **serviceName="storageproxy"**
                **enabled="true"**
                **ssl\_enabled="true"**
                bootstrapHost="example.com"
                bootstrapPort="2809"
                clusterName=""
                person_card_service_url_pattern="/app/person/{userid}"
                person_card_service_name_js_eval="generalrs.label_personcard_fileslink">
                <sloc:href>
                    <sloc:hrefPathPrefix>/storageproxy</sloc:hrefPathPrefix>
                    <sloc:static href="http://example.com:9080" ssl_href="https://example.com:9443"/>
                    <sloc:interService href="https://example.com:9443"/>
                </sloc:href>
            </sloc:serviceReference>
        ```

    5.  Configure the object store settings in the storageproxy-config.xml file as shown in the following examples.

        The object store settings include an endpoint address where the storageProxy service can access data, as well as one or more properties that describe the object store. The following examples show settings for a file system used as an object store, and for IBM Cloud Storage.

        -   Sample object store settings for a file system that mimics an object store where:

            -   `provider` specifies the type of object store as a file system.
            -   `endpoint` specifies the address of the object store as the URL to a file server.
            -   `jclouds.s3.service-path` specifies `storageproxy` as the final location within the endpoint address.
            -   `jclouds.filesystem.basedir` defines the object store as a file directory.

            ```sh
            <config xmlns="http://www.ibm.com/connections/storageproxy/storageproxy-config/1.0" 
               id="storageproxy" 
               xmlns:tns="http://www.ibm.com/connections/storageproxy/storageproxy-config/1.0" 
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
               xsi:schemaLocation="http://www.ibm.com/connections/storageproxy/storageproxy-config/1.0 storageproxy-config.xsd">
            
               <j2cAlias storageProxy="storageProxyAliasS2S" **objectStorage="storageProxyAliasS2S"**/>
               
               <authentication type="aws_v2"/>
               
               <presignedURL expirationInSeconds="60" signerType="S3SignerType" pathStyleAccess="true"/>
            
               <storage **provider="filesystem"** **endpoint="https://example.ibm.com:9443/storageproxy"** >
                <properties>
                    <property name="jclouds.keystone.credential-type">tempAuthCredentials</property>
                    <property **name="jclouds.s3.service-path"\>storageproxy**</property>
                    <property **name="jclouds.filesystem.basedir"\>D:/ibm/LotusConnections10-db2-was855-conn10\_st/Data/objectstorage**</property>
                    <property name="jclouds.trust-all-certs">true</property>
                </properties>
               </storage>
            </config>
            ```

        -   Sample object store settings for IBM Cloud Storage \(formerly known as CleverSafe\) where:

            -   `provider` specifies the type of object store as `s3`, the Amazon Simple Storage Service format supported by IBM Cloud Storage
            -   `endpoint` specifies the address of the object store as the IBM Cloud Storage URL.
            -   `jclouds.s3.service-path` specifies `s3` as the final location within the endpoint address.

            ```sh
            <config xmlns="http://www.ibm.com/connections/storageproxy/storageproxy-config/1.0" 
               id="storageproxy" 
               xmlns:tns="http://www.ibm.com/connections/storageproxy/storageproxy-config/1.0" 
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
               xsi:schemaLocation="http://www.ibm.com/connections/storageproxy/storageproxy-config/1.0 storageproxy-config.xsd">
            
               <j2cAlias storageProxy="storageProxyAliasS2S" **objectStorage="cleverSafeAlias"** pathStyleAccess="true"/>
               
               <authentication type="aws_v2"/>
            
               <presignedURL expirationInSeconds="60" signerType="S3SignerType" pathStyleAccess="true"/>
            
               <storage **provider="s3"** **endpoint="http://127.0.0.1/s3"** >
                   <properties>
                      <property name="jclouds.keystone.credential-type">tempAuthCredentials</property>
                      <property **name="jclouds.s3.service-path"\>s3**</property>
                     <property name="jclouds.trust-all-certs">true</property>
                   </properties>
               </storage>
            </config>
            ```

    6.  Restart the `StorageProxy.ear` application.

3.  Configure the Files application to access the storageProxy service.

    Edit the WAS\_PROFILE\_HOME/config/cells/cellname/LotusConnections-Config/storageproxy-config.xml file and update the following statement, to include the `container` and set `enabled="true"`:

    -   `j2cAlias` is the J2C alias for the storageProxy service \(not the object storage\).
    -   `container` is name of the bucket where all contents are saved to.

    ```sh
    <objectStorage enabled="true" type="s3" j**2cAlias="storageProxyAliasS2S"** **container="JL08072016-1"**/>
    ```

4.  Create a proxy for download requests.

    To prevent users from seeing a vendor-specific URL, edit the httpd.conf file and define an HTTP proxy for download requests as shown in the following example.

    !!! note
        
        If the object storage system requires HTTPS connections, then Apache requires additional configuration to import its certificate.

    ```sh
    LoadModule proxy_module modules/mod_proxy.so
    
    LoadModule proxy_http_module modules/mod_proxy_http.so
    
    <IfModule mod_ibm_ssl.c>
    Listen 0.0.0.0:443
    <VirtualHost *:443>
    
    ProxyPass /cs/ http://127.0.0.1/s3/
    ProxyPassReverse /cs/ http://127.0.0.1/s3/
    
    </VirtualHost>
    </IfModule>
    
    ProxyPass /cs/ http://127.0.0.1/s3/
    ProxyPassReverse /cs/ http://127.0.0.1/s3/
    
    ## This is only needed when IHS enables websphere plugin. Otherwise, ProxyPassReverse is able to re-write Location header. 
    
    LoadModule headers_module modules/mod_headers.so
    
    <Location /files>
    Header edit Location /127.0.0.1/s3/ /lcauto1.swg.usma.ibm.com/cs/
    </Location>
    ```


