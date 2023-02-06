# Integrating the iframe {#task_gx5_vm1_hbb .task}

To add an Important To Me \(ITM\) bar to your Connections component in an iframe, follow these steps.

To complete this task, you need to edit the HTML source for your component page.

1.  Add itmBootstrap.js to your page with a `<script/>` element.

    For example:

    ```
    <script src="/social/itm/itmBootstrap.js"></script>
    ```

2.  Add the DOM element in which the ITM bar will render.

    For example:

    `<div id="itm_root"></div>`

3.  Add a `script` element to your page, and create an ITM configuration object variable, for use by the function that creates the ITM bar.

    For example:

    ```
    var itmConfig = {
      rtl: false,
      appRegistry: true,
      locale: en
    };
    
    ```

    For complete information about the configuration object, see "Important To Me bar reference".

4.  Create an onLoaded callback function, for use by the function that creates the ITM bar.

    For example:

    ```
    function onLoaded(itmRef) {
      itmBar = itmRef;
      itmBar.callMethod('addStaticHeadEntries', [genGloablEntry()]);
      itmBar.addEventListener('onEntrySelected', onEntrySelected);
      itmBar.addEventListener('onAction', onActionSelected);
    }
    
    ```

    The onLoaded callback function is invoked once the ITM bar is initialized. An ITM bar reference is passed in as the callback function parameter. Keep the reference in the Host app, since it is used to manipulate the ITM bar.

    In addition to receiving the ITM bar reference, the onLoaded callback function can perform more initialization tasks, such as adding a global entry or adding a listener for ITM events.

5.  Create the ITM bar by calling lconn.itm.client.itmFactory.create\(\), defined in itmBootstrap.

    ```
    lconn.itm.client.itmFactory.create(config, onLoaded, node);
    //config is the itm configuration object mentioned above.
    //onLoaded is the callback function mentioned above.
    //node is either the DOM node to contain the ITM bar or the id of the container.
    
    ```


A demo for a mock host page to embed an ITM iFrame can be found here: [https://github.com/HCL-TECH-SOFTWARE/connections-samples/blob/main/itm/iframe-embed/parent.html](https://github.com/HCL-TECH-SOFTWARE/connections-samples/blob/main/itm/iframe-embed/parent.html)

To use it:

-   Place the parent.html and itmBootstrap.js files in a directory on the HTTP server \(or other web server of static resources accessible via your https://connections.host.name domain name to minimize cross-site issues\)
-   Go to https://connections.host.name/path/to/parent.html
-   The ITM bar should load from Connections in an iFrame at the top of the page

Once you have created the ITM bar, you can use `itmRef` to perform tasks like getting a list of entries or setting the status of an entry.

**Parent topic:**[Adding an Important To Me bar to a Connections component](../customize/c_itm_iframe_intro.md)

