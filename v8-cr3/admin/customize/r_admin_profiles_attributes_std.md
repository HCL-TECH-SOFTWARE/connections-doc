# Standard properties in the data model {#r_admin_profiles_attributes_std .reference}

The Profiles component defines a set of standard properties to support common organization directory needs.

## Standard properties { .section}

Property information is presented in the following table as:

-   Label – The information represented by the property, if a compound set of values are represented then all are listed
-   Property – The property syntax as it would appear in the profile type configuration
-   Editable – Indicates if the property can support editing by the end user in the user interface; TRUE = yes, FALSE = no
-   Full text indexed - Indicates if the property supports inclusion in the search index; TRUE = yes, FALSE = no

|Label|Property|Editable|Full text indexed|
|-----|--------|--------|-----------------|
|Address 1 <br><br> Address 2 <br><br> City <br><br> State <br><br> Postal code|`workLocationCode`|FALSE|TRUE|
|Assistant number <br><br> Assistant name <br><br> Assistant email|`secretaryUid`|TRUE|TRUE|
|Country code <br><br> Country|`countryCode`|TRUE|TRUE|
|Department number <br><br> Department title|`deptNumber`|TRUE|TRUE|
|Employee number|`employeeNumber`|TRUE|TRUE|
|Employee type|`employeeTypeCode`|FALSE|TRUE|
|Is Manager|`isManager`|FALSE|TRUE|
|Job title|`jobResp`|TRUE|TRUE|
|Manager number|`managerUid`|FALSE|TRUE|
|Organization|`orgId`|FALSE|TRUE|
|Shift|`shift`|TRUE|TRUE|

The attributes assistant number, country code, and department number are editable. The assistant name,assistant email, country, and department title are resolved from the associated value.

|Label|Property|Editable|Full text indexed|
|-----|--------|--------|-----------------|
|Alternate email|`groupwareEmail`|TRUE|TRUE|
|Alternate last name|`alternateLastname`|TRUE|TRUE|
|Building|`bldgId`|TRUE|TRUE|
|Calendar link|`calendarUrl`|TRUE|TRUE|
|Courtesy title|`courtesyTitle`|TRUE|TRUE|
|Fax number|`faxNumber`|TRUE|TRUE|
|Floor|`floor`|TRUE|TRUE|
|Free or busy time link|`freeBusyUrl`|TRUE|TRUE|
|IP telephony number|`ipTelephoneNumber`|TRUE|TRUE|
|Mobile number|`mobileNumber`|TRUE|TRUE|
|Name|`displayName`|FALSE|TRUE|
|Native first name|`nativeFirstName`|TRUE|TRUE|
|Native last name|`nativeLastName`|TRUE|TRUE|
|Office|`officeName`|TRUE|TRUE|
|Office email|`email`|TRUE|TRUE|
|Office number|`telephoneNumber`|TRUE|TRUE|
|Pager ID|`pagerId`|TRUE|TRUE|
|Pager number|`pagerNumber`|TRUE|TRUE|
|Pager service provider|`pagerServiceProvider`|TRUE|TRUE|
|Pager type|`pagerType`|TRUE|TRUE|
|Preferred first name|`preferredFirstName`|TRUE|TRUE|
|Preferred language|`preferredLanguage`|TRUE|TRUE|
|Preferred last name|`preferredLastName`|TRUE|TRUE|
|Time zone|`timezone`|TRUE|TRUE|
|None|`uid`|FALSE|FALSE|
|None|`guid`|FALSE|TRUE|
|None|`key`|FALSE|FALSE|
|None|`tenantKey`|FALSE|FALSE|
|None|`loginId`|FALSE|FALSE|
|None|`distinguishedName`|FALSE|FALSE|
|None|`givenName`|FALSE|TRUE|
|None|`surname`|FALSE|TRUE|
|None|`title`|FALSE|TRUE|
|None|`lastUpdate`|FALSE|FALSE|
|None|`profileType`|FALSE|TRUE|
|None|`sourceUrl`|FALSE|FALSE|
|None|`userid`|FALSE|FALSE|

|Label|Property|Editable|Full text indexed|
|-----|--------|--------|-----------------|
|About me|`description`|TRUE|TRUE|
|Background|`experience`|TRUE|TRUE|
|Blog link|`blogUrl`|TRUE|TRUE|

**Parent topic:** [Customizing the Profiles data model](../customize/r_admin_profiles_attributes.md)

**Related information**  


[Specifying properties to expose in the search index](../customize/t_admin_profiles_expose_props_search.md)

