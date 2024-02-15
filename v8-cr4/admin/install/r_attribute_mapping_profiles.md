# Attribute mapping for Profiles {#attributemappingforprofiles .reference}

When the Profiles directory service is enabled, IBM® Connections relies on the Profiles database to provide user data such as user name, ID, and email.

## Attribute mapping and population functions { .section}

The internal name of the Profiles database is PEOPLEDB.

## Data tables { .section}

The following table shows the mapping relationships between Profiles, the Profiles directory service, Virtual Member Manager, and LDAP.

|Profiles database column|Profiles Directory Service|Virtual Member Manager|LDAP|
|------------------------|--------------------------|----------------------|----|
|PROF\_GUID|ID|uniqueId|UUID/GUID/UNID \(defined in RFC4122\)|
|PROF\_DISPLAY\_NAME|Name|cn/displayName|cn/displayName|
|PROF\_MAIL|Mail|mail/ibm-primaryEmail|mail/ibm-primaryEmail|
|PROF\_SOURCE\_UID|DN|uniqueName|DN|
|PROF\_UID|UID|UID|UID or samAccountName \(in MS Active Directory uid is mapped to samAccountName\)|
|PROF\_LOGIN|LOGIN|Login attributes other than UID and mail|LDAP login attributes other than UID and mail|

The following table shows the population functions that are used in TDI scripts to populate ID into PROF\_GUID.

|LDAP implementations|LDAP attribute type names|LDAP syntax|TDI scripts with functions|
|--------------------|-------------------------|-----------|--------------------------|
|HCL Lotus® Domino® Server|dominoUNID|Directory String \(in Byte String Format\)|\{function\_map\_from\_dominoUNID\}|
|Novell eDirectory Server|GUID|Octet String \(in Binary Format\)|\{function\_map\_from\_GUID\}|
|Microsoft® Active Directory Server/Service|objectGUID|Octet String \(in Binary Format\)|\{function\_map\_from\_objectGUID\}|
|IBM Security Directory Server|ibm-entryUUID|Directory String \(in Canonical Format\)|n/a|
|Sun Java™ Directory Server|nsuniqueid|Directory String \(in Canonical Format\)|n/a|

**Parent topic:**[Adding source data to the Profiles database](../install/t_populate_profiles_db.md)

