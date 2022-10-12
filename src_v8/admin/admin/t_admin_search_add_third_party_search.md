# Adding third-party search options to the search control {#t_admin_search_add_third_party_search .task}

You can extend the search control in HCL Connections to include options from third-party search engines by configuring settings in the LotusConnections-config.xml file.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

When you configure settings for additional search options in the LotusConnections-config.xml file, those options are made available to users from the Search drop-down menu, allowing them to search content from the sources described in the configuration file. When a user selects a third-party search engine from the Search menu and enters a query term, the results of the search display on a third-party search results page.

1.  To add a third-party option to the HCL Connections search control, complete the following steps.
2.  Use the wsadmin client to access and check out the HCL Connections configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft® Windows®, use a forward slash for the directory. For example: "C:/temp".
            -   AIX®, and Linux® only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

3.  Navigate to the temporary working directory that you specified in the previous step, and then open the LotusConnections-config.xml file in a text editor.

4.  Define the additional search option as a child element of the serviceName="search" element by adding a <sloc:searchScope\> element that contains the details of the third-party service.

    For example:

    ```
    <sloc:serviceReference bootstrapHost="" bootstrapPort="" 
       clusterName="cluster" enabled="true" serviceName="search" ssl_enabled="true">  
       <sloc:href>
          <sloc:hrefPathPrefix>/search</sloc:hrefPathPrefix>
          <sloc:static href="http://myserver.example.com:9081" 
       ssl_href="https://myserver.example.com:9444"/>
          <sloc:interService href="https://myserver:9444"/>
       </sloc:href>
       <!-- Add third Party Search Options here -->
       <sloc:searchScope scopeName="Yahoo" enabled="true" isGlobal="true">
          <sloc:searchApplicationURL>
             <sloc:static href="http://search.yahoo.com/search?q=" 
       ssl_href="http://search.yahoo.com/search?q="/>
          </sloc:searchApplicationURL>
          <sloc:searchScopeIconClass>lconnSprite 
       lconnSprite-iconThirdParty16</sloc:searchScopeIconClass>
       </sloc:searchScope>
       <!-- Third party Search options added-->
    </sloc:serviceReference>
    ```

    where:

    -   <sloc:searchApplicationURL\> defines the URL to the third-party search application. When a user selects the third-party search engine from the Search menu and enters a search term, that search query term is appended to this URL.

        Ensure that the URL that you define will use the search query terms that are passed to the URL. Pointing to a base URL, such as www.yahoo.com, does not work. Refer to the external documentation for the third-party search engine to find the correct URL to use. For example, the correct URL for searching using the Yahoo search engine is "http://search.yahoo.com/search?q=".

    -   <sloc:searchScopeIconClass\> specifies the CSS class for an icon that identifies the third-party search option in the Search drop-down menu. The value of `<sloc:searchScopeIconClass>` must always be set to lconnSprite lconnSprite-iconThirdParty16.
    For the new search engine to display in the search control, ensure that the enabled parameter is set to true for the <sloc:serviceReference\> and <sloc:searchScope\> elements. The isGlobal parameter for the <sloc:searchScope\> element must also be set to true.

    1.  To point to a Search option that is locally available on the same URL as the HCL Connections server, use the <sloc:hrefPathPrefix\> tag instead of the <sloc:href\> tag.

        For example:

        ```
        <sloc:searchScope scopeName="myPlaces" enabled="true" 
           isGlobal="false">
           <sloc:searchApplicationURL>
              <sloc:hrefPathPrefix>places?scope=myPlaces&query=</sloc:hrefPathPrefix>
           </sloc:searchApplicationURL>
           <sloc:searchScopeIconClass>lconnSprite 
           lconnSprite-iconThirdParty16</sloc:searchScopeIconClass>
        </sloc:searchScope>
        ```

        **Note:** In this case the isGlobal parameter is set to false because the example is for a local search.

5.  Save your changes and then close the LotusConnections-config.xml file.

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying common configuration property changes* for information about how to apply your changes.


**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

