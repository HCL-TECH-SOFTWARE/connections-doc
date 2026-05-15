# Worksheet for installing HCL Connections {#worksheetforinstallinglotusconnections .reference}

Record your installation and configuration data.

## Recording installation data { .section}

While installing and configuring HCL Connections™, it can be difficult to remember all the user IDs, passwords, server names, and other information that you need during and after installation. Print out and use this worksheet to record that data.

Refer to the [Detailed system requirements for HCL Connections](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) to find the latest, supported versions of software included in the following tables.

## LDAP server details { .section}

|LDAP data type|Details|
|--------------|-------|
|LDAP server type and version| |
|Primary host name <br></br>For example: domino\_ldap.example.com| |
|Port For example: 389| |
|Bind distinguished name <br></br>For example: cn=lcadmin,ou=People,dc=example,dc=com| |
|Bind password| |
|Certificate mapping| |
|Certificate filter| |
|Login attribute For example: mail or uid| |

## WebSphere® Application Server details { .section}

|WebSphere Application Server item|Details|
|---------------------------------|-------|
|WebSphere Application Server version| |
|Installation location <br></br>For example: C:\\IBM\\WebSphere\\AppServer| |
|Update installer location For example: C:\\IBM\\WebSphere\\UpdateInstaller| |
|Administrator ID For example: wsadmin| |
|Administrator password| |
|WebSphere Application Server URL <br></br>For example: http://was.example.com:9060/ibm/console| |
|WebSphere Application Server secure URL <br></br>For example: https://was.example.com:9043/ibm/console| |
|WebSphere Application Server host name| |
|HTTP transport port| |
|HTTPS transport port| |
|SOAP connector port| |
|Run application server as a service? \(True/False\)| |

## Database details { .section}

|Database item|Details|
|-------------|-------|
|Database type and version| |
|Database instance or service name| |
|Database server host name For example: database.example.com| |
|Port The default values are: DB2=50000; Oracle=1433; MS SQL Server=1523.| |
|JDBC driver fully qualified file path For example: C:\\IBM\\SQLLIB| |
|Database client name and version For example: Microsoft SQL Server Native Client 11.0| |
|Database client user ID The default is db2admin.| |
|Database client user password| |
|DB2® administrators group \(Windows™ only\) The default is DB2ADMNS.| |
|DB2 users group \(Windows only\) The default is DB2USERS.| |
|Activities database server host name| |
|Activities database server port number| |
|Activities database name. The default name is OPNACT.| |
|Activities database application user ID| |
|Activities database application user password| |
|Blogs database server host name| |
|Blogs database server port number| |
|Blogs database name. The default name is BLOGS.| |
|Blogs database application user ID| |
|Blogs database application user password| |
|Communities database server host name| |
|Communities database server port number| |
|Communities database name The default name is SNCOMM.| |
|Communities database application user ID| |
|Communities database application user password| |
|Dogear database server host name| |
|Dogear database server port number| |
|Dogear database name. The default name is DOGEAR.| |
|Dogear database application user ID| |
|Dogear database application user password| |
|Files database server host name| |
|Files database server port number| |
|Files database name. The default name is FILES.| |
|Files database application user ID| |
|Files database application user password| |
|Forums database server host name| |
|Forums database server port number| |
|Forums database name. The default name is FORUM.| |
|Forums database application user ID| |
|Forums database application user password| |
|Home page database server host name| |
|Home page database server port number| |
|Home page database name. The default name is HOMEPAGE.| |
|Home page database application user ID| |
|Home page database application user password| |
|Metrics database server host name| |
|Metrics database server port number| |
|Metrics database name. The default name is METRICS.| |
|Metrics database application user ID| |
|Metrics database application user password| |
|Mobile database server host name| |
|Mobile database server port number| |
|Mobile database name. The default name is MOBILE.| |
|Mobile database application user ID| |
|Mobile database application user password| |
|Profiles database server host name| |
|Profiles database server port number| |
|Profiles database name. The default name is PEOPLEDB.| |
|Profiles database application user ID| |
|Profiles database application user password| |
|Push Notification database \(PNS\)| |
|Wikis database server host name| |
|Wikis database server port number| |
|Wikis database name. The default name is WIKIS.| |
|Wikis database application user ID| |
|Wikis database application user password| |

## Security Directory Integrator details { .section}

