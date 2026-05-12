# Enabling profiles events for Orient Me {#cp_config_om_enable_profiles_eventsp .task}

To enable Component Pack to access user accounts in HCL Connections™, you must enable profiles events on your Tivoli® Directory Integrator \(TDI\) server and WebSphere® Deployment Manager.

Manually update settings in tdi-profiles-config.xml on your Tivoli® Directory Integrator \(TDI\) server, and in profiles-config.xml on your WebSphere® Deployment Manager.

1.  Manually update settings in tdi-profiles-config.xml by completing the following steps:

    **Note:** Update tdi-profiles-config.xml on all servers that are running the TDI process. Refer to the TDI configuration related topics such as [Developing custom TDI assembly lines for Profiles](../admin/c_admin_profiles_develop_custom_tdi_scripts.md) or [Populating the Profiles database](t_prof_install_profiles_db.md) to validate the locations you need to target for those changes.

    1.  Using a text editor, open te tdi-profiles-config.xml file.

        After the TDI Solution files are extracted, the file is located in the following directory: TDI/conf/LotusConnections-config

    2.  Within the `tdiConfig` section, add a `<properties>` section with the following properties:

        ```
        <property name="com.ibm.lconn.profiles.config.EnableManagerChangeEvent" value="true"/>
        <property name="com.ibm.lconn.profiles.config.EnableTDIEventOverride" value="true"/>
        ```

        For example:

        ```
        <tdiConfig id="tdi-profiles"
        	xmlns="http://www.ibm.com/profiles-config"
        	xmlns:tns="http://www.ibm.com/profiles-config"
        	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        	xsi:schemaLocation="http://www.ibm.com/profiles-config profiles-config.xsd">
        	<profileExtensionAttributes>
        		<!--
        			This extension attribute is required by the 'MyLinks' profile widget
        		-->
        		<xmlFileAttribute
        			extensionId="profileLinks"
        			schemaFile="profile-links.xsd"
        			indexBindingExpr="/linkroll/link/@name | /linkroll/link/@url">
        				<indexFields>
        					<indexField fieldName="linkName" fieldExpr="/linkroll/link/@name" />
        				</indexFields>
        		</xmlFileAttribute>
        	</profileExtensionAttributes>
        	<properties>
        		<!-- Enable SIB events for Component Pack -->
        		<property name="com.ibm.lconn.profiles.config.EnableManagerChangeEvent" value="true"/>
        		<property name="com.ibm.lconn.profiles.config.EnableTDIEventOverride" value="true"/>
        	</properties>
        </tdiConfig>
        ```

2.  After editing tdi-profiles-config.xml, you do not need to rerun TDI population again if you have already populated data from LDAP. However, you must run sync\_all\_dns.bat or sync\_all\_dns.sh to sync user information when you update users in LDAP.

    Next, you will update the settings in profiles-config.xml on the Deployment Manager server by completing the remaining steps.

3.  On the WebSphere deployment manager machine, start the wsadmin client as described in [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md).

4.  Run the following command to access the Profiles configuration files:

    ```
    `execfile("profilesAdmin.py")`
    ```

5.  Run the following command to check out the Profiles configuration files:

    ```
    ProfilesConfigService.checkOutConfig("working\_directory","cell\_name")
    ```

    where:

    -   `working\_directory` is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.
    -   `cell\_name` is the name of the WebSphere Application Server cell that hosts the Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: `print AdminControl.getCell()`
    For example:

    -   Linux®:

        ```
        ProfilesConfigService.checkOutConfig("/opt/temp","foo01Cell01")
        ```

    -   Windows™:

        ```
        ProfilesConfigService.checkOutConfig("c:/temp","foo01Cell01")
        ```

    Leave the wsadmin session open.

    **Important:** Files must be checked back into wsadmin during the same session in which they were checked out, so it is important that you leave the session open while editing the checked-out files in the following steps.

6.  From the `working\_directory` that you specified in the previous step, open the profiles-config.xml for editing.

7.  In the `<properties>` section of the file, add following properties and set the value to `true` for each property:

    ```
    <!-- Enable SIB events for Component Pack -->
    <property name="com.ibm.lconn.profiles.config.EnableManagerChangeEvent" value="true"/>
    <property name="com.ibm.lconn.profiles.config.EnableTDIEventOverride" value="true"/>
    ```

    **Note:** You can remove the `profiles.events.system.publish` property because it is no longer needed.

8.  After you make changes, check the configuration files in by running the following command in the wsadmin session that you left open:

    ```
    ProfilesConfigService.checkInConfig()
    ```

9.  Stop and then restart the servers that host the Connections applications.

    **Tip:** The next task will also require you to stop and restart the Connections servers, so you can skip this step until you finish [Configuring the Orient Me home page](cp_config_om_enable_notifications.md).


**Parent topic:**[Configuring the Orient Me component](../install/cp_config_om_intro.md)

