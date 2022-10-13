<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Provisioning APIs
Refer to the 
[Connections Cloud API Documentation](https://ds-infolib.hcltechsw.com/ldd/appdevwiki.nsf/xpViewCategories.xsp?lookupName=API%20Documentation)

## Overview

When calling the provisioning APIs, use the credential for users with the `<bss-provisioning-admin>` role defined in each Connections app. All provisioning APIs have two phases to call:

**prepare** : A prepare phase to check with the application whether it is ok to make the API call. No data are updated in the applications.

**execute** : Once prepare calls return with an OK, go ahead make the actual call to save/update the provisioning data.

Although &#39;prepare&#39; phase is optional, it is recommended to add it as part of the general provisioning logic.

## Manage Organizations

The API allows admin users to create, and update organizations that are already defined in LDAP to Connections applications. The organization information, e.g. organization name, come from the LDAP. For instance, the organization name comes from the LDAP, not provided in the API payload.

**Input:**

| **Method** | **URI** | **Description** |
| --- | --- | --- |
| POST | /profiles/wdp/provisioning/profilesendpointmtprovisioning | Managing organizations. |
|

**Headers:**

| **Header name** | **Value** | **Description** |
| --- | --- | --- |
| Content- type | application/json | Content-type header can only be set to application/json |
| x-message- id | ***Prepare phase:** 5773004f-8f7b-40d5-8b1c-831abcc81d4eprofiles/wdp/provisioning/profilesendpointmtprovisioningprepare  **Execute phase:**  5773004f-8f7b-40d5-8b1c-831abcc81d4eprofiles/wdp/provisioning/profilesendpointmtprovisioningexecute| This is an optional header to carry a message-id to the server. The general format of the message ID is: `UUID` profiles/wdp/provisioning/profilesendpointmtprovisioning `phase` where: `UUID` is a randomly generate ID; and `phase` is either prepare or execute | This is an optional header to carry a message-id to the server. The general format of the message ID is: **UUID** profiles/wdp/provisioning/profilesendpointmtprovisioning `phase` where: `UUID` is a randomly generate ID; and `phase` is either prepare or execute | 
|

### 1. Sample payloads

**a.** Sample JSON input: prepare and add an organization:
```
{
  "Phase": "prepare",
  "Version": "1",
  "OperationId&quot": "AddOrganization",
  "ReqId": "ff97bd83-c23b-43af-a8ae-769496686bda", 
  "Payload&quot": {
    "OrganizationId": "4000000004&quot"
  },
  "RequestedBy": "",
  "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

**b.** Sample JSON input for adding organization in prepare phase:
```
{
  "Phase&quot": "execute",
  "Version": "1",
  "OperationId": "AddOrganization",
  "ReqId": "ff97bd83-c23b-43af-a8ae-769496686bda&quot", 
  "Payload": {
    "OrganizationId": "4000000004";
  },
  "RequestedBy": "",
  "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

**c.** Sample JSON input for updating organization in prepare phase:

```
{
  "Phase: "prepare&quot",
  "Version&quot": "1",
  "OperationId": "AddOrganization",
  "ReqId": "ff97bd83-c23b-43af-a8ae-769496686bda&quot", 
  "Payload&quot": {
  "OrganizationId": "4000000004"
  },
  "RequestedBy": "",
  "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

**d.** Sample JSON input for updating organization in execute phase:

```
{
  "Phase": "execute&quot",
  "Version&quot": "1&quot",
  "OperationId": "UpdateOrganization",
  "ReqId": "ff97bd83-c23b-43af-a8ae-769496686bda&quot", 
  "Payload&quot": {
    "OrganizationId": "4000000004"
  },
  "RequestedBy": "",
  "ServiceId&quot": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

### 2. Input field description:

| **Field Name** | **Required** | **Description** |
| --- | --- | --- |
| Phase | Yes | Two choices: 
|       |     |  For prepare phase - set the value to: prepare. 
|       |     |  For execute phase - set the value to: execute |
| OperationId | Yes | Two choices: 
|             |     | For adding a new organization, set OperationId to: AddOrganization 
|             |     | For updating an organization, set OperationId to: UpdateOrganization |
| ReqId | No | Optional. But the ReqId can be used to link the prepare phase call and the execute call (described later). It is typically a randomly generated UUID. |
| Payload | Yes | Only one field is required: OrganizationId. This is the ID that is defined in LDAP for the organization you are trying to provision. |
| RequestedBy | No | Optional. You can set it to the user who is performing the API call, or leave it blank. |
| ServiceId | No | Always set it to this value for provisioning organzations: profiles/wdp/provisioning/profilesendpointmtprovisioning |
|

### 3. Command line sample

curl --insecure -u wasadmin:xbhyimln -d @entitle\_org\_execute.json -H &quot;Content-Type:application/json&quot; -X POST -v 
[https://lcauto4.cnx.cwp.pnp-hcl.com/profiles/wdp/provisioning/profilesendpointmtprovisioning](https://lcauto4.cnx.cwp.pnp-hcl.com/profiles/wdp/provisioning/profilesendpointmtprovisioning)

## Manage Users
Users need to be managed in each Connections application individually, using an API endpoint in each application. So to add/update/revoke a user, all endpoints to the following applications need to be called: Profiles, Files, Communities, News, Wikis, Activities, Blogs. 

**Notes:** 
 - The Bookmark/Dogear feature is not supported for multi-tenant.
 - The API calls are all very similar in each application, except the API endpoints.

For all input JSON for managing users, there is an OperationId; field, set the value in the payload JSON accordingly:

| **OperationId** | **Description** |
| --- | --- |
| AddSubscriber | Add a new user to a Connections application. |
| UpdateSubscriber | Update a user in a Connections application. You can also use this operation, with appropriate payload, to update the state of the user, marking them active or inactive, so that from the UI, their names in the application appears as &#39;inactive&#39;. such an update will not remove the user&#39;s email address, and their contents. **Note:** A user with &#39;inactive&#39; state can still access Connections apps, if they can log in. Their LDAP account needs to be disabled to prevent them from logging in. |
RevokeSubscriber | Revoke a user in a Connections application. **Note:** When a user is revoked, the user will be marked as inactive in Connections. Provisioning APIs do not update LDAP. So such user will still be able to login, and access Connections. In order to prevent users from logging in and access Connections, their LDAP account needs to be disabled. **Note:** When a user is revoked, in addition to marking the user as inactive, the user&#39;s profile and all their private contents will be deleted! If the user is the only owner of a community, the community will be deleted too. Any contents that the user contributed to a community will remain with the community, unless the community itself is deleted because the user is the only owner of the community. |
 
### Manage users in Profiles

**Input**

| **Method** | **URI** | **Description** |
| --- | --- | --- |
| POST | /profiles/wdp/provisioning/profilesendpointmtprovisioning | Manage users for Profiles |

**Headers**

| **Header Name** | **Value** | **Description** |
| --- | --- | --- |
| Content-type | application/json |
| x-message-id | Prepare phase:  5773004f-8f7b-40d5-8b1c-831abcc81d4eprofiles/wdp/provisioning/profilesendpointmtprovisioningprepare Execute phase:   5773004f-8f7b-40d5-8b1c-831abcc81d4eprofiles/wdp/provisioning/profilesendpointmtprovisioningexecute | This is an optional header to carry a message-id to the server.  The general format of the message ID is: `UUID`, profiles/wdp/provisioning/profilesendpointmtprovisioning\ `phase` -- where: `UUID`, is a randomly generate ID `phase`, is either prepare or execute |
|                       

**Note:** The API endpoint to mange users in Profiles is exactly the same as the API endpoint to manage Organizations. That is because organizations are only managed and used in Profiles, not other Connections applications.

**a.** Add a user to Profiles

```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "87d80a71-13a6-4846-942f-e36ee24fda38",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000006"
 },
 "RequestedBy": "",
 "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```
execute phasebody:

```
{
 "Phase":"execute",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "87d80a71-13a6-4846-942f-e36ee24fda38",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000006"
 },
 "RequestedBy": "",
 "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

**b.** Revoke a user in Profiles

```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "RevokeSubscriber",
 "ReqId": "0780b166-28e5-4e8e-96b7-8a0d5f04d7d2",
 "Payload": {
  "SubscriberId": "1000000006"
 },
 "RequestedBy": "",
 "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "RevokeSubscriber",
 "ReqId": "0780b166-28e5-4e8e-96b7-8a0d5f04d7d2",
 "Payload": {
  "SubscriberId": "1000000006"
 },
 "RequestedBy": "",
 "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

**c.** Update a user in Profiles

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "87d80a71-13a6-4846-942f-e36ee24fda38",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000006"
 },
 "RequestedBy": "",
 "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "87d80a71-13a6-4846-942f-e36ee24fda38",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000006"
 },
 "RequestedBy": "",
 "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

**d.** Update a user in Profiles with *SubscriverState* property: valid values are: `SUSPENDED` - mark the user inactive; `ACTIVE` - mark the user active

```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "87d80a71-13a6-4846-942f-e36ee24fda38",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000006", 
  "Profile": {
  "SubscriberState": "SUSPENDED"
  }
 },
 "RequestedBy": "",
 "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "87d80a71-13a6-4846-942f-e36ee24fda38",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000006", 
  "Profile": {
 "SubscriberState": "SUSPENDED"
 }
 },
 "RequestedBy": "",
 "ServiceId": "profiles/wdp/provisioning/profilesendpointmtprovisioning"
}
```

**e.** Sample cURLcommand

curl --insecure -u wasadmin:xxxxxx -d @entitle\_user\_profiles.json -H &quot;Content-Type:application/json&quot; -X POST -v 
[https://lcauto4.cnx.cwp.pnp-hcl.com/profiles/wdp/provisioning/profilesendpointmtprovisioning](https://lcauto4.cnx.cwp.pnp-hcl.com/profiles/wdp/provisioning/profilesendpointmtprovisioning)

### Manage users in Files 

**Input**

| **Method** | **URI** | **Description** |
| --- | --- | --- |
| POST | /files/wdp/provisioning/filesendpointmtprovisioning | Manage users for Files |
|

**Headers**

| **Header Name** | **Value** | **Description** |
| --- | --- | --- |
| Content-type | application/json |
| x-message-id | Prepare phase:  95ac8887-6c38-4044-87c7-b416dd850e47files/wdp/provisioning/filesendpointmtprovisioningprepare Execute phase:  95ac8887-6c38-4044-87c7-b416dd850e47files/wdp/provisioning/filesendpointmtprovisioningexecute | This is an optional header to carry a message-id to the server.  The generalformat of the message ID is: `UUID`, \&gt;profiles/wdp/provisioning/filesendpointmtprovisioning\  `phaase`, where `UUID`, is a randomly generate ID  `phase`, is either prepare or execute |
|

**a.** Add a user to Files

```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "5ca4b324-bb32-4dd6-b09d-0f7741034cb4", 
 "Payload": {
  "Locale": "en\_US", 
  "ServiceOfferingAttributeValues": { 
   "FilesService": {
    "files\_allow\_quota\_overage": "true",  
    "files\_quota": "524288000"
   },
   "ShareService": { 
    "share\_allow\_quota\_overage": "true", 
    "share\_quota": "524288000"
   }
 },
 "SubscriberId": "1000000029"
 },
 "RequestedBy": "",
 "ServiceId": "files/wdp/provisioning/filesendpointmtprovisioning"
 }
```

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "5ca4b324-bb32-4dd6-b09d-0f7741034cb4", 
 "Payload": {
  "Locale": "en\_US", 
  "ServiceOfferingAttributeValues": { 
   "FilesService": {
    "files\_allow\_quota\_overage": "true", 
    "files\_quota": "524288000"
   },
   "ShareService": { 
    "share\_allow\_quota\_overage": "true", 
    "share\_quota": "524288000"
   }
  },
  "SubscriberId": "1000000029"
 },
 "RequestedBy": "",
 "ServiceId": "files/wdp/provisioning/filesendpointmtprovisioning"
}
```

**Note:** Both *files_quota* and *share_quota* attributes are quota limits for the entire organization, in MB. Please set them to the same value for all users in the same organization.

**b.** Revoke a user in Files


```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "RevokeSubscriber",
 "ReqId": "45e77448-3055-4457-b9f8-dd46b0a8681d",
 "Payload": {
  "SubscriberId": "1000000004"
 },
 "RequestedBy": "",
 "ServiceId": "files/wdp/provisioning/filesendpointmtprovisioning"
}
```


```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "RevokeSubscriber",
 "ReqId": "45e77448-3055-4457-b9f8-dd46b0a8681d",
 "Payload": {
  "SubscriberId": "1000000004"
 },
 "RequestedBy": "",
 "ServiceId": "files/wdp/provisioning/filesendpointmtprovisioning"
}
```

**Note:** Both *files\_quota* and *share\_quota* attributes are quota limits for the entire organization, in MB. Please set them to the same value for all users in the same organization.

**c.** Update a user in Files

```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "5ca4b324-bb32-4dd6-b09d-0f7741034cb4", 
 "Payload": {
  "Locale": "en\_US", 
  "ServiceOfferingAttributeValues": { 
   "FilesService": {
    "files\_allow\_quota\_overage": "true", 
    "files\_quota": "524288000"
   },
   "ShareService": { 
    "share\_allow\_quota\_overage": "true", 
    "share\_quota": "524288000"
   }
  },
  "SubscriberId": "1000000029"
 },
 "RequestedBy": "",
 "ServiceId": "files/wdp/provisioning/filesendpointmtprovisioning"
}
```

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "5ca4b324-bb32-4dd6-b09d-0f7741034cb4", 
 "Payload": {
  "Locale": "en\_US", 
  "ServiceOfferingAttributeValues": {
   "FilesService": { 
    "files\_allow\_quota\_overage": "true", 
    "files\_quota": "524288000"
   },
   "ShareService": { "share\_allow\_quota\_overage": "true", "share\_quota": "524288000"
   }
  },
  "SubscriberId": "1000000029"
 },
 "RequestedBy": "",
 "ServiceId": "files/wdp/provisioning/filesendpointmtprovisioning"
}
```

