# Template data model {#r_admin_profiles_ovr_types .reference}

Learn about the data made available for use by your customization templates.

## Configuration data { .section}

The following data is provided as input to your customization templates. Use this data to build custom logic to meet your business needs with the FreeMarker Templating Language \(FTL\).

As a part of template processing, it is important to understand how the Profiles application is configured. The following elements are always provided as input to the template processor:

|Field|Type|Description|
|-----|----|-----------|
|`config.sametime.enabled`

|boolean

|Set to TRUE if Sametime awareness is enabled.

|
|`config.sametime.href`

|string

|Specify the HREF value if Sametime awareness is enabled.

|
|`config.sametime.sslHref`

|string

|Specify the SSL HREF value if Sametime awareness is enabled.

|
|`config.sametime.inputType`

|string

|Specify the needed input type value if Sametime awareness is enabled.

|
|`config.exposeEmail`

|boolean

|Set to TRUE if email address is allowed in the user interface.

|

## Globalization data { .section}

To support strings in various languages, the template data model includes the ability to look up strings from a resource bundle by key. Macros are also provided to simplify interaction with data for globalization.

|Field|Type|Description|
|-----|----|-----------|
|`nls.template.<nlsKey>`

|string

|Defines the look-up string from the default templates resource bundle using the specified nlsKey value.

|
|`nls.<nlsBundleId>.<nlsKey>`

|string

|Defines the look-up string from a custom globalization bundle ID using the specified nlsKey value.

|

## Request data fields { .section}

Use these fields if your user interface templates must build URLs to other resources, or must perform specific processing that is based on the incoming request.

|Field|Type|Description|
|-----|----|-----------|
|`request.contextPath`

|String

|Specifies the application context path.

|
|`request.path`

|String

|Specifies the application context path.

|
|`request.query.<queryParameter>`

|Map

|Specifies the map that contains all of the query parameters and their values from the incoming request.

|
|`request.lang`

|String

|Specifies the language of the incoming request.

|

## Profile-type definition fields { .section}

Use these fields to indicate whether a field exists in the profile data model definition. The profile-type definition of the profile to be rendered is provided to the template as input data.

|Field|Type|Description|
|-----|----|-----------|
|`profileType.<ref>.isExtension`

|Boolean

|Specify as TRUE if the property is an extension property.

|
|`profileType.<ref>.isHidden`

|Boolean

|Specify as TRUE if the property is hidden.

|
|`profileType.<ref>.isRichText`

|Boolean

|Specify as TRUE if the property is rich text.

|
|`profileType.<ref>.updatability`

|Enum \(String\)

|Specify as READ if the value is read-only or READWRITE if the value is editable.

|

For example, use either of the following statements to reference information for the `experience` profile-type definition:

```
profileType.experience.isExtension
profileType[experience].isExtension
```

## Associated data fields { .section}

When you are rendering a profile, you might want to show extra related data. This data is provided based on which fields are populated in the profile record. All associated data is stored in a data map container relative to a root FreeMarker Template model. It is further grouped based on the underlying associated field as follows, where dataId is the data container identifier, and dataKey is the container value:

```
data.<dataId>.<dataKey>
```

Use the following if the profile-type contains the secretaryUid property and the profile has a populated value:

|Field|Type|Description|
|-----|----|-----------|
|`data.manager.secretaryName`

|String

|Specifies the name of the secretary.

|
|`data.manager.secretaryEmail`

|String

|Specifies the email address of the secretary.

|
|`data.manager.secretaryKey`

|String

|Specifies the internal key of the secretary.

|
|`data.manager.secretaryUid`

|String

|Specifies the unique identifier of the secretary.

|
|`data.manager.secretaryUserid`

|String

|Specifies the user identifier of the secretary.

|

Use the following if the profile-type contains the managerUid property and the profile has a populated value:

|Field|Type|Description|
|-----|----|-----------|
|`data.secretary.managerName`

