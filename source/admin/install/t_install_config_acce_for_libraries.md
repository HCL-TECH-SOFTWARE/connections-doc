# Configuring Libraries automatically {#t_install_config_acce_for_libraries .task}

You can configure Libraries automatically using the ccmDomain tool to create a P8 domain, GCD, Object Store, and AddOns.

If you have set the value of login properties in your LDAP configuration to be other than uid or if uid is not the first value in the list of values, then the first <login\> attribute in the section of **<loginAttributes\>** in profiles-config.xml needs to match with the value that FileNet® uses to look up a user. Since by default, the uid value is used and if the security principal for FileNet is not uid, then you must modify the profiles-config.xml to move the attribute that matches up with the principal to be the first attribute in the **<loginAttributes\>** section. For example, if email is used as the principal, then the **<loginAttributes\>**section should look like this:

```
<loginAttributes>
                <loginAttribute>**email**</loginAttribute>
                <loginAttribute>uid</loginAttribute>
                <loginAttribute>loginId</loginAttribute>
            </loginAttributes>
```

**Note:** If you encounter a Transaction is ended due to timeout message, you can modify the transaction time as follows:

1.  From the WebSphere® Application Server Integrated Solutions Console, click **Servers** \> **Server Types** \> **WebSphere application servers** \> **server1** \> **\[Container Settings\] Container Services** \> **Transaction Service**, where **server1** stands for the server running the FileNet application.
2.  Click the **Configuration** tab, and set the **Maximum transaction timeout parameter** value to at least 600 \(seconds\).
3.  Click **Apply** and then click **Save**.

    **Note:** After you create the object store, make sure to change the value back to the default.


**Note:** Make sure the CCM shared file system is readable/writeable before running the tool.

**Attention:** Apply the latest maintenance updates for HCL Connections and FileNet before proceeding with domain and object store creation. Refer to this [strategy document](http://www-01.ibm.com/support/docview.wss?uid=swg21637542) for information on applying maintenance updates to Connections.

1.  To create a P8 domain and Global Configuration Data \(GCD\), perform the following steps:

    1.  Locate the ccmDomainTool automation tool under the <Connections\_HOME\>\\addons\\ccm\\ccmDomainTool.

        **Note:** <Connections\_HOME\> typically means the directory where HCL Connections is installed, such as: /opt/IBM/Connections.

    2.  Start the server where the Connections Content Manager is deployed or start the Connections Content Manager cluster.

    3.  \(Non-Windows only\) Set the executive permission by running the command: chmod 755 \*.

    4.  Create the P8 domain and GCD as follows:

        -   For Windows™ platform, run the command: createGCD.bat
        -   For non-Windows platforms, run the command: ./createGCD.sh
        **Note:** You will be required to enter the Connections administrator password twice. Near the end of the script, when you are prompted to enter another username and password, reenter the Connections administrator account.

2.  To create an Object Store and AddOns, perform the following steps:

    1.  Find the ccmDomainTool automation tool under the <Connections\_HOME\>\\addons\\ccm\\ccmDomainTool directory.

    2.  Make sure you already have created the domain and GCD with ccmDomainTool or manually.

    3.  Create the Object Store as follows:

        -   For Windows platform, run the command: createObjectStore.bat
        -   For non-Windows platforms, run the command: ./createObjectStore.sh
        **Note:** You will be required to input the Connections administrator password \(which is the FileNet Domain administrator\).

3.  Be sure to restart the FileNet Engine application from the WebSphere Application Server Integrated Solutions Console.


Once these inputs have been collected, the program will return the SID value. Refer to [Generating SID values](t_inst_generat_sid_values.md) for more information.

**Note:** If you fail when running the scripts, to fix the problem, drop the GCD \(FNGCD\) and ObjectsStore \(FNOS\) databases and clean out anything that is under CCM shared file system \(<shared content store\>/ccm\), and under <WAS\_installation\_directory\>/AppServer/profiles/AppSrv01/FileNet/. Then rerun the scripts. For examples of possible causes for script failure, see [Troubleshooting the ccmDomain tool](../troubleshoot/r_ts_ccm_domain_tool.md). Also, see [Recreating the FileNet domain and object store](t_install_config_acce_for_libraries.md) if you encounter a problem in the initial domain or object store configuration.

