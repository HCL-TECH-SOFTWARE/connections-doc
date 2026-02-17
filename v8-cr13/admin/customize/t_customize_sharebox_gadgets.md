# Adding new ways to share content {#addingnewwaystosharecontent .task}

Create your own gadgets and add them to the Share dialog.

HCL Connections™ provides a quick way to share content with others. From anywhere in Connections, users can click **Share**. To enable an OpenSocial gadget in the Share dialog, you must edit the gadget XML file and then add the gadget by using the Administration option on the Home page.

You can create your own gadgets and add them to the **Share** dialog. In this context, your gadgets should probably allow a user to share content with other users, but you can add anything.

You can add the following features to your gadget:

-   A feature to close the share dialog from the gadget; for example, add a **Close** button to your gadget that closes the Share dialog.
-   A feature to inform the dialog of a submit state; for example, show a progress indicator while data is being submitted.

1.  Ensure that gadgets in the Share dialog have their gadget XML conform to the following OpenSocial feature requirements:

    ```
    <Require feature="dynamic-height" />
    <Require feature="dynamic-width" />
    <Require feature="views" />
    ```

2.  Require the ibm.connections.sharedialog feature, for example:

    ```
    <Require feature="ibm.connections.sharedialog" />
    ```

    **Note:** This feature should be used by gadgets that are rendered in the Share dialog.

3.  Include the actions feature and define an action with a path of "container/sharebox".

    ```
    <Optional feature="actions">
             <Param name="action-contributions">
                   <![CDATA[
                      <actions>
                      <action id="customAction" path="container/sharebox" label="Read Only Sample" 
                         tooltip="used to show Share dialog gadget loading concept" />
                      </actions>
                   ]]>
                </Param>
             </Optional>
    ```

    Where:

    -   The action element's **id** attribute must be unique across all gadgets that you intend to surface in the dialog. If more than one gadget has an action element with the same **id** attribute value, then each gadget after the first one loaded with the same ID will fail to load. If this issue exists and you have a JavaScript console available for your browser, you will see a message similar to the following in the JavaScript console:

        ```
        Duplicated gadget action [gadget-name] detected. make sure the gadget actions have unique ids.
        ```

    -   In the **path** attribute, use the value container/sharebox to have the gadget display in the Share something dialog.
    -   In the label attribute, add the name of the gadget to display as a tab in the dialog, for example the value label="MyGadget" means the dialog will display the following tabs: **Status Update \| Files \| MyGadget.**
    -   In the tooltip attribute, add more descriptive text about the gadget to display as tooltip text that appears when hovering over the tab for the gadget.
4.  Define your action and a callback function to be called when the action has been invoked \(such as when a tab has been selected for this gadget to be displayed or to perform some action. For example:

    ```
    <script type="text/javascript">
     
     gadgets.util.registerOnLoadHandler(function() {
      if (gadgets.actions) {
       var customAction = {
        id: "customAction", /* Note: The id matches the id of the action from the ModulePrefs section - 
           Example: <action id="customAction" path="container/sharebox" label="Custom Action" /> */            
           callback: updateContext  
           /* Note: The callback function will get called each time the action is invoked(Sharebox Example: Every time the tab is selected.*/
          };
         gadgets.actions.updateAction(customAction);
        }
       });
     
       function updateContext(selection) {
          if(selection.type == "com.ibm.social.sharebox.context")
          initCustomContent(selection.dataObject);
        /*Perform gadget initialization with the "context' that is available via "selection.dataObject".*/
       }
     
    </script>
    ```

    **Note:** The selection object will consist of a**type** and **dataObject** attribute. When an action is invoked in the Share dialog, a selection object will be provided to the action callback \(*updateContext* in this case\) and the object will have a **type** of com.ibm.social.sharebox.context. If the **type** value is not com.ibm.social.sharebox.context, then this selection did not come from *Sharebox*. The actual *context* object is available via the **dataObject** attribute. Example selection.dataObject: \{type: "global"\}

    **Note:** The callback defined for your action \( "updateContext" function in this example\) will get called each time the user visits your gadget's tab in the Share dialog. The following scenarios will result in the callback being called:

    1.  User visits tab of gadget. The first time this happens, you will want to initialize your gadget contents. Each additional time, you will only want to do an update if desired.
    2.  User closes the Share dialog while your tab is in focus and then reopens the Share dialog without leaving the current page or performing a page refresh. The callback will get called when the Share dialog is opened.
5.  Design your gadget so that the contents will have a width that does not exceed 500px.

6.  Each time the contents of your gadget's DOM \(document object model\) change, then call the following code to force the gadget to resize:

    ```
    if (gadgets.window.adjustHeight)
        gadgets.window.adjustHeight();
    if (gadgets.window.adjustWidth)
        gadgets.window.adjustWidth(500); /*Pass in 500 so that gadget will know the preferred width is 500px*/
    ```


To add a gadget to the Share dialog, see the [Adding a gadget to the Share dialog](t_add_gadget_to_share.md) topic.

-   **[Optional features for custom sharing gadgets](../customize/r_customize_sharebox_gadgets_optional.md)**  
Add features to your gadgets for interacting with the **Share** dialog.
-   **[Adding a gadget to the Share dialog](../customize/t_add_gadget_to_share.md)**  
Add an OpenSocial gadget to the Share dialog.

**Parent topic:**[Customizing](../customize/c_customize_overview.md)

**Related information**  


[Adding a gadget to the Share dialog](../customize/t_add_gadget_to_share.md)

[Optional features for custom sharing gadgets](../customize/r_customize_sharebox_gadgets_optional.md)

