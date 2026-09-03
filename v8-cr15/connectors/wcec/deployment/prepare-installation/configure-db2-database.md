---
title: Configuring IBM DB2
tags:
    - IBM DB2
    - Database configuration
    - Database creation
    - Permissions
    - DB2 scripts
    - DB2 administration
    - Bufferpools
    - Tablespaces
    - CEC (WebEngine)
---
# Configuring IBM DB2

CEC (WebEngine) requires an IBM DB2 database. You must create the required databases and grant appropriate permissions before deployment.

!!! note
    Before running these scripts, ensure the following:   
     
    - Replace `<<db2_user>>`, `<<db2_password>>`, and `<<db2_group>>`. The `<<db2_user>>` must have sufficient privileges to create databases and grant permissions.
    - These scripts assume IBM DB2 is installed at `/home/db2inst1`. Adjust the paths if your installation differs.

## Creating databases

Run the following script to create the required databases and configure them:

```sh
#!/bin/bash
source /home/db2inst1/sqllib/db2profile

/home/db2inst1/sqllib/adm/db2set DB2COMM=TCPIP
/home/db2inst1/sqllib/adm/db2set DB2_EVALUNCOMMITTED=YES
/home/db2inst1/sqllib/adm/db2set DB2_INLIST_TO_NLJN=YES
/home/db2inst1/sqllib/bin/db2 "UPDATE DBM CFG USING sheapthres 0"

/home/db2inst1/sqllib/bin/db2 "CREATE DB WPREL using codeset UTF-8 territory us PAGESIZE 8192"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPREL USING locktimeout 30"
/home/db2inst1/sqllib/bin/db2 "CONNECT TO WPREL"
/home/db2inst1/sqllib/bin/db2 "GRANT DBADM, SECADM ON DATABASE TO USER <<db2_user>>"
/home/db2inst1/sqllib/bin/db2 "CONNECT RESET"

/home/db2inst1/sqllib/bin/db2 "CREATE DB WPCOMM using codeset UTF-8 territory us PAGESIZE 8192"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPCOMM USING locktimeout 30"
/home/db2inst1/sqllib/bin/db2 "CONNECT TO WPCOMM"
/home/db2inst1/sqllib/bin/db2 "GRANT DBADM, SECADM ON DATABASE TO USER <<db2_user>>"
/home/db2inst1/sqllib/bin/db2 "CONNECT RESET"

/home/db2inst1/sqllib/bin/db2 "CREATE DB WPCUST using codeset UTF-8 territory us PAGESIZE 8192"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPCUST USING locktimeout 30"
/home/db2inst1/sqllib/bin/db2 "CONNECT TO WPCUST"
/home/db2inst1/sqllib/bin/db2 "GRANT DBADM, SECADM ON DATABASE TO USER <<db2_user>>"
/home/db2inst1/sqllib/bin/db2 "CONNECT RESET"

/home/db2inst1/sqllib/bin/db2 "CREATE DB WPJCR using codeset UTF-8 territory us PAGESIZE 8192"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPJCR USING locktimeout 30"
/home/db2inst1/sqllib/bin/db2 "CONNECT TO WPJCR"
/home/db2inst1/sqllib/bin/db2 "GRANT DBADM, SECADM ON DATABASE TO USER <<db2_user>>"
/home/db2inst1/sqllib/bin/db2 "CONNECT RESET"

/home/db2inst1/sqllib/bin/db2 "CREATE DB WPFDBK using codeset UTF-8 territory us PAGESIZE 8192"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPFDBK USING locktimeout 30"
/home/db2inst1/sqllib/bin/db2 "CONNECT TO WPFDBK"
/home/db2inst1/sqllib/bin/db2 "GRANT DBADM, SECADM ON DATABASE TO USER <<db2_user>>"
/home/db2inst1/sqllib/bin/db2 "CONNECT RESET"

/home/db2inst1/sqllib/bin/db2 "CREATE DB WPLM using codeset UTF-8 territory us PAGESIZE 8192"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPLM USING locktimeout 30"
/home/db2inst1/sqllib/bin/db2 "CONNECT TO WPLM"
/home/db2inst1/sqllib/bin/db2 "GRANT DBADM, SECADM ON DATABASE TO USER <<db2_user>>"
/home/db2inst1/sqllib/bin/db2 "CONNECT RESET"

/home/db2inst1/sqllib/bin/db2 "CONNECT TO WPJCR USER <<db2_user>> USING <<db2_password>>"
/home/db2inst1/sqllib/bin/db2 "CREATE BUFFERPOOL ICMLSFREQBP4 SIZE 1000 AUTOMATIC PAGESIZE 4K"
/home/db2inst1/sqllib/bin/db2 "CREATE BUFFERPOOL ICMLSVOLATILEBP4 SIZE 16000 AUTOMATIC PAGESIZE 4K"
/home/db2inst1/sqllib/bin/db2 "CREATE BUFFERPOOL ICMLSMAINBP32 SIZE 16000 AUTOMATIC PAGESIZE 32K"
/home/db2inst1/sqllib/bin/db2 "CREATE BUFFERPOOL CMBMAIN4 SIZE 1000 AUTOMATIC PAGESIZE 4K"
/home/db2inst1/sqllib/bin/db2 "CREATE REGULAR TABLESPACE ICMLFQ32 PAGESIZE 32K BUFFERPOOL ICMLSMAINBP32"
/home/db2inst1/sqllib/bin/db2 "CREATE REGULAR TABLESPACE ICMLNF32 PAGESIZE 32K BUFFERPOOL ICMLSMAINBP32"
/home/db2inst1/sqllib/bin/db2 "CREATE REGULAR TABLESPACE ICMVFQ04 PAGESIZE 4K BUFFERPOOL ICMLSVOLATILEBP4"
/home/db2inst1/sqllib/bin/db2 "CREATE REGULAR TABLESPACE ICMSFQ04 PAGESIZE 4K BUFFERPOOL ICMLSFREQBP4"
/home/db2inst1/sqllib/bin/db2 "CREATE REGULAR TABLESPACE CMBINV04 PAGESIZE 4K BUFFERPOOL CMBMAIN4"
/home/db2inst1/sqllib/bin/db2 "CREATE SYSTEM TEMPORARY TABLESPACE ICMLSSYSTSPACE32 PAGESIZE 32K BUFFERPOOL ICMLSMAINBP32"
/home/db2inst1/sqllib/bin/db2 "CREATE SYSTEM TEMPORARY TABLESPACE ICMLSSYSTSPACE4 PAGESIZE 4K BUFFERPOOL ICMLSVOLATILEBP4"
/home/db2inst1/sqllib/bin/db2 "CREATE USER TEMPORARY TABLESPACE ICMLSUSRTSPACE4 PAGESIZE 4K BUFFERPOOL ICMLSVOLATILEBP4"
/home/db2inst1/sqllib/bin/db2 "DISCONNECT WPJCR"
/home/db2inst1/sqllib/bin/db2 "TERMINATE"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPJCR USING logfilsiz 16000"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPJCR USING logprimary 20"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPJCR USING logsecond 50"
/home/db2inst1/sqllib/bin/db2 "UPDATE DB CFG FOR WPJCR USING logbufsz 500"
```

