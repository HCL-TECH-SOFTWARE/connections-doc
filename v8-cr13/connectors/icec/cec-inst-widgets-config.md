# Updating the widgets-config.xml file {#id_name .reference}

Update the Engagement Center's widgets-config.xml file with the settings needed for HCL Connections.

1.  Open a Windows command prompt \(cmd.exe\) and execute the following script to check out widgets-config.xml; leave the command prompt open for the next step.

    Alternatively you can edit the widgets-config.xml file manually and then synchronize the nodes in the WebSphere Integrated Solutions Console.

    ```
    cd C:\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
    wsadmin -lang jython -user <wasadmin> -password <password>
    execfile("communitiesAdmin.py")
    CommunitiesConfigService.checkOutWidgetsConfig("C:\Temp2", AdminControl.getCell())
    ```

2.  Open the just checked out widgets-config.xml file in an XML editor of your choice and add the following `widgetDef`code to the resource tag containing `type="community"...>`.

    Note: If you are using Connections V5.5 with no Cumulative Releases applied, then you must install the following iFix: 5.5.0.0-IC-Container-IFLO88423.jar. For information on installing an iFix, see [Installing interim fixes in interactive mode](../../admin/migrate/t_install_interim-fix.md).

    ```
    <!-- IBM GROUP - ICEC4Communities -->
    <widgetDef
        defId="ICEC2"
        description="ICEC.desc"
        bundleRefId="ICEC" 
        modes="view fullpage"
        themes="wpthemeNarrow wpthemeWide wpthemeBanner"
        showInPalette="true"
        uniqueInstance="true"
        url="/xcc/templates/iWidgetXCCCommunityDefinition.xml">
        <itemSet>
           <item name="lang" value="{lang}"/>
        </itemSet>            
    </widgetDef>
    <!-- IBM GROUP - ICEC4Communities -->
    ```

    Example:

    ![image](images/image78.png)

3.  Run the following script: `CommunitiesConfigService.checkInwidgetsConfig("*working\_directory*","*cell\_name*")`

    where *working\_directory* is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edited them, and *cell\_name* is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)


**Parent topic:**[Community on-premises mode configuration](../../connectors/icec/cec-inst-community-on-prem-config.md)

**Previous topic:**[Community on-premises mode configuration](../../connectors/icec/cec-inst-community-on-prem-config.md)

**Next topic:**[Updating the LotusConnections-config.xml file](../../connectors/icec/cec-inst-connections-config.md)

