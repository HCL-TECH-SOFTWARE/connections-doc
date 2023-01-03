# Creating an MSSQL database {#id_name .reference}

We have included a SQL script file for each supported RDBMS into the Connections Engagement Center Release Package zip file. The SQL scripts can be found in the subdirectory **SQLScripts**.

|Step|Instructions|
|----|------------|
|1

|You might want to change the script file to better fit into your system.

 Change the file and path of the database in the script file:

 change line 4: C:\\Data\\MSSQL\\ICEC\_DATA1.mdf

 Change the file & path of the log in the script file:

 Change line 6: C:\\Data\\MSSQL\\ICEC\_LOG

 Change the user for accessing the ICEC database:

 Change Connections Engagement Center USER in section -- create user

|
|2

|Open a command window and run the following command:

 **sqlcmd -S <yourserver\> -i <path\>/Create\_ICEC\_MSSQL\_Database.sql**

 Close the command window.

 ![image](images/image52.png)

|

