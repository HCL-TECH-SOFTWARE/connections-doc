# Integrating the Profiles business card {#t_admin_profiles_include_biz_card .task}

Include the Profiles business card in your web application so that users can access your profile information and contact details.

The CSS files that are loaded with the Profiles business card do not include font style information. Define your custom font styles globally so that the styles used in your application are also applied to the business card. Defining global styles ensures that the business card appears integrated with your web application.

**Note:** You must use an Ajax web proxy to retrieve the business card data from HCL Connections.

You can integrate the Profiles business card with your web application based on one of the following parameters:

-   User ID, with the x-lconn-userid parameter
-   Email address, with the email parameter
-   LDAP distinguished name, with the DN parameter

    **Note:** The lookup by distinguished name requires that Profiles include the DN as an attribute of the profile. Specifically, the DN parameter must be mapped to the Profile database column EMPLOYEE.PROF\_SOURCE\_UID. See [Mapping fields manually](../install/t_prof_tdi_mapfields.md) and [Attribute mapping for Profiles](../install/r_attribute_mapping_profiles.md) for related information.


The x-lconn-userid parameter is any unique identifier for the user that is defined by the administrator and originating from the corporate LDAP directory. Many LDAP directories contain users who do not have email addresses. Using the x-lconn-userid parameter is a way of preemptively avoiding a dependency on the email address. In addition, administrators can edit configuration property settings to prevent email addresses from being displayed inHCL Connections™. Hiding email is a way to protect user privacy. You can design your web application so that it does not rely on email addresses for retrieving user data, such as the contextual business card.

Two types of business card are available to add to your web application:

-   Inline. This type of business card is embedded in the user interface. Only one inline card can be displayed at a time on the page.
-   Pop-up. This type of business card displays when users click a link in the user interface. Only one pop-up card can be displayed at a time.

1.  To integrate the Profiles business card with your web application:
2.  Add the following code to the web page before the `</body>` tag:

    ```
    <script type="text/javascript"> 
    var SemTagSvcConfig = {baseUrl: "connections\_URL", proxyURL: "Ajax\_proxy\_URL"};
    </script>
    ```

    The following properties are available for the SemTagSvcConfig object:

    |Property|Description|
    |--------|-----------|
    |baseUrl|Used to download resource strings and CSS files for the business card from the Connections application. The baseUrl parameter must be provided for the CSS to load. For example: http://example.com

This property is required.

|
    |proxyURL|Used to channel the HTTP request using an Ajax proxy. This proxy URL is required to avoid cross-domain issues. It is used to channel data from the Connections server to your web site. The value of the proxyURL parameter must be a link to your own Ajax proxy. The Ajax proxy must reside in the same domain as the application that includes the business card. For example, if your application resides at http://example.com/myCustomApp, the value of the proxyURL might be http://example.com/myCustomAppProxy.

This property is required.

|
    |isBidiRTL|Used to provide support for bidirectional languages. This property takes a Boolean value. This property is optional.

|
    |loadCssFiles|Used to download a CSS file for the business cards. This property takes a Boolean value. This property is optional. By default, it is set to true.

|

    For example:

    ```
    <script type="text/javascript"> 
       var SemTagSvcConfig = 
       { 
          baseUrl: "http://myConnectionsServer.example.com", 
          proxyURL: "http://myDominoServer.example.com/xsp/proxy/BasicProxy", 
          loadCssFiles: true 
       }; 
    </script> 
    ```

3.  Include the following reference to the semanticTagService.js file in your code:

    ```
    <script type="text/javascript" 
    src="protocol://conn\_server/profiles/ibm_semanticTagServlet/javascript/semanticTagService.js"></script>
    ```

    **Notes:**

    1.  The body element must exist and it must be instantiated before the script's JavaScript™ runs. If the script resource is included within the head element of your HTML code, it must use the defer attribute \(defer="defer"\). This attribute ensures that the JavaScript runs after the page is loaded. Otherwise, the script resource request must be included within the body element.
    2.  The business card uses Dojo. If Dojo is already included in your application, you must add the `?inclDojo=false` URL parameter to the JavaScript include as follows, otherwise the business card will not work.

        ```
        <script type="text/javascript" 
        src="src="protocol://conn\_server/profiles/ibm_semanticTagServlet/javascript/semanticTagService.js?inclDojo=false"></script>
        ```

        If you use the `?inclDojo=false` setting, ensure that you include the Javelin JavaScript after you include Dojo on your web page. You must use Dojo 1.7 or higher.

    3.  The business card can be loaded with or without a CSS file. If the HCL Connections CSS file is already loaded in your application and you do not want to include it again, add the `loadCssFiles=false` parameter to the JavaScript include.

        ```
        <script type="text/javascript" 
        src="protocol://conn\_server/profiles/ibm_semanticTagServlet/javascript/semanticTagService.js?loadCssFiles=false"></script>
        ```

    4.  The business card cannot be run from the file system; your HTML file must be on a web server. The server does not need to be in the same domain as Profiles. Use the following sample syntax to call your HTML file.

        ```
        <script type="text/javascript" 
        src="protocol://conn\_server/profiles/ibm_semanticTagServlet/javascript/semanticTagService.js"></script>
        ```