|Security Directory Integrator item|Details|
|----------------------------------|-------|
|Security Directory Integrator installation location For example: C:\\IBM\\TDI\\| |
|Security Directory Integrator version| |
|Solutions Directory path For example: C:\\IBM\\TDISOL\\TDI| |

## LDAP-Profiles mapping details { .section}

**Note:** This table is derived from the map\_dbrepos\_from\_source.properties file.

|Profiles database attribute|LDAP attribute \(example\)|Profiles database column|
|---------------------------|--------------------------|------------------------|
|alternateLastname|null|PROF\_ALTERNATE\_LAST\_NAME|
|bldgId|null|PROF\_BUILDING\_IDENTIFIER|
|blogUrl|null|PROF\_BLOG\_URL|
|calendarUrl|null|PROF\_CALENDAR\_URL|
|countryCode|c|PROF\_ISO\_COUNTRY\_CODE|
|courtesyTitle|null|PROF\_COURTESY\_TITLE|
|deptNumber|null|PROF\_DEPARTMENT\_NUMBER|
|description|description|PROF\_DESCRIPTION|
|displayName|cn|PROF\_DISPLAY\_NAME|
|distinguishedName|$dn|PROF\_SOURCE\_UID|
|email|mail|PROF\_MAIL|
|employeeNumber|employeenumber|PROF\_EMPLOYEE\_NUMBER|
|employeeTypeCode|employeetype|PROF\_EMPLOYEE\_TYPE|
|experience|null|PROF\_EXPERIENCE|
|faxNumber|facsimiletelephonenumber|PROF\_FAX\_TELEPHONE\_NUMBER|
|floor|null|PROF\_FLOOR|
|freeBusyUrl|null|PROF\_FREEBUSY\_URL|
|givenName|givenName|PROF\_GIVEN\_NAME|
|givenNames|givenName| |
|groupwareEmail|null|PROF\_GROUPWARE\_EMAIL|
|guid|\(Javascript function: \{func\_map\_from\_GUID\}\)|PROF\_GUID|
|ipTelephoneNumber|null|PROF\_IP\_TELEPHONE\_NUMBER|
|isManager|null|PROF\_IS\_MANAGER|
|jobResp|null|PROF\_JOBRESPONSIBILITIES|
|loginId|employeenumber|PROF\_LOGIN and PROF\_LOGIN\_LOWER|
|logins|mail|PROF\_LOGIN|
|managerUid|$manager\_uid<br>**Note:** This attribute represents a lookup of the UID of a manager using DN in the manager field.|PROF\_MANAGER\_UID|
|mobileNumber|mobile|PROF\_MOBILE|
|nativeFirstName|null|PROF\_NATIVE\_FIRST\_NAME|
|nativeLastName|null|PROF\_NATIVE\_LAST\_NAME|
|officeName|physicaldeliveryofficename|PROF\_PHYSICAL\_DELIVERY\_OFFICE|
|orgId|ou|PROF\_ORGANIZATION\_IDENTIFIER|
|pagerId|null|PROF\_PAGER\_ID|
|pagerNumber|null|PROF\_PAGER|
|pagerServiceProvider|null|PROF\_PAGER\_SERVICE\_PROVIDER|
|pagerType|null|PROF\_PAGER\_TYPE|
|preferredFirstName|null|PROF\_PREFERRED\_FIRST\_NAME|
|preferredLanguage|preferredlanguage|PROF\_PREFERRED\_LANGUAGE|
|preferredLastName|null|PROF\_PROF\_PREFERRED\_LAST\_NAME|
|profileType|null|PROF\_TYPE|
|secretaryUid|$secretaryUid<br>**Note:** This attribute represents a lookup of the UID of a secretary using DN in the secretary field. |PROF\_SECRETARY\_UID|
|shift|null|PROF\_SHIFT|
|surname|sn|PROF\_SURNAME|
|surnames|sn|PROF\_SURNAME|
|telephoneNumber|telephonenumber|PROF\_TELEPHONE\_NUMBER|
|timezone|null|PROF\_TIMEZONE|
|title|null|PROF\_TITLE|
|uid|\(Javascript function - \{func\_map\_to\_db\_UID\}\)|PROF\_UID|
|workLocationCode|postallocation|PROF\_WORK\_LOCATION|

## Connections details { .section}

