# Setting up the Security Directory Integrator Solutions directory \(tdisol\) {#t_setting_up_security_dir_integ_solutions_dir .task}

Setting up the Security Directory Integrator Solutions directory \(tdisol\).

To deploy & set up SDI Solutions Directory \("tdisol"\), complete the following steps:

1.  On the system hosting your IBM® Tivoli® Directory Integrator installation, create a subdirectory in which to store the Tivoli Directory Integrator solution directory. Make sure that the file path does not contain spaces. Do not, for example, create the subdirectory in the Program Files directory in Microsoft® Windows®. For example, on a Linux server: you may want to create a subdirectory named tdisol under the SDI path /opt/IBM/TDI/V7.2/tdisol.

2.  Go to the HCL Connections installation media and navigate to the HCL\_Connections\_Install\\tools directory and copy the TDISOL compressed file tdisol.tar for Linux, or tdisol.zip for Windows\) from the HCL\_Connections\_Install\\tools directory and paste it into the TDISOL directory you created in Step 1.

3.  Using appropriate tools, extract the TDISOL compressed file to the directory that you created in Step 1. This process creates a Security Directory Integrator Solution directory called TDI. For example, you will end up with: /opt/IBM/TDI/V7.2/tdisol/TDI.

4.  Ensure that you have previously copied the necessary Database JDBC Driver file to the SDI Java Library Extension directory. For example, /opt/IBM/TDI/V7.2/jvm/jre/lib/ext/. Refer to Step 2 in the topic: [Configuring IBM Security Directory Integrator](t_prof_install_tdi.md) for additional information.

5.  From the SDI solution directory, open the tdienv.bat or tdienv.sh file in a text editor. Ensure that the path to the Tivoli Directory Integrator installation directory is specified correctly in the TDIPATH variable. If the path is not correct, edit the TDIPATH environment variable.

    -   Linux®:

        The default value for TDIPATH is:

        ```
        export TDIPATH=/opt/IBM/TDI/V7.2
        ```

    -   Windows:

        The default value for TDIPATH is:

        ```
        SET TDIPATH=C:\Program Files\IBM\TDI\V7.2
        ```

    Other scripts in the solution directory use this Tivoli Directory Integrator path or tdienv.bat or tdienv.sh file to find Tivoli Directory Integrator files.


**Parent topic:**[Manually populating the Profiles database](../install/t_prof_populate_manual.md)

