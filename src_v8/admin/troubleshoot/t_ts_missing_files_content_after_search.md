# Troubleshooting when files content is not found after searching {#t_ts_missing_files_content_after_search .reference}

Files content might not be found unless you perform some added steps. Verify the steps below that match your server’s operating system.

## Linux / AIX { .section}

HCL Connections uses the Stellent \(Oracle Outside In Technology\) Export utility to extract text from documents of various types. The extracted text is added to the Search index, allowing users to find documents based on the content. When Stellent is not configured correctly, file content is not extracted or indexed. Therefore, search results within Connections do not contain any matches on file content.

1.  If you are using WebSphere clusters, make sure that you have copied the search conversion tools to a local directory on all node in the Search cluster.
2.  Run the exporter in isolation from Connections To verify that the exporter is working correctly, run it on the command line in isolation from Connections. To run the exporter on the command line, use the user account that the Search WebSphere Application Server is running under:

    1.  Change directory to the Stellent binary location, for example use the following command:

        ```
        $ cd /opt/IBM/Connections/data/local/search/stellent/dcs/oiexport
        ```

    2.  Run the exporter command. The exporter command has the following syntax:

        ```
        exporter inputpath=<path_to_input_file> outputpath=<path_to_extracted_text_output> outputid=FI_SEARCHTEXT
        ```

    An example of the exporter command is as follows:

    ```
    $ ./exporter inputpath=/root/translation.pdf \ outputpath=/root/testStellent.txt outputid=FI_SEARCHTEXT
    ```

    If the text extraction worked successfully, you see the output:

    ```
    Export complete
    ```

    However, continue to the next step if you see a message like the following example:

    ```
    ./exporter: error while loading shared libraries: libsc_ex.so: cannot open shared object file: No such file or directory
    ```

3.  Ensure that the operating system environment variables LD\_LIBRARY\_PATH and PATH are set correctly in Section 1.

    Both variables must contain the Stellent installation directory. To get the current values of the environment variables, run the following commands as the user that the Search WebSphere Application Server is running under:

    ```
    $ cd app_server_root/AppServer/bin
    $ . setupCmdLine.sh
    $ echo $LD_LIBRARY_PATH
    $ echo $PATH
    ```

    To verify that the Stellent exporter can be found through the PATH environment variable, run the following command:

    ```
    $ which exporter
    ```

    The output of this command must contain the full path to the exporter:

    ```
    /opt/IBM/Connections/data/local/search/stellent/dcs/oiexport/exporter
    ```

4.  Check the WebSphere Environment, take the following steps:
    1.  Using the WebSphere Application Server administrative console, ensure that the WebSphere environment variable FILE\_CONTENT\_CONVERSION points to the exporter. An example of the exporter is as follows:

        ```
        /opt/IBM/Connections/data/local/search/stellent/dcs/oiexport/exporter
        ```

        When the server that contains the Search application starts, it checks whether the WebSphere Application Server FILE\_CONTENT\_CONVERSION environment variable points to a path that contains the Stellent binary files.

    2.  Verify that the SystemOut.log contains similar lines to the following message:

        ```
        [5/18/14 8:21:00:985 EDT] 00000250 DocumentIndex I com.ibm.connections.search.service.files.impl.DocumentIndexingServiceImpl 
        isEnvironmentValid - FILE_CONTENT_CONVERSION: /opt/IBM/Connections/search/search/search/dcs/oiexport/exporter
        [5/18/14 8:21:00:986 EDT] 00000250 DocumentIndex I com.ibm.connections.search.service.files.impl.DocumentIndexingServiceImpl 
        isEnvironmentValid: true
        ```

5.  Ensure that the user under which the Search WebSphere Application Server is running has sufficient file access privileges. This user must have `read/write/execute` permissions on the exporter and `read/write` permissions on the other files in the Stellent installation directory.
6.  Verify that the libraries that are deployed with Stellent are compatible with your operating system.

    For example, on a 64-bit Linux system, you can verify the library as follows:

    ```
    $ uname -a
    Linux host1 2.6.18-308.11.1.el5 #1 SMP Fri Jun 15 15:41:53 EDT 2012 x86_64 x86_64 x86_64 GNU/Linux
    $ cd /opt/IBM/Connections/data/local/search/stellent/dcs/oiexport
    $ file libsc_ex.so
    libsc_ex.so: ELF 64-bit LSB shared object, AMD x86-64, version 1 (SYSV), not stripped
    ```

    **Note:** Your Stellent installation might contain 32-bit libraries although you are running on a 64-bit operating system. This disparity is not an issue if the 32-bit compatible libraries are on the LD\_LIBRARY\_PATH or can be found on the shared library search path.

