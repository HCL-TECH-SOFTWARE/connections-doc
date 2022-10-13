#!/bin/bash

export DBUSER=${DBUSER:-"db2inst1"}
export LCUSER=${LCUSER:-"lcuser"}
hostname=`hostname -f`

os_password=$1
db_name=$2


##if [ -d "$WORKING_DIR" ]; then rm -Rf $WORKING_DIR; fi
WORK_DIR=/home/db2inst1/backup


su - $DBUSER << EOC
$os_password
		mkdir -p backup
		WORKING_DIR=backup
		cd $WORKING_DIR
        db2 LIST APPLICATIONS
        db2 CONNECT TO $db_name;
        db2 QUIESCE DATABASE IMMEDIATE FORCE CONNECTIONS
        db2 TERMINATE
        db2 backup database $db_name to "$WORK_DIR"
        db2 CONNECT TO $db_name;
        db2 UNQUIESCE DATABASE;
        db2 CONNECT RESET
EOC
