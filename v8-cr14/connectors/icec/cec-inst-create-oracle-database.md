# Creating an Oracle database {#id_name .reference}

An SQL script file is included for each supported RDBMS in the Connections Engagement Center zip file. The SQL scripts can be found in the subdirectory **SQLScripts**.

|Step|Instructions|
|----|------------|
|1

|Run the SQL Plus tool available from your Oracle installation:

 ![image](images/image62.png)

|
|2

|Log into the system and run the following command:

 ```
@path\_to\_ICEC\_install\_files/Create_XCC_Oracle_Database.sql
```

 ![image](images/image63.png)

 **Note:** If you do not want to use the SQL script, make sure that the user "XCC" has the necessary access rights to the database.

 Close the command window.

|

