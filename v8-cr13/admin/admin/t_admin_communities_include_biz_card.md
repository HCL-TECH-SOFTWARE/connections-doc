# Integrating the Communities business card {#t_admin_communities_include_biz_card .task}

Include the Communities business card in your web application so that users can quickly navigate to a community from the application.

The CSS files loaded with the Communities business card do not include font style information. To ensure that the business card appears fully integrated with your web application from a visual perspective, define your own font styles globally so that the styles used in your application are also applied to the business card

Note: You must use an Ajax web proxy to retrieve the business card data from HCL Connections™.

For information about how to configure the Communities business card on a HCL Domino® server, see *Configuring the Communities business card on a Domino server*.

The Communities business card displays basic community information, such as the name of the community, the image associated with the community, and the links for the widgets associated with the community. By including the card in your web application, you enable users to access a community directly from your application using the links in the card. 

**Note:** The CSS files loaded with the Communities business card do not include font style information. To ensure that the business card appears fully integrated with your web application from a visual perspective, define your own font styles globally so that the styles used in your application are also applied to the business card.

1.  To add the Communities business card to your web application, complete the following steps.
2.  To use an Ajax proxy, add the following code to the web page within the `<head></head>` tags:

    ```
    <script type="text/javascript"> 
    var SemTagSvcConfig = {baseUrl: "community\_service\_URL", proxyURL: "Ajax\_proxy\_URL"};
    </script>
    ```

    The following properties are available for the SemTagSvcConfig variable:

    |Property|Description|
    |--------|-----------|
    |baseUrl|Used to download resource strings and CSS files for the business card from the Communities application. The baseUrl parameter must be provided for the CSS to load. For example: http://myserver.com/communities

This property is required.

|
    |proxyURL|Used to channel the HTTP request using an Ajax proxy. This proxy URL is required to avoid cross-domain issues. It is used to channel data from the HCL Connections server to your web site. The value of the proxyURL parameter must be a link to your own Ajax proxy. The Ajax proxy must reside in the same domain as the application that includes the business card. For example, if your application resides at http://myserver.com/myCustomApp, the value of the proxyURL might be http://myserver.com/myCustomAppProxy.

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
          baseUrl: "http://myConnectionsServer.mycompany.com", 
          proxyURL: "http://myDominoServer.mycompany.com/xsp/proxy/BasicProxy", 
          loadCssFiles: true 
       }; 
    </script> 
    ```

3.  To configure the semantic tag service, include the following code:

    ```
    <script type="text/javascript" src="protocol://connections\_server/profiles\_app/ibm_semanticTagServlet/javascript/semanticTagService.js"></script>
    ```

    **Notes:**

    -   The body element must exist and be instantiated before the script's JavaScript™ executes, thus if the script resource is included within the head element of your html code, it must use the defer attribute \(defer="defer"\) so that it executes after the page is loaded.  Otherwise, the script resource request must be included within the body element.
    -   The business card uses Dojo 1.4. If Dojo 1.4 is already included in your application, you must add the ?inclDojo=false URL parameter to the JavaScript include as follows, otherwise the business card will not work.

        ```
        <script type="text/javascript" src="protocol://connections\_server/profiles\_app/ibm_semanticTagServlet/javascript/semanticTagService.js?inclDojo=false"></script>
        ```

    -   The business card can be loaded with or without CSS. If you already have the HCL Connections CSS files loaded in your application and do not want to include the CSS again, add the loadCssFiles=false parameter to the JavaScript include like this:

        ```
        <script type="text/javascript" src="protocol://connections\_server/profiles\_app/ibm_semanticTagServlet/javascript/semanticTagService.js?loadCssFiles=false"></script>
        ```

4.  Use and modify the following code to render the card with community details:

    ```
    <span class="vcomm X-community-display-inline">
    <span class="name" style="display:none;"><community\_name\></span>
    <span class="uuid" style="display:none"><community\_uuid\></span>
    <span class="selectedWidgetId" style="display:none;"><widget\_id\></span>
    </span>
    ```

    where:

    -   <community\_name\> is the name of the community. This parameter is a text string.
    -   <community\_uuid\> is the UUID of the community.
    -   <widget\_id\> is a text string that corresponds to the widgetDefId of the widget that has been added to the community. This text string is used to highlight the menu item in the navigation bar. The <widget\_id\> element is optional, and must only be provided for iWidgets that are integrated into Communities. The widget ID is defined by the iWidget developer, and you need to request it from your administrator or the iWidget developer.
    For example:

    ```
    <span class="vcomm X-community-display-inline">
    <span class="name" style="display:none;">Snowboarders</span>
    <span class="uuid" style="display:none">b307369e-7e60-403b-b850-206a28d6c19e</span>
    <span class="selectedWidgetId" style="display:none;">HelloWorldExtFullpage</span>
    </span>
    ```

5.  If you are building a web application that constructs its user interface using Ajax, you can make the business card user interface available by adding LiveName programmatically using JavaScript. Use the following API example:

    **Note:** This step only applies when you are building an application that constructs its user interface using Ajax. The business card code only scans the HTML when the page is first loaded so, if you dynamically alter the page, you need to manually specify the DOM elements that the code rescans for business card vcard class attributes. If you are developing a completely static page, you can ignore this step.

    ```
    var htmlContent = "<span class="vcomm X-community-display-inline">"+
    "<span class="name" style="display:none;"/><community_name></span>"+
    "<span class="uuid" style="display:none"><community_uuid></span>"+
    "<span class="selectedWidgetId" style="display:none;"><widget_id></span>"+
    "</span>";
     
    document.getElementById("containerId").innerHTML += htmlContent;
     
    setTimeout("SemTagSvc.parseDom(null, 'containerId')", 500 ); 
    ```