7.  Verify shared library dependencies.

    The Stellent exporter has a number of dependencies on both the shared libraries that are packaged with Stellent and on shared libraries that are installed on your system. To verify that all the required shared libraries can be found, use the ldd command on the exporter using the following command:

    ```
    $ ldd -v exporter
    ```

    1.  Check the output of this command for any shared libraries that are marked as `=> not found`.
        -   ```
Stellent shared library not found
```

            If a Stellent shared library cannot be found, then check that the setting of your LD\_LIBRARY\_PATH operating system environment variable contains the Stellent installation directory.

            ```
            System shared library not found
            ```

            If a system shared library cannot be found, then you are missing a prerequisite library.

            **Note:** If they can be found elsewhere on the system's default search path, you can still pick up libraries from locations other than the locations included in the LD\_LIBRARY\_PATH operating system environment variable.

            In addition to libc.so.6, Stellent is dependent upon the following libraries:

            -   libstdc++.so.5
            -   libgcc\_s.so.1
            -   For Red Hat Enterprise Linux 6.0 and later, it is possible that you are missing the package compat-libstdc++-33. This package contains libstdc++.so.5.

## Results \(Linux / AIX\) {#section_ipf_z32_1lb .section}

The Stellent exporter has a number of dependencies on both the shared libraries that are packaged with Stellent and on shared libraries that are installed on your system. To verify that all the required shared libraries can be found, use the ldd command on the exporter as follows: $ ldd -v exporter. Check the output of this command for any shared libraries that are marked as`=> not found.`. For example:

-   Stellent shared library not found. If a Stellent shared library cannot be found, then check that the setting of your LD\_LIBRARY\_PATH operating system environment variable contains the Stellent installation directory.
-   System shared library not found. If a system shared library cannot be found, then a prerequisite library is missing.

    **Note:** If they can be found elsewhere on the system's default search path, you can still pick up libraries from locations other than those locations included in the LD\_LIBRARY\_PATH operating system environment variable. In addition to libc.so.6, Stellent is dependent upon the following libraries:

    -   libstdc++.so.5 libgcc\_s.so.1
    -   For Red Hat Enterprise Linux™ 6.0 and later, it is possible that you are missing the package compat-libstdc++-33, which contains libstdc++.so.5.

## Windows {#section_x1w_cj2_1lb .section}

1.  If you are using WebSphere clusters, make sure that you have copied the search conversion tools to a local directory on all node in the Search cluster.
2.  Once the files are copied locally, open a terminal window and change the directory to the directory containing the search conversion tools \(directory name will be oiexport\). Run the program export.exe and verify that a graphical user interface program starts and asks for input.

    **Note:** This is testing and confirming that there are no error messages presented when running the conversion tool, such as asking you to install a new Visual C++ dependency.

    As long as there are no errors, close the program. Also run the program export.exe to confirm no errors \(though there is no additional output for this program\). If there is a prompt to install additional dependencies when running either of these applications, then install those dependencies or contact HCL support if this cannot be resolved.

3.  Using the WebSphere administration console, verify that a number of WebSphere environment variables have been set properly.

    Under Servers: \> WebSphere Application Servers -\> \(your server name\) -\> Java and Process Management -\> Process Definition -\> Environment Entries, verify that the values for LD\_LIBRARY\_PATH, LIBPATH and PATH all contain the local directory path that contains the search conversion tools.

    For example: C:\\IBM\\Connections\\data\\local\\stellent\\dcs\\oiexport.

    Again, using the WebSphere administration console, check Environment -\> WebSphere Variables and validate that the value for FILE\_CONTENT\_CONVERSION is set to the fully qualified path for the exporter executable.

    For example: C:\\IBM\\Connections\\Shared\\search\\stellent\\dcs\\oiexport\\exporter

    Again, using the WebSphere administration console, check Environment -\> WebSphere Variables and validate that the value for LD\_LIBRARY\_PATH is set to the fully qualified path for the search conversion tools.

    For example: C:\\IBM\\Connections\\Shared\\search\\stellent\\dcs\\oiexport.

4.  After performing these steps, synchronize all WebSphere nodes and restart the WebSphere server, node and manager.

**Parent topic:**[Troubleshooting Search](../troubleshoot/c_ts_search.md)

