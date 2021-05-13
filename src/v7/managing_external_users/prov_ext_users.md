<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">
# Provisioning external users

The following presentation describes the flow for external user data manipulation.

Provisioning external users is a separate step that should be performed after the data migration has been completed on the production server. For general description where this step fits in the overall process of data migration, please refer to Database migration overview.
In general, registering a user involves two steps: 

- Add them to LDAP
- Provision them to Connections to establish their records in all applications

**Note:** For existing 'internal users' in the migrating organization, they do not need to be provisioned to Connections, because database migration migrates all their records to Connections already

## Import external users to LDAP

- Get a dump of all external users for the org: Follow Step 7 in Production Import Preparation 

  - For each external user in the dump, they will have:

    -- A new 'subscriberId', by appending the migrating organization ID to the original subscriber ID, e.g., 10005315751000530836
    
    -- An auto-generated email as a place holder, by inserting the migrating organization ID into the email,
e.g. `john_hcltestorg2.1000530836@isc4sb.com`

  **Note:** Because the email addresses are auto generated during the data massaging process for external users, as 'place holders', they need to be replaced when real email addresses are made available, and it is not recommended to import them to LDAP as they are at this point, since they will need to be updated later anyway.

- Based on the external user list, MSP needs to establish a process to:

  - communicate with customers and/or external users, and decide which external users will continue to collaborate in an organization
  - collect following info for each external user:

    -- their email, which should be different from any email that has been in use at the same deployment (this is similar restriction on IBM Cloud today). Their original email can be kept as long as there is no conflicts in LDAP
    
    -- optionally, external user's first name, last name and display name as they prefer in the migrating organization
    
  - format external user's information into a csv file
  - generate an ldif file based on the csv file

    -- Make sure that the following LDAP attribute is set for each external user on both the flat and org trees:	ibm-socialPersonalRole: visitor
    
  - import the ldif file to LDAP
   
    **Note:** if the process is defined to handle external users one at a time, then each ldif file would just contain one record for one single user

## Provision external users to Connections

- Using their new subscriber IDs from the data dump, call Provisioning APIs with `AddSubscriber` `operationId` in the JSON payload to provision external users to Profiles, Files and Wikis
- It is not necessary to provision users to other Connections apps because users will be automatically provisioned upon their first access to the apps
- It is most likely that external users already exist in all databases, except Profiles, during data import. But to cover some odd cases, it is recommended to provision them to Files and Wikis too so that external users are able to access Files and Wikis after they log in

## External user appearances in Connections applications

Right after the data migration, and before external users are eventually registered to Connections as described in the two steps above, please observe the following behaviors:

- They do not exist in Profiles. The provisioning API call will create records in Profiles
- Internal users can see their names in various membership views if they were a member before 
- Their names would show up as 'inactive'
- When hovering over their names, their business card would indicate that the user does not exist 
- Internal users can not search and view any external users' profile


<?tm 1541016643182 1 HCL Connections ?>

