<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Process flow for importing data

**Important:**  **Please make sure that users from an organization do NOT login and access Connections BEFORE the data from the organization are imported!**

## Workflow for the initial request for binary files and DB Export files

This first delivery of files will be used to copy the binary files into a staging environment, perform a DB import into staging environment and do the initial copy of binary files into the production environment.

1. **Customer** Selects CH-MSP and signs contract
2. **CH-MSP** creates a unique user ID in ServiceNow to manage the customer&#39;s account, do as soon as contract is in place. The CH-MSP needs to have a unique ID for each customer they are off-boarding.
3. **Customer** adds CH-MSP user ID in ServiceNow to the customer accounts in ServiceNow. The CH-MSP will be added with regular user privileges.
4. **CH-MSP** opens a support case requesting to start the file transfer of the customers data. The orgId, customer name and CH-MSP email to invite for access to box need to be included in the case. Specify that this is the Initial data request for this org. Do NOT put S3 bucket information into the case, Support Template
5. **CH-MSP** add [**scott.favreau@hcl.com**](mailto:scott.favreau@hcl.com)to the watch list for the case.
6. **HCL L2** creates a JIRA ticket for IBM to create a box folder to use for the off-boarding activities for this customer. JIRA ticket includes orgId, customer name and CH-MSP email.
7. **HCL L2** creates a JIRA ticket for IBM to enable the customizer tool for the specified orgId.
8. **IBM** creates the box folder, invites the MSP to join, closes the JIRA ticket.
9. **HCL L2** to follow-up with MSP to make sure they received invitation to Box folder and tell them to put S3 information in box folder. A unique S3 Folder needs to be created for every customer that will be off-boarded.
10. **IBM** enables the customizer tool for the Org and closes JIRA ticket.
11. **CH-MSP** puts S3 Bucket access information and security keys into Box folder and contacts HCL L2 support alerting team that S3 access information is available in Box and to start the File transfer process. The template must be used to provide S3 access information.
12. **HCL L2** creates JIRA ticket for IBM alerting them S3 information is in box folder and to start file transfer process.
13. **IBM** runs scripts to place Files in S3 bucket specified in box folder.
14. **IBM** runs DB export scripts to place database data in S3 bucket specified in box folder.
15. **IBM** closes JIRA ticket indicating that files have been copied to S3bucket.
16. **IBM** deletes the box folder for this customer. Note, IBM records the S3 access information and will use this information during the second download of files.
17. **HCL Support** informs CH-MSP that the file transfer process has completed, and the files are in the S3bucket.
18. **CH-MSP** copies files from S3 to their MT Connections Cloud.
19. **CH-MSP** copies binary files to appropriate location in MT Connections cloud(staging).
20. **CH-MSP** run the Import scripts to import data in the MT Connections DB(staging).
21. CH-MSP copies binary files to appropriate location in MT Connections cloud(production).
22. **CH-MSP and Customer** verify staging environment.
23. **MSP** confirms file transfer and HCL closes ticket.

## Workflow for the request for the binary file update and DB Export files

The second delivery of files will be used to update the binary files in the production environment (only files that have changed since initial download will be provided), perform a DB import into production environment. 

**Note:** The tar files that are downloaded in this step will overwrite the tar files that were loaded in the first request.

1. **MSP/Customer** determine when final cut over will occur
2. **Customer Admin** uses the customizer tool to mark the organization as read-only.
3. **CH-MSP** opens a support case with HCL requesting updated file transfer and DB export for customer org. The support case should specify orgId/Customer name. Please specify this as a **Delta** data request.

**Support Template**

1. **CH-MSP** add [**scott.favreau@hcl.com**](mailto:scott.favreau@hcl.com) to the watch list for the case.
2. **HCL Support** opens a JIRA ticket for IBM requesting the File transfer and DB export be scheduled for the customer org specified in the ticket.
3. **IBM** runs scripts to place Files in S3 bucket specified in box folder. Only files modified/added since initial run will be placed in S3 bucket (this is handled by the scripts).
4. **IBM** runs export scripts and copies files to S3bucket.
5. **IBM** closes JIRA ticket indicating that files have been copied to S3bucket.
6. **HCL Support** informs CH-MSP that files are available.
7. **CH-MSP** copies files from S3 to their MT Connections Cloud.
8. **CH-MSP** copies files to appropriate location in MT Connections cloud(production).
9. **CH-MSP** imports the delta export data files to DB2 staging server
10. **CH-MSP** executes the external reference fix up scripts
11. **CH-MSP** run the Import scripts to import data from step 13 in the MT Connections DB (production).
12. **CH-MSP** Fixes any links, any other clean-up tasks.
13. **CH-MSP and Customer** verify data in MT Connections Cloud.
14. **CH-MSP/Customer** confirms data is OK closes case.

<?tm 1541016643182 1 HCL Connections ?>