**Note:** Both *files_quota* and *share_quota* attributes are quota limits for the entire organization, in MB. Please set them to the same value for all users in the same organization.

**d.** Update a user in Files with *SubscriberState*: valid values are: `SUSPENDED` - mark the user inactive; `ACTIVE` - mark the user active

```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "5ca4b324-bb32-4dd6-b09d-0f7741034cb4", 
 "Payload": {
  "Locale": "en\_US", 
  "ServiceOfferingAttributeValues": { 
   "FilesService": {
    "files\_allow\_quota\_overage": "true", 
    "files\_quota": "524288000"
   },
   "ShareService": { "share\_allow\_quota\_overage": "true", "share\_quota": "524288000"
   }
  },
  "SubscriberId": "1000000029", "Profile": {
  "SubscriberState": "SUSPENDED"
  }
 },
 "RequestedBy": "",
 "ServiceId": "files/wdp/provisioning/filesendpointmtprovisioning"
}
```

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "5ca4b324-bb32-4dd6-b09d-0f7741034cb4", 
 "Payload": {
  "Locale": "en\_US", 
  "ServiceOfferingAttributeValues": { 
   "FilesService": {
    "files\_allow\_quota\_overage": "true", 
    "files\_quota": "524288000"
   },
   "ShareService": { "share\_allow\_quota\_overage": "true", "share\_quota": "524288000"
   }
  },
  "SubscriberId": "1000000029", "Profile": {
  "SubscriberState": "SUSPENDED"
  }
 },
 "RequestedBy": "",
 "ServiceId": "files/wdp/provisioning/filesendpointmtprovisioning"
}
```

**e.** Sample cURL command

curl --insecure -u wasadmin:xbhyimln -d @entitle\_user\_files.json -H "Content-Type:application/json" -X POST -v 
[https://lcauto4.cnx.cwp.pnp-hcl.com/files/wdp/provisioning /filesendpointmtprovisioning](https://lcauto4.cnx.cwp.pnp-hcl.com/files/wdp/provisioning /filesendpointmtprovisioning)

### Manage users in Communities 

**Input**

| **Method** | **URI** | **Description** |
| --- | --- | --- |
| POST | /communities/wdp/provisioning/communitiesendpointmtprovisioning | Managing users for Communities. |
|

**Headers**

| **Header Name** | **Value** | **Description** |
| --- | --- | --- |
| Content-type | application/json |
| x-message- id | **Prepare phase:**  5773004f-8f7b-40d5-8b1c-831abcc81d4ecommunities/wdp/provisioning/communitiesendpointmtprovisioningprepare  **Execute phase:** 5773004f-8f7b-40d5-8b1c-831abcc81d4ecommunities/wdp/provisioning/communitiesendpointmtprovisioningexecute | This is an optional header to carry a message-id to the server.  The general format of the message ID is: `UUID` communities/wdp/provisioning/communitiesendpointmtprovisioning\&lt;  `phase`  where: `UUID` is a randomly generate ID   `phase` is either prepare or execute |
|

**a.** Sample payload

```
{
 "Phase": "prepare",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "3d186157-e03c-4406-b7ca-521e6c159541",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000001"
 },
 "RequestedBy": "",
 "ServiceId": "communities/wdp/provisioning/communitiesendpointmtprovisioning"
}
```
**b.** Sample payload with *SubscriberState*: valid values are: `SUSPENDED-mark` the user inactive;  `ACTIVE-mark` the user active.  

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "3d186157-e03c-4406-b7ca-521e6c159541",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, "SubscriberId": "1000000574", "Profile": {
  "SubscriberState": "SUSPENDED"
  }
 },
 "RequestedBy": "",
 "ServiceId": "communities/wdp/provisioning/communitiesendpointmtprovisioning"
}
```

