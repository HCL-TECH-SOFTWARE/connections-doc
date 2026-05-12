# Creating a DB2 database for Linux {#id_name .reference}

Create a DB2 database for Linux \(single and multiple instances\).

|Step|Instructions|
|----|------------|
|1

|The default user is LCUSER within this script file to grant the necessary access rights to the database. If you want to use another DB2 user you must change the GRANT instructions in the script file before running it.

|
|2

|Connect to your Linux operating system with the instance user \(for example, db2inst1\).

 **Important:**If you have multiple instances, you need to configure the set up as following:

 `. /home/DB2\_INSTANCE\_USER/sqllib/db2profile`

|
|3

|Run the following command:

 ```
db2 -tvf **<XCC\_PACKAGE\_PATH\>**/Create_XCC_DB2_Database.sql
```

|
|4

|Logout from system.

|

