# Optional features for custom sharing gadgets {#optionalfeaturesforsharinggadgets .reference}

Add features to your gadgets for interacting with the **Share** dialog.

## Constants { .section}

These features are available for all open social sharebox gadgets and used by Files Sharebox Gadget, Status Update Sharebox Gadget, and third party gadgets.

|Name|Description|
|----|-----------|
|`MessageTypeParam.ERROR`

|Display message with Error styling as defined by the One UI standard.

|
|`MessageTypeParam.SUCCESS`

|Display message with Success styling as defined by the One UI standard.

|
|`MessageTypeParam.WARNING`

|Display message with Warning styling as defined by the One UI standard.

|

## Methods { .section}

|Method Signature and Example|Description|
|----------------------------|-----------|
|close\(\)

Example:

```
ibm.connections.sharedialog.close();
```

|This call tells the share dialog to close. This impacts all gadgets in the share dialog that have registered a close listener.

|
|displayMainPageMessage\(messageType, message\)

Example:

```
ibm.connections.sharedialog.displayMainPageMessag(
ibm.connections.sharedialog.MessageTypeParam.SUCCESS,
"The message was successfully posted.");
```

|This call specifies that a message be displayed outside of the Share dialog.

Message types to display are of the following format:

```
ibm.connections.sharedialog.MessageTypeParam.SUCCESS
ibm.connections.sharedialog.MessageTypeParam.INFO
ibm.connections.sharedialog.MessageTypeParam.ERROR message
```

|
|registerCloseListener\(listenerFunc\)

Example:

```
ibm.connections.sharedialog.registerCloseListener(function(){
   //Clear gadget contents
});
```

|This call registers the functions to be called when the Share dialog is about to close. Specify the logic to return the gadget to the default state in the function registered.

|
|onActivityEntryAddition\(itemId\)

Example:

```
ibm.connections.sharedialog.onActivityEntryAddition("d0bd18eb-b55c-46e3-b116-2a77c4344b44");
```

|This call indicates that a performed task will result in an activity entry of the specified item ID.

This enables the activity stream to refresh because there is potentially a new activity entry to display.

|
|setDirty\(actionId, isDirty\)

Example:

```
ibm.connections.sharedialog.setDirty("actionId", true);
ibm.connections.sharedialog.setDirty("actionId", false);
```

|The gadget calls this when the dirty state has changed.

The actionId corresponds to the tab that is dirty.

Set to true when data has been entered in one or more fields in the gadget. Set to false when no changes from the user exist in the gadget.

**Note:** If the gadget dirty state is true, when a user tries to close the Share dialog by using means outside of the dirty gadget, they are prompted to confirm the current action and lose changes.

|
|setSubmitState\(inProgress\)

Example:

```
ibm.connections.sharedialog.setSubmitState(true);
ibm.connections.sharedialog.setSubmitState(false);
```

|Gadget calls the share dialog whether or not the gadget is in a submit state. This is needed if the gadget can prevent the user from switching tabs while a submission is in process.

Set to true when the item in the submission state. Set to false when the item is not in the submit state.

**Note:** If set to true, then the user cannot switch to a different gadget tab.

|

**Parent topic:**[Adding new ways to share content](../customize/t_customize_sharebox_gadgets.md)

**Related information**  


[Adding new ways to share content](../customize/t_customize_sharebox_gadgets.md)