For other phase and operations, set the fields `Phase` and `OperationId` accordingly.

**c.** Sample cURLcommand

curl --insecure -u wasadmin:xbhyimln -d @entitle\_user\_communities.json -H "Content-Type:application/json" -X POST -v 
[https://lcauto4.cnx.cwp.pnp-hcl.com/profiles/wdp/provisioning/communities/wdp/provisioning/communitiesendpointmtprovisioning](https://lcauto4.cnx.cwp.pnp-hcl.com/profiles/wdp/provisioning/communities/wdp/provisioning/communitiesendpointmtprovisioning)

### Manage users in News

**Input**

| **Method** | **URI** | **Description** |
| --- | --- | --- |
| POST | /news/wdp/provisioning/newsendpointmtprovisioning | Managing users for News/Homepage |
|

**Headers:**

| **Header Name** | **Value** | **Description** |
| --- | --- | --- |
| Content-type | application/json |
|x-message-id |**Prepare phase:**  6aa858bd-fbcc-4351-a6e6-0efeb6ac7151news/wdp/provisioning/newsendpointmtprovisioningexecute   **Execute phase:**  6aa858bd-fbcc-4351-a6e6-0efeb6ac7151news/wdp/provisioning/newsendpointmtprovisioningexecute| This is an optional header to carry a message-id to the server.  The general format of the message ID is: `UUID` news/wdp/provisioning/newsendpointmtprovisioning\ `phase`  where: `UUID` is a randomly generate ID; `phase` is either prepare or execute |
|

**a.** Sample payload

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "cd075459-8e82-44fc-a690-0b4f08704f2f",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000001"
 },
 "RequestedBy": "",
 "ServiceId": "news/wdp/provisioning/newsendpointmtprovisioning"
}
```

For other phase and operations, set the fields `Phase` and `OperationId` accordingly.

**Note:** *SubscriberState* attribute in JSON payload is ignored by News provisioning API. It has no effect.

**b.** Sample cURL command

curl --insecure -u wasadmin:xbhyimln -d @entitle\_user\_profiles.json -H "Content-Type:application/json" -X POST -v 
[https://lcauto4.cnx.cwp.pnp-hcl.com/profiles/wdp/provisioning/profilesendpointmtprovisioning](https://lcauto4.cnx.cwp.pnp-hcl.com/profiles/wdp/provisioning/profilesendpointmtprovisioning) 

### Manage users in Wikis

**Input**

| **Method** | **URI** | **Description** |
| --- | --- | --- |
| POST | /wikis/wdp/provisioning/wikisendpointmtprovisioning | Managing users for Wikis. |
|

**Headers**

| **Header Name** | **Value** | **Description** |
| --- | --- | --- |
| Content-type | application/json |
| x-message-id | **Prepare phase:** 5773004f-8f7b-40d5-8b1c-831abcc81d4ewikis/wdp/provisioning/wikisendpointmtprovisioningprepare  **Execute phase:**  5773004f-8f7b-40d5-8b1c-831abcc81d4ewikis/wdp/provisioning/wikisendpointmtprovisioningexecute | This is an optional header to carry a message-id to the server. The general format of the message ID is: `UUID` wikis/wdp/provisioning/wikisendpointmtprovisioning\  `phase`   where, `UUID` is a randomly generate ID;  `phase` is either prepare or execute |
|

**a.** Sample payload

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "11b04405-18ac-47d0-9b48-3736b918501e",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000001"
 },
 "RequestedBy": "",
 "ServiceId": "wikis/wdp/provisioning/wikisendpointmtprovisioning"
}
```

