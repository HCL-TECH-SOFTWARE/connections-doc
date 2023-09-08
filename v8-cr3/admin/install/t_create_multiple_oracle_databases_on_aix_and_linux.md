# Creating multiple Oracle databases on Linux {#oracle_aix .task}

1.  Each database is a database instance. To create Oracle databases on Linux, use the Oracle Database Configuration Assistant \(DBCA\) to complete these steps:

2.  To open the DBCA tool:

    1.  Change login user to oracle
    2.  $ export \[\[ORACLE\_HOME\]\]=...
    3.  $ export PATH=$PATH:$ORACLE\_HOME/bin
    4.  $ export DISPLAY=hostname:displaynumber.screennumber

        **Note:** where hostname:displaynumber.screennumber represents the client system, monitor number, and window number. For example: localhost:0.0

    5.  $ dbca &
3.  On the Database Operation page, accept the default option to **Create database** and click **Next**.

    1.  Select **Advanced Mode**.

4.  On the Database Templates page, accept the **General Purpose or Transaction Processing** default option and click **Next**.

5.  On the Database Identification page, enter LSCONN in the Global Database Name and SID fields and click **Next**.

    Do not select **Create As Container Database**.

6.  On the Management Options page, accept the default option to **Configure Enterprise Manager \(EM\) Database Express** and click **Next**.

7.  On the Database Credentials page, create the database password and click **Next**.

8.  On the Network Configuration page, select a listener you created from the list, or create a listener.

9.  On the Storage Locations page, accept the **File System** storage option and click **Next**.

    1.  Accept the **Database File Locations**, which is the default.

    2.  Accept the **Specify Fast Recovery Area**, which is the default.

    3.  Click **Next**.

10. On the Database Options page, accept the unselected defaults and click **Next**.

11. On the Initialization Parameters page, select **Use Automatic Memory Management**.

    1.  Click the **Character Sets** tab and select the **Use Unicode \(AL32UTF8\)**.

    2.  Click the **Connection Mode** tab and select Dedicated Server Mode.

    3.  Click **Next**.

12. On the Creation Options page, accept the **Create Database** default option and select **Generate Database Creation Scripts**. Click **Next**.

13. Review the summary and click **Finish**.


**Parent topic:**[Creating multiple Oracle databases](../install/t_create_multiple_oracle_databases.md)

