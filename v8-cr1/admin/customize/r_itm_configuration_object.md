# Important To Me bar reference {#reference_b2r_zm1_hbb .reference}

These are the objects and methods you can use to add an Important To Me \(ITM\) bar to your Connections component.

## Important To Me configuration object { .section}

|Options|Default|Description|
|-------|-------|-----------|
|app|'OrientMe'|Name of Host app. It must exactly match the path value in the App Registry URL for this host.|
|readOnly|false|Allow adding or removing ITM entries. If true, there are no add and remove buttons in the ITM bar, but a plus icon appears at the end of the entries row, which takes you to the Orient Me page to maintain the entry list.|
|hasSuggestion|true|Show suggestions section.|
|hasAction|true|Show action bubbles for ITM entries.|
|hasTailPlus|false|Show plus icon at the end of the entries row. If readOnly is true, the plus icon will appear regardless of this option value.|
|isMoveable|true|User can reorder entries by dragging and dropping.|
|excludeActions|\[\]|Action bubbles that the Host prefers to disable. An array of action type names; for example, `['chat','sharefile']`|
|suggestionsConfig|\[\]|Override the suggested configuration defined in the native configuration or by the merged native and appRegistry configurations. However, if the appRegistry is integrated, you should do the customization there, not here.|
|appRegistry|false|Enable appRegistry integration.|
|hasHoverWarning|true|For Action Center only, show a warning message when a Person state is INACTIVE or DELETED or a Community state is DELETED or NOACCESS.|
|customJsEnable|true|Allow the ITM bars to load external JavaScript files defined in either the native or appRegistry ITM configuration file. If false, customized handles will not function if they depend on the customized JavaScript.|
|locale|NA|Required. Locale of the current context. ITM passes it to typeahead.|
|typeaheadStores|\[\]|Typeahead data stores. An array of data store instances or the strings 'ITM\_DEFAULT\_PEOPLESTORE’ and ‘ITM\_DEFAULT\_COMMUNITYSTORE'. ITM has a built-in data store for People and Community, so in most cases the host doesn't need to specify it.|
|smartcloud|NA|Boolean. ITM first tries to determine if the host is in a Smart Cloud deployment. If it cannot, ITM uses this value.|
|isExternal|false|Is the login user external to the current organization?|
|rtl|false|Show content in RTL format.|

## ITM bar reference object { .section}

The reference object is passed to the host as a parameter of the onLoaded callback function. The object defines the following functions that the host app can use to interact with the ITM bar.

-   addEventListener
-   removeEventListener
-   callMethod
-   fetchEntries

**Parent topic:**[Adding an Important To Me bar to a Connections component](../customize/c_itm_iframe_intro.md)

## addEventListener {#reference_asv_xn4_hbb}

Use this function to add a listener for ITM events, such as ITM entry selection.

Usage: `itmRef.addEventListener(eventName, handler)`

-   `eventName` is the name of the event the handler will listen for.
-   `handler` is a callback function defined in the host. It is called when the listening event occurs. The handler should bind `this` before being passed to the function.

You can specify any of the following events.

|Event Name \(string\)|Description|Callback parameter|
|---------------------|-----------|------------------|
|onEntrySelected|Occurs when an ITM entry is selected.|entry object|
|'nEntryAdded|Occurs when a new favorite entry is added from typeahead or suggestion section.|new entry object|
|onEntryDeleted|Occurs when an favorite or suggested entry is deleted.|entry id|
|onAction|Occurs when the action bubble of an entry is clicked|entry object, action type|
|onMessagePopped|Occurs when ITM wants to raise a message to the host app.|message text, message type \(warning, info,danger, success \)|

## removeEventListener {#reference_oyp_r54_hbb}

Use this function to remove an event listener you previously registered with addEventListener\(\).

Usage: `itmRef.removeEventListener(eventName, handler)`

-   `eventName` is the name of the event listener you want to remove.
-   `handler` is the listener function you registered to the event previously with addEventListener\(\).

## callMethod {#reference_sv2_ll4_hbb}

Use this wrapper function to call ITM component methods. Specify the method as an argument of the function, and each argument required by the method as an argument of callMethod.

Usage: `itmRef.callMethod(methodName, arg1,arg2,...,argN)`

-   `methodName` is the name of the ITM component method you want to call.
-   `arg1,arg2,...,argN` is the arguments needed by the calling method .

This table lists all the ITM component methods that can be invoked by the host app.

|Method Name \(string\)|Description|Arguments|
|----------------------|-----------|---------|
|addStaticHeadEntries|Add global entries to the ITM bar.|Array of global entries|
|setHighWaterMark|Add high watermark \(hasNew flag\) to one or more ITM entries.|Array of entry ids|
|clearHighWaterMarks|Remove high watermarks from ITM entries.|Array of entry ids|
|clearAllHighWaterMarks|Remove all high watermarks on the ITM bar.| |
|setEntrySelected|Make an entry selected and send onEntrySelected event. If you do not specify an entry id, the method just unselects the currently selected entry.|entry id or empty|
|markEntrySelected|Make an entry show as selected, but do not send onEntrySelected event.|entry id|
|setInvalidMark|Make an ITM entry invalid \(show the delete button\).|entry id|
|changeEntryProperty|Change entry run-time property, such as hasNew or invalid|entry id, propertyKey\('hasNew','invalid'\), value\(true,false\)|
|setActionStatusValue|Set action bubble status for an ITM entry that can have more than one status. For example, for a Sametime chat action, the entry shows the person's Sametime awareness. Currently unused.|entry id, action type, status|

## fetchEntries {#reference_qgx_t14_hbb}

Use this function to get a set of entries of a specified type.

Usage: `itmRef.fetchEntries(entryType)`

entryType can be any of the following string values.

-   favorites
-   suggestions
-   custom Entries

For each value, the function returns an array of entries of the specified type.