**b.** Sample payload with SubscriberState: valid values are: `SUSPENDED-mark` the user inactive; `ACTIVE-mark` the user active.

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "11b04405-18ac-47d0-9b48-3736b918501e",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000574", 
   "Profile": 
   {
   "SubscriberState": "SUSPENDED"
  }
 },
 "RequestedBy": "",
 "ServiceId": "wikis/wdp/provisioning/wikisendpointmtprovisioning"
}
```

For other phase and operations, set the fields <Phase> and <OperationId> accordingly.

**c.** Sample cURLcommand

curl --insecure -u wasadmin:xbhyimln -d @entitle\_user\_activities.json -H "Content-Type:application/json" -X POST -v 
[https://lcauto4.cnx.cwp.pnp-hcl.com/wikis/wdp/provisioning/wikisendpointmtprovisioning](https://lcauto4.cnx.cwp.pnp-hcl.com/wikis/wdp/provisioning/wikisendpointmtprovisioning)

### Manage users in Activities

**Input**

| **Method** | **URI** | **Description** |
| --- | --- | --- |
| POST | /activities/wdp/provisioning/activitiesendpointmtprovisioning | Managing users for Activities |
|

**Headers**

| **Header Name** | **Value** | **Description** |
| --- | --- | --- |
| Content-type | application/json |
| x-message-id | **Prepare phase:**  5773004f-8f7b-40d5-8b1c-831abcc81d4eactivities/wdp/provisioning/activitiesendpointmtprovisioningprepare  **Execute phase:**  5773004f-8f7b-40d5-8b1c-831abcc81d4eactivities/wdp/provisioning/activitiesendpointmtprovisioningexecute | This is an optional header to carry a message-id to the server.  The general format of the message ID is: `UUID` activities/wdp/provisioning/activitiesendpointmtprovisioning\ `phase` where: `UUID` is a randomly generate ID; `phase` is either prepare or execute |
|

**a.** Sample payload

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "2e2da18a-3535-4d07-8347-f464b5093b21",
 "Payload": { 
  "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000001"
 },
 "RequestedBy": "",
 "ServiceId": "activities/wdp/provisioning/activitiesendpointmtprovisioning"
}
```

