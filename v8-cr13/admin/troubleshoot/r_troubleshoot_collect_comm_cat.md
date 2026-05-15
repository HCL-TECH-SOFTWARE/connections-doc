# Collecting communities catalog troubleshooting data {#reference_sj4_c2x_l4 .reference}

Collect communities catalog data to help HCL Support diagnose catalog problems.

## Mandatory data { .section}

Gather and provide the following information related to any communities catalog issues:

-   The values of the CATALOG\_INDEX\_DIR and CATLAOG\_REPICATION\_DIR WebSphere variables.
-   A detailed description of the issue that includes the scenario that caused the issue, user names, and time stamps to match the issue.
-   Trace files from all existing nodes.
-   Fiddler traces of UI HTTP calls.

## Screen captures { .section}

Collect as many screen captures as possible, for example:

-   **I'm an owner**, **I'm a member**, **I'm following**, **I'm inviter**, or **Public Communities** views \(whichever is relevant to the issue\).
-   **Catalog admin page overview** and the details for every crawler that is defined.

## Database tables { .section}

Collect the content of the following a database tables:

-   SNCOMM.CATALOG\_COLLECTION\_CONFIG
-   SNCOMM.CATALOG\_CRAWLER\_STATUS

## Index files { .section}

Collect the content found in the folders that are defined by the following WebSphere Application Server variables \(for all nodes\):

-   CATALOG\_INDEX\_DIR
-   CATLAOG\_REPICATION\_DIR

## Trace Files { .section}

Set the following Trace flags in each node that the Communities application is installed on:

```

*=info:  com.ibm.lconn.comm.catalog.*=all:  
com.ibm.connections.comm.seedlist.catalog.*=all:
com.ibm.tango.web.ui.actions.catalog.*=all:  
[Catalog]com.ibm.lotus.*=all: com.ibm.lotus.catalog.*=all: 
com.ibm.lotus.search.*=all 
```

**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

