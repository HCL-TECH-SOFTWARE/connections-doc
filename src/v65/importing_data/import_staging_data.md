<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Staging the Database Import 

This page explains the rationale behind a preliminary import of the databases and summarizes the actions you will need to take.

## Converting external and guest users

Because the collaboration model for accommodating users external to your organization differs from the IBM Connections Cloud model, External users&#39; identities and references to their identities need to be altered to accurately reflect them and the attribution of their content contributions. To do this a number of steps need to be performed on the data before it is imported into your production environment. These steps are crucial to ensure that external users are safely and accurately represented in your environment. There are scripts provided to perform the task, prepare the environment, do a preliminary import, perform data manipulation, and generate a set of exports that can be imported into your production environment. These scripts are found in the externalUsers.zip and the importUtils.zip script packages.

## DB2 staging environment

To perform the conversion process, you will need to set up a DB2 server where the imported data can be stored temporarily while it is &quot;massaged.&quot; This database server must have the Connections databases installed. For each org that you are preparing for import to production, you will need to do a preliminary import into this staging environment.

Prior to performing the preliminary import, for

each org, you will need to ensure that all databases are clear of any residual organization data prior to the conversion of the data. Once the database is clean, you will run two scripts to prepare the databases to do the data manipulation.

## Summary of database migration tasks

Here is the high-level list of tasks you will need to do for database migration:

- Prepare a staging server with &quot;empty&quot; Connections databases
- On staging server:
  - Run script to import data exported from IBM
  - Run script to fix-up external users and the content references
  - Run script to export the data
  - Run script to generate an ldif file for internal users
  - Run script to generate a CSV file for external users
- On Production server:
  - Run script to import massaged data to production server
  - Run script to import internal users to LDAP
- Start the process to re-register/re-invite external users.


<?tm 1541016643182 1 HCL Connections ?>