|Connections item|Details|
|----------------|-------|
|Connections installation location, such as: C:\\IBM\\Connections| |
|Response file directory path. For example: C:\\IBM\\Connections\\InstallResponse.txt| |
|DNS host name, such as: connections.example.com| |
|Choose: DNS MX Records or Java™ Mail Session?| |
|DNS MX Records only: Local mail domain For example: example.com| |
|Java Mail Session only: DNS server name or SMTP relay host For example: dns.example.com; relayhost.example.com| |
|Domain name for Reply-to email address| |
|Suffix or prefix for Reply-to email address| |
|Server that receives Reply-to emails| |
|User name and password for that server| |
|Connections administrative user \(not connectionsAdmin user role, but admin user role for Blogs, Files, CCM, Wikis \)| |
|global moderator| |
|URL and ports for admin and user access<br>**Note:** You can look up the URLs for each application in the text files that the installation wizard generates. These files are located under the [`connections_root`](i_ovr_r_directory_conventions.md) directory.  | |
|Activities server name| |
|Activities cluster member name| |
|Activities URL For example: http://www.example.com:9080/activities| |
|Activities secure URL For example: https://www.example.com:9446/activities| |
|Activities statistics files directory path| |
|Activities content files directory path| |
|Blogs server name| |
|Blogs cluster member name| |
|Blogs URL For example: http://www.example.com:9080/blogs| |
|Blogs secure URL For example: https://www.example.com:9446/blogs| |
|Blogs upload files directory path| |
|Bookmarks server name| |
|Bookmarks cluster member name| |
|Bookmarks URL For example: http://www.example.com:9080/dogear| |
|Bookmarks secure URL For example: https://www.example.com:9446/dogear| |
|Bookmarks favicon files directory path| |
|Communities server name| |
|Communities cluster member name| |
|Communities URL For example: http://www.example.com:9080/communities| |
|Communities secure URL For example: https://www.example.com:9446/communities| |
|Communities statistics files directory path| |
|Communities discussion forum content directory path| |
|Files server name| |
|Files cluster member name| |
|Files URL For example: http://www.example.com:9080/files| |
|Files secure URL For example: https://www.example.com:9446/files| |
|Files content store directory path| |
|Forums server name| |
|Forums cluster member name| |
|Forums URL For example: http://www.example.com:9080/forums| |
|Forums secure URL For example: https://www.example.com:9446/forums| |
|Forums content store directory path| |
|Home page server name| |
|Home page cluster member name| |
|Home page URL For example: http://www.example.com:9080/homepage| |
|Home page secure URL For example: https://www.example.com:9446/homepage| |
|Home page content store directory path| |
|Metrics server name| |
|Metrics cluster member name| |
|Moderation server name| |
|Moderation cluster member name| |
|Moderation URL For example: http://www.example.com:9080/moderation| |
|Moderation secure URL For example: https://www.example.com:9446/moderation| |
|Profiles server name| |
|Profiles cluster member name| |
|Profiles URL For example: http://www.example.com:9080/profiles| |
|Profiles secure URL For example: https://www.example.com:9446/profiles| |
|Profiles statistics files directory path| |
|Profiles cache directory path| |
|Search server name| |
|Search cluster member name| |
|Search dictionary directory path| |
|Search index directory path| |
|Wikis server name| |
|Wikis cluster member name| |
|Wikis URL For example: http://www.example.com:9080/wikis| |
|Wikis secure URL For example: https://www.example.com:9446/wikis| |
|Wikis content directory path| |

## HTTP Server { .section}

|HTTP Server item|Details|
|----------------|-------|
|HTTP Server installation location For example: C:\\IBM\\HTTPServer\\| |
|HTTP Server version| |
|HTTP Server httpd.conf file directory path For example: C:\\IBM\\HTTPServer\\conf\\| |
|web server definition name For example: webserver1||
|web server plugin-cfg.xml file directory path For example: C:\\IBM\\HTTPServer\\Plugins\\config\\webserver1\\| |
|HTTP Server host name| |
|HTTP Server fully qualified host name| |
|HTTP Server IP address| |
|HTTP Server communication port For example: 80| |
|HTTP Server administration port For example: 8008| |
|Run HTTP Server as a service? \(Y/N\)| |
|Run HTTP administration as a service? \(Y/N\)| |
|HTTP Server administrator ID| |
|HTTP Server administrator password| |

**Parent topic:**[Planning](../plan/c_installation_overview.md)

**Related information**  


[Configuring notifications](../admin/t_admin_common_config_notification.md)

