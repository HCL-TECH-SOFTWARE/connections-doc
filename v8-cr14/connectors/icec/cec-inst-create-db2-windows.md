# Creating a DB2 database for Windows {#id_name .reference}

Included is a SQL script file for each supported RDBMS into the Connections Engagement Center Release Package zip file. The SQL scripts can be found in the subdirectory SQLScripts.

The default user is LCUSER within this script file to grant the necessary access rights to the database. If you want to use another DB2 user you must change the GRANT instructions in the script file before running it.

|Step|Instructions|
|----|------------|
|1

| |
|2

|Open IBM DB2 **Command Window - Administrator**:

 ![image](images/image37.png)

|
|3

|**Run the following command:**

 db2 -tvf **<Connections Engagement Center\_PACKAGE\_PATH\>**/Create\_Connections Engagement Center\_DB2\_Database.sql

 ![image](images/image38.png)

|
|4

|Close the command window.

|

