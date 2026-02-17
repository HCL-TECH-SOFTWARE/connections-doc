# Creating multiple Oracle databases on Windows {#oracle_windows .task}

Complete these steps for each instance that you plan to create:

1.  Create a new user and add it to the Administrators group.
2.  Remove the user account from the Users group.
3.  Grant rights to the new user:
    1.  Click **Start** \> **Run** and enter secpol.msc.
    2.  Expand **Local Policies** and click **User Rights Assignment**.
    3.  Open each of the following rights, click **Add User or Group**and add the new user:
        -   Act as part of the operating system
        -   Adjust memory quotas\|Increase quotas for a process
        -   Create a token object
        -   Debug programs
        -   Lock pages in memory
        -   Log on as a service
        -   Replace a process level token

**Tip:** The new account uses the local system as the domain.

1.  Each database is a database instance. To create Oracle databases on Windows, use the Oracle Database Configuration Assistant \(DBCA\) to complete these steps:

2.  To open the DBCA tool, click **Start**. Select **Oracle** \> **Oracle\_directory** \> **Configuration and Migration Tools** \> **Database Configuration Assistant**where Oracle\_directory is the Oracle home on your system.

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