4.  Use and modify one of the following code examples to render the card with your personal details.

    To add the inline card:

        |**Based on user ID**|    ```
<div class="vcard X-person-display-inline">
  <span class="fn" style="display:none;">user\_name</span>
  <span class="x-lconn-userid" style="display: none;">user\_id</span>
</div>
    ```

For example:

    ```
<div class="vcard X-person-display-inline">
  <span class="fn" style="display:none;">Joe Todd</span>
  <span class="x-lconn-userid" style="display: none;">91ae7240-8f0a-1028-737f-db07163b51b2</span>
</div>
    ```

|
    |**Based on email address**|    ```
<div class="vcard X-person-display-inline">
  <span class="fn" style="display:none;">user\_name</span>
  <span class="email" style="display:none;">user\_email\_address</span>
</div>
    ```

For example:    ```
<div class="vcard X-person-display-inline">
  <span class="fn" style="display:none;">Joe Todd</span>
  <span class="email" style="display:none;">todd@mycomp.com</span>
</div>
    ```

|

    To add the pop-up card:

        |**Based on user ID**|    ```
<span class="vcard">
  <a href="javascript:void(0);"class="fn url">user\_name</a>
  <span class="x-lconn-userid" style="display: none;">user\_id</span>
</span>
    ```

For example:

    ```
<span class="vcard">
  <a href="javascript:void(0);"class="fn url">Joe Todd</a>
  <span class="x-lconn-userid" style="display: none;">91ae7240-8f0a-1028-737f-db07163b51b2</span>
</span>
    ```

|
    |**Based on email address**|    ```
<span class="vcard">
   <a href="javascript:void(0);"class="fn url"><user_name></a>
   <span class="email" style="display: none;"><user_email_address></span>
</span>
    ```

For example:    ```
<span class="vcard">
   <a href="javascript:void(0);"class="fn url">Joe Todd</a>
   <span class="email" style="display: none;">todd@mycomp.com</span>
</span>
    ```

|

5.  If you are using the stand-alone business card, include the following code to provide support for bidirectional languages:

    ```
    <script type="text/javascript">
    var SemTagSvcConfig = { isBidiRTL: true};
    </script>
    ```

6.  If your application constructs its user interface with Ajax, do one of the following to make the business card user interface and a person's profile data available.

    **Note:** This step applies only when you are building an application that constructs its user interface with Ajax. The business card code scans the HTML only when the page is first loaded. If you dynamically alter the page, you must manually specify the DOM elements that the code needs to rescan for business card vCard class attributes. If you are developing a static page, you can ignore this step.

    Do one of the following:

    -   For applications that construct HTML dynamically, you can add LiveName programmatically with JavaScript. Use the following API example:

        ```
        var htmlContent = 
        "<span class='vcard'>"+
           "<a href='javascript:void(0);' class='fn url'>user\_name</a>"+
           "<span class='email' style='display: none;'>"+
              "user\_name@company.com"+
           "</span>'+
        "</span>";
        
        document.getElementById("containerId").innerHTML += htmlContent;
        
        setTimeout("SemTagSvc.parseDom(null, 'containerId')", 500 );
        
        ```

        For example:

        ```
        var htmlContent =
        "<span class='vcard'>"+
           "<a href='javascript:void(0);' class='fn url'>Joe Todd</a>"+
           "<span class='email' style='display: none;'>"+
              "todd@mycomp.com"+
           "</span>'+
        "</span>";
        
        document.getElementById("containerId").innerHTML += htmlContent;
        
        setTimeout("SemTagSvc.parseDom(null, 'containerId')", 500 );
        ```

    -   To make the business card user interface and a person's profile data available on your server:
        1.  Verify that the following files are in the WAS\_HOME\\profiles\\WAS\_Profile\\config\\cells\\Host\_name\\LotusConnections-config directory:
            -   service-location.xsd
            -   LotusConnections-config.xsd
            -   LotusConnections-config.xml
        2.  Ensure that the profile service reference in the LotusConnections-config.xml file points to a running profile server. For example:

            ```
            <sloc:serviceReference serviceName="profiles"
            	href="http://localhost:9080/profiles"
            	enabled="true"
                  	ssl_href="https://localhost:9443/profiles"
            	ssl_enabled="true"
                person_card_service_url_pattern="/html/simpleSearch.do?searchFor={email}&amp;searchBy=email"
                    person_card_service_name_js_eval="generalrs.label_personcard_profilelink"/>
            
            ```

    **Note:** When displaying in Internet Explorer Quirks mode, a user's integrated business card might display their name in a different location than when using the browser’s Standards mode. To work around this display issue, enter the following statement in the html file to force a Standards mode rendering:

    ```
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> (http://www.w3.org/TR/html4/strict.dtd%27%3E)
    ```


**Parent topic:**[Using Profiles and Communities business cards](../customize/c_admin_profiles_biz_cards.md)

**Related information**  


[Administering Profiles](../admin/c_admin_profiles_intro.md)

[Integrating the Communities business card](../admin/t_admin_communities_include_biz_card.md)

[Mapping fields manually](../install/t_prof_tdi_mapfields.md)

[Attribute mapping for Profiles](../install/r_attribute_mapping_profiles.md)

