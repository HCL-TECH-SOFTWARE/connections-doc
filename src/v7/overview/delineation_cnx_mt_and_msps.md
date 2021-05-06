<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">
# Delineation and separation of responsibilities between Connections MT and MSP:

It appears there is some confusion around the extend of the capabilities of Connections MT and where an MSP will need to provide additional APIs or wrapper layers. We&#39;ve gone through the most important use cases and outlined the extend of what Connections can offer to accomodate that use case and where an MSP will need to build own tooling. Joseph is in the process of documenting the APIs associated with these Connections capabilities and will provide them via the forum as soon as he is ready (target is next week)


## Use cases:
### Org registration
Connections MT registers organizations on a per-feature level. While this gives the highest degree of flexibility regarding entitlements, it means that in order to fully enroll an org into all capabilities of Connections you will need to trigger several regisitration APIs. They all follow the same format and can therefore easily be automated.These APIs are all JSON based Documentatio n in this wiki 
### User registration
Same as Organization Registration
### Revoking orgs
Same as Organization Registration
### Revoking/suspending users
Same as Organization Registration
### Org/entitlement management
Same as Organization Registration
### Access to orgs
Connections MT works with org-specific subdomains, e.g. abc.msp-cloud.com, xyz.msp-cloud.com

The association of these subdomains with the rightful customers will need to be validated and executed by the MSP. Since the MSP has a direct contractual relation with the customer, this validation is likely already happening. The key criterion here is that the subdomains isassociated with the company which generally would be expected to be hosted under this subdomain. E.g. hcl.msp-cloud.com can only be claimed by HCL, not by another company.

The resulting registration of subdomains and generation of certificates is also the responsibility of the MSP
### Billing 
As indicated above Connections MT has the capability to entitle on a per-feature level. 

Furthermore, you might want to segregate entitlements across product lines (Docs, ICEC, Sametime, Domino etc). Currently we don't have any read-APIs to check whether a user/org is enrolled for a certain feature.

MSPs will need to keep track of entitlements separately purely for the purpose of being able to assess the total user count entitled to a specific set of features and generate subsequent billing information
### Authentication
We will support either KeyCloak or Okta as IDPs with Connections cloud. These can then be integrated with many other Identity Providers.
### Customization
UI Customizations
- Connections MT does not support JSP based customization 
- We recommend Connections Customizerfor UI customizations, either global or per- tenant ProfileExtensions 
- ProfileExtensions can be imported on a per-tenant basis via a wsadmin task.
-  File Quota and Limits
-- MSPs have the ability to configure deployment-wide default limits. MSPs can then call a wsadmin API to change the quota of individual users.
### User Roles
- Connections MT knows specific user roles, which do not exist in Connections OnPrem, namely the org admin
- In order to identify a user as an org admin, we require a particular set of headers to be provided as part of the authentication flow
- Since the user record and the information whether a user is org admin or not, will likely come from the LDAP or some other MSP-specific database, we do not store this information andsimply react to the headers indicating this elevated level of privileges

<?tm 1541016643182 1 HCL Connections ?>