**b.** Sample payload with SubscriberState:  valid values are: `SUSPENDED-mark` the user inactive;  `ACTIVE-mark` the user active.

```
{
 "Phase": "execute",
 "Version": "1",
 "OperationId": "UpdateSubscriber",
 "ReqId": "3d186157-e03c-4406-b7ca-521e6c159541",
 "Payload": { 
 "Locale": "en\_US",
  "ServiceOfferingAttributeValues": {}, "SubscriberId": "1000000574", "Profile": {
  "SubscriberState": "SUSPENDED"
  }
 },
 "RequestedBy": "",
 "ServiceId": "activities/wdp/provisioning/activitiesendpointmtprovisioning"
}
```

For other phase and operations, set the fields &#39;Phase&#39; and &#39;OperationId&#39; accordingly.

**c.** Sample cURLcommand

curl --insecure -u wasadmin:xbhyimln -d @entitle\_user\_activities.json -H "Content-Type:application/json" -X POST -v 
[https://lcauto4.cnx.cwp.pnp-hcl.com/activities/wdp/provisioning/activitiesendpointmtprovisioning](https://lcauto4.cnx.cwp.pnp-hcl.com/activities/wdp/provisioning/activitiesendpointmtprovisioning)

### Manage users in Blogs 

**Input**

| **Method** | **URI** | **Description** |
| --- | --- | --- |
| POST | /blogs/wdp/provisioning/blogsendpointmtprovisioning | Managing users for Blogs |
|

**Headers**

| **Header Name** | **Value** | **Description** |
| --- | --- | --- |
| Content-type | application/json |
| x-message-id | **Prepare phase:**  5773004f-8f7b-40d5-8b1c-831abcc81d4eblogs/wdp/provisioning/blogsendpointmtprovisioningprepare  **Execute phase:**  5773004f-8f7b-40d5-8b1c-831abcc81d4eblogs/wdp/provisioning/blogsendpointmtprovisioningexecute | This is an optional header to carry a message-id to the server.  The general format of the message ID is: `UUID` blogs/wdp/provisioning/blogsendpointmtprovisioning\ `phase` where: `UUID` is a randomly generate ID;  `phase` is either prepare or execute |
|

**a.** Sample payload

```
{
 "Phase":"prepare",
 "Version": "1",
 "OperationId": "AddSubscriber",
 "ReqId": "476978dd-37ad-4eb8-89b7-bfdd6841292c", 
 "Payload": {
  "Locale": "en\_US", 
  "ServiceOfferingAttributeValues": {}, 
  "SubscriberId": "1000000002"
 },
 "RequestedBy": "",
 "ServiceId": "blogs/wdp/provisioning/blogsendpointmtprovisioning"
}
```

For other phase and operations, set the fields <Phase> and <OperationId> accordingly.

**Note:** SubscriberState attribute in JSON payload is ignored by Blogs provisioning API. It has no effect. 

**b.** Sample cURL command

curl --insecure -u wasadmin:xbhyimln -d @entitle\_user\_blogss.json -H "Content-Type:application/json" -X POST -v 
[https://lcauto4.cnx.cwp.pnp-hcl.com/blogs/wdp/provisioning/blogsendpointmtprovisioning](https://lcauto4.cnx.cwp.pnp-hcl.com/blogs/wdp/provisioning/blogsendpointmtprovisioning)

<?tm 1541016643182 1 HCL Connections ?>

