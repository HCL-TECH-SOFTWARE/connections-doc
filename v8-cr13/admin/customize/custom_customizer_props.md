# Customizer-specific properties {#custom_customizer_props .concept}

The match and include-file properties are specific to Connections Customizer apps. Learn how you can use them to specify which users are affected by the app, and what modifications are made to the display.

## Understanding the match and include-file properties { .section}

In addition to the properties supported by all applications and extensions, Connections Customizer provides the match and include-files properties. These properties appear in the Payload field of the Customizer app; the match properties specify which users will receive the modifications to their UI, and the include-files property specifies the files that will be injected into the returned Connections page to perform those modifications. Table 1 explains how the properties are used and provides examples.

|Include this field|To describe this aspect|Example|
|------------------|-----------------------|-------|
|match: url|A regular expression that is compared with the URL in the response to determine whether the modification should be applied. This provides a more fine-grained target than the path property by allowing you to apply your modification to specific pages with the component referred to in the path property. For more information, see the section on Refining the URL used in the "path"property later in this topic.|```"match": {"url": "followedcommunities" }```|
|match: user-name|String used to identify one or more users as the target for the customization. Not that user names are not guaranteed to be unique within an organization. To ensure a unique match, specify the user-id.|```"match": { "user-name":[ "Samantha Darryn", "Sam Curman" ] }```|
|match: user-id|String used to identify one or more users based on subscriber ID. This property value is unique within an organization.The term "user ID" is sometimes referred to as "subscriber ID" in the Connections documentation.|```"match": { "user-id": [ "20071635", "20071656" ] <br><br> }```|
|match: user-email|String used to identify one or more users as the target for the customization. This property is unique within an organization.|```"match": { "user-email":\[ "Samantha.Darryn@renovations.com", "Sam.Curman@renovations.com" ] <br><br> }```|
|include-files|List of files to be inserted into the response for a matched page request. For more information, see the section on Managing file resources used in the "include-files" property later in this topic.|```"include-files": \[ "flipCard/commListCardsFlipStyle.user.js" ]```|

**Note:** These are the only payload properties that are specific to Connections Customizer; your Customizer app can also use the general properties supported in Connections apps and extensions.

-   **[Using "match: url" to refine the "path" property](../customize/custom_customizer_props_match_url.md)**  
You can refine the extension's path property to target a specific portion of a component's display for customization.
-   **[Managing file resources used in the "include-files" property](../customize/custom_customizer_props_include_files.md)**  
The include-files payload property lists one or more files to be inserted into the response so that the display is modified when it is returned to the HCL Connections™ user.

**Parent topic:** [Creating a Connections Customizer app](../customize/custom_customizer_create_app.md)

