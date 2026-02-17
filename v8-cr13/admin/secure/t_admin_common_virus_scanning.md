# Enabling virus scanning 

Edit configuration property settings to force the applications that handle uploaded files to scan all files for viruses.

## Before you begin

HCL Connections™ does not provide virus scanning software, but it does enable you to use existing virus scanning services implemented within your corporate infrastructure. Before you begin this procedure, find out the location of the virus scanning service.

Connections supports the Internet Content Adaptation Protocol \(ICAP\) and its applications use this protocol to communicate with virus detection products. Specifically, Connections supports the ICAP 1.0 protocol. Ensure that the virus detection product used in your enterprise supports ICAP 1.0. Follow the configuration instructions below to enable the ICAP communication between the Connections server and your ICAP virus scanning server. In that process, you update LotusConnections-config.xml with the hostname and the ICAP response modification service of your virus scanning server. Once configured, Connections then instigates virus detection using ICAP when uploading files and images as mentioned in the following content. Note that your virus detection product must include response headers X-Infection-Found and X-Violations-Found since those are the virus detection responses Connections uses to determine whether a scanning error occurred.

!!! note 
    
    Disable any file cleaning services that are provided by the virus scanning product you are using. Cleaning must be disabled for the virus scanner to interact properly with Connections. See the documentation for the virus scanner to determine how to disable file cleaning.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

## About this task

The Bookmarks and Home page applications do not implement virus scanning because no files or images are uploaded to those application databases.

To enable virus scanning for Activities, Blogs, Communities, Files, Forums, Profiles, and Wikis, complete the following steps:

1.  Use the wsadmin client to access and check out the Connections configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out Connections configuration files:

        ```
        LCConfigService.checkOutConfig("working\_directory","cell\_name")
        
        ```

        where:

        -   `working_directory` is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.
        
            !!! note
                
                When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory.

                -   For example:"C:/temp".
                -   Linux only: The directory must grant write permissions or the command fails.
        
        -   `cell_name` is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell()

            !!! note
                
                This input parameter is case-sensitive.

2.  From the temporary directory to which you just checked out the Connections configuration files, open the `LotusConnections-config.xml` file in a text editor.

3.  Uncomment the following block of XML, which can be found in the avFilter section:

    ```bash
    <!--avFilter class="AVScannerICAP">   
    <property>av.scanner.servers=myscanner.host.com</property>   
    <property>exception.on.virus=yes</property>   
    <property>av.scanner.service=scanner.service</property>
    </avFilter-->
    ```

4.  Replace references to `scanner.service` with the name of the ICAP response modification service on the ICAP-enabled scanner. Select one of the following options:

    **RESPMOD**
    Represents McAfee virus scanning software

    **AVSCAN**
    Represents Symantec virus scanning software

    Or add the ICAP response modification service for the virus scanning software that you want to support.

5.  Replace references to myscanner.host.com with the server name or IP address of the system hosting the virus scanner. To specify more than one server, separate multiple server names or IP addresses with commas.

    For example:

    ```bash
    <avFilter class="AVScannerICAP">
      <property>av.scanner.servers=myscanner1.example.com,
       myscanner2.example.com,myscanner3.example.com</property>
      <property>exception.on.virus=yes</property>
      <property>av.scanner.service=RESPMOD</property>
    </avFilter>
    ```

6.  To support scanning large files, specify values for the av.chunk.size and first.read.timeout properties:

    For example:

    ```bash
    <avFilter class="AVScannerICAP">
      ...
      <property>av.chunk.size=50000</property>
      <property>first.read.timeout=120000</property>
    </avFilter>
    ```

    If the scanner is not available, uploads are rejected to prevent someone from executing a denial of service attack against the scanner, intending to then upload an infected file. In the first.read.timeout property, you can set the number of milliseconds to allow a service to attempt to reach the scanner before rejecting the request.

7.  Save your changes to the LotusConnections-config.xml file.

8.  After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See [Applying common configuration property changes](../admin/t_admin_common_save_changes.md) for information about how to save and apply your changes.

## What to do next

Once virus scanning is running in your environment, any scanning-related errors are written to the SystemOut.log file. See [Troubleshooting virus scanning](../troubleshoot/r_troubleshooting_virus_scanning.md) for information about possible errors and their causes.

**Parent topic:** [Security](../secure/c_sec_overview.md)
