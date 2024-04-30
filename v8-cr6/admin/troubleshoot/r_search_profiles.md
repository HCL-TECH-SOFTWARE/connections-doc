# How search works in HCL Connections profiles 

There are different ways to search for content in HCL Connections™ profiles.

## Searchable contents

All profiles content can be searched, regardless of whether the data is entered by the user or is obtained from external data sources such as LDAP. This includes the following profiles content:

-   All user profile data, for example, name, phone numbers, title, departments, and city. For a full list of available attributes, see [Searchable fields from the search user interface and API](#searchfield).
-   All extension attributes, including simple, rich text and XML extension attribute types.

    For XML attributes, the searchable contents can be defined and configured in the profiles-config.xml file. Refer to "Configure XML attributes" help for more details.

    The names of the links added in the Profiles Linkroll widget are searchable by default. But the URLs of the links are not searchable.

-   Tags for users

    All profile search queries are case insensitive. The user queries are converted to lowercase before querying the Profiles content.

    A search that contains only wildcard characters is not supported. Entering only '\*' or '%' wildcard characters return empty search results. For more information, see [Customizing Profiles](../customize/c_admin_profiles_customizing.md) and [Managing the Profiles search operation](../admin/t_admin_profiles_search.md)


## Two different search implementations internally { .section}

The following search types are supported:

<!---   Database search:

    The most common search in Profiles is to search users by their names. To ensure fast and dynamic searches for names, a special database schema and internal logic is used to optimize search for names. The following searches from the user interface use the database search:

    -   Search by Name from the **search** drop-down menu.
    -   Clicking a tag from a user's Profile page.
    -   Tag type-ahead, such as the hints of tags when user is creating a new tag
    **Note:** Some special notes for database searches:

    -   Because the database search is performed on the Profiles database directly, there is no delay for any new/updated/deleted data. For example, if a user's name is updated by the TDI scripts, then searching against the new name finds the user immediately. In the meantime, searching against the old name would not find the user.
    -   All user queries are appended with a wildcard at the end of each word. For example, if a user types a search term: "Amy Jones", this query would search for names like: `"amy% jones%"`.
    -   Inactive users are not included in database search results. To find inactive users, use the index searches and specifically select to include inactive users. For more information, see Index search in the next section.-->

- Index Search - Indexes are built for all profile contents for advanced searches. The profiles indexes are also used for social data analytic purposes.

    The following searches from the user interface use the index search:

    -   Search by Keyword from the search drop-down menu.
    -   Directory search with full options \(Advanced search\).
    -   Global/Common search for Profiles when you select **All Connections search** drop-down menu.
    -   Organization tag cloud on the Profiles Directory page.
    -   Clicking a tag from the Organization tag cloud
    -   Name type-ahead search from the Directory page without Full search options.
    **Note:** Special notes on index searches:

    -   The indexes are rebuilt on a scheduled basis \(every 15 minutes by default\), therefore expect a delay to find new contents/changes when you perform searches with index search.
    -   Other than those special fields related to names, all user queries are expected to be an exact match. <!--For example wildcards are not automatically appended to the search queries as is done in the database searches.-->
    -   Inactive users are not included in the search results for index searches. From the user interface with Full search options, check the **Include inactive users** checkbox to include inactive users in the search results. You cannot search for inactive users only.
-   Search APIs:

    All profile contents can be searched by profile search APIs.
    
    <!--When the name parameter is used in the search APIs, the database search is used; otherwise,--> The index search is used for the search APIs.

-   Organization tag cloud

    The organization tag cloud on the Profiles Directory page consists of the 50 most popular tags in the entire organization, which is based on the frequencies of tags. The number of tags in the organization tag cloud is not configurable. The organization tag cloud is built from the indexes, so there are delays in displaying new, popular tags. The organization tag cloud data is cached internally in the application. Expect a delay of up to 30 minutes when you update the display of new, popular tags in the organization tag cloud.


## Logic behind name search { .section}

Profiles data for names holds information only for a user's last name and first names. There is no specific data fields for middle name, therefore, there is no way to search users with their middle names. Due to the complexity of parsing the first name and last name from a user input, especially in consideration with international names, user queries are parsed in various forms:

-   Search query without a comma.

    The search queries are tokenized into words by using a space. Depending on the words, the search tries to account for all variations of first and last names to find the matches, some examples are as follows:

    -   For user input of a single word, such as 'david', search for users whose:
        -   First name starts with david

            or

        -   Last name is david
    -   For user input with two words, such as 'david jones', search for users whose:
        -   First name is: david and last name is: jones

            or

        -   First name is: david jones

            or

        -   Last name is: david jones
    -   User input with more words, such as david alex jones, would search for users whose:

        -   First name is: david and last name is alex jones

            or

        -   First name is: david alex and last name is jones

            or

        -   First name is: david alex jones

            or

        -   Last name is: david alex jones
        Search queries with more words follows similar logic to go through the variations of the first names and last names.

-   Search query with a comma

    The query before the comma is treated as a user's last name. The query after the comma is treated as the user's first name. There is no further parsing for more variations of first and last names.

-   Data on the names table

    <!--Internally, database searches for names are performed against two tables: `GIVEN_NAME` and `SURNAME`. These tables hold names and their alias. The data in these tables is used for search purposes only; they are not exposed in the user interface.**Note:** Database searches do not find matches resident in the `EMPLOYEE` table. For example, the Display Name from the `EMPLOYEE` table is not searched during a database search, even though **Display Name** is what you see in the user interface.-->

    Data in these two name tables is expressed in lowercase. During data population by using TDI or Administration APIs, the values are converted to lowercase for these tables. It is not recommended to directly insert or update content in these tables. If you are using the tables for testing purposes, make sure that contents entered are in lowercase. User queries are converted to lowercase when matching up with the values in the names table.

    Name aliases are created through an internal program for most of the common English first names. These name aliases are provided in the product in a binary file; there is no support for viewing or editing that file.


## Logic behind index searches { .section}

-   Special logic is associated with some special fields in the search form with Full options:
    -   Display name field

        <!--Using the same logic as in the database search for names--> The user input in the Display name field is broken down into all variations of first and last names. The difference in the index search is that matches are also found with the following more data fields on the `EMPLOYEE` table:

        ```
        displayName, surname, preferredFirstName, preferredLastName, 
        alternativeLastName, nativeFistName and nativeLastName. 
        ```

        Therefore, by using the same user input in the **Display Name** field, the index search returns more results <!--than the database search-->. A sample query string that is constructed for the index search with the user input as Amy Jones is as follows:

        ```
        ((((FIELD_PREFERRED_FIRST_NAME:"amy jones*" OR FIELD_NATIVE_FIRST_NAME:"amy jones*" 
        OR FIELD_GIVEN_NAME:"amy jones*") OR (FIELD_PREFERRED_FIRST_NAME:amy* OR FIELD_NATIVE_FIRST_NAME:amy* 
        OR FIELD_GIVEN_NAME:amy*)) AND ((FIELD_PREFERRED_LAST_NAME:"amy jones*" OR FIELD_ALTERNATE_LAST_NAME:"amy jones*" 
        OR FIELD_NATIVE_LAST_NAME:"amy jones*" OR FIELD_SURNAME:"amy jones*") OR (FIELD_PREFERRED_LAST_NAME:jones* 
        OR FIELD_ALTERNATE_LAST_NAME:jones* OR FIELD_NATIVE_LAST_NAME:jones* OR FIELD_SURNAME:jones*))) 
        OR FIELD_DISPLAY_NAME:"amy jones*")
        ```

    -   First name field

        The query string is used to match the `preferredFirstName`, `nativeFirstName` and `givenName` data fields. A sample query string that is constructed for the index search with the user input as Amy is as follows:

        ```
        (FIELD_PREFERRED_FIRST_NAME:amy OR FIELD_NATIVE_FIRST_NAME:
        amy OR FIELD_GIVEN_NAME:amy)
        ```

    -   Last name field

        The query string is used to match the `preferredLastName`, `alternativeLastName`, `nativeLastName` and `surname` data fields. A sample query string that is constructed for the index search with the user input as Jones is as follows:

        ```
        (FIELD_PREFERRED_LAST_NAME:Jones OR FIELD_ALTERNATE_LAST_NAME:
        Jones OR FIELD_NATIVE_LAST_NAME: Jones OR FIELD_SURNAME:Jones) 
        ```

    -   Phone number field

        Several format variations are available for what users can enter for phone number searches:

        -   A phone number query can be entered with or without '-' or '.'. For example, user input such as 1234567890 or 123.456.7890 find users with the phone number record 123-456-7890.
        -   A phone number query can be entered with a mixture of numbers and letters. For example, user input such as 1-800-HCL-HELP could find users with the phone number record 1-800-426-4357.
        -   A phone number query can omit the leading 1. For example, user input such as 123-456-7890 finds users with the phone number record 1-123-456-7890.

            **Note:** The leading international phone prefix 011 must be specified to match users with phone number records that contain the leading 011 characters

        -   A phone number that is entered in the user interface search form with the full search options searches all available phone number fields, such as `mobileNumber`, `ipTelephoneNumber`, and `faxNumber`.
-   Search by keywords

    Users can enter keywords from the search drop-down menu in the **Search by keyword**, or **Keyword** fields in the Directory search page with the Full search options. The keyword search field is the only field for which search operators can be used for composing complex search queries. That means that special terms and characters are reserved for search operators. For example, terms like AND, OR, NOT, and characters like: +, -, ~, :, are reserved. Double quotes are required to include those special terms and characters if they are not intended to be search operators. Refer to external Lucene syntax sites and documentation for details about using search operators.

    **Note:** The "Search by keyword" function is performed against all indexed contents.

-   The logical operation among the fields that are entered in the Directory search with full options form is AND.

## Searchable fields from the search user interface and API {#searchfield .section}

The following fields are indexed and made searchable using either the user interface or API. The first values are the actual field values in the indexes.

```
groupwareEmail=FIELD_GROUPWARE_EMAIL, 
shift=FIELD_SHIFT,
profileType=FIELD_PROFILE_TYPE, 
pagerServiceProvider=FIELD_PAGER_SERVICE_PROVIDER,
nativeFirstName=FIELD_NATIVE_FIRST_NAME, 
countryDisplayValue=FIELD_COUNTRY,
workLocation.state=FIELD_STATE, 
name=FIELD_DISPLAY_NAME,
mobileNumber=FIELD_MOBILE, 
floor=FIELD_FLOOR,
profileLinks=FIELD_EXTATTR_PROFILELINKS, 
state=FIELD_STATE,
employeeTypeCode=FIELD_EMPLOYEE_TYPE, 
country=FIELD_COUNTRY,
employeeNumber=FIELD_EMPLOYEE_NUMBER, 
courtesyTitle=FIELD_COURTESY_TITLE,
jobTitle=FIELD_JOB_RESPONSIBILITIES, 
email=FIELD_MAIL,
pagerType=FIELD_PAGER_TYPE, 
orgId=FIELD_ORGANIZATION_IDENTIFIER,
countryCode=FIELD_ISO_COUNTRY_CODE, 
isManager=FIELD_IS_MANAGER,
departmentTitle=FIELD_DEPARTMENT_TITLE, 
givenName=FIELD_GIVEN_NAME,
jobResp=FIELD_JOB_RESPONSIBILITIES, 
organization=FIELD_ORGANIZATION_TITLE,
alternateLastname=FIELD_ALTERNATE_LAST_NAME, 
pagerId=FIELD_PAGER_ID,
workLocation.address1=FIELD_WORK_LOCATION, 
faxNumber=FIELD_FAX_TELEPHONE_NUMBER,
ipTelephoneNumber=FIELD_IP_TELEPHONE_NUMBER,
workLocation.address2=FIELD_WORK_LOCATION, 
bldgId=FIELD_BUILDING_IDENTIFIER,
spoken_Lang=FIELD_EXTATTR_SPOKEN_LANG, 
department=FIELD_DEPARTMENT_TITLE,
tenantKey=FIELD_TENANT_KEY, 
phoneNumber=FIELD_TELEPHONE_NUMBER,
title=FIELD_TITLE, 
preferredFirstName=FIELD_PREFERRED_FIRST_NAME,
surname=FIELD_SURNAME, profileTags=FIELD_TAG,
preferredLastName=FIELD_PREFERRED_LAST_NAME, 
managerUid=FIELD_MANAGER_UID,
organizationTitle=FIELD_ORGANIZATION_TITLE,
officeName=FIELD_PHYSICAL_DELIVERY_OFFICE, 
experience=FIELD_EXPERIENCE,
city=FIELD_CITY, pagerNumber=FIELD_PAGER,
workLocation.address=FIELD_WORK_LOCATION, 
displayName=FIELD_DISPLAY_NAME,
telephoneNumber=FIELD_TELEPHONE_NUMBER, 
activeUsersOnly=FIELD_USER_STATE,
deptNumber=FIELD_DEPARTMENT_NUMBER, 
workLocation.city=FIELD_CITY,
address=FIELD_WORK_LOCATION, 
secretaryUid=FIELD_SECRETARY_UID,
nativeLastName=FIELD_NATIVE_LAST_NAME, 
timezone=FIELD_TIMEZONE,
preferredLanguage=FIELD_PREFERRED_LANGUAGE, 
description=FIELD_ABOUT_ME
```

For extension attributes, use the expression that is defined in the profiles-config.xml file. For example, if you defined some extension attributes in profiles-config.xml as shown, then you can search by using the field names as defined in the profiles-config.xml and by using the following format:

```
spokenLanguages=FIELD_EXTATTR_SPOKENLANGUAGES,
school=FIELD_EXTATTR_SCHOOL,
hobby=FIELD_EXTATTR_HOBBY,
lifestory=FIELD_EXTATTR_LIFESTORY,
```

## Consideration for Accent Characters { .section}

Names in various international locales might have accent characters. You might want to allow the users to search for names with the accent characters without having to type in the accents. One common support to consider is to support searches with the exact accents and searches completely without accents. To support such searches, a version of the names without the accent characters must be available in the name tables. Special TDI scripts can be used to strip off the accent characters from the names during initial population or subsequent updates of the names with the data sources.

There is no solution to support inputs for a mixture of accents and without accents. So users must either enter a search query exactly how the names are expressed \(with the correct accent characters\) or enter a search query completely without accents.

## Available search configurations { .section}

Search configurations are as follows:

-   Search results configuration

    Search results are displayed using a template. For more information, see [Managing the Profiles search operation](../admin/t_admin_profiles_search.md).

-   Search user interface form configuration

    The form for Directory search with full options is configurable. For more information, see [Customizing Profiles search](../customize/c_admin_profiles_customizing.md).

-   General search configuration:
    -   Search on first name
    -   Default for search results display order

## Troubleshooting { .section}

Typical questions and problems. What to check:

-   Why is search returning users whose names do not seem to match the name search query?

    When performing searches by name, searches are against the `GIVEN_NAME` and `SURNAME` table, you can either run some simple SQL to check whether the searched names are in these tables or you can run the following elaborate SQL to see whether there are any hits when searching a name such as Amy Jones

    ```
    :with key_list as ( ( (select PROF_KEY from (SELECT PROF_KEY FROM EMPINST.SURNAME 
    WHERE (EMPINST.SURNAME.PROF_SURNAME LIKE 'jones%' escape '*') AND PROF_USRSTATE = 0 ) 
    SN where PROF_KEY in (SELECT PROF_KEY FROM EMPINST.GIVEN_NAME WHERE ( EMPINST.GIVEN_NAME.PROF_GIVENNAME 
    LIKE 'amy%' escape '*' ) AND PROF_USRSTATE = 0 ) ) UNION ALL (select PROF_KEY from 
    (SELECT PROF_KEY FROM EMPINST.SURNAME WHERE ( EMPINST.SURNAME.PROF_SURNAME LIKE 'amy%' escape '*' ) 
    AND PROF_USRSTATE = 0 ) SN where PROF_KEY in (SELECT PROF_KEY FROM EMPINST.GIVEN_NAME WHERE 
    ( EMPINST.GIVEN_NAME.PROF_GIVENNAME LIKE 'jones%' escape '*' ) AND PROF_USRSTATE = 0 )) UNION ALL 
    (SELECT PROF_KEY FROM EMPINST.SURNAME WHERE EMPINST.SURNAME.PROF_SURNAME LIKE 'amy jones%' escape '*' 
    AND PROF_USRSTATE = 0 ) UNION ALL (SELECT PROF_KEY FROM EMPINST.GIVEN_NAME WHERE 
    EMPINST.GIVEN_NAME.PROF_GIVENNAME LIKE 'amy jones%' escape '*' AND PROF_USRSTATE = 0 ) )) 
    select distinct key_list.PROF_KEY from key_list fetch first 250 rows only optimize for 250 rows;
    ```

-   Why does the page user interface indicate that there are more results than are displayed?

    In index search, this situation happens when the search indexes are not synchronized with the Profiles database. Search indexes holds user records that are no longer available in Profiles database. In this case, rebuild the Profiles indexes.

<!--This situation could happen for both database search and index search: In the case of a database search, such issues happen because there are orphans in the GIVEN\_NAME or SURNAME tables. A record in those tables is considered an orphan if the PROF\_KEY value in the record cannot be found in the EMPLOYEE table. The following SQLs can be used to find out whether there are such orphans:SELECT * FROM EMPINST.GIVEN_NAME where PROF_KEY not in (select PROF_KEY from EMPINST.EMPLOYEE);SELECT * FROM EMPINST.SURNAME where PROF_KEY not in (select PROF_KEY from EMPINST.EMPLOYEE);-->

-   The Search indexing is not building.

    This might happen for a number of reasons. Take the following measures:

    -   Esure that Profiles seedlist servlet is functioning. From a browser, open the seedlist URL by using the following format as a guide:

        ```
        http://the_profiles_server/profiles/seedlist/myserver
        ```

        Ensure that you see the correct seedlist feed, with a default 100 records;

    -   Check whether there are any errors in both the Profiles server logs and Search server logs
    -   Enable detailed tracing for the Profiles seedlist on the Profiles server by using the following setting:

        ```
        com.ibm.connections.profiles.seedlist.*=all 
        ```

    -   The organization tag cloud is not displaying tags

        The organization tag cloud display can experience delays after initial indexing. Typical items to check are as follows:

        -   Index search is working in Profiles, in particular you can search tags from the Directory search with full options.
        -   Look for any errors whether the organization tag cloud cache is built.
    -   Clicking a tag in the organization tag cloud returns different results then clicking a tag from a user's profile.

        Clicking a tag from the organization tag cloud uses index search, and there is a delay for the new tags are indexed. <!--However, clicking a tag from a user's profile performs a database search, and there are no delays.--> You should not see newly added tags from the organization tag cloud, or users who are newly tagged with a tag in the search results.

-   Typing into the Display name with the "Full search options" on the Directory page returns different results than using the same query with "Search profiles by name."

    This situation is expected because the search from the Directory page with "Full search options" searches more fields <!--than the database search for names-->.


## Trace settings { .section}

Trace setting to apply for more details:

```
com.ibm.lconn.profiles.internal.service.SearchServiceImpl=all
```

Look for outputs like:

```
[2/16/12 11:16:47:125 EST] 00000087 SearchService 2 
com.ibm.lconn.profiles.internal.service.SearchServiceImpl trace 
Entering getTagListForSearchResultsOnKeyword method, userQuery = 
(FIELD_PREFERRED_FIRST_NAME:amy OR FIELD_NATIVE_FIRST_NAME:amy 
OR FIELD_GIVEN_NAME:amy), pageNum = 1
```

**Parent topic:**[Troubleshooting Search FAQs](../troubleshoot/r_ts_search_faqs.md)

**Related information**  


[Managing the Profiles search operation](../admin/t_admin_profiles_search.md)