## Granting permissions

Run the following script to grant permissions on the created databases:

```sh
#!/bin/bash
source /home/db2inst1/sqllib/db2profile

/home/db2inst1/sqllib/bin/db2 CONNECT TO WPREL USER <<db2_user>> USING <<db2_password>>;
/home/db2inst1/sqllib/bin/db2 CREATE SCHEMA release AUTHORIZATION  <<db2_user>>;
/home/db2inst1/sqllib/bin/db2 COMMIT;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT, CREATETAB ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSH200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT ALTERIN, CREATEIN, DROPIN ON SCHEMA release TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE USERSPACE1 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN100 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN300 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 CONNECT RESET;

/home/db2inst1/sqllib/bin/db2 CONNECT TO WPCOMM USER <<db2_user>> USING <<db2_password>>;
/home/db2inst1/sqllib/bin/db2 CREATE SCHEMA community AUTHORIZATION  <<db2_user>>;
/home/db2inst1/sqllib/bin/db2 COMMIT;
/home/db2inst1/sqllib/bin/db2 GRANT CONNECT, CREATETAB ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSH200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT ALTERIN, CREATEIN, DROPIN ON SCHEMA community TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE USERSPACE1 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN100 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN300 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 CONNECT RESET;

/home/db2inst1/sqllib/bin/db2 CONNECT TO WPCUST USER <<db2_user>> USING <<db2_password>>;
/home/db2inst1/sqllib/bin/db2 CREATE SCHEMA customization AUTHORIZATION  <<db2_user>>;
/home/db2inst1/sqllib/bin/db2 COMMIT;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT, CREATETAB ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSH200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT ALTERIN, CREATEIN, DROPIN ON SCHEMA customization TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE USERSPACE1 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN100 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN300 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 CONNECT RESET;

/home/db2inst1/sqllib/bin/db2 CONNECT TO WPJCR USER <<db2_user>> USING <<db2_password>>;
/home/db2inst1/sqllib/bin/db2 CREATE SCHEMA jcr AUTHORIZATION  <<db2_user>>;
/home/db2inst1/sqllib/bin/db2 COMMIT;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT, CREATETAB ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSH200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT ALTERIN, CREATEIN, DROPIN ON SCHEMA jcr TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE USERSPACE1 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE ICMLFQ32 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE ICMLNF32 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE ICMVFQ04 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE ICMSFQ04 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE CMBINV04 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE ICMLSUSRTSPACE4 TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN100 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN300 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 CONNECT RESET;

/home/db2inst1/sqllib/bin/db2 CONNECT TO WPFDBK USER <<db2_user>> USING <<db2_password>>;
/home/db2inst1/sqllib/bin/db2 CREATE SCHEMA feedback AUTHORIZATION  <<db2_user>>;
/home/db2inst1/sqllib/bin/db2 COMMIT;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT, CREATETAB ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSH200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT ALTERIN, CREATEIN, DROPIN ON SCHEMA feedback TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE USERSPACE1 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN100 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN300 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 CONNECT RESET;

/home/db2inst1/sqllib/bin/db2 CONNECT TO WPLM USER <<db2_user>> USING <<db2_password>>;
/home/db2inst1/sqllib/bin/db2 CREATE SCHEMA likeminds AUTHORIZATION  <<db2_user>>;
/home/db2inst1/sqllib/bin/db2 COMMIT;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT, CREATETAB ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSH200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT ALTERIN, CREATEIN, DROPIN ON SCHEMA likeminds TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USE OF TABLESPACE USERSPACE1 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;

/home/db2inst1/sqllib/bin/db2 GRANT CONNECT ON DATABASE TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN100 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN200 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT EXECUTE ON PACKAGE NULLID.SYSSN300 TO GROUP <<db2_group>>;
/home/db2inst1/sqllib/bin/db2 GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO GROUP <<db2_group>>;
```
