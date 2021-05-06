#!/bin/bash

export DBUSER=${DBUSER:-"db2inst1"}
##cd /home/db2inst1/backup

##os_password=$1
file_name=$1
db_name=$2
TS=`echo $1 | cut -d "." -f5`
echo $TS
echo $file_name
WORK_DIR=/home/db2inst1/backup

##sudo su - $DBUSER << EOC
##$os_password
        WORK_DIR=/home/db2inst1/backup
        db2 CONNECT TO $db_name;
        db2 QUIESCE DATABASE IMMEDIATE FORCE CONNECTIONS;
        db2 TERMINATE;
        db2 RESTORE DATABASE $db_name from $WORK_DIR taken at $TS replace existing;
        db2 CONNECT TO $db_name;
        db2 UNQUIESCE DATABASE;
        db2 CONNECT RESET

##EOC

echo $file_name


