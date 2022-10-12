# Installing Community Surveys with IBM Installation Manager {#installingfebwithwas .task}

The following instructions describe how to install Community Surveys.

To install Community Surveys for a production environment, you must have a database and WebSphere Application Server with security enabled installed and set up on your system.

You must be logged in as a user belonging to the Administrators group when you run the installer for Windows™. You must log in to the system as root when you install on Linux™.

When you install Community Surveys with WebSphere Application Server, the WebSphere Application Server will be restarted during the installation process. During the installation, the WebSphere Application Server's JVM maximum heap size will be changed to 1024 to ensure that it is adequately set for Community Surveys. If this value is already tuned to a different value that is desirable for your configuration, ensure that you reset it to that value following the installation.

1.  To ensure that the Community Surveys feature will work properly in the WebSphere Application Server environment \(Java 8 or later\), you must customize a stax.properites file for your JRE library as follows:

    1.  Make a copy of stax.properties.sample in your<Java installation path\>/jre/lib folder and rename the new file stax.properties, keeping it in the same folder.

    2.  In the new file, remove the comment mark \(\#\) before following lines:

        ```
        javax.xml.stream.XMLInputFactory=com.ibm.xml.xlxp.api.stax.XMLInputFactoryImpl 
        javax.xml.stream.XMLOutputFactory=com.ibm.xml.xlxp.api.stax.XMLOutputFactoryImpl
        ```

    3.  Save the file.

2.  To begin the Community Surveys installation, extract the software package. Run the Launchpad file for your platform. For Windows, use Launchpad.exe or Launchpad64.exe for 64-bit Windows platforms. For Linux and AIX®, run launchpad.sh.

    **Note:** In some Windows environments, it might be necessary to right-click Launchpad and select **Run as Administrator** to start IBM Installation Manager correctly.

3.  Select your language and click **OK** if your language is not English.

4.  Click **Install** in the Product Overview section.

    Launchpad detects the presence of IBM Installation Manager, which is a wizard-based installation program that is used in many IBM® products. Launchpad uses your current version of IBM Installation Manager and add the Community Surveys repository automatically.

5.  In the IBM Installation Manager window, click **Next** to install the packages for IBM Installation Manager, if you did not install it, and Community Surveys.

6.  Click **Next** and read the license agreement.

7.  Read the license agreement, click **I accept the terms in the license agreement** radio button, and then click **Next**. The Select Installation Directory panel opens.

8.  Select the location for the shared files and click **Next**. Select the directory for the Community Surveys installation, and click **Next**.

9.  Select the features that you want to install with Community Surveys. For a production environment, you must select **Community Surveys on existing WebSphere Application Server**.

    **Note:** Use a short installation path. For example, use C:\\CommunitySurveys instead of C:\\Program Files\\HCL\\CommunitySurveys. If you exceed the 259 maximum character length, you may receive one of the following error messages during configuration or in the IBM Installation Manager log files:

    -   The input line is too long.
    -   The syntax of the command is incorrect.
    -   The file name is too long.
    **Important:** If you install to a directory other than C:\\, after the installation is complete, you must follow the instructions in [Configuring the properties file](https://leap.hcldoc.com/help/topic/FEBHelp_8.6.4/FEB/co_configuring_the_properties_file.html) in the Forms Experience Builder documentation. Otherwise, you will get errors when trying to start a survey.

10. Enter and validate the properties for your WebSphere Application Server, your database, and your mail server. Click **Next**. Enter the properties of the Connections server you are using.

11. A summary screen is shown. Confirm the information that is shown is correct, and click **Install**.

    Community Surveys is installed into the specified directory on your system. When installation is complete, click **Done** to close the installer.

12. In the WebSphere Application Server Integrated Solutions Console, map the Community Surveys application to the Community Surveys cluster, and the IBM HTTP Server.


**Parent topic:**[Installing Community Surveys](../install/t_inst_installing_forms_experience_builder.md)