|String

|Specifies the name of the manager.

|
|`data.secretary.managerEmail`

|String

|Specifies the email address of the manager.

|
|`data.secretary.managerKey`

|String

|Specifies the internal key of the manager.

|
|`data.secretary.managerUid`

|String

|Specifies the unique identifier of the manager.

|
|`data.secretary.managerUserid`

|String

|Specifies the user identifier of the manager.

|

Use the following if the profile-type contains the workLocationCode property and the profile has a populated value:

|Field|Type|Description|
|-----|----|-----------|
|`data.workLocation.address1`

|String

|Specifies the first line of address.

|
|`data.workLocation.address2`

|String

|Specifies the second line of address.

|
|`data.workLocation.city`

|String

|Specifies the city.

|
|`data.workLocation.state`

|String

|Specifies the state.

|
|`data.workLocation.postalCode`

|String

|Specifies the postal code.

|

Use the following if the profile-type contains the countryCode property and the profile has a populated value:

|Field|Type|Description|
|-----|----|-----------|
|`data.country.countryDisplayValue`

|String

|Specifies the country name.

|

Use the following if the profile-type contains the deptNumber property and the profile has a populated value:

|Field|Type|Description|
|-----|----|-----------|
|`data.department.departmentTitle`

|String

|Specifies the department name.

|

Use the following if the profile-type contains the employeeNumber property and the profile has a populated value:

|Field|Type|Description|
|-----|----|-----------|
|`data.employeeType.employeeTypeDesc`

|String

|Specifies the employee type.

|

Use the following if the profile-type contains the orgID property and the profile has a populated value:

|Field|Type|Description|
|-----|----|-----------|
|`data.organization.organizationTitle`

|String

|Specifies the organization name.

|

## Profile data fields { .section}

Fields that are associated with the profile object are stored in a profile map container relative to the FreeMarker Template model root.

|Field|Type|Description|
|-----|----|-----------|
|`profile.<ref>`

|Literal

|Fetches the value of a standard profile field using the property ref that is declared in the associated profile-type definition.

|
|`profile.extension.<ref>`

|String

|Fetches the value of an extension field using the property ref declared in the associated profile-type definition.

Extension fields of type XML are not made available for use in the presentation templates.

|

For example, either of the following statements are valid when referencing the value of the `experience` field on a profile:

```
profile.experience
profile[experience]
```

For example, either of the following statements are valid when referencing the value of the extension field `hobbies` on a profile:

```
profile.extension.hobbies
profile.extension[hobbies]
```

## Display fields based on connection status { .section}

When rendering business card and profile data templates, it is possible to determine the network connection status between the user that views the profile and the profile that is viewed. You can then use the network relationship to selectively filter attributes from the user interface.

|Field|Type|Description|
|-----|----|-----------|
|`connection.status`

|String

|Determines the status of the connection between the viewer and target profile with the following options:

-   accepted
-   pending
-   unconfirmed

|

The connection status is available when rendering the content on the main profile page. Follow these steps to make the connection status information available when rendering the business card.

1.  Open the profiles-config.xml file using a text editor.
2.  Locate the `<template/>` element for businessCardInfo.
3.  Modify the `<templateDataModel/>` to include the following statement:

    ```
    <templateData>connection</templateData>
    ```

4.  Save your changes.
5.  Check in your configuration file update.
6.  Restart the server.

## Display fields based on user status { .section}

Information is made available to the templates to drive behavior based on the current user viewing the profile to be rendered. Use the following fields to determine the current user and build dynamic behavior.

|Field|Type|Description|
|-----|----|-----------|
|`currentUser.authenticated`

|Boolean

|Specify as TRUE if the current user is authenticated.

|
|`currentUser.key`

|String

|Specifies the internal key of the user viewing the application. This value is only supplied if the user is authenticated.|

**Parent topic:**[Customizing the Profiles user interface](../customize/t_profiles_customizing_attributes.md)

