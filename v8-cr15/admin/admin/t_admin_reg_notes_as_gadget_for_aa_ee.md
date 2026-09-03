# Registering HCL Notes as a consumer of the Activity Stream and Embedded Experience gadgets {#t_admin_reg_notes_as_gadget_for_aa_ee .task}

HCL Connections and Domino® administrators can work together to facilitate seamless integration between HCL Connections and Notes® and iNotes®. Your administrator can export the Activity Stream and Embedded Experience gadgets and hand them off to the Domino administrator to be included in the corporate Widget Catalog where they can then be deployed to end users using Widget policies.

The Activity Stream widget is supported in the Notes client only. When the widget titled Updates, is installed, end users will see a new shortcut action in the Notes shortcut bar labeled Updates. The **Updates** tab opens automatically for the end user showing the activity stream.

The Embedded Experience widget is supported in both Notes and iNotes. When the widget titled Connections EE Gadget, is installed, it allows for emails from Connections to display as an Embedded Experience such that users can interact with Connections directly within their email.

An HCL Connections administrator can run a script that generates xml files for the Activity Stream and Embedded Experience gadgets. The files are created from six configuration files. The script reads in the template files, performs an oAuth registration to create the consumer data, and then generates six xml files in a user-specified directory. Then these six xml files are given to the Domino administrator who imports them into the Widget Catalog, completing the cycle. The jython script is in the bin directory as a sibling of oauthAdmin.py and other Connections jython scripts. The six configuration files are placed in the LotusConnections-config directory. The script is invoked as follows:

1.  From a wsadmin prompt, run the following command: execfile\('gadgetAdmin.py'\).

2.  From a wsadmin prompt, run the following command: NotesRegistrar.registerGadgets\("appid","applabel","callbackurl","outputdir"\).

    Where

    -   appId is an identifier for the application you are registering. It can be anything you like such as MyGadgets.
    -   applabel is a descriptive name for your client such as My Gadgets for Open Social.
    -   callbackurl is where to redirect to when the gadget has been granted authorization. This should be: http://yourdominoserver.domainx.com/fiesta/gadgets/oauth2callback where yourdominoserver is the name of your shindig server; however, you should use `https` if the Domino Server is enabled for it.
    -   outputdir is the location on disk that will contain the output from running the command. The outputdir must exist before running the command.
    For example:

    ```
    wsadmin>NotesRegistrar.registerGadgets("MyGadgets","My Gadgets for Open Social","http://yourdominoserver.domainx.com/fiesta/gadgets/oauth2callback","c:\test") 
    
    
    ```

    **Note:** There is an optional fifth argument `"secure"` that defaults to `"false"`. A value of `"false"` indicates that `https` is not being used and instead plain `http` is used. If provided and set to `"true"`, the gadget URLs will be the secure `https` versions of the URLs. For example, `NotesRegistrar.registerGadgets("appid","applabel","callbackurl","workingdir","false")` is the same as calling `NotesRegistrar.registerGadgets("appid","applabel","callbackurl","workingdir")` and it generates gadget URLs with plain `http`. However, if the last argument is `"true"`, then the URLs are generated with the `https` prefix. If the value of the **forceConfidentialCommunications** attribute in the LotusConnections-config.xml is true, then the secure parameter should also be set to true.

    **Result**: When the script completes, the following six files can be found in the specified outputdir:

    -   AS.Gadget.extension.xml
    -   AS.Gadget.oauth.xml
    -   AS.Gadget.proxy.xml
    -   EE.Gadget.extension.xml
    -   EE.Gadget.oauth.xml
    -   EE.Gadget.proxy.xml
3.  Transfer these files to the Domino administrator for import.


**Parent topic:**[Administering the Widget container](../admin/t_admin_common_widget_container.md)

